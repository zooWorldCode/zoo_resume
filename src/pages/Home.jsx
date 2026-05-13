import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useConfetti } from "../hooks/useConfetti";

const TAPE_FRAME_START = 1;
const TAPE_FRAME_END = 17;
const TAPE_IDLE_FRAME = 1;
const TAPE_ANIMATION_START = 2;
const TAPE_FRAME_INTERVAL_MS = 70;
const MAIN_TRANSITION_DELAY_MS = 650;

function tapeSrc(frame) {
  return `/img/box/tape/tapeArtboard-1_${frame}.png`;
}

function Home() {
  const navigate = useNavigate();
  const [tapeFrame, setTapeFrame] = useState(TAPE_IDLE_FRAME);
  const [isTapeHidden, setIsTapeHidden] = useState(false);
  const [isTapePlayed, setIsTapePlayed] = useState(false);
  const [isBoxShaking, setIsBoxShaking] = useState(false);
  const intervalRef = useRef(null);
  const shakeFrameRef = useRef(null);
  const boxClickCountRef = useRef(0);
  const transitionTimeoutRef = useRef(null);
  const burstConfetti = useConfetti();

  useEffect(() => {
    for (let frame = TAPE_FRAME_START; frame <= TAPE_FRAME_END; frame += 1) {
      const image = new Image();
      image.src = tapeSrc(frame);
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
      if (shakeFrameRef.current) {
        window.cancelAnimationFrame(shakeFrameRef.current);
      }
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  function playTapeAnimation() {
    if (isTapePlayed) {
      return;
    }

    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }

    setIsTapeHidden(false);
    let currentFrame = TAPE_ANIMATION_START;
    setTapeFrame(currentFrame);

    intervalRef.current = window.setInterval(() => {
      if (currentFrame >= TAPE_FRAME_END) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
        setTapeFrame(TAPE_FRAME_END);
        setIsTapeHidden(true);
        setIsTapePlayed(true);
        return;
      }

      currentFrame += 1;
      setTapeFrame(currentFrame);
    }, TAPE_FRAME_INTERVAL_MS);
  }

  function shakeBox(event) {
    if (transitionTimeoutRef.current) {
      return;
    }

    boxClickCountRef.current += 1;

    if (boxClickCountRef.current >= 5) {
      burstConfetti(event);
      transitionTimeoutRef.current = window.setTimeout(() => {
        navigate("/main");
      }, MAIN_TRANSITION_DELAY_MS);
      return;
    }

    setIsBoxShaking(false);

    if (shakeFrameRef.current) {
      window.cancelAnimationFrame(shakeFrameRef.current);
    }

    shakeFrameRef.current = window.requestAnimationFrame(() => {
      setIsBoxShaking(true);
      shakeFrameRef.current = null;
    });
  }

  return (
    <>
      <Header />
      <main className="page-shell home-page-shell">
        <div className="page-content">
          <section className="hero-box" aria-label="Home visual">
            <button
              className="hero-box__tape-button"
              type="button"
              onClick={playTapeAnimation}
              disabled={isTapePlayed}
              aria-label="Play tape animation"
            >
              <img
                className={`hero-box__tape${isTapeHidden ? " is-hidden" : ""}`}
                src={tapeSrc(tapeFrame)}
                alt=""
                aria-hidden="true"
              />
            </button>
            <img
              className={`hero-box__image${isBoxShaking ? " is-shaking" : ""}`}
              src="/img/box/box.png"
              alt=""
              onClick={shakeBox}
              onAnimationEnd={() => setIsBoxShaking(false)}
            />
          </section>
        </div>
      </main>
    </>
  );
}

export default Home;
