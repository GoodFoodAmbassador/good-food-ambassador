// ── GFA CATEGORY DATA ─────────────────────────────────────────────────────────
// Each category follows the same shape. Add product data as categories launch.
// 'status: live' categories show full experience; 'coming-soon' shows hub + teaser.

// ── OILS ──────────────────────────────────────────────────────────────────────

const OILS_TIERS = {
  everyday: { label:'Everyday', range:'Under $15', color:'#2D7A1F', bg:'rgba(45,122,31,0.09)', desc:'Widely available, honestly priced' },
  stepup:   { label:'Step Up',  range:'$15–$30',   color:'#B87808', bg:'rgba(184,120,8,0.09)', desc:'More character, certified origin' },
  special:  { label:'Special',  range:'$30+',       color:'#6D3DB5', bg:'rgba(109,61,181,0.09)', desc:'Small production, traceable provenance' },
}

const OILS_PRODUCTS = [
  // ── EVERYDAY ──
  { id:1,  name:'California Olive Ranch EVOO',         origin:'California, USA',        price:12, tier:'everyday', flavor:['mild','buttery'],   use:['cooking','all-purpose'],     cert:'COOC Certified',                harvest:'Oct 2024',     retailer:'Walmart · WFM',            desc:'One of the most consistently fresh everyday oils on the US market. Mild and clean – works well for everyday cooking. Harvest date on every bottle.',                                                                                                  profile:'Mild & Buttery',      journey:['beginner','cook'],       walmartUrl:'https://www.walmart.com/search?q=california+olive+ranch+evoo' },
  { id:2,  name:'Cobram Estate Classic',               origin:'Victoria, Australia',    price:14, tier:'everyday', flavor:['grassy','mild'],    use:['cooking','dressing'],        cert:'AOCA Certified',                harvest:'Jun 2024',     retailer:'WFM · Target',             desc:'Australian harvest means a fresher bottle year-round for the northern hemisphere. Light and grassy. Counter-seasonal advantage: May harvest arrives on US shelves far ahead of Mediterranean oils.',                                                 profile:'Light & Grassy',      journey:['beginner','cook'] },
  { id:3,  name:"Trader Joe's California Estate",      origin:'California, USA',        price:9,  tier:'everyday', flavor:['mild','nutty'],     use:['cooking','all-purpose'],     cert:'USDA Organic',                  harvest:'Sep 2024',     retailer:"Trader Joe's",             desc:'Carries a harvest date and organic certification at an accessible price. A practical everyday choice with more label transparency than most oils at this price point.',                                                                              profile:'Mild & Nutty',        journey:['beginner'] },
  { id:4,  name:'Pompeian Robust EVOO',                origin:'USA (cooperative blend)',price:9,  tier:'everyday', flavor:['peppery','fruity'], use:['cooking','dressing'],        cert:'NAOOA Certified',               harvest:'Oct 2024',     retailer:'Walmart · Kroger',         desc:"America's best-selling EVOO brand, produced by a Maryland-based olive cooperative. NAOOA-certified and consistently passes independent purity testing.",                                                                                            profile:'Medium & Peppery',    journey:['beginner','cook'],       walmartUrl:'https://www.walmart.com/search?q=pompeian+robust+evoo' },
  { id:5,  name:'Pompeian Organic EVOO',               origin:'Americas blend',         price:11, tier:'everyday', flavor:['mild','fruity'],    use:['cooking','dressing'],        cert:'USDA Organic + NAOOA',          harvest:'Nov 2024',     retailer:'Walmart',                  desc:"Organic-certified version of Pompeian's everyday line. Two independent certifications provide checkpoints for both farming practices and oil grade.",                                                                                               profile:'Light & Fruity',      journey:['beginner'],              walmartUrl:'https://www.walmart.com/search?q=pompeian+organic+evoo' },
  { id:6,  name:'365 Small Batch California EVOO',     origin:'California, USA',        price:13, tier:'everyday', flavor:['mild','grassy'],    use:['cooking','dressing'],        cert:'Olive Oil Commission of CA',    harvest:'Nov/Dec 2024', retailer:'Whole Foods',              desc:'Whole Foods private label, California origin, certified by the Olive Oil Commission of California. Harvest date printed on label.',                                                                                                                   profile:'Mild & Grassy',       journey:['beginner','cook'] },
  { id:7,  name:'Terra Delyssa First Cold Press EVOO', origin:'Tunisia',                price:12, tier:'everyday', flavor:['mild','fruity'],    use:['cooking','all-purpose'],     cert:'USDA Organic + IOC accredited', harvest:'Nov 2024',     retailer:'Costco',                   desc:'Tunisian single-origin, hand-harvested, pressed within 4 hours of picking. Full traceability via QR code. Multiple international competition medals.',                                                                                               profile:'Smooth & Mild',       journey:['beginner','cook'] },
  { id:8,  name:'Ottavio Early Harvest EVOO',          origin:'Multi-origin blend',     price:12, tier:'everyday', flavor:['grassy','peppery'], use:['cooking','dipping'],         cert:'Harvest date on label',         harvest:'Oct/Nov 2025', retailer:'Costco',                   desc:'Costco-exclusive 1-liter dark glass bottle. Early-harvest designation means olives were picked at color change – higher polyphenols, greener flavor.',                                                                                               profile:'Grassy & Peppery',    journey:['cook','enthusiast'] },
  { id:9,  name:'California Olive Ranch Global Blend', origin:'USA/multi-origin blend', price:14, tier:'everyday', flavor:['mild','balanced'],  use:['cooking','all-purpose'],     cert:'COOC Standards',                harvest:'Nov 2024',     retailer:'Walmart',                  desc:'Multi-origin blend crafted and certified by California Olive Ranch. Consistent and clean, with mild fruitiness. The most widely available COR product.',                                                                                             profile:'Mild & Balanced',     journey:['beginner','cook'],       walmartUrl:'https://www.walmart.com/search?q=california+olive+ranch+global+blend' },
  // ── STEP UP ──
  { id:10, name:'Lucini Italia Premium Select',        origin:'Italy, blend',           price:18, tier:'stepup',   flavor:['peppery','fruity'], use:['finishing','salads'],        cert:'Third-party verified',           harvest:'Nov 2024',     retailer:'WFM',                      desc:'A balanced Italian blend with a noticeable peppery finish. Good introduction to more assertive oils.',                                                                                                                                             profile:'Fruity & Peppery',    journey:['cook','enthusiast'] },
  { id:11, name:'Kirkland Signature EVOO (Costco)',    origin:'Italy, blend',           price:20, tier:'stepup',   flavor:['mild','balanced'],  use:['cooking','dressing'],        cert:'IOC standards',                 harvest:'Nov 2024',     retailer:'Costco',                   desc:'Costco private label at a remarkable price-per-liter. Independent testing confirms grade. Italian blend – mild and versatile.',                                                                                                                      profile:'Mild & Balanced',     journey:['beginner','cook'] },
  { id:12, name:"Trader Joe's 100% Greek Kalamata",   origin:'Kalamata, Greece',       price:10, tier:'stepup',   flavor:['fruity','mild'],    use:['dressing','finishing'],      cert:'PDO Kalamata',                  harvest:'Nov 2024',     retailer:"Trader Joe's",             desc:'PDO Kalamata designation means origin and production method are EU-verified. Fruity and gentle. Exceptional value for a single-origin PDO oil.',                                                                                                    profile:'Fruity & Gentle',     journey:['beginner','enthusiast'] },
  { id:13, name:'Costco Organic EVOO (Kirkland)',     origin:'Multi-origin blend',     price:22, tier:'stepup',   flavor:['mild','clean'],     use:['cooking','all-purpose'],     cert:'USDA Organic + IOC',            harvest:'Nov 2024',     retailer:'Costco',                   desc:'Organic version of the Kirkland line. Two checkpoints: USDA Organic for farming, IOC standards for grade. Great pantry value.',                                                                                                                     profile:'Clean & Mild',        journey:['beginner','cook'] },
  { id:14, name:'Graza Sizzle',                       origin:'Spain (Picual)',          price:22, tier:'stepup',   flavor:['grassy','peppery'], use:['cooking','sautéing'],        cert:'Harvest date on label',         harvest:'Oct 2024',     retailer:'Graza.co · WFM',           desc:'Picual variety from Spain in a squeeze bottle optimized for high-heat cooking. Harvest date printed. Direct-to-consumer model with full supply chain transparency.',                                                                                 profile:'Grassy & Robust',     journey:['cook','enthusiast'] },
  { id:15, name:'Graza Drizzle',                      origin:'Spain (Arbequina)',       price:25, tier:'stepup',   flavor:['fruity','mild'],    use:['finishing','salads'],        cert:'Harvest date on label',         harvest:'Oct 2024',     retailer:'Graza.co · WFM',           desc:'Arbequina variety from Spain in a drizzle-optimized bottle. Light and fruity – designed for finishing. Same transparent supply chain as Sizzle.',                                                                                                    profile:'Fruity & Light',      journey:['cook','enthusiast'] },
  { id:16, name:'California Olive Ranch Extra',       origin:'California, USA',        price:18, tier:'stepup',   flavor:['mild','fruity'],    use:['dressing','finishing'],      cert:'COOC + Harvest date',           harvest:'Dec 2024',     retailer:'WFM · COR.com',            desc:'Premium tier of California Olive Ranch. California single-origin, early harvest, full COOC certification.',                                                                                                                                          profile:'Mild & Fruity',       journey:['cook','enthusiast'] },
  { id:17, name:'Séka Hills Arbequina',               origin:'Yolo County, California', price:24, tier:'stepup',  flavor:['buttery','mild'],   use:['finishing','salads'],        cert:'COOC Certified + Harvest date', harvest:'Nov 2024',     retailer:'Séka Hills direct',        desc:'Family-farm California oil. Arbequina variety – characteristically buttery and mild. COOC certified. Strong terroir story with transparent sourcing.',                                                                                               profile:'Buttery & Mild',      journey:['enthusiast'] },
  { id:18, name:'Partanna Extra Virgin',              origin:'Sicily, Italy',          price:20, tier:'stepup',   flavor:['fruity','peppery'], use:['dressing','finishing'],      cert:'DOP Valli Trapanesi',           harvest:'Nov 2024',     retailer:'Specialty importers',      desc:'Sicilian DOP oil from the Trapani valley. Nocellara del Belice variety. Certified DOP – origin, variety, and production method all verified.',                                                                                                     profile:'Fruity & Peppery',    journey:['cook','enthusiast'] },
  { id:19, name:'Iliada PDO Kalamata',                origin:'Kalamata, Greece',       price:16, tier:'stepup',   flavor:['fruity','mild'],    use:['dressing','cooking'],        cert:'PDO Kalamata',                  harvest:'Nov 2024',     retailer:'WFM · specialty shops',   desc:'EU PDO-certified Kalamata oil. Koroneiki variety. Fruity with low acidity. One of the most consistent PDO Kalamata labels on the US market.',                                                                                                     profile:'Fruity & Clean',      journey:['beginner','enthusiast'] },
  { id:20, name:'Brightland Alive',                   origin:'California, USA',        price:37, tier:'stepup',   flavor:['fruity','grassy'],  use:['finishing','salads'],        cert:'COOC Certified + Harvest date', harvest:'Nov 2024',     retailer:'Brightland.co',            desc:'Harvest-date certified California oil. Arbosana and Arbequina blend. Direct-to-consumer, high transparency. Grassy and bright – designed for finishing.',                                                                                            profile:'Bright & Grassy',     journey:['enthusiast'] },
  { id:21, name:'Costco Terra Delyssa Organic',       origin:'Tunisia',                price:18, tier:'stepup',   flavor:['mild','smooth'],    use:['cooking','all-purpose'],     cert:'USDA Organic + Ecocert',        harvest:'Nov 2024',     retailer:'Costco',                   desc:'Organic Tunisian oil available in tin format at Costco. Two organic certifications. QR code traceability. Excellent price-per-liter for the quality.',                                                                                              profile:'Smooth & Mild',       journey:['beginner','cook'] },
  { id:22, name:'Zoe Spanish Extra Virgin',           origin:'Spain (blend)',          price:15, tier:'stepup',   flavor:['fruity','mild'],    use:['cooking','dressing'],        cert:'IOC standards',                 harvest:'Nov 2024',     retailer:'WFM · specialty shops',   desc:'Spanish blend with a mild, approachable flavor profile. IOC standards compliance. Good everyday-to-step-up crossover.',                                                                                                                             profile:'Fruity & Mild',       journey:['beginner','cook'] },
  { id:23, name:'McEvoy Ranch Organic EVOO',          origin:'Marin County, California',price:28,tier:'stepup',   flavor:['peppery','fruity'], use:['finishing','salads'],        cert:'COOC + USDA Organic',           harvest:'Nov 2024',     retailer:'McEvoyRanch.com · WFM',   desc:'California estate oil, Tuscan variety blend. Certified organic and COOC-verified. Known for consistent peppery finish and green fruit character.',                                                                                                  profile:'Peppery & Green',     journey:['cook','enthusiast'] },
  { id:24, name:'Whole Foods 365 Greek EVOO',         origin:'Crete, Greece',          price:14, tier:'stepup',   flavor:['mild','fruity'],    use:['cooking','dressing'],        cert:'PDO Crete',                     harvest:'Nov 2024',     retailer:'Whole Foods',              desc:'PDO Crete designation from the Whole Foods house label. Single origin with EU verified provenance. Accessible entry into Greek PDO oils.',                                                                                                          profile:'Mild & Fruity',       journey:['beginner'] },
  // ── SPECIAL ──
  { id:25, name:'Eataly Olio di Oliva Extravergine Laudemio',origin:'Tuscany, Italy',  price:45, tier:'special',  flavor:['peppery','grassy'], use:['finishing','dipping'],       cert:'Laudemio consortium',           harvest:'Nov 2024',     retailer:'Eataly stores',            desc:'Laudemio is a Tuscan quality consortium with stricter standards than DOP. Intense green-fruit character with a strong peppery finish. Benchmark finishing oil.',                                                                                     profile:'Intense & Peppery',   journey:['enthusiast'] },
  { id:26, name:'Manni Olio Per Doni',                origin:'Tuscany, Italy',         price:95, tier:'special',  flavor:['peppery','grassy'], use:['finishing'],                 cert:'Harvest date + Lab tested',     harvest:'Nov 2024',     retailer:'Manni.biz',                desc:'One of the most documented Italian premium oils. Lab-tested for polyphenol content on each batch. Labeled with exact harvest date and grove. Only for finishing.',                                                                                   profile:'Complex & Intense',   journey:['enthusiast'] },
  { id:27, name:'Marqués de Griñón Oleum Artis',      origin:'Toledo, Spain',          price:38, tier:'special',  flavor:['fruity','complex'], use:['finishing','salads'],        cert:'Harvest date + varietal cert',  harvest:'Oct 2024',     retailer:'Spanish importers',        desc:'Single-estate Spanish oil, Picual variety. From a historic estate in Castilla-La Mancha. Complex flavor with long finish. Harvest date and variety certified.',                                                                                      profile:'Complex & Fruity',    journey:['enthusiast'] },
  { id:28, name:'Gaea Fresh EVOO',                    origin:'Crete, Greece',          price:22, tier:'special',  flavor:['fresh','mild'],     use:['finishing','dressing'],      cert:'PDO Crete + Harvest date',      harvest:'Nov 2024',     retailer:'WFM · specialty shops',   desc:'Gaea uses nitrogen-flushed bottles to preserve freshness. PDO Crete. One of the few brands to publish polyphenol content on the label.',                                                                                                           profile:'Fresh & Clean',       journey:['cook','enthusiast'] },
  { id:29, name:'Frantoia Barbera',                   origin:'Sicily, Italy',          price:32, tier:'special',  flavor:['fruity','mild'],    use:['finishing','salads'],        cert:'DOP Valli Trapanesi',           harvest:'Nov 2024',     retailer:'Italian importers',        desc:'Nocellara del Belice DOP from Sicily. Gentle and fruity with a rich texture. Consistent award-winner. One of the benchmark Sicilian finishing oils.',                                                                                               profile:'Rich & Fruity',       journey:['enthusiast'] },
  { id:30, name:'Apollo Kritsa Greek Estate',         origin:'Crete, Greece',          price:35, tier:'special',  flavor:['peppery','green'],  use:['finishing','dipping'],       cert:'PDO Crete + Harvest date',      harvest:'Nov/Dec 2024', retailer:'Apollo direct',            desc:'Single-estate Cretan oil with full terroir traceability. Harvest date and grove location published. High-polyphenol early harvest. Benchmark for Cretan oils.',                                                                                      profile:'Green & Peppery',     journey:['enthusiast'] },
]

