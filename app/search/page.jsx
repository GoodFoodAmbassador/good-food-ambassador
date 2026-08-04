import GFANav from '@/components/GFANav'
import SearchResults from '@/components/SearchResults'
import { getAllProducts } from '@/lib/airtable'
import { W, T, MID } from '@/lib/tokens'

export const revalidate = 3600

export const metadata = {
  title: 'Search',
  description: 'Search the Good Food Directory across all categories.',
  robots: { index: false, follow: true },
}

export default async function SearchPage({ searchParams }) {
  const params = await searchParams
  const initialQuery = typeof params?.q === 'string' ? params.q : ''
  const products = await getAllProducts()

  return (
    <div style={{ background: W, color: T, fontFamily: 'var(--font-mulish), Mulish, sans-serif', fontWeight: 300 }}>
      <GFANav />

      <section className="gfa-section" style={{ padding: '80px 60px 40px', maxWidth: 760 }}>
        <h1 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 40, lineHeight: 1.2, marginBottom: 16 }}>
          Search the <strong style={{ fontWeight: 600 }}>Good Food Directory</strong>
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: '#666', maxWidth: 560 }}>
          Every evaluated product, across every category, in one place.
        </p>
      </section>

      <section className="gfa-section" style={{ borderTop: `1px solid ${MID}`, padding: '48px 60px 64px' }}>
        <SearchResults initialProducts={products} initialQuery={initialQuery} />
      </section>
    </div>
  )
}
