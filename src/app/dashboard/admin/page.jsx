"use client";
import { useAuth, dashboardPath } from "@/components/AuthProvider";
import { Spinner } from "@/components/ui";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Placeholder so the admin redirect after login does not 404. The admin dashboard is a separate task.
export default function AdminHome() {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (loading) return;
    if (!user) router.replace("/login?next=/dashboard/admin");
    else if (user.role !== "admin") router.replace(dashboardPath(user.role));
  }, [loading, user, router]);
  if (loading || user?.role !== "admin") return <Spinner full />;
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold">Admin dashboard</h1>
      <p className="text-muted mt-2">User, artwork and transaction management is coming next.</p>
    </div>
  );
}
