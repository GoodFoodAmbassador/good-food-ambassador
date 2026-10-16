# Running goodfoodambassador.com

Next.js 14 site on Vercel. Product data lives in Airtable. No database, no login, no paid add-ons.

## Everyday jobs
| Job | How |
|---|---|
| Add or edit a product | Edit the row in Airtable (Status = approved to show). It appears within 24h, or at once after "Refresh pages" below. |
| Refresh pages now | POST `https://www.goodfoodambassador.com/api/revalidate` with header `x-revalidate-secret: <REVALIDATE_SECRET>`. Add `?category=grains` for one category. |
| Change page text | Edit the file in GitHub, open a PR, merge. Vercel builds a preview on every PR. |
| Add an affiliate link | Add it to the product's BuyLinks field in Airtable: `[{"label":"Walmart","url":"https://..."}]` |

## How it stays cheap
- Pages are built once and cached. Airtable is called at most once per category per day (free plan allows 1,000 calls a month). Do not shorten the 24h cache; use "Refresh pages" instead.
- Images are small (about 1.3 MB in total). Keep new images under 150 KB.
- No analytics cookies, no third-party scripts. Vercel Web Analytics is the only tracker.

## Keep running
- **Plan:** Vercel's free Hobby plan is for non-commercial use only. A site with affiliate links or consulting introductions is probably commercial, so use Vercel Pro (about $20 a month) or move the site to a host that allows commercial use on its free plan. Check Vercel's fair use page.
- **Deploying:** Production follows one branch. Make sure that branch is `master` (Vercel > Settings > Git > Production Branch), so merging goes live without manual promotion.
- **Secrets** (Vercel > Settings > Environment Variables): AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME, REVALIDATE_SECRET. Rotate the Airtable token yearly.
- **Domain:** renew at the registrar. Turn on auto-renew.
- **Dependencies:** once a quarter, run `npm outdated` and update `next` within version 14.x.
- **Search:** check Google Search Console and Bing Webmaster Tools monthly for errors.
- **Duplicates:** check Airtable for duplicate product names. They make duplicate pages.
