'use client'

import { useEffect, useState, useRef } from 'react'
import {
  LayoutDashboard,
  Store,
  Shield,
  Inbox,
  Heart,
  CalendarCheck,
  Star,
  MessageSquare,
  TrendingUp,
  Users,
  BadgeCheck,
  Wallet,
  ArrowRight,
  Check,
  X,
  Eye,
  Sparkles,
  MapPin,
  Send,
  Circle,
  ArrowLeft,
  RefreshCw,
  Ban,
  Trash2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import { StarRating } from '@/components/marketplace/star-rating'
import { VendorCard } from '@/components/marketplace/vendor-card'
import { useChat } from '@/lib/use-chat'
import { AvailabilityCalendar } from '@/components/marketplace/availability-calendar'
import { cn } from '@/lib/utils'
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useMarketplace } from '@/lib/store'
import { useStats } from '@/lib/hooks'
import {
  formatPKR,
  formatPKRShort,
  getCategoryConfig,
} from '@/lib/constants'
import type { VendorDetail, Stats } from '@/lib/types'
import { toast } from 'sonner'

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-amber-500/15 text-amber-700 border-amber-500/30',
  contacted: 'bg-slate-500/15 text-slate-700 border-slate-500/30',
  quoted: 'bg-purple-500/15 text-purple-700 border-purple-500/30',
  booked: 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30',
  rejected: 'bg-rose-500/15 text-rose-700 border-rose-500/30',
}

function StatusBadge({ status }: { status: string }) {
  const cls = STATUS_STYLES[status] || 'bg-muted text-muted-foreground border-border'
  return (
    <Badge
      variant="outline"
      className={`${cls} capitalize text-[10px]`}
    >
      {status}
    </Badge>
  )
}

interface Inquiry {
  id: string
  customerName: string
  vendorName?: string
  eventType: string | null
  eventDate: string
  status: string
  vendorSlug?: string
  createdAt: string
}

const MOCK_CUSTOMER_INQUIRIES: Inquiry[] = [
  {
    id: 'm1',
    customerName: 'Ayesha Khan',
    vendorName: 'Lens & Light Studios',
    vendorSlug: 'lens-and-light-studios',
    eventType: 'Baraat',
    eventDate: '2025-03-15',
    status: 'quoted',
    createdAt: '2025-01-10T09:00:00Z',
  },
  {
    id: 'm2',
    customerName: 'Ayesha Khan',
    vendorName: 'Royal Marquee Hall',
    vendorSlug: 'royal-marquee-hall',
    eventType: 'Valima',
    eventDate: '2025-03-16',
    status: 'pending',
    createdAt: '2025-01-12T14:30:00Z',
  },
  {
    id: 'm3',
    customerName: 'Ayesha Khan',
    vendorName: 'Cuisine Couture',
    vendorSlug: 'cuisine-couture',
    eventType: 'Baraat',
    eventDate: '2025-03-15',
    status: 'booked',
    createdAt: '2025-01-05T11:00:00Z',
  },
  {
    id: 'm4',
    customerName: 'Ayesha Khan',
    vendorName: 'Hira Bridal Studio',
    vendorSlug: 'hira-bridal-studio',
    eventType: 'Mehndi / Dholki',
    eventDate: '2025-03-14',
    status: 'contacted',
    createdAt: '2025-01-14T08:15:00Z',
  },
]

const VENDOR_EARNINGS_DATA = [
  { month: 'Jul', earnings: 280000, leads: 8 },
  { month: 'Aug', earnings: 320000, leads: 11 },
  { month: 'Sep', earnings: 410000, leads: 14 },
  { month: 'Oct', earnings: 380000, leads: 12 },
  { month: 'Nov', earnings: 520000, leads: 18 },
  { month: 'Dec', earnings: 680000, leads: 22 },
]

const VENDOR_MOCK_REVIEWS = [
  {
    id: 'r1',
    customerName: 'Sara A.',
    rating: 5,
    title: 'Excellent service!',
    comment: 'Photos azeem the. Highly recommend!',
    createdAt: '2025-01-12',
  },
  {
    id: 'r2',
    customerName: 'Bilal M.',
    rating: 4,
    title: 'Good work',
    comment: 'Quality ka kaam. Final delivery thodi slow thi.',
    createdAt: '2025-01-08',
  },
]

