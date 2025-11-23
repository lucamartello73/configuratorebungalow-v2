import { supabase } from './supabase'
import type { BungalowConfig } from '@/types/bungalow'

/**
 * Carica un file su Supabase Storage
 */
async function uploadFile(file: File, preventivo_id: string): Promise<string | null> {
  try {
    // Genera nome file univoco
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(7)
    const fileExt = file.name.split('.').pop()
    const fileName = `${preventivo_id}/${timestamp}-${randomString}.${fileExt}`

    // Upload su Supabase Storage
    const { data, error } = await supabase.storage
      .from('bungalow-allegati')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      console.error('Errore upload file:', error)
      return null
    }

    // Ottieni URL pubblico (temporaneo per admin)
    const { data: urlData } = supabase.storage
      .from('bungalow-allegati')
      .getPublicUrl(fileName)

    return urlData.publicUrl
  } catch (error) {
    console.error('Eccezione upload:', error)
    return null
  }
}

/**
 * Carica tutti gli allegati su Storage
 */
async function uploadAllegati(
  allegati: File[],
  preventivo_id: string
): Promise<string[]> {
  if (!allegati || allegati.length === 0) return []

  const uploadPromises = allegati.map((file) => uploadFile(file, preventivo_id))
  const results = await Promise.all(uploadPromises)

  // Filtra eventuali null (upload falliti)
  return results.filter((url): url is string => url !== null)
}

/**
 * Ottieni IP address del client (best effort)
 */
async function getClientIP(): Promise<string | null> {
  try {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    return data.ip || null
  } catch {
    return null
  }
}

/**
 * Submit preventivo a Supabase
 */
export async function submitPreventivo(
  config: BungalowConfig
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    // Genera ID temporaneo per folder upload
    const tempId = crypto.randomUUID()

    // Upload allegati (se presenti)
    let allegatiUrls: string[] = []
    if (config.allegati && config.allegati.length > 0) {
      allegatiUrls = await uploadAllegati(config.allegati, tempId)
    }

    // Prepara dati per inserimento
    const { allegati, ...configSenzaFile } = config

    // Ottieni metadata
    const ipAddress = await getClientIP()
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : null

    // Insert nel database
    const { data, error } = await supabase
      .from('preventivi_bungalow')
      .insert({
        lunghezza: config.lunghezza,
        larghezza: config.larghezza,
        numero_vani: config.numero_vani,
        note: config.note || null,
        cliente_nome: config.cliente_nome || null,
        email: config.email || null,
        telefono: config.telefono || null,
        configurazione: configSenzaFile,
        allegati: allegatiUrls,
        ip_address: ipAddress,
        user_agent: userAgent,
        stato: 'nuovo',
      })
      .select('id')
      .single()

    if (error) {
      console.error('Errore insert database:', error)
      return {
        success: false,
        error: 'Errore durante il salvataggio. Riprova tra qualche istante.',
      }
    }

    // Rinomina folder allegati con ID reale (opzionale, per organizzazione)
    // Nota: Supabase non ha API per rinominare file, ma folder è già corretto

    return {
      success: true,
      id: data.id,
    }
  } catch (error) {
    console.error('Eccezione submit:', error)
    return {
      success: false,
      error: 'Errore di connessione. Verifica la tua rete.',
    }
  }
}

/**
 * Recupera un preventivo per ID (per pagina conferma)
 */
export async function getPreventivo(id: string) {
  try {
    const { data, error } = await supabase
      .from('preventivi_bungalow')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Errore fetch preventivo:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Eccezione fetch:', error)
    return null
  }
}

/**
 * Lista preventivi (per admin dashboard)
 */
export async function listPreventivi(filters?: {
  stato?: string
  limit?: number
  offset?: number
}) {
  try {
    let query = supabase
      .from('preventivi_bungalow')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })

    if (filters?.stato) {
      query = query.eq('stato', filters.stato)
    }

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
    }

    const { data, error, count } = await query

    if (error) {
      console.error('Errore lista preventivi:', error)
      return { data: [], count: 0 }
    }

    return { data: data || [], count: count || 0 }
  } catch (error) {
    console.error('Eccezione lista:', error)
    return { data: [], count: 0 }
  }
}

/**
 * Aggiorna stato preventivo (solo admin)
 */
export async function updateStatoPreventivo(
  id: string,
  nuovoStato: string,
  noteAdmin?: string
) {
  try {
    const { data, error } = await supabase
      .from('preventivi_bungalow')
      .update({ stato: nuovoStato })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Errore update stato:', error)
      return { success: false, error: error.message }
    }

    // Registra nello storico (il trigger lo fa automaticamente)
    // Ma possiamo aggiungere note admin manualmente
    if (noteAdmin) {
      await supabase.from('preventivi_storico').insert({
        preventivo_id: id,
        stato_nuovo: nuovoStato,
        note_admin: noteAdmin,
      })
    }

    return { success: true, data }
  } catch (error) {
    console.error('Eccezione update:', error)
    return { success: false, error: 'Errore di connessione' }
  }
}

/**
 * Elimina preventivo (solo admin)
 */
export async function deletePreventivo(id: string) {
  try {
    const { error } = await supabase
      .from('preventivi_bungalow')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Errore delete:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Eccezione delete:', error)
    return { success: false, error: 'Errore di connessione' }
  }
}

/**
 * Statistiche dashboard
 */
export async function getDashboardStats() {
  try {
    // Count per stato
    const { data: countData, error: countError } = await supabase
      .rpc('count_by_stato')

    if (countError) {
      console.error('Errore stats:', countError)
    }

    // Ultimi 7 giorni
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const { count: newLastWeek } = await supabase
      .from('preventivi_bungalow')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', sevenDaysAgo.toISOString())

    return {
      countByStato: countData || [],
      newLastWeek: newLastWeek || 0,
    }
  } catch (error) {
    console.error('Eccezione stats:', error)
    return {
      countByStato: [],
      newLastWeek: 0,
    }
  }
}
