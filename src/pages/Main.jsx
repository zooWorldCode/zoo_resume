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
const SEC02_BASE_URL = `${import.meta.env.BASE_URL}img/main/sec02/`;
const SEC03_BASE_URL = `${import.meta.env.BASE_URL}img/main/sec03/`;

function sec01Image(file) {
  return `${SEC01_BASE_URL}${file}`;
}

function sec02Image(file) {
  return `${SEC02_BASE_URL}${file}`;
}

function sec03Image(file) {
  return `${SEC03_BASE_URL}${file}`;
}

function sec03IndexImage(file) {
  return `${SEC03_BASE_URL}index/${file}`;
}

function projectTechStack(keyNums) {
  return keyNums.map((num) => {
    const keyId = String(num).padStart(2, "0");
    return {
      id: `key-${keyId}`,
      label: "",
      src: sec02Image(`key_${keyId}.png`),
    };
  });
}

const SKILLS_WINDOW_SRC = sec02Image("window.png");

const PROJECT_BG_SRC = sec03Image("bg.png");
const PROJECT_PAPER_SRC = sec03Image("paper.png");
const PROJECT_LEFT_SRC = sec03Image("left.png");
const PROJECT_BG_WIDTH = 4352;
const PROJECT_BG_HEIGHT = 2672;
const PROJECT_PAPER_WIDTH = 4284;
const PROJECT_PAPER_HEIGHT = 2644;
const PROJECT_LEFT_WIDTH = 1704;
const PROJECT_LEFT_HEIGHT = 2435;

const PROJECT_SHEET_LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const PROJECT_PILL_COUNT = 10;

const PROJECT_META_ROWS = [
  { key: "type", label: "구분" },
  { key: "role", label: "역할" },
  { key: "period", label: "기간" },
  { key: "duty", label: "담당" },
];

const PROJECT_PAGES = [
  {
    id: "P-index-01",
    title: "한자하루",
    meta: {
      role: "기획 · 디자인 · 개발",
      period: "3주",
      type: "개인 프로젝트",
      duty: "모든 것",
    },
    description: PROJECT_SHEET_LOREM,
    techStack: Array.from({ length: 9 }, (_, index) => ({
      id: `p1-tech-${index + 1}`,
      label: "",
    })),
  },
  {
    id: "P-index-02",
    title: "뮤트 (Mute)",
    meta: {
      role: "디자인",
      period: "3주",
      type: "팀 프로젝트",
      duty: "디자인 90%, 개발 30%",
    },
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    techStack: projectTechStack([1, 2, 3, 6, 9, 12, 15]),
  },
  {
    id: "P-index-03",
    title: "물결",
    meta: {
      role: "기획 · 디자인 · 개발",
      period: "3주",
      type: "개인 프로젝트",
      duty: "모든 것",
    },
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    techStack: projectTechStack([1, 2, 3, 7, 10, 11, 15, 16]),
  },
  {
    id: "P-index-04",
    title: "성심당",
    meta: {
      role: "디자인 · 개발",
      period: "3주",
      type: "개인 프로젝트",
      duty: "모든 것",
    },
    description:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    techStack: projectTechStack([1, 2, 3]),
  },
];

const PROJECT_INDEX_TABS = Array.from({ length: 4 }, (_, index) => {
  const num = String(index + 1).padStart(2, "0");
  return {
    id: `P-index-${num}`,
    src: sec03IndexImage(`P_index_${num}.png`),
    srcActive: sec03Image(`1/P_index_b_${num}.png`),
    srcInactive: sec03Image(`1/P_index_w_${num}.png`),
  };
});

function getProjectPage(activeId) {
  return (
    PROJECT_PAGES.find((page) => page.id === activeId) ?? PROJECT_PAGES[0]
  );
}

