'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { listPreventivi, getDashboardStats } from '@/lib/bungalow-api'
import type { PreventivoBungalow, StatsByStato } from '@/types/bungalow'
import { STATI_PREVENTIVO } from '@/types/bungalow'
import { 
  Home, 
  LogOut, 
  Filter, 
  Search, 
  RefreshCw, 
  Eye,
  Calendar,
  TrendingUp,
  FileText
} from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import { it } from 'date-fns/locale'

export default function AdminBungalowDashboard() {
  const router = useRouter()
  
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [preventivi, setPreventivi] = useState<PreventivoBungalow[]>([])
  const [stats, setStats] = useState<{
    countByStato: StatsByStato[]
    newLastWeek: number
  }>({ countByStato: [], newLastWeek: 0 })
  
  const [filtroStato, setFiltroStato] = useState<string>('tutti')
  const [searchTerm, setSearchTerm] = useState('')
  const [totalCount, setTotalCount] = useState(0)

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
    loadData()
  }

  async function loadData() {
    setLoading(true)
    
    // Carica preventivi
    const filters: any = {}
    if (filtroStato !== 'tutti') {
      filters.stato = filtroStato
    }
    
    const { data, count } = await listPreventivi(filters)
    setPreventivi(data)
    setTotalCount(count)
    
    // Carica statistiche
    const statsData = await getDashboardStats()
    setStats(statsData)
    
    setLoading(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  // Filtra preventivi localmente per search
  const preventiviFiltered = preventivi.filter((p) => {
    if (!searchTerm) return true
    
    const term = searchTerm.toLowerCase()
    return (
      p.cliente_nome?.toLowerCase().includes(term) ||
      p.email?.toLowerCase().includes(term) ||
      p.telefono?.includes(term) ||
      p.id.toLowerCase().includes(term)
    )
  })

  // Calcola totali per stato
  const totaliPerStato = stats.countByStato.reduce((acc, item) => {
    acc[item.stato] = item.count
    return acc
  }, {} as Record<string, number>)

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Dashboard Admin - Bungalow
              </h1>
              <p className="text-sm text-gray-600">
                Gestione richieste preventivo
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline">Home</span>
              </Link>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Esci</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Card: Totale */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">
                {totalCount}
              </span>
            </div>
            <p className="text-gray-600 text-sm">Totale Richieste</p>
          </div>

          {/* Card: Nuove ultima settimana */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8" />
              <span className="text-2xl font-bold">
                {stats.newLastWeek}
              </span>
            </div>
            <p className="text-green-100 text-sm">Ultimi 7 giorni</p>
          </div>

          {/* Card: Nuove */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl">{STATI_PREVENTIVO.nuovo.icon}</div>
              <span className="text-2xl font-bold text-blue-600">
                {totaliPerStato['nuovo'] || 0}
              </span>
            </div>
            <p className="text-gray-600 text-sm">Nuove</p>
          </div>

          {/* Card: In elaborazione */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl">{STATI_PREVENTIVO.in_elaborazione.icon}</div>
              <span className="text-2xl font-bold text-yellow-600">
                {totaliPerStato['in_elaborazione'] || 0}
              </span>
            </div>
            <p className="text-gray-600 text-sm">In Elaborazione</p>
          </div>
        </div>

        {/* Filtri e Ricerca */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            {/* Filtro stato */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="w-4 h-4 inline mr-1" />
                Filtra per stato
              </label>
              <select
                value={filtroStato}
                onChange={(e) => setFiltroStato(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="tutti">Tutti gli stati</option>
                <option value="nuovo">Nuovo</option>
                <option value="in_elaborazione">In Elaborazione</option>
                <option value="confermato">Confermato</option>
                <option value="annullato">Annullato</option>
                <option value="archiviato">Archiviato</option>
              </select>
            </div>

            {/* Ricerca */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Search className="w-4 h-4 inline mr-1" />
                Cerca
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nome, email, telefono, ID..."
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Bottone ricarica */}
            <button
              onClick={loadData}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 flex items-center gap-2"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              Ricarica
            </button>
          </div>
        </div>

        {/* Tabella Preventivi */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-12">
                <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Caricamento...</p>
              </div>
            ) : preventiviFiltered.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Nessuna richiesta trovata</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cliente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dimensioni
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vani
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stato
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Azioni
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {preventiviFiltered.map((preventivo) => {
                    const statoInfo = STATI_PREVENTIVO[preventivo.stato as keyof typeof STATI_PREVENTIVO]
                    
                    return (
                      <tr key={preventivo.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {format(new Date(preventivo.created_at), 'dd/MM/yyyy HH:mm', { locale: it })}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div>
                            <p className="font-medium">
                              {preventivo.cliente_nome || 'N/D'}
                            </p>
                            {preventivo.email && (
                              <p className="text-xs text-gray-500">{preventivo.email}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {preventivo.lunghezza}m × {preventivo.larghezza}m
                          <span className="text-xs text-gray-500 block">
                            {preventivo.mq_totali.toFixed(2)} m²
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                          {preventivo.numero_vani}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statoInfo.color}`}>
                            <span>{statoInfo.icon}</span>
                            {statoInfo.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            href={`/admin/bungalow/${preventivo.id}`}
                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-900 transition"
                          >
                            <Eye className="w-4 h-4" />
                            Dettagli
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Footer count */}
        <div className="mt-4 text-center text-sm text-gray-600">
          Visualizzati {preventiviFiltered.length} di {totalCount} preventivi totali
        </div>
      </div>
    </div>
  )
}
