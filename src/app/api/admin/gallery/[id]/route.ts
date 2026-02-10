import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import fs from 'fs/promises'
import path from 'path'

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const formData = await request.formData()

    const name = String(formData.get('name') ?? '').trim()
    const slugInput = String(formData.get('slug') ?? '').trim()
    const description = String(formData.get('description') ?? '').trim()
    const coverPhoto = String(formData.get('coverPhoto') ?? '').trim()
    const orderValue = String(formData.get('order') ?? '').trim()
    const published = formData.get('published') === 'on'

    if (!name) {
      return NextResponse.json({ error: 'Název je povinný' }, { status: 400 })
    }

    const album = await prisma.album.findUnique({ where: { id } })
    if (!album) {
      return NextResponse.json({ error: 'Album nenalezeno' }, { status: 404 })
    }

    // Build unique slug if changed
    let slug = album.slug
    if (slugInput && slugInput !== album.slug) {
      const baseSlug = slugify(slugInput)
      let newSlug = baseSlug
      let counter = 2
      while (await prisma.album.findFirst({ where: { slug: newSlug, id: { not: id } } })) {
        newSlug = `${baseSlug}-${counter}`
        counter += 1
      }
      slug = newSlug
    }

    const order = orderValue ? Number(orderValue) : 0

    await prisma.album.update({
      where: { id },
      data: {
        name,
        slug,
        description: description || null,
        coverPhoto: coverPhoto || null,
        order: Number.isFinite(order) ? order : 0,
        published,
      },
    })

    revalidatePath('/galerie')
    revalidatePath('/admin/gallery')
    revalidatePath(`/admin/gallery/${id}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating album:', error)
    return NextResponse.json(
      { error: 'Chyba při ukládání' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const album = await prisma.album.findUnique({
      where: { id },
      include: { photos: true },
    })

    if (!album) {
      return NextResponse.json({ error: 'Album nenalezeno' }, { status: 404 })
    }

    // Delete all photos from filesystem
    for (const photo of album.photos) {
      const filePath = path.join(process.cwd(), 'public', photo.path)
      try {
        await fs.unlink(filePath)
      } catch (err) {
        console.warn('Could not delete photo file:', filePath, err)
      }
    }

    // Delete album directory
    const albumDir = path.join(process.cwd(), 'public', 'uploads', 'albums', id)
    try {
      await fs.rm(albumDir, { recursive: true, force: true })
    } catch (err) {
      console.warn('Could not delete album directory:', albumDir, err)
    }

    // Delete cover photo if it's a local file
    if (album.coverPhoto && album.coverPhoto.startsWith('/uploads/')) {
      const coverPhotoPath = path.join(process.cwd(), 'public', album.coverPhoto)
      try {
        await fs.unlink(coverPhotoPath)
      } catch (err) {
        console.warn('Could not delete cover photo:', coverPhotoPath, err)
      }
    }

    // Delete from database (photos will be deleted via cascade)
    await prisma.album.delete({
      where: { id },
    })

    revalidatePath('/galerie')
    revalidatePath('/admin/gallery')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting album:', error)
    return NextResponse.json(
      { error: 'Chyba při mazání' },
      { status: 500 }
    )
  }
}

