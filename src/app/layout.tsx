import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ReferMakkale - Community Business Directory',
  description: 'A community-driven business directory for local businesses in Melbourne',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black">{children}</body>
    </html>
  )
}
