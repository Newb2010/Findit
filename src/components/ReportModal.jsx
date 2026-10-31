
import { useEffect, useState } from "react";
import { X, UploadCloud, Image as ImageIcon } from "lucide-react";

const MAX_IMAGE_SIZE = 15 * 1024 * 1024;

const initialForm = {
  name: "",
  description: "",
  status: "lost",
  category: "Electronics",
  location: "",
  phone: "",
  image: "",
};

function ReportModal({ onClose, onSubmit, initialItem = null }) {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [imageName, setImageName] = useState("");

  useEffect(() => {
    if (initialItem) {
      setFormData({
        ...initialForm,
        ...initialItem,
      });
      setImageName(initialItem.image ? "Existing image" : "");
    } else {
      setFormData(initialForm);
      setImageName("");
    }

    setErrors({});
  }, [initialItem]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setErrors((previous) => ({
        ...previous,
        image: "Format foto harus JPG, PNG, atau WEBP.",
      }));
      event.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setErrors((previous) => ({
        ...previous,
        image: "Ukuran foto maksimal 15 MB.",
      }));
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setFormData((previous) => ({
        ...previous,
        image: reader.result,
      }));

      setImageName(file.name);

      setErrors((previous) => ({
        ...previous,
        image: "",
      }));
    };

    reader.onerror = () => {
      setErrors((previous) => ({
        ...previous,
        image: "Foto gagal dibaca. Silakan coba lagi.",
      }));
    };

    reader.readAsDataURL(file);
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nama barang wajib diisi.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Deskripsi barang wajib diisi.";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Lokasi wajib diisi.";
    }

    const phone = formData.phone.trim();

    if (phone && !/^08\d{8,11}$/.test(phone)) {
      newErrors.phone =
        "Gunakan nomor Indonesia, contoh: 081234567890.";
    }

    if (
      formData.image &&
      typeof formData.image === "string" &&
      formData.image.startsWith("data:image/") &&
      !/^data:image\/(jpeg|png|webp);base64,/.test(formData.image)
    ) {
      newErrors.image = "Format foto tidak valid.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) return;

    const cleanedData = {
      ...formData,
      name: formData.name.trim(),
      description: formData.description.trim(),
      location: formData.location.trim(),
      phone: formData.phone.trim(),
      date: initialItem?.date || new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    onSubmit(cleanedData);
  }

  return (
    <div className="report-overlay" onClick={onClose}>
      <div
        className="report-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-title"
      >
        <div className="report-header">
          <div>
            <span className="report-eyebrow">
              FINDIT / ITEM MANAGEMENT
            </span>

            <h2 id="report-title">
              {initialItem ? "Edit item" : "Report an item"}
            </h2>

            <p>
              {initialItem
                ? "Update your item information."
                : "Help someone reconnect with their belongings."}
            </p>
          </div>

          <button
            type="button"
            className="report-close"
            onClick={onClose}
            aria-label="Close form"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="report-form-group">
            <label htmlFor="item-name">Item name *</label>
            <input
              id="item-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Example: Black Backpack"
            />
            {errors.name && (
              <span className="report-error">{errors.name}</span>
            )}
          </div>

          <div className="report-form-group">
            <label htmlFor="item-description">Description *</label>
            <textarea
              id="item-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the item..."
              rows={4}
            />
            {errors.description && (
              <span className="report-error">
                {errors.description}
              </span>
            )}
          </div>

          <div className="report-form-row">
            <div className="report-form-group">
              <label htmlFor="item-status">Status *</label>
              <select
                id="item-status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="lost">Lost</option>
                <option value="found">Found</option>
              </select>
            </div>

            <div className="report-form-group">
              <label htmlFor="item-category">Category *</label>
              <select
                id="item-category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Electronics">Electronics</option>
                <option value="Bags">Bags</option>
                <option value="Accessories">Accessories</option>
                <option value="Clothing">Clothing</option>
                <option value="Documents">Documents</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="report-form-group">
            <label htmlFor="item-location">Location *</label>
            <input
              id="item-location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Where was it lost or found?"
            />
            {errors.location && (
              <span className="report-error">{errors.location}</span>
            )}
          </div>

          <div className="report-form-group">
            <label htmlFor="item-phone">
              WhatsApp number
              <span className="report-optional"> (Optional)</span>
            </label>

            <input
              id="item-phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="081234567890"
            />

            {errors.phone && (
              <span className="report-error">{errors.phone}</span>
            )}
          </div>

          <div className="report-form-group">
            <label>Item photo</label>

            <label className="report-upload" htmlFor="item-image">
              <UploadCloud size={22} />
              <span>
                {imageName || "Click to upload an image"}
              </span>
              <small>JPG, PNG, WEBP · Maximum 15 MB</small>
            </label>

            <input
              id="item-image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              hidden
            />

            {formData.image && (
              <div className="report-image-preview">
                <img src={formData.image} alt="Item preview" />
                <button
                  type="button"
                  onClick={() => {
                    setFormData((previous) => ({
                      ...previous,
                      image: "",
                    }));
                    setImageName("");
                    setErrors((previous) => ({
                      ...previous,
                      image: "",
                    }));
                  }}
                >
                  <X size={15} /> Remove photo
                </button>
              </div>
            )}

            {errors.image && (
              <span className="report-error">{errors.image}</span>
            )}
          </div>

          <div className="report-form-actions">
            <button
              type="button"
              className="report-cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="report-submit-button"
            >
              {initialItem ? "Save Changes" : "Submit Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReportModal;
