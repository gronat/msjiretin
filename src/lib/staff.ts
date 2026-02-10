import { prisma } from '@/lib/prisma'

export const STAFF_ROLE_KEYS = {
  director: 'director',
  teachers: 'teachers',
  assistant: 'assistant',
  janitor: 'janitor',
  kitchen: 'kitchen',
} as const

export type StaffRoleKey = typeof STAFF_ROLE_KEYS[keyof typeof STAFF_ROLE_KEYS]

export const STAFF_ROLE_DEFAULTS: { key: StaffRoleKey; name: string; order: number }[] = [
  { key: STAFF_ROLE_KEYS.director, name: 'Ředitelka', order: 1 },
  { key: STAFF_ROLE_KEYS.teachers, name: 'Učitelky', order: 2 },
  { key: STAFF_ROLE_KEYS.assistant, name: 'Asistent pedagoga', order: 3 },
  { key: STAFF_ROLE_KEYS.janitor, name: 'Školnice', order: 4 },
  { key: STAFF_ROLE_KEYS.kitchen, name: 'Výdejářka', order: 5 },
]

export async function ensureStaffRoles() {
  await Promise.all(
    STAFF_ROLE_DEFAULTS.map((role) =>
      prisma.staffRole.upsert({
        where: { key: role.key },
        create: role,
        update: { name: role.name, order: role.order },
      }),
    ),
  )
}
