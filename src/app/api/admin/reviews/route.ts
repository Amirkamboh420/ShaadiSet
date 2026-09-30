import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/admin/reviews — list all reviews for moderation
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get('limit') || '50')

    const reviews = await db.review.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        vendor: {
          select: { businessName: true, slug: true, category: true, city: true },
        },
      },
    })

    return NextResponse.json({ reviews, total: reviews.length })
  } catch (error) {
    console.error('GET /api/admin/reviews error:', error)
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
  }
}

// DELETE /api/admin/reviews — delete a review (moderation)
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Review ID required' }, { status: 400 })
    }

    const review = await db.review.findUnique({ where: { id } })
    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 })
    }

    // Delete the review
    await db.review.delete({ where: { id } })

    // Recompute vendor rating & reviewCount
    const allReviews = await db.review.findMany({ where: { vendorId: review.vendorId } })
    const avg = allReviews.length > 0
      ? allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length
      : 0
    await db.vendor.update({
      where: { id: review.vendorId },
      data: {
        rating: parseFloat(avg.toFixed(2)),
        reviewCount: allReviews.length,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/admin/reviews error:', error)
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 })
  }
}
