'use client'

import { Box, TextField, Button, Typography } from '@mui/material'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type DocumentData = {
  id: string
  title: string
  description: string | null
  category: string | null
  filename: string
}

export default function DocumentEditForm({ doc }: { doc: DocumentData }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedName, setSelectedName] = useState('')
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    try {
      const response = await fetch(`/api/admin/documents/${doc.id}`, {
        method: 'PATCH',
        body: formData,
      })
      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(payload?.error || 'Uložení selhalo')
      }
      router.push('/admin/documents')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Uložení selhalo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Název dokumentu" name="title" defaultValue={doc.title} required />
      <TextField label="Popis" name="description" defaultValue={doc.description ?? ''} multiline minRows={3} />
      <TextField label="Kategorie" name="category" defaultValue={doc.category ?? ''} />
      <Button variant="outlined" component="label" disabled={loading}>
        Vybrat nový soubor (volitelné)
        <input
          type="file"
          name="file"
          hidden
          onChange={(e) => setSelectedName(e.target.files?.[0]?.name || '')}
        />
      </Button>
      <Typography variant="body2" color="text.secondary">
        {selectedName ? `Vybraný soubor: ${selectedName}` : `Aktuální soubor: ${doc.filename}`}
      </Typography>
      <Button type="submit" variant="contained" disabled={loading}>
        {loading ? 'Ukládám...' : 'Uložit změny'}
      </Button>
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
    </Box>
  )
}

