import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  openGraph: {
    type: "website",
    url: "https://stalk-cord.vercel.app/",
    title: "StalkCord",
    description: "Stalk Anyone From Discord",
    siteName: "StalkCord",
    images: [{
      url: "https://imgtr.ee/images/2023/07/16/853d6b58c99809d3bb41fe08ef5da8bd.png",
    }],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body className={inter.className}>{children}</body>
    </html>
  )
}
