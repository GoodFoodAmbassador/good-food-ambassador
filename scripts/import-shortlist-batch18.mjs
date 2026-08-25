#!/usr/bin/env node
// Usage: node scripts/import-shortlist-batch18.mjs <YOUR_PAT> [BASE_ID]
//
// Budget / private-label additions -- the same certification bar as every
// other batch (named third-party certifying body, not a self-claim), but
// deliberately sourced from private-label and mainstream mid-market brands
// rather than specialty/artisan ones, so the catalog isn't only useful to
// shoppers who can afford $8 snack bars.
//
// Every BuyLinks URL below was independently confirmed this session (via
// live web_fetch or corroborating search-result detail pages showing the
// certification badge directly on the retailer's own product page -- e.g.
// Kroger's Simple Truth Organic Quinoa page displays Kosher/Non-GMO/Organic
// badges natively, and Walmart's Great Value tuna URL literally contains
// "MSC" and its own listing states "MSC certified sustainable fishery").
//
// DELIBERATELY EXCLUDED after research, to avoid overclaiming:
//  - Chicken of the Sea / StarKist: both committed to 100% MSC certification
//    by end of 2026 but neither has confirmed completion of that rollout as
//    of this session -- a commitment is not yet a certification.
//  - Princes (UK) canned tuna: achieved 100% MSC-certified sourcing, but no
//    confirmed US-facing purchase link was found this session.
//  - Royal Umbrella Thai Jasmine Rice: the Thung Kula Rong-Hai Hom Mali GI/
//    PGI certification is real, but this session could not confirm that
//    Royal Umbrella's specific retail bags are grown in the certified
//    region and carry the GI mark, vs. simply being the same rice variety
//    grown elsewhere in Thailand. Held out until that's confirmed.
//  - Every European supermarket private label researched (Coop Naturaplan,
//    Migros Bio, REWE Bio, Kaufland K-Bio, Edeka Bio-Wertkost, Coop Italia
//    Vivi Verde, Carrefour Bio, ICA I Love Eco) and AEON Topvalu (Japan):
//    all have genuine, strong, independently-verified certifications, but
//    none of these retailers ship or sell internationally to a US-based
//    shopper -- there is no honest BuyLinks URL to give. Worth revisiting
//    if the catalog ever supports a non-purchasable "for reference" entry
//    type, but forcing a broken or misleading link isn't the right call.
//  - E-Mart No Brand (Korea), Seven Premium (Japan), Mercadona Hacendado
//    (Spain), Tops Friendly Markets (US, regional): budget-positioned and
//    reputationally strong, but no specific third-party certifying body
//    could be confirmed for any of them this session.

const [,, API_KEY, BASE_ID = 'appcBDopFuYbSTdRy'] = process.argv
if (!API_KEY) { console.error('Usage: node scripts/import-shortlist-batch18.mjs <PAT>'); process.exit(1) }

const URL     = `https://api.airtable.com/v0/${BASE_ID}/Products`
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }

