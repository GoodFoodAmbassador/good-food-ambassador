import { notFound } from 'next/navigation'
import { getProductBySlug, getProductsByCategory, generateSlug } from '@/lib/airtable'
import ProductDetailPage from '@/components/ProductDetailPage'
import { GRAY } from '@/lib/tokens'

export async function generateStaticParams() {
  const products = await getProductsByCategory('snacks')
  return products.map(p => ({ slug: generateSlug(p.name) }))
}

export async function generateMetadata({ params }) {
  const product = await getProductBySlug('snacks', params.slug)
  if (!product) return {}
  return {
    title: `${product.name} — Snacks & Pantry | Good Food Ambassador`,
    description: product.description || `GFA evaluation of ${product.name}${product.producer ? ` by ${product.producer}` : ''}.`,
    alternates: { canonical: `https://www.goodfoodambassador.com/snacks/${params.slug}` },
  }
}

export default async function SnackDetailPage({ params }) {
  const product = await getProductBySlug('snacks', params.slug)
  if (!product) notFound()
  return (
    <ProductDetailPage
      product={product}
      categorySlug="snacks"
      categoryLabel="Snacks & Pantry"
      pillColor={GRAY}
    />
  )
}
