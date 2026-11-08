"use client";
import Link from "next/link";
import { money } from "@/lib/api";

export default function ArtCard({ art }) {
  return (
    <Link href={`/artworks/${art._id}`} className="card overflow-hidden group block hover:border-brand transition-colors">
      <div className="relative aspect-[4/5] overflow-hidden bg-line">
        <img src={art.image} alt={art.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        {art.sold && <span className="absolute top-2 left-2 rounded-md bg-hot px-2 py-0.5 text-xs font-bold text-white">Sold</span>}
      </div>
      <div className="p-3">
        <h3 className="font-display font-semibold truncate">{art.title}</h3>
        <div className="mt-1 flex items-center justify-between text-sm">
          <span className="text-muted truncate">{art.artist?.name}</span>
          <span className="font-bold text-brand">{money(art.price)}</span>
        </div>
      </div>
    </Link>
  );
}