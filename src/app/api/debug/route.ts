import { existsSync, readdirSync, statSync } from 'fs'
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

  let dbSize = 0
  try {
    dbSize = statSync(dbPath).size
  } catch {
    dbSize = -1
  }

  return Response.json({
    cwd,
    prismaDir,
    dbPath,
    dbExists: existsSync(dbPath),
    dbSize,
    prismaFiles,
    env: {
      DATABASE_URL: process.env.DATABASE_URL ? '***set***' : '***not set***',
      AUTH_SECRET: process.env.AUTH_SECRET ? '***set***' : '***not set***',
      AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST,
      NODE_ENV: process.env.NODE_ENV,
    },
  })
}
