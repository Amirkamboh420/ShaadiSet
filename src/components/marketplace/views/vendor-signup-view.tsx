'use client'

import { useState } from 'react'
import {
  Store,
  Users,
  BadgeCheck,
  TrendingUp,
  Sparkles,
  Check,
  ChevronRight,
  ChevronLeft,
  PartyPopper,
  ArrowRight,
  CheckCircle2,
  Camera,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Image as ImageIcon,
  Tag,
  IndianRupee,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useMarketplace } from '@/lib/store'
import { Icon } from '@/components/marketplace/icon'
import { CATEGORIES, CITIES, formatPKR } from '@/lib/constants'
import { toast } from 'sonner'

interface FormData {
  businessName: string
  category: string
  city: string
  area: string
  shortDescription: string
  description: string
  phone: string
  whatsapp: string
  email: string
  instagram: string
  address: string
  teamSize: string
  startingPrice: string
  coverImage: string
  galleryUrls: string
}

const INITIAL_FORM: FormData = {
  businessName: '',
  category: '',
  city: '',
  area: '',
  shortDescription: '',
  description: '',
  phone: '',
  whatsapp: '',
  email: '',
  instagram: '',
  address: '',
  teamSize: '',
  startingPrice: '',
  coverImage: '',
  galleryUrls: '',
}

const BENEFITS = [
  {
    icon: Users,
    title: 'Pakistan-Wide Reach',
    desc: 'Lahore, Karachi, Islamabad, Faisalabad — shaadi ke 2,500+ couples se connect karein.',
  },
  {
    icon: BadgeCheck,
    title: 'Verified Badge',
    desc: 'Verified badge se customers ko trust milega. Quality leads aur fast conversions.',
  },
  {
    icon: TrendingUp,
    title: 'Analytics Dashboard',
    desc: 'Profile views, inquiries, bookings aur earnings — sab kuch ek dashboard pe.',
  },
  {
    icon: Sparkles,
    title: 'Featured Boost',
    desc: 'Featured listings search results pe top pe dikhe — 3x zyada visibility.',
  },
]

const PRICING_TIERS = [
  {
    name: 'Basic',
    price: 0,
    period: 'forever',
    desc: 'Shuru karne ke liye perfect',
    features: ['10 leads / month', '1 category listing', 'Basic profile', 'Customer inquiries'],
    cta: 'Start Free',
    highlighted: false,
    accent: 'border-border',
  },
  {
    name: 'Pro',
    price: 5000,
    period: 'month',
    desc: 'Growing vendors ke liye',
    features: [
      '50 leads / month',
      'Verified badge',
      'Analytics dashboard',
      'Multiple categories',
      'Priority listing',
    ],
    cta: 'Get Pro',
    highlighted: true,
    accent: 'border-primary ring-2 ring-primary/30',
  },
  {
    name: 'Premium',
    price: 15000,
    period: 'month',
    desc: 'Top vendors ka plan',
    features: [
      'Unlimited leads',
      'Featured placement',
      'Priority support',
      'Custom portfolio URL',
      'Advanced analytics',
    ],
    cta: 'Go Premium',
    highlighted: false,
    accent: 'border-border',
  },
]

const STEPS = [
  { num: 1, label: 'Business Info' },
  { num: 2, label: 'Contact & Portfolio' },
  { num: 3, label: 'Review & Submit' },
]

