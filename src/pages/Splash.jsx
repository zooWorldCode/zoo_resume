import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const FRAME_COUNT = 5;
const FPS = 12;
const FRAME_INTERVAL_MS = Math.round(1000 / FPS);
const FRAME_BASE_URL = `${import.meta.env.BASE_URL}img/splash/run_0000_`;
const HELLO_IMAGE_URL = `${import.meta.env.BASE_URL}img/splash/hello.png`;

function frameSrc(index) {
  return `${FRAME_BASE_URL}${String(index).padStart(2, "0")}.png`;
}

function Splash() {
  const imgRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    for (let i = 0; i < FRAME_COUNT; i += 1) {
      const img = new Image();
      img.src = frameSrc(i);
    }

    let frame = 0;
    const intervalId = window.setInterval(() => {
      frame = (frame + 1) % FRAME_COUNT;
      if (imgRef.current) {
        imgRef.current.src = frameSrc(frame);
      }
    }, FRAME_INTERVAL_MS);

    const timeoutId = window.setTimeout(() => {
      navigate("/home");
    }, 2000);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, [navigate]);

  return (
    <div className="splash-page">
      <div className="splash-page__inner">
        <img
          ref={imgRef}
          className="splash-page__runner"
          src={frameSrc(0)}
          alt="Splash animation"
          draggable={false}
        />
        <img
          className="splash-page__hello"
          src={HELLO_IMAGE_URL}
          alt=""
          draggable={false}
        />
      </div>
    </div>
  );
}

export default Splash;
