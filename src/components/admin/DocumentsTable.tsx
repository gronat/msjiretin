'use client'

import { useState } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import { Edit, Delete, Download } from '@mui/icons-material'
import Link from 'next/link'
import { formatDistance } from 'date-fns'
import { cs } from 'date-fns/locale/cs'
import { useRouter } from 'next/navigation'

type Document = {
  id: string
  title: string
  filename: string
  path: string
  size: number | null
  createdAt: Date
}

export default function DocumentsTable({ documents }: { documents: Document[] }) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [docToDelete, setDocToDelete] = useState<Document | null>(null)

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'N/A'
    const mb = bytes / (1024 * 1024)
    return mb < 1 ? `${(bytes / 1024).toFixed(0)} KB` : `${mb.toFixed(2)} MB`
  }

  const handleDeleteClick = (doc: Document) => {
    setDocToDelete(doc)
    setConfirmOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!docToDelete) return

    setDeletingId(docToDelete.id)
    try {
      const response = await fetch(`/api/admin/documents/${docToDelete.id}`, {
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
      setDocToDelete(null)
    }
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Název</TableCell>
              <TableCell>Soubor</TableCell>
              <TableCell>Velikost</TableCell>
              <TableCell>Nahráno</TableCell>
              <TableCell align="right">Akce</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Žádné dokumenty
                </TableCell>
              </TableRow>
            ) : (
              documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>{doc.title}</TableCell>
                  <TableCell>{doc.filename}</TableCell>
                  <TableCell>{formatFileSize(doc.size)}</TableCell>
                  <TableCell>
                    {formatDistance(new Date(doc.createdAt), new Date(), {
                      addSuffix: true,
                      locale: cs,
                    })}
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                      <IconButton size="small" color="info" component="a" href={doc.path} target="_blank" rel="noreferrer">
                        <Download />
                      </IconButton>
                      <IconButton
                        component={Link}
                        href={`/admin/documents/${doc.id}`}
                        size="small"
                        color="primary"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteClick(doc)}
                        disabled={deletingId === doc.id}
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
        <DialogTitle>Smazat dokument?</DialogTitle>
        <DialogContent>
          <Box>
            Opravdu chcete smazat dokument <strong>"{docToDelete?.title}"</strong>? Tato akce je nevratná.
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

