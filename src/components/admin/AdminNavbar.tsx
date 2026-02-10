'use client'

import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material'
import { Dashboard, Photo, Description, Article, ExitToApp, People } from '@mui/icons-material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

const adminNavItems = [
  { label: 'Dashboard', href: '/admin', icon: <Dashboard /> },
  { label: 'Příspěvky', href: '/admin/posts', icon: <Article /> },
  { label: 'Fotogalerie', href: '/admin/gallery', icon: <Photo /> },
  { label: 'Dokumenty', href: '/admin/documents', icon: <Description /> },
  { label: 'Zaměstnanci', href: '/admin/staff', icon: <People /> },
]

export default function AdminNavbar() {
  const pathname = usePathname()

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'primary.dark' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            MŠ Jiřetín - Administrace
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1, mr: 2 }}>
            {adminNavItems.map((item) => (
              <Button
                key={item.href}
                component={Link}
                href={item.href}
                color="inherit"
                startIcon={item.icon}
                sx={{
                  fontWeight: pathname === item.href ? 700 : 400,
                  bgcolor: pathname === item.href ? 'rgba(255,255,255,0.1)' : 'transparent',
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <Button
            color="inherit"
            startIcon={<ExitToApp />}
            onClick={handleLogout}
          >
            Odhlásit
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

