import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Ruler, Users, CheckCircle, ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
              Configuratore Bungalow MARTELLO1930
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-600">
              Progetta il tuo bungalow su misura in pochi semplici passi
            </p>
            <Link href="/bungalow">
              <button className="bg-black text-white hover:bg-gray-800 font-semibold py-4 px-10 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-3">
                Inizia configurazione
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-12">
            Perché scegliere i nostri bungalow?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Benefit 1 */}
            <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-gray-100 w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Ruler className="w-7 h-7 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Su Misura
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Configura dimensioni e finiture secondo le tue esigenze
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-gray-100 w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-7 h-7 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Qualità Garantita
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Materiali certificati e lavorazione artigianale dal 1930
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-gray-100 w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Assistenza Completa
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Dalla progettazione all'installazione
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section - rimossa perché già coperta dalla sezione Benefits */}

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
            Pronto per iniziare?
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Configura il tuo bungalow personalizzato e ricevi un preventivo gratuito in pochi minuti
          </p>
          <Link href="/bungalow">
            <button className="bg-black text-white hover:bg-gray-800 font-semibold py-4 px-12 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-3">
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
