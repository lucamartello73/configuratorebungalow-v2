import Link from 'next/link'
import Image from 'next/image'

// Deploy verificato: 2025-11-16
// Test webhook GitHub → Vercel: attivo e funzionante ✅
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <Image 
            src="https://page.gensparksite.com/img/5b071e78-f86b-448e-8321-b9d3f78d5be9.jpg"
            alt="Martello1930"
            width={140}
            height={84}
            className="mx-auto mb-6 rounded-lg shadow-lg"
            priority
          />
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
            Casette in Legno 🏡
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 font-medium mb-2">Sistema Martello1930</p>
          <p className="text-lg md:text-xl text-gray-600">Dal 1930 • Qualità Artigianale</p>
          <p className="text-sm text-blue-600 font-semibold mt-2">✅ Deploy Verificato - Nov 2025</p>
        </div>

        {/* CTA Principali */}
        <div className="max-w-5xl mx-auto space-y-6">
          
          {/* CTA 1: Catalogo */}
          <Link href="/catalogo">
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border-4 border-transparent hover:border-blue-500 group">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition">
                    📦 Sfoglia il Catalogo ✨ NUOVO
                  </h2>
                  <p className="text-lg text-gray-600">
                    Guarda i nostri <strong>9 modelli standard</strong> con foto, prezzi e caratteristiche
                  </p>
                </div>
                <div className="ml-8">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* CTA 2: Configuratore */}
          <Link href="/configura">
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border-4 border-transparent hover:border-green-500 group">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition">
                    🛠️ Configura Su Misura 🔥 AGGIORNATO
                  </h2>
                  <p className="text-lg text-gray-600">
                    Crea la <strong>tua casetta personalizzata</strong> scegliendo dimensioni e materiali
                  </p>
                </div>
                <div className="ml-8">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>

        </div>

        {/* Info Veloci */}
        <div className="max-w-4xl mx-auto mt-16 grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white/80 backdrop-blur p-6 rounded-xl shadow-md">
            <div className="text-4xl mb-3">🏡</div>
            <h3 className="font-bold text-gray-900 mb-2">Qualità Artigianale</h3>
            <p className="text-sm text-gray-600">Legno selezionato e lavorazione su misura</p>
          </div>
          <div className="bg-white/80 backdrop-blur p-6 rounded-xl shadow-md">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-bold text-gray-900 mb-2">Preventivo Rapido</h3>
            <p className="text-sm text-gray-600">Ricevi una stima in pochi minuti</p>
          </div>
          <div className="bg-white/80 backdrop-blur p-6 rounded-xl shadow-md">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-bold text-gray-900 mb-2">Dal 1930</h3>
            <p className="text-sm text-gray-600">Oltre 90 anni di esperienza</p>
          </div>
        </div>

      </div>
    </div>
  )
}
