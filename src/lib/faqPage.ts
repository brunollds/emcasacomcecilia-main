import { brandLinks } from '@/lib/brandLinks';
import { CECILIA_SINCE } from '@/lib/ceciliaCredentials';
import { absoluteUrl, type PageLink } from '@/lib/pageSeo';

// O /faqs: as perguntas por categoria, com o link opcional de cada resposta. A página e o FAQPage do
// JSON-LD leem esta lista, então o schema traz as mesmas perguntas e as mesmas respostas da página.

export type FaqLink = { href: string; label: string; external?: boolean };

export type FaqQuestion = { pergunta: string; resposta: string; link?: FaqLink };

export type FaqCategory = { id: string; categoria: string; perguntas: FaqQuestion[] };

export const FAQ_TRAIL: PageLink[] = [
  { name: 'Início', path: '/' },
  { name: 'Perguntas frequentes', path: '/faqs' },
];

export const FAQ_META = {
  title: 'Perguntas frequentes | Em Casa com Cecília',
  description:
    'Respostas sobre o Em Casa com Cecília: como usar os cupons e códigos, links de afiliado e parcerias, guias e análises, receitas, vídeos e contato.',
};

const email = brandLinks.contactEmail;

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: 'em-casa-com-cecilia',
    categoria: 'Em Casa com Cecília',
    perguntas: [
      {
        pergunta: 'O que é o Em Casa com Cecília?',
        resposta:
          'Um site com guias e análises de produtos, os códigos das lojas parceiras, vídeos e receitas, feito pela Cecília. O que ela mostra nas redes também vem para cá, organizado.',
        link: { href: '/sobre', label: 'Saber mais sobre o projeto' },
      },
      {
        pergunta: 'Quem é a Cecília?',
        resposta: `A Cecília é jornalista, mineira, casada e mãe de dois filhos. Cria conteúdo sobre casa, produtos e receitas desde ${CECILIA_SINCE}.`,
        link: { href: '/sobre', label: 'Conhecer a Cecília' },
      },
      {
        pergunta: 'O site existe em outros idiomas?',
        resposta:
          'Sim. Parte dos guias e as páginas da YesStyle e da SHEIN têm versão em inglês, espanhol, francês, alemão, italiano, coreano, japonês e chinês (tradicional e simplificado). Use o seletor de idioma no topo da página.',
      },
    ],
  },
  {
    id: 'cupons-e-codigos',
    categoria: 'Cupons e códigos',
    perguntas: [
      {
        pergunta: 'Os cupons são testados?',
        resposta:
          'Sim. Aplicamos cada código no checkout da loja antes de publicar, e a página mostra o resultado e a data ("Cupom testado em"). Quando a loja só tem link ou campanha, a página mostra "Conferido em".',
        link: { href: '/cupons', label: 'Ver os cupons' },
      },
      {
        pergunta: 'O cupom não funcionou. O que eu faço?',
        resposta:
          'Confira as regras da página da loja: alguns códigos têm valor mínimo, não somam com outro cupom ou não valem em certos produtos. Se ainda assim não funcionar, avise a gente pelo formulário com a loja, o código e um print do carrinho.',
        link: { href: '/contato', label: 'Avisar que o cupom não funcionou' },
      },
      {
        pergunta: 'O CECILIA010 da YesStyle é um cupom?',
        resposta:
          'Não. É um código de recompensa, que vai no campo Reward Code do checkout. Por isso ele soma com os cupons da própria YesStyle, que vão em outro campo.',
        link: { href: '/cupons/yesstyle', label: 'Como usar o CECILIA010' },
      },
      {
        pergunta: 'O 4CW5Y da SHEIN é um cupom?',
        resposta:
          'Não. É um código de indicação da SHEIN Brasil: você pesquisa o 4CW5Y no aplicativo da SHEIN, não cola no checkout. As condições aparecem na sua conta.',
        link: { href: '/cupons/shein', label: 'Ver como usar na SHEIN' },
      },
      {
        pergunta: 'Posso usar o cupom mais de uma vez?',
        resposta:
          'Depende da loja. A página de cada uma diz, em "Regras sem letra miúda", se o código vale mais de uma vez, se soma com outras promoções e como fica o frete.',
        link: { href: '/cupons', label: 'Ver as regras de cada loja' },
      },
      {
        pergunta: 'Como fico sabendo de cupom novo?',
        resposta:
          'Pelo grupo de promoções no WhatsApp, onde a Cecília manda os códigos e avisos rápidos, e pela página /cupons.',
        link: { href: brandLinks.whatsappGroup, label: 'Entrar no grupo', external: true },
      },
    ],
  },
  {
    id: 'links-de-afiliado-e-parcerias',
    categoria: 'Links de afiliado e parcerias',
    perguntas: [
      {
        pergunta: 'O site ganha dinheiro quando eu compro pelo link?',
        resposta:
          'Pode ganhar. Quando você compra pelo link ou com o código da Cecília, a loja pode pagar uma comissão ao Em Casa com Cecília. Você paga o mesmo preço.',
      },
      {
        pergunta: 'Eu compro no site de vocês?',
        resposta:
          'Não. O Em Casa com Cecília não vende nada: a compra e o pagamento são feitos no site da própria loja. Nunca pedimos cartão, senha ou cadastro.',
      },
      {
        pergunta: 'Como sei se um artigo é parceria?',
        resposta:
          'Os artigos com relação comercial trazem uma nota editorial que diz se o produto foi enviado pela marca e se o site recebe comissão. Os links para as lojas parceiras são marcados como patrocinados no código da página.',
      },
      {
        pergunta: 'A parceria muda o que a Cecília diz do produto?',
        resposta:
          'Não. Não aceitamos pagamento por análise positiva, e o artigo separa o que é experiência própria do que vem de fontes públicas.',
      },
      {
        pergunta: 'Sou de uma marca. Como proponho uma parceria?',
        resposta: `Veja o mídia kit e escreva para ${email} ou pelo formulário, com o assunto "Parceria ou publicidade".`,
        link: { href: '/contato', label: 'Propor uma parceria' },
      },
      {
        pergunta: 'Posso enviar um produto para análise?',
        resposta: 'Fale com a gente antes de enviar, para combinarmos. Produto recebido não garante análise positiva.',
        link: { href: '/contato', label: 'Entrar em contato' },
      },
    ],
  },
  {
    id: 'guias-e-analises',
    categoria: 'Guias & Análises',
    perguntas: [
      {
        pergunta: 'Qual a diferença entre guia e análise de produto?',
        resposta:
          'Na análise, a Cecília usou o produto e conta como foi, com fotos ou vídeo. O guia explica como escolher ou usar um produto a partir da página oficial, do manual e de outras fontes públicas.',
        link: { href: '/reviews', label: 'Ver os guias e análises' },
      },
      {
        pergunta: 'Que tipo de produto vocês analisam?',
        resposta:
          'Coisas da casa e do dia a dia: móveis, eletrodomésticos, café, alimentos, suplementos, beleza e moda. Produtos de várias faixas de preço.',
      },
      {
        pergunta: 'Posso sugerir um produto para análise?',
        resposta: 'Pode. Mande a sugestão pelo formulário ou pelas redes.',
        link: { href: '/contato', label: 'Sugerir um produto' },
      },
      {
        pergunta: 'Os preços dos artigos estão atualizados?',
        resposta:
          'Valem na data indicada no artigo. Preço, estoque e campanha mudam, então confira o valor final na loja antes de pagar.',
      },
    ],
  },
  {
    id: 'receitas',
    categoria: 'Receitas',
    perguntas: [
      {
        pergunta: 'Onde encontro as receitas?',
        resposta: 'Em /receitas, por categoria, e nos vídeos da Cecília no YouTube e no Instagram.',
        link: { href: '/receitas', label: 'Ver as receitas' },
      },
      {
        pergunta: 'As receitas servem para quem está começando?',
        resposta: 'Sim. São receitas de casa, com ingredientes fáceis de achar e passo a passo.',
      },
      {
        pergunta: 'Posso adaptar as receitas?',
        resposta: 'Pode. Troque ingredientes conforme o que tem em casa, sabendo que o resultado pode mudar.',
      },
      {
        pergunta: 'Posso sugerir uma receita?',
        resposta: 'Pode. Mande pelo formulário de contato ou pelas redes.',
        link: { href: '/contato', label: 'Sugerir uma receita' },
      },
    ],
  },
  {
    id: 'videos-e-contato',
    categoria: 'Vídeos e contato',
    perguntas: [
      {
        pergunta: 'Os vídeos são gravados em estúdio?',
        resposta: 'Não. São gravados na casa da Cecília, com os produtos em uso real.',
      },
      {
        pergunta: 'Não consigo assistir a um vídeo no site. O que faço?',
        resposta:
          'Os vídeos do YouTube abrem dentro da página, então confira a conexão e tente outro navegador. Se continuar, avise pelo formulário com o endereço da página.',
        link: { href: '/contato', label: 'Avisar o problema' },
      },
      {
        pergunta: 'Qual o jeito mais rápido de falar com vocês?',
        resposta: `O direct do Instagram. Para assuntos comerciais, o e-mail ${email}.`,
        link: { href: '/contato', label: 'Ir para o contato' },
      },
    ],
  },
];

export function getFaqPageJsonLd(categories: readonly FaqCategory[] = FAQ_CATEGORIES) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: absoluteUrl('/faqs'),
    mainEntity: categories.flatMap((category) =>
      category.perguntas.map((item) => ({
        '@type': 'Question',
        name: item.pergunta,
        acceptedAnswer: { '@type': 'Answer', text: item.resposta },
      }))
    ),
  };
}
