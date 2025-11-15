import Link from 'next/link'
import Image from 'next/image'

interface Modello {
  id: number
  nome: string
  categoria: string
  descrizione?: string
  larghezza_cm: number
  profondita_cm: number
  altezza_cm: number
  prezzo_base: number
  materiale?: string
  immagine_url?: string
}

export default function CasettaCard({ modello }: { modello: Modello }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
      {modello.immagine_url && (
        <div className="relative h-48 w-full">
          <Image 
            src={modello.immagine_url} 
            alt={modello.nome}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="mb-2">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full uppercase">
            {modello.categoria}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-800">{modello.nome}</h3>
        {modello.descrizione && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{modello.descrizione}</p>
        )}
        <div className="space-y-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span>{modello.larghezza_cm/100}m × {modello.profondita_cm/100}m × {modello.altezza_cm/100}m</span>
          </div>
          {modello.materiale && (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>{modello.materiale}</span>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center mb-4 pt-4 border-t border-gray-200">
          <span className="text-2xl font-bold text-green-600">€ {modello.prezzo_base.toLocaleString('it-IT')}</span>
        </div>
        <Link href={`/configura?modello=${modello.id}`}>
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
            Richiedi Preventivo
          </button>
        </Link>
      </div>
    </div>
  )
}
