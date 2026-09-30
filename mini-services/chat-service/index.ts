import { createServer } from 'http'
import { Server } from 'socket.io'

const httpServer = createServer()
const io = new Server(httpServer, {
  // DO NOT change the path — Caddy uses it to forward to the correct port
  path: '/',
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  pingTimeout: 60000,
  pingInterval: 25000,
})

// ===== Types =====
interface ChatMessage {
  id: string
  conversationId: string
  sender: 'customer' | 'vendor'
  senderName: string
  content: string
  timestamp: string
  attachment?: { type: 'image' | 'quote'; url?: string; label?: string }
}

interface Conversation {
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

// ===== In-memory store (MVP) =====
const conversations = new Map<string, Conversation>()

// Map of socket.id -> { conversationId, role }
const socketSessions = new Map<string, { conversationId: string; role: 'customer' | 'vendor' }>()

const genId = () => `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`

function getOrCreateConversation(data: {
  vendorSlug: string
  vendorName: string
  customerName: string
  customerPhone: string
  eventDate?: string
  eventType?: string
}): Conversation {
  // Conversation ID = vendorSlug + customerPhone (stable per customer-vendor pair)
  const id = `${data.vendorSlug}__${data.customerPhone}`.replace(/[^a-zA-Z0-9_-]/g, '_')
  let conv = conversations.get(id)
  if (!conv) {
    const now = new Date().toISOString()
    conv = {
      id,
      vendorSlug: data.vendorSlug,
      vendorName: data.vendorName,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      eventDate: data.eventDate,
      eventType: data.eventType,
      status: 'active',
      createdAt: now,
      lastMessageAt: now,
      messages: [],
    }
    conversations.set(id, conv)
    console.log(`📝 New conversation created: ${id} (${data.customerName} ↔ ${data.vendorName})`)
  }
  return conv
}

io.on('connection', (socket) => {
  console.log(`✅ Socket connected: ${socket.id}`)

  // Join a conversation room
  socket.on(
    'join-conversation',
    (data: {
      vendorSlug: string
      vendorName: string
      customerName: string
      customerPhone: string
      role: 'customer' | 'vendor'
      eventDate?: string
      eventType?: string
    }) => {
      const conv = getOrCreateConversation({
        vendorSlug: data.vendorSlug,
        vendorName: data.vendorName,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        eventDate: data.eventDate,
        eventType: data.eventType,
      })

      socketSessions.set(socket.id, { conversationId: conv.id, role: data.role })
      socket.join(conv.id)

      // Send conversation history + info
      socket.emit('conversation-loaded', {
        conversation: conv,
      })

      // Notify the other party that someone joined/online
      socket.to(conv.id).emit('presence', {
        role: data.role,
        online: true,
        timestamp: new Date().toISOString(),
      })

      console.log(
        `👥 ${data.role} "${data.customerName}" joined conversation ${conv.id}`
      )
    }
  )

  // Send a message
  socket.on(
    'send-message',
    (data: { content: string; attachment?: ChatMessage['attachment'] }) => {
      const session = socketSessions.get(socket.id)
      if (!session) {
        socket.emit('error', { message: 'Not joined to a conversation' })
        return
      }
      const conv = conversations.get(session.conversationId)
      if (!conv) {
        socket.emit('error', { message: 'Conversation not found' })
        return
      }

      const senderName =
        session.role === 'vendor' ? conv.vendorName : conv.customerName

      const message: ChatMessage = {
        id: genId(),
        conversationId: conv.id,
        sender: session.role,
        senderName,
        content: data.content,
        timestamp: new Date().toISOString(),
        attachment: data.attachment,
      }

      conv.messages.push(message)
      conv.lastMessageAt = message.timestamp

      // Broadcast to everyone in the room (sender + other party)
      io.to(conv.id).emit('message', message)

      console.log(
        `💬 [${conv.id}] ${session.role} ${senderName}: ${data.content.slice(0, 50)}`
      )
    }
  )

  // Typing indicator
  socket.on('typing', (data: { isTyping: boolean }) => {
    const session = socketSessions.get(socket.id)
    if (!session) return
    socket.to(session.conversationId).emit('typing', {
      role: session.role,
      isTyping: data.isTyping,
    })
  })

  // Get all conversations for a vendor (vendor dashboard)
  socket.on('get-vendor-conversations', (data: { vendorSlug: string }) => {
    const vendorConvs: Conversation[] = []
    conversations.forEach((c) => {
      if (c.vendorSlug === data.vendorSlug) vendorConvs.push(c)
    })
    vendorConvs.sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime())
    socket.emit('vendor-conversations', { conversations: vendorConvs })
  })

  // Mark messages as read
  socket.on('mark-read', (data: { conversationId: string }) => {
    const session = socketSessions.get(socket.id)
    if (!session) return
    socket.to(data.conversationId).emit('messages-read', {
      role: session.role,
      timestamp: new Date().toISOString(),
    })
  })

  // Disconnect
  socket.on('disconnect', () => {
    const session = socketSessions.get(socket.id)
    if (session) {
      socket.to(session.conversationId).emit('presence', {
        role: session.role,
        online: false,
        timestamp: new Date().toISOString(),
      })
      socketSessions.delete(socket.id)
      console.log(`👋 Socket disconnected: ${socket.id} (${session.role})`)
    } else {
      console.log(`👋 Socket disconnected: ${socket.id}`)
    }
  })

  socket.on('error', (error) => {
    console.error(`❌ Socket error (${socket.id}):`, error)
  })
})

const PORT = 3003
httpServer.listen(PORT, () => {
  console.log(`💍 ShaadiSet Chat Service running on port ${PORT}`)
  console.log(`   WebSocket endpoint: /?XTransformPort=${PORT}`)
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down...')
  httpServer.close(() => process.exit(0))
})
process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down...')
  httpServer.close(() => process.exit(0))
})
