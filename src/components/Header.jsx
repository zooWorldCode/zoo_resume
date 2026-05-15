import { Link } from "react-router-dom";

const navItems = [
  { href: "/main#about-me", label: "About me" },
  { href: "/main#skills", label: "Skills" },
  { href: "/main#project", label: "Project" },
  { href: "/main#gallery", label: "Gallery" },
  { href: "/main#contact", label: "Contact" },
];

function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-header__brand" to="/home">
          현주의 세상
        </Link>
        <nav aria-label="Primary" className="site-header__nav">
          {navItems.map((item) => (
            <Link key={item.href} className="site-header__link" to={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
