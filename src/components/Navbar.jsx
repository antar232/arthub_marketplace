  "use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { dashLinks } from "@/lib/nav";


export default function Navbar() {
  const path = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [dd, setDd] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ddRef = useRef(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => { setOpen(false); setDd(false); }, [path]);
  useEffect(() => {
    const close = (e) => ddRef.current && !ddRef.current.contains(e.target) && setDd(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const link = (href, label) => {
    const active = href === "/" ? path === "/" : path.startsWith(href);
    return (
      <Link key={href} href={href} className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${active ? "bg-brand-soft text-brand" : "text-muted hover:text-ink"}`}>
        {label}
      </Link>
    );
  };
  const onLogout = () => { logout(); router.push("/"); };
  const items = user ? dashLinks[user.role] : [];

  const dashboard = user && (
    <div className="relative" ref={ddRef}>
      <button onClick={() => setDd(!dd)} aria-expanded={dd} className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold ${path.startsWith("/dashboard") ? "bg-brand-soft text-brand" : "text-muted hover:text-ink"}`}>
        Dashboard <ChevronDown size={14} />
      </button>
      {dd && (
        <div className="absolute right-0 mt-2 w-52 card p-1 shadow-lg z-50">
          {items.map(([l, h]) => <Link key={h} href={h} className="block px-3 py-2 rounded-lg text-sm hover:bg-brand-soft">{l}</Link>)}
        </div>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-2xl font-extrabold tracking-tight">Art<span className="text-brand">Hub</span></Link>

        <nav className="hidden md:flex items-center gap-1">
          {link("/", "Home")}{link("/artworks", "Browse Artworks")}{dashboard}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <button aria-label="Toggle dark mode" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} className="btn btn-ghost !p-2">
            {mounted && resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {!loading && (user ? (
            <>
              {user.avatar ? <img src={user.avatar} alt="" className="h-9 w-9 rounded-full object-cover" /> : <span className="h-9 w-9 rounded-full bg-brand text-brand-ink grid place-items-center font-bold">{user.name[0]}</span>}
              <button onClick={onLogout} className="btn btn-ghost">Logout</button>
            </>
          ) : (
            <><Link href="/login" className="btn btn-ghost">Login</Link><Link href="/register" className="btn btn-primary">Join ArtHub</Link></>
          ))}
        </div>

        <button className="md:hidden btn btn-ghost !p-2" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
      </div>

      {open && (
        <div className="md:hidden border-t border-line bg-surface px-4 py-3 flex flex-col gap-1">
          {link("/", "Home")}{link("/artworks", "Browse Artworks")}
          {items.map(([l, h]) => <Link key={h} href={h} className="px-3 py-2 text-sm text-muted">{l}</Link>)}
          <div className="flex gap-2 pt-2">
            <button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} className="btn btn-ghost">{mounted && resolvedTheme === "dark" ? "Light mode" : "Dark mode"}</button>
            {user ? <button onClick={onLogout} className="btn btn-primary">Logout</button> : <Link href="/login" className="btn btn-primary">Login</Link>}
          </div>
        </div>
      )}
    </header>
  );
}