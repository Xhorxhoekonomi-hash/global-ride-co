import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { BrandLogo } from "@/components/site/BrandLogo";

const KEY = "aw-welcome-choice";
const BOT = /bot|crawl|spider|slurp|lighthouse|headless|preview|facebookexternalhit|embedly|whatsapp|bingpreview|google-inspectiontool/i;

/**
 * One-time branded welcome overlay on the EN/SQ home entry. Client-only, layered on top of the
 * server-rendered homepage (no separate URL, no redirect); never shown on deep links or to bots.
 */
export function WelcomeScreen() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const first = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const path = window.location.pathname.replace(/\/+$/, "") || "/";
    if (path !== "/" && path !== "/al") return;
    if (BOT.test(navigator.userAgent) || navigator.webdriver) return;
    try {
      if (localStorage.getItem(KEY)) return;
    } catch {
      return;
    }
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    first.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") choose(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function choose(lang: "en" | "sq" | null) {
    try { localStorage.setItem(KEY, lang ?? "skip"); } catch { /* storage unavailable */ }
    setOpen(false);
    const onSq = window.location.pathname.startsWith("/al");
    if (lang === "sq" && !onSq) void navigate({ to: "/al" });
    if (lang === "en" && onSq) void navigate({ to: "/" });
  }

  if (!open) return null;
  return (
    <div className="welcome-screen" role="dialog" aria-modal="true" aria-labelledby="welcome-title">
      <div className="welcome-inner">
        <div className="welcome-logo"><BrandLogo className="w-56" /></div>
        <p className="welcome-slogan">Moving Cars Worldwide</p>
        <p id="welcome-title" className="welcome-line">Welcome to Alpha Worldwide<span aria-hidden="true"> · </span><span lang="sq">Mirë se vini në Alpha Worldwide</span></p>
        <div className="welcome-actions">
          <button ref={first} type="button" className="btn-pair btn-pair--primary" onClick={() => choose("en")}>Enter — English</button>
          <button type="button" className="btn-pair welcome-outline" lang="sq" onClick={() => choose("sq")}>Hyr — Shqip</button>
        </div>
        <button type="button" className="welcome-skip" onClick={() => choose(null)}>Skip</button>
      </div>
    </div>
  );
}
