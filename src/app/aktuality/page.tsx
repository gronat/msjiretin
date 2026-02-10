import { prisma } from '@/lib/prisma'
import { Container, Typography, Card, CardContent, Box, Divider } from '@mui/material'
import { unstable_noStore as noStore } from 'next/cache'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function NewsPage() {
  noStore()
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
  })

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Aktuality
      </Typography>
      <Divider sx={{ mb: 4 }} />

      {posts.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          Zatím zde nejsou žádné aktuality. Přidejte první zprávu v administraci.
        </Typography>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          {posts.map((post) => (
            <Link key={post.id} href={`/aktuality/${post.slug}`} style={{ textDecoration: 'none' }}>
              <Card sx={{ transition: 'transform 0.15s ease', '&:hover': { transform: 'translateY(-2px)' } }}>
                <CardContent>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                    {new Date(post.publishedAt ?? post.createdAt).toLocaleDateString('cs-CZ')}
                  </Typography>
                  <Typography variant="h5" gutterBottom color="text.primary">
                    {post.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {(post.excerpt ?? post.content).slice(0, 220) + '...'}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Box>
      )}
    </Container>
  )
}

