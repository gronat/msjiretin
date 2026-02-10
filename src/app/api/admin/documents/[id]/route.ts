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

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const formData = await request.formData()
  const title = String(formData.get('title') ?? '').trim()
  const description = String(formData.get('description') ?? '').trim()
  const category = String(formData.get('category') ?? '').trim()
  const file = formData.get('file') as File | null

  if (!title) {
    return NextResponse.json({ error: 'Chybí název' }, { status: 400 })
  }

  const document = await prisma.document.findUnique({ where: { id } })
  if (!document) {
    return NextResponse.json({ error: 'Dokument nenalezen' }, { status: 404 })
  }

  let updateData: {
    title: string
    description: string | null
    category: string | null
    filename?: string
    path?: string
    size?: number
  } = {
    title,
    description: description || null,
    category: category || null,
  }

  if (file && file.size > 0) {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'documents')
    await fs.mkdir(uploadDir, { recursive: true })

    const filename = sanitizeFilename(file.name)
    const filePath = path.join(uploadDir, filename)
    const buffer = Buffer.from(await file.arrayBuffer())
    await fs.writeFile(filePath, buffer)

    const dbPath = `/uploads/documents/${filename}`
    updateData = {
      ...updateData,
      filename,
      path: dbPath,
      size: file.size,
    }

    if (document.path?.startsWith('/uploads/')) {
      const oldPath = path.join(process.cwd(), 'public', document.path)
      await fs.unlink(oldPath).catch(() => null)
    }
  }

  await prisma.document.update({
    where: { id },
    data: updateData,
  })

  return NextResponse.json({ ok: true })
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const document = await prisma.document.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      filename: true,
    },
  })

  if (!document) {
    return NextResponse.json({ error: 'Dokument nenalezen' }, { status: 404 })
  }

  return NextResponse.json(document)
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const document = await prisma.document.findUnique({ where: { id } })
  if (!document) {
    return NextResponse.json({ error: 'Dokument nenalezen' }, { status: 404 })
  }

  if (document.path?.startsWith('/uploads/')) {
    const filePath = path.join(process.cwd(), 'public', document.path)
    await fs.unlink(filePath).catch(() => null)
  }

  await prisma.document.delete({ where: { id } })

  return NextResponse.json({ ok: true })
}

