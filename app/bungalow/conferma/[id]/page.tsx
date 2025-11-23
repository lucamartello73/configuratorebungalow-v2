'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getPreventivo } from '@/lib/bungalow-api'
import type { PreventivoBungalow } from '@/types/bungalow'
import { HeaderConfigurator } from '@/components/layout/header-configuratore'
import { CheckCircle, Home, Mail, Phone, Download, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function ConfermaPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [preventivo, setPreventivo] = useState<PreventivoBungalow | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!id) return

    async function fetchData() {
      setLoading(true)
      const data = await getPreventivo(id)

      if (data) {
        setPreventivo(data)
      } else {
        setError(true)
      }

      setLoading(false)
    }

    fetchData()
  }, [id])

  if (loading) {
    return (
      <>
        <HeaderConfigurator title="Conferma Richiesta" />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Caricamento...</p>
          </div>
        </div>
      </>
    )
  }

  if (error || !preventivo) {
    return (
      <>
        <HeaderConfigurator title="Errore" />
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">❌</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Richiesta Non Trovata
            </h2>
            <p className="text-gray-600 mb-6">
              Il preventivo richiesto non esiste o è stato eliminato.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Home className="w-5 h-5" />
              Torna alla Home
            </Link>
          </div>
        </div>
      </>
    )
  }

  const mq = (preventivo.lunghezza * preventivo.larghezza).toFixed(2)

  return (
    <>
      <HeaderConfigurator title="Richiesta Inviata" />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Success Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-6">
            {/* Header Success */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8 text-center">
              <CheckCircle className="w-20 h-20 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">
                Richiesta Inviata con Successo!
              </h1>
              <p className="text-green-100 text-lg">
                Il tuo preventivo è stato ricevuto correttamente
              </p>
            </div>

            {/* Body Content */}
            <div className="p-8">
              {/* ID Richiesta */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800 mb-1">Codice richiesta:</p>
                <p className="text-xl font-mono font-bold text-blue-900">
                  {id.slice(0, 8).toUpperCase()}
                </p>
                <p className="text-xs text-blue-600 mt-2">
                  Conserva questo codice per future comunicazioni
                </p>
              </div>

              {/* Riepilogo Configurazione */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  📋 Riepilogo Configurazione
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Dimensioni</p>
                    <p className="font-bold text-gray-900">
                      {preventivo.lunghezza}m × {preventivo.larghezza}m
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Superficie</p>
                    <p className="font-bold text-gray-900">{mq} m²</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Vani</p>
                    <p className="font-bold text-gray-900">
                      {preventivo.numero_vani}{' '}
                      {preventivo.numero_vani === 1 ? 'vano' : 'vani'}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Allegati</p>
                    <p className="font-bold text-gray-900">
                      {preventivo.allegati?.length || 0} immagini
                    </p>
                  </div>
                </div>

                {preventivo.note && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2">Note:</p>
                    <p className="text-sm text-gray-800">{preventivo.note}</p>
                  </div>
                )}
              </div>

              {/* Prossimi Passi */}
              <div className="bg-gradient-to-br from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  🚀 Prossimi Passi
                </h3>
                <ol className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      1
                    </span>
                    <span>
                      <strong>Conferma immediata:</strong> Riceverai una email
                      di conferma della richiesta (se hai fornito l'email)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      2
                    </span>
                    <span>
                      <strong>Analisi tecnica:</strong> Il nostro team
                      analizzerà la tua configurazione entro 24 ore
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      3
                    </span>
                    <span>
                      <strong>Preventivo dettagliato:</strong> Riceverai un
                      preventivo completo con specifiche tecniche e prezzi
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      4
                    </span>
                    <span>
                      <strong>Consulenza personalizzata:</strong> Un nostro
                      tecnico ti contatterà per discutere eventuali modifiche
                    </span>
                  </li>
                </ol>
              </div>

              {/* Contatti */}
              {(preventivo.cliente_nome || preventivo.email || preventivo.telefono) && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    📞 Ti Contatteremo A:
                  </h3>
                  <div className="space-y-2">
                    {preventivo.email && (
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="w-5 h-5 text-purple-600" />
                        <span className="text-gray-700">{preventivo.email}</span>
                      </div>
                    )}
                    {preventivo.telefono && (
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="w-5 h-5 text-purple-600" />
                        <span className="text-gray-700">{preventivo.telefono}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="bg-gray-50 border-t border-gray-200 p-6 flex flex-col sm:flex-row gap-4">
              <Link
                href="/"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
              >
                <Home className="w-5 h-5" />
                Torna alla Home
              </Link>
              <button
                onClick={() => window.print()}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Download className="w-5 h-5" />
                Stampa Riepilogo
              </button>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h4 className="font-bold text-gray-900 mb-2">
              Hai domande o necessiti assistenza?
            </h4>
            <p className="text-gray-600 mb-4">
              Il nostro team è a tua disposizione per qualsiasi chiarimento
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:+390185167656"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <Phone className="w-5 h-5" />
                Chiamaci Ora
              </a>
              <a
                href="mailto:soluzioni@martello1930.net"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Mail className="w-5 h-5" />
                Invia Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
