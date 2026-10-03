'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
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
  const { setView, view, compareList, favorites, isAuthenticated } = useMarketplace()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const visibleNavItems = NAV_ITEMS.filter((item) => item.view !== 'dashboard' || isAuthenticated)

  const isActive = (v: string) => view === v

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="header-shell mx-auto flex h-16 w-full max-w-[1920px] items-center justify-between gap-2 px-3 sm:gap-4 sm:px-5 xl:px-8">
        {/* Logo */}
        <button
          onClick={() => setView('home')}
          className="flex shrink-0 items-center gap-2 transition active:scale-95"
          aria-label="ShaadiSet home"
        >
          <Image src="/shaadiset-mark.svg" alt="" width={40} height={40} className="h-9 w-9 rounded-lg shadow-sm" />
          <div className="header-brand-copy text-left leading-none">
            <div className="font-serif text-lg font-bold tracking-tight text-foreground">
              ShaadiSet
            </div>
            <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              Wedding Marketplace
            </div>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="header-desktop-nav min-w-0 flex-1 items-center justify-center gap-0 whitespace-nowrap">
          {visibleNavItems.map((item) => (
            <button
              key={item.view}
              onClick={() => setView(item.view)}
              className={cn(
                'relative flex shrink-0 items-center gap-1 rounded-md px-2 py-2 text-[13px] font-medium transition',
                isActive(item.view)
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground/70 hover:bg-accent hover:text-foreground'
              )}
            >
              <item.icon className="header-nav-icon h-4 w-4" />
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
        <div className="header-actions flex shrink-0 items-center gap-0.5 sm:gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="header-search-action hidden sm:inline-flex"
            onClick={() => setView('browse')}
            aria-label="Search vendors"
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="header-favorites-action relative hidden sm:inline-flex"
            onClick={() => isAuthenticated ? setView('dashboard') : router.push('/login')}
            aria-label={isAuthenticated ? 'Favorites and dashboard' : 'Login to view favorites'}
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
            className="relative hidden sm:inline-flex header-compare-action"
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
            className="header-business-action"
            onClick={() => setView('vendor-signup')}
          >
            <Store className="mr-1.5 h-4 w-4" />
            List Your Business
          </Button>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="header-mobile-menu" aria-label="Open navigation menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <div className="flex items-center gap-2">
                    <Image src="/shaadiset-mark.svg" alt="" width={32} height={32} className="h-8 w-8 rounded-lg" />
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
                {visibleNavItems.map((item) => (
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
                {isAuthenticated && (
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
                )}
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
  const [menuOpen, setMenuOpen] = useState(false)

  // Not logged in â€” use a Sheet for auth (already imported, no extra bundle weight)
  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center gap-1.5">
        <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
          <Link href="/login"><UserIcon className="mr-1.5 h-4 w-4" />Login</Link>
        </Button>
        <Button asChild size="sm" className="header-signup-button hidden sm:inline-flex">
          <Link href="/register">Sign up</Link>
        </Button>
        <Button asChild variant="ghost" size="icon" className="sm:hidden">
          <Link href="/login" aria-label="Login"><UserIcon className="h-4 w-4" /></Link>
        </Button>
      </div>
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
