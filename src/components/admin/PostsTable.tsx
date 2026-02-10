'use client'

import { useState } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import { Edit, Delete, Visibility } from '@mui/icons-material'
import { formatDistance } from 'date-fns'
import { cs } from 'date-fns/locale/cs'
import LinkIconButton from '@/components/LinkIconButton'
import { useRouter } from 'next/navigation'

type Post = {
  id: string
  title: string
  published: boolean
  publishedAt: Date | null
  createdAt: Date
  author: {
    name: string | null
    email: string
  }
  category: {
    name: string
  } | null
}

export default function PostsTable({ posts }: { posts: Post[] }) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<Post | null>(null)

  const handleDeleteClick = (post: Post) => {
    setPostToDelete(post)
    setConfirmOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return

    setDeletingId(postToDelete.id)
    try {
      const response = await fetch(`/api/admin/posts/${postToDelete.id}`, {
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
      setPostToDelete(null)
    }
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Název</TableCell>
              <TableCell>Kategorie</TableCell>
              <TableCell>Autor</TableCell>
              <TableCell>Stav</TableCell>
              <TableCell>Vytvořeno</TableCell>
              <TableCell align="right">Akce</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Žádné příspěvky
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>
                    {post.category ? (
                      <Chip label={post.category.name} size="small" />
                    ) : (
                      <span style={{ opacity: 0.5 }}>Bez kategorie</span>
                    )}
                  </TableCell>
                  <TableCell>{post.author.name || post.author.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={post.published ? 'Publikováno' : 'Koncept'}
                      color={post.published ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {formatDistance(new Date(post.createdAt), new Date(), {
                      addSuffix: true,
                      locale: cs,
                    })}
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                      {post.published && (
                        <IconButton size="small" color="info">
                          <Visibility />
                        </IconButton>
                      )}
                      <LinkIconButton
                        href={`/admin/posts/${post.id}`}
                        size="small"
                        color="primary"
                      >
                        <Edit />
                      </LinkIconButton>
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => handleDeleteClick(post)}
                        disabled={deletingId === post.id}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Smazat příspěvek?</DialogTitle>
        <DialogContent>
          <Box>
            Opravdu chcete smazat příspěvek <strong>"{postToDelete?.title}"</strong>? Tato akce je nevratná.
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
