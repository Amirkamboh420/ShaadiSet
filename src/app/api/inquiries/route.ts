import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// POST /api/inquiries — create a new booking inquiry
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { vendorSlug, customerName, customerPhone, customerEmail, eventDate, eventType, city, guestCount, budget, message } = body

    if (!vendorSlug || !customerName || !customerPhone || !eventDate || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const vendor = await db.vendor.findUnique({ where: { slug: vendorSlug } })
    if (!vendor) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 })
    }

    const inquiry = await db.inquiry.create({
      data: {
        vendorId: vendor.id,
        customerName,
        customerPhone,
        customerEmail: customerEmail || null,
        eventDate,
        eventType: eventType || 'Not specified',
        city: city || vendor.city,
        guestCount: guestCount ? parseInt(guestCount) : null,
        budget: budget ? parseInt(budget) : null,
        message,
        status: 'pending',
      },
    })

    return NextResponse.json({
      success: true,
      inquiry,
      message: 'Inquiry sent! Vendor will respond shortly.',
    })
  } catch (error) {
    console.error('POST /api/inquiries error:', error)
    return NextResponse.json({ error: 'Failed to create inquiry' }, { status: 500 })
  }
}

// GET /api/inquiries — list inquiries (for vendor/admin dashboard)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const vendorSlug = searchParams.get('vendorSlug')
    const status = searchParams.get('status')

    const where: Record<string, unknown> = {}
    if (status) where.status = status
    if (vendorSlug) {
      const vendor = await db.vendor.findUnique({ where: { slug: vendorSlug } })
      if (vendor) where.vendorId = vendor.id
    }

    const inquiries = await db.inquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { vendor: true },
      take: 100,
    })

    return NextResponse.json({ inquiries })
  } catch (error) {
    console.error('GET /api/inquiries error:', error)
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 })
  }
}
