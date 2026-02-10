import { PrismaClient } from '@prisma/client'
import path from 'path'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Force absolute DATABASE_URL so the Prisma engine resolves it correctly
const absDbPath = path.join(process.cwd(), 'prisma', 'dev.db')
process.env.DATABASE_URL = `file:${absDbPath}`

console.log('[Prisma] DATABASE_URL set to:', process.env.DATABASE_URL)

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

// Cache in all environments to avoid multiple clients
globalForPrisma.prisma = prisma

