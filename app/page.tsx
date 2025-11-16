import Link from 'next/link'
import Image from 'next/image'

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
        </div>

        {/* Galleria Immagini Casette */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">I Nostri Modelli</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Carport RIMINI */}
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg group cursor-pointer">
              <Image
                src="https://www.genspark.ai/api/files/s/ZVQs8due"
                alt="Carport RIMINI Basic 3x6"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <div className="text-white">
                  <span className="inline-block px-2 py-1 bg-blue-500 rounded text-xs font-semibold mb-1">CARPORT</span>
                  <h3 className="text-xl font-bold mb-1">Carport RIMINI</h3>
                  <p className="text-xs mb-1">Da 3×6m a 5×8m</p>
                  <p className="text-sm font-bold text-green-300">Da €4.500</p>
                </div>
              </div>
            </div>

            {/* Casetta PENT */}
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg group cursor-pointer">
              <Image
                src="https://www.genspark.ai/api/files/s/NACsfzir"
                alt="Casetta PENT 3x2"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <div className="text-white">
                  <span className="inline-block px-2 py-1 bg-amber-500 rounded text-xs font-semibold mb-1">CASETTE</span>
                  <h3 className="text-xl font-bold mb-1">Casetta PENT</h3>
                  <p className="text-xs mb-1">Pino nordico 28mm</p>
                  <p className="text-sm font-bold text-green-300">Da €3.200</p>
                </div>
              </div>
            </div>

            {/* Winter House */}
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg group cursor-pointer">
              <Image
                src="https://www.genspark.ai/api/files/s/R02xtVRN"
                alt="Winter House 4x4"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <div className="text-white">
                  <span className="inline-block px-2 py-1 bg-purple-500 rounded text-xs font-semibold mb-1">WINTER HOUSE</span>
                  <h3 className="text-xl font-bold mb-1">Winter House</h3>
                  <p className="text-xs mb-1">70mm isolato</p>
                  <p className="text-sm font-bold text-green-300">Da €8.900</p>
                </div>
              </div>
            </div>

            {/* Eden Design */}
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg group cursor-pointer">
              <Image
                src="https://www.genspark.ai/api/files/s/HwoHJfJe"
                alt="Eden Classic 3x3"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <div className="text-white">
                  <span className="inline-block px-2 py-1 bg-green-500 rounded text-xs font-semibold mb-1">EDEN DESIGN</span>
                  <h3 className="text-xl font-bold mb-1">Eden Classic</h3>
                  <p className="text-xs mb-1">Design moderno</p>
                  <p className="text-sm font-bold text-green-300">Da €4.700</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Principali */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 mb-16">
          
          {/* CTA 1: Catalogo */}
          <Link href="/catalogo">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer group">
              <div className="text-center">
                <div className="text-5xl mb-3">📦</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                  Catalogo Modelli
                </h2>
                <p className="text-sm text-gray-600">
                  9 modelli standard con prezzi
                </p>
              </div>
            </div>
          </Link>

          {/* CTA 2: Configuratore */}
          <Link href="/configura">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer group">
              <div className="text-center">
                <div className="text-5xl mb-3">🛠️</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition">
                  Configura Su Misura
                </h2>
                <p className="text-sm text-gray-600">
                  Dimensioni e materiali personalizzati
                </p>
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
