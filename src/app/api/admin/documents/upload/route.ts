import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import path from 'path'
import fs from 'fs/promises'

export const runtime = 'nodejs'

function sanitizeFilename(filename: string) {
  const safe = filename.replace(/[^a-zA-Z0-9._-]/g, '-')
  const timestamp = Date.now()
  return `${timestamp}-${safe}`
}

export async function POST(request: Request) {
  const formData = await request.formData()
  const title = String(formData.get('title') ?? '').trim()
  const description = String(formData.get('description') ?? '').trim()
  const category = String(formData.get('category') ?? '').trim()
  const file = formData.get('file') as File | null

  if (!title || !file) {
    return NextResponse.json({ error: 'Chybí název nebo soubor' }, { status: 400 })
  }

  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'documents')
  await fs.mkdir(uploadDir, { recursive: true })

  const filename = sanitizeFilename(file.name)
  const filePath = path.join(uploadDir, filename)
  const buffer = Buffer.from(await file.arrayBuffer())
  await fs.writeFile(filePath, buffer)

  const dbPath = `/uploads/documents/${filename}`
  const doc = await prisma.document.create({
    data: {
      title,
      description: description || null,
      category: category || null,
      filename,
      path: dbPath,
      size: file.size,
    },
  })

  return NextResponse.json({ id: doc.id })
}

