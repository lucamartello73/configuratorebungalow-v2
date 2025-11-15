"use client"

import Image from "next/image"
import { MapPin, Mail, ExternalLink } from "lucide-react"

export function FooterMartello1930() {
  return (
    <footer className="border-t bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Sezione Superiore con Logo e Contatti */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Colonna 1: Logo */}
          <div className="flex flex-col items-center md:items-start">
            <Image 
              src="https://page.gensparksite.com/img/5b071e78-f86b-448e-8321-b9d3f78d5be9.jpg"
              alt="Martello1930"
              width={200}
              height={120}
              className="mb-4 rounded-lg shadow-md"
              priority
            />
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Strutture in legno su misura dal 1930
            </p>
          </div>

          {/* Colonna 2: Sede */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">📍 Sede Operativa</h3>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-medium">Via Aurelia</p>
                <p>Sestri Levante (GE)</p>
                <a
                  href="https://www.google.com/maps/search/Via+Aurelia+Sestri+Levante+GE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-primary hover:underline"
                >
                  Vedi su Maps
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Colonna 3: Contatti */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">📞 Contatti</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              {/* Telefono */}
              <a
                href="tel:+390185167656"
                className="flex items-center gap-2 hover:text-primary transition"
              >
                <span className="text-lg">📞</span>
                <span>+39 0185 167 656</span>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/390185167656"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition"
              >
                <svg className="h-4 w-4 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>WhatsApp</span>
              </a>

              {/* Email */}
              <a
                href="mailto:soluzioni@martello1930.net"
                className="flex items-center gap-2 hover:text-primary transition"
              >
                <Mail className="h-4 w-4 text-primary" />
                <span>soluzioni@martello1930.net</span>
              </a>
            </div>
          </div>

          {/* Colonna 4: Sito Web */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">🌐 Sito Web</h3>
            <a
              href="https://www.martello1930.net"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              www.martello1930.net
              <ExternalLink className="h-4 w-4" />
            </a>
            <p className="mt-4 text-sm text-muted-foreground">
              Scopri tutti i nostri prodotti e servizi
            </p>
          </div>
        </div>
      </div>

      {/* Sezione Inferiore: Copyright */}
      <div className="border-t bg-slate-100 dark:bg-slate-900">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
            <p>© {new Date().getFullYear()} Martello1930. Tutti i diritti riservati.</p>
            <p>Sistema Martello1930 - Strutture in legno dal 1930</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
