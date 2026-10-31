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

const initialItems = [
  {
    id: 1,
    name: "Black Backpack",
    description: "A black backpack found near the school area.",
    status: "found",
    category: "Bags",
    location: "School Area",
    date: "30 Oct 2026",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
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
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600",
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
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
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
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
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

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showReport, setShowReport] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [items, setItems] = useState(getSavedItems);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Simpan perubahan data ke localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save Findit data:", error);
      alert("Penyimpanan browser penuh atau tidak tersedia.");
    }
  }, [items]);

  // Animasi section saat masuk ke viewport
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".hero, .stats-section, .items-section, .footer"
    );

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
            observer.unobserve(entry.target);
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

    return () => observer.disconnect();
  }, []);

  // Tambah laporan baru
  function handleAddItem(newItem) {
    const itemWithId = {
      ...newItem,
      id: Date.now(),
    };

    setItems((previousItems) => [itemWithId, ...previousItems]);
    setShowReport(false);
  }

  // Perbarui laporan
  function handleUpdateItem(updatedItem) {
    setItems((previousItems) =>
      previousItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );

    setEditingItem(null);
  }

  // Hapus laporan
  function handleDeleteItem(itemId) {
    setItems((previousItems) =>
      previousItems.filter((item) => item.id !== itemId)
    );

    setSelectedItem(null);
  }

  // Buka form edit
  function handleEditItem(item) {
    setSelectedItem(null);
    setEditingItem(item);
  }

  function closeReportModal() {
    setShowReport(false);
    setEditingItem(null);
  }

  return (
    <>
      {isLoading && (
        <LoadingIntro onComplete={handleLoadingComplete} />
      )}

      <div className="app">
        <Navbar onReportClick={() => setShowReport(true)} />

        <Hero
          onReportClick={() => setShowReport(true)}
          onExploreClick={() => {
            document.getElementById("explore")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        />

        <Stats />

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
          onSubmit={editingItem ? handleUpdateItem : handleAddItem}
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