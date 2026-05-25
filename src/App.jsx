import { useState } from "react";

const BG = "#FAF8F3", SURFACE = "#FFFFFF", SURFACE2 = "#F4EFE4";
const BORDER = "rgba(26,21,14,0.09)", TEXT = "#1A1714", MUTED = "#7A736A", SOFT = "#9C958D";
const GOLD = "#B87808", GOLD_BG = "rgba(184,120,8,0.09)", GOLD_DIM = "#9A6806";
const INK = "#2A2218";

const TIERS = {
  everyday: { label:"Everyday", range:"Under $15", color:"#2D7A1F", bg:"rgba(45,122,31,0.09)", desc:"Widely available, honestly priced" },
  stepup:   { label:"Step Up",  range:"$15–$30",   color:GOLD,       bg:GOLD_BG,               desc:"More character, certified origin" },
  special:  { label:"Special",  range:"$30+",       color:"#6D3DB5",  bg:"rgba(109,61,181,0.09)", desc:"Small production, traceable provenance" },
};

const OILS = [
  // ── EVERYDAY ──────────────────────────────────────────────────────────────
  { id:1,  name:"California Olive Ranch EVOO",         origin:"California, USA",          price:12, tier:"everyday", flavor:["mild","buttery"],    use:["cooking","all-purpose"],        cert:"COOC Certified",               harvest:"Oct 2024",     retailer:"Walmart · Amazon · WFM",          desc:"One of the most consistently fresh everyday oils on the US market. Mild and clean — works well for everyday cooking. Harvest date on every bottle.",                                                                                                           profile:"Mild & Buttery",          journey:["beginner","cook"] },
  { id:2,  name:"Cobram Estate Classic",               origin:"Victoria, Australia",       price:14, tier:"everyday", flavor:["grassy","mild"],      use:["cooking","dressing"],           cert:"AOCA Certified",               harvest:"Jun 2024",     retailer:"Amazon · WFM · Target",           desc:"Australian harvest means a fresher bottle year-round for the northern hemisphere market. Light and grassy. Counter-seasonal advantage: May harvest arrives on US shelves far ahead of Mediterranean oils.",                                                  profile:"Light & Grassy",          journey:["beginner","cook"] },
  { id:3,  name:"Trader Joe's California Estate",      origin:"California, USA",          price:9,  tier:"everyday", flavor:["mild","nutty"],       use:["cooking","all-purpose"],        cert:"USDA Organic",                 harvest:"Sep 2024",     retailer:"Trader Joe's",                    desc:"Carries a harvest date and organic certification at an accessible price. A practical everyday choice with more label transparency than most oils at this price point.",                                                                                        profile:"Mild & Nutty",            journey:["beginner"] },
  { id:4,  name:"Pompeian Robust EVOO",                origin:"USA (cooperative blend)",   price:9,  tier:"everyday", flavor:["peppery","fruity"],   use:["cooking","dressing"],           cert:"NAOOA Certified",              harvest:"Oct 2024",     retailer:"Walmart · Amazon · Kroger",       desc:"America's best-selling EVOO brand, produced by a Maryland-based olive cooperative. NAOOA-certified and consistently passes independent purity testing. Reliable grade confirmation at the lowest price tier.",                                               profile:"Medium & Peppery",        journey:["beginner","cook"] },
  { id:5,  name:"Pompeian Organic EVOO",               origin:"Americas blend",            price:11, tier:"everyday", flavor:["mild","fruity"],      use:["cooking","dressing"],           cert:"USDA Organic + NAOOA",         harvest:"Nov 2024",     retailer:"Walmart · Amazon",                desc:"Organic-certified version of Pompeian's everyday line. Two independent certifications — USDA Organic and NAOOA — provide checkpoints for both farming practices and oil grade.",                                                                              profile:"Light & Fruity",          journey:["beginner"] },
  { id:6,  name:"365 Small Batch California EVOO",     origin:"California, USA",          price:13, tier:"everyday", flavor:["mild","grassy"],      use:["cooking","dressing"],           cert:"Olive Oil Commission of CA",   harvest:"Nov/Dec 2024", retailer:"Whole Foods · Amazon",            desc:"Whole Foods private label, California origin, certified by the Olive Oil Commission of California. Harvest date printed on label. Independent sensory panel testing confirms reliable grade.",                                                                 profile:"Mild & Grassy",           journey:["beginner","cook"] },
  { id:7,  name:"Terra Delyssa First Cold Press EVOO", origin:"Tunisia",                  price:12, tier:"everyday", flavor:["mild","fruity"],      use:["cooking","all-purpose"],        cert:"USDA Organic + IOC accredited",harvest:"Nov 2024",     retailer:"Costco · Amazon",                 desc:"Tunisian single-origin, hand-harvested, pressed within 4 hours of picking. Full traceability via QR code. Multiple international competition medals. Available at Costco in tin format — excellent bulk value.",                                             profile:"Smooth & Mild",           journey:["beginner","cook"] },
  { id:8,  name:"Ottavio Early Harvest EVOO",          origin:"Multi-origin blend",        price:12, tier:"everyday", flavor:["grassy","peppery"],   use:["cooking","dipping"],            cert:"Harvest date on label",        harvest:"Oct/Nov 2025", retailer:"Costco",                          desc:"Costco-exclusive 1-liter dark glass bottle. Early-harvest designation means olives were picked at color change — higher polyphenols, greener flavor. Harvest date clearly printed. Unusual transparency for the price.",                                     profile:"Grassy & Peppery",        journey:["cook","enthusiast"] },
  { id:9,  name:"California Olive Ranch Global Blend", origin:"USA/multi-origin blend",   price:14, tier:"everyday", flavor:["mild","balanced"],    use:["cooking","all-purpose"],        cert:"COOC Standards",               harvest:"Nov 2024",     retailer:"Walmart · Amazon",                desc:"Multi-origin blend crafted and certified by California Olive Ranch. Consistent and clean, with mild fruitiness. The most widely available COR product — a practical choice for high-use kitchens.",                                                         profile:"Mild & Balanced",         journey:["beginner","cook"] },
  // ── STEP UP ───────────────────────────────────────────────────────────────
  { id:10, name:"Lucini Italia Premium Select",        origin:"Italy, blend",             price:18, tier:"stepup",   flavor:["peppery","fruity"],   use:["finishing","salads"],           cert:"Third-party verified",         harvest:"Nov 2024",     retailer:"Amazon · WFM",                    desc:"A balanced Italian blend with a noticeable peppery finish. Good introduction to more assertive oils.",                                                                                                                                                      profile:"Fruity & Peppery",        journey:["cook","enthusiast"] },
  { id:11, name:"La Tourangelle Organic EVOO",         origin:"Spain, blend",             price:22, tier:"stepup",   flavor:["fruity","balanced"],  use:["dressing","finishing"],         cert:"USDA Organic",                 harvest:"Nov 2024",     retailer:"Amazon · WFM · Target",           desc:"Certified organic Spanish Arbequina. Balanced, fruity, with low bitterness. Reliable quality at this price.",                                                                                                                                              profile:"Fruity & Balanced",       journey:["cook","beginner"] },
  { id:12, name:"Olea Estates Premium Greek",          origin:"Peloponnese, Greece",      price:28, tier:"stepup",   flavor:["robust","peppery"],   use:["finishing","dipping"],          cert:"PDO",                          harvest:"Oct 2024",     retailer:"Amazon · WFM",                    desc:"Estate-grown Koroneiki from the Peloponnese with PDO certification. High polyphenol, robust character.",                                                                                                                                                    profile:"Intense & Peppery",       journey:["enthusiast","cook"] },
  { id:13, name:"Kirkland Organic Italian EVOO",       origin:"Puglia, Italy",            price:19, tier:"stepup",   flavor:["fruity","peppery"],   use:["cooking","finishing"],          cert:"PDO + USDA Organic",           harvest:"2024/25",      retailer:"Costco",                          desc:"Costco's organic Italian offering, noted for label transparency including cultivar (Cima di Bitonto and Coratina) and harvest campaign date. Dual PDO and USDA Organic certification. Strong value in bulk format.",                                         profile:"Fruity & Robust",         journey:["cook","enthusiast"] },
  { id:14, name:"Kirkland California EVOO",            origin:"California, USA",          price:17, tier:"stepup",   flavor:["grassy","mild"],      use:["cooking","finishing"],          cert:"COOC Certified",               harvest:"Nov 2024",     retailer:"Costco",                          desc:"Costco's California-origin EVOO in 1-liter dark glass. Crush date on label. COOC-certified. Independent reviewers cite grassy, herbaceous character and pricing transparency as its main strengths.",                                                       profile:"Grassy & Herbaceous",     journey:["cook","enthusiast"] },
  { id:15, name:"Graza Sizzle EVOO",                   origin:"Extremadura, Spain",       price:18, tier:"stepup",   flavor:["mild","balanced"],    use:["cooking","all-purpose"],        cert:"Third-party verified",         harvest:"Nov 2024",     retailer:"Amazon · WFM · Target",           desc:"Single-origin Picual picked at peak maturity for a mellow cooking-suited profile. Squeeze bottle format for easy pouring. Widely available at Whole Foods and Amazon.",                                                                                     profile:"Mellow & Balanced",       journey:["beginner","cook"] },
  { id:16, name:"Graza Drizzle EVOO",                  origin:"Extremadura, Spain",       price:22, tier:"stepup",   flavor:["peppery","fruity"],   use:["finishing","dipping"],          cert:"Third-party verified",         harvest:"Oct 2024",     retailer:"Amazon · WFM · Target",           desc:"Early-harvest Picual from a single farm in Spain, intended for finishing. Higher polyphenol content than Sizzle. Squeeze bottle with precise pour spout. A differentiated two-oil system from the same producer.",                                          profile:"Bold & Peppery",          journey:["enthusiast","cook"] },
  { id:17, name:"Partanna Robust Sicilian EVOO",       origin:"Trapani, Sicily",          price:25, tier:"stepup",   flavor:["buttery","mild"],     use:["finishing","dipping","cooking"],cert:"Third-party verified",         harvest:"Oct 2024",     retailer:"Amazon · partannafoods.com",      desc:"100% Castelvetrano monocultivar from Trapani, family-produced for over 100 years. Hand-picked and cold-pressed within 4 hours. Distinctive buttery profile — a good entry point into Castelvetrano character.",                                           profile:"Buttery & Mellow",        journey:["enthusiast","cook"] },
  { id:18, name:"Gaea Fresh Greek EVOO",               origin:"Peloponnese, Greece",      price:20, tier:"stepup",   flavor:["grassy","peppery"],   use:["finishing","salads"],           cert:"Non-GMO verified",             harvest:"Nov 2024",     retailer:"Amazon · WFM",                    desc:"Ancient Olympia variety from the historic Peloponnese. Declared polyphenol content of 350 mg/kg. Green and grassy character with a peppery finish. Widely available on Amazon and at specialty food retailers.",                                            profile:"Vibrant & Grassy",        journey:["enthusiast","cook"] },
  { id:19, name:"Iliada Kalamata PDO EVOO",            origin:"Kalamata, Greece",         price:24, tier:"stepup",   flavor:["fruity","peppery"],   use:["finishing","dipping"],          cert:"PDO Kalamata",                 harvest:"Nov 2024",     retailer:"Amazon · WFM",                    desc:"Monocultivar Koroneiki from the Kalamata PDO zone, Messinia. Full EU PDO geographic traceability guarantee. Consistently wins international competition medals. Available in bag-in-box format on Amazon.",                                                  profile:"Fruity & Complex",        journey:["enthusiast","cook"] },
  { id:20, name:"Colavita Premium Italian EVOO",       origin:"Italy, blend",             price:16, tier:"stepup",   flavor:["mild","balanced"],    use:["cooking","dressing"],           cert:"Third-party verified",         harvest:"Nov 2024",     retailer:"Walmart · Amazon · WFM",          desc:"Four-generation Italian family brand with consistent quality. Mild flavor and reliable grade. Widely available across Walmart, Amazon, and Whole Foods. Best suited for cooking and dressings.",                                                             profile:"Mild & Reliable",         journey:["beginner","cook"] },
  { id:21, name:"365 Mediterranean EVOO",              origin:"Mediterranean blend",      price:15, tier:"stepup",   flavor:["mild","balanced"],    use:["cooking","dressing"],           cert:"Non-GMO + OOCC",               harvest:"Nov/Dec 2024", retailer:"Whole Foods · Amazon",            desc:"Whole Foods larger-format Mediterranean blend. Non-GMO certified and independently verified. Harvest date on label. Reliable for everyday cooking and vinaigrettes.",                                                                                        profile:"Balanced & Clean",        journey:["beginner","cook"] },
  { id:22, name:"Desert Miracle Moroccan EVOO",        origin:"Morocco",                  price:24, tier:"stepup",   flavor:["fruity","robust"],    use:["finishing","dipping"],          cert:"USDA Organic",                 harvest:"Nov 2024",     retailer:"Amazon",                          desc:"Single-origin Moroccan EVOO, cold-pressed, certified organic. Morocco has developed a consistent producing track record with favorable growing conditions. Polyphenol-rich. Sold on Amazon.",                                                                 profile:"Rich & Robust",           journey:["enthusiast"] },
  { id:23, name:"Corto Truly EVOO",                   origin:"California, USA",           price:19, tier:"stepup",   flavor:["grassy","fruity"],    use:["cooking","finishing"],          cert:"COOC Certified",               harvest:"Nov 2024",     retailer:"Amazon · Costco",                 desc:"California single-origin in Corto's proprietary oxygen-free, light-free FlavorLock packaging. COOC-certified. The packaging is designed to preserve polyphenol content between bottling and the consumer's table.",                                          profile:"Fresh & Grassy",          journey:["enthusiast","cook"] },
  { id:24, name:"Cobram Estate Robust California",     origin:"California, USA",          price:18, tier:"stepup",   flavor:["peppery","grassy"],   use:["finishing","cooking"],          cert:"COOC Certified",               harvest:"Nov 2024",     retailer:"Amazon · WFM",                    desc:"Cobram's more assertive California expression. Earlier harvest timing delivers higher polyphenol content and a bolder, peppery profile compared to their Classic. COOC certified, harvest date on label.",                                                    profile:"Bold & Grassy",           journey:["cook","enthusiast"] },
  // ── SPECIAL ───────────────────────────────────────────────────────────────
  { id:25, name:"Brightland ALIVE",                   origin:"California, USA",           price:37, tier:"special",  flavor:["fruity","bright"],    use:["finishing","gifting"],          cert:"CCOF Organic",                 harvest:"Oct 2024",     retailer:"brightland.co · WFM · Amazon",    desc:"Single estate, early harvest, pressed the same day as picking. High polyphenol content. Designed for finishing. One of the most visible premium California brands.",                                                                                        profile:"Vibrant & Complex",       journey:["enthusiast"] },
  { id:26, name:"Kosterina Original EVOO",            origin:"Laconia, Greece",           price:34, tier:"special",  flavor:["peppery","robust"],   use:["finishing","dipping"],          cert:"PDO Laconia",                  harvest:"Nov 2024",     retailer:"kosterina.com · Amazon · WFM",    desc:"Early-harvest Koroneiki from the Laconia PDO region. High polyphenol content, robust and peppery.",                                                                                                                                                         profile:"Bold & Robust",           journey:["enthusiast","cook"] },
  { id:27, name:"PJ Kabos Family Reserve Organic",    origin:"Peloponnese, Greece",       price:35, tier:"special",  flavor:["peppery","robust"],   use:["finishing","dipping"],          cert:"USDA Organic + NYIOOC Gold 2025",harvest:"Oct/Nov 2024",retailer:"Amazon",                          desc:"High-phenolic Greek EVOO with documented polyphenol content above 500 mg/kg. USDA Organic and NYIOOC Gold Award winner 2025. Intense and peppery — for those specifically seeking high polyphenol content with certification backing.",                       profile:"Intense & High-Phenolic", journey:["enthusiast"] },
  { id:28, name:"Atlas Organic Moroccan EVOO",        origin:"Atlas Mountains, Morocco",  price:32, tier:"special",  flavor:["fruity","bright"],    use:["finishing","gifting"],          cert:"USDA Organic",                 harvest:"Nov 2024",     retailer:"Amazon",                          desc:"Single family farm in the Atlas Mountains. Unprocessed, newly harvested, certified organic. Moroccan producers have attracted recognition for competitive polyphenol content relative to price point.",                                                       profile:"Bright & Fruity",         journey:["enthusiast"] },
  { id:29, name:"Frankies 457 Castelvetrano Organic", origin:"Sicily, Italy",             price:38, tier:"special",  flavor:["buttery","fruity"],   use:["finishing","gifting"],          cert:"USDA Organic",                 harvest:"Oct 2024",     retailer:"Amazon · WFM · frankies457.com",  desc:"Organic Castelvetrano monocultivar from Sicily, from the producer behind the acclaimed Brooklyn restaurant. Early harvest, first cold press. Mild and buttery despite early-harvest status — characteristic of the Castelvetrano variety.",                profile:"Buttery & Complex",       journey:["enthusiast"] },
  { id:30, name:"Montinaro Coratina EVOO",            origin:"Puglia, Italy",             price:30, tier:"special",  flavor:["peppery","robust"],   use:["finishing","dipping"],          cert:"Third-party verified",         harvest:"Oct 2024",     retailer:"Amazon",                          desc:"Coratina monocultivar from Puglia — one of the highest-polyphenol cultivars in the world. Intense, peppery, assertive character. Cold-pressed in tin. For those seeking cultivar-forward intensity and high oleocanthal content.",                           profile:"Bold & Intense",          journey:["enthusiast"] },
];

