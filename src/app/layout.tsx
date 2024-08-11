import type { Metadata } from 'next'
import { Aref_Ruqaa_Ink } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import GoogleAPIContextProvider from '@/context/GoogleAPIContext'

const arefRuqaaInk = Aref_Ruqaa_Ink({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'gotham lights',
  description: 'Send signals to strangers you crushed on!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'bg-background min-h-screen font-serif antialiased',
          arefRuqaaInk.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GoogleAPIContextProvider>{children}</GoogleAPIContextProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
