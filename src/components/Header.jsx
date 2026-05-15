import { useEffect, useId, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { href: "/main#about-me", label: "About me" },
  { href: "/main#skills", label: "Skills" },
  { href: "/main#project", label: "Project" },
  { href: "/main#gallery", label: "Gallery" },
  { href: "/main#contact", label: "Contact" },
];

const MENU_MQ = "(min-width: 1031px)";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuId = useId();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    const mq = window.matchMedia(MENU_MQ);
    const onChange = () => {
      if (mq.matches) {
        setMenuOpen(false);
      }
    };

    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  function toggleMenu() {
    setMenuOpen((open) => !open);
  }

  return (
    <header
      className={`site-header${menuOpen ? " site-header--menu-open" : ""}`}
    >
      {menuOpen ? (
        <button
          type="button"
          className="site-header__backdrop"
          aria-label="메뉴 닫기"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}
      <div className="site-header__inner">
        <Link className="site-header__brand" to="/home">
          현주의 포트폴리오
        </Link>
        <button
          type="button"
          className="site-header__menu-toggle"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={toggleMenu}
        >
          <span className="site-header__menu-toggle-label">
            {menuOpen ? "메뉴 닫기" : "메뉴 열기"}
          </span>
          <span className="site-header__menu-bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
        <nav id={menuId} aria-label="Primary" className="site-header__nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className="site-header__link"
              to={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
