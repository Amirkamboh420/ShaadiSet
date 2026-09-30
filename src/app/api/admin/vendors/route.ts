import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/admin/vendors — list all vendors for admin management
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const filter = searchParams.get('filter') || 'all' // all, verified, unverified, featured, premium

    const where: Record<string, unknown> = {}
    if (filter === 'verified') where.verified = true
    if (filter === 'unverified') where.verified = false
    if (filter === 'featured') where.featured = true
    if (filter === 'premium') where.premium = true

    const vendors = await db.vendor.findMany({
      where,
      orderBy: [{ verified: 'asc' }, { createdAt: 'desc' }],
      take: 100,
      select: {
        id: true,
        businessName: true,
        slug: true,
        category: true,
        city: true,
        area: true,
        startingPrice: true,
        rating: true,
        reviewCount: true,
        bookingCount: true,
        verified: true,
        featured: true,
        premium: true,
        yearsActive: true,
        createdAt: true,
      },
    })

    return NextResponse.json({ vendors, total: vendors.length })
  } catch (error) {
    console.error('GET /api/admin/vendors error:', error)
    return NextResponse.json({ error: 'Failed to fetch vendors' }, { status: 500 })
  }
}
