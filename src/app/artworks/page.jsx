"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { Search } from "lucide-react";
import ArtCard from "@/components/ArtCard";
import { CardSkeleton, Empty } from "@/components/ui";
import { api, CATEGORIES } from "@/lib/api";

function Browse() {
  const router = useRouter();
  const path = usePathname();
  const params = useSearchParams();
  const qs = params.toString();
  const [data, setData] = useState(null);
  const [q, setQ] = useState(params.get("q") || "");

  const setParam = (k, v) => {
    const next = new URLSearchParams(qs);
    if (v) next.set(k, v); else next.delete(k);
    if (k !== "page") next.delete("page");
    router.replace(`${path}?${next}`);
  };

  useEffect(() => {
    setData(null);
    api(`/artworks?${qs}&limit=12`).then(setData).catch((e) => { setData({ items: [], pages: 1, total: 0 }); toast.error(e.message || "Failed to load artworks"); });
  }, [qs]);

  const page = Number(params.get("page") || 1);
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-4xl font-bold">Browse artworks</h1>
      <form onSubmit={(e) => { e.preventDefault(); setParam("q", q.trim()); }} className="mt-6 grid gap-3 md:grid-cols-[1fr_180px_180px]">
        <div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" /><input className="input !pl-9" placeholder="Search by title or artist" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search" /></div>
        <select className="input" aria-label="Category" value={params.get("category") || ""} onChange={(e) => setParam("category", e.target.value)}>
          <option value="">All categories</option>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select className="input" aria-label="Sort" value={params.get("sort") || "newest"} onChange={(e) => setParam("sort", e.target.value)}>
          <option value="newest">Newest</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option>
        </select>
      </form>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data === null ? Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />) : data.items.map((a) => <ArtCard key={a._id} art={a} />)}
      </div>
      {data?.items.length === 0 && <div className="mt-8"><Empty title="No artworks match your filters" hint="Try a different search or clear the filters." /></div>}

      {data && data.pages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-10">
          <button className="btn btn-ghost" disabled={page <= 1} onClick={() => setParam("page", String(page - 1))}>Previous</button>
          <span className="text-sm text-muted">Page {page} of {data.pages}</span>
          <button className="btn btn-ghost" disabled={page >= data.pages} onClick={() => setParam("page", String(page + 1))}>Next</button>
        </div>
      )}
    </div>
  );
}

export default function Page() { return <Suspense><Browse /></Suspense>; }