const OILS_QUIZ = [
  {
    id:'q1', question:'How do you primarily use olive oil at home?',
    options:[
      { label:'For cooking – sautéing, roasting, everyday use', value:'cooking' },
      { label:'For salads, dressings, and cold dishes', value:'dressing' },
      { label:'As a finishing oil – drizzled at the table', value:'finishing' },
      { label:"I'm still figuring that out", value:'all-purpose' },
    ]
  },
  {
    id:'q2', question:'What flavor do you prefer?',
    options:[
      { label:'Mild and buttery – gentle on the palate', value:'mild' },
      { label:'Grassy and green – fresh, vegetal notes', value:'grassy' },
      { label:'Fruity and round – ripe olive character', value:'fruity' },
      { label:'Peppery and robust – a strong finish', value:'peppery' },
    ]
  },
  {
    id:'q3', question:"What's your budget?",
    options:[
      { label:'Under $15 – everyday value', value:'everyday' },
      { label:'$15–$30 – willing to step up for quality', value:'stepup' },
      { label:'$30+ – special occasions and gifts', value:'special' },
      { label:'No preference', value:'any' },
    ]
  },
]

const OILS_PROFILES = {
  beginner:   { label:'Good Food Curious',     icon:'🌱', color:'#2D7A1F', bg:'rgba(45,122,31,0.08)',   desc:'You want transparency without the complexity. Start with a harvest-dated everyday oil and build from there.', mission:'Find one oil you trust and learn its story.' },
  cook:       { label:'Good Food Cook',        icon:'🍽️', color:'#B87808', bg:'rgba(184,120,8,0.08)',   desc:'You cook regularly and want oils that perform well without overthinking labels. Certified, fresh, and reliable.',    mission:'Build a two-oil kitchen: one for heat, one for finishing.' },
  enthusiast: { label:'Good Food Ambassador',  icon:'🫒', color:'#6D3DB5', bg:'rgba(109,61,181,0.08)', desc:'You care about provenance, polyphenols, and the difference a great oil makes. You read harvest dates instinctively.', mission:'Find a single-estate oil and learn its grove.' },
}

