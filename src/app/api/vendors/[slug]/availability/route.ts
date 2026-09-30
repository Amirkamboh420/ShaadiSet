import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/vendors/[slug]/availability — get vendor's busy dates
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const vendor = await db.vendor.findUnique({
      where: { slug },
      select: { id: true, availability: true, businessName: true },
    })
    if (!vendor) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 })
    }
    const busyDates: string[] = vendor.availability
      ? JSON.parse(vendor.availability)
      : []
    return NextResponse.json({ busyDates, vendorId: vendor.id })
  } catch (error) {
    console.error('GET availability error:', error)
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 })
  }
}

// PATCH /api/vendors/[slug]/availability — toggle a busy date
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const body = await req.json()
    const { date } = body // ISO date string (YYYY-MM-DD)

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ error: 'Valid date (YYYY-MM-DD) required' }, { status: 400 })
    }

    const vendor = await db.vendor.findUnique({ where: { slug } })
    if (!vendor) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 })
    }

    const current: string[] = vendor.availability ? JSON.parse(vendor.availability) : []
    let updated: string[]
    if (current.includes(date)) {
      // Remove (un-mark)
      updated = current.filter((d) => d !== date)
    } else {
      // Add (mark busy)
      updated = [...current, date].sort()
    }

    await db.vendor.update({
      where: { id: vendor.id },
      data: { availability: JSON.stringify(updated) },
    })

    return NextResponse.json({
      success: true,
      busyDates: updated,
      action: current.includes(date) ? 'removed' : 'added',
    })
  } catch (error) {
    console.error('PATCH availability error:', error)
    return NextResponse.json({ error: 'Failed to update availability' }, { status: 500 })
  }
}
