
import { useState } from "react";

import {
  X,
  MapPin,
  CalendarDays,
  MessageCircle,
  Pencil,
  Trash2,
} from "lucide-react";

import DeleteConfirmModal from "./DeleteConfirmModal";

function ItemDetailModal({
  item,
  onClose,
  onEdit,
  onDelete,
}) {
  const [showDeleteConfirm, setShowDeleteConfirm] =
    useState(false);

  if (!item) return null;

  function handleConfirmDelete() {
    // Hanya dipanggil ketika tombol Delete dikonfirmasi.
    onDelete(item.id);
  }

  function handleWhatsApp() {
    const phone = item.phone?.replace(/\D/g, "");

    if (!phone) {
      alert("Nomor WhatsApp belum tersedia.");
      return;
    }

    const formattedPhone = phone.startsWith("0")
      ? "62" + phone.slice(1)
      : phone;

    const message = encodeURIComponent(
      `Halo, saya ingin bertanya tentang barang ${item.name}.`
    );

    window.open(
      `https://wa.me/${formattedPhone}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <>
      <div
        className="detail-overlay"
        onClick={onClose}
      >
        <div
          className="detail-modal"
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="detail-close"
            onClick={onClose}
            aria-label="Close detail"
          >
            <X size={20} />
          </button>

          {item.image && (
            <div className="detail-image">
              <img
                src={item.image}
                alt={item.name}
              />
            </div>
          )}

          <div className="detail-content">
            <span className={`item-status ${item.status}`}>
              {item.status}
            </span>

            <h2>{item.name}</h2>

            <p className="detail-description">
              {item.description}
            </p>

            <div className="detail-meta">
              <div>
                <MapPin size={16} />
                <span>{item.location}</span>
              </div>

              <div>
                <CalendarDays size={16} />
                <span>{item.date}</span>
              </div>
            </div>

            <div className="detail-category">
              Category: {item.category}
            </div>

            <div className="detail-actions">
              <button
                type="button"
                className="detail-edit-button"
                onClick={() => onEdit(item)}
              >
                <Pencil size={16} />
                Edit Item
              </button>

              <button
                type="button"
                className="detail-delete-button"
                onClick={() => setShowDeleteConfirm(true)}
              >
                <Trash2 size={16} />
                Delete Item
              </button>
            </div>

            <button
              type="button"
              className="detail-whatsapp-button"
              onClick={handleWhatsApp}
            >
              <MessageCircle size={17} />
              Contact via WhatsApp
            </button>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <DeleteConfirmModal
          item={item}
          onCancel={() => setShowDeleteConfirm(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
}

export default ItemDetailModal;
