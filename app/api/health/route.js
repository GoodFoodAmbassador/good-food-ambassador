import { NextResponse } from 'next/server'

export async function GET() {
  const apiKey = process.env.AIRTABLE_API_KEY
  const baseId = process.env.AIRTABLE_BASE_ID
  const table  = process.env.AIRTABLE_TABLE_NAME || 'Products'

  // Check env vars
  if (!apiKey) return NextResponse.json({ error: 'AIRTABLE_API_KEY not set' }, { status: 500 })
  if (!baseId) return NextResponse.json({ error: 'AIRTABLE_BASE_ID not set' }, { status: 500 })

  // Try a minimal Airtable request (just 1 record, no filter)
  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}?maxRecords=1`

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
      cache: 'no-store',
    })

    const body = await res.json()

    if (!res.ok) {
      return NextResponse.json({
        status: res.status,
        error: body?.error?.type || 'Airtable API error',
        message: body?.error?.message || JSON.stringify(body),
      }, { status: 200 })
    }

    const count = body.records?.length ?? 0
    return NextResponse.json({
      ok: true,
      recordsFetched: count,
      firstRecord: count > 0 ? body.records[0].fields?.Name : null,
      baseId,
      table,
      tokenPrefix: apiKey.substring(0, 8) + '...',
    })
  } catch (err) {
    return NextResponse.json({ error: 'fetch threw', message: err.message }, { status: 500 })
  }
}
