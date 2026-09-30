import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/cities
export async function GET() {
  try {
    const cities = await db.city.findMany({ orderBy: { name: 'asc' } })
    return NextResponse.json({ cities })
  } catch (error) {
    console.error('GET /api/cities error:', error)
    return NextResponse.json({ error: 'Failed to fetch cities' }, { status: 500 })
  }
}
