import { notFound } from 'next/navigation'
import { getProductBySlug, getProductsByCategory, generateSlug } from '@/lib/airtable'
import ProductDetailPage from '@/components/ProductDetailPage'
import { YELLOW, T } from '@/lib/tokens'

export async function generateStaticParams() {
  const products = await getProductsByCategory('grains')
  return products.map(p => ({ slug: generateSlug(p.name) }))
}

export async function generateMetadata({ params }) {
  const product = await getProductBySlug('grains', params.slug)
  if (!product) return {}
  return {
    title: `${product.name} — Grains & Noodles | Good Food Ambassador`,
    description: product.description || `GFA evaluation of ${product.name}${product.producer ? ` by ${product.producer}` : ''}.`,
    alternates: { canonical: `https://www.goodfoodambassador.com/grains/${params.slug}` },
  }
}

export default async function GrainDetailPage({ params }) {
  const product = await getProductBySlug('grains', params.slug)
  if (!product) notFound()
  return (
    <ProductDetailPage
      product={product}
      categorySlug="grains"
      categoryLabel="Grains & Noodles"
      pillColor={YELLOW}
    />
  )
}
