"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { useAuth } from "@/components/AuthProvider";
import { PageTitle } from "@/components/dashboard/Shell";
import ArtworkForm from "@/components/ArtworkForm";
import { RowSkeleton, Empty } from "@/components/ui";
import Link from "next/link";

export default function EditArtwork() {
  const { id } = useParams();
  const { user } = useAuth();
  const [art, setArt] = useState(undefined);

  useEffect(() => { api(`/artworks/${id}`).then(setArt).catch((e) => { setArt(null); if (e.status !== 404) toast.error(e.message); }); }, [id]);

  if (art === undefined) return <RowSkeleton rows={4} />;
  const mine = art && String(art.artistId) === String(user._id);
  if (!art || !mine || art.sold) {
    return (
      <Empty title={!art ? "Artwork not found" : art.sold ? "Sold artworks cannot be edited" : "You can only edit your own artworks"}>
        <Link href="/dashboard/artist/artworks" className="btn btn-primary">Back to my artworks</Link>
      </Empty>
    );
  }
  return (<><PageTitle title="Edit artwork" hint={art.title} /><ArtworkForm art={art} /></>);
}
