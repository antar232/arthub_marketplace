"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { useAuth, dashboardPath } from "./AuthProvider";
import GoogleBtn from "./GoogleBtn";

export default function AuthForm({ mode }) {
  const reg = mode === "register";
  const router = useRouter();
  const { user, login } = useAuth();
  const [f, setF] = useState({ name: "", email: "", password: "", confirm: "", role: "user" });
  const [busy, setBusy] = useState(false);
  const next = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("next") : null;

  useEffect(() => { if (user) router.replace(next || (reg ? "/" : user.role === "user" ? "/" : dashboardPath(user.role))); }, [user]);

  const done = (data) => { login(data); toast.success(reg ? "Welcome to ArtHub!" : "Welcome back!"); };
  const submit = async (e) => {
    e.preventDefault();
    if (reg && f.password !== f.confirm) return toast.error("Passwords do not match");
    setBusy(true);
    try { done(await api(`/auth/${mode}`, { method: "POST", body: f })); }
    catch (err) { toast.error(err.message); }
    setBusy(false);
  };
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  return (
    <div className="mx-auto max-w-md px-4 py-14">
      <div className="card p-8">
        <h1 className="text-3xl font-bold">{reg ? "Create your account" : "Welcome back"}</h1>
        <form onSubmit={submit} className="mt-6 space-y-4">
          {reg && <input className="input" placeholder="Full name" required value={f.name} onChange={set("name")} />}
          <input className="input" type="email" placeholder="Email" required value={f.email} onChange={set("email")} />
          <input className="input" type="password" placeholder="Password" required minLength={6} value={f.password} onChange={set("password")} />
          {reg && (
            <>
              <input className="input" type="password" placeholder="Confirm password" required value={f.confirm} onChange={set("confirm")} />
              <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Account type">
                {[["user", "I want to buy art"], ["artist", "I'm an artist"]].map(([v, l]) => (
                  <button type="button" key={v} role="radio" aria-checked={f.role === v} onClick={() => setF({ ...f, role: v })}
                    className={`rounded-lg border px-3 py-3 text-sm font-semibold ${f.role === v ? "border-brand bg-brand-soft text-brand" : "border-line"}`}>{l}</button>
                ))}
              </div>
            </>
          )}
          <button className="btn btn-primary w-full" disabled={busy}>{busy ? "Please wait…" : reg ? "Create account" : "Log in"}</button>
        </form>
        <div className="my-5 flex items-center gap-3 text-xs text-muted"><span className="h-px flex-1 bg-line" />or<span className="h-px flex-1 bg-line" /></div>
        <GoogleBtn role={f.role} onDone={done} />
        <p className="mt-6 text-sm text-muted text-center">
          {reg ? "Already have an account?" : "New to ArtHub?"}{" "}
          <Link className="text-brand font-semibold" href={reg ? "/login" : "/register"}>{reg ? "Log in" : "Create an account"}</Link>
        </p>
        {!reg && <p className="mt-3 text-xs text-muted text-center">Demo admin: admin@arthub.com / Admin@123</p>}
      </div>
    </div>
  );
}
