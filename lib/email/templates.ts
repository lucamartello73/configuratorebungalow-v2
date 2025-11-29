/**
 * Email Templates - HTML e Plain-text
 * MARTELLO1930 - Sistema Preventivi
 */

import type { EmailClientData } from '@/types/cliente'

/**
 * Template HTML responsive per conferma cliente
 * Design: Header gradient verde, timeline, footer contatti
 */
export function getClientEmailTemplate(data: EmailClientData): string {
  const {
    nome,
    email,
    telefono,
    tipoRichiesta,
    prezzoTotale,
    note,
    timestamp,
    dettagliProgetto,
  } = data

  return `
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Conferma Richiesta - Martello 1930</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f8f8f8;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background: linear-gradient(135deg, #6AB52B 0%, #5A9823 100%);
      color: white;
      padding: 40px 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }
    .header p {
      margin: 10px 0 0;
      font-size: 16px;
      opacity: 0.95;
    }
    .content {
      padding: 40px 30px;
    }
    .success-badge {
      background-color: #E8F5E0;
      color: #5A9823;
      padding: 12px 20px;
      border-radius: 8px;
      text-align: center;
      font-weight: 600;
      margin-bottom: 30px;
    }
    .info-box {
      background-color: #f8f8f8;
      border-left: 4px solid #6AB52B;
      padding: 20px;
      margin-bottom: 25px;
      border-radius: 4px;
    }
    .info-box h3 {
      margin: 0 0 15px;
      font-size: 18px;
      color: #333;
    }
    .info-row {
      display: flex;
      padding: 8px 0;
      border-bottom: 1px solid #e0e0e0;
    }
    .info-row:last-child {
      border-bottom: none;
    }
    .info-label {
      font-weight: 600;
      color: #666;
      width: 140px;
      flex-shrink: 0;
    }
    .info-value {
      color: #333;
      flex: 1;
    }
    .timeline {
      margin: 30px 0;
    }
    .timeline-item {
      display: flex;
      margin-bottom: 20px;
      align-items: flex-start;
    }
    .timeline-icon {
      width: 40px;
      height: 40px;
      background-color: #6AB52B;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      margin-right: 15px;
      flex-shrink: 0;
    }
    .timeline-content h4 {
      margin: 0 0 5px;
      font-size: 16px;
      color: #333;
    }
    .timeline-content p {
      margin: 0;
      font-size: 14px;
      color: #666;
      line-height: 1.5;
    }
    .price-box {
      background: linear-gradient(135deg, #6AB52B 0%, #5A9823 100%);
      color: white;
      padding: 25px;
      border-radius: 8px;
      text-align: center;
      margin: 30px 0;
    }
    .price-box .label {
      font-size: 14px;
      opacity: 0.9;
      margin-bottom: 8px;
    }
    .price-box .amount {
      font-size: 36px;
      font-weight: 700;
    }
    .footer {
      background-color: #2d3748;
      color: white;
      padding: 30px;
      text-align: center;
    }
    .footer-contacts {
      margin: 20px 0;
      font-size: 14px;
      line-height: 1.8;
    }
    .footer-contacts a {
      color: #6AB52B;
      text-decoration: none;
    }
    .footer-note {
      font-size: 12px;
      color: #a0aec0;
      margin-top: 20px;
      line-height: 1.6;
    }
    .cta-button {
      display: inline-block;
      background-color: #6AB52B;
      color: white;
      padding: 14px 30px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      margin: 20px 0;
    }
    @media only screen and (max-width: 600px) {
      .header h1 { font-size: 24px; }
      .content { padding: 30px 20px; }
      .info-row { flex-direction: column; }
      .info-label { width: 100%; margin-bottom: 4px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>✅ Richiesta Ricevuta!</h1>
      <p>Grazie per averci contattato, ${nome}</p>
    </div>

    <!-- Content -->
    <div class="content">
      <div class="success-badge">
        La tua richiesta è stata inviata con successo
      </div>

      <!-- Dati Cliente -->
      <div class="info-box">
        <h3>📋 Riepilogo Richiesta</h3>
        <div class="info-row">
          <span class="info-label">Tipo:</span>
          <span class="info-value"><strong>${tipoRichiesta.toUpperCase()}</strong></span>
        </div>
        <div class="info-row">
          <span class="info-label">Nome:</span>
          <span class="info-value">${nome}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Email:</span>
          <span class="info-value">${email}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Telefono:</span>
          <span class="info-value">${telefono}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Data/Ora:</span>
          <span class="info-value">${timestamp || new Date().toLocaleString('it-IT')}</span>
        </div>
        ${note ? `
        <div class="info-row">
          <span class="info-label">Note:</span>
          <span class="info-value">${note}</span>
        </div>
        ` : ''}
      </div>

      ${prezzoTotale ? `
      <!-- Prezzo Stimato -->
      <div class="price-box">
        <div class="label">Prezzo Stimato Indicativo</div>
        <div class="amount">€ ${prezzoTotale.toLocaleString('it-IT')}</div>
        <p style="font-size: 13px; margin: 10px 0 0; opacity: 0.9;">IVA esclusa - soggetto a conferma dopo sopralluogo</p>
      </div>
      ` : ''}

      <!-- Timeline -->
      <h3 style="margin: 40px 0 25px; color: #333;">🕐 Cosa succede ora?</h3>
      <div class="timeline">
        <div class="timeline-item">
          <div class="timeline-icon">1</div>
          <div class="timeline-content">
            <h4>Verifica Richiesta</h4>
            <p>Il nostro team analizza la tua richiesta (entro 24 ore lavorative)</p>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-icon">2</div>
          <div class="timeline-content">
            <h4>Ti Contattiamo</h4>
            <p>Ti chiamiamo per confermare i dettagli e fissare un appuntamento</p>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-icon">3</div>
          <div class="timeline-content">
            <h4>Preventivo Dettagliato</h4>
            <p>Sopralluogo gratuito e preventivo personalizzato senza impegno</p>
          </div>
        </div>
      </div>

      <p style="color: #666; font-size: 14px; line-height: 1.6; margin-top: 30px;">
        Se hai domande urgenti o vuoi modificare la richiesta, contattaci direttamente:
      </p>

      <a href="tel:+390185167656" class="cta-button">📞 Chiama Ora: +39 0185 167656</a>
    </div>

    <!-- Footer -->
    <div class="footer">
      <strong style="font-size: 18px;">MARTELLO 1930</strong>
      <p style="margin: 5px 0; opacity: 0.9;">Legnami • Brico • Outdoor</p>
      
      <div class="footer-contacts">
        📍 Via Traversaro, 13 — 16039 SESTRI LEVANTE (GE)<br>
        📞 Tel: <a href="tel:+390185167656">+39 0185 167656</a><br>
        📧 Email: <a href="mailto:preventivi@martello1930.net">preventivi@martello1930.net</a><br>
        🕐 Orari: lun-ven 8:00-12:00 / 14:00-18:00 — sab 08:00-12:00
      </div>

      <div class="footer-note">
        Questa è un'email automatica di conferma. Per qualsiasi informazione rispondi a questo messaggio 
        o contattaci ai recapiti sopra indicati.<br><br>
        © ${new Date().getFullYear()} Martello 1930 - P.IVA 00167970995
      </div>
    </div>
  </div>
</body>
</html>
  `.trim()
}

