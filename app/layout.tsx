import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { FooterMartello1930 } from "@/components/layout/footer-martello1930"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Configuratore Casette Legno | Martello1930",
  description: "Configuratore online per casette in legno da giardino - Sistema Martello1930",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          {/* Contenuto dinamico delle pagine */}
          <main className="flex-1">
            {children}
          </main>

          {/* Footer uniforme su tutte le pagine */}
          <FooterMartello1930 />
        </div>
      </body>
    </html>
  )
}
