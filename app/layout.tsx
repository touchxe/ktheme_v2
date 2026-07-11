import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: '샘물교회',
    template: '%s | 샘물교회',
  },
  description: '예배하고, 서로를 돌보며, 지역과 다음세대를 섬기는 샘물교회입니다.',
  keywords: ['교회', '예배', '말씀', '사역', '공동체', '새가족'],
  authors: [{ name: '샘물교회' }],
  openGraph: {
    title: '샘물교회',
    description: '예배하고, 서로를 돌보며, 지역과 다음세대를 섬기는 샘물교회입니다.',
    type: 'website',
    locale: 'ko_KR',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: '샘물교회 — 일상에서 함께 자라는 믿음' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '샘물교회',
    description: '일상에서 함께 자라는 믿음',
    images: ['/og.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-screen font-body">
        {children}
      </body>
    </html>
  )
}
