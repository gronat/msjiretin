import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json().catch(() => ({}))
  const name = String(body?.name ?? '').trim()
  const order = Number.isFinite(body?.order) ? Number(body.order) : undefined

  if (!name) {
    return NextResponse.json({ error: 'Chybí jméno' }, { status: 400 })
  }

  await prisma.staffMember.update({
    where: { id },
    data: {
      name,
      ...(order === undefined ? {} : { order }),
    },
  })

  return NextResponse.json({ ok: true })
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  await prisma.staffMember.delete({ where: { id } })

  return NextResponse.json({ ok: true })
}
