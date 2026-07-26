#!/usr/bin/env node
// Usage: node scripts/update-buy-links.mjs <YOUR_PAT> [BASE_ID]
// Patches BuyLinks on all 90 imported products in Airtable.

import https from 'https'

const [,, API_KEY, BASE_ID = 'appcBDopFuYbSTdRy'] = process.argv
if (!API_KEY) {
  console.error('Usage: node scripts/update-buy-links.mjs <PAT>')
  process.exit(1)
}

const TABLE    = 'Products'
const BASE_URL = `api.airtable.com`
const BASE_PATH = `/v0/${BASE_ID}/${TABLE}`

// ── Buy link map ──────────────────────────────────────────────────────────────

const BUY_LINKS = {
  // EVOOs
  'Frantoi Cutrera Primo Double Organic PDO Monte Iblei': [{ label: 'Order direct', url: 'https://frantoi-cutrera.com' }],
  'Entelia Novello':                          [{ label: 'Order direct', url: 'https://enteliaoliveoil.com' }],
  'Entelia Private Reserve PDO Kolymvari':    [{ label: 'Order direct', url: 'https://enteliaoliveoil.com' }],
  'Oro del Desierto Organic Picual':          [{ label: 'Order direct', url: 'https://orodeldesierto.com' }],
  'Oro del Desierto Organic Coupage':         [{ label: 'Order direct', url: 'https://orodeldesierto.com' }],
  'Quattrociocchi Superbo Organic':           [{ label: 'Order direct', url: 'https://www.quattrociocchi.it' }],
  'Quattrociocchi Olivastro Organic':         [{ label: 'Order direct', url: 'https://www.quattrociocchi.it' }],
  'Nobleza del Sur Organic Day':              [{ label: 'Order direct', url: 'https://www.noblezadelsur.com' }],
  'Oleoestepa Egregio Organic':               [{ label: 'Order direct', url: 'https://oleoestepa.com' }],
  'Rincón de la Subbética':                  [{ label: 'Order direct', url: 'https://rincondelasubbetica.es' }],
  // Infused oils
  'Castillo de Canena Smoked Arbequina':          [{ label: 'Order direct', url: 'https://castillodecanena.com' }],
  'Terre Francescane Black Truffle Infused EVOO': [{ label: 'Order direct', url: 'https://terrefrancescane.it' }],
  'Terre Francescane Peperoncino Infused EVOO':   [{ label: 'Order direct', url: 'https://terrefrancescane.it' }],
  'Terre Francescane Lemon Infused EVOO':         [{ label: 'Order direct', url: 'https://terrefrancescane.it' }],
  'Quattrociocchi Garlic Organic Infused EVOO':   [{ label: 'Order direct', url: 'https://www.quattrociocchi.it' }],
  'Quattrociocchi Rosemary Organic Infused EVOO': [{ label: 'Order direct', url: 'https://www.quattrociocchi.it' }],
  'Quattrociocchi Peperoncino Organic Infused EVOO': [{ label: 'Order direct', url: 'https://www.quattrociocchi.it' }],
  'Iannotta Organic Garlic Flavored EVOO':        [{ label: 'Order direct', url: 'https://iannottaolio.it' }],
  'Colonna Granverde Lemon EVOO':                 [{ label: 'Order direct', url: 'https://marinacolonna.it' }],
  'Olio Guglielmi Crushed Chili Pepper EVOO':     [{ label: 'Order direct', url: 'https://guglielmi.it' }],
  // Vinegars
  'Arvum Vinagre Gran Reserva':                   [{ label: 'Order direct', url: 'https://arvumvinagre.com' }],
  'Arvum Vinagre Reserva al Pedro Ximenez':       [{ label: 'Order direct', url: 'https://arvumvinagre.com' }],
  'Arvum Vinagre Reserva al Moscatel':            [{ label: 'Order direct', url: 'https://arvumvinagre.com' }],
  'Casa del Agua Vinagre de Jerez Reserva':       [{ label: 'Find it', url: 'https://www.tienda.casadelagua.es' }],
  'Castillo de Canena Cabernet Sauvignon Vinegar':[{ label: 'Order direct', url: 'https://castillodecanena.com' }],
  'Frantoio Bonamini IGP Balsamic Vinegar of Modena Gold Label':   [{ label: 'Order direct', url: 'https://bonamini.it' }],
  'Frantoio Bonamini IGP Balsamic Vinegar of Modena Purple Label': [{ label: 'Order direct', url: 'https://bonamini.it' }],
  'Mussini PGI Balsamic Vinegar of Modena 5 Gold Medals': [{ label: 'Order direct', url: 'https://www.mussini.it' }],
  'Mussini PGI Balsamic Vinegar of Modena 4 Gold Medals': [{ label: 'Order direct', url: 'https://www.mussini.it' }],
  'Mussini Saba Cooked Grape Must Condiment':     [{ label: 'Order direct', url: 'https://www.mussini.it' }],
  // Soy & umami
  'San-J Organic Tamari':                   [{ label: 'Order direct', url: 'https://san-j.com' }],
  'Eden Foods Organic Shoyu':               [{ label: 'Order direct', url: 'https://www.edenfoods.com' }],
  'Ohsawa Organic Nama Shoyu':              [{ label: 'Find it', url: 'https://www.goldminenaturalfoods.com' }],
  'Kishibori Premium Shoyu':                [{ label: 'Find it', url: 'https://www.thejapanstore.us' }],
  'Wan Ja Shan Organic Tamari':             [{ label: 'Order direct', url: 'https://www.wanjashan.com.tw' }],
  'Coconut Secret Organic Coconut Aminos':  [{ label: 'Order direct', url: 'https://coconutsecret.com' }],
  'Big Tree Farms Organic Coconut Aminos Smoked': [{ label: 'Order direct', url: 'https://bigtreefarms.com' }],
  'Clearspring Organic Japanese Tamari':    [{ label: 'Order direct', url: 'https://www.clearspring.co.uk' }],
  'Yamasa Organic Soy Sauce':               [{ label: 'Order direct', url: 'https://www.yamasa.com' }],
  'Bragg Organic Liquid Aminos':            [{ label: 'Order direct', url: 'https://bragg.com' }],
  // Legumes — Rancho Gordo
  'Good Mother Stallard Bean':  [{ label: 'Order direct', url: 'https://www.ranchogordo.com/collections/beans/products/good-mother-stallard-bean' }],
  'Marcella Bean':              [{ label: 'Order direct', url: 'https://www.ranchogordo.com/collections/beans/products/marcella-bean' }],
  'Rio Zape Bean':              [{ label: 'Order direct', url: 'https://www.ranchogordo.com/collections/beans/products/rio-zape-bean' }],
  'Christmas Lima Bean':        [{ label: 'Order direct', url: 'https://www.ranchogordo.com/collections/beans/products/christmas-lima-bean' }],
  'Royal Corona Bean':          [{ label: 'Order direct', url: 'https://www.ranchogordo.com/collections/beans/products/royal-corona-bean' }],
  'Scarlet Runner Bean':        [{ label: 'Order direct', url: 'https://www.ranchogordo.com/collections/beans/products/scarlet-runner-bean' }],
  'Ayocote Morado Bean':        [{ label: 'Order direct', url: 'https://www.ranchogordo.com/collections/beans/products/ayocote-morado' }],
  'Cassoulet (Tarbais) Bean':   [{ label: 'Order direct', url: 'https://www.ranchogordo.com/collections/beans/products/cassoulet-bean' }],
  'Yellow Eye Bean':            [{ label: 'Order direct', url: 'https://www.ranchogordo.com/collections/beans/products/yellow-eye-bean' }],
  'Hidatsa Red Bean':           [{ label: 'Order direct', url: 'https://www.ranchogordo.com/collections/beans/products/hidatsa-red-bean' }],
  // Grains — Timeless Seeds
  'Timeless Pardina Lentils':       [{ label: 'Order direct', url: 'https://timelessseeds.com/collections/shop/products/pardina-lentils' }],
  'Timeless Black Beluga Lentils':  [{ label: 'Order direct', url: 'https://timelessseeds.com/collections/shop/products/black-beluga-lentils' }],
  'Timeless French Green Lentils':  [{ label: 'Order direct', url: 'https://timelessseeds.com/collections/shop/products/french-green-lentils' }],
  'Timeless Emmer Farro':           [{ label: 'Order direct', url: 'https://timelessseeds.com/collections/shop/products/emmer-farro' }],
  'Timeless Crimson Lentils':       [{ label: 'Order direct', url: 'https://timelessseeds.com/collections/shop/products/crimson-lentils' }],
  // Grains — Anson Mills
  'Anson Mills Antebellum Coarse Grits':       [{ label: 'Order direct', url: 'https://ansonmills.com/products/31' }],
  'Anson Mills Carolina Gold Rice':            [{ label: 'Order direct', url: 'https://ansonmills.com/products/2' }],
  'Anson Mills Farro Piccolo (Einkorn)':       [{ label: 'Order direct', url: 'https://ansonmills.com/products/46' }],
  'Anson Mills Stone Cut Oats':                [{ label: 'Order direct', url: 'https://ansonmills.com/products/50' }],
  'Anson Mills Rouge de Bordeaux Bread Flour': [{ label: 'Order direct', url: 'https://ansonmills.com/products/22' }],
  // Seafood — Vital Choice
  'Vital Choice Wild Sockeye Salmon Fillets':        [{ label: 'Order direct', url: 'https://www.vitalchoice.com/product/wild-sockeye-salmon-fillets' }],
  'Vital Choice Wild King Salmon Fillets':           [{ label: 'Order direct', url: 'https://www.vitalchoice.com/product/wild-king-salmon-fillets' }],
  'Vital Choice Wild Coho Salmon Fillets':           [{ label: 'Order direct', url: 'https://www.vitalchoice.com/product/wild-coho-salmon-fillets' }],
  'Vital Choice Wild Alaskan Halibut Fillets':       [{ label: 'Order direct', url: 'https://www.vitalchoice.com/product/wild-alaskan-halibut-fillets' }],
  'Vital Choice Wild Alaskan Sablefish (Black Cod)': [{ label: 'Order direct', url: 'https://www.vitalchoice.com/product/wild-alaskan-sablefish' }],
  'Vital Choice Wild Albacore Tuna Canned':          [{ label: 'Order direct', url: 'https://www.vitalchoice.com/product/canned-albacore-tuna' }],
  'Vital Choice Wild Sockeye Salmon Canned':         [{ label: 'Order direct', url: 'https://www.vitalchoice.com/product/canned-wild-sockeye-salmon' }],
  'Vital Choice Wild Dungeness Crab':                [{ label: 'Order direct', url: 'https://www.vitalchoice.com/product/wild-dungeness-crab' }],
  'Vital Choice Wild Pacific Shrimp':                [{ label: 'Order direct', url: 'https://www.vitalchoice.com/product/wild-pacific-shrimp' }],
  'Vital Choice Wild Alaskan Cod Fillets':           [{ label: 'Order direct', url: 'https://www.vitalchoice.com/product/wild-alaskan-cod-fillets' }],
  // Snacks
  'Hu Kitchen Simple Dark Chocolate Bar':          [{ label: 'Order direct', url: 'https://hukitchen.com' }],
  'Hu Kitchen Almond Butter Dark Chocolate Bar':   [{ label: 'Order direct', url: 'https://hukitchen.com' }],
  'Siete Grain-Free Tortilla Chips':               [{ label: 'Order direct', url: 'https://sietefoods.com' }],
  'LesserEvil Organic Himalayan Pink Salt Popcorn':[{ label: 'Order direct', url: 'https://lesserevil.com' }],
  'Barnana Organic Plantain Chips':                [{ label: 'Order direct', url: 'https://barnana.com' }],
  'Simple Mills Almond Flour Crackers':            [{ label: 'Order direct', url: 'https://simplemills.com' }],
  'Navitas Organics Cacao Blueberry Power Snack':  [{ label: 'Order direct', url: 'https://navitasorganics.com' }],
  "Kate's Real Food Lemon Coconut Bar":            [{ label: 'Order direct', url: 'https://katesrealfood.com' }],
  'Fly By Jing Sichuan Chili Crisp':               [{ label: 'Order direct', url: 'https://flybyjing.com' }],
  'Primal Kitchen Dark Chocolate Almond Bar':      [{ label: 'Order direct', url: 'https://www.primalkitchen.com' }],
  // Low & No Alcohol
  'GO Brewing Sunbeam Pils':                   [{ label: 'Order direct', url: 'https://gobrewing.com' }],
  'Momentum Brewery Hazy IPA':                 [{ label: 'Find it', url: 'https://momentumbrewing.com' }],
  'Collective Arts Surreal Perpetual Paloma':   [{ label: 'Order direct', url: 'https://collectiveartsbrewing.com' }],
  'Sober Carpenter Organic Session IPA':        [{ label: 'Order direct', url: 'https://sobercarpenter.com' }],
  'Woodland Farms Ruby Sour Ale':              [{ label: 'Find it', url: 'https://woodlandfarmbrewery.com' }],
  'NON NON3 Toasted Cinnamon & Yuzu':          [{ label: 'Order direct', url: 'https://nonwines.com' }],
  'KIT NA Brewing On Your Mark Blonde':         [{ label: 'Order direct', url: 'https://kitnabrew.com' }],
  'Recess Zero Proof Lime Margarita':           [{ label: 'Order direct', url: 'https://takearecess.com' }],
  'BREZ Flow Functional Mushroom Drink':        [{ label: 'Order direct', url: 'https://drinkbrez.com' }],
  'Leitz Eins Zwei Zero Sparkling Rosé':        [{ label: 'Find it', url: 'https://leitz-wein.de' }],
}

