"use client";
export const Spinner = ({ full }) => (
  <div className={`flex items-center justify-center ${full ? "min-h-[60vh]" : "py-10"}`} role="status" aria-label="Loading">
    <div className="h-10 w-10 rounded-full border-4 border-brand-soft border-t-brand animate-spin" />
  </div>
);
export const Sk = ({ className = "" }) => <div className={`skeleton ${className}`} />;
export const CardSkeleton = () => (
  <div className="card overflow-hidden"><Sk className="aspect-[4/5] rounded-none" /><div className="p-3 space-y-2"><Sk className="h-4 w-3/4" /><Sk className="h-3 w-1/2" /></div></div>
);
export const RowSkeleton = ({ rows = 5 }) => (
  <div className="space-y-2">{Array.from({ length: rows }).map((_, i) => <Sk key={i} className="h-12" />)}</div>
);
export const Empty = ({ title, hint, children }) => (
  <div className="card p-10 text-center">
    <p className="font-display text-xl font-semibold">{title}</p>
    {hint && <p className="text-muted mt-1">{hint}</p>}
    {children && <div className="mt-4">{children}</div>}
  </div>
);
export const Table = ({ head, children }) => (
  <div className="card overflow-x-auto">
    <table className="w-full text-sm">
      <thead><tr className="text-left text-muted border-b border-line">{head.map((h) => <th key={h} className="px-4 py-3 font-semibold whitespace-nowrap">{h}</th>)}</tr></thead>
      <tbody className="[&>tr]:border-b [&>tr]:border-line [&>tr:last-child]:border-0 [&_td]:px-4 [&_td]:py-3">{children}</tbody>
    </table>
  </div>
);