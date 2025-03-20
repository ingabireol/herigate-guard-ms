import './globals.css'
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/common/header'
import Footer from '@/components/common/footer'
import { AuthProvider } from '@/store/auth-context'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Rwanda Heritage Guard',
  description: 'Preserving and showcasing Rwanda\'s cultural heritage',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}