/**
 * Gmail SMTP Transport Configuration
 * MARTELLO1930 - Sistema Invio Email
 */

import nodemailer from 'nodemailer'
import type { Transporter } from 'nodemailer'

/**
 * Crea e configura il transporter Gmail per l'invio email
 * @throws Error se le variabili d'ambiente non sono configurate
 */
export function createGmailTransport(): Transporter {
  const gmailUser = process.env.GMAIL_USER
  const gmailPassword = process.env.GMAIL_APP_PASSWORD

  if (!gmailUser || !gmailPassword) {
    throw new Error(
      'GMAIL_USER o GMAIL_APP_PASSWORD non configurate. ' +
      'Verifica le variabili d\'ambiente su Vercel.'
    )
  }

  // Configurazione Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // TLS
    auth: {
      user: gmailUser,
      pass: gmailPassword,
    },
    tls: {
      rejectUnauthorized: true,
    },
  })

  // Verifica connessione (optional, rallenta risposta)
  // transporter.verify((error) => {
  //   if (error) {
  //     console.error('Errore connessione Gmail SMTP:', error)
  //   } else {
  //     console.log('Gmail SMTP pronto per invio email')
  //   }
  // })

  return transporter
}

/**
 * Configurazione email aziendali
 */
export const emailConfig = {
  from: `"Martello 1930" <${process.env.GMAIL_USER || 'preventivi@martello1930.net'}>`,
  adminEmail: 'preventivi@martello1930.net',
  replyTo: 'preventivi@martello1930.net',
  
  // Email CC per notifiche importanti (opzionale)
  ccEmails: [] as string[],
  
  // Configurazione retry (per gestire errori temporanei)
  maxRetries: 3,
  retryDelay: 2000, // ms
}

/**
 * Tenta l'invio email con retry automatico
 */
export async function sendEmailWithRetry(
  transporter: Transporter,
  mailOptions: any,
  retries = emailConfig.maxRetries
): Promise<any> {
  try {
    const info = await transporter.sendMail(mailOptions)
    return info
  } catch (error) {
    if (retries > 0) {
      console.warn(`Tentativo invio email fallito, ritento... (${retries} tentativi rimasti)`)
      await new Promise(resolve => setTimeout(resolve, emailConfig.retryDelay))
      return sendEmailWithRetry(transporter, mailOptions, retries - 1)
    }
    throw error
  }
}
