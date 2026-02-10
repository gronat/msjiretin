import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { Container, Typography, TextField, Button, Box, FormControlLabel, Switch } from '@mui/material'

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

async function createPost(formData: FormData) {
  'use server'

  const title = String(formData.get('title') ?? '').trim()
  const content = String(formData.get('content') ?? '').trim()
  const excerpt = String(formData.get('excerpt') ?? '').trim()
  const published = formData.get('published') === 'on'

  if (!title || !content) {
    return
  }

  const author = await prisma.user.findFirst({ where: { role: 'admin' } })
  if (!author) {
    return
  }

  await prisma.post.create({
    data: {
      title,
      slug: slugify(title),
      content,
      excerpt: excerpt || null,
      published,
      publishedAt: published ? new Date() : null,
      authorId: author.id,
    },
  })

  revalidatePath('/')
  revalidatePath('/aktuality')
  revalidatePath('/admin/posts')
  redirect('/admin/posts')
}

export default function NewPostPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Nový příspěvek
      </Typography>

      <Box component="form" action={createPost} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Název" name="title" required />
        <TextField label="Krátký popis" name="excerpt" />
        <TextField label="Obsah" name="content" multiline minRows={6} required />
        <FormControlLabel control={<Switch name="published" />} label="Publikovat" />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button type="submit" variant="contained">
            Uložit
          </Button>
          <Button href="/admin/posts" variant="outlined">
            Zrušit
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

