
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {Navbar} from "./components/Navbar"
import { AuthProvider } from './context/AuthContext'
import { ProtectRoute } from './protectedRoutes'
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary'




const inter = Inter({ subsets: ['vietnamese'] })

export const metadata: Metadata = {
  title: 'Country-rank',
  description: 'Application which displays the country rank',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  
  return (
    <html lang="en">
      <body className={inter.className}>
      <AuthProvider>
       <Navbar/>
        <ErrorBoundary>
          <ProtectRoute>
            {children}
          </ProtectRoute>         
          </ErrorBoundary>
          </AuthProvider>
          
      </body>
    </html>
  )
}
