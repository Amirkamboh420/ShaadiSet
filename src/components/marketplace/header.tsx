'use client'

import { useState } from 'react'
import {
  Menu,
  Heart,
  GitCompare,
  LayoutDashboard,
  Search,
  Sparkles,
  Store,
  Package,
  BookOpen,
  User as UserIcon,
  LogOut,
  ChevronDown,
  Lock,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Crown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/marketplace/theme-toggle'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useMarketplace } from '@/lib/store'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Browse', view: 'browse' as const, icon: Search },
  { label: 'AI Match', view: 'recommend' as const, icon: Sparkles },
  { label: 'Bundles', view: 'bundles' as const, icon: Package },
  { label: 'Plan', view: 'plan' as const, icon: Heart },
  { label: 'Compare', view: 'compare' as const, icon: GitCompare },
  { label: 'Blog', view: 'blog' as const, icon: BookOpen },
  { label: 'VIP', view: 'vip' as const, icon: Crown },
  { label: 'Contact', view: 'contact' as const, icon: Phone },
  { label: 'Dashboard', view: 'dashboard' as const, icon: LayoutDashboard },
]

export function Header() {
  const { setView, view, compareList, favorites } = useMarketplace()
  const [open, setOpen] = useState(false)

  const isActive = (v: string) => view === v

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        {/* Logo */}
        <button
          onClick={() => setView('home')}
          className="flex items-center gap-2 transition active:scale-95"
        >
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="text-left leading-none">
            <div className="font-serif text-lg font-bold tracking-tight text-foreground">
              ShaadiSet
            </div>
            <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              Wedding Marketplace
            </div>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.view}
              onClick={() => setView(item.view)}
              className={cn(
                'relative flex items-center gap-1.5 rounded-md px-2.5 py-2 text-sm font-medium transition',
                isActive(item.view)
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground/70 hover:bg-accent hover:text-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
              {item.view === 'compare' && compareList.length > 0 && (
                <Badge className="ml-0.5 h-4 min-w-4 px-1 text-[9px] bg-primary text-primary-foreground">
                  {compareList.length}
                </Badge>
              )}
              {item.view === 'recommend' && (
                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              )}
              {item.view === 'bundles' && (
                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              )}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex"
            onClick={() => setView('browse')}
            aria-label="Search vendors"
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative hidden sm:inline-flex"
            onClick={() => setView('dashboard')}
            aria-label="Favorites"
          >
            <Heart className="h-4 w-4" />
            {favorites.length > 0 && (
              <Badge className="absolute -right-0.5 -top-0.5 h-4 min-w-4 px-1 text-[9px] bg-primary text-primary-foreground">
                {favorites.length}
              </Badge>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative hidden sm:inline-flex"
            onClick={() => setView('compare')}
            aria-label="Compare list"
          >
            <GitCompare className="h-4 w-4" />
            {compareList.length > 0 && (
              <Badge className="absolute -right-0.5 -top-0.5 h-4 min-w-4 px-1 text-[9px] bg-primary text-primary-foreground">
                {compareList.length}
              </Badge>
            )}
          </Button>

          {/* Theme toggle (light/dark) */}
          <ThemeToggle />

          {/* Auth: Login button or User menu */}
          <UserMenu />

          <Button
            size="sm"
            className="hidden lg:inline-flex"
            onClick={() => setView('vendor-signup')}
          >
            <Store className="mr-1.5 h-4 w-4" />
            List Your Business
          </Button>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <div className="flex items-center gap-2">
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <span className="font-serif text-lg">ShaadiSet</span>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-1">
                <button
                  onClick={() => {
                    setView('home')
                    setOpen(false)
                  }}
                  className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent"
                >
                  Home
                </button>
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.view}
                    onClick={() => {
                      setView(item.view)
                      setOpen(false)
                    }}
                    className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent"
                  >
                    <span className="flex items-center gap-2">
                      <item.icon className="h-4 w-4 text-primary" />
                      {item.label}
                    </span>
                    {item.view === 'compare' && compareList.length > 0 && (
                      <Badge className="h-5 min-w-5 px-1 text-[10px] bg-primary text-primary-foreground">
                        {compareList.length}
                      </Badge>
                    )}
                    {item.view === 'recommend' && (
                      <Badge className="h-5 px-1.5 text-[9px] bg-amber-500 text-white">AI</Badge>
                    )}
                  </button>
                ))}
                <div className="my-2 border-t" />
                <button
                  onClick={() => {
                    setView('browse')
                    setOpen(false)
                  }}
                  className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent"
                >
                  <Search className="h-4 w-4" /> Search
                </button>
                <button
                  onClick={() => {
                    setView('dashboard')
                    setOpen(false)
                  }}
                  className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent"
                >
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                  {favorites.length > 0 && (
                    <Badge className="ml-auto h-5 min-w-5 px-1 text-[10px] bg-primary text-primary-foreground">
                      {favorites.length}
                    </Badge>
                  )}
                </button>
                <Button
                  className="mt-2"
                  onClick={() => {
                    setView('vendor-signup')
                    setOpen(false)
                  }}
                >
                  <Store className="mr-1.5 h-4 w-4" />
                  List Your Business
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

