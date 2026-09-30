'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Header } from '@/components/marketplace/header'
import { Footer } from '@/components/marketplace/footer'
import { HomeView } from '@/components/marketplace/views/home-view'
import { useMarketplace } from '@/lib/store'

// Lazy-load all views except Home — only compiles the active view on demand
// Lazy-load views to reduce initial bundle
const BrowseView = dynamic(() => import('@/components/marketplace/views/browse-view').then(m => m.BrowseView), { loading: () => <ViewLoader /> })
const VendorProfileView = dynamic(() => import('@/components/marketplace/views/vendor-profile-view').then(m => m.VendorProfileView), { loading: () => <ViewLoader /> })
const CompareView = dynamic(() => import('@/components/marketplace/views/compare-view').then(m => m.CompareView), { loading: () => <ViewLoader /> })
const DashboardView = dynamic(() => import('@/components/marketplace/views/dashboard-view').then(m => m.DashboardView), { loading: () => <ViewLoader /> })
const VendorSignupView = dynamic(() => import('@/components/marketplace/views/vendor-signup-view').then(m => m.VendorSignupView), { loading: () => <ViewLoader /> })
const PlanView = dynamic(() => import('@/components/marketplace/views/plan-view').then(m => m.PlanView), { loading: () => <ViewLoader /> })
const RecommendView = dynamic(() => import('@/components/marketplace/views/recommend-view').then(m => m.RecommendView), { loading: () => <ViewLoader /> })
const BundlesView = dynamic(() => import('@/components/marketplace/views/bundles-view').then(m => m.BundlesView), { loading: () => <ViewLoader /> })
const BlogView = dynamic(() => import('@/components/marketplace/views/blog-view').then(m => m.BlogView), { loading: () => <ViewLoader /> })
const CityView = dynamic(() => import('@/components/marketplace/views/city-view').then(m => m.CityView), { loading: () => <ViewLoader /> })
const ContactView = dynamic(() => import('@/components/marketplace/views/contact-view').then(m => m.ContactView), { loading: () => <ViewLoader /> })
const VipView = dynamic(() => import('@/components/marketplace/views/vip-view').then(m => m.VipView), { loading: () => <ViewLoader /> })

function ViewLoader() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  )
}

export default function Home() {
  const { view } = useMarketplace()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [view])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {view === 'home' && <HomeView />}
        {view === 'browse' && <BrowseView />}
        {view === 'vendor' && <VendorProfileView />}
        {view === 'compare' && <CompareView />}
        {view === 'dashboard' && <DashboardView />}
        {view === 'vendor-signup' && <VendorSignupView />}
        {view === 'plan' && <PlanView />}
        {view === 'recommend' && <RecommendView />}
        {view === 'bundles' && <BundlesView />}
        {view === 'blog' && <BlogView />}
        {view === 'city' && <CityView />}
        {view === 'contact' && <ContactView />}
        {view === 'vip' && <VipView />}
      </main>
      <Footer />
    </div>
  )
}