const PRODUCTS = [
  {
    Name: 'Kirkland Signature Organic Toscano Extra Virgin Olive Oil',
    Category: 'olive-oils',
    Status: 'approved',
    PillarGood: 'A Tuscan extra virgin olive oil blended from native Frantoio, Leccino, and Moraiolo olives -- consistently rated among the best-value EVOOs by independent olive-oil review panels.',
    PillarClean: 'Toscano PGI (Protected Geographical Indication, EU-certified) on the growing region and process, plus USDA Organic and Kosher on the organic variant, plus the NAOOA quality seal.',
    PillarFair: 'No specific farm-level labor certification found beyond the PGI, organic, and Kosher certifications.',
    PillarTrue: 'All certifications (Toscano PGI, USDA Organic, Kosher, NAOOA) are independently issued and publicly verifiable -- proof that private-label products can carry the exact same certification stack as premium-priced brands.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Kirkland-Signature-Virgin-Toscano-Tuscany/dp/B003FGTTUI' }],
  },
  {
    Name: 'Goya Black Beans',
    Category: 'legumes',
    Status: 'approved',
    PillarGood: 'A pantry-staple canned black bean, gluten-free, low-fat, and a good source of fiber, iron, and potassium -- about $1.50 a can.',
    PillarClean: 'OU Kosher Certified, Pareve, under supervision of the Kashruth Division of the Orthodox Union.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the Kosher certification.',
    PillarTrue: 'The OU Kosher certification is independently administered and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Goya-Canned-Black-Beans-15-5/dp/B000VDV1UO' }],
  },
  {
    Name: 'Simple Truth Organic Quinoa',
    Category: 'grains',
    Status: 'approved',
    PillarGood: 'An unadulterated, single-ingredient organic quinoa, a good source of fiber and iron -- one of over 1,500 Simple Truth SKUs.',
    PillarClean: 'USDA Certified Organic, Non-GMO, and Kosher, confirmed directly on Kroger\'s own product page.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the organic, Non-GMO, and Kosher certifications.',
    PillarTrue: 'All three certifications (USDA Organic, Non-GMO, Kosher) are independently issued and publicly verifiable -- confirmed live on the retailer\'s own product page, not just marketing copy.',
    BuyLinks: [{ label: 'Buy on Kroger', url: 'https://www.kroger.com/p/simple-truth-organic-quinoa/0001111091238' }],
  },
  {
    Name: 'Simple Truth Organic Black Beans',
    Category: 'legumes',
    Status: 'approved',
    PillarGood: 'A basic canned organic black bean made from water, organic black beans, and sea salt -- nothing else.',
    PillarClean: 'USDA Certified Organic.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the organic certification.',
    PillarTrue: 'The USDA Organic designation is independently administered and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy on Kroger', url: 'https://www.kroger.com/p/simple-truth-organic-black-beans/0001111084938' }],
  },
  {
    Name: 'Great Value Organic Black Beans',
    Category: 'legumes',
    Status: 'approved',
    PillarGood: 'A canned organic black bean, gluten-free, dairy-free, vegan, and BPA-free -- one of Walmart\'s lowest-priced organic pantry staples.',
    PillarClean: 'USDA Certified Organic and Non-GMO.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the organic and Non-GMO certifications.',
    PillarTrue: 'Both certifications (USDA Organic, Non-GMO) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy on Walmart', url: 'https://www.walmart.com/ip/Great-Value-Organic-Black-Beans-Canned-15-oz/51236573' }],
  },
  {
    Name: 'Great Value Certified Chunk Light Tuna in Water',
    Category: 'seafood',
    Status: 'approved',
    PillarGood: 'Wild-caught, dolphin-safe chunk light tuna with 22-24g protein per serving -- one of the cheapest seafood proteins on a shelf, at roughly $1/can.',
    PillarClean: 'MSC (Marine Stewardship Council) Certified. Walmart moved its entire private-label Great Value canned tuna line to MSC-certified or Fishery Improvement Project sourcing, reaching 100% five years ahead of its own internal target.',
    PillarFair: 'No specific farm-level labor certification found beyond the MSC certification, which does cover fishery management and bycatch standards.',
    PillarTrue: 'The MSC certification is independently issued and publicly verifiable -- this is the same standard used by premium brands like Wild Planet, not a lesser private-label substitute.',
    BuyLinks: [{ label: 'Buy on Walmart', url: 'https://www.walmart.com/ip/Great-Value-Certified-Chunk-Light-Tuna-In-Water-5-oz/248821969' }],
  },
  {
    Name: "Trader Joe's Organic Creamy Peanut Butter, Salted Valencia",
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A two-ingredient peanut butter (organic peanuts and salt) made from Valencia peanuts grown only in Texas and New Mexico.',
    PillarClean: 'USDA Certified Organic, at least 95% organic material.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the organic certification.',
    PillarTrue: 'The USDA Organic designation is independently administered and publicly verifiable. Note: Trader Joe\'s has no official online store, so the link below is a third-party Amazon reseller listing, not a direct-from-brand purchase -- shoppers near a Trader Joe\'s location will find it cheaper in-store.',
    BuyLinks: [{ label: 'Buy on Amazon (reseller; TJ\'s has no online store)', url: 'https://www.amazon.com/Trader-Joes-Organic-Peanut-Butter/dp/B00C7826HS' }],
  },
  {
    Name: '365 by Whole Foods Market Chunk Light Tuna in Water, No Salt Added',
    Category: 'seafood',
    Status: 'approved',
    PillarGood: '100% pole-and-line caught tuna (the catch method that prevents bycatch), with full electronic lot-level traceability from vessel to can -- ranked in Greenpeace\'s top tier for sustainable canned tuna alongside Wild Planet and American Tuna.',
    PillarClean: 'Every 365 tuna supplier is required to be MSC-certified or rated green/yellow by the Monterey Bay Aquarium Seafood Watch and The Safina Center; dolphin-safe.',
    PillarFair: 'No specific farm-level labor certification found beyond the MSC/Monterey Bay sourcing requirement.',
    PillarTrue: 'The sourcing standard is independently verified by MSC and/or Monterey Bay Aquarium\'s Seafood Watch program, not a self-declared claim -- and the full electronic traceability system means individual lots can be traced back to the vessel.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/365-Everyday-Value-Chunk-Light/dp/B074H73B9N' }],
  },
  {
    Name: 'Hikari Organic Miso Paste, White',
    Category: 'olive-oils',
    Status: 'approved',
    PillarGood: 'A fermented soybean and rice koji miso paste made by a fourth-generation family producer in Nagano, Japan\'s Ina Valley -- an everyday pantry staple, not a specialty import price point.',
    PillarClean: 'Dual-certified: USDA Organic and JAS Organic (Japan\'s national organic standard, MAFF-administered). The brand achieved OCIA organic certification as early as 1997, predating JAS organic\'s existence.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the dual organic certifications.',
    PillarTrue: 'Both certifications (USDA Organic, JAS Organic) are independently administered and publicly verifiable, not self-declared claims.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Hikari-Organic-Miso-Paste-White/dp/B00IBNZAEE' }],
  },
  {
    Name: 'Sempio Organic Gochujang',
    Category: 'olive-oils',
    Status: 'approved',
    PillarGood: 'A traditional fermented Korean red chili paste made by Korea\'s #1-selling soy sauce brand -- sun-dried red peppers, fermented rice, and onion.',
    PillarClean: 'USDA Certified Organic, gluten-free.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the organic certification.',
    PillarTrue: 'The USDA Organic designation is independently administered and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Sempio-Organic-Gochujang-Korean-purpose/dp/B09XM23QG9' }],
  },
  {
    Name: 'Lee Kum Kee Organic Premium Soy Sauce',
    Category: 'olive-oils',
    Status: 'approved',
    PillarGood: 'A four-ingredient organic soy sauce (water, organic soybeans, salt, organic wheat flour) with no added preservatives, from a mainstream, everyday-priced brand carried in ordinary US grocery stores.',
    PillarClean: 'USDA Certified Organic; made from non-genetically-engineered soybeans.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the organic certification.',
    PillarTrue: 'The USDA Organic designation is independently administered and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://usa.lkk.com/en/products/organic-premium-soy-sauce' }],
  },
  {
    Name: 'gimMe Organic Sushi Nori Seaweed Wraps',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A roasted seaweed snack made in Korea, sold at ordinary US grocery chains (Safeway, Giant Eagle, Hannaford), not specialty-only.',
    PillarClean: 'USDA Certified Organic via QAI (Quality Assurance International, a USDA-accredited certifying agent).',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the organic certification.',
    PillarTrue: 'The USDA Organic via QAI designation is independently administered and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy on Hannaford', url: 'https://hannaford.com/groceries/product/gimme-organic-sushi-nori-seaweed-wraps-0-81-oz-bag/263902' }],
  },
  {
    Name: 'KIMNORI Organic Roasted Seaweed Snacks',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Roasted laver (gim) seaweed snacks with a clean-label ingredient list, from a Korean seaweed producer.',
    PillarClean: 'USDA Organic and Non-GMO Project Verified.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the organic and Non-GMO certifications.',
    PillarTrue: 'Both certifications (USDA Organic, Non-GMO Project) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://kimnoriusa.com/' }],
  },
  {
    Name: 'Rio Mare Tuna in Olive Oil, MSC Certified',
    Category: 'seafood',
    Status: 'approved',
    PillarGood: 'Italy and Europe\'s #1-selling canned tuna brand -- an everyday pantry staple in Italian households, not a specialty item.',
    PillarClean: 'MSC (Marine Stewardship Council) Certified on this specific product line; the brand has committed to 100% MSC-sourced tuna across its full range by 2030.',
    PillarFair: 'No specific farm-level labor certification found beyond the MSC certification.',
    PillarTrue: 'The MSC certification is independently issued and publicly verifiable -- confirmed directly on this product\'s own retailer listings (Tesco lists it as "Rio Mare Tuna in Olive Oil MSC").',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/clp/B00J0ELXIK' }],
  },
  {
    Name: 'Ramirez Portuguese Sardines',
    Category: 'seafood',
    Status: 'approved',
    PillarGood: 'Traditionally canned Portuguese sardines from a cannery founded in 1853 -- an everyday-priced staple in Portugal, not a luxury import despite recent trendiness of tinned fish.',
    PillarClean: 'MSC (Marine Stewardship Council) Certified sourcing from Portuguese purse-seine sardine fisheries; SGS ISO 9001:2008 certified quality control system.',
    PillarFair: 'No specific farm-level labor certification found beyond the MSC and ISO certifications.',
    PillarTrue: 'Both certifications (MSC, ISO 9001) are independently issued and publicly verifiable, not self-declared claims.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Portuguese-Canned-Sardines-Set-Portugal/dp/B0BSHSHFZ8' }],
  },
  {
    Name: 'Firewood Compound Wuchang Rice, Daohuaxiang No. 2',
    Category: 'grains',
    Status: 'approved',
    PillarGood: 'Rice grown in Wuchang, Heilongjiang, China -- fresh-water irrigated, free from industrial pollution, produced under a strict traceability system limiting the "Wuchang Rice" name to rice actually grown in the certified region.',
    PillarClean: 'China Geographical Indication (GI) certified since 2007; selected into the first product group under the China-EU GI protection and cooperation agreement in 2020.',
    PillarFair: 'No specific farm-level labor certification found beyond the GI certification, which does regulate origin and production method.',
    PillarTrue: 'The GI certification is independently administered by China\'s National Intellectual Property Administration and publicly verifiable, not a self-declared claim. Note: available via Asian-grocery delivery platforms (Weee!, Yami) rather than mainstream US retailers -- a narrower purchase channel than the rest of this batch.',
    BuyLinks: [{ label: 'Buy on Weee!', url: 'https://www.sayweee.com/en/product/-Firewood-Compound-Wuchang-Rice-Daohuaxiang-No-2-Geographical-Indication-Certif/2057120' }],
  },
]

async function createBatch(records) {
  const res = await fetch(URL, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      records: records.map(r => ({ fields: { ...r, BuyLinks: JSON.stringify(r.BuyLinks) } })),
    }),
  })
  const json = await res.json()
  if (!res.ok) { console.error('Error:', JSON.stringify(json, null, 2)); process.exit(1) }
  return json.records
}

async function main() {
  console.log(`Importing ${PRODUCTS.length} batch-18 products (budget / private-label additions)...`)
  for (let i = 0; i < PRODUCTS.length; i += 10) {
    const chunk = PRODUCTS.slice(i, i + 10)
    const created = await createBatch(chunk)
    created.forEach(rec => console.log(`  Created: ${rec.fields.Name} (${rec.id})`))
  }
  console.log('Done.')
}

main()
