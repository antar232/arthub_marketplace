"use client";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "./api";

// Loads `path` on mount. `data` is null while loading; `error` is set when the request fails.
export function useApi(path) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const load = useCallback(() => {
    setError(null);
    return api(path).then(setData).catch((e) => { setError(e); toast.error(e.message || "Failed to load data"); });
  }, [path]);
  useEffect(() => { load(); }, [load]);
  return { data, error, reload: load, loading: data === null && !error };
}
