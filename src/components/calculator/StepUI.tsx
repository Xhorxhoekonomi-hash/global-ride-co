import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-2.5 flex items-center gap-2">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy text-[11px] font-bold text-white">{n}</span>
        <label className="text-sm font-bold text-navy">{title}</label>
      </div>
      {children}
    </div>
  );
}

export function StepReveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0, y: -6 }}
      animate={{ opacity: 1, height: "auto", y: 0 }}
      exit={{ opacity: 0, height: 0, y: -6 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="overflow-hidden"
    >
      {children}
    </motion.div>
  );
}

export function Row({ label, value, bold = false }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={cn("flex items-baseline justify-between py-0.5", bold && "font-bold text-navy")}>
      <span className={cn("text-xs", bold ? "text-navy" : "text-slate-body")}>{label}</span>
      <span className={cn("text-xs tabular-nums", bold ? "text-navy" : "text-navy/80")}>{value}</span>
    </div>
  );
}
