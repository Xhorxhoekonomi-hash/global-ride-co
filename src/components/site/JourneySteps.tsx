import type { LucideIcon } from "lucide-react";
import { useRouterState } from "@tanstack/react-router";
import { KeywordText } from "@/components/site/KeywordText";

/** Process timeline shared by import and service pages; same visual language as the homepage HomeJourney. */
export function JourneySteps({ steps, stepLabel = "Step" }: {
  steps: { n: number; title: string; body: string; icon?: LucideIcon }[];
  stepLabel?: string;
}) {
  const sq = useRouterState({ select: s => s.location.pathname.startsWith("/al") });
  return <ol data-draw className={`home-timeline journey-steps ${steps.length > 4 ? "journey-steps--long" : ""}`}>
    {steps.map(step => {
      const Icon = step.icon;
      return <li key={step.n} className="home-timeline-step">
        <span className="home-timeline-dot" aria-label={`${stepLabel} ${step.n}`} data-draw>{String(step.n).padStart(2, "0")}</span>
        <div>
          {Icon && <Icon className="home-timeline-icon" aria-hidden="true" />}
          <h3><KeywordText text={step.title} sq={sq} /></h3>
          <p><KeywordText text={step.body} sq={sq} /></p>
        </div>
      </li>;
    })}
  </ol>;
}
