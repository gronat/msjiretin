import { prisma } from '@/lib/prisma'
import { Container, Typography, Box, Divider, Paper } from '@mui/material'
import { redirect } from 'next/navigation'
import PhotoUpload from '@/components/admin/PhotoUpload'
import AlbumEditForm from '@/components/admin/AlbumEditForm'
import PhotoList from '@/components/admin/PhotoList'
import CoverPhotoUpload from '@/components/admin/CoverPhotoUpload'
import LinkButton from '@/components/LinkButton'

export default async function EditAlbumPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const album = await prisma.album.findUnique({
    where: { id },
    include: { photos: { orderBy: { createdAt: 'desc' } } },
  })

  if (!album) {
    redirect('/admin/gallery')
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Editace alba
        </Typography>
        <LinkButton href="/admin/gallery" variant="outlined">
          Zpět na alba
        </LinkButton>
      </Box>

      {/* Editace alba */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          Základní informace
        </Typography>
        <AlbumEditForm album={album} />
      </Paper>

      {/* Titulní foto */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Titulní fotografie
        </Typography>
        <CoverPhotoUpload albumId={album.id} currentCoverPhoto={album.coverPhoto} />
      </Paper>

      <Divider sx={{ my: 4 }} />

      {/* Nahrávání nových fotek */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Nahrát nové fotografie
        </Typography>
        <PhotoUpload albumId={album.id} />
      </Paper>

      <Divider sx={{ my: 4 }} />

      {/* Seznam fotek */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          Fotografie v albu ({album.photos.length})
        </Typography>
        <PhotoList photos={album.photos} albumId={album.id} />
      </Paper>
    </Container>
  )
}
