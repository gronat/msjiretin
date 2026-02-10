'use client'

import { Paper, Typography, Box, List, ListItem, ListItemIcon, ListItemText, alpha } from '@mui/material'
import { Description, MenuBook, PictureAsPdf } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import { useThemePreset } from '@/components/ThemeRegistry'

type SVPDocument = {
  id: string
  title: string
  description: string | null
  filename: string
  path: string
  size: number | null
}

export default function SVPSection({ documents = [] }: { documents?: SVPDocument[] }) {
  const theme = useTheme()
  const { currentPreset } = useThemePreset()

  const formatFileSize = (bytes?: number | null) => {
    if (!bytes) return ''
    const mb = bytes / (1024 * 1024)
    return mb < 1 ? `${(bytes / 1024).toFixed(0)} KB` : `${mb.toFixed(2)} MB`
  }

  const getFileIcon = (filename: string) => {
    if (filename.endsWith('.pdf')) return <PictureAsPdf />
    return <Description />
  }

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
          <MenuBook sx={{ fontSize: 28 }} />
        </Box>
        <Typography 
          variant="h4" 
          component="h2"
          sx={{
            fontFamily: currentPreset.typography.headingFontFamily,
            fontWeight: 700,
          }}
        >
          Školní vzdělávací plán
        </Typography>
      </Box>

      <Box sx={{ pl: { xs: 2, sm: 4, md: 9 } }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'primary.main' }}>
            ŠVP "Se Smíškem se nenudíme, krásy světa objevíme" - č.j. 5/2021
          </Typography>
        </Box>

        {/* Charakteristika vzdělávacího programu */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
            Charakteristika vzdělávacího programu
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            Cílem ŠVP je probouzet u dětí zájem a chuť dívat se kolem sebe, naslouchat, objevovat, ale i získávat odvahu ukázat, co všechno zvládnou a dokáží.
          </Typography>

          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            ŠVP vychází z periody střídání ročních období a k tomu se vztahujících lidových zvyků a tradic. Dětem nabízí pestrou škálu příležitostí, smysluplných činností a aktivit.
          </Typography>

          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            Naše MŠ je součástí sportovního areálu, proto při pobytu venku s dětmi využíváme nejen zahradu, ale i jednotlivá sportoviště a vytváříme tak u dětí kladný vztah k pohybu a sportování. Dále je škola součástí CHKO Lužických hor, což nás motivuje vést děti ke vztahu k přírodě (prostřednictvím výletů do blízkého okolí - hrad Tolštýn, rozhledna Jedlová...), pěstovat v dětech úctu ke všemu živému (starat se o krmelec, navštěvovat zemědělské farmy), prosazovat myšlenku ochrany životního prostředí a zapojovat se do různých programů s tím spojených.
          </Typography>

          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            Pedagogickým záměrem celého programu je rozvíjet u dětí schopnost projevovat se jako kamarád a nenásilnou formou dítě začlenit do společnosti. Chceme, aby se dítě stalo aktivním účastníkem a učitelka jeho partnerem a průvodcem učení a tím dosáhnout v předškolním věku přiměřenou úroveň požadovaných kompetencí. Cílem ŠVP je tedy, aby děti dokázaly své nabyté poznatky uplatňovat v dalším životě, po odchodu z MŠ.
          </Typography>

          <Box sx={{ mt: 2, pl: 2 }}>
            <Typography variant="body2" component="div" sx={{ lineHeight: 1.8 }}>
              • kompetence k učení<br />
              • kompetence k řešení problému<br />
              • kompetence komunikativní<br />
              • kompetence sociální a personální<br />
              • kompetence občanské a činnostní
            </Typography>
          </Box>
        </Box>

        {/* Hlavní záměry ŠVP */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
            Hlavní záměry ŠVP
          </Typography>

          <Box
            sx={{
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
              borderRadius: Math.min(currentPreset.components.card.borderRadius, 8),
              p: { xs: 2, md: 3 },
              pl: { xs: 3, md: 8 },
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2" component="div" sx={{ lineHeight: 1.8 }}>
                • Rozvíjet osobnost samostatného, sebevědomého dítěte, schopnost komunikovat<br />
                • Podporovat zdravý vývoj s přiměřenou pohybovou aktivitou<br />
                • Spoluvytvářet návyky zdravého životního stylu<br />
                • Podporovat pozitivní vztah k lidem a místu ve kterém žijí<br />
                • Vytvářet dítěti takové podmínky, aby se ve škole cítilo uvolněně a přirozeně<br />
                • Vzájemná důvěra mezi dětmi a zaměstnanci MŠ<br />
                • Učit děti žít mezi ostatními vrstevníky<br />
                • Rozvíjet přirozenou zvídavost dítěte a touhu po poznání<br />
                • Rozvíjet u dětí schopnost sebeovládání a přizpůsobování se
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Vzdělávací obsah */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
            Vzdělávací obsah
          </Typography>

          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            Vzdělávací obsah je koncipován jako předávání poznatků a získávání zkušeností prostřednictvím loutky, která děti provází celým školním rokem. Dílčí cíle, vzdělávací nabídka a očekávané výstupy jsou chronologicky seřazeny do deseti bloků po měsících, ale, v závislosti na zájmu dětí, je možné blok zkrátit nebo prodloužit. Nejsou v něm obsaženy všechny kompetence, které je třeba dětem předávat, neboť jejich velká část má dlouhodobý charakter a je prakticky procvičována v každodenním styku s dětmi, v situačním a sociálním učení (např. ovládat své emoce, odložit své přání na později apod.). Stejně tak hudební, výtvarné a jazykové dovednosti budou rozvíjeny v průběhu celého roku. V jednotlivých blocích se zaměříme na níže uváděné cíle a činnosti tak, abychom co nejvíce využili nabídek místa školy, ročních období a místních tradic, což nevylučuje jejich procvičování v jiných obdobích školního roku.
          </Typography>

          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            Při sestavování ŠVP PV vycházíme z cílů a oblastí RVP PV, které jsou uzpůsobeny pro potřeby naší školy. Pro učitelky jsou závazným obsahem konkrétních činností. Na jejich základě jsou zpracovány očekávané výstupy, které jsou ovšem jen orientační. Jednotlivé děti je nemusí ve všech činnostech dosáhnout v uvedené kvalitě, záleží na individuálních potřebách a možnostech daného dítěte. Dle dílčích vzdělávacích cílů a očekávaných výstupů je navržena i vzdělávací nabídka, která není pro učitelky závazná – mohou ji doplňovat a upravovat. Platí však zásada, že veškerá plánovaná vzdělávací nabídka by měla být rozpracována v třídním vzdělávacím plánu v souladu s tématy daného integrovaného bloku. Při tvorbě vlastního třídního vzdělávacího plánu učitelky vychází z Gardnerovy teorie mnohočetných inteligencí.
          </Typography>
        </Box>

        <Box sx={{ mt: 5 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'primary.main' }}>
            Školní vzdělávací plán
          </Typography>
          {documents.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Zatím nejsou k dispozici žádné dokumenty.
            </Typography>
          ) : (
            <List>
              {documents.map((doc) => (
                <ListItem
                  key={doc.id}
                  sx={{
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
                    borderRadius: 1,
                    mb: 1,
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon>
                    {getFileIcon(doc.filename)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <a href={doc.path} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                        {doc.title}
                      </a>
                    }
                    secondary={
                      <>
                        {doc.description && <span>{doc.description} • </span>}
                        {formatFileSize(doc.size)}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Box>
    </Paper>
  )
}

