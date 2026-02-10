import { prisma } from '@/lib/prisma'

export const STAFF_ROLE_KEYS = {
  director: 'director',
  teachers: 'teachers',
  janitor: 'janitor',
  kitchen: 'kitchen',
} as const

export type StaffRoleKey = typeof STAFF_ROLE_KEYS[keyof typeof STAFF_ROLE_KEYS]

export const STAFF_ROLE_DEFAULTS: { key: StaffRoleKey; name: string; order: number }[] = [
  { key: STAFF_ROLE_KEYS.director, name: 'Ředitelka', order: 1 },
  { key: STAFF_ROLE_KEYS.teachers, name: 'Učitelky', order: 2 },
  { key: STAFF_ROLE_KEYS.janitor, name: 'Školnice', order: 3 },
  { key: STAFF_ROLE_KEYS.kitchen, name: 'Výdejářka', order: 4 },
]

export async function ensureStaffRoles() {
  const existing = await prisma.staffRole.findMany({
    select: { key: true },
  })
  const existingKeys = new Set(existing.map((role) => role.key))
  const missing = STAFF_ROLE_DEFAULTS.filter((role) => !existingKeys.has(role.key))

  if (missing.length === 0) return

  await prisma.staffRole.createMany({
    data: missing,
  })
}
