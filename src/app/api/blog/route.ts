import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/blog
export async function GET() {
  try {
    const posts = await db.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ posts })
  } catch (error) {
    console.error('GET /api/blog error:', error)
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 })
  }
}
