import { useCallback, useEffect, useRef } from "react";

const CONFETTI_COUNT = 80;
const SEQUIN_COUNT = 0;
const COLORS = [
  { front: "#7b5cff", back: "#6245e0" },
  { front: "#b3c7ff", back: "#8fa5e5" },
  { front: "#5c86ff", back: "#345dd1" },
];

const rnd = (min, max) => Math.random() * (max - min) + min;

function initVelocity(xRange, yRange) {
  const x = rnd(xRange[0], xRange[1]);
  const range = yRange[1] - yRange[0] + 1;
  let y = yRange[1] - Math.abs(rnd(0, range) + rnd(0, range) - range);

  if (y >= yRange[1] - 1) {
    y += Math.random() < 0.25 ? rnd(1, 3) : 0;
  }

  return { x, y: -y };
}

export function useConfetti() {
  const canvasRef = useRef(null);
  const confettiRef = useRef([]);
  const sequinsRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.style.cssText =
      "position:fixed;inset:0;width:100%;height:100vh;pointer-events:none;z-index:9999;";
    document.body.appendChild(canvas);
    canvasRef.current = canvas;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const ctx = canvas.getContext("2d");

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confettiRef.current.forEach((piece) => {
        const width = piece.dimensions.x * piece.scale.x;
        const height = piece.dimensions.y * piece.scale.y;

        ctx.translate(piece.position.x, piece.position.y);
        ctx.rotate(piece.rotation);
        piece.velocity.x -= piece.velocity.x * 0.075;
        piece.velocity.y = Math.min(piece.velocity.y + 0.3, 3);
        piece.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();
        piece.position.x += piece.velocity.x;
        piece.position.y += piece.velocity.y;
        piece.scale.y = Math.cos((piece.position.y + piece.randomModifier) * 0.09);
        ctx.fillStyle = piece.scale.y > 0 ? piece.color.front : piece.color.back;
        ctx.fillRect(-width / 2, -height / 2, width, height);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      });

      sequinsRef.current.forEach((sequin) => {
        ctx.translate(sequin.position.x, sequin.position.y);
        sequin.velocity.x -= sequin.velocity.x * 0.02;
        sequin.velocity.y += 0.55;
        sequin.position.x += sequin.velocity.x;
        sequin.position.y += sequin.velocity.y;
        ctx.fillStyle = sequin.color;
        ctx.beginPath();
        ctx.arc(0, 0, sequin.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      });

      confettiRef.current = confettiRef.current.filter(
        (piece) => piece.position.y < canvas.height,
      );
      sequinsRef.current = sequinsRef.current.filter(
        (sequin) => sequin.position.y < canvas.height,
      );

      rafRef.current = window.requestAnimationFrame(loop);
    };

    rafRef.current = window.requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("resize", resize);
      canvas.remove();
    };
  }, []);

  const burst = useCallback((event) => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const originX = event?.clientX ?? canvasWidth / 2;
    const originY = event?.clientY ?? canvasHeight / 2;

    for (let index = 0; index < CONFETTI_COUNT; index += 1) {
      confettiRef.current.push({
        randomModifier: rnd(0, 99),
        color: COLORS[Math.floor(rnd(0, COLORS.length))],
        dimensions: { x: rnd(240, 400), y: rnd(360, 600) },
        position: { x: rnd(originX - 20, originX + 20), y: rnd(originY, originY + 10) },
        rotation: rnd(0, 2 * Math.PI),
        scale: { x: 1, y: 1 },
        velocity: initVelocity([-35.7, 35], [23, 43]),
      });
    }

    for (let index = 0; index < SEQUIN_COUNT; index += 1) {
      sequinsRef.current.push({
        color: COLORS[Math.floor(rnd(0, COLORS.length))].back,
        radius: rnd(12, 24),
        position: { x: rnd(originX - 15, originX + 15), y: rnd(originY, originY + 10) },
        velocity: { x: rnd(-7.8, 7.8), y: rnd(-10.4, -15.6) },
      });
    }
  }, []);

  return burst;
}
