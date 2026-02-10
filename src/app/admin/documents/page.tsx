import { Container, Typography, Box } from '@mui/material'
import { Add } from '@mui/icons-material'
import { prisma } from '@/lib/prisma'
import DocumentsTable from '@/components/admin/DocumentsTable'
import LinkButton from '@/components/LinkButton'

export const dynamic = 'force-dynamic'

export default async function AdminDocumentsPage() {
  const documents = await prisma.document.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
  const svpCategory = 'školní vzdělávací plán'
  const svpDocuments = documents.filter(
    (doc) => (doc.category || '').trim().toLowerCase() === svpCategory
  )
  const generalDocuments = documents.filter(
    (doc) => (doc.category || '').trim().toLowerCase() !== svpCategory
  )

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Dokumenty
        </Typography>
        <LinkButton
          href="/admin/documents/new"
          variant="contained"
          startIcon={<Add />}
        >
          Nahrát dokument
        </LinkButton>
      </Box>

      <DocumentsTable documents={generalDocuments} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 6, mb: 3 }}>
        <Typography variant="h5" component="h2">
          Školní vzdělávací plán
        </Typography>
        <LinkButton
          href={`/admin/documents/new?category=${encodeURIComponent('Školní vzdělávací plán')}`}
          variant="outlined"
          startIcon={<Add />}
        >
          Nahrát dokument ŠVP
        </LinkButton>
      </Box>

      <DocumentsTable documents={svpDocuments} />
    </Container>
  )
}

