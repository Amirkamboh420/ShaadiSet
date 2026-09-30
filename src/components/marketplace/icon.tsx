'use client'

import {
  Camera,
  Flower2,
  UtensilsCrossed,
  Sparkles,
  Building2,
  Music,
  Brush,
  Mail,
  Crown,
  Gem,
  PartyPopper,
  Heart,
  Wand2,
  Leaf,
  Sun,
  Moon,
  type LucideIcon,
} from 'lucide-react'

// Map icon name strings to actual lucide SVG components
const ICON_MAP: Record<string, LucideIcon> = {
  // Category icons
  Camera,
  Flower2,
  UtensilsCrossed,
  Sparkles,
  Building2,
  Music,
  Brush,
  Mail,
  // Wedding style icons
  Crown,
  Gem,
  PartyPopper,
  Heart,
  Wand2,
  Leaf,
  Sun,
  Moon,
}

interface IconProps {
  name: string
  className?: string
  size?: number
}

export function Icon({ name, className, size }: IconProps) {
  const LucideComp = ICON_MAP[name]
  if (!LucideComp) return null
  return <LucideComp className={className} size={size} />
}

// Helper to get icon name for a category or wedding style
export function getCategoryIcon(slug: string): string {
  const map: Record<string, string> = {
    photographers: 'Camera',
    decorators: 'Flower2',
    caterers: 'UtensilsCrossed',
    makeup: 'Sparkles',
    venues: 'Building2',
    dj: 'Music',
    mehndi: 'Brush',
    invitations: 'Mail',
  }
  return map[slug] || 'Sparkles'
}

export function getStyleIcon(value: string): string {
  const map: Record<string, string> = {
    traditional: 'Flower2',
    modern: 'Sparkles',
    royal: 'Crown',
    boho: 'Leaf',
    glam: 'Gem',
  }
  return map[value] || 'Sparkles'
}
