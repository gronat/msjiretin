import { Container, Typography, Box } from '@mui/material'
import { Add } from '@mui/icons-material'
import { prisma } from '@/lib/prisma'
import PostsTable from '@/components/admin/PostsTable'
import LinkButton from '@/components/LinkButton'

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Příspěvky
        </Typography>
        <LinkButton
          href="/admin/posts/new"
          variant="contained"
          startIcon={<Add />}
        >
          Nový příspěvek
        </LinkButton>
      </Box>

      <PostsTable posts={posts} />
    </Container>
  )
}

