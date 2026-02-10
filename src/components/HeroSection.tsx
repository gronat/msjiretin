'use client'

import { Box, Container, Typography, alpha } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import LinkButton from '@/components/LinkButton'
import { useThemePreset } from '@/components/ThemeRegistry'
import { applyCzechTypography } from '@/lib/czechTypography'

export default function HeroSection() {
  const theme = useTheme()
  const { currentPreset } = useThemePreset()

  return (
    <Box
      sx={{
        position: 'relative',
        py: { xs: 8, md: 12 },
        overflow: 'hidden',
        background: currentPreset.custom.heroGradient || theme.palette.background.default,
      }}
    >
      {/* Decorative background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: alpha(theme.palette.primary.main, 0.08),
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -150,
          left: -150,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: alpha(theme.palette.secondary.main, 0.1),
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 6, md: 8 },
            alignItems: 'center',
          }}
        >
          {/* Text content */}
          <Box>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                color: theme.palette.text.primary,
                mb: 2,
                fontFamily: currentPreset.typography.headingFontFamily,
              }}
            >
              {applyCzechTypography('Vítejte v MŠ Jiřetín pod Jedlovou')}
            </Typography>
            
            <Typography
              variant="h5"
              component="p"
              sx={{
                color: theme.palette.text.secondary,
                mb: 4,
                fontWeight: 400,
                maxWidth: 500,
              }}
            >
              {applyCzechTypography('SMÍŠEK — Místo, kde děti rostou v radosti a lásce')}
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <LinkButton
                href="/kontakt"
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                  '&:hover': {
                    boxShadow: `0 6px 28px ${alpha(theme.palette.primary.main, 0.5)}`,
                  },
                }}
              >
                {applyCzechTypography('Kontaktujte nás')}
              </LinkButton>
              <LinkButton
                href="/o-nas"
                variant="outlined"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                  },
                }}
              >
                {applyCzechTypography('Více o školce')}
              </LinkButton>
            </Box>
          </Box>

          {/* Image */}
          <Box
            sx={{
              position: 'relative',
              minHeight: { xs: 280, md: 400 },
              borderRadius: currentPreset.components.card.borderRadius / 8,
              overflow: 'hidden',
              boxShadow: currentPreset.custom.cardHoverShadow,
              transform: 'perspective(1000px) rotateY(-2deg) rotateX(2deg)',
              transition: 'transform 0.4s ease',
              '&:hover': {
                transform: 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.02)',
              },
            }}
          >
            <Box
              component="img"
              src="https://www.obecjiretin.cz/assets/Image.ashx?id_org=6100&id_obrazky=1072&datum=9%2F18%2F2016+7%3A49%3A44+PM"
              alt="MŠ Jiřetín pod Jedlovou"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, transparent 60%)`,
                pointerEvents: 'none',
              }}
            />
            {/* Floating badge */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 20,
                left: 20,
                backgroundColor: theme.palette.background.paper,
                borderRadius: currentPreset.components.button.borderRadius,
                px: 2.5,
                py: 1.5,
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Box sx={{ fontSize: '1.5rem' }}>🏫</Box>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.primary', display: 'block', lineHeight: 1.2 }}>
                  Od roku 1990
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
                  Tradice a kvalita
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

