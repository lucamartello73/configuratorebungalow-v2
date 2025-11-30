// ✅ Homepage configuratore bungalow Martello1930 – rebuild completo
// Forza rigenerazione immediata
export const revalidate = 0

import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* HEADER */}
      <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Image src="/logo-martello1930.png" alt="Martello1930" width={140} height={40} />
          </div>
          <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
            <Link href="/">Home</Link>
            <Link href="/modelli">Modelli</Link>
            <Link href="/casette">Casette Giardino</Link>
            <Link href="/bungalow">Bungalow</Link>
            <Link href="/catalogo">Catalogo</Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between mx-auto max-w-7xl p-8">
        <div className="flex-1">
          <h1 className="text-3xl md:text-5xl font-semibold mb-4">
            Configuratore Bungalow MARTELLO1930
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Progetta il tuo bungalow su misura in pochi semplici passi.
          </p>
          <Link
            href="/bungalow"
            className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
          >
            Inizia configurazione →
          </Link>
        </div>
        <div className="flex-1 flex justify-center mb-6 md:mb-0">
          <Image
            src="/bungalow-example.jpg"
            alt="Bungalow Martello1930"
            width={600}
            height={400}
            className="rounded-2xl shadow-2xl object-cover"
          />
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 px-6">
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-2">🏗️ Su Misura</h3>
            <p className="text-gray-600 text-sm">Configura dimensioni e finiture personalizzate.</p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-2">💎 Qualità Garantita</h3>
            <p className="text-gray-600 text-sm">Materiali certificati e lavorazione artigianale dal 1930.</p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-2">🤝 Assistenza Completa</h3>
            <p className="text-gray-600 text-sm">Dalla progettazione al montaggio, seguiti passo dopo passo.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white text-center py-12">
        <h2 className="text-3xl font-semibold mb-4">Pronto per iniziare?</h2>
        <p className="text-gray-600 mb-6">
          Configura il tuo bungalow personalizzato e ricevi un preventivo gratuito in pochi minuti.
        </p>
        <Link
          href="/bungalow"
          className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
        >
          Inizia Ora
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-100 text-gray-700 py-10 mt-auto">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 px-6">
          <div>
            <h4 className="font-semibold mb-2">MARTELLO 1930</h4>
            <p>Legnami • Brico • Outdoor</p>
            <p className="text-sm mt-2">
              Via Traversaro, 13 – Sestri Levante (GE)
              <br />Via Aurelia – Sestri Levante (GE)
            </p>
          </div>
          <div>
            <p>📞 0185.41793</p>
            <p>📧 info@martello1930.net</p>
            <p className="mt-2">🕒 Lun–Ven 8:00–18:00 | Sab 8:00–12:00</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
