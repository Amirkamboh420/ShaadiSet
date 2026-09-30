'use client'

import { useState, useMemo, useEffect } from 'react'
import {
  MapPin,
  Search,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Star,
  Users,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { VendorCard } from '@/components/marketplace/vendor-card'
import { Icon, getCategoryIcon } from '@/components/marketplace/icon'
import { useMarketplace } from '@/lib/store'
import { useVendors, useCities } from '@/lib/hooks'
import { CATEGORIES, CITIES, getCategoryConfig, formatPKRShort } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function CityView() {
  const { setView, setFilters, openVendor } = useMarketplace()
  const { cities } = useCities()
  const [selectedCity, setSelectedCity] = useState('Lahore')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [search, setSearch] = useState('')

  // Fetch all vendors, filter client-side for city landing page
  const { vendors, loading } = useVendors({ limit: '100' })

  const cityVendors = useMemo(() => {
    return vendors.filter((v) => v.city === selectedCity)
  }, [vendors, selectedCity])

  const categoryVendors = useMemo(() => {
    if (selectedCategory === 'all') return cityVendors
    return cityVendors.filter((v) => v.category === selectedCategory)
  }, [cityVendors, selectedCategory])

  const searchResults = useMemo(() => {
    if (!search) return categoryVendors
    return categoryVendors.filter(
      (v) =>
        v.businessName.toLowerCase().includes(search.toLowerCase()) ||
        v.area?.toLowerCase().includes(search.toLowerCase()) ||
        v.shortDescription.toLowerCase().includes(search.toLowerCase())
    )
  }, [categoryVendors, search])

  // Category distribution for this city
  const categoryStats = useMemo(() => {
    const stats: Record<string, number> = {}
    cityVendors.forEach((v) => {
      stats[v.category] = (stats[v.category] || 0) + 1
    })
    return CATEGORIES.map((c) => ({ ...c, count: stats[c.slug] || 0 })).filter((c) => c.count > 0)
  }, [cityVendors])

  // Top vendors in this city (by rating)
  const topVendors = useMemo(() => {
    return [...cityVendors].sort((a, b) => b.rating - a.rating).slice(0, 3)
  }, [cityVendors])

  const cityInfo = cities.find((c) => c.name === selectedCity)
  const selectedCatConfig = CATEGORIES.find((c) => c.slug === selectedCategory)

  return (
    <div className="animate-fade-up">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-br from-primary/8 via-background to-accent/30">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="container relative mx-auto px-4 py-12">
          <div className="max-w-2xl">
            <Badge className="mb-3 bg-primary/10 text-primary">
              <MapPin className="mr-1 h-3 w-3" /> City Landing
            </Badge>
            <h1 className="font-serif text-3xl font-bold text-foreground md:text-5xl text-balance">
              {selectedCategory === 'all'
                ? `Best Wedding Vendors in ${selectedCity}`
                : `Best ${selectedCatConfig?.shortName} in ${selectedCity}`}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground text-balance">
              {selectedCity} ke top-rated, verified wedding vendors — {cityVendors.length} vendors across {categoryStats.length} categories. Reviews, pricing aur packages — sab transparent.
            </p>
          </div>

          {/* City + Category selectors */}
          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-full sm:w-48">
                <MapPin className="mr-1.5 h-4 w-4 text-primary" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CITIES.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-56">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c.slug} value={c.slug}>
                    <Icon name={c.icon} className="inline h-3 w-3" /> {c.shortName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* City stats strip */}
        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Card className="border-border/60 p-4">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <div className="font-serif text-xl font-bold text-foreground">{cityVendors.length}</div>
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Total Vendors</div>
              </div>
            </div>
          </Card>
          <Card className="border-border/60 p-4">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <div className="font-serif text-xl font-bold text-foreground">
                  {cityVendors.filter((v) => v.verified).length}
                </div>
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Verified</div>
              </div>
            </div>
          </Card>
          <Card className="border-border/60 p-4">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-amber-500/10 text-amber-600">
                <Star className="h-4 w-4" />
              </div>
              <div>
                <div className="font-serif text-xl font-bold text-foreground">
                  {cityVendors.length > 0
                    ? (cityVendors.reduce((s, v) => s + v.rating, 0) / cityVendors.length).toFixed(1)
                    : '—'}
                </div>
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Avg Rating</div>
              </div>
            </div>
          </Card>
          <Card className="border-border/60 p-4">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <div className="font-serif text-xl font-bold text-foreground">
                  {cityVendors.reduce((s, v) => s + v.bookingCount, 0)}
                </div>
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Total Bookings</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Category tiles for this city */}
        {selectedCategory === 'all' && (
          <section className="mb-8">
            <h2 className="mb-4 font-serif text-xl font-bold text-foreground">
              Browse by Category in {selectedCity}
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {categoryStats.map((cat, i) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className="group relative overflow-hidden rounded-xl border border-border/60 bg-card p-4 text-left transition hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5 animate-fade-up"
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  <div className={cn('absolute -right-4 -top-4 h-16 w-16 rounded-full bg-gradient-to-br opacity-50 blur-lg', cat.color)} />
                  <div className="relative">
                    <div className="text-2xl"><Icon name={cat.icon} className="h-6 w-6 text-primary" /></div>
                    <h3 className="mt-1 text-sm font-semibold text-foreground">{cat.shortName}</h3>
                    <div className="mt-0.5 text-[11px] text-primary">{cat.count} vendors</div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Top vendors in city */}
        {selectedCategory === 'all' && topVendors.length > 0 && (
          <section className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground">
                  Top 3 Vendors in {selectedCity}
                </h2>
                <p className="text-xs text-muted-foreground">Highest-rated across all categories</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {topVendors.map((v, i) => {
                const cat = getCategoryConfig(v.category)
                return (
                  <button
                    key={v.id}
                    onClick={() => openVendor(v.slug)}
                    className="group relative overflow-hidden rounded-xl border border-border/60 bg-card p-4 text-left transition hover:shadow-lg hover:-translate-y-0.5 animate-fade-up"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    <div className="absolute right-3 top-3 font-serif text-3xl font-bold text-primary/10">
                      #{i + 1}
                    </div>
                    <div className="relative">
                      <div className="flex items-center gap-2">
                        <img src={v.coverImage} alt="" className="h-12 w-12 rounded-lg object-cover" />
                        <div className="min-w-0">
                          <h3 className="truncate font-semibold text-foreground group-hover:text-primary">
                            {v.businessName}
                          </h3>
                          <div className="text-[11px] text-muted-foreground">
                            <Icon name={cat?.icon || 'Sparkles'} className="inline h-3 w-3" /> {cat?.shortName}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-sm font-semibold text-foreground">{v.rating}</span>
                        </div>
                        <span className="text-[11px] text-muted-foreground">({v.reviewCount})</span>
                        {v.verified && (
                          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                        )}
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="text-[11px] text-muted-foreground">{v.area}</div>
                        <div className="text-xs font-bold text-primary">
                          {formatPKRShort(v.startingPrice)}
                          {v.category === 'caterers' && <span className="text-[9px] text-muted-foreground">/plate</span>}
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </section>
        )}

        {/* Search + vendor grid */}
        <section>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="font-serif text-xl font-bold text-foreground">
                {selectedCategory === 'all'
                  ? `All Vendors in ${selectedCity}`
                  : `${selectedCatConfig?.shortName} in ${selectedCity}`}
              </h2>
              <p className="text-xs text-muted-foreground">
                {searchResults.length} vendor{searchResults.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search vendors..."
                className="pl-9"
              />
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-80 rounded-xl shimmer" />
              ))}
            </div>
          ) : searchResults.length === 0 ? (
            <Card className="border-dashed border-border/60 p-12 text-center">
              <Users className="mx-auto h-10 w-10 text-muted-foreground/40" />
              <p className="mt-2 text-sm text-muted-foreground">
                {cityVendors.length === 0
                  ? `${selectedCity} mein abhi vendors listed nahi. Jald add honge!`
                  : 'Koi vendor nahi mila. Search adjust karein.'}
              </p>
              {cityVendors.length === 0 && (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setFilters({ city: 'all', category: 'all' })
                    setView('browse')
                  }}
                >
                  Browse all cities <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              )}
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((v, i) => (
                <div
                  key={v.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  <VendorCard vendor={v} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Other cities */}
        <section className="mt-12 border-t border-border/60 pt-8">
          <h2 className="mb-4 font-serif text-xl font-bold text-foreground">Other Cities</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {CITIES.filter((c) => c !== selectedCity).map((city) => {
              const cityCount = vendors.filter((v) => v.city === city).length
              return (
                <button
                  key={city}
                  onClick={() => {
                    setSelectedCity(city)
                    setSelectedCategory('all')
                    setSearch('')
                  }}
                  className="group flex items-center justify-between rounded-xl border border-border/60 bg-card p-4 text-left transition hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5"
                >
                  <div>
                    <div className="font-serif text-base font-bold text-foreground">{city}</div>
                    <div className="text-[11px] text-muted-foreground">{cityCount} vendors</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
                </button>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
