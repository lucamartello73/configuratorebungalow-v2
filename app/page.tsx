import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const modelli = [
    {
      id: 1,
      nome: "Carport RIMINI Basic",
      immagine: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      descrizione: "Carport doppio 3x6m"
    },
    {
      id: 2,
      nome: "Carport RIMINI Plus",
      immagine: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=400&fit=crop",
      descrizione: "Carport spazioso 4x6m"
    },
    {
      id: 3,
      nome: "Carport RIMINI XL",
      immagine: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop",
      descrizione: "Carport extra large 5x8m"
    },
    {
      id: 4,
      nome: "Casetta PENT 3x2",
      immagine: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      descrizione: "Casetta attrezzi compatta"
    },
    {
      id: 5,
      nome: "Casetta PENT 4x3",
      immagine: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
      descrizione: "Casetta multifunzione"
    },
    {
      id: 6,
      nome: "Winter House 4x4",
      immagine: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop",
      descrizione: "Casa coibentata abitabile"
    },
    {
      id: 7,
      nome: "Winter House 5x4",
      immagine: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
      descrizione: "Casa premium isolata"
    },
    {
      id: 8,
      nome: "Eden Classic 3x3",
      immagine: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
      descrizione: "Design moderno con vetrate"
    },
    {
      id: 9,
      nome: "Eden Deluxe 4x3",
      immagine: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=600&h=400&fit=crop",
      descrizione: "Studio/ufficio da giardino"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Professionale - Identico a Pensiline */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-start gap-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Image 
                src="https://page.gensparksite.com/img/5b071e78-f86b-448e-8321-b9d3f78d5be9.jpg"
                alt="Martello1930 Logo"
                width={80}
                height={80}
                className="rounded"
              />
            </div>
            
            {/* Info Aziendali Complete */}
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                MARTELLO 1930 — Legnami • Brico • Outdoor
              </h1>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-semibold">Sede:</span> Via Traversaro, 13 — 16039 SESTRI LEVANTE (GE)</p>
                <p><span className="font-semibold">Esposizione:</span> Via Aurelia — SESTRI LEVANTE</p>
                <p><span className="font-semibold">Orario:</span> lun–ven 8:00–12:00 / 14:00–18:00 — sab 08:00–12:00</p>
                <p>
                  <span className="font-semibold">Contatto:</span> Tel 0185.41793 — 
                  <a href="mailto:info@martello1930.net" className="text-[#1b6d7f] hover:underline ml-1">info@martello1930.net</a> — 
                  <span className="ml-1">PI 00167970995</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Titolo Grande Centrato */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center">
            Scegli il Modello di Casetta
          </h2>
        </div>
      </section>

      {/* Grid Layout con Immagini - Identico a Pensiline */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modelli.map((modello) => (
            <div 
              key={modello.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Immagine Prodotto */}
              <div className="relative h-48 w-full bg-gray-200">
                <Image
                  src={modello.immagine}
                  alt={modello.nome}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Contenuto Card */}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {modello.nome}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {modello.descrizione}
                </p>
                
                {/* Pulsante Dettagli - Stile Teal */}
                <Link href={`/catalogo?modello=${modello.id}`}>
                  <button className="w-full bg-[#1b6d7f] hover:bg-[#155a6a] text-white font-semibold py-2.5 px-4 rounded transition-colors duration-200">
                    Dettagli
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sezione CTA Secondaria */}
      <section className="bg-white py-12 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Non trovi il modello adatto?
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            Configura la tua casetta su misura con il nostro configuratore interattivo
          </p>
          <Link href="/configura">
            <button className="bg-[#1b6d7f] hover:bg-[#155a6a] text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200">
              Configuratore Su Misura
            </button>
          </Link>
        </div>
      </section>

      {/* Footer Semplice */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">
            © 2025 Martello1930 - Via Traversaro, 13 — 16039 SESTRI LEVANTE (GE) - Tel 0185.41793
          </p>
        </div>
      </footer>

      {/* WhatsApp FAB - Discreto */}
      <a
        href="https://wa.me/390185167656"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#20BA5A] text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 z-50"
        aria-label="Contattaci su WhatsApp"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  )
}