const OILS_MYTHS = [
  { myth:'"First cold press" is a meaningful quality indicator', truth:'Every certified EVOO is cold-extracted. The phrase is a legacy marketing term with no regulatory meaning today. Look for harvest date instead.', icon:'🛡️' },
  { myth:'Darker oil is better quality', truth:'Color tells you almost nothing about quality and depends entirely on olive variety and harvest timing. Taste and chemistry matter – not color.', icon:'🎨' },
  { myth:'Italian label means Italian olives', truth:'Oils labeled "packaged in Italy" or "Italian blend" may contain olives from Spain, Greece, or Tunisia. Look for PDO or DOP certification and a specific region of origin.', icon:'🇮🇹' },
  { myth:'Olive oil cannot be used for high-heat cooking', truth:'EVOO has a smoke point of 375–405°F – well above most home cooking temperatures. Its polyphenols actually provide some oxidative protection at heat.', icon:'🔥' },
  { myth:'"Light" olive oil has fewer calories', truth:'"Light" refers to flavor profile (refined, milder taste), not caloric content. All olive oils have roughly the same calories per tablespoon.', icon:'⚡️' },
]

const OILS_ACADEMY = [
  {
    id:'origins', icon:'🌍', color:'#2563EB', title:'Where olive oil comes from',
    hook:"A short history, the major producing countries, and who grows most of the world's olives.",
    sections:[
      { h:'A brief history', b:'Olive cultivation began in the eastern Mediterranean around 6,000 years ago. The olive tree was central to Greek, Roman, and Phoenician economies – traded, taxed, and used as currency. Olive oil was not just food: it lit lamps, anointed athletes, and preserved grain.' },
      { h:'Major producing countries', b:'Spain produces roughly 45% of the world\'s olive oil, followed by Italy (15%) and Greece (12%). Portugal, Tunisia, Morocco, Turkey, and Chile are significant producers. California produces a small but rapidly growing share with strong certification infrastructure.' },
      { h:'Where most EVOO is consumed', b:'Mediterranean countries consume the most olive oil per capita. In the US and Northern Europe, consumption has grown dramatically since the 1990s health research. The global EVOO market is worth over $13 billion annually.' },
    ]
  },
  {
    id:'varieties', icon:'🫒', color:'#16A34A', title:'Olive varieties and what they taste like',
    hook:'Why the olive variety matters – and how to recognize the main ones.',
    sections:[
      { h:'Why variety matters', b:'Like wine grapes, olive varieties (cultivars) produce dramatically different flavor profiles. Picual from Spain is robust and peppery; Arbequina is mild and fruity; Koroneiki from Greece is grassy and herbaceous. The variety determines the flavor ceiling before any other factor.' },
      { h:'Key varieties to know', b:'Picual (Spain): high polyphenols, robust, long shelf life. Arbequina (Spain/California): mild, buttery, low bitterness. Koroneiki (Greece): small olive, intense green-fruit character. Leccino (Italy): mild, fruity, versatile. Nocellara del Belice (Sicily): green fruit, tomato-leaf notes, short harvest window.' },
      { h:'Blended vs. single-variety', b:"Many excellent oils are blended across varieties for consistency. Single-variety oils (monocultivar) showcase a specific flavor profile but are more harvest-dependent. Neither is inherently superior – transparency about what's in the bottle is the key quality signal." },
    ]
  },
  {
    id:'harvest', icon:'📅', color:'#D97706', title:'Why harvest date is the most important number',
    hook:'Olive oil is perishable. The harvest date tells you more than the best-before date.',
    sections:[
      { h:'Olive oil goes stale', b:'Unlike wine, olive oil does not improve with age. It degrades – losing its polyphenols, flavor, and health properties over time. Most EVOO is best consumed within 12–18 months of harvest and within 6 weeks of opening.' },
      { h:'Best-before vs. harvest date', b:"Best-before dates are set by the bottler and often run 2 years from bottling, not from harvest. An oil bottled 18 months after harvest could expire 3.5 years after the olives were picked. The harvest date is the only number that tells you when the oil's clock started." },
      { h:'How to shop by harvest date', b:'Look for an oil harvested within the last 12 months. In the northern hemisphere, olives are typically harvested October–January. Australian and South American oils (counter-seasonal) are harvested May–July – and often arrive in US stores while Northern Hemisphere oils are still 6–12 months old.' },
    ]
  },
  {
    id:'chemistry', icon:'🧪', color:'#7C3AED', title:'Polyphenols, acidity, and what the chemistry means',
    hook:'The two numbers that matter most on a quality certificate – and what they actually tell you.',
    sections:[
      { h:'Free fatty acid acidity (FFA)', b:'FFA measures degradation at the molecular level. EVOO must have FFA below 0.8% by EU standards; most high-quality oils are below 0.3%. The lower the FFA, the healthier and more intact the oil. High FFA usually indicates overripe olives, heat damage, or delayed processing.' },
      { h:'Polyphenols', b:'Polyphenols are the bioactive compounds responsible for the peppery finish and most of the health benefits attributed to olive oil. Early-harvest oils have higher polyphenol content (sometimes 500+ mg/kg); late-harvest oils can drop below 100 mg/kg. The European Commission allows a health claim for oils with >250 mg/kg of oleocanthal and oleuropein.' },
      { h:'What high polyphenols feel like', b:'The characteristic "catch" in the throat from a good EVOO is oleocanthal – an anti-inflammatory compound with a similar mechanism to ibuprofen. The more pronounced the catch, the higher the oleocanthal. Throat sensation is the easiest way to sense polyphenol level without a lab.' },
    ]
  },
  {
    id:'certification', icon:'🏷️', color:'#DC2626', title:'Certifications decoded',
    hook:"What PDO, DOP, PGI, COOC, and NAOOA actually guarantee – and what they don't.",
    sections:[
      { h:'PDO / DOP (Protected Designation of Origin)', b:'EU certification confirming that olives were grown, pressed, and bottled in a specific geographic region. The strictest EU designation. Examples: PDO Kalamata (Greece), DOP Valli Trapanesi (Sicily). Guarantees origin – does not guarantee freshness or polyphenol level.', tag:'EU designation' },
      { h:'PGI (Protected Geographic Indication)', b:'Slightly less strict than PDO. The product must originate in a region, but processing can occur elsewhere. Less common for olive oil than PDO.', tag:'EU designation' },
      { h:'COOC (California Olive Oil Council)', b:"The US's most rigorous voluntary standard. Chemical testing plus sensory panel evaluation. Requires harvest date disclosure. COOC-certified oils are reliably grade-accurate.", tag:'US designation' },
      { h:'NAOOA (North American Olive Oil Association)', b:'Certifies that oils pass USDA/IOC standards for grade. Less stringent than COOC. A minimum floor for grade verification, not a comprehensive quality standard.', tag:'US designation' },
      { h:"What certification doesn't tell you", b:'No certification system requires disclosure of harvest date, polyphenol content, or maximum age. Even a PDO-certified oil can be two years old. Certification is a useful floor, not a ceiling.' },
    ]
  },
  {
    id:'fakes', icon:'🕵️', color:'#374151', title:'The fraud problem and how to avoid it',
    hook:"Olive oil fraud is real and widespread. Here's what the research shows – and what to do about it.",
    sections:[
      { h:'The scale of the problem', b:"Multiple UC Davis studies (2010–2023) found that 60–80% of Italian-labeled EVOO sold in US supermarkets failed EVOO standards under independent testing. Adulteration with cheaper refined oils (sunflower, canola) or lower-grade olive oil is the most common fraud." },
      { h:'How fraud happens', b:"Fraud occurs primarily at the blending and labeling stage. Producers may blend EVOO with refined olive oil or other vegetable oils, mislabel geographic origin, or bottle old oil under a new harvest date. The global olive oil supply chain has weak enforcement and inconsistent testing." },
      { h:'How to protect yourself', b:"Buy from producers with independent certification (COOC in the US, specific EU PDO with known producers). Look for harvest date. Buy in dark glass or tin – oil degrades faster in clear bottles. Avoid unusually cheap 'Italian EVOO' without certification. Taste it: real EVOO has bitterness and throat catch." },
    ]
  },
  {
    id:'sensory', icon:'👃', color:'#0891B2', title:'How to taste olive oil',
    hook:'The IOC sensory evaluation method – simplified for home use.',
    sections:[
      { h:'The three positive attributes', b:"Fruitiness: the smell and taste of fresh olives. Bitterness: a positive characteristic, especially in early-harvest oils. Pungency: the throat catch from polyphenols, particularly oleocanthal. A well-made EVOO should show all three in some proportion." },
      { h:'The defect categories', b:"The IOC sensory panel looks for defects: rancidity (stale, waxy smell from oxidation), mustiness (fermented notes from damaged olives), fusty (anaerobic fermentation), and winey/vinegary notes. Any detectable defect disqualifies an oil from the EVOO grade." },
      { h:'Simple home tasting method', b:"Warm a small glass in your hands. Swirl and smell – look for fresh olive, grass, or fruit. Sip a small amount and let it spread. Note bitterness on the sides of your tongue. Swallow and wait for the throat catch. Rate fruitiness (1–5), bitterness (1–5), and pungency (1–5). Compare the same way each time." },
    ]
  },
]

