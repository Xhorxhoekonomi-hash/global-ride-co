/**
 * Lightweight analytics event layer.
 * Reads IDs from environment variables — nothing is hardcoded.
 * Set VITE_GA4_ID / VITE_CLARITY_ID to activate each provider.
 * Absent = fully disabled, no errors, no network calls.
 * Respects a consent flag before loading any third-party script.
 */

const GA4_ID = import.meta.env.VITE_GA4_ID as string | undefined;
const CLARITY_ID = import.meta.env.VITE_CLARITY_ID as string | undefined;

export type AnalyticsEventName =
  | "quote_started"
  | "quote_submitted"
  | "whatsapp_clicked"
  | "calculator_started"
  | "calculator_completed"
  | "inspection_requested"
  | "vehicle_link_submitted"
  | "airfreight_quote_submitted"
  | "airport_handling_requested"
  | "phone_clicked"
  | "email_clicked"
  | "language_changed";

let consentGiven = false;
let providersLoaded = false;

export function setAnalyticsConsent(granted: boolean) {
  consentGiven = granted;
  if (granted) loadProviders();
}

function loadProviders() {
  if (providersLoaded || typeof window === "undefined" || !consentGiven) return;
  providersLoaded = true;

  if (GA4_ID) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    document.head.appendChild(script);
    (window as unknown as { dataLayer: unknown[] }).dataLayer =
      (window as unknown as { dataLayer: unknown[] }).dataLayer || [];
    function gtag(...args: unknown[]) {
      (window as unknown as { dataLayer: unknown[] }).dataLayer.push(args);
    }
    gtag("js", new Date());
    gtag("config", GA4_ID);
    (window as unknown as { gtag: typeof gtag }).gtag = gtag;
  }

  if (CLARITY_ID) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
    document.head.appendChild(script);
  }
}

export function trackEvent(name: AnalyticsEventName, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined" || !consentGiven || (!GA4_ID && !CLARITY_ID)) return;
  const gtagFn = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (gtagFn) gtagFn("event", name, params);
  if (import.meta.env.DEV) {
    console.info("[analytics]", name, params);
  }
}
