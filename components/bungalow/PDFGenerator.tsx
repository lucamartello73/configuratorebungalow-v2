'use client'

import { useState } from 'react'
import jsPDF from 'jspdf'
import type { PreventivoBungalow } from '@/types/bungalow'
import { STATI_PREVENTIVO } from '@/types/bungalow'
import { Download } from 'lucide-react'
import { format } from 'date-fns'
import { it } from 'date-fns/locale'

interface PDFGeneratorProps {
  preventivo: PreventivoBungalow
}

export function PDFGenerator({ preventivo }: PDFGeneratorProps) {
  const [generating, setGenerating] = useState(false)

  async function generatePDF() {
    setGenerating(true)

    try {
      const doc = new jsPDF()
      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()
      let yPos = 20

      // Helper per text centrato
      const centerText = (text: string, y: number, fontSize = 12) => {
        doc.setFontSize(fontSize)
        const textWidth = doc.getTextWidth(text)
        doc.text(text, (pageWidth - textWidth) / 2, y)
      }

      // --- HEADER ---
      doc.setFillColor(37, 99, 235) // Blue-600
      doc.rect(0, 0, pageWidth, 40, 'F')

      doc.setTextColor(255, 255, 255)
      doc.setFontSize(24)
      doc.setFont('helvetica', 'bold')
      centerText('PREVENTIVO BUNGALOW', 18)

      doc.setFontSize(12)
      doc.setFont('helvetica', 'normal')
      centerText('Martello1930 - Strutture su Misura', 28)

      doc.setTextColor(0, 0, 0)
      yPos = 55

      // --- INFO DOCUMENTO ---
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.text(`Data richiesta: ${format(new Date(preventivo.created_at), 'dd/MM/yyyy HH:mm')}`, 20, yPos)
      yPos += 7
      doc.text(`Codice richiesta: ${preventivo.id.slice(0, 8).toUpperCase()}`, 20, yPos)
      yPos += 7

      const statoInfo = STATI_PREVENTIVO[preventivo.stato as keyof typeof STATI_PREVENTIVO]
      doc.text(`Stato: ${statoInfo.label}`, 20, yPos)
      yPos += 15

      // --- SEPARATORE ---
      doc.setDrawColor(200, 200, 200)
      doc.line(20, yPos, pageWidth - 20, yPos)
      yPos += 10

      // --- CONFIGURAZIONE BUNGALOW ---
      doc.setFontSize(16)
      doc.setFont('helvetica', 'bold')
      doc.text('CONFIGURAZIONE BUNGALOW', 20, yPos)
      yPos += 10

      doc.setFontSize(12)
      doc.setFont('helvetica', 'normal')

      // Box dimensioni
      doc.setFillColor(239, 246, 255) // Blue-50
      doc.roundedRect(20, yPos, pageWidth - 40, 40, 3, 3, 'F')
      
      yPos += 10
      doc.setFont('helvetica', 'bold')
      doc.text('Dimensioni:', 30, yPos)
      doc.setFont('helvetica', 'normal')
      yPos += 8
      doc.text(`Lunghezza: ${preventivo.lunghezza}m`, 30, yPos)
      yPos += 6
      doc.text(`Larghezza: ${preventivo.larghezza}m`, 30, yPos)
      yPos += 6
      const mq = (preventivo.lunghezza * preventivo.larghezza).toFixed(2)
      doc.setFont('helvetica', 'bold')
      doc.text(`Superficie totale: ${mq} m²`, 30, yPos)
      yPos += 15

      // Numero vani
      doc.setFont('helvetica', 'bold')
      doc.text('Numero vani:', 30, yPos)
      doc.setFont('helvetica', 'normal')
      doc.text(`${preventivo.numero_vani} ${preventivo.numero_vani === 1 ? 'vano' : 'vani'}`, 70, yPos)
      yPos += 10

      // Note
      if (preventivo.note) {
        doc.setFillColor(255, 237, 213) // Orange-50
        doc.roundedRect(20, yPos, pageWidth - 40, 50, 3, 3, 'F')
        
        yPos += 10
        doc.setFont('helvetica', 'bold')
        doc.text('Note Cliente:', 30, yPos)
        yPos += 8
        
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(10)
        
        // Split text per multiple righe
        const noteLines = doc.splitTextToSize(preventivo.note, pageWidth - 60)
        doc.text(noteLines, 30, yPos)
        yPos += noteLines.length * 5 + 10
        
        doc.setFontSize(12)
      }

      // Allegati
      if (preventivo.allegati && preventivo.allegati.length > 0) {
        yPos += 5
        doc.setFont('helvetica', 'bold')
        doc.text('Immagini Allegate:', 30, yPos)
        doc.setFont('helvetica', 'normal')
        doc.text(`${preventivo.allegati.length} immagini fornite dal cliente`, 80, yPos)
        yPos += 10
      }

      // Check se serve nuova pagina
      if (yPos > pageHeight - 80) {
        doc.addPage()
        yPos = 20
      }

      // --- SEPARATORE ---
      yPos += 10
      doc.line(20, yPos, pageWidth - 20, yPos)
      yPos += 15

      // --- DATI CLIENTE ---
      if (preventivo.cliente_nome || preventivo.email || preventivo.telefono) {
        doc.setFontSize(16)
        doc.setFont('helvetica', 'bold')
        doc.text('DATI DI CONTATTO', 20, yPos)
        yPos += 10

        doc.setFontSize(12)
        doc.setFont('helvetica', 'normal')

        doc.setFillColor(243, 232, 255) // Purple-50
        doc.roundedRect(20, yPos, pageWidth - 40, 30, 3, 3, 'F')
        
        yPos += 10
        if (preventivo.cliente_nome) {
          doc.text(`Nome: ${preventivo.cliente_nome}`, 30, yPos)
          yPos += 7
        }
        if (preventivo.email) {
          doc.text(`Email: ${preventivo.email}`, 30, yPos)
          yPos += 7
        }
        if (preventivo.telefono) {
          doc.text(`Telefono: ${preventivo.telefono}`, 30, yPos)
          yPos += 10
        }
      }

      // --- FOOTER ---
      const footerY = pageHeight - 30
      doc.setDrawColor(200, 200, 200)
      doc.line(20, footerY, pageWidth - 20, footerY)
      
      doc.setFontSize(9)
      doc.setTextColor(100, 100, 100)
      doc.setFont('helvetica', 'normal')
      
      doc.text('Martello1930 srl', 20, footerY + 7)
      doc.text('Via Aurelia, Sestri Levante (GE)', 20, footerY + 12)
      doc.text('Tel: +39 0185 167 656', 20, footerY + 17)
      
      doc.text('www.martello1930.net', pageWidth - 60, footerY + 7)
      doc.text('soluzioni@martello1930.net', pageWidth - 60, footerY + 12)

      // --- WATERMARK (se stato non confermato) ---
      if (preventivo.stato !== 'confermato') {
        doc.setTextColor(200, 200, 200)
        doc.setFontSize(60)
        doc.setFont('helvetica', 'bold')
        doc.text('BOZZA', pageWidth / 2 - 30, pageHeight / 2, {
          angle: 45,
        })
      }

      // Download PDF
      const fileName = `preventivo_bungalow_${preventivo.id.slice(0, 8)}.pdf`
      doc.save(fileName)
    } catch (error) {
      console.error('Errore generazione PDF:', error)
      alert('Errore durante la generazione del PDF')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <button
      onClick={generatePDF}
      disabled={generating}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
    >
      {generating ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Generazione...
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          Scarica PDF
        </>
      )}
    </button>
  )
}
