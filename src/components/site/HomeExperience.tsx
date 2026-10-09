import { Link } from "@tanstack/react-router";
import { ArrowRight, CarFront, Ship, Calculator, ScanLine, Link2, ShieldCheck, Gavel, MapPin, MessageCircle, FileText, Plane, Globe2, Check, BookOpen, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { QuoteForm } from "@/components/site/QuoteForm";
import { PhotoGallery } from "@/components/site/PhotoGallery";
import { ALPHA_ALBUMS, PHOTO_SELECTIONS } from "@/lib/alpha-photos";
import { CONTACT, type Faq } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

const COPY = {
  en: {
    eyebrow: "ALPHA WORLDWIDE ALBANIA · INTERNATIONAL VEHICLE LOGISTICS",
    title: "Alpha Worldwide.", titleEnd: "International car shipping.",
    intro: "From finding the right car to bringing it home. Sourcing, inspections and shipping from the USA, South Korea, Dubai and Europe.",
    calculate: "Calculate Shipping", quote: "Get a Quote", chat: "Talk to our team", start: "What would you like to do?",
    tasks: ["Buy a Car", "Ship a Car", "Calculate Costs", "Inspect a Car"], taskBodies: ["Find it. We’ll help with the rest.", "From origin to your destination.", "See your shipping breakdown.", "Know more before you buy."],
    originsKicker: "A world of possibilities", originsTitle: "Where will your next car come from?", originsBody: "Choose your origin. Explore the process, then let us take care of the logistics.",
    countries: ["USA", "South Korea", "Dubai / UAE", "Europe"], countryBodies: ["Auctions, dealers & private sellers", "Vehicle sourcing & export", "Purchasing & international shipping", "Cross-border sourcing & transport"], originLink: "Explore importing", canada: "Looking to import from Canada?", canadaLink: "Explore Canada",
    stepsKicker: "From the first link to the final mile", stepsTitle: "One journey. A clear next step.", steps: ["Share your car", "Check before buying", "Approve the purchase", "We arrange shipping"], stepBodies: ["Send a listing, auction lot or tell us what you’re looking for.", "We confirm inspection availability and review the vehicle details.", "Choose your vehicle and approve the proposed cost breakdown.", "Transport, export paperwork and arrival coordination — handled."], process: "See the full process",
    servicesKicker: "The right support, at every stage", servicesTitle: "More than moving a car.", servicesLink: "All services", serviceNames: ["Ocean shipping", "Pre-purchase inspection", "Vehicle airfreight"], serviceBodies: ["Container or RoRo. We help choose the right route for your vehicle.", "Photos, diagnostics and a condition report, subject to vehicle access.", "A tailored option for urgent and high-value vehicle shipments."], container: "Container", roro: "RoRo", inspection: "Request an inspection", air: "Explore airfreight",
    calcKicker: "A clearer view of the costs", calcTitle: "Know what goes into your shipping estimate.", calcBody: "Explore an itemized estimate for USA and South Korea routes using our existing rate tables. Your final quote is confirmed by the team before booking.", calcButton: "Open the Calculator", calcLabel: "Your shipping breakdown", calcRoute: "USA / South Korea", calcRows: ["Land transport", "Auction fees", "Ocean freight", "Port unloading"], calcTotal: "Estimated shipping total", calcNote: "Amounts depend on your route and vehicle. Customs and import taxes are not included.", calcDisclaimer: "About shipping estimates",
    presenceKicker: "International reach. A local conversation.", presenceTitle: "From Dubai to Durrës, connected to you.", presenceBody: "Global headquarters in Dubai. European and Albanian operations in Durrës. Speak directly with our team about your vehicle and destination.", headquarters: "Global headquarters", operations: "European & Albanian operations", destinations: "Explore destinations", delivery: "Deliveries & updates", deliveryBody: "Explore our delivered-vehicles page or connect with Alpha Worldwide Albania on Instagram.", deliveryLink: "Delivered vehicles", instagram: "Visit Instagram",
    guidesKicker: "A little knowledge goes a long way", guidesTitle: "Make your next move with confidence.", guidesLink: "All guides", guideCategory: ["Buying abroad", "Shipping options", "Before you buy"], guideTitles: ["Buying a car from USA auctions", "Container or RoRo: which is right?", "What to check before buying a used car"], read: "Read the guide",
    faqKicker: "Good questions. Clear answers.", faqTitle: "Let’s make it straightforward.", allFaq: "More questions?", finalKicker: "Your next step", finalTitle: "Already found a car?", finalBody: "Send us the link. We’ll review the details and help you move forward.", finalTrust: ["Direct WhatsApp contact", "Vehicle-specific inspection availability", "Quote confirmed before booking"],
  },
  sq: {
    eyebrow: "ALPHA WORLDWIDE ALBANIA · TRANSPORT NDËRKOMBËTAR AUTOMJETESH",
    title: "Alpha Worldwide.", titleEnd: "Transport makinash.",
    intro: "Nga gjetja e makinës së duhur deri te mbërritja e saj. Blerje, inspektim dhe transport nga Amerika, Koreja e Jugut, Dubai dhe Evropa.",
    calculate: "Llogarit transportin", quote: "Merr një ofertë", chat: "Fol me ekipin", start: "Çfarë dëshironi të bëni?",
    tasks: ["Bli një makinë", "Transporto makinën", "Llogarit kostot", "Inspekto makinën"], taskBodies: ["Gjeni makinën. Ne ju ndihmojmë më tej.", "Nga origjina në destinacionin tuaj.", "Shihni ndarjen e kostove të transportit.", "Më shumë siguri para blerjes."],
    originsKicker: "Mundësi përtej kufijve", originsTitle: "Nga do të vijë makina juaj e radhës?", originsBody: "Zgjidhni origjinën. Njihuni me procesin dhe na lini neve logjistikën.",
    countries: ["Amerikë", "Koreja e Jugut", "Dubai / EBA", "Evropë"], countryBodies: ["Ankande, tregtarë dhe shitës privatë", "Gjetje automjeti dhe eksport", "Blerje dhe transport ndërkombëtar", "Blerje dhe transport ndërkufitar"], originLink: "Eksploro importin", canada: "Dëshironi të importoni nga Kanadaja?", canadaLink: "Kanada (EN)",
    stepsKicker: "Nga linku i parë te mbërritja", stepsTitle: "Një proces. Hapa të qartë.", steps: ["Dërgoni makinën", "Verifikimi para blerjes", "Miratoni blerjen", "Organizojmë transportin"], stepBodies: ["Dërgoni linkun, numrin e lotit ose na tregoni çfarë kërkoni.", "Konfirmojmë mundësinë e inspektimit dhe shqyrtojmë të dhënat.", "Zgjidhni automjetin dhe miratoni përllogaritjen e kostove.", "Transporti, dokumentet e eksportit dhe koordinimi i mbërritjes."], process: "Procesi i plotë (EN)",
    servicesKicker: "Mbështetje në çdo hap", servicesTitle: "Më shumë se transport.", servicesLink: "Të gjitha shërbimet (EN)", serviceNames: ["Transport detar", "Inspektim para blerjes", "Transport ajror"], serviceBodies: ["Kontenier ose RoRo. Ju ndihmojmë të zgjidhni rrugën e duhur.", "Foto, diagnostikim dhe raport gjendjeje, sipas aksesit në automjet.", "Një zgjidhje për transport urgjent dhe automjete me vlerë të lartë."], container: "Kontenier", roro: "RoRo", inspection: "Kërko inspektim", air: "Eksploro transportin ajror",
    calcKicker: "Më shumë qartësi për kostot", calcTitle: "Njihuni me kostot e transportit.", calcBody: "Shihni përllogaritjen për rrugët nga Amerika dhe Koreja e Jugut sipas tabelave tona të tarifave. Ekipi konfirmon ofertën përfundimtare para rezervimit.", calcButton: "Hap kalkulatorin", calcLabel: "Ndarja e kostove të transportit", calcRoute: "Amerikë / Koreja e Jugut", calcRows: ["Transporti tokësor", "Tarifat e ankandit", "Transporti detar", "Shkarkimi në port"], calcTotal: "Totali i përllogaritur", calcNote: "Vlerat varen nga rruga dhe automjeti. Dogana dhe taksat e importit nuk përfshihen.", calcDisclaimer: "Rreth përllogaritjeve (EN)",
    presenceKicker: "Shtrirje ndërkombëtare. Komunikim lokal.", presenceTitle: "Nga Dubai në Durrës, pranë jush.", presenceBody: "Selia qendrore në Dubai. Operacionet në Evropë dhe Shqipëri në Durrës. Flisni drejtpërdrejt me ekipin për automjetin dhe destinacionin tuaj.", headquarters: "Selia qendrore", operations: "Operacionet në Evropë dhe Shqipëri", destinations: "Eksploro destinacionet (EN)", delivery: "Dorëzime dhe përditësime", deliveryBody: "Vizitoni faqen e automjeteve të dorëzuara ose ndiqni Alpha Worldwide Albania në Instagram.", deliveryLink: "Automjetet e dorëzuara (EN)", instagram: "Vizito Instagram",
    guidesKicker: "Informacioni bën diferencën", guidesTitle: "Hapi i radhës, me më shumë siguri.", guidesLink: "Të gjithë udhëzuesit (EN)", guideCategory: ["Blerje jashtë vendit · EN", "Mënyrat e transportit · EN", "Para blerjes · EN"], guideTitles: ["Blerja e makinës nga ankandet amerikane", "Kontenier apo RoRo: si të zgjidhni?", "Çfarë të kontrolloni para blerjes"], read: "Lexo udhëzuesin (EN)",
    faqKicker: "Pyetje të mira. Përgjigje të qarta.", faqTitle: "Le ta bëjmë më të thjeshtë.", allFaq: "Më shumë pyetje? (EN)", finalKicker: "Hapi juaj i radhës", finalTitle: "E keni gjetur makinën?", finalBody: "Na dërgoni linkun. Shqyrtojmë të dhënat dhe ju ndihmojmë me hapat e tjerë.", finalTrust: ["Kontakt direkt në WhatsApp", "Inspektim sipas disponueshmërisë", "Ofertë e konfirmuar para rezervimit"],
  },
};
const TASK_ICONS = [CarFront, Ship, Calculator, ScanLine];
const STEP_ICONS = [Link2, ScanLine, Gavel, Ship];
const GUIDE_ROUTES = ["/guides/how-to-buy-a-car-from-usa-auctions", "/guides/container-vs-roro-car-shipping", "/guides/how-to-check-a-used-car-before-buying"];
const GUIDE_IMAGES = [PHOTO_SELECTIONS.porsche, PHOTO_SELECTIONS.container, PHOTO_SELECTIONS.silverFerrari];
const HOME_GALLERY_PHOTOS = ALPHA_ALBUMS.filter((album) => ["urus", "porsche", "blue-ferrari", "silver-ferrari", "green-ferrari", "cybertruck"].includes(album.id)).flatMap((album) => album.photos);
const ORIGIN_PHOTOS = [PHOTO_SELECTIONS.porsche, undefined, PHOTO_SELECTIONS.blueFerrari, undefined];

export function HomeExperience({ locale, faqs }: { locale: "en" | "sq"; faqs: Faq[] }) {
  const al = locale === "sq";
  const c = COPY[locale];
  const contact = al ? "/al/kontakt" : "/contact";
  const calculator = al ? "/al/kalkulator-transporti" : "/calculator";
  const inspect = al ? "/al/inspektim-makinash" : "/inspection-service";
  const container = al ? "/al/transport-me-kontenier" : "/container-shipping";
  const roro = al ? "/al/transport-roro" : "/roro-shipping";
  const air = al ? "/al/transport-ajror-makinash" : "/airfreight";
  const origins = al ? ["/al/makina-nga-amerika", "/al/makina-nga-korea", "/al/makina-nga-dubai", "/import-europe"] : ["/import-usa", "/import-korea", "/import-uae", "/import-europe"];
  const taskRoutes = [al ? "/al/ankande-amerikane" : "/auction-access", container, calculator, inspect];
  const whatsapp = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(al ? "Përshëndetje Alpha Worldwide, dua të importoj një makinë në Shqipëri." : "Hello Alpha Worldwide, I found a vehicle I'd like help with.")}`;
  const heroSource = al ? "al-home-hero" : "hero";
  return <div className="bg-background text-foreground">
    <section className="overflow-hidden bg-hero-surface">
      <div className="container-page grid items-center gap-8 py-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] lg:gap-12 lg:py-10"><div className="home-reveal min-w-0">
        <p className="text-[10px] font-semibold leading-relaxed text-primary md:text-xs">{c.eyebrow}</p>
        <h1 className="mt-4 text-4xl font-semibold leading-[1.12] text-navy md:text-5xl lg:text-6xl">{c.title}<br /><span className="text-muted-foreground">{c.titleEnd}</span></h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">{c.intro}</p>
        <div className="mt-7 flex max-w-xl flex-wrap gap-3">
          <Button asChild className="h-12 px-5"><Link to={calculator} onClick={() => trackEvent("calculator_started", { source: heroSource })}><Calculator />{c.calculate}</Link></Button>
          <Button variant="outline" asChild className="h-12 px-5 text-navy"><Link to={contact} onClick={() => trackEvent("quote_started", { source: heroSource })}>{c.quote}<ArrowRight /></Link></Button>
        </div>
        <a href={whatsapp} target="_blank" rel="noreferrer noopener" onClick={() => trackEvent("whatsapp_clicked", { source: heroSource })} className="mt-4 inline-flex min-h-11 items-center gap-2 text-xs font-medium text-muted-foreground hover:text-primary"><MessageCircle className="h-4 w-4" />{c.chat}<ArrowRight className="h-3 w-3" /></a>
      </div>
      <div className="home-hero-media"><img src={PHOTO_SELECTIONS.urus.src} alt={PHOTO_SELECTIONS.urus[locale]} width={1086} height={1448} fetchPriority="high" className="home-hero-image" /></div></div>
    </section>

    <section className="border-y border-border bg-background" aria-label={c.start}>
      <div className="container-page grid grid-cols-2 md:grid-cols-4">
        {c.tasks.map((task, i) => { const Icon = TASK_ICONS[i]; return <Link key={task} to={taskRoutes[i]} className={`home-task group min-w-0 px-3 py-6 transition-colors hover:bg-accent md:px-6 md:py-7 ${i < 3 ? "md:border-r md:border-border" : ""}`} onClick={() => { if (i === 2) trackEvent("calculator_started", { source: heroSource }); if (i === 3) trackEvent("inspection_requested", { source: "hero" }); }}>
          <div className="flex items-center justify-between gap-2"><Icon className="h-6 w-6 shrink-0 text-primary" /><ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" /></div><h2 className="mt-4 text-base font-semibold text-navy">{task}</h2><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{c.taskBodies[i]}</p>
        </Link>; })}
      </div>
    </section>

    <section className="home-section"><div className="container-page">
      <p className="home-kicker">{c.originsKicker}</p><h2 className="home-heading max-w-2xl">{c.originsTitle}</h2><p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{c.originsBody}</p>
      <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{c.countries.map((name, i) => <Link to={origins[i]} key={name} className="home-origin-card group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-card">
        <div className="home-origin-media">{ORIGIN_PHOTOS[i] ? <img src={ORIGIN_PHOTOS[i]?.src} alt={ORIGIN_PHOTOS[i]?.[locale]} width={600} height={400} loading="lazy" className={`home-origin-photo ${i === 0 ? "home-origin-photo-yard" : "home-origin-photo-city"}`} /> : <div className={`home-route-art ${i === 1 ? "home-route-art-korea" : "home-route-art-europe"}`} aria-hidden="true"><Globe2 className="home-route-globe" strokeWidth={0.6} /><span className="home-route-line" /><span className="home-route-point home-route-point-start"><MapPin /></span><span className="home-route-point home-route-point-end"><Ship /></span><span className="home-route-code">{i === 1 ? "KR" : "EU"}</span><span className="home-route-destination">AL</span></div>}</div>
        <div className="p-5"><h3 className="text-xl font-semibold text-navy">{name}</h3><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{c.countryBodies[i]}</p><span className="mt-5 flex items-center justify-between text-xs font-semibold text-primary">{c.originLink}{al && i === 3 ? " (EN)" : ""}<ArrowRight className="h-4 w-4" /></span></div>
      </Link>)}</div>
      <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground"><Globe2 className="h-4 w-4 text-primary" />{c.canada}<Link to="/import-canada" className="inline-flex min-h-8 items-center gap-1 font-semibold text-primary hover:underline">{c.canadaLink}<ChevronRight className="h-3 w-3" /></Link></div>
      {al && <div className="mt-3 flex flex-wrap gap-4 text-xs font-medium text-primary"><Link to="/al/copart-shqiperi" className="inline-flex min-h-9 items-center gap-1">Copart Shqipëri<ArrowRight className="h-3 w-3" /></Link><Link to="/al/iaai-shqiperi" className="inline-flex min-h-9 items-center gap-1">IAAI Shqipëri<ArrowRight className="h-3 w-3" /></Link></div>}
    </div></section>

    <section className="home-section bg-mist"><div className="container-page">
      <div className="grid items-end gap-5 md:grid-cols-[minmax(0,1fr)_auto]"><div className="min-w-0"><p className="home-kicker">{c.stepsKicker}</p><h2 className="home-heading">{c.stepsTitle}</h2></div><Button asChild variant="link" className="justify-start px-0"><Link to="/how-it-works">{c.process}<ArrowRight /></Link></Button></div>
      <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{c.steps.map((title, i) => { const Icon = STEP_ICONS[i]; return <li key={title} className="relative"><div className="mb-5 flex items-center gap-4"><div className="grid h-14 w-14 shrink-0 place-items-center rounded-lg border border-border bg-background text-primary"><Icon className="h-6 w-6" /></div><span className="text-xs font-medium text-muted-foreground">0{i + 1}</span>{i !== 3 && <div className="h-px flex-1 bg-border" />}</div><h3 className="text-base font-semibold text-navy">{title}</h3><p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{c.stepBodies[i]}</p></li>; })}</ol>
    </div></section>

    <section className="home-section"><div className="container-page">
      <div className="grid items-end gap-5 md:grid-cols-[minmax(0,1fr)_auto]"><div className="min-w-0"><p className="home-kicker">{c.servicesKicker}</p><h2 className="home-heading">{c.servicesTitle}</h2></div><Button asChild variant="link" className="justify-start px-0"><Link to="/services">{c.servicesLink}<ArrowRight /></Link></Button></div>
      <div className="mt-9 grid gap-7 lg:grid-cols-[1.2fr_1fr]">
        <div className="overflow-hidden rounded-lg border border-border"><img src={PHOTO_SELECTIONS.container.src} alt={PHOTO_SELECTIONS.container[locale]} width={800} height={450} loading="lazy" className="home-service-image" /><div className="p-6"><div className="flex items-center gap-3"><Ship className="h-5 w-5 text-primary" /><h3 className="text-xl font-semibold text-navy">{c.serviceNames[0]}</h3></div><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.serviceBodies[0]}</p><div className="mt-5 flex flex-wrap gap-3"><Button asChild variant="outline"><Link to={container}>{c.container}<ArrowRight /></Link></Button><Button asChild variant="outline"><Link to={roro}>{c.roro}<ArrowRight /></Link></Button></div></div></div>
        <div className="divide-y divide-border">{[1, 2].map(i => { const Icon = i === 1 ? ScanLine : Plane; return <article key={i} className="py-7 first:pt-2"><Icon className="h-8 w-8 text-primary" /><h3 className="mt-5 text-xl font-semibold text-navy">{c.serviceNames[i]}</h3><p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{c.serviceBodies[i]}</p><Button variant="link" asChild className="mt-4 px-0"><Link to={i === 1 ? inspect : air}>{i === 1 ? c.inspection : c.air}<ArrowRight /></Link></Button></article>; })}</div>
      </div>
    </div></section>

    <section className="home-section bg-accent"><div className="container-page grid items-center gap-12 lg:grid-cols-2">
      <div><p className="home-kicker">{c.calcKicker}</p><h2 className="home-heading max-w-lg">{c.calcTitle}</h2><p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">{c.calcBody}</p><Button asChild className="mt-7 h-12 px-5"><Link to={calculator} onClick={() => trackEvent("calculator_started", { source: al ? "al-home-promo" : "homepage_promo" })}><Calculator />{c.calcButton}<ArrowRight /></Link></Button><div className="mt-4"><Link to="/shipping-estimate-disclaimer" className="text-xs text-muted-foreground underline underline-offset-4">{c.calcDisclaimer}</Link></div></div>
      <div className="rounded-lg border border-border bg-background p-6 shadow-card sm:p-8" aria-label={c.calcLabel}>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4"><div className="min-w-0"><p className="text-xs text-muted-foreground">{c.calcRoute}</p><h3 className="mt-2 text-lg font-semibold text-navy">{c.calcLabel}</h3></div><Calculator className="h-6 w-6 shrink-0 text-primary" /></div>
        <div className="mt-6 divide-y divide-border">{c.calcRows.map((row, i) => <div key={row} className="flex items-center justify-between gap-3 py-4 text-sm"><span className="flex items-center gap-3 text-muted-foreground"><span className="text-xs text-primary">0{i + 1}</span>{row}</span><span className="text-muted-foreground" aria-label={al ? "Sipas përllogaritjes" : "Calculated for your route"}>—</span></div>)}</div><div className="mt-2 flex items-center justify-between gap-3 border-t border-border pt-5 text-sm font-semibold text-navy"><span>{c.calcTotal}</span><span>—</span></div><p className="mt-5 text-xs leading-relaxed text-muted-foreground">{c.calcNote}</p>
      </div>
    </div></section>

    <section className="home-section"><div className="container-page grid gap-12 lg:grid-cols-2">
      <div><p className="home-kicker">{c.presenceKicker}</p><h2 className="home-heading max-w-lg">{c.presenceTitle}</h2><p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">{c.presenceBody}</p><div className="mt-7 grid gap-6 sm:grid-cols-2">{[c.headquarters, c.operations].map((role, i) => <div key={role} className="flex items-start gap-3"><MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" /><div><p className="text-xs text-muted-foreground">{role}</p><p className="mt-1 text-lg font-semibold text-navy">{i === 0 ? "Dubai, UAE" : "Durrës, Albania"}</p></div></div>)}</div><Button asChild variant="link" className="mt-5 px-0"><Link to="/en/albania">{c.destinations}<ArrowRight /></Link></Button><div className="flex flex-wrap gap-x-4 text-xs text-muted-foreground">{["Albania", "Netherlands", "Germany", "Belgium", "France", "Italy", "Kosovo"].map((name, i) => <Link key={name} to={i === 0 ? "/en/albania" : i === 1 ? "/en/netherlands" : contact} className="inline-flex min-h-8 items-center hover:text-primary">{name}</Link>)}</div></div>
      <div className="flex flex-col justify-center border-l-2 border-teal pl-7"><Globe2 className="h-9 w-9 text-primary" /><h3 className="mt-5 text-2xl font-semibold text-navy">{c.delivery}</h3><p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">{c.deliveryBody}</p><div className="mt-5 flex flex-wrap gap-3"><Button variant="outline" asChild className="whitespace-normal text-left"><Link to="/delivered-vehicles">{c.deliveryLink}<ArrowRight /></Link></Button><Button variant="link" asChild className="px-0"><a href="https://www.instagram.com/alphaworldwidealbania/" target="_blank" rel="noreferrer noopener">{c.instagram}<ArrowRight /></a></Button></div></div>
    </div></section>

    <section className="home-section bg-mist"><div className="container-page">
      <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="home-kicker">{al ? "Foto origjinale të ekipit" : "Original photos from our team"}</p><h2 className="home-heading">{al ? "Automjete në duart tona." : "Vehicles in our hands."}</h2></div><Button asChild variant="outline"><Link to="/delivered-vehicles">{al ? "Shiko galerinë (EN)" : "View the full gallery"}<ArrowRight /></Link></Button></div>
      <div className="home-gallery-preview mt-8"><PhotoGallery photos={HOME_GALLERY_PHOTOS} locale={locale} limit={6} /></div>
    </div></section>


    <section className="home-section bg-mist"><div className="container-page">
      <div className="grid items-end gap-5 md:grid-cols-[minmax(0,1fr)_auto]"><div className="min-w-0"><p className="home-kicker">{c.guidesKicker}</p><h2 className="home-heading max-w-2xl">{c.guidesTitle}</h2></div><Button variant="link" asChild className="justify-start px-0"><Link to="/guides">{c.guidesLink}<ArrowRight /></Link></Button></div>
      <div className="mt-9 grid gap-6 md:grid-cols-3">{c.guideTitles.map((title, i) => <Link key={title} to={GUIDE_ROUTES[i]} className="group overflow-hidden rounded-lg border border-border bg-background transition-shadow hover:shadow-card" lang={al ? "en" : undefined}><img src={GUIDE_IMAGES[i].src} alt={GUIDE_IMAGES[i][locale]} width={640} height={400} loading="lazy" className={`home-guide-image home-guide-image-${i}`} /><div className="p-6"><p className="text-xs font-medium text-primary">{c.guideCategory[i]}</p><h3 className="mt-3 text-lg font-semibold leading-snug text-navy">{title}</h3><span className="mt-6 flex items-center justify-between text-xs font-semibold text-primary">{c.read}<BookOpen className="h-4 w-4" /></span></div></Link>)}</div>
    </div></section>

    <section className="home-section"><div className="container-page grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <div><p className="home-kicker">{c.faqKicker}</p><h2 className="home-heading max-w-sm">{c.faqTitle}</h2><Button variant="link" asChild className="mt-6 px-0"><Link to="/faq">{c.allFaq}<ArrowRight /></Link></Button></div><Accordion type="single" collapsible>{faqs.map((faq, i) => <AccordionItem value={`faq-${i}`} key={faq.q}><AccordionTrigger className="py-5 text-left text-sm font-semibold leading-relaxed text-navy hover:no-underline">{faq.q}</AccordionTrigger><AccordionContent className="text-sm leading-relaxed text-muted-foreground">{faq.a}</AccordionContent></AccordionItem>)}</Accordion>
    </div></section>

    <section className="home-section border-t border-border bg-mist"><div className="container-page grid gap-10 lg:grid-cols-2">
      <div><p className="home-kicker">{c.finalKicker}</p><h2 className="home-heading">{c.finalTitle}</h2><p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">{c.finalBody}</p><ul className="mt-7 space-y-4">{c.finalTrust.map(text => <li key={text} className="flex items-start gap-3 text-sm text-muted-foreground"><Check className="h-5 w-5 shrink-0 text-primary" />{text}</li>)}</ul><div className="mt-7 flex flex-wrap gap-3"><Button asChild variant="secondary" className="h-12"><a href={whatsapp} target="_blank" rel="noreferrer noopener" onClick={() => trackEvent("whatsapp_clicked", { source: "homepage_final_cta" })}><MessageCircle />WhatsApp</a></Button><Button variant="outline" asChild className="h-12"><Link to={contact} onClick={() => trackEvent("quote_started", { source: "homepage_final_cta" })}><FileText />{c.quote}</Link></Button></div></div>
      {al ? <QuoteForm variant="compact" locale="sq" source="al-home" /> : <QuoteForm variant="compact" />}
    </div></section>
  </div>;
}
