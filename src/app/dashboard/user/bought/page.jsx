"use client";
import Link from "next/link";
import { useApi } from "@/lib/useApi";
import { PageTitle } from "@/components/dashboard/Shell";
import { CardSkeleton, Empty } from "@/components/ui";

export default function Bought() {
  const { data, loading } = useApi("/dashboard/user");
  return (
    <>
      <PageTitle title="Bought artworks" hint="Your personal collection." />
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">{Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}</div>
      ) : !data || data.purchases.length === 0 ? (
        <Empty title="Your collection is empty" hint="Artworks you buy will be displayed here."><Link href="/artworks" className="btn btn-primary">Start collecting</Link></Empty>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {data.purchases.map((p) => (
            <Link key={p._id} href={`/artworks/${p.artworkId}`} className="card overflow-hidden group hover:border-brand transition-colors">
              <div className="aspect-[4/5] overflow-hidden bg-brand-soft"><img src={p.artworkImage} alt={p.artworkTitle} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
              <div className="p-3"><p className="font-display font-semibold truncate">{p.artworkTitle}</p><p className="text-xs text-muted">by {p.artistName}</p></div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
