import { PrismaClient } from '@prisma/client'

// Cache-bust: increment this to force new PrismaClient instance after schema changes
const PRISMA_CACHE_VERSION = 2

const globalForPrisma = globalThis as unknown as {
  __prismaCacheVersion?: number
  prisma: PrismaClient | undefined
}

// If the cache version changed, create a new instance
if (globalForPrisma.__prismaCacheVersion !== PRISMA_CACHE_VERSION) {
  globalForPrisma.prisma = undefined
  globalForPrisma.__prismaCacheVersion = PRISMA_CACHE_VERSION
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
