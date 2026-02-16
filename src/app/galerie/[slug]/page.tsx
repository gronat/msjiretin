import { prisma } from '@/lib/prisma'
import { Container, Typography, Box, Card, CardMedia, CardContent, Divider } from '@mui/material'
import { notFound } from 'next/navigation'
import LinkButton from '@/components/LinkButton'
import { unstable_noStore as noStore } from 'next/cache'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const album = await prisma.album.findUnique({
    where: { slug },
    select: { name: true, description: true, coverPhoto: true },
  })

  if (!album || !album) return { title: 'Album nenalezeno' }

  const ogImages = album.coverPhoto
    ? [{ url: album.coverPhoto }]
    : [{ url: '/og-msjiretin.jpg', width: 1200, height: 630, alt: 'MŠ Jiřetín pod Jedlovou – SMÍŠEK' }]

  return {
    title: album.name,
    description: album.description || `Fotogalerie ${album.name} - MŠ Jiřetín pod Jedlovou`,
    alternates: { canonical: `/galerie/${slug}` },
    openGraph: {
      title: album.name,
      description: album.description || `Fotogalerie ${album.name}`,
      images: ogImages,
    },
    twitter: {
      card: 'summary',
      title: album.name,
      description: album.description || `Fotogalerie ${album.name}`,
      images: album.coverPhoto ? [album.coverPhoto] : ['/og-msjiretin.jpg'],
    },
  }
}

export default async function GalleryAlbumPage({ params }: { params: Promise<{ slug: string }> }) {
  noStore()
  const { slug } = await params
  const album = await prisma.album.findUnique({
    where: { slug },
    include: { photos: { orderBy: { createdAt: 'desc' } } },
  })

  if (!album || !album.published) {
    notFound()
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        {album.name}
      </Typography>
      {album.description && (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {album.description}
        </Typography>
      )}
      <Divider sx={{ mb: 4 }} />

      {album.photos.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          V tomto albu zatím nejsou žádné fotografie.
        </Typography>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 2,
          }}
        >
          {album.photos.map((photo) => (
            <Card key={photo.id}>
              <CardMedia component="img" height="200" image={photo.path} alt={photo.title} />
              <CardContent>
                <Typography variant="body2" noWrap>
                  {photo.title}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      <Box sx={{ mt: 4 }}>
        <LinkButton href="/galerie" variant="outlined">
          Zpět na galerie
        </LinkButton>
      </Box>
    </Container>
  )
}

