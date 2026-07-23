import { notFound } from 'next/navigation'
import { getProductBySlug, getProductsByCategory, generateSlug } from '@/lib/airtable'
import ProductDetailPage from '@/components/ProductDetailPage'
import { GREEN } from '@/lib/tokens'

export async function generateStaticParams() {
  const products = await getProductsByCategory('lna')
  return products.map(p => ({ slug: generateSlug(p.name) }))
}

export async function generateMetadata({ params }) {
  const product = await getProductBySlug('lna', params.slug)
  if (!product) return {}
  return {
    title: `${product.name} — Low & No Alcohol | Good Food Ambassador`,
    description: product.description || `GFA evaluation of ${product.name}${product.producer ? ` by ${product.producer}` : ''}.`,
    alternates: { canonical: `https://www.goodfoodambassador.com/lna/${params.slug}` },
  }
}

export default async function LnaDetailPage({ params }) {
  const product = await getProductBySlug('lna', params.slug)
  if (!product) notFound()
  return (
    <ProductDetailPage
      product={product}
      categorySlug="lna"
      categoryLabel="Low & No Alcohol"
      pillColor={GREEN}
    />
  )
}
