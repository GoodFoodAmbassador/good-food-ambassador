import CategoryPageClient from '@/components/CategoryPageClient'
import { LNA_CATEGORY } from '@/lib/categoryData'

export const metadata = {
  title: 'Low & No Alcohol',
  description:
    'Kombucha, kefir, shrubs, de-alcoholised wine, botanical waters, and more. Evaluated for ingredient transparency, fermentation integrity, and honest labelling.',
  alternates: { canonical: 'https://www.goodfoodambassador.com/lna' },
}

export default function LNAPage() {
  return <CategoryPageClient category={LNA_CATEGORY} backHref="/" />
}
