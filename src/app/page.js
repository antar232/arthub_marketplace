"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Hero from "@/components/Hero";
import ArtCard from "@/components/ArtCard";
import { CardSkeleton } from "@/components/ui";
import { api, CATEGORIES } from "@/lib/api";

const Section = ({ title, link, children }) => (
  <section className="mx-auto max-w-7xl px-4 mt-16">
    <div className="flex items-end justify-between mb-6">
      <h2 className="text-3xl font-bold">{title}</h2>
      {link && <Link href={link[0]} className="text-sm font-semibold text-brand">{link[1]}</Link>}
    </div>
    {children}
  </section>
);

export default function Home() {
  const [featured, setFeatured] = useState(null);
  const [artists, setArtists] = useState(null);

  useEffect(() => {
    api("/artworks/featured").then(setFeatured).catch(() => { setFeatured([]); toast.error("Failed to load artworks"); });
    api("/users/top-artists").then(setArtists).catch(() => setArtists([]));
  }, []);

  return (
    <>
      <Hero />

      <Section title="Featured artworks" link={["/artworks", "See all artworks"]}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featured === null
            ? Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
            : featured.map((a, i) => (
                <motion.div key={a._id} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.45 }}>
                  <ArtCard art={a} />
                </motion.div>
              ))}
        </div>
        {featured?.length === 0 && <p className="text-muted">No artworks yet. Check back soon.</p>}
      </Section>

      <Section title="Top artists">
        <div className="grid sm:grid-cols-3 gap-4">
          {(artists || [null, null, null]).map((a, i) =>
            a ? (
              <Link key={a._id} href={`/artworks?artist=${a._id}`} className="card p-5 flex items-center gap-4 hover:border-brand transition-colors">
                {a.avatar ? <img src={a.avatar} alt="" className="h-16 w-16 rounded-full object-cover" /> : <span className="h-16 w-16 rounded-full bg-brand-soft text-brand grid place-items-center text-2xl font-bold">{a.name[0]}</span>}
                <div><p className="font-display font-semibold text-lg">{a.name}</p><p className="text-sm text-muted">{a.sales} {a.sales === 1 ? "sale" : "sales"}</p></div>
              </Link>
            ) : <div key={i} className="skeleton h-28" />
          )}
        </div>
        {artists?.length === 0 && <p className="text-muted">Artists will appear here once they join.</p>}
      </Section>

      <Section title="Browse by category">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {CATEGORIES.map((c) => (
            <Link key={c} href={`/artworks?category=${encodeURIComponent(c)}`} className="card p-6 font-display text-xl font-semibold hover:bg-brand hover:text-brand-ink hover:border-brand transition-colors">
              {c}
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}