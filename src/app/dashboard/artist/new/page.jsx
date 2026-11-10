"use client";
import Link from "next/link";
import toast from "react-hot-toast";
import { useApi } from "@/lib/useApi";
import { api, money } from "@/lib/api";
import { PageTitle } from "@/components/dashboard/Shell";
import { RowSkeleton, Empty, Table } from "@/components/ui";

export default function ManageArtworks() {
  const { data, loading, reload } = useApi("/artworks/mine");

  const remove = async (a) => {
    if (!window.confirm(`Delete “${a.title}”? This cannot be undone.`)) return;
    try { await api(`/artworks/${a._id}`, { method: "DELETE" }); toast.success("Artwork deleted"); reload(); }
    catch (e) { toast.error(e.message); }
  };

  return (
    <>
      <PageTitle title="Manage artworks" hint="Edit or remove the pieces you have listed.">
        <Link href="/dashboard/artist/artworks/new" className="btn btn-primary">Add artwork</Link>
      </PageTitle>
      {loading ? <RowSkeleton /> : !data || data.length === 0 ? (
        <Empty title="You have not listed any artworks" hint="Upload your first piece to start selling."><Link href="/dashboard/artist/artworks/new" className="btn btn-primary">Add artwork</Link></Empty>
      ) : (
        <Table head={["Artwork", "Category", "Price", "Status", "Actions"]}>
          {data.map((a) => (
            <tr key={a._id}>
              <td>
                <Link href={`/artworks/${a._id}`} className="flex items-center gap-3 font-semibold hover:text-brand">
                  <img src={a.image} alt="" className="h-12 w-12 rounded-lg object-cover bg-brand-soft" />{a.title}
                </Link>
              </td>
              <td>{a.category}</td>
              <td>{money(a.price)}</td>
              <td><span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${a.sold ? "bg-hot/15 text-hot" : "bg-ok/15 text-ok"}`}>{a.sold ? "Sold" : "Available"}</span></td>
              <td>
                {a.sold ? <span className="text-xs text-muted">Locked after sale</span> : (
                  <div className="flex gap-2">
                    <Link href={`/dashboard/artist/artworks/${a._id}/edit`} className="btn btn-ghost !py-1.5">Edit</Link>
                    <button className="btn btn-danger !py-1.5" onClick={() => remove(a)}>Delete</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </Table>
      )}
    </>
  );
}
