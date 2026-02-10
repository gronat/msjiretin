import { Container, Typography, Paper, List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material'
import { Description, PictureAsPdf } from '@mui/icons-material'
import { prisma } from '@/lib/prisma'
import SVPSection from '@/components/SVPSection'
import GDPRSection from '@/components/GDPRSection'

export default async function DocumentsPage() {
  const documents = await prisma.document.findMany({
    orderBy: { createdAt: 'desc' }
  })
  const svpCategory = 'školní vzdělávací plán'
  const svpDocuments = documents
    .filter((doc) => (doc.category || '').trim().toLowerCase() === svpCategory)
    .map((doc) => ({
      id: doc.id,
      title: doc.title,
      description: doc.description,
      filename: doc.filename,
      path: doc.path,
      size: doc.size,
    }))
  const generalDocuments = documents.filter(
    (doc) => (doc.category || '').trim().toLowerCase() !== svpCategory
  )

  const formatFileSize = (bytes?: number | null) => {
    if (!bytes) return ''
    const mb = bytes / (1024 * 1024)
    return mb < 1 ? `${(bytes / 1024).toFixed(0)} KB` : `${mb.toFixed(2)} MB`
  }

  const getFileIcon = (filename: string) => {
    if (filename.endsWith('.pdf')) return <PictureAsPdf />
    return <Description />
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
        Dokumenty ke stažení
      </Typography>

      {/* ŠVP Section */}
      <SVPSection documents={svpDocuments} />

      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom color="primary" sx={{ mb: 3 }}>
          Dokumenty ke stažení
        </Typography>

        {generalDocuments.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              Zatím nejsou k dispozici žádné dokumenty.
            </Typography>
          </Box>
        ) : (
          <List>
            {generalDocuments.map((doc) => (
              <ListItem
                key={doc.id}
                sx={{
                  border: '1px solid #e0e0e0',
                  borderRadius: 1,
                  mb: 1,
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon>
                  {getFileIcon(doc.filename)}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <a href={doc.path} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                      {doc.title}
                    </a>
                  }
                  secondary={
                    <>
                      {doc.description && <span>{doc.description} • </span>}
                      {formatFileSize(doc.size)}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      {/* GDPR Section */}
      <GDPRSection />
    </Container>
  )
}

