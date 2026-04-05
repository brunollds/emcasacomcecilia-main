'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search, Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 shadow-md`} style={{ background: '#0f1d3a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo + Busca + Mobile Menu */}
        <div className="flex items-center justify-between py-3 gap-8">
          {/* Logo - CSS Style (IDÊNTICO ao Dicas - em/com vertical) */}
          <Link href="/" className="group flex flex-col justify-center flex-shrink-0">
            <span style={{
              fontSize: '1.49rem',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: '1',
              letterSpacing: '-0.5px',
              display: 'inline-flex',
              alignItems: 'baseline',
              gap: '1.5px'
            }}>
              <span style={{ fontSize: '0.60rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.3px' }}>em</span>
              <span style={{ fontSize: '1em', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.4px' }}>CASA</span>
              <span style={{ fontSize: '0.60rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.3px' }}>com</span>
              <span style={{ fontSize: '1em', fontWeight: 800, color: '#ff6b35', letterSpacing: '-0.4px' }}>CECÍLIA</span>
            </span>
            <span style={{
              fontSize: '0.65rem',
              color: 'rgba(255, 255, 255, 0.78)',
              fontWeight: 500,
              letterSpacing: '0.3px',
              marginTop: '1px'
            }}>
              Receitas que dão certo
            </span>
          </Link>

          {/* Busca Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar receitas..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-white/20 bg-white/10 text-white placeholder-white/50 focus:border-white/40 focus:bg-white/20 focus:outline-none text-sm"
              />
            </div>
          </form>

          {/* Links Desktop */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.slice(0, 4).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="https://dicas.emcasacomcecilia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#ff6b35] text-white text-sm font-semibold hover:bg-[#ff5722] transition-all"
            >
              Dicas
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Menu"
          >
            {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>

        {/* Busca Mobile */}
        <form onSubmit={handleSearch} className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar receitas..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-white/20 bg-white/10 text-white placeholder-white/50 focus:border-white/40 focus:bg-white/20 focus:outline-none text-sm"
            />
          </div>
        </form>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#0f1d3a] border-t border-white/10 animate-slide-down">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-white font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="https://dicas.emcasacomcecilia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-3 rounded-lg bg-[#ff6b35] text-white font-semibold text-center"
              onClick={() => setIsOpen(false)}
            >
              Dicas & Ofertas →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
