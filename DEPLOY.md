# Deploying the Next.js Migration

## What you're replacing

The current site at goodfoodambassador.com is a **Vite + React SPA** hosted on Vercel.
All traffic goes to `index.html` — there are no real URLs for category pages.

The new **Next.js 14 (App Router)** build gives every page its own URL:

| Page | Old | New |
|---|---|---|
| Hub | `/` | `/` |
| The Standard | `/` (state) | `/standard` |
| Oils & Condiments | `/` (state) | `/olive-oils` |
| Grains & Noodles | `/` (state) | `/grains` |
| Low & No Alcohol | `/` (state) | `/lna` |
| Legumes & Pulses | `/` (state) | `/legumes` |
| Snacks & Pantry | `/` (state) | `/snacks` |
| Seafood | `/` (state) | `/seafood` |
| Ambassadors | `/` (state) | `/ambassadors` |

---

## Before you start — two manual steps

### 1. Copy `categoryData.js` from GitHub

Open this URL, click **Raw**, copy everything, paste into `lib/categoryData.js`
(replacing the stub that's there now):

```
https://github.com/GoodFoodAmbassador/good-food-ambassador/blob/main/src/categoryData.js
```

### 2. Copy `CategoryApp.jsx` from GitHub

Same process — open, click Raw, copy, save as `components/CategoryApp.jsx`:

```
https://github.com/GoodFoodAmbassador/good-food-ambassador/blob/main/src/CategoryApp.jsx
```

The component is unchanged — it still receives `category` and `onBack` props,
just as it did in the SPA. `CategoryPageClient.jsx` adapts `onBack` to use
`router.push('/')` so that the browser URL actually changes.

---

## Folder structure — what goes where in your repo

Your current repo root looks like:

```
good-food-ambassador/
├── index.html
├── vite.config.js
├── package.json
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── CategoryApp.jsx
│   └── categoryData.js
└── public/
```

For Next.js you'll replace the Vite files and add the `app/` directory.
The safest approach: **work in a new branch**, then swap on Vercel once it builds.

```bash
# In your local clone of the repo
git checkout -b nextjs-migration
```

Delete the Vite-specific files at the root:
```
index.html
vite.config.js
src/main.jsx
src/App.jsx
```

Copy the new files from the `nextjs/` folder Claude built into your repo root:
```
nextjs/package.json           → package.json        (replaces old one)
nextjs/next.config.js         → next.config.js      (new)
nextjs/app/                   → app/                (new directory)
nextjs/components/            → components/         (new directory)
nextjs/lib/                   → lib/                (new directory)
```

Then paste the two files you copied from GitHub:
```
src/categoryData.js → lib/categoryData.js
src/CategoryApp.jsx → components/CategoryApp.jsx
```

Keep `public/` as-is — Next.js serves it the same way Vite did.

---

## Install and test locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 and check:

- `/` — Hub with 6 category cards
- `/standard` — The Good Food Standard + scorecard form
- `/olive-oils`, `/grains`, `/lna`, `/legumes`, `/snacks`, `/seafood` — category pages
- `/ambassadors` — placeholder page

---

## Deploy to Vercel

### Option A — Vercel detects Next.js automatically (recommended)

```bash
git add .
git commit -m "migrate to Next.js 14 App Router"
git push origin nextjs-migration
```

Open your Vercel dashboard → your project → **Git** tab → switch the
Production Branch from `main` to `nextjs-migration` (or open a Preview
deployment first to verify).

Vercel will detect `next.config.js`, set Framework Preset to **Next.js**,
and build with `next build` automatically. No settings to change.

### Option B — Force framework if Vercel doesn't auto-detect

In Vercel → Project Settings → General:
- Framework Preset: **Next.js**
- Build Command: `npm run build`
- Output Directory: *(leave blank — Next.js handles it)*
- Install Command: `npm install`

---

## Environment variables

None required for this release. When you add the submission-form API route
(Phase 5), you'll need `EMAIL_API_KEY` or similar — add those in
Vercel → Project Settings → Environment Variables at that point.

---

## After deploy — things to verify

1. All 9 URLs resolve correctly (no 404s)
2. Nav links highlight the active page
3. Back arrows on category pages return to `/`
4. Scorecard form on `/standard` opens email client with pre-filled body
5. OG image / Twitter Card meta tags visible in browser dev tools (or use
   https://opengraph.xyz to check)
6. Google Search Console: submit `/sitemap.xml` once Next.js generates it
   (add `next-sitemap` package in Phase 2)

---

## What's NOT in this release

- `CategoryApp.jsx` is unchanged — it still has the full tasting-note UI,
  quiz, and product cards from the Vite version
- Phase 2 (Oils product pages, affiliate links) is a separate branch
- The submission form still uses `mailto:` — proper API route is Phase 5
- "30 products" copy on the homepage still needs to be corrected to 20
  (edit `app/page.jsx`, the hub copy section)
