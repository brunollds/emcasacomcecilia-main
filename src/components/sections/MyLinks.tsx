'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Bell, BookOpen, Handshake, Tag } from 'lucide-react';
import { brandLinks } from '@/lib/data';

const links = [
  {
    id: 'damie',
    title: 'DAMIE',
    description: 'Parceria especial com o cupom CECILIA12 em uma experiência mais premium da marca.',
    url: brandLinks.damie,
    label: 'Cupom CECILIA12',
    eyebrow: 'Parceria da casa',
    accent: '#ff6b35',
    cta: 'Pegar cupom',
    image: '/images/universe/damie-hero.jpg',
    Icon: Handshake,
  },
  {
    id: 'dicas',
    title: 'Dicas & Ofertas',
    description: 'Cupons, promoções e oportunidades que valem a pena acompanhar no dia a dia.',
    url: brandLinks.dicas,
    label: 'Ofertas',
    eyebrow: 'Economize melhor',
    accent: '#1a4d2e',
    cta: 'Ver ofertas',
    Icon: Tag,
  },
  {
    id: 'air-fryer',
    title: 'E-book Air Fryer',
    description: 'Espaço reservado para o lançamento do guia com receitas práticas para a air fryer.',
    url: brandLinks.airFryerEbook,
    label: 'E-book',
    eyebrow: 'Em preparação',
    accent: '#0f1419',
    cta: 'Avise-me',
    comingSoon: true,
    Icon: BookOpen,
  },
];

export function MyLinks() {
  const [heroLink, ...secondaryLinks] = links;

  return (
    <section className="bg-[#fef9f3] px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 text-left">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0f1419]">
              Explore o universo da Cecília
            </h2>
          </div>
        </div>

        <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-[1.08fr_0.96fr_0.96fr] md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
          <Link
            href={heroLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex min-h-[210px] w-[74vw] min-w-[250px] max-w-[330px] flex-shrink-0 snap-start overflow-hidden rounded-[1.75rem] bg-[#4a1b0c] p-6 text-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-large md:min-h-[230px] md:w-auto md:min-w-0 md:max-w-none md:p-5 lg:p-7"
          >
            {heroLink.image ? (
              <Image
                src={heroLink.image}
                alt="Ambiente DAMIE selecionado pela Cecília"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 34vw"
              />
            ) : (
              <div className="absolute inset-0 bg-[linear-gradient(135deg,#4a1b0c_0%,#a6371d_48%,#ff8a4c_100%)]" />
            )}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,20,25,0.18)_0%,rgba(15,20,25,0.48)_58%,rgba(15,20,25,0.74)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(255,255,255,0.24),transparent_30%),radial-gradient(circle_at_88%_10%,rgba(255,215,0,0.18),transparent_24%)]" />
            <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-white/15 blur-3xl transition-transform duration-500 group-hover:scale-125" />
            <div className="relative flex w-full flex-col justify-between">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <span className="inline-flex rounded-full bg-white/18 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                    {heroLink.label}
                  </span>
                  <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/72">
                    {heroLink.eyebrow}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#ff6b35] shadow-sm transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105">
                  <heroLink.Icon className="h-5 w-5" />
                </div>
              </div>

              <div className="max-w-md">
                <h3 className="font-heading text-3xl font-bold leading-none lg:text-4xl">
                  {heroLink.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-white/84 md:line-clamp-3 lg:line-clamp-none">
                  {heroLink.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 border-t border-white/18 pt-4">
                <span className="rounded-full bg-[#0f1419] px-4 py-2.5 text-sm font-bold text-white transition-all group-hover:bg-white group-hover:text-[#0f1419]">
                  {heroLink.cta}
                </span>
                <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>
          </Link>

          {secondaryLinks.map((link) => {
            const Icon = link.comingSoon ? Bell : ArrowUpRight;

            return (
              <Link
                key={link.id}
                href={link.url}
                target={link.url.startsWith('http') ? '_blank' : undefined}
                rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`group relative min-h-[210px] w-[70vw] min-w-[230px] max-w-[310px] flex-shrink-0 snap-start overflow-hidden rounded-[1.5rem] border border-black/5 bg-white p-5 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-medium md:min-h-[230px] md:w-auto md:min-w-0 md:max-w-none ${
                  link.comingSoon ? 'opacity-78 hover:opacity-100' : ''
                }`}
              >
                <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-[#fef9f3]" />
                <div className="relative flex h-full flex-col justify-between gap-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="inline-flex rounded-full bg-[#f6f1e8] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0f1419]">
                        {link.label}
                      </span>
                      <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500">
                        {link.eyebrow}
                      </p>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fef9f3]" style={{ color: link.accent }}>
                      <link.Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div>
                      <h3 className="font-heading text-xl font-bold leading-tight text-[#0f1419] lg:text-2xl">
                      {link.title}
                    </h3>
                      <p className="mt-2 text-sm leading-6 text-gray-600 md:line-clamp-3 lg:line-clamp-none">
                      {link.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-black/8 pt-4">
                    <span className="text-sm font-bold" style={{ color: link.accent }}>
                      {link.cta}
                    </span>
                    <Icon className="h-4 w-4 text-[#0f1419] transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
