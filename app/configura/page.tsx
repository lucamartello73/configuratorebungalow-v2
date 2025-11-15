'use client'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { HeaderConfigurator } from '@/components/layout/header-configuratore'

export default function ConfiguraPage() {
  const [step, setStep] = useState(1)
  const [prezzoStimato, setPrezzoStimato] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm()

  const larghezza = watch('larghezza')
  const profondita = watch('profondita')
  const materiale = watch('materiale')

  useEffect(() => {
    if (larghezza && profondita && materiale) {
      const area = (larghezza * profondita) / 10000
      const prezzoBase = materiale === '20mm' ? 80 : 100
      setPrezzoStimato(Math.round(area * prezzoBase))
    }
  }, [larghezza, profondita, materiale])

  async function onSubmit(data: any) {
    setSubmitting(true)
    const { error } = await supabase
      .from('configurazioni_custom')
      .insert({
        ...data,
        prezzo_stimato: prezzoStimato
      })

    if (!error) {
      alert('Richiesta inviata con successo! Ti contatteremo a breve.')
      router.push('/')
    } else {
      alert('Errore invio richiesta. Riprova.')
      console.error(error)
    }
    setSubmitting(false)
  }

  return (
    <>
      <HeaderConfigurator title="Configuratore Su Misura" />
      
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Step 1: Dimensioni</h2>
              <label className="block mb-4">
                <span className="font-semibold">Larghezza (cm)</span>
                <input 
                  type="number" 
                  {...register('larghezza', { required: true, min: 100 })} 
                  className="w-full border rounded-lg px-4 py-2 mt-2" 
                  placeholder="es. 300"
                />
                {errors.larghezza && <span className="text-red-500 text-sm">Campo obbligatorio (min 100cm)</span>}
              </label>
              <label className="block mb-4">
                <span className="font-semibold">Profondità (cm)</span>
                <input 
                  type="number" 
                  {...register('profondita', { required: true, min: 100 })} 
                  className="w-full border rounded-lg px-4 py-2 mt-2" 
                  placeholder="es. 240"
                />
                {errors.profondita && <span className="text-red-500 text-sm">Campo obbligatorio (min 100cm)</span>}
              </label>
              <button 
                type="button" 
                onClick={() => setStep(2)} 
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition w-full"
                disabled={!larghezza || !profondita}
              >
                Avanti
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Step 2: Materiale</h2>
              <label className="block mb-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="radio" value="20mm" {...register('materiale', { required: true })} className="mr-2" />
                <span className="font-semibold">Tavole 20mm</span>
                <p className="text-sm text-gray-600 ml-6">Ideale per casette piccole e medie</p>
              </label>
              <label className="block mb-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="radio" value="30mm" {...register('materiale', { required: true })} className="mr-2" />
                <span className="font-semibold">Tavole 30mm</span>
                <p className="text-sm text-gray-600 ml-6">Maggiore resistenza e isolamento</p>
              </label>
              {errors.materiale && <span className="text-red-500 text-sm">Seleziona un materiale</span>}
              
              {prezzoStimato > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600">Prezzo stimato indicativo</p>
                  <p className="text-3xl font-bold text-green-600">€ {prezzoStimato}</p>
                </div>
              )}
              
              <div className="flex gap-4">
                <button 
                  type="button" 
                  onClick={() => setStep(1)} 
                  className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  Indietro
                </button>
                <button 
                  type="button" 
                  onClick={() => setStep(3)} 
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex-1"
                  disabled={!materiale}
                >
                  Avanti
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Step 3: Dati Cliente</h2>
              <input 
                type="text" 
                {...register('cliente_nome', { required: true })} 
                placeholder="Nome e Cognome" 
                className="w-full border rounded-lg px-4 py-2 mb-4" 
              />
              {errors.cliente_nome && <span className="text-red-500 text-sm block -mt-3 mb-3">Campo obbligatorio</span>}
              
              <input 
                type="email" 
                {...register('email', { required: true, pattern: /^\S+@\S+$/i })} 
                placeholder="Email" 
                className="w-full border rounded-lg px-4 py-2 mb-4" 
              />
              {errors.email && <span className="text-red-500 text-sm block -mt-3 mb-3">Email valida obbligatoria</span>}
              
              <input 
                type="tel" 
                {...register('telefono', { required: true })} 
                placeholder="Telefono" 
                className="w-full border rounded-lg px-4 py-2 mb-4" 
              />
              {errors.telefono && <span className="text-red-500 text-sm block -mt-3 mb-3">Campo obbligatorio</span>}
              
              <input 
                type="text" 
                {...register('zona')} 
                placeholder="Zona/CAP (opzionale)" 
                className="w-full border rounded-lg px-4 py-2 mb-4" 
              />
              
              <div className="flex gap-4">
                <button 
                  type="button" 
                  onClick={() => setStep(2)} 
                  className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  Indietro
                </button>
                <button 
                  type="submit" 
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition flex-1 disabled:bg-gray-400"
                  disabled={submitting}
                >
                  {submitting ? 'Invio...' : 'Invia Richiesta'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  )
}
