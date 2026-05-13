import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header";

const sections = [
  {
    id: "about-me",
    eyebrow: "Section 01",
    title: "About me",
    description: "Introduce your vibe, story, and the world behind this resume.",
  },
  {
    id: "skills",
    eyebrow: "Section 02",
    title: "Skills",
    description: "Show the tools, strengths, and workflows you want to highlight.",
  },
  {
    id: "project",
    eyebrow: "Section 03",
    title: "Project",
    description: "Spotlight key projects with visuals, outcomes, and your role.",
  },
  {
    id: "gallery",
    eyebrow: "Section 04",
    title: "Gallery",
    description: "Use this area for screenshots, artwork, experiments, or mood cuts.",
  },
  {
    id: "contact",
    eyebrow: "Section 05",
    title: "Contact",
    description: "Finish with the best way to reach you or explore your work.",
  },
];

function Main() {
  const location = useLocation();
  const contentRef = useRef(null);
  const sectionRefs = useRef([]);
  const activeSectionRef = useRef(0);
  const wheelLockRef = useRef(false);

  useEffect(() => {
    const hash = location.hash.replace("#", "");

    if (!hash) {
      moveToSection(0, "auto");
      return;
    }

    const nextIndex = sections.findIndex((section) => section.id === hash);

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
      sections.length - 1,
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
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              ref={(element) => {
                sectionRefs.current[index] = element;
              }}
              className="page-section"
            >
              <div className="page-section__panel">
                <p className="page-eyebrow">{section.eyebrow}</p>
                <h1>{section.title}</h1>
                <p className="page-copy">{section.description}</p>
                {index === sections.length - 1 ? (
                  <div className="page-actions">
                    <Link className="page-button" to="/home">
                      Back to Home
                    </Link>
                  </div>
                ) : null}
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}

export default Main;
