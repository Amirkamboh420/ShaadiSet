'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  ArrowLeft,
  BadgeCheck,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Instagram,
  Calendar,
  Users,
  Check,
  GitCompare,
  Heart,
  Send,
  Star,
  Zap,
  ChevronRight,
  Loader2,
  Mail,
  Building2,
  CalendarDays,
  Quote,
  ImageIcon,
  X,
  CreditCard,
  Shield,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Toaster as SonnerToaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { StarRating } from '@/components/marketplace/star-rating'
import { VendorCard } from '@/components/marketplace/vendor-card'
import { Icon } from '@/components/marketplace/icon'
import { ChatWidget } from '@/components/marketplace/chat-widget'
import { AvailabilityCalendar } from '@/components/marketplace/availability-calendar'
import { CheckoutDialog } from '@/components/marketplace/checkout-dialog'
import { useMarketplace } from '@/lib/store'
import { useVendorDetail } from '@/lib/hooks'
import {
  CITIES,
  EVENT_TYPES,
  getCategoryConfig,
  formatPKR,
  formatPKRShort,
} from '@/lib/constants'
import { cn } from '@/lib/utils'
import type { Package, Review } from '@/lib/types'

// ---------- Skeleton ----------
function VendorProfileSkeleton() {
  return (
    <div className="bg-background">
      <div className="shimmer aspect-[21/9] w-full" />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="shimmer h-8 w-2/3 rounded" />
            <div className="shimmer h-3 w-full rounded" />
            <div className="shimmer h-3 w-5/6 rounded" />
            <div className="shimmer h-3 w-3/4 rounded" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="shimmer aspect-square rounded-lg"
                />
              ))}
            </div>
            <div className="shimmer h-40 w-full rounded-lg" />
          </div>
          <div className="space-y-4">
            <div className="shimmer h-96 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------- Sticky header bar ----------
function StickyHeader({ vendor }: { vendor: { businessName: string; slug: string; city: string; area: string | null; verified?: boolean; featured?: boolean; premium?: boolean; startingPrice?: number } }) {
  const { setView } = useMarketplace()
  const { favorites, toggleFavorite, isFavorite, addToCompare, compareList } =
    useMarketplace()
  const fav = isFavorite(vendor.slug)
  const inCompare = compareList.includes(vendor.slug)
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  return (
    <>
      <div className="sticky top-0 z-30 border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto flex items-center justify-between gap-3 px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="hidden shrink-0 sm:flex"
              onClick={() => setView('browse')}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="truncate font-serif text-sm font-semibold text-foreground sm:text-base">
                  {vendor.businessName}
                </h3>
                {vendor.verified && (
                  <BadgeCheck className="h-4 w-4 flex-shrink-0 text-primary hover-scale" />
                )}
                {vendor.premium && (
                  <span className="shimmer-text text-[10px] font-bold uppercase tracking-wider">Premium</span>
                )}
              </div>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span className="truncate">
                  {vendor.area ? `${vendor.area}, ` : ''}{vendor.city}
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              disabled={inCompare || compareList.length >= 3}
              onClick={() => addToCompare(vendor.slug)}
              className="hidden sm:flex hover-scale"
            >
              <GitCompare className="h-4 w-4" />
              <span className="hidden md:inline">Compare</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 hover-scale"
              onClick={() => toggleFavorite(vendor.slug)}
              aria-label={fav ? 'Remove from favorites' : 'Save vendor'}
            >
              <Heart
                className={cn(
                  'h-4 w-4',
                  fav ? 'fill-primary text-primary animate-heart-beat' : 'text-foreground'
                )}
              />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-9 hidden md:flex border-primary/30 text-primary hover:bg-primary/10"
              onClick={() => {
                const el = document.getElementById('inquiry-form')
                el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }}
            >
              <Send className="h-4 w-4" />
              <span>Inquiry</span>
            </Button>
            <Button
              size="sm"
              className="h-9 animate-pulse-glow"
              onClick={() => setCheckoutOpen(true)}
            >
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Book Now</span>
              <span className="sm:hidden">Book</span>
            </Button>
          </div>
        </div>
      </div>
      <CheckoutDialog
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        vendorSlug={vendor.slug}
        vendorName={vendor.businessName}
        suggestedAmount={Math.round((vendor.startingPrice || 50000) * 0.25)}
      />
    </>
  )
}

