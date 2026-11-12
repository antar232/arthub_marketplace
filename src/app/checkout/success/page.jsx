"use client";
import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle } from "lucide-react";
import { api, money } from "@/lib/api";
import { useAuth } from "@/components/AuthProvider";
import { Spinner } from "@/components/ui";

function Confirm() {
  const sessionId = useSearchParams().get("session_id");
  const { user, loading, refresh } = useAuth();
  const [state, setState] = useState({ status: "working" });
  const ran = useRef(false);

  useEffect(() => {
    if (loading || ran.current) return;
    if (!user) { window.location.replace(`/login?next=${encodeURIComponent(`/checkout/success?session_id=${sessionId}`)}`); return; }
    if (!sessionId) { setState({ status: "error", message: "No payment session was found." }); return; }
    ran.current = true; // the effect must not confirm twice (React strict mode)
    api("/payments/confirm", { method: "POST", body: { sessionId } })
      .then(async (r) => { await refresh(); setState({ status: "ok", ...r }); })
      .catch((e) => setState({ status: "error", message: e.message }));
  }, [loading, user, sessionId, refresh]);

  if (state.status === "working") return <div className="py-24"><Spinner /><p className="text-center text-muted">Confirming your payment…</p></div>;

  if (state.status === "error") {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <XCircle size={56} className="mx-auto text-hot" />
        <h1 className="text-3xl font-bold mt-4">We could not confirm that payment</h1>
        <p className="text-muted mt-2">{state.message}</p>
        <Link href="/artworks" className="btn btn-primary mt-6">Back to artworks</Link>
      </div>
    );
  }

  const tx = state.transaction;
  const isPlan = state.type === "subscription";
  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <CheckCircle2 size={56} className="mx-auto text-ok" />
      <h1 className="text-3xl font-bold mt-4">{isPlan ? `Welcome to ${tx.tier[0].toUpperCase() + tx.tier.slice(1)}!` : "Payment successful"}</h1>
      <p className="text-muted mt-2">{isPlan ? "Your plan is active and your purchase limit has been updated." : `“${tx.artworkTitle}” is now part of your collection.`}</p>
      <div className="card p-4 mt-6 text-sm text-left space-y-1">
        <div className="flex justify-between"><span className="text-muted">Amount paid</span><b>{money(tx.amount)}</b></div>
        <div className="flex justify-between"><span className="text-muted">Receipt for</span><span>{tx.userEmail}</span></div>
      </div>
      <div className="flex justify-center gap-3 mt-6">
        <Link href={isPlan ? "/dashboard/user" : "/dashboard/user/bought"} className="btn btn-primary">{isPlan ? "Go to dashboard" : "View my collection"}</Link>
        <Link href="/artworks" className="btn btn-ghost">Keep browsing</Link>
      </div>
    </div>
  );
}

export default function Page() {
  return <Suspense fallback={<Spinner full />}><Confirm /></Suspense>;
}
