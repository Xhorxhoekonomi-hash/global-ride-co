import { Link } from "@tanstack/react-router";
import { ArrowRight, CarFront, Ship, Calculator, ScanLine, Link2, ShieldCheck, Gavel, MapPin, MessageCircle, FileText, Plane, Globe2, Check, BookOpen, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { QuoteForm } from "@/components/site/QuoteForm";
import { PhotoGallery } from "@/components/site/PhotoGallery";
import { CustomerEntry } from "@/components/site/CustomerEntry";
import { HomeJourney } from "@/components/site/HomeJourney";
import { EditorialMedia } from "@/components/site/EditorialMedia";
import routeRelief from "@/assets/abstract_route_relief.jpg";
import { ALPHA_PHOTOS, PHOTO_SELECTIONS } from "@/lib/alpha-photos";
import { CONTACT, type Faq } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

const COPY = {
  en: {
    eyebrow: "ALPHA WORLDWIDE ALBANIA · INTERNATIONAL VEHICLE LOGISTICS",
    title: "Source. Inspect.", titleEnd: "Ship worldwide.",
    intro: "Your next car, without borders. Purchase support, inspections and transport from the USA, South Korea, Dubai and Europe.",
    calculate: "Calculate Shipping", quote: "Get a Quote", chat: "Talk to our team", start: "What would you like to do?",
    tasks: ["Buy a Car", "Ship a Car", "Calculate Costs", "Inspect Before Purchase"], taskBodies: ["Find it. We’ll help with the rest.", "From origin to your destination.", "See your shipping breakdown.", "Know more before you buy."],
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
    title: "Bli. Inspekto.", titleEnd: "Transporto kudo.",
    intro: "Makina juaj e radhës, pa kufij. Mbështetje në blerje, inspektim dhe transport nga Amerika, Koreja e Jugut, Dubai dhe Evropa.",
    calculate: "Llogarit transportin", quote: "Merr një ofertë", chat: "Fol me ekipin", start: "Çfarë dëshironi të bëni?",
    tasks: ["Bli një makinë", "Transporto makinën", "Llogarit kostot", "Inspekto para blerjes"], taskBodies: ["Gjeni makinën. Ne ju ndihmojmë më tej.", "Nga origjina në destinacionin tuaj.", "Shihni ndarjen e kostove të transportit.", "Më shumë siguri para blerjes."],
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
const GUIDE_ROUTES = ["/guides/how-to-buy-a-car-from-usa-auctions", "/guides/container-vs-roro-car-shipping", "/guides/how-to-check-a-used-car-before-buying"];



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
  const whatsapp = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(al ? "Përshëndetje Alpha Worldwide, dua të importoj një makinë në Shqipëri." : "Hello Alpha Worldwide, I found a vehicle I'd like help with.")}`;
  const heroSource = al ? "al-home-hero" : "hero";
  return <div className="editorial-home bg-background text-foreground">
    <section className="alpha-hero">
      <div className="container-page alpha-hero-grid">
        <div className="alpha-hero-copy home-reveal">
          <p className="alpha-overline">Alpha Worldwide Albania</p>
          <h1>{c.title}<br /><span>{c.titleEnd}</span></h1>
          <p className="alpha-hero-intro">{al ? "Blerje, inspektim dhe transport nga Amerika, Koreja, Dubai dhe Evropa." : "Purchase support, inspection and shipping from the USA, Korea, Dubai and Europe."}</p>
          <div className="alpha-hero-actions">
            <Button asChild size="lg" className="h-13"><Link to={calculator} onClick={() => trackEvent("calculator_started", { source: heroSource })}>{c.calculate}</Link></Button>
            <Button variant="outline" asChild size="lg" className="h-13"><Link to={contact} onClick={() => trackEvent("quote_started", { source: heroSource })}>{c.quote}</Link></Button>
          </div>
          <a href={whatsapp} target="_blank" rel="noreferrer noopener" onClick={() => trackEvent("whatsapp_clicked", { source: heroSource })} className="alpha-contact-link"><MessageCircle className="h-4 w-4" />{c.chat}<ArrowRight className="h-4 w-4" /></a>
        </div>
        <div className="alpha-hero-stage">
          <EditorialMedia photo={PHOTO_SELECTIONS.urus} mobilePhoto={PHOTO_SELECTIONS.urusFront} locale={locale} role="hero" priority />
        </div>
      </div>
    </section>

    <CustomerEntry locale={locale} />

    <section className="home-section alpha-origins"><div className="container-page">
      <div className="alpha-section-heading"><div><p className="home-kicker">{c.originsKicker}</p><h2 className="home-heading">{c.originsTitle}</h2></div><p>{c.originsBody}</p></div>
      <div className="alpha-atlas"><img src={routeRelief} alt="" aria-hidden="true" width={1536} height={1024} loading="lazy" className="alpha-atlas-art" /><div className="alpha-origin-grid">{c.countries.map((name,i) => <Link to={origins[i]} key={name} className="alpha-origin group"><span className="alpha-origin-code">{["US", "KR", "AE", "EU"][i]} <ArrowRight className="h-5 w-5" /></span><div><h3>{name}</h3><p>{c.countryBodies[i]}</p><span className="alpha-origin-link">{c.originLink}{al && i === 3 ? " (EN)" : ""}</span></div></Link>)}</div></div>
      <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground"><Globe2 className="h-4 w-4 text-primary" />{c.canada}<Link to="/import-canada" className="inline-flex min-h-11 items-center gap-1 font-semibold text-primary">{c.canadaLink}<ChevronRight className="h-4 w-4" /></Link></div>
      {al && <div className="flex flex-wrap gap-4 text-sm text-primary"><Link to="/al/copart-shqiperi" className="inline-flex min-h-11 items-center gap-2">Copart Shqipëri<ArrowRight className="h-4 w-4" /></Link><Link to="/al/iaai-shqiperi" className="inline-flex min-h-11 items-center gap-2">IAAI Shqipëri<ArrowRight className="h-4 w-4" /></Link></div>}
    </div></section>

    <section className="home-section alpha-journey"><div className="container-page">
      <div className="alpha-section-heading"><div><p className="home-kicker">{c.stepsKicker}</p><h2 className="home-heading">{c.stepsTitle}</h2></div><Button asChild variant="link"><Link to="/how-it-works">{c.process}<ArrowRight /></Link></Button></div>
      <HomeJourney locale={locale} titles={c.steps} bodies={c.stepBodies} />
    </div></section>

    <section className="home-section"><div className="container-page">
      <div className="alpha-section-heading"><div><p className="home-kicker">{c.servicesKicker}</p><h2 className="home-heading">{c.servicesTitle}</h2></div><Button asChild variant="link"><Link to="/services">{c.servicesLink}<ArrowRight /></Link></Button></div>
      <div className="alpha-service-chapter">
        <div className="alpha-service-copy"><span className="alpha-chapter-no">01 / Transport</span><h3>{c.serviceNames[0]}</h3><p>{c.serviceBodies[0]}</p><div className="flex flex-wrap gap-3"><Button asChild variant="outline" className="h-12"><Link to={container}>{c.container}<ArrowRight /></Link></Button><Button asChild variant="link" className="h-12"><Link to={roro}>{c.roro}<ArrowRight /></Link></Button></div></div>
        <EditorialMedia photo={PHOTO_SELECTIONS.container} locale={locale} role="story" className="alpha-service-visual" />
        <div className="alpha-service-secondary">{[1,2].map(i => <article key={i}><span className="alpha-chapter-no">0{i+1}</span><h3>{c.serviceNames[i]}</h3><p>{c.serviceBodies[i]}</p><Button variant="link" asChild className="h-auto min-h-11 whitespace-normal px-0 text-left"><Link to={i === 1 ? inspect : air}>{i === 1 ? c.inspection : c.air}<ArrowRight /></Link></Button></article>)}</div>
      </div>
    </div></section>

    <section className="home-section alpha-calculator-band"><div className="container-page grid items-center gap-12 lg:grid-cols-2">
      <div><p className="home-kicker">{c.calcKicker}</p><h2 className="home-heading">{c.calcTitle}</h2><p className="mt-6 max-w-lg leading-relaxed">{c.calcBody}</p><Button asChild variant="default" className="mt-8 h-13 px-6"><Link to={calculator} onClick={() => trackEvent("calculator_started", { source: al ? "al-home-promo" : "homepage_promo" })}>{c.calcButton}<ArrowRight /></Link></Button><div className="mt-5"><Link to="/shipping-estimate-disclaimer" className="text-sm underline underline-offset-4">{c.calcDisclaimer}</Link></div></div>
      <div className="alpha-calculator-preview"><div className="alpha-calc-title"><Calculator className="h-6 w-6 text-primary" /><h3>{c.calcLabel}</h3></div><div className="alpha-calc-origins">{[al ? "Amerikë" : "USA", al ? "Koreja e Jugut" : "South Korea"].map(name => <Button asChild variant="outline" className="h-12" key={name}><Link to={calculator}>{name}<ArrowRight /></Link></Button>)}</div><div className="alpha-calc-rows">{c.calcRows.map((row,i) => <Link to={calculator} key={row}><span><span className="text-primary">0{i+1}</span>{row}</span><ChevronRight className="h-4 w-4" /></Link>)}</div><p>{c.calcNote}</p></div>
    </div></section>

    <section className="home-section"><div className="container-page">
      <div className="alpha-section-heading"><div><p className="home-kicker">{al ? "Nga arkivi ynë" : "The Alpha archive"}</p><h2 className="home-heading">{al ? "Automjete në duart tona." : "Real cars. Real operations."}</h2></div><Button asChild variant="link"><Link to="/delivered-vehicles">{al ? "Eksploro punën e dokumentuar (EN)" : "Explore documented work"}<ArrowRight /></Link></Button></div>
      <div className="mt-10"><PhotoGallery photos={ALPHA_PHOTOS} locale={locale} variant="filmstrip" coverAlbumIds={["urus", "silver-ferrari", "porsche", "sls"]} /></div>
    </div></section>

    <section className="home-section alpha-guides"><div className="container-page"><div className="alpha-section-heading"><div><p className="home-kicker">{c.guidesKicker}</p><h2 className="home-heading">{c.guidesTitle}</h2></div><Button asChild variant="link"><Link to="/guides">{c.guidesLink}<ArrowRight /></Link></Button></div><div className="alpha-guide-layout">
      <Link to={GUIDE_ROUTES[0]} className="alpha-guide-feature" lang={al ? "en" : undefined}><EditorialMedia photo={PHOTO_SELECTIONS.porsche} locale={locale} role="guide" /><div className="alpha-guide-feature-copy"><span className="text-sm text-primary">{c.guideCategory[0]}</span><h3>{c.guideTitles[0]}</h3><span className="alpha-guide-read">{c.read}<ArrowRight className="h-5 w-5" /></span></div></Link>
      <div>{c.guideTitles.slice(1).map((title,i) => <Link key={title} to={GUIDE_ROUTES[i + 1]} className="alpha-guide-link" lang={al ? "en" : undefined}><span className="text-sm text-primary">{c.guideCategory[i + 1]}</span><h3>{title}</h3><span className="alpha-guide-read">{c.read}<ArrowRight className="h-5 w-5" /></span></Link>)}</div>
    </div></div></section>

    <section className="home-section"><div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="home-kicker">{c.faqKicker}</p><h2 className="home-heading">{c.faqTitle}</h2><Button variant="link" asChild className="mt-6 px-0"><Link to="/faq">{c.allFaq}<ArrowRight /></Link></Button></div><Accordion type="single" collapsible>{faqs.map((faq,i) => <AccordionItem value={`faq-${i}`} key={faq.q}><AccordionTrigger className="py-6 text-left text-base font-medium leading-relaxed text-navy hover:no-underline">{faq.q}</AccordionTrigger><AccordionContent className="text-base leading-relaxed text-muted-foreground">{faq.a}</AccordionContent></AccordionItem>)}</Accordion></div></section>

    <section className="alpha-presence"><div className="container-page grid gap-10 lg:grid-cols-2"><div><p className="home-kicker">{c.presenceKicker}</p><h2 className="home-heading">{c.presenceTitle}</h2><p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">{c.presenceBody}</p><div className="mt-6 grid gap-5 sm:grid-cols-2">{[c.headquarters,c.operations].map((role,i) => <div key={role}><p className="text-sm text-muted-foreground">{role}</p><p className="mt-2 text-xl text-secondary">{i === 0 ? "Dubai, UAE" : "Durrës, Albania"}</p></div>)}</div><Button asChild variant="link" className="mt-4 px-0"><Link to="/en/albania">{c.destinations}<ArrowRight /></Link></Button><div className="flex flex-wrap gap-x-4 text-sm text-muted-foreground">{["Albania", "Netherlands", "Germany", "Belgium", "France", "Italy", "Kosovo"].map((name,i) => <Link key={name} to={i===0 ? "/en/albania" : i===1 ? "/en/netherlands" : contact} className="inline-flex min-h-11 items-center">{name}</Link>)}</div></div><div className="alpha-presence-links"><h3>{c.delivery}</h3><p>{c.deliveryBody}</p><Button variant="link" asChild className="px-0"><Link to="/delivered-vehicles">{c.deliveryLink}<ArrowRight /></Link></Button><Button variant="link" asChild className="px-0"><a href="https://www.instagram.com/alphaworldwidealbania/" target="_blank" rel="noreferrer noopener">{c.instagram}<ArrowRight /></a></Button></div></div></section>

    <section className="home-section alpha-enquiry"><div className="container-page grid gap-12 lg:grid-cols-2"><div><p className="home-kicker">{c.finalKicker}</p><h2 className="home-heading">{c.finalTitle}</h2><p className="mt-5 max-w-md leading-relaxed text-muted-foreground">{c.finalBody}</p><ul className="mt-7 space-y-4">{c.finalTrust.map(text => <li key={text} className="flex items-start gap-3 text-sm text-muted-foreground"><Check className="h-5 w-5 shrink-0 text-primary" />{text}</li>)}</ul><div className="mt-7 flex flex-wrap gap-3"><Button asChild variant="secondary" className="h-12"><a href={whatsapp} target="_blank" rel="noreferrer noopener" onClick={() => trackEvent("whatsapp_clicked", { source: "homepage_final_cta" })}><MessageCircle />WhatsApp</a></Button><Button variant="outline" asChild className="h-12"><Link to={contact} onClick={() => trackEvent("quote_started", { source: "homepage_final_cta" })}><FileText />{c.quote}</Link></Button></div></div>{al ? <QuoteForm variant="compact" locale="sq" source="al-home" /> : <QuoteForm variant="compact" />}</div></section>
  </div>;
}