/**
 * Template plain-text per notifica team admin
 * Con emoji e formattazione leggibile
 */
export function getTeamEmailTemplate(data: EmailClientData): string {
  const {
    nome,
    email,
    telefono,
    tipoRichiesta,
    prezzoTotale,
    note,
    timestamp,
    indirizzo,
    citta,
    provincia,
    cap,
    dettagliProgetto,
  } = data

  let text = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔔 NUOVA RICHIESTA ${tipoRichiesta.toUpperCase()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 Data/Ora: ${timestamp || new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' })}
🏷️  Tipo: ${tipoRichiesta.toUpperCase()}
${prezzoTotale ? `💰 Prezzo Stimato: € ${prezzoTotale.toLocaleString('it-IT')} (IVA esclusa)\n` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 DATI CLIENTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nome:     ${nome}
Email:    ${email}
Telefono: ${telefono}
${indirizzo ? `Indirizzo: ${indirizzo}\n` : ''}${citta ? `Città:     ${citta} ${provincia ? `(${provincia})` : ''} ${cap || ''}\n` : ''}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`

  // Dettagli progetto se presenti
  if (dettagliProgetto && Object.keys(dettagliProgetto).length > 0) {
    text += `
📦 DETTAGLI PROGETTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${dettagliProgetto.tipologia ? `Tipologia:  ${dettagliProgetto.tipologia}\n` : ''}${dettagliProgetto.dimensioni ? `Dimensioni: ${dettagliProgetto.dimensioni}\n` : ''}${dettagliProgetto.materiale ? `Materiale:  ${dettagliProgetto.materiale}\n` : ''}${dettagliProgetto.accessori && dettagliProgetto.accessori.length > 0 ? `Accessori:  ${dettagliProgetto.accessori.join(', ')}\n` : ''}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`
  }

  // Note aggiuntive
  if (note && note.trim().length > 0) {
    text += `
📝 NOTE AGGIUNTIVE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${note}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`
  }

  text += `
🎯 AZIONI DA FARE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. ☎️  Chiamare il cliente entro 24h lavorative
2. 📋 Confermare dettagli e disponibilità sopralluogo
3. 📅 Fissare appuntamento per preventivo dettagliato
4. 💼 Preparare documentazione progetto

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚡ CONTATTO RAPIDO:
   Rispondi a questa email per contattare direttamente il cliente
   oppure chiama: ${telefono}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sistema Preventivi MARTELLO 1930
Generato automaticamente il ${new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' })}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `.trim()

  return text
}

/**
 * Template email di errore per il team (opzionale)
 */
export function getErrorNotificationTemplate(error: any, context: string): string {
  return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️  ERRORE SISTEMA PREVENTIVI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Contesto: ${context}
Timestamp: ${new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' })}

Errore:
${error.message || error}

Stack Trace:
${error.stack || 'Non disponibile'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Verifica configurazione GMAIL_USER e GMAIL_APP_PASSWORD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `.trim()
}
