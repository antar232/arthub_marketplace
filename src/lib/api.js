export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function api(path, { method = "GET", body } = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("arthub_token") : null;
  const res = await fetch(`${API_URL}/api${path}`, {
    method,
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || "Something went wrong");
    err.status = res.status;
    err.code = data.code;
    throw err;
  }
  return data;
}

export async function uploadImage(file) {
  const form = new FormData();
  form.append("image", file);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`, { method: "POST", body: form });
  const data = await res.json();
  if (!data.success) throw new Error("Image upload failed. Check your imgBB key.");
  return data.data.url;
}

export const money = (n) => `$${Number(n).toFixed(2).replace(/\.00$/, "")}`;
export const date = (d) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
export const CATEGORIES = ["Painting", "Digital", "Sculpture", "Photography", "Illustration", "Mixed Media"];