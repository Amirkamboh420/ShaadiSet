'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { io, type Socket } from 'socket.io-client'

export interface ChatMessage {
  id: string
  conversationId: string
  sender: 'customer' | 'vendor'
  senderName: string
  content: string
  timestamp: string
  attachment?: { type: 'image' | 'quote'; url?: string; label?: string }
}

export interface Conversation {
  id: string
  vendorSlug: string
  vendorName: string
  customerName: string
  customerPhone: string
  eventDate?: string
  eventType?: string
  status: 'active' | 'closed'
  createdAt: string
  lastMessageAt: string
  messages: ChatMessage[]
}

interface JoinParams {
  vendorSlug: string
  vendorName: string
  customerName: string
  customerPhone: string
  role: 'customer' | 'vendor'
  eventDate?: string
  eventType?: string
}

let socketRef: Socket | null = null

function getSocket(): Socket {
  if (!socketRef) {
    // Per project guidelines: use XTransformPort in query, path is '/'
    // Caddy gateway forwards to port 3003; Next.js rewrite handles direct port 3000 access
    socketRef = io('/?XTransformPort=3003', {
      path: '/',
      transports: ['websocket', 'polling'],
      forceNew: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      timeout: 10000,
    })
  }
  return socketRef
}

export function useChat() {
  const [isConnected, setIsConnected] = useState(false)
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [otherTyping, setOtherTyping] = useState(false)
  const [otherOnline, setOtherOnline] = useState(false)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const socket = getSocket()

    const onConnect = () => setIsConnected(true)
    const onDisconnect = () => setIsConnected(false)

    const onConversationLoaded = (data: { conversation: Conversation }) => {
      setConversation(data.conversation)
      setMessages(data.conversation.messages || [])
    }

    const onMessage = (msg: ChatMessage) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === msg.id)) return prev
        return [...prev, msg]
      })
      setOtherTyping(false)
    }

    const onTyping = (data: { role: string; isTyping: boolean }) => {
      setOtherTyping(data.isTyping)
      if (data.isTyping && typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
      if (data.isTyping) {
        typingTimeoutRef.current = setTimeout(() => setOtherTyping(false), 4000)
      }
    }

    const onPresence = (data: { role: string; online: boolean }) => {
      setOtherOnline(data.online)
    }

    const onMessagesRead = () => {
      // Could update read receipts
    }

    const onVendorConversations = (data: { conversations: Conversation[] }) => {
      setConversations(data.conversations)
    }

    const onError = (err: { message: string }) => {
      console.error('Chat error:', err.message)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('conversation-loaded', onConversationLoaded)
    socket.on('message', onMessage)
    socket.on('typing', onTyping)
    socket.on('presence', onPresence)
    socket.on('messages-read', onMessagesRead)
    socket.on('vendor-conversations', onVendorConversations)
    socket.on('error', onError)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('conversation-loaded', onConversationLoaded)
      socket.off('message', onMessage)
      socket.off('typing', onTyping)
      socket.off('presence', onPresence)
      socket.off('messages-read', onMessagesRead)
      socket.off('vendor-conversations', onVendorConversations)
      socket.off('error', onError)
    }
  }, [])

  const joinConversation = useCallback((params: JoinParams) => {
    const socket = getSocket()
    if (socket.connected) {
      socket.emit('join-conversation', params)
    } else {
      socket.once('connect', () => {
        socket.emit('join-conversation', params)
      })
    }
  }, [])

  const sendMessage = useCallback(
    (content: string, attachment?: ChatMessage['attachment']) => {
      const socket = getSocket()
      if (!content.trim() && !attachment) return
      socket.emit('send-message', { content: content.trim(), attachment })
    },
    []
  )

  const setTyping = useCallback((isTyping: boolean) => {
    const socket = getSocket()
    socket.emit('typing', { isTyping })
  }, [])

  const fetchVendorConversations = useCallback((vendorSlug: string) => {
    const socket = getSocket()
    if (socket.connected) {
      socket.emit('get-vendor-conversations', { vendorSlug })
    } else {
      socket.once('connect', () => {
        socket.emit('get-vendor-conversations', { vendorSlug })
      })
    }
  }, [])

  const markRead = useCallback((conversationId: string) => {
    const socket = getSocket()
    socket.emit('mark-read', { conversationId })
  }, [])

  return {
    isConnected,
    conversation,
    messages,
    otherTyping,
    otherOnline,
    conversations,
    joinConversation,
    sendMessage,
    setTyping,
    fetchVendorConversations,
    markRead,
  }
}
