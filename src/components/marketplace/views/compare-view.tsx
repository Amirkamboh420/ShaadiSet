'use client'

import { useEffect, useState } from 'react'
import {
  GitCompare,
  Trash2,
  Plus,
  Star,
  BadgeCheck,
  MapPin,
  MessageCircle,
  CheckCircle2,
  Search,
  Award,
  Sparkles,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { StarRating } from '@/components/marketplace/star-rating'
import { Icon, getCategoryIcon } from '@/components/marketplace/icon'
import { useMarketplace } from '@/lib/store'
import {
  formatPKR,
  formatPKRShort,
  getCategoryConfig,
} from '@/lib/constants'
import type { VendorDetail } from '@/lib/types'
import { toast } from 'sonner'

interface RowConfig {
  key: string
  label: string
  icon?: typeof Star
  render: (d: VendorDetail) => React.ReactNode
}

const ROWS: RowConfig[] = [
  {
    key: 'rating',
    label: 'Rating',
    icon: Star,
    render: (d) => (
      <div className="space-y-1">
        <StarRating rating={d.vendor.rating} showNumber size="sm" />
        <div className="text-xs text-muted-foreground">
          {d.vendor.reviewCount} reviews
        </div>
      </div>
    ),
  },
  {
    key: 'startingPrice',
    label: 'Starting Price',
    render: (d) => (
      <div>
        <div className="font-serif text-xl font-bold text-primary">
          {formatPKR(d.vendor.startingPrice)}
        </div>
        {d.vendor.category === 'caterers' && (
          <div className="text-[10px] text-muted-foreground">/ plate</div>
        )}
      </div>
    ),
  },
  {
    key: 'reviews',
    label: 'Reviews',
    render: (d) => (
      <span className="font-semibold text-foreground">
        {d.vendor.reviewCount}
      </span>
    ),
  },
  {
    key: 'bookings',
    label: 'Bookings',
    render: (d) => (
      <span className="font-semibold text-foreground">
        {d.vendor.bookingCount}+
      </span>
    ),
  },
  {
    key: 'responseTime',
    label: 'Response Time',
    render: (d) => (
      <span className="text-foreground">{d.vendor.responseTime || '—'}</span>
    ),
  },
  {
    key: 'yearsActive',
    label: 'Years Active',
    render: (d) => (
      <span className="text-foreground">{d.vendor.yearsActive} years</span>
    ),
  },
  {
    key: 'teamSize',
    label: 'Team Size',
    render: (d) => (
      <span className="text-foreground">{d.vendor.teamSize || '—'}</span>
    ),
  },
  {
    key: 'city',
    label: 'City / Area',
    icon: MapPin,
    render: (d) => (
      <div className="flex items-center gap-1 text-foreground">
        <MapPin className="h-3 w-3 text-muted-foreground" />
        <span className="text-sm">
          {d.vendor.area ? `${d.vendor.area}, ` : ''}
          {d.vendor.city}
        </span>
      </div>
    ),
  },
  {
    key: 'tags',
    label: 'Tags',
    render: (d) => (
      <div className="flex flex-wrap gap-1">
        {d.vendor.tags.length === 0 ? (
          <span className="text-xs text-muted-foreground">—</span>
        ) : (
          d.vendor.tags.slice(0, 3).map((t) => (
            <Badge
              key={t}
              variant="secondary"
              className="bg-accent text-accent-foreground text-[10px]"
            >
              {t}
            </Badge>
          ))
        )}
      </div>
    ),
  },
  {
    key: 'services',
    label: 'Top Services',
    render: (d) => (
      <ul className="space-y-1 text-xs text-foreground">
        {d.vendor.services.length === 0 ? (
          <li className="text-muted-foreground">—</li>
        ) : (
          d.vendor.services.slice(0, 4).map((s) => (
            <li key={s} className="flex items-start gap-1">
              <CheckCircle2 className="mt-0.5 h-3 w-3 flex-shrink-0 text-primary" />
              <span>{s}</span>
            </li>
          ))
        )}
      </ul>
    ),
  },
  {
    key: 'topPackage',
    label: 'Top Package',
    render: (d) => {
      if (!d.packages || d.packages.length === 0) {
        return <span className="text-muted-foreground">—</span>
      }
      const pkg = d.packages[0]
      return (
        <div className="space-y-1.5 rounded-lg border border-primary/20 bg-primary/5 p-2.5">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-sm text-foreground">
              {pkg.name}
            </span>
            {pkg.popular && (
              <Badge className="bg-primary px-1.5 py-0 text-[9px]">
                Popular
              </Badge>
            )}
          </div>
          <div className="font-bold text-primary">
            {formatPKR(pkg.price)}
            {pkg.duration && (
              <span className="ml-1 text-[10px] font-normal text-muted-foreground">
                / {pkg.duration}
              </span>
            )}
          </div>
          <ul className="space-y-0.5 text-[11px] text-muted-foreground">
            {pkg.features.slice(0, 3).map((f) => (
              <li key={f} className="flex items-start gap-1">
                <CheckCircle2 className="mt-0.5 h-2.5 w-2.5 flex-shrink-0 text-primary" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    },
  },
]

function VendorColumnHeader({
  detail,
  best,
  topRated,
}: {
  detail: VendorDetail
  best: boolean
  topRated: boolean
}) {
  const cat = getCategoryConfig(detail.vendor.category)
  return (
    <div className="space-y-2 p-2">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
        <img
          src={detail.vendor.coverImage}
          alt={detail.vendor.businessName}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        {best && (
          <Badge className="absolute top-2 left-2 bg-emerald-600 text-white shadow-sm">
            <Award className="mr-1 h-3 w-3" /> Best Value
          </Badge>
        )}
        {topRated && (
          <Badge className="absolute top-2 right-2 bg-amber-500 text-white shadow-sm">
            <Star className="mr-0.5 h-3 w-3 fill-current" /> Top Rated
          </Badge>
        )}
      </div>
      <div className="space-y-1.5">
        <div className="flex items-start gap-1">
          <h3 className="font-serif text-base font-bold leading-tight text-foreground">
            {detail.vendor.businessName}
          </h3>
          {detail.vendor.verified && (
            <BadgeCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
          )}
        </div>
        <Badge
          variant="secondary"
          className="bg-accent text-accent-foreground text-[10px]"
        >
          <Icon name={getCategoryIcon(vendor.category)} className="mr-1 inline h-3 w-3" /> {cat?.shortName}
        </Badge>
      </div>
    </div>
  )
}

function AddMoreColumn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex h-full min-h-64 w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/30 p-6 text-muted-foreground transition hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
    >
      <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
        <Plus className="h-6 w-6" />
      </div>
      <div className="text-sm font-medium">Add vendor</div>
      <div className="text-[11px]">Browse and add to compare</div>
    </button>
  )
}

function CompareSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="p-4">
            <Skeleton className="aspect-[4/3] w-full rounded-lg" />
            <Skeleton className="mt-3 h-5 w-3/4" />
            <Skeleton className="mt-2 h-4 w-1/2" />
          </Card>
        ))}
      </div>
      <Skeleton className="h-64 w-full" />
    </div>
  )
}