/* =========================================================================
   SHARED BITS
   ========================================================================= */

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  accent = 'primary',
}: {
  icon: typeof Inbox
  label: string
  value: string | number
  sub?: string
  accent?: 'primary' | 'gold' | 'emerald' | 'purple'
}) {
  const accentMap: Record<string, string> = {
    primary: 'bg-primary/10 text-primary',
    gold: 'bg-amber-500/15 text-amber-600',
    emerald: 'bg-emerald-500/15 text-emerald-600',
    purple: 'bg-purple-500/15 text-purple-600',
  }
  return (
    <Card className="border-border/60 p-4 transition hover:shadow-md hover:shadow-primary/5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </div>
          <div className="mt-1 font-serif text-2xl font-bold text-foreground md:text-3xl">
            {value}
          </div>
          {sub && (
            <div className="mt-0.5 text-xs text-muted-foreground">{sub}</div>
          )}
        </div>
        <div
          className={`grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg ${accentMap[accent]}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  )
}

function SectionHeader({
  title,
  desc,
  action,
}: {
  title: string
  desc?: string
  action?: React.ReactNode
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <div>
        <h2 className="font-serif text-xl font-bold text-foreground md:text-2xl">
          {title}
        </h2>
        {desc && <p className="mt-0.5 text-sm text-muted-foreground">{desc}</p>}
      </div>
      {action}
    </div>
  )
}

/* =========================================================================
   CUSTOMER DASHBOARD
   ========================================================================= */

function CustomerDashboard() {
  const { favorites, openVendor, setView } = useMarketplace()
  const [favDetails, setFavDetails] = useState<VendorDetail[]>([])
  const [loadingFavs, setLoadingFavs] = useState(false)

  useEffect(() => {
    let cancelled = false
    if (favorites.length === 0) {
      // Defer setState to avoid synchronous call in effect
      Promise.resolve().then(() => {
        if (cancelled) return
        setFavDetails([])
        setLoadingFavs(false)
      })
      return
    }
    Promise.resolve().then(() => {
      if (cancelled) return
      setLoadingFavs(true)
    })
    Promise.all(
      favorites.map((slug) =>
        fetch(`/api/vendors/${slug}`)
          .then((r) => r.json())
          .then((d) => (d && d.vendor ? (d as VendorDetail) : null))
          .catch(() => null)
      )
    ).then((results) => {
      if (cancelled) return
      setFavDetails(results.filter((r): r is VendorDetail => r !== null))
      setLoadingFavs(false)
    })
    return () => {
      cancelled = true
    }
  }, [JSON.stringify(favorites)])

  const pendingReviews = MOCK_CUSTOMER_INQUIRIES.filter(
    (i) => i.status === 'booked'
  ).length

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="animate-fade-up">
        <Badge className="mb-3 bg-primary/10 text-primary">
          <Sparkles className="mr-1 h-3 w-3" /> Customer
        </Badge>
        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
          Welcome back! 👋
        </h1>
        <p className="mt-1 text-muted-foreground">
          Aapki inquiries, saved vendors aur bookings ka snapshot
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        <StatCard icon={Inbox} label="My Inquiries" value={5} accent="primary" />
        <StatCard
          icon={Heart}
          label="Saved Vendors"
          value={favorites.length}
          accent="purple"
        />
        <StatCard
          icon={CalendarCheck}
          label="My Bookings"
          value={1}
          accent="emerald"
        />
        <StatCard
          icon={Star}
          label="Pending Reviews"
          value={pendingReviews}
          accent="gold"
        />
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-2">
        <Button variant="default" onClick={() => setView('browse')}>
          <Store className="h-4 w-4" /> Browse vendors
        </Button>
        <Button variant="outline" onClick={() => setView('compare')}>
          <ArrowRight className="h-4 w-4" /> Compare list
        </Button>
      </div>

      {/* Saved vendors */}
      <div>
        <SectionHeader
          title="Saved Vendors"
          desc="Aapke favorite vendors — jaldi access ke liye"
          action={
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => setView('browse')}
            >
              Browse more <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          }
        />
        {favorites.length === 0 ? (
          <Card className="border-dashed border-2 border-border bg-card p-10 text-center">
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary">
              <Heart className="h-8 w-8" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-foreground">
              Abhi koi saved vendor nahi
            </h3>
            <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
              Browse karke heart icon pe click karein — yahan saved rahega.
            </p>
            <Button className="mt-4" onClick={() => setView('browse')}>
              <Store className="h-4 w-4" /> Browse vendors
            </Button>
          </Card>
        ) : loadingFavs ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: favorites.length }).map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {favDetails.map((d, i) => (
              <div
                key={d.vendor.slug}
                className="animate-fade-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <VendorCard vendor={d.vendor} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent inquiries */}
      <div>
        <SectionHeader
          title="Recent Inquiries"
          desc="Vendor ko bheji gayi recent inquiries"
        />
        <Card className="overflow-hidden border-border/60 p-0">
          <div className="max-h-96 overflow-y-auto custom-scrollbar">
            {MOCK_CUSTOMER_INQUIRIES.map((inq, i) => (
              <button
                key={inq.id}
                onClick={() => inq.vendorSlug && openVendor(inq.vendorSlug)}
                className={`flex w-full items-center justify-between gap-3 p-4 text-left transition hover:bg-accent/40 ${
                  i !== MOCK_CUSTOMER_INQUIRIES.length - 1
                    ? 'border-b border-border/60'
                    : ''
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-foreground">
                    {inq.vendorName}
                  </div>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <CalendarCheck className="h-3 w-3" />
                      {new Date(inq.eventDate).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                    <span>·</span>
                    <span>{inq.eventType}</span>
                  </div>
                </div>
                <StatusBadge status={inq.status} />
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

/* =========================================================================
   VENDOR LIVE CHAT SECTION
   ========================================================================= */

function VendorChatSection() {
  const {
    isConnected,
    conversations,
    fetchVendorConversations,
    joinConversation,
    sendMessage,
    messages,
    otherTyping,
    otherOnline,
  } = useChat()
  const [activeConvId, setActiveConvId] = useState<string | null>(null)
  const [input, setInput] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Fetch vendor conversations on mount + when refreshKey changes
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchVendorConversations('lens-and-light-studios')
    }, 300)
    return () => clearTimeout(timer)
  }, [fetchVendorConversations, refreshKey])

  // Auto-refresh conversation list every 10s
  useEffect(() => {
    const interval = setInterval(() => {
      fetchVendorConversations('lens-and-light-studios')
    }, 10000)
    return () => clearInterval(interval)
  }, [fetchVendorConversations])

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, otherTyping])

  const activeConv = conversations.find((c) => c.id === activeConvId)

  const handleOpenConv = (convId: string) => {
    const conv = conversations.find((c) => c.id === convId)
    if (!conv) return
    setActiveConvId(convId)
    joinConversation({
      vendorSlug: 'lens-and-light-studios',
      vendorName: 'Lens & Light Studios',
      customerName: conv.customerName,
      customerPhone: conv.customerPhone,
      role: 'vendor',
      eventDate: conv.eventDate,
      eventType: conv.eventType,
    })
  }

  const handleSend = () => {
    if (!input.trim()) return
    sendMessage(input)
    setInput('')
  }

  const formatTime = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'now'
    if (mins < 60) return `${mins}m`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h`
    const days = Math.floor(hrs / 24)
    if (days < 7) return `${days}d`
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
  }

  return (
    <div>
      <SectionHeader
        title="Live Chat"
        desc="Customers se real-time baat cheet"
        action={
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setRefreshKey((k) => k + 1)}
          >
            <RefreshCw className="h-4 w-4" /> Refresh
          </Button>
        }
      />
      <Card className="overflow-hidden border-border/60 p-0">
        <div className="grid md:grid-cols-[280px_1fr]">
          {/* Conversation list */}
          <div
            className={cn(
              'border-r border-border/60 bg-muted/30',
              activeConvId && 'hidden md:block'
            )}
          >
            <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                <Circle
                  className={cn(
                    'h-2 w-2',
                    isConnected ? 'fill-emerald-500 text-emerald-500' : 'fill-muted-foreground text-muted-foreground'
                  )}
                />
                {isConnected ? 'Connected' : 'Connecting...'}
              </div>
              <Badge variant="secondary" className="text-[10px]">
                {conversations.length} chat{conversations.length !== 1 ? 's' : ''}
              </Badge>
            </div>
            <div className="max-h-[420px] overflow-y-auto custom-scrollbar">
              {conversations.length === 0 ? (
                <div className="p-6 text-center">
                  <MessageSquare className="mx-auto mb-2 h-8 w-8 text-muted-foreground/40" />
                  <p className="text-sm text-muted-foreground">
                    Abhi koi chat nahi
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    Jab customer vendor profile se chat karega, yahan dikhega
                  </p>
                </div>
              ) : (
                conversations.map((conv) => {
                  const lastMsg = conv.messages[conv.messages.length - 1]
                  const isActive = conv.id === activeConvId
                  return (
                    <button
                      key={conv.id}
                      onClick={() => handleOpenConv(conv.id)}
                      className={cn(
                        'flex w-full items-start gap-2.5 border-b border-border/40 p-3 text-left transition hover:bg-accent/40',
                        isActive && 'bg-accent/60'
                      )}
                    >
                      <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {conv.customerName.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="truncate text-sm font-medium text-foreground">
                            {conv.customerName}
                          </span>
                          <span className="flex-shrink-0 text-[10px] text-muted-foreground">
                            {formatTime(conv.lastMessageAt)}
                          </span>
                        </div>
                        <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                          {lastMsg
                            ? lastMsg.content.slice(0, 40)
                            : 'Chat shuru karein'}
                        </p>
                        {conv.eventType && (
                          <Badge variant="secondary" className="mt-1 text-[9px]">
                            {conv.eventType}
                          </Badge>
                        )}
                      </div>
                    </button>
                  )
                })
              )}
            </div>
          </div>

          {/* Active conversation */}
          <div className={cn('flex flex-col', !activeConvId && 'hidden md:flex')}>
            {activeConv ? (
              <>
                {/* Chat header */}
                <div className="flex items-center gap-3 border-b border-border/60 bg-gradient-to-r from-primary to-[#4D0712] p-3 text-white">
                  <button
                    onClick={() => setActiveConvId(null)}
                    className="grid h-7 w-7 place-items-center rounded-full text-white/80 transition hover:bg-white/15 md:hidden"
                    aria-label="Back"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <div className="relative">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-white/15 font-serif text-sm font-bold">
                      {activeConv.customerName.charAt(0)}
                    </div>
                    {otherOnline && (
                      <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-primary" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold">
                      {activeConv.customerName}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-white/75">
                      {isConnected ? (
                        otherOnline ? (
                          <>
                            <Circle className="h-2 w-2 fill-emerald-400 text-emerald-400" />
                            Online
                          </>
                        ) : (
                          'Connected'
                        )
                      ) : (
                        'Connecting...'
                      )}
                      {activeConv.eventDate && (
                        <>
                          <span>·</span>
                          <CalendarCheck className="h-3 w-3" />
                          {new Date(activeConv.eventDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div
                  ref={scrollRef}
                  className="flex-1 space-y-2 overflow-y-auto custom-scrollbar p-3"
                  style={{ minHeight: '300px', maxHeight: '400px' }}
                >
                  {messages.length === 0 && !otherTyping ? (
                    <div className="flex h-full min-h-[280px] flex-col items-center justify-center text-center">
                      <MessageSquare className="h-8 w-8 text-muted-foreground/40" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        Chat history load ho rahi hai...
                      </p>
                    </div>
                  ) : (
                    <>
                      {messages.map((msg) => {
                        const isMe = msg.sender === 'vendor'
                        return (
                          <div
                            key={msg.id}
                            className={cn('flex flex-col', isMe ? 'items-end' : 'items-start')}
                          >
                            <div
                              className={cn(
                                'max-w-[80%] rounded-2xl px-3 py-2 text-sm',
                                isMe
                                  ? 'rounded-br-md bg-primary text-primary-foreground'
                                  : 'rounded-bl-md bg-accent text-accent-foreground'
                              )}
                            >
                              <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                            </div>
                            <div
                              className={cn(
                                'mt-0.5 px-1 text-[10px] text-muted-foreground',
                                isMe && 'flex-row-reverse'
                              )}
                            >
                              {new Date(msg.timestamp).toLocaleTimeString('en-PK', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </div>
                          </div>
                        )
                      })}
                      {otherTyping && (
                        <div className="flex items-start">
                          <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-accent px-3 py-2.5">
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Input */}
                <div className="border-t border-border/60 p-2.5">
                  <div className="flex items-center gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          handleSend()
                        }
                      }}
                      placeholder="Reply likhein..."
                      disabled={!isConnected}
                      className="flex-1"
                    />
                    <Button
                      size="icon"
                      onClick={handleSend}
                      disabled={!isConnected || !input.trim()}
                      className="h-9 w-9"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex min-h-[400px] flex-col items-center justify-center p-6 text-center">
                <MessageSquare className="h-10 w-10 text-muted-foreground/40" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Select a conversation to start chatting
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}

/* =========================================================================
   VENDOR DASHBOARD
   ========================================================================= */

function VendorDashboard() {
  const { openVendor } = useMarketplace()
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loadingInq, setLoadingInq] = useState(true)
  useEffect(() => {
    let cancelled = false
    fetch('/api/inquiries?vendorSlug=lens-and-light-studios')
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return
        if (data.inquiries && data.inquiries.length > 0) {
          setInquiries(
            data.inquiries.map((i: any) => ({
              id: i.id,
              customerName: i.customerName,
              eventType: i.eventType,
              eventDate: i.eventDate,
              status: i.status,
              createdAt: i.createdAt,
            }))
          )
        } else {
          // Fall back to mock data
          setInquiries([
            {
              id: 'v1',
              customerName: 'Imran S.',
              eventType: 'Baraat',
              eventDate: '2025-03-22',
              status: 'pending',
              createdAt: '2025-01-15T10:00:00Z',
            },
            {
              id: 'v2',
              customerName: 'Fatima A.',
              eventType: 'Nikah',
              eventDate: '2025-02-28',
              status: 'quoted',
              createdAt: '2025-01-13T15:30:00Z',
            },
            {
              id: 'v3',
              customerName: 'Hassan R.',
              eventType: 'Mehndi / Dholki',
              eventDate: '2025-03-20',
              status: 'contacted',
              createdAt: '2025-01-12T09:15:00Z',
            },
            {
              id: 'v4',
              customerName: 'Zainab K.',
              eventType: 'Valima',
              eventDate: '2025-04-02',
              status: 'booked',
              createdAt: '2025-01-08T12:00:00Z',
            },
            {
              id: 'v5',
              customerName: 'Ali T.',
              eventType: 'Engagement / Mangni',
              eventDate: '2025-02-15',
              status: 'rejected',
              createdAt: '2025-01-05T18:00:00Z',
            },
          ])
        }
      })
      .catch(() => {
        if (cancelled) return
        setInquiries([])
      })
      .finally(() => {
        if (!cancelled) setLoadingInq(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const totalLeads = inquiries.length
  const confirmedBookings = inquiries.filter(
    (i) => i.status === 'booked'
  ).length
  const thisMonthEarnings = VENDOR_EARNINGS_DATA.at(-1)?.earnings || 0

  return (
    <div className="space-y-8">
      <div className="animate-fade-up">
        <Badge className="mb-3 bg-primary/10 text-primary">
          <Store className="mr-1 h-3 w-3" /> Vendor
        </Badge>
        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
          Vendor Dashboard
        </h1>
        <p className="mt-1 text-muted-foreground">
          Lens &amp; Light Studios — Lahore · Photographers
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        <StatCard
          icon={Inbox}
          label="Total Leads"
          value={totalLeads}
          sub="+3 this week"
          accent="primary"
        />
        <StatCard
          icon={CalendarCheck}
          label="Confirmed Bookings"
          value={confirmedBookings}
          accent="emerald"
        />
        <StatCard
          icon={Wallet}
          label="Earnings (Dec)"
          value={formatPKRShort(thisMonthEarnings)}
          sub="+30% MoM"
          accent="gold"
        />
        <Card className="border-border/60 p-4">
          <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            Profile Completeness
          </div>
          <div className="mt-2 flex items-center gap-2">
            <Progress value={85} className="flex-1" />
            <span className="font-semibold text-foreground">85%</span>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Add 3 more photos to reach 100%
          </div>
        </Card>
      </div>

      {/* Earnings chart */}
      <div>
        <SectionHeader
          title="Earnings — Last 6 Months"
          desc="Monthly earnings trend (PKR)"
        />
        <Card className="border-border/60 p-4 md:p-6">
          {/* CSS-based earnings bar chart (replaced recharts to reduce bundle) */}
          <div className="flex h-64 w-full items-end gap-2 md:h-72">
            {VENDOR_EARNINGS_DATA.map((d, i) => {
              const maxVal = Math.max(...VENDOR_EARNINGS_DATA.map(v => v.earnings))
              const heightPct = (d.earnings / maxVal) * 100
              return (
                <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                  <div className="relative flex w-full flex-1 items-end">
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-primary/40 to-primary transition-all hover:from-primary/60 hover:to-primary group relative"
                      style={{ height: `${heightPct}%` }}
                    >
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-card px-1.5 py-0.5 text-[10px] font-semibold text-primary opacity-0 shadow-sm transition group-hover:opacity-100">
                        {formatPKRShort(d.earnings)}
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-muted-foreground">{d.month}</span>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      {/* Availability Calendar */}
      <div>
        <SectionHeader
          title="Availability Calendar"
          desc="Apni busy dates mark karein — customers unhe booked dekhenge"
        />
        <AvailabilityCalendar vendorSlug="lens-and-light-studios" mode="manage" />
      </div>

      {/* Leads inbox */}
      <div>
        <SectionHeader
          title="Leads Inbox"
          desc="Nayi inquiries ka inbox — respond karein"
          action={
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Eye className="h-4 w-4" /> View all
            </Button>
          }
        />
        <Card className="overflow-hidden border-border/60 p-0">
          {loadingInq ? (
            <div className="space-y-3 p-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : inquiries.length === 0 ? (
            <div className="p-10 text-center">
              <Inbox className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Abhi koi inquiry nahi. Naye leads yahan dikhenge.
              </p>
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto custom-scrollbar">
              {inquiries.map((inq, i) => (
                <div
                  key={inq.id}
                  className={`flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between ${
                    i !== inquiries.length - 1
                      ? 'border-b border-border/60'
                      : ''
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {inq.customerName.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-foreground">
                          {inq.customerName}
                        </div>
                        <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <CalendarCheck className="h-3 w-3" />
                            {new Date(inq.eventDate).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </span>
                          <span>·</span>
                          <span>{inq.eventType}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={inq.status} />
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-emerald-600 hover:bg-emerald-500/10 hover:text-emerald-700"
                      onClick={() =>
                        toast.success(`Lead accepted: ${inq.customerName}`)
                      }
                    >
                      <Check className="h-3.5 w-3.5" /> Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-rose-600 hover:bg-rose-500/10 hover:text-rose-700"
                      onClick={() =>
                        toast.error(`Lead rejected: ${inq.customerName}`)
                      }
                    >
                      <X className="h-3.5 w-3.5" /> Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Live Chat */}
      <VendorChatSection />

      {/* Recent reviews */}
      <div>
        <SectionHeader
          title="Recent Reviews"
          desc="Customer feedback aapke profile pe"
          action={
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openVendor('lens-and-light-studios')}
            >
              View profile <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          }
        />
        <div className="grid gap-3 md:grid-cols-2">
          {VENDOR_MOCK_REVIEWS.map((r) => (
            <Card key={r.id} className="border-border/60 p-4">
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {r.customerName.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {r.customerName}
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    {new Date(r.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </div>
                </div>
              </div>
              <StarRating rating={r.rating} size="sm" className="mt-2" />
              <div className="mt-1.5 text-sm font-medium text-foreground">
                {r.title}
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {r.comment}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   ADMIN VENDOR MANAGEMENT
   ========================================================================= */

interface AdminVendor {
  id: string
  businessName: string
  slug: string
  category: string
  city: string
  area: string | null
  startingPrice: number
  rating: number
  reviewCount: number
  bookingCount: number
  verified: boolean
  featured: boolean
  premium: boolean
  yearsActive: number
  createdAt: string
}

function VendorManagement() {
  const { openVendor } = useMarketplace()
  const [vendors, setVendors] = useState<AdminVendor[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const fetchVendors = () => {
    setLoading(true)
    fetch(`/api/admin/vendors?filter=${filter}`)
      .then((r) => r.json())
      .then((data) => setVendors(data.vendors || []))
      .catch(() => {})
      .finally(() => {
        Promise.resolve().then(() => setLoading(false))
      })
  }

  useEffect(() => {
    fetchVendors()
  }, [filter]) // re-fetch when filter changes

  const updateVendor = async (
    id: string,
    patch: { verified?: boolean; featured?: boolean; premium?: boolean }
  ) => {
    setUpdatingId(id)
    try {
      const res = await fetch(`/api/admin/vendors/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      })
      const data = await res.json()
      if (data.success) {
        setVendors((prev) =>
          prev.map((v) => (v.id === id ? { ...v, ...patch } : v))
        )
        toast.success(
          `${data.vendor.businessName}: ${patch.verified !== undefined ? (patch.verified ? 'verified' : 'unverified') : patch.featured !== undefined ? (patch.featured ? 'featured' : 'unfeatured') : patch.premium !== undefined ? (patch.premium ? 'premium' : 'standard') : 'updated'}`
        )
      }
    } catch {
      toast.error('Update failed')
    } finally {
      setUpdatingId(null)
    }
  }

  const suspendVendor = async (id: string, name: string) => {
    setUpdatingId(id)
    try {
      await fetch(`/api/admin/vendors/${id}`, { method: 'DELETE' })
      setVendors((prev) =>
        prev.map((v) =>
          v.id === id ? { ...v, verified: false, featured: false, premium: false } : v
        )
      )
      toast.success(`${name} suspended`)
    } catch {
      toast.error('Suspend failed')
    } finally {
      setUpdatingId(null)
    }
  }

  const filtered = vendors.filter(
    (v) =>
      !search ||
      v.businessName.toLowerCase().includes(search.toLowerCase()) ||
      v.city.toLowerCase().includes(search.toLowerCase()) ||
      v.category.toLowerCase().includes(search.toLowerCase())
  )

  const filters = [
    { value: 'all', label: 'All' },
    { value: 'unverified', label: 'Pending' },
    { value: 'verified', label: 'Verified' },
    { value: 'featured', label: 'Featured' },
    { value: 'premium', label: 'Premium' },
  ]

  return (
    <div>
      <SectionHeader
        title="Vendor Management"
        desc="Approve, feature & manage all vendors"
        action={
          <Badge variant="secondary" className="text-xs">
            {vendors.length} vendors
          </Badge>
        }
      />
      <Card className="border-border/60 p-0">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 border-b border-border/60 p-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-1">
            {filters.map((f) => (
              <Button
                key={f.value}
                size="sm"
                variant={filter === f.value ? 'default' : 'outline'}
                onClick={() => setFilter(f.value)}
                className="h-7 px-2.5 text-xs"
              >
                {f.label}
              </Button>
            ))}
          </div>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search vendors..."
            className="h-8 max-w-xs text-sm"
          />
        </div>

        {/* Vendor list */}
        {loading ? (
          <div className="space-y-2 p-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center">
            <Store className="mx-auto mb-2 h-8 w-8 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">Koi vendor nahi mila</p>
          </div>
        ) : (
          <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
            {filtered.map((v, i) => (
              <div
                key={v.id}
                className={cn(
                  'flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between',
                  i !== filtered.length - 1 && 'border-b border-border/40'
                )}
              >
                {/* Vendor info */}
                <div className="flex min-w-0 flex-1 items-center gap-2.5">
                  <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {v.businessName.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        onClick={() => openVendor(v.slug)}
                        className="font-medium text-foreground hover:text-primary"
                      >
                        {v.businessName}
                      </button>
                      {v.verified && (
                        <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                      )}
                      {v.featured && (
                        <Badge className="h-4 px-1 text-[9px] bg-primary/10 text-primary">
                          Featured
                        </Badge>
                      )}
                      {v.premium && (
                        <Badge className="h-4 px-1 text-[9px] bg-amber-500/15 text-amber-700">
                          Premium
                        </Badge>
                      )}
                    </div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
                      <span className="capitalize">{v.category}</span>
                      <span>·</span>
                      <span>{v.city}</span>
                      <span>·</span>
                      <span>{v.rating}★ ({v.reviewCount})</span>
                      <span>·</span>
                      <span>{v.bookingCount} bookings</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {!v.verified ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 px-2 text-[11px] text-emerald-600 hover:bg-emerald-500/10 hover:text-emerald-700"
                      disabled={updatingId === v.id}
                      onClick={() => updateVendor(v.id, { verified: true })}
                    >
                      <BadgeCheck className="h-3 w-3" /> Approve
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 px-2 text-[11px] text-muted-foreground"
                      disabled={updatingId === v.id}
                      onClick={() => updateVendor(v.id, { verified: false })}
                    >
                      Unverify
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className={cn(
                      'h-7 px-2 text-[11px]',
                      v.featured
                        ? 'text-primary hover:bg-primary/10'
                        : 'text-muted-foreground hover:text-primary'
                    )}
                    disabled={updatingId === v.id}
                    onClick={() => updateVendor(v.id, { featured: !v.featured })}
                  >
                    <Star className={cn('h-3 w-3', v.featured && 'fill-primary')} />
                    {v.featured ? 'Featured' : 'Feature'}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 px-2 text-[11px] text-rose-600 hover:bg-rose-500/10 hover:text-rose-700"
                    disabled={updatingId === v.id}
                    onClick={() => suspendVendor(v.id, v.businessName)}
                  >
                    <Ban className="h-3 w-3" /> Suspend
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}

/* =========================================================================
   ADMIN REVIEW MODERATION
   ========================================================================= */

interface AdminReview {
  id: string
  customerName: string
  rating: number
  title: string | null
  comment: string
  eventDate: string | null
  eventType: string | null
  createdAt: string
  vendor: {
    businessName: string
    slug: string
    category: string
    city: string
  }
}

function ReviewModeration() {
  const { openVendor } = useMarketplace()
  const [reviews, setReviews] = useState<AdminReview[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, 5star, low, flagged
  const [search, setSearch] = useState('')

  const fetchReviews = () => {
    setLoading(true)
    fetch('/api/admin/reviews?limit=50')
      .then((r) => r.json())
      .then((data) => setReviews(data.reviews || []))
      .catch(() => {})
      .finally(() => {
        Promise.resolve().then(() => setLoading(false))
      })
  }

  useEffect(() => {
    Promise.resolve().then(() => fetchReviews())
  }, [])

  const deleteReview = async (id: string, customerName: string, vendorName: string) => {
    try {
      const res = await fetch(`/api/admin/reviews?id=${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        setReviews((prev) => prev.filter((r) => r.id !== id))
        toast.success(`Review by ${customerName} on ${vendorName} removed`)
      }
    } catch {
      toast.error('Failed to remove review')
    }
  }

  const filtered = reviews.filter((r) => {
    const matchSearch =
      !search ||
      r.customerName.toLowerCase().includes(search.toLowerCase()) ||
      r.vendor.businessName.toLowerCase().includes(search.toLowerCase()) ||
      r.comment.toLowerCase().includes(search.toLowerCase())
    if (!matchSearch) return false
    if (filter === '5star') return r.rating === 5
    if (filter === 'low') return r.rating <= 3
    if (filter === 'flagged')
      return r.comment.length > 200 || r.rating <= 2 // simple flagging heuristic
    return true
  })

  const filters = [
    { value: 'all', label: 'All' },
    { value: '5star', label: '5 Star' },
    { value: 'low', label: 'Low (≤3★)' },
    { value: 'flagged', label: 'Flagged' },
  ]

  return (
    <div>
      <SectionHeader
        title="Review Moderation"
        desc="Customer reviews monitor karein aur manage karein"
        action={
          <Badge variant="secondary" className="text-xs">
            {reviews.length} reviews
          </Badge>
        }
      />
      <Card className="border-border/60 p-0">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 border-b border-border/60 p-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-1">
            {filters.map((f) => (
              <Button
                key={f.value}
                size="sm"
                variant={filter === f.value ? 'default' : 'outline'}
                onClick={() => setFilter(f.value)}
                className="h-7 px-2.5 text-xs"
              >
                {f.label}
              </Button>
            ))}
          </div>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reviews..."
            className="h-8 max-w-xs text-sm"
          />
        </div>

        {/* Reviews list */}
        {loading ? (
          <div className="space-y-2 p-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center">
            <MessageSquare className="mx-auto mb-2 h-8 w-8 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">Koi review nahi mila</p>
          </div>
        ) : (
          <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
            {filtered.map((r, i) => (
              <div
                key={r.id}
                className={cn(
                  'flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between',
                  i !== filtered.length - 1 && 'border-b border-border/40'
                )}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {r.customerName.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-foreground">{r.customerName}</span>
                        <span className="text-[10px] text-muted-foreground">on</span>
                        <button
                          onClick={() => openVendor(r.vendor.slug)}
                          className="text-xs font-medium text-primary hover:underline"
                        >
                          {r.vendor.businessName}
                        </button>
                      </div>
                      <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-muted-foreground">
                        <span className="capitalize">{r.vendor.category}</span>
                        <span>·</span>
                        <span>{r.vendor.city}</span>
                        <span>·</span>
                        <span>
                          {new Date(r.createdAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5">
                    <StarRating rating={r.rating} size="sm" />
                    {r.rating <= 2 && (
                      <Badge className="h-4 px-1 text-[9px] bg-rose-500/15 text-rose-700">
                        Low rating
                      </Badge>
                    )}
                  </div>
                  {r.title && (
                    <div className="mt-1.5 text-sm font-medium text-foreground">{r.title}</div>
                  )}
                  <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{r.comment}</p>
                </div>
                <div className="flex flex-shrink-0 items-center gap-1.5">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 px-2 text-[11px] text-rose-600 hover:bg-rose-500/10 hover:text-rose-700"
                    onClick={() => deleteReview(r.id, r.customerName, r.vendor.businessName)}
                  >
                    <Trash2 className="h-3 w-3" /> Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}

/* =========================================================================
   ADMIN DASHBOARD
   ========================================================================= */

function AdminDashboard() {
  const { stats, loading } = useStats()
  const { openVendor } = useMarketplace()

  if (loading || !stats) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-64" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-72 rounded-xl" />
          <Skeleton className="h-72 rounded-xl" />
        </div>
        <Skeleton className="h-80 rounded-xl" />
      </div>
    )
  }

  const maxCityCount = Math.max(...stats.vendorsByCity.map((c) => c.count), 1)

  return (
    <div className="space-y-8">
      <div className="animate-fade-up">
        <Badge className="mb-3 bg-primary/10 text-primary">
          <Shield className="mr-1 h-3 w-3" /> Admin
        </Badge>
        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
          Platform Overview
        </h1>
        <p className="mt-1 text-muted-foreground">
          ShaadiSet marketplace ke saare metrics ek jagah
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 md:gap-4">
        <StatCard
          icon={Store}
          label="Total Vendors"
          value={stats.totalVendors}
          accent="primary"
        />
        <StatCard
          icon={BadgeCheck}
          label="Verified"
          value={stats.verifiedVendors}
          accent="emerald"
        />
        <StatCard
          icon={Inbox}
          label="Total Inquiries"
          value={stats.totalInquiries}
          accent="purple"
        />
        <StatCard
          icon={Wallet}
          label="Est. GMV"
          value={formatPKRShort(stats.estimatedGmv)}
          accent="gold"
        />
        <StatCard
          icon={Star}
          label="Avg Rating"
          value={`${stats.avgRating}★`}
          accent="primary"
        />
      </div>

      {/* Charts row */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Vendors by Category */}
        <Card className="border-border/60 p-4 md:p-6 lg:col-span-3">
          <div className="mb-4 flex items-center justify-between gap-2">
            <div>
              <h2 className="font-serif text-lg font-bold text-foreground">
                Vendors by Category
              </h2>
              <p className="text-xs text-muted-foreground">
                Category-wise vendor distribution
              </p>
            </div>
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          {/* CSS-based bar chart (replaced recharts) */}
          <div className="flex h-72 w-full items-end gap-2">
            {stats.vendorsByCategory.map((c, i) => {
              const maxVal = Math.max(...stats.vendorsByCategory.map(v => v.count))
              const heightPct = (c.count / maxVal) * 100
              const colors = ['#6C092A', '#660F17', '#B8860B', '#4D0712', '#C71585', '#DAA520', '#8B4513', '#FF6347']
              return (
                <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                  <div className="relative flex w-full flex-1 items-end">
                    <div
                      className="group relative w-full rounded-t-md transition-all hover:opacity-80"
                      style={{ height: `${heightPct}%`, backgroundColor: colors[i % colors.length] }}
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-card px-1.5 py-0.5 text-[10px] font-semibold opacity-0 shadow-sm transition group-hover:opacity-100" style={{ color: colors[i % colors.length] }}>
                        {c.count}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium text-muted-foreground text-center leading-tight">
                    {getCategoryConfig(c.category)?.shortName || c.category}
                  </span>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Vendors by City */}
        <Card className="border-border/60 p-4 md:p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between gap-2">
            <div>
              <h2 className="font-serif text-lg font-bold text-foreground">
                Vendors by City
              </h2>
              <p className="text-xs text-muted-foreground">
                Top wedding cities
              </p>
            </div>
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-4">
            {stats.vendorsByCity.map((c) => {
              const pct = Math.round((c.count / maxCityCount) * 100)
              return (
                <div key={c.city}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">
                      {c.city}
                    </span>
                    <span className="text-muted-foreground">{c.count}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      {/* Top vendors table */}
      <div>
        <SectionHeader
          title="Top Vendors"
          desc="Bookings ke hisaab se top performers"
          action={
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => useMarketplace.getState().setView('browse')}
            >
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          }
        />
        <Card className="overflow-hidden border-border/60 p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="w-12">#</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead className="hidden sm:table-cell">Category</TableHead>
                <TableHead className="hidden md:table-cell">City</TableHead>
                <TableHead className="text-right">Bookings</TableHead>
                <TableHead className="text-right">Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats.topVendors.map((v, i) => (
                <TableRow
                  key={v.slug}
                  className="cursor-pointer"
                  onClick={() => openVendor(v.slug)}
                >
                  <TableCell className="font-bold text-primary">{i + 1}</TableCell>
                  <TableCell className="font-medium text-foreground">
                    {v.businessName}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground sm:table-cell">
                    {getCategoryConfig(v.category)?.shortName || v.category}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">
                    {v.city}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {v.bookingCount}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                      <span className="font-semibold">{v.rating.toFixed(1)}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Recent inquiries */}
      <div>
        <SectionHeader
          title="Recent Inquiries"
          desc="Sab se latest platform-wide inquiries"
        />
        <Card className="overflow-hidden border-border/60 p-0">
          {stats.recentInquiries.length === 0 ? (
            <div className="p-10 text-center text-sm text-muted-foreground">
              Abhi koi inquiry nahi mili.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden sm:table-cell">Vendor</TableHead>
                  <TableHead className="hidden md:table-cell">Event</TableHead>
                  <TableHead className="hidden lg:table-cell">Date</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.recentInquiries.map((inq) => (
                  <TableRow key={inq.id}>
                    <TableCell className="font-medium text-foreground">
                      {inq.customerName}
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground sm:table-cell">
                      {inq.vendorName}
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">
                      {inq.eventType || '—'}
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground lg:table-cell">
                      {new Date(inq.eventDate).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <StatusBadge status={inq.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>
      </div>

      {/* Vendor Management */}
      <VendorManagement />

      {/* Review Moderation */}
      <ReviewModeration />
    </div>
  )
}

/* =========================================================================
   ROOT DASHBOARD
   ========================================================================= */

export function DashboardView() {
  const { dashboardRole, setDashboardRole } = useMarketplace()

  return (
    <div className="animate-fade-up">
      <section className="border-b border-border/60 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container mx-auto px-4 py-8 md:py-10">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="wedding-divider mb-3 max-w-[200px]">
                <LayoutDashboard className="h-4 w-4" />
              </div>
              <h1 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                Dashboard
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Role switch karke different perspectives dekhein
              </p>
            </div>
            <Tabs
              value={dashboardRole}
              onValueChange={(v) =>
                setDashboardRole(v as 'customer' | 'vendor' | 'admin')
              }
            >
              <TabsList className="bg-muted">
                <TabsTrigger value="customer">
                  <Users className="h-3.5 w-3.5" /> Customer
                </TabsTrigger>
                <TabsTrigger value="vendor">
                  <Store className="h-3.5 w-3.5" /> Vendor
                </TabsTrigger>
                <TabsTrigger value="admin">
                  <Shield className="h-3.5 w-3.5" /> Admin
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {dashboardRole === 'customer' && <CustomerDashboard />}
          {dashboardRole === 'vendor' && <VendorDashboard />}
          {dashboardRole === 'admin' && <AdminDashboard />}
        </div>
      </section>
    </div>
  )
}
