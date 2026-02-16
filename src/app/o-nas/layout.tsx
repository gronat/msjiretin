import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'O nás',
  description: 'Mateřská škola Jiřetín pod Jedlovou se nachází ve sportovním areálu obce. Nabízíme bezpečné prostředí pro děti 3-7 let s důrazem na pohyb a přírodu.',
  alternates: { canonical: '/o-nas' },
}

export default function ONasLayout({ children }: { children: React.ReactNode }) {
  return children
}
