import Image from 'next/image'
import Link from 'next/link'

export default function CatalogoPage() {
  const modelli = [
    {
      id: 1,
      nome: "Carport RIMINI Basic 3x6",
      categoria: "Carport",
      prezzo: "€4.500",
      dimensioni: "3m × 6m × 2.5m",
      materiale: "Legno lamellare",
      descrizione: "Carport doppio per 2 auto, struttura in legno lamellare",
      immagine: "https://www.genspark.ai/api/files/s/ZVQs8due"
    },
    {
      id: 2,
      nome: "Carport RIMINI Plus 4x6",
      categoria: "Carport",
      prezzo: "€5.800",
      dimensioni: "4m × 6m × 2.7m",
      materiale: "Legno lamellare trattato",
      descrizione: "Carport spazioso per 2 auto grandi o camper",
      immagine: "https://www.genspark.ai/api/files/s/9S87BoP5"
    },
    {
      id: 3,
      nome: "Carport RIMINI XL 5x8",
      categoria: "Carport",
      prezzo: "€8.200",
      dimensioni: "5m × 8m × 2.8m",
      materiale: "Legno lamellare premium",
      descrizione: "Carport extra large per 3 veicoli o camper",
      immagine: "https://www.genspark.ai/api/files/s/uwoU3rUe"
    },
    {
      id: 4,
      nome: "Casetta PENT 3x2",
      categoria: "Casette",
      prezzo: "€3.200",
      dimensioni: "3m × 2m × 2.2m",
      materiale: "Pino nordico 28mm",
      descrizione: "Casetta attrezzi compatta con tetto monofalda",
      immagine: "https://www.genspark.ai/api/files/s/NACsfzir"
    },
    {
      id: 5,
      nome: "Casetta PENT 4x3",
      categoria: "Casette",
      prezzo: "€5.100",
      dimensioni: "4m × 3m × 2.4m",
      materiale: "Pino nordico 44mm",
      descrizione: "Casetta multifunzione con ampio spazio interno",
      immagine: "https://www.genspark.ai/api/files/s/6z4aW8bg"
    },
    {
      id: 6,
      nome: "Winter House 4x4",
      categoria: "Winter House",
      prezzo: "€8.900",
      dimensioni: "4m × 4m × 2.7m",
      materiale: "Legno massiccio 70mm + isolamento",
      descrizione: "Casetta abitabile coibentata per uso invernale",
      immagine: "https://www.genspark.ai/api/files/s/R02xtVRN"
    },
    {
      id: 7,
      nome: "Winter House 5x4",
      categoria: "Winter House",
      prezzo: "€11.500",
      dimensioni: "5m × 4m × 2.8m",
      materiale: "Legno massiccio 92mm + isolamento 50mm",
      descrizione: "Casa da giardino premium con isolamento totale",
      immagine: "https://www.genspark.ai/api/files/s/TeIMa8Hl"
    },
    {
      id: 8,
      nome: "Eden Classic 3x3",
      categoria: "Eden Design",
      prezzo: "€4.700",
      dimensioni: "3m × 3m × 2.4m",
      materiale: "Abete premium 44mm",
      descrizione: "Casetta design moderno con ampie vetrate",
      immagine: "https://www.genspark.ai/api/files/s/HwoHJfJe"
    },
    {
      id: 9,
      nome: "Eden Deluxe 4x3",
      categoria: "Eden Design",
      prezzo: "€6.800",
      dimensioni: "4m × 3m × 2.5m",
      materiale: "Abete premium 58mm",
      descrizione: "Studio/ufficio da giardino con design contemporaneo",
      immagine: "https://www.genspark.ai/api/files/s/aToT0IrW"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Torna alla Home
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Catalogo Casette Legno</h1>
          </div>
        </div>
      </header>

      {/* Catalogo */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">I Nostri Modelli</h2>
          <p className="text-xl text-gray-600">9 strutture in legno di qualità - Dal 1930</p>
        </div>

        {/* Grid Prodotti */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {modelli.map((modello) => (
            <div key={modello.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              {/* Immagine */}
              <div className="relative h-64 w-full bg-gray-100">
                <Image
                  src={modello.immagine}
                  alt={modello.nome}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Badge Categoria */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-full shadow-lg">
                    {modello.categoria}
                  </span>
                </div>
              </div>

              {/* Contenuto */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{modello.nome}</h3>
                <p className="text-gray-600 text-sm mb-4">{modello.descrizione}</p>

                {/* Info Prodotto */}
                <div className="space-y-2 mb-4 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    <span className="font-semibold">{modello.dimensioni}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>{modello.materiale}</span>
                  </div>
                </div>

                {/* Prezzo e CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-3xl font-bold text-green-600">{modello.prezzo}</span>
                </div>

                <Link href={`/configura?modello=${modello.id}`}>
                  <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
                    Richiedi Preventivo
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Footer */}
        <div className="text-center mt-16 bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Non trovi quello che cerchi?</h3>
          <p className="text-gray-600 mb-6">Crea la tua casetta su misura con il nostro configuratore</p>
          <Link href="/configura">
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg text-lg">
              Configura Su Misura
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
