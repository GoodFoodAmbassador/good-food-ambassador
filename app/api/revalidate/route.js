import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

// Category paths that need revalidating when Airtable changes
const CATEGORY_PATHS = [
  '/olive-oils',
  '/grains',
  '/legumes',
  '/snacks',
  '/seafood',
  '/lna',
]

export async function POST(request) {
  const secret = request.headers.get('x-revalidate-secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  // Optionally target a specific category
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  const paths = category ? [`/${category}`] : CATEGORY_PATHS

  for (const path of paths) {
    revalidatePath(path)
  }

  return NextResponse.json({
    revalidated: true,
    paths,
    timestamp: new Date().toISOString(),
  })
}

// Also support GET for easy testing from a browser
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  const category = searchParams.get('category')
  const paths = category ? [`/${category}`] : CATEGORY_PATHS

  for (const path of paths) {
    revalidatePath(path)
  }

  return NextResponse.json({
    revalidated: true,
    paths,
    timestamp: new Date().toISOString(),
  })
}
