import type { Metadata } from 'next'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import GoogleAPIContextProvider from '@/context/GoogleAPIContext'
import { cormorant } from './fonts'

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
          'bg-background min-h-screen font-cormorant antialiased',
          cormorant.className
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
