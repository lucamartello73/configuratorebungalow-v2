import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const modelli = [
    {
      id: 1,
      nome: "Carport RIMINI Basic",
      categoria: "Carport",
      prezzo: "4.500",
      dimensioni: "3m × 6m",
      descrizione: "Protezione doppia per 2 auto in legno lamellare",
      immagine: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
    },
    {
      id: 2,
      nome: "Casetta PENT",
      categoria: "Casette",
      prezzo: "3.200",
      dimensioni: "3m × 2m",
      descrizione: "Casetta attrezzi compatta in pino nordico 28mm",
      immagine: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop"
    },
    {
      id: 3,
      nome: "Winter House",
      categoria: "Abitabili",
      prezzo: "8.900",
      dimensioni: "4m × 4m",
      descrizione: "Casa da giardino coibentata uso invernale",
      immagine: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop"
    },
    {
      id: 4,
      nome: "Eden Classic",
      categoria: "Design",
      prezzo: "4.700",
      dimensioni: "3m × 3m",
      descrizione: "Studio moderno con ampie vetrate",
      immagine: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <Image 
                src="https://page.gensparksite.com/img/5b071e78-f86b-448e-8321-b9d3f78d5be9.jpg"
                alt="Martello1930"
                width={60}
                height={36}
                className="rounded"
              />
              <span className="text-xl font-bold text-gray-900">Martello1930</span>
            </Link>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-900 font-semibold hover:text-blue-600 transition">
                Home
              </Link>
              <Link href="/catalogo" className="text-gray-600 hover:text-blue-600 transition">
                Catalogo
              </Link>
              <Link href="/configura" className="text-gray-600 hover:text-blue-600 transition">
                Configuratore
              </Link>
              <a href="#chi-siamo" className="text-gray-600 hover:text-blue-600 transition">
                Chi Siamo
              </a>
              <a href="#contatti" className="text-gray-600 hover:text-blue-600 transition">
                Contatti
              </a>
            </nav>

            {/* CTA Button */}
            <Link href="/configura">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition">
                Richiedi Preventivo
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-green-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Casette in Legno di Qualità
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8">
              Dal 1930 realizziamo strutture in legno su misura per il tuo giardino
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/catalogo">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition shadow-lg">
                  Esplora il Catalogo
                </button>
              </Link>
              <Link href="/configura">
                <button className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition shadow-lg">
                  Configura Su Misura
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              I Nostri Modelli
            </h2>
            <p className="text-lg text-gray-600">
              Carport, casette da giardino e strutture abitabili di alta qualità
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {modelli.map((modello) => (
              <div key={modello.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-56 bg-gray-200">
                  <Image
                    src={modello.immagine}
                    alt={modello.nome}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                      {modello.categoria}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {modello.nome}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {modello.descrizione}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">{modello.dimensioni}</span>
                    <span className="text-2xl font-bold text-blue-600">€{modello.prezzo}</span>
                  </div>
                  <Link href={`/catalogo?modello=${modello.id}`}>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition">
                      Dettagli
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/catalogo">
              <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition">
                Vedi Tutti i Modelli (9 totali)
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Come Funziona
            </h2>
            <p className="text-lg text-gray-600">
              Tre semplici passi per la tua casetta perfetta
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Scegli il Modello</h3>
              <p className="text-gray-600">
                Esplora il nostro catalogo e seleziona la struttura che preferisci o configura su misura
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Personalizza</h3>
              <p className="text-gray-600">
                Scegli dimensioni, materiali e accessori in base alle tue esigenze
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Ricevi il Preventivo</h3>
              <p className="text-gray-600">
                Ti contattiamo entro 24h con un preventivo dettagliato e tempi di consegna
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="chi-siamo" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Perché Scegliere Martello1930
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🏆</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Qualità Artigianale</h3>
                      <p className="text-gray-600">
                        Oltre 90 anni di esperienza nella lavorazione del legno selezionato
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Preventivo Rapido</h3>
                      <p className="text-gray-600">
                        Ricevi una stima personalizzata in meno di 24 ore
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Su Misura</h3>
                      <p className="text-gray-600">
                        Ogni struttura è personalizzabile secondo le tue necessità
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🚚</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Consegna e Montaggio</h3>
                      <p className="text-gray-600">
                        Servizio completo di trasporto e installazione professionale
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
                  alt="Workshop Martello1930"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contatti" className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Martello1930</h3>
              <p className="text-gray-400 text-sm">
                Dal 1930 produciamo strutture in legno di alta qualità per il tuo giardino.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Link Rapidi</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
                <li><Link href="/catalogo" className="text-gray-400 hover:text-white transition">Catalogo</Link></li>
                <li><Link href="/configura" className="text-gray-400 hover:text-white transition">Configuratore</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contatti</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Via Aurelia, Sestri Levante (GE)</li>
                <li>Tel: +39 0185 167 656</li>
                <li>Email: soluzioni@martello1930.net</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Orari</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Lun - Ven: 8:00 - 18:00</li>
                <li>Sabato: 9:00 - 13:00</li>
                <li>Domenica: Chiuso</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 Martello1930. Tutti i diritti riservati.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/390185167656"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 z-50"
        aria-label="Contattaci su WhatsApp"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  )
}
