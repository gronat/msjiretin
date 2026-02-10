import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { Container, Typography, TextField, Button, Box, FormControlLabel, Switch } from '@mui/material'

export const dynamic = 'force-dynamic'

async function updatePost(formData: FormData) {
  'use server'

  const id = String(formData.get('id') ?? '')
  const title = String(formData.get('title') ?? '').trim()
  const content = String(formData.get('content') ?? '').trim()
  const excerpt = String(formData.get('excerpt') ?? '').trim()
  const published = formData.get('published') === 'on'

  if (!id || !title || !content) {
    return
  }

  await prisma.post.update({
    where: { id },
    data: {
      title,
      content,
      excerpt: excerpt || null,
      published,
      publishedAt: published ? new Date() : null,
    },
  })

  revalidatePath('/')
  revalidatePath('/aktuality')
  revalidatePath('/admin/posts')
  redirect('/admin/posts')
}

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  if (!id || typeof id !== 'string') {
    redirect('/admin/posts')
  }

  const post = await prisma.post.findFirst({
    where: {
      OR: [{ id }, { slug: id }],
    },
  })
  if (!post) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Příspěvek nenalezen
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Nepodařilo se najít příspěvek s ID/slug: {id}
        </Typography>
        <Button href="/admin/posts" variant="outlined">
          Zpět na seznam
        </Button>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Upravit příspěvek
      </Typography>

      <Box component="form" action={updatePost} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <input type="hidden" name="id" value={post.id} />
        <TextField label="Název" name="title" defaultValue={post.title} required />
        <TextField label="Krátký popis" name="excerpt" defaultValue={post.excerpt ?? ''} />
        <TextField label="Obsah" name="content" defaultValue={post.content} multiline minRows={6} required />
        <FormControlLabel control={<Switch name="published" defaultChecked={post.published} />} label="Publikovat" />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button type="submit" variant="contained">
            Uložit změny
          </Button>
          <Button href="/admin/posts" variant="outlined">
            Zrušit
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

