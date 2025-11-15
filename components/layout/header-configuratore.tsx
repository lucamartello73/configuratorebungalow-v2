"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Home } from "lucide-react"

interface HeaderConfiguratorProps {
  title?: string
}

export function HeaderConfigurator({ title = "Configuratore" }: HeaderConfiguratorProps) {
  const router = useRouter()

  const handleHome = () => {
    window.location.href = '/' // Hard reload per reset stato
  }

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button
            onClick={handleHome}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Indietro
          </button>
          <div className="h-8 w-px bg-gray-300" />
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        </div>
        
        <button
          onClick={handleHome}
          className="flex items-center gap-2 px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 transition"
        >
          <Home className="h-4 w-4" />
          Home
        </button>
      </div>
    </header>
  )
}
