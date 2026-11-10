"use client";
import { useApi } from "@/lib/useApi";
import { money, dateFmt } from "@/lib/api";
import { PageTitle, Stat } from "@/components/dashboard/Shell";
import { RowSkeleton, Empty, Table } from "@/components/ui";

export default function Sales() {
  const { data, loading } = useApi("/dashboard/artist");
  return (
    <>
      <PageTitle title="Sales history" hint="Every artwork you have sold." />
      {loading ? <RowSkeleton /> : !data || data.sales.length === 0 ? (
        <Empty title="No sales yet" hint="Share your artworks to reach more collectors." />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 mb-4">
            <Stat label="Artworks sold" value={data.sales.length} />
            <Stat label="Total earned" value={money(data.stats.revenue)} />
          </div>
          <Table head={["Artwork", "Buyer", "Purchase date", "Amount"]}>
            {data.sales.map((s) => (
              <tr key={s._id}><td className="font-semibold">{s.artworkTitle}</td><td>{s.userName}</td><td className="whitespace-nowrap">{dateFmt(s.createdAt)}</td><td className="font-semibold">{money(s.amount)}</td></tr>
            ))}
          </Table>
        </>
      )}
    </>
  );
}
