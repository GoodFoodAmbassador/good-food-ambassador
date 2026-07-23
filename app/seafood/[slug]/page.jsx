import { notFound } from 'next/navigation'
import { getProductBySlug, getProductsByCategory, generateSlug } from '@/lib/airtable'
import ProductDetailPage from '@/components/ProductDetailPage'
import { CYAN } from '@/lib/tokens'

export async function generateStaticParams() {
  const products = await getProductsByCategory('seafood')
  return products.map(p => ({ slug: generateSlug(p.name) }))
}

export async function generateMetadata({ params }) {
  const product = await getProductBySlug('seafood', params.slug)
  if (!product) return {}
  return {
    title: `${product.name} — Seafood | Good Food Ambassador`,
    description: product.description || `GFA evaluation of ${product.name}${product.producer ? ` by ${product.producer}` : ''}.`,
    alternates: { canonical: `https://www.goodfoodambassador.com/seafood/${params.slug}` },
  }
}

export default async function SeafoodDetailPage({ params }) {
  const product = await getProductBySlug('seafood', params.slug)
  if (!product) notFound()
  return (
    <ProductDetailPage
      product={product}
      categorySlug="seafood"
      categoryLabel="Seafood"
      pillColor={CYAN}
    />
  )
}
