// Notify Bing, Yandex, Naver, Seznam and Yep (via IndexNow) that URLs changed.
// Usage:  node scripts/indexnow.mjs            (submits every URL in the live sitemap)
//         node scripts/indexnow.mjs <url> ...  (submits only the URLs you list)
// Google does not use IndexNow; use Search Console for Google.

const HOST = 'www.goodfoodambassador.com'
const KEY = 'eb719ebafce20681b729f3ac7d0e9dea'
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`

async function sitemapUrls() {
  const res = await fetch(`https://${HOST}/sitemap.xml`)
  if (!res.ok) throw new Error(`Could not read sitemap: HTTP ${res.status}`)
  const xml = await res.text()
  return [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]))]
}

const urlList = process.argv.length > 2 ? process.argv.slice(2) : await sitemapUrls()

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
})

console.log(`Submitted ${urlList.length} URLs. IndexNow responded: HTTP ${res.status}`)
if (res.status !== 200 && res.status !== 202) process.exitCode = 1
