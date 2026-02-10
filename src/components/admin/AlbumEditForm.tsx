'use client'

import { useState } from 'react'
import { Box, TextField, Button, FormControlLabel, Switch, Typography, Alert } from '@mui/material'
import { Save } from '@mui/icons-material'
import { useRouter } from 'next/navigation'

interface AlbumEditFormProps {
  album: {
    id: string
    name: string
    slug: string
    description: string | null
    coverPhoto: string | null
    order: number
    published: boolean
  }
}

export default function AlbumEditForm({ album }: AlbumEditFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setSuccess(false)
    setLoading(true)

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch(`/api/admin/gallery/${album.id}`, {
        method: 'PATCH',
        body: formData,
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(payload?.error || 'Uložení selhalo')
      }

      setSuccess(true)
      router.refresh()
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Uložení selhalo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Album bylo úspěšně uloženo</Alert>}

      <TextField 
        label="Název alba" 
        name="name" 
        defaultValue={album.name}
        required 
        fullWidth
      />
      
      <TextField 
        label="Slug" 
        name="slug" 
        defaultValue={album.slug}
        helperText="URL identifikátor alba"
        fullWidth
      />
      
      <TextField 
        label="Popis" 
        name="description" 
        defaultValue={album.description || ''}
        multiline 
        minRows={3}
        fullWidth
      />
      
      <TextField 
        id="coverPhoto-url"
        label="URL titulní fotografie" 
        name="coverPhoto" 
        defaultValue={album.coverPhoto || ''}
        helperText="Můžete zadat URL nebo nahrát soubor níže"
        fullWidth
      />
      
      <TextField 
        label="Pořadí" 
        name="order" 
        type="number" 
        defaultValue={album.order}
        inputProps={{ min: 0 }}
        fullWidth
      />
      
      <FormControlLabel 
        control={
          <Switch 
            name="published" 
            defaultChecked={album.published}
          />
        } 
        label="Publikovat" 
      />
      
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button 
          type="submit" 
          variant="contained" 
          startIcon={<Save />}
          disabled={loading}
        >
          {loading ? 'Ukládám...' : 'Uložit změny'}
        </Button>
      </Box>
    </Box>
  )
}

