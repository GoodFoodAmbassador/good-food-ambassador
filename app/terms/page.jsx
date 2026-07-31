import Link from 'next/link'
import GFANav from '@/components/GFANav'
import { W, T, LIGHT, MID } from '@/lib/tokens'

export const metadata = {
  title: 'Terms of Use',
  description: 'The terms that govern use of Good Food Ambassador, product suggestions, and the Good Food Directory.',
  alternates: { canonical: 'https://www.goodfoodambassador.com/terms' },
}

const SECTIONS = [
  {
    h: 'Who we are',
    body: [
      'Good Food Ambassador (GFA, "we", "us") publishes independent evaluations of food and drink products against the Four Pillars — Good, Clean, Fair, True — and maintains a community of growers, makers, traders, and eaters. By using this site you agree to these terms.',
    ],
  },
  {
    h: 'Editorial independence',
    body: [
      'Every product in the Directory is evaluated the same way, using the same Four Pillars, whether it was suggested by its own producer, a member of our community, or found independently by GFA. Being listed is never for sale, and no payment, gift, or relationship with a producer changes how a product is evaluated or described.',
      'Evaluations are based on publicly available information, producer-provided documentation, and community knowledge. We report what we find. We do not claim to have tested every product in a lab, and we do not rank products against one another.',
    ],
  },
  {
    h: 'Affiliate links & compensation',
    body: [
      'Some "Where to buy" links on this site are affiliate links. If you click through and make a purchase, Good Food Ambassador may earn a small commission from the retailer, at no extra cost to you.',
      'This applies only to where a product can be bought. It never applies to whether a product is listed, how it is evaluated, or what we say about it. A product\'s presence in the Directory, and everything written about it, is independent of any affiliate relationship.',
    ],
  },
  {
    h: 'Submitting a product or becoming an Ambassador',
    body: [
      'When you use the Suggest or Join forms, you confirm that the information you provide is accurate to the best of your knowledge, and that you have the right to share it — for example, you are not submitting a competitor\'s confidential information.',
      'By submitting a suggestion, you give GFA permission to review, edit for clarity and length, publish, or decline to publish it, at our discretion. We may lightly edit submissions for readability; we do not rewrite them to say something materially different from what was submitted.',
      'Submissions are not paid, and submitting one does not guarantee publication. We evaluate every suggestion against the same Four Pillars used for everything else in the Directory.',
      'If you are credited by name as a source or contributor, that credit reflects your role in bringing a product to our attention — it is not an endorsement of GFA\'s evaluation, and GFA\'s published text is our own.',
    ],
  },
  {
    h: 'Accuracy & no professional advice',
    body: [
      'We take care to keep information accurate and current, but food production practices, certifications, and sourcing can change without notice, and errors are possible. Nothing on this site is medical, nutritional, legal, or financial advice. If a health or dietary decision depends on specific information about a product, verify it directly with the producer.',
    ],
  },
  {
    h: 'Limitation of liability',
    body: [
      'Good Food Ambassador provides this site and its content "as is," without warranties of any kind, to the fullest extent the law allows. We are not liable for decisions made based on information found here, or for the content, policies, or practices of any third-party site you reach through a link from ours — including retailer sites reached through buy links.',
    ],
  },
  {
    h: 'Intellectual property',
    body: [
      'The text, evaluations, and original illustrations on this site belong to Good Food Ambassador unless otherwise noted, and may not be reproduced for commercial use without permission. Product names, images, and trademarks referenced belong to their respective owners and are used for identification purposes only.',
    ],
  },
  {
    h: 'Changes',
    body: [
      'We may update these terms as the site grows. Material changes will update the date below. Continued use of the site after a change means you accept the updated terms.',
    ],
  },
  {
    h: 'Contact',
    body: [
      'Questions about these terms, a listed product, or a submission you made: hello@goodfoodambassador.com.',
    ],
  },
]

export default function TermsPage() {
  return (
    <div style={{ background: W, color: T, fontFamily: 'var(--font-mulish), Mulish, sans-serif', fontWeight: 300 }}>
      <GFANav />
      <div className="gfa-narrow-page" style={{ maxWidth: 720, margin: '0 auto', padding: '80px 40px' }}>

        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-poppins), Poppins, sans-serif',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.06em',
            color: T,
            textDecoration: 'none',
            borderBottom: `1.5px solid ${T}`,
            paddingBottom: 2,
            display: 'inline-block',
            marginBottom: 60,
          }}
        >
          ← Good Food Ambassador
        </Link>

        <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
          Legal
        </p>
        <h1 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 600, fontSize: 40, lineHeight: 1.2, marginBottom: 12 }}>
          Terms of Use
        </h1>
        <p style={{ fontSize: 15, color: '#888', marginBottom: 60 }}>
          Last updated: July 31, 2026
        </p>

        <div style={{ background: LIGHT, padding: '28px 32px', marginBottom: 56, borderLeft: `3px solid ${T}` }}>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#555' }}>
            The short version: evaluations are independent and not for sale, some buy links earn us a small commission, and if you submit a product or join as an Ambassador, we review it against the same standard as everything else here.
          </p>
        </div>

        {SECTIONS.map((s, i) => (
          <div key={i} style={{ borderTop: `1px solid ${MID}`, padding: '32px 0' }}>
            <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 600, fontSize: 18, marginBottom: 16 }}>
              {s.h}
            </h2>
            {s.body.map((p, j) => (
              <p key={j} style={{ fontSize: 15, lineHeight: 1.8, color: '#555', marginBottom: 12 }}>
                {p}
              </p>
            ))}
          </div>
        ))}

        <div style={{ borderTop: `1px solid ${MID}`, marginTop: 24, paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, color: '#bbb' }}>
            Good Food Ambassador ·{' '}
            <a href="mailto:hello@goodfoodambassador.com" style={{ color: '#bbb', textDecoration: 'none' }}>
              hello@goodfoodambassador.com
            </a>
            {' · '}
            <Link href="/privacy" style={{ color: '#bbb', textDecoration: 'none' }}>Privacy</Link>
          </p>
          <Link
            href="/"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', color: T, textDecoration: 'none', borderBottom: `1.5px solid ${T}`, paddingBottom: 2 }}
          >
            ← Back to GFA
          </Link>
        </div>

      </div>
    </div>
  )
}
