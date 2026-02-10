import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json().catch(() => ({}))
  const name = String(body?.name ?? '').trim()

  if (!name) {
    return NextResponse.json({ error: 'Chybí název role' }, { status: 400 })
  }

  await prisma.staffRole.update({
    where: { id },
    data: { name },
  })

  return NextResponse.json({ ok: true })
}
