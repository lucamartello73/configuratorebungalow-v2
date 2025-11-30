'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { getPreventivo, updateStatoPreventivo, deletePreventivo } from '@/lib/bungalow-api'
import type { PreventivoBungalow } from '@/types/bungalow'
import { STATI_PREVENTIVO, type StatoPreventivo } from '@/types/bungalow'
import { PDFGenerator } from '@/components/bungalow/PDFGenerator'
import {
  ArrowLeft,
  Calendar,
  Ruler,
  DoorOpen,
  FileText,
  Image as ImageIcon,
  User,
  Mail,
  Phone,
  Download,
  Trash2,
  Save,
  Loader2,
  ExternalLink,
} from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import { it } from 'date-fns/locale'

export default function AdminPreventivoDetail() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [user, setUser] = useState<any>(null)
  const [preventivo, setPreventivo] = useState<PreventivoBungalow | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  
  const [nuovoStato, setNuovoStato] = useState<StatoPreventivo>('nuovo')
  const [noteAdmin, setNoteAdmin] = useState('')

  // Check auth
  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/admin/login')
      return
    }
    
    setUser(user)
    loadPreventivo()
  }

  async function loadPreventivo() {
    setLoading(true)
    const data = await getPreventivo(id)
    
    if (data) {
      setPreventivo(data)
      setNuovoStato(data.stato as StatoPreventivo)
    }
    
    setLoading(false)
  }

  async function handleSave() {
    if (!preventivo) return
    
    setSaving(true)
    const result = await updateStatoPreventivo(id, nuovoStato, noteAdmin || undefined)
    
    if (result.success) {
      alert('Stato aggiornato con successo!')
      setNoteAdmin('')
      loadPreventivo()
    } else {
      alert('Errore aggiornamento: ' + result.error)
    }
    
    setSaving(false)
  }

  async function handleDelete() {
    if (!confirm('Sei sicuro di voler eliminare questa richiesta? L\'azione è irreversibile.')) {
      return
    }
    
    setDeleting(true)
    const result = await deletePreventivo(id)
    
    if (result.success) {
      alert('Richiesta eliminata!')
      router.push('/admin/bungalow')
    } else {
      alert('Errore eliminazione: ' + result.error)
    }
    
    setDeleting(false)
  }

  if (!user) return null

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Caricamento...</p>
        </div>
      </div>
    )
  }

  if (!preventivo) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <p className="text-xl text-gray-900 mb-4">Preventivo non trovato</p>
          <Link
            href="/admin/bungalow"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Torna alla lista
          </Link>
        </div>
      </div>
    )
  }

  const statoInfo = STATI_PREVENTIVO[preventivo.stato as StatoPreventivo]
  const mq = (preventivo.lunghezza * preventivo.larghezza).toFixed(2)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md mb-6">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/admin/bungalow"
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Torna alla lista</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <PDFGenerator preventivo={preventivo} />
              
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:bg-gray-400"
              >
                <Trash2 className="w-4 h-4" />
                {deleting ? 'Eliminazione...' : 'Elimina'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonna principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* Card: Info Generale */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r bg-gray-900 text-white px-6 py-4">
                <h2 className="text-2xl font-bold">Richiesta Preventivo</h2>
                <p className="text-blue-100 text-sm">
                  ID: {id.slice(0, 8).toUpperCase()}
                </p>
              </div>

              <div className="p-6 space-y-6">
                {/* Data creazione */}
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Calendar className="w-5 h-5" />
                    <span className="font-medium">Data Richiesta</span>
                  </div>
                  <p className="text-lg text-gray-900 ml-7">
                    {format(new Date(preventivo.created_at), "dd MMMM yyyy 'alle' HH:mm", { locale: it })}
                  </p>
                </div>

                {/* Dimensioni */}
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Ruler className="w-5 h-5" />
                    <span className="font-medium">Dimensioni</span>
                  </div>
                  <div className="ml-7 grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Lunghezza</p>
                      <p className="text-2xl font-bold text-blue-600">{preventivo.lunghezza}m</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Larghezza</p>
                      <p className="text-2xl font-bold text-green-600">{preventivo.larghezza}m</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Superficie</p>
                      <p className="text-2xl font-bold text-purple-600">{mq}m²</p>
                    </div>
                  </div>
                </div>

                {/* Vani */}
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <DoorOpen className="w-5 h-5" />
                    <span className="font-medium">Configurazione Interna</span>
                  </div>
                  <div className="ml-7 bg-gray-50 rounded-lg p-4 flex items-center gap-4">
                    <div className="text-4xl">
                      {preventivo.numero_vani === 1 && '🏠'}
                      {preventivo.numero_vani === 2 && '🏘️'}
                      {preventivo.numero_vani === 3 && '🏡'}
                      {preventivo.numero_vani === 4 && '🏢'}
                    </div>
                    <div>
                      <p className="font-bold text-lg text-gray-900">
                        {preventivo.numero_vani} {preventivo.numero_vani === 1 ? 'Vano' : 'Vani'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Note */}
                {preventivo.note && (
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <FileText className="w-5 h-5" />
                      <span className="font-medium">Note Cliente</span>
                    </div>
                    <div className="ml-7 bg-orange-50 rounded-lg p-4">
                      <p className="text-gray-800 whitespace-pre-wrap">{preventivo.note}</p>
                    </div>
                  </div>
                )}

                {/* Allegati */}
                {preventivo.allegati && preventivo.allegati.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <ImageIcon className="w-5 h-5" />
                      <span className="font-medium">
                        Immagini Allegate ({preventivo.allegati.length})
                      </span>
                    </div>
                    <div className="ml-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {preventivo.allegati.map((url, index) => (
                        <a
                          key={index}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative aspect-square rounded-lg overflow-hidden bg-gray-100 hover:ring-4 hover:ring-blue-500 transition"
                        >
                          <img
                            src={url}
                            alt={`Allegato ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center">
                            <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition" />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Card: Dati Cliente */}
            {(preventivo.cliente_nome || preventivo.email || preventivo.telefono) && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-6 h-6 text-purple-600" />
                  Dati di Contatto
                </h3>

                <div className="space-y-3">
                  {preventivo.cliente_nome && (
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <User className="w-5 h-5 text-purple-600 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-600">Nome</p>
                        <p className="font-semibold text-gray-900">{preventivo.cliente_nome}</p>
                      </div>
                    </div>
                  )}
                  {preventivo.email && (
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <Mail className="w-5 h-5 text-purple-600 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-600">Email</p>
                        <a
                          href={`mailto:${preventivo.email}`}
                          className="font-semibold text-blue-600 hover:underline"
                        >
                          {preventivo.email}
                        </a>
                      </div>
                    </div>
                  )}
                  {preventivo.telefono && (
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <Phone className="w-5 h-5 text-purple-600 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-600">Telefono</p>
                        <a
                          href={`tel:${preventivo.telefono}`}
                          className="font-semibold text-blue-600 hover:underline"
                        >
                          {preventivo.telefono}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar: Gestione Stato */}
          <div className="space-y-6">
            {/* Card: Stato Attuale */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Stato Richiesta</h3>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Stato attuale:</p>
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${statoInfo.color}`}>
                  <span className="text-xl">{statoInfo.icon}</span>
                  {statoInfo.label}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cambia stato:
                  </label>
                  <select
                    value={nuovoStato}
                    onChange={(e) => setNuovoStato(e.target.value as StatoPreventivo)}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.entries(STATI_PREVENTIVO).map(([value, info]) => (
                      <option key={value} value={value}>
                        {info.icon} {info.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Note admin (opzionale):
                  </label>
                  <textarea
                    value={noteAdmin}
                    onChange={(e) => setNoteAdmin(e.target.value)}
                    rows={3}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Aggiungi note interne..."
                  />
                </div>

                <button
                  onClick={handleSave}
                  disabled={saving || nuovoStato === preventivo.stato}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Salvataggio...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Salva Modifiche
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Card: Metadata */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-3 text-sm">Informazioni Tecniche</h4>
              <dl className="space-y-2 text-xs text-gray-600">
                <div>
                  <dt className="font-medium">Ultima modifica:</dt>
                  <dd>{format(new Date(preventivo.updated_at), 'dd/MM/yyyy HH:mm')}</dd>
                </div>
                {preventivo.ip_address && (
                  <div>
                    <dt className="font-medium">IP Address:</dt>
                    <dd className="font-mono">{preventivo.ip_address}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