export function CompareView() {
  const { compareList, removeFromCompare, setView, openVendor, clearCompare } =
    useMarketplace()
  const [details, setDetails] = useState<VendorDetail[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    if (compareList.length === 0) {
      // Defer setState to a microtask to avoid cascading renders
      Promise.resolve().then(() => {
        if (cancelled) return
        setDetails([])
        setLoading(false)
      })
      return
    }
    Promise.resolve().then(() => {
      if (cancelled) return
      setLoading(true)
    })
    Promise.all(
      compareList.map((slug) =>
        fetch(`/api/vendors/${slug}`)
          .then((r) => r.json())
          .then((data) => ({ slug, data }))
      )
    )
      .then((results) => {
        if (cancelled) return
        const valid = results
          .filter((r) => r.data && r.data.vendor)
          .map((r) => r.data as VendorDetail)
        setDetails(valid)
      })
      .catch(() => {
        if (cancelled) return
        toast.error('Failed to load vendor details')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [JSON.stringify(compareList)])

  const cheapestSlug =
    details.length > 0
      ? details.reduce((min, d) =>
          d.vendor.startingPrice < min.vendor.startingPrice ? d : min
        ).vendor.slug
      : null
  const topRatedSlug =
    details.length > 0
      ? details.reduce((max, d) =>
          d.vendor.rating > max.vendor.rating ? d : max
        ).vendor.slug
      : null

  return (
    <div className="animate-fade-up">
      {/* Header */}
      <section className="border-b border-border/60 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <div className="animate-fade-up">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <Badge className="mb-3 bg-primary/10 text-primary">
                  <GitCompare className="mr-1 h-3 w-3" /> Side-by-Side
                </Badge>
                <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                  Compare Vendors
                </h1>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                  Compare pricing, ratings, packages aur services — saath
                  dekhein, better decision lein. Add up to 3 vendors.
                </p>
              </div>
              {compareList.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    clearCompare()
                    toast.success('Compare list cleared')
                  }}
                >
                  <X className="h-4 w-4" /> Clear all
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Empty state */}
          {compareList.length === 0 && !loading ? (
            <div
              className="mx-auto max-w-lg animate-fade-up"
            >
              <Card className="border-dashed border-2 border-border bg-card p-10 text-center">
                <div className="mx-auto mb-5 grid h-24 w-24 place-items-center rounded-full bg-primary/10 text-primary">
                  <GitCompare className="h-12 w-12" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  Koi vendor compare nahi kiya
                </h2>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                  Browse vendors karein aur &ldquo;Compare&rdquo; button click
                  karein. 2-3 vendors ko side-by-side compare karke better
                  decision lein.
                </p>
                <Button
                  className="mt-6"
                  size="lg"
                  onClick={() => setView('browse')}
                >
                  <Search className="h-4 w-4" /> Browse Vendors
                </Button>
              </Card>
            </div>
          ) : loading ? (
            <CompareSkeleton />
          ) : (
            <div className="space-y-6">
              {/* Comparison table */}
              <div className="overflow-x-auto custom-scrollbar -mx-4 px-4 pb-4">
                <table className="w-full border-separate border-spacing-0">
                  <thead>
                    <tr>
                      <th className="sticky left-0 z-20 w-44 min-w-44 bg-background p-3 text-left align-bottom">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Comparison
                        </span>
                      </th>
                      {details.map((d) => (
                        <th
                          key={d.vendor.slug}
                          className="w-72 min-w-72 bg-card align-bottom"
                          style={{ borderLeft: '1px solid var(--border)' }}
                        >
                          <VendorColumnHeader
                            detail={d}
                            best={cheapestSlug === d.vendor.slug}
                            topRated={topRatedSlug === d.vendor.slug}
                          />
                        </th>
                      ))}
                      {compareList.length < 3 && (
                        <th
                          className="w-72 min-w-72 align-bottom p-3"
                          style={{ borderLeft: '1px solid var(--border)' }}
                        >
                          <AddMoreColumn onClick={() => setView('browse')} />
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {ROWS.map((row) => (
                      <tr key={row.key}>
                        <td className="sticky left-0 z-10 w-44 min-w-44 border-b border-border/60 bg-background p-3 text-xs font-medium text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            {row.icon && (
                              <row.icon className="h-3.5 w-3.5" />
                            )}
                            {row.label}
                          </div>
                        </td>
                        {details.map((d) => (
                          <td
                            key={d.vendor.slug}
                            className="border-b border-border/60 bg-card p-3 align-top text-sm"
                            style={{ borderLeft: '1px solid var(--border)' }}
                          >
                            {row.render(d)}
                          </td>
                        ))}
                        {compareList.length < 3 && (
                          <td
                            className="border-b border-border/60 p-3"
                            style={{
                              borderLeft: '1px solid var(--border)',
                            }}
                          />
                        )}
                      </tr>
                    ))}
                    {/* Action row */}
                    <tr>
                      <td className="sticky left-0 z-10 bg-background p-3" />
                      {details.map((d) => (
                        <td
                          key={d.vendor.slug}
                          className="space-y-2 bg-card p-3"
                          style={{ borderLeft: '1px solid var(--border)' }}
                        >
                          <Button
                            className="w-full"
                            size="sm"
                            onClick={() => openVendor(d.vendor.slug)}
                          >
                            <MessageCircle className="h-4 w-4" /> Send Inquiry
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-destructive hover:bg-destructive/5 hover:text-destructive"
                            onClick={() => {
                              removeFromCompare(d.vendor.slug)
                              toast.success(
                                `${d.vendor.businessName} removed from compare`
                              )
                            }}
                          >
                            <Trash2 className="h-4 w-4" /> Remove
                          </Button>
                        </td>
                      ))}
                      {compareList.length < 3 && (
                        <td
                          className="p-3"
                          style={{ borderLeft: '1px solid var(--border)' }}
                        />
                      )}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Helper hint */}
              <div className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-primary/20 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>
                  <span className="font-semibold text-primary">Best Value</span>{' '}
                  = lowest starting price ·{' '}
                  <span className="font-semibold text-amber-600">
                    Top Rated
                  </span>{' '}
                  = highest rating
                </span>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
