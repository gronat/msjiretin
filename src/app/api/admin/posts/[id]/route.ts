import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const post = await prisma.post.findUnique({
      where: { id },
    })

    if (!post) {
      return NextResponse.json({ error: 'Příspěvek nenalezen' }, { status: 404 })
    }

    await prisma.post.delete({
      where: { id },
    })

    revalidatePath('/')
    revalidatePath('/aktuality')
    revalidatePath('/admin/posts')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json(
      { error: 'Chyba při mazání' },
      { status: 500 }
    )
  }
}

