"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api } from "@/lib/api";

const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!localStorage.getItem("arthub_token")) { setUser(null); setLoading(false); return; }
    try {
      setUser((await api("/auth/me")).user);
    } catch (e) {
      // Only drop the token when the server says it is invalid, not on network errors
      if (e.status === 401) { localStorage.removeItem("arthub_token"); setUser(null); }
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const login = ({ token, user }) => { localStorage.setItem("arthub_token", token); setUser(user); };
  const logout = () => { localStorage.removeItem("arthub_token"); setUser(null); };

  return <Ctx.Provider value={{ user, loading, login, logout, refresh }}>{children}</Ctx.Provider>;
}

export const dashboardPath = (role) => (role === "admin" ? "/dashboard/admin" : role === "artist" ? "/dashboard/artist" : "/dashboard/user");