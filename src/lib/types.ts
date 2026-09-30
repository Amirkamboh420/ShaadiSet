// Shared types for wedding marketplace

export type CategorySlug =
  | 'photographers'
  | 'decorators'
  | 'caterers'
  | 'makeup'
  | 'venues'
  | 'dj'
  | 'mehndi'
  | 'invitations'

export interface Vendor {
  id: string
  businessName: string
  slug: string
  category: string
  city: string
  area: string | null
  description: string
  shortDescription: string
  coverImage: string
  logoImage: string | null
  gallery: string[]
  startingPrice: number
  priceMax: number
  rating: number
  reviewCount: number
  bookingCount: number
  responseTime: string | null
  yearsActive: number
  verified: boolean
  featured: boolean
  premium: boolean
  tags: string[]
  services: string[]
  teamSize: string | null
  phone: string | null
  whatsapp: string | null
  email: string | null
  instagram: string | null
  tiktok: string | null
  address: string | null
  availability: string[] | null
  createdAt: string
  updatedAt: string
}

export interface Package {
  id: string
  vendorId: string
  name: string
  description: string
  price: number
  duration: string | null
  features: string[]
  popular: boolean
  createdAt: string
}

export interface Review {
  id: string
  vendorId: string
  customerName: string
  rating: number
  title: string | null
  comment: string
  eventDate: string | null
  eventType: string | null
  createdAt: string
}

export interface VendorDetail {
  vendor: Vendor
  packages: Package[]
  reviews: Review[]
  similar: Vendor[]
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string | null
  description: string | null
  imageUrl: string | null
  vendorCount: number
}

export interface City {
  id: string
  name: string
  slug: string
  vendorCount: number
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  author: string
  imageUrl: string | null
  published: boolean
  createdAt: string
  updatedAt: string
}

export interface Stats {
  totalVendors: number
  totalInquiries: number
  totalReviews: number
  verifiedVendors: number
  featuredVendors: number
  avgRating: string
  estimatedGmv: number
  vendorsByCategory: { category: string; count: number }[]
  vendorsByCity: { city: string; count: number }[]
  topVendors: {
    businessName: string
    slug: string
    category: string
    city: string
    bookingCount: number
    rating: number
  }[]
  recentInquiries: {
    id: string
    customerName: string
    eventType: string | null
    eventDate: string
    status: string
    vendorName: string
    createdAt: string
  }[]
}

export type View =
  | 'home'
  | 'browse'
  | 'vendor'
  | 'compare'
  | 'dashboard'
  | 'blog'
  | 'about'
  | 'contact'
  | 'vip'
  | 'vendor-signup'
  | 'plan'
  | 'recommend'
  | 'bundles'
  | 'city'

// ===== Wedding Planning Tools types =====

export interface ChecklistItem {
  id: string
  text: string
  category: string  // e.g. "Venue", "Photography", "Attire"
  done: boolean
  dueOffsetDays: number // days before wedding (negative = after)
  createdAt: string
}

export interface BudgetItem {
  id: string
  category: string
  label: string
  estimated: number
  actual: number
  paid: boolean
  vendorSlug?: string
  createdAt: string
}

export interface Guest {
  id: string
  name: string
  side: 'bride' | 'groom' | 'common'
  group: string // e.g. "Family", "Friends", "Colleagues"
  rsvp: 'pending' | 'yes' | 'no'
  plusOne: boolean
  contact?: string
  createdAt: string
}

export interface WeddingPlan {
  weddingDate: string | null
  partner1Name: string
  partner2Name: string
  city: string
  totalBudget: number
}

export interface Filters {
  category: string
  city: string
  search: string
  sort: string
  minPrice: string
  maxPrice: string
  minRating: string
  verifiedOnly: boolean
}
