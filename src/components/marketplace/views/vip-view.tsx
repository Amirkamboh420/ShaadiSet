'use client'

import { useState } from 'react'
import {
  Crown,
  Check,
  Sparkles,
  ShieldCheck,
  BadgeCheck,
  Lock,
  Heart,
  Users,
  Clock,
  AlertCircle,
  Zap,
  Star,
  ArrowRight,
  TrendingUp,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import {
  SectionTitle,
  MandalaBg,
  DecorativeHeart,
  FloralPattern,
  GoldText,
} from '@/components/marketplace/wedding-decor'

interface Problem {
  icon: typeof AlertCircle
  title: string
  description: string
  emoji: string
}

const PROBLEMS: Problem[] = [
  {
    icon: Users,
    title: 'Rishta Aunty Ka Purana Tareeqa',
    description:
      'Limited options, biased recommendations aur purane tareeqay. Aapko choice hi nahi milti.',
    emoji: 'traditional',
  },
  {
    icon: AlertCircle,
    title: 'Pata Nahi Fees Kitni Hain',
    description:
      'Hidden charges, unclear packages. Budget kahan se nikal aata hai pata hi nahi chalta.',
    emoji: 'fees',
  },
  {
    icon: Lock,
    title: 'Apps Pe Privacy Nahi',
    description:
      'Personal details public ho jaati hain. Spam calls aur messages ki bhaar jaati hai life.',
    emoji: 'privacy',
  },
  {
    icon: Clock,
    title: 'Waqt Zaaya Hota Hai',
    description:
      'Ghantay lag jaate hain har vendor ko call kar ke poochne mein. Dhoondhna mushkil hai.',
    emoji: 'time',
  },
  {
    icon: Heart,
    title: 'Ghar Walon Ka Pressure Hai',
    description:
      'Family expectations, social pressure aur decision nahi le paana. Stress level barhta jaata hai.',
    emoji: 'pressure',
  },
]

interface PricingPlan {
  name: string
  price: number
  tagline: string
  popular: boolean
  accent: string
  features: string[]
  cta: string
}

const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Basic',
    price: 0,
    tagline: 'Shaadi planning ki shuruaat ke liye perfect',
    popular: false,
    accent: 'border-[#E5E7EB]',
    features: [
      'Browse all vendors unlimited',
      '10 inquiries per month',
      'Basic search & filters',
      'Community support',
      'Save favorites list',
      'Mobile app access',
    ],
    cta: 'Start Free',
  },
  {
    name: 'Pro',
    price: 2500,
    tagline: 'Active planning karne walon ke liye best value',
    popular: true,
    accent: '',
    features: [
      'Everything in Basic',
      '50 inquiries per month',
      'Advanced filters & AI suggestions',
      'Priority customer support',
      'Verified badge on profile',
      'Compare up to 3 vendors',
      'Email + WhatsApp support',
    ],
    cta: 'Choose Pro',
  },
  {
    name: 'Premium',
    price: 5000,
    tagline: 'Luxe shaadi ke liye dedicated matchmaker',
    popular: false,
    accent: 'border-[#E5E7EB]',
    features: [
      'Everything in Pro',
      'Unlimited inquiries',
      'AI-powered vendor matching',
      'Dedicated personal matchmaker',
      'Featured listing on top',
      'Analytics dashboard',
      'Concierge booking assistance',
      'Exclusive vendor discounts',
    ],
    cta: 'Go Premium',
  },
]

const TRUST_INDICATORS = [
  {
    icon: ShieldCheck,
    title: 'Secure Payments',
    description: 'Bank-grade encryption, 100% safe transactions',
    color: 'from-[#07C19E] to-[#075E54]',
  },
  {
    icon: BadgeCheck,
    title: 'Verified Vendors',
    description: 'Har vendor ka background check kiya gaya hai',
    color: 'from-[#C61162] to-[#9A0E4C]',
  },
  {
    icon: Star,
    title: 'Trusted by 5,000+ Couples',
    description: 'Pakistan ka sabse bara wedding marketplace',
    color: 'from-[#EAA552] to-[#C61162]',
  },
]

