import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Simple hash for demo (not production-grade — use bcrypt in production)
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

// POST /api/auth/signup
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, password, phone } = body

    if (!email || !password) {
      return NextResponse.json({ error: 'Email aur password zaroori hai' }, { status: 400 })
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password kam az kam 6 characters ka hona chahiye' }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()
    const existing = await db.user.findUnique({ where: { email: normalizedEmail } })
    if (existing) {
      return NextResponse.json({ error: 'Yeh email already registered hai. Login karein.' }, { status: 409 })
    }

    const user = await db.user.create({
      data: {
        name: name?.trim() || null,
        email: normalizedEmail,
        password: simpleHash(password),
        phone: phone?.trim() || null,
        role: 'customer',
      },
      select: { id: true, email: true, name: true, phone: true, role: true },
    })

    return NextResponse.json({ success: true, message: 'Account ban gaya!', user })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'Signup failed.' }, { status: 500 })
  }
}
