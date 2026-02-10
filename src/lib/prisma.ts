import { PrismaClient } from '@prisma/client'
import path from 'path'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Resolve the database path as absolute so it works regardless of Prisma's
// engine location (important for production on Render.com with SQLite)
const dbPath = `file:${path.join(process.cwd(), 'prisma', 'dev.db')}`

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: dbPath,
      },
    },
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

