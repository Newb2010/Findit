
import { Trash2, X } from "lucide-react";

function DeleteConfirmModal({
  item,
  onCancel,
  onConfirm,
}) {
  if (!item) return null;

  return (
    <div
      className="delete-overlay"
      onClick={onCancel}
    >
      <div
        className="delete-dialog"
        onClick={(event) => event.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        aria-describedby="delete-description"
      >
        {/* Header */}
        <div className="delete-dialog-header">
          <span className="delete-eyebrow">
            FINDIT / ITEM MANAGEMENT
          </span>

          <button
            type="button"
            className="delete-close"
            onClick={onCancel}
            aria-label="Close dialog"
          >
            <X size={19} />
          </button>
        </div>

        {/* Icon */}
        <div className="delete-icon">
          <Trash2 size={21} />
        </div>

        {/* Title */}
        <h2 id="delete-title">
          Delete this item?
        </h2>

        <p
          className="delete-description"
          id="delete-description"
        >
          Are you sure you want to delete this report?
          This action cannot be undone.
        </p>

        {/* Item Preview */}
        <div className="delete-item-preview">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
            />
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

        {/* Actions */}
        <div className="delete-actions">
          <button
            type="button"
            className="delete-cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="button"
            className="delete-confirm-button"
            onClick={onConfirm}
          >
            <Trash2 size={15} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
