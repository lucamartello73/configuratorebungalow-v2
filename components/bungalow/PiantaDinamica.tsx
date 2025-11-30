'use client'

interface PiantaDinamicaProps {
  numeroVani: 1 | 2 | 3 | 4
}

// SVG generati dinamicamente per ogni configurazione vani
const PIANTE_SVG = {
  1: {
    svg: (
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        {/* Sfondo */}
        <rect width="300" height="200" fill="#f0f9ff" />
        
        {/* Perimetro esterno */}
        <rect x="10" y="10" width="280" height="180" fill="white" stroke="#1e40af" strokeWidth="3" />
        
        {/* Porta d'ingresso */}
        <rect x="130" y="10" width="40" height="5" fill="#f59e0b" />
        <text x="150" y="25" textAnchor="middle" fontSize="10" fill="#1e40af">Ingresso</text>
        
        {/* Etichetta vano */}
        <text x="150" y="105" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#1e40af">
          Open Space
        </text>
        <text x="150" y="125" textAnchor="middle" fontSize="12" fill="#64748b">
          Vano Unico
        </text>
      </svg>
    ),
    descrizione: 'Open space senza divisioni interne',
  },
  2: {
    svg: (
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        {/* Sfondo */}
        <rect width="300" height="200" fill="#f0f9ff" />
        
        {/* Perimetro esterno */}
        <rect x="10" y="10" width="280" height="180" fill="white" stroke="#1e40af" strokeWidth="3" />
        
        {/* Divisione centrale verticale */}
        <line x1="150" y1="10" x2="150" y2="190" stroke="#64748b" strokeWidth="2" strokeDasharray="5,5" />
        
        {/* Porta d'ingresso */}
        <rect x="130" y="10" width="40" height="5" fill="#f59e0b" />
        
        {/* Porte interne */}
        <rect x="140" y="100" width="20" height="5" fill="#94a3b8" />
        
        {/* Etichette vani */}
        <text x="80" y="105" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e40af">
          Vano 1
        </text>
        <text x="220" y="105" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e40af">
          Vano 2
        </text>
      </svg>
    ),
    descrizione: 'Diviso in 2 vani con parete divisoria',
  },
  3: {
    svg: (
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        {/* Sfondo */}
        <rect width="300" height="200" fill="#f0f9ff" />
        
        {/* Perimetro esterno */}
        <rect x="10" y="10" width="280" height="180" fill="white" stroke="#1e40af" strokeWidth="3" />
        
        {/* Divisione orizzontale */}
        <line x1="10" y1="100" x2="290" y2="100" stroke="#64748b" strokeWidth="2" strokeDasharray="5,5" />
        
        {/* Divisione verticale sopra */}
        <line x1="150" y1="10" x2="150" y2="100" stroke="#64748b" strokeWidth="2" strokeDasharray="5,5" />
        
        {/* Porta d'ingresso */}
        <rect x="130" y="10" width="40" height="5" fill="#f59e0b" />
        
        {/* Porte interne */}
        <rect x="140" y="55" width="20" height="5" fill="#94a3b8" />
        <rect x="140" y="145" width="20" height="5" fill="#94a3b8" />
        
        {/* Etichette vani */}
        <text x="80" y="60" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e40af">
          Vano 1
        </text>
        <text x="220" y="60" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e40af">
          Vano 2
        </text>
        <text x="150" y="150" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e40af">
          Vano 3
        </text>
      </svg>
    ),
    descrizione: 'Diviso in 3 vani: 2 superiori + 1 inferiore',
  },
  4: {
    svg: (
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        {/* Sfondo */}
        <rect width="300" height="200" fill="#f0f9ff" />
        
        {/* Perimetro esterno */}
        <rect x="10" y="10" width="280" height="180" fill="white" stroke="#1e40af" strokeWidth="3" />
        
        {/* Divisione orizzontale */}
        <line x1="10" y1="100" x2="290" y2="100" stroke="#64748b" strokeWidth="2" strokeDasharray="5,5" />
        
        {/* Divisione verticale */}
        <line x1="150" y1="10" x2="150" y2="190" stroke="#64748b" strokeWidth="2" strokeDasharray="5,5" />
        
        {/* Porta d'ingresso */}
        <rect x="130" y="10" width="40" height="5" fill="#f59e0b" />
        
        {/* Porte interne */}
        <rect x="140" y="55" width="20" height="5" fill="#94a3b8" />
        <rect x="75" y="145" width="20" height="5" fill="#94a3b8" />
        <rect x="205" y="145" width="20" height="5" fill="#94a3b8" />
        
        {/* Etichette vani */}
        <text x="80" y="60" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e40af">
          Vano 1
        </text>
        <text x="220" y="60" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e40af">
          Vano 2
        </text>
        <text x="80" y="150" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e40af">
          Vano 3
        </text>
        <text x="220" y="150" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e40af">
          Vano 4
        </text>
      </svg>
    ),
    descrizione: 'Diviso in 4 vani: configurazione quadrupla',
  },
}

export function PiantaDinamica({ numeroVani }: PiantaDinamicaProps) {
  const pianta = PIANTE_SVG[numeroVani]

  return (
    <div className="bg-white border-2 border-blue-200 rounded-xl overflow-hidden shadow-lg">
      {/* Header */}
      <div className="bg-gray-900 text-white px-6 py-3">
        <h3 className="font-bold text-lg">📐 Pianta Indicativa</h3>
        <p className="text-sm opacity-90">{pianta.descrizione}</p>
      </div>

      {/* SVG Container */}
      <div className="p-6 bg-gray-50">
        {pianta.svg}
      </div>

      {/* Footer info */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-start gap-2 text-sm text-gray-600">
          <span>💡</span>
          <p>
            Questa è una <strong>rappresentazione schematica</strong>. 
            La disposizione finale dei vani sarà personalizzata in base alle tue esigenze 
            e concordata in fase di progettazione esecutiva.
          </p>
        </div>
      </div>
    </div>
  )
}
