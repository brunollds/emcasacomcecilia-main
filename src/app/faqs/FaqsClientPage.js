'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, MessageCircle, Video, Mail } from 'lucide-react';
import { brandLinks } from '@/lib/data';
import { faqData } from '@/lib/faqData';


function FAQItem({ pergunta, resposta, link }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`overflow-hidden rounded-[2rem] border border-black/5 transition-all duration-300 ${isOpen ? 'bg-white shadow-lg' : 'bg-white shadow-soft hover:shadow-md'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-8 py-6 text-left group"
      >
        <span className={`text-lg font-bold transition-colors md:text-xl ${isOpen ? 'text-[#ff6b35]' : 'text-[#0f1419] group-hover:text-[#1a4d2e]'}`}>
          {pergunta}
        </span>
        <span className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? 'rotate-180 bg-[#ff6b35]/10 text-[#ff6b35]' : 'bg-[#fef9f3] text-[#1a4d2e] group-hover:bg-[#1a4d2e] group-hover:text-white'}`}>
          <ChevronDown size={20} />
        </span>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-8 pb-8 pt-0">
          <div className="mb-4 h-1 w-12 rounded-full bg-[#ffd700]" />
          <p className="text-lg leading-relaxed text-gray-600">{resposta}</p>
          {link && (
            link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#ff6b35] hover:text-[#1a4d2e] transition-colors"
              >
                {link.label} →
              </a>
            ) : (
              <Link
                href={link.href}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#ff6b35] hover:text-[#1a4d2e] transition-colors"
              >
                {link.label} →
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default function FAQsPage() {
  const [categoriaAtiva, setCategoriaAtiva] = useState(faqData[0].categoria);

  return (
    <div className="min-h-screen bg-[#fef9f3]">
      <section className="relative overflow-hidden bg-[#0f1d3a] px-6 py-20">
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute left-10 top-10 animate-float">
            <HelpCircle size={100} className="text-white" />
          </div>
          <div className="absolute bottom-10 right-10 animate-float-slow">
            <MessageCircle size={120} className="text-[#ffd700]" />
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-4xl font-bold text-[#ffd700] md:text-6xl">
            Perguntas Frequentes
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl font-light leading-relaxed text-white/80">
            Como funciona o projeto, parcerias, dicas de culinária e tudo mais que você precisa saber!
          </p>
        </div>
      </section>

      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-16 sm:px-6 lg:flex-row lg:px-8">
        {/* Sidebar */}
        <aside className="lg:w-1/3">
          <div className="sticky top-24 rounded-[2.5rem] border border-black/5 bg-white p-8 shadow-soft">
            <h3 className="mb-6 border-b border-black/5 pb-4 font-heading text-xl font-bold text-[#1a4d2e]">
              Categorias
            </h3>
            <div className="flex flex-row flex-wrap gap-3 lg:flex-col">
              {faqData.map((item) => (
                <button
                  key={item.categoria}
                  onClick={() => setCategoriaAtiva(item.categoria)}
                  className={`rounded-2xl px-6 py-4 text-left font-bold transition-all ${
                    categoriaAtiva === item.categoria
                      ? 'bg-[#ff6b35] text-white shadow-md lg:translate-x-2'
                      : 'bg-[#fef9f3] text-[#0f1419] hover:bg-[#1a4d2e] hover:text-white'
                  }`}
                >
                  {item.categoria}
                </button>
              ))}
            </div>

            <div className="mt-12 rounded-3xl bg-gradient-to-br from-[#1a4d2e] to-[#0f1d3a] p-6 text-center shadow-lg">
              <HelpCircle className="mx-auto mb-4 h-12 w-12 text-[#ffd700]" />
              <h4 className="mb-2 text-lg font-bold text-white">Ainda com dúvida?</h4>
              <p className="mb-6 text-sm text-white/70">
                Fale com a gente! Pode mandar sua pergunta pelo Instagram ou por e-mail.
              </p>
              <Link
                href="/contato"
                className="inline-block w-full rounded-xl bg-[#ffd700] py-3 font-bold text-[#1a4d2e] transition-colors hover:bg-white"
              >
                Entrar em Contato
              </Link>
            </div>
          </div>
        </aside>

        {/* Lista de FAQs */}
        <main className="lg:w-2/3">
          {faqData.map(
            (categoria) =>
              categoriaAtiva === categoria.categoria && (
                <div key={categoria.categoria} className="animate-fade-in">
                  <h2 className="mb-8 flex items-center gap-3 font-heading text-3xl font-bold text-[#0f1419] md:text-4xl">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1a4d2e]/10 text-sm text-[#1a4d2e]">
                      #
                    </span>
                    {categoria.categoria}
                  </h2>
                  <div className="space-y-4">
                    {categoria.perguntas.map((faq, index) => (
                      <FAQItem
                        key={index}
                        pergunta={faq.pergunta}
                        resposta={faq.resposta}
                        link={faq.link}
                      />
                    ))}
                  </div>
                </div>
              )
          )}
        </main>
      </div>

      <section className="bg-[#ff6b35] px-6 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">
            Acompanhe as novidades
          </h2>
          <p className="mt-6 text-xl font-light text-white/90">
            Não perca nenhuma receita nova e acompanhe os bastidores da cozinha.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={brandLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-[#0f1d3a] px-10 py-5 font-bold text-white shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              <Video className="transition-colors group-hover:text-red-500" />
              Ver Vídeos
            </a>
            <a
              href={brandLinks.contactMailto}
              className="inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 font-bold text-[#ff6b35] shadow-xl transition-all hover:bg-[#fef9f3] hover:scale-105 active:scale-95"
            >
              <Mail />
              Solicitar Mídia Kit
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
