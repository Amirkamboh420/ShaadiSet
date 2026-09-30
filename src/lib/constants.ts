import type { CategorySlug } from './types'

export interface CategoryConfig {
  slug: CategorySlug | string
  name: string
  shortName: string
  icon: string  // lucide icon name
  emoji: string
  color: string  // tailwind gradient
  description: string
}

export const CATEGORIES: CategoryConfig[] = [
  {
    slug: 'photographers',
    name: 'Photographers & Videographers',
    shortName: 'Photographers',
    icon: 'Camera',
    emoji: '📸',
    color: 'from-rose-500/20 to-amber-500/20',
    description: 'Cinematic films & candid photography',
  },
  {
    slug: 'decorators',
    name: 'Decorators',
    shortName: 'Decorators',
    icon: 'Flower2',
    emoji: '🌺',
    color: 'from-pink-500/20 to-orange-500/20',
    description: 'Stage, florals, lighting & venue setup',
  },
  {
    slug: 'caterers',
    name: 'Caterers',
    shortName: 'Caterers',
    icon: 'UtensilsCrossed',
    emoji: '🍽️',
    color: 'from-amber-500/20 to-red-500/20',
    description: 'Biryani, BBQ & live food counters',
  },
  {
    slug: 'makeup',
    name: 'Bridal Makeup Artists',
    shortName: 'Makeup',
    icon: 'Sparkles',
    emoji: '💄',
    color: 'from-fuchsia-500/20 to-rose-500/20',
    description: 'Bridal glam, trials & party makeup',
  },
  {
    slug: 'venues',
    name: 'Venues & Banquet Halls',
    shortName: 'Venues',
    icon: 'Building2',
    emoji: '🏛️',
    color: 'from-orange-500/20 to-yellow-500/20',
    description: 'Banquet halls, lawns & marquees',
  },
  {
    slug: 'dj',
    name: 'DJ & Sound',
    shortName: 'DJ & Sound',
    icon: 'Music',
    emoji: '🎧',
    color: 'from-purple-500/20 to-pink-500/20',
    description: 'Dholki, baraat DJ & lighting',
  },
  {
    slug: 'mehndi',
    name: 'Mehndi Artists',
    shortName: 'Mehndi',
    icon: 'Brush',
    emoji: '🌿',
    color: 'from-green-500/20 to-amber-500/20',
    description: 'Bridal & party henna, Arabic & Mughal',
  },
  {
    slug: 'invitations',
    name: 'Invitation Cards',
    shortName: 'Invitations',
    icon: 'Mail',
    emoji: '💌',
    color: 'from-red-500/20 to-rose-500/20',
    description: 'Luxury cards & digital invites',
  },
]

export const CITIES = ['Lahore', 'Karachi', 'Islamabad', 'Faisalabad', 'Multan', 'Rawalpindi', 'Peshawar']

export function getCategoryConfig(slug: string): CategoryConfig | undefined {
  return CATEGORIES.find((c) => c.slug === slug)
}

export function formatPKR(amount: number): string {
  if (amount >= 10000000) return `PKR ${(amount / 10000000).toFixed(1)} Cr`
  if (amount >= 100000) return `PKR ${(amount / 100000).toFixed(1)} Lac`
  if (amount >= 1000) return `PKR ${(amount / 1000).toFixed(0)}K`
  return `PKR ${amount.toLocaleString()}`
}

export function formatPKRShort(amount: number): string {
  if (amount >= 10000000) return `Rs ${(amount / 10000000).toFixed(1)}Cr`
  if (amount >= 100000) return `Rs ${(amount / 100000).toFixed(1)}L`
  if (amount >= 1000) return `Rs ${(amount / 1000).toFixed(0)}K`
  return `Rs ${amount.toLocaleString()}`
}

export const EVENT_TYPES = [
  'Mehndi / Dholki',
  'Baraat',
  'Nikah',
  'Rukhsati',
  'Valima',
  'Engagement / Mangni',
  'Birthday',
  'Corporate Event',
]

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured first' },
  { value: 'rating', label: 'Top rated' },
  { value: 'reviews', label: 'Most reviewed' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
]

// ===== Wedding Planning Tools =====

