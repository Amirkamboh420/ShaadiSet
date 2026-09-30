'use client'

import { useState } from 'react'
import {
  User,
  Mail,
  Lock,
  Phone,
  Loader2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { useAuth } from '@/lib/auth-store'

interface AuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const { login } = useAuth()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [loading, setLoading] = useState(false)

  // Login state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Signup state
  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupPhone, setSignupPhone] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!loginEmail.trim() || !loginPassword.trim()) {
      toast.error('Email aur password dono zaroori hai')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      })
      const data = await res.json()
      if (data.success) {
        login(data.user)
        toast.success(`Welcome back, ${data.user.name || data.user.email}!`)
        onOpenChange(false)
        setLoginEmail('')
        setLoginPassword('')
      } else {
        toast.error(data.error || 'Login failed')
      }
    } catch {
      toast.error('Login failed. Dobara try karein.')
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!signupEmail.trim() || !signupPassword.trim()) {
      toast.error('Email aur password zaroori hai')
      return
    }
    if (signupPassword.length < 6) {
      toast.error('Password kam az kam 6 characters ka hona chahiye')
      return
    }
    setLoading(true)
    try {
      // Signup
      const signupRes = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: signupName,
          email: signupEmail,
          password: signupPassword,
          phone: signupPhone,
        }),
      })
      const signupData = await signupRes.json()
      if (!signupData.success) {
        toast.error(signupData.error || 'Signup failed')
        return
      }

      // Auto-login
      const loginRes = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: signupEmail, password: signupPassword }),
      })
      const loginData = await loginRes.json()
      if (loginData.success) {
        login(loginData.user)
        toast.success('Welcome to ShaadiSet!')
        onOpenChange(false)
        setSignupName('')
        setSignupEmail('')
        setSignupPassword('')
        setSignupPhone('')
      } else {
        // Switch to login tab
        setMode('login')
        setLoginEmail(signupEmail)
        setLoginPassword('')
        toast.success('Account created! Ab login karein.')
      }
    } catch {
      toast.error('Signup failed. Dobara try karein.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-[#4D0712] p-5 text-white">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              {mode === 'login' ? 'Welcome Back!' : 'Join ShaadiSet'}
            </DialogTitle>
            <DialogDescription className="text-white/80 text-xs">
              {mode === 'login'
                ? 'Login to track inquiries, chats & favorites'
                : 'Apna account banayein — free hai'}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-5">
          <Tabs value={mode} onValueChange={(v) => setMode(v as 'login' | 'signup')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" className="text-sm">Login</TabsTrigger>
              <TabsTrigger value="signup" className="text-sm">Sign Up</TabsTrigger>
            </TabsList>

            {/* Login */}
            <TabsContent value="login" className="mt-4">
              <form onSubmit={handleLogin} className="space-y-3">
                <div>
                  <Label className="text-xs">Email</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="pl-9"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Password</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-9"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <><Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> Logging in...</>
                  ) : (
                    <>Login <ArrowRight className="ml-1.5 h-4 w-4" /></>
                  )}
                </Button>
              </form>
            </TabsContent>

            {/* Signup */}
            <TabsContent value="signup" className="mt-4">
              <form onSubmit={handleSignup} className="space-y-3">
                <div>
                  <Label className="text-xs">Full Name</Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      placeholder="Ahmed Khan"
                      className="pl-9"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Email *</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="pl-9"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Phone</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value)}
                      placeholder="+92 300 1234567"
                      className="pl-9"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Password * <span className="text-muted-foreground">(min 6 chars)</span></Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-9"
                      required
                      minLength={6}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <><Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> Creating account...</>
                  ) : (
                    <>Create Account <ArrowRight className="ml-1.5 h-4 w-4" /></>
                  )}
                </Button>
                <div className="flex items-center justify-center gap-1 text-[11px] text-muted-foreground">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  Free forever · No credit card needed
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
