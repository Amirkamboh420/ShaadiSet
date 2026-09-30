'use client'

import { useState, useRef, useEffect } from 'react'
import {
  MessageCircle,
  X,
  Send,
  ArrowLeft,
  Phone,
  Circle,
  CheckCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useChat } from '@/lib/use-chat'
import { useMarketplace } from '@/lib/store'
import { cn } from '@/lib/utils'

interface ChatWidgetProps {
  vendorSlug: string
  vendorName: string
  variant?: 'floating' | 'embedded'
  /** When variant is 'embedded', the widget shows inline */
  className?: string
}

export function ChatWidget({
  vendorSlug,
  vendorName,
  variant = 'floating',
  className,
}: ChatWidgetProps) {
  const [open, setOpen] = useState(variant === 'embedded')
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [identitySet, setIdentitySet] = useState(false)
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const { isConnected, messages, otherTyping, otherOnline, joinConversation, sendMessage, setTyping } = useChat()

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, otherTyping])

  const handleStart = () => {
    if (!customerName.trim() || !customerPhone.trim()) return
    setIdentitySet(true)
    joinConversation({
      vendorSlug,
      vendorName,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      role: 'customer',
    })
  }

  const handleSend = () => {
    if (!input.trim()) return
    sendMessage(input)
    setInput('')
    setTyping(false)
  }

  if (variant === 'embedded') {
    return (
      <div className={cn('flex flex-col', className)}>
        <ChatHeader
          vendorName={vendorName}
          isConnected={isConnected}
          otherOnline={otherOnline}
        />
        {!identitySet ? (
          <IdentityForm
            customerName={customerName}
            setCustomerName={setCustomerName}
            customerPhone={customerPhone}
            setCustomerPhone={setCustomerPhone}
            onStart={handleStart}
            isConnected={isConnected}
          />
        ) : (
          <>
            <ChatMessages
              messages={messages}
              otherTyping={otherTyping}
              scrollRef={scrollRef}
            />
            <ChatInput
              input={input}
              setInput={setInput}
              onSend={handleSend}
              onTyping={setTyping}
              disabled={!isConnected}
            />
          </>
        )}
      </div>
    )
  }

  // Floating variant
  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/30 transition hover:scale-105 hover:bg-primary/90 animate-fade-up"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-background" />
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-6 right-6 z-50 flex h-[min(600px,85vh)] w-[min(380px,calc(100vw-3rem))] flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl animate-fade-up"
        >
            <ChatHeader
              vendorName={vendorName}
              isConnected={isConnected}
              otherOnline={otherOnline}
              onClose={() => setOpen(false)}
            />
            {!identitySet ? (
              <IdentityForm
                customerName={customerName}
                setCustomerName={setCustomerName}
                customerPhone={customerPhone}
                setCustomerPhone={setCustomerPhone}
                onStart={handleStart}
                isConnected={isConnected}
              />
            ) : (
              <>
                <ChatMessages
                  messages={messages}
                  otherTyping={otherTyping}
                  scrollRef={scrollRef}
                />
                <ChatInput
                  input={input}
                  setInput={setInput}
                  onSend={handleSend}
                  onTyping={setTyping}
                  disabled={!isConnected}
                />
              </>
            )}
          </div>
        )}
    </>
  )
}

