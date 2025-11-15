'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import CasettaCard from '@/components/CasettaCard'
import { HeaderConfigurator } from '@/components/layout/header-configuratore'

export default function ModelliPage() {
  const [modelli, setModelli] = useState<any[]>([])
  const [filtroCategoria, setFiltroCategoria] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchModelli()
  }, [])

  async function fetchModelli() {
    setLoading(true)
    const { data, error } = await supabase
      .from('modelli_standard')
      .select('*')
      .order('id', { ascending: true })
    
    if (data) setModelli(data)
    if (error) console.error('Errore caricamento modelli:', error)
    setLoading(false)
  }

  const modelliFiltrati = filtroCategoria
    ? modelli.filter(m => m.categoria === filtroCategoria)
    : modelli

  return (
    <>
      <HeaderConfigurator title="Modelli Standard" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <label className="font-semibold text-lg">Filtra per categoria:</label>
          <div className="flex gap-2">
            <button 
              onClick={() => setFiltroCategoria('')}
              className={`px-4 py-2 rounded-lg transition ${filtroCategoria === '' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              Tutti
            </button>
            <button 
              onClick={() => setFiltroCategoria('carport')}
              className={`px-4 py-2 rounded-lg transition ${filtroCategoria === 'carport' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              Carport
            </button>
            <button 
              onClick={() => setFiltroCategoria('casette')}
              className={`px-4 py-2 rounded-lg transition ${filtroCategoria === 'casette' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              Casette
            </button>
            <button 
              onClick={() => setFiltroCategoria('winter')}
              className={`px-4 py-2 rounded-lg transition ${filtroCategoria === 'winter' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              Winter House
            </button>
            <button 
              onClick={() => setFiltroCategoria('eden')}
              className={`px-4 py-2 rounded-lg transition ${filtroCategoria === 'eden' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              Eden
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Caricamento modelli...</p>
          </div>
        ) : modelliFiltrati.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Nessun modello disponibile. Configura la tua casetta su misura!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {modelliFiltrati.map(modello => (
              <CasettaCard key={modello.id} modello={modello} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