export function VipView() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')

  const handleSubscribe = (plan: PricingPlan) => {
    if (plan.price === 0) {
      toast.success('Aap Basic plan mein hain! Browse vendors shuru karein.')
    } else {
      toast.success(`${plan.name} plan selected! Hamari team aapko contact karegi.`)
    }
  }

  const formatPrice = (plan: PricingPlan) => {
    if (plan.price === 0) return 'Rs 0'
    if (billing === 'yearly') {
      const yearly = plan.price * 10 // 2 months free
      return `Rs ${yearly.toLocaleString()}`
    }
    return `Rs ${plan.price.toLocaleString()}`
  }

  const period = billing === 'monthly' ? '/mo' : '/yr'

  return (
    <div className="dkr-bg-secondary min-h-screen">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #FAE6EF 0%, #FFFFFF 35%, #F6F9FC 100%)',
          }}
        />
        <MandalaBg className="text-[#C61162] -left-32 -top-20 h-[500px] w-[500px]" opacity={0.08} />
        <MandalaBg className="text-[#EAA552] -right-32 bottom-0 h-[400px] w-[400px]" opacity={0.06} />
        <FloralPattern className="text-[#C61162]" opacity={0.04} />
        <DecorativeHeart className="dkr-float absolute left-16 top-40 h-5 w-5 text-[#C61162]/30" />
        <DecorativeHeart className="dkr-heart-pulse absolute right-24 top-32 h-4 w-4 text-[#EAA552]/40" />

        <div className="container relative mx-auto px-4 py-20 md:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4 bg-gradient-to-r from-[#C61162] to-[#9A0E4C] text-white hover:opacity-90">
              <Crown className="mr-1.5 h-3.5 w-3.5" /> ShaadiSet VIP
            </Badge>
            <h1 className="font-serif text-4xl font-bold leading-tight text-[#222B45] md:text-6xl dkr-fade-up">
              A Premium Experience,{' '}
              <span className="dkr-text-gradient">Tailored Just for You</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-[#8F9BB3] md:text-lg dkr-fade-up">
              Apni shaadi ko royal banaein. Dedicated matchmaker, AI-powered
              suggestions aur exclusive benefits — sab kuch ek hi subscription mein.
            </p>

            {/* Billing toggle */}
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#FAE6EF] bg-white p-1 shadow-sm dkr-fade-up">
              <button
                onClick={() => setBilling('monthly')}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  billing === 'monthly'
                    ? 'dkr-btn-primary text-white'
                    : 'text-[#8F9BB3] hover:text-[#222B45]'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling('yearly')}
                className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  billing === 'yearly'
                    ? 'dkr-btn-primary text-white'
                    : 'text-[#8F9BB3] hover:text-[#222B45]'
                }`}
              >
                Yearly
                <Badge className="bg-[#EAA552] text-[#222B45] hover:bg-[#EAA552]">
                  2 Months Free
                </Badge>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROBLEMS SECTION ===== */}
      <section className="dkr-section bg-white">
        <div className="container mx-auto">
          <SectionTitle icon={<AlertCircle className="h-4 w-4 text-[#C61162]" />}>
            Kya yeh problems aapki bhi hain?
          </SectionTitle>
          <p className="mx-auto -mt-4 mb-12 max-w-2xl text-center text-base text-[#8F9BB3]">
            Shaadi ki planning sab se mushkil kaam nahi honi chahiye. Lekin
            purana tareeqa har kisi ko pareshan karta hai.
          </p>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROBLEMS.map((problem, idx) => {
              const Icon = problem.icon
              return (
                <Card
                  key={problem.title}
                  className="group border-[#FAE6EF] bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg dkr-fade-up"
                  style={{ animationDelay: `${idx * 0.08}s` }}
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#FAE6EF] text-[#C61162] transition-transform group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#222B45]">
                    {problem.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#8F9BB3]">
                    {problem.description}
                  </p>
                </Card>
              )
            })}

            {/* CTA problem-solution bridge card */}
            <Card className="dkr-gradient-border relative flex flex-col justify-center p-6 text-center">
              <div className="dkr-heart-pulse mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#C61162] to-[#9A0E4C] text-white">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#222B45]">
                Tension Khatam!
              </h3>
              <p className="mt-2 text-sm text-[#8F9BB3]">
                ShaadiSet VIP in sab problems ka hal hai.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ===== SOLUTION SECTION ===== */}
      <section className="dkr-section">
        <div className="container mx-auto">
          <SectionTitle icon={<Crown className="h-4 w-4 text-[#C61162]" />}>
            Ab Hogi Apki Shaadi ShaadiSet VIP ke saath
          </SectionTitle>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Zap, title: 'AI Vendor Matching', desc: 'Hamari AI aapki requirements samajh kar best vendors suggest karti hai.' },
              { icon: Users, title: 'Dedicated Matchmaker', desc: 'Personal matchmaker aapki shaadi ko personally handle karega.' },
              { icon: BadgeCheck, title: 'Verified Badge', desc: 'Aapki profile pe verified badge, vendors ko trust barhega.' },
              { icon: TrendingUp, title: 'Analytics Dashboard', desc: 'Sab kuch track karein — inquiries, responses, bookings.' },
            ].map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="dkr-card p-6 text-center dkr-fade-up"
                  style={{ animationDelay: `${idx * 0.08}s` }}
                >
                  <div className="dkr-feature-icon mx-auto mb-4">
                    <Icon className="h-7 w-7 text-[#C61162]" />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-[#222B45]">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#8F9BB3]">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section className="dkr-section bg-white">
        <div className="container mx-auto">
          <SectionTitle icon={<Star className="h-4 w-4 text-[#EAA552]" />}>
            Choose Your Plan
          </SectionTitle>
          <p className="mx-auto -mt-4 mb-12 max-w-2xl text-center text-base text-[#8F9BB3]">
            Aapki zaroorat ke mutabiq plan choose karein. Kabhi bhi upgrade ya
            cancel kar sakte hain.
          </p>

          <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
            {PRICING_PLANS.map((plan, idx) => (
              <div
                key={plan.name}
                className={`relative ${plan.popular ? 'lg:-mt-4 lg:mb-4' : ''} dkr-fade-up`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {plan.popular && (
                  <>
                    <div className="dkr-gradient-border h-full rounded-2xl">
                      <Card className="h-full border-0 bg-white p-8 shadow-xl">
                        {renderPlan(plan)}
                      </Card>
                    </div>
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                      <Badge className="bg-gradient-to-r from-[#C61162] to-[#EAA552] px-4 py-1.5 text-xs font-bold text-white shadow-md hover:opacity-90">
                        <Crown className="mr-1 h-3 w-3" /> MOST POPULAR
                      </Badge>
                    </div>
                  </>
                )}
                {!plan.popular && (
                  <Card className={`h-full border ${plan.accent} bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md`}>
                    {renderPlan(plan)}
                  </Card>
                )}
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-[#8F9BB3]">
            Sab plans mein 7-day money back guarantee. No questions asked.
          </p>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="dkr-section relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #C61162 0%, #9A0E4C 50%, #C61162 100%)',
          }}
        />
        <MandalaBg className="text-white -right-20 -top-20 h-[400px] w-[400px]" opacity={0.1} />
        <FloralPattern className="text-white" opacity={0.05} />
        <DecorativeHeart className="dkr-float absolute left-10 top-20 h-6 w-6 text-white/30" />
        <DecorativeHeart className="dkr-heart-pulse absolute right-12 bottom-12 h-4 w-4 text-white/30" />

        <div className="container relative mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <Crown className="dkr-float mx-auto mb-4 h-12 w-12 text-[#EAA552]" />
            <h2 className="font-serif text-3xl font-bold text-white md:text-5xl dkr-fade-up">
              Begin Your Journey Today
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/90 md:text-lg dkr-fade-up">
              Aapki dream shaadi sirf ek click door. VIP plan join karein aur
              personal matchmaker ka mil kar baat shuru karein.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 dkr-fade-up">
              <Button
                onClick={() => toast.success('Welcome to VIP! Hamari team aapko contact karegi.')}
                className="btn-gold h-14 px-10 text-base text-[#222B45]"
              >
                <Crown className="mr-2 h-5 w-5" /> Become a VIP Member
              </Button>
              <Button
                variant="outline"
                className="h-14 border-white/40 bg-white/10 px-10 text-base text-white backdrop-blur hover:bg-white/20 hover:text-white"
                onClick={() => toast.info('Demo dekhne ke liye contact karein: hello@shaadiset.pk')}
              >
                Request Demo <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Trust badges inline */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-white/80">
              {TRUST_INDICATORS.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="flex items-center gap-2 text-sm">
                    <Icon className="h-5 w-5 text-[#EAA552]" />
                    <span>{item.title}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST INDICATORS ===== */}
      <section className="dkr-section bg-white">
        <div className="container mx-auto">
          <SectionTitle icon={<ShieldCheck className="h-4 w-4 text-[#07C19E]" />}>
            Aap Hum Pe Bhar Kar Shaadi Plan Karein
          </SectionTitle>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TRUST_INDICATORS.map((item, idx) => {
              const Icon = item.icon
              return (
                <Card
                  key={item.title}
                  className="border-[#FAE6EF] bg-white p-6 text-center transition-all hover:-translate-y-1 hover:shadow-md dkr-fade-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div
                    className={`mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#222B45]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#8F9BB3]">{item.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )

  function renderPlan(plan: PricingPlan) {
    return (
      <div className="flex h-full flex-col">
        <div className="mb-2 text-center">
          <h3 className="font-serif text-2xl font-bold text-[#222B45]">
            {plan.name === 'Premium' ? (
              <GoldText>{plan.name}</GoldText>
            ) : plan.name === 'Pro' ? (
              <span className="dkr-text-gradient">{plan.name}</span>
            ) : (
              plan.name
            )}
          </h3>
          <p className="mt-1 text-xs text-[#8F9BB3]">{plan.tagline}</p>
        </div>

        <div className="my-6 text-center">
          <div className="flex items-baseline justify-center gap-1">
            <span className="font-serif text-4xl font-bold text-[#222B45]">
              {formatPrice(plan)}
            </span>
            <span className="text-sm text-[#8F9BB3]">{period}</span>
          </div>
          {plan.price > 0 && billing === 'yearly' && (
            <p className="mt-1 text-xs font-medium text-[#07C19E]">
              2 months free! Save Rs {(plan.price * 2).toLocaleString()}
            </p>
          )}
        </div>

        <Button
          onClick={() => handleSubscribe(plan)}
          className={
            plan.popular
              ? 'dkr-btn-primary h-12 w-full text-sm'
              : 'h-12 w-full border border-[#C61162] bg-white text-sm text-[#C61162] hover:bg-[#FAE6EF]'
          }
          variant={plan.popular ? 'default' : 'outline'}
        >
          {plan.cta} <ArrowRight className="ml-1.5 h-4 w-4" />
        </Button>

        <div className="mt-6 space-y-3">
          {plan.features.map((feature, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#FAE6EF]">
                <Check className="h-3 w-3 text-[#C61162]" />
              </div>
              <span className="text-sm text-[#222B45]">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
