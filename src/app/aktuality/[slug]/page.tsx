import { prisma } from '@/lib/prisma'
import { Container, Typography, Box, Divider } from '@mui/material'
import { notFound } from 'next/navigation'
import LinkButton from '@/components/LinkButton'
import { unstable_noStore as noStore } from 'next/cache'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await prisma.post.findFirst({
    where: { slug, published: true },
    select: { title: true, excerpt: true, content: true },
  })

  if (!post) return { title: 'Článek nenalezen' }

  const description = post.excerpt || post.content.substring(0, 160).replace(/\n/g, ' ')

  return {
    title: post.title,
    description,
    alternates: { canonical: `/aktuality/${slug}` },
    openGraph: {
      title: post.title,
      description,
      type: 'article',
    },
  }
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  noStore()
  const { slug } = await params

  const post = await prisma.post.findFirst({
    where: {
      slug,
      published: true,
    },
  })

  if (!post) {
    notFound()
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
        {new Date(post.publishedAt ?? post.createdAt).toLocaleDateString('cs-CZ')}
      </Typography>
      <Typography variant="h3" component="h1" gutterBottom>
        {post.title}
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Box sx={{ whiteSpace: 'pre-line' }}>
        <Typography variant="body1">{post.content}</Typography>
      </Box>
      <Box sx={{ mt: 4 }}>
        <LinkButton href="/aktuality" variant="outlined">
          Zpět na aktuality
        </LinkButton>
      </Box>
    </Container>
  )
}

