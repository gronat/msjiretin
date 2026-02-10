'use client'

import { useState } from 'react'
import { Grid, Card, CardMedia, CardContent, CardActions, IconButton, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'
import LinkIconButton from '@/components/LinkIconButton'
import { useRouter } from 'next/navigation'

interface Album {
  id: string
  name: string
  coverPhoto: string | null
  _count: {
    photos: number
  }
}

interface AlbumsListProps {
  albums: Album[]
}

export default function AlbumsList({ albums }: AlbumsListProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [albumToDelete, setAlbumToDelete] = useState<Album | null>(null)

  const handleDeleteClick = (album: Album) => {
    setAlbumToDelete(album)
    setConfirmOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!albumToDelete) return

    setDeletingId(albumToDelete.id)
    try {
      const response = await fetch(`/api/admin/gallery/${albumToDelete.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(payload?.error || 'Smazání selhalo')
      }

      router.refresh()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Smazání selhalo')
    } finally {
      setDeletingId(null)
      setConfirmOpen(false)
      setAlbumToDelete(null)
    }
  }

  if (albums.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          Zatím nejsou vytvořena žádná alba
        </Typography>
      </Box>
    )
  }

  return (
    <>
      <Grid container spacing={3}>
        {albums.map((album) => (
          <Grid item xs={12} sm={6} md={4} key={album.id}>
            <Card>
              <CardMedia
                component="div"
                sx={{
                  height: 200,
                  bgcolor: 'grey.200',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {album.coverPhoto ? (
                  <img
                    src={album.coverPhoto}
                    alt={album.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Bez náhledu
                  </Typography>
                )}
              </CardMedia>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {album.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {album._count.photos} fotografií
                </Typography>
              </CardContent>
              <CardActions>
                <LinkIconButton
                  href={`/admin/gallery/${album.id}`}
                  size="small"
                  color="primary"
                >
                  <Edit />
                </LinkIconButton>
                <IconButton 
                  size="small" 
                  color="error"
                  onClick={() => handleDeleteClick(album)}
                  disabled={deletingId === album.id}
                >
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Smazat album?</DialogTitle>
        <DialogContent>
          <Box>
            Opravdu chcete smazat album <strong>"{albumToDelete?.name}"</strong>?
            {albumToDelete && albumToDelete._count.photos > 0 && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                ⚠️ Toto album obsahuje {albumToDelete._count.photos} {albumToDelete._count.photos === 1 ? 'fotografii' : albumToDelete._count.photos < 5 ? 'fotografie' : 'fotografií'}, které budou také smazány!
              </Typography>
            )}
            <Typography variant="body2" sx={{ mt: 2 }}>
              Tato akce je nevratná.
            </Typography>
          </Box>
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

