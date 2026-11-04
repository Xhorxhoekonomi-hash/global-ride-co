import type { LucideIcon } from "lucide-react";

/** Process timeline shared by import and service pages; same visual language as the homepage HomeJourney. */
export function JourneySteps({ steps, stepLabel = "Step" }: {
  steps: { n: number; title: string; body: string; icon?: LucideIcon }[];
  stepLabel?: string;
}) {
  return <ol className={`home-timeline journey-steps ${steps.length > 4 ? "journey-steps--long" : ""}`}>
    {steps.map(step => {
      const Icon = step.icon;
      return <li key={step.n} className="home-timeline-step">
        <span className="home-timeline-dot" aria-label={`${stepLabel} ${step.n}`}>{step.n}</span>
        <div>
          {Icon && <Icon className="h-6 w-6 text-primary" aria-hidden="true" />}
          <h3>{step.title}</h3>
          <p>{step.body}</p>
        </div>
      </li>;
    })}
  </ol>;
}