function UserMenu() {
  const { user, isAuthenticated, logoutUser, setView } = useMarketplace()
  const [authSheetOpen, setAuthSheetOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Not logged in — use a Sheet for auth (already imported, no extra bundle weight)
  if (!isAuthenticated || !user) {
    return (
      <>
        <Button
          variant="outline"
          size="sm"
          className="hidden sm:inline-flex"
          onClick={() => setAuthSheetOpen(true)}
        >
          <UserIcon className="mr-1.5 h-4 w-4" />
          Login
        </Button>
        <Button
          size="sm"
          className="hidden sm:inline-flex"
          onClick={() => setAuthSheetOpen(true)}
        >
          Sign Up
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="sm:hidden"
          onClick={() => setAuthSheetOpen(true)}
          aria-label="Login"
        >
          <UserIcon className="h-4 w-4" />
        </Button>
        <SimpleAuthSheet open={authSheetOpen} onOpenChange={setAuthSheetOpen} />
      </>
    )
  }

  // Logged in
  const initial = (user.name || user.email || 'U').charAt(0).toUpperCase()

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex items-center gap-1.5 rounded-full border border-border/60 bg-card p-1 pr-2 transition hover:border-primary/40 hover:shadow-sm"
      >
        <div className="grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
          {initial}
        </div>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </button>
      {menuOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-lg border border-border/60 bg-card shadow-lg">
            <div className="border-b border-border/60 p-3">
              <div className="text-sm font-medium text-foreground">{user.name || 'User'}</div>
              <div className="text-[11px] text-muted-foreground">{user.email}</div>
            </div>
            <button onClick={() => { setView('dashboard'); setMenuOpen(false) }} className="flex w-full items-center gap-2 px-3 py-2.5 text-sm hover:bg-accent">
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </button>
            <button onClick={() => { setView('plan'); setMenuOpen(false) }} className="flex w-full items-center gap-2 px-3 py-2.5 text-sm hover:bg-accent">
              <Heart className="h-4 w-4" /> Wedding Plan
            </button>
            <div className="border-t border-border/60" />
            <button onClick={() => { logoutUser(); setMenuOpen(false) }} className="flex w-full items-center gap-2 px-3 py-2.5 text-sm text-rose-600 hover:bg-rose-500/10">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </>
      )}
    </div>
  )
}

// Simple auth sheet using existing components (Button, Input, Sheet — no extra imports)
function SimpleAuthSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { loginUser } = useMarketplace()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) return
    setLoading(true)
    try {
      if (mode === 'signup') {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, phone }),
        })
        const data = await res.json()
        if (!data.success) { setLoading(false); return }
      }
      const loginRes = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const loginData = await loginRes.json()
      if (loginData.success) {
        loginUser(loginData.user)
        onOpenChange(false)
        setName(''); setEmail(''); setPassword(''); setPhone('')
      }
    } catch {
      // silent
    } finally {
      setLoading(false)
    }
  }

  const inputClass = 'mt-1.5 flex h-11 w-full rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-2 text-sm text-[#222B45] placeholder:text-[#9CA3AF] transition focus:border-[#C61162] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C61162]/10'

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto p-0">
        {/* Header with gradient */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#C61162] to-[#9A0E4C] p-6 text-white">
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-[#EAA552]/20 blur-xl" />
          <div className="relative">
            <div className="flex items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-white/15 backdrop-blur">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold">
                  {mode === 'login' ? 'Welcome Back!' : 'Join ShaadiSet'}
                </h2>
                <p className="text-xs text-white/80">
                  {mode === 'login' ? 'Login to track inquiries, chats & favorites' : 'Apna account banayein — free hai'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="px-6 pt-5">
          <div className="flex gap-1 rounded-xl bg-[#FAE6EF] p-1">
            <button
              onClick={() => setMode('login')}
              className={cn(
                'flex-1 rounded-lg py-2.5 text-sm font-medium transition',
                mode === 'login' ? 'bg-white text-[#C61162] shadow-sm' : 'text-[#8F9BB3]'
              )}
            >
              Login
            </button>
            <button
              onClick={() => setMode('signup')}
              className={cn(
                'flex-1 rounded-lg py-2.5 text-sm font-medium transition',
                mode === 'signup' ? 'bg-white text-[#C61162] shadow-sm' : 'text-[#8F9BB3]'
              )}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {mode === 'signup' && (
            <div>
              <label className="text-xs font-semibold text-[#222B45]">Full Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ahmed Khan" className={inputClass} />
            </div>
          )}
          <div>
            <label className="text-xs font-semibold text-[#222B45]">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputClass} required />
          </div>
          {mode === 'signup' && (
            <div>
              <label className="text-xs font-semibold text-[#222B45]">Phone / WhatsApp</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+92 300 1234567" className={inputClass} />
            </div>
          )}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#222B45]">Password</label>
              {mode === 'signup' && <span className="text-[10px] text-[#8F9BB3]">min 6 chars</span>}
            </div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={inputClass} required minLength={mode === 'signup' ? 6 : undefined} />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C61162] to-[#9A0E4C] text-sm font-semibold text-white shadow-lg shadow-[#C61162]/25 transition hover:from-[#9A0E4C] hover:to-[#C61162] hover:shadow-[#C61162]/35 disabled:opacity-60"
          >
            {loading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Please wait...
              </>
            ) : mode === 'login' ? (
              <>
                <Lock className="h-4 w-4" /> Login
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> Create Account
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E5E7EB]" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-[10px] uppercase tracking-wider text-[#8F9BB3]">or</span>
            </div>
          </div>

          {/* Demo credentials */}
          <div className="rounded-xl border border-[#FAE6EF] bg-[#FAE6EF]/30 p-3 text-center">
            <p className="text-xs text-[#8F9BB3]">Demo login:</p>
            <p className="mt-1 text-xs font-medium text-[#222B45]">demo@shaadiset.pk / demo123</p>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-4 pt-2 text-[10px] text-[#8F9BB3]">
            <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-[#075E54]" /> Secure</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-[#075E54]" /> Free</span>
            <span className="flex items-center gap-1"><Heart className="h-3 w-3 text-[#C61162]" /> Trusted</span>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
