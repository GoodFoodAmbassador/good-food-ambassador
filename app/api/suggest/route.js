import { NextResponse }    from 'next/server'
import { submitSuggestion } from '@/lib/airtable'

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, producer, origin, category, description, buyLinks, submittedBy } = body

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Product name is required.' }, { status: 400 })
    }
    if (!category) {
      return NextResponse.json({ error: 'Category is required.' }, { status: 400 })
    }

    await submitSuggestion({ name: name.trim(), producer, origin, category, description, buyLinks, submittedBy })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[suggest] error:', err)
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
  }
}
