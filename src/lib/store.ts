import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Vendor, View, Filters, ChecklistItem, BudgetItem, Guest, WeddingPlan } from './types'

interface MarketplaceState {
  // Navigation
  view: View
  selectedVendorSlug: string | null
  setView: (view: View) => void
  openVendor: (slug: string) => void
  goHome: () => void

  // Filters (persisted for browse view)
  filters: Filters
  setFilters: (filters: Partial<Filters>) => void
  resetFilters: () => void

  // Compare list (persisted)
  compareList: string[]  // vendor slugs
  addToCompare: (slug: string) => void
  removeFromCompare: (slug: string) => void
  clearCompare: () => void

  // Favorites (persisted)
  favorites: string[]  // vendor slugs
  toggleFavorite: (slug: string) => void
  isFavorite: (slug: string) => boolean

  // Dashboard role
  dashboardRole: 'customer' | 'vendor' | 'admin'
  setDashboardRole: (role: 'customer' | 'vendor' | 'admin') => void

  // Mobile nav
  mobileNavOpen: boolean
  setMobileNavOpen: (open: boolean) => void

  // Mobile filters
  filtersOpen: boolean
  setFiltersOpen: (open: boolean) => void

  // Cache for vendor details to avoid re-fetching
  vendorCache: Record<string, Vendor>
  cacheVendor: (vendor: Vendor) => void

  // ===== Wedding Planning Tools (persisted) =====
  weddingPlan: WeddingPlan
  setWeddingPlan: (plan: Partial<WeddingPlan>) => void

  checklist: ChecklistItem[]
  addChecklistItem: (item: Omit<ChecklistItem, 'id' | 'createdAt' | 'done'>) => void
  toggleChecklistItem: (id: string) => void
  updateChecklistItem: (id: string, patch: Partial<ChecklistItem>) => void
  removeChecklistItem: (id: string) => void
  resetChecklist: (items: ChecklistItem[]) => void

  budget: BudgetItem[]
  addBudgetItem: (item: Omit<BudgetItem, 'id' | 'createdAt'>) => void
  updateBudgetItem: (id: string, patch: Partial<BudgetItem>) => void
  removeBudgetItem: (id: string) => void

  guests: Guest[]
  addGuest: (guest: Omit<Guest, 'id' | 'createdAt'>) => void
  updateGuest: (id: string, patch: Partial<Guest>) => void
  removeGuest: (id: string) => void

  // AI recommendation inputs (persisted)
  recommendInputs: {
    budget: number
    eventType: string
    city: string
    categories: string[]
    style: string
  }
  setRecommendInputs: (inputs: Partial<MarketplaceState['recommendInputs']>) => void

  // ===== Auth (persisted) =====
  user: { id: string; name: string | null; email: string; phone: string | null; role: string } | null
  isAuthenticated: boolean
  loginUser: (user: { id: string; name: string | null; email: string; phone: string | null; role: string }) => void
  logoutUser: () => void
}

const DEFAULT_FILTERS: Filters = {
  category: 'all',
  city: 'all',
  search: '',
  sort: 'featured',
  minPrice: '',
  maxPrice: '',
  minRating: '',
  verifiedOnly: false,
}

