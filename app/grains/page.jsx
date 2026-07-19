import CategoryPageClient from '@/components/CategoryPageClient'
import { GRAINS_CATEGORY } from '@/lib/categoryData'

export const metadata = {
  title: 'Grains & Noodles',
  description:
    'Pasta, rice, soba, udon, couscous, millet, quinoa. Staple foods from every tradition, evaluated for origin, variety, and production method.',
  alternates: { canonical: 'https://www.goodfoodambassador.com/grains' },
}

export default function GrainsPage() {
  return <CategoryPageClient category={GRAINS_CATEGORY} backHref="/" />
}
