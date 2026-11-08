"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { api, uploadImage, CATEGORIES } from "@/lib/api";

export default function ArtworkForm({ initial }) {
  const router = useRouter();
  const [f, setF] = useState(initial || { title: "", description: "", price: "", category: CATEGORIES[0], image: "" });
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      let image = f.image;
      if (file) image = await uploadImage(file);
      if (!image) throw new Error("Please choose an image");
      const body = { title: f.title, description: f.description, price: +f.price, category: f.category, image };
      if (initial) await api(`/artworks/${initial._id}`, { method: "PUT", body });
      else await api("/artworks", { method: "POST", body });
      toast.success(initial ? "Artwork updated" : "Artwork added");
      router.push("/dashboard/artist");
    } catch (err) { toast.error(err.message); }
    setBusy(false);
  };

  return (
    <form onSubmit={submit} className="card p-6 max-w-2xl space-y-4">
      <input className="input" placeholder="Title" required value={f.title} onChange={set("title")} />
      <textarea className="input min-h-32" placeholder="Description" required value={f.description} onChange={set("description")} />
      <div className="grid sm:grid-cols-2 gap-4">
        <input className="input" type="number" min="1" step="0.01" placeholder="Price (USD)" required value={f.price} onChange={set("price")} />
        <select className="input" value={f.category} onChange={set("category")}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
      </div>
      <div>
        <input type="file" accept="image/*" className="input" onChange={(e) => setFile(e.target.files[0])} />
        {(file || f.image) && <img src={file ? URL.createObjectURL(file) : f.image} alt="Preview" className="mt-3 h-40 rounded-lg object-cover" />}
      </div>
      <button className="btn btn-primary" disabled={busy}>{busy ? "Saving…" : initial ? "Save changes" : "Publish artwork"}</button>
    </form>
  );
}