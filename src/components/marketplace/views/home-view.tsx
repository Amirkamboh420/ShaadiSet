'use client'

import { useState } from 'react'
import {
  Search,
  MapPin,
  ShieldCheck,
  Users,
  Star,
  Heart,
  MessageCircle,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Camera,
  Flower2,
  UtensilsCrossed,
  Building2,
  Music,
  Brush,
  Mail,
  Lock,
  Eye,
  Bell,
  Smartphone,
  Download,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Icon } from '@/components/marketplace/icon'
import {
  OrnamentalDivider,
  FloralPattern,
  MandalaBg,
  WeddingRings,
  DecorativeHeart,
  GoldText,
  SectionTitle,
} from '@/components/marketplace/wedding-decor'
import { VendorCard } from '@/components/marketplace/vendor-card'
import { StarRating } from '@/components/marketplace/star-rating'
import { useMarketplace } from '@/lib/store'
import { useVendors, useCategories, useCities } from '@/lib/hooks'
import { CATEGORIES, CITIES } from '@/lib/constants'

const SUCCESS_STORIES = [
  { couple: 'Ahmed & Ayesha', city: 'Lahore', story: 'ShaadiSet pe milne ke baad humari families ne rishta finalize kiya. Best decision!', date: 'Dec 2024', image: '/vendors/couple-1.jpg' },
  { couple: 'Bilal & Zainab', city: 'Karachi', story: 'Photographer aur decorator dono yahan se book kiye — sab perfect tha!', date: 'Nov 2024', image: '/vendors/couple-2.jpg' },
  { couple: 'Imran & Fatima', city: 'Islamabad', story: 'Budget tracker ne humari planning itni easy bana di. Highly recommend!', date: 'Oct 2024', image: '/vendors/couple-3.jpg' },
]

const STATS = [
  { number: '98+', label: 'Verified Vendors', icon: ShieldCheck },
  { number: '7', label: 'Cities Covered', icon: MapPin },
  { number: '2.5K+', label: 'Happy Couples', icon: Heart },
  { number: '4.6★', label: 'Avg Rating', icon: Star },
]

const FEATURES = [
  { icon: ShieldCheck, title: 'Verified Vendors', desc: 'Har vendor ka CNIC aur portfolio verify hota hai. Trust guaranteed.' },
  { icon: Search, title: 'Smart Search', desc: 'City, category, budget, rating — sab filters ke saath perfect vendor dhundein.' },
  { icon: Heart, title: 'Save Favorites', desc: 'Pasand aaye vendors ko save karein aur baad mein compare karein.' },
  { icon: MessageCircle, title: 'Direct Chat', desc: 'Vendor se seedhe chat karein — WhatsApp ya in-app messaging.' },
  { icon: TrendingUp, title: 'Bundle & Save', desc: 'Multiple vendors ek saath book karein aur up to 20% discount paayein.' },
  { icon: Sparkles, title: 'AI Match', desc: 'Budget aur style batayein — AI best vendors recommend karega.' },
]

const STEPS = [
  { icon: Search, title: 'Search & Discover', desc: 'City, category aur budget ke hisaab se vendors browse karein. Real reviews aur portfolios dekhein.' },
  { icon: Heart, title: 'Compare & Save', desc: '2-3 vendors ko ek saath compare karein — pricing, packages, ratings aur services.' },
  { icon: MessageCircle, title: 'Inquiry & Book', desc: 'WhatsApp ya inquiry form se seedha vendor se baat karein. Booking confirm karein.' },
]

