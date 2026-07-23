import { notFound } from 'next/navigation'
import { getProductBySlug, getProductsByCategory, generateSlug } from '@/lib/airtable'
import ProductDetailPage from '@/components/ProductDetailPage'
import { CYAN } from '@/lib/tokens'

export async function generateStaticParams() {
  const products = await getProductsByCategory('legumes')
  return products.map(p => ({ slug: generateSlug(p.name) }))
}

export async function generateMetadata({ params }) {
  const product = await getProductBySlug('legumes', params.slug)
  if (!product) return {}
  return {
    title: `${product.name} — Legumes & Pulses | Good Food Ambassador`,
    description: product.description || `GFA evaluation of ${product.name}${product.producer ? ` by ${product.producer}` : ''}.`,
    alternates: { canonical: `https://www.goodfoodambassador.com/legumes/${params.slug}` },
  }
}

export default async function LegumeDetailPage({ params }) {
  const product = await getProductBySlug('legumes', params.slug)
  if (!product) notFound()
  return (
    <ProductDetailPage
      product={product}
      categorySlug="legumes"
      categoryLabel="Legumes & Pulses"
      pillColor={CYAN}
    />
  )
}
