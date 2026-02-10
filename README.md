# MŠ Jiřetín pod Jedlovou - Webové stránky

Moderní webové stránky pro Mateřskou školu Jiřetín pod Jedlovou (SMÍŠEK) s administračním rozhraním.

## Technologie

- **Frontend**: Next.js 16 (React 19) + TypeScript
- **UI Framework**: Material-UI (MUI)
- **Database**: SQLite + Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Material-UI + Tailwind CSS

## Funkce

### Veřejná část
- ✅ Domovská stránka s filozofií školky
- ✅ Informace o platbách (stravné, měsíční úplata)
- ✅ Stránka O nás
- ✅ Stránka Pro rodiče (adaptace, co děti potřebují)
- ✅ Fotogalerie
- ✅ Dokumenty ke stažení
- ✅ Kontaktní informace
- ✅ Responzivní design (mobil, tablet, desktop)

### Administrace
- ✅ Přihlášení do administrace
- ✅ Dashboard s přehledem
- ✅ Správa příspěvků/aktualit
- ✅ Správa fotogalerie (alba a fotografie)
- ✅ Správa dokumentů
- ✅ Chráněné administrační rozhraní

## Instalace a spuštění

### Požadavky
- Node.js 18+ 
- npm nebo pnpm

### Kroky

1. **Instalace závislostí**
   ```bash
   npm install
   ```

2. **Nastavení databáze**
   
   Databáze je již vytvořena a naplněna základními daty. Pokud potřebujete resetovat:
   ```bash
   npx prisma migrate reset --force
   npm run db:seed
   ```

3. **Spuštění vývojového serveru**
   ```bash
   npm run dev
   ```

   Aplikace běží na: http://localhost:3000

4. **Přihlášení do administrace**
   
   - URL: http://localhost:3000/admin/login
   - Email: `admin@jiretin.cz`
   - Heslo: `admin123`
   
   ⚠️ **DŮLEŽITÉ**: Po prvním přihlášení změňte heslo!

## Struktura projektu

```
msjiretin/
├── prisma/
│   ├── schema.prisma          # Databázové schéma
│   ├── seed.ts                # Seed data
│   └── dev.db                 # SQLite databáze
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── page.tsx           # Domovská stránka
│   │   ├── o-nas/             # Stránka O nás
│   │   ├── pro-rodice/        # Stránka Pro rodiče
│   │   ├── galerie/           # Fotogalerie
│   │   ├── dokumenty/         # Dokumenty
│   │   ├── kontakt/           # Kontakt
│   │   └── admin/             # Administrace
│   ├── components/            # React komponenty
│   │   ├── Navbar.tsx         # Hlavní navigace
│   │   ├── Footer.tsx         # Patička
│   │   └── admin/             # Admin komponenty
│   └── lib/
│       ├── prisma.ts          # Prisma client
│       └── auth.ts            # NextAuth konfigurace
├── .env                       # Proměnné prostředí
└── package.json
```

## Konfigurace

### Proměnné prostředí (.env)

```env
DATABASE_URL="file:/absolute/path/to/prisma/dev.db"
NEXTAUTH_SECRET="your-secret-key-change-this"
NEXTAUTH_URL="http://localhost:3000"
```

## Příkazy

```bash
# Vývoj
npm run dev              # Spustit vývojový server
npm run build            # Build pro produkci
npm run start            # Spustit produkční server

# Databáze
npx prisma studio        # Otevřít Prisma Studio (GUI pro databázi)
npx prisma migrate dev   # Vytvořit novou migraci
npm run db:seed          # Naplnit databázi testovacími daty
npx prisma generate      # Regenerovat Prisma Client
```

## Další vývoj

### Přidání nového příspěvku
1. Přihlaste se do administrace
2. Klikněte na "Příspěvky" v menu
3. Klikněte na "Nový příspěvek"
4. Vyplňte formulář a publikujte

### Přidání fotografií
1. V administraci klikněte na "Fotogalerie"
2. Vytvořte nové album nebo vyberte existující
3. Nahrajte fotografie

### Nahrání dokumentů
1. V administraci klikněte na "Dokumenty"
2. Klikněte na "Nahrát dokument"
3. Vyberte soubor a vyplňte informace

## Nasazení do produkce

### Doporučené platformy
- **Vercel** (nejjednodušší, free tier)
- **Netlify**
- **Railway**
- **Vlastní VPS** (s Node.js)

### Před nasazením
1. Změňte `NEXTAUTH_SECRET` na silné náhodné heslo
2. Aktualizujte `NEXTAUTH_URL` na produkční URL
3. Pro produkci zvažte PostgreSQL místo SQLite
4. Nastavte správné proměnné prostředí na hosting platformě

## Podpora

Pro otázky nebo problémy kontaktujte vývojáře nebo vytvořte issue v repozitáři.

## Licence

© 2026 MŠ Jiřetín pod Jedlovou. Všechna práva vyhrazena.
