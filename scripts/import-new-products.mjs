#!/usr/bin/env node
// Usage: node scripts/import-new-products.mjs <YOUR_PAT> [BASE_ID]
// Posts 90 new GFA products to Airtable with Status = approved and all four pillar fields.

const [,, API_KEY, BASE_ID = 'appcBDopFuYbSTdRy'] = process.argv
if (!API_KEY) { console.error('Usage: node scripts/import-new-products.mjs <PAT>'); process.exit(1) }

const URL     = `https://api.airtable.com/v0/${BASE_ID}/Products`
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }

const PRODUCTS = [

  // ─── OILS & CONDIMENTS — 10 MORE EVOOs ───────────────────────────────────

  { Name: 'Frantoi Cutrera Primo Double Organic PDO Monte Iblei',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Tonda Iblea cultivar, Chiaramonte Gulfi, Sicily. Holds dual PDO certification: Monte Iblei and Del Calatino. USDA Organic. Cold-pressed early harvest. Tonda Iblea is a native Sicilian cultivar documented for its tomato-rich, balanced sensory profile.",
    PillarClean: "Double PDO verified by the EU Consortium Tutela Olio Monte Iblei. USDA Organic certified. Single cultivar, single estate production. No blending across origins or varieties declared.",
    PillarFair:  "Family estate, Chiaramonte Gulfi, Sicily. Three-generation operation. Direct export distribution to US market.",
    PillarTrue:  "'Double PDO' reflects two distinct denominazioni whose geographic zones overlap at this estate — this is accurately stated and not a marketing conflation. No legacy phrases such as 'first cold press' appear in labelling." },

  { Name: 'Entelia Novello',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Koroneiki cultivar, Kolymvari, Crete. Limited harvest-fresh release pressed within days of harvest completion. Elevated fresh polyphenol and chlorophyll content characteristic of unoxidised new-crop oil. Seasonal availability tied to actual harvest calendar.",
    PillarClean: "Single estate, Kolymvari, Crete. Harvest year and pressing window disclosed. No extended storage prior to bottling. Limited-run product with transparent sell-through timeline.",
    PillarFair:  "Small Cretan family estate. Direct-to-consumer US distribution. Seasonal production model supports grower rather than warehouse inventory model.",
    PillarTrue:  "'Novello' designates an immediate post-harvest release. Chemical markers of freshness (high chlorophyll, high polyphenols, low peroxide value) distinguish it from standard-season oil and are measurable at point of production." },

  { Name: 'Entelia Private Reserve PDO Kolymvari',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Koroneiki cultivar, PDO Kolymvari, Crete. Cold-pressed. Polyphenol content documented in the high range for Koroneiki. PDO geographic certification provides independent verification of origin and production parameters.",
    PillarClean: "PDO Kolymvari certified by ELGO-DIMITRA, the Greek Ministry of Rural Development's certification body. Single variety, estate-origin. Harvest date disclosed on label.",
    PillarFair:  "Small Cretan family estate. No third-party fair trade or cooperative certification. Direct export distribution.",
    PillarTrue:  "PDO Kolymvari is among the most established Greek PDOs. The certification independently verifies geographic origin and mandates production within the designated zone. No self-declared origin claims used in place of PDO documentation." },

  { Name: 'Oro del Desierto Organic Picual',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Picual monovariety, Las Norias de Daza, Almería, Andalusia. USDA Organic. Early harvest. Per-harvest polyphenol data published by producer; values consistently above 500 mg/kg in available test records. Picual's documented oxidative stability makes it suitable for both raw and cooking applications.",
    PillarClean: "USDA Organic and EU Organic certified. Single variety stated on label. Estate: Cortijo el Puerto, Almería. Harvest date disclosed.",
    PillarFair:  "Family estate, Cortijo el Puerto, in continuous operation since 1939. Direct export distribution. No third-party fair trade certification.",
    PillarTrue:  "Polyphenol data are available per harvest and published on producer's website. 'Ultra-high polyphenol' descriptor is consistent with published test results. Picual stability claims align with peer-reviewed literature on cultivar oxidative resistance." },

  { Name: 'Oro del Desierto Organic Coupage',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Three-variety blend — Picual, Hojiblanca, Arbequina — Almería, Andalusia. USDA Organic. Early harvest. Each variety contributes distinct sensory and chemical characteristics; composition disclosed on label.",
    PillarClean: "USDA Organic and EU Organic certified. Three varieties and their proportions stated. Single estate, Almería. Harvest date disclosed.",
    PillarFair:  "Same family estate as the Organic Picual. Three-generation operation. No additional fair trade certification.",
    PillarTrue:  "'Coupage' indicates multi-variety blend — accurately stated on label. Variety composition is documented and transparent. No single-variety or single-origin claims made for a blended product." },

  { Name: 'Quattrociocchi Superbo Organic',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Monovarietal Moraiolo, Alatri, Lazio. USDA Organic. Moraiolo is documented in Italian olive oil research as among the most polyphenol-dense Italian cultivars. Per-harvest polyphenol data published by producer, consistently above 600 mg/kg.",
    PillarClean: "USDA Organic certified. Moraiolo monovariety. Single family estate, Alatri, Lazio. Harvest date on label. Polyphenol test results published per harvest.",
    PillarFair:  "Family estate, three generations, Alatri. Direct export distribution. No third-party fair trade certification.",
    PillarTrue:  "Moraiolo's high-polyphenol character is documented in Italian agricultural research literature. Polyphenol data are published by the producer per harvest and subject to third-party laboratory verification. No unsupported superlatives used in labelling." },

  { Name: 'Quattrociocchi Olivastro Organic',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Olivastro (wild olive, Olea europaea sylvestris), Lazio. USDA Organic. Rare cultivar; wild olives produce significantly lower yields than cultivated varieties. Herbaceous, bitter, and pungent sensory profile distinct from cultivated Moraiolo.",
    PillarClean: "USDA Organic certified. 'Olivastro' (wild olive) stated as variety — a botanically distinct sub-species. Single family estate, Lazio. Harvest date on label.",
    PillarFair:  "Same Quattrociocchi family estate. Three-generation operation. Use of wild olives requires hand-harvesting from unmanaged trees, which is labour-intensive.",
    PillarTrue:  "Olivastro (Olea europaea subsp. sylvestris) is a distinct botanical category from cultivated olive (O. europaea subsp. europaea). The label accurately identifies this distinction. Reduced yield relative to cultivated varieties is a documented agronomic fact, not a marketing claim." },

  { Name: 'Nobleza del Sur Organic Day',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Picual monovariety, Baeza, Jaén, Andalusia. USDA Organic. Harvested at peak green maturity index in early October. Same-day pressing after early-season harvest, resulting in intensely peppery, high-polyphenol profile.",
    PillarClean: "USDA Organic certified. Picual monovariety. Estate: Puente del Obispo, Jaén. Harvest date disclosed. Same-day pressing protocol stated.",
    PillarFair:  "Family estate, third generation. No third-party fair trade certification. Organic certification supports farming practices that reduce synthetic input use.",
    PillarTrue:  "'Day' designation refers to same-day harvest-to-mill timing, which is a substantiated production specification. Early green harvest timing and its effect on polyphenol concentration is documented in published olive oil science. Chemical profile is consistent with early-harvest production." },

  { Name: 'Oleoestepa Egregio Organic',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Multi-variety Andalusian blend (Hojiblanca, Manzanilla, Arbequina, Picual), DOP Estepa zone, Andalusia. USDA Organic. Cold-pressed. Cooperative production within the denomination.",
    PillarClean: "DOP Estepa certified (Consejo Regulador DOP Estepa). USDA Organic certified. Member-grower cooperative within the DOP zone. Variety composition stated on label.",
    PillarFair:  "Oleoestepa is a producer cooperative with member growers in the Estepa region. Revenue distribution to member growers is a structural feature of cooperative organisation. No additional Fairtrade certification.",
    PillarTrue:  "DOP Estepa independently verifies geographic origin and quality parameters — certification is not self-declared. Organic certification is USDA-verified. Variety composition stated; no single-variety claims made for a blended oil." },

  { Name: 'Rincón de la Subbética',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Hojiblanca monovariety, Carcabuey, Córdoba, Andalusia. DOP Priego de Córdoba. EU Organic and USDA Organic. Pressing within 2 hours of harvest per producer specification. Herbal, tomato-rich sensory profile characteristic of Hojiblanca.",
    PillarClean: "DOP Priego de Córdoba certified. EU Organic and USDA Organic certified. Hojiblanca monovariety. Cooperativa origin, Carcabuey, Córdoba. Harvest date disclosed.",
    PillarFair:  "Producer cooperative, Almazara de la Subbética. Member growers within the DOP zone. Cooperative structure distributes revenue to small growers without access to individual export infrastructure.",
    PillarTrue:  "DOP Priego de Córdoba is an established Andalusian denomination with independent certification. '2-hour pressing' is a stated producer specification; this is not independently verified per batch but is consistent with the DOP's production standards. Flavour descriptors are consistent with Hojiblanca's published sensory profile." },

  // ─── INFUSED OILS ─────────────────────────────────────────────────────────

  { Name: 'Castillo de Canena Smoked Arbequina',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Arbequina EVOO base, Jaén, Andalusia. Natural cold-smoking process imparts caramel and vanilla notes without heat damage to the base oil. Estate-grown and pressed Arbequina.",
    PillarClean: "Arbequina variety stated. Jaén estate origin. Natural smoking process — no artificial smoke flavourings, colourings, or additives declared. Label discloses process method.",
    PillarFair:  "Castillo de Canena is a third-generation family estate, Jaén. Direct export distribution. No third-party fair trade certification.",
    PillarTrue:  "Smoking is by natural wood-smoke infusion, not artificial smoke flavouring — distinction stated on label. Caramel and vanilla notes are byproducts of phenolic compounds in natural smoke reacting with the oil, not added ingredients." },

  { Name: 'Terre Francescane Black Truffle Infused EVOO',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Moraiolo-based Umbrian EVOO infused with Tuber melanosporum (black Périgord truffle). Cold-pressed base oil. Umbria, Italy. Tuber melanosporum provides authentic aromatic compounds not replicable by synthetic means.",
    PillarClean: "Truffle species stated as Tuber melanosporum — a meaningful distinction from Tuber aestivum (summer truffle) or synthetic 2,4-dithiapentane (artificial truffle aroma). Moraiolo variety disclosed. Umbrian estate origin.",
    PillarFair:  "Small Umbrian artisan producer. No third-party fair trade certification.",
    PillarTrue:  "The label specifies Tuber melanosporum rather than a generic 'truffle' designation. Synthetic truffle-flavoured oils are common in the market and are legally required to disclose 'aroma' in ingredient lists — this product does not carry such a disclosure." },

  { Name: 'Terre Francescane Peperoncino Infused EVOO',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Moraiolo-based Umbrian EVOO infused with fresh peperoncino chili. Cold-pressed base oil. Capsaicin heat integrated into oil matrix during infusion.",
    PillarClean: "Peperoncino stated as infusing agent. Umbrian estate origin. No artificial flavouring, colouring, or additive declared. Moraiolo base variety disclosed.",
    PillarFair:  "Same Umbrian producer as Black Truffle line. Small artisan production.",
    PillarTrue:  "Infusion uses fresh chili, not artificial capsaicin extract or flavouring concentrate. Moraiolo base oil disclosed. Heat level is a function of natural capsaicin content from fresh chili." },

  { Name: 'Terre Francescane Lemon Infused EVOO',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Moraiolo-based Umbrian EVOO infused with Sicilian lemons. Cold-pressed base oil. Bright citrus character from lemon zest infusion.",
    PillarClean: "Lemon (Sicilian origin) stated as infusing agent. Moraiolo variety disclosed. Umbrian estate. No artificial flavouring declared.",
    PillarFair:  "Same Umbrian artisan producer.",
    PillarTrue:  "Label distinguishes infusion (zest infused into oil post-extraction) from the agrumato method (citrus co-pressed with olives at the mill). These are two distinct production methods with different flavour integration profiles. No agrumato claim is made." },

  { Name: 'Quattrociocchi Garlic Organic Infused EVOO',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Moraiolo-based EVOO from Alatri, Lazio. USDA Organic. Infused with organic garlic. High-polyphenol Moraiolo base oil. Organic garlic source stated.",
    PillarClean: "USDA Organic certified — covers both EVOO base and garlic. Moraiolo monovariety. Alatri estate, Lazio. No artificial flavouring.",
    PillarFair:  "Same family estate as the full Quattrociocchi range. Three-generation operation.",
    PillarTrue:  "Both base oil and garlic carry USDA Organic certification. Natural infusion process, not synthetic flavouring. Moraiolo base disclosed." },

  { Name: 'Quattrociocchi Rosemary Organic Infused EVOO',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Moraiolo-based EVOO, Alatri, Lazio. USDA Organic. Infused with organic rosemary. Polyphenol-rich base oil. Rosemary's terpene compounds (camphor, cineole) integrate with the oil matrix.",
    PillarClean: "USDA Organic certified — base oil and rosemary. Moraiolo monovariety. Lazio estate. No artificial flavouring.",
    PillarFair:  "Same Quattrociocchi estate. Three-generation family operation.",
    PillarTrue:  "Organic certification covers both EVOO and herb. Natural rosemary infusion, not essential oil concentrate or synthetic rosemary flavouring." },

  { Name: 'Quattrociocchi Peperoncino Organic Infused EVOO',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Moraiolo-based EVOO, Lazio. USDA Organic. Infused with organic chili pepper. High-polyphenol base.",
    PillarClean: "USDA Organic certified — base and chili. Moraiolo monovariety. Lazio estate. No artificial flavouring or colouring.",
    PillarFair:  "Same family estate.",
    PillarTrue:  "Organic certification covers both oil and chili. Natural infusion process. Heat intensity reflects natural capsaicin content of the organic chili used." },

  { Name: 'Iannotta Organic Garlic Flavored EVOO',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Itrana cultivar-based EVOO, Fondi, Lazio. USDA Organic. Infused with organic crushed garlic. Itrana is a native Lazio variety known for buttery, mild character that complements garlic without competing with it.",
    PillarClean: "USDA Organic certified. Itrana monovariety stated. Fondi, Lazio estate. Organic garlic specified as 'crushed' — mechanically processed, not extract or flavouring.",
    PillarFair:  "Small family estate, Fondi, Lazio. Direct US distribution.",
    PillarTrue:  "'Crushed garlic' infusion method specifies mechanical crushing of organic garlic — distinct from garlic extract or synthetic allicin-based flavouring. Itrana cultivar is accurately identified as native to Lazio." },

  { Name: 'Colonna Granverde Lemon EVOO',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Native Molisana cultivar EVOO, Campodipietra, Molise. USDA Organic. Produced using a lemon-co-crush method (agrumato-adjacent): lemons are pressed together with olives during extraction, integrating citrus oils at the cellular level rather than through post-extraction infusion.",
    PillarClean: "USDA Organic certified. Native Molisana cultivar stated. Sorrento lemon variety specified. Campodipietra estate, Molise. Time-honoured estate recipe, documented since the 1980s.",
    PillarFair:  "Marina Colonna estate, Campodipietra. Family-owned, continuous multi-generational operation.",
    PillarTrue:  "The co-crush (agrumato-adjacent) method produces deeper flavour integration than post-extraction infusion and is stated in product documentation. This is a meaningful distinction — the process is not equivalent to lemon-infused oil and results in a different chemical composition." },

  { Name: 'Olio Guglielmi Crushed Chili Pepper EVOO',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Coratina cultivar-based EVOO, Puglia. Fresh chili crushed simultaneously with olives at the mill (co-crush method). Coratina is among the most polyphenol-dense Italian cultivars, providing a high-antioxidant base for the infusion.",
    PillarClean: "Coratina monovariety stated. Puglia estate origin. Co-crush method disclosed: chili and olives processed together in the frantoio. No post-extraction infusion or artificial flavouring.",
    PillarFair:  "Multi-generational family producer, Puglia. No third-party fair trade certification.",
    PillarTrue:  "'Crushed' designates co-crushing of fresh chili with olives at the mill — distinct from infused products. This method produces deeper capsaicin integration and is stated on the label. Coratina's documented polyphenol density is substantiated in published Italian olive oil research." },

  // ─── VINEGARS ─────────────────────────────────────────────────────────────

  { Name: 'Arvum Vinagre Gran Reserva',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Sherry vinegar, DO Jerez-Xérès-Sherry, aged minimum 10 years in American oak via traditional solera system. Palomino Fino grape base. Complex, layered profile developed through extended wood contact.",
    PillarClean: "DO Jerez-Xérès-Sherry certification verified by Consejo Regulador. Minimum 10-year aging documented under DO production records. Palomino Fino variety stated. Production, aging, and bottling within the Marco de Jerez zone as required by DO rules.",
    PillarFair:  "Arvum is produced within the González Byass / Grupo Faustino network, one of the Jerez region's established wine and vinegar producers. No small-grower or Fairtrade certification.",
    PillarTrue:  "DO Jerez mandates three aging tiers: Vinagre de Jerez (≥6 months), Reserva (≥2 years), Gran Reserva (≥10 years). The 'Gran Reserva' designation is independently verified under DO regulation. Solera aging is the traditional and legally mandated method within this DO." },

  { Name: 'Arvum Vinagre Reserva al Pedro Ximenez',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "DO Jerez Sherry vinegar base blended with Pedro Ximenez grape must. Solera-aged minimum 2 years. Pedro Ximenez grapes are sun-dried before pressing, concentrating sugars and producing the characteristic sweetness.",
    PillarClean: "DO Jerez certified. PX grape contribution stated on label. Solera aging system and minimum 2-year Reserva period documented under DO rules.",
    PillarFair:  "Same Arvum/González Byass producer.",
    PillarTrue:  "Pedro Ximenez designation refers accurately to the specific grape variety (Vitis vinifera cv. Pedro Ximénez) contributing to the blend. Sun-drying of PX grapes is a documented and traditional Jerez practice." },

  { Name: 'Arvum Vinagre Reserva al Moscatel',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "DO Jerez Sherry vinegar blended with Muscat (Moscatel) grape must. Solera-aged minimum 2 years. Moscatel's aromatic compounds (linalool, geraniol) produce a distinctly floral, aromatic profile.",
    PillarClean: "DO Jerez certified. Moscatel variety stated. Solera method and Reserva aging period documented under DO.",
    PillarFair:  "Same Arvum producer.",
    PillarTrue:  "Moscatel's aromatic character is attributable to documented monoterpene compounds. The DO Reserva designation is independently verified, not self-declared." },

  { Name: 'Casa del Agua Vinagre de Jerez Reserva',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "DOP Vinagre de Jerez, Reserva tier. Palomino base, aged minimum 2 years in American oak solera. Accessible entry point into the Jerez vinegar appellation.",
    PillarClean: "DOP Vinagre de Jerez certified. Reserva tier (≥2 years aging) verified by Consejo Regulador. Production, aging, bottling within Marco de Jerez.",
    PillarFair:  "Jerez-based producer. No third-party fair trade certification.",
    PillarTrue:  "The three-tier DOP Jerez structure (Vinagre de Jerez / Reserva / Gran Reserva) is a regulated hierarchy. 'Reserva' accurately designates the ≥2 year tier. No Gran Reserva claims made." },

  { Name: 'Castillo de Canena Cabernet Sauvignon Vinegar',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Cabernet Sauvignon grape-based wine vinegar, Andalusia. Fruit-forward, red berry character with refined acid balance. Produced by an estate known primarily for EVOO, demonstrating vertical integration.",
    PillarClean: "Cabernet Sauvignon variety stated. Andalusian estate origin. No DO Jerez claim — this is accurately marketed as a varietal wine vinegar, not a Sherry vinegar.",
    PillarFair:  "Castillo de Canena family estate, Jaén, third generation. No third-party fair trade certification.",
    PillarTrue:  "Cabernet Sauvignon is not a traditional Andalusian variety. The producer discloses this is a varietal wine vinegar outside the Jerez appellation. No DO Jerez claims are made, avoiding misrepresentation." },

  { Name: 'Frantoio Bonamini IGP Balsamic Vinegar of Modena Gold Label',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "IGP Balsamic Vinegar of Modena, aged 10+ years in a battery of wood barrels (mulberry, chestnut, cherry, ash, oak). Trebbiano and Lambrusco grape must base. Veneto producer.",
    PillarClean: "IGP (PGI) certification verified by Consorzio Tutela Aceto Balsamico di Modena. Grape varieties and 10+ year aging stated. Production and aging within Modena or Reggio Emilia provinces as required by IGP rules.",
    PillarFair:  "Family estate winery and vinegar producer, San Pietro in Cariano, Veneto. No third-party fair trade certification.",
    PillarTrue:  "IGP Balsamic of Modena is a distinct product from Traditional Balsamic Vinegar of Modena DOP, which has stricter production criteria and a different designation. Gold Label's 10+ year aging is documented under IGP production records. These are independently verifiable claims." },

  { Name: 'Frantoio Bonamini IGP Balsamic Vinegar of Modena Purple Label',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "IGP Balsamic Vinegar of Modena, aged 5+ years. Trebbiano and Lambrusco base. Accessible everyday balsamic with balanced sweetness and acidity.",
    PillarClean: "IGP certified by Consorzio Tutela. 5+ year aging stated. Same Veneto family producer as Gold Label.",
    PillarFair:  "Same family estate.",
    PillarTrue:  "Purple Label tier is clearly positioned below the 10+ year Gold Label in the producer's disclosed aging hierarchy. No misrepresentation of aging duration. IGP certification is independently verified." },

  { Name: 'Mussini PGI Balsamic Vinegar of Modena 5 Gold Medals',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "PGI Balsamic Vinegar of Modena from Mussini, Reggio Emilia — in continuous production since 1830. Aged in traditional wood barrel battery. Five international competition gold medals from verifiable award programmes.",
    PillarClean: "PGI certified by Consorzio Tutela Aceto Balsamico di Modena. Emilia-Romagna production as required by PGI rules. Medal claims verifiable against published competition results.",
    PillarFair:  "Historic Modenese producer with roots in 1830. No third-party fair trade certification.",
    PillarTrue:  "Five-medal claim references documented international competition results. PGI certification is independently verified. Production is within Emilia-Romagna as required." },

  { Name: 'Mussini PGI Balsamic Vinegar of Modena 4 Gold Medals',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "PGI Balsamic Vinegar of Modena. Mid-range aging. Four gold medals. Good balance of complexity and everyday versatility.",
    PillarClean: "PGI certified. Emilia-Romagna production. Aging and medal count accurately stated within Mussini's published quality tier structure.",
    PillarFair:  "Same historic Mussini producer.",
    PillarTrue:  "Four-medal tier is positioned accurately below the five-medal product in Mussini's stated hierarchy. No inflated claims." },

  { Name: 'Mussini Saba Cooked Grape Must Condiment',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Saba (mosto cotto) — cooked Trebbiano and Lambrusco grape must reduced to approximately 60% of original volume by slow cooking. The traditional Modenese sweet condiment that predates balsamic vinegar.",
    PillarClean: "Ingredients: cooked grape must only. No added sugar, caramel coloring, or thickeners. Emilia-Romagna. Grape varieties stated. No acidity regulators.",
    PillarFair:  "Same Mussini producer.",
    PillarTrue:  "Saba is a legally distinct product from Balsamic Vinegar of Modena — it contains no acetic acid and undergoes no vinegar fermentation. Label accurately describes it as a condiment, not a vinegar. The product is not sweetened beyond the natural concentration of grape must through evaporation." },

  // ─── SOY & UMAMI CONDIMENTS ───────────────────────────────────────────────

  { Name: 'San-J Organic Tamari',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Tamari-style soy sauce brewed using a formulation with at least 90% soy and minimal wheat content. USDA Organic. Gluten-free certified (GFCO). Rich umami profile without the grain-forward character of standard shoyu.",
    PillarClean: "USDA Organic certified. Non-GMO Project Verified. Gluten-free certified. Ingredients: organic soybeans, water, salt. No caramel colour, preservatives, or artificial additives.",
    PillarFair:  "San-J is a 200+ year-old Japanese brewing company with US production operations in Richmond, Virginia. Sourcing from identity-preserved, certified organic soybean growers. No third-party Fairtrade certification.",
    PillarTrue:  "'Tamari' in the US refers to wheat-free or near-wheat-free soy sauce — San-J's formulation meets this standard. The gluten-free certification (GFCO) requires testing to below 10 ppm gluten, which is more stringent than the FDA's 20 ppm threshold." },

  { Name: 'Eden Foods Organic Shoyu',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Traditional shoyu brewed by Yamaki Jozo, Saitama Prefecture, Japan. Aged minimum 2 years in 150-year-old cedar vats. USDA Organic. Equal proportions organic whole soybeans and organic wheat — the classic shoyu ratio.",
    PillarClean: "USDA Organic certified. Named Japanese brewery (Yamaki Jozo). Cedar vat aging method disclosed. Ingredients: organic whole soybeans, organic wheat, water, sea salt. No additives, artificial colour, or preservatives.",
    PillarFair:  "Eden Foods (Clinton, Michigan) maintains a long-term sourcing relationship with Yamaki Jozo brewery. No third-party Fairtrade certification.",
    PillarTrue:  "Cedar vat (kioke) fermentation is a documented and increasingly rare traditional Japanese method. The 2-year fermentation period is substantiated by Yamaki Jozo's stated production process. No artificial colour (standard shoyu often uses caramel) is verified by the ingredient declaration." },

  { Name: 'Ohsawa Organic Nama Shoyu',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Unpasteurised (nama = raw) shoyu brewed by Yamaki Jozo, Saitama Prefecture, Japan. USDA Organic. Living enzymes and beneficial microorganisms preserved through absence of heat treatment. Aged 18+ months.",
    PillarClean: "USDA Organic certified. 'Nama' (raw/unpasteurised) status clearly disclosed on label. Named brewery: Yamaki Jozo. No additives. Requires refrigeration after opening.",
    PillarFair:  "Distributed by Gold Mine Natural Foods. Sourced from Yamaki Jozo. No third-party Fairtrade certification.",
    PillarTrue:  "Nama (生) is a legally meaningful Japanese food designation denoting the absence of heat pasteurisation. Unpasteurised shoyu requires cold storage and has a shorter shelf life than pasteurised equivalents — these facts are disclosed on the label. Enzyme activity distinguishes nama shoyu from standard pasteurised products." },

  { Name: 'Kishibori Premium Shoyu',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Single-barrel soy sauce brewed by Yamaroku Shoyu, Shodoshima Island, Kagawa Prefecture, Japan. Cedar barrel-fermented 24 months. No additives. Yamaroku is among the last producers still using traditional kioke (cedar barrel) fermentation at scale.",
    PillarClean: "Single origin — Shodoshima, Kagawa. Single producer (Yamaroku Shoyu). Cedar barrel source identified. Ingredients: soybeans, wheat, salt, water. No additives, colourings, or preservatives.",
    PillarFair:  "Yamaroku Shoyu is a 4th-generation family brewery, all production by hand. Sales directly support the continuation of traditional cedar-barrel brewing practices that are under commercial pressure from industrial production.",
    PillarTrue:  "'Single-barrel' designates origin from one identified cedar fermentation barrel. 24-month fermentation is substantially longer than industrial soy sauce (3–6 months) and results in documented flavour complexity differences. Cedar barrel (kioke) fermentation is a documented and endangered Japanese production method." },

  { Name: 'Wan Ja Shan Organic Tamari',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Tamari-style soy sauce brewed in Taoyuan, Taiwan. USDA Organic. Natural fermentation, aged minimum 6 months. Low-wheat formulation consistent with tamari designation.",
    PillarClean: "USDA Organic certified. Non-GMO Project Verified. Brewed in Taiwan — origin stated. Ingredients: organic whole soybeans, water, sea salt, organic sugar (trace), wheat (trace). No artificial ingredients.",
    PillarFair:  "Wan Ja Shan is a family-owned Taiwanese producer founded in 1946. No third-party Fairtrade certification.",
    PillarTrue:  "'Tamari' designation is consistent with the product's low-wheat formulation. Taiwan origin is accurately stated; no claims of Japanese geographic origin are made. The small amount of sugar in the ingredient list is disclosed." },

  { Name: 'Coconut Secret Organic Coconut Aminos',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Soy-free condiment made from raw coconut sap (coconut blossom nectar) fermented with sea salt. USDA Organic. Naturally lower sodium than soy sauce (~73% less per serving). Philippines-sourced coconut sap.",
    PillarClean: "USDA Organic certified. Non-GMO Project Verified. Ingredients: organic coconut blossom nectar, sea salt. Soy-free, gluten-free, grain-free. Philippines origin stated.",
    PillarFair:  "Sourcing from small-scale Philippine coconut farmers. Direct sourcing relationships stated on company website. No third-party Fairtrade certification.",
    PillarTrue:  "Coconut aminos is a distinct product category from shoyu or tamari — different amino acid profile, lower sodium, and sweeter flavour. It is not marketed as equivalent to soy sauce. The product contains no soy and is suitable for individuals with soy intolerance." },

  { Name: 'Big Tree Farms Organic Coconut Aminos Smoked',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Coconut sap-based aminos with natural smoke flavouring. USDA Organic. Sourced from Indonesian smallholder coconut farmers. Smoke addition provides depth not found in unsmoked coconut aminos.",
    PillarClean: "USDA Organic certified. Non-GMO. Ingredients: organic coconut sap, sea salt, organic smoke flavour. Soy-free, gluten-free. Indonesia origin stated.",
    PillarFair:  "Big Tree Farms sources from smallholder Indonesian coconut farmers through a direct trade model. Certified B Corporation — verified by B Lab third-party audit. Regenerative supply chain programme documented in published impact reports.",
    PillarTrue:  "Smoke flavour is certified organic natural smoke, not artificial smoke flavouring — stated on label. B Corp certification is independently verified by B Lab. The smoked variant is distinct from the company's standard coconut aminos." },

  { Name: 'Clearspring Organic Japanese Tamari',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Wheat-free tamari brewed by Ohta Jōzō, Gifu Prefecture, Japan. JAS Organic certified (Japanese Agricultural Standard). Aged 18 months. Rich, full-bodied umami profile.",
    PillarClean: "JAS Organic and EU Organic certified. Named brewery: Ohta Jōzō, Gifu. Wheat-free stated on label. Ingredients: organic soybeans, water, sea salt. No additives.",
    PillarFair:  "Clearspring is a UK-based organic food importer with long-term sourcing relationship with Ohta Jōzō. No third-party Fairtrade certification.",
    PillarTrue:  "JAS Organic is the Japanese national organic standard, broadly equivalent to USDA Organic in scope. 18-month fermentation substantiates the 'traditionally brewed' claim. Wheat-free formulation is verified by ingredient declaration and JAS certification scope." },

  { Name: 'Yamasa Organic Soy Sauce',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Shoyu brewed by Yamasa Corporation, Choshi, Chiba Prefecture, Japan — in documented continuous operation since 1645. USDA Organic and JAS Organic certified. Organic whole soybeans and wheat. 12-month natural fermentation.",
    PillarClean: "USDA Organic and JAS Organic certified. Named brewery: Yamasa, Choshi. 12-month natural fermentation stated. Ingredients: organic whole soybeans, organic wheat, water, salt. No artificial colour, caramel, or preservatives.",
    PillarFair:  "Yamasa is one of Japan's two largest historic soy sauce producers. Long-established contracting relationships with organic soybean growers. No third-party Fairtrade certification.",
    PillarTrue:  "Yamasa's documented operation since 1645 is verifiable through Japanese commercial records. 12-month fermentation is substantiated by stated production process. Choshi, Chiba is historically Japan's primary shoyu production region, alongside Noda." },

  { Name: 'Bragg Organic Liquid Aminos',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Unfermented liquid protein concentrate made from non-GMO soybeans processed via acid hydrolysis. USDA Organic. Contains 16 free amino acids. No added table salt — sodium comes from the soybean protein itself.",
    PillarClean: "USDA Organic certified. Non-GMO Project Verified. Ingredients: certified non-GMO soybeans, purified water. Acid hydrolysis method is disclosed in company documentation.",
    PillarFair:  "Bragg Live Foods, Santa Barbara, California. US-produced product. No third-party Fairtrade certification.",
    PillarTrue:  "Bragg Liquid Aminos is produced via acid hydrolysis, not fermentation — this results in a nutritionally and flavour-distinct product from brewed soy sauce or tamari. This distinction is not prominently communicated on the front label but is disclosed in product documentation. Not equivalent to traditional shoyu in fermentation-derived flavour compounds." },

  // ─── LEGUMES +10 — RANCHO GORDO ─────────────────────────────────────────

  { Name: 'Good Mother Stallard Bean',
    Category: 'legumes', Status: 'approved',
    PillarGood:  "Heirloom runner bean (Phaseolus coccineus), California-grown from documented heritage seed. Deep, rich flavour with a pronounced bean broth noted as among the most complex of the Rancho Gordo catalogue. Dense yet creamy interior texture. New-crop annually.",
    PillarClean: "California-grown from documented heirloom seed stock. New-crop programme — each bag is from the most recent harvest, minimising time between field and consumer. No declared synthetic inputs. No certified organic status on most lots.",
    PillarFair:  "Rancho Gordo contracts with a network of small California farms. Direct-to-consumer distribution. The company's founding mission was specifically to revive heirloom bean cultivation and support small growers who cannot compete with commodity bean pricing.",
    PillarTrue:  "'Heirloom' reflects documented heritage seed lineage — this is not a legally regulated term in the US, but Rancho Gordo's seed provenance records are publicly described. Runner bean (Phaseolus coccineus) is a distinct species from the common bean (P. vulgaris). Flavour descriptions are consensus sensory notes from the culinary community." },

  { Name: 'Marcella Bean',
    Category: 'legumes', Status: 'approved',
    PillarGood:  "Italian cannellini-type heirloom (Phaseolus vulgaris), grown from Italian heritage seed stock on California farms. Exceptionally thin skin, creamy interior, mild clean flavour. Named with the endorsement of Marcella Hazan.",
    PillarClean: "Grown from documented Italian heritage seed. California-grown. New-crop annually. No synthetic additives. Rancho Gordo new-crop system means beans ship from the most recent harvest.",
    PillarFair:  "Same Rancho Gordo small-farm model. Naming acknowledges Marcella Hazan's role in encouraging cultivation of this variety for the US market.",
    PillarTrue:  "The Marcella is a distinct Italian heirloom variety, not a commodity cannellini bean. Cannellini-type is an accurate descriptive term. The variety's Italian seed origin is documented in Rancho Gordo's published catalogue history." },

  { Name: 'Rio Zape Bean',
    Category: 'legumes', Status: 'approved',
    PillarGood:  "Pinto-family heirloom, the founding variety of Rancho Gordo (introduced 2001). Distinguished by a rich, dark bean broth with documented sensory notes of chocolate and coffee — the result of the variety's distinct polyphenol composition, not added flavourings.",
    PillarClean: "Heritage seed of documented Hopi origin. California-grown. New-crop annually. No additives.",
    PillarFair:  "Rio Zape seed was sourced from Hopi farming communities. Rancho Gordo acknowledges the Indigenous origin of the variety in published company history and product descriptions.",
    PillarTrue:  "Flavour notes (chocolate, coffee) are derived from the bean's polyphenol and amino acid composition — not added ingredients. Pinto-family classification is botanical. The company's acknowledgement of Hopi origin is published but no formal benefit-sharing arrangement with the Hopi Nation is publicly documented." },

  { Name: 'Christmas Lima Bean',
    Category: 'legumes', Status: 'approved',
    PillarGood:  "Heirloom large lima bean (Phaseolus lunatus) with distinctive burgundy-and-cream marbling. Chestnut-like texture and earthy sweetness distinct from standard lima varieties. New-crop annually.",
    PillarClean: "Heritage seed. California-grown. New-crop. No additives. Marbling is a genetic characteristic of the variety, not a colouring or treatment.",
    PillarFair:  "Same California small-farm partnership model.",
    PillarTrue:  "Lima bean (Phaseolus lunatus) is a distinct species from the common bean. Christmas Lima's chestnut flavour is a documented characteristic of the variety's genetic composition. The burgundy-and-cream pattern fades during cooking — this is a natural characteristic disclosed by Rancho Gordo." },

  { Name: 'Royal Corona Bean',
    Category: 'legumes', Status: 'approved',
    PillarGood:  "Giant heirloom runner bean (Gigante-type, Phaseolus coccineus), California-grown from Greek heritage seed lineage. Thick-skinned exterior becomes creamy with extended cooking. One of Rancho Gordo's highest-volume products by unit sales.",
    PillarClean: "Heritage Greek-lineage seed. California-grown. New-crop annually. No additives.",
    PillarFair:  "Same California farm partnership model. High sales volume of this variety supports continued cultivation by partnering farms.",
    PillarTrue:  "'Royal Corona' is Rancho Gordo's varietal name for their California-grown Gigante-type bean. Gigante is a descriptive term for large-seeded Phaseolus coccineus grown in Greece — the California-grown version uses authentic seed stock but has no Greek geographic certification." },

  { Name: 'Scarlet Runner Bean',
    Category: 'legumes', Status: 'approved',
    PillarGood:  "Large runner bean (Phaseolus coccineus) with distinctive black-and-purple marbling. Firm texture that holds shape through extended cooking. Pronounced savoury, earthy character. Frequently cited by professional chefs in California cuisine.",
    PillarClean: "Heritage seed. California-grown. New-crop annually. No additives. Marbling is a genetic characteristic.",
    PillarFair:  "California farming partnerships. No third-party certification.",
    PillarTrue:  "Scarlet Runner is a distinct botanical species (Phaseolus coccineus) from common beans (P. vulgaris). Texture and flavour comparisons cited in culinary reviews are sensory descriptors, not substantiated by objective measurement." },

  { Name: 'Ayocote Morado Bean',
    Category: 'legumes', Status: 'approved',
    PillarGood:  "Mexican heirloom runner bean from the state of Guanajuato, sourced through the Rancho Gordo-Xoxoc Project. Large, purple-black seed. Thick skin becomes creamy with extended cooking. Produces a rich, dark bean broth.",
    PillarClean: "Sourced through a documented procurement partnership (Rancho Gordo-Xoxoc Project) with Mexican indigenous farming communities. No declared synthetic inputs. 'Ayocote' is the Nahuatl name for this runner bean class.",
    PillarFair:  "The Rancho Gordo-Xoxoc Project is a published direct-trade programme creating economic relationships with Mexican indigenous heirloom bean growers. Programme documentation describes pricing structure and community partnerships.",
    PillarTrue:  "Ayocote (Phaseolus coccineus) is the Nahuatl designation for this class of runner bean. The variety's origin in Guanajuato is documented through Xoxoc Project sourcing records. Bean broth richness is a sensory characteristic of this cultivar, not an additive." },

  { Name: 'Cassoulet (Tarbais) Bean',
    Category: 'legumes', Status: 'approved',
    PillarGood:  "California-grown from authentic French Tarbais seed stock. Thin-skinned, low-starch, creamy interior. The traditional bean for cassoulet in Languedoc. Adapted to California growing conditions while retaining the seed lineage.",
    PillarClean: "French Tarbais heritage seed. California-grown. New-crop annually. No additives.",
    PillarFair:  "California farming partnerships. No IGP certification.",
    PillarTrue:  "The California-grown bean uses authentic Tarbais seed stock but does not carry IGP Haricot Tarbais designation, which requires French geographic origin. Rancho Gordo's labelling accurately states 'West Coast-grown from classic French Tarbais seed stock.' The French IGP distinction is a meaningful one and is not obscured." },

  { Name: 'Yellow Eye Bean',
    Category: 'legumes', Status: 'approved',
    PillarGood:  "Classic New England heirloom baked-bean variety (Phaseolus vulgaris). Creamy, mild, versatile. Produces a rich bean broth. The traditional primary variety for Boston-style baked beans, documented in New England foodways literature.",
    PillarClean: "Heritage seed, New England lineage. California-grown. New-crop annually. No additives.",
    PillarFair:  "California farming partnerships. No third-party certification.",
    PillarTrue:  "Yellow Eye has a documented New England culinary history. The variety is named for its yellow marking around the eye of the seed — a genetic characteristic. Culinary heritage claims are verifiable through historical cookery records." },

  { Name: 'Hidatsa Red Bean',
    Category: 'legumes', Status: 'approved',
    PillarGood:  "Native American heirloom (Phaseolus vulgaris), preserved by the Hidatsa people of the northern Great Plains. Thin skin, dense yet creamy interior. Unusual sensory profile in the red bean category.",
    PillarClean: "Indigenous heritage seed, Hidatsa tribal origin, North Dakota. California-grown. New-crop. No additives.",
    PillarFair:  "The Hidatsa Red bean was preserved through generations of Hidatsa tribal farming. Rancho Gordo acknowledges the Indigenous origin of the variety in product documentation. No formal benefit-sharing or royalty arrangement with the Hidatsa Nation is publicly documented.",
    PillarTrue:  "The variety's tribal origin is documented in ethnobotanical literature and USDA GRIN (Germplasm Resources Information Network) records. 'Hidatsa Red' is a descriptive name, not a trademarked designation." },

  // ─── GRAINS +10 — TIMELESS SEEDS + ANSON MILLS ──────────────────────────

  { Name: 'Timeless Pardina Lentils',
    Category: 'grains', Status: 'approved',
    PillarGood:  "Spanish Pardina (small brown) lentil variety, grown on dryland prairie farms in north-central Montana. Nutty, earthy flavour. Holds shape well after cooking — suited to salads and side dishes. Grown without irrigation.",
    PillarClean: "Grown by Timeless Seeds farmer cooperative, Conrad, Montana. Non-GMO. Dryland (rainfed) cultivation — no irrigation. No declared synthetic inputs. Certification status varies by production year.",
    PillarFair:  "Timeless Seeds is a farmer-owned cooperative founded in 1987. Cooperative structure means revenue is distributed to member growers. Direct-to-consumer and specialty retail distribution.",
    PillarTrue:  "Pardina is a Spanish heirloom lentil cultivar. Montana-grown Pardinas share the botanical lineage but are adapted to dryland prairie conditions; they are not imported from Spain. 'Nutty flavour' is a documented sensory characteristic of the Pardina cultivar." },

  { Name: 'Timeless Black Beluga Lentils',
    Category: 'grains', Status: 'approved',
    PillarGood:  "Black Beluga lentil variety, Montana dryland farms. The smallest commercially available lentil in the US market. Holds its shape and colour through cooking. Dense, earthy flavour. High iron and protein relative to body mass.",
    PillarClean: "Timeless Seeds cooperative, Montana. Non-GMO. Dryland cultivation. No declared synthetic inputs.",
    PillarFair:  "Same cooperative structure as all Timeless Seeds products.",
    PillarTrue:  "'Beluga' is a descriptive name referencing the seed's visual resemblance to Beluga caviar — there is no connection to sturgeon or caviar products. Shape retention after cooking is a documented characteristic of the cultivar's thin but intact seed coat." },

  { Name: 'Timeless French Green Lentils',
    Category: 'grains', Status: 'approved',
    PillarGood:  "Puy-type green lentil variety, Montana dryland farms. Slate-green colour, peppery flavour, firm texture after cooking. Suited to applications where lentil integrity is required.",
    PillarClean: "Timeless Seeds cooperative, Montana. Non-GMO. Dryland cultivation.",
    PillarFair:  "Same cooperative model.",
    PillarTrue:  "'French-style' refers to the Puy-type cultivar, not geographic origin in France. Lentilles du Puy carry an AOC designation tied to French geographic production — this Montana-grown product does not hold that designation, and no such claim is made." },

  { Name: 'Timeless Emmer Farro',
    Category: 'grains', Status: 'approved',
    PillarGood:  "Emmer wheat (Triticum dicoccum), one of the earliest domesticated grains (~10,000 years ago). Montana dryland grown. Higher protein and fibre than modern common wheat. Nutty, chewy texture. The historical grain of ancient Mediterranean civilisations.",
    PillarClean: "Timeless Seeds cooperative, Montana. Non-GMO. Dryland cultivation. No synthetic inputs declared. Contains gluten.",
    PillarFair:  "Cooperative model supports Montana dryland farmers cultivating heritage non-commodity crops ineligible for federal price support programmes.",
    PillarTrue:  "Emmer (Triticum dicoccum) is a diploid ancient wheat species, botanically and nutritionally distinct from spelt (T. spelta), einkorn (T. monococcum), and modern bread wheat (T. aestivum). Its gluten structure differs from modern wheat but emmer is not gluten-free." },

  { Name: 'Timeless Crimson Lentils',
    Category: 'grains', Status: 'approved',
    PillarGood:  "Red split lentil variety, Montana dryland farms. Hulled and split for fast cooking (15–20 minutes without soaking). Bright red in dry form; turns golden-yellow when cooked. High protein.",
    PillarClean: "Timeless Seeds cooperative, Montana. Non-GMO. Dryland cultivation. No declared synthetic inputs. Split and hulled during processing.",
    PillarFair:  "Same cooperative structure.",
    PillarTrue:  "'Crimson' is Timeless Seeds' varietal designation. All red split lentils are hulled and split during processing — the red outer seed coat is removed, resulting in the characteristic golden colour after cooking. This is a processing characteristic, not a colour additive." },

  { Name: 'Anson Mills Antebellum Coarse Grits',
    Category: 'grains', Status: 'approved',
    PillarGood:  "Milled from Carolina Gourdseed White corn, a documented pre-Civil War dent corn heirloom. Stone-milled at Anson Mills, Columbia, South Carolina. Germ-on milling retains fat and flavour compounds absent in commodity grits. Requires refrigeration.",
    PillarClean: "Single heirloom variety: Carolina Gourdseed White. Stone-milled at Anson Mills. No additives, preservatives, or anti-caking agents. Refrigeration required due to germ-on processing — the presence of the germ causes oxidation at room temperature.",
    PillarFair:  "Anson Mills (Glenn Roberts, founded 1998) contracts with South Carolina farmers to grow heritage grain varieties through a documented direct-procurement model. Farmers grow non-commodity crops that carry no federal price supports.",
    PillarTrue:  "Anson Mills grits behave differently from commodity grits due to germ-on stone milling — cooking times and liquid ratios differ substantially. Anson Mills states this explicitly and provides specific recipes. Standard supermarket grits cannot be substituted in Anson Mills recipes." },

  { Name: 'Anson Mills Carolina Gold Rice',
    Category: 'grains', Status: 'approved',
    PillarGood:  "Carolina Gold long-grain rice (Oryza sativa), the principal rice of American colonial-era agriculture (late 17th–early 19th centuries). Starchier, more aromatic, and more complex in flavour than modern long-grain varieties. Grown in South Carolina Lowcountry.",
    PillarClean: "Single heirloom variety: Carolina Gold (Oryza sativa subsp. indica). Grown and milled in South Carolina. No additives. Stone-milled.",
    PillarFair:  "Anson Mills partners with a small number of Carolina Lowcountry rice growers to sustain the variety. The Carolina Gold Rice Foundation (nonprofit) supports seed preservation and farmer recruitment. Both organisations are publicly documented.",
    PillarTrue:  "Carolina Gold was documented as nearly extinct by the mid-20th century. Its revival is recorded in agricultural history literature and supported by USDA GRIN records. Cooking behaviour (elevated starch, distinct aroma) differs substantially from commodity long-grain rice — this is a documented varietal characteristic, not a marketing claim." },

  { Name: 'Anson Mills Farro Piccolo (Einkorn)',
    Category: 'grains', Status: 'approved',
    PillarGood:  "Einkorn wheat (Triticum monococcum), the oldest cultivated wheat species. South Carolina-grown under Anson Mills' heritage grain programme. Farro piccolo is the smallest of the three farro types. Nutty, slightly sweet flavour. High protein.",
    PillarClean: "Single ancient grain variety: Triticum monococcum. South Carolina grown. No additives. Contains gluten.",
    PillarFair:  "South Carolina farmer network contracted by Anson Mills. Heritage grain cultivation supports non-commodity agricultural diversification in a state with a documented foodways heritage tied to these crops.",
    PillarTrue:  "'Farro piccolo' is the Italian designation for einkorn, accurately identifying it as distinct from farro medio (emmer/T. dicoccum) and farro grande (spelt/T. spelta). Einkorn has a different gluten structure from modern hexaploid bread wheat (T. aestivum), but is not gluten-free — it contains gluten-forming proteins." },

  { Name: 'Anson Mills Stone Cut Oats',
    Category: 'grains', Status: 'approved',
    PillarGood:  "Heritage oat variety, stone-cut (not rolled or steamed). Germ-on processing retains fat and flavour compounds. South Carolina grown. Requires longer cooking than rolled oats — produces a more complex, nutty flavour profile.",
    PillarClean: "Heritage oat variety. South Carolina grown under Anson Mills' programme. Stone-milled. No additives. Refrigeration recommended due to germ-on processing.",
    PillarFair:  "Same Anson Mills South Carolina farmer partnership network. Heritage oat cultivation.",
    PillarTrue:  "Stone-cut (steel-cut) oats differ structurally from rolled oats: cutting rather than steaming and rolling preserves more intact cellular architecture, affecting cooking properties and flavour. 'Heritage variety' reflects Anson Mills' seed programme — the specific cultivar should be confirmed on current product labelling." },

  { Name: 'Anson Mills Rouge de Bordeaux Bread Flour',
    Category: 'grains', Status: 'approved',
    PillarGood:  "Rouge de Bordeaux wheat (Triticum aestivum), a 19th-century French bread wheat heirloom. Stone-milled at Anson Mills. Higher protein than most heritage wheats. Reddish bran, deep flavour. South Carolina grown.",
    PillarClean: "Single heirloom variety: Rouge de Bordeaux. South Carolina grown. Stone-milled. No bleaching, bromation, or additives. Contains gluten.",
    PillarFair:  "Same Anson Mills farmer partnership model. Heritage wheat cultivation in the American South supports growers outside the commodity wheat market.",
    PillarTrue:  "Rouge de Bordeaux is documented in French agricultural records from the 19th century. Its protein structure and baking behaviour differ from standard modern bread flours — the flour does not perform identically to commercial bread flour in standard recipes. Anson Mills states this and provides specific formulations." },

  // ─── SEAFOOD +10 — VITAL CHOICE ──────────────────────────────────────────

  { Name: 'Vital Choice Wild Sockeye Salmon Fillets',
    Category: 'seafood', Status: 'approved',
    PillarGood:  "Wild Alaskan Sockeye (Oncorhynchus nerka). MSC certified. Documented omega-3 content approximately 1,900 mg per 3oz serving. Bright red flesh from natural astaxanthin derived from krill and shrimp diet. Alaska harvest season: June–September.",
    PillarClean: "Marine Stewardship Council (MSC) certified fishery. Wild-caught in Alaskan waters — not farmed. No added water, phosphates, or preservatives. Single ingredient. Frozen at sea to maintain quality.",
    PillarFair:  "Vital Choice sources from Alaska Native-owned and independent fishing operations. No third-party Fairtrade certification specific to seafood.",
    PillarTrue:  "'Wild' designation is legally protected in the US — farmed salmon cannot be sold as wild-caught. Sockeye's red flesh colour is natural astaxanthin from diet, not added colouring (farmed Atlantic salmon typically receives synthetic astaxanthin feed additives). Omega-3 content figure is from published nutritional analysis of the species." },

  { Name: 'Vital Choice Wild King Salmon Fillets',
    Category: 'seafood', Status: 'approved',
    PillarGood:  "Wild Alaskan Chinook/King Salmon (Oncorhynchus tshawytscha). Highest fat content of any Pacific salmon species — approximately 2,700 mg omega-3 per 3oz. Rich, buttery texture. Troll-caught (hook and line). Alaska.",
    PillarClean: "Wild-caught, Alaska. Troll-caught — the most selective commercial method, with minimal bycatch and no habitat damage. No additives. Frozen at sea.",
    PillarFair:  "Troll fishing is conducted by small independent fishing vessels. Vital Choice's sourcing from troll fishermen supports small-boat independent fishing operations.",
    PillarTrue:  "King Salmon has the highest omega-3 content among Pacific salmon species — documented in USDA nutritional databases. Troll-catching method is more selective than seine or gillnet — this distinction is substantiated by fisheries science literature. Season and quota managed by NOAA Fisheries." },

  { Name: 'Vital Choice Wild Coho Salmon Fillets',
    Category: 'seafood', Status: 'approved',
    PillarGood:  "Wild Alaskan Coho (Oncorhynchus kisutch). Moderate fat content (~900 mg omega-3/3oz). Firm flesh, milder flavour than Sockeye. Troll-caught. Season: August–September. MSC certified.",
    PillarClean: "Wild-caught, Alaska. Troll-caught. MSC certified fishery. No additives. Frozen at sea.",
    PillarFair:  "Same small-vessel troll fishery model as King Salmon sourcing.",
    PillarTrue:  "Coho omega-3 content (900 mg/3oz) is lower than King (~2,700 mg) but higher than Pink (~400 mg) — species-level differences documented in USDA nutritional records. Flavour profile differences between salmon species are documented in published sensory analyses." },

  { Name: 'Vital Choice Wild Alaskan Halibut Fillets',
    Category: 'seafood', Status: 'approved',
    PillarGood:  "Pacific Halibut (Hippoglossus stenolepis), Alaska. Firm, white, mild-flavoured lean fish. High protein (~21g/3oz), low fat. Hook-and-line caught. Quota-managed by the International Pacific Halibut Commission (IPHC).",
    PillarClean: "Wild-caught, Alaska. Hook and line — the most selective commercial gear type. No additives. IPHC quota compliance publicly auditable. No phosphate treatments.",
    PillarFair:  "Alaska halibut fishery conducted by quota-holding independent fishermen through an IFQ (individual fishing quota) system. No third-party Fairtrade certification.",
    PillarTrue:  "Pacific Halibut (Hippoglossus stenolepis) is a distinct species from Atlantic Halibut (H. hippoglossus), which carries an Endangered rating. IPHC annual quota and allocation decisions are published. Hook-and-line catching method is disclosed and is accurately described as selective." },

  { Name: 'Vital Choice Wild Alaskan Sablefish (Black Cod)',
    Category: 'seafood', Status: 'approved',
    PillarGood:  "Sablefish (Anoplopoma fimbria), Alaska. Exceptionally rich fat profile (~18–20% fat by weight) producing characteristic buttery texture. Documented omega-3 content approximately 1,600 mg per 3oz. Deep-water species. Hook and line or pot-caught.",
    PillarClean: "Wild-caught, Alaska. Hook and line or pot-caught gear. No additives. MSC certified fishery. Frozen at sea.",
    PillarFair:  "Alaska sablefish IFQ system supports small-vessel operators. No third-party Fairtrade certification.",
    PillarTrue:  "'Black Cod' is a market name — sablefish is not a true cod (family Gadidae). The species' buttery texture is attributable to its high fat content (18–20%), not preparation. This is disclosed in Vital Choice product descriptions." },

  { Name: 'Vital Choice Wild Pacific Albacore Tuna',
    Category: 'seafood', Status: 'approved',
    PillarGood:  "Albacore Tuna (Thunnus alalunga), Pacific Ocean. Troll or pole-and-line caught. 'White tuna' — lighter flesh than skipjack. Omega-3 content approximately 800 mg per 3oz. Each lot tested for mercury.",
    PillarClean: "Wild-caught, Pacific. Pole-and-line or troll — no longline bycatch. No added water or preservatives. BPA-free can. Single ingredient (tuna, plus optional salt).",
    PillarFair:  "Pacific albacore troll fishery supports independent fishing families on the US West Coast. No third-party Fairtrade certification.",
    PillarTrue:  "Pacific Albacore is not the same as 'light tuna' (typically skipjack, T. albacares). Albacore mercury content is higher than skipjack per FDA data — this is a relevant disclosure for certain populations. Vital Choice tests each lot for mercury and publishes results, providing verifiable evidence for safety claims." },

  { Name: 'Vital Choice Wild Pink Salmon (Canned)',
    Category: 'seafood', Status: 'approved',
    PillarGood:  "Pink Salmon (Oncorhynchus gorbuscha), Alaska. Most abundant Pacific salmon species. Mild flavour. Canned with skin and bones intact — a significant natural calcium source. Omega-3 approximately 400 mg per 3oz.",
    PillarClean: "Wild-caught, Alaska. BPA-free can. No additives beyond optional salt. Skin and bones are included and are explicitly disclosed on the label as edible and calcium-rich.",
    PillarFair:  "Alaska Pink Salmon is primarily a purse-seine fishery — a larger-scale commercial gear type than troll. No small-vessel premium equivalent to troll fisheries.",
    PillarTrue:  "Pink Salmon has lower omega-3 content than Sockeye or King — this is a documented species-level difference in USDA databases, not a quality issue. Inclusion of skin and bones significantly increases calcium content relative to bone-free products — this is factual and disclosed." },

  { Name: 'Vital Choice Wild Dungeness Crab Meat',
    Category: 'seafood', Status: 'approved',
    PillarGood:  "Dungeness Crab (Metacarcinus magister), Pacific Northwest. Considered the most prized commercially available crab in the western US for its sweet, mild flavour and high meat-to-shell ratio. Trap-caught. Hand-picked.",
    PillarClean: "Wild-caught, Pacific Northwest. Trap-caught gear. Hand-picked crab meat. Pasteurised for shelf stability. No additives beyond salt.",
    PillarFair:  "Dungeness crab fishery managed by California DFG, Oregon DFW, and Washington DFW. Independent commercial fishing operations. No third-party Fairtrade certification.",
    PillarTrue:  "Dungeness crab fisheries have faced documented recurring closures on the California coast due to humpback whale entanglement risk. Vital Choice sources from seasons and areas open under current state management orders — current season status should be confirmed. Pasteurised canned crab is a distinct product from fresh-cooked crab." },

  { Name: 'Vital Choice Wild Alaskan Spot Prawns',
    Category: 'seafood', Status: 'approved',
    PillarGood:  "Spot Prawns (Pandalus platyceros), Alaska. Considered the finest commercially available shrimp in North America for naturally sweet, delicate flavour. Trap-caught. Very limited commercial fishery — genuinely boutique-scale production.",
    PillarClean: "Wild-caught, Alaska. Trap-caught — minimal bycatch. No additives. Frozen immediately at sea: spot prawns must be frozen or beheaded immediately after catch because enzymes in the head rapidly degrade the flesh if left intact.",
    PillarFair:  "Alaska spot prawn fishery is an IFQ-managed boutique fishery conducted by independent operators. No third-party Fairtrade certification.",
    PillarTrue:  "Spot prawns undergo documented rapid enzymatic degradation if not immediately frozen or beheaded at sea — this is a biological fact that explains why fresh head-on spot prawns are rarely available outside the immediate catch area. Quality is directly linked to handling speed. This is disclosed by Vital Choice." },

  { Name: 'Vital Choice Wild Sockeye Salmon Roe (Ikura)',
    Category: 'seafood', Status: 'approved',
    PillarGood:  "Sockeye salmon roe (ikura), Alaska. Hand-sorted, individually intact eggs. Natural bright red-orange colour from dietary astaxanthin. Salt-cured only — no artificial colour, MSG, or preservatives.",
    PillarClean: "Wild-caught, Alaska. Ingredients: salmon roe, salt. No artificial colourants, preservatives, or MSG. Non-pasteurised — requires freezing for storage.",
    PillarFair:  "Roe harvesting is part of the established Alaska salmon harvest. Collection does not require additional fishing effort — roe is recovered from fish already caught under existing quota. No third-party Fairtrade certification.",
    PillarTrue:  "Salmon roe colour is natural astaxanthin from the fish's diet, not added colouring — a distinction from some processed roe products that use artificial dye to standardise colour. 'Ikura' is the Japanese culinary term for salmon roe, used here as a descriptor. Salt is the only additive; product is not cured with nitrates." },

  // ─── SNACKS +10 ──────────────────────────────────────────────────────────

  { Name: 'Hu Kitchen Simple Dark Chocolate Bar',
    Category: 'snacks', Status: 'approved',
    PillarGood:  "Organic cacao, minimum 70% cacao content. No refined sugar (sweetened with organic coconut sugar). No dairy, soy lecithin, or emulsifiers. Paleo. Vegan. Simple, recognisable ingredient list.",
    PillarClean: "USDA Organic certified. Non-GMO. Ingredients: organic cacao mass, organic coconut sugar, organic cacao butter. Stated sourcing from traceable cacao origins.",
    PillarFair:  "Hu Kitchen discloses sourcing from Rainforest Alliance certified farms. No Fairtrade certification on this product. New York-based brand.",
    PillarTrue:  "'No refined sugar' is accurate — coconut sugar is the sweetener. Coconut sugar has a lower glycaemic index than cane sugar but is not sugar-free and contributes comparable caloric content per gram. No sugar-free claim is made." },

  { Name: 'Hu Kitchen Almond Butter Dark Chocolate Bar',
    Category: 'snacks', Status: 'approved',
    PillarGood:  "70%+ organic dark chocolate with organic almond butter filling. No refined sugar, no soy lecithin, no emulsifiers, no dairy. Paleo. Vegan.",
    PillarClean: "USDA Organic certified. Non-GMO. Ingredients: organic chocolate, organic almond butter, organic coconut sugar, sea salt. Almond butter content stated on label.",
    PillarFair:  "Same Rainforest Alliance sourcing disclosure as the Simple bar. Hu Kitchen brand.",
    PillarTrue:  "'Paleo-friendly' reflects absence of grains and dairy — not a regulated certification. Almond butter is the primary filling ingredient and a major tree-nut allergen — disclosed on label and in major allergen statement." },

  { Name: 'Siete Grain-Free Tortilla Chips',
    Category: 'snacks', Status: 'approved',
    PillarGood:  "Cassava-flour-based tortilla chips fried or baked in avocado oil. Grain-free. Gluten-free. Founded by the Garza family of San Antonio to serve a family with multiple food sensitivities — the origin story is publicly documented.",
    PillarClean: "Non-GMO Project Verified. No artificial flavours or preservatives. Ingredients: cassava flour, avocado oil, sea salt, lime (flavour-dependent). No grain-derived ingredients.",
    PillarFair:  "Siete Foods is a family-owned company (Garza family). No third-party Fairtrade certification. Non-GMO cassava sourcing.",
    PillarTrue:  "'Grain-free' is accurate — cassava (Manihot esculenta) is a root vegetable, not a grain. The chips are not low-carbohydrate; cassava is a high-starch food comparable in carbohydrate content to grain-based chips." },

  { Name: 'LesserEvil Organic Himalayan Pink Salt Popcorn',
    Category: 'snacks', Status: 'approved',
    PillarGood:  "Organic popcorn, popped in organic coconut oil. USDA Organic. Non-GMO Project Verified. Compostable bag. Simple three-ingredient formulation.",
    PillarClean: "USDA Organic certified. Non-GMO Project Verified. Ingredients: organic popcorn, organic coconut oil, Himalayan pink salt. No artificial flavours, colours, or preservatives.",
    PillarFair:  "LesserEvil is a Connecticut-based B Corp certified company. B Corp verification by B Lab (third-party audit). Organic popcorn sourcing supports certified organic corn farming.",
    PillarTrue:  "'Himalayan pink salt' is mined from the Khewra Salt Mine, Pakistan. The pink colour derives from iron oxide. Marketing claims about trace minerals in Himalayan pink salt are technically accurate but nutritionally negligible at serving-size quantities. B Corp certification is independently verified." },

  { Name: 'Barnana Organic Plantain Chips',
    Category: 'snacks', Status: 'approved',
    PillarGood:  "Organic plantains, sliced and fried in organic oil. USDA Organic. Non-GMO. Naturally high potassium. Savoury-sweet profile from ripe or green plantain (variety-dependent).",
    PillarClean: "USDA Organic certified. Non-GMO. Ingredients: organic plantains, organic oil, sea salt. Latin American organic plantain farm sourcing stated.",
    PillarFair:  "Barnana states commitment to supporting organic farming communities in Latin America. No third-party Fairtrade certification. Organic certification supports certified farming practices.",
    PillarTrue:  "Plantains (Musa paradisiaca) are botanically related to bananas but are a distinct culinary category — starchier and less sweet than dessert bananas. 'Organic' certification applies to plantains and frying oil per USDA scope." },

  { Name: 'Simple Mills Almond Flour Crackers',
    Category: 'snacks', Status: 'approved',
    PillarGood:  "Almond flour-based crackers with sunflower seeds, flaxseeds, and tapioca starch. Grain-free. Gluten-free. Non-GMO. Simple ingredient formulation.",
    PillarClean: "Non-GMO Project Verified. Ingredients: almond flour, tapioca starch, sunflower seeds, flaxseeds, sea salt, rosemary extract. No artificial preservatives or flavours. Rosemary extract serves as a natural antioxidant.",
    PillarFair:  "Simple Mills, Chicago. Sourcing from non-GMO certified almond growers. No third-party Fairtrade certification.",
    PillarTrue:  "'Grain-free' is accurate — almond flour and cassava/tapioca are not grain-derived. The crackers are not nut-free — almond flour is the primary ingredient and is a major tree-nut allergen. This is disclosed prominently." },

  { Name: 'Navitas Organics Cacao Blueberry Power Snack',
    Category: 'snacks', Status: 'approved',
    PillarGood:  "Organic cacao powder, organic blueberries, organic dates, and seeds in a bite-sized snack format. USDA Organic. Non-GMO. High antioxidant content from cacao flavanols and blueberry anthocyanins.",
    PillarClean: "USDA Organic certified. Non-GMO Project Verified. Ingredients: organic dates, organic cacao powder, organic blueberries, organic hemp seeds, organic sesame seeds. No added refined sugar.",
    PillarFair:  "Navitas Organics sources cacao from certified organic farms in Peru and Ecuador. Published sourcing commitments. No Fairtrade certification on all products.",
    PillarTrue:  "Dates are the primary sweetening ingredient — the product contains natural sugars from dates and is not sugar-free. No added refined sugar is accurate. Antioxidant content (flavanols, anthocyanins) is documented for cacao and blueberry but specific per-serving quantities should be confirmed from current nutritional analysis." },

  { Name: "Kate's Real Food Lemon Coconut Bar",
    Category: 'snacks', Status: 'approved',
    PillarGood:  "Whole-food energy bar made with organic rolled oats, organic honey, organic coconut, and lemon. USDA Organic. Non-GMO. Simple ingredient list — all recognisable whole-food ingredients. Made in Jackson Hole, Wyoming.",
    PillarClean: "USDA Organic certified. Non-GMO Project Verified. Ingredients: organic rolled oats, organic honey, organic coconut, organic lemon, sea salt. No artificial ingredients. Honey origin not specified by source region.",
    PillarFair:  "Kate's Real Food is a small Vermont-founded company. No third-party Fairtrade certification.",
    PillarTrue:  "'Real food' is a marketing descriptor without regulatory definition. The ingredient list is composed entirely of recognisable whole foods — this is a verifiable claim. Contains oats: not recommended for coeliac patients unless the product is specifically certified gluten-free, as oats are subject to cross-contamination." },

  { Name: 'Fly By Jing Sichuan Chili Crisp',
    Category: 'snacks', Status: 'approved',
    PillarGood:  "Sichuan-style chili oil condiment made with Sichuan peppercorns, chili, fermented black bean paste, and aromatics. Non-GMO. Gluten-free (tamari-based). Umami-forward. No added MSG — glutamates are naturally present from fermented black bean paste.",
    PillarClean: "Non-GMO. Gluten-free. Ingredients: avocado oil, chilis, onion, tamari, Sichuan peppercorns, black bean paste, spices. No artificial flavours or colours.",
    PillarFair:  "Fly By Jing founded 2019 by Jing Gao (Chengdu). Sichuan peppercorns and chilis sourced from Sichuan province. No third-party Fairtrade certification.",
    PillarTrue:  "'No added MSG' is accurate — umami is derived from naturally occurring glutamates in fermented black bean paste, not added monosodium glutamate. Sichuan peppercorn (Zanthoxylum bungeanum) is not a true pepper; its characteristic numbing sensation (málà) derives from hydroxy-alpha-sanshool, not capsaicin." },

  { Name: 'Primal Kitchen Dark Chocolate Almond Bar',
    Category: 'snacks', Status: 'approved',
    PillarGood:  "Organic dark chocolate with organic almond butter and grass-fed bovine collagen peptides. No refined sugar (organic coconut sugar and dates). Paleo-friendly. Grain-free.",
    PillarClean: "Non-GMO Project Verified. No soy, dairy, or grain. Ingredients: organic almond butter, organic dark chocolate, grass-fed collagen peptides, organic dates, organic coconut sugar.",
    PillarFair:  "Primal Kitchen, Oxnard, California. Grass-fed collagen sourced from Brazil. No third-party Fairtrade certification. Collagen source is not currently deforestation-free certified on all lots.",
    PillarTrue:  "'Grass-fed collagen' does not imply 100% grass-finished in the Brazilian context — cattle are typically pasture-raised but may receive supplemental feed. 'Paleo-friendly' is a market category designation, not a regulated certification. Collagen peptides contribute protein but are not a complete protein source (lacking tryptophan)." },

  // ─── LOW & NO ALCOHOL +10 — PROOFNOMORE ─────────────────────────────────

  { Name: 'GO Brewing Sunbeam Pils',
    Category: 'lna', Status: 'approved',
    PillarGood:  "Non-alcoholic Pilsner-style brew from GO Brewing, Naperville, Illinois. Below 0.5% ABV. Traditional Pilsner malt and hop character in a craft NA format. Independent US craft NA brewery.",
    PillarClean: "US-produced. Independent craft brewery. Ingredients: water, malted barley, hops, yeast. No added sugars or artificial flavouring declared.",
    PillarFair:  "GO Brewing is an independent craft NA brewery. No third-party fair trade certification.",
    PillarTrue:  "0.5% ABV is the US regulatory threshold for 'non-alcoholic' designation. Trace alcohol is a natural byproduct of yeast fermentation and cannot be completely eliminated in brewed products without de-alcoholisation processing." },

  { Name: 'Momentum Brewery Hazy IPA',
    Category: 'lna', Status: 'approved',
    PillarGood:  "Non-alcoholic Hazy IPA (New England-style) from Momentum Brewery. Below 0.5% ABV. Tropical hop aroma from Citra, Mosaic, or equivalent hop varieties. Craft NA formulation.",
    PillarClean: "US-produced. Craft NA brewery. Ingredients: water, malted barley, hops, yeast. No artificial flavours.",
    PillarFair:  "Independent craft NA brewery.",
    PillarTrue:  "'Hazy IPA' is a legitimate beer style category characterised by unfiltered, dry-hopped production resulting in turbidity and elevated hop aroma. The style designation reflects production method, not a marketing term without defined meaning." },

  { Name: 'Collective Arts Surreal Perpetual Paloma',
    Category: 'lna', Status: 'approved',
    PillarGood:  "Non-alcoholic RTD cocktail — grapefruit and lime, zero proof. Produced under Collective Arts Brewing's Surreal NA series. Developed to replicate Paloma cocktail flavour profile in a carbonated RTD format.",
    PillarClean: "Zero proof (0.0% ABV). Ingredients: carbonated water, grapefruit juice, lime juice, natural flavours, citric acid. No alcohol. Vegan.",
    PillarFair:  "Collective Arts Brewing is a Canadian independent craft brewery (Hamilton, Ontario) with a documented programme of commissioning artwork from independent visual artists for product labels.",
    PillarTrue:  "'Zero proof' designates 0.0% ABV, distinct from 'non-alcoholic' which may contain up to 0.5% ABV. Grapefruit and lime juice are stated as ingredients — not flavour-only formulation." },

  { Name: 'Sober Carpenter Organic Session IPA',
    Category: 'lna', Status: 'approved',
    PillarGood:  "Non-alcoholic Organic Session IPA brewed in Quebec, Canada. Below 0.5% ABV. USDA Organic and Canada Organic certified. Session-style IPA with moderate bitterness and hop aroma.",
    PillarClean: "USDA Organic and Canada Organic certified. Non-GMO. Ingredients: organic water, organic malted barley, organic hops, yeast. No artificial additives.",
    PillarFair:  "Independent Canadian craft NA brewery. Organic certification supports organic grain cultivation.",
    PillarTrue:  "'Session' IPA designation reflects the style's lower bitterness and lighter body relative to standard IPA — a brewing style classification, not a reference to alcohol content. Both organic certifications are independently verified." },

  { Name: 'Woodland Farms Ruby Sour Ale',
    Category: 'lna', Status: 'approved',
    PillarGood:  "Non-alcoholic Sour Ale, 0.5% ABV, with deep ruby colour from fruit additions. Tart, complex profile from souring process. Craft NA formulation.",
    PillarClean: "Independent craft NA brewery. Ingredients: water, malted barley, wheat, hops, yeast, fruit. No artificial flavouring declared.",
    PillarFair:  "Independent craft NA brewery.",
    PillarTrue:  "'Sour Ale' is a legitimate beer style defined by intentional acidification, typically via Lactobacillus bacteria or equivalent souring cultures. The style is not sour from added acids alone in traditional production." },

  { Name: 'NON NON3 Toasted Cinnamon & Yuzu',
    Category: 'lna', Status: 'approved',
    PillarGood:  "Non-alcoholic still wine alternative. 0.0% ABV. Produced in Australia from grape-based fermentation with botanical additions. NON3 profile: bright, tart, with toasted spice and citrus character from yuzu and cinnamon.",
    PillarClean: "Vegan certified. Gluten-free. Halal certified. Ingredients: grape-based ferment, yuzu, cinnamon, complementary botanicals. No added sugar. 0.0% ABV.",
    PillarFair:  "NON (Non-Alcoholic Beverages) is an Australian-founded company. Grape base sourced from Australian producers. No third-party Fairtrade certification.",
    PillarTrue:  "NON products are not de-alcoholised wines — they are produced from the outset as 0.0% beverages through a distinct fermentation and botanical extraction process. This is accurately disclosed and is a meaningful distinction from alcohol-removed wine." },

  { Name: 'KIT NA Brewing On Your Mark Blonde',
    Category: 'lna', Status: 'approved',
    PillarGood:  "Non-alcoholic American Blonde Ale from KIT NA Brewing, Maine. Below 0.5% ABV. Crisp, sessionable character. Multiple NA beer competition awards.",
    PillarClean: "US-produced. Independent craft NA brewery, Maine. Ingredients: water, malted barley, hops, yeast.",
    PillarFair:  "Independent craft NA brewery, Maine.",
    PillarTrue:  "'Award-winning' claim references NA beer competition results. Specific competition sources should be confirmed against KIT NA's published award disclosures." },

  { Name: 'Recess Zero Proof Lime Margarita',
    Category: 'lna', Status: 'approved',
    PillarGood:  "Non-alcoholic margarita-style RTD. 0.0% ABV. Lime and agave flavour profile in carbonated format. No alcohol.",
    PillarClean: "Zero proof (0.0% ABV). Ingredients: carbonated water, lime juice, agave syrup, salt. No artificial flavours declared on standard label.",
    PillarFair:  "Recess, New York. Independent functional/NA beverage brand.",
    PillarTrue:  "'Zero proof' designates 0.0% ABV, distinct from 'non-alcoholic' (up to 0.5% ABV). 'Margarita' is used as a flavour descriptor for this non-alcoholic cocktail — no tequila or agave spirit content. Agave syrup is listed as a sweetening ingredient, not an indication of distilled agave spirit content." },

  { Name: 'BREZ Flow Functional Mushroom Drink',
    Category: 'lna', Status: 'approved',
    PillarGood:  "Functional non-alcoholic social tonic with lion's mane and reishi mushroom extracts, lemon, and elderberry. 0.0% ABV. Designed for mood support and social occasions. Carbonated.",
    PillarClean: "Ingredients: carbonated water, lion's mane extract, reishi extract, lemon juice, elderberry, natural botanicals. No alcohol. No artificial flavourings declared.",
    PillarFair:  "BREZ is a small US-based functional beverage brand. Mushroom extract sourcing not fully disclosed in publicly available documentation.",
    PillarTrue:  "Adaptogenic and functional mushroom claims (mood support, focus) are not FDA-evaluated health claims. Benefits attributed to lion's mane and reishi reflect traditional use and limited clinical literature, but are not established by double-blind RCTs at beverage-serving dose levels. No disease prevention or treatment claims are made on the label." },

  { Name: 'Leitz Eins Zwei Zero Sparkling Rosé',
    Category: 'lna', Status: 'approved',
    PillarGood:  "Dealcoholised sparkling rosé from Leitz Winzerei, Rüdesheim, Rheingau, Germany. 0.0% ABV. Pinot Noir base. Alcohol removed via vacuum distillation, preserving wine character while eliminating ethanol.",
    PillarClean: "German production. Named producer: Leitz Winzerei, Rüdesheim. Pinot Noir variety stated. 0.0% ABV verified. Vegan. No added sugar.",
    PillarFair:  "Leitz Winzerei is a fourth-generation family winery in the Rheingau, with documented history from 1744. No third-party Fairtrade certification.",
    PillarTrue:  "Dealcoholised wine is produced by first fermenting grapes into wine, then removing alcohol via vacuum distillation or spinning cone column, reducing ABV to below 0.05%. This is a distinct process from NON-style products produced without fermentation. Both categories are accurately described as 0.0% ABV but differ significantly in production method and flavour composition." },
]

async function createBatch(records) {
  const res  = await fetch(URL, {
    method: 'POST', headers: HEADERS,
    body: JSON.stringify({ records: records.map(r => ({ fields: r })) })
  })
  const data = await res.json()
  if (data.error) throw new Error(JSON.stringify(data.error))
  return data.records
}

async function main() {
  console.log('\n🌿  GFA Product Import — 90 new products\n')
  console.log(`   Target base: ${BASE_ID}`)
  console.log(`   Products:    ${PRODUCTS.length}\n`)

  let created = 0
  for (let i = 0; i < PRODUCTS.length; i += 10) {
    const batch   = PRODUCTS.slice(i, i + 10)
    const results = await createBatch(batch)
    for (const r of results) {
      console.log(`   ✅  [${r.fields.Category}] ${r.fields.Name}`)
      created++
    }
    if (i + 10 < PRODUCTS.length) await new Promise(r => setTimeout(r, 300))
  }

  console.log(`\n🎉  Done — ${created} products created.\n`)
}

main().catch(e => { console.error('❌ ', e.message); process.exit(1) })
