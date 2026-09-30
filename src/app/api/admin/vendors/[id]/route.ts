import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// PATCH /api/admin/vendors/[id] — update vendor status (verified, featured, premium)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const { verified, featured, premium } = body

    const data: Record<string, unknown> = {}
    if (typeof verified === 'boolean') data.verified = verified
    if (typeof featured === 'boolean') data.featured = featured
    if (typeof premium === 'boolean') data.premium = premium

    const vendor = await db.vendor.update({
      where: { id },
      data,
      select: {
        id: true,
        businessName: true,
        verified: true,
        featured: true,
        premium: true,
      },
    })

    return NextResponse.json({ success: true, vendor })
  } catch (error) {
    console.error('PATCH /api/admin/vendors/[id] error:', error)
    return NextResponse.json({ error: 'Failed to update vendor' }, { status: 500 })
  }
}

// DELETE /api/admin/vendors/[id] — suspend/remove vendor (set featured=false, verified=false)
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await db.vendor.update({
      where: { id },
      data: { verified: false, featured: false, premium: false },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/admin/vendors/[id] error:', error)
    return NextResponse.json({ error: 'Failed to suspend vendor' }, { status: 500 })
  }
}
