import { Container, Typography, Box } from '@mui/material'
import { Add } from '@mui/icons-material'
import { prisma } from '@/lib/prisma'
import AlbumsList from '@/components/admin/AlbumsList'
import LinkButton from '@/components/LinkButton'

export const dynamic = 'force-dynamic'

export default async function AdminGalleryPage() {
  const albums = await prisma.album.findMany({
    include: {
      _count: {
        select: { photos: true },
      },
    },
    orderBy: {
      order: 'asc',
    },
  })

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Fotogalerie
        </Typography>
        <LinkButton
          href="/admin/gallery/new"
          variant="contained"
          startIcon={<Add />}
        >
          Nové album
        </LinkButton>
      </Box>

      <AlbumsList albums={albums} />
    </Container>
  )
}
