import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowDownRight, ArrowUpRight, RefreshCw, TriangleAlert } from "lucide-react";
import { getKrwEurRate } from "@/lib/fx/krw-eur.functions";
import { isStale, krwChangePct, krwToEur } from "@/lib/fx/krw-eur";

const T = {
  en: {
    eyebrow: "Exchange rate", title: "Korean won to euro",
    intro: "Korean listings are priced in won. Convert a listing price to see roughly what it is in euros.",
    oneEur: "1 EUR", oneM: "1,000,000 KRW", amount: "Amount in KRW", result: "Approximate value in EUR",
    change: "vs previous ECB day", loading: "Loading the latest rate…",
    error: "The exchange rate is unavailable right now. Please try again later.", retry: "Try again",
    stale: "This rate is more than a few days old.", cachedErr: "Could not refresh; showing the last rate we received.",
    source: "Source: European Central Bank euro reference rate, via Frankfurter. Reference date",
    note: "Indicative only. Banks and payment providers apply their own rates and fees.",
  },
  sq: {
    eyebrow: "Kursi i këmbimit", title: "Uon korean në euro",
    intro: "Makinat në Kore shiten në uon. Konvertoni çmimin për të parë afërsisht sa është në euro.",
    oneEur: "1 EUR", oneM: "1.000.000 KRW", amount: "Shuma në KRW", result: "Vlera e përafërt në EUR",
    change: "krahasuar me ditën e mëparshme të BQE", loading: "Po ngarkohet kursi i fundit…",
    error: "Kursi i këmbimit nuk është i disponueshëm tani. Provoni përsëri më vonë.", retry: "Provo përsëri",
    stale: "Ky kurs është më i vjetër se disa ditë.", cachedErr: "Nuk u rifreskua; po shfaqet kursi i fundit i marrë.",
    source: "Burimi: kursi referues i euros i Bankës Qendrore Evropiane, nëpërmjet Frankfurter. Data referuese",
    note: "Vetëm orientues. Bankat dhe ofruesit e pagesave aplikojnë kurset dhe tarifat e tyre.",
  },
};

export function KrwEurConverter({ sq = false }: { sq?: boolean }) {
  const t = sq ? T.sq : T.en;
  const locale = sq ? "sq-AL" : "en-GB";
  const fetchRate = useServerFn(getKrwEurRate);
  const q = useQuery({ queryKey: ["fx", "krw-eur"], queryFn: () => fetchRate(), staleTime: 60 * 60 * 1000, refetchInterval: 6 * 60 * 60 * 1000 });
  const [input, setInput] = useState("30000000");
  const krw = Number(input.replace(/[^\d]/g, "")) || 0;
  const rate = q.data?.rate ?? null;
  const fmt = useMemo(() => ({
    krw: new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }),
    eur: new Intl.NumberFormat(locale, { style: "currency", currency: "EUR", maximumFractionDigits: 2 }),
    int: new Intl.NumberFormat(locale),
  }), [locale]);
  const change = rate ? krwChangePct(rate) : null;

  return (
    <section className="bg-background" aria-labelledby="krw-eur-title">
      <div className="container-page section-y-tight">
        <div className="mx-auto max-w-3xl rounded-xl border border-border bg-card p-6 shadow-card md:p-8">
          <div className="eyebrow">{t.eyebrow}</div>
          <h2 id="krw-eur-title" className="mt-3 text-secondary">{t.title}</h2>
          <p className="mt-3 text-muted-foreground">{t.intro}</p>

          {q.isPending ? (
            <p className="mt-6 flex items-center gap-2 text-muted-foreground" role="status"><RefreshCw className="h-4 w-4 animate-spin" />{t.loading}</p>
          ) : !rate ? (
            <div className="mt-6 flex flex-wrap items-center gap-3" role="alert">
              <TriangleAlert className="h-5 w-5 text-destructive" /><span className="text-foreground">{t.error}</span>
              <button type="button" onClick={() => q.refetch()} className="min-h-11 font-semibold text-primary underline">{t.retry}</button>
            </div>
          ) : (
            <>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-background p-4">
                  <div className="text-sm text-muted-foreground">{t.oneEur}</div>
                  <div className="mt-1 text-2xl font-semibold text-secondary tabular-nums">{fmt.krw.format(rate.eurToKrw)} KRW</div>
                  {change !== null && (
                    <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                      {change >= 0 ? <ArrowUpRight className="h-4 w-4 text-primary" /> : <ArrowDownRight className="h-4 w-4 text-destructive" />}
                      KRW {change >= 0 ? "+" : ""}{change.toFixed(2)}% {t.change}
                    </div>
                  )}
                </div>
                <div className="rounded-lg border border-border bg-background p-4">
                  <div className="text-sm text-muted-foreground">{t.oneM}</div>
                  <div className="mt-1 text-2xl font-semibold text-secondary tabular-nums">{fmt.eur.format(krwToEur(1_000_000, rate.eurToKrw))}</div>
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:items-end">
                <label className="block">
                  <span className="form-label">{t.amount}</span>
                  <input className="form-control tabular-nums" inputMode="numeric" value={krw ? fmt.int.format(krw) : ""}
                    onChange={(e) => setInput(e.target.value.replace(/[^\d]/g, "").slice(0, 13))} placeholder="0" />
                </label>
                <div aria-live="polite">
                  <span className="form-label">{t.result}</span>
                  <div className="flex min-h-12 items-center text-2xl font-semibold text-primary tabular-nums">{fmt.eur.format(krwToEur(krw, rate.eurToKrw))}</div>
                </div>
              </div>
              {(q.data?.error || isStale(rate.date)) && (
                <p className="mt-4 flex items-center gap-2 text-sm text-foreground"><TriangleAlert className="h-4 w-4 text-destructive" />{q.data?.error ? t.cachedErr : t.stale}</p>
              )}
              <p className="mt-4 text-sm text-muted-foreground">{t.source}: {rate.date}. {t.note}</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
