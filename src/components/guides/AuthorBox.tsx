import { Link } from "@tanstack/react-router";
import { ShieldCheck, Award, MessageCircle } from "lucide-react";

/**
 * Reusable author/credibility box for editorial guide pages.
 * Uses only the two verified sitewide stats (15,000+ vehicles, 10+ years) —
 * never a name, headshot, or credential that hasn't been established
 * elsewhere in the project. Emits nested Organization schema via the
 * parent page's existing Article schema (author/publisher fields) rather
 * than duplicating a separate top-level Organization block here.
 */
export function AuthorBox() {
  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-card">
      <div className="flex flex-wrap items-start gap-4 sm:flex-nowrap">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-teal/10 text-teal">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold text-navy">Alpha Worldwide</div>
          <div className="text-xs text-slate-body">Vehicle Import Specialists</div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-body">
            <span className="inline-flex items-center gap-1"><Award className="h-3.5 w-3.5 text-teal" /> 15,000+ vehicles transported</span>
            <span className="inline-flex items-center gap-1"><Award className="h-3.5 w-3.5 text-teal" /> 10+ years experience</span>
          </div>
        </div>
        <Link to="/contact" className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">
          <MessageCircle className="h-3.5 w-3.5" /> Contact Us
        </Link>
      </div>
    </div>
  );
}
