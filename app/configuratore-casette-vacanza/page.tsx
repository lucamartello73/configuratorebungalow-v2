'use client'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ArrowRight, ArrowLeft, Home as HomeIcon, Users, PackageCheck, User, Check } from 'lucide-react'
import { motion } from 'framer-motion'

// 🚫 LOGICA NON MODIFICATA - Tipologie casette vacanza
const TIPOLOGIE = [
  { id: 'preingresso', label: 'Pre-Ingresso', descrizione: 'Spazio coperto per ingressi' },
  { id: 'vacanza', label: 'Casetta Vacanza', descrizione: 'Struttura abitativa temporanea' },
  { id: 'agricamping', label: 'Agricampeggio', descrizione: 'Per strutture rurali' },
  { id: 'camping', label: 'Campeggio', descrizione: 'Per aree camping' },
]

export default function CasetteVacanzaPage() {
  const [step, setStep] = useState(1)
  const [prezzoStimato, setPrezzoStimato] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm()

  const larghezza = watch('larghezza')
  const profondita = watch('profondita')
  const tipologia = watch('tipologia')
  const posti_letto = watch('posti_letto')

  // 🚫 LOGICA NON MODIFICATA - Calcolo prezzo stimato
  useEffect(() => {
    if (larghezza && profondita && tipologia) {
      const area = (larghezza * profondita) / 10000
      let prezzoBase = 90
      
      switch (tipologia) {
        case 'preingresso':
          prezzoBase = 70
          break
        case 'vacanza':
          prezzoBase = 100
          break
        case 'agricamping':
          prezzoBase = 95
          break
        case 'camping':
          prezzoBase = 85
          break
      }
      
      // Aggiungi costo per posti letto se specificato
      const costoPostiLetto = posti_letto ? parseInt(posti_letto) * 200 : 0
      
      setPrezzoStimato(Math.round(area * prezzoBase) + costoPostiLetto)
    }
  }, [larghezza, profondita, tipologia, posti_letto])

  // 🚫 LOGICA NON MODIFICATA - Submit form
  async function onSubmit(data: any) {
    setSubmitting(true)
    const { error } = await supabase
      .from('configurazioni_custom')
      .insert({
        ...data,
        prezzo_stimato: prezzoStimato,
        materiale: `Casetta ${tipologia}`
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
      <Header />
      
      {/* Background identico agli altri configuratori */}
      <div className="min-h-screen bg-[#F8F8F8]">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#6AB52B] to-[#5A9823] text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Configura la Tua Casetta da Vacanza
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-xl text-white/90 max-w-3xl mx-auto"
            >
              Soluzioni versatili per soggiorni, camping, pre-ingressi e agriturismi.
            </motion.p>
          </div>
        </div>

        {/* Mini Benefits Bar */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-[#6AB52B] rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Perfetto per soggiorni brevi o stagionali</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-[#6AB52B] rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Struttura leggera ma resistente</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-[#6AB52B] rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Ideale per camping e agricampeggi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-center gap-4">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all ${
                      step >= num 
                        ? 'bg-[#6AB52B] text-white' 
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      {step > num ? <Check className="w-5 h-5" /> : num}
                    </div>
                    {num < 4 && (
                      <div className={`w-16 h-1 mx-2 transition-all ${
                        step > num ? 'bg-[#6AB52B]' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-12 mt-4">
                <span className={`text-sm font-medium ${step >= 1 ? 'text-[#6AB52B]' : 'text-gray-500'}`}>
                  Tipologia
                </span>
                <span className={`text-sm font-medium ${step >= 2 ? 'text-[#6AB52B]' : 'text-gray-500'}`}>
                  Dimensioni
                </span>
                <span className={`text-sm font-medium ${step >= 3 ? 'text-[#6AB52B]' : 'text-gray-500'}`}>
                  Dettagli
                </span>
                <span className={`text-sm font-medium ${step >= 4 ? 'text-[#6AB52B]' : 'text-gray-500'}`}>
                  Contatti
                </span>
              </div>
            </div>

            {/* Form Card - Stile identico altri configuratori */}
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-md p-6 md:p-8">
                
                {/* Step 1: Tipologia */}
                {step === 1 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-[#E8F5E0] rounded-full flex items-center justify-center">
                        <HomeIcon className="w-6 h-6 text-[#6AB52B]" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Tipologia Casetta</h2>
                        <p className="text-sm text-gray-600">Scegli il tipo di struttura</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {TIPOLOGIE.map((tipo) => (
                        <label 
                          key={tipo.id}
                          className="block p-5 border-2 border-gray-300 rounded-xl cursor-pointer hover:border-[#6AB52B] hover:bg-[#E8F5E0]/30 transition group"
                        >
                          <div className="flex items-start gap-3">
                            <input 
                              type="radio" 
                              value={tipo.id} 
                              {...register('tipologia', { required: true })} 
                              className="mt-1 w-5 h-5 text-[#6AB52B] focus:ring-[#6AB52B]" 
                            />
                            <div className="flex-1">
                              <span className="font-bold text-gray-900 text-lg block mb-1">{tipo.label}</span>
                              <p className="text-sm text-gray-600">{tipo.descrizione}</p>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>

                    {errors.tipologia && (
                      <span className="text-red-500 text-sm mt-2 block">Seleziona una tipologia</span>
                    )}

                    <button 
                      type="button" 
                      onClick={() => setStep(2)} 
                      disabled={!tipologia}
                      className="mt-8 w-full bg-[#6AB52B] text-white px-6 py-3 rounded-lg hover:bg-[#5A9823] transition disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2"
                    >
                      Avanti
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {/* Step 2: Dimensioni */}
                {step === 2 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-[#E8F5E0] rounded-full flex items-center justify-center">
                        <PackageCheck className="w-6 h-6 text-[#6AB52B]" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Dimensioni</h2>
                        <p className="text-sm text-gray-600">Inserisci le misure desiderate</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block mb-2">
                          <span className="text-sm font-semibold text-gray-700">Larghezza (cm)</span>
                        </label>
                        <input 
                          type="number" 
                          {...register('larghezza', { required: true, min: 100 })} 
                          className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-[#6AB52B] focus:outline-none transition" 
                          placeholder="es. 400"
                        />
                        {errors.larghezza && (
                          <span className="text-red-500 text-sm mt-1 block">Campo obbligatorio (min 100cm)</span>
                        )}
                      </div>

                      <div>
                        <label className="block mb-2">
                          <span className="text-sm font-semibold text-gray-700">Profondità (cm)</span>
                        </label>
                        <input 
                          type="number" 
                          {...register('profondita', { required: true, min: 100 })} 
                          className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-[#6AB52B] focus:outline-none transition" 
                          placeholder="es. 350"
                        />
                        {errors.profondita && (
                          <span className="text-red-500 text-sm mt-1 block">Campo obbligatorio (min 100cm)</span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-4 mt-8">
                      <button 
                        type="button" 
                        onClick={() => setStep(1)} 
                        className="flex-1 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition font-semibold flex items-center justify-center gap-2"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        Indietro
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setStep(3)} 
                        disabled={!larghezza || !profondita}
                        className="flex-[2] bg-[#6AB52B] text-white px-6 py-3 rounded-lg hover:bg-[#5A9823] transition disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2"
                      >
                        Avanti
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Dettagli */}
                {step === 3 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-[#E8F5E0] rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-[#6AB52B]" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Dettagli Aggiuntivi</h2>
                        <p className="text-sm text-gray-600">Informazioni utili (opzionali)</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block mb-2">
                          <span className="text-sm font-semibold text-gray-700">Numero posti letto (opzionale)</span>
                        </label>
                        <input 
                          type="number" 
                          {...register('posti_letto', { min: 0, max: 10 })} 
                          className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-[#6AB52B] focus:outline-none transition" 
                          placeholder="es. 4"
                        />
                      </div>

                      <div>
                        <label className="block mb-2">
                          <span className="text-sm font-semibold text-gray-700">Note aggiuntive (opzionale)</span>
                        </label>
                        <textarea
                          {...register('note')}
                          rows={4}
                          className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-[#6AB52B] focus:outline-none transition resize-none"
                          placeholder="Descrivi eventuali esigenze specifiche..."
                        />
                      </div>
                    </div>

                    {prezzoStimato > 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-6 bg-gradient-to-br from-[#E8F5E0] to-[#6AB52B]/10 border-2 border-[#6AB52B] rounded-xl p-6 text-center"
                      >
                        <p className="text-sm font-medium text-gray-700 mb-2">Prezzo Stimato Indicativo</p>
                        <p className="text-4xl font-bold text-[#6AB52B]">€ {prezzoStimato}</p>
                        <p className="text-xs text-gray-600 mt-2">Il prezzo finale verrà confermato dopo analisi tecnica</p>
                      </motion.div>
                    )}

                    <div className="flex gap-4 mt-8">
                      <button 
                        type="button" 
                        onClick={() => setStep(2)} 
                        className="flex-1 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition font-semibold flex items-center justify-center gap-2"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        Indietro
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setStep(4)}
                        className="flex-[2] bg-[#6AB52B] text-white px-6 py-3 rounded-lg hover:bg-[#5A9823] transition font-semibold flex items-center justify-center gap-2"
                      >
                        Avanti
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4: Dati Cliente */}
                {step === 4 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-[#E8F5E0] rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-[#6AB52B]" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">I Tuoi Dati</h2>
                        <p className="text-sm text-gray-600">Per inviarti il preventivo dettagliato</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <input 
                          type="text" 
                          {...register('cliente_nome', { required: true })} 
                          placeholder="Nome e Cognome" 
                          className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-[#6AB52B] focus:outline-none transition" 
                        />
                        {errors.cliente_nome && (
                          <span className="text-red-500 text-sm mt-1 block">Campo obbligatorio</span>
                        )}
                      </div>

                      <div>
                        <input 
                          type="email" 
                          {...register('email', { required: true, pattern: /^\S+@\S+$/i })} 
                          placeholder="Email" 
                          className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-[#6AB52B] focus:outline-none transition" 
                        />
                        {errors.email && (
                          <span className="text-red-500 text-sm mt-1 block">Email valida obbligatoria</span>
                        )}
                      </div>

                      <div>
                        <input 
                          type="tel" 
                          {...register('telefono', { required: true })} 
                          placeholder="Telefono" 
                          className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-[#6AB52B] focus:outline-none transition" 
                        />
                        {errors.telefono && (
                          <span className="text-red-500 text-sm mt-1 block">Campo obbligatorio</span>
                        )}
                      </div>

                      <div>
                        <input 
                          type="text" 
                          {...register('zona')} 
                          placeholder="Zona/CAP (opzionale)" 
                          className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-[#6AB52B] focus:outline-none transition" 
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 mt-8">
                      <button 
                        type="button" 
                        onClick={() => setStep(3)} 
                        className="flex-1 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition font-semibold flex items-center justify-center gap-2"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        Indietro
                      </button>
                      <button 
                        type="submit" 
                        disabled={submitting}
                        className="flex-[2] bg-[#6AB52B] text-white px-6 py-3 rounded-lg hover:bg-[#5A9823] transition disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2"
                      >
                        {submitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Invio...
                          </>
                        ) : (
                          <>
                            <Check className="w-5 h-5" />
                            Invia Richiesta
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

              </form>
            </motion.div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  )
}
