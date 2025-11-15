import Link from 'next/link'
import Image from 'next/image'

interface Modello {
  id: string
  nome: string
  descrizione?: string
  dimensioni?: string
  prezzo?: number
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
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{modello.nome}</h3>
        {modello.descrizione && (
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{modello.descrizione}</p>
        )}
        <div className="flex justify-between items-center mb-4">
          {modello.dimensioni && (
            <span className="text-sm text-gray-500">{modello.dimensioni}</span>
          )}
          {modello.prezzo && (
            <span className="text-lg font-bold text-green-600">€ {modello.prezzo.toFixed(2)}</span>
          )}
        </div>
        <Link href={`/configura?modello=${modello.id}`}>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Configura
          </button>
        </Link>
      </div>
    </div>
  )
}
