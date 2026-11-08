// Uploads an image to imgBB and returns its public URL. The key lives in NEXT_PUBLIC_IMGBB_KEY.
export async function uploadImage(file) {
  const key = process.env.NEXT_PUBLIC_IMGBB_KEY;
  if (!key) throw new Error("Image upload is not configured (NEXT_PUBLIC_IMGBB_KEY missing)");
  if (!file.type.startsWith("image/")) throw new Error("Please choose an image file");
  if (file.size > 8 * 1024 * 1024) throw new Error("Image must be smaller than 8 MB");
  const form = new FormData();
  form.append("image", file);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, { method: "POST", body: form });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json?.data?.url) throw new Error(json?.error?.message || "Image upload failed");
  return json.data.url;
}
