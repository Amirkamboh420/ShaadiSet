'use client'

import { useState, type FormEvent } from 'react'
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Send,
  Clock,
  ChevronDown,
  HelpCircle,
  Heart,
  Sparkles,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import {
  SectionTitle,
  MandalaBg,
  DecorativeHeart,
  FloralPattern,
} from '@/components/marketplace/wedding-decor'

interface ContactMethod {
  icon: typeof Mail
  title: string
  value: string
  href?: string
  accent: string
  description: string
}

const CONTACT_METHODS: ContactMethod[] = [
  {
    icon: Mail,
    title: 'Email Us',
    value: 'hello@shaadiset.pk',
    href: 'mailto:hello@shaadiset.pk',
    accent: 'from-[#C61162] to-[#9A0E4C]',
    description: 'Hamari team 24 hours mein reply karti hai',
  },
  {
    icon: Phone,
    title: 'Call Us',
    value: '+92 42 111-111-357',
    href: 'tel:+9242111111357',
    accent: 'from-[#9A0E4C] to-[#C61162]',
    description: 'Mon - Sat, 9 AM - 8 PM PKT',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    value: '+92 300 1234567',
    href: 'https://wa.me/923001234567',
    accent: 'from-[#07C19E] to-[#075E54]',
    description: 'Quick chat ke liye best option',
  },
  {
    icon: MapPin,
    title: 'Visit Office',
    value: 'Lahore, Pakistan',
    accent: 'from-[#EAA552] to-[#C61162]',
    description: 'Gulberg III, Main Boulevard',
  },
]

const SUBJECTS = [
  'General Inquiry',
  'Vendor Support',
  'Partnership / Listing',
  'Technical Issue',
  'Feedback / Suggestion',
  'Other',
]

const FAQS = [
  {
    q: 'ShaadiSet pe vendors ka list kaise len?',
    a: 'Bohat simple! "Browse Vendors" pe click karein, category aur city select karein, aur apni requirements ke mutabiq vendors dekhein. Har vendor ka profile, packages aur reviews mukammal hain.',
  },
  {
    q: 'Kya ShaadiSet ki koi fee hai?',
    a: 'Aam tor pe browsing aur vendor profiles dekhna bilkul free hai. Vendors se inquiry bhejna bhi free hai. Premium features (verified badge, AI matching, dedicated matchmaker) VIP plan mein available hain.',
  },
  {
    q: 'Vendor kaise register karein?',
    a: '"List Your Business" pe click karein, apni business details fill karein, packages upload karein aur submit karein. Hamari team 48 hours ke andar review karke live kar deti hai.',
  },
  {
    q: 'Inquiry ke baad kya process hai?',
    a: 'Inquiry bhejte hi vendor ko aapka contact mil jaata hai. Vendor khud aapko call/WhatsApp karega. Aap direct bhi contact kar sakte hain phone ya WhatsApp pe.',
  },
  {
    q: 'Kya ShaadiSet sirf Lahore mein hai?',
    a: 'Nahi! Hum Lahore, Karachi, Islamabad, Faisalabad, Multan, Rawalpindi aur Peshawar mein vendors ke saath active hain. Naye cities continuously add ho rahi hain.',
  },
]

