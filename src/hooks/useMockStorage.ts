"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useMockStorage<T>(key: string, fallback: T) {
  const fallbackRef = useRef(fallback);
  fallbackRef.current = fallback;
  const [value, setValue] = useState<T>(() => fallback);

  useEffect(() => {
    const stored = localStorage.getItem(key);

    if (!stored) {
      setValue(fallbackRef.current);
      return;
    }

    try {
      setValue(JSON.parse(stored) as T);
    } catch {
      setValue(fallbackRef.current);
    }
  }, [key]);

  const update = useCallback(
    (next: T | ((current: T) => T)) => {
      setValue((current) => {
        const resolved = typeof next === "function" ? (next as (current: T) => T)(current) : next;
        localStorage.setItem(key, JSON.stringify(resolved));
        return resolved;
      });
    },
    [key],
  );

  return [value, update] as const;
}
