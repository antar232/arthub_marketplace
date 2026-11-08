"use client";
import Link from "next/link";
import { useApi } from "@/lib/useApi";
import { money, dateFmt } from "@/lib/api";
import { PageTitle } from "@/components/dashboard/Shell";
import { RowSkeleton, Empty, Table } from "@/components/ui";

export default function Purchases() {
  const { data, loading } = useApi("/dashboard/user");
  return (
    <>
      <PageTitle title="Purchase history" hint="Every artwork you have bought." />
      {loading ? <RowSkeleton /> : !data || data.purchases.length === 0 ? (
        <Empty title="No purchases yet" hint="Your receipts will appear here after your first order."><Link href="/artworks" className="btn btn-primary">Browse artworks</Link></Empty>
      ) : (
        <Table head={["Artwork", "Artist", "Price", "Purchase date"]}>
          {data.purchases.map((p) => (
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