export function ContactView() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: SUBJECTS[0],
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in name, email and message')
      return
    }
    setSubmitting(true)
    try {
      // Simulate API submission
      await new Promise((resolve) => setTimeout(resolve, 900))
      toast.success('Message bhej diya gaya hai! Hum 24 ghante mein reply karenge.')
      setForm({ name: '', email: '', phone: '', subject: SUBJECTS[0], message: '' })
    } catch {
      toast.error('Koi masla ho gaya. Dobara try karein ya email karein.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="dkr-bg-secondary min-h-screen">
      {/* ===== HERO ===== */}
      <section className="dkr-hero-gradient relative overflow-hidden">
        <MandalaBg className="text-[#C61162] -right-32 -top-32 h-[500px] w-[500px]" opacity={0.08} />
        <FloralPattern className="text-[#EAA552]" opacity={0.04} />
        <DecorativeHeart className="dkr-float absolute left-10 top-32 h-6 w-6 text-[#C61162]/30" />
        <DecorativeHeart className="dkr-heart-pulse absolute right-20 top-44 h-4 w-4 text-[#EAA552]/40" />

        <div className="container relative mx-auto px-4 py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 bg-[#FAE6EF] text-[#C61162] hover:bg-[#FAE6EF]/80">
              <Sparkles className="mr-1 h-3 w-3" /> ShaadiSet Care
            </Badge>
            <h1 className="font-serif text-4xl font-bold leading-tight text-[#222B45] md:text-6xl dkr-fade-up">
              Get in Touch with{' '}
              <span className="dkr-text-gradient">ShaadiSet</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-[#8F9BB3] md:text-lg dkr-fade-up">
              Aapki shaadi hamari zimmadari hai. Koi sawaal, feedback ya
              partnership inquiry ho — hum hamesha yahaan hain aapki madad ke
              liye.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 dkr-fade-up">
              <a href="mailto:hello@shaadiset.pk">
                <Button className="dkr-btn-primary h-12 px-8 text-sm">
                  <Mail className="mr-2 h-4 w-4" /> Email Now
                </Button>
              </a>
              <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="h-12 border-[#07C19E] px-8 text-sm text-[#075E54] hover:bg-[#07C19E]/10 hover:text-[#075E54]"
                >
                  <MessageCircle className="mr-2 h-4 w-4" /> Chat on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT METHODS GRID ===== */}
      <section className="dkr-section">
        <div className="container mx-auto">
          <SectionTitle icon={<Heart className="h-4 w-4 text-[#C61162]" />}>
            Humse Rabta Karein
          </SectionTitle>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CONTACT_METHODS.map((method, idx) => {
              const Icon = method.icon
              const Wrapper = method.href ? 'a' : 'div'
              return (
                <Wrapper
                  key={method.title}
                  {...(method.href
                    ? { href: method.href, target: method.href.startsWith('http') ? '_blank' : undefined, rel: 'noopener noreferrer' }
                    : {})}
                  className="dkr-card dkr-fade-up block p-6"
                  style={{ animationDelay: `${idx * 0.08}s` }}
                >
                  <div
                    className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${method.accent} text-white shadow-lg`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#222B45]">
                    {method.title}
                  </h3>
                  <p className="mt-1 font-medium text-[#C61162]">{method.value}</p>
                  <p className="mt-2 text-sm text-[#8F9BB3]">{method.description}</p>
                </Wrapper>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== CONTACT FORM + INFO ===== */}
      <section className="dkr-bg-secondary">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left: Info / office card */}
            <div className="dkr-fade-up">
              <Badge className="mb-3 bg-[#FAE6EF] text-[#C61162]">Hamara Office</Badge>
              <h2 className="font-serif text-3xl font-bold text-[#222B45] md:text-4xl">
                Aap hamare office mein bhi aa sakte hain
              </h2>
              <p className="mt-4 text-base text-[#8F9BB3]">
                Agar aap personal consultation chahte hain ya vendor partnership
                ke baare mein baat karni hai — hamara Lahore office aapka
                swagat karta hai.
              </p>

              <Card className="mt-6 border-[#FAE6EF] bg-white p-6 shadow-md">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#FAE6EF] text-[#C61162]">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#222B45]">Address</p>
                      <p className="text-sm text-[#8F9BB3]">
                        Office #402, 4th Floor, Gulberg III,<br />
                        Main Boulevard, Lahore, Pakistan
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#FAE6EF] text-[#C61162]">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#222B45]">Working Hours</p>
                      <p className="text-sm text-[#8F9BB3]">
                        Monday - Saturday: 9:00 AM - 8:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#FAE6EF] text-[#C61162]">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#222B45]">Phone</p>
                      <p className="text-sm text-[#8F9BB3]">+92 42 111-111-357</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right: Form */}
            <div className="dkr-card p-6 md:p-8 dkr-fade-up">
              <h2 className="font-serif text-2xl font-bold text-[#222B45] md:text-3xl">
                Aapka Message
              </h2>
              <p className="mt-2 text-sm text-[#8F9BB3]">
                Form fill karein, hum jald reply karenge.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[#222B45]">
                      Full Name <span className="text-[#C61162]">*</span>
                    </label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Aapka naam"
                      required
                      className="border-[#FAE6EF] focus-visible:border-[#C61162] focus-visible:ring-[#C61162]/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-[#222B45]">
                      Phone
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+92 3XX XXXXXXX"
                      className="border-[#FAE6EF] focus-visible:border-[#C61162] focus-visible:ring-[#C61162]/20"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#222B45]">
                    Email Address <span className="text-[#C61162]">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="aap@example.com"
                    required
                    className="border-[#FAE6EF] focus-visible:border-[#C61162] focus-visible:ring-[#C61162]/20"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-[#222B45]">
                    Subject
                  </label>
                  <div className="relative">
                    <select
                      id="subject"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="h-10 w-full appearance-none rounded-md border border-[#FAE6EF] bg-white px-3 pr-10 text-sm text-[#222B45] outline-none transition focus:border-[#C61162] focus:ring-2 focus:ring-[#C61162]/20"
                    >
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8F9BB3]" />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-[#222B45]">
                    Message <span className="text-[#C61162]">*</span>
                  </label>
                  <Textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Aapka sawaal ya feedback yahan likhein..."
                    required
                    className="min-h-32 border-[#FAE6EF] focus-visible:border-[#C61162] focus-visible:ring-[#C61162]/20"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="dkr-btn-primary h-12 w-full text-sm"
                >
                  {submitting ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="dkr-section bg-white">
        <div className="container mx-auto max-w-4xl">
          <SectionTitle icon={<HelpCircle className="h-4 w-4 text-[#C61162]" />}>
            Aksar Poochay Janay Walay Sawalat
          </SectionTitle>

          <div className="mt-10 space-y-3">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i
              return (
                <div
                  key={i}
                  className={`dkr-card overflow-hidden transition-all ${isOpen ? 'shadow-lg' : ''}`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="font-serif text-base font-semibold text-[#222B45] md:text-lg">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 flex-shrink-0 text-[#C61162] transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-[#8F9BB3] md:text-base">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== MAP / LOCATION PLACEHOLDER ===== */}
      <section className="dkr-bg-secondary">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <SectionTitle icon={<MapPin className="h-4 w-4 text-[#C61162]" />}>
            Hamara Location
          </SectionTitle>
          <div className="mt-8 dkr-card dkr-fade-up overflow-hidden">
            <div className="relative aspect-[16/7] w-full bg-gradient-to-br from-[#FAE6EF] via-[#F6F9FC] to-white">
              {/* Stylised map placeholder */}
              <FloralPattern className="text-[#C61162]" opacity={0.05} />
              <MandalaBg className="text-[#EAA552] left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2" opacity={0.12} />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <div className="mb-3 inline-flex h-16 w-16 animate-pulse-glow items-center justify-center rounded-full bg-gradient-to-br from-[#C61162] to-[#9A0E4C] text-white shadow-xl">
                  <MapPin className="h-7 w-7" />
                </div>
                <p className="font-serif text-xl font-bold text-[#222B45]">
                  ShaadiSet Head Office
                </p>
                <p className="mt-1 text-sm text-[#8F9BB3]">
                  Gulberg III, Main Boulevard, Lahore, Pakistan
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Gulberg+III+Main+Boulevard+Lahore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4"
                >
                  <Button className="dkr-btn-primary h-10 px-6 text-sm">
                    <MapPin className="mr-1.5 h-4 w-4" /> Open in Google Maps
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
