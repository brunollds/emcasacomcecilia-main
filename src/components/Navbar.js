'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/receitas', label: 'Receitas' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/sobre', label: 'Sobre' },
    { href: '/contato', label: 'Contato' },
    { href: '/faqs', label: 'FAQs' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/receitas?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Logo + Busca + Mobile Menu */}
          <div className="flex items-center justify-between py-6 gap-8">
            {/* Logo - 70% menor */}
            <Link href="/" className="flex flex-col flex-shrink-0">
              <span className="text-xl md:text-2xl font-extrabold text-[#1a4d2e] leading-tight">
                EM CASA COM CECÍLIA
              </span>
              <span className="text-sm md:text-base text-[#ff6b35] font-semibold">
                por Cecília Mauad
              </span>
            </Link>

            {/* Busca - DENTRO DO HEADER */}
            <form onSubmit={handleSearch} className="hidden md:block flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar receitas, ingredientes..."
                  className="w-full px-5 py-3 pl-12 rounded-full border-2 border-gray-300 focus:border-[#ff6b35] focus:outline-none text-gray-700"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-5 py-1.5 bg-[#ff6b35] text-white rounded-full font-semibold hover:bg-[#1a4d2e] transition-all text-sm"
                >
                  Buscar
                </button>
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">
                  🔍
                </div>
              </div>
            </form>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-[#1a4d2e] hover:bg-gray-100 focus:outline-none"
              >
                <span className="sr-only">Abrir menu</span>
                {!isOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block pb-4">
            <div className="flex items-center justify-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-[#1a4d2e] hover:text-[#ff6b35] transition-colors uppercase tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {/* Busca mobile */}
            <form onSubmit={handleSearch} className="mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 Buscar..."
                className="w-full px-4 py-2 rounded-full border-2 border-gray-300 focus:border-[#ff6b35] focus:outline-none"
              />
            </form>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-base font-semibold text-[#1a4d2e] hover:bg-gray-100 rounded-md transition-all"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
