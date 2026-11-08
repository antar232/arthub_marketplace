"use client";
import Link from "next/link";
import { useApi } from "@/lib/useApi";
import { money, dateFmt } from "@/lib/api";
import { PageTitle, Stat } from "@/components/dashboard/Shell";
import { RowSkeleton, Empty, Table } from "@/components/ui";

export default function UserOverview() {
  const { data, loading } = useApi("/dashboard/user");
  if (loading) return <RowSkeleton rows={6} />;
  if (!data) return <Empty title="Could not load your dashboard" hint="Please refresh the page." />;
  const { stats, purchases } = data;
  const unlimited = stats.limit === null;
  const pct = unlimited ? 100 : Math.min(100, Math.round((stats.purchases / stats.limit) * 100));

  return (
    <>
      <PageTitle title="Your overview" hint="Everything you have collected on ArtHub.">
        <Link href="/artworks" className="btn btn-primary">Browse artworks</Link>
      </PageTitle>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Artworks bought" value={stats.purchases} />
        <Stat label="Total spent" value={money(stats.spent)} />
        <Stat label="Plan" value={<span className="capitalize">{stats.tier}</span>} />
        <Stat label="Purchases left" value={unlimited ? "Unlimited" : stats.remaining} />
      </div>

      <div className="card p-5 mt-4">
        <div className="flex justify-between text-sm font-semibold"><span>Plan usage</span><span className="text-muted">{unlimited ? `${stats.purchases} used` : `${stats.purchases} of ${stats.limit}`}</span></div>
        <div className="h-2.5 rounded-full bg-brand-soft mt-3 overflow-hidden"><div className={`h-full rounded-full ${pct >= 100 && !unlimited ? "bg-hot" : "bg-brand"}`} style={{ width: `${pct}%` }} /></div>
        {!unlimited && stats.remaining === 0 && (
          <p className="text-sm mt-3 text-hot font-semibold">You have used every purchase on your plan. <Link href="/dashboard/user/subscription" className="underline">Upgrade to keep buying</Link>.</p>
        )}
      </div>

      <h2 className="text-xl font-bold mt-8 mb-3">Recent purchases</h2>
      {purchases.length === 0 ? (
        <Empty title="No purchases yet" hint="Find a piece you love and it will show up here."><Link href="/artworks" className="btn btn-primary">Explore art</Link></Empty>
      ) : (
        <Table head={["Artwork", "Artist", "Price", "Date"]}>
          {purchases.slice(0, 5).map((p) => (
            <tr key={p._id}>
              <td><Link href={`/artworks/${p.artworkId}`} className="font-semibold hover:text-brand">{p.artworkTitle}</Link></td>
              <td>{p.artistName}</td><td>{money(p.amount)}</td><td className="whitespace-nowrap">{dateFmt(p.createdAt)}</td>
            </tr>
          ))}
        </Table>
      )}
    </>
  );
}
