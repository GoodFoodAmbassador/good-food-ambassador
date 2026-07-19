'use client'

/**
 * CategoryPageClient
 *
 * Thin client-component wrapper that bridges the Next.js App Router
 * to the original CategoryApp component.
 *
 * In the old Vite SPA, CategoryApp received an `onBack` prop that called
 * the parent's setPage() state setter. In Next.js we replace that with
 * router.push(backHref) so the browser URL actually changes.
 *
 * Usage (from a server-component page file):
 *   <CategoryPageClient category={OILS_CATEGORY} backHref="/" />
 */

import { useRouter } from 'next/navigation'
import CategoryApp from '@/components/CategoryApp'

export default function CategoryPageClient({ category, backHref = '/' }) {
  const router = useRouter()
  return <CategoryApp category={category} onBack={() => router.push(backHref)} />
}
