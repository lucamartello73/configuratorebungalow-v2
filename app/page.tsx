import Link from 'next/link'
import { Package, Ruler } from 'lucide-react'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Image 
            src="https://page.gensparksite.com/img/5b071e78-f86b-448e-8321-b9d3f78d5be9.jpg"
            alt="Martello1930"
            width={300}
            height={180}
            className="mx-auto mb-6 rounded-lg shadow-lg"
            priority
          />
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Configuratore Casette Legno
          </h1>
          <p className="text-xl text-gray-600">Sistema Martello1930 - Dal 1930</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link href="/modelli">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition cursor-pointer group">
              <Package className="w-16 h-16 text-green-600 mb-4 mx-auto group-hover:scale-110 transition" />
              <h2 className="text-2xl font-bold mb-2 text-center">Modelli a Catalogo</h2>
              <p className="text-gray-600 text-center">Scegli tra i nostri modelli standard</p>
            </div>
          </Link>

          <Link href="/configura">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition cursor-pointer group">
              <Ruler className="w-16 h-16 text-blue-600 mb-4 mx-auto group-hover:scale-110 transition" />
              <h2 className="text-2xl font-bold mb-2 text-center">Configuratore Su Misura</h2>
              <p className="text-gray-600 text-center">Crea la tua casetta personalizzata</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
