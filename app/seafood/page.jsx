import CategoryPageClient from '@/components/CategoryPageClient'
import { SEAFOOD_CATEGORY } from '@/lib/categoryData'

export const metadata = {
  title: 'Seafood',
  description:
    'Fish, shellfish, canned and cured seafood from coastal producers and small-boat fisheries. Evaluated for traceability, fishing method, and chain-of-custody transparency.',
  alternates: { canonical: 'https://www.goodfoodambassador.com/seafood' },
}

export default function SeafoodPage() {
  return <CategoryPageClient category={SEAFOOD_CATEGORY} backHref="/" />
}
