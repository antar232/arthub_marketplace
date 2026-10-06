"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Generative "digital art": layered gradient blobs + arcs, seeded per slide
const SLIDES = [
  { c: ["#2f3ddb", "#7c5cff", "#ff7a59"], h: "Discover & Buy Original Art", p: "Browse one-of-a-kind pieces from independent artists and bring a story home." },
  { c: ["#0b8f7a", "#27d3a2", "#f4d35e"], h: "Meet artists before they're famous", p: "Follow emerging talent and collect work while it's still affordable." },
  { c: ["#e8431f", "#ff9a62", "#2b2d6e"], h: "Sell your art to the world", p: "Open an artist account, upload your work and get paid through Stripe." },
];

function Art({ c, i }) {
  return (
    <svg viewBox="0 0 600 600" className="w-full h-full" aria-hidden>
      <defs>
        {c.map((col, k) => (
          <radialGradient id={`g${i}${k}`} key={k}><stop offset="0" stopColor={col} /><stop offset="1" stopColor={col} stopOpacity="0" /></radialGradient>
        ))}
      </defs>
      <rect width="600" height="600" rx="32" fill={c[0]} opacity=".12" />
      <motion.circle cx="220" cy="240" r="210" fill={`url(#g${i}0)`} animate={{ cx: [220, 260, 220] }} transition={{ duration: 9, repeat: Infinity }} />
      <motion.circle cx="400" cy="360" r="190" fill={`url(#g${i}1)`} animate={{ cy: [360, 320, 360] }} transition={{ duration: 11, repeat: Infinity }} />
      <circle cx="330" cy="200" r="120" fill={`url(#g${i}2)`} />
      {[110, 160, 210, 260].map((r, k) => (
        <circle key={r} cx="300" cy="300" r={r} fill="none" stroke="var(--ink)" strokeOpacity={0.14 - k * 0.025} strokeDasharray={k % 2 ? "4 10" : "none"} />
      ))}
      <rect x="150" y="150" width="300" height="300" rx="8" fill="none" stroke="var(--ink)" strokeOpacity=".5" />
    </svg>
  );
}

export default function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % SLIDES.length), 6000); return () => clearInterval(t); }, []);
  const s = SLIDES[i];
  return (
    <section className="mx-auto max-w-7xl px-4 pt-10 pb-6 md:pt-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05]">{s.h}</h1>
              <p className="mt-5 text-lg text-muted max-w-lg">{s.p}</p>
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/artworks" className="btn btn-primary !px-6 !py-3 text-base">Browse Artworks</Link>
            <Link href="/register" className="btn btn-ghost !px-6 !py-3 text-base">Become an artist</Link>
          </div>
          <div className="mt-8 flex gap-2" role="tablist">
            {SLIDES.map((_, k) => (
              <button key={k} role="tab" aria-label={`Slide ${k + 1}`} onClick={() => setI(k)} className={`h-1.5 rounded-full transition-all ${k === i ? "w-10 bg-brand" : "w-4 bg-line"}`} />
            ))}
          </div>
        </div>
        <div className="aspect-square max-w-[520px] w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={i} className="h-full" initial={{ opacity: 0, scale: 0.94, rotate: -2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
              <Art c={s.c} i={i} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}