import { Container, Typography, Box } from '@mui/material'
import { prisma } from '@/lib/prisma'
import StaffEditor from '@/components/admin/StaffEditor'
import { ensureStaffRoles } from '@/lib/staff'

export default async function AdminStaffPage() {
  await ensureStaffRoles()
  type StaffRoleData = {
    id: string
    key: string
    name: string
    order: number
    members: { id: string; name: string; order: number }[]
  }

  const roles = await (prisma as unknown as { staffRole: { findMany: Function } }).staffRole.findMany({
    orderBy: { order: 'asc' },
    include: {
      members: {
        orderBy: { order: 'asc' },
      },
    },
  }) as StaffRoleData[]

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Zaměstnanci
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Upravte názvy rolí a seznam zaměstnanců zobrazovaných na úvodní stránce.
        </Typography>
      </Box>

      <StaffEditor roles={roles} />
    </Container>
  )
}
