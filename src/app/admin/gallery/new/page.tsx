import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Container, Typography, TextField, Box, Button, FormControlLabel, Switch } from '@mui/material'
import LinkButton from '@/components/LinkButton'

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

async function buildUniqueSlug(base: string) {
  let slug = base
  let counter = 2
  while (await prisma.album.findUnique({ where: { slug } })) {
    slug = `${base}-${counter}`
    counter += 1
  }
  return slug
}

async function createAlbum(formData: FormData) {
  'use server'

  const name = String(formData.get('name') ?? '').trim()
  const slugInput = String(formData.get('slug') ?? '').trim()
  const description = String(formData.get('description') ?? '').trim()
  const coverPhoto = String(formData.get('coverPhoto') ?? '').trim()
  const orderValue = String(formData.get('order') ?? '').trim()
  const published = formData.get('published') === 'on'

  if (!name) {
    return
  }

  const baseSlug = slugInput ? slugify(slugInput) : slugify(name)
  const slug = await buildUniqueSlug(baseSlug || `album-${Date.now()}`)
  const order = orderValue ? Number(orderValue) : 0

  await prisma.album.create({
    data: {
      name,
      slug,
      description: description || null,
      coverPhoto: coverPhoto || null,
      order: Number.isFinite(order) ? order : 0,
      published,
    },
  })

  revalidatePath('/galerie')
  revalidatePath('/admin/gallery')
  redirect('/admin/gallery')
}

export default function NewAlbumPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Nové album
      </Typography>
      <Box component="form" action={createAlbum} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Název alba" name="name" required />
        <TextField label="Slug (volitelné)" name="slug" helperText="Pokud necháte prázdné, vytvoří se automaticky." />
        <TextField label="Popis" name="description" multiline minRows={3} />
        <TextField label="URL titulní fotografie (volitelné)" name="coverPhoto" />
        <TextField label="Pořadí" name="order" type="number" inputProps={{ min: 0 }} />
        <FormControlLabel control={<Switch name="published" defaultChecked />} label="Publikovat" />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button type="submit" variant="contained">
            Uložit album
          </Button>
          <LinkButton href="/admin/gallery" variant="outlined">
            Zrušit
          </LinkButton>
        </Box>
      </Box>
    </Container>
  )
}

