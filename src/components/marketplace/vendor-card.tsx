'use client'

import { Heart, BadgeCheck, MapPin, Clock, Zap, GitCompare } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Icon, getCategoryIcon } from '@/components/marketplace/icon'
import { Button } from '@/components/ui/button'
import { StarRating } from './star-rating'
import { useMarketplace } from '@/lib/store'
import { formatPKRShort, getCategoryConfig } from '@/lib/constants'
import type { Vendor } from '@/lib/types'
import { cn } from '@/lib/utils'

interface VendorCardProps {
  vendor: Vendor
  className?: string
}

export function VendorCard({ vendor, className }: VendorCardProps) {
  const { openVendor, toggleFavorite, isFavorite, addToCompare, compareList } =
    useMarketplace()
  const fav = isFavorite(vendor.slug)
  const inCompare = compareList.includes(vendor.slug)
  const cat = getCategoryConfig(vendor.category)

  return (
    <Card
      className={cn(
        'group relative overflow-hidden border-border/60 bg-card card-lift cursor-pointer',
        className
      )}
      onClick={() => openVendor(vendor.slug)}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={vendor.coverImage}
          alt={vendor.businessName}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {vendor.featured && (
            <Badge className="bg-primary text-primary-foreground shadow-sm">
              <Zap className="mr-1 h-3 w-3" /> Featured
            </Badge>
          )}
          {vendor.premium && (
            <Badge className="bg-amber-500 text-white shadow-sm">Premium</Badge>
          )}
        </div>

        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleFavorite(vendor.slug)
          }}
          className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 backdrop-blur shadow-sm transition hover:bg-white"
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={cn(
              'h-4 w-4 transition',
              fav ? 'fill-primary text-primary' : 'text-foreground/70'
            )}
          />
        </button>

        {/* Category chip */}
        <div className="absolute bottom-3 left-3">
          <Badge variant="secondary" className="bg-white/90 text-foreground backdrop-blur">
            <Icon name={getCategoryIcon(vendor.category)} className="mr-1 h-3 w-3" /> {cat?.shortName}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <h3 className="font-semibold text-foreground truncate">
                {vendor.businessName}
              </h3>
              {vendor.verified && (
                <BadgeCheck className="h-4 w-4 flex-shrink-0 text-primary" />
              )}
            </div>
            <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span className="truncate">
                {vendor.area ? `${vendor.area}, ` : ''}{vendor.city}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <StarRating
            rating={vendor.rating}
            showNumber
            reviewCount={vendor.reviewCount}
          />
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {vendor.shortDescription}
        </p>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {vendor.responseTime}
          </span>
          <span>•</span>
          <span>{vendor.bookingCount} bookings</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/60">
          <div>
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
              Starting from
            </div>
            <div className="font-bold text-primary">
              {formatPKRShort(vendor.startingPrice)}
              {vendor.category === 'caterers' && (
                <span className="text-[10px] font-normal text-muted-foreground"> /plate</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 px-2 text-xs"
              disabled={inCompare || compareList.length >= 3}
              onClick={(e) => {
                e.stopPropagation()
                addToCompare(vendor.slug)
              }}
            >
              <GitCompare className="h-3.5 w-3.5" />
              Compare
            </Button>
            <Button
              size="sm"
              className="h-8 px-3 text-xs"
              onClick={(e) => {
                e.stopPropagation()
                openVendor(vendor.slug)
              }}
            >
              View
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
