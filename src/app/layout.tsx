import type { Metadata } from 'next'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import { PreviousUrlProvider } from '@/context/PreviousURLContext'
import GoogleAPIContextProvider from '@/context/GoogleAPIContext'
import { cormorant } from './fonts'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer'
import { Suspense } from 'react'

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'bg-background min-h-screen font-cormorant antialiased',
          cormorant.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={null}>
            <PreviousUrlProvider>
              <GoogleAPIContextProvider>
                <div className="grid grid-rows-layout h-svh">
                  <Navbar />
                  <div className="grid place-items-center overflow-auto">
                    {children}
                  </div>
                  <Footer />
                </div>
              </GoogleAPIContextProvider>
            </PreviousUrlProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
