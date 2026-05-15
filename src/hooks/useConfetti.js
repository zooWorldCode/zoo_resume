import { useCallback } from "react";

const CONFETTI_COUNT = 500;
const SEQUIN_COUNT = 0;

/** 아래로 더 빨리 사라지게: 중력(프레임당)↑, 터미널 속도↑ / 느리게는 줄이세요. (시간으로 끊지 않음 → 화면 아래로만 제거) */
const FOAM_GRAVITY = 0.22;
const FOAM_TERMINAL_VY = 3.6;

const COLORS = [
  { front: "#FED5E2", back: "#FED5E2" },
  { front: "#D3F1EA", back: "#D3F1EA" },
];

const FOAM_URLS = [1, 2, 3].map(
  (n) => `${import.meta.env.BASE_URL}img/box/foam/foam_${n}.png`,
);

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

/** 모듈 싱글톤: 라우트 전환·Home 언마운트 후에도 폼 애니메이션 유지 */
let foamImages = null;
let canvas = null;
let ctx = null;
let confettiPieces = [];
let sequinPieces = [];
let rafId = null;
let resizeHandler = null;

function ensureFoamImages() {
  if (foamImages) {
    return;
  }
  foamImages = FOAM_URLS.map((src) => {
    const img = new Image();
    img.src = src;
    return img;
  });
}

function resizeCanvas() {
  if (!canvas) {
    return;
  }
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function loop() {
  if (!ctx || !canvas) {
    rafId = null;
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confettiPieces.forEach((piece) => {
    const img = foamImages[piece.imageIndex];
    const ready = Boolean(img?.complete && img.naturalWidth);

    ctx.translate(piece.position.x, piece.position.y);
    ctx.rotate(piece.rotation);
    piece.velocity.x -= piece.velocity.x * 0.075;
    piece.velocity.y = Math.min(piece.velocity.y + FOAM_GRAVITY, FOAM_TERMINAL_VY);
    piece.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();
    piece.position.x += piece.velocity.x;
    piece.position.y += piece.velocity.y;
    piece.scale.y = Math.cos((piece.position.y + piece.randomModifier) * 0.03);

    if (ready) {
      const width = piece.dimensions.x * piece.scale.x;
      const height = piece.dimensions.y * piece.scale.y;
      ctx.drawImage(img, -width / 2, -height / 2, width, height);
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  });

  sequinPieces.forEach((sequin) => {
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

  confettiPieces = confettiPieces.filter((piece) => piece.position.y < canvas.height);
  sequinPieces = sequinPieces.filter((sequin) => sequin.position.y < canvas.height);

  rafId = window.requestAnimationFrame(loop);
}

function ensureEngine() {
  ensureFoamImages();

  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.style.cssText =
      "position:fixed;inset:0;width:100%;height:100vh;pointer-events:none;z-index:9999;";
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");
    resizeHandler = resizeCanvas;
    window.addEventListener("resize", resizeHandler);
    resizeCanvas();
  }

  if (rafId == null) {
    rafId = window.requestAnimationFrame(loop);
  }
}

function burstFoamConfetti(event) {
  ensureEngine();

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const originX = event?.clientX ?? canvasWidth / 2;
  const originY = event?.clientY ?? canvasHeight / 2;

  for (let index = 0; index < CONFETTI_COUNT; index += 1) {
    confettiPieces.push({
      randomModifier: rnd(0, 99),
      color: COLORS[Math.floor(rnd(0, COLORS.length))],
      imageIndex: Math.floor(rnd(0, FOAM_URLS.length)),
      dimensions: { x: rnd(240, 400), y: rnd(360, 600) },
      position: { x: rnd(originX - 100, originX + 100), y: rnd(originY - 50, originY + 50) },
      rotation: rnd(0, 2 * Math.PI),
      scale: { x: 1, y: 1 },
      velocity: initVelocity([-900, 900], [100, 20]),
    });
  }

  for (let index = 0; index < SEQUIN_COUNT; index += 1) {
    sequinPieces.push({
      color: COLORS[Math.floor(rnd(0, COLORS.length))].back,
      radius: rnd(12, 24),
      position: { x: rnd(originX - 15, originX + 15), y: rnd(originY, originY + 10) },
      velocity: { x: rnd(-7.8, 7.8), y: rnd(-10.4, -15.6) },
    });
  }
}

export function useConfetti() {
  return useCallback((event) => {
    burstFoamConfetti(event);
  }, []);
}