// ── STUB CATEGORIES (data to be added as each category launches) ─────────────

const GRAINS_CATEGORY_META = {
  id: 'grains',
  name: 'Grains & Noodles',
  productLabel: 'grain',
  productsLabel: 'grains',
  experienceName: 'The Mill',
  hubNumber: '02',
  illustration: '/illustrations/GFA_illus_grains.png',
  heroTagline: "Every grain has a story. Most labels don't tell it.",
  heroDesc: 'Varieties, milling methods, and the producers who are transparent about both.',
  labTitle: 'Tasting Lab',
  labDesc: 'Learning to taste and evaluate grains',
  guideTitle: 'The Guide',
  guideDesc: 'Labels, varieties, and what to look for',
  academyTitle: 'The Academy',
  academyDesc: 'The science and history of grains and milling',
  productsTitle: 'Grains we recommend',
  status: 'coming-soon',
  comingSoonDesc: "We're researching pasta makers, flour millers, and rice producers. Coming soon.",
  tiers: null, products: [], quiz: [], profiles: null, myths: [], academy: [],
}

const LEGUMES_CATEGORY_META = {
  id: 'legumes',
  name: 'Legumes & Pulses',
  productLabel: 'product',
  productsLabel: 'products',
  experienceName: 'The Pantry',
  hubNumber: '03',
  illustration: '/illustrations/GFA_illus_legumes.png',
  heroTagline: 'The most underestimated food in your kitchen.',
  heroDesc: 'Sourcing, processing methods, and the difference between commodity and craft.',
  labTitle: 'Tasting Lab',
  labDesc: 'Sensory evaluation for legumes',
  guideTitle: 'The Guide',
  guideDesc: 'Labels, varieties, and processing methods',
  academyTitle: 'The Academy',
  academyDesc: 'Nutritional science and sourcing stories',
  productsTitle: 'Products we recommend',
  status: 'coming-soon',
  comingSoonDesc: 'Evaluating dried beans, lentils, chickpeas, and canned alternatives. Coming soon.',
  tiers: null, products: [], quiz: [], profiles: null, myths: [], academy: [],
}

