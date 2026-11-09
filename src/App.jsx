
import { useCallback, useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import ItemSection from "./components/ItemSection";
import Footer from "./components/Footer";
import LoadingIntro from "./components/LoadingIntro";
import ReportModal from "./components/ReportModal";
import ItemDetailModal from "./components/itemDetailModal";

import {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} from "./services/itemService";

import "./App.css";

const THEME_KEY = "findit_theme";

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

  const [items, setItems] = useState([]);
  const [theme, setTheme] = useState(getSavedTheme);

  // Ambil data barang dari Laravel
  useEffect(() => {
    let isMounted = true;

    async function loadItems() {
      try {
        const data = await getItems();

        if (isMounted) {
          setItems(data);
        }
      } catch (error) {
        console.error("Gagal mengambil data Findit:", error);

        if (isMounted) {
          alert(
            "Gagal mengambil data dari server. Pastikan Laravel sedang berjalan."
          );
        }
      }
    }

    loadItems();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

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

  // Tambah barang melalui Laravel
  async function handleAddItem(newItem) {
    try {
      const createdItem = await createItem(newItem);

      setItems((previousItems) => [
        createdItem,
        ...previousItems,
      ]);

      setShowReport(false);
    } catch (error) {
      console.error("Gagal menambahkan barang:", error);
      alert(error.message || "Gagal menambahkan barang.");
    }
  }

  // Update barang melalui Laravel
  async function handleUpdateItem(updatedItem) {
    try {
      const savedItem = await updateItem(
        updatedItem.id,
        updatedItem
      );

      setItems((previousItems) =>
        previousItems.map((item) =>
          item.id === savedItem.id ? savedItem : item
        )
      );

      setEditingItem(null);
    } catch (error) {
      console.error("Gagal memperbarui barang:", error);
      alert(error.message || "Gagal memperbarui barang.");
    }
  }

  // Hapus barang melalui Laravel
  async function handleDeleteItem(itemId) {
    try {
      await deleteItem(itemId);

      setItems((previousItems) =>
        previousItems.filter((item) => item.id !== itemId)
      );

      setSelectedItem(null);
    } catch (error) {
      console.error("Gagal menghapus barang:", error);
      alert(error.message || "Gagal menghapus barang.");
    }
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
