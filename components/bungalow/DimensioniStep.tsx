'use client'

import { useFormContext } from 'react-hook-form'
import { type BungalowConfig } from '@/types/bungalow'
import { Ruler, Maximize2 } from 'lucide-react'

export function DimensioniStep() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<BungalowConfig>()

  const lunghezza = watch('lunghezza') || 0
  const larghezza = watch('larghezza') || 0
  const mq = lunghezza && larghezza ? (lunghezza * larghezza).toFixed(2) : '0'

  return (
    <div className="space-y-6">
      {/* Visualizzazione metri quadri */}
      <div className="bg-gray-50 rounded-xl p-6 text-center border-2 border-gray-200">
        <Maximize2 className="w-12 h-12 mx-auto mb-3 text-gray-700" />
        <p className="text-sm text-gray-600 mb-1">Superficie totale</p>
        <p className="text-5xl font-bold text-gray-900">{mq}</p>
        <p className="text-xl text-gray-600 mt-1">m²</p>
      </div>

      {/* Input Lunghezza */}
      <div>
        <label className="block mb-2">
          <span className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
            <Ruler className="w-5 h-5 text-gray-700" />
            Lunghezza (metri)
          </span>
          <input
            type="number"
            step="0.01"
            min="1"
            max="99.99"
            {...register('lunghezza', { valueAsNumber: true })}
            className={`w-full px-4 py-3 text-lg border-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-gray-500 ${
              errors.lunghezza ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="es. 6.00"
          />
        </label>
        {errors.lunghezza && (
          <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
            <span>⚠️</span>
            {errors.lunghezza.message}
          </p>
        )}
      </div>

      {/* Input Larghezza */}
      <div>
        <label className="block mb-2">
          <span className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
            <Ruler className="w-5 h-5 text-gray-700 rotate-90" />
            Larghezza (metri)
          </span>
          <input
            type="number"
            step="0.01"
            min="1"
            max="99.99"
            {...register('larghezza', { valueAsNumber: true })}
            className={`w-full px-4 py-3 text-lg border-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-gray-500 ${
              errors.larghezza ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="es. 4.00"
          />
        </label>
        {errors.larghezza && (
          <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
            <span>⚠️</span>
            {errors.larghezza.message}
          </p>
        )}
      </div>

      {/* Visualizzazione grafica proporzionale */}
      <div className="mt-8">
        <p className="text-sm font-medium text-gray-700 mb-3 text-center">
          Anteprima proporzioni (vista dall'alto)
        </p>
        <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg">
          <div className="relative">
            {/* Rettangolo proporzionale */}
            <div
              className="bg-gray-800 rounded-lg shadow-lg relative flex items-center justify-center text-white font-bold"
              style={{
                width: `${Math.min(Math.max(lunghezza * 20, 60), 300)}px`,
                height: `${Math.min(Math.max(larghezza * 20, 40), 200)}px`,
                minWidth: '60px',
                minHeight: '40px',
              }}
            >
              <span className="text-sm opacity-90">{mq} m²</span>
            </div>
            
            {/* Etichette dimensioni */}
            <div className="absolute -top-6 left-0 right-0 text-center text-xs text-gray-600">
              {lunghezza} m
            </div>
            <div className="absolute -right-12 top-0 bottom-0 flex items-center text-xs text-gray-600">
              {larghezza} m
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-2">💡 Suggerimenti</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Misura con precisione lo spazio disponibile</li>
          <li>• Considera almeno 50cm liberi su ogni lato per la manutenzione</li>
          <li>• Dimensioni standard: 3x2m (piccolo), 6x4m (medio), 8x5m (grande)</li>
        </ul>
      </div>
    </div>
  )
}