const SKILLS_KEY_CELLS = Array.from({ length: 16 }, (_, index) => {
  const num = String(index + 1).padStart(2, "0");
  return {
    id: `key-${num}`,
    src: sec02Image(`key_${num}.png`),
  };
});

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
  const [activeProjectIndexId, setActiveProjectIndexId] = useState(
    PROJECT_PAGES[0].id,
  );
  const activeProjectPage = getProjectPage(activeProjectIndexId);

  function handleProjectIndexClick(tabId) {
    setActiveProjectIndexId(tabId);
  }

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
              className={`page-section${index === 0 ? " page-section--about" : ""}${index === 1 ? " page-section--skills" : ""}${index === 2 ? " page-section--project" : ""}${index === 4 ? " page-section--bill" : ""}`}
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
              ) : index === 1 ? (
                <div className="main-section__inner">
                  <img
                    className="main-section__title-img"
                    src={titleImageSrc(2)}
                    alt=""
                  />
                  <div
                    className="main-section__skills-grid-box"
                    aria-label="Skills gallery"
                  >
                    <div className="main-section__skills-grid">
                      <div className="main-section__skills-grid-cell main-section__skills-grid-cell--window">
                        <img
                          src={SKILLS_WINDOW_SRC}
                          alt=""
                          width={1080}
                          height={400}
                        />
                      </div>
                      <div className="main-section__skills-keys-box">
                        <div className="main-section__skills-keys">
                        {SKILLS_KEY_CELLS.map((cell) => (
                          <button
                            key={cell.id}
                            type="button"
                            className="main-section__skills-key"
                            aria-label={`Skill key ${cell.id.replace("key-", "")}`}
                          >
                            <div className="main-section__skills-key-media">
                              <img src={cell.src} alt="" />
                            </div>
                          </button>
                        ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : index === 2 ? (
                <div className="main-section__inner">
                  <img
                    className="main-section__title-img"
                    src={titleImageSrc(3)}
                    alt=""
                  />
                  <div
                    className="main-section__project-stage"
                    aria-label="Project gallery"
                  >
                    <img
                      className="main-section__project-bg"
                      src={PROJECT_BG_SRC}
                      alt=""
                      width={PROJECT_BG_WIDTH}
                      height={PROJECT_BG_HEIGHT}
                    />
                    <div
                      className="main-section__project-indexes"
                      aria-label="Project index tabs"
                    >
                      {PROJECT_INDEX_TABS.map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          className={`main-section__project-index${activeProjectIndexId === tab.id ? " is-active" : ""}`}
                          aria-label={`Project index ${tab.id.replace("P-index-", "")}`}
                          aria-pressed={activeProjectIndexId === tab.id}
                          onClick={() => handleProjectIndexClick(tab.id)}
                        >
                          <img src={tab.src} alt="" />
                        </button>
                      ))}
                    </div>
                    <div className="main-section__project-paper-wrap">
                      <div className="main-section__project-paper-frame">
                          <img
                            className="main-section__project-paper-img"
                            src={PROJECT_PAPER_SRC}
                            alt=""
                            width={PROJECT_PAPER_WIDTH}
                            height={PROJECT_PAPER_HEIGHT}
                          />
                          <div className="main-section__project-paper-content">
                            <div className="main-section__project-paper-half main-section__project-paper-half--left">
                              <img
                                src={PROJECT_LEFT_SRC}
                                alt=""
                                width={PROJECT_LEFT_WIDTH}
                                height={PROJECT_LEFT_HEIGHT}
                              />
                            </div>
                            <div className="main-section__project-paper-half main-section__project-paper-half--right">
                              <article
                                key={activeProjectPage.id}
                                className="project-sheet"
                              >
                                <div className="project-sheet__body">
                                  <h3 className="project-sheet__title">
                                    {activeProjectPage.title}
                                  </h3>
                                  <div className="project-sheet__top">
                                    <table className="project-sheet__meta-table">
                                      <tbody>
                                        {PROJECT_META_ROWS.map((row) => (
                                          <tr key={row.key}>
                                            <th scope="row">{row.label}</th>
                                            <td>
                                              {activeProjectPage.meta[row.key]}
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                    <div className="project-sheet__tech">
                                      <p className="project-sheet__tech-title">
                                        사용한 기술
                                      </p>
                                      <ul
                                        className="project-sheet__tech-grid"
                                        aria-label="사용한 기술"
                                      >
                                        {activeProjectPage.techStack.map((tech) => (
                                          <li key={tech.id}>
                                            {tech.src ? (
                                              <img
                                                src={tech.src}
                                                alt={tech.label}
                                              />
                                            ) : (
                                              <span aria-hidden="true" />
                                            )}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                  <p className="project-sheet__desc">
                                    {activeProjectPage.description}
                                  </p>
                                  <ul
                                    className="project-sheet__pills"
                                    aria-hidden="true"
                                  >
                                    {Array.from(
                                      { length: PROJECT_PILL_COUNT },
                                      (_, pillIndex) => (
                                        <li key={`pill-${pillIndex}`}>
                                          <span />
                                        </li>
                                      ),
                                    )}
                                  </ul>
                                </div>
                              </article>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              ) : index === 3 ? (
                <img
                  className="main-section__title-img"
                  src={titleImageSrc(4)}
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
