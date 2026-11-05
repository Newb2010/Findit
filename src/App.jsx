
import { useCallback, useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import ItemSection from "./components/ItemSection";
import Footer from "./components/Footer";
import LoadingIntro from "./components/LoadingIntro";
import ReportModal from "./components/ReportModal";
import ItemDetailModal from "./components/itemDetailModal";

import "./App.css";

const STORAGE_KEY = "findit_items";
const THEME_KEY = "findit_theme";

const initialItems = [
  {
    id: 1,
    name: "Black Backpack",
    description: "A black backpack found near the school area.",
    status: "found",
    category: "Bags",
    location: "School Area",
    date: "30 Oct 2026",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
    phone: "",
  },
  {
    id: 2,
    name: "Brown Wallet",
    description: "A brown wallet reported missing.",
    status: "lost",
    category: "Accessories",
    location: "Library",
    date: "29 Oct 2026",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600",
    phone: "",
  },
  {
    id: 3,
    name: "Wireless Headphones",
    description: "Wireless headphones found in a classroom.",
    status: "found",
    category: "Electronics",
    location: "Classroom",
    date: "28 Oct 2026",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    phone: "",
  },
  {
    id: 4,
    name: "Silver Watch",
    description: "A silver watch reported missing.",
    status: "lost",
    category: "Accessories",
    location: "Sports Hall",
    date: "27 Oct 2026",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    phone: "",
  },
];

function getSavedItems() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === null) return initialItems;

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : initialItems;
  } catch (error) {
    console.error("Failed to load Findit data:", error);
    return initialItems;
  }
}

function getSavedTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);

    return saved === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showReport, setShowReport] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const [items, setItems] = useState(getSavedItems);
  const [theme, setTheme] = useState(getSavedTheme);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Simpan data barang
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save Findit data:", error);
      alert("Penyimpanan browser penuh atau tidak tersedia.");
    }
  }, [items]);

  // Terapkan tema
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.body.dataset.theme = theme;

    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (error) {
      console.error("Failed to save theme:", error);
    }
  }, [theme]);

  // Animasi section saat scroll naik dan turun
  useEffect(() => {
    if (isLoading) return;

    const selectors = [
      ".hero",
      ".stats-section",
      ".items-section",
      ".footer",
    ];

    const elements = document.querySelectorAll(selectors.join(", "));

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.classList.add("is-visible");
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    elements.forEach((element) => {
      element.classList.add("reveal-section");
      observer.observe(element);
    });

    return () => {
      observer.disconnect();

      elements.forEach((element) => {
        element.classList.remove(
          "is-visible",
          "reveal-section"
        );
      });
    };
  }, [isLoading]);

  // Tambah barang
  function handleAddItem(newItem) {
    const itemWithId = {
      ...newItem,
      id: Date.now(),
    };

    setItems((previousItems) => [
      itemWithId,
      ...previousItems,
    ]);

    setShowReport(false);
  }

  // Update barang
  function handleUpdateItem(updatedItem) {
    setItems((previousItems) =>
      previousItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );

    setEditingItem(null);
  }

  // Hapus barang
  function handleDeleteItem(itemId) {
    setItems((previousItems) =>
      previousItems.filter((item) => item.id !== itemId)
    );

    setSelectedItem(null);
  }

  // Edit barang
  function handleEditItem(item) {
    setSelectedItem(null);
    setEditingItem(item);
  }

  // Tutup modal
  function closeReportModal() {
    setShowReport(false);
    setEditingItem(null);
  }

  // Ganti tema
  function handleToggleTheme() {
    setTheme((current) =>
      current === "light" ? "dark" : "light"
    );
  }

  return (
    <>
      {isLoading && (
        <LoadingIntro onComplete={handleLoadingComplete} />
      )}

      <div
        className={`app ${
          isLoading ? "app-hidden" : "app-enter"
        }`}
      >
        <Navbar
          onReportClick={() => setShowReport(true)}
          theme={theme}
          onToggleTheme={handleToggleTheme}
        />

        <Hero
          onReportClick={() => setShowReport(true)}
          onExploreClick={() => {
            document.getElementById("explore")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        />

        <Stats items={items} />

        <ItemSection
          items={items}
          onItemClick={(item) => setSelectedItem(item)}
        />

        <Footer />
      </div>

      {(showReport || editingItem) && (
        <ReportModal
          initialItem={editingItem}
          onClose={closeReportModal}
          onSubmit={
            editingItem ? handleUpdateItem : handleAddItem
          }
        />
      )}

      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onEdit={handleEditItem}
          onDelete={handleDeleteItem}
        />
      )}
    </>
  );
}

export default App;
