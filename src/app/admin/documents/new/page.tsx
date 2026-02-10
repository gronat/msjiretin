'use client'

import { Container, Typography, Box, TextField, Button } from '@mui/material'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function NewDocumentPage() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') || ''
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedName, setSelectedName] = useState('')
  const [category, setCategory] = useState(initialCategory)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    try {
      const response = await fetch('/api/admin/documents/upload', {
        method: 'POST',
        body: formData,
      })
      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(payload?.error || 'Nahrání selhalo')
      }
      router.push('/admin/documents')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nahrání selhalo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Nahrát dokument
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Název dokumentu" name="title" required />
        <TextField label="Popis" name="description" multiline minRows={3} />
        <TextField
          label="Kategorie"
          name="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
        <Button variant="outlined" component="label" disabled={loading}>
          Vybrat soubor
          <input
            type="file"
            name="file"
            hidden
            onChange={(e) => setSelectedName(e.target.files?.[0]?.name || '')}
          />
        </Button>
        <Typography variant="body2" color="text.secondary">
          {selectedName ? `Vybraný soubor: ${selectedName}` : 'Zatím nebyl vybrán žádný soubor'}
        </Typography>
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? 'Nahrávám...' : 'Nahrát dokument'}
        </Button>
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
      </Box>
    </Container>
  )
}

