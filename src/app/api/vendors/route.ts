import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/vendors — list with filters
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const city = searchParams.get('city')
    const search = searchParams.get('search')
    const sort = searchParams.get('sort') || 'featured'
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const minRating = searchParams.get('minRating')
    const featuredOnly = searchParams.get('featured') === 'true'
    const verifiedOnly = searchParams.get('verified') === 'true'
    const limit = parseInt(searchParams.get('limit') || '50')

    const where: Record<string, unknown> = {}
    if (category && category !== 'all') where.category = category
    if (city && city !== 'all') where.city = city
    if (featuredOnly) where.featured = true
    if (verifiedOnly) where.verified = true
    if (minRating) where.rating = { gte: parseFloat(minRating) }
    if (search) {
      where.OR = [
        { businessName: { contains: search } },
        { description: { contains: search } },
        { shortDescription: { contains: search } },
        { area: { contains: search } },
        { tags: { contains: search } },
      ]
    }
    if (minPrice || maxPrice) {
      const range: Record<string, number> = {}
      if (minPrice) range.gte = parseInt(minPrice)
      if (maxPrice) range.lte = parseInt(maxPrice)
      where.startingPrice = range
    }

    let orderBy: Record<string, string>
    switch (sort) {
      case 'price-low':
        orderBy = { startingPrice: 'asc' }
        break
      case 'price-high':
        orderBy = { startingPrice: 'desc' }
        break
      case 'rating':
        orderBy = { rating: 'desc' }
        break
      case 'reviews':
        orderBy = { reviewCount: 'desc' }
        break
      default:
        orderBy = { rating: 'desc' }
    }

    const vendors = await db.vendor.findMany({
      where,
      orderBy: sort === 'featured'
        ? [{ featured: 'desc' }, { rating: 'desc' }]
        : [orderBy],
      take: limit,
    })

    const formatted = vendors.map((v) => ({
      ...v,
      gallery: v.gallery ? JSON.parse(v.gallery) : [],
      tags: v.tags ? JSON.parse(v.tags) : [],
      services: v.services ? JSON.parse(v.services) : [],
      priceMax: v.priceMax ?? 0,
    }))

    return NextResponse.json({ vendors: formatted, total: formatted.length })
  } catch (error) {
    console.error('GET /api/vendors error:', error)
    return NextResponse.json({ error: 'Failed to fetch vendors' }, { status: 500 })
  }
}