const QUIZ = [
  { id:"q1", question:"How do you primarily use olive oil at home?", options:[
    { label:"For cooking — sautéing, roasting, everyday use", value:"cooking" },
    { label:"For salads, dressings, and cold dishes", value:"dressing" },
    { label:"As a finishing oil — drizzled at the table", value:"finishing" },
    { label:"I'm still figuring that out", value:"all-purpose" },
  ]},
  { id:"q2", question:"What flavor direction do you prefer in olive oil?", options:[
    { label:"Mild and soft — I want it to support the dish", value:"mild" },
    { label:"Fresh and grassy — I like the taste of the oil itself", value:"fruity" },
    { label:"Bold and peppery — I want to notice it", value:"peppery" },
    { label:"I haven't formed a strong preference yet", value:"balanced" },
  ]},
  { id:"q3", question:"What's a realistic budget per bottle for you?", options:[
    { label:"Under $15 — practical everyday quality", value:"everyday" },
    { label:"$15–$30 — I'll pay more for something better", value:"stepup" },
    { label:"$30+ — I want the best option available", value:"special" },
    { label:"Show me the full range", value:"all" },
  ]},
];

const PROFILES = {
  beginner:   { label:"Good Food Curious",    icon:"🌱", color:"#2D7A1F", bg:"rgba(45,122,31,0.08)",    desc:"Starting to pay attention to what you're buying. You want something honest and better than what you've been using, without overcomplicating it.", mission:"One practical step: find a bottle with a harvest date on the label and compare it to what you use now." },
  cook:       { label:"Good Food Cook",       icon:"🍽️", color:GOLD,       bg:GOLD_BG,                  desc:"You cook with intention and want your ingredients to match. You're ready to understand what makes one oil different from another.", mission:"One practical step: use two different oils on the same dish in the same week and compare the result." },
  enthusiast: { label:"Good Food Ambassador", icon:"🫙", color:"#6D3DB5",  bg:"rgba(109,61,181,0.08)", desc:"You want to understand the full picture — production, cultivar, certification, polyphenols. You're willing to go deep.", mission:"One practical step: look up the producer behind your next bottle and find out what certification they carry and why." },
};

