import { existsSync, readdirSync, statSync, accessSync, constants, readFileSync } from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

export async function GET() {
  const cwd = process.cwd()
  const prismaDir = path.join(cwd, 'prisma')
  const dbPath = path.join(prismaDir, 'dev.db')

  let prismaFiles: string[] = []
  try {
    prismaFiles = readdirSync(prismaDir)
  } catch (e: unknown) {
    prismaFiles = [`error: ${e instanceof Error ? e.message : String(e)}`]
  }

  let dbSize = -1
  let dbMode = ''
  try {
    const s = statSync(dbPath)
    dbSize = s.size
    dbMode = '0' + (s.mode & 0o777).toString(8)
  } catch {}

  let readable = false
  let writable = false
  try { accessSync(dbPath, constants.R_OK); readable = true } catch {}
  try { accessSync(dbPath, constants.W_OK); writable = true } catch {}

  let dirWritable = false
  try { accessSync(prismaDir, constants.W_OK); dirWritable = true } catch {}

  // Check if file starts with SQLite magic header
  let sqliteHeader = ''
  try {
    const buf = readFileSync(dbPath).subarray(0, 16)
    sqliteHeader = buf.toString('ascii').substring(0, 15)
  } catch {}

  // Try a simple Prisma query
  let dbTest = 'not tested'
  try {
    const { prisma } = await import('@/lib/prisma')
    const count = await prisma.user.count()
    dbTest = `OK - ${count} users`
  } catch (e: unknown) {
    dbTest = `ERROR: ${e instanceof Error ? e.message : String(e)}`
  }

  return Response.json({
    cwd,
    dbPath,
    dbExists: existsSync(dbPath),
    dbSize,
    dbMode,
    readable,
    writable,
    dirWritable,
    sqliteHeader,
    dbTest,
    prismaFiles,
    env: {
      DATABASE_URL: process.env.DATABASE_URL,
      AUTH_SECRET: process.env.AUTH_SECRET ? '***set***' : '***not set***',
      AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST,
      NODE_ENV: process.env.NODE_ENV,
    },
  })
}