function StepIndicator({
  current,
  completed,
}: {
  current: number
  completed: number[]
}) {
  return (
    <div className="mx-auto flex max-w-2xl items-center justify-between">
      {STEPS.map((s, i) => {
        const isComplete = completed.includes(s.num)
        const isActive = current === s.num
        return (
          <div
            key={s.num}
            className="flex flex-1 items-center"
          >
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`grid h-10 w-10 place-items-center rounded-full border-2 transition-all ${
                  isComplete
                    ? 'border-primary bg-primary text-primary-foreground'
                    : isActive
                      ? 'border-primary text-primary'
                      : 'border-border bg-card text-muted-foreground'
                }`}
              >
                {isComplete ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="font-serif font-bold">{s.num}</span>
                )}
              </div>
              <span
                className={`hidden text-xs font-medium sm:block ${
                  isActive || isComplete
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`mx-2 h-0.5 flex-1 transition-all sm:mx-3 ${
                  isComplete ? 'bg-primary' : 'bg-border'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

function FieldGroup({
  label,
  htmlFor,
  required,
  children,
  hint,
}: {
  label: string
  htmlFor?: string
  required?: boolean
  children: React.ReactNode
  hint?: string
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor} className="text-foreground">
        {label} {required && <span className="text-primary">*</span>}
      </Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

const InputWithIcon = ({
  icon: Icon,
  ...props
}: { icon: typeof Phone } & React.ComponentProps<typeof Input>) => {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input className="pl-9" {...props} />
    </div>
  )
}

function SuccessState({ formData }: { formData: FormData }) {
  const { setView } = useMarketplace()
  return (
    <div
      className="mx-auto max-w-xl animate-fade-up"
    >
      <Card className="relative overflow-hidden border-primary/30 bg-gradient-to-br from-card to-primary/5 p-8 text-center md:p-10">
        {/* Confetti dots */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="absolute top-0 h-2 w-2 rounded-full"
              style={{
                left: `${5 + (i * 8) % 90}%`,
                backgroundColor: [
                  '#6C092A',
                  '#a8526b',
                  '#c8985a',
                  '#d4a18e',
                  '#7d1f3a',
                ][i % 5],
              }}
            />
          ))}
        </div>

        <div
          className="relative mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground"
        >
          <PartyPopper className="h-10 w-10" />
        </div>
        <div className="relative">
          <Badge className="mb-3 bg-emerald-500/15 text-emerald-700">
            Application Received
          </Badge>
          <h2 className="font-serif text-3xl font-bold text-foreground">
            Shukriya!
          </h2>
          <p className="mt-3 text-foreground">
            Aapki listing{' '}
            <span className="font-semibold text-primary">
              {formData.businessName || 'Your Business'}
            </span>{' '}
            ke liye application mil gayi hai.
          </p>
          <div className="mx-auto mt-5 max-w-md rounded-lg border border-border bg-card p-4 text-left">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <div className="font-semibold text-foreground">
                  Hamari team 24-48 ghante mein review karegi
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Verification ke baad aapki listing live ho jayegi aur aap
                  leads receive karna shuru kar denge.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button size="lg" onClick={() => setView('home')}>
              <ArrowRight className="h-4 w-4" /> Back to Home
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setView('browse')}
            >
              <Store className="h-4 w-4" /> Browse Vendors
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export function VendorSignupView() {
  const { setView } = useMarketplace()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const completed: number[] = []
  if (
    form.businessName &&
    form.category &&
    form.city &&
    form.shortDescription.length > 10
  )
    completed.push(1)
  if (form.phone && form.startingPrice) completed.push(2)

  const canProceedStep1 =
    form.businessName.trim() &&
    form.category &&
    form.city &&
    form.shortDescription.trim().length > 10

  const canProceedStep2 = form.phone.trim() && form.startingPrice.trim()

  const handleSubmit = () => {
    if (!canProceedStep1 || !canProceedStep2) {
      toast.error('Saari required fields bhar dein')
      return
    }
    setSubmitted(true)
    toast.success('Application submit ho gayi! Review mein 24-48 ghante.')
  }

  if (submitted) return <SuccessState formData={form} />

  return (
    <div className="animate-fade-up">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-[#660F17] to-[#4D0712] py-14 text-white md:py-20">
        <div className="absolute -right-10 -top-10 h-60 w-60 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        <div className="container relative mx-auto px-4">
          <div
            className="mx-auto max-w-3xl text-center animate-fade-up"
          >
            <Badge className="mb-4 bg-white/15 text-white">
              <Sparkles className="mr-1 h-3 w-3" /> For Vendors
            </Badge>
            <h1 className="font-serif text-4xl font-bold leading-tight md:text-5xl text-balance">
              List Your Business on{' '}
              <span className="text-amber-300">ShaadiSet</span>
            </h1>
            <p className="mt-4 text-lg text-white/85 md:text-xl text-balance">
              Pakistan ka pehla wedding vendor marketplace join karein.{' '}
              <span className="font-semibold text-amber-300">
                First 100 vendors ke liye free listing!
              </span>
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {[
                '5-12% commission only',
                'No setup fee',
                'Cancel anytime',
                '24-48h approval',
              ].map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs text-white"
                >
                  <CheckCircle2 className="h-3 w-3" /> {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <div className="wedding-divider mx-auto mb-3 max-w-[200px]">
              <Sparkles className="h-4 w-4" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Why Join ShaadiSet?
            </h2>
            <p className="mt-2 text-muted-foreground">
              Vendors ke liye banaya gaya — quality leads, analytics, trust
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b, i) => (
              <div
                key={b.title}
                className="animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <Card className="group h-full border-border/60 p-6 text-center transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                  <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <b.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-step form */}
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                Apni Listing Banayein
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                3 simple steps — bas info bharein aur submit karein
              </p>
            </div>

            <StepIndicator current={step} completed={completed} />

            <Card className="mt-8 border-border/60 p-6 md:p-8">
              {/* STEP 1 — Business Info */}
              {step === 1 && (
                <div
                  className="space-y-5 animate-fade-up"
                >
                  <div className="flex items-center gap-2">
                    <Store className="h-5 w-5 text-primary" />
                    <h3 className="font-serif text-xl font-bold text-foreground">
                      Business Information
                    </h3>
                  </div>

                  <FieldGroup
                    label="Business Name"
                    htmlFor="businessName"
                    required
                  >
                    <InputWithIcon
                      icon={Store}
                      id="businessName"
                      placeholder="e.g., Lens & Light Studios"
                      value={form.businessName}
                      onChange={(e) =>
                        update('businessName', e.target.value)
                      }
                    />
                  </FieldGroup>

                  <div className="grid gap-5 md:grid-cols-2">
                    <FieldGroup label="Category" required>
                      <Select
                        value={form.category}
                        onValueChange={(v) => update('category', v)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map((c) => (
                            <SelectItem key={c.slug} value={c.slug}>
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FieldGroup>

                    <FieldGroup label="City" required>
                      <Select
                        value={form.city}
                        onValueChange={(v) => update('city', v)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          {CITIES.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FieldGroup>
                  </div>

                  <FieldGroup label="Area / Locality" htmlFor="area">
                    <InputWithIcon
                      icon={MapPin}
                      id="area"
                      placeholder="e.g., Gulberg III"
                      value={form.area}
                      onChange={(e) => update('area', e.target.value)}
                    />
                  </FieldGroup>

                  <FieldGroup
                    label="Short Description"
                    htmlFor="shortDescription"
                    required
                    hint={`${form.shortDescription.length}/120 characters — homepage preview`}
                  >
                    <Input
                      id="shortDescription"
                      placeholder="e.g., Cinematic wedding photographers in Lahore"
                      maxLength={120}
                      value={form.shortDescription}
                      onChange={(e) =>
                        update('shortDescription', e.target.value)
                      }
                    />
                  </FieldGroup>

                  <FieldGroup
                    label="Full Description"
                    htmlFor="description"
                    hint="Apne business, services aur USP detail mein batayein"
                  >
                    <Textarea
                      id="description"
                      placeholder="Hum 2015 se Lahore mein cinematic wedding photography kar rahe hain..."
                      rows={5}
                      value={form.description}
                      onChange={(e) => update('description', e.target.value)}
                    />
                  </FieldGroup>

                  <div className="flex justify-end">
                    <Button
                      onClick={() => setStep(2)}
                      disabled={!canProceedStep1}
                      size="lg"
                    >
                      Next: Contact &amp; Portfolio{' '}
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 2 — Contact & Portfolio */}
              {step === 2 && (
                <div
                  className="space-y-5 animate-fade-up"
                >
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    <h3 className="font-serif text-xl font-bold text-foreground">
                      Contact &amp; Portfolio
                    </h3>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <FieldGroup label="Phone" htmlFor="phone" required>
                      <InputWithIcon
                        icon={Phone}
                        id="phone"
                        placeholder="0300 1234567"
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                      />
                    </FieldGroup>
                    <FieldGroup label="WhatsApp" htmlFor="whatsapp">
                      <InputWithIcon
                        icon={Phone}
                        id="whatsapp"
                        placeholder="0300 1234567"
                        value={form.whatsapp}
                        onChange={(e) => update('whatsapp', e.target.value)}
                      />
                    </FieldGroup>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <FieldGroup label="Email" htmlFor="email">
                      <InputWithIcon
                        icon={Mail}
                        id="email"
                        type="email"
                        placeholder="hello@yourbusiness.com"
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                      />
                    </FieldGroup>
                    <FieldGroup label="Instagram" htmlFor="instagram">
                      <InputWithIcon
                        icon={Instagram}
                        id="instagram"
                        placeholder="@yourbusiness"
                        value={form.instagram}
                        onChange={(e) => update('instagram', e.target.value)}
                      />
                    </FieldGroup>
                  </div>

                  <FieldGroup label="Full Address" htmlFor="address">
                    <Textarea
                      id="address"
                      placeholder="Shop #, Street, Area, City"
                      rows={2}
                      value={form.address}
                      onChange={(e) => update('address', e.target.value)}
                    />
                  </FieldGroup>

                  <div className="grid gap-5 md:grid-cols-2">
                    <FieldGroup
                      label="Team Size"
                      htmlFor="teamSize"
                      hint="e.g., 5-10 members"
                    >
                      <InputWithIcon
                        icon={Users}
                        id="teamSize"
                        placeholder="5"
                        value={form.teamSize}
                        onChange={(e) => update('teamSize', e.target.value)}
                      />
                    </FieldGroup>
                    <FieldGroup
                      label="Starting Price (PKR)"
                      htmlFor="startingPrice"
                      required
                      hint="Aapka base package price"
                    >
                      <InputWithIcon
                        icon={IndianRupee}
                        id="startingPrice"
                        type="number"
                        placeholder="50000"
                        value={form.startingPrice}
                        onChange={(e) =>
                          update('startingPrice', e.target.value)
                        }
                      />
                    </FieldGroup>
                  </div>

                  <FieldGroup
                    label="Cover Image URL"
                    htmlFor="coverImage"
                    hint="Ek achhi sa listing cover image ka URL daalein"
                  >
                    <InputWithIcon
                      icon={ImageIcon}
                      id="coverImage"
                      placeholder="https://..."
                      value={form.coverImage}
                      onChange={(e) => update('coverImage', e.target.value)}
                    />
                  </FieldGroup>

                  <FieldGroup
                    label="Gallery Image URLs"
                    htmlFor="galleryUrls"
                    hint="Comma se separated — multiple portfolio images"
                  >
                    <Textarea
                      id="galleryUrls"
                      placeholder="https://...img1.jpg, https://...img2.jpg, https://...img3.jpg"
                      rows={3}
                      value={form.galleryUrls}
                      onChange={(e) => update('galleryUrls', e.target.value)}
                    />
                  </FieldGroup>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setStep(1)}
                      size="lg"
                    >
                      <ChevronLeft className="h-4 w-4" /> Back
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      disabled={!canProceedStep2}
                      size="lg"
                    >
                      Review &amp; Submit{' '}
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 3 — Review & Submit */}
              {step === 3 && (
                <div
                  className="space-y-5 animate-fade-up"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <h3 className="font-serif text-xl font-bold text-foreground">
                      Review &amp; Submit
                    </h3>
                  </div>

                  <div className="rounded-lg border border-border bg-muted/30 p-4">
                    <div className="mb-4 flex items-center gap-2">
                      <Store className="h-4 w-4 text-primary" />
                      <h4 className="font-semibold text-foreground">
                        Business Info
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto h-7 text-xs"
                        onClick={() => setStep(1)}
                      >
                        Edit
                      </Button>
                    </div>
                    <dl className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <dt className="text-xs text-muted-foreground">
                          Business Name
                        </dt>
                        <dd className="font-medium text-foreground">
                          {form.businessName || '—'}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs text-muted-foreground">
                          Category
                        </dt>
                        <dd className="font-medium text-foreground">
                          {CATEGORIES.find((c) => c.slug === form.category)
                            ?.name || '—'}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs text-muted-foreground">
                          City / Area
                        </dt>
                        <dd className="font-medium text-foreground">
                          {form.area ? `${form.area}, ` : ''}
                          {form.city || '—'}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs text-muted-foreground">
                          Starting Price
                        </dt>
                        <dd className="font-medium text-foreground">
                          {form.startingPrice
                            ? formatPKR(Number(form.startingPrice))
                            : '—'}
                        </dd>
                      </div>
                      <div className="col-span-2">
                        <dt className="text-xs text-muted-foreground">
                          Short Description
                        </dt>
                        <dd className="font-medium text-foreground">
                          {form.shortDescription || '—'}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="rounded-lg border border-border bg-muted/30 p-4">
                    <div className="mb-4 flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      <h4 className="font-semibold text-foreground">
                        Contact &amp; Portfolio
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto h-7 text-xs"
                        onClick={() => setStep(2)}
                      >
                        Edit
                      </Button>
                    </div>
                    <dl className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <dt className="text-xs text-muted-foreground">Phone</dt>
                        <dd className="font-medium text-foreground">
                          {form.phone || '—'}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs text-muted-foreground">
                          WhatsApp
                        </dt>
                        <dd className="font-medium text-foreground">
                          {form.whatsapp || '—'}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs text-muted-foreground">Email</dt>
                        <dd className="font-medium text-foreground">
                          {form.email || '—'}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs text-muted-foreground">
                          Instagram
                        </dt>
                        <dd className="font-medium text-foreground">
                          {form.instagram || '—'}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs text-muted-foreground">
                          Team Size
                        </dt>
                        <dd className="font-medium text-foreground">
                          {form.teamSize || '—'}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs text-muted-foreground">
                          Cover Image
                        </dt>
                        <dd className="font-medium text-foreground truncate">
                          {form.coverImage || '—'}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                    <div className="flex items-start gap-2">
                      <Tag className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <div className="text-sm text-muted-foreground">
                        Submit karne par aapki listing hamari team ke review
                        ke liye bhej di jayegi.{' '}
                        <span className="font-medium text-foreground">
                          24-48 ghante
                        </span>{' '}
                        mein verification ke baad live ho jayegi.
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setStep(2)}
                      size="lg"
                    >
                      <ChevronLeft className="h-4 w-4" /> Back
                    </Button>
                    <Button onClick={handleSubmit} size="lg">
                      <Check className="h-4 w-4" /> Submit for Approval
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <Badge className="mb-3 bg-primary/10 text-primary">
              <Tag className="mr-1 h-3 w-3" /> Pricing
            </Badge>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Simple, Transparent Plans
            </h2>
            <p className="mt-2 text-muted-foreground">
              Apne business ke size ke hisaab se plan chunein. Cancel anytime.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {PRICING_TIERS.map((tier, i) => (
              <div
                key={tier.name}
                className="animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <Card
                  className={`relative h-full p-6 transition hover:shadow-lg hover:shadow-primary/5 ${tier.accent} ${
                    tier.highlighted ? 'md:-translate-y-3' : ''
                  }`}
                >
                  {tier.highlighted && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary px-3 py-1 text-primary-foreground">
                      <Sparkles className="mr-1 h-3 w-3" /> Most Popular
                    </Badge>
                  )}
                  <h3 className="font-serif text-2xl font-bold text-foreground">
                    {tier.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {tier.desc}
                  </p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="font-serif text-4xl font-bold text-primary">
                      {tier.price === 0
                        ? 'Free'
                        : formatPKR(tier.price)}
                    </span>
                    {tier.price > 0 && (
                      <span className="text-sm text-muted-foreground">
                        /{tier.period}
                      </span>
                    )}
                  </div>

                  <ul className="mt-5 space-y-2.5">
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-foreground"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="mt-6 w-full"
                    variant={tier.highlighted ? 'default' : 'outline'}
                    onClick={() => {
                      setStep(1)
                      window.scrollTo({
                        top: document.querySelector('#pricing')
                          ? (document.querySelector('#pricing') as HTMLElement)
                              .offsetTop
                          : 0,
                        behavior: 'smooth',
                      })
                      toast.success(`${tier.name} plan selected!`)
                    }}
                  >
                    {tier.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Card>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-2xl text-center">
            <p className="text-sm text-muted-foreground">
              Sab plans mein{' '}
              <span className="font-medium text-foreground">
                5-12% commission only
              </span>{' '}
              on confirmed bookings. Koi hidden charges nahi. First 100 vendors
              ke liye Pro plan 6 months free!
            </p>
            <Button
              variant="link"
              onClick={() => setView('home')}
              className="mt-4"
            >
              <ChevronLeft className="h-4 w-4" /> Back to home
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