// ── HTTP helpers using built-in https module ──────────────────────────────────

function request(method, path, body) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : undefined
    const options = {
      hostname: BASE_URL,
      path,
      method,
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
      },
    }
    const req = https.request(options, res => {
      let data = ''
      res.on('data', chunk => { data += chunk })
      res.on('end', () => {
        if (res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`))
        } else {
          resolve(JSON.parse(data))
        }
      })
    })
    req.on('error', reject)
    if (payload) req.write(payload)
    req.end()
  })
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

// ── Fetch all records ─────────────────────────────────────────────────────────

async function fetchAllRecords() {
  const records = []
  let offset = undefined
  do {
    let path = `${BASE_PATH}?pageSize=100&fields%5B%5D=Name`
    if (offset) path += `&offset=${offset}`
    const data = await request('GET', path)
    records.push(...data.records)
    offset = data.offset
  } while (offset)
  return records
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('Fetching all records from Airtable...')
  const records = await fetchAllRecords()
  console.log(`Found ${records.length} records total`)

  const updates = []
  const unmatched = []
  let matched = 0

  for (const record of records) {
    const name = record.fields.Name
    const links = BUY_LINKS[name]
    if (links) {
      updates.push({ id: record.id, fields: { BuyLinks: JSON.stringify(links) } })
      matched++
    } else {
      unmatched.push(name)
    }
  }

  console.log(`Matched ${matched} products with buy links`)
  if (unmatched.length) {
    console.log(`\nUnmatched (${unmatched.length}):`)
    unmatched.forEach(n => console.log(`  • ${JSON.stringify(n)}`))
    console.log()
  }

  for (let i = 0; i < updates.length; i += 10) {
    const batch = updates.slice(i, i + 10)
    await request('PATCH', BASE_PATH, { records: batch })
    console.log(`Patched ${Math.min(i + 10, updates.length)} / ${updates.length}`)
    if (i + 10 < updates.length) await sleep(250)
  }

  console.log(`Done. ${matched} products updated.`)
}

main().catch(err => { console.error('Error:', err.message); process.exit(1) })
