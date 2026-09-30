'use client'

import { useState, useEffect } from 'react'
import {
  CreditCard,
  Check,
  X,
  Shield,
  Loader2,
  PartyPopper,
  Wallet,
  Lock,
  ArrowRight,
  Smartphone,
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
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { formatPKR, formatPKRShort } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface PaymentMethod {
  id: string
  name: string
  iconName: string
  desc: string
  color: string
  processingFee: number
  popular: boolean
}

interface CheckoutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vendorSlug: string
  vendorName: string
  packageName?: string
  suggestedAmount?: number
  eventDate?: string
}

type Step = 'details' | 'method' | 'processing' | 'success'

export function CheckoutDialog({
  open,
  onOpenChange,
  vendorSlug,
  vendorName,
  packageName,
  suggestedAmount = 25000,
  eventDate,
}: CheckoutDialogProps) {
  const [step, setStep] = useState<Step>('details')
  const [methods, setMethods] = useState<PaymentMethod[]>([])
  const [selectedMethod, setSelectedMethod] = useState<string>('')
  const [amount, setAmount] = useState(suggestedAmount)
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [loading, setLoading] = useState(false)

  // Fetch payment methods on mount
  useEffect(() => {
    fetch('/api/payments')
      .then((r) => r.json())
      .then((data) => {
        setMethods(data.methods || [])
        const jazzcash = (data.methods || []).find((m: PaymentMethod) => m.id === 'jazzcash')
        if (jazzcash) setSelectedMethod('jazzcash')
      })
      .catch(() => {})
  }, [])

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset after close animation
      setTimeout(() => {
        setStep('details')
        setCustomerName('')
        setCustomerPhone('')
        setCustomerEmail('')
      }, 200)
    }
    onOpenChange(open)
  }

  const handleSubmit = async () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      toast.error('Naam aur phone zaroori hai')
      return
    }
    if (amount < 1000) {
      toast.error('Minimum advance PKR 1,000 hai')
      return
    }

    setStep('processing')
    try {
      const res = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vendorSlug,
          vendorName,
          packageName,
          amount,
          method: selectedMethod,
          customerName: customerName.trim(),
          customerPhone: customerPhone.trim(),
          customerEmail: customerEmail.trim() || undefined,
          eventDate,
        }),
      })
      const data = await res.json()
      if (data.success) {
        // Simulate gateway processing delay
        setTimeout(() => {
          setStep('success')
        }, 2000)
      } else {
        toast.error(data.error || 'Payment failed')
        setStep('method')
      }
    } catch {
      toast.error('Payment failed')
      setStep('method')
    }
  }

  const processingFee = methods.find((m) => m.id === selectedMethod)?.processingFee || 0
  const feeAmount = Math.round((amount * processingFee) / 1000)
  const total = amount + feeAmount

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-[#4D0712] p-5 text-white">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl text-white flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              {step === 'success' ? 'Payment Successful!' : 'Pay Advance & Book'}
            </DialogTitle>
            <DialogDescription className="text-white/80 text-xs">
              {vendorName}
              {packageName ? ` · ${packageName}` : ''}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-5">
                    {/* Step 1: Details */}
            {step === 'details' && (
              <div
                className="space-y-4 animate-fade-up"
              >
                <div>
                  <Label className="text-xs">Customer Name *</Label>
                  <Input
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Ahmed Khan"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Phone / WhatsApp *</Label>
                  <Input
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+92 300 1234567"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Email (optional)</Label>
                  <Input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="ahmed@example.com"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs flex items-center justify-between">
                    <span>Advance Amount (PKR) *</span>
                    <span className="text-muted-foreground">Min: PKR 1,000</span>
                  </Label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                    min={1000}
                    className="mt-1"
                  />
                  {/* Quick amounts */}
                  <div className="mt-2 flex gap-1.5">
                    {[10000, 25000, 50000, 100000].map((a) => (
                      <button
                        key={a}
                        onClick={() => setAmount(a)}
                        className={cn(
                          'rounded-full border px-2.5 py-1 text-[11px] transition',
                          amount === a
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border/60 text-muted-foreground hover:border-primary/40'
                        )}
                      >
                        {formatPKRShort(a)}
                      </button>
                    ))}
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={() => setStep('method')}
                  disabled={!customerName.trim() || !customerPhone.trim() || amount < 1000}
                >
                  Continue <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {step === 'method' && (
              <div
                className="space-y-3 animate-fade-up"
              >
                <div>
                  <Label className="text-xs mb-1.5 block">Select Payment Method</Label>
                  <div className="space-y-2">
                    {methods.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setSelectedMethod(m.id)}
                        className={cn(
                          'flex w-full items-center gap-3 rounded-lg border p-3 text-left transition',
                          selectedMethod === m.id
                            ? 'border-primary bg-primary/5 ring-1 ring-primary'
                            : 'border-border/60 hover:border-primary/40'
                        )}
                      >
                        <div
                          className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg"
                          style={{ backgroundColor: `${m.color}15`, color: m.color }}
                        >
                          {m.iconName === 'Smartphone' && <Smartphone className="h-5 w-5" />}
                          {m.iconName === 'Wallet' && <Wallet className="h-5 w-5" />}
                          {m.iconName === 'CreditCard' && <CreditCard className="h-5 w-5" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-medium text-foreground">{m.name}</span>
                            {m.popular && (
                              <Badge className="h-4 px-1 text-[9px] bg-amber-500/15 text-amber-700">
                                Popular
                              </Badge>
                            )}
                          </div>
                          <div className="text-[11px] text-muted-foreground">{m.desc}</div>
                        </div>
                        {selectedMethod === m.id && (
                          <Check className="h-4 w-4 text-primary flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Summary */}
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Advance</span>
                    <span className="font-medium text-foreground">{formatPKR(amount)}</span>
                  </div>
                  {feeAmount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Processing fee ({processingFee / 10}%)</span>
                      <span className="text-foreground">{formatPKR(feeAmount)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="font-serif text-lg font-bold text-primary">{formatPKR(total)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-lg bg-accent/40 p-2 text-[11px] text-muted-foreground">
                  <Shield className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                  <span>
                    Secure payment via encrypted gateway. Your booking is confirmed instantly.
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setStep('details')}
                  >
                    Back
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleSubmit}
                    disabled={!selectedMethod}
                  >
                    <Lock className="mr-1.5 h-4 w-4" />
                    Pay {formatPKRShort(total)}
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Processing */}
            {step === 'processing' && (
              <div
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">
                  Processing Payment...
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Please wait while we process your {methods.find((m) => m.id === selectedMethod)?.name} payment
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Lock className="h-3 w-3" /> Secure connection established
                </div>
              </div>
            )}

            {/* Step 4: Success */}
            {step === 'success' && (
              <div
                className="flex flex-col items-center justify-center py-8 text-center"
              >
                <div
                  className="grid h-16 w-16 place-items-center rounded-full bg-emerald-500/15 text-emerald-600"
                >
                  <PartyPopper className="h-8 w-8" />
                </div>
                <h3 className="mt-4 font-serif text-xl font-bold text-foreground">
                  Booking Confirmed! 🎉
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Advance payment of <strong className="text-foreground">{formatPKR(total)}</strong> successful via{' '}
                  {methods.find((m) => m.id === selectedMethod)?.name}
                </p>
                <div className="mt-4 w-full rounded-lg border border-border/60 bg-muted/30 p-3 text-left text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Vendor</span>
                    <span className="font-medium text-foreground">{vendorName}</span>
                  </div>
                  <div className="mt-1 flex justify-between">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-medium text-foreground">{formatPKR(amount)}</span>
                  </div>
                  {eventDate && (
                    <div className="mt-1 flex justify-between">
                      <span className="text-muted-foreground">Event Date</span>
                      <span className="font-medium text-foreground">{eventDate}</span>
                    </div>
                  )}
                  <div className="mt-1 flex justify-between">
                    <span className="text-muted-foreground">Transaction ID</span>
                    <span className="font-mono text-foreground">
                      TXN{Date.now().toString().slice(-8)}
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-[11px] text-muted-foreground">
                  📧 Receipt bhej di gaya hai aapke phone/email pe. Vendor se confirmation message aayega.
                </p>
                <Button
                  className="mt-4 w-full"
                  onClick={() => handleOpenChange(false)}
                >
                  Done
                </Button>
              </div>
            )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
