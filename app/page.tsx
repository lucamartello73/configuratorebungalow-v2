import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Home, Ruler, Users, CheckCircle, ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#6AB52B] to-[#5A9823] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Configuratore Bungalow MARTELLO1930
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-50">
              Progetta il tuo bungalow su misura in pochi semplici passi
            </p>
            <Link href="/bungalow">
              <button className="bg-white text-[#6AB52B] hover:bg-green-50 font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center gap-3">
                Inizia Configurazione
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Perché scegliere i nostri bungalow?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Benefit 1 */}
            <div className="text-center p-6">
              <div className="bg-[#E8F5E0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Ruler className="w-8 h-8 text-[#6AB52B]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Su Misura
              </h3>
              <p className="text-gray-600">
                Configura dimensioni, numero di vani e finiture secondo le tue esigenze
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="text-center p-6">
              <div className="bg-[#E8F5E0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-[#6AB52B]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Qualità Garantita
              </h3>
              <p className="text-gray-600">
                Materiali certificati e lavorazione artigianale dal 1930
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="text-center p-6">
              <div className="bg-[#E8F5E0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#6AB52B]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Assistenza Completa
              </h3>
              <p className="text-gray-600">
                Ti seguiamo dalla progettazione fino all'installazione
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 bg-[#F8F8F8]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Come funziona?
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-5 gap-6">
              {/* Step 1 */}
              <div className="text-center">
                <div className="bg-[#6AB52B] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  1
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Dimensioni</h3>
                <p className="text-sm text-gray-600">Scegli lunghezza e larghezza</p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="bg-[#6AB52B] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  2
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Vani</h3>
                <p className="text-sm text-gray-600">Definisci la struttura interna</p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="bg-[#6AB52B] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  3
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Note</h3>
                <p className="text-sm text-gray-600">Aggiungi dettagli e immagini</p>
              </div>

              {/* Step 4 */}
              <div className="text-center">
                <div className="bg-[#6AB52B] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  4
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Contatti</h3>
                <p className="text-sm text-gray-600">Inserisci i tuoi dati</p>
              </div>

              {/* Step 5 */}
              <div className="text-center">
                <div className="bg-[#6AB52B] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  5
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Conferma</h3>
                <p className="text-sm text-gray-600">Ricevi il preventivo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Pronto per iniziare?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Configura il tuo bungalow personalizzato e ricevi un preventivo gratuito in pochi minuti
          </p>
          <Link href="/bungalow">
            <button className="bg-[#6AB52B] hover:bg-[#5A9823] text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center gap-3">
              Inizia Ora
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
