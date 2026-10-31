import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import ItemCard from "./ItemCard";

function ItemSection({ items, onItemClick }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;

      const matchesCategory =
        categoryFilter === "all" || item.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [items, search, statusFilter, categoryFilter]);

  return (
    <section className="items-section" id="explore">
      <div className="section-heading">
        <div>
          <span className="eyebrow">COMMUNITY REPORTS</span>
          <h2>Explore Items</h2>
        </div>
      </div>

      <div className="item-controls">
        <div className="search-box">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search items or locations..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="filter-box">
          <SlidersHorizontal size={17} />

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="all">All Status</option>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Bags">Bags</option>
            <option value="Accessories">Accessories</option>
            <option value="Electronics">Electronics</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <p className="result-count">
        Showing {filteredItems.length} items
      </p>

      {filteredItems.length > 0 ? (
        <div className="items-grid">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onClick={onItemClick}
            />
          ))}
        </div>
      ) : (
        <div className="empty-results">
          <h3>No items found</h3>
          <p>Try another keyword or change your filters.</p>
        </div>
      )}
    </section>
  );
}

export default ItemSection;