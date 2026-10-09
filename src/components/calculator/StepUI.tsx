import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <fieldset className="min-w-0 border-t border-border pt-5">
      <legend className="mb-3 flex items-center gap-3 pr-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent text-sm font-semibold text-primary">{n}</span>
        <span className="text-base font-semibold text-secondary">{title}</span>
      </legend>
      {children}
    </fieldset>
  );
}

export function StepReveal({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, height: 0, y: -6 }}
      animate={{ opacity: 1, height: "auto", y: 0 }}
      exit={{ opacity: 0, height: 0, y: -6 }}
      transition={{ duration: reducedMotion ? 0 : 0.35, ease: "easeOut" }}
      className="overflow-hidden"
    >
      {children}
    </motion.div>
  );
}

export function Row({ label, value, bold = false }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={cn("grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 py-1.5", bold && "font-semibold text-secondary")}>
      <span className={cn("min-w-0 text-sm", bold ? "text-secondary" : "text-muted-foreground")}>{label}</span>
      <span className={cn("shrink-0 text-right text-sm tabular-nums", bold ? "text-secondary" : "text-muted-foreground")}>{value}</span>
    </div>
  );
}
