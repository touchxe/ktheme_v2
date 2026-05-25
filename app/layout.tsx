import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: '케이테마 교회',
    template: '%s | 케이테마 교회',
  },
  description: '케이테마 교회 공식 웹사이트 - 예배와 말씀, 사역과 공동체',
  keywords: ['교회', '예배', '말씀', '사역', '공동체', '새가족'],
  authors: [{ name: '케이테마 교회' }],
  openGraph: {
    title: '케이테마 교회',
    description: '케이테마 교회 공식 웹사이트 - 예배와 말씀, 사역과 공동체',
    type: 'website',
    locale: 'ko_KR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen font-body">
        {children}
      </body>
    </html>
  )
}
