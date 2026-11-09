import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

/** Shared layout for the Albanian legal pages; mirrors the English legal page markup. */
export function LegalPage({ crumb, title, updated, intro, sections, note }: {
  crumb: string;
  title: string;
  updated: string;
  intro: ReactNode;
  sections: { h: string; body: ReactNode }[];
  note?: string;
}) {
  return (
    <>
      <Breadcrumbs items={[{ label: crumb }]} />
      <section className="bg-background">
        <div className="container-page py-16 md:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="eyebrow">Ligjore</div>
            <h1 className="mt-3 text-navy">{title}</h1>
            <p className="mt-3 text-sm text-slate-body">{updated}</p>
            <div className="mt-10 space-y-8 text-sm leading-relaxed text-slate-body">
              <div className="rounded-xl border border-border bg-card p-6"><p>{intro}</p></div>
              {sections.map((s) => (
                <section key={s.h}>
                  <h2 className="text-navy">{s.h}</h2>
                  <div className="mt-3">{s.body}</div>
                </section>
              ))}
              {note && <p className="text-xs text-slate-body">{note}</p>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
