'use client'

import { useEffect, useId, useMemo, useState } from 'react'
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  MapPin,
  Star,
  BadgeCheck,
  Tag,
  Loader2,
  PackageSearch,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from '@/components/ui/sheet'
import { VendorCard } from '@/components/marketplace/vendor-card'
import { Icon, getCategoryIcon } from '@/components/marketplace/icon'
import { useMarketplace } from '@/lib/store'
import { useVendors } from '@/lib/hooks'
import {
  CATEGORIES,
  CITIES,
  SORT_OPTIONS,
  getCategoryConfig,
  formatPKRShort,
} from '@/lib/constants'
import { cn } from '@/lib/utils'

// Rating options for the "minimum rating" filter
const RATING_OPTIONS = [
  { value: '', label: 'Any rating', stars: 0 },
  { value: '3', label: '3.0+', stars: 3 },
  { value: '3.5', label: '3.5+', stars: 3.5 },
  { value: '4', label: '4.0+', stars: 4 },
  { value: '4.5', label: '4.5+', stars: 4.5 },
  { value: '5', label: '5.0', stars: 5 },
]

const VENDORS_PER_PAGE = 9

// ---------- Filter sidebar (shared between desktop sidebar & mobile sheet) ----------
function SearchFilterInput() {
  const { filters, setFilters } = useMarketplace()
  const [searchDraft, setSearchDraft] = useState(filters.search || '')
  const inputId = useId()

  useEffect(() => {
    setSearchDraft(filters.search || '')
  }, [filters.search])

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const search = searchDraft.trim()
      if (search !== filters.search) setFilters({ search })
    }, 300)

    return () => window.clearTimeout(timeout)
  }, [filters.search, searchDraft, setFilters])

  return (
    <div className="space-y-2">
      <Label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Search vendors
      </Label>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id={inputId}
          type="search"
          value={searchDraft}
          onChange={(event) => setSearchDraft(event.target.value)}
          placeholder="Name, service, or area"
          className="pl-9 pr-9"
        />
        {searchDraft && (
          <button
            type="button"
            onClick={() => setSearchDraft('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-accent"
            aria-label="Clear vendor search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}

function FiltersPanelContent() {
  const { filters, setFilters, resetFilters } = useMarketplace()

  return (
    <div className="space-y-6">
      <SearchFilterInput />

      <Separator />

      {/* Category */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            Category
          </h3>
        </div>
        <RadioGroup
          value={filters.category}
          onValueChange={(v) => setFilters({ category: v })}
          className="gap-2"
        >
          <label
            htmlFor="cat-all"
            className={cn(
              'flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors',
              filters.category === 'all'
                ? 'border-primary bg-primary/5 text-foreground'
                : 'border-border text-muted-foreground hover:border-primary/40 hover:bg-accent/50'
            )}
          >
            <RadioGroupItem id="cat-all" value="all" />
            <span className="font-medium">All categories</span>
          </label>
          {CATEGORIES.map((cat) => (
            <label
              key={cat.slug}
              htmlFor={`cat-${cat.slug}`}
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors',
                filters.category === cat.slug
                  ? 'border-primary bg-primary/5 text-foreground'
                  : 'border-border text-muted-foreground hover:border-primary/40 hover:bg-accent/50'
              )}
            >
              <RadioGroupItem id={`cat-${cat.slug}`} value={cat.slug} />
              <Icon name={cat.icon} className="h-4 w-4" />
              <span className="font-medium">{cat.shortName}</span>
            </label>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      {/* City */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            City
          </h3>
        </div>
        <Select
          value={filters.city}
          onValueChange={(v) => setFilters({ city: v })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All cities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All cities</SelectItem>
            {CITIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Price range */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold uppercase tracking-wide text-foreground">
            Budget Range (PKR)
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label htmlFor="min-price" className="text-xs text-muted-foreground">
              Min
            </Label>
            <Input
              id="min-price"
              type="number"
              inputMode="numeric"
              min={0}
              step={1000}
              placeholder="0"
              value={filters.minPrice}
              onChange={(e) => setFilters({ minPrice: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="max-price" className="text-xs text-muted-foreground">
              Max
            </Label>
            <Input
              id="max-price"
              type="number"
              inputMode="numeric"
              min={0}
              step={1000}
              placeholder="10,00,000"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ maxPrice: e.target.value })}
            />
          </div>
        </div>
        {(filters.minPrice || filters.maxPrice) && (
          <p className="text-xs text-muted-foreground">
            {filters.minPrice && `From ${formatPKRShort(Number(filters.minPrice))}`}
            {filters.minPrice && filters.maxPrice && ' â€” '}
            {filters.maxPrice && `up to ${formatPKRShort(Number(filters.maxPrice))}`}
          </p>
        )}
      </div>

      <Separator />

      {/* Minimum rating */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            Minimum Rating
          </h3>
        </div>
        <RadioGroup
          value={filters.minRating}
          onValueChange={(v) => setFilters({ minRating: v })}
          className="grid grid-cols-2 gap-2"
        >
          {RATING_OPTIONS.map((opt) => (
            <label
              key={opt.value || 'any'}
              htmlFor={`rating-${opt.value || 'any'}`}
              className={cn(
                'flex cursor-pointer items-center justify-center gap-1 rounded-md border px-2 py-1.5 text-xs font-medium transition-colors',
                filters.minRating === opt.value
                  ? 'border-primary bg-primary/5 text-foreground'
                  : 'border-border text-muted-foreground hover:border-primary/40 hover:bg-accent/50'
              )}
            >
              <RadioGroupItem
                id={`rating-${opt.value || 'any'}`}
                value={opt.value}
                className="sr-only"
              />
              {opt.stars > 0 ? (
                <>
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  {opt.label}
                </>
              ) : (
                opt.label
              )}
            </label>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      {/* Verified only */}
      <div className="flex items-start gap-2 space-x-2">
        <Checkbox
          id="verified-only"
          checked={filters.verifiedOnly}
          onCheckedChange={(checked) =>
            setFilters({ verifiedOnly: checked === true })
          }
          className="mt-0.5"
        />
        <div className="space-y-0.5 leading-none">
          <Label
            htmlFor="verified-only"
            className="flex items-center gap-1.5 text-sm font-medium text-foreground"
          >
            <BadgeCheck className="h-4 w-4 text-primary" />
            Verified vendors only
          </Label>
          <p className="text-xs text-muted-foreground">
            Show only ShaadiSet-verified businesses
          </p>
        </div>
      </div>

      <Separator />

      {/* Reset */}
      <Button
        variant="outline"
        className="w-full"
        onClick={resetFilters}
      >
        <RotateCcw className="h-4 w-4" />
        Reset all filters
      </Button>
    </div>
  )
}

// ---------- Skeleton card ----------
function SkeletonCard() {
  return (
    <Card className="overflow-hidden border-border/60 p-0">
      <div className="shimmer aspect-[4/3] w-full" />
      <div className="space-y-3 p-4">
        <div className="shimmer h-4 w-3/4 rounded" />
        <div className="shimmer h-3 w-1/2 rounded" />
        <div className="shimmer h-3 w-full rounded" />
        <div className="shimmer h-3 w-5/6 rounded" />
        <div className="flex items-center justify-between pt-2">
          <div className="shimmer h-6 w-20 rounded" />
          <div className="shimmer h-8 w-16 rounded" />
        </div>
      </div>
    </Card>
  )
}

// ---------- Active filter chips ----------
function ActiveFilterChips() {
  const { filters, setFilters, resetFilters } = useMarketplace()
  const cat = filters.category !== 'all' ? getCategoryConfig(filters.category) : null

  const chips: { label: string; onClear: () => void }[] = []
  if (cat) {
    chips.push({
      label: cat.shortName,
      onClear: () => setFilters({ category: 'all' }),
    })
  }
  if (filters.city !== 'all') {
    chips.push({
      label: filters.city,
      onClear: () => setFilters({ city: 'all' }),
    })
  }
  if (filters.search) {
    chips.push({
      label: `"${filters.search}"`,
      onClear: () => setFilters({ search: '' }),
    })
  }
  if (filters.minPrice) {
    chips.push({
      label: `Min ${formatPKRShort(Number(filters.minPrice))}`,
      onClear: () => setFilters({ minPrice: '' }),
    })
  }
  if (filters.maxPrice) {
    chips.push({
      label: `Max ${formatPKRShort(Number(filters.maxPrice))}`,
      onClear: () => setFilters({ maxPrice: '' }),
    })
  }
  if (filters.minRating) {
    chips.push({
      label: `${filters.minRating}â˜… & up`,
      onClear: () => setFilters({ minRating: '' }),
    })
  }
  if (filters.verifiedOnly) {
    chips.push({
      label: 'Verified only',
      onClear: () => setFilters({ verifiedOnly: false }),
    })
  }

  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Active:
      </span>
      {chips.map((chip, i) => (
        <Badge
          key={i}
          variant="secondary"
          className="gap-1 bg-primary/10 text-primary"
        >
          {chip.label}
          <button
            onClick={chip.onClear}
            className="ml-0.5 rounded-full p-0.5 transition-colors hover:bg-primary/20"
            aria-label={`Clear ${chip.label}`}
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      <Button
        variant="ghost"
        size="sm"
        className="h-7 px-2 text-xs text-muted-foreground"
        onClick={resetFilters}
      >
        Clear all
      </Button>
    </div>
  )
}

// ---------- Main BrowseView ----------
export function BrowseView() {
  const {
    filters,
    resetFilters,
    filtersOpen,
    setFiltersOpen,
  } = useMarketplace()
  const { vendors, loading } = useVendors(filters)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPage(1)
  }, [filters])

  const resultCount = vendors.length
  const pageCount = Math.ceil(resultCount / VENDORS_PER_PAGE)
  const firstVisibleResult = (currentPage - 1) * VENDORS_PER_PAGE
  const visibleVendors = vendors.slice(firstVisibleResult, firstVisibleResult + VENDORS_PER_PAGE)
  const activeCat =
    filters.category !== 'all' ? getCategoryConfig(filters.category) : null

  const headerSubtitle = useMemo(() => {
    if (loading) return 'Finding the perfect vendors for your shaadiâ€¦'
    if (resultCount === 0) return 'No vendors match your filters yet.'
    return `${resultCount} vendor${resultCount === 1 ? '' : 's'} ready to make your day special.`
  }, [loading, resultCount])

  return (
    <div className="bg-background">
      {/* ===== Page header band ===== */}
      <div className="border-b border-border/60 bg-gradient-to-b from-accent/40 to-background">
        <div className="container mx-auto px-4 py-8">
          <div
            className="space-y-4 animate-fade-up"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-primary">
                <span className="h-px w-6 bg-primary/40" />
                Browse Vendors
              </div>
              <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
                {activeCat
                  ? activeCat.name
                  : 'Find Your Perfect Wedding Vendors'}
              </h1>
              <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
                {headerSubtitle}
              </p>
            </div>

            {/* Active filter chips */}
            <div className="pt-1">
              <ActiveFilterChips />
            </div>
          </div>
        </div>
      </div>

      {/* ===== Body: sidebar + grid ===== */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[18rem_1fr]">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto custom-scrollbar rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-serif text-lg font-semibold text-foreground">
                  Filters
                </h2>
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  <RotateCcw className="h-3 w-3" />
                  Reset
                </button>
              </div>
              <FiltersPanelContent />
            </div>
          </aside>

          {/* Main column */}
          <div className="space-y-6">
            {/* Toolbar: result count + sort */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      Loadingâ€¦
                    </span>
                  ) : (
                    <span>
                      <span className="font-semibold text-foreground">
                        {resultCount}
                      </span>{' '}
                      result{resultCount === 1 ? '' : 's'}
                      {filters.city !== 'all' && ` in ${filters.city}`}
                    </span>
                  )}
                </p>
              </div>

              <Button
                type="button"
                variant="outline"
                className="lg:hidden"
                onClick={() => setFiltersOpen(true)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <Label
                  htmlFor="sort-select"
                  className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
                >
                  Sort
                </Label>
                <Select
                  value={filters.sort}
                  onValueChange={(v) => setFilters({ sort: v })}
                >
                  <SelectTrigger id="sort-select" className="w-[10rem] sm:w-[14rem]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Vendor grid */}
            {loading ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : resultCount === 0 ? (
              <EmptyState onReset={resetFilters} />
            ) : (
              <>
                <div
                  id="vendor-results"
                  className="grid scroll-mt-24 grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
                >
                  {visibleVendors.map((vendor, i) => (
                    <div
                      key={vendor.slug}
                      className="animate-fade-up"
                      style={{ animationDelay: `${i * 0.04}s` }}
                    >
                      <VendorCard vendor={vendor} className="h-full" />
                    </div>
                  ))}
                </div>

                {resultCount > VENDORS_PER_PAGE && (
                  <div className="flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-5 sm:flex-row">
                    <p className="text-sm text-muted-foreground" aria-live="polite">
                      Showing {firstVisibleResult + 1}â€“{Math.min(firstVisibleResult + VENDORS_PER_PAGE, resultCount)} of {resultCount} vendors
                    </p>
                    <nav aria-label="Vendor results pages" className="flex flex-wrap items-center justify-center gap-1.5">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => {
                          setCurrentPage((page) => Math.max(1, page - 1))
                          document.getElementById('vendor-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }}
                        aria-label="Previous page"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="hidden sm:inline">Previous</span>
                      </Button>
                      {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
                        <Button
                          key={page}
                          type="button"
                          variant={page === currentPage ? 'default' : 'outline'}
                          size="icon"
                          className="h-9 w-9"
                          aria-label={`Page ${page}`}
                          aria-current={page === currentPage ? 'page' : undefined}
                          onClick={() => {
                            setCurrentPage(page)
                            document.getElementById('vendor-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                          }}
                        >
                          {page}
                        </Button>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={currentPage === pageCount}
                        onClick={() => {
                          setCurrentPage((page) => Math.min(pageCount, page + 1))
                          document.getElementById('vendor-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }}
                        aria-label="Next page"
                      >
                        <span className="hidden sm:inline">Next</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* ===== Mobile filter Sheet ===== */}
      <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
        <SheetContent
          side="left"
          className="w-[90%] max-w-md overflow-y-auto p-0 sm:max-w-md"
        >
          <SheetHeader className="border-b bg-primary px-5 py-4 text-primary-foreground">
            <SheetTitle className="font-serif text-lg text-primary-foreground">
              Filters
            </SheetTitle>
            <SheetDescription className="text-primary-foreground/80">
              Refine your vendor search
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-5">
            <FiltersPanelContent />
          </div>
          <div className="sticky bottom-0 flex items-center gap-2 border-t bg-background p-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={resetFilters}
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <SheetClose asChild>
              <Button className="flex-1">
                Show {resultCount} result{resultCount === 1 ? '' : 's'}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

// ---------- Empty state ----------
function EmptyState({ onReset }: { onReset: () => void }) {
  const { setView } = useMarketplace()
  return (
    <Card className="border-dashed border-2 border-border bg-card p-10 text-center sm:p-16">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent text-primary">
        <PackageSearch className="h-8 w-8" />
      </div>
      <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">
        Koi vendor nahi mila
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        Apne filters thore adjust karein ya reset kar ke phir se try karein.
        ShaadiSet pe 100+ verified vendors mojood hain â€” aapko perfect match
        milega!
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row">
        <Button onClick={onReset}>
          <RotateCcw className="h-4 w-4" />
          Reset filters
        </Button>
        <Button variant="outline" onClick={() => setView('home')}>
          Back to home
        </Button>
      </div>
    </Card>
  )
}
