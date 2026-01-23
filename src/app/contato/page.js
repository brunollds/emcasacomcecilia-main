'use client';

import { useState } from 'react';

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

    // Simulação de envio - você pode conectar a um backend depois
    setTimeout(() => {
      setStatus('sucesso');
      setFormData({ nome: '', email: '', assunto: 'sugestao', mensagem: '' });

      setTimeout(() => {
        setStatus('');
      }, 5000);
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1a4d2e] to-[#0f1419] px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-extrabold text-[#ffd700] mb-4">
            Entre em Contato
          </h1>
          <p className="text-xl text-white/90">
            Tem uma sugestão de receita? Quer fazer uma parceria? Ou só quer dizer oi?
            Adoraria ouvir você!
          </p>
        </div>
      </section>

      {/* Formulário */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-3xl">
          {/* Status Messages */}
          {status === 'sucesso' && (
            <div className="mb-8 bg-green-50 border-2 border-green-500 rounded-2xl p-6 text-center">
              <div className="text-5xl mb-3">✓</div>
              <h3 className="text-2xl font-bold text-green-700 mb-2">
                Mensagem Enviada com Sucesso!
              </h3>
              <p className="text-green-600">
                Obrigada pelo contato! Vou responder em breve.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome */}
            <div>
              <label htmlFor="nome" className="block text-lg font-semibold text-[#1a4d2e] mb-2">
                Nome *
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#ff6b35] focus:outline-none transition-colors"
                placeholder="Seu nome completo"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-lg font-semibold text-[#1a4d2e] mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#ff6b35] focus:outline-none transition-colors"
                placeholder="seu@email.com"
              />
            </div>

            {/* Assunto */}
            <div>
              <label htmlFor="assunto" className="block text-lg font-semibold text-[#1a4d2e] mb-2">
                Assunto *
              </label>
              <select
                id="assunto"
                name="assunto"
                value={formData.assunto}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#ff6b35] focus:outline-none transition-colors"
              >
                <option value="sugestao">Sugestão de Receita</option>
                <option value="review">Sugestão de Review</option>
                <option value="parceria">Parceria/Publicidade</option>
                <option value="duvida">Dúvida sobre Receita</option>
                <option value="elogio">Elogio</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            {/* Mensagem */}
            <div>
              <label htmlFor="mensagem" className="block text-lg font-semibold text-[#1a4d2e] mb-2">
                Mensagem *
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#ff6b35] focus:outline-none transition-colors resize-none"
                placeholder="Escreva sua mensagem aqui..."
              />
            </div>

            {/* Botão */}
            <button
              type="submit"
              disabled={status === 'enviando'}
              className="w-full py-4 bg-[#ff6b35] text-white text-lg font-bold rounded-lg hover:bg-[#1a4d2e] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'enviando' ? 'Enviando...' : 'Enviar Mensagem'}
            </button>
          </form>
        </div>
      </section>

      {/* Outras Formas de Contato */}
      <section className="py-16 px-6 bg-[#f5f5f5]">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#1a4d2e] mb-8 text-center">
            Outras Formas de Contato
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* YouTube */}
            <a
              href="https://youtube.com/@emcasacomcecilia"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all group"
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                📺
              </div>
              <h3 className="text-xl font-bold text-[#1a4d2e] mb-2">
                YouTube
              </h3>
              <p className="text-gray-600 text-sm">
                Deixe um comentário nos vídeos!
              </p>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/emcasacomcecilia"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all group"
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                📷
              </div>
              <h3 className="text-xl font-bold text-[#1a4d2e] mb-2">
                Instagram
              </h3>
              <p className="text-gray-600 text-sm">
                Me siga para ver os bastidores!
              </p>
            </a>

            {/* Email */}
            <a
              href="mailto:contato@emcasacomcecilia.com"
              className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all group"
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                ✉️
              </div>
              <h3 className="text-xl font-bold text-[#1a4d2e] mb-2">
                Email
              </h3>
              <p className="text-gray-600 text-sm break-all">
                contato@emcasacomcecilia.com
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Rápido */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#1a4d2e] mb-8 text-center">
            Perguntas Frequentes
          </h2>

          <div className="space-y-4">
            <div className="bg-[#f5f5f5] rounded-2xl p-6">
              <h3 className="text-lg font-bold text-[#1a4d2e] mb-2">
                Quanto tempo demora para responder?
              </h3>
              <p className="text-gray-600">
                Geralmente respondo em até 48 horas úteis. Se for urgente, tente me
                chamar no Instagram!
              </p>
            </div>

            <div className="bg-[#f5f5f5] rounded-2xl p-6">
              <h3 className="text-lg font-bold text-[#1a4d2e] mb-2">
                Aceita parcerias?
              </h3>
              <p className="text-gray-600">
                Sim! Mas apenas com marcas que uso e confio. Envie sua proposta
                detalhada por email.
              </p>
            </div>

            <div className="bg-[#f5f5f5] rounded-2xl p-6">
              <h3 className="text-lg font-bold text-[#1a4d2e] mb-2">
                Como posso sugerir uma receita?
              </h3>
              <p className="text-gray-600">
                Use o formulário acima ou deixe um comentário nos vídeos do YouTube.
                Adoro receber sugestões!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
