import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pro rodiče',
  description: 'Informace pro rodiče - provozní doba, platby, stravné, organizace dne v MŠ Jiřetín pod Jedlovou.',
  alternates: { canonical: '/pro-rodice' },
}

export default function ProRodiceLayout({ children }: { children: React.ReactNode }) {
  return children
}
