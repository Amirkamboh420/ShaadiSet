import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Simple hash for demo (must match signup route)
function simpleHash(str: string): string {
  let hash = 0
  const salt = 'shaadiset2025'
  const input = salt + str
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(36) + '_' + input.length.toString(36)
}

// POST /api/auth/login
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: 'Email aur password zaroori hai' }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()
    const user = await db.user.findUnique({ where: { email: normalizedEmail } })

    if (!user || !user.password) {
      return NextResponse.json({ error: 'Galat email ya password' }, { status: 401 })
    }

    if (user.password !== simpleHash(password)) {
      return NextResponse.json({ error: 'Galat email ya password' }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role },
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Login failed.' }, { status: 500 })
  }
}
