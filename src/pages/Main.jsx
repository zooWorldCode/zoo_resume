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
const SEC04_BASE_URL = `${import.meta.env.BASE_URL}img/main/sec04/`;

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

function sec04Image(file) {
  return `${SEC04_BASE_URL}${file}`;
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

function renderProjectDescription(description) {
  if (!Array.isArray(description)) {
    return description;
  }

  return description.map((part, index) => {
    if (typeof part === "string") {
      return part;
    }

    return (
      <span
        key={`desc-part-${index}`}
        className={part.strong ? "project-sheet__desc-strong" : undefined}
      >
        {part.text}
      </span>
    );
  });
}

const SKILLS_WINDOW_SRC = sec02Image("window.png");

const PROJECT_BG_SRC = sec03Image("bg.png");
const PROJECT_PAPER_SRC = sec03Image("paper.png");
const PROJECT_LEFT_SRC = sec03Image("left.png");
const PROJECT_PASTE_SRC = sec03Image("paste.png");
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
      type: "팀 프로젝트 (3명)",
      duty: (<>
        디자인 90%
        <br />
        개발 30%
      </>
    ),
    },
    description: [
      "팀원들과 ",
      { text: "협업", strong: true },
      "하여 만든 ",
      "음악 스트리밍 앱 프로젝트. 혼자 작업했을때보다 더 즐거웠고 ",
      { text: "효율", strong: true },
      "이 좋았다. 개인적으로 부족했던 코딩 스킬을 팀원에게 ",
      { text: "도움", strong: true },
      " 받았다. 더불어 팀원들에게 부족했던 디자인과 아이디어를 내가 채워주면서 아주 만족스러운 결과물이 탄생하였다. ",
      { text: "프론트", strong: true },
      "는 vue, ",
      { text: "백엔드", strong: true },
      "는 php로 작업하였다. github을 사용하여 서로의 작업을 즉시 ",
      { text: "피드백", strong: true },
      " & 수집 하였다. MySQLi를 활용하여 ",
      { text: "데이터베이스", strong: true },
      "를 관리하였다. 영상정보, 댓글, 사용자 정보를 한눈에 확인할 수 있어 매우 ",
      { text: "편리", strong: true },
      "했다.",
    ],
    techStack: projectTechStack([1, 2, 3, 6, 9, 12, 15, 16]),
    leftImage: "mute.png",
    linkWindow: {
      width: 500,
    },
    planLink: {
      id: "mute-plan",
      label: "기획안",
      href: "https://www.figma.com/deck/WIubBLJCoGbb01wvjxLkUl",
    },
    testAccount: {
      email: "test@test.com",
      password: "test1234",
    },
    links: [
      { id: "mute-login",    label: "로그인",                   href: "https://thewebtest.dothome.co.kr/" },
      { id: "mute-signup",   label: "회원가입",                 href: "https://thewebtest.dothome.co.kr/signup" },
      { id: "mute-loading",  label: "로딩",                 href: "https://thewebtest.dothome.co.kr/welcome" },
      { id: "mute-artist",   label: "아티스트 선택",        href: "https://thewebtest.dothome.co.kr/artist-select" },
      { id: "mute-info",     label: "사용자 정보",        href: "https://thewebtest.dothome.co.kr/signup-info" },
      { id: "mute-main",     label: "메인",                    href: "https://thewebtest.dothome.co.kr/main" },
      { id: "mute-player",   label: "플레이어",                  href: "https://thewebtest.dothome.co.kr/main/player/0" },
      { id: "mute-recent",   label: "최근 재생 곡",         href: "https://thewebtest.dothome.co.kr/main/playlist" },
      { id: "mute-library",  label: "보관함",                 href: "https://thewebtest.dothome.co.kr/main/library" },
      { id: "mute-chart",    label: "차트",                   href: "https://thewebtest.dothome.co.kr/main/chart" },
      { id: "mute-ainfo",    label: "아티스트 정보",             href: "https://thewebtest.dothome.co.kr/main/artist-info" },
      { id: "mute-video",    label: "비디오",                   href: "https://thewebtest.dothome.co.kr/main/video-detail/1" },
      { id: "mute-mypage",   label: "마이 페이지",                 href: "https://thewebtest.dothome.co.kr/main/mypage" },
      { id: "mute-ticket",   label: "이용권 관리", href: "https://thewebtest.dothome.co.kr/main/ticket" },
      { id: "mute-ai",       label: "AI 질문",             href: "https://thewebtest.dothome.co.kr/main/ai" },
      { id: "mute-search",   label: "검색",                  href: "https://thewebtest.dothome.co.kr/main/search" },
      { id: "mute-result",   label: "검색 결과",           href: "https://thewebtest.dothome.co.kr/main/search-result?term=%EC%95%84%EC%9D%B4%EC%9C%A0" },
    ],
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
    description: [
      "코딩에 어느정도 손에 익은 뒤 ",
      { text: "AI", strong: true },
      " (cursor)를 활용하여 만든",
      { text: "반응형", strong: true },
      " 쇼핑몰 웹사이트. 덕분에 혼자서도 ",
      { text: "짧은 시간", strong: true },
      "안에 많은 기능을 구현할수 있었다. key 컬러로 연한 주황빛 ",
      { text: "테라코타", strong: true },
      " 색을 선택했다. 도자기의 부드럽고 ",
      { text: "곡선", strong: true },
      "적인 형태를 웹사이트에서 느낄수 있게 하였다. ",
      { text: "프론트", strong: true },
      "는 react, ",
      { text: "백엔드", strong: true },
      "는 express로 작업하였고 mongodb를 활용해 상품정보와 사용자 정보를 관리하였다. 회원가입한 정보가 mongodb에 저장되는 것을 확인하면서 ",
      { text: "데이터베이스", strong: true },
      " 관리에 대한 ",
      { text: "흥미", strong: true },
      "가 생겼다.",
    ],
    techStack: projectTechStack([1, 2, 3, 7, 10, 11, 15]),
    testAccount: {
      email: "test@test.com",
      password: "123456",
    },
    links: [
      { id: "mul-main",    label: "메인",           href: "https://mulgyeol-lac.vercel.app/" },
      { id: "mul-cat",     label: "카테고리",       href: "https://mulgyeol-lac.vercel.app/category?category=plate&sort=all&page=1" },
      { id: "mul-product", label: "상품 상세", href: "https://mulgyeol-lac.vercel.app/product/69eacd28ebd87ecfbc5bf946" },
      { id: "mul-event",   label: "이벤트",          href: "https://mulgyeol-lac.vercel.app/event" },
      { id: "mul-comm",    label: "커뮤니티",      href: "https://mulgyeol-lac.vercel.app/community" },
      { id: "mul-blog",    label: "블로그",           href: "https://mulgyeol-lac.vercel.app/community/post-1" },
      { id: "mul-login",   label: "로그인",          href: "https://mulgyeol-lac.vercel.app/login" },
      { id: "mul-signup",  label: "회원가입",        href: "https://mulgyeol-lac.vercel.app/signup?redirect=%2F" },
      { id: "mul-mypage",  label: "마이 페이지",        href: "https://mulgyeol-lac.vercel.app/mypage" },
      { id: "mul-wish",    label: "위시리스트",       href: "https://mulgyeol-lac.vercel.app/wishlist" },
      { id: "mul-cart",    label: "장바구니",           href: "https://mulgyeol-lac.vercel.app/cart" },
    ],
    leftImage: "mul.png",
    leftHotspots: [
      {
        id: "mul-pc-preview",
        label: "물결 PC 미리보기",
        href: "https://mulgyeol-lac.vercel.app/",
        rect: { left: 0, top: 0, width: 100, height: 48 },
      },
      {
        id: "mul-tablet-preview",
        label: "물결 태블릿 미리보기",
        href: "https://mulgyeol-lac.vercel.app/",
        popupWidth: 940,
        rect: { left: 0, top: 50, width: 55, height: 50 },
      },
      {
        id: "mul-mobile-preview",
        label: "물결 모바일 미리보기",
        href: "https://mulgyeol-lac.vercel.app/",
        popupWidth: 390,
        rect: { left: 58, top: 50, width: 42, height: 50 },
      },
    ],
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
    description: [
      "코딩 배우기 ",
      { text: "처음", strong: true },
      " 만들어 본 웹사이트. 평소 좋아하던 빵집인 ",
      { text: "성심당", strong: true },
      " 웹사이트를 리뉴얼 하였다. 코딩을 배운 지 ",
      { text: "한 달", strong: true },
      "만에 만들었기 때문에 ",
      { text: "미숙", strong: true },
      "한 부분이 많다. 해당 프로젝트를 진행하면서 프론트엔드 코드에 더 ",
      { text: "빠져들게", strong: true },
      " 되었다. 덕분에 다음 프로젝트에 더 ",
      { text: "열정", strong: true },
      "을 가질 수 있었다.",
    ],
    techStack: projectTechStack([1, 2, 3]),
    links: [
      { id: "link-main", label: "메인", href: "https://zooworldcode.github.io/sungsimdang/" },
      { id: "link-report", label: "불편 접수", href: "https://zooworldcode.github.io/sungsimdang/AS_page.html" },
    ],
    leftImage: "sungsim.png",
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

