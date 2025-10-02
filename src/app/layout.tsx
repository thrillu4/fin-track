import { ThemeProvider } from '@/components/Dashboard/theme-provider'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Finance Tracker',
  description: 'Manage your finance with bank dashboard tracker',
  icons: {
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180' }],
    other: [
      { rel: 'android-chrome', url: '/icons/android-chrome-192x192.png' },
      { rel: 'android-chrome', url: '/icons/android-chrome-512x512.png' },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
