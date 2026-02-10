'use client'

import { Box, Container, Typography, Link as MuiLink, alpha } from '@mui/material'
import { Phone, Email, LocationOn } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import { useThemePreset } from '@/components/ThemeRegistry'

export default function Footer() {
  const theme = useTheme()
  const { currentPreset } = useThemePreset()

  return (
    <Box
      component="footer"
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.dark || theme.palette.primary.main} 0%, ${theme.palette.primary.main} 100%)`,
        color: theme.palette.primary.contrastText,
        py: 8,
        mt: 'auto',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative element */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: { xs: 5, md: 6 },
          }}
        >
          {/* Brand */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: currentPreset.components.button.borderRadius,
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                }}
              >
                🏫
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                  MŠ Jiřetín pod Jedlovou
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  SMÍŠEK
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.85, mb: 1 }}>
              Příspěvková organizace
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85 }}>
              IČO: 727 43 093
            </Typography>
          </Box>

          {/* Contact */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Kontakt
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <LocationOn sx={{ fontSize: 18 }} />
                </Box>
                <Typography variant="body2" sx={{ opacity: 0.9, pt: 0.5 }}>
                  Školní 273<br />
                  Jiřetín pod Jedlovou, 407 56
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Phone sx={{ fontSize: 18 }} />
                </Box>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  702 152 232
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Email sx={{ fontSize: 18 }} />
                </Box>
                <MuiLink 
                  href="mailto:skolka@jiretin.cz" 
                  color="inherit" 
                  underline="hover"
                  sx={{ opacity: 0.9, '&:hover': { opacity: 1 } }}
                >
                  skolka@jiretin.cz
                </MuiLink>
              </Box>
            </Box>
          </Box>

          {/* Founder */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Zřizovatel
            </Typography>
            <Box
              sx={{
                backgroundColor: 'rgba(255,255,255,0.08)',
                borderRadius: Math.min(currentPreset.components.card.borderRadius, 8),
                p: 2.5,
                pl: { xs: 3, md: 8 },
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                Obec Jiřetín pod Jedlovou
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.85 }}>
                Vinařská 32
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.85 }}>
                407 56 Jiřetín pod Jedlovou
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Bottom bar */}
        <Box 
          sx={{ 
            mt: 6, 
            pt: 4, 
            borderTop: '1px solid rgba(255,255,255,0.15)',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.75 }}>
            © {new Date().getFullYear()} MŠ Jiřetín pod Jedlovou. Všechna práva vyhrazena.
          </Typography>
          <MuiLink 
            href="/admin" 
            color="inherit" 
            underline="hover"
            sx={{ 
              opacity: 0.5, 
              fontSize: '0.75rem',
              '&:hover': { opacity: 0.8 } 
            }}
          >
            Administrace
          </MuiLink>
        </Box>
      </Container>
    </Box>
  )
}
