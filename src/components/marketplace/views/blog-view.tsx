'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  Search,
  BookOpen,
  User,
  ChevronRight,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useMarketplace } from '@/lib/store'
import type { BlogPost } from '@/lib/types'
import {
  SectionTitle,
  MandalaBg,
  DecorativeHeart,
  FloralPattern,
} from '@/components/marketplace/wedding-decor'

interface BlogPostWithData extends BlogPost {
  readTime: number
}

const CATEGORY_CHIPS = [
  'All',
  'Planning',
  'Decor',
  'Photography',
  'Beauty',
  'Catering',
  'Venue',
  'Trends',
]

export function BlogView() {
  const { setView } = useMarketplace()
  const [posts, setPosts] = useState<BlogPostWithData[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/blog')
      .then((r) => r.json())
      .then((data) => {
        const enriched = (data.posts || []).map((p: BlogPost) => ({
          ...p,
          readTime: Math.max(2, Math.ceil(p.content.split(' ').length / 200)),
        }))
        setPosts(enriched)
      })
      .catch(() => {})
      .finally(() => {
        Promise.resolve().then(() => setLoading(false))
      })
  }, [])

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchCat = category === 'All' || p.category === category
      const matchSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [posts, category, search])

  const selectedPost = selectedSlug ? posts.find((p) => p.slug === selectedSlug) : null

  if (selectedPost) {
    return (
      <BlogPostDetail
        post={selectedPost as BlogPostWithData}
        onBack={() => setSelectedSlug(null)}
        relatedPosts={posts
          .filter((p) => p.slug !== selectedPost.slug && p.category === selectedPost.category)
          .slice(0, 3)}
        onSelectRelated={(slug) => {
          setSelectedSlug(slug)
          if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
        setView={setView}
      />
    )
  }

  const featured = filtered[0]
  const restPosts = filtered.slice(1)

  return (
    <div className="dkr-bg-secondary min-h-screen">
      {/* ===== HERO ===== */}
      <section className="dkr-hero-gradient relative overflow-hidden">
        <MandalaBg className="text-[#C61162] -right-32 -top-32 h-[500px] w-[500px]" opacity={0.08} />
        <FloralPattern className="text-[#EAA552]" opacity={0.04} />
        <DecorativeHeart className="dkr-float absolute left-12 top-32 h-6 w-6 text-[#C61162]/30" />
        <DecorativeHeart className="dkr-heart-pulse absolute right-20 top-44 h-4 w-4 text-[#EAA552]/40" />

        <div className="container relative mx-auto px-4 py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 bg-[#FAE6EF] text-[#C61162] hover:bg-[#FAE6EF]/80">
              <BookOpen className="mr-1.5 h-3 w-3" /> ShaadiSet Talks
            </Badge>
            <h1 className="font-serif text-4xl font-bold leading-tight text-[#222B45] md:text-6xl dkr-fade-up">
              ShaadiSet Talks —{' '}
              <span className="dkr-text-gradient">Voices That Matter</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-[#8F9BB3] md:text-lg dkr-fade-up">
              Budget guides, decor trends, vendor checklists aur real bride
              stories — sab kuch jo aapko apni shaadi plan karne ke liye chahiye.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Search + filter chips */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8F9BB3]" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="border-[#FAE6EF] bg-white pl-9 focus-visible:border-[#C61162] focus-visible:ring-[#C61162]/20"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_CHIPS.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  category === cat
                    ? 'dkr-btn-primary text-white shadow-sm'
                    : 'border border-[#FAE6EF] bg-white text-[#8F9BB3] hover:border-[#C61162]/30 hover:text-[#C61162]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured post (first) */}
        {featured && !search && category === 'All' && (
          <button
            onClick={() => setSelectedSlug(featured.slug)}
            className="dkr-card group mb-10 block w-full overflow-hidden text-left dkr-fade-up"
          >
            <div className="grid overflow-hidden md:grid-cols-2">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#FAE6EF] md:aspect-auto">
                <img
                  src={featured.imageUrl || '/vendors/hero.jpg'}
                  alt={featured.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <Badge className="absolute left-3 top-3 bg-gradient-to-r from-[#C61162] to-[#9A0E4C] text-white hover:opacity-90">
                  <Star /> Featured
                </Badge>
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8">
                <Badge className="mb-3 w-fit bg-[#FAE6EF] text-[#C61162] hover:bg-[#FAE6EF]/80">
                  {featured.category}
                </Badge>
                <h2 className="font-serif text-2xl font-bold leading-tight text-[#222B45] md:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#8F9BB3] line-clamp-3">
                  {featured.excerpt}
                </p>
                <div className="mt-5 flex items-center gap-4 text-xs text-[#8F9BB3]">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" /> {featured.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {featured.readTime} min read
                  </span>
                </div>
                <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-[#C61162]">
                  Read article
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </button>
        )}

        {/* Grid of posts */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-96 rounded-xl shimmer border border-[#FAE6EF] bg-white"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="dkr-card p-12 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-[#8F9BB3]/40" />
            <h3 className="mt-4 font-serif text-lg font-semibold text-[#222B45]">
              Koi article nahi mila
            </h3>
            <p className="mt-1 text-sm text-[#8F9BB3]">
              Apni search ya filter change karein.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(search || category !== 'All' ? filtered : restPosts).map((post, i) => (
              <button
                key={post.slug}
                onClick={() => setSelectedSlug(post.slug)}
                className="dkr-card group block overflow-hidden text-left dkr-fade-up"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#FAE6EF]">
                  <img
                    src={post.imageUrl || '/vendors/hero.jpg'}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge className="absolute left-3 top-3 bg-white/95 text-[#C61162] backdrop-blur hover:bg-white">
                    {post.category}
                  </Badge>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-base font-bold leading-snug text-[#222B45] line-clamp-2 transition-colors group-hover:text-[#C61162]">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#8F9BB3] line-clamp-2">
                    {post.excerpt}
                  </p>
                  <Separator className="my-3 bg-[#FAE6EF]" />
                  <div className="flex items-center justify-between text-[10px] text-[#8F9BB3]">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" /> {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {post.readTime} min
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <SectionTitle icon={<DecorativeHeart className="h-4 w-4 text-[#C61162]" />}>
            Apni Shaadi Ke Vendors Dhoondhein
          </SectionTitle>
          <p className="mx-auto -mt-4 mb-6 max-w-xl text-sm text-[#8F9BB3]">
            5000+ verified vendors across Pakistan. Abhi browse karein.
          </p>
          <Button
            onClick={() => setView('browse')}
            className="dkr-btn-primary h-12 px-8 text-sm"
          >
            Browse Vendors <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

// ===== Star icon for Featured badge (inline to avoid extra import) =====
function Star() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="mr-1 h-3 w-3"
    >
      <path d="M12 2 L14.39 8.26 L21 9.27 L16.5 13.97 L17.77 20.5 L12 17.27 L6.23 20.5 L7.5 13.97 L3 9.27 L9.61 8.26 Z" />
    </svg>
  )
}

function BlogPostDetail({
  post,
  onBack,
  relatedPosts,
  onSelectRelated,
  setView,
}: {
  post: BlogPostWithData
  onBack: () => void
  relatedPosts: BlogPostWithData[]
  onSelectRelated: (slug: string) => void
  setView: (view: 'home' | 'browse') => void
}) {
  // Simple markdown rendering: headings, paragraphs, lists
  const renderContent = (content: string) => {
    const lines = content.split('\n')
    const elements: React.ReactNode[] = []
    let listItems: string[] = []

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul
            key={`ul-${elements.length}`}
            className="my-4 ml-6 list-disc space-y-2 text-base text-[#222B45]"
          >
            {listItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )
        listItems = []
      }
    }

    lines.forEach((line, i) => {
      const trimmed = line.trim()
      if (trimmed.startsWith('# ')) {
        flushList()
        elements.push(
          <h1
            key={i}
            className="mt-8 font-serif text-3xl font-bold text-[#222B45]"
          >
            {trimmed.slice(2)}
          </h1>
        )
      } else if (trimmed.startsWith('## ')) {
        flushList()
        elements.push(
          <h2
            key={i}
            className="mt-8 font-serif text-2xl font-bold text-[#222B45]"
          >
            {trimmed.slice(3)}
          </h2>
        )
      } else if (trimmed.startsWith('### ')) {
        flushList()
        elements.push(
          <h3
            key={i}
            className="mt-6 font-serif text-xl font-semibold text-[#C61162]"
          >
            {trimmed.slice(4)}
          </h3>
        )
      } else if (trimmed.startsWith('- ') || /^\d+\./.test(trimmed)) {
        listItems.push(trimmed.replace(/^(- |\d+\.\s)/, ''))
      } else if (trimmed === '') {
        flushList()
      } else {
        flushList()
        elements.push(
          <p key={i} className="my-3 text-base leading-relaxed text-[#222B45]/80">
            {trimmed}
          </p>
        )
      }
    })
    flushList()
    return elements
  }

  return (
    <div className="dkr-bg-secondary animate-fade-up">
      {/* Hero image */}
      <div className="relative aspect-[21/9] w-full overflow-hidden bg-[#FAE6EF] md:aspect-[21/8]">
        <img
          src={post.imageUrl || '/vendors/hero.jpg'}
          alt={post.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#222B45]/90 via-[#222B45]/30 to-transparent" />
        <MandalaBg className="text-white -right-20 -top-20 h-72 w-72" opacity={0.1} />

        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container mx-auto px-4 pb-8 md:pb-10">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="mb-4 bg-white/15 text-white backdrop-blur hover:bg-white/25 hover:text-white"
            >
              <ArrowLeft className="mr-1.5 h-4 w-4" /> All articles
            </Button>
            <Badge className="mb-3 w-fit bg-gradient-to-r from-[#C61162] to-[#9A0E4C] text-white backdrop-blur hover:opacity-90">
              {post.category}
            </Badge>
            <h1 className="max-w-3xl font-serif text-2xl font-bold leading-tight text-white md:text-4xl md:text-balance">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      <article className="container mx-auto max-w-3xl px-4 py-12">
        {/* Meta */}
        <div className="mb-6 flex flex-wrap items-center gap-4 text-xs text-[#8F9BB3]">
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" /> {post.author}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {post.readTime} min read
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(post.createdAt).toLocaleDateString('en-PK', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </div>

        <Separator className="mb-6 bg-[#FAE6EF]" />

        {/* Content */}
        <div className="prose prose-sm max-w-none md:prose-base">
          {renderContent(post.content)}
        </div>

        <Separator className="my-10 bg-[#FAE6EF]" />

        {/* CTA */}
        <div className="dkr-gradient-border rounded-2xl">
          <Card className="border-0 bg-gradient-to-br from-[#FAE6EF] to-white p-6 md:p-8">
            <h3 className="font-serif text-xl font-bold text-[#222B45]">
              Apni shaadi ke vendors dhoondh rahe hain?
            </h3>
            <p className="mt-2 text-sm text-[#8F9BB3]">
              Browse karein Pakistan ke best wedding vendors — photographers,
              decorators, caterers aur baaki sab. 5000+ verified vendors ka
              intezaar hai.
            </p>
            <Button
              onClick={() => setView('browse')}
              className="mt-4 dkr-btn-primary h-11 px-6 text-sm"
            >
              Browse Vendors <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </Card>
        </div>

        {/* Related */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h3 className="mb-6 font-serif text-2xl font-bold text-[#222B45]">
              Related Articles
            </h3>
            <div className="grid gap-5 sm:grid-cols-3">
              {relatedPosts.map((rp) => (
                <button
                  key={rp.slug}
                  onClick={() => onSelectRelated(rp.slug)}
                  className="dkr-card group block overflow-hidden text-left"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-[#FAE6EF]">
                    <img
                      src={rp.imageUrl || '/vendors/hero.jpg'}
                      alt={rp.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <Badge className="mb-2 bg-[#FAE6EF] text-[#C61162] hover:bg-[#FAE6EF]/80">
                      {rp.category}
                    </Badge>
                    <h4 className="font-serif text-sm font-semibold leading-snug text-[#222B45] line-clamp-2 transition-colors group-hover:text-[#C61162]">
                      {rp.title}
                    </h4>
                    <div className="mt-2 flex items-center justify-between text-[10px] text-[#8F9BB3]">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {rp.readTime} min
                      </span>
                      <span className="flex items-center font-semibold text-[#C61162]">
                        Read <ChevronRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}