function ChatHeader({
  vendorName,
  isConnected,
  otherOnline,
  onClose,
}: {
  vendorName: string
  isConnected: boolean
  otherOnline: boolean
  onClose?: () => void
}) {
  return (
    <div className="flex items-center gap-3 border-b border-border/60 bg-gradient-to-r from-primary to-[#4D0712] p-3 text-white">
      <div className="relative">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-white/15 font-serif text-sm font-bold">
          {vendorName.charAt(0)}
        </div>
        {otherOnline && (
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-primary" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold">{vendorName}</div>
        <div className="flex items-center gap-1 text-[11px] text-white/75">
          {isConnected ? (
            <>
              {otherOnline ? (
                <>
                  <Circle className="h-2 w-2 fill-emerald-400 text-emerald-400" />
                  Online
                </>
              ) : (
                'Connected'
              )}
            </>
          ) : (
            'Connecting...'
          )}
        </div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="grid h-8 w-8 place-items-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white"
          aria-label="Close chat"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

function IdentityForm({
  customerName,
  setCustomerName,
  customerPhone,
  setCustomerPhone,
  onStart,
  isConnected,
}: {
  customerName: string
  setCustomerName: (v: string) => void
  customerPhone: string
  setCustomerPhone: (v: string) => void
  onStart: () => void
  isConnected: boolean
}) {
  return (
    <div className="flex-1 space-y-3 p-4">
      <div className="rounded-lg bg-accent/40 p-3 text-center">
        <MessageCircle className="mx-auto h-6 w-6 text-primary" />
        <p className="mt-1.5 text-sm font-medium text-foreground">
          Vendor se direct baat karein
        </p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          Apna naam aur phone dijiye, chat shuru karein
        </p>
      </div>
      <div>
        <label className="text-xs font-medium text-foreground">Aapka Naam</label>
        <Input
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="e.g. Ayesha Khan"
          className="mt-1"
          onKeyDown={(e) => e.key === 'Enter' && customerPhone && onStart()}
        />
      </div>
      <div>
        <label className="text-xs font-medium text-foreground">Phone / WhatsApp</label>
        <Input
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
          placeholder="+92 300 1234567"
          className="mt-1"
          onKeyDown={(e) => e.key === 'Enter' && customerName && onStart()}
        />
      </div>
      <Button
        onClick={onStart}
        disabled={!customerName.trim() || !customerPhone.trim() || !isConnected}
        className="w-full"
      >
        {!isConnected ? 'Connecting...' : 'Chat Shuru Karein'}
      </Button>
      <p className="text-center text-[10px] text-muted-foreground">
        🔒 Chat private hai. Vendor ko sirf aapka naam aur phone dikhega.
      </p>
    </div>
  )
}

function ChatMessages({
  messages,
  otherTyping,
  scrollRef,
}: {
  messages: ReturnType<typeof useChat>['messages']
  otherTyping: boolean
  scrollRef: React.RefObject<HTMLDivElement | null>
}) {
  if (messages.length === 0 && !otherTyping) {
    return (
      <div
        ref={scrollRef}
        className="flex-1 space-y-3 overflow-y-auto custom-scrollbar p-4"
      >
        <div className="flex h-full flex-col items-center justify-center text-center">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-accent">
            <MessageCircle className="h-6 w-6 text-primary" />
          </div>
          <p className="mt-2 text-sm font-medium text-foreground">
            Chat shuru karein!
          </p>
          <p className="mt-0.5 max-w-[240px] text-[11px] text-muted-foreground">
            Vendor ko apna event ke baare mein message bhejein. Quotes, availability, packages — sab pooch sakte hain.
          </p>
        </div>
      </div>
    )
  }
  return (
    <div
      ref={scrollRef}
      className="flex-1 space-y-2 overflow-y-auto custom-scrollbar p-3"
    >
      {messages.map((msg) => {
        const isMe = msg.sender === 'customer'
        return (
          <div
            key={msg.id}
            className={cn('flex flex-col', isMe ? 'items-end' : 'items-start')}
          >
            <div
              className={cn(
                'max-w-[80%] rounded-2xl px-3 py-2 text-sm',
                isMe
                  ? 'rounded-br-md bg-primary text-primary-foreground'
                  : 'rounded-bl-md bg-accent text-accent-foreground'
              )}
            >
              {msg.attachment?.type === 'quote' && (
                <div className="mb-1 rounded-lg border border-primary/20 bg-primary/5 p-2 text-xs">
                  <div className="font-semibold text-primary">💰 Quote</div>
                  <div>{msg.attachment.label}</div>
                </div>
              )}
              <p className="whitespace-pre-wrap break-words">{msg.content}</p>
            </div>
            <div
              className={cn(
                'mt-0.5 flex items-center gap-1 px-1 text-[10px] text-muted-foreground',
                isMe && 'flex-row-reverse'
              )}
            >
              {new Date(msg.timestamp).toLocaleTimeString('en-PK', {
                hour: '2-digit',
                minute: '2-digit',
              })}
              {isMe && <CheckCheck className="h-3 w-3 text-primary" />}
            </div>
          </div>
        )
      })}
      {otherTyping && (
        <div className="flex items-start">
          <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-accent px-3 py-2.5">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  )
}

function ChatInput({
  input,
  setInput,
  onSend,
  onTyping,
  disabled,
}: {
  input: string
  setInput: (v: string) => void
  onSend: () => void
  onTyping: (typing: boolean) => void
  disabled?: boolean
}) {
  return (
    <div className="border-t border-border/60 p-2.5">
      <div className="flex items-center gap-2">
        <Input
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            onTyping(e.target.value.length > 0)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              onSend()
            }
          }}
          placeholder="Message likhein..."
          disabled={disabled}
          className="flex-1"
        />
        <Button
          size="icon"
          onClick={onSend}
          disabled={disabled || !input.trim()}
          className="h-9 w-9"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
