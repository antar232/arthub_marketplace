"use client";
import Link from "next/link";
import toast from "react-hot-toast";

const Social = ({ label, d }) => (
  <a href="#" aria-label={label} className="h-9 w-9 grid place-items-center rounded-full border border-line hover:border-brand hover:text-brand transition-colors">
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d={d} /></svg>
  </a>
);

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface mt-16">
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-extrabold">Art<span className="text-brand">Hub</span></p>
          <p className="text-muted mt-2 max-w-xs text-sm">Original work from independent artists, delivered to collectors everywhere.</p>
          <div className="flex gap-2 mt-4">
            <Social label="Facebook" d="M13 22v-8h3l.5-4H13V8c0-1 .3-2 2-2h1.6V2.5C16.3 2.4 15.3 2 14 2c-3 0-5 1.8-5 5v3H6v4h3v8z" />
            <Social label="Instagram" d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zM17.5 6a1 1 0 100 2 1 1 0 000-2zM7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3z" />
            <Social label="X" d="M18 2h3l-7 8 8 12h-6l-5-7-6 7H2l8-9L2 2h6l4 6z" />
          </div>
        </div>
        <div>
          <p className="font-semibold mb-3">Quick links</p>
          <ul className="space-y-2 text-sm text-muted">
            {["About", "Contact", "Privacy Policy"].map((l) => <li key={l}><Link href="#" className="hover:text-brand">{l}</Link></li>)}
          </ul>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Thanks! You're on the list."); e.target.reset(); }}>
          <p className="font-semibold mb-3">New drops in your inbox</p>
          <div className="flex gap-2">
            <input type="email" required placeholder="you@example.com" aria-label="Email" className="input" />
            <button className="btn btn-primary">Subscribe</button>
          </div>
        </form>
      </div>
      <p className="border-t border-line py-4 text-center text-xs text-muted">© {new Date().getFullYear()} ArtHub. All rights reserved.</p>
    </footer>
  );
}