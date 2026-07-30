import { Poppins, Mulish } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const mulish = Mulish({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-mulish',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://www.goodfoodambassador.com'),
  title: {
    default: 'Good Food Ambassador',
    template: '%s | Good Food Ambassador',
  },
  description:
    'A community of growers, makers, movers, and eaters who believe food should be grown, made, moved, and eaten with care. Discover the Good Food Standard and the Good Food Directory.',
  keywords: ['food', 'olive oil', 'good food', 'food standards', 'traceable food', 'sustainable food'],
  authors: [{ name: 'Good Food Ambassador' }],
  creator: 'Good Food Ambassador',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.goodfoodambassador.com',
    siteName: 'Good Food Ambassador',
    title: 'Good Food Ambassador',
    description:
      'A community of growers, makers, movers, and eaters who believe food should be grown, made, moved, and eaten with care.',
    images: [
      {
        url: '/illustrations/GFA_illus_community.png',
        width: 1200,
        height: 630,
        alt: 'Good Food Ambassador',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Good Food Ambassador',
    description:
      'A community of growers, makers, movers, and eaters who believe food should be grown, made, moved, and eaten with care.',
    images: ['/illustrations/GFA_illus_community.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${mulish.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Good Food Ambassador',
              url: 'https://www.goodfoodambassador.com',
              description:
                'A community of growers, makers, movers, and eaters who believe food should be grown, made, moved, and eaten with care.',
              email: 'hello@goodfoodambassador.com',
              sameAs: [],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