// ---------- Hero cover ----------
function HeroCover({ vendor }: { vendor: {
  businessName: string; coverImage: string; category: string; city: string; area: string | null;
  rating: number; reviewCount: number; startingPrice: number; verified: boolean; featured: boolean; premium: boolean; tags: string[];
} }) {
  const cat = getCategoryConfig(vendor.category)
  const { setView } = useMarketplace()

  return (
    <div className="relative aspect-[21/9] w-full overflow-hidden bg-muted sm:aspect-[21/8]">
      <img
        src={vendor.coverImage}
        alt={vendor.businessName}
        className="h-full w-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

      {/* Top: back button (mobile) */}
      <div className="absolute left-4 top-4 z-10">
        <Button
          variant="secondary"
          size="sm"
          className="bg-white/90 text-foreground backdrop-blur hover:bg-white"
          onClick={() => setView('browse')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to browse
        </Button>
      </div>

      {/* Top right badges */}
      <div className="absolute right-4 top-4 z-10 flex flex-wrap items-center justify-end gap-1.5">
        {vendor.featured && (
          <Badge className="bg-primary text-primary-foreground shadow animate-pulse-glow">
            <Zap className="mr-1 h-3 w-3" /> Featured
          </Badge>
        )}
        {vendor.premium && (
          <Badge className="bg-amber-500 text-white shadow hover-scale">
            <span className="shimmer-text" style={{ background: 'linear-gradient(90deg, #fff 0%, #ffe082 50%, #fff 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Premium
            </span>
          </Badge>
        )}
        {vendor.verified && (
          <Badge className="bg-emerald-600 text-white shadow hover-scale">
            <BadgeCheck className="mr-1 h-3 w-3" /> Verified
          </Badge>
        )}
      </div>

      {/* Bottom overlay content */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-8">
        <div className="container mx-auto">
          <div className="max-w-3xl space-y-2 text-white animate-fade-up">
            <div className="flex flex-wrap items-center gap-2">
              {cat && (
                <Badge
                  variant="secondary"
                  className="bg-white/90 text-foreground backdrop-blur"
                >
                  <Icon name={cat.icon} className="mr-1 inline h-3 w-3" /> {cat.shortName}
                </Badge>
              )}
              <span className="flex items-center gap-1 text-xs text-white/85">
                <MapPin className="h-3 w-3" />
                {vendor.area ? `${vendor.area}, ` : ''}{vendor.city}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-3xl font-bold leading-tight drop-shadow-md sm:text-4xl md:text-5xl">
                {vendor.businessName}
              </h1>
              {vendor.verified && (
                <div className="flex-shrink-0 animate-scale-in">
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500/20 backdrop-blur ring-2 ring-emerald-400">
                    <BadgeCheck className="h-5 w-5 text-emerald-400" />
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <StarRating
                  rating={vendor.rating}
                  size="md"
                  showNumber
                  reviewCount={vendor.reviewCount}
                />
              </div>
              <span className="flex items-center gap-1 text-white/90">
                <span className="text-xs uppercase tracking-wide opacity-70">
                  Starting from
                </span>
                <span className="font-bold text-amber-300">
                  {formatPKR(vendor.startingPrice)}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------- Portfolio gallery with lightbox ----------
function PortfolioGallery({ images, businessName }: { images: string[]; businessName: string }) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  if (!images || images.length === 0) {
    return (
      <Card className="border-dashed bg-card p-8 text-center">
        <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground/60" />
        <p className="mt-2 text-sm text-muted-foreground">
          Portfolio photos coming soon.
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.slice(0, 9).map((src, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={cn(
              'group relative aspect-square overflow-hidden rounded-lg border border-border/60 bg-muted transition-all hover:-translate-y-0.5 hover:shadow-lg',
              i === 0 && images.length > 4 ? 'col-span-2 row-span-2 aspect-square' : ''
            )}
            aria-label={`View photo ${i + 1} of ${businessName}`}
          >
            <img
              src={src}
              alt={`${businessName} portfolio photo ${i + 1}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
            {i === 8 && images.length > 9 && (
              <div className="absolute inset-0 grid place-items-center bg-black/60 text-white">
                <span className="font-semibold">+{images.length - 9}</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={activeIdx !== null} onOpenChange={(o) => !o && setActiveIdx(null)}>
        <DialogContent
          showCloseButton
          className="max-w-3xl border-border/40 bg-black/95 p-0 sm:max-w-3xl"
        >
          <DialogTitle className="sr-only">
            {businessName} portfolio photo
          </DialogTitle>
          <DialogDescription className="sr-only">
            Photo {activeIdx !== null ? activeIdx + 1 : 0} of {images.length}
          </DialogDescription>
          {activeIdx !== null && (
            <div className="relative">
              <img
                src={images[activeIdx]}
                alt={`${businessName} photo ${activeIdx + 1}`}
                className="h-[70vh] w-full object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    setActiveIdx((activeIdx - 1 + images.length) % images.length)
                  }
                  className="bg-white/20 text-white backdrop-blur hover:bg-white/30"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Prev
                </Button>
                <span className="text-sm font-medium">
                  {activeIdx + 1} / {images.length}
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setActiveIdx((activeIdx + 1) % images.length)}
                  className="bg-white/20 text-white backdrop-blur hover:bg-white/30"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// ---------- Package card ----------
function PackageCard({
  pkg,
  vendorSlug,
}: {
  pkg: Package
  vendorSlug: string
}) {
  return (
    <Card
      className={cn(
        'relative flex flex-col overflow-hidden border-border/60 bg-card transition-all hover:shadow-lg',
        pkg.popular && 'border-primary shadow-md ring-1 ring-primary/20'
      )}
    >
      {pkg.popular && (
        <div className="absolute inset-x-0 top-0 bg-primary py-1 text-center text-xs font-semibold uppercase tracking-wide text-primary-foreground">
          ★ Popular Choice
        </div>
      )}
      <CardHeader className={cn('space-y-2', pkg.popular && 'pt-8')}>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="font-serif text-lg font-semibold text-foreground">
            {pkg.name}
          </CardTitle>
        </div>
        {pkg.description && (
          <p className="text-sm text-muted-foreground">{pkg.description}</p>
        )}
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <div className="flex items-baseline gap-2">
          <span className="font-serif text-2xl font-bold text-primary">
            {formatPKR(pkg.price)}
          </span>
          {pkg.duration && (
            <span className="text-xs text-muted-foreground">
              · {pkg.duration}
            </span>
          )}
        </div>

        {pkg.features.length > 0 && (
          <ul className="flex-1 space-y-2">
            {pkg.features.map((f, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-foreground/90"
              >
                <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                  <Check className="h-3 w-3" />
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        )}

        <Button
          variant={pkg.popular ? 'default' : 'outline'}
          className="w-full"
          onClick={() => {
            const el = document.getElementById('inquiry-form')
            el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            // prefill message via a custom event so the form picks it up
            window.dispatchEvent(
              new CustomEvent('prefill-inquiry', {
                detail: { vendorSlug, packageName: pkg.name, price: pkg.price },
              })
            )
          }}
        >
          <Send className="h-4 w-4" />
          Inquiry for this package
        </Button>
      </CardContent>
    </Card>
  )
}

// ---------- Reviews section ----------
function ReviewsSection({ reviews, rating, reviewCount }: {
  reviews: Review[]
  rating: number
  reviewCount: number
}) {
  // rating breakdown (5★ to 1★)
  const breakdown = useMemo(() => {
    const buckets = [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: reviews.filter((r) => Math.floor(r.rating) === star).length,
    }))
    const max = Math.max(1, ...buckets.map((b) => b.count))
    return buckets.map((b) => ({ ...b, pct: (b.count / max) * 100 }))
  }, [reviews])

  const avgDisplay = rating > 0 ? rating.toFixed(1) : '0.0'

  return (
    <div className="space-y-5">
      {/* Rating summary */}
      <Card className="bg-card p-5">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex flex-col items-center justify-center rounded-xl bg-primary/5 p-4 text-center sm:w-40">
            <div className="font-serif text-4xl font-bold text-primary">
              {avgDisplay}
            </div>
            <StarRating rating={rating} size="md" className="mt-1" />
            <p className="mt-1 text-xs text-muted-foreground">
              {reviewCount} review{reviewCount === 1 ? '' : 's'}
            </p>
          </div>
          <div className="flex-1 space-y-1.5">
            {breakdown.map((b) => (
              <div key={b.star} className="flex items-center gap-2 text-xs">
                <span className="flex w-12 items-center gap-0.5 text-muted-foreground">
                  {b.star}
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-amber-400"
                    style={{ width: `${b.pct}%` }}
                  />
                </div>
                <span className="w-8 text-right text-muted-foreground">
                  {b.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Reviews list */}
      {reviews.length === 0 ? (
        <Card className="border-dashed p-6 text-center text-sm text-muted-foreground">
          Koi reviews abhi tak nahi aayi. Be the first to review!
        </Card>
      ) : (
        <div className="max-h-96 space-y-3 overflow-y-auto custom-scrollbar pr-1">
          {reviews.map((review) => (
            <Card key={review.id} className="bg-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 font-serif text-sm font-semibold text-primary">
                    {review.customerName.charAt(0).toUpperCase()}
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground">
                        {review.customerName}
                      </p>
                      {review.eventType && (
                        <Badge
                          variant="secondary"
                          className="bg-accent text-accent-foreground"
                        >
                          {review.eventType}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <StarRating rating={review.rating} size="sm" />
                      {review.eventDate && (
                        <span className="flex items-center gap-1">
                          <CalendarDays className="h-3 w-3" />
                          {new Date(review.eventDate).toLocaleDateString(
                            'en-PK',
                            { month: 'short', year: 'numeric' }
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <Quote className="h-5 w-5 shrink-0 text-primary/30" />
              </div>
              {review.title && (
                <p className="mt-3 font-serif font-semibold text-foreground">
                  {review.title}
                </p>
              )}
              <p className="mt-1 text-sm leading-relaxed text-foreground/90">
                {review.comment}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

// ---------- Inquiry form ----------
function InquiryForm({ vendorSlug }: { vendorSlug: string }) {
  const [form, setForm] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    eventDate: '',
    eventType: '',
    city: '',
    guestCount: '',
    budget: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)

  const update = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }))

  // listen for prefill events from package cards
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as {
        vendorSlug: string
        packageName: string
        price: number
      }
      if (detail.vendorSlug !== vendorSlug) return
      setForm((f) => ({
        ...f,
        message: `Main is package mein interested hun: "${detail.packageName}" (approx ${formatPKR(
          detail.price
        )}). Please share availability & final quote.`,
      }))
    }
    window.addEventListener('prefill-inquiry', handler as EventListener)
    return () =>
      window.removeEventListener('prefill-inquiry', handler as EventListener)
  }, [vendorSlug])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (
      !form.customerName ||
      !form.customerPhone ||
      !form.eventDate ||
      !form.message
    ) {
      toast.error('Please fill in your name, phone, event date, and message.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, vendorSlug }),
      })
      const data = await res.json()
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to send inquiry')
      }
      toast.success('Inquiry sent! 🎉 Vendor will respond shortly.', {
        description: 'Aapko confirmation WhatsApp ya call pe mil jayegi.',
      })
      setForm({
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        eventDate: '',
        eventType: '',
        city: '',
        guestCount: '',
        budget: '',
        message: '',
      })
    } catch (err) {
      toast.error('Could not send inquiry', {
        description:
          err instanceof Error ? err.message : 'Please try again later.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card id="inquiry-form" className="bg-card shadow-md">
      <CardHeader className="gap-1 border-b bg-primary/5 px-5 py-4">
        <CardTitle className="flex items-center gap-2 font-serif text-lg font-semibold text-foreground">
          <Send className="h-4 w-4 text-primary" />
          Send Inquiry
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Fill the form & vendor will get back to you — usually within hours.
        </p>
      </CardHeader>
      <CardContent className="px-5 py-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field
              id="customerName"
              label="Your Name *"
              value={form.customerName}
              onChange={(v) => update('customerName', v)}
              placeholder="e.g. Ayesha Khan"
            />
            <Field
              id="customerPhone"
              label="Phone / WhatsApp *"
              type="tel"
              value={form.customerPhone}
              onChange={(v) => update('customerPhone', v)}
              placeholder="03XX-XXXXXXX"
            />
          </div>

          <Field
            id="customerEmail"
            label="Email (optional)"
            type="email"
            value={form.customerEmail}
            onChange={(v) => update('customerEmail', v)}
            placeholder="you@email.com"
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="eventDate" className="text-xs font-medium">
                Event Date *
              </Label>
              <Input
                id="eventDate"
                type="date"
                value={form.eventDate}
                onChange={(e) => update('eventDate', e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="eventType" className="text-xs font-medium">
                Event Type
              </Label>
              <Select
                value={form.eventType}
                onValueChange={(v) => update('eventType', v)}
              >
                <SelectTrigger id="eventType" className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {EVENT_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label htmlFor="city" className="text-xs font-medium">
                City
              </Label>
              <Select
                value={form.city}
                onValueChange={(v) => update('city', v)}
              >
                <SelectTrigger id="city" className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {CITIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Field
              id="guestCount"
              label="Guests"
              type="number"
              value={form.guestCount}
              onChange={(v) => update('guestCount', v)}
              placeholder="e.g. 300"
            />
            <Field
              id="budget"
              label="Budget (PKR)"
              type="number"
              value={form.budget}
              onChange={(v) => update('budget', v)}
              placeholder="e.g. 200000"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="message" className="text-xs font-medium">
              Message *
            </Label>
            <Textarea
              id="message"
              rows={4}
              value={form.message}
              onChange={(e) => update('message', e.target.value)}
              placeholder="Tell the vendor about your event, what you're looking for, and any questions you have…"
            />
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full"
            size="lg"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Inquiry
              </>
            )}
          </Button>
          <p className="text-center text-[11px] text-muted-foreground">
            Free to send · No commitment · Vendor responds directly
          </p>
        </form>
      </CardContent>
    </Card>
  )
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-medium">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full"
      />
    </div>
  )
}

// ---------- Quick contact card ----------
function QuickContact({ vendor }: { vendor: {
  whatsapp: string | null; phone: string | null; email: string | null; instagram: string | null;
} }) {
  const wa = vendor.whatsapp
    ? vendor.whatsapp.replace(/[^0-9]/g, '').replace(/^0/, '92')
    : null

  return (
    <Card className="bg-card">
      <CardHeader className="border-b bg-accent/30 px-5 py-4">
        <CardTitle className="font-serif text-base font-semibold text-foreground">
          Quick Contact
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2 px-5 py-4">
        {wa && (
          <Button
            asChild
            className="bg-[#25D366] text-white hover:bg-[#1da851]"
          >
            <a
              href={`https://wa.me/${wa}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </Button>
        )}
        {vendor.phone && (
          <Button asChild variant="outline">
            <a href={`tel:${vendor.phone}`}>
              <Phone className="h-4 w-4" />
              Call
            </a>
          </Button>
        )}
        {vendor.email && (
          <Button asChild variant="outline" className="col-span-2">
            <a href={`mailto:${vendor.email}`}>
              <Mail className="h-4 w-4" />
              {vendor.email}
            </a>
          </Button>
        )}
        {vendor.instagram && (
          <Button
            asChild
            variant="outline"
            className="col-span-2"
          >
            <a
              href={
                vendor.instagram.startsWith('http')
                  ? vendor.instagram
                  : `https://instagram.com/${vendor.instagram.replace('@', '')}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-4 w-4" />
              @{vendor.instagram.replace(/^@|https?:\/\/(www\.)?instagram\.com\//g, '')}
            </a>
          </Button>
        )}
        {!wa && !vendor.phone && !vendor.email && !vendor.instagram && (
          <p className="col-span-2 py-4 text-center text-xs text-muted-foreground">
            Contact info not available.
          </p>
        )}
      </CardContent>
    </Card>
  )
}

// ---------- Vendor info card ----------
function VendorInfoCard({ vendor }: { vendor: {
  responseTime: string | null; yearsActive: number; teamSize: string | null; verified: boolean;
  address: string | null; city: string; area: string | null; tags: string[]; services: string[];
} }) {
  const items = [
    {
      icon: Clock,
      label: 'Response Time',
      value: vendor.responseTime || 'Within a day',
    },
    {
      icon: Calendar,
      label: 'Years Active',
      value: `${vendor.yearsActive}+ year${vendor.yearsActive === 1 ? '' : 's'}`,
    },
    {
      icon: Users,
      label: 'Team Size',
      value: vendor.teamSize || 'Not specified',
    },
  ]

  return (
    <Card className="bg-card">
      <CardHeader className="border-b bg-accent/30 px-5 py-4">
        <CardTitle className="font-serif text-base font-semibold text-foreground">
          Vendor Info
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-5 py-4">
        <div className="grid grid-cols-3 gap-2">
          {items.map((it) => (
            <div
              key={it.label}
              className="rounded-lg bg-background p-2 text-center"
            >
              <it.icon className="mx-auto h-4 w-4 text-primary" />
              <p className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">
                {it.label}
              </p>
              <p className="text-xs font-semibold text-foreground">
                {it.value}
              </p>
            </div>
          ))}
        </div>

        {vendor.verified && (
          <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-2.5 text-emerald-700">
            <BadgeCheck className="h-4 w-4" />
            <span className="text-xs font-medium">
              ShaadiSet Verified — KYC + business proof checked
            </span>
          </div>
        )}

        {vendor.address && (
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Address
              </p>
              <p className="text-foreground">{vendor.address}</p>
              <p className="text-xs text-muted-foreground">
                {vendor.area ? `${vendor.area}, ` : ''}{vendor.city}
              </p>
            </div>
          </div>
        )}

        {vendor.tags.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Specialties
            </p>
            <div className="flex flex-wrap gap-1.5">
              {vendor.tags.map((t, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="bg-secondary text-secondary-foreground"
                >
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {vendor.services.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Services Offered
              </p>
              <ul className="grid grid-cols-1 gap-1.5 text-sm">
                {vendor.services.map((s, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-foreground/90"
                  >
                    <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                      <Check className="h-3 w-3" />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

// ---------- Similar vendors ----------
function SimilarVendors({ vendors }: { vendors: import('@/lib/types').Vendor[] }) {
  const { setView } = useMarketplace()
  if (vendors.length === 0) return null
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-serif text-2xl font-bold text-foreground">
          Similar Vendors
        </h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-primary"
          onClick={() => setView('browse')}
        >
          View all
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {vendors.map((v) => (
          <VendorCard key={v.slug} vendor={v} />
        ))}
      </div>
    </div>
  )
}

// ---------- Main VendorProfileView ----------
export function VendorProfileView() {
  const { selectedVendorSlug } = useMarketplace()
  const { data, loading, error } = useVendorDetail(selectedVendorSlug)

  if (!selectedVendorSlug) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-sm text-muted-foreground">
          No vendor selected.
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="animate-fade-up">
        <VendorProfileSkeleton />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto max-w-md">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-destructive/10 text-destructive">
            <X className="h-7 w-7" />
          </div>
          <h2 className="mt-4 font-serif text-xl font-semibold text-foreground">
            Vendor not found
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {error || 'Could not load vendor details. Please try again.'}
          </p>
        </div>
      </div>
    )
  }

  const { vendor, packages, reviews, similar } = data

  return (
    <div className="bg-background">
      {/* Render Sonner Toaster so toasts show in this view */}
      <SonnerToaster richColors position="top-center" />

      <StickyHeader vendor={{
        businessName: vendor.businessName,
        slug: vendor.slug,
        city: vendor.city,
        area: vendor.area,
        verified: vendor.verified,
        featured: vendor.featured,
        premium: vendor.premium,
        startingPrice: vendor.startingPrice,
      }} />

      <div className="animate-fade-up">
        <HeroCover vendor={vendor} />

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* ===== LEFT COLUMN ===== */}
            <div className="space-y-8 lg:col-span-2">
              {/* About */}
              <section className="space-y-3">
                <SectionTitle icon={Building2}>About {vendor.businessName}</SectionTitle>
                <p className="text-sm leading-relaxed text-foreground/90 sm:text-base">
                  {vendor.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  {vendor.startingPrice > 0 && (
                    <span className="flex items-center gap-1">
                      <span className="font-semibold text-primary">
                        {formatPKR(vendor.startingPrice)}
                      </span>
                      <span className="text-xs">
                        starting{vendor.category === 'caterers' ? ' / plate' : ''}
                      </span>
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {vendor.rating.toFixed(1)} ({vendor.reviewCount} reviews)
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {vendor.bookingCount} bookings
                  </span>
                </div>
              </section>

              {/* Portfolio gallery */}
              <section className="space-y-3">
                <SectionTitle icon={ImageIcon}>
                  Portfolio Gallery
                </SectionTitle>
                <PortfolioGallery
                  images={vendor.gallery}
                  businessName={vendor.businessName}
                />
              </section>

              {/* Packages */}
              <section className="space-y-3">
                <SectionTitle icon={Zap}>Packages & Pricing</SectionTitle>
                {packages.length === 0 ? (
                  <Card className="border-dashed p-6 text-center text-sm text-muted-foreground">
                    No fixed packages listed. Send an inquiry for a custom
                    quote.
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {packages.map((pkg) => (
                      <PackageCard
                        key={pkg.id}
                        pkg={pkg}
                        vendorSlug={vendor.slug}
                      />
                    ))}
                  </div>
                )}
              </section>

              {/* Availability Calendar */}
              <section className="space-y-3">
                <AvailabilityCalendar vendorSlug={vendor.slug} mode="view" />
              </section>

              {/* Reviews */}
              <section className="space-y-3">
                <SectionTitle icon={Star}>Reviews & Ratings</SectionTitle>
                <ReviewsSection
                  reviews={reviews}
                  rating={vendor.rating}
                  reviewCount={vendor.reviewCount}
                />
              </section>
            </div>

            {/* ===== RIGHT COLUMN (sticky) ===== */}
            <aside className="space-y-5">
              <div className="lg:sticky lg:top-20 space-y-5">
                <InquiryForm vendorSlug={vendor.slug} />
                <PayAdvanceCTA
                  vendorSlug={vendor.slug}
                  vendorName={vendor.businessName}
                  suggestedAmount={Math.round(vendor.startingPrice * 0.25)}
                />
                <QuickContact vendor={vendor} />
                <VendorInfoCard vendor={vendor} />
              </div>
            </aside>
          </div>

          {/* ===== Similar vendors ===== */}
          <Separator className="my-10" />
          <SimilarVendors vendors={similar} />
        </div>
      </div>

      {/* ===== Floating in-app chat ===== */}
      <ChatWidget vendorSlug={vendor.slug} vendorName={vendor.businessName} />
    </div>
  )
}

// ---------- Section title ----------
function SectionTitle({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <h2 className="font-serif text-2xl font-bold text-foreground">
        {children}
      </h2>
    </div>
  )
}

// ---------- Pay Advance CTA ----------
function PayAdvanceCTA({
  vendorSlug,
  vendorName,
  suggestedAmount,
}: {
  vendorSlug: string
  vendorName: string
  suggestedAmount: number
}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/20 p-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="font-serif text-sm font-semibold text-foreground">
            Instant Booking
          </h3>
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground">
          Advance pay karein aur apni date reserve karein. JazzCash, Easypaisa ya card se secure payment.
        </p>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-[11px] text-muted-foreground">
            Suggested advance (25%)
          </div>
          <div className="font-serif text-sm font-bold text-primary">
            {formatPKR(suggestedAmount)}
          </div>
        </div>
        <Button
          className="mt-3 w-full"
          onClick={() => setOpen(true)}
        >
          <CreditCard className="mr-1.5 h-4 w-4" />
          Pay Advance & Book
        </Button>
      </div>
      <CheckoutDialog
        open={open}
        onOpenChange={setOpen}
        vendorSlug={vendorSlug}
        vendorName={vendorName}
        suggestedAmount={suggestedAmount}
      />
    </>
  )
}


