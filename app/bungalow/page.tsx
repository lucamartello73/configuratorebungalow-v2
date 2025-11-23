'use client'

import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { HeaderConfigurator } from '@/components/layout/header-configuratore'
import { BungalowConfigSchema, type BungalowConfig } from '@/types/bungalow'
import { DimensioniStep } from '@/components/bungalow/DimensioniStep'
import { VaniStep } from '@/components/bungalow/VaniStep'
import { NoteUploadStep } from '@/components/bungalow/NoteUploadStep'
import { DatiClienteStep } from '@/components/bungalow/DatiClienteStep'
import { RiepilogoStep } from '@/components/bungalow/RiepilogoStep'
import { submitPreventivo } from '@/lib/bungalow-api'
import { ChevronLeft, ChevronRight, Send, Home } from 'lucide-react'

const STEPS = [
  { id: 1, title: 'Dimensioni', description: 'Lunghezza e larghezza del bungalow' },
  { id: 2, title: 'Vani', description: 'Scegli il numero di vani interni' },
  { id: 3, title: 'Note e Allegati', description: 'Aggiungi dettagli e immagini' },
  { id: 4, title: 'Dati Cliente', description: 'I tuoi contatti' },
  { id: 5, title: 'Riepilogo', description: 'Verifica e invia richiesta' },
]

export default function BungalowConfiguratorePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const router = useRouter()

  const methods = useForm<BungalowConfig>({
    resolver: zodResolver(BungalowConfigSchema),
    mode: 'onChange',
    defaultValues: {
      lunghezza: 6,
      larghezza: 4,
      numero_vani: 2,
      note: '',
      cliente_nome: '',
      email: '',
      telefono: '',
      allegati: [],
    },
  })

  const { handleSubmit, trigger, getValues } = methods

  // Naviga al prossimo step con validazione
  const handleNext = async () => {
    let fieldsToValidate: (keyof BungalowConfig)[] = []

    switch (currentStep) {
      case 1:
        fieldsToValidate = ['lunghezza', 'larghezza']
        break
      case 2:
        fieldsToValidate = ['numero_vani']
        break
      case 3:
        // Note e allegati sono opzionali
        setCurrentStep(4)
        return
      case 4:
        // Dati cliente opzionali, vai a riepilogo
        setCurrentStep(5)
        return
    }

    const isValid = await trigger(fieldsToValidate)
    if (isValid) {
      setCurrentStep(currentStep + 1)
    }
  }

  // Torna indietro
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setSubmitError(null)
    }
  }

  // Vai direttamente a uno step
  const goToStep = async (step: number) => {
    if (step < currentStep) {
      // Torna indietro senza validazione
      setCurrentStep(step)
    } else if (step > currentStep) {
      // Valida gli step intermedi
      for (let i = currentStep; i < step; i++) {
        const valid = await validateStep(i)
        if (!valid) return
      }
      setCurrentStep(step)
    }
  }

  // Valida uno step specifico
  const validateStep = async (step: number): Promise<boolean> => {
    switch (step) {
      case 1:
        return await trigger(['lunghezza', 'larghezza'])
      case 2:
        return await trigger(['numero_vani'])
      case 3:
      case 4:
        return true // Opzionali
      default:
        return true
    }
  }

  // Invia preventivo
  const onSubmit = async (data: BungalowConfig) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const result = await submitPreventivo(data)

      if (result.success) {
        // Redirect a pagina di conferma
        router.push(`/bungalow/conferma/${result.id}`)
      } else {
        setSubmitError(result.error || 'Errore durante l\'invio. Riprova.')
      }
    } catch (error) {
      console.error('Errore submit:', error)
      setSubmitError('Errore di connessione. Verifica la tua connessione internet.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Calcola progresso
  const progress = ((currentStep - 1) / (STEPS.length - 1)) * 100

  return (
    <>
      <HeaderConfigurator title="Configuratore Bungalow Su Misura" />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header con progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => router.push('/')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
              >
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline">Torna alla home</span>
              </button>
              <div className="text-sm text-gray-600">
                Step {currentStep} di {STEPS.length}
              </div>
            </div>

            {/* Progress bar */}
            <div className="relative">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-green-600 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              {/* Step indicators */}
              <div className="flex justify-between mt-4">
                {STEPS.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => goToStep(step.id)}
                    className={`flex flex-col items-center transition ${
                      step.id === currentStep
                        ? 'scale-110'
                        : step.id < currentStep
                        ? 'opacity-75 hover:opacity-100'
                        : 'opacity-40'
                    }`}
                    disabled={step.id > currentStep && isSubmitting}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white mb-2 ${
                        step.id < currentStep
                          ? 'bg-green-600'
                          : step.id === currentStep
                          ? 'bg-blue-600 ring-4 ring-blue-200'
                          : 'bg-gray-300'
                      }`}
                    >
                      {step.id < currentStep ? '✓' : step.id}
                    </div>
                    <span className="text-xs font-medium text-gray-700 text-center hidden sm:block max-w-[80px]">
                      {step.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Card principale */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 sm:p-8 lg:p-12">
              {/* Titolo step corrente */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {STEPS[currentStep - 1].title}
                </h2>
                <p className="text-gray-600">
                  {STEPS[currentStep - 1].description}
                </p>
              </div>

              {/* Form con context */}
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Steps content */}
                  <div className="min-h-[400px]">
                    {currentStep === 1 && <DimensioniStep />}
                    {currentStep === 2 && <VaniStep />}
                    {currentStep === 3 && <NoteUploadStep />}
                    {currentStep === 4 && <DatiClienteStep />}
                    {currentStep === 5 && <RiepilogoStep />}
                  </div>

                  {/* Errore submit */}
                  {submitError && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 text-sm font-medium">{submitError}</p>
                    </div>
                  )}

                  {/* Navigation buttons */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t">
                    <button
                      type="button"
                      onClick={handlePrev}
                      disabled={currentStep === 1 || isSubmitting}
                      className="flex items-center gap-2 px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      <span>Indietro</span>
                    </button>

                    {currentStep < STEPS.length ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                      >
                        <span>Avanti</span>
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Invio in corso...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            <span>Invia Richiesta</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>

          {/* Info aggiuntiva */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              🔒 I tuoi dati sono protetti e utilizzati solo per elaborare la richiesta.
            </p>
            <p className="mt-2">
              Riceverai un preventivo dettagliato entro 24-48 ore.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