const SKILLS_KEY_TEXTS = [
  "CSS 95%",
  "HTML 95%",
  "JavaScript 95%",
  "jQuery 90%",
  "Node.js 85%",
  "VUE 85%",
  "React 90%",
  "Next.js 80%",
  "PHP 85%",
  "MongoDB 95%",
  "Vercel 95%",
  "Github 95%",
  "Photoshop 100%",
  "Illustrator 100%",
  "Figma 95%",
  "MySQL 90%",
];

const SKILLS_KEY_CELLS = Array.from({ length: 16 }, (_, index) => {
  const num = String(index + 1).padStart(2, "0");
  const text = SKILLS_KEY_TEXTS[index];
  const lastSpace = text.lastIndexOf(" ");
  return {
    id: `key-${num}`,
    src: sec02Image(`key_${num}.png`),
    text,
    skillName: lastSpace >= 0 ? text.slice(0, lastSpace) : text,
    pct: lastSpace >= 0 ? (parseInt(text.slice(lastSpace + 1), 10) || 0) : 0,
  };
});

const PROFILE_ITEMS = [
  { id: "pro-1", label: "이름", value: "노현주" },
  { id: "pro-2", label: "생년월일", value: "2000.07.06" },
  { id: "pro-3", label: "희망 직군", value: "웹디자이너, 웹퍼블리셔" },
];

