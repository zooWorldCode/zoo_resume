import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ConfettiBurst from "../components/ConfettiBurst";

const TAPE_FRAME_START = 1;
const TAPE_FRAME_END = 17;
const TAPE_IDLE_FRAME = 1;
const TAPE_ANIMATION_START = 2;
const TAPE_FRAME_INTERVAL_MS = 70;
const MAIN_TRANSITION_DELAY_MS = 650;
const BOX_IMAGE_URL = `${import.meta.env.BASE_URL}img/box/box.png`;
const CHAT_01_URL = `${import.meta.env.BASE_URL}img/chat/chat_01.png`;
const CHAT_02_URL = `${import.meta.env.BASE_URL}img/chat/chat_02.png`;
const CHAT_03_URL = `${import.meta.env.BASE_URL}img/chat/chat_03.png`;
const CHAT_SWAP_DELAY_MS = 1000;
const TAPE_FOLLOWUP_DIM_DELAY_MS = 2000;
const TAPE_FOLLOWUP_SPOTLIGHT_MS = 1600;

function tapeSrc(frame) {
  return `${import.meta.env.BASE_URL}img/box/tape/tapeArtboard-1_${frame}.png`;
}

function Home() {
  const navigate = useNavigate();
  const [tapeFrame, setTapeFrame] = useState(TAPE_IDLE_FRAME);
  const [isTapeHidden, setIsTapeHidden] = useState(false);
  const [isTapePlayed, setIsTapePlayed] = useState(false);
  const [isBoxShaking, setIsBoxShaking] = useState(false);
  const [chatIntroActive, setChatIntroActive] = useState(true);
  const [showChat02, setShowChat02] = useState(false);
  const [showChat03, setShowChat03] = useState(false);
  const [tapeFollowupDim, setTapeFollowupDim] = useState(false);
  const intervalRef = useRef(null);
  const shakeFrameRef = useRef(null);
  const boxClickCountRef = useRef(0);
  const transitionTimeoutRef = useRef(null);
  const confettiBurstRef = useRef(null);

  useEffect(() => {
    const introId = window.setTimeout(() => {
      setChatIntroActive(false);
    }, 2200);
    return () => window.clearTimeout(introId);
  }, []);

  useEffect(() => {
    const swapId = window.setTimeout(() => {
      setShowChat02(true);
    }, CHAT_SWAP_DELAY_MS);
    return () => window.clearTimeout(swapId);
  }, []);

  useEffect(() => {
    if (!isTapePlayed) {
      return undefined;
    }
    let hideTimer;
    const showTimer = window.setTimeout(() => {
      setShowChat03(true);
      setTapeFollowupDim(true);
      hideTimer = window.setTimeout(() => {
        setTapeFollowupDim(false);
      }, TAPE_FOLLOWUP_SPOTLIGHT_MS);
    }, TAPE_FOLLOWUP_DIM_DELAY_MS);
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [isTapePlayed]);

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
      confettiBurstRef.current?.burst(event);
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
      <ConfettiBurst ref={confettiBurstRef} />
      <Header />
      <main className="page-shell home-page-shell">
        <div className="page-content">
          <section className="hero-box" aria-label="Home visual">
            <div className="hero-box__column">
              {chatIntroActive || tapeFollowupDim ? (
                <div
                  className="home-chat-intro-dim"
                  aria-hidden="true"
                />
              ) : null}
              <div
                className={`hero-box__chat-stack${chatIntroActive ? " hero-box__chat-stack--intro-focus" : ""}${tapeFollowupDim ? " hero-box__chat-stack--followup-focus" : ""}${showChat02 ? " is-chat-crossfade" : ""}${showChat03 ? " is-chat03-phase" : ""}`}
              >
                <img
                  className="hero-box__chat hero-box__chat--a"
                  src={CHAT_01_URL}
                  alt=""
                />
                <img
                  className="hero-box__chat hero-box__chat--b"
                  src={CHAT_02_URL}
                  alt=""
                />
                <img
                  className="hero-box__chat hero-box__chat--c"
                  src={CHAT_03_URL}
                  alt=""
                />
              </div>
              <div className="hero-box__box-row">
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
                <div
                  className={`hero-box__stack${isBoxShaking ? " is-shaking" : ""}`}
                  onAnimationEnd={() => setIsBoxShaking(false)}
                >
                  <img
                    className="hero-box__image"
                    src={BOX_IMAGE_URL}
                    alt=""
                    onClick={shakeBox}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default Home;
