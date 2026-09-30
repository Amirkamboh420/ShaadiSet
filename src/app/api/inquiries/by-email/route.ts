import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/inquiries/by-email?email=xxx — get inquiries for a specific user
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    // Find inquiries where customerEmail matches or customerPhone matches user's phone
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { phone: true, name: true },
    })

    if (!user) {
      return NextResponse.json({ inquiries: [], message: 'User not found' })
    }

    // Get inquiries by email or phone
    const inquiries = await db.inquiry.findMany({
      where: {
        OR: [
          { customerEmail: email.toLowerCase() },
          ...(user.phone ? [{ customerPhone: { contains: user.phone.replace(/[^0-9]/g, '') } }] : []),
        ],
      },
      orderBy: { createdAt: 'desc' },
      include: {
        vendor: {
          select: {
            businessName: true,
            slug: true,
            category: true,
            city: true,
            coverImage: true,
          },
        },
      },
      take: 50,
    })

    return NextResponse.json({
      inquiries: inquiries.map((i) => ({
        id: i.id,
        customerName: i.customerName,
        eventType: i.eventType,
        eventDate: i.eventDate,
        city: i.city,
        guestCount: i.guestCount,
        budget: i.budget,
        message: i.message,
        status: i.status,
        createdAt: i.createdAt,
        vendor: i.vendor,
      })),
    })
  } catch (error) {
    console.error('GET /api/inquiries/by-email error:', error)
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 })
  }
}
