import type { Metadata } from 'next'
import { Inter, Oswald } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const oswald = Oswald({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
})

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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FHMV7EKRWF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FHMV7EKRWF');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${oswald.variable} bg-[#050505] text-gray-300 antialiased selection:bg-[#E30613] selection:text-white`}>
        {children}
        <Script src="https://static.elfsight.com/platform/platform.js" strategy="lazyOnload" />
      </body>
    </html>
  )
}
