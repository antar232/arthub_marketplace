"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api, money, dateFmt } from "@/lib/api";
import { useAuth } from "@/components/AuthProvider";
import { Sk } from "@/components/ui";

export default function ArtworkDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [art, setArt] = useState(undefined); // undefined = loading, null = not found
  const [buying, setBuying] = useState(false);

  useEffect(() => {
    api(`/artworks/${id}`).then(setArt).catch((e) => { setArt(null); if (e.status !== 404) toast.error(e.message); });
    if (new URLSearchParams(window.location.search).get("payment") === "cancelled") toast("Checkout cancelled. You were not charged.");
  }, [id]);

  if (art === undefined) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 md:grid-cols-2">
        <Sk className="aspect-[4/5]" /><div className="space-y-4"><Sk className="h-10 w-3/4" /><Sk className="h-5 w-1/3" /><Sk className="h-32" /><Sk className="h-12" /></div>
      </div>
    );
  }
  if (art === null) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Artwork not found</h1>
        <p className="text-muted mt-2">It may have been removed by the artist.</p>
        <Link href="/artworks" className="btn btn-primary mt-6">Browse artworks</Link>
      </div>
    );
  }

  const isOwner = user && String(user.id || user._id) === String(art.artistId);
  const isBuyer = user && art.soldTo && String(art.soldTo) === String(user.id || user._id);

  const buy = async () => {
    if (!user) return router.push(`/login?next=${encodeURIComponent(`/artworks/${id}`)}`);
    setBuying(true);
    try {
      const { url } = await api("/payments/artwork-session", { method: "POST", body: { artworkId: art._id } });
      window.location.href = url; // Stripe Checkout
    } catch (e) { toast.error(e.message); setBuying(false); }
  };
  const remove = async () => {
    if (!window.confirm(`Delete “${art.title}”? This cannot be undone.`)) return;
    try { await api(`/artworks/${art._id}`, { method: "DELETE" }); toast.success("Artwork deleted"); router.push("/dashboard/artist/artworks"); }
    catch (e) { toast.error(e.message); }
  };

  let label = buying ? "Redirecting to Stripe…" : `Buy now · ${money(art.price)}`;
  let disabled = buying || authLoading;
  if (art.sold) { label = isBuyer ? "You own this artwork" : "Sold"; disabled = true; }
  else if (isOwner) { label = "This is your artwork"; disabled = true; }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 md:grid-cols-2">
      <div className="card overflow-hidden self-start bg-brand-soft"><img src={art.image} alt={art.title} className="w-full object-cover" /></div>
      <div>
        <p className="text-sm font-semibold text-brand">{art.category}</p>
        <h1 className="text-4xl font-bold mt-1">{art.title}</h1>
        <p className="mt-2 text-muted">by <Link href={`/artworks?artist=${art.artistId}`} className="font-semibold text-ink hover:text-brand">{art.artistName}</Link> · Uploaded {dateFmt(art.createdAt)}</p>
        <p className="font-display text-4xl font-bold mt-6">{money(art.price)}</p>
        <p className="mt-6 whitespace-pre-line leading-relaxed">{art.description}</p>

        <button className="btn btn-primary w-full mt-8 !py-3.5 !text-base" onClick={buy} disabled={disabled}>{label}</button>
        {!user && !authLoading && !art.sold && <p className="text-xs text-muted mt-2 text-center">You will be asked to log in before paying.</p>}

        {isOwner && !art.sold && (
          <div className="flex gap-3 mt-4">
            <Link href={`/dashboard/artist/artworks/${art._id}/edit`} className="btn btn-ghost flex-1">Edit artwork</Link>
            <button className="btn btn-danger flex-1" onClick={remove}>Delete</button>
          </div>
        )}
        <p className="text-xs text-muted mt-6">Secure checkout by Stripe. Each artwork is one of a kind and can only be sold once.</p>
      </div>
    </div>
  );
}
