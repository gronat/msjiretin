'use client'

import { useState } from 'react'
import { Box, Button, Typography, TextField, Alert } from '@mui/material'
import { CloudUpload } from '@mui/icons-material'
import { useRouter } from 'next/navigation'

interface CoverPhotoUploadProps {
  albumId: string
  currentCoverPhoto: string | null
}

export default function CoverPhotoUpload({ albumId, currentCoverPhoto }: CoverPhotoUploadProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setError('')
    setSuccess(false)
    setLoading(true)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('albumId', albumId)

    try {
      const response = await fetch('/api/admin/gallery/cover-photo', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(payload?.error || 'Nahrání selhalo')
      }

      const data = await response.json()
      setSuccess(true)
      router.refresh()
      setTimeout(() => setSuccess(false), 3000)
      
      // Update the URL field
      const urlField = document.getElementById('coverPhoto-url') as HTMLInputElement
      if (urlField) {
        urlField.value = data.path
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nahrání selhalo')
    } finally {
      setLoading(false)
      event.target.value = '' // Reset input
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Titulní foto bylo úspěšně nahráno</Alert>}

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <Button
          component="label"
          variant="outlined"
          startIcon={<CloudUpload />}
          disabled={loading}
        >
          {loading ? 'Nahrávám...' : 'Nahrát titulní foto z počítače'}
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileUpload}
          />
        </Button>
        {currentCoverPhoto && (
          <Box
            component="img"
            src={currentCoverPhoto}
            alt="Titulní foto"
            sx={{
              maxHeight: 100,
              maxWidth: 150,
              objectFit: 'cover',
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider',
            }}
          />
        )}
      </Box>
    </Box>
  )
}

