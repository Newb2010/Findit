
import { ArrowUpRight, Search, MoveDownRight } from "lucide-react";

function Hero({ onReportClick, onExploreClick }) {
  return (
    <section className="hero" id="home">
      <div className="hero-content">

        <div className="hero-meta">
          <span className="hero-index">NO. 001 — FINDIT</span>
          <span className="hero-status">
            <span className="status-indicator" />
            COMMUNITY PLATFORM
          </span>
        </div>

        <p className="eyebrow">
          LOST & FOUND PLATFORM
          <span className="eyebrow-line" />
        </p>

        <h1>
          Lost something?
          <br />
          <span>Let's find it.</span>
        </h1>

        <p className="hero-description">
          A simple platform to reconnect people
          with their lost belongings. Report an item
          or help someone find theirs.
        </p>

        <div className="hero-actions">

          <button
            type="button"
            className="button-primary"
            onClick={onReportClick}
          >
            Report an item
            <ArrowUpRight size={18} />
          </button>

          <button
            type="button"
            className="button-secondary"
            onClick={onExploreClick}
          >
            <Search size={17} />
            Explore items
          </button>

        </div>

        <div className="hero-bottom-meta">
          <span>
            <MoveDownRight size={15} />
            START EXPLORING
          </span>

          <span>BUILT FOR THE COMMUNITY</span>
        </div>

      </div>

      <div className="hero-note">
        <span className="hero-note-number">01 / 03</span>

        <div className="hero-note-content">
          <span className="hero-note-label">OUR PURPOSE</span>
          <p>Helping lost items find their way home.</p>
        </div>
      </div>

      <div className="hero-decoration" aria-hidden="true">
        <span>F</span>
        <span>.</span>
      </div>

    </section>
  );
}

export default Hero;
