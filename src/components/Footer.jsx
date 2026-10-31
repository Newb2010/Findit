import { ArrowUpRight } from "lucide-react";

function Footer() {
  return (
    <footer className="footer" id="about">

      <div className="footer-content">

        <div>
          <a href="#" className="logo footer-logo">
            findit<span>.</span>
          </a>

          <p>
            Helping lost items find their way home.
          </p>
        </div>

        <a href="#home" className="footer-link">
          Back to top
          <ArrowUpRight size={17} />
        </a>

      </div>

      <div className="footer-bottom">
        <span>© 2026 Findit.</span>
        <span>Lost & Found Platform</span>
      </div>

    </footer>
  );
}

export default Footer;