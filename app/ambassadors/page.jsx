import Link from 'next/link'
import GFANav from '@/components/GFANav'
import { W, T, LIGHT, MID } from '@/lib/tokens'

export const metadata = {
  title: 'Good Food Ambassadors',
  description:
    'A community of growers, makers, chefs, traders, eaters and researchers keeping the original trust between maker and eater alive — across every distance food travels.',
  alternates: { canonical: 'https://www.goodfoodambassador.com/ambassadors' },
}

const AMBASSADORS = [
  // Add people here as they join — { name, role, location, bio }
]

export default function AmbassadorsPage() {
  return (
    <div style={{ background: W, color: T, fontFamily: 'var(--font-mulish), Mulish, sans-serif', fontWeight: 300 }}>
      <GFANav />

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '80px 40px' }}>

        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-poppins), Poppins, sans-serif',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.06em',
            color: T,
            textDecoration: 'none',
            borderBottom: '1.5px solid ' + T,
            paddingBottom: 2,
            display: 'inline-block',
            marginBottom: 60,
          }}
        >
          ← Good Food Ambassador
        </Link>

        <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
          The community
        </p>
        <h1 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 48, lineHeight: 1.15, marginBottom: 40 }}>
          Good Food<br />
          <strong style={{ fontWeight: 600 }}>Ambassadors</strong>
        </h1>

        <div style={{ borderLeft: '3px solid ' + T, paddingLeft: 32, marginBottom: 72 }}>

          <p style={{ fontSize: 17, lineHeight: 1.9, color: '#555', marginBottom: 28 }}>
            When you buy food directly from the person who made it — at a farm, a market stall, a small producer's door — something simple and profound happens. You look them in the eye. You hear their story. You trust what they tell you, and they trust you with something they made. That exchange is as old as food itself.
          </p>

          <p style={{ fontSize: 17, lineHeight: 1.9, color: '#555', marginBottom: 28 }}>
            Trade is too. Humans have always moved food across distances, cultures, and languages. Spices from the East, salt across deserts, wine along rivers. Every great food culture in history was shaped by movement — by ingredients, techniques, and people crossing borders and mixing with what they found on the other side. Food cultures travel with people. People travel for food. Diasporas carry their cuisines with them and transform the places they arrive. Long and complex supply chains are not the enemy of good food. They are part of what makes it possible. Isolation is the death of progress. Good food has no borders.
          </p>

          <p style={{ fontSize: 17, lineHeight: 1.9, color: '#555', marginBottom: 28 }}>
            What changes when supply chains grow longer is visibility. The farmer who grew the grain, the family who pressed the oil, the fisherman who pulled the catch — they are still there. Their work, their territory, their craft is still in that product. It is just harder to follow. The original trust between maker and eater gets spread thinner across more hands, more miles, more languages.
          </p>

          <p style={{ fontSize: 17, lineHeight: 1.9, color: '#555', marginBottom: 28 }}>
            The web can make this worse — an overwhelming flood of claims, labels, and noise where it is hard to know what to believe. But it can also do something else entirely. It can be a place to connect with people who share the same curiosity. To find fellow travellers asking the same questions about where food comes from, how it travels, what it does to the planet, to our bodies, to the communities and cultures around us.
          </p>

          <p style={{ fontSize: 17, lineHeight: 1.9, color: '#555', marginBottom: 28 }}>
            Good Food Ambassador is that place. A directory that brings together what is already findable — origins, producers, methods, journeys. And a community of people working to understand it better: growers, makers, chefs, traders, eaters, researchers — anyone, anywhere along the chain, who believes that understanding food is one of the most human things we can do.
          </p>

          <p style={{ fontSize: 17, lineHeight: 1.9, color: '#555' }}>
            Good Food Ambassadors are the people keeping that original trust alive — across every distance, every border, every supply chain food travels to reach a table.
          </p>
        </div>

        <div style={{ background: LIGHT, padding: '40px 48px', marginBottom: 80, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 22, fontWeight: 600, lineHeight: 1.3 }}>
            Are you one of them?
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#777' }}>
            If you grow, make, move, research, cook, or simply care deeply about food — this community is for you. Get in touch and tell us what you do and where you are.
          </p>
          <a
            href="mailto:hello@goodfoodambassador.com?subject=I want to be a Good Food Ambassador"
            style={{
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              background: T,
              color: W,
              padding: '14px 28px',
              borderRadius: 2,
              textDecoration: 'none',
              alignSelf: 'flex-start',
            }}
          >
            Join the community →
          </a>
        </div>

        {AMBASSADORS.length > 0 && (
          <>
            <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 600, fontSize: 20, letterSpacing: '0.04em', marginBottom: 32 }}>
              The people
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, marginBottom: 80 }}>
              {AMBASSADORS.map((a) => (
                <div key={a.name} style={{ background: LIGHT, padding: '28px 32px' }}>
                  <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
                    {a.name}
                  </p>
                  <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa', marginBottom: 12 }}>
                    {a.role} · {a.location}
                  </p>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: '#777' }}>{a.bio}</p>
                </div>
              ))}
            </div>
          </>
        )}

        <div style={{ borderTop: '1px solid ' + MID, paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, color: '#bbb' }}>
            Good Food Ambassador ·{' '}
            <a href="mailto:hello@goodfoodambassador.com" style={{ color: '#bbb', textDecoration: 'none' }}>
              hello@goodfoodambassador.com
            </a>
          </p>
          <Link
            href="/"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', color: T, textDecoration: 'none', borderBottom: '1.5px solid ' + T, paddingBottom: 2 }}
          >
            ← Back to GFA
          </Link>
        </div>

      </div>
    </div>
  )
}
