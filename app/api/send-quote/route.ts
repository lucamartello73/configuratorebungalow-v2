/**
 * API Route: Invio Email Preventivo
 * POST /api/send-quote
 * 
 * MARTELLO1930 - Sistema Preventivi
 */

import { NextRequest, NextResponse } from 'next/server'
import { createGmailTransport, emailConfig, sendEmailWithRetry } from '@/lib/email/gmail-transport'
import { getClientEmailTemplate, getTeamEmailTemplate } from '@/lib/email/templates'
import type { EmailClientData, EmailSendResult } from '@/types/cliente'

/**
 * POST /api/send-quote
 * Invia email di conferma al cliente e notifica al team
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: EmailClientData = await request.json()
    
    const {
      nome,
      email,
      telefono,
      privacyAccettata,
      tipoRichiesta,
      note,
      prezzoTotale,
      dettagliProgetto,
    } = body

    // ===== VALIDAZIONE DATI =====
    if (!nome || typeof nome !== 'string' || nome.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Nome non valido (minimo 2 caratteri)' },
        { status: 400 }
      )
    }

    if (!email || typeof email !== 'string' || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Email non valida' },
        { status: 400 }
      )
    }

    if (!telefono || typeof telefono !== 'string' || telefono.trim().length < 8) {
      return NextResponse.json(
        { success: false, error: 'Telefono non valido (minimo 8 caratteri)' },
        { status: 400 }
      )
    }

    if (!privacyAccettata || privacyAccettata !== true) {
      return NextResponse.json(
        { success: false, error: 'Privacy non accettata' },
        { status: 400 }
      )
    }

    if (!tipoRichiesta || !['preventivo', 'sopralluogo', 'callback'].includes(tipoRichiesta)) {
      return NextResponse.json(
        { success: false, error: 'Tipo richiesta non valido' },
        { status: 400 }
      )
    }

    // ===== PREPARAZIONE DATI EMAIL =====
    const timestamp = new Date().toLocaleString('it-IT', {
      timeZone: 'Europe/Rome',
      dateStyle: 'full',
      timeStyle: 'short',
    })

    const emailData: EmailClientData = {
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      telefono: telefono.trim(),
      privacyAccettata,
      tipoRichiesta,
      note: note?.trim(),
      prezzoTotale,
      timestamp,
      dettagliProgetto,
    }

    // ===== CREAZIONE TRANSPORTER =====
    let transporter
    try {
      transporter = createGmailTransport()
    } catch (transportError: any) {
      console.error('Errore creazione Gmail transport:', transportError)
      return NextResponse.json(
        {
          success: false,
          error: 'Configurazione email non valida. Contatta l\'amministratore.',
        },
        { status: 500 }
      )
    }

    // ===== INVIO EMAIL CLIENTE =====
    let clientMessageId: string | undefined
    try {
      console.log(`📧 Invio email conferma a: ${email}`)
      
      const clientMailOptions = {
        from: emailConfig.from,
        to: email,
        subject: `✅ Conferma Ricezione Richiesta - Martello 1930`,
        html: getClientEmailTemplate(emailData),
        replyTo: emailConfig.replyTo,
      }

      const clientInfo = await sendEmailWithRetry(transporter, clientMailOptions)
      clientMessageId = clientInfo.messageId
      
      console.log(`✅ Email cliente inviata: ${clientInfo.messageId}`)
    } catch (clientEmailError: any) {
      console.error('❌ Errore invio email cliente:', clientEmailError)
      // Non bloccare il processo se l'email al cliente fallisce
      // L'email admin è più critica
    }

    // ===== INVIO EMAIL ADMIN =====
    let adminMessageId: string | undefined
    try {
      console.log(`📧 Invio notifica admin a: ${emailConfig.adminEmail}`)
      
      const adminMailOptions = {
        from: emailConfig.from,
        to: emailConfig.adminEmail,
        replyTo: email, // Reply diretta al cliente
        subject: `🔔 Nuova Richiesta: ${nome} - ${tipoRichiesta.toUpperCase()}`,
        text: getTeamEmailTemplate(emailData),
      }

      const adminInfo = await sendEmailWithRetry(transporter, adminMailOptions)
      adminMessageId = adminInfo.messageId
      
      console.log(`✅ Email admin inviata: ${adminInfo.messageId}`)
    } catch (adminEmailError: any) {
      console.error('❌ Errore invio email admin:', adminEmailError)
      
      // Se fallisce l'email admin, ritorna errore
      return NextResponse.json(
        {
          success: false,
          error: 'Errore invio notifica interna. Riprova o contattaci telefonicamente.',
          clientMessageId, // Può essere undefined se anche quella è fallita
        },
        { status: 500 }
      )
    }

    // ===== SUCCESSO =====
    const result: EmailSendResult = {
      success: true,
      clientMessageId,
      adminMessageId,
    }

    console.log(`✅ Email inviate con successo per: ${nome} (${email})`)

    return NextResponse.json(result, { status: 200 })

  } catch (error: any) {
    console.error('❌ Errore generale API send-quote:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Errore interno del server. Riprova più tardi o contattaci telefonicamente.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/send-quote
 * Endpoint di test (solo development)
 */
export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Endpoint disponibile solo in development' },
      { status: 403 }
    )
  }

  return NextResponse.json({
    status: 'API send-quote attiva',
    method: 'POST',
    endpoint: '/api/send-quote',
    requiredFields: ['nome', 'email', 'telefono', 'privacyAccettata', 'tipoRichiesta'],
    optionalFields: ['note', 'prezzoTotale', 'dettagliProgetto', 'indirizzo', 'citta', 'provincia', 'cap'],
    gmailConfigured: !!(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD),
  })
}

/**
 * Validazione email con regex semplice
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
