import { notFound } from 'next/navigation'
import { getProductBySlug, getProductsByCategory, generateSlug } from '@/lib/airtable'
import ProductDetailPage from '@/components/ProductDetailPage'
import { GREEN } from '@/lib/tokens'

export async function generateStaticParams() {
  const products = await getProductsByCategory('olive-oils')
  return products.map(p => ({ slug: generateSlug(p.name) }))
}

export async function generateMetadata({ params }) {
  const product = await getProductBySlug('olive-oils', params.slug)
  if (!product) return {}
  return {
    title: `${product.name} — Oils & Condiments | Good Food Ambassador`,
    description: product.description || `GFA evaluation of ${product.name}${product.producer ? ` by ${product.producer}` : ''}.`,
    alternates: { canonical: `https://www.goodfoodambassador.com/olive-oils/${params.slug}` },
  }
}

export default async function OilDetailPage({ params }) {
  const product = await getProductBySlug('olive-oils', params.slug)
  if (!product) notFound()
  return (
    <ProductDetailPage
      product={product}
      categorySlug="olive-oils"
      categoryLabel="Oils & Condiments"
      pillColor={GREEN}
    />
  )
}
