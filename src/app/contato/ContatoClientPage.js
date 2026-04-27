'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Video, Camera, MessageCircle, HeartHandshake, CheckCircle2, HelpCircle } from 'lucide-react';
import { brandLinks } from '@/lib/data';

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: 'sugestao',
    mensagem: ''
  });

  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('enviando');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error();

      setStatus('sucesso');
      setFormData({ nome: '', email: '', assunto: 'sugestao', mensagem: '' });
      setTimeout(() => setStatus(''), 5000);
    } catch {
      setStatus('erro');
      setTimeout(() => setStatus(''), 5000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-[#fef9f3]">
      {/* Hero Section */}
      <section className="relative bg-[#0f1d3a] px-6 py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 animate-float-slow">
            <MessageCircle size={100} className="text-white" />
          </div>
          <div className="absolute bottom-10 right-10 animate-pulse">
            <HeartHandshake size={120} className="text-[#ffd700]" />
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[#ffd700] mb-6 font-heading">
            Entre em Contato
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
            Tem uma sugestão de receita? Quer fazer uma parceria comercial? Ou só quer dizer oi? Adoraria ouvir você!
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="mx-auto max-w-5xl grid md:grid-cols-12 gap-12">
          
          {/* Formulário (Esquerda) */}
          <div className="md:col-span-7 bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-black/5">
            <h2 className="text-3xl font-bold text-[#0f1419] mb-8 font-heading">
              Envie uma mensagem
            </h2>

            {status === 'sucesso' && (
              <div className="mb-8 bg-[#1a4d2e]/10 border border-[#1a4d2e]/20 rounded-2xl p-6 text-center animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-[#1a4d2e] mx-auto mb-3" />
                <h3 className="text-xl font-bold text-[#1a4d2e] mb-2">
                  Mensagem Enviada!
                </h3>
                <p className="text-[#1a4d2e]/80">
                  Obrigada pelo contato! Vou responder em breve.
                </p>
              </div>
            )}

            {status === 'erro' && (
              <div className="mb-8 bg-red-50 border border-red-200 rounded-2xl p-6 text-center animate-fade-in">
                <p className="text-red-700 font-semibold">
                  Erro ao enviar. Tente novamente ou escreva direto para{' '}
                  <a href={brandLinks.contactMailto} className="underline">{brandLinks.contactEmail}</a>.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nome" className="block text-sm font-bold uppercase tracking-wider text-[#1a4d2e] mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-[#fef9f3] border-none rounded-xl focus:ring-2 focus:ring-[#ff6b35] transition-all text-gray-800 placeholder-gray-400"
                  placeholder="Como gostaria de ser chamado?"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold uppercase tracking-wider text-[#1a4d2e] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-[#fef9f3] border-none rounded-xl focus:ring-2 focus:ring-[#ff6b35] transition-all text-gray-800 placeholder-gray-400"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="assunto" className="block text-sm font-bold uppercase tracking-wider text-[#1a4d2e] mb-2">
                  Assunto
                </label>
                <select
                  id="assunto"
                  name="assunto"
                  value={formData.assunto}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-[#fef9f3] border-none rounded-xl focus:ring-2 focus:ring-[#ff6b35] transition-all text-gray-800 appearance-none"
                >
                  <option value="sugestao">Sugestão de Receita</option>
                  <option value="review">Sugestão de Review</option>
                  <option value="parceria">Parceria/Publicidade</option>
                  <option value="duvida">Dúvida Técnica</option>
                  <option value="outro">Outros</option>
                </select>
              </div>

              <div>
                <label htmlFor="mensagem" className="block text-sm font-bold uppercase tracking-wider text-[#1a4d2e] mb-2">
                  Sua Mensagem
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-5 py-4 bg-[#fef9f3] border-none rounded-xl focus:ring-2 focus:ring-[#ff6b35] transition-all text-gray-800 placeholder-gray-400 resize-none"
                  placeholder="Escreva todos os detalhes aqui..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'enviando'}
                className="w-full py-4 bg-[#ff6b35] text-white text-lg font-bold rounded-xl hover:bg-[#1a4d2e] transition-all hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                {status === 'enviando' ? 'Enviando Mensagem...' : 'Enviar Mensagem'}
              </button>
            </form>
          </div>

          {/* Informações Diretas (Direita) */}
          <div className="md:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-soft border border-black/5">
              <h3 className="text-xl font-bold text-[#1a4d2e] mb-6 font-heading flex items-center gap-3">
                <HeartHandshake className="text-[#ff6b35]" /> Parcerias Comerciais
              </h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                Interessado em anunciar no canal, solicitar nosso Mídia Kit ou realizar uma ação publicitária? Fale direto com a nossa equipe.
              </p>
              <a
                href={brandLinks.contactMailto}
                className="flex items-center gap-3 w-full p-4 bg-[#fef9f3] rounded-xl text-[#1a4d2e] font-bold hover:bg-[#1a4d2e] hover:text-white transition-colors group"
              >
                <Mail className="group-hover:scale-110 transition-transform" />
                {brandLinks.contactEmail}
              </a>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-soft border border-black/5">
              <h3 className="text-xl font-bold text-[#1a4d2e] mb-6 font-heading flex items-center gap-3">
                <MessageCircle className="text-[#ff6b35]" /> Redes Sociais
              </h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                A resposta mais rápida costuma vir pelos comentários do YouTube ou pelo direct do Instagram!
              </p>
              <div className="space-y-3">
                <a
                  href={brandLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-[#fef9f3] rounded-xl text-[#1a4d2e] font-bold hover:bg-[#ff0000] hover:text-white transition-colors group"
                >
                  <Video className="group-hover:scale-110 transition-transform" />
                  YouTube
                </a>
                <a
                  href={brandLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-[#fef9f3] rounded-xl text-[#1a4d2e] font-bold hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all group"
                >
                  <Camera className="group-hover:scale-110 transition-transform" />
                  Instagram
                </a>
              </div>
            </div>

            {/* Dica FAQ */}
            <Link 
              href="/faqs"
              className="block bg-gradient-to-br from-[#1a4d2e] to-[#0f1419] p-8 rounded-[2.5rem] shadow-lg text-center group hover:-translate-y-1 transition-all"
            >
              <HelpCircle className="w-10 h-10 text-[#ffd700] mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-bold text-lg mb-2">Dúvida rápida?</h3>
              <p className="text-white/70 text-sm">
                Consulte nossa página de Perguntas Frequentes. Sua dúvida pode já estar respondida por lá!
              </p>
            </Link>

          </div>
        </div>
      </section>
    </div>
  );
}
