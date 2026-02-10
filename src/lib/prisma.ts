import { PrismaClient } from '@prisma/client'
import path from 'path'
import { existsSync } from 'fs'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Resolve the database path as absolute so it works regardless of Prisma's
// engine location (important for production on Render.com with SQLite)
const dbPath = path.join(process.cwd(), 'prisma', 'dev.db')
const dbUrl = `file:${dbPath}`

// Log database path info for debugging on Render
console.log('[Prisma] cwd:', process.cwd())
console.log('[Prisma] DB path:', dbPath)
console.log('[Prisma] DB exists:', existsSync(dbPath))
console.log('[Prisma] DATABASE_URL env:', process.env.DATABASE_URL)

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

