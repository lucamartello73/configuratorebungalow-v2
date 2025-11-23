import { z } from 'zod'

/**
 * Schema di validazione per configurazione Bungalow
 */
export const BungalowConfigSchema = z.object({
  // Step 1: Dimensioni
  lunghezza: z
    .number()
    .min(1, 'Lunghezza minima: 1 metro')
    .max(99.99, 'Lunghezza massima: 99.99 metri'),
  larghezza: z
    .number()
    .min(1, 'Larghezza minima: 1 metro')
    .max(99.99, 'Larghezza massima: 99.99 metri'),
  
  // Step 2: Numero vani
  numero_vani: z
    .number()
    .int('Il numero vani deve essere intero')
    .min(1, 'Minimo 1 vano')
    .max(4, 'Massimo 4 vani'),
  
  // Step 3: Note e dettagli
  note: z
    .string()
    .max(2000, 'Note troppo lunghe (max 2000 caratteri)')
    .optional()
    .or(z.literal('')),
  
  // Step 4: Dati cliente
  cliente_nome: z
    .string()
    .min(2, 'Nome troppo corto')
    .max(255, 'Nome troppo lungo')
    .optional(),
  
  email: z
    .string()
    .email('Email non valida')
    .optional()
    .or(z.literal('')),
  
  telefono: z
    .string()
    .regex(/^[\d\s+()-]{8,}$/, 'Telefono non valido')
    .optional()
    .or(z.literal('')),
  
  // File allegati (array di File objects)
  allegati: z.array(z.any()).max(3, 'Massimo 3 allegati').optional(),
})

export type BungalowConfig = z.infer<typeof BungalowConfigSchema>

/**
 * Tipo per il preventivo salvato nel database
 */
export interface PreventivoBungalow {
  id: string
  created_at: string
  updated_at: string
  lunghezza: number
  larghezza: number
  numero_vani: number
  note: string | null
  cliente_nome: string | null
  email: string | null
  telefono: string | null
  configurazione: BungalowConfig | null
  allegati: string[] // Array di URL Storage
  stato: 'nuovo' | 'in_elaborazione' | 'confermato' | 'annullato' | 'archiviato'
  mq_totali: number
  ip_address?: string
  user_agent?: string
}

/**
 * Tipo per lo storico modifiche stato
 */
export interface PreventivoStorico {
  id: string
  preventivo_id: string
  stato_precedente: string | null
  stato_nuovo: string
  note_admin: string | null
  admin_email: string | null
  created_at: string
}

/**
 * Tipo per i dati riepilogativi dashboard
 */
export interface PreventivoDashboard extends PreventivoBungalow {
  num_allegati: number
  num_cambi_stato: number
  ultimo_cambio_stato: string | null
}

/**
 * Tipo per statistiche contatori
 */
export interface StatsByStato {
  stato: string
  count: number
}

/**
 * Tipo per statistiche mensili
 */
export interface StatsByMonth {
  mese: string
  totale: number
  nuovo: number
  in_elaborazione: number
  confermato: number
}

/**
 * Configurazione pianta dinamica per vani
 */
export interface PiantaVaniConfig {
  numero_vani: 1 | 2 | 3 | 4
  svg: string
  descrizione: string
}

/**
 * Mappatura stati per UI
 */
export const STATI_PREVENTIVO = {
  nuovo: {
    label: 'Nuovo',
    color: 'bg-blue-100 text-blue-800',
    icon: '🆕',
  },
  in_elaborazione: {
    label: 'In Elaborazione',
    color: 'bg-yellow-100 text-yellow-800',
    icon: '⚙️',
  },
  confermato: {
    label: 'Confermato',
    color: 'bg-green-100 text-green-800',
    icon: '✅',
  },
  annullato: {
    label: 'Annullato',
    color: 'bg-red-100 text-red-800',
    icon: '❌',
  },
  archiviato: {
    label: 'Archiviato',
    color: 'bg-gray-100 text-gray-800',
    icon: '📦',
  },
} as const

export type StatoPreventivo = keyof typeof STATI_PREVENTIVO
