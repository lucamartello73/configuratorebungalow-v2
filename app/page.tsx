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
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight">
                Configuratore Bungalow MARTELLO1930
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Progetta il tuo bungalow su misura in pochi semplici passi. Scegli dimensioni, finiture e personalizza ogni dettaglio per il tuo progetto.
              </p>
            </div>

            {/* Image */}
            <div className="flex justify-center">
              <div className="w-full max-w-lg">
                <Image
                  src="/bungalow-example.jpg"
                  alt="Bungalow Martello1930"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-xl object-cover w-full"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCELTA INIZIALE - CASETTA VS BUNGALOW */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-4">
            Scegli la tua soluzione
          </h2>
          <p className="text-lg text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Seleziona il tipo di struttura più adatto alle tue esigenze
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {/* Card Casetta */}
            <div className="bg-gray-50 hover:bg-gray-100 transition-colors p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                Casetta Semplice
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Spessore pareti max 3 cm, vano unico, soluzione economica per deposito attrezzi, bici, o utilizzo stagionale.
              </p>
              <ul className="text-sm text-gray-600 mb-6 space-y-2">
                <li>✓ Struttura in legno naturale</li>
                <li>✓ Ideale per deposito</li>
                <li>✓ Prezzo competitivo</li>
              </ul>
              <Link
                href="/bungalow?type=casetta"
                className="inline-block w-full bg-black text-white text-center px-6 py-3 rounded-md hover:bg-gray-800 transition font-medium"
              >
                Configura Casetta →
              </Link>
            </div>

            {/* Card Bungalow */}
            <div className="bg-gray-50 hover:bg-gray-100 transition-colors p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                Bungalow Abitativo
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Struttura più grande con coibentazione e finiture per uso semi-residenziale, ufficio, o spazio abitativo permanente.
              </p>
              <ul className="text-sm text-gray-600 mb-6 space-y-2">
                <li>✓ Coibentazione professionale</li>
                <li>✓ Finiture di qualità</li>
                <li>✓ Uso abitativo</li>
              </ul>
              <Link
                href="/bungalow?type=abitativo"
                className="inline-block w-full bg-black text-white text-center px-6 py-3 rounded-md hover:bg-gray-800 transition font-medium"
              >
                Configura Bungalow →
              </Link>
            </div>
          </div>
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