const MYTHS = [
  { myth: '"First cold press" is a meaningful quality indicator', truth: '"First cold press," "cold press," and "cold extracted" describe the same process — mechanical extraction without heat. The terms are interchangeable in modern production and are required for all genuine extra virgin olive oil. The phrase has historical origins in older pressing methods but conveys no quality distinction today.', icon: "🌡️" },
  { myth: 'Multi-country or multi-region blends are lower quality', truth: 'Blending oils from different origins, regions, or countries is standard industry practice and produces many consistent, well-regarded EVOOs. What determines grade is whether each component oil meets extra virgin standards — not how many origins it includes.', icon: "🗺️" },
  { myth: '"Pure" or "light" olive oil is a marketing term for EVOO', truth: '"Pure olive oil" and "light olive oil" are legal product categories that include refined olive oil. They have different sensory profiles and different nutritional characteristics than extra virgin. Correctly labeled, they are not fraudulent — they are simply a different product.', icon: "⚠️" },
  { myth: 'Price alone indicates quality', truth: 'Price reflects production costs, marketing, and branding — not quality alone. Efficient large-scale production can yield genuine extra virgin olive oil at low prices. Premium pricing does not guarantee quality. Certifications from COOC, PDO/PGI bodies, or AOCA are more reliable quality indicators than price.', icon: "💰" },
  { myth: '"80% of olive oil is fake" is an established fact', truth: 'This figure circulated widely following investigative journalism in the early 2010s. The most comprehensive subsequent US market test — a 2024 study covering the top 15 brands representing 85% of US market volume — found zero adulteration in any top-15 brand or store brand. Adulteration exists but is not characteristic of the mainstream market.', icon: "%" },
];

const ACADEMY = [
  { id:"origins", icon:"🌍", color:"#2563EB", title:"Where olive oil comes from", hook:"A short history, the major producing countries, and who consumes it.", sections:[
    { h:"A brief history", b:"Olive cultivation began in the eastern Mediterranean — archaeological and genetic evidence places domestication approximately 6,000–7,000 years ago in the Levant. From there it spread across the Mediterranean basin, carried by Phoenician and Greek traders. The Romans integrated olive oil into daily life: food, medicine, cosmetics, lamp fuel, and trade currency. Spanish missionaries brought olive trees to California in the 18th century. The modern California premium EVOO industry dates from roughly the 1980s." },
    { h:"Major producing countries", b:"Spain is the world's largest producer, contributing approximately 40–50% of global output in a typical year. Italy and Greece each produce around 10–15% of global supply in normal years. Tunisia, Morocco, Turkey, Portugal, and Argentina are also significant producers. Production volumes fluctuate considerably year to year with weather — the 2022–2024 period saw historically reduced harvests across southern Europe due to drought and heat." },
    { h:"Where it's consumed", b:"The European Union is the largest consuming region overall. The United States is the second-largest single-country consumer, importing most of what it uses. Brazil, Australia, and Japan are significant non-Mediterranean markets with growing consumption. Per capita consumption in the US remains well below European levels." },
  ]},
  { id:"farming", icon:"🌿", color:"#16A34A", title:"How olive oil is farmed", hook:"Three main production systems, each with different trade-offs.", sections:[
    { h:"Traditional (50–200 trees/ha)", b:"The oldest form of olive cultivation. Trees are often centuries old, grown on hillsides and terraces, harvested manually. Yields are low — typically 2–4 tons of olives per hectare — but these groves support biodiversity and sequester significant carbon. Oils from traditional systems can express considerable complexity.", tag:"Yield: low · Quality potential: high · Labor: high · Footprint: generally low" },
    { h:"Intensive (200–500 trees/ha)", b:"The most common system in quality EVOO production globally. Trees are planted in rows to allow mechanized harvesting. Yields are significantly higher than traditional systems, and quality can be very good. Most PDO and PGI-designated oils are produced in intensive systems.", tag:"Yield: medium-high · Quality potential: high · Labor: medium · Footprint: moderate" },
    { h:"Super-intensive / hedgerow (1,000–2,000+ trees/ha)", b:"Developed primarily in Spain. Trees are planted in dense rows and harvested by straddle machines. Produces genuine extra virgin olive oil. Some research indicates lower polyphenol levels compared to less dense systems. It is an efficient production model for accessible pricing.", tag:"Yield: high · Quality potential: medium-high · Labor: low · Footprint: higher water use" },
  ]},
  { id:"cultivars", icon:"🫒", color:"#15803D", title:"Cultivars, blends, and grades", hook:"What olive varieties are, how blending works, and what the grades actually mean.", sections:[
    { h:"What a cultivar is", b:"A cultivar (cultivated variety) is a specific named olive variety, selected and propagated for defined characteristics: oil yield, flavor profile, polyphenol content, ripening time. Hundreds of cultivars exist. Cultivar is a significant determinant of oil flavor and chemistry, sometimes more so than geographic origin." },
    { h:"The most widely cultivated varieties", b:"Arbequina (Catalonia, Spain): mild, buttery, low bitterness. Picual (Jaén, Spain): the most widely planted cultivar in the world; robust, high polyphenols. Koroneiki (Greece): small berry, high polyphenols, peppery when fresh. Frantoio (Tuscany): fruity and balanced. Coratina (Puglia): among the highest polyphenol levels of any cultivar. Taggiasca (Liguria): mild, sweet, very low bitterness." },
    { h:"Mono-cultivar oils and blends", b:"A mono-cultivar oil is produced from a single variety and expresses that variety's characteristics directly. A blend combines two or more cultivars — to achieve balance, complexity, or consistency. Both approaches produce excellent oils. Many of the world's most respected EVOOs are blends." },
    { h:"Grades", b:"'Olive oil' and 'pure olive oil' are legal grades that include refined olive oil — different products with milder flavor profiles and different polyphenol levels. These grades are not fraudulent when correctly labeled; they are simply distinct product categories." },
  ]},
  { id:"quality", icon:"🔬", color:"#D97706", title:"How quality is measured", hook:"The international standard body, the sensory panel test, and the key chemical parameters.", sections:[
    { h:"The IOC (International Olive Council)", b:"The IOC — Consejo Oleícola Internacional — is an intergovernmental organization based in Madrid. It is the primary international authority setting the chemical and sensory parameters that define each grade of olive oil. The EU formally adopts IOC standards. The US has USDA standards broadly aligned with IOC parameters but voluntary, not mandatory." },
    { h:"The sensory panel test", b:"The IOC panel test requires a panel of 8–12 trained evaluators to assess oil samples blind. They score three positive attributes — fruitiness, bitterness, and pungency — and any defects present. For extra virgin classification, the median defect score must be zero and median fruitiness must be greater than zero." },
    { h:"Free fatty acids and peroxide value", b:"Free fatty acid content (FFA), expressed as oleic acid percentage, is the primary chemical marker for EVOO grade. The maximum is 0.8%; premium oils typically measure 0.1–0.3%. FFA reflects olive condition at harvest and processing speed. Peroxide value (PV) measures early oxidation; the EVOO maximum is 20 meq O₂/kg." },
    { h:"What freshness means technically", b:"In olive oil, freshness refers to: low FFA, low peroxide value, high polyphenol content, and intact sensory attributes. These are a direct function of harvest timing, time from harvest to mill, milling temperature, and storage conditions. A harvest date on the label is the most accessible freshness proxy available to a consumer." },
  ]},
  { id:"certs", icon:"🏆", color:GOLD, title:"Certifications explained", hook:"What the main certifications require, and what they don't cover.", sections:[
    { h:"PDO — Protected Designation of Origin", b:"The highest European geographic protection. Every stage of production must occur within a defined region, and the product must meet chemical and sensory standards verified by an independent body. Examples: Kalamata PDO (Greece), Siurana PDO (Spain), various DOP designations in Italy. PDO does not guarantee the highest quality available; it guarantees traceability and compliance with defined standards." },
    { h:"PGI — Protected Geographical Indication", b:"One level below PDO in geographic specificity: at least one stage of production must occur in the defined area. The oil must still meet verified quality and origin standards. Many well-regarded Italian and Spanish oils carry PGI rather than PDO status." },
    { h:"COOC — California Olive Oil Council", b:"The most rigorous olive oil certification in the US. Involves both chemical testing and sensory panel evaluation aligned with IOC standards, applied voluntarily by California producers. The COOC seal indicates the oil was independently tested, not just self-declared." },
    { h:"AOCA — Australian Olive Oil Association", b:"Australia's equivalent certification body. AOCA-certified oils are independently tested for grade and quality." },
    { h:"USDA Organic", b:"Certifies that olives were grown without synthetic pesticides or fertilizers. It does not assess olive oil grade, freshness, or polyphenol content. An organically certified oil can still be of any quality grade." },
    { h:"PDO and PGI designations: selected examples", b:"Italy (DOP/IGP): Toscano IGP · Sabina DOP · Riviera Ligure DOP · Garda DOP · Terra di Bari DOP · Terre di Siena DOP · Colline Salernitane DOP · Valle del Belice DOP · Monti Iblei DOP · Canino DOP · Dauno DOP · Bruzio DOP. Spain (DOP): Siurana · Priego de Córdoba · Baena · Les Garrigues · Estepa · Sierra de Cádiz · Monterrubio · Antequera · Campo de Montiel · Montes de Toledo. Greece (PDO): Kalamata · Sitia Lasithiou Kritis · Messara · Kolymvari Chanion Kritis · Lakonia · Zakynthos · Lesvos · Kefalonia · Rhodopi. Portugal (DOP): Trás-os-Montes · Alentejo Interior · Moura · Beira Interior · Ribatejo. Slovenia (PDO): Kras · Istra." },
  ]},
  { id:"harvest", icon:"📅", color:"#C2600A", title:"Harvest seasons", hook:"When olives are picked in each hemisphere, and how to read cross-year harvest dates.", sections:[
    { h:"Northern hemisphere: October through February", b:"The Mediterranean harvest runs from October through February, varying by country and cultivar. Spain's main campaign typically peaks in November–December, with some regions extending into January. Italy varies by region: Tuscany often harvests from October to November; Puglia and Sicily can extend into January or February. Early-harvest production — called raccolta anticipata — begins in September or early October, before full ripeness, and produces high-polyphenol, intensely green oils. Greece harvests mainly November through January, with Koroneiki — a late-ripening variety — sometimes pressed through February. Tunisia and Morocco follow an October–January window. Turkey harvests October–December." },
    { h:"Southern hemisphere: April through June", b:"Australia, Argentina, Chile, and South Africa harvest in their autumn: April through June, with May the peak month across most producing regions. Counter-seasonal production means Australian and South American oils can reach northern hemisphere retailers fresher relative to their bottling date than Mediterranean oils of the same calendar year — a practical advantage when buying in northern summer or early autumn." },
    { h:"Reading cross-year harvest dates", b:"A harvest labeled '2024/25' or 'Campaign 2024–2025' means picking began in autumn 2024 and concluded in early 2025. This is standard notation in Spain, Italy, and Greece, where a single harvest campaign can span October through February and cross a calendar year boundary. It refers to one continuous campaign, not two separate harvests. When a label shows only a single year — 'Harvest 2024' — it typically refers to the year in which the campaign began." },
    { h:"Why harvest timing affects flavor and polyphenols", b:"Earlier in the harvest window, olives are less ripe: polyphenol content is higher, flavors are greener and more assertive, and the characteristic throat-catch from oleocanthal is more pronounced. As the season advances and olives ripen further, polyphenol levels fall naturally, flavors become rounder and softer, and bitterness and pungency decrease. Neither profile is inherently superior — they reflect different points on the same spectrum, and both can be high-quality extra virgin." },
  ]},
  { id:"science", icon:"🧬", color:"#9333EA", title:"The science", hook:"Polyphenols, pesticide limits, and shelf life — what the data says.", sections:[
    { h:"Polyphenols in olive oil", b:"Polyphenols are naturally occurring compounds in olive oil, most notably oleocanthal, oleuropein, hydroxytyrosol, and tyrosol. Oleocanthal is responsible for the throat-catch sensation in fresh high-polyphenol oils; studies have documented anti-inflammatory properties, though clinical significance at typical dietary doses is still an active research area. The EU authorizes a specific health claim for oils containing at least 250mg/kg of hydroxytyrosol and its derivatives." },
    { h:"Why polyphenol content at consumption is uncertain", b:"Polyphenols degrade with exposure to light, heat, and oxygen over time. Published polyphenol figures on labels reflect measurement at time of analysis, which may be months before the oil reaches a consumer. There is no US regulatory requirement for polyphenol content on labels, and no standardized requirement for when measurement must be taken." },
    { h:"Pesticide residue limits: EU and US", b:"Both the EU and US set Maximum Residue Limits (MRLs) for pesticide compounds in olive oil. EU MRLs cover a larger number of compounds and are set at lower levels for many substances than US federal standards. USDA Organic certification prohibits synthetic pesticides. The vast majority of commercially available olive oil from established producers tests within legal limits in its jurisdiction of sale." },
    { h:"Shelf life and storage", b:"Shelf life is counted from the bottling date, not the harvest. The maximum for extra virgin olive oil is 18 months from bottling under proper conditions. Because bottling typically follows harvest by weeks to several months, an oil bottled four months after harvest already has a reduced remaining shelf life when it first arrives at retail. Not all oil is bottled immediately at harvest: bulk oil is routinely stored in stainless steel tanks at controlled temperature — stable and cool, with low oxygen exposure, often under inert gas — and bottled on demand throughout the season. Most producers manage inventory to empty tanks before the following harvest cycle, so that oil from two campaigns is not mixed. The same degradation factors apply in tank storage as in bottles: oxygen, heat, and light. Dark glass and tin offer better protection than clear glass or plastic. Once opened, consume within 30–60 days for best sensory quality. Refrigeration is not necessary and not harmful — temporary cloudiness at low temperatures clears at room temperature." },
  ]},
];

