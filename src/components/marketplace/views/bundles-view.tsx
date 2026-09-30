'use client'

import { useState, useMemo, useEffect } from 'react'
import {
  Package,
  Sparkles,
  ArrowRight,
  Check,
  X,
  Wand2,
  Wallet,
  Percent,
  ShoppingCart,
  Trash2,
  Calendar,
  MapPin,
  PartyPopper,
  RotateCcw,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { useMarketplace } from '@/lib/store'
import { useVendors } from '@/lib/hooks'
import { Icon, getCategoryIcon } from '@/components/marketplace/icon'
import { CATEGORIES, CITIES, EVENT_TYPES, formatPKR, formatPKRShort, getCategoryConfig } from '@/lib/constants'
import type { Vendor } from '@/lib/types'
import { cn } from '@/lib/utils'

// Bundle tiers: the more you bundle, the bigger the discount
const BUNDLE_TIERS = [
  { count: 2, discount: 0.05, label: '5% off', icon: 'Sparkles' },
  { count: 3, discount: 0.10, label: '10% off', icon: 'PartyPopper' },
  { count: 4, discount: 0.15, label: '15% off', icon: 'Gem' },
  { count: 5, discount: 0.20, label: '20% off', icon: 'Crown' },
]

// Curated bundle templates
const BUNDLE_TEMPLATES = [
  {
    id: 'essential',
    name: 'Essential Trio',
    icon: 'Wand2',
    desc: 'Photographer + Decorator + Caterer — the must-haves',
    categories: ['photographers', 'decorators', 'caterers'],
    discount: 0.10,
    color: 'from-rose-500/20 to-amber-500/20',
  },
  {
    id: 'complete',
    name: 'Complete Shaadi',
    icon: 'Heart',
    desc: 'Venue + Photographer + Decorator + Caterer + Makeup',
    categories: ['venues', 'photographers', 'decorators', 'caterers', 'makeup'],
    discount: 0.20,
    color: 'from-amber-500/20 to-rose-500/20',
  },
  {
    id: 'mehndi-night',
    name: 'Mehndi Night Special',
    icon: 'Leaf',
    desc: 'Decorator + DJ + Mehndi Artist — perfect dholki setup',
    categories: ['decorators', 'dj', 'mehndi'],
    discount: 0.10,
    color: 'from-green-500/20 to-amber-500/20',
  },
  {
    id: 'bride-luxe',
    name: 'Bride Luxe',
    icon: 'Sparkles',
    desc: 'Makeup + Mehndi + Photographer — bridal essentials',
    categories: ['makeup', 'mehndi', 'photographers'],
    discount: 0.10,
    color: 'from-fuchsia-500/20 to-rose-500/20',
  },
]

interface BundleSelection {
  category: string
  vendorSlug: string
}

export function BundlesView() {
  const { setView, openVendor } = useMarketplace()
  const [selections, setSelections] = useState<BundleSelection[]>([])
  const [eventDate, setEventDate] = useState('')
  const [eventType, setEventType] = useState('Baraat')
  const [city, setCity] = useState('Lahore')
  const [guestCount, setGuestCount] = useState('300')

  // Fetch vendors per category for selection dropdowns
  const { vendors: allVendors, loading } = useVendors({ limit: '100' })

  const selectedVendors = useMemo(() => {
    return selections
      .map((s) => allVendors.find((v) => v.slug === s.vendorSlug))
      .filter(Boolean) as Vendor[]
  }, [selections, allVendors])

  // Pricing: for caterers, price is per plate × guests
  const bundlePricing = useMemo(() => {
    const guests = parseInt(guestCount) || 0
    let subtotal = 0
    selectedVendors.forEach((v) => {
      if (v.category === 'caterers') {
        subtotal += v.startingPrice * Math.max(guests, 50)
      } else {
        subtotal += v.startingPrice
      }
    })

    const tier = [...BUNDLE_TIERS].reverse().find((t) => selectedVendors.length >= t.count)
    const discountRate = tier?.discount || 0
    const discountAmount = Math.round(subtotal * discountRate)
    const total = subtotal - discountAmount

    return { subtotal, discountRate, discountAmount, total, tier }
  }, [selectedVendors, guestCount])

  const addCategoryToBundle = (category: string) => {
    if (selections.some((s) => s.category === category)) return
    setSelections([...selections, { category, vendorSlug: '' }])
  }

  const removeCategoryFromBundle = (category: string) => {
    setSelections(selections.filter((s) => s.category !== category))
  }

  const setVendorForCategory = (category: string, vendorSlug: string) => {
    setSelections(
      selections.map((s) => (s.category === category ? { ...s, vendorSlug } : s))
    )
  }

  const applyTemplate = (templateId: string) => {
    const template = BUNDLE_TEMPLATES.find((t) => t.id === templateId)
    if (!template) return
    setSelections(template.categories.map((c) => ({ category: c, vendorSlug: '' })))
    toast.success(`${template.name} template loaded!`)
  }

  const handleBookBundle = () => {
    if (selectedVendors.length < 2) {
      toast.error('Kam az kam 2 vendors select karein bundle discount ke liye')
      return
    }
    if (selectedVendors.some((v) => !v)) {
      toast.error('Har category ke liye vendor select karein')
      return
    }
    toast.success(`Bundle inquiry ready! ${selectedVendors.length} vendors, ${formatPKRShort(bundlePricing.total)} total (${Math.round(bundlePricing.discountRate * 100)}% off). Vendors se contact honge.`)
  }

  const resetBundle = () => {
    setSelections([])
    toast.info('Bundle reset ho gaya')
  }

  return (
    <div className="animate-fade-up">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-br from-primary/8 via-background to-accent/30">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="container relative mx-auto px-4 py-12">
          <div className="max-w-2xl">
            <Badge className="mb-3 bg-primary/10 text-primary">
              <Package className="mr-1 h-3 w-3" /> Bundle & Save
            </Badge>
            <h1 className="font-serif text-3xl font-bold text-foreground md:text-5xl text-balance">
              Ek shaadi ke saare vendors{' '}
              <span className="text-primary">bundle karke bachayein</span>
            </h1>
            <p className="mt-3 text-lg text-muted-foreground text-balance">
              Photographer + Decorator + Caterer — ek saath book karein aur
              paayein up to <span className="font-semibold text-primary">20% discount</span>.
              Ek hi inquiry, ek hi date, sab coordinated.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {BUNDLE_TIERS.map((t) => (
                <Badge key={t.count} variant="secondary" className="bg-card border border-border/60">
                  <Icon name={t.icon} className="mr-1 h-3 w-3 inline" />
                  {t.count} vendors = {t.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Templates */}
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl font-bold text-foreground">Quick Bundle Templates</h2>
              <p className="text-xs text-muted-foreground">Popular combinations — ek click mein load</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {BUNDLE_TEMPLATES.map((tpl, i) => (
              <button
                key={tpl.id}
                onClick={() => applyTemplate(tpl.id)}
                className="group relative overflow-hidden rounded-xl border border-border/60 bg-card p-4 text-left transition hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5 animate-fade-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className={cn('absolute -right-6 -top-6 h-16 w-16 rounded-full bg-gradient-to-br blur-xl opacity-60', tpl.color)} />
                <div className="relative">
                  <div className="text-2xl"><Icon name={tpl.icon} className="h-6 w-6 text-primary" /></div>
                  <h3 className="mt-1.5 font-serif text-sm font-bold text-foreground">{tpl.name}</h3>
                  <p className="mt-0.5 text-[11px] text-muted-foreground line-clamp-2">{tpl.desc}</p>
                  <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-primary">
                    <Percent className="h-3 w-3" /> {Math.round(tpl.discount * 100)}% off
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Main: bundle builder */}
          <div className="space-y-4">
            {/* Event details */}
            <Card className="border-border/60 p-5">
              <div className="mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <h3 className="font-serif text-base font-semibold text-foreground">Event Details</h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <Label className="text-xs">Event Date</Label>
                  <Input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label className="text-xs">Event Type</Label>
                  <Select value={eventType} onValueChange={setEventType}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {EVENT_TYPES.map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">City</Label>
                  <Select value={city} onValueChange={setCity}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {CITIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Guests</Label>
                  <Input type="number" value={guestCount} onChange={(e) => setGuestCount(e.target.value)} placeholder="300" className="mt-1" />
                </div>
              </div>
            </Card>

            {/* Bundle categories */}
            <Card className="border-border/60 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4 text-primary" />
                  <h3 className="font-serif text-base font-semibold text-foreground">Your Bundle</h3>
                  {selections.length > 0 && (
                    <Badge className="bg-primary/10 text-primary">{selections.length} selected</Badge>
                  )}
                </div>
                {selections.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={resetBundle} className="text-xs">
                    <RotateCcw className="mr-1 h-3 w-3" /> Reset
                  </Button>
                )}
              </div>

              {selections.length === 0 ? (
                <div className="rounded-lg border border-dashed border-border/60 p-8 text-center">
                  <Package className="mx-auto h-10 w-10 text-muted-foreground/40" />
                  <p className="mt-2 text-sm font-medium text-foreground">Bundle khali hai</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Neeche se categories add karein ya ek template load karein (upar).
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {selections.map((sel) => {
                    const cat = getCategoryConfig(sel.category)
                    const vendorsInCat = allVendors.filter((v) => v.category === sel.category && (v.city === city || !city))
                    const selectedVendor = allVendors.find((v) => v.slug === sel.vendorSlug)
                    return (
                      <div
                        key={sel.category}
                        className="rounded-lg border border-border/60 bg-card p-3 animate-fade-up"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Icon name={getCategoryIcon(sel.category)} className="h-5 w-5 text-primary" />
                            <div>
                              <div className="text-sm font-semibold text-foreground">{cat?.shortName}</div>
                              <div className="text-[10px] text-muted-foreground">{vendorsInCat.length} vendors in {city}</div>
                            </div>
                          </div>
                          <button
                            onClick={() => removeCategoryFromBundle(sel.category)}
                            className="grid h-7 w-7 place-items-center rounded-full text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
                            aria-label="Remove"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <Select
                          value={sel.vendorSlug}
                          onValueChange={(v) => setVendorForCategory(sel.category, v)}
                        >
                          <SelectTrigger className="mt-2.5">
                            <SelectValue placeholder={loading ? 'Loading vendors...' : `Select ${cat?.shortName}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {vendorsInCat.map((v) => (
                              <SelectItem key={v.slug} value={v.slug}>
                                {v.businessName} — {formatPKRShort(v.category === 'caterers' ? v.startingPrice : v.startingPrice)}{v.category === 'caterers' ? '/plate' : ''} · {v.rating}★
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {selectedVendor && (
                          <div className="mt-2 flex items-center gap-2 rounded-md bg-accent/40 p-2">
                            <img src={selectedVendor.coverImage} alt="" className="h-10 w-10 rounded object-cover" />
                            <div className="min-w-0 flex-1">
                              <div className="truncate text-xs font-medium text-foreground">{selectedVendor.businessName}</div>
                              <div className="text-[10px] text-muted-foreground">
                                {selectedVendor.area}, {selectedVendor.city} · {selectedVendor.rating}★ ({selectedVendor.reviewCount})
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs font-bold text-primary">
                                {formatPKRShort(selectedVendor.category === 'caterers' ? selectedVendor.startingPrice * Math.max(parseInt(guestCount) || 50, 50) : selectedVendor.startingPrice)}
                              </div>
                              {selectedVendor.category === 'caterers' && (
                                <div className="text-[9px] text-muted-foreground">×{Math.max(parseInt(guestCount) || 50, 50)} guests</div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Add category chips */}
              <div className="mt-4 border-t border-border/60 pt-3">
                <div className="mb-2 text-[11px] font-medium text-muted-foreground">Add more categories:</div>
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.filter((c) => !selections.some((s) => s.category === c.slug)).map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => addCategoryToBundle(cat.slug)}
                      className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-card px-2.5 py-1 text-xs text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                    >
                      <Icon name={cat.icon} className="h-4 w-4 inline" /> {cat.shortName}
                      <span className="text-primary">+</span>
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar: pricing summary */}
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <Card className="overflow-hidden border-primary/20">
              <div className="bg-gradient-to-br from-primary to-[#4D0712] p-5 text-white">
                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  <h3 className="font-serif text-lg font-bold">Bundle Summary</h3>
                </div>
                <p className="mt-0.5 text-xs text-white/75">
                  {selectedVendors.length} vendor{selectedVendors.length !== 1 ? 's' : ''} · {eventType} · {city}
                </p>
              </div>

              <div className="space-y-3 p-5">
                {selectedVendors.length === 0 ? (
                  <p className="py-6 text-center text-sm text-muted-foreground">
                    Bundle banane ke liye vendors select karein
                  </p>
                ) : (
                  <>
                    {/* Line items */}
                    <div className="space-y-2">
                      {selectedVendors.map((v) => {
                        const cat = getCategoryConfig(v.category)
                        const price = v.category === 'caterers'
                          ? v.startingPrice * Math.max(parseInt(guestCount) || 50, 50)
                          : v.startingPrice
                        return (
                          <div key={v.slug} className="flex items-center justify-between gap-2 text-sm">
                            <span className="flex items-center gap-1.5 truncate">
                              <Icon name={cat?.icon || 'Sparkles'} className="h-4 w-4 inline" />
                              <span className="truncate text-foreground">{v.businessName}</span>
                            </span>
                            <span className="flex-shrink-0 font-medium text-foreground">{formatPKRShort(price)}</span>
                          </div>
                        )
                      })}
                    </div>

                    <Separator />

                    {/* Subtotal */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium text-foreground">{formatPKR(bundlePricing.subtotal)}</span>
                    </div>

                    {/* Discount */}
                    {bundlePricing.discountRate > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1 text-emerald-600">
                          <Percent className="h-3 w-3" />
                          Bundle discount ({Math.round(bundlePricing.discountRate * 100)}%)
                        </span>
                        <span className="font-semibold text-emerald-600">
                          −{formatPKRShort(bundlePricing.discountAmount)}
                        </span>
                      </div>
                    )}

                    <Separator />

                    {/* Total */}
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-base font-bold text-foreground">Total</span>
                      <div className="text-right">
                        <div className="font-serif text-2xl font-bold text-primary">
                          {formatPKR(bundlePricing.total)}
                        </div>
                        {bundlePricing.discountAmount > 0 && (
                          <div className="text-[10px] text-emerald-600">
                            Aap bacha rahe hain {formatPKRShort(bundlePricing.discountAmount)}!
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Tier progress */}
                    {bundlePricing.tier && (
                      <div className="rounded-lg bg-amber-500/10 p-2.5 text-center">
                        <div className="text-xs font-semibold text-amber-700">
                          <Icon name={bundlePricing.tier.icon} className="inline h-3 w-3" /> {bundlePricing.tier.label} applied!
                        </div>
                        {selectedVendors.length < 5 && (
                          <div className="mt-0.5 text-[10px] text-muted-foreground">
                            {5 - selectedVendors.length} aur vendor add karein for 20% off
                          </div>
                        )}
                      </div>
                    )}

                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleBookBundle}
                      disabled={selectedVendors.length < 2}
                    >
                      <PartyPopper className="mr-1.5 h-4 w-4" />
                      {selectedVendors.length < 2 ? 'Min 2 vendors needed' : 'Book Bundle & Save'}
                    </Button>
                    <p className="text-center text-[10px] text-muted-foreground">
                      Inquiry sab selected vendors ko bhej di jayegi
                    </p>
                  </>
                )}
              </div>
            </Card>

            {/* Why bundle card */}
            <Card className="mt-4 border-border/60 p-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <h4 className="text-sm font-semibold text-foreground">Bundle kyun karein?</h4>
              </div>
              <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
                <li className="flex items-start gap-1.5">
                  <Check className="mt-0.5 h-3 w-3 flex-shrink-0 text-emerald-600" />
                  Up to 20% discount on combined booking
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="mt-0.5 h-3 w-3 flex-shrink-0 text-emerald-600" />
                  Ek hi inquiry — sab vendors ko ek saath message
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="mt-0.5 h-3 w-3 flex-shrink-0 text-emerald-600" />
                  Coordinated date & timing — no clashes
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="mt-0.5 h-3 w-3 flex-shrink-0 text-emerald-600" />
                  Dedicated support if any issue
                </li>
              </ul>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}
