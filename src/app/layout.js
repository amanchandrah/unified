import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Unified |  Outreach and Hospitality',
  description: 'Centralized app for O&H IITM Paradox',
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/images/logoo.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
