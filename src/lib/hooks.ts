'use client'

import { useEffect, useState } from 'react'
import type { Vendor, VendorDetail, Category, City, Stats } from '@/lib/types'
import type { Filters } from '@/lib/types'

export function useVendors(filters: Partial<Filters> = {}) {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    Promise.resolve().then(() => setLoading(true))
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '' && value !== 'all' && value !== false) {
        params.set(key, String(value))
      }
    })
    fetch(`/api/vendors?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return
        setVendors(data.vendors || [])
        setError(null)
      })
      .catch(() => {
        if (cancelled) return
        setError('Failed to load vendors')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [JSON.stringify(filters)])

  return { vendors, loading, error }
}

export function useVendorDetail(slug: string | null) {
  const [data, setData] = useState<VendorDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) {
      Promise.resolve().then(() => setData(null))
      return
    }
    let cancelled = false
    Promise.resolve().then(() => setLoading(true))
    fetch(`/api/vendors/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return
        if (data.error) {
          setError(data.error)
        } else {
          setData(data)
        }
      })
      .catch(() => {
        if (cancelled) return
        setError('Failed to load vendor')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [slug])

  return { data, loading, error }
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then((data) => setCategories(data.categories || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return { categories, loading }
}

export function useCities() {
  const [cities, setCities] = useState<City[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/cities')
      .then((r) => r.json())
      .then((data) => setCities(data.cities || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return { cities, loading }
}

export function useStats() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/stats')
      .then((r) => r.json())
      .then((data) => setStats(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return { stats, loading }
}
