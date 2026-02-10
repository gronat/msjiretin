import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import fs from 'fs/promises'
import path from 'path'

function sanitizeFilename(filename: string) {
  const safe = filename.replace(/[^a-zA-Z0-9.-]/g, '_')
  const timestamp = Date.now()
  return `${timestamp}-${safe}`
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const albumId = String(formData.get('albumId') ?? '').trim()
    const file = formData.get('file') as File | null

    if (!albumId || !file || file.size === 0) {
      return NextResponse.json({ error: 'Chybí album nebo soubor' }, { status: 400 })
    }

    const album = await prisma.album.findUnique({ where: { id: albumId } })
    if (!album) {
      return NextResponse.json({ error: 'Album nenalezeno' }, { status: 404 })
    }

    // Delete old cover photo if it exists and is a local file
    if (album.coverPhoto && album.coverPhoto.startsWith('/uploads/')) {
      const oldFilePath = path.join(process.cwd(), 'public', album.coverPhoto)
      try {
        await fs.unlink(oldFilePath)
      } catch (err) {
        // File might not exist, continue anyway
        console.warn('Could not delete old cover photo:', oldFilePath, err)
      }
    }

    // Upload new cover photo
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'albums', albumId)
    await fs.mkdir(uploadDir, { recursive: true })

    const filename = sanitizeFilename(file.name)
    const filePath = path.join(uploadDir, filename)
    const buffer = Buffer.from(await file.arrayBuffer())
    await fs.writeFile(filePath, buffer)

    const dbPath = `/uploads/albums/${albumId}/${filename}`

    // Update album with new cover photo
    await prisma.album.update({
      where: { id: albumId },
      data: { coverPhoto: dbPath },
    })

    revalidatePath('/galerie')
    revalidatePath('/admin/gallery')
    revalidatePath(`/admin/gallery/${albumId}`)

    return NextResponse.json({ success: true, path: dbPath })
  } catch (error) {
    console.error('Error uploading cover photo:', error)
    return NextResponse.json(
      { error: 'Chyba při nahrávání' },
      { status: 500 }
    )
  }
}

