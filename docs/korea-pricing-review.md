# Approved Korea pricing update — 14 November 2026

## Verification

Both `/calculator` and `/al/kalkulator-transporti` checked at 390×844 and 1440×900 with EUR 10,000 vehicle price. All 48 combinations passed, including matching WhatsApp prices and method lines:

| Destination/method | Sedan/Coupe | SUV/Minivan | Oversized |
|---|---:|---:|---:|
| Albania RoRo shipping | 1,750 | 1,850 | 1,950 |
| Albania RoRo total | 11,750 | 11,850 | 11,950 |
| Albania container shipping | 1,090 | 1,090 | 1,090 |
| Albania container total | 11,090 | 11,090 | 11,090 |
| Germany RoRo total | 11,000 | 11,000 | 11,000 |
| Netherlands RoRo total | 11,000 | 11,000 | 11,000 |

Albania has no preselected method and no result until selection. Leaving Albania clears the choice; returning requires a fresh choice. Germany/Netherlands show no method step. Matching includes lists and method-specific result titles/rows verified. No horizontal overflow or console/page errors in these checks. Screenshots captured and visually reviewed for step 4 and both result methods, in both languages and widths. Automated phone browser, not physical-device verification. No WhatsApp message sent and no form submitted.

98 unit tests passed. Latest automatic build: build OK. USA calculator, routes, non-FAQ SEO, forms, analytics event names and backend unchanged. Existing FAQ structured data consumes the updated answers automatically. Historical design-review documents remain historical evidence, not current price tables. Nothing published.

Regression browser check: `python3 tests/e2e/korea_pricing_check.py`.

## Every replacement sentence (new wording)

### English calculator FAQ
- South Korea to Albania offers RoRo or shared container shipping, with a fixed price covering local pickup anywhere in South Korea, export documentation, ocean freight and the Alpha Worldwide service fee.
- Germany and the Netherlands remain RoRo-only.

### English calculator explanation
- Albania offers RoRo or shared container shipping — bundling local pickup anywhere in South Korea, export documentation, ocean freight and the Alpha Worldwide service fee into one fixed price.
- Germany and the Netherlands remain RoRo-only.

### Albanian calculator FAQ
- Nga Koreja e Jugut drejt Shqipërisë ofrohet RoRo ose kontenier i përbashkët, me një çmim të fiksuar që përfshin tërheqjen lokale kudo në Korenë e Jugut, dokumentacionin e eksportit, transportin detar dhe tarifën e shërbimit të Alpha Worldwide.
- Gjermania dhe Holanda mbeten vetëm me RoRo.

### Albanian calculator explanation
- Shqipëria ofron RoRo ose kontenier të përbashkët — me tërheqje lokale kudo në Korenë e Jugut, dokumentacion eksporti, transport detar dhe tarifën e shërbimit të Alpha Worldwide në një çmim të fiksuar.
- Gjermania dhe Holanda mbeten vetëm me RoRo.

### `/import-korea` FAQ (also its FAQ JSON-LD)
- For Albania, choose RoRo or shared container shipping (4 cars per container).
- RoRo vehicles are driven on and off the vessel; shared container shipping offers full enclosure.
- Compare both prices in the calculator.

### `/al/makina-nga-korea` process
- Drejt Shqipërisë zgjidhni RoRo ose kontenier të përbashkët (4 makina për kontenier), sipas llojit të automjetit dhe preferencës suaj.

### `/al/makina-nga-korea` FAQ (also its FAQ JSON-LD)
- Drejt Shqipërisë ofrohet RoRo ose kontenier i përbashkët (4 makina për kontenier).
- Me RoRo automjeti hyn dhe del nga anija me lëvizjen e vet; kontenieri i përbashkët ofron mbrojtje të plotë.
- Krahasoni të dy çmimet në kalkulator.

### `/al/makina-nga-korea` container card
- Kontenier i përbashkët drejt Durrësit, me 4 makina për kontenier.
- Ofron mbrojtje të plotë dhe të njëjtin çmim transporti për çdo lloj automjeti.

### `/al/makina-nga-korea` RoRo card
- RoRo drejt Shqipërisë: automjeti hyn dhe del nga anija me lëvizjen e vet.
- Çmimi varet nga lloji i automjetit; krahasoni RoRo me kontenierin e përbashkët në kalkulator.

### Calculator empty-state sentences
- Complete vehicle type, price and destination, then choose a shipping method for Albania to see your cost breakdown.
- Plotësoni llojin e automjetit, çmimin dhe destinacionin, pastaj zgjidhni metodën e transportit për Shqipërinë për të parë detajimin e kostos.

## Other requested UI-copy changes

Removed the static RoRo-only tag in both languages. Added localized step-4 labels, method descriptions and comparison prices; method-specific result title/shipping row; Shipping method / Metoda e transportit WhatsApp lines. Includes lists now name pickup anywhere in South Korea and the selected freight method, with shared-container capacity of four cars. Customs/import-tax and estimate warnings unchanged. No obsolete Albania Korea figures remain in active site copy. Generic guides, keyword pages and Rotterdam guidance contain no Albania RoRo-only statement or obsolete Albania price and were left unchanged.