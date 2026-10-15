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
      Ad disclosure: some buy links on this page are affiliate links. If you buy through them, we may earn a commission at no extra cost to you. This never affects which products are listed or how they are evaluated.{' '}
      <Link href="/affiliate-disclosure" style={{ color: '#555', textDecoration: 'underline' }}>How this works</Link>
    </p>
  )
}
