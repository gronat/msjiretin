import type { Metadata } from "next";
import "./globals.css";
import ThemeRegistry from "@/components/ThemeRegistry";
import Navbar from "@/components/Navbar";
import AdminNavbarWrapper from "@/components/admin/AdminNavbarWrapper";
import Footer from "@/components/Footer";
import Providers from "./providers";
import { Box } from "@mui/material";

const siteUrl = 'https://msjiretin.cz'
const siteName = 'MŠ Jiřetín pod Jedlovou - SMÍŠEK | Školka v areálu'
const siteDescription = 'Mateřská škola Jiřetín pod Jedlovou - bezpečné a podnětné prostředí pro děti ve sportovním areálu obce v CHKO Lužických hor.'
const ogImage = {
  url: '/og-msjiretin.jpg',
  width: 1200,
  height: 630,
  alt: 'MŠ Jiřetín pod Jedlovou – SMÍŠEK',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: ['mateřská škola', 'Jiřetín pod Jedlovou', 'SMÍŠEK', 'školka', 'předškolní vzdělávání', 'Lužické hory', 'Děčín'],
  authors: [{ name: siteName }],
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    url: siteUrl,
    siteName,
    title: siteName,
    description: siteDescription,
    images: [ogImage],
  },
  twitter: {
    card: 'summary',
    title: siteName,
    description: siteDescription,
    images: [ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Baloo+2:wght@400;500;600;700&family=Caveat:wght@500;700&family=DM+Sans:wght@400;500;600;700&family=Fredoka:wght@400;500;600;700&family=Lexend:wght@400;500;600;700&family=Nunito:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Quicksand:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body style={{ margin: 0, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'School',
              name: 'Mateřská škola Jiřetín pod Jedlovou',
              alternateName: 'MŠ SMÍŠEK',
              url: 'https://msjiretin.cz',
              description: siteDescription,
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Školní 273',
                addressLocality: 'Jiřetín pod Jedlovou',
                postalCode: '407 56',
                addressCountry: 'CZ',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 50.8625,
                longitude: 14.5681,
              },
              telephone: '+420702152232',
              email: 'skolka@jiretin.cz',
              isPartOf: {
                '@type': 'Organization',
                name: 'MŠ Jiřetín pod Jedlovou, okres Děčín, příspěvková organizace',
              },
            }),
          }}
        />
        <Providers>
          <ThemeRegistry>
            <Navbar />
            <AdminNavbarWrapper />
            <Box component="main" sx={{ flexGrow: 1 }}>
              {children}
            </Box>
            <Footer />
          </ThemeRegistry>
        </Providers>
      </body>
    </html>
  );
}