// Skyline / bottle SVG
const GND = 138;
function rectBuilding(cx, h, w) {
  const l = cx - w / 2, r = cx + w / 2, top = GND - h;
  return `M${l},${GND} L${l},${top} L${r},${top} L${r},${GND} Z`;
}
function waterTower(cx, h, w) {
  const l = cx - w / 2, r = cx + w / 2;
  const bTop = GND - h * 0.80;
  const tl = cx - w * 0.18, tr = cx + w * 0.18;
  const tTop = GND - h;
  return `M${l},${GND} L${l},${bTop} L${tl},${bTop} L${tl},${tTop} L${tr},${tTop} L${tr},${bTop} L${r},${bTop} L${r},${GND} Z`;
}
function artDeco(cx, h, w) {
  const s1 = GND - h * 0.44, s2 = GND - h * 0.76, top = GND - h;
  const hw1 = w / 2, hw2 = w * 0.35, hw3 = w * 0.20;
  return `M${cx-hw1},${GND} L${cx-hw1},${s1} L${cx-hw2},${s1} L${cx-hw2},${s2} L${cx-hw3},${s2} L${cx-hw3},${top} L${cx+hw3},${top} L${cx+hw3},${s2} L${cx+hw2},${s2} L${cx+hw2},${s1} L${cx+hw1},${s1} L${cx+hw1},${GND} Z`;
}
function glassPath(cx, h, w) {
  const bh=h*0.62,sh=h*0.11,nh=h*0.17,ch=h*0.10,nw=w*0.38,capW=w*0.56;
  const l=cx-w/2,r=cx+w/2,nl=cx-nw/2,nr=cx+nw/2,cl=cx-capW/2,cr=cx+capW/2;
  const bodyTop=GND-bh,shoulderTop=bodyTop-sh,neckTop=shoulderTop-nh,capTop=neckTop-ch;
  return `M${l},${GND} L${l},${bodyTop} L${nl},${shoulderTop} L${nl},${neckTop} L${cl},${neckTop} L${cl},${capTop} L${cr},${capTop} L${cr},${neckTop} L${nr},${neckTop} L${nr},${shoulderTop} L${r},${bodyTop} L${r},${GND} Z`;
}
function slimPath(cx, h, w) {
  const bh=h*0.50,sh=h*0.05,nh=h*0.30,ch=h*0.15,nw=w*0.58,capW=w*0.80;
  const l=cx-w/2,r=cx+w/2,nl=cx-nw/2,nr=cx+nw/2,cl=cx-capW/2,cr=cx+capW/2;
  const bodyTop=GND-bh,shoulderTop=bodyTop-sh,neckTop=shoulderTop-nh,capTop=neckTop-ch;
  return `M${l},${GND} L${l},${bodyTop} L${nl},${shoulderTop} L${nl},${neckTop} L${cl},${neckTop} L${cl},${capTop} L${cr},${capTop} L${cr},${neckTop} L${nr},${neckTop} L${nr},${shoulderTop} L${r},${bodyTop} L${r},${GND} Z`;
}
function jugPath(cx, h, w) {
  const bh=h*0.76,nh=h*0.14,ch=h*0.10,nw=w*0.52,capW=w*0.66;
  const l=cx-w/2,r=cx+w/2,nl=cx-nw/2,nr=cx+nw/2,cl=cx-capW/2,cr=cx+capW/2;
  const bodyTop=GND-bh,neckTop=bodyTop-nh,capTop=neckTop-ch;
  return `M${l},${GND} L${l},${bodyTop} L${nl},${bodyTop-5} L${nl},${neckTop} L${cl},${neckTop} L${cl},${capTop} L${cr},${capTop} L${cr},${neckTop} L${nr},${neckTop} L${nr},${bodyTop-5} L${r},${bodyTop} L${r},${GND} Z`;
}
function squeezePath(cx, h, w) {
  const bodyH=h*0.73,spoutH=h*0.27,spoutW=w*0.20;
  const l=cx-w/2,r=cx+w/2,sl=cx-spoutW/2,sr=cx+spoutW/2;
  const bodyTop=GND-bodyH,spoutTop=bodyTop-spoutH;
  return `M${l},${GND} L${l},${bodyTop} L${sl},${spoutTop} L${sr},${spoutTop} L${r},${bodyTop} L${r},${GND} Z`;
}
function getElPath(el) {
  if (el.t==='rect')       return rectBuilding(el.cx,el.h,el.w);
  if (el.t==='watertower') return waterTower(el.cx,el.h,el.w);
  if (el.t==='artdeco')    return artDeco(el.cx,el.h,el.w);
  if (el.t==='glass')      return glassPath(el.cx,el.h,el.w);
  if (el.t==='slim')       return slimPath(el.cx,el.h,el.w);
  if (el.t==='jug')        return jugPath(el.cx,el.h,el.w);
  if (el.t==='squeeze')    return squeezePath(el.cx,el.h,el.w);
  return rectBuilding(el.cx,el.h,el.w);
}
const SKYLINE = [
  {t:'rect',cx:22,h:44,w:20},{t:'jug',cx:52,h:56,w:24},{t:'rect',cx:78,h:62,w:18},
  {t:'slim',cx:100,h:80,w:11},{t:'watertower',cx:128,h:58,w:22},{t:'glass',cx:157,h:96,w:14},
  {t:'artdeco',cx:191,h:120,w:30},{t:'slim',cx:226,h:84,w:11},{t:'rect',cx:250,h:68,w:20},
  {t:'squeeze',cx:277,h:78,w:14},{t:'watertower',cx:307,h:56,w:22},{t:'glass',cx:334,h:70,w:13},
  {t:'artdeco',cx:362,h:60,w:24},{t:'jug',cx:396,h:52,w:22},{t:'slim',cx:421,h:64,w:11},
];

