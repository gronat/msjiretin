'use client'

import { useState } from 'react'
import { Box, Card, CardMedia, CardContent, IconButton, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useRouter } from 'next/navigation'

interface Photo {
  id: string
  title: string
  path: string
}

interface PhotoListProps {
  photos: Photo[]
  albumId: string
}

export default function PhotoList({ photos, albumId }: PhotoListProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [photoToDelete, setPhotoToDelete] = useState<Photo | null>(null)

  const handleDeleteClick = (photo: Photo) => {
    setPhotoToDelete(photo)
    setConfirmOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!photoToDelete) return

    setDeletingId(photoToDelete.id)
    try {
      const response = await fetch(`/api/admin/photos/${photoToDelete.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Smazání selhalo')
      }

      router.refresh()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Smazání selhalo')
    } finally {
      setDeletingId(null)
      setConfirmOpen(false)
      setPhotoToDelete(null)
    }
  }

  if (photos.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        V albu zatím nejsou žádné fotografie.
      </Typography>
    )
  }

  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 2,
        }}
      >
        {photos.map((photo) => (
          <Card 
            key={photo.id}
            sx={{
              position: 'relative',
              overflow: 'visible',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                '&:hover .delete-button': {
                  opacity: 1,
                },
              }}
            >
              <CardMedia 
                component="img" 
                height="180" 
                image={photo.path} 
                alt={photo.title}
                sx={{ objectFit: 'cover' }}
              />
              <IconButton
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDeleteClick(photo)
                }}
                disabled={deletingId === photo.id}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  opacity: 0.7,
                  transition: 'all 0.2s',
                  zIndex: 10,
                  '&:hover': {
                    opacity: 1,
                    backgroundColor: 'error.main',
                    color: 'white',
                    transform: 'scale(1.1)',
                  },
                  '&:active': {
                    transform: 'scale(0.95)',
                  },
                }}
              >
                <Delete />
              </IconButton>
            </Box>
            <CardContent>
              <Typography variant="body2" noWrap>
                {photo.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Smazat fotografii?</DialogTitle>
        <DialogContent>
          <Typography>
            Opravdu chcete smazat fotografii "{photoToDelete?.title}"? Tato akce je nevratná.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Zrušit</Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error" 
            variant="contained"
            disabled={deletingId !== null}
          >
            {deletingId ? 'Mažu...' : 'Smazat'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

