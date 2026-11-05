import { useState } from "react";
import { Trash2, X, LoaderCircle } from "lucide-react";

function DeleteConfirmModal({ item, onCancel, onConfirm }) {
  const [isClosing, setIsClosing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!item) return null;

  function handleCancel() {
    if (isClosing || isDeleting) return;

    setIsClosing(true);

    setTimeout(() => {
      onCancel();
    }, 250);
  }

  function handleConfirm() {
    if (isClosing || isDeleting) return;

    setIsDeleting(true);
    setIsClosing(true);

    setTimeout(() => {
      onConfirm();
    }, 350);
  }

  return (
    <div
      className={`delete-overlay ${isClosing ? "is-closing" : ""}`}
      onClick={handleCancel}
    >
      <div
        className={`delete-dialog ${isClosing ? "is-closing" : ""}`}
        onClick={(event) => event.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        aria-describedby="delete-description"
      >
        <div className="delete-dialog-header">
          <span className="delete-eyebrow">
            FINDIT / ITEM MANAGEMENT
          </span>

          <button
            type="button"
            className="delete-close"
            onClick={handleCancel}
            disabled={isClosing}
            aria-label="Close dialog"
          >
            <X size={19} />
          </button>
        </div>

        <div className="delete-icon">
          <Trash2 size={21} />
        </div>

        <h2 id="delete-title">
          {isDeleting ? "Deleting item..." : "Delete this item?"}
        </h2>

        <p
          className="delete-description"
          id="delete-description"
        >
          {isDeleting
            ? "Please wait while this item is being removed."
            : "Are you sure you want to delete this report? This action cannot be undone."}
        </p>

        <div className="delete-item-preview">
          {item.image ? (
            <img src={item.image} alt={item.name} />
          ) : (
            <div className="delete-image-placeholder">
              <Trash2 size={21} />
            </div>
          )}

          <div className="delete-item-info">
            <strong>{item.name}</strong>

            <span>
              {item.status?.toUpperCase()} · {item.location}
            </span>
          </div>
        </div>

        <div className="delete-actions">
          <button
            type="button"
            className="delete-cancel-button"
            onClick={handleCancel}
            disabled={isClosing}
          >
            Cancel
          </button>

          <button
            type="button"
            className="delete-confirm-button"
            onClick={handleConfirm}
            disabled={isClosing}
          >
            {isDeleting ? (
              <>
                <LoaderCircle size={16} className="delete-spinner" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={15} />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;