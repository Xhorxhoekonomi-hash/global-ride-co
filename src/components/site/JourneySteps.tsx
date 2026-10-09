import { ArrowRight, type LucideIcon } from "lucide-react";

export function JourneySteps({ steps, stepLabel = "Step" }: {
  steps: { n: number; title: string; body: string; icon?: LucideIcon }[];
  stepLabel?: string;
}) {
  return <ol className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
    {steps.map(step => {
      const Icon = step.icon ?? ArrowRight;
      return <li key={step.n} className="min-w-0 border-t border-border pt-5">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <span className="text-xs font-semibold text-primary">{stepLabel} {String(step.n).padStart(2, "0")}</span>
          <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-primary" />
        </div>
        <h3 className="mt-4 text-lg font-semibold leading-snug text-secondary">{step.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
      </li>;
    })}
  </ol>;
}