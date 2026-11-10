"use client";
import Link from "next/link";
import { useApi } from "@/lib/useApi";
import { money, dateFmt } from "@/lib/api";
import { PageTitle, Stat, BarChart } from "@/components/dashboard/Shell";
import { RowSkeleton, Empty, Table } from "@/components/ui";

export default function ArtistOverview() {
  const { data, loading } = useApi("/dashboard/artist");
  if (loading) return <RowSkeleton rows={6} />;
  if (!data) return <Empty title="Could not load your dashboard" hint="Please refresh the page." />;
  const { stats, sales, monthly } = data;
  return (
    <>
      <PageTitle title="Studio overview" hint="How your work is performing.">
        <Link href="/dashboard/artist/artworks/new" className="btn btn-primary">Add artwork</Link>
      </PageTitle>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Artworks listed" value={stats.artworks} />
        <Stat label="Available" value={stats.available} />
        <Stat label="Sold" value={stats.sold} />
        <Stat label="Total revenue" value={money(stats.revenue)} />
      </div>
      <div className="mt-4"><BarChart data={monthly} format={(n) => `$${Math.round(n)}`} /></div>

      <h2 className="text-xl font-bold mt-8 mb-3">Latest sales</h2>
      {sales.length === 0 ? <Empty title="No sales yet" hint="When someone buys your work, it appears here." /> : (
        <Table head={["Artwork", "Buyer", "Amount", "Date"]}>
          {sales.slice(0, 5).map((s) => (
            <tr key={s._id}><td className="font-semibold">{s.artworkTitle}</td><td>{s.userName}</td><td>{money(s.amount)}</td><td className="whitespace-nowrap">{dateFmt(s.createdAt)}</td></tr>
          ))}
        </Table>
      )}
    </>
  );
}
