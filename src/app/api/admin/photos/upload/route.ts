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
  const albumId = String(formData.get('albumId') ?? '').trim()
  const files = formData.getAll('files') as File[]

  if (!albumId || files.length === 0) {
    return NextResponse.json({ error: 'Chybí album nebo soubory' }, { status: 400 })
  }

  const album = await prisma.album.findUnique({ where: { id: albumId } })
  if (!album) {
    return NextResponse.json({ error: 'Album nenalezeno' }, { status: 404 })
  }

  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'albums', albumId)
  await fs.mkdir(uploadDir, { recursive: true })

  const created = []
  for (const file of files) {
    if (!file || file.size === 0) continue
    const filename = sanitizeFilename(file.name)
    const filePath = path.join(uploadDir, filename)
    const buffer = Buffer.from(await file.arrayBuffer())
    await fs.writeFile(filePath, buffer)

    const dbPath = `/uploads/albums/${albumId}/${filename}`
    const photo = await prisma.photo.create({
      data: {
        title: file.name,
        filename,
        path: dbPath,
        albumId,
      },
    })
    created.push(photo)
  }

  return NextResponse.json({ uploaded: created.length })
}

