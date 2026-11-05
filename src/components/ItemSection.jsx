
import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  Package,
  ArrowUpRight,
} from "lucide-react";

import ItemCard from "./ItemCard";

function ItemSection({ items = [], onItemClick }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = [
    "Bags",
    "Accessories",
    "Electronics",
    "Documents",
    "Keys",
    "Clothing",
    "Pets",
    "Personal Belongings",
    "Other",
  ];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const keyword = search.trim().toLowerCase();

      const searchableText = [
        item.name,
        item.location,
        item.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(keyword);

      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;

      const matchesCategory =
        categoryFilter === "all" || item.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [items, search, statusFilter, categoryFilter]);

  const hasActiveFilters =
    search.trim() !== "" ||
    statusFilter !== "all" ||
    categoryFilter !== "all";

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setCategoryFilter("all");
  };

  return (
    <section className="items-section" id="explore">

      <div className="section-heading">
        <div className="section-heading-main">
          <span className="eyebrow">
            COMMUNITY REPORTS
            <span className="eyebrow-line" />
          </span>

          <h2>Explore Items<span>.</span></h2>

          <p>
            Discover missing and found items around your community.
          </p>
        </div>

        <div className="section-index">
          <span>SECTION</span>
          <strong>02 / 03</strong>
        </div>
      </div>

      <div className="item-controls">

        <div className="search-box">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search items, locations..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search items"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="filter-box">
          <SlidersHorizontal size={17} />

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter by status"
          >
            <option value="all">All Status</option>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>

          <span className="filter-divider" />

          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            aria-label="Filter by category"
          >
            <option value="all">All Categories</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

      </div>

      <div className="results-toolbar">

        <div className="results-info">
          <span className="results-icon">
            <Package size={15} />
          </span>

          <p>
            Showing <strong>{filteredItems.length}</strong> of{" "}
            <strong>{items.length}</strong> items
          </p>
        </div>

        <div className="results-actions">
          {hasActiveFilters && (
            <>
              <span className="filter-active-label">
                FILTER ACTIVE
              </span>

              <button
                type="button"
                className="reset-filters"
                onClick={clearFilters}
              >
                <X size={14} />
                Clear filters
              </button>
            </>
          )}

          <span className="results-view-label">
            ALL REPORTS
            <ArrowUpRight size={13} />
          </span>
        </div>

      </div>

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
          <div className="empty-results-icon">
            <Search size={25} />
          </div>

          <span className="empty-results-label">
            NO MATCHING REPORTS
          </span>

          <h3>No items found<span>.</span></h3>

          <p>
            Try another keyword or change your filters
            to discover more items.
          </p>

          <button
            type="button"
            className="reset-filters"
            onClick={clearFilters}
          >
            <X size={15} />
            Reset all filters
          </button>
        </div>
      )}

      <div className="items-section-footer">
        <span>FINDIT — COMMUNITY COLLECTION</span>
        <span>END OF SECTION / 02</span>
      </div>

    </section>
  );
}

export default ItemSection;
