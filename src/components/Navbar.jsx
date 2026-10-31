
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar({ onReportClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function focusSearch() {
    document.querySelector(".search-box input")?.focus();
    document.querySelector("#explore")?.scrollIntoView({
      behavior: "smooth",
    });
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
            aria-label="Search items"
            onClick={focusSearch}
          >
            <Search size={19} />
          </button>

          <button
            className="nav-button"
            onClick={() => {
              closeMenu();
              onReportClick();
            }}
          >
            Report Item
          </button>

          <button
            className="mobile-menu"
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
