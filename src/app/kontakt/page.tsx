import { Container, Typography, Paper, Box } from '@mui/material'
import { Phone, Email, LocationOn, AccessTime } from '@mui/icons-material'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Kontaktní údaje MŠ Jiřetín pod Jedlovou - adresa, telefon, email, provozní doba.',
  alternates: { canonical: '/kontakt' },
}

export default function ContactPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
        Kontakt
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 4,
        }}
      >
        <Box>
          <Paper sx={{ p: 4, height: '100%' }}>
            <Typography variant="h5" gutterBottom color="primary">
              MŠ Jiřetín pod Jedlovou
            </Typography>
            <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
              Příspěvková organizace
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
              <LocationOn sx={{ mr: 2, color: 'primary.main', mt: 0.5 }} />
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  Adresa
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Školní 273
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Jiřetín pod Jedlovou
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  407 56
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Phone sx={{ mr: 2, color: 'primary.main' }} />
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  Telefon
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  702 152 232
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Email sx={{ mr: 2, color: 'primary.main' }} />
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  Email
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  skolka@jiretin.cz
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <AccessTime sx={{ mr: 2, color: 'primary.main', mt: 0.5 }} />
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  Provozní doba
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  6:15 - 15:30
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>

        <Box>
          <Paper sx={{ p: 4, height: '100%' }}>
            <Typography variant="h5" gutterBottom color="primary">
              Zřizovatel
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                Obec Jiřetín pod Jedlovou
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Vinařská 32
              </Typography>
              <Typography variant="body2" color="text.secondary">
                407 56
              </Typography>
            </Box>

            <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid #e0e0e0' }}>
              <Typography variant="h6" gutterBottom>
                Identifikační údaje
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>IČO:</strong> 727 43 093
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Název:</strong> MŠ Jiřetín pod Jedlovou, okres Děčín, příspěvková organizace
              </Typography>
            </Box>
          </Paper>
        </Box>

        <Paper sx={{ p: 4, gridColumn: { xs: '1 / -1', md: '1 / -1' } }}>
            <Typography variant="h5" gutterBottom color="primary">
              Mapa
            </Typography>
            <Box
              sx={{
                width: '100%',
                height: 400,
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <iframe
                title="MŠ Jiřetín pod Jedlovou – mapa"
                src="https://www.google.com/maps?q=M%C5%A0%20Ji%C5%99et%C3%ADn%20pod%20Jedlovou%2C%20%C5%A0koln%C3%AD%20273%2C%20Ji%C5%99et%C3%ADn%20pod%20Jedlovou&output=embed&z=15"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Box>
        </Paper>
      </Box>
    </Container>
  )
}

