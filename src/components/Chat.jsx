import { useEffect, useRef, useState, useCallback } from "react";

const BOXES = [
  { id: 1, color: "#378ADD" },
  { id: 2, color: "#1D9E75" },
  { id: 3, color: "#D85A30" },
];

export default function Chat() {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const boxRefs = useRef([]);
  const fadeTimerRef = useRef(null);
  const nextTimerRef = useRef(null);

  const [overlayOpacity, setOverlayOpacity] = useState(0);
  const [currentStep, setCurrentStep] = useState(-1);
  const [waitingClick, setWaitingClick] = useState(false);

  const drawOverlay = useCallback((el) => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas || !el) return;
    const rr = root.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    canvas.width = root.offsetWidth;
    canvas.height = root.offsetHeight;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const x = er.left - rr.left - 4;
    const y = er.top - rr.top - 4;
    const w = er.width + 8;
    const h = er.height + 8;
    ctx.clearRect(x, y, w, h);
  }, []);

  const fadeOut = useCallback((cb) => {
    setOverlayOpacity(0);
    fadeTimerRef.current = setTimeout(() => {
      cb?.();
    }, 500);
  }, []);

  const runStep = useCallback(
    (step) => {
      if (step > 2) {
        fadeOut();
        return;
      }
      setCurrentStep(step);
      const el = boxRefs.current[step];
      drawOverlay(el);
      setOverlayOpacity(1);
      setWaitingClick(true);
    },
    [drawOverlay, fadeOut],
  );

  useEffect(() => {
    const t = setTimeout(() => runStep(0), 400);
    return () => clearTimeout(t);
  }, [runStep]);

  useEffect(() => {
    return () => {
      clearTimeout(fadeTimerRef.current);
      clearTimeout(nextTimerRef.current);
    };
  }, []);

  const handleBoxClick = useCallback(
    (idx) => {
      if (!waitingClick || idx !== currentStep) return;
      setWaitingClick(false);
      fadeOut(() => {
        nextTimerRef.current = setTimeout(() => runStep(currentStep + 1), 5000);
      });
    },
    [waitingClick, currentStep, fadeOut, runStep],
  );

  return (
    <div
      ref={rootRef}
      style={{
        position: "relative",
        width: "100%",
        height: "460px",
        background: "#f0ede8",
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "28px",
      }}
    >
      {BOXES.map((box, i) => (
        <div
          key={box.id}
          ref={(el) => {
            boxRefs.current[i] = el;
          }}
          onClick={() => handleBoxClick(i)}
          style={{
            width: "200px",
            height: "80px",
            borderRadius: "8px",
            background: box.color,
            cursor: "pointer",
            position: "relative",
            zIndex: 2,
            transition: "transform 0.15s",
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "scale(0.97)";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: overlayOpacity,
          transition: "opacity 0.35s ease",
          borderRadius: "12px",
          zIndex: 1,
        }}
      >
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0 }} />
      </div>
    </div>
  );
}
