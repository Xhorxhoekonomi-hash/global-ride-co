import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { GUIDES } from "@/lib/guides";

type Heading = { id: string; text: string };
const slug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** Desktop-only table of contents built from the article's h2s; shown only on long articles. */
export function GuideToc({ path }: { path: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLHeadingElement>("main h2")).filter(h => !h.closest(".cta-band, .related-guides"));
    const list = nodes.map(h => { if (!h.id) h.id = slug(h.textContent ?? ""); return { id: h.id, text: h.textContent ?? "" }; }).filter(h => h.id);
    setHeadings(list.length >= 4 ? list : []);
    const hero = document.querySelector("main .text-hero");
    const end = document.querySelector(".related-guides");
    const state = { hero: true, end: false };
    const io = new IntersectionObserver(entries => {
      for (const e of entries) { if (e.target === hero) state.hero = e.isIntersecting; if (e.target === end) state.end = e.isIntersecting || e.boundingClientRect.top < 0; }
      setHidden(state.hero || state.end);
    });
    if (hero) io.observe(hero); else state.hero = false;
    if (end) io.observe(end);
    setHidden(state.hero);
    return () => io.disconnect();
  }, [path]);
  if (!headings.length) return null;
  return <nav className="guide-toc" data-hidden={hidden} aria-label="On this page">
    <p>On this page</p>
    <ol>{headings.map(h => <li key={h.id}><a href={`#${h.id}`}>{h.text}</a></li>)}</ol>
  </nav>;
}

/** Three other guides as cards at the end of every guide article. */
export function RelatedGuides({ path }: { path: string }) {
  const current = GUIDES.find(g => g.to === path);
  const others = GUIDES.filter(g => g.to !== path);
  const related = [...others.filter(g => g.category === current?.category), ...others.filter(g => g.category !== current?.category)].slice(0, 3);
  return <section className="related-guides">
    <div className="container-page">
      <h2>Related guides</h2>
      <div className="related-guides-grid">
        {related.map(g => <Link key={g.to} to={g.to} className="related-guide-card">
          <g.icon aria-hidden="true" />
          <h3>{g.title}</h3>
          <p>{g.summary}</p>
          <span>{g.readingTime} read <ArrowRight aria-hidden="true" /></span>
        </Link>)}
      </div>
    </div>
  </section>;
}
