import CategoryPageClient from '@/components/CategoryPageClient'
import { OILS_CATEGORY } from '@/lib/categoryData'

export const metadata = {
  title: 'Oils & Condiments',
  description:
    'Extra virgin olive oils, cold-pressed single-origins, vinegars, and fermented condiments. Evaluated for traceability, harvest date, and production integrity.',
  alternates: { canonical: 'https://www.goodfoodambassador.com/olive-oils' },
}

export default function OilsPage() {
  return <CategoryPageClient category={OILS_CATEGORY} backHref="/" />
}