const LICENSE_ITEMS = [
  { id: "lic-1", date: "2019.11", name: "CAD 실무능력평가 2급" },
  { id: "lic-2", date: "2021.03", name: "GTQ 포토샵 1급" },
  { id: "lic-3", date: "2021.03", name: "GTQ 일러스트 1급" },
  { id: "lic-4", date: "2023.11", name: "바리스타 자격증 2급" },
  { id: "lic-5", date: "2025.09", name: "컬러리스트 산업기사" },
];

const EDUCATION_ITEMS = [
  { id: "edu-1", date: "2021.02", name: "인하공업전문대학교\n 산업디자인과 (졸업)" },
  { id: "edu-2", date: "2026.06", name: "생성형 AI 활용 UX·UI 디자인 & 프론트엔드 개발과정 (ChatGPT, 일러, 포토, 피그마, 자바스크립트, 리액트)-3차(1014시간)(수료)", small: true },
];

const GALLERY_ITEMS = Array.from({ length: 10 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  return {
    id: `gallery-${num}`,
    src: sec04Image(`pic_${num}.jpg`),
    desc: `작품 ${i + 1}`,
  };
});

const ABOUT_BG_SRC = sec01Image("bg.png");
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
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [aboutCardFlipped, setAboutCardFlipped] = useState(false);
  const aboutCardFlipLockRef = useRef(false);
  const [activeProjectIndexId, setActiveProjectIndexId] = useState(
    PROJECT_PAGES[0].id,
  );
  const activeProjectPage = getProjectPage(activeProjectIndexId);
  const [revealedSkillKeyIds, setRevealedSkillKeyIds] = useState(() => new Set());
  const [closingSkillKeyIds, setClosingSkillKeyIds] = useState(() => new Set());
  const skillKeyTimersRef = useRef({});
  const skillKeyExitTimersRef = useRef({});
  const [descExpanded, setDescExpanded] = useState(false);
  const [descOverflows, setDescOverflows] = useState(false);
  const [testAccountOpen, setTestAccountOpen] = useState(false);
  const descRef = useRef(null);
  const testAccountTimerRef = useRef(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  function handleProjectIndexClick(tabId) {
    setActiveProjectIndexId(tabId);
  }

  function prevGallery() {
    setGalleryIndex((i) => (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  }

  function nextGallery() {
    setGalleryIndex((i) => (i + 1) % GALLERY_ITEMS.length);
  }

  function startCloseSkillKey(keyId) {
    setClosingSkillKeyIds((ids) => {
      const next = new Set(ids);
      next.add(keyId);
      return next;
    });
    clearTimeout(skillKeyExitTimersRef.current[keyId]);
    skillKeyExitTimersRef.current[keyId] = setTimeout(() => {
      setRevealedSkillKeyIds((ids) => {
        const next = new Set(ids);
        next.delete(keyId);
        return next;
      });
      setClosingSkillKeyIds((ids) => {
        const next = new Set(ids);
        next.delete(keyId);
        return next;
      });
      delete skillKeyExitTimersRef.current[keyId];
    }, 500);
  }

  function toggleSkillKey(keyId) {
    if (revealedSkillKeyIds.has(keyId)) {
      clearTimeout(skillKeyTimersRef.current[keyId]);
      delete skillKeyTimersRef.current[keyId];
      startCloseSkillKey(keyId);
    } else if (!closingSkillKeyIds.has(keyId)) {
      setRevealedSkillKeyIds((ids) => new Set([...ids, keyId]));
      clearTimeout(skillKeyTimersRef.current[keyId]);
      skillKeyTimersRef.current[keyId] = setTimeout(() => {
        startCloseSkillKey(keyId);
        delete skillKeyTimersRef.current[keyId];
      }, 3000);
    }
  }

  async function copyProjectAccountValue(value) {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Clipboard permissions can be blocked on non-secure previews.
    }
  }

  function toggleTestAccount() {
    setTestAccountOpen((open) => !open);
  }

  function openProjectLink(link, event) {
    const popupWidth = link.popupWidth ?? activeProjectPage.linkWindow?.width;

    if (!popupWidth) {
      return;
    }

    event.preventDefault();

    const width = popupWidth;
    const height = window.screen.availHeight || window.innerHeight;
    const left = Math.max(0, Math.round((window.screen.availWidth - width) / 2));
    const features = [
      `width=${width}`,
      `height=${height}`,
      `left=${left}`,
      "top=0",
      "resizable=yes",
      "scrollbars=yes",
      "noopener",
    ].join(",");

    window.open(link.href, link.id, features);
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
    const autoTimers = skillKeyTimersRef.current;
    const exitTimers = skillKeyExitTimersRef.current;
    return () => {
      Object.values(autoTimers).forEach(clearTimeout);
      Object.values(exitTimers).forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    setDescExpanded(false);
    setDescOverflows(false);
    setTestAccountOpen(false);
    const timer = setTimeout(() => {
      const el = descRef.current;
      if (el) {
        setDescOverflows(el.scrollHeight > el.clientHeight + 1);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [activeProjectIndexId]);

  useEffect(() => {
    if (testAccountTimerRef.current) {
      clearTimeout(testAccountTimerRef.current);
      testAccountTimerRef.current = null;
    }

    if (testAccountOpen) {
      testAccountTimerRef.current = setTimeout(() => {
        setTestAccountOpen(false);
      }, 10000);
    }

    return () => {
      if (testAccountTimerRef.current) {
        clearTimeout(testAccountTimerRef.current);
        testAccountTimerRef.current = null;
      }
    };
  }, [testAccountOpen, activeProjectIndexId]);

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
    setActiveSectionIndex(nextIndex);
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
      <Header activeSectionIndex={activeSectionIndex} />
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
              className={`page-section${index === 0 ? " page-section--about" : ""}${index === 1 ? " page-section--skills" : ""}${index === 2 ? " page-section--project" : ""}${index === 3 ? " page-section--gallery" : ""}${index === 4 ? " page-section--bill" : ""}`}
            >
              {index === 0 ? (
                <div className="main-section__inner">
                  <img
                    className="main-section__title-img"
                    src={titleImageSrc(1)}
                    alt=""
                  />
                  <div className="main-section__about-bg-wrap">
                    <img
                      className="main-section__about-bg"
                      src={ABOUT_BG_SRC}
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
                        <div className="skills-memos" aria-label="자격증 및 학력">
                          <div className="skills-memo skills-memo--profile">
                            <div className="skills-memo__header">Profile</div>
                            <ul className="skills-memo__list">
                              {PROFILE_ITEMS.map((item) => (
                                <li key={item.id} className="skills-memo__item">
                                  <span className="skills-memo__date">{item.label}</span>
                                  <span className="skills-memo__name">{item.value}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="skills-memo skills-memo--education">
                            <div className="skills-memo__header">Education</div>
                            <ul className="skills-memo__list">
                              {EDUCATION_ITEMS.map((item) => (
                                <li key={item.id} className="skills-memo__item">
                                  <span className="skills-memo__date">{item.date}</span>
                                  <span className="skills-memo__name">{item.name}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="skills-memo skills-memo--license">
                            <div className="skills-memo__header">License</div>
                            <ul className="skills-memo__list">
                              {LICENSE_ITEMS.map((item) => (
                                <li key={item.id} className="skills-memo__item">
                                  <span className="skills-memo__date">{item.date}</span>
                                  <span className={`skills-memo__name${item.small ? " skills-memo__name--small" : ""}`}>{item.name}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="main-section__skills-keys-box">
                        <div className="main-section__skills-keys">
                        {SKILLS_KEY_CELLS.map((cell) => {
                          const isRevealed = revealedSkillKeyIds.has(cell.id);
                          const isClosing = closingSkillKeyIds.has(cell.id);

                          return (
                          <button
                            key={cell.id}
                            type="button"
                            className={`main-section__skills-key${isRevealed ? " is-revealed" : ""}`}
                            aria-label={`Skill key ${cell.id.replace("key-", "")}`}
                            aria-pressed={isRevealed}
                            onClick={() => toggleSkillKey(cell.id)}
                          >
                            <div className="main-section__skills-key-media">
                              <img src={cell.src} alt="" />
                              {isRevealed && (
                                <span
                                  className={`main-section__skills-key-water-wrap${isClosing ? " is-closing" : ""}`}
                                  style={{
                                    '--water-target': `${cell.pct}%`,
                                    WebkitMaskImage: `url(${cell.src})`,
                                    maskImage: `url(${cell.src})`,
                                  }}
                                >
                                  <span className="main-section__skills-key-water" aria-hidden="true" />
                                  <span className="main-section__skills-key-name">{cell.skillName}</span>
                                  <span className="main-section__skills-key-pct">{cell.pct}%</span>
                                </span>
                              )}
                            </div>
                          </button>
                          );
                        })}
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
                          <div className="main-section__project-paper-grid">
                            <div className="main-section__project-paper-half main-section__project-paper-half--left">
                              {activeProjectPage.leftImage && activeProjectPage.leftHotspots ? (
                                <div className="main-section__project-left-preview">
                                  <img
                                    src={sec03Image(activeProjectPage.leftImage)}
                                    alt=""
                                    width={PROJECT_LEFT_WIDTH}
                                    height={PROJECT_LEFT_HEIGHT}
                                  />
                                  {activeProjectPage.leftHotspots.map((hotspot) => (
                                    <a
                                      key={hotspot.id}
                                      className="main-section__project-left-hotspot"
                                      href={hotspot.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      aria-label={hotspot.label}
                                      style={{
                                        "--hotspot-left": `${hotspot.rect.left}%`,
                                        "--hotspot-top": `${hotspot.rect.top}%`,
                                        "--hotspot-width": `${hotspot.rect.width}%`,
                                        "--hotspot-height": `${hotspot.rect.height}%`,
                                      }}
                                      onClick={(event) => openProjectLink(hotspot, event)}
                                    />
                                  ))}
                                </div>
                              ) : activeProjectPage.leftImage && activeProjectPage.links?.[0]?.href ? (
                                <a
                                  href={activeProjectPage.links[0].href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(event) => openProjectLink(activeProjectPage.links[0], event)}
                                >
                                  <img
                                    src={sec03Image(activeProjectPage.leftImage)}
                                    alt=""
                                    width={PROJECT_LEFT_WIDTH}
                                    height={PROJECT_LEFT_HEIGHT}
                                  />
                                </a>
                              ) : activeProjectPage.leftImage ? (
                                <img
                                  src={sec03Image(activeProjectPage.leftImage)}
                                  alt=""
                                  width={PROJECT_LEFT_WIDTH}
                                  height={PROJECT_LEFT_HEIGHT}
                                />
                              ) : (
                                <img
                                  src={PROJECT_LEFT_SRC}
                                  alt=""
                                  width={PROJECT_LEFT_WIDTH}
                                  height={PROJECT_LEFT_HEIGHT}
                                />
                              )}
                            </div>
                            <div className="main-section__project-paper-half main-section__project-paper-half--right">
                              <article
                                key={activeProjectPage.id}
                                className="project-sheet"
                              >
                                <div className={`project-sheet__body${descExpanded ? " desc-is-expanded" : ""}`}>
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
                                  <div className="project-sheet__desc-box">
                                  <p
                                    ref={descRef}
                                    className={`project-sheet__desc${descExpanded ? " is-expanded" : ""}`}
                                  >
                                    {renderProjectDescription(activeProjectPage.description)}
                                  </p>
                                  {(descOverflows || descExpanded) && (
                                    <button
                                      type="button"
                                      className="project-sheet__desc-toggle"
                                      onClick={() => setDescExpanded((v) => !v)}
                                    >
                                      {descExpanded ? "접기" : "더보기"}
                                    </button>
                                  )}
                                  </div>
                                  {activeProjectPage.links ? (
                                    <ul className="project-sheet__links">
                                      {activeProjectPage.links.map((link) => (
                                        <li key={link.id}>
                                          <a
                                            className="project-sheet__link-btn"
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(event) => openProjectLink(link, event)}
                                          >
                                            {link.label}
                                          </a>
                                        </li>
                                      ))}
                                      {activeProjectPage.planLink && (
                                        <li>
                                          <a
                                            className="project-sheet__link-btn project-sheet__link-btn--plan"
                                            href={activeProjectPage.planLink.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            {activeProjectPage.planLink.label}
                                          </a>
                                        </li>
                                      )}
                                      {activeProjectPage.testAccount && (
                                        <li className="project-sheet__account">
                                          <button
                                            type="button"
                                            className="project-sheet__link-btn project-sheet__link-btn--account"
                                            aria-expanded={testAccountOpen}
                                            onClick={toggleTestAccount}
                                          >
                                            테스트 계정
                                          </button>
                                          {testAccountOpen && (
                                            <div className="project-sheet__account-panel">
                                              <strong>테스트 계정</strong>
                                              <div className="project-sheet__account-row">
                                                <span>이메일: {activeProjectPage.testAccount.email}</span>
                                                <button
                                                  type="button"
                                                  className="project-sheet__copy-btn"
                                                  aria-label="테스트 계정 이메일 복사"
                                                  onClick={() => copyProjectAccountValue(activeProjectPage.testAccount.email)}
                                                >
                                                  <img
                                                    className="project-sheet__copy-icon"
                                                    src={PROJECT_PASTE_SRC}
                                                    alt=""
                                                  />
                                                </button>
                                              </div>
                                              <div className="project-sheet__account-row">
                                                <span>비번: {activeProjectPage.testAccount.password}</span>
                                                <button
                                                  type="button"
                                                  className="project-sheet__copy-btn"
                                                  aria-label="테스트 계정 비밀번호 복사"
                                                  onClick={() => copyProjectAccountValue(activeProjectPage.testAccount.password)}
                                                >
                                                  <img
                                                    className="project-sheet__copy-icon"
                                                    src={PROJECT_PASTE_SRC}
                                                    alt=""
                                                  />
                                                </button>
                                              </div>
                                            </div>
                                          )}
                                        </li>
                                      )}
                                    </ul>
                                  ) : (
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
                                  )}
                                </div>
                              </article>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              ) : index === 3 ? (
                <div className="main-section__inner">
                  <img
                    className="main-section__title-img"
                    src={titleImageSrc(4)}
                    alt=""
                  />
                  <div className="gallery-carousel" aria-label="개인 작품 갤러리">
                    <div className="gallery-carousel__stage">
                      <button
                        type="button"
                        className="gallery-carousel__arrow"
                        aria-label="이전 작품"
                        onClick={prevGallery}
                      >
                        ‹
                      </button>
                      <div className="gallery-carousel__viewport">
                        <div
                          className="gallery-carousel__track"
                          style={{ transform: `translateX(-${galleryIndex * 100}%)` }}
                        >
                          {GALLERY_ITEMS.map((item) => (
                            <div key={item.id} className="gallery-carousel__slide">
                              <div className="gallery-carousel__photo">
                                <img src={item.src} alt="" />
                              </div>
                              <p className="gallery-carousel__desc">{item.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="gallery-carousel__arrow"
                        aria-label="다음 작품"
                        onClick={nextGallery}
                      >
                        ›
                      </button>
                    </div>
                    <div className="gallery-carousel__dots">
                      {GALLERY_ITEMS.map((item, i) => (
                        <button
                          key={item.id}
                          type="button"
                          className={`gallery-carousel__dot${i === galleryIndex ? " is-active" : ""}`}
                          aria-label={`작품 ${i + 1}`}
                          onClick={() => setGalleryIndex(i)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
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
