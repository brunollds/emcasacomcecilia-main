import { brandLinks } from '@/lib/brandLinks';
import type { PageLink } from '@/lib/pageSeo';

// A /privacidade: o texto aprovado da política, seção por seção. A página desenha esta lista, e o
// test:institutional confere nela o que a política precisa dizer.

// Um pedaço de texto: texto corrido, nome técnico (cookie, armazenamento) ou link.
export type PrivacyText = string | { code: string } | { href: string; label: string };

// O item de lista pode abrir com o trecho em negrito ("Formulário de contato:").
export type PrivacyItem = { lead?: string; text: PrivacyText[] };

export type PrivacyBlock = { type: 'p'; text: PrivacyText[] } | { type: 'ul'; items: PrivacyItem[] };

export type PrivacySection = { id: string; title: string; blocks: PrivacyBlock[] };

export const PRIVACY_TRAIL: PageLink[] = [
  { name: 'Início', path: '/' },
  { name: 'Política de privacidade', path: '/privacidade' },
];

export const PRIVACY_META = {
  title: 'Política de privacidade | Em Casa com Cecília',
  description:
    'Como o Em Casa com Cecília trata os seus dados: formulário de contato, Google Analytics, Microsoft Clarity, vídeos do YouTube e links de afiliado, conforme a LGPD.',
};

export const PRIVACY_TITLE = 'Política de privacidade';

export const PRIVACY_INTRO =
  'Esta página explica quais dados o site emcasacomcecilia.com coleta, para quê e quais são os seus direitos, conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).';

export const PRIVACY_LAST_UPDATED = 'Última atualização: outubro de 2026.';

const email = { href: brandLinks.contactMailto, label: brandLinks.contactEmail };
const external = (address: string) => ({ href: `https://${address}`, label: address });
const p = (...text: PrivacyText[]): PrivacyBlock => ({ type: 'p', text });
const ul = (...items: (PrivacyItem | string)[]): PrivacyBlock => ({
  type: 'ul',
  items: items.map((item) => (typeof item === 'string' ? { text: [item] } : item)),
});
const item = (lead: string, ...text: PrivacyText[]): PrivacyItem => ({ lead, text });

