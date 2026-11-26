"use client";
import { useEffect } from "react";
export function Vitals() {
  useEffect(() => {
    void import("web-vitals").then(({ onCLS, onLCP, onINP }) => {
      const record = (metric: { name: string; value: number }) =>
        performance.mark("portfolio:" + metric.name, { detail: metric.value });
      onCLS(record);
      onLCP(record);
      onINP(record);
    });
  }, []);
  return null;
}