export function HomeView() {
  const { setView, setFilters } = useMarketplace()
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('all')
  const [category, setCategory] = useState('all')

  const { vendors: featured } = useVendors({ featured: true, limit: '8' })
  const { vendors: top } = useVendors({ sort: 'rating', limit: '4' })
  const { categories } = useCategories()
  const { cities: cityData } = useCities()

  const handleSearch = () => {
    setFilters({ search, city, category })
    setView('browse')
  }

  return (
    <div className="dkr-fade-up">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden dkr-hero-gradient">
        {/* Decorative mandala patterns */}
        <MandalaBg className="-right-20 -top-20 text-[#C61162]" opacity={0.06} />
        <MandalaBg className="-left-32 bottom-0 text-[#EAA552]" opacity={0.04} />

        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-28">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            {/* Left: Content */}
            <div className="dkr-fade-up">
              {/* Badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#C61162]/20 bg-white/80 px-4 py-1.5 backdrop-blur-sm">
                <WeddingRings className="h-4 w-4 text-[#C61162] dkr-float" />
                <span className="text-xs font-medium tracking-wide text-[#C61162]">
                  Pakistan ka pehla wedding vendor marketplace
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-[#222B45] md:text-5xl lg:text-6xl text-balance">
                Ab Hogi Apki Shaadi{' '}
                <span className="dkr-text-gradient">Sab Kuch Ek Jagah</span>
              </h1>

              {/* Decorative line */}
              <div className="mt-4 flex items-center gap-3">
                <span className="h-px w-16 bg-gradient-to-r from-[#C61162]/40 to-transparent" />
                <DecorativeHeart className="h-4 w-4 text-[#EAA552] dkr-heart-pulse" />
                <span className="h-px w-16 bg-gradient-to-l from-[#C61162]/40 to-transparent" />
              </div>

              <p className="mt-5 text-lg text-[#8F9BB3] md:text-xl text-balance max-w-lg">
                Photographers, decorators, caterers aur baaki sab vendors —
                browse, compare aur book karein. Reviews, pricing aur packages — sab transparent.
              </p>

              {/* Search bar */}
              <div className="mt-8 dkr-fade-up" style={{ animationDelay: '0.2s' }}>
                <div className="dkr-card rounded-2xl p-2 shadow-lg shadow-[#C61162]/5">
                  <div className="grid gap-2 sm:grid-cols-[1fr_auto_auto] md:items-center">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8F9BB3]" />
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        placeholder="Vendor name, service ya area..."
                        className="w-full border-0 bg-transparent pl-9 text-sm text-[#222B45] placeholder:text-[#8F9BB3] focus:outline-none"
                      />
                    </div>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="rounded-lg border border-[#8F9BB3]/20 bg-[#F6F9FC] px-3 py-2 text-sm text-[#222B45] focus:outline-none"
                    >
                      <option value="all">All Cities</option>
                      {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <Button onClick={handleSearch} className="dkr-btn-primary border-0">
                      <Search className="mr-1.5 h-4 w-4" /> Search
                    </Button>
                  </div>
                </div>
              </div>

              {/* Quick category chips */}
              <div className="mt-4 flex flex-wrap gap-2">
                {CATEGORIES.slice(0, 5).map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => { setFilters({ category: cat.slug }); setView('browse') }}
                    className="inline-flex items-center gap-1 rounded-full border border-[#FAE6EF] bg-white px-3 py-1 text-xs font-medium text-[#8F9BB3] transition hover:border-[#C61162]/30 hover:text-[#C61162]"
                  >
                    <Icon name={cat.icon} className="h-3 w-3" />
                    {cat.shortName}
                  </button>
                ))}
                <button
                  onClick={() => setView('browse')}
                  className="inline-flex items-center gap-1 rounded-full bg-[#FAE6EF] px-3 py-1 text-xs font-medium text-[#C61162] transition hover:bg-[#C61162] hover:text-white"
                >
                  All Categories <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Right: Hero image */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#C61162]/10">
                <img
                  src="/vendors/couple-1.jpg"
                  alt="Pakistani wedding couple"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#9A0E4C]/30 via-transparent to-transparent" />
                {/* Floating stat card */}
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/95 backdrop-blur p-4 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold dkr-text-gradient">98+</div>
                      <div className="text-xs text-[#8F9BB3]">Verified Vendors</div>
                    </div>
                    <div className="h-10 w-px bg-[#8F9BB3]/20" />
                    <div>
                      <div className="text-2xl font-bold dkr-text-gradient">4.6★</div>
                      <div className="text-xs text-[#8F9BB3]">Avg Rating</div>
                    </div>
                    <div className="h-10 w-px bg-[#8F9BB3]/20" />
                    <div>
                      <div className="text-2xl font-bold dkr-text-gradient">7</div>
                      <div className="text-xs text-[#8F9BB3]">Cities</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative floating heart */}
              <div className="absolute -top-4 -right-4 grid h-16 w-16 place-items-center rounded-full bg-white shadow-xl dkr-float">
                <Heart className="h-7 w-7 text-[#C61162] dkr-heart-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient transition */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C61162] via-[#EAA552] to-[#C61162]" />
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center dkr-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="mx-auto mb-2 grid h-14 w-14 place-items-center rounded-full bg-[#FAE6EF]">
                  <stat.icon className="h-6 w-6 text-[#C61162]" />
                </div>
                <div className="dkr-stat-number">{stat.number}</div>
                <div className="text-sm text-[#8F9BB3]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="dkr-section dkr-bg-secondary">
        <div className="container mx-auto px-4">
          <SectionTitle icon={<DecorativeHeart className="h-4 w-4 text-[#C61162]" />}>
            Browse by Category
          </SectionTitle>
          <p className="mb-8 text-center text-[#8F9BB3] -mt-4">
            Apni shaadi ke har zaroorat ke liye saare vendors
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {CATEGORIES.map((cat, i) => {
              const dbCat = categories.find((c) => c.slug === cat.slug)
              const count = dbCat?.vendorCount ?? 0
              return (
                <button
                  key={cat.slug}
                  onClick={() => { setFilters({ category: cat.slug, city: 'all' }); setView('browse') }}
                  className="dkr-profile-card group p-5 text-center dkr-fade-up"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="dkr-feature-icon mx-auto mb-3">
                    <Icon name={cat.icon} className="h-7 w-7 text-[#C61162]" />
                  </div>
                  <h3 className="font-semibold text-[#222B45]">{cat.shortName}</h3>
                  <p className="mt-1 text-xs text-[#8F9BB3] line-clamp-1">{cat.description}</p>
                  <div className="mt-2 text-xs font-medium text-[#C61162]">{count} vendors</div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== FEATURED VENDORS ===== */}
      <section className="dkr-section bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle icon={<WeddingRings className="h-5 w-5 text-[#C61162]" />}>
            Featured Vendors
          </SectionTitle>
          <p className="mb-8 text-center text-[#8F9BB3] -mt-4">
            Top-rated, verified &amp; most-booked vendors this season
          </p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.length === 0
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-80 rounded-xl shimmer" />
                ))
              : featured.slice(0, 4).map((v, i) => (
                  <div key={v.id} className="dkr-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
                    <VendorCard vendor={v} />
                  </div>
                ))}
          </div>
          <div className="mt-8 text-center">
            <Button onClick={() => setView('browse')} className="dkr-btn-primary">
              View All Vendors <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US (FEATURES) ===== */}
      <section className="dkr-section dkr-bg-secondary">
        <div className="container mx-auto px-4">
          <SectionTitle>
            Finding Your Perfect Vendor Just Got Easier
          </SectionTitle>
          <p className="mb-10 text-center text-[#8F9BB3] -mt-4">
            ShaadiSet pe har cheez transparent, verified aur easy hai
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {FEATURES.map((f, i) => (
              <div key={i} className="dkr-profile-card p-6 dkr-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="dkr-feature-icon mb-4">
                  <f.icon className="h-7 w-7 text-[#C61162]" />
                </div>
                <h3 className="text-lg font-semibold text-[#222B45]">{f.title}</h3>
                <p className="mt-2 text-sm text-[#8F9BB3]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="dkr-section bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle>
            How ShaadiSet Works
          </SectionTitle>
          <p className="mb-10 text-center text-[#8F9BB3] -mt-4">
            3 simple steps — apna perfect vendor dhund lein
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <div key={i} className="dkr-profile-card relative p-6 dkr-fade-up" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="absolute right-4 top-4 font-serif text-5xl font-bold text-[#FAE6EF]">
                  {i + 1}
                </div>
                <div className="relative">
                  <div className="dkr-feature-icon mb-4">
                    <step.icon className="h-7 w-7 text-[#C61162]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#222B45]">{step.title}</h3>
                  <p className="mt-2 text-sm text-[#8F9BB3]">{step.desc}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <ChevronRight className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-[#EAA552] md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EXPLORE BY CITY ===== */}
      <section className="dkr-section dkr-bg-secondary">
        <div className="container mx-auto px-4">
          <SectionTitle icon={<MapPin className="h-4 w-4 text-[#C61162]" />}>
            Explore by City
          </SectionTitle>
          <p className="mb-8 text-center text-[#8F9BB3] -mt-4">
            Pakistan ke top wedding cities ke best vendors
          </p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {CITIES.map((city, i) => {
              const cityObj = cityData.find((c) => c.name === city)
              const count = cityObj?.vendorCount ?? 0
              return (
                <button
                  key={city}
                  onClick={() => { setView('city'); setFilters({ city }) }}
                  className="dkr-profile-card group p-6 text-left dkr-fade-up"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <MapPin className="h-6 w-6 text-[#C61162]" />
                  <h3 className="mt-3 font-serif text-xl font-bold text-[#222B45]">{city}</h3>
                  <p className="mt-1 text-xs text-[#8F9BB3]">
                    {count > 0 ? `${count} verified vendors` : 'Best wedding vendors'}
                  </p>
                  <div className="mt-3 inline-flex items-center text-xs font-medium text-[#C61162]">
                    Explore <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== SUCCESS STORIES ===== */}
      <section className="dkr-section bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle icon={<Heart className="h-4 w-4 text-[#C61162]" />}>
            Success Stories
          </SectionTitle>
          <p className="mb-8 text-center text-[#8F9BB3] -mt-4">
            2,500+ couples ne apni shaadi ShaadiSet se plan ki
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {SUCCESS_STORIES.map((s, i) => (
              <div key={i} className="dkr-story-card overflow-hidden dkr-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="relative h-64 overflow-hidden">
                  <img src={s.image} alt={s.couple} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#9A0E4C]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <div className="font-serif text-xl font-bold">{s.couple}</div>
                    <div className="text-xs text-white/80">{s.city} · {s.date}</div>
                  </div>
                  <Heart className="absolute right-3 top-3 h-5 w-5 fill-[#EAA552] text-[#EAA552]" />
                </div>
                <div className="p-4">
                  <p className="text-sm text-[#8F9BB3]">{s.story}</p>
                  <StarRating rating={5} className="mt-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SMART TOOLS ===== */}
      <section className="dkr-section dkr-bg-secondary">
        <div className="container mx-auto px-4">
          <SectionTitle icon={<Sparkles className="h-4 w-4 text-[#C61162]" />}>
            Smart Tools
          </SectionTitle>
          <p className="mb-8 text-center text-[#8F9BB3] -mt-4">
            Sirf vendors nahi — poora planning experience
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            {/* AI Match */}
            <button
              onClick={() => setView('recommend')}
              className="dkr-gradient-border p-6 text-left transition-all hover:shadow-xl hover:shadow-[#C61162]/10 dkr-fade-up"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="dkr-feature-icon">
                  <Sparkles className="h-6 w-6 text-[#C61162]" />
                </div>
                <Badge className="bg-[#FAE6EF] text-[#C61162]">AI-Powered</Badge>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#222B45]">Smart Vendor Matcher</h3>
              <p className="mt-1 text-sm text-[#8F9BB3]">
                Budget, event type, city aur style bataiye — AI aapke liye best-matching vendors nikal dega.
              </p>
              <div className="mt-4 text-sm font-semibold text-[#C61162]">
                Try it now <ArrowRight className="inline h-4 w-4" />
              </div>
            </button>

            {/* Bundles */}
            <button
              onClick={() => setView('bundles')}
              className="dkr-profile-card p-6 text-left dkr-fade-up"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="dkr-feature-icon">
                  <TrendingUp className="h-6 w-6 text-[#C61162]" />
                </div>
                <Badge className="bg-[#EAA552]/15 text-[#EAA552]">Up to 20% Off</Badge>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#222B45]">Bundle & Save</h3>
              <p className="mt-1 text-sm text-[#8F9BB3]">
                Photographer + Decorator + Caterer — ek saath book karein aur up to 20% discount paayein.
              </p>
              <div className="mt-4 text-sm font-semibold text-[#C61162]">
                Build your bundle <ArrowRight className="inline h-4 w-4" />
              </div>
            </button>

            {/* Planning Suite */}
            <button
              onClick={() => setView('plan')}
              className="dkr-profile-card p-6 text-left dkr-fade-up"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="dkr-feature-icon">
                  <Heart className="h-6 w-6 text-[#C61162]" />
                </div>
                <Badge className="bg-[#FAE6EF] text-[#C61162]">Free Forever</Badge>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#222B45]">Wedding Planning Suite</h3>
              <p className="mt-1 text-sm text-[#8F9BB3]">
                Countdown timer, 24-task checklist, budget tracker aur guest list manager.
              </p>
              <div className="mt-4 text-sm font-semibold text-[#C61162]">
                Start planning <ArrowRight className="inline h-4 w-4" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* ===== VENDOR CTA ===== */}
      <section className="dkr-section bg-white">
        <div className="container mx-auto px-4">
          <div className="dkr-gradient-border overflow-hidden p-8 md:p-12">
            <div className="grid items-center gap-6 md:grid-cols-2">
              <div>
                <Badge className="mb-3 bg-[#EAA552]/15 text-[#EAA552]">For Vendors</Badge>
                <h2 className="font-serif text-2xl font-bold text-[#222B45] md:text-3xl text-balance">
                  Apne business ko Pakistan-wide reach dein
                </h2>
                <p className="mt-3 text-[#8F9BB3]">
                  Join 98+ verified vendors. Quality leads, analytics, verified badge aur featured listing.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['5-12% commission', 'Verified badge', 'Analytics', 'Featured boost'].map((f) => (
                    <span key={f} className="inline-flex items-center gap-1 rounded-full bg-[#F6F9FC] px-3 py-1 text-xs text-[#222B45]">
                      <CheckCircle2 className="h-3 w-3 text-[#075E54]" /> {f}
                    </span>
                  ))}
                </div>
                <Button onClick={() => setView('vendor-signup')} className="mt-5 dkr-btn-primary">
                  List Your Business <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </div>
              <div className="relative hidden md:block">
                <img src="/vendors/bride-1.jpg" alt="Bride" className="h-64 w-full rounded-2xl object-cover shadow-lg" />
                <div className="absolute -bottom-4 -left-4 rounded-2xl bg-white p-3 shadow-xl">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-[#C61162]" />
                    <div>
                      <div className="text-xs font-bold text-[#222B45]">+22 bookings</div>
                      <div className="text-[10px] text-[#8F9BB3]">this month</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS MARQUEE ===== */}
      <section className="overflow-hidden border-y border-[#FAE6EF] bg-[#FAE6EF]/30 py-12">
        <div className="container mx-auto mb-6 px-4 text-center">
          <SectionTitle>
            Happy Couples, Happy Vendors
          </SectionTitle>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex w-max animate-marquee gap-4 px-4">
            {[...SUCCESS_STORIES, ...SUCCESS_STORIES, ...SUCCESS_STORIES].map((t, i) => (
              <div key={i} className="dkr-story-card w-72 flex-shrink-0 p-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-[#FAE6EF] font-semibold text-[#C61162]">
                    {t.couple.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-[#222B45]">{t.couple}</div>
                    <div className="text-[11px] text-[#8F9BB3]">{t.city} · {t.date}</div>
                  </div>
                </div>
                <StarRating rating={5} className="mt-2" />
                <p className="mt-2 text-xs text-[#8F9BB3]">&ldquo;{t.story}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="dkr-section bg-white">
        <div className="container mx-auto max-w-3xl px-4">
          <SectionTitle>
            Sawaal? Yahan jawab
          </SectionTitle>
          <p className="mb-8 text-center text-[#8F9BB3] -mt-4">
            Sab kuch jo aap ShaadiSet ke baare mein jaanna chahte hain
          </p>
          <div className="space-y-3">
            {[
              { q: 'ShaadiSet pe vendors kaise book karun?', a: 'Bas category aur city select karein, vendor profile dekhein, aur "Send Inquiry" button se WhatsApp ya form ke through contact karein.' },
              { q: 'Kya pricing transparent hai?', a: 'Haan! Har vendor ka starting price, packages aur features publicly listed hain. Koi hidden charges nahi.' },
              { q: 'Main as a vendor kaise join karun?', a: '"List Your Business" pe click karein. Business details aur portfolio upload karein. Hamari team 24-48 ghante mein verify karke live kar degi.' },
              { q: 'Kya reviews real hain?', a: 'Reviews sirf verified customers se aate hain. Verified badge wale vendors extra trustworthy hain.' },
            ].map((faq, i) => (
              <div key={i} className="dkr-profile-card overflow-hidden">
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between p-4 text-left">
                    <span className="font-medium text-[#222B45]">{faq.q}</span>
                    <ChevronRight className="h-5 w-5 text-[#8F9BB3] transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="px-4 pb-4 text-sm text-[#8F9BB3]">{faq.a}</div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
