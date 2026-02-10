import type { Metadata } from "next";
import "./globals.css";
import ThemeRegistry from "@/components/ThemeRegistry";
import Navbar from "@/components/Navbar";
import AdminNavbarWrapper from "@/components/admin/AdminNavbarWrapper";
import Footer from "@/components/Footer";
import Providers from "./providers";
import { Box } from "@mui/material";

export const metadata: Metadata = {
  title: "MŠ Jiřetín pod Jedlovou - SMÍŠEK",
  description: "Mateřská škola Jiřetín pod Jedlovou - bezpečné a podnětné prostředí pro děti",
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
