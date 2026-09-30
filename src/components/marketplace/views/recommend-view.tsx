'use client'

import { useState, useMemo, useEffect } from 'react'
import {
  Sparkles,
  Wand2,
  Calendar,
  MapPin,
  Wallet,
  Heart,
  ArrowRight,
  RotateCcw,
  TrendingUp,
  Lightbulb,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { VendorCard } from '@/components/marketplace/vendor-card'
import { useMarketplace } from '@/lib/store'
import { useVendors } from '@/lib/hooks'
import { Icon, getCategoryIcon, getStyleIcon } from '@/components/marketplace/icon'
import { CATEGORIES, CITIES, EVENT_TYPES, WEDDING_STYLES, formatPKR } from '@/lib/constants'
import type { Vendor } from '@/lib/types'
import { cn } from '@/lib/utils'

// Style → category tag affinity map
const STYLE_TAGS: Record<string, string[]> = {
  traditional: ['Traditional', 'Candid', 'Marigold', 'Mughal', 'Arabic', 'Desi', 'Biryani', 'BBQ'],
  modern: ['Modern', 'Minimal', 'Minimal-chic', 'Bespoke', 'Natural light', 'Editorial', 'Soft glam'],
  royal: ['Cinematic', 'Premium', 'Luxury', 'Imported florals', 'Grand', 'Opulent', '5000+ guests'],
  boho: ['Natural light', 'Minimal', 'Organic henna', 'Outdoor lawns', 'Pastel', 'Earthy'],
  glam: ['Cinematic film', 'HD glam', 'Airbrush', 'Bollywood', 'EDM', 'Lighting', 'Dramatic'],
}

interface ScoredVendor {
  vendor: Vendor
  score: number
  reasons: string[]
  matchPercent: number
}

function scoreVendor(
  vendor: Vendor,
  inputs: { budget: number; city: string; categories: string[]; style: string; eventType: string }
): ScoredVendor {
  let score = 0
  const reasons: string[] = []

  // Category match (required) — 30 points
  if (inputs.categories.includes(vendor.category)) {
    score += 30
    reasons.push('Matches your requested service')
  }

  // City match — 20 points
  if (inputs.city && vendor.city === inputs.city) {
    score += 20
    reasons.push(`Based in ${vendor.city}`)
  }

  // Budget fit — up to 25 points
  if (inputs.budget > 0) {
    const mid = (vendor.startingPrice + (vendor.priceMax || vendor.startingPrice * 2)) / 2
    if (vendor.startingPrice <= inputs.budget) {
      // Within budget
      const ratio = vendor.startingPrice / inputs.budget
      if (ratio < 0.3) {
        score += 25
        reasons.push('Well within your budget')
      } else if (ratio < 0.6) {
        score += 22
        reasons.push('Good value for your budget')
      } else {
        score += 18
        reasons.push('Fits your budget')
      }
    } else {
      // Over budget — small partial credit if close
      const overRatio = vendor.startingPrice / inputs.budget
      if (overRatio < 1.3) score += 8
    }
  }

  // Rating — up to 15 points
  if (vendor.rating >= 4.8) {
    score += 15
    reasons.push(`Top-rated (${vendor.rating}★)`)
  } else if (vendor.rating >= 4.5) {
    score += 12
    reasons.push(`Highly rated (${vendor.rating}★)`)
  } else if (vendor.rating >= 4.0) {
    score += 8
  }

  // Verified — 5 points
  if (vendor.verified) {
    score += 5
    reasons.push('Verified vendor')
  }

  // Featured — 3 points
  if (vendor.featured) {
    score += 3
    reasons.push('Featured & trusted')
  }

  // Style tag affinity — up to 10 points
  const styleTags = STYLE_TAGS[inputs.style] || []
  const vendorTags = vendor.tags || []
  const matchedTags = vendorTags.filter((t) => styleTags.some((st) => t.toLowerCase().includes(st.toLowerCase())))
  if (matchedTags.length > 0) {
    score += Math.min(10, matchedTags.length * 4)
    reasons.push(`Matches your "${inputs.style}" style`)
  }

  // Response time bonus — 2 points
  if (vendor.responseTime && vendor.responseTime.includes('hour')) {
    const hours = parseInt(vendor.responseTime)
    if (!isNaN(hours) && hours <= 2) {
      score += 2
      reasons.push('Fast response time')
    }
  }

  const matchPercent = Math.min(99, Math.round((score / 100) * 100))

  return { vendor, score, reasons: reasons.slice(0, 4), matchPercent }
}

export function RecommendView() {
  const { recommendInputs, setRecommendInputs, setView, setFilters } = useMarketplace()
  const [hasResults, setHasResults] = useState(false)
  const [generated, setGenerated] = useState(false)

  // Fetch all vendors (no filter) for matching
  const { vendors: allVendors, loading } = useVendors({ limit: '100' })

  const inputs = recommendInputs

  const update = (patch: Partial<typeof inputs>) => setRecommendInputs(patch)

  const results: ScoredVendor[] = useMemo(() => {
    if (!generated || allVendors.length === 0) return []
    const scored = allVendors
      .filter((v) => inputs.categories.length === 0 || inputs.categories.includes(v.category))
      .map((v) => scoreVendor(v, inputs))
      .filter((sv) => sv.score > 20)
      .sort((a, b) => b.score - a.score)

    // Group by category, take top 1-2 per category
    const byCat: Record<string, ScoredVendor[]> = {}
    scored.forEach((sv) => {
      if (!byCat[sv.vendor.category]) byCat[sv.vendor.category] = []
      if (byCat[sv.vendor.category].length < 2) {
        byCat[sv.vendor.category].push(sv)
      }
    })
    return Object.values(byCat).flat().sort((a, b) => b.score - a.score).slice(0, 6)
  }, [allVendors, inputs, generated])

  const handleGenerate = () => {
    if (inputs.categories.length === 0) {
      return
    }
    setGenerated(true)
    setHasResults(true)
    setTimeout(() => {
      document.getElementById('recommend-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const handleReset = () => {
    setGenerated(false)
    setHasResults(false)
  }

  const toggleCategory = (slug: string) => {
    const current = inputs.categories
    if (current.includes(slug)) {
      update({ categories: current.filter((c) => c !== slug) })
    } else {
      update({ categories: [...current, slug] })
    }
  }

  return (
    <div className="animate-fade-up">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-br from-primary/8 via-background to-accent/30">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="container relative mx-auto px-4 py-12">
          <div className="max-w-2xl">
            <Badge className="mb-3 bg-primary/10 text-primary">
              <Wand2 className="mr-1 h-3 w-3" /> AI-Powered
            </Badge>
            <h1 className="font-serif text-3xl font-bold text-foreground md:text-5xl text-balance">
              Apne liye perfect vendors{' '}
              <span className="text-primary">AI se dhundwayein</span>
            </h1>
            <p className="mt-3 text-lg text-muted-foreground text-balance">
              Budget, event type, city aur style bataiye — hum aapke liye sabse
              best-matching vendors nikal denge. Smart scoring based on price fit,
              ratings, style affinity aur response time.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-[400px_1fr]">
          {/* Input form */}
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <Card className="border-border/60 p-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-serif text-lg font-semibold text-foreground">
                    Apni requirements bataiye
                  </h2>
                  <p className="text-xs text-muted-foreground">Behtar matches ke liye</p>
                </div>
              </div>

              <div className="space-y-5">
                {/* Budget */}
                <div>
                  <Label className="flex items-center justify-between text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <Wallet className="h-4 w-4 text-primary" /> Total Budget
                    </span>
                    <span className="font-serif font-bold text-primary">
                      {formatPKR(inputs.budget)}
                    </span>
                  </Label>
                  <Slider
                    value={[inputs.budget]}
                    onValueChange={(v) => update({ budget: v[0] })}
                    min={100000}
                    max={5000000}
                    step={50000}
                    className="mt-3"
                  />
                  <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                    <span>Rs 1L</span>
                    <span>Rs 50L</span>
                  </div>
                </div>

                {/* Event type */}
                <div>
                  <Label className="flex items-center gap-1.5 text-sm font-medium">
                    <Calendar className="h-4 w-4 text-primary" /> Event Type
                  </Label>
                  <Select
                    value={inputs.eventType}
                    onValueChange={(v) => update({ eventType: v })}
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {EVENT_TYPES.map((e) => (
                        <SelectItem key={e} value={e}>{e}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* City */}
                <div>
                  <Label className="flex items-center gap-1.5 text-sm font-medium">
                    <MapPin className="h-4 w-4 text-primary" /> City
                  </Label>
                  <Select
                    value={inputs.city}
                    onValueChange={(v) => update({ city: v })}
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CITIES.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Categories */}
                <div>
                  <Label className="text-sm font-medium">Which services do you need?</Label>
                  <p className="text-xs text-muted-foreground">Select all that apply</p>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {CATEGORIES.map((cat) => {
                      const checked = inputs.categories.includes(cat.slug)
                      return (
                        <label
                          key={cat.slug}
                          className={cn(
                            'flex cursor-pointer items-center gap-2 rounded-lg border p-2.5 text-xs transition',
                            checked
                              ? 'border-primary bg-primary/5 text-foreground'
                              : 'border-border/60 text-muted-foreground hover:border-primary/40'
                          )}
                        >
                          <Checkbox
                            checked={checked}
                            onCheckedChange={() => toggleCategory(cat.slug)}
                            className="border-primary"
                          />
                          <span className="flex items-center gap-1 truncate"><Icon name={getCategoryIcon(cat.slug)} className="h-3.5 w-3.5" /> {cat.shortName}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>

                {/* Style */}
                <div>
                  <Label className="text-sm font-medium">Aapki shaadi ka style?</Label>
                  <div className="mt-2 space-y-1.5">
                    {WEDDING_STYLES.map((s) => (
                      <label
                        key={s.value}
                        className={cn(
                          'flex cursor-pointer items-start gap-2 rounded-lg border p-2.5 transition',
                          inputs.style === s.value
                            ? 'border-primary bg-primary/5'
                            : 'border-border/60 hover:border-primary/40'
                        )}
                      >
                        <input
                          type="radio"
                          name="style"
                          checked={inputs.style === s.value}
                          onChange={() => update({ style: s.value })}
                          className="mt-0.5 accent-primary"
                        />
                        <div>
                          <div className="text-sm font-medium text-foreground">
                            <Icon name={getStyleIcon(s.value)} className="h-4 w-4 mt-0.5" /> {s.label}
                          </div>
                          <div className="text-[11px] text-muted-foreground">{s.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={handleGenerate}
                    disabled={inputs.categories.length === 0}
                  >
                    <Wand2 className="mr-1.5 h-4 w-4" /> Get Recommendations
                  </Button>
                  {generated && (
                    <Button variant="outline" size="icon" onClick={handleReset}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                {inputs.categories.length === 0 && (
                  <p className="text-center text-[11px] text-muted-foreground">
                    Kam az kam ek service select karein
                  </p>
                )}
              </div>
            </Card>
          </aside>

          {/* Results */}
          <div id="recommend-results">
            {!generated ? (
              <Card className="flex min-h-[400px] flex-col items-center justify-center border-dashed border-border/60 p-8 text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-primary/10">
                  <Lightbulb className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">
                  AI recommendations yahan dikhenge
                </h3>
                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                  Left side form bharein aur "Get Recommendations" press karein.
                  Hum aapke budget aur style ke hisaab se top vendors match karenge.
                </p>
                <div className="mt-6 grid gap-2 sm:grid-cols-3 text-left">
                  {[
                    { icon: Wallet, title: 'Budget Fit', desc: 'Price ke hisaab se scoring' },
                    { icon: TrendingUp, title: 'Rating & Trust', desc: 'Verified + top-rated priority' },
                    { icon: Heart, title: 'Style Match', desc: 'Aapki shaadi ke style se tags match' },
                  ].map((f) => (
                    <div key={f.title} className="rounded-lg border border-border/40 bg-card p-3">
                      <f.icon className="h-4 w-4 text-primary" />
                      <div className="mt-1.5 text-sm font-medium text-foreground">{f.title}</div>
                      <div className="text-[11px] text-muted-foreground">{f.desc}</div>
                    </div>
                  ))}
                </div>
              </Card>
            ) : loading ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-80 rounded-xl shimmer" />
                ))}
              </div>
            ) : results.length === 0 ? (
              <Card className="flex min-h-[300px] flex-col items-center justify-center border-dashed border-border/60 p-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Koi matching vendors nahi mile. Filter adjust karke dobara try karein.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setFilters({ city: inputs.city })
                    setView('browse')
                  }}
                >
                  Browse all vendors <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Card>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-foreground">
                      Aapke liye {results.length} perfect matches
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Budget: {formatPKR(inputs.budget)} · {inputs.city} · {inputs.style} style
                    </p>
                  </div>
                  <Badge className="bg-primary/10 text-primary">
                    <Sparkles className="mr-1 h-3 w-3" /> AI Matched
                  </Badge>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {results.map((sv, i) => (
                  <div
                      key={sv.vendor.id}
                      className="relative animate-fade-up"
                      style={{ animationDelay: `${i * 0.08}s` }}
                    >
                      <div className="absolute -left-2 -top-2 z-10 grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg">
                        <div className="text-center leading-none">
                          <div className="font-serif text-sm font-bold">{sv.matchPercent}%</div>
                          <div className="text-[7px] uppercase tracking-wide">match</div>
                        </div>
                      </div>
                      <VendorCard vendor={sv.vendor} className="pt-2" />
                      {/* Match reasons */}
                      <div className="mt-2 flex flex-wrap gap-1">
                        {sv.reasons.slice(0, 2).map((r, idx) => (
                          <Badge key={idx} variant="secondary" className="text-[10px] bg-emerald-500/10 text-emerald-700">
                            ✓ {r}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <Card className="border-primary/20 bg-primary/5 p-4">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-foreground">Pro tip:</p>
                      <p className="text-muted-foreground">
                        Top matches ko "Compare" mein add karke side-by-side dekhein,
                        phir direct inquiry bhejein. Verified vendors zyada reliable hote hain.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
