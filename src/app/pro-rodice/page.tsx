'use client'

import { Container, Typography, Box, Paper, Divider, Table, TableBody, TableCell, TableHead, TableRow, Alert, alpha } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useThemePreset } from '@/components/ThemeRegistry'
import { AccessTime, Schedule, Payment, ShoppingBag } from '@mui/icons-material'

export default function ForParentsPage() {
  const theme = useTheme()
  const { currentPreset } = useThemePreset()

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <Typography 
        variant="h2" 
        component="h1" 
        gutterBottom 
        sx={{ 
          mb: 6,
          fontFamily: currentPreset.typography.headingFontFamily,
        }}
      >
        Pro rodiče
      </Typography>

      {/* Provozní doba - ÚPLNĚ NAHOŘE */}
      <Paper 
        sx={{ 
          p: { xs: 3, md: 5 }, 
          mb: 6,
          background: currentPreset.custom.heroGradient || theme.palette.background.paper,
          border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
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
            <AccessTime sx={{ fontSize: 28 }} />
          </Box>
          <Typography 
            variant="h4" 
            component="h2"
            sx={{
              fontFamily: currentPreset.typography.headingFontFamily,
              fontWeight: 700,
            }}
          >
            Provozní doba
          </Typography>
        </Box>

        <Box sx={{ pl: { xs: 2, sm: 4, md: 9 } }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
            6:15 - 15:30
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            Prosíme o včasné přivádění dětí (nejpozději do 8:00), aby se mohly zapojit do ranního programu.
          </Typography>
        </Box>
      </Paper>

      {/* Organizace dne */}
      <Paper 
        sx={{ 
          p: { xs: 3, md: 5 }, 
          mb: 6,
        }}
      >
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
            <Schedule sx={{ fontSize: 28 }} />
          </Box>
          <Typography 
            variant="h4" 
            component="h2"
            sx={{
              fontFamily: currentPreset.typography.headingFontFamily,
              fontWeight: 700,
            }}
          >
            Organizace dne
          </Typography>
        </Box>

        <Box sx={{ pl: { xs: 2, sm: 4, md: 9 } }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'primary.main' }}>
            Časový harmonogram dne
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 90, flexShrink: 0, color: 'primary.main' }}>
                6:15 – 8:00
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                Doba určená pro příchod dětí, volné hry
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 90, flexShrink: 0, color: 'primary.main' }}>
                8:00 – 9:30
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                Setkání v kroužku, ranní přesnídávka, řízené činnosti a aktivity zaměřené na výchovu a vzdělávání podle TVP
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 90, flexShrink: 0, color: 'primary.main' }}>
                9:30 – 11:30
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                Příprava na pobyt venku a pobyt venku
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 90, flexShrink: 0, color: 'primary.main' }}>
                11:30 – 12:00
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                Příprava na oběd, oběd, příprava na odpočinek
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 90, flexShrink: 0, color: 'primary.main' }}>
                od 12:00
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                Vyzvedávání dětí s polodenním pobytem
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 90, flexShrink: 0, color: 'primary.main' }}>
                12:00 – 14:00
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                Příprava na spánek, hygiena, poslech pohádky, odpočinek dětí a individuální práce dětí s nižší potřebou spánku
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 90, flexShrink: 0, color: 'primary.main' }}>
                14:00 – 15:30
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                Odpolední svačina, volné hry a aktivity
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 90, flexShrink: 0, color: 'primary.main' }}>
                od 14:30
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                Doba určená pro přebírání dětí pověřenými osobami
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Co děti potřebují */}
      <Paper 
        sx={{ 
          p: { xs: 3, md: 5 }, 
          mb: 6,
        }}
      >
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
            <ShoppingBag sx={{ fontSize: 28 }} />
          </Box>
          <Typography 
            variant="h4" 
            component="h2"
            sx={{
              fontFamily: currentPreset.typography.headingFontFamily,
              fontWeight: 700,
            }}
          >
            Co děti potřebují
          </Typography>
        </Box>

        <Box sx={{ pl: { xs: 2, sm: 4, md: 9 } }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'primary.main' }}>
            CO DĚTI POTŘEBUJÍ na celý školní rok v MŠ
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.primary.main,
                  mt: 1,
                  flexShrink: 0,
                }}
              />
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                <strong>Bačkory</strong> (ne pantofle a crocsy)
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.primary.main,
                  mt: 1,
                  flexShrink: 0,
                }}
              />
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                <strong>Pohodlné oblečení do herny</strong>
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.primary.main,
                  mt: 1,
                  flexShrink: 0,
                }}
              />
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                <strong>Oblečení dle počasí na ven</strong>
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.primary.main,
                  mt: 1,
                  flexShrink: 0,
                }}
              />
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                <strong>Podepsané holinky</strong> - podzim, jaro
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.primary.main,
                  mt: 1,
                  flexShrink: 0,
                }}
              />
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                <strong>Pyžamo</strong>
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.primary.main,
                  mt: 1,
                  flexShrink: 0,
                }}
              />
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                <strong>Náhradní spodní prádlo a ponožky</strong> v uzavíratelném sáčku
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.primary.main,
                  mt: 1,
                  flexShrink: 0,
                }}
              />
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                <strong>2x balení tahacích kapesníčků</strong> (max 150ks)
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.primary.main,
                  mt: 1,
                  flexShrink: 0,
                }}
              />
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                <strong>1x balení klasických papírových kapesníčků</strong>
              </Typography>
            </Box>
          </Box>

          <Alert severity="info" sx={{ mt: 4 }}>
            Všechny věci prosíme označit jménem dítěte!
          </Alert>
        </Box>
      </Paper>

      {/* Platby */}
      <Paper 
        sx={{ 
          p: { xs: 3, md: 5 }, 
          mb: 4,
        }}
      >
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
            <Payment sx={{ fontSize: 28 }} />
          </Box>
          <Typography 
            variant="h4" 
            component="h2"
            sx={{
              fontFamily: currentPreset.typography.headingFontFamily,
              fontWeight: 700,
            }}
          >
            Platby
          </Typography>
        </Box>

        <Box sx={{ pl: { xs: 2, sm: 4, md: 9 } }}>
          {/* Úplata za předškolní vzdělávání */}
          <Box sx={{ mb: 5 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'primary.main' }}>
              ÚPLATA ZA PŘEDŠKOLNÍ VZDĚLÁVÁNÍ
            </Typography>
            <Box
              sx={{
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                borderRadius: Math.min(currentPreset.components.card.borderRadius, 8),
                p: 3,
                pl: { xs: 3, md: 8 },
                mb: 2,
                border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                Měsíčně 200 Kč
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                KB č. ú.: 107-8908630287/0100
              </Typography>
            </Box>
            <Alert severity="info" sx={{ mt: 2 }}>
              Děti v posledním roce předškolního vzdělávání a děti s odkladem školní docházky úplatu nehradí!
            </Alert>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Stravné */}
          <Box sx={{ mb: 5 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'primary.main' }}>
              STRAVNÉ
            </Typography>
            <Box
              sx={{
                backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                borderRadius: Math.min(currentPreset.components.card.borderRadius, 8),
                p: 3,
                pl: { xs: 3, md: 8 },
                mb: 3,
                border: `2px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Měsíční záloha
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                1 300 Kč
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                se platí měsíc předem
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                KB č. ú.: 107-7487260227/0100
              </Typography>
            </Box>

            {/* Denní normy - vedle sebe */}
            <Box 
              sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                gap: 4,
                mt: 4,
                mb: 4,
              }}
            >
              {/* Denní norma pro děti od 3 do 6 let */}
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Denní norma pro děti od 3 do 6 let
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Položka</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Cena</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Ranní přesnídávka</TableCell>
                      <TableCell align="right">13,-</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Oběd</TableCell>
                      <TableCell align="right">35,-</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Odpolední svačina</TableCell>
                      <TableCell align="right">13,-</TableCell>
                    </TableRow>
                    <TableRow sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.05) }}>
                      <TableCell sx={{ fontWeight: 700 }}>CELKEM</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>61,-</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>

              {/* Denní norma pro děti od 7 let */}
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Denní norma pro děti od 7 let
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Položka</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Cena</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Ranní přesnídávka</TableCell>
                      <TableCell align="right">13,-</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Oběd</TableCell>
                      <TableCell align="right">38,-</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Odpolední svačina</TableCell>
                      <TableCell align="right">13,-</TableCell>
                    </TableRow>
                    <TableRow sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.05) }}>
                      <TableCell sx={{ fontWeight: 700 }}>CELKEM</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>61,-</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Odhlašování dětí ze stravování */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'primary.main' }}>
              ODHLAŠOVÁNÍ DĚTÍ ZE STRAVOVÁNÍ
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                V aplikaci "strava.cz"
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                nejpozději do 14 hodin
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                Osobně či telefonicky
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                na čísle <strong>ŠJ Dolní Podluží 412 384 805</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, color: 'error.main' }}>
                !! nejpozději do 6:30 hodin!!
              </Typography>
            </Box>

            <Alert severity="warning" sx={{ mb: 2 }}>
              Není-li dítě omluveno den předem nebo do 6:30 je první den počítáno jako přítomné a rodiče si mohou oběd VYZVEDNOUT v čase 12:00-12:15 hodin.
            </Alert>

            <Alert severity="info" sx={{ mb: 2 }}>
              Zákonný zástupce je povinen upřesnit návrat dítěte zpět do MŠ.
            </Alert>

            <Alert severity="error">
              Nezapomínejte své dítě odhlásit včas!
            </Alert>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}
