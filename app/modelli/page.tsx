'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import CasettaCard from '@/components/CasettaCard'
import { HeaderConfigurator } from '@/components/layout/header-configuratore'

export default function ModelliPage() {
  const [modelli, setModelli] = useState<any[]>([])
  const [filtroMateriale, setFiltroMateriale] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchModelli()
  }, [])

  async function fetchModelli() {
    setLoading(true)
    const { data, error } = await supabase
      .from('modelli_standard')
      .select('*')
      .order('creato_il', { ascending: false })
    
    if (data) setModelli(data)
    if (error) console.error('Errore caricamento modelli:', error)
    setLoading(false)
  }

  const modelliFiltrati = filtroMateriale
    ? modelli.filter(m => m.materiale?.includes(filtroMateriale))
    : modelli

  return (
    <>
      <HeaderConfigurator title="Modelli Standard" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-4">
          <label className="font-semibold">Filtra per materiale:</label>
          <select 
            className="border rounded-lg px-4 py-2 bg-white shadow-sm"
            onChange={(e) => setFiltroMateriale(e.target.value)}
          >
            <option value="">Tutti</option>
            <option value="20">Tavole 20mm</option>
            <option value="30">Tavole 30mm</option>
            <option value="lamellare">Lamellare</option>
          </select>
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
