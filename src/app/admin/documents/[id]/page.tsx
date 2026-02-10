import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { Container, Typography } from '@mui/material'
import DocumentEditForm from '@/components/admin/DocumentEditForm'

export const dynamic = 'force-dynamic'

export default async function EditDocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const doc = await prisma.document.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      filename: true,
    },
  })

  if (!doc) {
    redirect('/admin/documents')
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Upravit dokument
      </Typography>
      <DocumentEditForm doc={doc} />
    </Container>
  )
}

