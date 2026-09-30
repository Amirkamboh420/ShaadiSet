'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  X,
  Check,
  AlertCircle,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface AvailabilityCalendarProps {
  vendorSlug: string
  /** 'view' = customers see busy dates; 'manage' = vendors toggle their own */
  mode: 'view' | 'manage'
  className?: string
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function formatDate(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function isSameDay(dateStr: string, year: number, month: number, day: number): boolean {
  return dateStr === formatDate(year, month, day)
}

function isPast(dateStr: string): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(dateStr + 'T00:00:00')
  return target < today
}

function isToday(year: number, month: number, day: number): boolean {
  const today = new Date()
  return (
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === day
  )
}

export function AvailabilityCalendar({
  vendorSlug,
  mode,
  className,
}: AvailabilityCalendarProps) {
  const [busyDates, setBusyDates] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)
  const [viewDate, setViewDate] = useState(() => {
    const now = new Date()
    return { year: now.getFullYear(), month: now.getMonth() }
  })

  useEffect(() => {
    let cancelled = false
    fetch(`/api/vendors/${vendorSlug}/availability`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return
        setBusyDates(data.busyDates || [])
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) {
          Promise.resolve().then(() => setLoading(false))
        }
      })
    return () => {
      cancelled = true
    }
  }, [vendorSlug])

  const toggleDate = useCallback(
    async (dateStr: string) => {
      setUpdating(dateStr)
      try {
        const res = await fetch(`/api/vendors/${vendorSlug}/availability`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ date: dateStr }),
        })
        const data = await res.json()
        if (data.success) {
          setBusyDates(data.busyDates)
          toast.success(
            data.action === 'added'
              ? `Marked ${dateStr} as busy`
              : `${dateStr} is now available`
          )
        }
      } catch {
        toast.error('Failed to update availability')
      } finally {
        setUpdating(null)
      }
    },
    [vendorSlug]
  )

  // Calendar grid calculation
  const calendarDays = useMemo(() => {
    const { year, month } = viewDate
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const days: (number | null)[] = []
    for (let i = 0; i < firstDay; i++) days.push(null)
    for (let d = 1; d <= daysInMonth; d++) days.push(d)
    return days
  }, [viewDate])

  const prevMonth = () => {
    setViewDate((prev) => {
      const d = new Date(prev.year, prev.month - 1, 1)
      return { year: d.getFullYear(), month: d.getMonth() }
    })
  }
  const nextMonth = () => {
    setViewDate((prev) => {
      const d = new Date(prev.year, prev.month + 1, 1)
      return { year: d.getFullYear(), month: d.getMonth() }
    })
  }

  const upcomingBusyCount = useMemo(() => {
    const today = formatDate(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    )
    return busyDates.filter((d) => d >= today).length
  }, [busyDates])

  return (
    <Card className={cn('border-border/60 p-5', className)}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
            <Calendar className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-serif text-base font-semibold text-foreground">
              {mode === 'manage' ? 'Manage Availability' : 'Availability Calendar'}
            </h3>
            <p className="text-[11px] text-muted-foreground">
              {mode === 'manage'
                ? 'Mark dates you\'re already booked — customers will see them as busy'
                : 'Check which dates the vendor is already booked'}
            </p>
          </div>
        </div>
        {busyDates.length > 0 && (
          <Badge variant="secondary" className="text-[10px]">
            {upcomingBusy} busy
          </Badge>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-md shimmer" />
          ))}
        </div>
      ) : (
        <>
          {/* Month navigation */}
          <div className="mb-3 flex items-center justify-between">
            <button
              onClick={prevMonth}
              className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition hover:bg-accent hover:text-foreground"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="font-serif text-sm font-semibold text-foreground">
              {MONTHS[viewDate.month]} {viewDate.year}
            </div>
            <button
              onClick={nextMonth}
              className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition hover:bg-accent hover:text-foreground"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Weekday header */}
          <div className="mb-1 grid grid-cols-7 gap-1">
            {WEEKDAYS.map((d) => (
              <div
                key={d}
                className="grid h-7 place-items-center text-[10px] font-medium uppercase text-muted-foreground"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, i) => {
              if (day === null) {
                return <div key={i} />
              }
              const dateStr = formatDate(viewDate.year, viewDate.month, day)
              const isBusy = busyDates.includes(dateStr)
              const past = isPast(dateStr)
              const today = isToday(viewDate.year, viewDate.month, day)

              if (mode === 'manage') {
                return (
                  <button
                    key={i}
                    onClick={() => !past && toggleDate(dateStr)}
                    disabled={past || updating === dateStr}
                    className={cn(
                      'relative aspect-square rounded-md text-xs font-medium transition',
                      past && 'cursor-not-allowed opacity-30',
                      !past && !isBusy && 'text-foreground hover:bg-accent hover:border-primary/40 border border-transparent',
                      isBusy && 'bg-rose-500/15 text-rose-700 border border-rose-500/30',
                      today && 'ring-1 ring-primary ring-offset-1',
                      updating === dateStr && 'opacity-50'
                    )}
                  >
                    {day}
                    {isBusy && (
                      <span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-rose-500" />
                    )}
                  </button>
                )
              }

              // view mode
              return (
                <div
                  key={i}
                  className={cn(
                    'relative aspect-square grid place-items-center rounded-md text-xs font-medium border',
                    isBusy
                      ? 'bg-rose-500/10 text-rose-600 border-rose-500/20'
                      : 'bg-emerald-50/50 text-emerald-700 border-emerald-200/50',
                    today && 'ring-1 ring-primary ring-offset-1'
                  )}
                  title={isBusy ? 'Already booked' : 'Available'}
                >
                  {day}
                  {isBusy ? (
                    <X className="absolute top-0.5 right-0.5 h-2.5 w-2.5 text-rose-500" />
                  ) : (
                    <Check className="absolute top-0.5 right-0.5 h-2.5 w-2.5 text-emerald-500" />
                  )}
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap items-center gap-3 text-[10px] text-muted-foreground">
            {mode === 'view' ? (
              <>
                <span className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded bg-emerald-100 border border-emerald-300" />
                  Available
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded bg-rose-100 border border-rose-300" />
                  Already booked
                </span>
              </>
            ) : (
              <>
                <span className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded border border-border" />
                  Available
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded bg-rose-500/15 border border-rose-500/30" />
                  Marked busy
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3 w-3" /> Click a date to toggle
                </span>
              </>
            )}
          </div>

          {/* Info banner for view mode */}
          {mode === 'view' && upcomingBusy > 0 && (
            <div className="mt-3 flex items-start gap-2 rounded-lg bg-amber-500/10 p-2.5 text-[11px] text-amber-700">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
              <span>
                This vendor has <strong>{upcomingBusy} upcoming date{upcomingBusy !== 1 ? 's' : ''}</strong> already booked.
                Send an inquiry to check your preferred date.
              </span>
            </div>
          )}
        </>
      )}
    </Card>
  )

  function upcomingBusy() {
    const today = formatDate(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    )
    return busyDates.filter((d) => d >= today).length
  }
}
