'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { brandLinks } from '@/lib/data';
import OmniSearch from '@/components/OmniSearch';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { href: '/receitas', label: 'Receitas', primary: true },
    { href: '/reviews', label: 'Reviews' },
    { href: '/cupons', label: 'Cupons' },
    { href: '/sobre', label: 'Sobre' },
    { href: '/contato', label: 'Contato' },
    { href: '/faqs', label: 'FAQs' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 print:hidden ${scrolled ? 'shadow-md' : ''}`} style={{ background: '#0f1d3a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo + Busca + Mobile Menu */}
        <div className="flex flex-col items-center gap-3 py-3 lg:flex-row lg:justify-between lg:gap-8">
          {/* Logo - CSS Style */}
          <Link href="/" className="group flex flex-shrink-0 translate-y-[2px] flex-col items-center justify-center">
            <span style={{
              fontSize: 'clamp(1.9rem, 7vw, 2.45rem)',
              fontWeight: 800,
              lineHeight: '1',
              letterSpacing: '-0.5px',
              display: 'inline-flex',
              alignItems: 'baseline',
              gap: '1.5px'
            }}>
              <span className="text-white transition-colors duration-300 group-hover:text-[#ff6b35]" style={{ fontSize: '0.60rem', fontWeight: 700, letterSpacing: '-0.3px' }}>em</span>
              <span className="text-white transition-colors duration-300 group-hover:text-[#ff6b35]" style={{ fontSize: '1em', fontWeight: 800, letterSpacing: '-0.4px' }}>CASA</span>
              <span className="text-white transition-colors duration-300 group-hover:text-[#ff6b35]" style={{ fontSize: '0.60rem', fontWeight: 700, letterSpacing: '-0.3px' }}>com</span>
              <span
                className="border-b-2 border-[#ff6b35]/80 pb-0.5 text-[#ff6b35] transition-colors duration-300 group-hover:text-white"
                style={{
                  fontSize: '1em',
                  fontWeight: 800,
                  letterSpacing: '-0.4px',
                }}
              >
                CECÍLIA
              </span>
            </span>
            <span className="hidden lg:block" style={{
              fontSize: '0.65rem',
              color: 'rgba(255, 255, 255, 0.78)',
              fontWeight: 500,
              letterSpacing: '0.3px',
              marginTop: '2px',
              textAlign: 'center'
            }}>
              Receitas que dão certo
            </span>
          </Link>

          {/* Busca Desktop */}
          <div className="hidden max-w-md flex-1 lg:block">
            <OmniSearch />
          </div>

          {/* Links Desktop */}
          <nav className="hidden lg:flex items-center gap-5">
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  link.primary
                    ? 'border-b-2 border-[#ff6b35] pb-1 font-bold text-white'
                    : 'font-medium text-white/78 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={brandLinks.damie}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#ffd700]/35 bg-[#ffd700]/10 px-3.5 py-1.5 text-sm font-bold text-[#ffd700] transition-all hover:border-[#ffd700]/70 hover:bg-[#ffd700]/18"
            >
              DAMIE
            </Link>
            <Link
              href={brandLinks.dicas}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#ff6b35] text-white text-sm font-semibold hover:bg-[#ff5722] transition-all"
            >
              Dicas
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/sobre"
              className="text-sm font-medium text-white/78 transition-colors hover:text-white"
            >
              Sobre
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="flex w-full items-center justify-center border-y border-white/18 py-2 lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center gap-3 rounded-full px-4 py-1.5 text-sm font-bold uppercase tracking-[0.12em] text-white/82 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Menu e busca"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              Menu & Busca
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#0f1d3a] border-t border-white/10 animate-slide-down">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block border-b border-white/10 px-2 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white/82 transition-colors hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={brandLinks.dicas}
              target="_blank"
              rel="noopener noreferrer"
              className="block border-b border-white/10 px-2 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[#ff6b35] transition-colors hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              Dicas & Ofertas
            </Link>
            <Link
              href={brandLinks.damie}
              target="_blank"
              rel="noopener noreferrer"
              className="block border-b border-white/10 px-2 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[#ffd700] transition-colors hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              DAMIE
            </Link>
            <div className="pt-4">
              <OmniSearch placeholder="Buscar receitas" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
