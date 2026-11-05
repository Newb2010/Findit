
import { useState } from "react";
import {
  Search,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";

function Navbar({
  onReportClick,
  theme = "light",
  onToggleTheme,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  function focusSearch() {
    document.querySelector(".search-box input")?.focus();

    document.querySelector("#explore")?.scrollIntoView({
      behavior: "smooth",
    });

    setMenuOpen(false);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <a href="#home" className="logo" onClick={closeMenu}>
          findit<span>.</span>
        </a>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#explore" onClick={closeMenu}>Explore</a>
          <a href="#about" onClick={closeMenu}>About</a>
        </div>

        <div className="nav-actions">
          <button
            className="nav-search"
            type="button"
            aria-label="Search items"
            onClick={focusSearch}
          >
            <Search size={19} />
          </button>

          <button
            className="nav-theme-toggle"
            type="button"
            onClick={onToggleTheme}
            aria-label={
              theme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            title={
              theme === "dark"
                ? "Light Mode"
                : "Dark Mode"
            }
          >
            {theme === "dark" ? (
              <Sun size={19} />
            ) : (
              <Moon size={19} />
            )}
          </button>

          <button
            className="nav-button"
            type="button"
            onClick={() => {
              closeMenu();
              onReportClick?.();
            }}
          >
            Report Item
          </button>

          <button
            className="mobile-menu"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((previous) => !previous)}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
