import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/test-user — test if db.user works
export async function GET() {
  try {
    const count = await db.user.count()
    return NextResponse.json({ success: true, userCount: count })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to count users', detail: String(error) },
      { status: 500 }
    )
  }
}

// POST /api/test-user — test if db.user.create works
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const user = await db.user.create({
      data: {
        email: body.email || `test${Date.now()}@test.com`,
        password: 'testpassword',
        name: body.name || 'Test User',
        role: 'customer',
      },
      select: { id: true, email: true, name: true },
    })
    return NextResponse.json({ success: true, user })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user', detail: String(error) },
      { status: 500 }
    )
  }
}