export const CHECKLIST_TEMPLATE = [
  // 6-12 months before
  { text: 'Set overall wedding budget', category: 'Planning', dueOffsetDays: 240 },
  { text: 'Finalize wedding date', category: 'Planning', dueOffsetDays: 240 },
  { text: 'Book banquet hall / venue', category: 'Venue', dueOffsetDays: 210 },
  { text: 'Hire wedding photographer & videographer', category: 'Photography', dueOffsetDays: 210 },
  { text: 'Book caterer & finalize menu', category: 'Catering', dueOffsetDays: 180 },
  { text: 'Book decorator for stage & venue', category: 'Decor', dueOffsetDays: 180 },
  { text: 'Hire bridal makeup artist (trial session)', category: 'Beauty', dueOffsetDays: 150 },
  // 3-6 months before
  { text: 'Book DJ / sound system', category: 'Entertainment', dueOffsetDays: 120 },
  { text: 'Order wedding invitation cards', category: 'Invitations', dueOffsetDays: 120 },
  { text: 'Book mehndi artist for bride', category: 'Beauty', dueOffsetDays: 90 },
  { text: 'Finalize bridal dress & groom sherwani', category: 'Attire', dueOffsetDays: 90 },
  { text: 'Plan valima outfit & jewelry', category: 'Attire', dueOffsetDays: 90 },
  { text: 'Book transport for baraat', category: 'Logistics', dueOffsetDays: 75 },
  // 1-3 months before
  { text: 'Send out invitations', category: 'Invitations', dueOffsetDays: 60 },
  { text: 'Finalize guest list & seating', category: 'Guests', dueOffsetDays: 45 },
  { text: 'Confirm all vendor bookings in writing', category: 'Planning', dueOffsetDays: 45 },
  { text: 'Plan mehndi / dholki function', category: 'Events', dueOffsetDays: 30 },
  { text: 'Final dress fitting & alterations', category: 'Attire', dueOffsetDays: 30 },
  { text: 'Buy wedding rings', category: 'Shopping', dueOffsetDays: 30 },
  // 1-4 weeks before
  { text: 'Confirm final guest count to caterer', category: 'Catering', dueOffsetDays: 14 },
  { text: 'Bridal makeup trial & final look', category: 'Beauty', dueOffsetDays: 10 },
  { text: 'Pack for honeymoon', category: 'Personal', dueOffsetDays: 7 },
  { text: 'Reconfirm all vendors 2 days before', category: 'Planning', dueOffsetDays: 2 },
  { text: 'Get enough rest before the big day!', category: 'Personal', dueOffsetDays: 1 },
]

export const BUDGET_CATEGORIES = [
  'Venue',
  'Catering',
  'Photography',
  'Decor',
  'Bridal Makeup',
  'Attire & Jewelry',
  'DJ & Entertainment',
  'Invitations',
  'Mehndi',
  'Transport',
  'Gifts',
  'Miscellaneous',
]

// Suggested budget allocation percentages (Pakistani wedding context)
export const BUDGET_ALLOCATION: { category: string; percent: number; color: string }[] = [
  { category: 'Venue', percent: 20, color: '#6C092A' },
  { category: 'Catering', percent: 25, color: '#660F17' },
  { category: 'Photography', percent: 10, color: '#4D0712' },
  { category: 'Decor', percent: 12, color: '#B8860B' },
  { category: 'Bridal Makeup', percent: 5, color: '#C71585' },
  { category: 'Attire & Jewelry', percent: 15, color: '#8B4513' },
  { category: 'DJ & Entertainment', percent: 4, color: '#FF6347' },
  { category: 'Invitations', percent: 2, color: '#DAA520' },
  { category: 'Mehndi', percent: 1, color: '#228B22' },
  { category: 'Transport', percent: 2, color: '#4682B4' },
  { category: 'Gifts', percent: 2, color: '#D2691E' },
  { category: 'Miscellaneous', percent: 2, color: '#A0522D' },
]

export const GUEST_GROUPS = [
  'Immediate Family',
  'Extended Family',
  'Friends',
  'Colleagues',
  'Neighbors',
  'Distant Relatives',
]

export const WEDDING_STYLES = [
  { value: 'traditional', label: 'Traditional Desi', emoji: '🌺', desc: 'Marigolds, maroon & gold, classic rituals' },
  { value: 'modern', label: 'Modern Minimal', emoji: '✨', desc: 'Pastels, clean lines, contemporary' },
  { value: 'royal', label: 'Royal Mughal', emoji: '👑', desc: 'Opulent, gold, grand setups' },
  { value: 'boho', label: 'Boho Rustic', emoji: '🌿', desc: 'Earthy, greenery, intimate' },
  { value: 'glam', label: 'Bollywood Glam', emoji: '💃', desc: 'Sparkles, bold colors, dramatic' },
]