export const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    id: 'responsavel',
    title: '1. Quem é o responsável',
    blocks: [
      p(
        'O site emcasacomcecilia.com é mantido pelo Em Casa com Cecília, projeto de Cecília Mauad, pessoa física, que é a controladora dos dados tratados aqui.'
      ),
      p('Para qualquer assunto desta política, escreva para ', email, '.'),
    ],
  },
  {
    id: 'o-que-o-site-nao-faz',
    title: '2. O que o site não faz',
    blocks: [
      ul(
        'O site não vende produtos e não processa pagamentos.',
        'Não há cadastro, login nem área de usuário.',
        'O site não pede cartão, senha nem documento.'
      ),
    ],
  },
  {
    id: 'dados-coletados',
    title: '3. Dados que coletamos',
    blocks: [
      ul(
        item('Formulário de contato:', 'nome, e-mail, assunto e mensagem, que você mesmo envia.'),
        item(
          'Dados de navegação (Google Analytics 4):',
          'páginas vistas, origem do acesso, tipo de aparelho e navegador, região aproximada e cliques em botões do site, como copiar um código ou abrir a página de uma loja.'
        ),
        item(
          'Gravações e mapas de calor (Microsoft Clarity):',
          'como a página é usada: rolagem, cliques e movimento do mouse, em gravações da sessão e em mapas de calor.'
        ),
        item(
          'Preferências salvas no seu navegador:',
          'algumas escolhas ficam guardadas no próprio aparelho, sem ir para nós: o modo grade ou lista e a página aberta na lista de artigos, e o número de porções escolhido numa receita.'
        )
      ),
    ],
  },
  {
    id: 'para-que-usamos',
    title: '4. Para que usamos',
    blocks: [
      ul(
        'Responder às mensagens do formulário.',
        'Entender quais conteúdos e códigos são úteis e melhorar o site.',
        'Encontrar erros de uso, como um botão que ninguém acha ou uma página que não carrega direito.',
        'Manter o site funcionando e seguro.'
      ),
    ],
  },
  {
    id: 'base-legal',
    title: '5. Base legal (LGPD)',
    blocks: [
      ul(
        item(
          'Formulário de contato:',
          'procedimentos a pedido do titular e legítimo interesse em responder a quem nos escreve (art. 7º, V e IX).'
        ),
        item(
          'Google Analytics e Microsoft Clarity:',
          'consentimento (art. 7º, I). As duas ferramentas só carregam depois que você aceita no aviso de cookies, e você pode mudar a escolha a qualquer momento pelo link "Preferências de cookies" no rodapé.'
        ),
        item('Preferências no navegador:', 'necessárias ao funcionamento da função que você usa.')
      ),
    ],
  },
  {
    id: 'cookies',
    title: '6. Cookies e ferramentas de medição',
    blocks: [
      ul(
        item(
          'Google Analytics 4:',
          'usa cookies próprios (como ',
          { code: '_ga' },
          ') para contar visitas e distinguir um navegador de outro.'
        ),
        item(
          'Microsoft Clarity:',
          'usa cookies (como ',
          { code: '_clck' },
          ' e ',
          { code: '_clsk' },
          ') para ligar as páginas de uma mesma visita e grava a sessão de forma anônima. Por padrão, o Clarity mascara o texto digitado em campos de formulário.'
        ),
        'As duas ferramentas só são carregadas com o seu consentimento e no endereço oficial, emcasacomcecilia.com (com ou sem www). Em versões de teste e no computador de quem desenvolve o site, elas não rodam.',
        {
          text: [
            'As preferências citadas na seção 3 ficam no armazenamento local do navegador (',
            { code: 'localStorage' },
            ' e ',
            { code: 'sessionStorage' },
            '), não em cookies.',
          ],
        },
        'Sua escolha no aviso de cookies fica guardada no navegador. Você também pode apagar ou bloquear cookies nas configurações do navegador. O site continua funcionando sem eles.'
      ),
    ],
  },
  {
    id: 'links-de-afiliado',
    title: '7. Links de afiliado e lojas parceiras',
    blocks: [
      ul(
        'Muitos links do site levam a lojas parceiras e são links de afiliado: quando você compra por eles, a loja pode pagar uma comissão ao Em Casa com Cecília, sem custo extra para você.',
        {
          text: [
            'Esses links podem levar parâmetros que identificam a origem da visita (como o código de afiliado ou parâmetros ',
            { code: 'utm' },
            '). Ao abrir a loja, valem os cookies e a política de privacidade da própria loja.',
          ],
        },
        'A compra, o pagamento e a entrega são feitos pela loja. Os dados que você informa lá não passam pelo nosso site.',
        'Alguns endereços do site redirecionam para lojas parceiras (por exemplo, damie.emcasacomcecilia.com).'
      ),
    ],
  },
  {
    id: 'servicos-de-terceiros',
    title: '8. Serviços de terceiros',
    blocks: [
      ul(
        item('Google Analytics', '(medição de audiência) — ', external('policies.google.com/privacy')),
        item('Microsoft Clarity', '(gravações de sessão e mapas de calor) — ', external('privacy.microsoft.com')),
        item(
          'YouTube',
          '(vídeos incorporados nas páginas): o vídeo é carregado do YouTube, que pode usar cookies e registrar a visualização conforme a política do Google. — ',
          external('policies.google.com/privacy')
        ),
        item(
          'Resend',
          '(envio das mensagens do formulário para o nosso e-mail) — ',
          external('resend.com/legal/privacy-policy')
        ),
        item(
          'Hostinger',
          '(hospedagem do site): o servidor pode registrar dados técnicos de acesso, como IP e navegador, em logs. — ',
          external('hostinger.com.br/politica-de-privacidade')
        ),
        'As imagens e os vídeos saem de cdn.emcasacomcecilia.com, também hospedado na Hostinger.',
        item(
          'WhatsApp',
          '(grupo de promoções, opcional): ao entrar, seu número fica visível para quem administra o grupo e conforme as regras do WhatsApp.'
        )
      ),
      p('As fontes do site são servidas pelo próprio site, sem chamada ao Google Fonts.'),
    ],
  },
  {
    id: 'compartilhamento',
    title: '9. Compartilhamento e transferência internacional',
    blocks: [
      ul(
        'Não vendemos nem alugamos dados pessoais.',
        'Os dados do formulário chegam só ao e-mail do Em Casa com Cecília, por meio do Resend.',
        'Google, Microsoft, Resend e outros fornecedores citados podem tratar dados em servidores fora do Brasil. Nesses casos, a transferência segue as garantias previstas na LGPD (art. 33) e nos termos desses fornecedores.'
      ),
    ],
  },
  {
    id: 'por-quanto-tempo',
    title: '10. Por quanto tempo guardamos',
    blocks: [
      ul(
        item(
          'Mensagens do formulário:',
          'pelo tempo necessário para responder e, quando houver, pelo prazo exigido em lei.'
        ),
        item('Google Analytics:', '2 meses, a retenção configurada no painel.'),
        item('Microsoft Clarity:', 'pelos prazos da Microsoft para gravações e mapas de calor.')
      ),
    ],
  },
  {
    id: 'seus-direitos',
    title: '11. Seus direitos',
    blocks: [
      p('Pela LGPD, você pode:'),
      ul(
        'confirmar se tratamos dados seus e acessá-los;',
        'corrigir dados incompletos ou errados;',
        'pedir a anonimização, o bloqueio ou a eliminação de dados desnecessários;',
        'pedir a eliminação dos dados tratados com o seu consentimento;',
        'saber com quem compartilhamos seus dados;',
        'se opor a um tratamento feito com base no legítimo interesse;',
        'reclamar à Autoridade Nacional de Proteção de Dados (ANPD).'
      ),
      p(
        'Para exercer qualquer um deles, escreva para ',
        email,
        '. Respondemos em até 15 dias, o prazo da LGPD (art. 19).'
      ),
    ],
  },
  {
    id: 'criancas',
    title: '12. Crianças',
    blocks: [
      p('O site não é direcionado a crianças e não coleta de propósito dados de crianças e adolescentes.'),
    ],
  },
  {
    id: 'mudancas',
    title: '13. Mudanças nesta política',
    blocks: [p('Esta política pode mudar quando o site mudar. A data abaixo mostra a última revisão.')],
  },
];

// O texto corrido de uma seção, para o teste procurar frases sem se importar com a marcação.
export function privacyPlainText(blocks: readonly PrivacyBlock[]): string {
  const join = (text: readonly PrivacyText[]) =>
    text.map((piece) => (typeof piece === 'string' ? piece : 'code' in piece ? piece.code : piece.label)).join('');
  return blocks
    .map((block) =>
      block.type === 'p'
        ? join(block.text)
        : block.items.map((entry) => [entry.lead, join(entry.text)].filter(Boolean).join(' ')).join(' ')
    )
    .join(' ');
}
