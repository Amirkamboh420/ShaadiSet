import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/vendors/[slug] — single vendor with packages & reviews
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const vendor = await db.vendor.findUnique({ where: { slug } })
    if (!vendor) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 })
    }
    const [packages, reviews, similar] = await Promise.all([
      db.package.findMany({ where: { vendorId: vendor.id }, orderBy: { price: 'asc' } }),
      db.review.findMany({
        where: { vendorId: vendor.id },
        orderBy: { createdAt: 'desc' },
      }),
      db.vendor.findMany({
        where: {
          category: vendor.category,
          slug: { not: slug },
        },
        take: 3,
        orderBy: { rating: 'desc' },
      }),
    ])

    return NextResponse.json({
      vendor: {
        ...vendor,
        gallery: vendor.gallery ? JSON.parse(vendor.gallery) : [],
        tags: vendor.tags ? JSON.parse(vendor.tags) : [],
        services: vendor.services ? JSON.parse(vendor.services) : [],
        priceMax: vendor.priceMax ?? 0,
      },
      packages: packages.map((p) => ({
        ...p,
        features: p.features ? JSON.parse(p.features) : [],
      })),
      reviews,
      similar: similar.map((v) => ({
        ...v,
        gallery: v.gallery ? JSON.parse(v.gallery) : [],
        tags: v.tags ? JSON.parse(v.tags) : [],
        services: v.services ? JSON.parse(v.services) : [],
        priceMax: v.priceMax ?? 0,
      })),
    })
  } catch (error) {
    console.error('GET /api/vendors/[slug] error:', error)
    return NextResponse.json({ error: 'Failed to fetch vendor' }, { status: 500 })
  }
}
