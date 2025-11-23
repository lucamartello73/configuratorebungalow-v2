'use client'

import { useFormContext } from 'react-hook-form'
import { type BungalowConfig } from '@/types/bungalow'
import { PiantaDinamica } from './PiantaDinamica'
import { DoorOpen } from 'lucide-react'

const VANI_OPTIONS = [
  {
    valore: 1,
    label: '1 Vano',
    descrizione: 'Open space unico',
    ideale: 'Deposito, garage, studio',
    icon: '🏠',
  },
  {
    valore: 2,
    label: '2 Vani',
    descrizione: 'Divisione in 2 stanze',
    ideale: 'Camera + bagno, ufficio + ripostiglio',
    icon: '🏘️',
  },
  {
    valore: 3,
    label: '3 Vani',
    descrizione: 'Divisione in 3 stanze',
    ideale: 'Bilocale, camera + bagno + zona giorno',
    icon: '🏡',
  },
  {
    valore: 4,
    label: '4 Vani',
    descrizione: 'Divisione in 4 stanze',
    ideale: 'Trilocale completo, max flessibilità',
    icon: '🏢',
  },
]

export function VaniStep() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<BungalowConfig>()

  const numeroVani = watch('numero_vani')

  const handleSelectVani = (valore: number) => {
    setValue('numero_vani', valore, { shouldValidate: true })
  }

  return (
    <div className="space-y-8">
      {/* Selezione numero vani */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <DoorOpen className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">
            Seleziona il numero di vani interni
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {VANI_OPTIONS.map((opzione) => {
            const isSelected = numeroVani === opzione.valore
            return (
              <button
                key={opzione.valore}
                type="button"
                onClick={() => handleSelectVani(opzione.valore)}
                className={`relative p-6 rounded-xl border-2 transition-all text-left ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50 shadow-lg scale-105'
                    : 'border-gray-300 hover:border-blue-400 hover:shadow-md'
                }`}
              >
                {/* Badge selezionato */}
                {isSelected && (
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    ✓
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <span className="text-4xl">{opzione.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                      {opzione.label}
                      {isSelected && (
                        <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                          Selezionato
                        </span>
                      )}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {opzione.descrizione}
                    </p>
                    <p className="text-xs text-gray-500">
                      <strong>Ideale per:</strong> {opzione.ideale}
                    </p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Hidden input per react-hook-form */}
        <input type="hidden" {...register('numero_vani', { valueAsNumber: true })} />

        {errors.numero_vani && (
          <p className="text-red-600 text-sm mt-3 flex items-center gap-1">
            <span>⚠️</span>
            {errors.numero_vani.message}
          </p>
        )}
      </div>

      {/* Visualizzazione pianta dinamica */}
      {numeroVani && (
        <div className="mt-8">
          <PiantaDinamica numeroVani={numeroVani as 1 | 2 | 3 | 4} />
        </div>
      )}

      {/* Info box */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-semibold text-green-900 mb-2">ℹ️ Nota Importante</h4>
        <p className="text-sm text-green-800">
          La pianta mostrata è <strong>indicativa</strong>. Durante la fase di preventivo dettagliato,
          potrai personalizzare la disposizione interna secondo le tue esigenze specifiche.
        </p>
      </div>
    </div>
  )
}
