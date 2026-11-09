
const API_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");

const SERVER_URL = API_URL?.replace(/\/api$/, "");

if (!API_URL) {
  console.error("VITE_API_URL belum terbaca. Periksa file .env frontend.");
}

// Membaca respons Laravel dan menampilkan error aslinya
async function handleResponse(response) {
  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    const validationErrors = result.errors
      ? Object.values(result.errors).flat().join("\n")
      : "";

    throw new Error(
      validationErrors ||
      result.message ||
      `Server error: ${response.status}`
    );
  }

  return result;
}

// Mengubah format data Laravel menjadi format frontend
function formatItem(item) {
  return {
    id: item.id,
    name: item.title,
    description: item.description || "",
    status: item.status,
    category: item.category,
    location: item.location,
    date: item.event_date || "",
    image: item.image_path
      ? `${SERVER_URL}/storage/${item.image_path}`
      : "",
    phone: item.phone || "",
  };
}

// Mengambil semua barang
export async function getItems() {
  const response = await fetch(`${API_URL}/items`, {
    headers: {
      Accept: "application/json",
    },
  });

  const result = await handleResponse(response);

  return result.map(formatItem);
}

// Menambahkan barang
export async function createItem(item) {
  const formData = new FormData();

  formData.append("title", item.name);
  formData.append("description", item.description || "");
  formData.append("status", item.status);
  formData.append("category", item.category);
  formData.append("location", item.location);

  if (item.image instanceof File) {
    formData.append("image", item.image);
  }

  const response = await fetch(`${API_URL}/items`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  });

  const result = await handleResponse(response);

  return formatItem(result.data);
}

// Mengedit barang
export async function updateItem(id, item) {
  const formData = new FormData();

  formData.append("_method", "PUT");
  formData.append("title", item.name);
  formData.append("description", item.description || "");
  formData.append("status", item.status);
  formData.append("category", item.category);
  formData.append("location", item.location);

  if (item.image instanceof File) {
    formData.append("image", item.image);
  }

  const response = await fetch(`${API_URL}/items/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  });

  const result = await handleResponse(response);

  return formatItem(result.data);
}

// Menghapus barang
export async function deleteItem(id) {
  const response = await fetch(`${API_URL}/items/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
  });

  await handleResponse(response);

  return true;
}
