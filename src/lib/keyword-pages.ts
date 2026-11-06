export type KeywordPage = { en: string; sq: string; name: string; nameSq: string; kind: "destination" | "port" | "city" | "service"; detail: string; detailSq: string; ports: string[] };

export const KEYWORD_PAGES: KeywordPage[] = [
  {
    "en": "/import-germany",
    "sq": "/al/import-makinash-ne-gjermani",
    "name": "Germany",
    "nameSq": "Gjermani",
    "kind": "destination",
    "detail": "Vehicle sourcing, inspection where possible, international shipping and onward delivery to Germany. Gateway routing and local import requirements are confirmed for the specific vehicle.",
    "detailSq": "Gjetje automjeti, inspektim sipas aksesit, transport ndërkombëtar dhe dorëzim në destinacionin tuaj në Gjermani. Itinerari dhe kërkesat vendore të importit konfirmohen për automjetin konkret.",
    "ports": [
      "bremerhaven",
      "hamburg"
    ]
  },
  {
    "en": "/import-belgium",
    "sq": "/al/import-makinash-ne-belgjike",
    "name": "Belgium",
    "nameSq": "Belgjikë",
    "kind": "destination",
    "detail": "Vehicle sourcing, inspection where possible, international shipping and onward delivery to Belgium. Gateway routing and local import requirements are confirmed for the specific vehicle.",
    "detailSq": "Gjetje automjeti, inspektim sipas aksesit, transport ndërkombëtar dhe dorëzim në destinacionin tuaj në Belgjikë. Itinerari dhe kërkesat vendore të importit konfirmohen për automjetin konkret.",
    "ports": [
      "antwerp"
    ]
  },
  {
    "en": "/import-france",
    "sq": "/al/import-makinash-ne-france",
    "name": "France",
    "nameSq": "Francë",
    "kind": "destination",
    "detail": "Vehicle sourcing, inspection where possible, international shipping and onward delivery to France. Gateway routing and local import requirements are confirmed for the specific vehicle.",
    "detailSq": "Gjetje automjeti, inspektim sipas aksesit, transport ndërkombëtar dhe dorëzim në destinacionin tuaj në Francë. Itinerari dhe kërkesat vendore të importit konfirmohen për automjetin konkret.",
    "ports": [
      "le-havre",
      "marseille"
    ]
  },
  {
    "en": "/import-italy",
    "sq": "/al/import-makinash-ne-itali",
    "name": "Italy",
    "nameSq": "Itali",
    "kind": "destination",
    "detail": "Vehicle sourcing, inspection where possible, international shipping and onward delivery to Italy. Gateway routing and local import requirements are confirmed for the specific vehicle.",
    "detailSq": "Gjetje automjeti, inspektim sipas aksesit, transport ndërkombëtar dhe dorëzim në destinacionin tuaj në Itali. Itinerari dhe kërkesat vendore të importit konfirmohen për automjetin konkret.",
    "ports": [
      "genoa"
    ]
  },
  {
    "en": "/import-netherlands",
    "sq": "/al/import-makinash-ne-holande",
    "name": "Netherlands",
    "nameSq": "Holandë",
    "kind": "destination",
    "detail": "Vehicle sourcing, inspection where possible, international shipping and onward delivery to Netherlands. Gateway routing and local import requirements are confirmed for the specific vehicle.",
    "detailSq": "Gjetje automjeti, inspektim sipas aksesit, transport ndërkombëtar dhe dorëzim në destinacionin tuaj në Holandë. Itinerari dhe kërkesat vendore të importit konfirmohen për automjetin konkret.",
    "ports": [
      "rotterdam"
    ]
  },
  {
    "en": "/import-switzerland",
    "sq": "/al/import-makinash-ne-zvicer",
    "name": "Switzerland",
    "nameSq": "Zvicër",
    "kind": "destination",
    "detail": "Vehicle sourcing, inspection where possible, international shipping and onward delivery to Switzerland. Gateway routing and local import requirements are confirmed for the specific vehicle.",
    "detailSq": "Gjetje automjeti, inspektim sipas aksesit, transport ndërkombëtar dhe dorëzim në destinacionin tuaj në Zvicër. Itinerari dhe kërkesat vendore të importit konfirmohen për automjetin konkret.",
    "ports": [
      "rotterdam",
      "bremerhaven",
      "antwerp",
      "genoa"
    ]
  },
  {
    "en": "/import-austria",
    "sq": "/al/import-makinash-ne-austri",
    "name": "Austria",
    "nameSq": "Austri",
    "kind": "destination",
    "detail": "Vehicle sourcing, inspection where possible, international shipping and onward delivery to Austria. Gateway routing and local import requirements are confirmed for the specific vehicle.",
    "detailSq": "Gjetje automjeti, inspektim sipas aksesit, transport ndërkombëtar dhe dorëzim në destinacionin tuaj në Austri. Itinerari dhe kërkesat vendore të importit konfirmohen për automjetin konkret.",
    "ports": [
      "bremerhaven",
      "hamburg",
      "rotterdam",
      "koper"
    ]
  },
  {
    "en": "/import-spain",
    "sq": "/al/import-makinash-ne-spanje",
    "name": "Spain",
    "nameSq": "Spanjë",
    "kind": "destination",
    "detail": "Vehicle sourcing, inspection where possible, international shipping and onward delivery to Spain. Gateway routing and local import requirements are confirmed for the specific vehicle.",
    "detailSq": "Gjetje automjeti, inspektim sipas aksesit, transport ndërkombëtar dhe dorëzim në destinacionin tuaj në Spanjë. Itinerari dhe kërkesat vendore të importit konfirmohen për automjetin konkret.",
    "ports": [
      "barcelona",
      "valencia",
      "algeciras"
    ]
  },
  {
    "en": "/import-poland",
    "sq": "/al/import-makinash-ne-poloni",
    "name": "Poland",
    "nameSq": "Poloni",
    "kind": "destination",
    "detail": "Vehicle sourcing, inspection where possible, international shipping and onward delivery to Poland. Gateway routing and local import requirements are confirmed for the specific vehicle.",
    "detailSq": "Gjetje automjeti, inspektim sipas aksesit, transport ndërkombëtar dhe dorëzim në destinacionin tuaj në Poloni. Itinerari dhe kërkesat vendore të importit konfirmohen për automjetin konkret.",
    "ports": [
      "gdynia",
      "gdansk",
      "hamburg",
      "rotterdam"
    ]
  },
  {
    "en": "/import-czech-republic",
    "sq": "/al/import-makinash-ne-ceki",
    "name": "Czech Republic",
    "nameSq": "Çeki",
    "kind": "destination",
    "detail": "Vehicle sourcing, inspection where possible, international shipping and onward delivery to Czech Republic. Gateway routing and local import requirements are confirmed for the specific vehicle.",
    "detailSq": "Gjetje automjeti, inspektim sipas aksesit, transport ndërkombëtar dhe dorëzim në destinacionin tuaj në Çeki. Itinerari dhe kërkesat vendore të importit konfirmohen për automjetin konkret.",
    "ports": [
      "hamburg",
      "bremerhaven",
      "rotterdam"
    ]
  },
  {
    "en": "/import-romania",
    "sq": "/al/import-makinash-ne-rumani",
    "name": "Romania",
    "nameSq": "Rumani",
    "kind": "destination",
    "detail": "Vehicle sourcing, inspection where possible, international shipping and onward delivery to Romania. Gateway routing and local import requirements are confirmed for the specific vehicle.",
    "detailSq": "Gjetje automjeti, inspektim sipas aksesit, transport ndërkombëtar dhe dorëzim në destinacionin tuaj në Rumani. Itinerari dhe kërkesat vendore të importit konfirmohen për automjetin konkret.",
    "ports": [
      "constanta"
    ]
  },
  {
    "en": "/shipping-to-kosovo",
    "sq": "/al/transport-makinash-ne-kosove",
    "name": "Kosovo",
    "nameSq": "Kosovë",
    "kind": "destination",
    "detail": "Onward vehicle transport to Kosovo is arranged on request. Tell us your origin and final address; routing, transit documents and delivery availability require confirmation.",
    "detailSq": "Transporti i mëtejshëm i automjeteve në Kosovë organizohet me kërkesë. Na tregoni origjinën dhe adresën; itinerari, dokumentet e tranzitit dhe mundësia e dorëzimit duhen konfirmuar.",
    "ports": []
  },
  {
    "en": "/shipping-to-north-macedonia",
    "sq": "/al/transport-makinash-ne-maqedonine-e-veriut",
    "name": "North Macedonia",
    "nameSq": "Maqedoni e Veriut",
    "kind": "destination",
    "detail": "Onward vehicle transport to North Macedonia is arranged on request. Tell us your origin and final address; routing, transit documents and delivery availability require confirmation.",
    "detailSq": "Transporti i mëtejshëm i automjeteve në Maqedoni e Veriut organizohet me kërkesë. Na tregoni origjinën dhe adresën; itinerari, dokumentet e tranzitit dhe mundësia e dorëzimit duhen konfirmuar.",
    "ports": []
  },
  {
    "en": "/shipping-to-montenegro",
    "sq": "/al/transport-makinash-ne-mal-te-zi",
    "name": "Montenegro",
    "nameSq": "Mal i Zi",
    "kind": "destination",
    "detail": "Onward vehicle transport to Montenegro is arranged on request. Tell us your origin and final address; routing, transit documents and delivery availability require confirmation.",
    "detailSq": "Transporti i mëtejshëm i automjeteve në Mal i Zi organizohet me kërkesë. Na tregoni origjinën dhe adresën; itinerari, dokumentet e tranzitit dhe mundësia e dorëzimit duhen konfirmuar.",
    "ports": []
  },
  {
    "en": "/en/albania",
    "sq": "/al/transport-makinash-ne-shqiperi",
    "name": "Albania",
    "nameSq": "Shqipëri",
    "kind": "destination",
    "detail": "Vehicle shipping to Albania through Durrës, with port handling, customs coordination and onward delivery.",
    "detailSq": "Transport automjetesh në Shqipëri përmes Durrësit, me trajtim në port, koordinim doganor dhe dorëzim të mëtejshëm.",
    "ports": [
      "durres"
    ]
  },
  {
    "en": "/en/netherlands",
    "sq": "/al/transport-makinash-ne-holande",
    "name": "Netherlands",
    "nameSq": "Holandë",
    "kind": "destination",
    "detail": "Vehicle sourcing and shipping to the Netherlands via Rotterdam. South Korea has an existing dedicated Rotterdam route; other origin routes require confirmation.",
    "detailSq": "Gjetje dhe transport automjetesh në Holandë përmes Rotterdamit. Ekziston një itinerar i dedikuar nga Koreja e Jugut; itineraret nga origjina të tjera kërkojnë konfirmim.",
    "ports": [
      "rotterdam"
    ]
  },
  {
    "en": "/ports/durres",
    "sq": "/al/portet/durres",
    "name": "Durrës",
    "nameSq": "Durrës",
    "kind": "port",
    "detail": "Durrës is the base of our European and Albanian operations. We coordinate port handling, customs documentation and final delivery.",
    "detailSq": "Durrësi është baza e operacioneve tona evropiane dhe shqiptare. Koordinojmë trajtimin në port, dokumentacionin doganor dhe dorëzimin përfundimtar.",
    "ports": []
  },
  {
    "en": "/ports/rotterdam",
    "sq": "/al/portet/rotterdam",
    "name": "Rotterdam",
    "nameSq": "Rotterdam",
    "kind": "port",
    "detail": "Rotterdam is a port named in our existing Netherlands shipping guidance. Vehicle routing, terminal handling and onward transport depend on the shipment and must be confirmed before booking.",
    "detailSq": "Rotterdam është një port i përmendur në udhëzimet tona ekzistuese për Holandë. Itinerari, trajtimi në terminal dhe transporti i mëtejshëm varen nga dërgesa dhe duhen konfirmuar para rezervimit.",
    "ports": []
  },
  {
    "en": "/ports/bremerhaven",
    "sq": "/al/portet/bremerhaven",
    "name": "Bremerhaven",
    "nameSq": "Bremerhaven",
    "kind": "port",
    "detail": "Bremerhaven is a port named in our existing Germany shipping guidance. Vehicle routing, terminal handling and onward transport depend on the shipment and must be confirmed before booking. Availability is on request; a dedicated USA route is planned, not presented as already operating.",
    "detailSq": "Bremerhaven është një port i përmendur në udhëzimet tona ekzistuese për Gjermani. Itinerari, trajtimi në terminal dhe transporti i mëtejshëm varen nga dërgesa dhe duhen konfirmuar para rezervimit. Disponueshmëria është me kërkesë; itinerari i dedikuar nga SHBA-ja është i planifikuar, jo i paraqitur si tashmë funksional.",
    "ports": []
  },
  {
    "en": "/ports/hamburg",
    "sq": "/al/portet/hamburg",
    "name": "Hamburg",
    "nameSq": "Hamburg",
    "kind": "port",
    "detail": "Hamburg is a port named in our existing Germany shipping guidance. Vehicle routing, terminal handling and onward transport depend on the shipment and must be confirmed before booking.",
    "detailSq": "Hamburg është një port i përmendur në udhëzimet tona ekzistuese për Gjermani. Itinerari, trajtimi në terminal dhe transporti i mëtejshëm varen nga dërgesa dhe duhen konfirmuar para rezervimit.",
    "ports": []
  },
  {
    "en": "/ports/antwerp",
    "sq": "/al/portet/antwerp",
    "name": "Antwerp",
    "nameSq": "Antwerp",
    "kind": "port",
    "detail": "Antwerp is a port named in our existing Belgium shipping guidance. Vehicle routing, terminal handling and onward transport depend on the shipment and must be confirmed before booking.",
    "detailSq": "Antwerp është një port i përmendur në udhëzimet tona ekzistuese për Belgjikë. Itinerari, trajtimi në terminal dhe transporti i mëtejshëm varen nga dërgesa dhe duhen konfirmuar para rezervimit.",
    "ports": []
  },
  {
    "en": "/ports/genoa",
    "sq": "/al/portet/genoa",
    "name": "Genoa",
    "nameSq": "Genoa",
    "kind": "port",
    "detail": "Genoa is a port named in our existing Italy shipping guidance. Vehicle routing, terminal handling and onward transport depend on the shipment and must be confirmed before booking.",
    "detailSq": "Genoa është një port i përmendur në udhëzimet tona ekzistuese për Itali. Itinerari, trajtimi në terminal dhe transporti i mëtejshëm varen nga dërgesa dhe duhen konfirmuar para rezervimit.",
    "ports": []
  },
  {
    "en": "/ports/le-havre",
    "sq": "/al/portet/le-havre",
    "name": "Le Havre",
    "nameSq": "Le Havre",
    "kind": "port",
    "detail": "Le Havre is a port named in our existing France shipping guidance. Vehicle routing, terminal handling and onward transport depend on the shipment and must be confirmed before booking.",
    "detailSq": "Le Havre është një port i përmendur në udhëzimet tona ekzistuese për Francë. Itinerari, trajtimi në terminal dhe transporti i mëtejshëm varen nga dërgesa dhe duhen konfirmuar para rezervimit.",
    "ports": []
  },
  {
    "en": "/ports/marseille",
    "sq": "/al/portet/marseille",
    "name": "Marseille",
    "nameSq": "Marseille",
    "kind": "port",
    "detail": "Marseille is a port named in our existing France shipping guidance. Vehicle routing, terminal handling and onward transport depend on the shipment and must be confirmed before booking.",
    "detailSq": "Marseille është një port i përmendur në udhëzimet tona ekzistuese për Francë. Itinerari, trajtimi në terminal dhe transporti i mëtejshëm varen nga dërgesa dhe duhen konfirmuar para rezervimit.",
    "ports": []
  },
  {
    "en": "/ports/koper",
    "sq": "/al/portet/koper",
    "name": "Koper",
    "nameSq": "Koper",
    "kind": "port",
    "detail": "Koper is a port named in our existing Slovenia shipping guidance. Vehicle routing, terminal handling and onward transport depend on the shipment and must be confirmed before booking.",
    "detailSq": "Koper është një port i përmendur në udhëzimet tona ekzistuese për Slloveni. Itinerari, trajtimi në terminal dhe transporti i mëtejshëm varen nga dërgesa dhe duhen konfirmuar para rezervimit.",
    "ports": []
  },
  {
    "en": "/ports/barcelona",
    "sq": "/al/portet/barcelona",
    "name": "Barcelona",
    "nameSq": "Barcelona",
    "kind": "port",
    "detail": "Barcelona is a port named in our existing Spain shipping guidance. Vehicle routing, terminal handling and onward transport depend on the shipment and must be confirmed before booking.",
    "detailSq": "Barcelona është një port i përmendur në udhëzimet tona ekzistuese për Spanjë. Itinerari, trajtimi në terminal dhe transporti i mëtejshëm varen nga dërgesa dhe duhen konfirmuar para rezervimit.",
    "ports": []
  },
  {
    "en": "/ports/valencia",
    "sq": "/al/portet/valencia",
    "name": "Valencia",
    "nameSq": "Valencia",
    "kind": "port",
    "detail": "Valencia is a port named in our existing Spain shipping guidance. Vehicle routing, terminal handling and onward transport depend on the shipment and must be confirmed before booking.",
    "detailSq": "Valencia është një port i përmendur në udhëzimet tona ekzistuese për Spanjë. Itinerari, trajtimi në terminal dhe transporti i mëtejshëm varen nga dërgesa dhe duhen konfirmuar para rezervimit.",
    "ports": []
  },
  {
    "en": "/ports/algeciras",
    "sq": "/al/portet/algeciras",
    "name": "Algeciras",
    "nameSq": "Algeciras",
    "kind": "port",
    "detail": "Algeciras is a port named in our existing Spain shipping guidance. Vehicle routing, terminal handling and onward transport depend on the shipment and must be confirmed before booking.",
    "detailSq": "Algeciras është një port i përmendur në udhëzimet tona ekzistuese për Spanjë. Itinerari, trajtimi në terminal dhe transporti i mëtejshëm varen nga dërgesa dhe duhen konfirmuar para rezervimit.",
    "ports": []
  },
  {
    "en": "/ports/gdynia",
    "sq": "/al/portet/gdynia",
    "name": "Gdynia",
    "nameSq": "Gdynia",
    "kind": "port",
    "detail": "Gdynia is a port named in our existing Poland shipping guidance. Vehicle routing, terminal handling and onward transport depend on the shipment and must be confirmed before booking.",
    "detailSq": "Gdynia është një port i përmendur në udhëzimet tona ekzistuese për Poloni. Itinerari, trajtimi në terminal dhe transporti i mëtejshëm varen nga dërgesa dhe duhen konfirmuar para rezervimit.",
    "ports": []
  },
  {
    "en": "/ports/gdansk",
    "sq": "/al/portet/gdansk",
    "name": "Gdańsk",
    "nameSq": "Gdańsk",
    "kind": "port",
    "detail": "Gdańsk is a port named in our existing Poland shipping guidance. Vehicle routing, terminal handling and onward transport depend on the shipment and must be confirmed before booking.",
    "detailSq": "Gdańsk është një port i përmendur në udhëzimet tona ekzistuese për Poloni. Itinerari, trajtimi në terminal dhe transporti i mëtejshëm varen nga dërgesa dhe duhen konfirmuar para rezervimit.",
    "ports": []
  },
  {
    "en": "/ports/constanta",
    "sq": "/al/portet/constanta",
    "name": "Constanța",
    "nameSq": "Constanța",
    "kind": "port",
    "detail": "Constanța is a port named in our existing Romania shipping guidance. Vehicle routing, terminal handling and onward transport depend on the shipment and must be confirmed before booking.",
    "detailSq": "Constanța është një port i përmendur në udhëzimet tona ekzistuese për Rumani. Itinerari, trajtimi në terminal dhe transporti i mëtejshëm varen nga dërgesa dhe duhen konfirmuar para rezervimit.",
    "ports": []
  },
  {
    "en": "/ports/busan",
    "sq": "/al/portet/busan",
    "name": "Busan",
    "nameSq": "Busan",
    "kind": "port",
    "detail": "Busan is a port named in our existing South Korea shipping guidance. Vehicle routing, terminal handling and onward transport depend on the shipment and must be confirmed before booking.",
    "detailSq": "Busan është një port i përmendur në udhëzimet tona ekzistuese për Koreja e Jugut. Itinerari, trajtimi në terminal dhe transporti i mëtejshëm varen nga dërgesa dhe duhen konfirmuar para rezervimit.",
    "ports": []
  },
  {
    "en": "/ports/incheon",
    "sq": "/al/portet/incheon",
    "name": "Incheon",
    "nameSq": "Incheon",
    "kind": "port",
    "detail": "Incheon is a port named in our existing South Korea shipping guidance. Vehicle routing, terminal handling and onward transport depend on the shipment and must be confirmed before booking.",
    "detailSq": "Incheon është një port i përmendur në udhëzimet tona ekzistuese për Koreja e Jugut. Itinerari, trajtimi në terminal dhe transporti i mëtejshëm varen nga dërgesa dhe duhen konfirmuar para rezervimit.",
    "ports": []
  },
  {
    "en": "/locations/dubai",
    "sq": "/al/vendndodhjet/dubai",
    "name": "Dubai",
    "nameSq": "Dubai",
    "kind": "city",
    "detail": "Our global headquarters is in Dubai. We coordinate UAE vehicle sourcing, seller communication and export preparation.",
    "detailSq": "Selia jonë globale është në Dubai. Koordinojmë gjetjen e automjetit në EBA, komunikimin me shitësin dhe përgatitjen për eksport.",
    "ports": []
  },
  {
    "en": "/locations/durres",
    "sq": "/al/vendndodhjet/durres",
    "name": "Durrës",
    "nameSq": "Durrës",
    "kind": "city",
    "detail": "Our European and Albanian operations are based in Durrës, coordinating port handling, customs documentation and vehicle delivery.",
    "detailSq": "Operacionet tona evropiane dhe shqiptare janë në Durrës, ku koordinojmë trajtimin në port, dokumentet doganore dhe dorëzimin e automjetit.",
    "ports": [
      "durres"
    ]
  },
  {
    "en": "/vehicle-sourcing",
    "sq": "/al/gjetje-automjeti",
    "name": "Vehicle Sourcing",
    "nameSq": "Gjetja e automjetit",
    "kind": "service",
    "detail": "We locate vehicles across auctions, dealerships and private listings. Share your criteria; seller access and availability are confirmed before purchase.",
    "detailSq": "Gjejmë automjete në ankande, te tregtarët dhe në shpallje private. Dërgoni kriteret; aksesi dhe disponueshmëria konfirmohen para blerjes.",
    "ports": []
  },
  {
    "en": "/dealer-purchasing",
    "sq": "/al/blerje-nga-tregtaret",
    "name": "Dealer Purchasing Assistance",
    "nameSq": "Asistencë për blerje nga tregtarët",
    "kind": "service",
    "detail": "We coordinate seller communication, negotiation, purchasing paperwork and the next transport steps. No purchase takes place without your approval.",
    "detailSq": "Koordinojmë komunikimin, negociimin, dokumentet e blerjes dhe hapat e transportit. Blerja bëhet vetëm me miratimin tuaj.",
    "ports": []
  },
  {
    "en": "/inland-transport",
    "sq": "/al/transport-tokesor",
    "name": "Inland Transportation",
    "nameSq": "Transport tokësor",
    "kind": "service",
    "detail": "Pickup from the seller and transport to an export port or onward from arrival are coordinated for the vehicle and route.",
    "detailSq": "Koordinojmë marrjen nga shitësi dhe transportin në portin e eksportit, ose transportin e mëtejshëm nga mbërritja, sipas automjetit dhe itinerarit.",
    "ports": []
  },
  {
    "en": "/airport-handling",
    "sq": "/al/trajtim-ne-aeroport",
    "name": "European Airport Handling",
    "nameSq": "Trajtim në aeroportet evropiane",
    "kind": "service",
    "detail": "Arrival-side cargo handling, release procedures, documentation and onward vehicle transport can be coordinated for an already-booked flight.",
    "detailSq": "Për një fluturim të rezervuar mund të koordinojmë trajtimin e ngarkesës në mbërritje, procedurat e lirimit, dokumentet dhe transportin e mëtejshëm.",
    "ports": []
  },
  {
    "en": "/customs-coordination",
    "sq": "/al/koordinim-doganor",
    "name": "Customs Coordination",
    "nameSq": "Koordinim doganor",
    "kind": "service",
    "detail": "We coordinate customs paperwork with licensed local agents. Values, duties, taxes and clearance decisions belong to the customs authority.",
    "detailSq": "Koordinojmë dokumentet doganore me agjentë vendas të licencuar. Vlerat, detyrimet, taksat dhe vendimet e zhdoganimit përcaktohen nga autoriteti doganor.",
    "ports": []
  },
  {
    "en": "/t1-transit",
    "sq": "/al/tranzit-t1",
    "name": "T1 Transit Support",
    "nameSq": "Mbështetje për tranzit T1",
    "kind": "service",
    "detail": "Transit-document coordination supports vehicle movement under customs control between EU customs points, where applicable.",
    "detailSq": "Koordinimi i dokumenteve të tranzitit mbështet lëvizjen e automjeteve nën kontroll doganor mes pikave doganore të BE-së, kur zbatohet.",
    "ports": []
  },
  {
    "en": "/carnet-de-passage",
    "sq": "/al/carnet-de-passage",
    "name": "Carnet de Passage Handling",
    "nameSq": "Trajtimi i Carnet de Passage",
    "kind": "service",
    "detail": "We coordinate support for temporary vehicle admission using a Carnet de Passage where applicable; destination requirements need confirmation.",
    "detailSq": "Koordinojmë mbështetjen për pranimin e përkohshëm të automjetit me Carnet de Passage kur zbatohet; kërkesat e destinacionit duhen konfirmuar.",
    "ports": []
  },
  {
    "en": "/port-handling",
    "sq": "/al/trajtim-ne-port",
    "name": "Port Handling",
    "nameSq": "Trajtim në port",
    "kind": "service",
    "detail": "Unloading, terminal coordination and release procedures at Durrës and relevant European gateways are arranged for the confirmed shipment.",
    "detailSq": "Shkarkimi, koordinimi në terminal dhe procedurat e lirimit në Durrës dhe portet përkatëse evropiane organizohen për dërgesën e konfirmuar.",
    "ports": []
  },
  {
    "en": "/final-mile-delivery",
    "sq": "/al/dorezim-ne-adrese",
    "name": "Final-Mile Delivery",
    "nameSq": "Dorëzim në adresë",
    "kind": "service",
    "detail": "We coordinate delivery by car transporter from the port or airport to the confirmed final address in Albania or Europe.",
    "detailSq": "Koordinojmë dorëzimin me kamion transportues makinash nga porti ose aeroporti deri në adresën e konfirmuar në Shqipëri ose Evropë.",
    "ports": []
  },
  {
    "en": "/storage-coordination",
    "sq": "/al/koordinim-ruajtjeje",
    "name": "Storage Coordination",
    "nameSq": "Koordinim ruajtjeje",
    "kind": "service",
    "detail": "Temporary vehicle holding may be coordinated where available. Space, conditions and charges must be confirmed for the shipment.",
    "detailSq": "Qëndrimi i përkohshëm i automjetit mund të koordinohet sipas disponueshmërisë. Hapësira, kushtet dhe tarifat konfirmohen për dërgesën.",
    "ports": []
  },
  ...["Savannah", "Elizabeth", "Houston", "Los Angeles", "Indianapolis"].map(name => ({
    en: `/locations/${name.toLowerCase().replaceAll(" ", "-")}`,
    sq: `/al/vendndodhjet/${name.toLowerCase().replaceAll(" ", "-")}`,
    name, nameSq: name, kind: "city" as const,
    detail: `${name} is named in our USA export-transport guidance. Collection, inland transport, export-document coordination and the onward shipping route are assessed for your vehicle. The exact facility, availability and service scope require confirmation before booking.`,
    detailSq: `${name} përmendet në udhëzimet tona për transportin e eksportit nga SHBA-ja. Marrja, transporti tokësor, koordinimi i dokumenteve të eksportit dhe itinerari i mëtejshëm vlerësohen për automjetin tuaj. Objekti konkret, disponueshmëria dhe fusha e shërbimit konfirmohen para rezervimit.`,
    ports: [],
  })),
  {
    en: "/shipping-to-slovenia", sq: "/al/transport-makinash-ne-slloveni",
    name: "Slovenia", nameSq: "Slloveni", kind: "destination",
    detail: "Koper in Slovenia is named in our Austria shipping guidance. Ask us to assess vehicle transport, documentation and onward delivery for your specific destination; availability and the service scope require confirmation.",
    detailSq: "Koperi në Slloveni përmendet në udhëzimet tona për transportin drejt Austrisë. Na kërkoni të vlerësojmë transportin e automjetit, dokumentacionin dhe dorëzimin në destinacionin tuaj; disponueshmëria dhe fusha e shërbimit duhen konfirmuar.",
    ports: ["koper"],
  }
];

export const KEYWORD_ROUTE_MAP = Object.fromEntries(KEYWORD_PAGES.map(p => [p.en, p.sq]));
