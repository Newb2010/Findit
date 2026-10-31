import { ArrowUpRight, Search } from "lucide-react";

function Hero({ onReportClick, onExploreClick }) {
  return (
    <section className="hero" id="home">
      <div className="hero-content">

        <p className="eyebrow">
          LOST & FOUND PLATFORM
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

          <a href="#report" className="button-primary" onClick={onReportClick}>
            Report an item
            <ArrowUpRight size={18} />
          </a>

          <a href="#items" className="button-secondary" onClick={onExploreClick}>
            <Search size={17} />
            Explore items
          </a>

        </div>

      </div>

      <div className="hero-note">
        <span>01 / 03</span>
        <p>Helping lost items find their way home.</p>
      </div>

    </section>
  );
}

export default Hero;