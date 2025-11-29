/**
 * Tipi per la gestione dati cliente e invio email
 * MARTELLO1930 - Sistema Preventivi
 */

export interface DatiCliente {
  nome: string
  email: string
  telefono: string
  indirizzo?: string
  citta?: string
  provincia?: string
  cap?: string
  note?: string
  privacyAccettata: boolean
  tipoRichiesta: 'preventivo' | 'sopralluogo' | 'callback'
}

export interface EmailClientData extends DatiCliente {
  prezzoTotale?: number
  timestamp?: string
  dettagliProgetto?: {
    tipologia?: string
    dimensioni?: string
    materiale?: string
    accessori?: string[]
  }
}

export interface EmailSendResult {
  success: boolean
  clientMessageId?: string
  adminMessageId?: string
  error?: string
}
