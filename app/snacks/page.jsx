import CategoryPageClient from '@/components/CategoryPageClient'
import { SNACKS_CATEGORY } from '@/lib/categoryData'

export const metadata = {
  title: 'Snacks & Pantry',
  description:
    'Crackers, spreads, condiments, ferments, and everything in between. Evaluated for ingredient integrity, origin transparency, and honest labelling.',
  alternates: { canonical: 'https://www.goodfoodambassador.com/snacks' },
}

export default function SnacksPage() {
  return <CategoryPageClient category={SNACKS_CATEGORY} backHref="/" />
}
