import Link from "next/link";
export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <svg viewBox="0 0 200 140" className="mx-auto w-56" aria-hidden>
        <rect x="30" y="20" width="140" height="100" rx="6" fill="none" stroke="var(--ink)" strokeWidth="3" />
        <circle cx="75" cy="60" r="12" fill="var(--brand)" /><path d="M40 110l40-35 30 25 25-20 25 30z" fill="var(--brand-soft)" stroke="var(--ink)" strokeWidth="3" />
        <path d="M120 35l30 30M150 35l-30 30" stroke="var(--hot)" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <h1 className="text-4xl font-bold mt-6">Page Not Found</h1>
      <p className="text-muted mt-2">The page you're looking for isn't on the wall.</p>
      <Link href="/" className="btn btn-primary mt-6">Go home</Link>
    </div>
  );
}
