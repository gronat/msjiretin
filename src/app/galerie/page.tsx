import { Container, Typography, Card, CardMedia, CardContent, Box } from '@mui/material'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function GalleryPage() {
  const albums = await prisma.album.findMany({
    where: { published: true },
    include: {
      photos: {
        take: 1,
        orderBy: { order: 'asc' }
      }
    },
    orderBy: { order: 'asc' }
  })

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
        Fotogalerie
      </Typography>

      {albums.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            Zatím nejsou k dispozici žádné fotografie.
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 4,
          }}
        >
          {albums.map((album) => (
            <Link key={album.id} href={`/galerie/${album.slug}`} style={{ textDecoration: 'none' }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.15s ease', '&:hover': { transform: 'translateY(-2px)' } }}>
                <CardMedia
                  component="div"
                  sx={{
                    height: 240,
                    bgcolor: 'grey.200',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {album.coverPhoto ? (
                    <img
                      src={album.coverPhoto}
                      alt={album.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Bez náhledu
                    </Typography>
                  )}
                </CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom color="text.primary">
                    {album.name}
                  </Typography>
                  {album.description && (
                    <Typography variant="body2" color="text.secondary">
                      {album.description}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </Box>
      )}
    </Container>
  )
}

