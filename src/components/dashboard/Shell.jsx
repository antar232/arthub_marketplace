"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth, dashboardPath } from "@/components/AuthProvider";
import { Spinner } from "@/components/ui";
import { dashLinks } from "@/lib/nav";

// Guards a dashboard section by role. It waits for the session check (`loading`) before deciding,
// so reloading a private route never bounces a logged-in user to /login.
export default function Shell({ role, children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace(`/login?next=${encodeURIComponent(path)}`);
    else if (user.role !== role && user.role !== "admin") router.replace(dashboardPath(user.role));
  }, [loading, user, role, router, path]);

  if (loading || !user || (user.role !== role && user.role !== "admin")) return <Spinner full />;

  const links = dashLinks[role];
  const isActive = (href) => (href === links[0][1] ? path === href : path.startsWith(href) && !(href.endsWith("/artworks") && path.endsWith("/new")));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 grid gap-6 lg:grid-cols-[230px_1fr]">
      <aside className="lg:sticky lg:top-24 self-start">
        <div className="card p-4 flex items-center gap-3 mb-3">
          {user.avatar ? <img src={user.avatar} alt="" className="h-11 w-11 rounded-full object-cover" /> : <span className="h-11 w-11 rounded-full bg-brand text-brand-ink grid place-items-center font-bold">{user.name[0]}</span>}
          <div className="min-w-0">
            <p className="font-semibold truncate">{user.name}</p>
            <p className="text-xs text-muted capitalize">{user.role}{role === "user" ? ` · ${user.subscriptionTier}` : ""}</p>
          </div>
        </div>
        <nav className="card p-1.5 flex lg:flex-col gap-1 overflow-x-auto" aria-label="Dashboard">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className={`whitespace-nowrap px-3 py-2 rounded-lg text-sm font-semibold ${isActive(href) ? "bg-brand-soft text-brand" : "text-muted hover:text-ink"}`}>{label}</Link>
          ))}
        </nav>
      </aside>
      <section className="min-w-0">{children}</section>
    </div>
  );
}

export const PageTitle = ({ title, hint, children }) => (
  <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
    <div><h1 className="text-3xl font-bold">{title}</h1>{hint && <p className="text-muted mt-1 text-sm">{hint}</p>}</div>
    {children}
  </div>
);

export const Stat = ({ label, value, sub }) => (
  <div className="card p-5">
    <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
    <p className="font-display text-3xl font-bold mt-1">{value}</p>
    {sub && <p className="text-xs text-muted mt-1">{sub}</p>}
  </div>
);

// Dependency-free bar chart for monthly revenue.
export function BarChart({ data, format }) {
  const max = Math.max(...data.map((d) => d.revenue), 1);
  return (
    <div className="card p-5">
      <p className="font-display font-semibold mb-4">Revenue, last 6 months</p>
      <div className="flex items-end gap-3 h-44" role="img" aria-label="Monthly revenue bar chart">
        {data.map((d) => (
          <div key={d.label} className="flex-1 flex flex-col items-center justify-end h-full gap-1">
            <span className="text-[11px] text-muted">{d.revenue ? format(d.revenue) : ""}</span>
            <div className="w-full rounded-t-md bg-brand" style={{ height: `${Math.max((d.revenue / max) * 100, d.revenue ? 4 : 1)}%`, opacity: d.revenue ? 1 : 0.25 }} />
            <span className="text-xs text-muted">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
