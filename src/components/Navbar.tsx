'use client'

import { 
  AppBar, Toolbar, Typography, Button, Container, Box, 
  Tooltip, IconButton, Menu, MenuItem, ListItemIcon, ListItemText, 
  Chip, alpha, Drawer, List, ListItem, ListItemButton, Divider 
} from '@mui/material'
import { Palette as PaletteIcon, Menu as MenuIcon, Close as CloseIcon, AdminPanelSettings, Logout } from '@mui/icons-material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useThemePreset } from '@/components/ThemeRegistry'
import { themePresets, ThemePresetName } from '@/components/theme/themePresets'

const navItems = [
  { label: 'Domů', href: '/' },
  { label: 'Aktuality', href: '/aktuality' },
  { label: 'O nás', href: '/o-nas' },
  { label: 'Pro rodiče', href: '/pro-rodice' },
  { label: 'Fotogalerie', href: '/galerie' },
  { label: 'Dokumenty', href: '/dokumenty' },
  { label: 'Kontakt', href: '/kontakt' },
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const { themeName, setThemeName, currentPreset } = useThemePreset()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const open = Boolean(anchorEl)

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/')
    router.refresh()
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleThemeChange = (name: ThemePresetName) => {
    setThemeName(name)
    handleClose()
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  // Determine text color based on whether it's a glass effect navbar
  const isGlassNavbar = currentPreset.custom.glassEffect
  const textColor = isGlassNavbar ? currentPreset.palette.text?.primary : '#ffffff'
  const textColorSecondary = isGlassNavbar ? currentPreset.palette.text?.secondary : 'rgba(255,255,255,0.85)'

  // Mobile drawer content
  const drawer = (
    <Box sx={{ width: 280, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box 
        sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '10px',
              background: `linear-gradient(135deg, ${currentPreset.palette.primary.main}, ${currentPreset.palette.secondary.main})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
            }}
          >
            🏫
          </Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            MŠ Jiřetín
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Navigation */}
      <List sx={{ flexGrow: 1, py: 2 }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <ListItem key={item.href} disablePadding>
              <ListItemButton
                component={Link}
                href={item.href}
                onClick={handleDrawerToggle}
                sx={{
                  mx: 1,
                  borderRadius: 2,
                  backgroundColor: isActive ? alpha(currentPreset.palette.primary.main, 0.1) : 'transparent',
                  '&:hover': {
                    backgroundColor: alpha(currentPreset.palette.primary.main, 0.08),
                  },
                }}
              >
                <ListItemText 
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'primary.main' : 'text.primary',
                  }}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
        
        {/* Admin link in mobile menu */}
        {session && (
          <>
            <Divider sx={{ my: 1 }} />
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                href="/admin"
                onClick={handleDrawerToggle}
                sx={{
                  mx: 1,
                  borderRadius: 2,
                  backgroundColor: pathname.startsWith('/admin') ? alpha(currentPreset.palette.primary.main, 0.1) : 'transparent',
                  '&:hover': {
                    backgroundColor: alpha(currentPreset.palette.primary.main, 0.08),
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <AdminPanelSettings />
                </ListItemIcon>
                <ListItemText 
                  primary="Administrace"
                  primaryTypographyProps={{
                    fontWeight: pathname.startsWith('/admin') ? 600 : 500,
                    color: pathname.startsWith('/admin') ? 'primary.main' : 'text.primary',
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleDrawerToggle()
                  handleLogout()
                }}
                sx={{
                  mx: 1,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: alpha(currentPreset.palette.error.main, 0.1),
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: 'error.main' }}>
                  <Logout />
                </ListItemIcon>
                <ListItemText 
                  primary="Odhlásit se"
                  primaryTypographyProps={{
                    color: 'error.main',
                  }}
                />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>

      <Divider />

      {/* Theme switcher */}
      <Box sx={{ p: 2 }}>
        <Typography 
          variant="caption" 
          color="text.secondary" 
          sx={{ 
            fontWeight: 600, 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em',
            display: 'block',
            mb: 1.5,
          }}
        >
          🎨 Vzhled webu
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {Object.entries(themePresets).map(([key, preset]) => {
            const isSelected = themeName === key
            return (
              <Chip
                key={key}
                label={`${preset.emoji} ${preset.label}`}
                onClick={() => {
                  setThemeName(key as ThemePresetName)
                }}
                sx={{
                  fontWeight: isSelected ? 600 : 500,
                  backgroundColor: isSelected 
                    ? preset.palette.primary.main 
                    : alpha(preset.palette.primary.main, 0.1),
                  color: isSelected 
                    ? preset.palette.primary.contrastText 
                    : preset.palette.primary.main,
                  border: `1px solid ${alpha(preset.palette.primary.main, isSelected ? 0 : 0.3)}`,
                  '&:hover': {
                    backgroundColor: isSelected 
                      ? preset.palette.primary.main 
                      : alpha(preset.palette.primary.main, 0.2),
                  },
                }}
              />
            )
          })}
        </Box>
      </Box>
    </Box>
  )

  return (
    <>
      <AppBar position="sticky" elevation={isGlassNavbar ? 0 : 2}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 1.5 }}>
            {/* Mobile menu button */}
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                display: { xs: 'flex', md: 'none' },
                mr: 1,
                color: textColor,
              }}
            >
              <MenuIcon />
            </IconButton>

            <Link href="/" style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: { xs: 36, md: 44 },
                    height: { xs: 36, md: 44 },
                    borderRadius: '12px',
                    background: isGlassNavbar 
                      ? `linear-gradient(135deg, ${currentPreset.palette.primary.main}, ${currentPreset.palette.secondary.main})`
                      : 'rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                    fontWeight: 700,
                    color: isGlassNavbar ? '#fff' : 'inherit',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                >
                  🏫
                </Box>
                <Box>
                  <Typography 
                    variant="h6" 
                    component="div" 
                    sx={{ 
                      fontWeight: 700, 
                      color: textColor,
                      lineHeight: 1.2,
                      letterSpacing: '-0.01em',
                      fontSize: { xs: '0.95rem', md: '1.25rem' },
                    }}
                  >
                    MŠ Jiřetín pod Jedlovou
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: textColorSecondary,
                      fontWeight: 500,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      display: { xs: 'none', sm: 'block' },
                    }}
                  >
                    SMÍŠEK
                  </Typography>
                </Box>
              </Box>
            </Link>
            
            {/* Desktop navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, alignItems: 'center' }}>
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Button
                    key={item.href}
                    component={Link}
                    href={item.href}
                    sx={{
                      color: textColor,
                      fontWeight: isActive ? 600 : 500,
                      fontSize: '0.9rem',
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      position: 'relative',
                      backgroundColor: isActive 
                        ? (isGlassNavbar ? alpha(currentPreset.palette.primary.main, 0.1) : 'rgba(255,255,255,0.15)')
                        : 'transparent',
                      '&:hover': {
                        backgroundColor: isGlassNavbar 
                          ? alpha(currentPreset.palette.primary.main, 0.08)
                          : 'rgba(255,255,255,0.1)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {item.label}
                  </Button>
                )
              })}
              
              {/* Logout button - part of main navigation */}
              {session && (
                <Button
                  onClick={handleLogout}
                  sx={{
                    color: textColor,
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    backgroundColor: 'transparent',
                    '&:hover': {
                      backgroundColor: isGlassNavbar 
                        ? alpha(currentPreset.palette.error.main, 0.1)
                        : 'rgba(255,255,255,0.1)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  Odhlásit
                </Button>
              )}
              
              <Tooltip title="Změnit design" arrow>
                <IconButton
                  onClick={handleClick}
                  sx={{
                    ml: 2,
                    width: 42,
                    height: 42,
                    borderRadius: 2,
                    color: textColor,
                    backgroundColor: isGlassNavbar 
                      ? alpha(currentPreset.palette.primary.main, 0.1)
                      : 'rgba(255,255,255,0.15)',
                    border: `1px solid ${isGlassNavbar ? alpha(currentPreset.palette.primary.main, 0.2) : 'rgba(255,255,255,0.2)'}`,
                    '&:hover': {
                      backgroundColor: isGlassNavbar 
                        ? alpha(currentPreset.palette.primary.main, 0.15)
                        : 'rgba(255,255,255,0.25)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  <PaletteIcon />
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                slotProps={{
                  paper: {
                    sx: {
                      mt: 1,
                      minWidth: 220,
                    },
                  },
                }}
              >
                <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider' }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.7rem' }}>
                    Vzhled webu
                  </Typography>
                </Box>
                {Object.entries(themePresets).map(([key, preset]) => {
                  const isSelected = themeName === key
                  return (
                    <MenuItem
                      key={key}
                      onClick={() => handleThemeChange(key as ThemePresetName)}
                      selected={isSelected}
                      sx={{
                        py: 1.5,
                        '&.Mui-selected': {
                          backgroundColor: alpha(preset.palette.primary.main, 0.1),
                          '&:hover': {
                            backgroundColor: alpha(preset.palette.primary.main, 0.15),
                          },
                        },
                      }}
                    >
                      <ListItemIcon sx={{ fontSize: '1.5rem', minWidth: 40 }}>
                        {preset.emoji}
                      </ListItemIcon>
                      <ListItemText 
                        primary={preset.label}
                        primaryTypographyProps={{
                          fontWeight: isSelected ? 600 : 500,
                        }}
                      />
                      {isSelected && (
                        <Chip 
                          label="Aktivní" 
                          size="small" 
                          sx={{ 
                            ml: 1,
                            height: 22,
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            backgroundColor: preset.palette.primary.main,
                            color: preset.palette.primary.contrastText,
                          }} 
                        />
                      )}
                    </MenuItem>
                  )
                })}
              </Menu>
            </Box>

            {/* Mobile theme button (visible on mobile only) */}
            <IconButton
              onClick={handleClick}
              sx={{
                display: { xs: 'flex', md: 'none' },
                color: textColor,
                width: 40,
                height: 40,
              }}
            >
              <PaletteIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 280,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  )
}
