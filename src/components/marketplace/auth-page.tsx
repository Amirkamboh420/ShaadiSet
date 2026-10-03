'use client'

import { useState, type FormEvent, type ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Heart,
  LockKeyhole,
  Mail,
  Phone,
  Sparkles,
  UserRound,
} from 'lucide-react'
import { useMarketplace } from '@/lib/store'

type AuthMode = 'login' | 'register'

export function AuthPage({ mode }: { mode: AuthMode }) {
  const router = useRouter()
  const loginUser = useMarketplace((state) => state.loginUser)
  const isRegister = mode === 'register'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isRegister) {
        const registerResponse = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, phone, password }),
        })
        const registerData = await registerResponse.json()
        if (!registerResponse.ok || !registerData.success) {
          setError(registerData.error || 'Account create nahi ho saka. Dobara try karein.')
          return
        }
      }

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (!response.ok || !data.success) {
        setError(data.error || 'Login nahi ho saka. Apni details check karein.')
        return
      }

      loginUser(data.user)
      router.push('/')
    } catch {
      setError('Connection mein masla hai. Dobara try karein.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#fff9f5] px-4 py-5 sm:px-6 sm:py-8">
      <div className="mx-auto flex min-h-[calc(100svh-2.5rem)] max-w-6xl items-start justify-center sm:min-h-[calc(100svh-4rem)]">
        <section className="my-auto grid w-full overflow-hidden rounded-[2rem] border border-[#f2dfd5] bg-white shadow-[0_28px_90px_-45px_rgba(103,30,52,0.35)] lg:min-h-[690px] lg:grid-cols-[0.92fr_1.08fr]">
          <aside className="relative hidden overflow-hidden bg-[#5b1230] p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
            <div className="absolute -right-24 -top-20 h-80 w-80 rounded-full border border-white/10" />
            <div className="absolute -right-8 -top-4 h-48 w-48 rounded-full border border-white/10" />
            <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-[#db7f78]/20 blur-3xl" />
            <Link href="/" className="relative flex w-fit items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                <Sparkles className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-serif text-2xl font-bold">ShaadiSet</span>
                <span className="text-[10px] uppercase tracking-[0.24em] text-white/65">Wedding marketplace</span>
              </span>
            </Link>

            <div className="relative max-w-md py-14">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/85">
                <Heart className="h-4 w-4 text-rose-200" /> Har khushi, ek jagah
              </div>
              <h1 className="font-serif text-5xl font-semibold leading-[1.12] xl:text-6xl">
                Your beautiful day starts <span className="text-[#f5c7a7]">right here.</span>
              </h1>
              <p className="mt-6 max-w-sm text-base leading-7 text-white/70">
                Pakistan ke trusted wedding vendors browse karein, compare karein, aur apni shaadi apne andaaz mein plan karein.
              </p>
              <div className="mt-9 flex flex-wrap gap-3 text-xs text-white/80">
                {['Verified vendors', 'Clear pricing', 'Easy planning'].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-2">
                    <Check className="h-3.5 w-3.5 text-[#f5c7a7]" /> {item}
                  </span>
                ))}
              </div>
            </div>

            <p className="relative text-xs text-white/45">Made for your once-in-a-lifetime moments.</p>
          </aside>

          <div className="flex items-center justify-center px-5 py-8 sm:px-10 sm:py-12 lg:px-12 xl:px-16">
            <div className="w-full max-w-md">
              <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#7c6870] transition hover:text-[#a20d4e]">
                <ArrowLeft className="h-4 w-4" /> Back to marketplace
              </Link>

              <div className="mb-7 lg:hidden">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[#7d1238] text-white shadow-lg shadow-[#7d1238]/20">
                  <Sparkles className="h-6 w-6" />
                </div>
                <p className="font-serif text-xl font-bold text-[#391625]">ShaadiSet</p>
                <p className="mt-1 text-sm text-[#8d7d82]">Pakistan ki wedding planning, ek jagah.</p>
              </div>

              <div className="mb-7">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#ad4970]">
                  {isRegister ? 'Your story starts here' : 'Welcome back'}
                </p>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-[#321b25] sm:text-4xl">
                  {isRegister ? 'Create your account' : 'Sign in to ShaadiSet'}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#82747a]">
                  {isRegister ? 'Apni wedding planning shuru karne ke liye details fill karein.' : 'Apne saved vendors aur wedding plans tak pohanchein.'}
                </p>
              </div>

              <div className="mb-7 grid grid-cols-2 rounded-xl bg-[#fbf2f5] p-1">
                <Link href="/login" className={`rounded-lg px-3 py-2.5 text-center text-sm font-semibold transition ${!isRegister ? 'bg-white text-[#9d104c] shadow-sm' : 'text-[#87777e] hover:text-[#5b1230]'}`}>
                  Login
                </Link>
                <Link href="/register" className={`rounded-lg px-3 py-2.5 text-center text-sm font-semibold transition ${isRegister ? 'bg-white text-[#9d104c] shadow-sm' : 'text-[#87777e] hover:text-[#5b1230]'}`}>
                  Register
                </Link>
              </div>

              <form onSubmit={submit} className="space-y-4">
                {isRegister && (
                  <Field label="Full name" icon={<UserRound className="h-[18px] w-[18px]" />}>
                    <input autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} placeholder="Ayesha Khan" className="auth-input" />
                  </Field>
                )}
                <Field label="Email address" icon={<Mail className="h-[18px] w-[18px]" />}>
                  <input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="auth-input" />
                </Field>
                {isRegister && (
                  <Field label="Phone / WhatsApp" icon={<Phone className="h-[18px] w-[18px]" />}>
                    <input type="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+92 300 1234567" className="auth-input" />
                  </Field>
                )}
                <Field label="Password" icon={<LockKeyhole className="h-[18px] w-[18px]" />}>
                  <input type={showPassword ? 'text' : 'password'} autoComplete={isRegister ? 'new-password' : 'current-password'} minLength={isRegister ? 6 : undefined} required value={password} onChange={(event) => setPassword(event.target.value)} placeholder={isRegister ? 'At least 6 characters' : 'Enter your password'} className="auth-input pr-12" />
                  <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute inset-y-0 right-3 my-auto grid h-9 w-9 place-items-center rounded-lg text-[#9a8990] transition hover:bg-[#f6e9ee] hover:text-[#741536]">
                    {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
                  </button>
                </Field>

                {error && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-5 text-rose-700">{error}</p>}

                <button type="submit" disabled={loading} className="group mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#b51058] to-[#82133e] px-4 text-sm font-semibold text-white shadow-lg shadow-[#971348]/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#971348]/25 disabled:cursor-wait disabled:opacity-70">
                  {loading ? 'Please wait…' : isRegister ? 'Create account' : 'Login'}
                  {!loading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-[#82747a]">
                {isRegister ? 'Already have an account?' : 'New to ShaadiSet?'}{' '}
                <Link href={isRegister ? '/login' : '/register'} className="font-semibold text-[#a20d4e] hover:underline">
                  {isRegister ? 'Login' : 'Create an account'}
                </Link>
              </p>
              <p className="mt-8 text-center text-[11px] leading-5 text-[#a29499]">
                By continuing, you agree to ShaadiSet&apos;s terms and privacy policy.
              </p>
            </div>
          </div>
        </section>
      </div>
      <style jsx global>{`
        .auth-input {
          width: 100%;
          height: 48px;
          border: 1px solid #eadfe3;
          border-radius: 12px;
          background: #fff;
          padding: 0 48px 0 46px;
          color: #321b25;
          font-size: 14px;
          outline: none;
          transition: border-color 160ms, box-shadow 160ms;
        }
        .auth-input::placeholder { color: #aa9da2; }
        .auth-input:focus { border-color: #bd4a78; box-shadow: 0 0 0 3px rgb(189 74 120 / 12%); }
      `}</style>
    </main>
  )
}

function Field({ label, icon, children }: { label: string; icon: ReactNode; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-semibold text-[#44313a]">{label}</span>
      <span className="relative flex items-center">
        <span className="pointer-events-none absolute left-3.5 text-[#a18d95]">{icon}</span>
        <span className="w-full">{children}</span>
      </span>
    </label>
  )
}