const SNACKS_CATEGORY_META = {
  id: 'snacks',
  name: 'Snacks & Pantry',
  productLabel: 'product',
  productsLabel: 'products',
  experienceName: 'The Shelf',
  hubNumber: '04',
  illustration: '/illustrations/GFA_illus_snacks.png',
  heroTagline: 'Between meals, the ingredient list says everything.',
  heroDesc: 'Snacks and pantry staples evaluated on honesty, not marketing.',
  labTitle: 'Tasting Lab',
  labDesc: 'Blind tasting sessions for snacks',
  guideTitle: 'The Guide',
  guideDesc: 'Decoding ingredient lists and nutrition panels',
  academyTitle: 'The Academy',
  academyDesc: 'Ultra-processing, additives, and what the research says',
  productsTitle: 'Products we recommend',
  status: 'coming-soon',
  comingSoonDesc: "We're evaluating crackers, nut butters, condiments, and pantry staples. Coming soon.",
  tiers: null, products: [], quiz: [], profiles: null, myths: [], academy: [],
}

const LNA_CATEGORY_META = {
  id: 'lna',
  name: 'Low & No Alcohol',
  productLabel: 'drink',
  productsLabel: 'drinks',
  experienceName: 'The Still',
  hubNumber: '05',
  illustration: '/illustrations/GFA_illus_lna.png',
  heroTagline: "Sobriety shouldn't mean settling.",
  heroDesc: 'A new category of drinks evaluated on flavor, transparency, and ingredient honesty.',
  labTitle: 'Tasting Lab',
  labDesc: 'Sensory sessions for L&NA drinks',
  guideTitle: 'The Guide',
  guideDesc: 'How L&NA drinks are made and what to look for',
  academyTitle: 'The Academy',
  academyDesc: 'The science of alcohol removal and botanical brewing',
  productsTitle: 'Drinks we recommend',
  status: 'coming-soon',
  comingSoonDesc: '10 products already scouted. Full evaluations in progress.',
  tiers: null, products: [], quiz: [], profiles: null, myths: [], academy: [],
}

