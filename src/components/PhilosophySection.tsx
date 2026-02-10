'use client'

import { Box, Container, Typography, alpha } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useThemePreset } from '@/components/ThemeRegistry'
import { applyCzechTypography } from '@/lib/czechTypography'

export default function PhilosophySection() {
  const theme = useTheme()
  const { currentPreset } = useThemePreset()

  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative quote marks */}
      <Box
        sx={{
          position: 'absolute',
          top: 40,
          left: '10%',
          fontSize: '15rem',
          fontFamily: 'Georgia, serif',
          color: alpha(theme.palette.primary.main, 0.05),
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        "
      </Box>

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              mb: 6,
              fontFamily: currentPreset.typography.headingFontFamily,
            }}
          >
            Filozofie naší školky
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              lineHeight: 2,
              color: theme.palette.text.primary,
              mb: 4,
            }}
          >
            {applyCzechTypography('V naší mateřské škole vytváříme ')}
            <Box
              component="span"
              sx={{
                background: currentPreset.custom.accentGradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
              }}
            >
              bezpečné a podnětné prostředí
            </Box>
            {applyCzechTypography(', ve kterém děti vyrůstají v samostatné, svědomité a zdravě sebevědomé osobnosti.')}
            {applyCzechTypography(' Přirozenou cestou podporujeme jejich potřeby, zájmy i radost z objevování světa.')}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              lineHeight: 2,
              color: theme.palette.text.secondary,
              mb: 5,
            }}
          >
            {applyCzechTypography('Učíme je vnímat sebe jako součást společenství a budujeme pozitivní vztah k místu, lidem i zdravému životnímu stylu.')}
          </Typography>

          <Box
            sx={{
              display: 'inline-block',
              position: 'relative',
              px: 4,
              py: 2,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: alpha(theme.palette.primary.main, 0.08),
                borderRadius: currentPreset.components.card.borderRadius,
                border: `2px solid ${alpha(theme.palette.primary.main, 0.15)}`,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                position: 'relative',
                fontWeight: 600,
                color: theme.palette.primary.main,
                fontStyle: 'italic',
              }}
            >
              {applyCzechTypography('„Naším cílem je být rodinám oporou při výchově dětí, ne jejich náhradou."')}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

