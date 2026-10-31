import { Package, CheckCircle, Search } from "lucide-react";

function Stats() {
  const statistics = [
    {
      label: "Items reported",
      value: "128",
      icon: Package,
    },
    {
      label: "Items found",
      value: "86",
      icon: CheckCircle,
    },
    {
      label: "Items missing",
      value: "42",
      icon: Search,
    },
  ];

  return (
    <section className="stats-section">

      {statistics.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <div className="stat-card" key={index}>

            <div className="stat-top">
              <span>{stat.label}</span>
              <Icon size={19} />
            </div>

            <h2>{stat.value}</h2>

          </div>
        );
      })}

    </section>
  );
}

export default Stats;