const SEAFOOD_CATEGORY_META = {
  id: 'seafood',
  name: 'Seafood',
  productLabel: 'product',
  productsLabel: 'products',
  experienceName: 'The Catch',
  hubNumber: '06',
  illustration: '/illustrations/GFA_illus_seafood.png',
  heroTagline: 'Wild, farmed, or mislabeled – most seafood labels leave you guessing.',
  heroDesc: 'Fishing methods, certifications, and the producers who can tell you where your fish actually came from.',
  labTitle: 'Tasting Lab',
  labDesc: 'Sensory evaluation for seafood',
  guideTitle: 'The Guide',
  guideDesc: 'Certifications, sourcing, and what the labels mean',
  academyTitle: 'The Academy',
  academyDesc: 'Fisheries science, sustainability, and supply chain transparency',
  productsTitle: 'Products we recommend',
  status: 'coming-soon',
  comingSoonDesc: 'Researching tinned fish, fresh sourcing programs, and certification bodies. Coming soon.',
  tiers: null, products: [], quiz: [], profiles: null, myths: [], academy: [],
}

// ── FULL CATEGORY CONFIGS ─────────────────────────────────────────────────────

export const OILS_CATEGORY = {
  id: 'olive-oils',
  name: 'Oils & Condiments',
  productLabel: 'oil',
  productsLabel: 'oils',
  experienceName: 'The Crush',
  hubNumber: '01',
  illustration: '/illustrations/GFA_illus_oils.png',
  heroTagline: "Fall for olive oil. Find the one that's yours.",
  heroDesc: "Most people have never tasted real olive oil.\nThis is where that changes.",
  labTitle: 'Taste Lab',
  labDesc: 'Seven sessions on sensory evaluation',
  labSessionsTitle: 'Seven sessions based on the IOC sensory evaluation method.',
  guideTitle: 'The Guide',
  guideDesc: 'Labels, certifications, and common myths',
  academyTitle: 'The Academy',
  academyDesc: 'The science and history behind the category',
  productsTitle: 'Oils we recommend',
  productsDesc: 'Representative examples at each price tier. Prices and harvest dates are based on availability at time of research.',
  status: 'live',
  tiers: OILS_TIERS,
  products: OILS_PRODUCTS,
  quiz: OILS_QUIZ,
  profiles: OILS_PROFILES,
  myths: OILS_MYTHS,
  academy: OILS_ACADEMY,
}

export const GRAINS_CATEGORY  = GRAINS_CATEGORY_META
export const LEGUMES_CATEGORY = LEGUMES_CATEGORY_META
export const SNACKS_CATEGORY  = SNACKS_CATEGORY_META
export const LNA_CATEGORY     = LNA_CATEGORY_META
export const SEAFOOD_CATEGORY = SEAFOOD_CATEGORY_META

export const ALL_CATEGORIES = [
  OILS_CATEGORY,
  GRAINS_CATEGORY,
  LEGUMES_CATEGORY,
  SNACKS_CATEGORY,
  LNA_CATEGORY,
  SEAFOOD_CATEGORY,
]
