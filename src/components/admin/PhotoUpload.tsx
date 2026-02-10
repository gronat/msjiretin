'use client'

import { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { CloudUpload } from '@mui/icons-material'
import { useRouter } from 'next/navigation'

export default function PhotoUpload({ albumId }: { albumId: string }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedCount, setSelectedCount] = useState(0)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('/api/admin/photos/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(payload?.error || 'Nahrání selhalo')
      }

      form.reset()
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nahrání selhalo')
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCount(event.target.files?.length ?? 0)
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <input type="hidden" name="albumId" value={albumId} />
      <Button
        variant="outlined"
        component="label"
        startIcon={<CloudUpload />}
        disabled={loading}
      >
        Vybrat fotografie
        <input type="file" name="files" multiple accept="image/*" hidden onChange={handleFileChange} />
      </Button>
      <Typography variant="body2" color="text.secondary">
        {selectedCount > 0 ? `Vybráno: ${selectedCount} souborů` : 'Zatím nejsou vybrané žádné soubory'}
      </Typography>
      <Button type="submit" variant="contained" disabled={loading}>
        {loading ? 'Nahrávám...' : 'Nahrát'}
      </Button>
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
    </Box>
  )
}

