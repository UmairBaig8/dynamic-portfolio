"use client";

import { useEffect, useCallback, useRef } from "react";

export default function useUnsavedChanges(formRef, storageKey) {
  const dirty = useRef(false);

  const markDirty = useCallback(() => {
    dirty.current = true;
  }, []);

  const resetDirty = useCallback(() => {
    dirty.current = false;
    if (storageKey) localStorage.removeItem(storageKey);
  }, [storageKey]);

  useEffect(() => {
    if (!storageKey) return;

    const saved = localStorage.getItem(storageKey);
    if (saved && formRef.current) {
      try {
        const data = JSON.parse(saved);
        Object.entries(data).forEach(([name, value]) => {
          const el = formRef.current.querySelector(`[name="${name}"]`);
          if (el && !el.value) el.value = value;
        });
      } catch {}
    }

    const interval = setInterval(() => {
      if (!dirty.current || !formRef.current) return;
      const fd = new FormData(formRef.current);
      const data = {};
      fd.forEach((v, k) => { data[k] = v; });
      localStorage.setItem(storageKey, JSON.stringify(data));
    }, 5000);

    return () => clearInterval(interval);
  }, [storageKey, formRef]);

  useEffect(() => {
    function handleBeforeUnload(e) {
      if (!dirty.current) return;
      e.preventDefault();
      e.returnValue = "";
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return { markDirty, resetDirty };
}
