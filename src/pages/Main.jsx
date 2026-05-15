import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";

const SECTION_IDS = ["about-me", "skills", "project", "gallery", "contact"];

function titleImageSrc(num) {
  return `${import.meta.env.BASE_URL}img/main/title/title_${String(num).padStart(2, "0")}.png`;
}

const BILL_IMAGE_URL = `${import.meta.env.BASE_URL}img/main/bill.png`;
const ICON_BASE_URL = `${import.meta.env.BASE_URL}img/main/icon/`;
const OPEN_KAKAO_URL = "https://open.kakao.com/o/s4Vnk1ui";
const SEC01_BASE_URL = `${import.meta.env.BASE_URL}img/main/sec01/`;

function sec01Image(file) {
  return `${SEC01_BASE_URL}${file}`;
}

const ABOUT_CARD_FRONT = sec01Image("B_f.png");
const ABOUT_CARD_BACK = sec01Image("B_b.png");
const FLIP_BTN_FRONT = sec01Image("flip_f.png");
const FLIP_BTN_BACK = sec01Image("flip_b.png");

/** About me — 오른쪽 2×2 작은 칸(pic_01~04), `href` 있으면 새 탭 링크 */
const ABOUT_GRID_SMALL_CELLS = [
  {
    id: "cell-1",
    src: sec01Image("pic_01.png"),
    href: "https://place.map.kakao.com/12644123",
  },
  {
    id: "cell-2",
    src: sec01Image("pic_02.png"),
    href: "https://www.youtube.com/watch?v=js1CtxSY38I",
  },
  {
    id: "cell-3",
    src: sec01Image("pic_03.png"),
    href: "https://place.map.kakao.com/254335483",
  },
  { id: "cell-4", src: sec01Image("pic_04.png") },
];
/** 아이콘별 문구 — `href`가 있으면 새 탭으로 열리는 링크입니다. */
const CONTACT_ROWS = [
  { file: "call.png", text: "010 - 6632 - 6480" },
  { file: "kakao.png", text: OPEN_KAKAO_URL, href: OPEN_KAKAO_URL },
  { file: "email.png", text: "hyunjuwork@outlook.com" },
];

function Main() {
  const location = useLocation();
  const contentRef = useRef(null);
  const sectionRefs = useRef([]);
  const activeSectionRef = useRef(0);
  const wheelLockRef = useRef(false);
  const [aboutCardFlipped, setAboutCardFlipped] = useState(false);
  const aboutCardFlipLockRef = useRef(false);

  function toggleAboutCard() {
    if (aboutCardFlipLockRef.current) {
      return;
    }

    aboutCardFlipLockRef.current = true;
    setAboutCardFlipped((flipped) => !flipped);
    window.setTimeout(() => {
      aboutCardFlipLockRef.current = false;
    }, 650);
  }

  useEffect(() => {
    const hash = location.hash.replace("#", "");

    if (!hash) {
      moveToSection(0, "auto");
      return;
    }

    const nextIndex = SECTION_IDS.indexOf(hash);

    if (nextIndex >= 0) {
      window.setTimeout(() => {
        moveToSection(nextIndex, "smooth");
      }, 0);
    }
  }, [location.hash]);

  function moveToSection(nextIndex, behavior = "smooth") {
    const container = contentRef.current;
    const nextSection = sectionRefs.current[nextIndex];

    if (!container || !nextSection) {
      return;
    }

    activeSectionRef.current = nextIndex;
    wheelLockRef.current = true;
    nextSection.scrollIntoView({ behavior, block: "start" });

    window.setTimeout(() => {
      wheelLockRef.current = false;
    }, 650);
  }

  function handleWheel(event) {
    if (wheelLockRef.current) {
      event.preventDefault();
      return;
    }

    const direction = Math.sign(event.deltaY);

    if (direction === 0) {
      return;
    }

    event.preventDefault();

    const nextIndex = Math.min(
      SECTION_IDS.length - 1,
      Math.max(0, activeSectionRef.current + direction),
    );

    if (nextIndex === activeSectionRef.current) {
      return;
    }

    moveToSection(nextIndex);
  }

  function handleScroll() {
    const container = contentRef.current;

    if (!container) {
      return;
    }

    const sectionHeight = container.clientHeight || 1;
    activeSectionRef.current = Math.round(container.scrollTop / sectionHeight);
  }

  return (
    <>
      <Header />
      <main className="page-shell main-page-shell">
        <div
          ref={contentRef}
          className="page-content"
          onWheel={handleWheel}
          onScroll={handleScroll}
        >
          {SECTION_IDS.map((id, index) => (
            <section
              key={id}
              id={id}
              ref={(element) => {
                sectionRefs.current[index] = element;
              }}
              className={`page-section${index === 0 ? " page-section--about" : ""}${index === 4 ? " page-section--bill" : ""}`}
            >
              {index === 0 ? (
                <div className="main-section__inner">
                  <img
                    className="main-section__title-img"
                    src={titleImageSrc(1)}
                    alt=""
                  />
                  <div
                    className="main-section__about-grid-box"
                    aria-label="About me gallery"
                  >
                    <div className="main-section__about-grid">
                      <div className="main-section__about-grid-cell main-section__about-grid-cell--featured">
                        <div
                          className={`main-section__profile-flip${aboutCardFlipped ? " is-flipped" : ""}`}
                        >
                          <div className="main-section__profile-flip-inner">
                            <div className="main-section__profile-flip-face main-section__profile-flip-face--front">
                              <img src={ABOUT_CARD_FRONT} alt="" />
                            </div>
                            <div className="main-section__profile-flip-face main-section__profile-flip-face--back">
                              <img src={ABOUT_CARD_BACK} alt="" />
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="main-section__profile-flip-btn"
                          aria-label={aboutCardFlipped ? "카드 앞면 보기" : "카드 뒷면 보기"}
                          onClick={toggleAboutCard}
                        >
                          <img
                            src={aboutCardFlipped ? FLIP_BTN_BACK : FLIP_BTN_FRONT}
                            alt=""
                          />
                        </button>
                      </div>
                      {ABOUT_GRID_SMALL_CELLS.map((cell) => (
                        <div
                          key={cell.id}
                          className={`main-section__about-grid-cell${cell.href ? " main-section__about-grid-cell--link" : ""}`}
                        >
                          {cell.href ? (
                            <a
                              className="main-section__about-grid-cell-link"
                              href={cell.href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img src={cell.src} alt="" />
                            </a>
                          ) : (
                            <img src={cell.src} alt="" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : index < 4 ? (
                <img
                  className="main-section__title-img"
                  src={titleImageSrc(index + 1)}
                  alt=""
                />
              ) : null}
              {index === 4 ? (
                <div className="main-section__bill-stack">
                  <img
                    className="main-section__bill-img"
                    src={BILL_IMAGE_URL}
                    alt=""
                  />
                  <div className="main-section__contact-rows">
                    {CONTACT_ROWS.map((row) => (
                      <div key={row.file} className="main-section__contact-row">
                        <img
                          className="main-section__contact-icon"
                          src={`${ICON_BASE_URL}${row.file}`}
                          alt=""
                        />
                        <p className="main-section__contact-text">
                          {row.href ? (
                            <a
                              className="main-section__contact-link"
                              href={row.href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {row.text}
                            </a>
                          ) : (
                            row.text
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </section>
          ))}
        </div>
      </main>
    </>
  );
}

export default Main;
