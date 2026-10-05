"use client";
import { ThemeProvider } from "next-themes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./AuthProvider";

export default function Providers({ children }) {
  const inner = (
    <AuthProvider>
      {children}
      <Toaster position="top-center" toastOptions={{ style: { background: "var(--surface)", color: "var(--ink)", border: "1px solid var(--line)" } }} />
    </AuthProvider>
  );
  const id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {id ? <GoogleOAuthProvider clientId={id}>{inner}</GoogleOAuthProvider> : inner}
    </ThemeProvider>
  );
}