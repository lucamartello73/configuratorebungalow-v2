'use client'

import { useFormContext } from 'react-hook-form'
import { type BungalowConfig } from '@/types/bungalow'
import { Ruler, DoorOpen, FileText, Image as ImageIcon, User, Mail, Phone, CheckCircle } from 'lucide-react'

export function RiepilogoStep() {
  const { watch } = useFormContext<BungalowConfig>()

  const lunghezza = watch('lunghezza')
  const larghezza = watch('larghezza')
  const numeroVani = watch('numero_vani')
  const note = watch('note')
  const clienteNome = watch('cliente_nome')
  const email = watch('email')
  const telefono = watch('telefono')
  const allegati = watch('allegati') || []

  const mq = lunghezza && larghezza ? (lunghezza * larghezza).toFixed(2) : '0'

  return (
    <div className="space-y-6">
      {/* Header riepilogo */}
      <div className="bg-gray-900 text-white rounded-xl p-6 text-center">
        <CheckCircle className="w-16 h-16 mx-auto mb-3" />
        <h3 className="text-2xl font-bold mb-2">Riepilogo Configurazione</h3>
        <p className="text-gray-300">
          Verifica i dati inseriti prima di inviare la richiesta
        </p>
      </div>

      {/* Sezione Dimensioni */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <Ruler className="w-5 h-5 text-gray-700" />
          </div>
          <h4 className="text-lg font-bold text-gray-900">Dimensioni</h4>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Lunghezza</p>
            <p className="text-2xl font-bold text-gray-900">{lunghezza} m</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Larghezza</p>
            <p className="text-2xl font-bold text-gray-900">{larghezza} m</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Superficie</p>
            <p className="text-2xl font-bold text-gray-900">{mq} m²</p>
          </div>
        </div>
      </div>

      {/* Sezione Vani */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <DoorOpen className="w-5 h-5 text-gray-700" />
          </div>
          <h4 className="text-lg font-bold text-gray-900">Configurazione Interna</h4>
        </div>
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-4xl">
            {numeroVani === 1 && '🏠'}
            {numeroVani === 2 && '🏘️'}
            {numeroVani === 3 && '🏡'}
            {numeroVani === 4 && '🏢'}
          </div>
          <div>
            <p className="font-bold text-gray-900 text-lg">
              {numeroVani} {numeroVani === 1 ? 'Vano' : 'Vani'}
            </p>
            <p className="text-sm text-gray-600">
              {numeroVani === 1 && 'Open space unico senza divisioni'}
              {numeroVani === 2 && 'Diviso in 2 stanze separate'}
              {numeroVani === 3 && 'Diviso in 3 stanze separate'}
              {numeroVani === 4 && 'Diviso in 4 stanze separate'}
            </p>
          </div>
        </div>
      </div>

      {/* Sezione Note e Allegati */}
      {(note || allegati.length > 0) && (
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-gray-700" />
            </div>
            <h4 className="text-lg font-bold text-gray-900">Dettagli Aggiuntivi</h4>
          </div>

          {note && (
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">Note:</p>
              <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-700 whitespace-pre-wrap border border-gray-200">
                {note}
              </div>
            </div>
          )}

          {allegati.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Immagini allegate: {allegati.length}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {allegati.map((file: File, index: number) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Allegato ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sezione Dati Cliente */}
      {(clienteNome || email || telefono) && (
        <div className="bg-white border-2 border-purple-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-purple-600" />
            </div>
            <h4 className="text-lg font-bold text-gray-900">Dati di Contatto</h4>
          </div>
          <div className="space-y-3">
            {clienteNome && (
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <User className="w-5 h-5 text-purple-600 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-600">Nome</p>
                  <p className="font-semibold text-gray-900">{clienteNome}</p>
                </div>
              </div>
            )}
            {email && (
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <Mail className="w-5 h-5 text-purple-600 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">{email}</p>
                </div>
              </div>
            )}
            {telefono && (
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <Phone className="w-5 h-5 text-purple-600 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-600">Telefono</p>
                  <p className="font-semibold text-gray-900">{telefono}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Messaggio finale */}
      <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
        <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-gray-700" />
          Cosa succede dopo l'invio?
        </h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-gray-900 font-bold">1.</span>
            <span>Riceverai una <strong>conferma immediata</strong> della richiesta</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-900 font-bold">2.</span>
            <span>Il nostro team <strong>analizzerà la configurazione</strong> entro 24 ore</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-900 font-bold">3.</span>
            <span>Riceverai un <strong>preventivo dettagliato</strong> via email o telefono</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">4.</span>
            <span>Potrai discutere modifiche e personalizzazioni con il nostro tecnico</span>
          </li>
        </ul>
      </div>

      {/* Call to action */}
      <div className="text-center p-6 bg-blue-50 rounded-xl">
        <p className="text-gray-700 mb-2">
          Pronto per ricevere il tuo preventivo personalizzato?
        </p>
        <p className="text-xl font-bold text-blue-600">
          Clicca "Invia Richiesta" qui sotto! 👇
        </p>
      </div>
    </div>
  )
}
