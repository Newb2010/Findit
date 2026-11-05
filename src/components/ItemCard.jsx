
import { ArrowUpRight, MapPin } from "lucide-react";

function ItemCard({ item, onClick }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick?.(item);
    }
  };

  return (
    <article
      className="item-card"
      role="button"
      tabIndex={0}
      aria-label={`View details of ${item.name}`}
      onClick={() => onClick?.(item)}
      onKeyDown={handleKeyDown}
    >
      <div className="item-image">
        <img
          src={
            item.image ||
            "https://placehold.co/600x400?text=No+Image"
          }
          alt={item.name || "Reported item"}
          loading="lazy"
        />

        <span className={`item-status ${item.status}`}>
          {item.status?.toUpperCase()}
        </span>
      </div>

      <div className="item-info">
        <span className="item-category">
          {item.category || "Other"}
        </span>

        <h3>{item.name}</h3>

        <p className="item-description">
          {item.description || "No description available."}
        </p>

        <p className="item-location">
          <MapPin size={15} />
          {item.location || "Location not specified"}
        </p>

        <div className="item-bottom">
          <span>{item.date || "Date not specified"}</span>

          <span className="item-detail" aria-hidden="true">
            <ArrowUpRight size={20} />
          </span>
        </div>
      </div>
    </article>
  );
}

export default ItemCard;
