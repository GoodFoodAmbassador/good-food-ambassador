import Link from 'next/link'

/**
 * FTC-compliant affiliate disclosure — must render close to buy/affiliate links,
 * not only in a footer or separate policy page.
 */
export default function AffiliateDisclosure({ style }) {
  return (
    <p
      style={{
        fontFamily: 'var(--font-poppins), Poppins, sans-serif',
        fontSize: 13,
        lineHeight: 1.6,
        color: '#555',
        ...style,
      }}
    >
      Affiliate links: we may earn a commission if you buy through them, at no cost to you. It never affects what we list or how we evaluate it.{' '}
      <Link href="/affiliate-disclosure" style={{ color: '#555', textDecoration: 'underline' }}>Details</Link>
    </p>
  )
}