function SkylineLogo({ color, width, maxWidth }) {
  const c = color || INK, w = width || "100%", mw = maxWidth || 440;
  return (
    <svg viewBox="0 0 440 155" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: w, maxWidth: mw }}>
      <line x1="0" y1={GND} x2="440" y2={GND} stroke={c} strokeWidth="1.3" strokeLinecap="round" />
      {SKYLINE.map((el, i) => (
        <path key={i} d={getElPath(el)} stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  );
}

function Pill({ children, color, bg, border }) {
  return (
    <span style={{ background:bg||GOLD_BG, color:color||GOLD, fontSize:11, fontWeight:500, padding:"2px 9px", borderRadius:20, border:border||"none" }}>
      {children}
    </span>
  );
}

function OilCard({ oil, highlight }) {
  const t = TIERS[oil.tier];
  return (
    <div style={{ background:highlight?"rgba(184,120,8,0.05)":SURFACE, border:highlight?`1.5px solid ${GOLD_DIM}`:`0.5px solid ${BORDER}`, borderRadius:14, padding:"16px", display:"flex", flexDirection:"column", gap:8 }}>
      {highlight && <Pill>Matched to your preferences</Pill>}
      <div style={{ display:"flex", justifyContent:"space-between", gap:8 }}>
        <p style={{ margin:0, fontWeight:500, fontSize:15, color:TEXT }}>{oil.name}</p>
        <span style={{ fontWeight:600, fontSize:14, color:GOLD, whiteSpace:"nowrap" }}>${oil.price}</span>
      </div>
      <p style={{ margin:0, fontSize:12, color:MUTED }}>{oil.origin} · {oil.profile}</p>
      <p style={{ margin:0, fontSize:13, color:SOFT, lineHeight:1.7 }}>{oil.desc}</p>
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginTop:4 }}>
        <Pill color={t.color} bg={t.bg}>{t.label}</Pill>
        <Pill color={MUTED} bg="transparent" border={`0.5px solid ${BORDER}`}>{oil.cert}</Pill>
        <Pill color={MUTED} bg="transparent" border={`0.5px solid ${BORDER}`}>Harvest {oil.harvest}</Pill>
        {oil.retailer && <Pill color="#2563EB" bg="rgba(37,99,235,0.07)" border="none">🛒 {oil.retailer}</Pill>}
      </div>
    </div>
  );
}

