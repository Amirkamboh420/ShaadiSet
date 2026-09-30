import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// POST /api/reviews — create a review
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { vendorSlug, customerName, rating, title, comment, eventDate, eventType } = body

    if (!vendorSlug || !customerName || !rating || !comment) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const vendor = await db.vendor.findUnique({ where: { slug: vendorSlug } })
    if (!vendor) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 })
    }

    const review = await db.review.create({
      data: {
        vendorId: vendor.id,
        customerName,
        rating: parseFloat(rating),
        title: title || null,
        comment,
        eventDate: eventDate || null,
        eventType: eventType || null,
      },
    })

    // Update vendor rating & reviewCount
    const allReviews = await db.review.findMany({ where: { vendorId: vendor.id } })
    const avg = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
    await db.vendor.update({
      where: { id: vendor.id },
      data: {
        rating: parseFloat(avg.toFixed(2)),
        reviewCount: allReviews.length,
      },
    })

    return NextResponse.json({ success: true, review })
  } catch (error) {
    console.error('POST /api/reviews error:', error)
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 })
  }
}
