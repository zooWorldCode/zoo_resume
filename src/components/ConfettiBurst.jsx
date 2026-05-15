import { useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from "react";

const FOAM_IMAGE_SRCS = [1, 2, 3].map(
  (n) => `${import.meta.env.BASE_URL}img/box/foam/foam_${n}.png`,
);
const FOAM_IMAGES = FOAM_IMAGE_SRCS.map((src) => {
  const img = new Image();
  img.src = src;
  return img;
});

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

class Particle {
  constructor(x, y) {
    const angle = Math.random() * Math.PI * 2;
    const speed = randomBetween(5, 14);
    this.x = x;
    this.y = y;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.imageIndex = Math.floor(Math.random() * FOAM_IMAGES.length);
    this.life = 1;
    this.decay = randomBetween(0.011, 0.022);
    this.w = randomBetween(60, 120);
    this.h = randomBetween(30, 70);
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = randomBetween(-0.22, 0.22);
    this.gravity = randomBetween(0.15, 0.28);
    this.trail = [];
  }
  update() {
    this.trail.push({ x: this.x, y: this.y, life: this.life });
    if (this.trail.length > 4) this.trail.shift();
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.vx *= 0.99;
    this.rotation += this.rotSpeed;
    this.life -= this.decay;
  }
  draw(ctx) {
    if (this.life <= 0) return;
    const img = FOAM_IMAGES[this.imageIndex];
    if (!img.complete || !img.naturalWidth) return;

    const trailSize = this.w * 0.5;
    ctx.save();
    ctx.globalAlpha = 1;
    for (let i = 0; i < this.trail.length; i++) {
      const t = this.trail[i];
      ctx.drawImage(img, t.x - trailSize / 2, t.y - trailSize / 2, trailSize, trailSize);
    }
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = 1;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.drawImage(img, -this.w / 2, -this.h / 2, this.w, this.h);
    ctx.restore();
  }
}

const ConfettiBurst = forwardRef(function ConfettiBurst(_props, ref) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animRef = useRef(null);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }, []);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  useEffect(() => {
    return () => {
      if (animRef.current != null) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
    };
  }, []);

  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesRef.current.forEach((p) => { p.update(); p.draw(ctx); });
    particlesRef.current = particlesRef.current.filter((p) => p.life > 0);
    if (particlesRef.current.length > 0) {
      animRef.current = requestAnimationFrame(loop);
    } else {
      animRef.current = null;
    }
  }, []);

  const burst = useCallback((_e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    for (let i = 0; i < 500; i++) {
      particlesRef.current.push(new Particle(cx, cy));
    }
    if (!animRef.current) loop();
  }, [loop]);

  useImperativeHandle(ref, () => ({ burst }), [burst]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
});

ConfettiBurst.displayName = "ConfettiBurst";

export default ConfettiBurst;
