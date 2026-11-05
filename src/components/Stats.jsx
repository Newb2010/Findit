
import {
  Package,
  CheckCircle,
  Search,
  ArrowUpRight,
} from "lucide-react";

function Stats({ items = [] }) {
  const statistics = [
    {
      label: "Items reported",
      description: "Total community reports",
      value: items.length,
      icon: Package,
    },
    {
      label: "Items found",
      description: "Successfully recovered",
      value: items.filter(
        (item) => item.status?.toLowerCase() === "found"
      ).length,
      icon: CheckCircle,
    },
    {
      label: "Items missing",
      description: "Still waiting to be found",
      value: items.filter(
        (item) => item.status?.toLowerCase() === "lost"
      ).length,
      icon: Search,
    },
  ];

  return (
    <section className="stats-section">
      <div className="stats-heading">
        <div>
          <span className="stats-eyebrow">
            COMMUNITY OVERVIEW
          </span>

          <h2>
            Small numbers, meaningful
            <br />
            connections.
          </h2>
        </div>

        <span className="stats-snapshot">
          FINDIT / SNAPSHOT
        </span>
      </div>

      <div className="stats-grid">
        {statistics.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div className="stat-card" key={stat.label}>
              <div className="stat-card-top">
                <span className="stat-number">
                  / 0{index + 1}
                </span>

                <div className="stat-icon">
                  <Icon size={19} />
                </div>
              </div>

              <h3 className="stat-value">
                {stat.value}
              </h3>

              <p className="stat-label">
                {stat.label}
              </p>

              <div className="stat-card-bottom">
                <span>{stat.description}</span>
                <ArrowUpRight size={16} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Stats;
