'use client'

import { Container, Typography, Box, Paper, alpha, Divider } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useThemePreset } from '@/components/ThemeRegistry'
import { School, Sports, Nature, DirectionsBus } from '@mui/icons-material'

export default function AboutPage() {
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
        O nás
      </Typography>
      
      {/* MŠ Jiřetín pod Jedlovou - SMÍŠEK */}
      <Paper 
        sx={{ 
          p: { xs: 3, md: 5 }, 
          mb: 6,
          background: currentPreset.custom.heroGradient || theme.palette.background.paper,
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
            <School sx={{ fontSize: 28 }} />
          </Box>
          <Typography 
            variant="h4" 
            component="h2"
            sx={{
              fontFamily: currentPreset.typography.headingFontFamily,
              fontWeight: 700,
            }}
          >
            MŠ Jiřetín pod Jedlovou - SMÍŠEK
          </Typography>
        </Box>

        <Box sx={{ pl: { xs: 2, sm: 4, md: 9 } }}>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 2 }}>
            Naše mateřská škola se nachází v areálu sportoviště obce Jiřetín pod Jedlovou, což nám dává jedinečnou možnost trávit s dětmi většinu dne venku. K dispozici máme vlastní uzamčenou zahradu s pískovištěm a dřevěnými herními prvky a zároveň můžeme využívat celý sportovní areál včetně hřišť. Díky tomu si děti každý den užívají pestré pohybové aktivity v průběhu všech ročních období.
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 2 }}>
            Rádi vyrážíme i mimo areál – v okolí školky máme „naše" lesíky, kde si děti hrají, objevují přírodu a učí se venku. Navštěvujeme také Rekreační středisko Netopýr, kde se děti setkávají se zvířaty, hrají si u potoka a zažívají malé dobrodružné výpravy.
          </Typography>

          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            Školka má jednu heterogenní třídu pro děti ve věku 3–7 let s maximálním počtem 25 dětí. Součástí budovy je také tělocvična, kterou pravidelně využíváme. Dostupnost je snadná – autem (velké parkoviště) i autobusem, zastávka je přibližně 7 minut chůze.
          </Typography>
        </Box>
      </Paper>

      {/* Naše hodnoty */}
      <Paper sx={{ p: { xs: 3, md: 5 }, mb: 6 }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{
            mb: 3,
            fontFamily: currentPreset.typography.headingFontFamily,
            fontWeight: 700,
            color: 'primary.main',
          }}
        >
          Naše hodnoty
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          <strong>Bezpečnost a péče:</strong> Vytváříme prostředí, kde se děti cítí bezpečně a jsou 
          pod odborným dohledem kvalifikovaných pedagogů.
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          <strong>Individuální přístup:</strong> Respektujeme jedinečnost každého dítěte a podporujeme 
          jeho individuální rozvoj.
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          <strong>Spolupráce s rodinami:</strong> Jsme partnerem rodičů při výchově dětí, ne jejich náhradou.
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          <strong>Radost z učení:</strong> Podporujeme přirozenou zvídavost dětí a radost z objevování světa.
        </Typography>
      </Paper>

      {/* Doplňkové činnosti */}
      <Paper sx={{ p: { xs: 3, md: 4 }, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: currentPreset.components.button.borderRadius,
              background: currentPreset.custom.accentGradient || `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}
          >
            <Sports sx={{ fontSize: 24 }} />
          </Box>
          <Typography 
            variant="h5" 
            component="h2"
            sx={{
              fontFamily: currentPreset.typography.headingFontFamily,
              fontWeight: 700,
            }}
          >
            Doplňkové činnosti
          </Typography>
        </Box>

        <Box sx={{ pl: { xs: 0, md: 8 } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, color: 'primary.main' }}>
                Společné akce pro děti a rodiče
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, fontSize: '0.875rem' }}>
                Podzimní setkání, vánoční posezení, karneval, hry v přírodě
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                Narozeninové oslavy dětí
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, color: 'primary.main' }}>
                Dodržování lidových tradic
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, fontSize: '0.875rem' }}>
                Vánoce, Velikonoce, vynášení zimy, čarodějnice...
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                Pasování školáků
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, color: 'primary.main' }}>
                Poznávací výlety
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, fontSize: '0.875rem' }}>
                Knihovny v blízkém okolí, IQ park
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                Plavecký výcvik
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, color: 'primary.main' }}>
                Projektové dny
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, fontSize: '0.875rem' }}>
                Sportovní olympiáda, den s hasiči
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, color: 'primary.main' }}>
                Spolupráce s MŠ Horní Podluží
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, fontSize: '0.875rem' }}>
                Výlety, sportovní den...
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, color: 'primary.main' }}>
                Spolupráce s ZŠ Dolní Podluží
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, fontSize: '0.875rem' }}>
                Účast předškoláků v dopoledním vyučování 1. třídy, schůzka pro rodiče
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Kontaktní údaje */}
      <Paper sx={{ p: { xs: 3, md: 4 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: currentPreset.components.button.borderRadius,
              background: currentPreset.custom.accentGradient || `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}
          >
            <DirectionsBus sx={{ fontSize: 24 }} />
          </Box>
          <Typography 
            variant="h5" 
            component="h2"
            sx={{
              fontFamily: currentPreset.typography.headingFontFamily,
              fontWeight: 700,
            }}
          >
            Kontaktní údaje
          </Typography>
        </Box>

        <Box sx={{ pl: { xs: 0, md: 8 } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                Adresa
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                Školní 273, Jiřetín pod Jedlovou, 407 56
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                Telefon
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                702 152 232
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                Email
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                skolka@jiretin.cz
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                IČO
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                727 43 093
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                Zřizovatel
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                Obec Jiřetín pod Jedlovou, Vinařská 32, 407 56
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}
