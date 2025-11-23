'use client'

import { useFormContext } from 'react-hook-form'
import { type BungalowConfig } from '@/types/bungalow'
import { User, Mail, Phone } from 'lucide-react'

export function DatiClienteStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<BungalowConfig>()

  return (
    <div className="space-y-6">
      {/* Info box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          ℹ️ I dati di contatto sono <strong>opzionali</strong> ma consigliati per ricevere 
          il preventivo dettagliato via email o telefono.
        </p>
      </div>

      {/* Nome e Cognome */}
      <div>
        <label className="block mb-2">
          <span className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
            <User className="w-5 h-5 text-blue-600" />
            Nome e Cognome
          </span>
          <input
            type="text"
            {...register('cliente_nome')}
            className={`w-full px-4 py-3 text-lg border-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.cliente_nome ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="es. Mario Rossi"
          />
        </label>
        {errors.cliente_nome && (
          <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
            <span>⚠️</span>
            {errors.cliente_nome.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block mb-2">
          <span className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
            <Mail className="w-5 h-5 text-green-600" />
            Email
          </span>
          <input
            type="email"
            {...register('email')}
            className={`w-full px-4 py-3 text-lg border-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="es. mario.rossi@email.com"
          />
        </label>
        {errors.email && (
          <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
            <span>⚠️</span>
            {errors.email.message}
          </p>
        )}
        <p className="text-xs text-gray-600 mt-1">
          Riceverai il preventivo dettagliato a questo indirizzo
        </p>
      </div>

      {/* Telefono */}
      <div>
        <label className="block mb-2">
          <span className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
            <Phone className="w-5 h-5 text-orange-600" />
            Telefono
          </span>
          <input
            type="tel"
            {...register('telefono')}
            className={`w-full px-4 py-3 text-lg border-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              errors.telefono ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="es. +39 333 1234567"
          />
        </label>
        {errors.telefono && (
          <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
            <span>⚠️</span>
            {errors.telefono.message}
          </p>
        )}
        <p className="text-xs text-gray-600 mt-1">
          Ti contatteremo per chiarimenti o dettagli aggiuntivi
        </p>
      </div>

      {/* Privacy note */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
        <h4 className="font-semibold text-gray-900 mb-2">🔒 Privacy e Sicurezza</h4>
        <p className="text-sm text-gray-700 mb-2">
          I tuoi dati personali sono protetti e verranno utilizzati esclusivamente per:
        </p>
        <ul className="text-sm text-gray-600 space-y-1 ml-5 list-disc">
          <li>Elaborare la tua richiesta di preventivo</li>
          <li>Contattarti per fornire informazioni sul progetto</li>
          <li>Inviarti documentazione tecnica e commerciale</li>
        </ul>
        <p className="text-xs text-gray-500 mt-3">
          Non condivideremo mai i tuoi dati con terze parti. Puoi richiedere la cancellazione 
          in qualsiasi momento contattandoci a{' '}
          <a href="mailto:soluzioni@martello1930.net" className="text-blue-600 hover:underline">
            soluzioni@martello1930.net
          </a>
        </p>
      </div>

      {/* Contatti aziendali */}
      <div className="bg-gradient-to-br from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-2">📞 I Nostri Contatti</h4>
        <div className="space-y-1 text-sm text-gray-700">
          <p><strong>Telefono:</strong> +39 0185 167 656</p>
          <p><strong>WhatsApp:</strong> +39 0185 167 656</p>
          <p><strong>Email:</strong> soluzioni@martello1930.net</p>
          <p><strong>Sede:</strong> Via Aurelia, Sestri Levante (GE)</p>
        </div>
      </div>
    </div>
  )
}