function HomePage({ onNav }) {
  return (
    <div style={{ maxWidth:640, margin:"0 auto", padding:"2.5rem 1.2rem" }}>
      <div style={{ textAlign:"center", marginBottom:"2.5rem" }}>
        <div style={{ marginBottom:"1.5rem" }}><SkylineLogo /></div>
        <p style={{ fontSize:36, margin:"0 0 10px", color:TEXT, fontWeight:700, letterSpacing:"-0.8px", lineHeight:1.1 }}>The Crush</p>
        <p style={{ fontSize:14, color:MUTED, margin:"0 0 10px", lineHeight:1.7 }}>Fall for olive oil. Find the one that's yours.</p>
        <p style={{ fontSize:13, color:GOLD, margin:0, fontWeight:500, lineHeight:1.7 }}>Most people have never tasted real olive oil.<br />This is where that changes.</p>
      </div>
      <button onClick={() => onNav("quiz")} style={{ display:"block", width:"100%", background:INK, border:"none", borderRadius:12, padding:"15px", cursor:"pointer", fontSize:15, color:"#FAF8F3", fontWeight:600, marginBottom:"1.5rem" }}>
        Find your oil →
      </button>
      <div style={{ background:SURFACE, border:`0.5px solid ${BORDER}`, borderRadius:14, padding:"20px", marginBottom:"1.5rem" }}>
        <p style={{ margin:"0 0 14px", fontSize:11, color:MUTED, letterSpacing:"0.09em", textTransform:"uppercase" }}>Three things worth knowing before you buy</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
          {[
            { n:"01", l:"Harvest date", s:"Tells you how fresh the oil is. Best-before dates tell you less." },
            { n:"02", l:"Sensory grade", s:"Extra virgin is a verified standard, not a marketing phrase." },
            { n:"03", l:"Certification", s:"PDO, PGI, COOC, and AOCA involve independent testing." },
          ].map(item => (
            <div key={item.n}>
              <p style={{ margin:"0 0 4px", fontSize:20, fontWeight:700, color:GOLD, opacity:0.25 }}>{item.n}</p>
              <p style={{ margin:"0 0 3px", fontSize:13, fontWeight:600, color:TEXT }}>{item.l}</p>
              <p style={{ margin:0, fontSize:11, color:MUTED, lineHeight:1.5 }}>{item.s}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:10, marginBottom:"1.5rem" }}>
        {[
          { icon:"🔬", l:"Taste Lab",   s:"Seven sessions on sensory evaluation", nav:"lab" },
          { icon:"📋", l:"The Guide",   s:"Labels, certifications, and common myths", nav:"guide" },
          { icon:"📚", l:"The Academy", s:"The science and history behind the category", nav:"academy" },
        ].map(item => (
          <button key={item.nav} onClick={() => onNav(item.nav)} style={{ background:SURFACE, border:`0.5px solid ${BORDER}`, borderRadius:12, padding:"18px 14px", cursor:"pointer", textAlign:"left", display:"flex", flexDirection:"column", gap:8 }}>
            <span style={{ fontSize:20 }}>{item.icon}</span>
            <div>
              <p style={{ margin:"0 0 2px", fontSize:13, fontWeight:500, color:TEXT }}>{item.l}</p>
              <p style={{ margin:0, fontSize:11, color:MUTED }}>{item.s}</p>
            </div>
          </button>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
        {Object.entries(TIERS).map(([k,t]) => (
          <div key={k} onClick={() => onNav("oils")} style={{ background:t.bg, border:`0.5px solid ${t.color}22`, borderRadius:10, padding:"14px 12px", cursor:"pointer" }}>
            <p style={{ margin:"0 0 2px", fontWeight:600, fontSize:13, color:t.color }}>{t.label}</p>
            <p style={{ margin:"0 0 4px", fontSize:11, color:t.color, opacity:0.7 }}>{t.range}</p>
            <p style={{ margin:0, fontSize:11, color:t.color, opacity:0.65, lineHeight:1.4 }}>{t.desc}</p>
          </div>
        ))}
      </div>
      <p style={{ fontSize:11, color:MUTED, textAlign:"center", marginTop:"2rem", opacity:0.5 }}>By The Good Food Ambassador Group LLC</p>
    </div>
  );
}

function LabPage() {
  const [day, setDay] = useState(0);
  const days = [
    { title:"The three positive attributes", icon:"📋", body:"The IOC panel test evaluates three positive sensory attributes in extra virgin olive oil: fruitiness, bitterness, and pungency. These are not subjective preferences — they are defined, measurable attributes that trained evaluators score on a standardized scale. For classification as extra virgin, fruitiness must be detectable and defects must be absent. Understanding these three attributes is the foundation of evaluating any olive oil.", prompt:"Pour a small amount of oil into a glass. Warm it with your hand. Before tasting, just smell it. Write down whatever you detect — even if you can't name it." },
    { title:"Fruitiness — green or ripe", icon:"🌿", body:"Fruitiness covers the aromas derived from the olive fruit itself. It exists on a spectrum from green to ripe. Green fruitiness — typical of earlier harvest — produces notes of fresh-cut grass, artichoke, green tomato, and sometimes bitter almond. Ripe fruitiness — from later harvest — tends toward dried fruit, banana, and sweet almond. Both are valid expressions of the cultivar and harvest timing. Neither is inherently superior.", prompt:"Smell your oil again. Does it lean green and fresh, or warmer and softer? Can you identify a specific note, even approximately?" },
    { title:"Bitterness", icon:"💧", body:"Bitterness is a positive attribute in extra virgin olive oil, scored on a scale from zero to ten by professional evaluators. It originates primarily from oleuropein, a polyphenol abundant in fresh-pressed early-harvest oil and naturally reduced as oil ages. High bitterness in a fresh oil correlates with high polyphenol content. Mild oils — from delicate cultivars like Taggiasca or Arbequina, or from later harvests — are lower in bitterness by nature.", prompt:"Sip a small amount of oil and hold it on your tongue for a few seconds. Note any bitterness. Rate it: absent, mild, moderate, or strong." },
    { title:"Pungency", icon:"🔥", body:"Pungency is the peppery, stinging sensation at the back of the throat after swallowing. It is caused primarily by oleocanthal, a phenolic compound that has been studied for anti-inflammatory properties. Pungency is a positive attribute measured in professional evaluation. High pungency correlates with high oleocanthal content and is characteristic of early-harvest oils from high-polyphenol cultivars such as Picual, Coratina, and Koroneiki. It decreases as oil ages.", prompt:"Swallow a small sip of oil. Do you feel a stinging or peppery sensation at the back of your throat? Note its intensity." },
    { title:"What the label is required to say", icon:"📄", body:"In the EU, mandatory label information includes: olive oil grade, net quantity, lot number, country of origin, and best-before date. Harvest date is not mandatory in the EU or the US — it is provided voluntarily by producers who want to communicate freshness. In the US, USDA voluntary standards apply and labeling requirements are less extensive than in the EU. Certifications such as PDO, PGI, and COOC are always voluntary.", prompt:"Look at the label of your current olive oil. What is present? What is absent? Is there a harvest date?" },
    { title:"Recognizing defects", icon:"⚠️", body:"The IOC defines several sensory defects in olive oil. Rancid: an oxidized, waxy smell from oil exposed to oxygen over time — the most common defect in aged or poorly stored oil. Fusty or muddy: a fermented smell from olives stored too long before pressing. Musty or earthy: suggests damp storage conditions. Winey or vinegary: acetic acid notes from fermentation. An oil with any detectable defect cannot be classified as extra virgin.", prompt:"If you have more than one olive oil at home, compare them by smell. Do any have off-notes that you can now name?" },
    { title:"Putting it together", icon:"⭐", body:"The professional tasting sequence: pour approximately 15ml into a small glass, warm to around 28°C with your hand, cover and inhale for 30 seconds, sip and hold on the palate before swallowing. Note fruitiness on the nose, bitterness on the palate, pungency at the back of the throat. Check for defects. This is what a COI panel evaluator does. You cannot replicate laboratory conditions at home, but the observational habits are the same.", prompt:"Taste your current oil using this sequence. Write down fruitiness, bitterness, and pungency as absent / low / medium / high." },
  ];
  const d = days[day];
  return (
    <div style={{ maxWidth:640, margin:"0 auto", padding:"2rem 1.2rem" }}>
      <p style={{ fontWeight:700, fontSize:22, margin:"0 0 4px", color:TEXT }}>Taste Lab</p>
      <p style={{ fontSize:13, color:MUTED, margin:"0 0 1.5rem" }}>Seven sessions based on the IOC sensory evaluation method. Each one teaches something you can apply immediately.</p>
      <div style={{ display:"flex", gap:5, marginBottom:"1.5rem", flexWrap:"wrap" }}>
        {days.map((_, i) => (
          <button key={i} onClick={() => setDay(i)} style={{ width:34, height:34, borderRadius:"50%", border:day===i?`1.5px solid ${GOLD}`:`0.5px solid ${BORDER}`, background:day===i?GOLD_BG:SURFACE, cursor:"pointer", fontSize:12, fontWeight:500, color:day===i?GOLD:MUTED }}>
            {i+1}
          </button>
        ))}
      </div>
      <div style={{ background:SURFACE, border:`0.5px solid ${BORDER}`, borderRadius:14, padding:"24px", marginBottom:"1rem" }}>
        <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:16 }}>
          <span style={{ fontSize:24 }}>{d.icon}</span>
          <div>
            <p style={{ margin:"0 0 2px", fontSize:11, color:MUTED, textTransform:"uppercase", letterSpacing:"0.08em" }}>Session {day+1}</p>
            <p style={{ margin:0, fontWeight:700, fontSize:18, color:TEXT }}>{d.title}</p>
          </div>
        </div>
        <p style={{ margin:"0 0 20px", fontSize:14, color:SOFT, lineHeight:1.8 }}>{d.body}</p>
        <div style={{ background:GOLD_BG, border:`0.5px solid ${GOLD_DIM}`, borderRadius:10, padding:"14px" }}>
          <p style={{ margin:"0 0 4px", fontSize:11, color:GOLD, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em" }}>Exercise</p>
          <p style={{ margin:0, fontSize:13, color:TEXT, lineHeight:1.6 }}>{d.prompt}</p>
        </div>
      </div>
      <div style={{ display:"flex", gap:10 }}>
        {day > 0 && (
          <button onClick={() => setDay(day-1)} style={{ flex:1, background:SURFACE, border:`0.5px solid ${BORDER}`, borderRadius:10, padding:"12px", cursor:"pointer", fontSize:13, color:MUTED }}>
            Previous
          </button>
        )}
        {day < days.length-1 && (
          <button onClick={() => setDay(day+1)} style={{ flex:2, background:INK, border:"none", borderRadius:10, padding:"12px", cursor:"pointer", fontSize:13, color:"#FAF8F3", fontWeight:600 }}>
            Next session →
          </button>
        )}
      </div>
    </div>
  );
}

function GuidePage() {
  const [tab, setTab] = useState("label");
  const tips = [
    { icon:"📅", label:"Harvest date",  good:"Harvest date printed on label", bad:"Best-before date only, no harvest date", body:"A harvest date tells you when the olives were pressed. Best-before dates are calculated backward from production and vary by producer — they tell you less about the oil's current condition. Harvest date is voluntary information; producers who include it are communicating transparency about freshness." },
    { icon:"🏆", label:"Certification",  good:"PDO, PGI, COOC, or AOCA certification", bad:"No third-party certification of any kind", body:"PDO and PGI certifications involve independent verification of origin and quality standards. COOC (California) and AOCA (Australia) involve chemical and sensory testing. No certification means the quality grade relies entirely on self-declaration by the producer." },
    { icon:"📍", label:"Origin",         good:"Stated harvest region, or PDO/PGI designation", bad:"No origin information at all", body:"Knowing where olives were grown connects you to the cultivar, climate, and production conditions of that oil. PDO and PGI designations guarantee geographic traceability. Multi-origin and multi-country blends are normal and can produce excellent oils — what matters is that some origin information is provided." },
    { icon:"🫙", label:"Packaging",      good:"Dark glass or tin container", bad:"Clear glass or plastic, stored in light", body:"Light and heat accelerate oxidation in olive oil. Dark glass and tin protect the oil during its shelf life. Clear packaging is not automatically a sign of poor quality, but it requires more careful storage from the producer and retailer." },
    { icon:"🏅", label:"Grade",          good:"Extra virgin — verified by testing", bad:"No grade stated, or grade unclear", body:"Extra virgin is a defined quality grade requiring both chemical parameters (FFA below 0.8%, peroxide value below 20) and a sensory panel evaluation. It is a technical standard, not a marketing phrase. Other grades — virgin, olive oil, pure olive oil — are different products with different characteristics." },
  ];
  return (
    <div style={{ maxWidth:640, margin:"0 auto", padding:"2rem 1.2rem" }}>
      <p style={{ fontWeight:700, fontSize:22, margin:"0 0 4px", color:TEXT }}>The Guide</p>
      <p style={{ fontSize:13, color:MUTED, margin:"0 0 1.5rem" }}>What to look for on a label, and five common misconceptions corrected.</p>
      <div style={{ display:"flex", gap:8, marginBottom:"1.5rem" }}>
        {[{id:"label",l:"Label guide"},{id:"myths",l:"Misconceptions"}].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ padding:"7px 18px", borderRadius:20, border:tab===t.id?`1.5px solid ${GOLD}`:`0.5px solid ${BORDER}`, background:tab===t.id?GOLD_BG:SURFACE, cursor:"pointer", fontSize:13, fontWeight:tab===t.id?600:400, color:tab===t.id?GOLD:MUTED }}>
            {t.l}
          </button>
        ))}
      </div>
      {tab==="label" ? (
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {tips.map(t => (
            <div key={t.label} style={{ background:SURFACE, border:`0.5px solid ${BORDER}`, borderRadius:12, padding:"16px" }}>
              <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:8 }}>
                <span style={{ fontSize:18 }}>{t.icon}</span>
                <p style={{ margin:0, fontWeight:600, fontSize:14, color:TEXT }}>{t.label}</p>
              </div>
              <p style={{ margin:"0 0 12px", fontSize:13, color:SOFT, lineHeight:1.7 }}>{t.body}</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                <div style={{ background:"rgba(22,163,74,0.08)", border:"0.5px solid rgba(22,163,74,0.25)", borderRadius:8, padding:"8px 10px" }}>
                  <p style={{ margin:"0 0 3px", fontSize:11, fontWeight:600, color:"#15803D" }}>Useful signal</p>
                  <p style={{ margin:0, fontSize:12, color:"#15803D" }}>{t.good}</p>
                </div>
                <div style={{ background:"rgba(120,80,0,0.07)", border:"0.5px solid rgba(120,80,0,0.18)", borderRadius:8, padding:"8px 10px" }}>
                  <p style={{ margin:"0 0 3px", fontSize:11, fontWeight:600, color:"#7A5000" }}>Less informative</p>
                  <p style={{ margin:0, fontSize:12, color:"#7A5000" }}>{t.bad}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {MYTHS.map((m, i) => (
            <div key={i} style={{ background:SURFACE, border:`0.5px solid ${BORDER}`, borderRadius:12, padding:"16px" }}>
              <p style={{ margin:"0 0 10px", fontSize:13, fontWeight:600, color:TEXT, lineHeight:1.4 }}>"{m.myth}"</p>
              <div style={{ borderLeft:`2px solid ${GOLD_DIM}`, paddingLeft:12 }}>
                <p style={{ margin:"0 0 3px", fontSize:11, color:GOLD, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em" }}>What the data says</p>
                <p style={{ margin:0, fontSize:13, color:SOFT, lineHeight:1.7 }}>{m.truth}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function OilsPage() {
  const [filterTier, setFilterTier] = useState("all");
  const filtered = filterTier==="all" ? OILS : OILS.filter(o => o.tier===filterTier);
  return (
    <div style={{ maxWidth:640, margin:"0 auto", padding:"2rem 1.2rem" }}>
      <p style={{ fontWeight:700, fontSize:22, margin:"0 0 4px", color:TEXT }}>Oils we recommend</p>
      <p style={{ fontSize:13, color:MUTED, margin:"0 0 6px", lineHeight:1.6 }}>Representative examples at each price tier, selected for certification, freshness information, and accessibility in the US market.</p>
      <p style={{ fontSize:11, color:MUTED, margin:"0 0 1.5rem", lineHeight:1.5, fontStyle:"italic" }}>Prices and harvest dates are based on publicly available data and change seasonally. Verify current information on the producer's label or website before purchasing.</p>
      <div style={{ display:"flex", gap:8, marginBottom:"1.5rem", flexWrap:"wrap" }}>
        <button onClick={() => setFilterTier("all")} style={{ padding:"6px 14px", borderRadius:20, border:filterTier==="all"?`1.5px solid ${GOLD}`:`0.5px solid ${BORDER}`, background:filterTier==="all"?GOLD_BG:SURFACE, cursor:"pointer", fontSize:12, fontWeight:filterTier==="all"?600:400, color:filterTier==="all"?GOLD:MUTED }}>All</button>
        {Object.entries(TIERS).map(([k,t]) => (
          <button key={k} onClick={() => setFilterTier(k)} style={{ padding:"6px 14px", borderRadius:20, border:filterTier===k?`1.5px solid ${t.color}`:`0.5px solid ${BORDER}`, background:filterTier===k?t.bg:SURFACE, cursor:"pointer", fontSize:12, fontWeight:filterTier===k?600:400, color:filterTier===k?t.color:MUTED }}>
            {t.label} · {t.range}
          </button>
        ))}
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {filtered.map(oil => <OilCard key={oil.id} oil={oil} />)}
      </div>
    </div>
  );
}

function AcademyPage() {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ maxWidth:640, margin:"0 auto", padding:"2rem 1.2rem" }}>
      <p style={{ fontWeight:700, fontSize:22, margin:"0 0 4px", color:TEXT }}>The Academy</p>
      <p style={{ fontSize:13, color:MUTED, margin:"0 0 1.5rem", lineHeight:1.6 }}>The history, science, and industry context behind extra virgin olive oil.</p>
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {ACADEMY.map(topic => (
          <div key={topic.id} style={{ background:SURFACE, border:open===topic.id?`0.5px solid ${topic.color}55`:`0.5px solid ${BORDER}`, borderRadius:14, overflow:"hidden" }}>
            <button onClick={() => setOpen(open===topic.id?null:topic.id)} style={{ width:"100%", background:"none", border:"none", padding:"16px", cursor:"pointer", display:"flex", gap:14, alignItems:"center", textAlign:"left" }}>
              <div style={{ width:38, height:38, borderRadius:10, background:`${topic.color}12`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <span style={{ fontSize:18 }}>{topic.icon}</span>
              </div>
              <div style={{ flex:1 }}>
                <p style={{ margin:"0 0 2px", fontWeight:600, fontSize:14, color:TEXT }}>{topic.title}</p>
                <p style={{ margin:0, fontSize:12, color:MUTED, lineHeight:1.4 }}>{topic.hook}</p>
              </div>
              <span style={{ fontSize:16, color:MUTED, flexShrink:0 }}>{open===topic.id ? "▲" : "▼"}</span>
            </button>
            {open===topic.id && (
              <div style={{ padding:"0 16px 24px" }}>
                <div style={{ borderTop:`0.5px solid ${BORDER}`, paddingTop:18, display:"flex", flexDirection:"column", gap:18 }}>
                  {topic.sections && topic.sections.map((s,i) => (
                    <div key={i}>
                      <p style={{ margin:"0 0 6px", fontWeight:600, fontSize:13, color:topic.color }}>{s.h}</p>
                      <p style={{ margin:0, fontSize:13, color:SOFT, lineHeight:1.8 }}>{s.b}</p>
                      {s.tag && <p style={{ margin:"8px 0 0", fontSize:11, color:MUTED, background:SURFACE2, borderRadius:8, padding:"7px 11px", lineHeight:1.5 }}>{s.tag}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function QuizPage({ onNav }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [selected, setSelected] = useState(null);

  function answer(qid, val) {
    setSelected(val);
    setTimeout(() => {
      setSelected(null);
      const next = { ...answers, [qid]: val };
      setAnswers(next);
      if (step < QUIZ.length-1) { setStep(step+1); } else { compute(next); }
    }, 180);
  }

  function compute(ans) {
    const uv=ans.q1, fv=ans.q2, tv=ans.q3;
    const scored = OILS.map(oil => {
      let score = 0;
      if (oil.use.includes(uv) || uv==="all-purpose") score += 2;
      if (oil.flavor.includes(fv) || fv==="balanced") score += 2;
      if (tv==="all" || oil.tier===tv) score += 3;
      return { oil, score };
    });
    scored.sort((a,b) => b.score-a.score);
    const journey = (fv==="mild" || uv==="cooking") ? "beginner" : (fv==="peppery" || uv==="finishing") ? "enthusiast" : "cook";
    setResults({ oils:scored.slice(0,3).map(s=>s.oil), journey });
  }

  function reset() { setStep(0); setAnswers({}); setResults(null); setSelected(null); }

  if (results) {
    const p = PROFILES[results.journey];
    return (
      <div style={{ maxWidth:640, margin:"0 auto", padding:"2rem 1.2rem" }}>
        <div style={{ background:p.bg, border:`1px solid ${p.color}33`, borderRadius:16, padding:"28px 24px", marginBottom:"1.5rem", textAlign:"center" }}>
          <p style={{ fontSize:38, margin:"0 0 8px" }}>{p.icon}</p>
          <p style={{ margin:"0 0 4px", fontSize:11, color:p.color, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.1em" }}>Where you are now</p>
          <p style={{ fontWeight:700, fontSize:20, margin:"0 0 12px", color:TEXT }}>{p.label}</p>
          <p style={{ fontSize:13, color:SOFT, margin:"0 0 16px", lineHeight:1.8 }}>{p.desc}</p>
          <div style={{ background:"rgba(0,0,0,0.04)", borderRadius:10, padding:"13px 14px", textAlign:"left" }}>
            <p style={{ margin:"0 0 4px", fontSize:11, color:p.color, fontWeight:600 }}>A practical next step</p>
            <p style={{ margin:0, fontSize:13, color:TEXT, lineHeight:1.6 }}>{p.mission}</p>
          </div>
        </div>
        <p style={{ fontWeight:600, fontSize:15, margin:"0 0 12px", color:TEXT }}>Oils that match your preferences</p>
        <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:"1.5rem" }}>
          {results.oils.map((oil,i) => <OilCard key={oil.id} oil={oil} highlight={i===0} />)}
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={reset} style={{ flex:1, background:SURFACE, border:`0.5px solid ${BORDER}`, borderRadius:10, padding:"12px", cursor:"pointer", fontSize:13, color:MUTED }}>Retake</button>
          <button onClick={() => onNav("lab")} style={{ flex:2, background:INK, border:"none", borderRadius:10, padding:"12px", cursor:"pointer", fontSize:13, color:"#FAF8F3", fontWeight:600 }}>Start Taste Lab →</button>
        </div>
      </div>
    );
  }

  const q = QUIZ[step];
  return (
    <div style={{ maxWidth:640, margin:"0 auto", padding:"2rem 1.2rem" }}>
      <div style={{ display:"flex", gap:6, marginBottom:"2rem" }}>
        {QUIZ.map((_,i) => <div key={i} style={{ height:2, flex:1, borderRadius:2, background:i<=step?GOLD:BORDER }} />)}
      </div>
      <p style={{ fontSize:11, color:MUTED, margin:"0 0 8px", letterSpacing:"0.06em", textTransform:"uppercase" }}>Question {step+1} of {QUIZ.length}</p>
      <p style={{ fontWeight:700, fontSize:21, margin:"0 0 1.5rem", color:TEXT, lineHeight:1.3 }}>{q.question}</p>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {q.options.map(opt => (
          <button key={opt.value} onClick={() => answer(q.id, opt.value)} style={{ background:selected===opt.value?GOLD_BG:SURFACE, border:selected===opt.value?`1.5px solid ${GOLD}`:`0.5px solid ${BORDER}`, borderRadius:12, padding:"15px 16px", cursor:"pointer", textAlign:"left", fontSize:14, color:selected===opt.value?GOLD:TEXT, lineHeight:1.4, transition:"all 0.15s" }}>
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div style={{ maxWidth:640, margin:"0 auto", padding:"2rem 1.2rem" }}>
      <p style={{ fontWeight:700, fontSize:22, margin:"0 0 4px", color:TEXT }}>About</p>
      <p style={{ fontSize:13, color:MUTED, margin:"0 0 2rem" }}>Good Food Ambassador Group LLC</p>
      <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
        {[
          { h:"Who we are", b:"Good Food Ambassador Group is a New York-based food education company. We build tools that help people understand what they are buying and eating — starting with extra virgin olive oil, one of the most misunderstood categories in the American grocery store. Our work sits at the intersection of food literacy, consumer transparency, and good taste." },
          { h:"Why olive oil", b:"Extra virgin olive oil is a product with real quality differences, a defined international grading standard, and a measurable certification system — yet most consumers have no way to navigate it. Labels are confusing, marketing terms are misleading, and the gap between the best and worst product in the category is enormous. We built The Crush to close that gap: a practical, fact-based guide to finding, tasting, and understanding genuinely good oil." },
          { h:"How we work", b:"Every oil in our database is selected based on publicly available certification data, independent lab testing results, harvest date transparency, and retail accessibility. We do not accept payment to include a product in our editorial recommendations. Where paid placements exist, they are clearly labeled. Our content draws on standards published by the International Olive Council, the California Olive Oil Council, the Australian Olive Oil Association, and EU PDO/PGI certification bodies." },
          { h:"Our standard", b:"We think the best food education is specific, honest, and useful. We avoid vague health claims, unsupported rankings, and content designed to generate clicks rather than understanding. If something in the app is wrong, we want to know — contact us at hello@goodfoodambassador.com." },
          { h:"Contact", b:"hello@goodfoodambassador.com · goodfoodambassador.com · Good Food Ambassador Group LLC, New York, USA" },
        ].map((s,i) => (
          <div key={i} style={{ background:SURFACE, border:`0.5px solid ${BORDER}`, borderRadius:12, padding:"16px" }}>
            <p style={{ margin:"0 0 8px", fontWeight:600, fontSize:14, color:TEXT }}>{s.h}</p>
            <p style={{ margin:0, fontSize:13, color:SOFT, lineHeight:1.8 }}>{s.b}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PrivacyPage() {
  return (
    <div style={{ maxWidth:640, margin:"0 auto", padding:"2rem 1.2rem" }}>
      <p style={{ fontWeight:700, fontSize:22, margin:"0 0 4px", color:TEXT }}>Privacy Policy</p>
      <p style={{ fontSize:13, color:MUTED, margin:"0 0 2rem" }}>Good Food Ambassador Group LLC · Last updated May 2026</p>
      <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
        {[
          { h:"Overview", b:"Good Food Ambassador Group LLC operates goodfoodambassador.com (the 'Site'). This Privacy Policy explains what information we collect, how we use it, and your rights regarding that information. We are committed to handling your data with transparency and care." },
          { h:"Information we collect", b:"We collect limited, anonymous usage data through Google Analytics, including pages visited, time spent on the site, general geographic region, and device type. This data is aggregated and does not identify you personally. We do not collect your name, email address, or payment information directly through this app unless you choose to subscribe to our newsletter or contact us." },
          { h:"Cookies and analytics", b:"We use Google Analytics, which places cookies on your device to help us understand how visitors use the site. You can opt out of Google Analytics tracking by installing the Google Analytics Opt-out Browser Add-on available at tools.google.com/dlpage/gaoptout. We do not use advertising cookies or sell your data to third parties." },
          { h:"Affiliate links", b:"This site contains affiliate links to third-party retailers including Amazon, Walmart, and others. When you click these links, you will be directed to those retailers' websites, which have their own privacy policies and data practices. We are not responsible for the privacy practices of third-party sites. Please see our Affiliate Disclosure for more information." },
          { h:"Email communications", b:"If you subscribe to our newsletter, your email address is stored by our email service provider (Beehiiv) and used solely to send you our newsletter. We do not sell, rent, or share your email address with third parties. You can unsubscribe at any time using the link in any email we send." },
          { h:"Data retention and security", b:"We retain analytics data for 26 months, after which it is automatically deleted. We do not store personal information beyond what is necessary to provide our services. We use industry-standard security practices to protect any data we do hold." },
          { h:"Your rights", b:"Depending on your location, you may have rights to access, correct, or delete personal data we hold about you. To exercise these rights or ask questions about our privacy practices, contact us at hello@goodfoodambassador.com." },
          { h:"Changes to this policy", b:"We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of the site after changes constitutes acceptance of the updated policy." },
          { h:"Contact", b:"Good Food Ambassador Group LLC · hello@goodfoodambassador.com · goodfoodambassador.com" },
        ].map((s,i) => (
          <div key={i} style={{ background:SURFACE, border:`0.5px solid ${BORDER}`, borderRadius:12, padding:"16px" }}>
            <p style={{ margin:"0 0 8px", fontWeight:600, fontSize:14, color:TEXT }}>{s.h}</p>
            <p style={{ margin:0, fontSize:13, color:SOFT, lineHeight:1.8 }}>{s.b}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DisclosurePage() {
  return (
    <div style={{ maxWidth:640, margin:"0 auto", padding:"2rem 1.2rem" }}>
      <p style={{ fontWeight:700, fontSize:22, margin:"0 0 4px", color:TEXT }}>Affiliate Disclosure</p>
      <p style={{ fontSize:13, color:MUTED, margin:"0 0 2rem" }}>Good Food Ambassador Group LLC · Last updated May 2026</p>
      <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
        {[
          { h:"Our affiliate relationships", b:"Good Food Ambassador Group LLC participates in affiliate marketing programs. This means that when you click a link to a product on this site and make a purchase, we may earn a small commission at no additional cost to you. We are a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. We also participate in affiliate programs offered by other retailers including Walmart, Instacart, and individual olive oil brands." },
          { h:"How we choose what to recommend", b:"Our editorial content — the oils we feature, the information in the Academy, the Guide, and the Taste Lab — is based entirely on publicly available data, independent certifications, and verified sources. Affiliate relationships do not influence which oils we include or how we describe them. We do not accept payment to feature a product, and we do not remove products from our recommendations based on the absence of an affiliate relationship." },
          { h:"Sponsored placements", b:"Where a brand has paid for a 'Featured' placement in our app, this will be clearly labeled with a 'Sponsored' or 'Featured' badge. Paid placements are separate from our editorial recommendations and are disclosed at the point of display." },
          { h:"Price accuracy", b:"Prices shown in this app are based on publicly available information and change frequently. Always verify the current price on the retailer's website before purchasing. We are not responsible for price discrepancies between what is shown here and what is charged at the point of sale." },
          { h:"Contact", b:"If you have questions about our affiliate relationships or editorial process, contact us at hello@goodfoodambassador.com." },
        ].map((s,i) => (
          <div key={i} style={{ background:SURFACE, border:`0.5px solid ${BORDER}`, borderRadius:12, padding:"16px" }}>
            <p style={{ margin:"0 0 8px", fontWeight:600, fontSize:14, color:TEXT }}>{s.h}</p>
            <p style={{ margin:0, fontSize:13, color:SOFT, lineHeight:1.8 }}>{s.b}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const navItems = [
    { id:"home",    icon:"🏠", l:"Home" },
    { id:"lab",     icon:"🔬", l:"Taste Lab" },
    { id:"guide",   icon:"📋", l:"Guide" },
    { id:"oils",    icon:"🫙", l:"Oils" },
    { id:"quiz",    icon:"❓", l:"Quiz" },
    { id:"academy", icon:"📚", l:"Academy" },
    { id:"about",   icon:"ℹ️",  l:"About" },
  ];
  function renderPage() {
    if (page==="home")       return <HomePage onNav={setPage} />;
    if (page==="lab")        return <LabPage />;
    if (page==="guide")      return <GuidePage />;
    if (page==="oils")       return <OilsPage />;
    if (page==="quiz")       return <QuizPage onNav={setPage} />;
    if (page==="academy")    return <AcademyPage />;
    if (page==="about")      return <AboutPage />;
    if (page==="privacy")    return <PrivacyPage />;
    if (page==="disclosure") return <DisclosurePage />;
    return <HomePage onNav={setPage} />;
  }
  return (
    <div style={{ fontFamily:"Georgia, 'Times New Roman', serif", background:BG, minHeight:600, maxWidth:680, margin:"0 auto", paddingBottom:88, color:TEXT }}>
      <h2 style={{ position:"absolute", width:1, height:1, overflow:"hidden", clip:"rect(0,0,0,0)" }}>The Crush — EVOO discovery and education app</h2>
      {renderPage()}
      <div style={{ textAlign:"center", padding:"8px 0 4px", display:"flex", justifyContent:"center", gap:16 }}>
        <button onClick={() => setPage("disclosure")} style={{ background:"none", border:"none", cursor:"pointer", fontSize:10, color:MUTED, opacity:0.6, textDecoration:"underline" }}>Affiliate Disclosure</button>
        <button onClick={() => setPage("privacy")} style={{ background:"none", border:"none", cursor:"pointer", fontSize:10, color:MUTED, opacity:0.6, textDecoration:"underline" }}>Privacy Policy</button>
      </div>
      <nav style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:680, background:"rgba(250,248,243,0.97)", borderTop:`0.5px solid ${BORDER}`, backdropFilter:"blur(12px)", display:"flex", justifyContent:"space-around", padding:"7px 0 9px" }}>
        {navItems.map(n => (
          <button key={n.id} onClick={() => setPage(n.id)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:2, padding:"3px 6px", color:page===n.id?GOLD:MUTED }}>
            <span style={{ fontSize:18 }}>{n.icon}</span>
            <span style={{ fontSize:9, fontWeight:page===n.id?600:400 }}>{n.l}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
