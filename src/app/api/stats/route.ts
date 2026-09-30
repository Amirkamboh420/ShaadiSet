import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/stats — dashboard stats
export async function GET() {
  try {
    const [
      totalVendors,
      totalInquiries,
      totalReviews,
      verifiedVendors,
      featuredVendors,
      vendorsByCategory,
      vendorsByCity,
      topVendors,
      recentInquiries,
    ] = await Promise.all([
      db.vendor.count(),
      db.inquiry.count(),
      db.review.count(),
      db.vendor.count({ where: { verified: true } }),
      db.vendor.count({ where: { featured: true } }),
      db.vendor.groupBy({
        by: ['category'],
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
      }),
      db.vendor.groupBy({
        by: ['city'],
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
      }),
      db.vendor.findMany({
        orderBy: { bookingCount: 'desc' },
        take: 5,
      }),
      db.inquiry.findMany({
        orderBy: { createdAt: 'desc' },
        take: 8,
        include: { vendor: true },
      }),
    ])

    const avgRating = await db.vendor.aggregate({
      _avg: { rating: true },
    })

    // GMV estimate (sum of startingPrice * bookingCount as a proxy)
    const vendors = await db.vendor.findMany({ select: { startingPrice: true, bookingCount: true } })
    const estimatedGmv = vendors.reduce((sum, v) => sum + (v.startingPrice * v.bookingCount), 0)

    return NextResponse.json({
      totalVendors,
      totalInquiries,
      totalReviews,
      verifiedVendors,
      featuredVendors,
      avgRating: avgRating._avg.rating?.toFixed(2) || '0.00',
      estimatedGmv,
      vendorsByCategory: vendorsByCategory.map((c) => ({ category: c.category, count: c._count.id })),
      vendorsByCity: vendorsByCity.map((c) => ({ city: c.city, count: c._count.id })),
      topVendors: topVendors.map((v) => ({
        businessName: v.businessName,
        slug: v.slug,
        category: v.category,
        city: v.city,
        bookingCount: v.bookingCount,
        rating: v.rating,
      })),
      recentInquiries: recentInquiries.map((i) => ({
        id: i.id,
        customerName: i.customerName,
        eventType: i.eventType,
        eventDate: i.eventDate,
        status: i.status,
        vendorName: i.vendor.businessName,
        createdAt: i.createdAt,
      })),
    })
  } catch (error) {
    console.error('GET /api/stats error:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
