'use client'

import { Paper, Typography, Box, Divider, alpha } from '@mui/material'
import { Security, ContactMail } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import { useThemePreset } from '@/components/ThemeRegistry'

export default function GDPRSection() {
  const theme = useTheme()
  const { currentPreset } = useThemePreset()

  return (
    <Paper sx={{ p: { xs: 3, md: 5 }, mt: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: currentPreset.components.button.borderRadius,
            background: currentPreset.custom.accentGradient || `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
          }}
        >
          <Security sx={{ fontSize: 28 }} />
        </Box>
        <Typography 
          variant="h4" 
          component="h2"
          sx={{
            fontFamily: currentPreset.typography.headingFontFamily,
            fontWeight: 700,
          }}
        >
          GDPR
        </Typography>
      </Box>

      <Box sx={{ pl: { xs: 2, sm: 4, md: 9 } }}>
        {/* Kontaktní údaje MŠ */}
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <ContactMail sx={{ color: 'primary.main', fontSize: 24 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
              Kontaktní údaje MŠ jako správce a zpracovatele osobních údajů
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
              borderRadius: Math.min(currentPreset.components.card.borderRadius, 8),
              p: { xs: 2, md: 3 },
              pl: { xs: 3, md: 8 },
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Adresa
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  MŠ Jiřetín p. J., Školní 273<br />
                  407 56 Jiřetín pod Jedlovou
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Datová schránka
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  54hkse7
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  IČO
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  727 43 093
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Telefon
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  702 152 232
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Kontaktní údaje pověřence */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <ContactMail sx={{ color: 'primary.main', fontSize: 24 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
              Kontaktní údaje pověřence pro ochranu osobních údajů
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: alpha(theme.palette.secondary.main, 0.05),
              borderRadius: Math.min(currentPreset.components.card.borderRadius, 8),
              p: { xs: 2, md: 3 },
              pl: { xs: 3, md: 8 },
              border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Adresa
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Úřad pro ochranu osobních údajů<br />
                  Pplk. Sochora 27<br />
                  170 00 Praha 7
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Pověřenec
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Bc. Jan Brejcha
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  E-mail
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  jan.brejcha@sms-sluzby.cz
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Telefon
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  608 953 696
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}

