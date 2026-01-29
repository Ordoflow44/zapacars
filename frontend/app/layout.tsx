import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ZapaCars | Warsztat Samochodowy Mysłowice',
  description: 'Kompleksowy warsztat samochodowy w Mysłowicach. Serwis bieżący, profesjonalne lakiernictwo i renowacja klasyków.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className="scroll-smooth">
      <body>{children}</body>
    </html>
  )
}