function updateViewUrl(view: View, vendorSlug?: string) {
  if (typeof window === 'undefined') return

  const url = new URL(window.location.href)
  if (view === 'home') url.searchParams.delete('page')
  else url.searchParams.set('page', view)

  if (view === 'vendor' && vendorSlug) url.searchParams.set('vendor', vendorSlug)
  else url.searchParams.delete('vendor')

  const nextUrl = `${url.pathname}${url.search}${url.hash}`
  const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`
  if (nextUrl !== currentUrl) window.history.pushState(null, '', nextUrl)
}

export const useMarketplace = create<MarketplaceState>()(
  persist(
    (set, get) => ({
      view: 'home',
      selectedVendorSlug: null,
      setView: (view) => {
        updateViewUrl(view)
        set({ view, selectedVendorSlug: null, mobileNavOpen: false })
      },
      openVendor: (slug) => {
        updateViewUrl('vendor', slug)
        set({ view: 'vendor', selectedVendorSlug: slug, mobileNavOpen: false })
      },
      goHome: () => {
        updateViewUrl('home')
        set({ view: 'home', selectedVendorSlug: null, mobileNavOpen: false })
      },

      filters: DEFAULT_FILTERS,
      setFilters: (newFilters) =>
        set((state) => ({ filters: { ...state.filters, ...newFilters } })),
      resetFilters: () => set({ filters: DEFAULT_FILTERS }),

      compareList: [],
      addToCompare: (slug) =>
        set((state) => {
          if (state.compareList.includes(slug)) return state
          if (state.compareList.length >= 3) return state // max 3
          return { compareList: [...state.compareList, slug] }
        }),
      removeFromCompare: (slug) =>
        set((state) => ({
          compareList: state.compareList.filter((s) => s !== slug),
        })),
      clearCompare: () => set({ compareList: [] }),

      favorites: [],
      toggleFavorite: (slug) =>
        set((state) => ({
          favorites: state.favorites.includes(slug)
            ? state.favorites.filter((s) => s !== slug)
            : [...state.favorites, slug],
        })),
      isFavorite: (slug) => get().favorites.includes(slug),

      dashboardRole: 'customer',
      setDashboardRole: (role) => set({ dashboardRole: role }),

      mobileNavOpen: false,
      setMobileNavOpen: (open) => set({ mobileNavOpen: open }),

      filtersOpen: false,
      setFiltersOpen: (open) => set({ filtersOpen: open }),

      vendorCache: {},
      cacheVendor: (vendor) =>
        set((state) => ({
          vendorCache: { ...state.vendorCache, [vendor.slug]: vendor },
        })),

      // ===== Wedding Planning Tools =====
      weddingPlan: {
        weddingDate: null,
        partner1Name: '',
        partner2Name: '',
        city: '',
        totalBudget: 0,
      },
      setWeddingPlan: (plan) =>
        set((state) => ({ weddingPlan: { ...state.weddingPlan, ...plan } })),

      checklist: [],
      addChecklistItem: (item) =>
        set((state) => ({
          checklist: [
            ...state.checklist,
            {
              ...item,
              id: `cl_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
              done: false,
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      toggleChecklistItem: (id) =>
        set((state) => ({
          checklist: state.checklist.map((c) =>
            c.id === id ? { ...c, done: !c.done } : c
          ),
        })),
      updateChecklistItem: (id, patch) =>
        set((state) => ({
          checklist: state.checklist.map((c) =>
            c.id === id ? { ...c, ...patch } : c
          ),
        })),
      removeChecklistItem: (id) =>
        set((state) => ({
          checklist: state.checklist.filter((c) => c.id !== id),
        })),
      resetChecklist: (items) => set({ checklist: items }),

      budget: [],
      addBudgetItem: (item) =>
        set((state) => ({
          budget: [
            ...state.budget,
            {
              ...item,
              id: `bg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      updateBudgetItem: (id, patch) =>
        set((state) => ({
          budget: state.budget.map((b) =>
            b.id === id ? { ...b, ...patch } : b
          ),
        })),
      removeBudgetItem: (id) =>
        set((state) => ({
          budget: state.budget.filter((b) => b.id !== id),
        })),

      guests: [],
      addGuest: (guest) =>
        set((state) => ({
          guests: [
            ...state.guests,
            {
              ...guest,
              id: `gu_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      updateGuest: (id, patch) =>
        set((state) => ({
          guests: state.guests.map((g) =>
            g.id === id ? { ...g, ...patch } : g
          ),
        })),
      removeGuest: (id) =>
        set((state) => ({
          guests: state.guests.filter((g) => g.id !== id),
        })),

      recommendInputs: {
        budget: 500000,
        eventType: 'Baraat',
        city: 'Lahore',
        categories: ['photographers', 'decorators', 'caterers'],
        style: 'traditional',
      },
      setRecommendInputs: (inputs) =>
        set((state) => ({
          recommendInputs: { ...state.recommendInputs, ...inputs },
        })),

      // Auth
      user: null,
      isAuthenticated: false,
      loginUser: (user) => set({ user, isAuthenticated: true }),
      logoutUser: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'shaadiset-store',
      partialize: (state) => ({
        compareList: state.compareList,
        favorites: state.favorites,
        dashboardRole: state.dashboardRole,
        filters: state.filters,
        weddingPlan: state.weddingPlan,
        checklist: state.checklist,
        budget: state.budget,
        guests: state.guests,
        recommendInputs: state.recommendInputs,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
