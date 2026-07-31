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
        fontSize: 11,
        lineHeight: 1.6,
        color: '#aaa',
        ...style,
      }}
    >
      Some links below are affiliate links — we may earn a small commission at no extra cost to you. It never affects which products are listed or how they're evaluated.{' '}
      <Link href="/terms" style={{ color: '#aaa', textDecoration: 'underline' }}>Learn more</Link>
    </p>
  )
}
