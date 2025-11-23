"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone, Mail, Facebook, Instagram, Music2 } from 'lucide-react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Modelli', href: '/modelli' },
    { name: 'Casette Giardino', href: '/configura' },
    { name: 'Bungalow', href: '/bungalow' },
    { name: 'Catalogo', href: '/catalogo' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Bar Verde */}
      <div className="bg-[#6AB52B] text-white">
        <div className="container mx-auto px-4">
          <div className="flex h-10 items-center justify-between text-sm">
            {/* Contatti Sinistra */}
            <div className="flex items-center gap-6">
              <a
                href="tel:+390185167566"
                className="flex items-center gap-2 hover:text-[#E8F5E0] transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">+39 0185 167 566</span>
              </a>
              <a
                href="mailto:soluzioni@martello1930.net"
                className="flex items-center gap-2 hover:text-[#E8F5E0] transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                <span className="hidden md:inline">soluzioni@martello1930.net</span>
              </a>
            </div>

            {/* Social Icons Destra */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/martello1930"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E8F5E0] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/martello1930"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E8F5E0] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.tiktok.com/@martello1930"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E8F5E0] transition-colors"
                aria-label="TikTok"
              >
                <Music2 className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/390185167656"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E8F5E0] transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Bianco */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="https://page.gensparksite.com/img/5b071e78-f86b-448e-8321-b9d3f78d5be9.jpg"
                alt="Martello1930"
                width={60}
                height={60}
                className="rounded"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900">MARTELLO1930</span>
                <span className="text-xs text-gray-600">Strutture in legno dal 1930</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-[#6AB52B] transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-[#6AB52B] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-gray-200 bg-white">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#E8F5E0] hover:text-[#6AB52B] rounded-lg transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
