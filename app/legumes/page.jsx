import CategoryPageClient from '@/components/CategoryPageClient'
import { LEGUMES_CATEGORY } from '@/lib/categoryData'

export const metadata = {
  title: 'Legumes & Pulses',
  description:
    'Lentils, chickpeas, beans, peas, edamame. The protein backbone of plant-based cooking, evaluated for origin traceability, processing integrity, and labelling honesty.',
  alternates: { canonical: 'https://www.goodfoodambassador.com/legumes' },
}

export default function LegumesPage() {
  return <CategoryPageClient category={LEGUMES_CATEGORY} backHref="/" />
}
