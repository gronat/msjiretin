import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const roleId = String(body?.roleId ?? '').trim()
  const name = String(body?.name ?? '').trim()
  const order = Number.isFinite(body?.order) ? Number(body.order) : 0

  if (!roleId || !name) {
    return NextResponse.json({ error: 'Chybí role nebo jméno' }, { status: 400 })
  }

  const member = await prisma.staffMember.create({
    data: { roleId, name, order },
  })

  return NextResponse.json({ id: member.id })
}
