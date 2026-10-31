import { ArrowUpRight, MapPin } from "lucide-react";

function ItemCard({ item, onClick }) {
  return (
    <article className="item-card">
      <div className="item-image">
        <img
          src={
            item.image ||
            "https://placehold.co/600x400?text=No+Image"
          }
          alt={item.name}
        />

        <span className={`item-status ${item.status}`}>
          {item.status.toUpperCase()}
        </span>
      </div>

      <div className="item-info">
        <span className="item-category">
          {item.category}
        </span>

        <h3>{item.name}</h3>

        <p className="item-location">
          <MapPin size={15} />
          {item.location}
        </p>

        <div className="item-bottom">
          <span>{item.date}</span>

          <button
            type="button"
            className="item-detail"
            onClick={() => onClick(item)}
            aria-label={`View details of ${item.name}`}
          >
            <ArrowUpRight size={20} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default ItemCard;