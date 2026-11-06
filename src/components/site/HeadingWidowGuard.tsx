import { useEffect } from "react";

/**
 * Typographic widow guard: in headings of 4+ words, joins the last two words with a
 * non-breaking space so a single word never sits alone on the last line. Presentation only
 * (text nodes' spacing), runs after hydration and on every page change.
 */
export function glueLastWords(text: string): string {
  const m = text.match(/^([\s\S]*\S)[ ]+(\S{1,16})(\s*)$/);
  if (!m) return text;
  return `${m[1]}\u00a0${m[2]}${m[3]}`;
}

export function HeadingWidowGuard({ pathname }: { pathname: string }) {
  useEffect(() => {
    const tooWide = new WeakMap<Text, string>();
    const run = () => {
      document.querySelectorAll<HTMLElement>("main h1, main h2, main h3").forEach((h) => {
        const words = (h.textContent ?? "").trim().split(/\s+/);
        if (words.length < 4) return;
        const walker = document.createTreeWalker(h, NodeFilter.SHOW_TEXT);
        let last: Text | null = null;
        for (let n = walker.nextNode(); n; n = walker.nextNode()) if (n.nodeValue?.trim()) last = n as Text;
        if (!last?.nodeValue || tooWide.get(last) === last.nodeValue) return;
        const next = glueLastWords(last.nodeValue);
        if (next === last.nodeValue) return;
        const original = last.nodeValue;
        if (!/[ \t\n]/.test(next.trim())) return;
        last.nodeValue = next;
        // Never let the joined pair overflow a narrow column.
        if (h.scrollWidth > h.clientWidth + 1) { last.nodeValue = original; tooWide.set(last, original); }
      });
      document.documentElement.dataset.headingsGlued = "true";
    };
    let frame = requestAnimationFrame(run);
    // Re-apply when React re-renders heading text (hydration, data loads, client navigation).
    const observer = new MutationObserver(() => { cancelAnimationFrame(frame); frame = requestAnimationFrame(run); });
    const main = document.querySelector("main");
    if (main) observer.observe(main, { childList: true, subtree: true, characterData: true });
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [pathname]);
  return null;
}
