'use client'

import type { ReactNode } from 'react'

// ===== Ornamental Section Divider =====
export function OrnamentalDivider({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className || ''}`}>
      <svg width="80" height="20" viewBox="0 0 80 20" fill="none" className="text-primary/40">
        <path d="M0 10 Q20 0 40 10 Q60 20 80 10" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="40" cy="10" r="2" fill="currentColor" />
      </svg>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
        <path d="M12 2 L14 8 L20 8 L15 12 L17 18 L12 14 L7 18 L9 12 L4 8 L10 8 Z" fill="currentColor" opacity="0.8" />
      </svg>
      <svg width="80" height="20" viewBox="0 0 80 20" fill="none" className="text-primary/40">
        <path d="M80 10 Q60 0 40 10 Q20 20 0 10" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  )
}

// ===== Floral Background Pattern =====
export function FloralPattern({ className, opacity = 0.05 }: { className?: string; opacity?: number }) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className || ''}`}
      style={{ opacity }}
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="floral-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="0.8">
            {/* Lotus/flower motif */}
            <path d="M30 15 Q35 25 30 30 Q25 25 30 15" fill="currentColor" opacity="0.3" />
            <path d="M15 30 Q25 35 30 30 Q25 25 15 30" fill="currentColor" opacity="0.3" />
            <path d="M30 45 Q35 35 30 30 Q25 35 30 45" fill="currentColor" opacity="0.3" />
            <path d="M45 30 Q35 25 30 30 Q35 35 45 30" fill="currentColor" opacity="0.3" />
            <circle cx="30" cy="30" r="2" fill="currentColor" opacity="0.5" />
            {/* Connecting curves */}
            <path d="M0 0 Q15 15 0 30" opacity="0.4" />
            <path d="M60 0 Q45 15 60 30" opacity="0.4" />
            <path d="M0 60 Q15 45 30 60" opacity="0.4" />
            <path d="M60 60 Q45 45 30 60" opacity="0.4" />
          </g>
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#floral-pattern)" />
    </svg>
  )
}

// ===== Islamic Geometric Pattern =====
export function IslamicPattern({ className, opacity = 0.04 }: { className?: string; opacity?: number }) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className || ''}`}
      style={{ opacity }}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="islamic-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="0.6">
            <path d="M20 0 L40 20 L20 40 L0 20 Z" />
            <path d="M20 10 L30 20 L20 30 L10 20 Z" />
            <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.3" />
            <path d="M0 0 L10 10 M40 0 L30 10 M0 40 L10 30 M40 40 L30 30" opacity="0.5" />
          </g>
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#islamic-pattern)" />
    </svg>
  )
}

// ===== Decorative Corner Frame =====
export function CornerFrame({ position = 'tl' }: { position?: 'tl' | 'tr' | 'bl' | 'br' }) {
  const rotations: Record<string, string> = {
    tl: '0',
    tr: '90',
    bl: '-90',
    br: '180',
  }
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      className={`absolute text-primary/30 pointer-events-none`}
      style={{
        transform: `rotate(${rotations[position]}deg)`,
        [position.includes('t') ? 'top' : 'bottom']: '0',
        [position.includes('l') ? 'left' : 'right']: '0',
      }}
    >
      <path d="M0 0 L60 0 L60 2 L2 2 L2 60 L0 60 Z" fill="currentColor" opacity="0.5" />
      <path d="M8 8 Q20 8 20 20 Q20 32 8 32" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M8 8 L8 20" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
      <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  )
}

// ===== Wedding Rings Icon =====
export function WeddingRings({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
    >
      <circle cx="18" cy="24" r="12" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <circle cx="30" cy="24" r="12" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <path d="M18 12 L18 8 M30 12 L30 8 M18 8 L30 8" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="24" cy="8" r="2" fill="currentColor" />
    </svg>
  )
}

// ===== Decorative Heart =====
export function DecorativeHeart({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 21 C12 21 4 14 4 8.5 C4 5.5 6.5 3 9.5 3 C11 3 12 4 12 5 C12 4 13 3 14.5 3 C17.5 3 20 5.5 20 8.5 C20 14 12 21 12 21 Z"
        fill="currentColor"
        opacity="0.8"
      />
    </svg>
  )
}

// ===== Mandala Background =====
export function MandalaBg({ className, opacity = 0.06 }: { className?: string; opacity?: number }) {
  return (
    <svg
      className={`absolute pointer-events-none ${className || ''}`}
      style={{ opacity }}
      width="400"
      height="400"
      viewBox="0 0 400 400"
      fill="none"
    >
      <g stroke="currentColor" strokeWidth="0.8" fill="none">
        {/* Outer circles */}
        <circle cx="200" cy="200" r="180" opacity="0.3" />
        <circle cx="200" cy="200" r="150" opacity="0.3" />
        <circle cx="200" cy="200" r="120" opacity="0.4" />
        <circle cx="200" cy="200" r="90" opacity="0.4" />
        <circle cx="200" cy="200" r="60" opacity="0.5" />
        <circle cx="200" cy="200" r="30" opacity="0.6" />
        {/* Petal pattern */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 22.5 * Math.PI) / 180
          const x1 = 200 + Math.cos(angle) * 30
          const y1 = 200 + Math.sin(angle) * 30
          const x2 = 200 + Math.cos(angle) * 90
          const y2 = 200 + Math.sin(angle) * 90
          return <path key={i} d={`M${x1} ${y1} Q${200 + Math.cos(angle) * 60} ${200 + Math.sin(angle) * 60} ${x2} ${y2}`} opacity="0.3" />
        })}
        {/* Inner flower */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180
          const x = 200 + Math.cos(angle) * 20
          const y = 200 + Math.sin(angle) * 20
          return <circle key={i} cx={x} cy={y} r="12" opacity="0.3" />
        })}
        <circle cx="200" cy="200" r="8" fill="currentColor" opacity="0.5" />
      </g>
    </svg>
  )
}

// ===== Gold Foil Text Effect =====
export function GoldText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={className}
      style={{
        background: 'linear-gradient(135deg, #C9A96E 0%, #F4D47C 25%, #C9A96E 50%, #E8C547 75%, #C9A96E 100%)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundSize: '200% auto',
      }}
    >
      {children}
    </span>
  )
}

// ===== Decorative Section Title =====
export function SectionTitle({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <div className="mb-8 text-center">
      <div className="flex items-center justify-center gap-3 mb-3">
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary/40" />
        {icon || <DecorativeHeart className="h-4 w-4 text-primary" />}
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-primary/40" />
      </div>
      <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
        {children}
      </h2>
    </div>
  )
}
