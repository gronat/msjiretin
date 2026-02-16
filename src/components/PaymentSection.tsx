'use client'

import { Box, Container, Card, CardContent, Typography, alpha } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useThemePreset } from '@/components/ThemeRegistry'
import { applyCzechTypography } from '@/lib/czechTypography'

const payments = [
  {
    title: 'Stravné',
    amount: '1 300 Kč',
    description: 'Měsíční platba za stravné',
    account: 'KB č. ú.: 107-7487260227/0100',
    emoji: '🍽️',
    type: 'primary',
  },
  {
    title: 'Měsíční úplata',
    amount: '200 Kč',
    description: 'Měsíční poplatek',
    account: 'KB č. ú.: 107-8908630287/0100',
    emoji: '📝',
    type: 'secondary',
  },
]

export default function PaymentSection() {
  const theme = useTheme()
  const { currentPreset } = useThemePreset()

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: currentPreset.custom.heroGradient || theme.palette.background.default,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: -200,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: alpha(theme.palette.primary.main, 0.05),
          filter: 'blur(80px)',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              mb: 2,
              fontFamily: currentPreset.typography.headingFontFamily,
            }}
          >
            {applyCzechTypography('Platby v MŠ')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {applyCzechTypography('Přehled měsíčních plateb za docházku a stravování')}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 4,
            maxWidth: 900,
            mx: 'auto',
          }}
        >
          {payments.map((payment) => (
            <Card
              key={payment.title}
              sx={{
                position: 'relative',
                overflow: 'visible',
                background: payment.type === 'primary'
                  ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark || theme.palette.primary.main} 100%)`
                  : `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark || theme.palette.secondary.main} 100%)`,
                color: payment.type === 'primary' 
                  ? theme.palette.primary.contrastText 
                  : theme.palette.secondary.contrastText,
                boxShadow: `0 20px 50px ${alpha(payment.type === 'primary' ? theme.palette.primary.main : theme.palette.secondary.main, 0.35)}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px) scale(1.02)',
                },
              }}
            >
              {/* Floating emoji */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -20,
                  right: 24,
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.background.paper,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.75rem',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                }}
              >
                {payment.emoji}
              </Box>

              <CardContent sx={{ p: 4, pt: 5 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    opacity: 0.9,
                    mb: 1,
                  }}
                >
                  {payment.title}
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 700,
                    my: 2,
                    fontFamily: currentPreset.typography.headingFontFamily,
                  }}
                >
                  {payment.amount}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mb: 3, opacity: 0.85 }}
                >
                  {applyCzechTypography(payment.description)}
                </Typography>
                <Box
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    borderRadius: currentPreset.components.button.borderRadius,
                    px: 2,
                    py: 1.5,
                    display: 'inline-block',
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 600,
                      letterSpacing: '0.02em',
                      fontFamily: 'monospace',
                    }}
                  >
                    {payment.account}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              backgroundColor: alpha(theme.palette.warning.main, 0.1),
              color: theme.palette.text.primary,
              px: 3,
              py: 1.5,
              borderRadius: 4,
              border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {applyCzechTypography('⚠️ Všechny platby probíhají bezhotovostně. Pište správný variabilní symbol dítěte.')}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

