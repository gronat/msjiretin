import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import fs from 'fs/promises'
import path from 'path'

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const photo = await prisma.photo.findUnique({
      where: { id },
      include: { album: true },
    })

    if (!photo) {
      return NextResponse.json({ error: 'Fotografie nenalezena' }, { status: 404 })
    }

    // Delete file from filesystem
    const filePath = path.join(process.cwd(), 'public', photo.path)
    try {
      await fs.unlink(filePath)
    } catch (err) {
      // File might not exist, continue anyway
      console.warn('Could not delete file:', filePath, err)
    }

    // Delete from database
    await prisma.photo.delete({
      where: { id },
    })

    revalidatePath('/galerie')
    revalidatePath('/admin/gallery')
    if (photo.album) {
      revalidatePath(`/admin/gallery/${photo.album.id}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting photo:', error)
    return NextResponse.json(
      { error: 'Chyba při mazání' },
      { status: 500 }
    )
  }
}

