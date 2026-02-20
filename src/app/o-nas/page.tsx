import { Container, Typography, Box, Card, CardContent } from "@mui/material";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O nás",
  description: "Mateřská škola Jiřetín pod Jedlovou - SMÍŠEK. Poznejte naši školu, její historii, poslání a tým pedagogů, kteří se starají o vaše děti.",
  keywords: ["o nás", "mateřská škola", "Jiřetín pod Jedlovou", "SMÍŠEK", "historie", "tým", "pedagogové"],
  openGraph: {
    title: "O nás | MŠ Jiřetín pod Jedlovou - SMÍŠEK",
    description: "Poznejte naši mateřskou školu, její historii, poslání a tým pedagogů, kteří se starají o vaše děti.",
  },
};

export default function AboutPage() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          O naší mateřské škole
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          MŠ Jiřetín pod Jedlovou - SMÍŠEK
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
          gap: 4,
        }}
      >
        <Box>
          <Card sx={{ mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom>
                Naše poslání
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                Mateřská škola Jiřetín pod Jedlovou - SMÍŠEK poskytuje předškolní vzdělávání 
                dětem ve věku od 3 do 6 let v krásném prostředí Lužických hor. Naším cílem 
                je vytvořit bezpečné, podnětné a láskyplné prostředí, kde se každé dítě může 
                rozvíjet podle svých individuálních potřeb a schopností.
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                Naše škola se nachází v areálu obce Jiřetín pod Jedlovou, což nám umožňuje 
                využívat sportovní zázemí a přírodní prostředí pro různorodé aktivity. 
                Věříme v propojení vzdělávání s pohybem a pobytem v přírodě.
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom>
                Naše hodnoty
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <Typography component="li" variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
                  <strong>Individuální přístup</strong> - každé dítě je jedinečné a má své specifické potřeby
                </Typography>
                <Typography component="li" variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
                  <strong>Bezpečnost a pohoda</strong> - vytváříme prostředí, kde se děti cítí jistě a spokojeně
                </Typography>
                <Typography component="li" variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
                  <strong>Propojení s přírodou</strong> - využíváme krásné prostředí Lužických hor pro vzdělávání
                </Typography>
                <Typography component="li" variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
                  <strong>Spolupráce s rodiči</strong> - rodiče jsou našimi partnery ve vzdělávání dětí
                </Typography>
                <Typography component="li" variant="body1" sx={{ lineHeight: 1.7 }}>
                  <strong>Radost z učení</strong> - podporujeme přirozenou zvědavost a chuť dětí poznávat svět
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>
                Základní informace
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  Název školy
                </Typography>
                <Typography variant="body2">
                  MŠ Jiřetín pod Jedlovou, okres Děčín, příspěvková organizace
                </Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  Adresa
                </Typography>
                <Typography variant="body2">
                  Školní 273<br />
                  407 56 Jiřetín pod Jedlovou
                </Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  Kontakt
                </Typography>
                <Typography variant="body2">
                  Tel: +420 702 152 232<br />
                  Email: skolka@jiretin.cz
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  Kapacita
                </Typography>
                <Typography variant="body2">
                  Maximálně 25 dětí ve věku 3-6 let
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}