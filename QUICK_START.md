# 🚀 Rychlý start

## Spuštění aplikace

Aplikace je již nakonfigurována a připravena k použití!

### 1. Spusťte vývojový server

```bash
npm run dev
```

Server běží na: **http://localhost:3000**

### 2. Prohlédněte si veřejnou část

Otevřete prohlížeč a navštivte:
- **Domovská stránka**: http://localhost:3000
- **O nás**: http://localhost:3000/o-nas
- **Pro rodiče**: http://localhost:3000/pro-rodice
- **Galerie**: http://localhost:3000/galerie
- **Dokumenty**: http://localhost:3000/dokumenty
- **Kontakt**: http://localhost:3000/kontakt

### 3. Přihlaste se do administrace

**URL**: http://localhost:3000/admin/login

**Přihlašovací údaje**:
- 📧 Email: `admin@jiretin.cz`
- 🔑 Heslo: `admin123`

⚠️ **DŮLEŽITÉ**: Po prvním přihlášení změňte heslo!

### 4. Administrace

Po přihlášení máte přístup k:

- **Dashboard** - Přehled statistik
- **Příspěvky** - Správa aktualit a příspěvků
- **Fotogalerie** - Správa alb a fotografií
- **Dokumenty** - Nahrávání a správa dokumentů

## Co je hotovo ✅

### Veřejná část
- ✅ Moderní responzivní design
- ✅ Domovská stránka s informacemi o školce
- ✅ Informace o platbách (stravné 1300 Kč, úplata 200 Kč)
- ✅ Stránka O nás
- ✅ Stránka Pro rodiče (adaptace, co děti potřebují)
- ✅ Fotogalerie
- ✅ Dokumenty ke stažení
- ✅ Kontaktní informace
- ✅ Navigace a patička

### Administrace
- ✅ Přihlašovací systém
- ✅ Dashboard s přehledem
- ✅ Správa příspěvků
- ✅ Správa fotogalerie
- ✅ Správa dokumentů
- ✅ Chráněné administrační rozhraní

## Co je třeba dodělat 🔨

### Priorita 1 - Základní funkce
1. **Formuláře pro vytváření/editaci**
   - Formulář pro nový příspěvek
   - Formulář pro nové album
   - Formulář pro nahrání dokumentu

2. **Nahrávání souborů**
   - Upload fotografií
   - Upload dokumentů (PDF, DOC, atd.)
   - Správa nahraných souborů

3. **Editace obsahu**
   - WYSIWYG editor pro příspěvky
   - Editace stránek (O nás, Pro rodiče)

### Priorita 2 - Vylepšení
1. **Veřejná část**
   - Zobrazení aktualit na domovské stránce
   - Detail příspěvku
   - Zobrazení fotografií v galerii
   - Stažení dokumentů

2. **Administrace**
   - Mazání příspěvků/alb/dokumentů
   - Změna hesla
   - Správa uživatelů

### Priorita 3 - Pokročilé
1. Formulář pro zápis do MŠ
2. Kalendář akcí
3. Jídelníček
4. SEO optimalizace
5. Google Analytics

## Databáze

Databáze SQLite je v souboru: `prisma/dev.db`

**Prohlížení databáze**:
```bash
npx prisma studio
```

Otevře se GUI na http://localhost:5555

**Reset databáze**:
```bash
npx prisma migrate reset --force
npm run db:seed
```

## Struktura barev

- **Primární barva**: Zelená (#2e7d32) - symbolizuje přírodu, růst
- **Sekundární barva**: Oranžová (#ff9800) - teplá, přátelská
- **Pozadí**: Světle šedá (#f5f5f5)

## Technické detaily

- **Framework**: Next.js 16 (React 19)
- **Jazyk**: TypeScript
- **UI**: Material-UI (MUI)
- **Databáze**: SQLite + Prisma
- **Autentizace**: NextAuth.js

## Potřebujete pomoc?

1. Přečtěte si `README.md` pro detailní dokumentaci
2. Zkontrolujte konzoli prohlížeče pro chyby
3. Zkontrolujte terminál pro server logy

## Užitečné příkazy

```bash
# Vývoj
npm run dev              # Spustit server

# Databáze
npx prisma studio        # GUI pro databázi
npm run db:seed          # Naplnit testovacími daty
npx prisma migrate dev   # Vytvořit migraci

# Build
npm run build            # Build pro produkci
npm run start            # Spustit produkční build
```

---

**Vytvořeno**: Únor 2026  
**Pro**: MŠ Jiřetín pod Jedlovou - SMÍŠEK

