import Link from 'next/link';

export const metadata = {
  title: 'Política de Privacidade - Em Casa com Cecília',
  description: 'Política de privacidade e proteção de dados do site Em Casa com Cecília, em conformidade com a LGPD.',
  alternates: {
    canonical: '/privacidade',
  },
  openGraph: {
    title: 'Política de Privacidade - Em Casa com Cecília',
    description: 'Política de privacidade e proteção de dados do site Em Casa com Cecília.',
    url: '/privacidade',
    type: 'website',
  },
};

const sections = [
  {
    title: '1. Quem somos',
    content: `O site emcasacomcecilia.com é operado por Cecília Mauad, responsável pelo projeto "Em Casa com Cecília". Para dúvidas sobre esta política ou sobre o tratamento dos seus dados, entre em contato pelo e-mail contato@emcasacomcecilia.com.`,
  },
  {
    title: '2. Dados coletados',
    content: `Coletamos apenas os dados estritamente necessários para o funcionamento do site:

• Formulário de contato: nome, e-mail e mensagem fornecidos voluntariamente por você.
• Dados de navegação: endereço IP, tipo de navegador, páginas acessadas, tempo de permanência e origem do acesso, coletados de forma agregada e anonimizada pela ferramenta Google Analytics.
• Cookies: utilizados para análise de audiência e funcionamento técnico do site (veja a seção 5).`,
  },
  {
    title: '3. Finalidade do tratamento',
    content: `Os dados são utilizados exclusivamente para:

• Responder mensagens enviadas pelo formulário de contato.
• Analisar o desempenho e o uso do site para melhorar o conteúdo editorial.
• Garantir o funcionamento técnico e a segurança das páginas.`,
  },
  {
    title: '4. Base legal (LGPD)',
    content: `O tratamento dos seus dados segue as bases legais previstas na Lei Geral de Proteção de Dados (Lei nº 13.709/2018):

• Consentimento: para cookies de analytics, quando aplicável.
• Execução de contrato ou procedimentos preliminares: para resposta ao formulário de contato.
• Legítimo interesse: para análise de audiência de forma anonimizada, visando a melhoria do conteúdo.`,
  },
  {
    title: '5. Cookies',
    content: `Utilizamos cookies de sessão e de análise. Os cookies de analytics (Google Analytics) são usados para entender como os visitantes interagem com o site — nenhum dado pessoal identificável é compartilhado. Você pode desativar cookies no seu navegador a qualquer momento, embora isso possa afetar algumas funcionalidades.`,
  },
  {
    title: '6. Serviços de terceiros',
    content: `Este site utiliza serviços externos que possuem suas próprias políticas de privacidade:

• Google Analytics (análise de audiência) — policies.google.com/privacy
• YouTube (vídeos incorporados) — policies.google.com/privacy
• Resend (envio de e-mails do formulário de contato) — resend.com/privacy`,
  },
  {
    title: '7. Compartilhamento de dados',
    content: `Não vendemos, alugamos nem compartilhamos seus dados pessoais com terceiros para fins comerciais. Os dados do formulário de contato são recebidos exclusivamente pela equipe do Em Casa com Cecília.`,
  },
  {
    title: '8. Prazo de retenção',
    content: `As mensagens enviadas pelo formulário são retidas pelo tempo necessário para resposta e, quando aplicável, pelo prazo exigido por obrigações legais. Dados de analytics são retidos conforme as configurações do Google Analytics (padrão: 14 meses).`,
  },
  {
    title: '9. Seus direitos (LGPD)',
    content: `De acordo com a LGPD, você tem direito a:

• Confirmar a existência de tratamento dos seus dados.
• Acessar os dados que temos sobre você.
• Corrigir dados incompletos, inexatos ou desatualizados.
• Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários.
• Revogar o consentimento a qualquer momento.

Para exercer qualquer desses direitos, envie uma solicitação para contato@emcasacomcecilia.com.`,
  },
  {
    title: '10. Alterações nesta política',
    content: `Esta política pode ser atualizada periodicamente. A data da última revisão está indicada ao final desta página. Recomendamos revisitá-la com regularidade.`,
  },
];

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen bg-[#fef9f3]">
      <section className="bg-[#0f1d3a] px-6 py-20 text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-heading text-4xl font-bold md:text-5xl">
            Política de Privacidade
          </h1>
          <p className="mt-4 max-w-2xl text-white/70">
            Em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl space-y-8 rounded-[2rem] border border-black/8 bg-white p-8 shadow-sm md:p-12">
          {sections.map((section) => (
            <div key={section.title} className="space-y-3 border-t border-black/6 pt-8 first:border-t-0 first:pt-0">
              <h2 className="font-heading text-xl font-bold text-[#0f1419]">
                {section.title}
              </h2>
              <p className="whitespace-pre-line leading-7 text-gray-700">
                {section.content}
              </p>
            </div>
          ))}

          <div className="border-t border-black/8 pt-8">
            <p className="text-sm text-gray-500">
              Última atualização: abril de 2026.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Dúvidas?{' '}
              <Link href="/contato" className="text-[#ff6b35] hover:underline">
                Entre em contato
              </Link>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
