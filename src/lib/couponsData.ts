import { brandLinks } from './brandLinks';
import { getPrimaryRewardCode, getLatestYesStyleVerifiedAtISO } from './yesstyleCoupons';

export interface CouponFAQ {
  question: string;
  answer: string;
  // Link de afiliado da marca no Mercado Livre, como veio do Bruno. Sai como sponsored e o clique é medido.
  mercadoLivreUrl?: string;
  // Link para uma página nossa (não é afiliado nem sponsored).
  link?: { href: string; label: string };
}

export interface CouponHistory {
  date: string;
  code: string;
  discount: string;
  note?: string;
}

// Código que não é cupom comum: o de recompensa (CECILIA010) vai num campo próprio do checkout e o
// de indicação (4CW5Y da SHEIN) é pesquisado no aplicativo da loja.
export type CouponCodeKind = 'reward' | 'referral';

export interface CouponReferral {
  code: string;
  label: string;
  instructions: string;
  verifiedAt: string;
}

// Prateleiras do hub /cupons, na ordem em que aparecem na página.
export const COUPON_HUB_CATEGORIES = [
  { id: 'moda', label: 'Moda' },
  { id: 'beleza', label: 'Beleza' },
  { id: 'alimentacao', label: 'Alimentação' },
  { id: 'saude', label: 'Saúde e suplementos' },
  { id: 'casa', label: 'Casa' },
  { id: 'diversos', label: 'Diversos' },
] as const;

export type CouponHubCategory = (typeof COUPON_HUB_CATEGORIES)[number]['id'];

// A marca da loja na bolinha (a vitrine da home e as bolinhas de /reviews): o símbolo num PNG ou WebP de 512 × 512 com
// fundo transparente, centralizado e com a margem óptica no próprio arquivo (regra no docs/GUIA-MIDIA-EDITORIAL.md).
// `background` (#rrggbb) só quando o fundo é parte da marca; sem ele, o disco é creme.
export type CouponBubble = { src: string; background?: string };

interface CouponBase {
  slug: string;
  brand: string;
  officialUrl: string;
  offerUrl: string;
  brandIcon: string;
  brandLogo?: string;
  brandLogoAlt?: string;
  // Sem ele, a bolinha mostra o brandLogo.
  bubble?: CouponBubble;
  // Silhueta do logo com fundo transparente, usada como marca-d'água nos cards de cupom.
  brandWatermark?: string;
  socialImage?: string;
  socialImageAlt?: string;
  brandColor: string;
  discount: string;
  offerTypeLabel?: string;
  offerTypeLabelPlural?: string;
  offerActionLabel?: string;
  category: string;
  // Prateleira do hub /cupons; ordem e rótulo vêm de COUPON_HUB_CATEGORIES.
  hubCategory: CouponHubCategory;
  shortDescription: string;
  longDescription: string;
  metaTitle: string;
  // O mês da oferta vai no fim do título pelo calendário (getCouponMetaTitle, de offerMonth.ts), só em PT.
  metaTitleMonth?: boolean;
  metaDescription: string;
  eligibleCategories: string;
  validity: string;
  reusable: string;
  shipping: string;
  combinable: string;
  lastVerified: string;
  aboutBrand: string;
  faqs: CouponFAQ[];
  status: 'ativo' | 'pausado' | 'expirado';
  // Entra em "Destaques" no topo do hub, na ordem deste array; o primeiro ganha o card maior.
  featured: boolean;
  // Frase de vitrine que só o card maior dos Destaques mostra.
  featuredPitch?: string;
  relatedContent?: {
    title: string;
    url: string;
    type: 'review' | 'post';
    publishedAt: string;
  }[];
  // "Vídeos" (#videos), antes das perguntas, só em português e só quando a loja tem vídeo de verdade. Cada item
  // abre na rede em que foi publicado; o endereço tem de ser https e do domínio da rede (STORE_VIDEO_HOSTS).
  videos?: StoreVideo[];
  // Print do código no carrinho, no fim de "Como usar", só em português. Só entra print que mostra o código e o
  // percentual de hoje; trocou a oferta, troca ou tira o print.
  cartPrint?: CartPrint;
  monthlyHighlight?: {
    scope: string;
    note: string;
    showCheckoutReminder?: boolean;
  };
  affiliateAccountId?: string;
  referral?: CouponReferral;
}

export type CouponCodeOffer = CouponBase & {
  offerMode: 'discount-code';
  code: string;
  discountNumber: number;
  // O último teste no carrinho: o dia (AAAA-MM-DD) e o que a equipe viu. Vão juntos e só mudam com teste
  // real, quando a oferta, o percentual ou a elegibilidade mudam ou alguém avisa que o código falhou; o
  // test:coupon-offer-modes avisa depois de 45 dias (a rodada de testes é mensal, a partir do dia 1). A página ganha a seção "Como testamos o cupom". O
  // lastVerified é outra data: a última conferência das condições, que pode ser na página da loja, no painel
  // ou num aviso da marca, sem checkout.
  testedAt?: string;
  testNote?: string;
  // O código vai num campo próprio do checkout e não é cupom (o CECILIA010 da YesStyle).
  codeKind?: 'reward';
  codeFieldLabel?: string;
  codeInstructions?: string[];
  history?: CouponHistory[];
  // Códigos da parceria que valem só num prazo (o CECIEMCASA15 da I Wanna Sleep), ao lado do código de sempre,
  // que segue valendo. A página da loja mostra cada um só dentro do prazo, e o navegador o esconde quando vence.
  limitedCodes?: LimitedCode[];
  // "O que acumula com o cupom": uma linha por benefício, só com fato já conferido (o da própria página ou do teste).
  // Linha sem fato não entra; loja sem linha nenhuma não mostra a seção. Reconferir na rodada mensal.
  stacking?: StackingRow[];
  // "Vantagens além do cupom" (#vantagens), só em português: o que a loja publica sobre pagamento e nenhum outro campo
  // diz (parcelamento). Frases curtas, sem ponto final. A página junta a elas o Pix, o frete grátis e a retirada do
  // `stacking`; sem este campo, a seção não aparece.
  paymentPerks?: string[];
  tiers?: {
    code: string;
    discount: string;
    minPurchase: string;
  }[];
};

// 'depende' cobre o que tem condição (o mínimo do frete grátis, o cashback que conta depois do desconto).
// Descontos em sequência nunca são somados na condição (15% e 2% dão 16,7%), e a linha de outro cupom diz só a regra.
export type StackingBenefit = 'promocoes' | 'retirada' | 'pix' | 'cashback' | 'outro-cupom' | 'frete';
// `label` troca o nome do benefício quando a loja tem um nome próprio para ele (o giftback da DAMIE).
export type StackingRow = { benefit: StackingBenefit; stacks: 'sim' | 'nao' | 'depende'; condition: string; label?: string };

// O print do código aplicado no carrinho. Pode ser o mesmo de um artigo "como usar o cupom" da loja (`article` é o
// slug dele, e a página ganha o link do passo a passo) ou um print próprio da página, sem `article`.
// É demonstração visual: não diz a data do teste nem promete os valores da imagem. `aspectRatio` é largura / altura.
export type CartPrint = { article?: string; src: string; alt: string; aspectRatio: number };

export type StoreVideoPlatform = 'youtube' | 'instagram' | 'tiktok' | 'facebook';
export type StoreVideo = { platform: StoreVideoPlatform; url: string; title: string };
export const STORE_VIDEO_HOSTS: Record<StoreVideoPlatform, string[]> = {
  youtube: ['youtube.com', 'youtu.be'],
  instagram: ['instagram.com'],
  tiktok: ['tiktok.com'],
  facebook: ['facebook.com', 'fb.watch'],
};

export type LimitedCode = {
  code: string;
  discount: string;
  // Com -03:00, como as campanhas: o fim é o último minuto do dia que a loja anuncia.
  startsAt: string;
  endsAt: string;
  // Dia do teste no carrinho (AAAA-MM-DD) e o que ele mostrou.
  testedAt: string;
  testNote: string;
};

// Os códigos com prazo que ainda não venceram, com o que o HTML do build mostra: o que já começou. O que começa
// ou vence até o próximo deploy aparece ou some no navegador (CampaignWindow).
export function getPendingLimitedCodes(coupon: Coupon, now = Date.now()) {
  if (coupon.offerMode !== 'discount-code') return [];
  return (coupon.limitedCodes ?? [])
    .filter((item) => Date.parse(item.endsAt) >= now)
    .map((item) => ({ ...item, inHtml: Date.parse(item.startsAt) <= now }));
}

// "8 de novembro", no fuso de Brasília: o fim do prazo e o dia do teste nos avisos da página da loja e da home.
export function formatBrasiliaDay(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', timeZone: 'America/Sao_Paulo' });
}

export type AffiliateLinkOffer = CouponBase & {
  offerMode: 'affiliate-link';
  linkInstructions?: string[];
  // Aviso no fim de "Como acessar a oferta"; sem ele a página usa o aviso padrão de link.
  linkNote?: string;
};

export type Coupon = CouponCodeOffer | AffiliateLinkOffer;

// Quem busca "cupom <loja> mercado livre" não acha o nosso código lá. Logo depois da pergunta do Mercado Livre, toda
// loja com o link do Mercado Livre ganha esta: o melhor costuma ser o site oficial com o código, e quem quiser mesmo
// comprar no Mercado Livre vê os cupons do próprio Mercado Livre no Dicas & Ofertas.
export const MERCADO_LIVRE_COUPONS_URL = `${brandLinks.dicas}/cupons/mercado-livre/`;

function withMercadoLivreCouponsFaq(coupon: Coupon): Coupon {
  const index = coupon.faqs.findIndex((faq) => faq.mercadoLivreUrl);
  if (index === -1) return coupon;
  const ours = coupon.offerMode === 'discount-code' ? `o ${coupon.code}` : 'o nosso link';
  const faq: CouponFAQ = {
    question: `Tem cupom da ${coupon.brand} para usar no Mercado Livre?`,
    answer: `Não temos cupom da ${coupon.brand} para o Mercado Livre: ${ours} vale na loja oficial, e é lá, com ele, que costumam estar as melhores condições. Se ainda assim preferir comprar pelo Mercado Livre, veja os cupons do próprio Mercado Livre que reunimos no Dicas & Ofertas. Eles mudam com frequência, e o checkout do Mercado Livre mostra se ainda valem.`,
    link: { href: MERCADO_LIVRE_COUPONS_URL, label: 'Ver cupons do Mercado Livre' },
  };
  return { ...coupon, faqs: [...coupon.faqs.slice(0, index + 1), faq, ...coupon.faqs.slice(index + 1)] };
}

const STORE_COUPONS: Coupon[] = [
  {
    offerMode: 'discount-code',
    slug: 'damie',
    cartPrint: { article: 'cupom-cecilia12-como-usar', src: '/images/reviews/cupom-cecilia12/4-confirme-desconto.png', alt: 'Resumo do pedido da Damie com desconto aplicado.', aspectRatio: 0.452 },
    brand: 'DAMIE',
    officialUrl: 'https://damie.com.br',
    offerUrl: 'https://damie.com.br',
    brandIcon: 'D',
    brandLogo: '/images/about/partners/damie.jpg',
    brandLogoAlt: 'Marca DAMIE',
    bubble: { src: '/images/logos/bolinhas/damie.png', background: '#142432' },
    brandWatermark: '/images/logos/watermarks/damie.webp',
    socialImage: '/images/reviews/poltronas-reclinaveis-damie.webp',
    socialImageAlt: 'Poltronas reclináveis DAMIE',
    brandColor: '#C24B1F',
    code: 'CECILIA12',
    discount: '12% OFF',
    discountNumber: 12,
    category: 'Móveis e decoração',
    hubCategory: 'casa',
    shortDescription: 'todos os produtos, com todas as formas de pagamento',
    longDescription:
      'O cupom DAMIE CECILIA12 dá 12% OFF em todos os produtos do site, para quem compra pela primeira vez e para quem já é cliente, e soma com os 10% do Pix e com as promoções do site; não soma com outro cupom. Testado no carrinho.',
    metaTitle: 'Cupom DAMIE: 12% OFF com CECILIA12, soma com Pix',
    metaTitleMonth: true,
    metaDescription:
      'Cupom DAMIE: CECILIA12 dá 12% OFF em todos os produtos para cliente novo ou antigo, soma com os 10% do Pix e com as promoções; não soma com outro cupom.',
    eligibleCategories:
      'Todos os produtos do site DAMIE',
    validity: 'Cupom permanente enquanto a parceria estiver ativa',
    reusable: 'Sim, sem limite de usos por CPF',
    shipping: 'Frete grátis em poltronas e sofás com entrega no Sul e no Sudeste, segundo a página de fretes da loja; no Centro-Oeste, calculado pelo CEP; o Norte e o Nordeste são atendidos pelos anúncios da loja no Mercado Livre',
    combinable:
      'Soma com todas as promoções e descontos do site, inclusive os 10% do Pix e o desconto por quantidade dos consultores no WhatsApp; não soma com outro cupom nem com o giftback de 15%',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Soma com as promoções e descontos do site e com o desconto por quantidade dos consultores no WhatsApp' },
      { benefit: 'pix', stacks: 'sim', condition: 'A DAMIE dá 10% no Pix, e os 12% do cupom entram sobre o preço já com o Pix' },
      { benefit: 'cashback', label: 'Giftback', stacks: 'nao', condition: 'Não soma com o giftback de 15% da loja' },
      { benefit: 'outro-cupom', stacks: 'nao', condition: 'O cupom não soma com outro cupom' },
      { benefit: 'frete', stacks: 'depende', condition: 'Grátis em poltronas e sofás com entrega no Sul e no Sudeste; no Centro-Oeste, calculado pelo CEP' },
    ],
    paymentPerks: [
      'Até 12x sem juros no cartão, com parcela mínima de R$ 100',
    ],
    lastVerified: '2026-11-11',
    testedAt: '2026-11-11',
    testNote:
      'Aplicamos o CECILIA12 no puff avulso do Sofá Damie Modular, de R$ 1.300,00 por R$ 1.170,00 com o desconto do Pix que o checkout já aplica, e o total caiu para R$ 1.029,60, com R$ 140,40 de desconto: os 12% entraram sobre o preço com o Pix.',
    aboutBrand:
      'A DAMIE é uma marca brasileira de móveis estofados premium, com foco em poltronas reclináveis, sofás, camas e soluções de conforto para a casa. A Cecília usa produtos da marca no dia a dia e produziu reviews mostrando montagem, acabamento, conforto e uso real em casa. O cupom CECILIA12 foi criado para quem acompanha o Em Casa com Cecília e quer comprar com desconto direto no checkout. A proposta da parceria é simples: indicar produtos que fazem sentido para uma casa mais confortável, sem esconder que existe relação comercial e comissão de afiliado quando uma compra é feita pelo link ou cupom.',
    faqs: [
      {
        question: 'O cupom CECILIA12 funciona em todos os produtos da DAMIE?',
        answer:
          'Sim. O CECILIA12 dá 12% OFF em todos os produtos disponíveis no site da DAMIE, sem restrição de categoria ou modelo.',
      },
      {
        question: 'O cupom CECILIA12 vale para Pix, cartão e outras formas de pagamento?',
        answer:
          'Sim. O CECILIA12 vale com todas as formas de pagamento disponíveis no checkout da DAMIE, incluindo Pix e cartão. O desconto de 12% não depende do meio de pagamento escolhido.',
      },
      {
        question: 'O CECILIA12 soma com o desconto do Pix?',
        answer:
          'Sim. A DAMIE dá 10% de desconto no Pix, e o CECILIA12 soma com ele.',
      },
      {
        question: 'O cupom CECILIA12 é cumulativo com outras promoções?',
        answer:
          'Sim. O CECILIA12 soma com todas as promoções e descontos do site da DAMIE, inclusive o desconto de 10% no Pix e o desconto por quantidade que os consultores dão pelo WhatsApp. Ele não soma com outro cupom nem com o giftback de 15%. Confira o resumo do checkout antes de finalizar.',
      },
      {
        question: 'O cupom CECILIA12 vale no Mercado Livre?',
        answer:
          'Não. O CECILIA12 vale só no checkout do site oficial da DAMIE. A DAMIE também vende pelos anúncios dela no Mercado Livre, que é como atende o Norte e o Nordeste, mas lá vale o preço do anúncio, sem o cupom.',
        mercadoLivreUrl: 'https://meli.la/25cdWK4',
      },
      {
        question: 'A DAMIE tem aplicativo para comprar?',
        answer:
          'Não. A compra é pelo site oficial, que funciona no navegador do celular e tem busca para achar os produtos. É lá que o CECILIA12 vale: digite o código no campo de cupom, antes de pagar.',
      },
      {
        question: 'O cupom inclui frete grátis?',
        answer:
          'O cupom não dá frete grátis: ele desconta do valor dos produtos. A DAMIE tem frete grátis em poltronas e sofás com entrega no Sul e no Sudeste; no Centro-Oeste, o frete é calculado pelo CEP.',
      },
      {
        question: 'O que fazer se o cupom CECILIA12 não funcionar?',
        answer:
          'Confira se não há outro cupom no carrinho nem o giftback de 15%: o CECILIA12 não soma com eles. O código vai no campo de cupom do site oficial da DAMIE, sem espaços; ele não vale no Mercado Livre. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.',
      },
      {
        question: 'A Cecília testou produtos da DAMIE?',
        answer:
          'Sim. Há reviews e vídeos de produtos DAMIE usados pela Cecília em casa, incluindo poltronas e sofá modular. A página de cupom também aponta para esses conteúdos relacionados.',
      },
      {
        question: 'O cupom CECILIA12 vale na primeira compra na DAMIE?',
        answer: 'Sim. O CECILIA12 vale na primeira compra e também para quem já comprou na loja.',
      },
      {
        question: 'Qual cupom DAMIE dá 12% para quem já é cliente?',
        answer:
          'O CECILIA12. Ele dá 12% em todos os produtos do site para quem compra pela primeira vez e para quem já comprou, sem limite de usos por CPF.',
      },
      {
        question: 'O cupom CECILIA12 tem validade?',
        answer:
          'O cupom está ativo enquanto a parceria estiver vigente. Esta página mostra a data da última verificação para você saber quando a informação foi revisada.',
      },
      {
        question: 'Tem cupom DAMIE na Black Friday?',
        answer:
          'Tem. O cupom DAMIE CECILIA12 dá 12% OFF em todos os produtos do site, em todas as formas de pagamento, e é o mesmo código do resto do ano.',
      },
      {
        question: 'O cupom DAMIE vale na Black Friday?',
        answer:
          'O cupom DAMIE CECILIA12 dá 12% OFF e soma com as promoções, os brindes e o desconto do Pix; só não soma com outro cupom nem com o giftback.',
      },
      {
        question: 'Comprar com o cupom muda o preço para mim?',
        answer:
          'Não no sentido de custo extra. Você recebe o desconto informado quando o cupom é aceito, e o Em Casa com Cecília pode receber comissão da marca por indicação.',
      },
    ],
    history: [
      {
        date: '2024',
        code: 'CECILIA10',
        discount: '10% OFF',
        note: 'Cupom inicial da parceria.',
      },
    ],
    status: 'ativo',
    featured: true,
    featuredPitch: 'Poltronas reclináveis, sofás e camas.',
    relatedContent: [
      {
        title: 'Minha experiência: Poltronas Reclináveis DAMIE',
        url: '/reviews/poltronas-reclinaveis-damie-vale-o-investimento',
        type: 'review',
        publishedAt: '2025-04-17',
      },
      {
        title: 'Review: Sofá Modular DAMIE',
        url: '/reviews/sofa-damie-na-caixa-vale-a-pena-o-modular',
        type: 'review',
        publishedAt: '2026-04-29',
      },
      {
        title: 'Review: Poltrona Moon DAMIE',
        url: '/reviews/poltrona-moon-design-que-parece-obra-de-arte',
        type: 'review',
        publishedAt: '2026-04-29',
      },
      {
        title: 'Review: Poltrona Levita DAMIE',
        url: '/reviews/poltrona-levita-o-topo-da-tecnologia-e-conforto',
        type: 'review',
        publishedAt: '2026-04-29',
      },
    ],
    monthlyHighlight: {
      scope: 'em todos os produtos do site',
      note: 'Válido com todas as formas de pagamento disponíveis na DAMIE, inclusive Pix e cartão',
      showCheckoutReminder: false,
    },
  },
  {
    offerMode: 'discount-code',
    slug: 'dolce-gusto',
    cartPrint: { src: '/images/reviews/dolcegusto/cupom-dolce-gusto-carrinho-com-cupom.webp', alt: 'Carrinho da NESCAFÉ Dolce Gusto com o código CECI aplicado e, no resumo do pedido, a linha Você ganhou 10% OFF', aspectRatio: 1.263 },
    brand: 'Dolce Gusto',
    officialUrl: 'https://www.nescafe-dolcegusto.com.br/',
    offerUrl: 'https://www.nescafe-dolcegusto.com.br/',
    brandIcon: 'DG',
    brandLogo: '/images/about/partners/dolce-gusto.avif',
    brandLogoAlt: 'Marca Nescafé Dolce Gusto',
    bubble: { src: '/images/logos/bolinhas/dolce-gusto.png' },
    brandWatermark: '/images/logos/watermarks/dolce-gusto.webp',
    // O logo é AVIF, que o cartão do X não mostra: o compartilhamento usa a capa do guia do cupom.
    socialImage: '/images/reviews/cupons/nescafe-dolce-gusto-hero.webp',
    socialImageAlt: 'Cecília com uma xícara de café ao lado da máquina Dolce Gusto e do cupom CECI',
    brandColor: '#7E2A1A',
    code: 'CECI',
    discount: '10% OFF',
    discountNumber: 10,
    category: 'Café e bebidas',
    hubCategory: 'alimentacao',
    shortDescription: 'cápsulas, máquinas e acessórios da loja oficial',
    longDescription:
      'O cupom Dolce Gusto CECI dá 10% OFF na loja oficial Nescafé Dolce Gusto em compras a partir de R$ 100, para quem compra pela primeira vez e para quem já é cliente, e soma com as promoções. Testado num carrinho de R$ 111,30, com R$ 11,13 de desconto.',
    metaTitle: 'Código CECI Dolce Gusto: 10% OFF testado',
    metaTitleMonth: true,
    metaDescription:
      'Cupom Dolce Gusto: CECI dá 10% OFF na loja oficial em compras a partir de R$ 100, para cliente novo ou antigo, e soma com as promoções.',
    eligibleCategories:
      'Todo o site oficial Dolce Gusto, em compras a partir de R$ 100',
    validity: 'Cupom permanente enquanto a parceria estiver ativa',
    reusable: 'Conforme regras da loja',
    shipping: 'Calculado separadamente, conforme política da loja',
    combinable: 'Soma com as promoções vigentes da loja oficial',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Os 10% entram sobre o preço promocional, inclusive em produtos que já estão em promoção' },
      { benefit: 'pix', stacks: 'sim', condition: 'Soma com o desconto do Pix, quando a loja oferece; o percentual aparece na hora do pagamento' },
    ],
    lastVerified: '2026-11-12',
    testedAt: '2026-11-12',
    testNote:
      'Num carrinho de sete caixas de Espresso Intenso, de R$ 19,99 cada, o CECI tirou R$ 13,99 dos R$ 139,93, os 10%, e o total caiu para R$ 125,94. No mesmo dia, num combo da Black Friday, de R$ 207,20 por R$ 145,04, o CECI tirou R$ 14,50 e o total caiu para R$ 130,54. Em 11/11/2026, em sete caixas de Cappuccino em promoção, de R$ 25,90 por R$ 15,90 cada, o CECI tirou R$ 11,13 dos R$ 111,30. Em 26/10/2026, com o carrinho abaixo de R$ 100, a loja recusou o cupom.',
    aboutBrand:
      'A Nescafé Dolce Gusto é uma linha de cafés e bebidas em cápsulas da Nestlé, com máquinas e sabores pensados para preparo rápido em casa. A marca combina praticidade com variedade: cafés intensos, bebidas com leite, cappuccinos, chocolates e opções geladas aparecem no catálogo da loja oficial. O cupom CECI entra como benefício para quem acompanha a Cecília e quer economizar em compras na loja oficial. Como em toda parceria comercial, a recomendação deve ser conferida no checkout: o desconto aparece antes da finalização quando a regra da campanha permite.',
    faqs: [
      {
        question: 'O cupom CECI vale para todas as cápsulas Dolce Gusto?',
        answer:
          'No nosso teste no carrinho, o CECI aplicou 10% OFF no site oficial Dolce Gusto em compras a partir de R$ 100. A elegibilidade pode variar; confirme o desconto no resumo do carrinho antes de finalizar.',
      },
      {
        question: 'O cupom CECI funciona em máquinas Dolce Gusto?',
        answer:
          'Pode funcionar em máquinas Dolce Gusto. Caso algum produto tenha uma campanha própria ou restrição comercial, o checkout informa se o cupom é aceito.',
      },
      {
        question: 'O cupom CECI vale na primeira compra na Dolce Gusto?',
        answer:
          'Sim. O CECI vale na primeira compra no site oficial Nescafé Dolce Gusto e também para quem já comprou na loja, em compras a partir de R$ 100.',
      },
      {
        question: 'Qual cupom Dolce Gusto dá 10% para quem já é cliente?',
        answer:
          'O CECI. Ele dá 10% na loja oficial Nescafé Dolce Gusto, em compras a partir de R$ 100, para quem compra pela primeira vez e para quem já comprou.',
      },
      {
        question: 'Existe cupom Dolce Gusto de 20% ou 50%?',
        answer:
          'Com código, o desconto que testamos é o do CECI: 10% em compras a partir de R$ 100. Não testamos os códigos de 20% ou 50% que aparecem em sites de cupom. Quando a própria loja põe cápsulas ou máquinas em promoção, o CECI soma: os 10% entram sobre o preço promocional.',
      },
      {
        question: 'Posso usar o cupom CECI mais de uma vez?',
        answer:
          'A regra de reutilização depende da política da loja e da campanha vigente. Se houver limite por conta, CPF ou pedido, o checkout informa.',
      },
      {
        question: 'O cupom CECI está funcionando hoje?',
        answer:
          'Sim. No teste de checkout mais recente, o CECI aplicou os 10% num carrinho de cápsulas acima de R$ 100. A data e os valores do teste estão em "Como testamos o cupom", nesta página.',
      },
      {
        question: 'O cupom CECI vale no Mercado Livre?',
        answer:
          'Não. O CECI é usado no checkout do site oficial da Dolce Gusto e não vale no Mercado Livre nem em outros marketplaces. Pelo Mercado Livre, vale o preço do anúncio, sem o cupom.',
        mercadoLivreUrl: 'https://meli.la/1Dj5ZpJ',
      },
      {
        question: 'O cupom CECI vale no app da Dolce Gusto?',
        answer:
          'Sim. O CECI vale no aplicativo Nescafé Dolce Gusto, para Android e iPhone, do mesmo jeito que no site oficial: digite o código no campo de cupom, antes de pagar.',
      },
      {
        question: 'O cupom dá frete grátis?',
        answer:
          'Não necessariamente. O cupom concede desconto nos produtos; frete, prazo e condições de entrega seguem as regras da loja oficial Dolce Gusto.',
      },
      {
        question: 'O cupom CECI é cumulativo?',
        answer:
          'Sim. O CECI soma com as promoções vigentes da loja oficial, inclusive em produtos que já estão com preço promocional. O resumo do carrinho mostra o desconto antes de você pagar.',
      },
      {
        question: 'O link leva para a loja oficial?',
        answer:
          'Sim. O botão de compra aponta para o site oficial Nescafé Dolce Gusto Brasil informado pela parceria.',
      },
      {
        question: 'Tem cupom Dolce Gusto na Black Friday?',
        answer:
          'Tem. O cupom Dolce Gusto CECI dá 10% OFF na loja oficial, em compras a partir de R$ 100, e é o mesmo código do resto do ano.',
      },
      {
        question: 'O cupom Dolce Gusto vale na Black Friday?',
        answer:
          'Vale. O cupom Dolce Gusto CECI dá 10% OFF em compras a partir de R$ 100 e somou com um combo da Black Friday no nosso teste: o desconto entrou sobre o preço da campanha.',
      },
      {
        question: 'O que fazer se o cupom CECI não funcionar?',
        answer:
          'Confira se o carrinho passa de R$ 100, porque abaixo disso a loja recusa o cupom, e se o código foi digitado sem espaços. O cupom vale no site e no app oficiais da Nescafé Dolce Gusto, não no Mercado Livre. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.',
      },
    ],
    status: 'ativo',
    featured: true,
    relatedContent: [
      {
        title: 'Como usar o cupom CECI na Nescafé Dolce Gusto',
        url: '/reviews/cupom-ceci-nescafe-dolce-gusto-como-usar',
        type: 'review',
        publishedAt: '2026-06-19',
      },
      {
        title: 'Clube Dolce Gusto: pontos e prêmios',
        url: '/reviews/clube-dolce-gusto-como-funciona',
        type: 'review',
        publishedAt: '2026-07-03',
      },
      {
        title: 'Dolce Gusto é confiável? O que observar antes de comprar',
        url: '/reviews/dolce-gusto-e-confiavel',
        type: 'review',
        publishedAt: '2026-07-14',
      },
    ],
    monthlyHighlight: {
      scope: 'na loja oficial',
      note: 'Soma com as promoções vigentes da loja oficial',
    },
  },
  {
    offerMode: 'discount-code',
    slug: 'yesstyle',
    brand: 'YesStyle',
    officialUrl: 'https://www.yesstyle.com/',
    get offerUrl() { return getPrimaryRewardCode().affiliateUrl; },
    brandIcon: 'YS',
    brandLogo: '/images/logos/yesstyle.jpg',
    brandLogoAlt: 'Marca YesStyle',
    bubble: { src: '/images/logos/bolinhas/yesstyle.png' },
    brandWatermark: '/images/logos/watermarks/yesstyle.webp',
    brandColor: '#111827',
    get code() { return getPrimaryRewardCode().code; },
    get discount() { return `Até ${getPrimaryRewardCode().newCustomerDiscount}% OFF`; },
    get discountNumber() { return getPrimaryRewardCode().newCustomerDiscount; },
    offerTypeLabel: 'código de recompensa',
    offerTypeLabelPlural: 'códigos de recompensa',
    get offerActionLabel() { return `somar até ${getPrimaryRewardCode().newCustomerDiscount}% extras`; },
    codeKind: 'reward',
    codeFieldLabel: 'Reward Code / Código de Recompensa',
    get codeInstructions() {
      const r = getPrimaryRewardCode();
      return [
        `Copie o código de recompensa ${r.code} no card acima.`,
        'Acesse a YesStyle pelo botão indicado e adicione seus produtos ao carrinho.',
        `No checkout, cole ${r.code} no campo Reward Code / Código de Recompensa (dá ${r.newCustomerDiscount}% OFF na 1ª compra ou ${r.returningCustomerDiscount}% OFF nas seguintes).`,
        'Se houver um cupom promocional ativo da YesStyle, aplique esse cupom no campo Coupon Code / Código de Cupom.',
        'Confira se os descontos acumulados aparecem no resumo do pedido antes de finalizar.',
      ];
    },
    category: 'Beleza, moda e lifestyle',
    hubCategory: 'beleza',
    get shortDescription() {
      const r = getPrimaryRewardCode();
      return `até ${r.newCustomerDiscount}% OFF extra (${r.newCustomerDiscount}% 1ª compra / ${r.returningCustomerDiscount}% recorrente)`;
    },
    get longDescription() {
      const r = getPrimaryRewardCode();
      return `${r.code} é o código de recompensa oficial da YesStyle: garante até ${r.newCustomerDiscount}% OFF extra (${r.newCustomerDiscount}% na primeira compra ou ${r.returningCustomerDiscount}% em compras recorrentes) no campo Reward Code e é acumulável com cupons promocionais elegíveis no campo Coupon Code.`;
    },
    get lastVerified() {
      return getLatestYesStyleVerifiedAtISO();
    },
    get metaTitle() {
      const r = getPrimaryRewardCode();
      const d = new Date(`${this.lastVerified}T00:00:00Z`);
      const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
      const monthYear = `${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
      return `Cupom YesStyle ${monthYear}: ${r.code} — Até ${r.newCustomerDiscount}% Extra Cumulativo`;
    },
    get metaDescription() {
      const r = getPrimaryRewardCode();
      const d = new Date(`${this.lastVerified}T00:00:00Z`);
      const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
      const monthYear = `${months[d.getUTCMonth()]} de ${d.getUTCFullYear()}`;
      return `Cupom YesStyle testado em ${monthYear}: use ${r.code} para até ${r.newCustomerDiscount}% extra no campo Reward Code (${r.newCustomerDiscount}% 1ª compra / ${r.returningCustomerDiscount}% recorrente) e combine com cupons promocionais elegíveis.`;
    },
    eligibleCategories:
      'Beleza, skincare, moda, acessórios e lifestyle, conforme regras da loja',
    validity: 'Código de recompensa ativo enquanto a parceria estiver vigente',
    reusable: 'Sim, conforme regras da loja',
    shipping: 'Calculado separadamente, conforme política internacional da loja',
    combinable: 'Sim: deve ser usado no campo Reward Code e é acumulável com cupons promocionais elegíveis no campo Coupon Code',
    get aboutBrand() {
      const r = getPrimaryRewardCode();
      return `A YesStyle é uma loja internacional conhecida por produtos de beleza asiática, skincare, moda, acessórios e itens de lifestyle. O ${r.code} entra como código de recompensa de influenciador para quem acompanha o Em Casa com Cecília e quer economizar no site. A diferença importante é que ele não substitui o cupom promocional da loja: deve ser aplicado no campo Reward Code para somar até ${r.newCustomerDiscount}% extras (${r.newCustomerDiscount}% na primeira compra ou ${r.returningCustomerDiscount}% em compras recorrentes) aos cupons promocionais elegíveis inseridos no campo Coupon Code. Como regras de desconto, frete e aplicação podem variar por campanha, produto e país de entrega, confira sempre o resumo do carrinho antes de finalizar a compra.`;
    },
    get faqs() {
      const r = getPrimaryRewardCode();
      return [
        {
          question: `${r.code} é cupom ou código de recompensa da YesStyle?`,
          answer: `${r.code} é um código de recompensa (Reward Code) de influenciador. Ele deve ser colocado no campo Reward Code / Código de Recompensa, não no campo de cupom tradicional.`,
        },
        {
          question: `Posso usar ${r.code} junto com um cupom YesStyle?`,
          answer: `Sim. A principal vantagem é justamente somar: ${r.code} vai no campo Reward Code e o cupom promocional ativo vai no campo Coupon Code. Confira os descontos acumulados no resumo do pedido.`,
        },
        {
          question: `Qual o desconto do código ${r.code}?`,
          answer: `O ${r.code} oferece até ${r.newCustomerDiscount}% OFF extra: ${r.newCustomerDiscount}% de desconto para novos clientes em sua primeira compra e ${r.returningCustomerDiscount}% de desconto para compras recorrentes.`,
        },
        {
          question: `O código de recompensa ${r.code} vale para skincare e beleza coreana?`,
          answer: 'Pode valer para skincare, K-beauty, cosméticos, moda e lifestyle conforme as condições comerciais da YesStyle. O checkout sempre mostra se o benefício foi aplicado.',
        },
        {
          question: `${r.code} dá frete grátis?`,
          answer: 'Não necessariamente. O código de recompensa adiciona benefício nos produtos elegíveis; frete, prazo e condições de entrega seguem as regras internacionais da YesStyle.',
        },
        {
          question: `Posso usar ${r.code} mais de uma vez?`,
          answer: 'A regra de reutilização depende da política da YesStyle e do programa de recompensas vigente. Se houver limite por conta ou pedido, o checkout informa.',
        },
        {
          question: 'Usar o código de recompensa apoia o Em Casa com Cecília?',
          answer: `Sim, o uso do ${r.code} pode gerar comissão, crédito ou benefício de afiliado para o Em Casa com Cecília, sem custo extra para você.`,
        },
      ];
    },
    status: 'ativo',
    featured: false,
    get relatedContent() {
      const r = getPrimaryRewardCode();
      return [
        {
          title: 'Como encontrar cupons YesStyle válidos e acumular descontos',
          url: '/reviews/como-encontrar-cupons-yesstyle-validos',
          type: 'review' as const,
          publishedAt: '2026-07-24',
        },
        {
          title: `YesStyle ${r.code}: como usar o código de recompensa (Passo a passo com prints)`,
          url: '/reviews/codigo-cecilia010-yesstyle-como-usar',
          type: 'review' as const,
          publishedAt: '2026-06-21',
        },
        {
          title: `YesStyle Reward Code ${r.code} (English)`,
          url: '/en/reviews/yesstyle-reward-code-coupon-cecilia010',
          type: 'review' as const,
          publishedAt: '2026-07-11',
        },
      ];
    },
    get monthlyHighlight() {
      const r = getPrimaryRewardCode();
      return {
        scope: 'na YesStyle',
        note: `Não é cupom tradicional: use no campo Reward Code para somar até ${r.newCustomerDiscount}% extras aos cupons promocionais elegíveis`,
      };
    },
  },
  {
    offerMode: 'discount-code',
    slug: 'nestle-nutre',
    cartPrint: { article: 'cupom-ceci-nestle-nutre-como-usar', src: '/images/reviews/nutren/passo-4-cupom-aplicado-10.webp', alt: 'Resumo do pedido na loja da Nestlé Nutre com o cupom CECI aplicado: subtotal de R$ 1.121,84, desconto de R$ 112,18 (10%) e total de R$ 1.009,66.', aspectRatio: 0.562 },
    brand: 'Nestlé Nutre',
    officialUrl: 'https://www.nestlenutre.com.br/',
    offerUrl: 'https://www.nestlenutre.com.br/',
    brandIcon: 'N',
    brandLogo: '/images/about/partners/nutren.png',
    brandLogoAlt: 'Marca Nestlé Nutre',
    bubble: { src: '/images/logos/bolinhas/nestle-nutre.png' },
    brandWatermark: '/images/logos/watermarks/nutren.webp',
    brandColor: '#0056A4',
    code: 'CECI',
    discount: '10% OFF',
    discountNumber: 10,
    category: 'Nutrição e bem-estar',
    hubCategory: 'alimentacao',
    shortDescription: 'produtos Nestlé Nutre, exceto Alfamino, Alfaré e fórmulas infantis de 0 a 12 meses',
    longDescription:
      'O cupom Nestlé Nutre CECI dá 10% OFF na loja oficial, para quem compra pela primeira vez e para quem já é cliente, e soma com as promoções; não vale em Alfamino, Alfaré nem fórmulas infantis de 0 a 12 meses. Testado num carrinho de R$ 296,50, com R$ 29,65 de desconto.',
    metaTitle: 'Cupom Nestlé Nutre: 10% OFF com CECI',
    metaTitleMonth: true,
    metaDescription:
      'Cupom Nestlé Nutre: CECI dá 10% OFF para cliente novo ou antigo e soma com as promoções. Fora Alfamino, Alfaré e fórmulas infantis de 0 a 12 meses.',
    eligibleCategories:
      'Produtos Nestlé Nutre, exceto Alfamino, Alfaré e fórmulas infantis para bebês de 0 a 12 meses (como NAN)',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping: 'Calculado separadamente, conforme política da loja',
    combinable: 'Soma com as promoções vigentes da loja oficial',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Os 10% entram sobre o preço promocional, inclusive em produtos que já estão em promoção' },
      { benefit: 'pix', stacks: 'sim', condition: 'Soma com o desconto do Pix, quando a loja oferece; o percentual aparece na hora do pagamento' },
    ],
    paymentPerks: [
      'Até 6x sem juros no cartão',
    ],
    lastVerified: '2026-11-11',
    testedAt: '2026-11-11',
    testNote:
      'Num carrinho com o Kit Nutren Senior Zero Lactose, duas latas de 740 g por R$ 296,50, o CECI aplicou R$ 29,65 de desconto, os 10%, e o total caiu para R$ 266,85.',
    aboutBrand:
      'A Nestlé Nutre é uma loja oficial da Nestlé voltada a produtos de nutrição e suplementação, com opções para diferentes rotinas e necessidades alimentares. Os produtos disponíveis podem fazer parte do dia a dia de quem busca praticidade na alimentação, sempre conforme as indicações do rótulo e, quando necessário, com orientação de um profissional de saúde. O cupom CECI foi criado para quem acompanha o Em Casa com Cecília e quer economizar na loja oficial, com exceção de Alfamino e Alfaré. A loja também vende fórmulas infantis NAN para bebês de 0 a 12 meses; nesses produtos o cupom não deve ser usado, porque o art. 5º do Decreto 9.579/2018 proíbe cupons e descontos promocionais em fórmulas para lactentes, inclusive na internet. Como em toda parceria comercial, a recomendação é conferir o desconto aplicado no checkout antes de finalizar a compra.',
    faqs: [
      {
        question: 'O cupom CECI vale para todos os produtos Nestlé Nutre?',
        answer:
          'Não para todos. O cupom vale para produtos Nestlé Nutre, com exceção de Alfamino, Alfaré e das fórmulas infantis para bebês de 0 a 12 meses, como NAN. Confirme se o desconto aparece no checkout antes de finalizar.',
      },
      {
        question: 'A loja FamilyNes virou Nestlé Nutre? O cupom vale?',
        answer:
          'Sim. A loja oficial FamilyNes, da Nestlé, passou a fazer parte da Nestlé Nutre, no site nestlenutre.com.br, segundo o anúncio da própria FamilyNes. É lá que o CECI dá 10% OFF, sem valor mínimo, exceto em Alfamino, Alfaré e nas fórmulas infantis de 0 a 12 meses.',
      },
      {
        question: 'O cupom CECI vale nos produtos Nutren?',
        answer:
          'Sim. A linha Nutren é vendida na loja Nestlé Nutre, e o CECI vale nela como nos outros produtos da loja, exceto Alfamino, Alfaré e as fórmulas infantis de 0 a 12 meses. No nosso teste mais recente, o Kit Nutren Senior Zero Lactose, com duas latas de 740 g, saiu de R$ 296,50 por R$ 266,85.',
      },
      {
        question: 'O cupom CECI vale para fórmulas infantis NAN?',
        answer:
          'Não use o CECI em fórmulas infantis para bebês de 0 a 12 meses, como NAN. O art. 5º do Decreto 9.579/2018 proíbe a promoção comercial dessas fórmulas, incluindo cupons e descontos de preço, também na internet. O cupom é indicado para os demais produtos elegíveis da loja.',
      },
      {
        question: 'O cupom CECI funciona nos produtos Nestlé Nutre?',
        answer:
          'Sim, o cupom foi cadastrado para produtos Nestlé Nutre, exceto Alfamino e Alfaré, e não deve ser usado em fórmulas infantis de 0 a 12 meses. Valide no carrinho antes de concluir a compra.',
      },
      {
        question: 'Posso usar o cupom CECI mais de uma vez?',
        answer:
          'A regra de reutilização depende da política da loja e da campanha vigente. Se houver limite por conta, CPF ou pedido, o checkout informa.',
      },
      {
        question: 'O cupom CECI vale na primeira compra na Nestlé Nutre?',
        answer:
          'Sim. O CECI vale na primeira compra e também para quem já comprou na loja, nos produtos elegíveis: fora Alfamino, Alfaré e as fórmulas infantis de 0 a 12 meses.',
      },
      {
        question: 'Qual cupom Nestlé Nutre dá 10% para quem já é cliente?',
        answer:
          'O CECI. Ele dá 10% nos produtos elegíveis para quem compra pela primeira vez e para quem já comprou na loja. Ficam de fora Alfamino, Alfaré e as fórmulas infantis de 0 a 12 meses.',
      },
      {
        question: 'O cupom CECI vale no Mercado Livre?',
        answer:
          'Não. O CECI é usado no checkout do site oficial da Nestlé Nutre e não vale no Mercado Livre nem em outros marketplaces. Pelo Mercado Livre, vale o preço do anúncio, sem o cupom.',
        mercadoLivreUrl: 'https://meli.la/2zH895L',
      },
      {
        question: 'A Nestlé Nutre tem aplicativo?',
        answer:
          'Não. A Nestlé Nutre vende pelo site oficial, que funciona no navegador do celular e tem busca para achar os produtos. É lá que o CECI vale: digite o código no campo de cupom, antes de pagar.',
      },
      {
        question: 'O cupom dá frete grátis?',
        answer:
          'Não necessariamente. O cupom aplica desconto nos produtos; frete, prazo e condições de entrega seguem a política da loja oficial.',
      },
      {
        question: 'O cupom CECI é cumulativo?',
        answer:
          'Sim. O CECI soma com as promoções vigentes da loja oficial, inclusive em produtos que já estão com preço promocional. O resumo do carrinho mostra o desconto antes de você pagar.',
      },
      {
        question: 'O link leva para a loja oficial?',
        answer:
          'Sim. O botão de compra aponta para o site oficial Nestlé Nutre informado pela parceria.',
      },
      {
        question: 'Tem cupom Nestlé Nutre na Black Friday?',
        answer:
          'Tem. O cupom Nestlé Nutre CECI dá 10% OFF nos produtos elegíveis da loja, em todas as formas de pagamento; não vale em fórmulas infantis de 0 a 12 meses.',
      },
      {
        question: 'O cupom Nestlé Nutre vale na Black Friday?',
        answer:
          'Vale. O cupom Nestlé Nutre CECI dá 10% OFF sobre os preços do Black Month, a campanha de novembro da loja, nos produtos elegíveis. A loja aceita um cupom por pedido.',
      },
      {
        question: 'O que fazer se o cupom CECI não funcionar?',
        answer:
          'Verifique se o produto não é Alfamino, Alfaré ou fórmula infantil de 0 a 12 meses, se o código foi digitado corretamente e se a campanha ainda está ativa. Se ainda assim não funcionar, avise pelo contato do site para que a informação seja revisada.',
      },
    ],
    status: 'ativo',
    featured: false,
    relatedContent: [
      {
        title: 'Cupom Nestlé Nutre CECI: como usar o desconto de 10%',
        url: '/reviews/cupom-ceci-nestle-nutre-como-usar',
        type: 'review',
        publishedAt: '2026-07-10',
      },
    ],
    monthlyHighlight: {
      scope: 'em produtos Nestlé Nutre, exceto Alfamino e Alfaré',
      note: 'Atenção: não use o CECI em fórmulas infantis para bebês de 0 a 12 meses, como NAN. O art. 5º do Decreto 9.579/2018 proíbe cupons e descontos promocionais nesses produtos, inclusive na internet',
    },
  },
  {
    offerMode: 'discount-code',
    slug: 'i-wanna-sleep',
    cartPrint: { article: 'cupom-ceciemcasa-i-wanna-sleep-como-usar', src: '/images/reviews/iwannasleep/4-confirme-desconto.webp', alt: 'Desconto do cupom CECIEMCASA aplicado na I Wanna Sleep.', aspectRatio: 1.196 },
    brand: 'I Wanna Sleep',
    officialUrl: 'https://www.iwannasleep.com.br',
    offerUrl: 'https://www.iwannasleep.com.br',
    brandIcon: 'IWS',
    brandLogo: '/images/about/partners/i-wanna-sleep.avif',
    brandLogoAlt: 'Marca I Wanna Sleep',
    bubble: { src: '/images/logos/bolinhas/i-wanna-sleep.png' },
    brandWatermark: '/images/logos/watermarks/i-wanna-sleep.webp',
    // O logo é AVIF, que o cartão do X não mostra: o compartilhamento usa a capa do guia do cupom.
    socialImage: '/images/reviews/iwannasleep/cupom-ceciemcasa-hero.webp',
    socialImageAlt: 'Mulher de pijama comemorando sobre um travesseiro I Wanna Sleep',
    brandColor: '#2D1B4E',
    code: 'CECIEMCASA',
    discount: '10% OFF',
    discountNumber: 10,
    category: 'Sono e conforto',
    hubCategory: 'casa',
    shortDescription: 'todo o site I Wanna Sleep',
    longDescription:
      'O cupom I Wanna Sleep CECIEMCASA dá 10% OFF em todo o site (colchões, travesseiros e acessórios), para quem compra pela primeira vez e para quem já é cliente, e soma com as promoções da loja. Testado numa máscara de dormir em promoção.',
    metaTitle: 'Cupom I Wanna Sleep: 10% OFF com CECIEMCASA',
    metaTitleMonth: true,
    metaDescription:
      'Cupom I Wanna Sleep: CECIEMCASA dá 10% OFF em todo o site oficial para cliente novo ou antigo e soma com as promoções da loja.',
    eligibleCategories:
      'Todo o site I Wanna Sleep',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping: 'Calculado separadamente, conforme política da loja',
    combinable: 'Soma com as promoções vigentes da loja oficial',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Os 10% entram sobre o preço promocional dos produtos da loja' },
      { benefit: 'pix', stacks: 'sim', condition: 'Soma com os 5% de desconto do Pix, que a loja mostra na página do produto' },
    ],
    lastVerified: '2026-11-11',
    limitedCodes: [
      {
        // Upgrade de cupom da Black Friday da loja (26 e 27/11), com o mesmo código.
        code: 'CECIEMCASA15',
        discount: '15% OFF',
        startsAt: '2026-11-26T00:00:00-03:00',
        endsAt: '2026-11-27T23:59:59-03:00',
        testedAt: '2026-11-04',
        testNote: 'deu 15% no carrinho inteiro, inclusive no kit em promoção',
      },
    ],
    testedAt: '2026-11-11',
    testNote:
      'Aplicamos o CECIEMCASA na Caracol Sleep Mask em promoção, de R$ 177,00 por R$ 160,00, e o total caiu para R$ 144,00, com R$ 16,00 de desconto: os 10% entraram sobre o preço promocional. Em 24/10/2026, num carrinho de R$ 6.163,00 com um box IWS Linen Gray e um kit Pillow Top Magnum, os 10% valeram nos dois itens.',
    aboutBrand:
      'A I Wanna Sleep é uma marca focada em produtos para sono, conforto e bem-estar do quarto, como colchões, travesseiros, lençóis e acessórios pensados para rotinas de descanso. O cupom CECIEMCASA entra como benefício para quem acompanha o Em Casa com Cecília e quer economizar no site oficial. Como regras de desconto, frete e aplicação podem variar por campanha e produto, a recomendação é sempre conferir o desconto no checkout antes de finalizar a compra.',
    faqs: [
      {
        question: 'O cupom CECIEMCASA vale para todos os produtos da I Wanna Sleep?',
        answer:
          'O cupom vale para compras no site da I Wanna Sleep. Confirme se o desconto aparece no checkout antes de finalizar.',
      },
      {
        question: 'Qual cupom I Wanna Sleep dá 10% para quem já é cliente?',
        answer:
          'O CECIEMCASA. Ele dá 10% em todo o site da I Wanna Sleep para quem compra pela primeira vez e para quem já comprou.',
      },
      {
        question: 'O cupom CECIEMCASA funciona em colchões, travesseiros e acessórios?',
        answer:
          'Pode funcionar em colchões, travesseiros e acessórios da I Wanna Sleep. O carrinho mostra se a regra da campanha foi aplicada.',
      },
      {
        question: 'Posso usar o cupom CECIEMCASA mais de uma vez?',
        answer:
          'A regra de reutilização depende da política da loja e da campanha vigente. Se houver limite por conta, CPF ou pedido, o checkout informa.',
      },
      {
        question: 'O cupom CECIEMCASA vale no Mercado Livre?',
        answer:
          'Não. O CECIEMCASA é usado no checkout do site oficial da I Wanna Sleep e não vale no Mercado Livre nem em outros marketplaces. Pelo Mercado Livre, vale o preço do anúncio, sem o cupom.',
        mercadoLivreUrl: 'https://meli.la/33vyTDP',
      },
      {
        question: 'A I Wanna Sleep tem aplicativo?',
        answer:
          'Não. A I Wanna Sleep vende pelo site oficial, que funciona no navegador do celular e tem busca para achar os produtos. É lá que o CECIEMCASA vale: digite o código no campo de cupom, antes de pagar.',
      },
      {
        question: 'O cupom dá frete grátis?',
        answer:
          'Não necessariamente. O cupom aplica desconto nos produtos; frete, prazo e condições de entrega seguem a política da loja oficial.',
      },
      {
        question: 'O cupom CECIEMCASA é cumulativo?',
        answer:
          'Sim. O CECIEMCASA soma com as promoções vigentes da loja oficial, inclusive em produtos que já estão com preço promocional. O resumo do carrinho mostra o desconto antes de você pagar.',
      },
      {
        question: 'O link leva para a loja oficial?',
        answer:
          'Sim. O botão de compra aponta para o site oficial da I Wanna Sleep informado pela parceria.',
      },
      {
        question: 'Tem cupom I Wanna Sleep na Black Friday?',
        answer:
          'Tem. O cupom I Wanna Sleep CECIEMCASA dá 10% OFF em todo o site, em todas as formas de pagamento.',
      },
      {
        question: 'O cupom I Wanna Sleep vale na Black Friday?',
        answer:
          'Vale. O cupom I Wanna Sleep CECIEMCASA dá 10% OFF e soma com os preços da Black Friday. Nos kits da campanha, o carrinho mostra se o cupom entrou antes do pagamento.',
      },
      {
        question: 'O que fazer se o cupom CECIEMCASA não funcionar?',
        answer:
          'Verifique se o código foi digitado corretamente e se a campanha ainda está ativa. Se ainda assim não funcionar, avise pelo contato do site para que a informação seja revisada.',
      },
    ],
    monthlyHighlight: {
      scope: 'em todo o site',
      note: 'Válido para compras no site oficial da I Wanna Sleep',
    },
    status: 'ativo',
    featured: false,
  },
  {
    offerMode: 'discount-code',
    slug: 'magalu',
    cartPrint: { article: 'cupom-magalu-em-casa-com-cecilia', src: '/images/reviews/magalu/magalu-cupom-aplicado.webp', alt: 'Campo de cupom com desconto aplicado no checkout', aspectRatio: 2.812 },
    brand: 'Magalu',
    officialUrl: 'https://www.magazineluiza.com.br/',
    offerUrl: 'https://www.magazinevoce.com.br/magazineemcasacomcecilia/',
    brandIcon: 'M',
    brandLogo: '/images/about/partners/magalu.webp',
    brandLogoAlt: 'Marca Magalu (Magazine Luiza)',
    bubble: { src: '/images/logos/bolinhas/magalu.png' },
    brandWatermark: '/images/logos/watermarks/magalu.webp',
    brandColor: '#0086FF',
    code: '100EMCASACOMCECILIA',
    discount: 'R$ 10 a R$ 100 OFF',
    discountNumber: 100,
    codeInstructions: [
      'Estes códigos da Cecília funcionam somente pelo navegador, na loja Magazine Você da Cecília: acesse a loja pelo navegador do celular ou computador (não funcionam no app do Magalu).',
      'Entre com a sua conta Magalu de sempre — o login é o mesmo do site e do app.',
      'Monte o carrinho com produtos vendidos e entregues pelo Magalu até atingir o valor mínimo da faixa desejada.',
      'No checkout, aplique o código correspondente à sua faixa (ex.: 50EMCASACOMCECILIA para R$ 50 OFF em compras a partir de R$ 2.499,90).',
      'Confira se o desconto apareceu no resumo do pedido antes de finalizar.',
    ],
    category: 'Eletrônicos, eletrodomésticos, móveis e mais',
    hubCategory: 'diversos',
    shortDescription: 'produtos vendidos e entregues pelo Magalu na loja Magazine Você da Cecília',
    longDescription:
      'Códigos exclusivos da parceria da Cecília com o Magalu, em 10 faixas de R$ 10 a R$ 100 OFF conforme o valor do carrinho, na primeira compra ou não. Válidos apenas na loja Magazine Você da Cecília, em produtos vendidos e entregues pelo Magalu. Testado no carrinho.',
    metaTitle: 'Cupom Magalu: até R$ 100 OFF com 100EMCASACOMCECILIA',
    metaDescription:
      'Cupom Magalu: 100EMCASACOMCECILIA dá até R$ 100 OFF na loja Magazine Você da Cecília. Vale só no navegador; veja as 10 faixas.',
    eligibleCategories:
      'Produtos vendidos e entregues pelo Magalu, conforme a faixa de valor mínimo de cada cupom',
    validity: 'Cupons ativos enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja Magazine Você',
    shipping: 'Calculado separadamente, conforme política do Magalu',
    combinable:
      'Soma com as promoções vigentes da loja e com o desconto do Pix; confirme o valor no checkout',
    lastVerified: '2026-11-11',
    testedAt: '2026-10-01',
    testNote:
      'Aplicamos os códigos no checkout da loja Magazine Você da Cecília, pelo navegador, em produtos vendidos e entregues pelo Magalu, e o desconto em reais da faixa alcançada apareceu no resumo do pedido.',
    aboutBrand:
      'A loja Magazine Você da Cecília faz parte do programa oficial Influenciador Magalu (antigo Magazine Você), mantido pela Magazine Luiza S/A (CNPJ 47.960.950/0001-21). O domínio magazinevoce.com.br pertence à própria Magalu desde 2011, o que significa que quem vende, cobra, entrega e faz o pós-venda é o Magalu — e o login usado na loja é a conta Magalu que você já tem no site e no app. Os códigos desta campanha são criados pela Cecília para a própria loja: estes códigos da Cecília funcionam somente pelo navegador, na loja Magazine Você da Cecília — não no app do Magalu nem no site principal. Comprar por essa loja pode gerar comissão para o Em Casa com Cecília, sem custo extra para você: o preço e o desconto exibidos no checkout são exatamente os da sua faixa.',
    faqs: [
      {
        question: 'Os cupons funcionam no app do Magalu?',
        answer:
          'Não. Estes códigos da Cecília funcionam somente pelo navegador, na loja Magazine Você da Cecília (celular ou computador). No app do Magalu, o código não é aplicado.',
      },
      {
        question: 'Comprar na loja Magazine Você da Cecília é seguro? É golpe?',
        answer:
          'É seguro. A loja faz parte do programa oficial Influenciador Magalu, da Magazine Luiza S/A, e o domínio magazinevoce.com.br pertence à própria Magalu desde 2011. Seus dados de pagamento ficam apenas com o Magalu — nem a Cecília nem o site têm acesso a eles.',
      },
      {
        question: 'Qual código eu devo usar?',
        answer:
          'Depende do valor total do seu carrinho. Consulte a tabela de faixas nesta página: cada código exige uma compra mínima (ex.: 50EMCASACOMCECILIA para R$ 50 OFF em compras a partir de R$ 2.499,90). Use sempre o código da maior faixa que o seu carrinho alcançar.',
      },
      {
        question: 'Os cupons funcionam em qualquer produto?',
        answer:
          'Não. Estes códigos da Cecília valem apenas para produtos vendidos e entregues pelo Magalu, na loja Magazine Você da Cecília. Itens de lojistas parceiros (marketplace) não entram na regra — confira no checkout se o desconto foi aplicado.',
      },
      {
        question: 'Os cupons são cumulativos com outras promoções?',
        answer:
          'Sim. Os códigos da Cecília somam com as promoções vigentes da loja Magazine Você da Cecília e com o desconto do Pix. O valor final exibido no checkout é sempre a referência.',
      },
      {
        question: 'O cupom dá frete grátis?',
        answer:
          'Não. O desconto é aplicado apenas no valor dos produtos. O frete é calculado separadamente, conforme a política do Magalu para o seu CEP e os itens do pedido.',
      },
      {
        question: 'Preciso criar um cadastro novo para comprar na loja?',
        answer:
          'Não. Você entra com a sua conta Magalu de sempre — o mesmo login do site e do app do Magalu. Não é necessário criar um cadastro novo.',
      },
      {
        question: 'Existe cupom Magalu de R$ 100 de desconto?',
        answer:
          'Sim: o código 100EMCASACOMCECILIA dá R$ 100 OFF em compras a partir de R$ 4.999,90, válido para produtos vendidos e entregues pelo Magalu na loja Magazine Você da Cecília, pelo navegador. É a maior faixa desta campanha.',
      },
      {
        question: 'O cupom funciona para primeira compra?',
        answer:
          'Não há exigência de primeira compra: estes códigos da Cecília funcionam em qualquer pedido que atinja o valor mínimo da faixa escolhida, seja a sua primeira compra na loja ou não.',
      },
      {
        question: 'Cupom Magalu hoje: está funcionando?',
        answer:
          'A última confirmação dos 10 códigos foi em 11 de novembro de 2026, no painel de afiliado da Cecília: todos estavam ativos. Esta página é atualizada sempre que algo muda na campanha — se um código deixar de funcionar, o aviso aparece aqui.',
      },
      {
        question: 'O cupom funciona no celular?',
        answer:
          'Sim, desde que a compra seja feita pelo navegador do celular (Chrome, Safari ou outro), na loja Magazine Você da Cecília. O que não funciona é o aplicativo do Magalu — o código só é aceito na loja, pelo navegador.',
      },
      {
        question: 'Cupom Magazine Luiza e cupom Magalu são a mesma coisa?',
        answer:
          'Sim, Magalu é o nome curto do Magazine Luiza. Nesta campanha, os códigos da Cecília funcionam exclusivamente na loja Magazine Você da Cecília, que é operada pelo próprio Magazine Luiza dentro do programa Influenciador Magalu.',
      },
      {
        question: 'Tem cupom Magalu na Black Friday?',
        answer:
          'Tem. Os cupons Magalu da Cecília dão de R$ 10 a R$ 100 OFF, conforme o valor do carrinho, em produtos vendidos e entregues pelo Magalu, na loja Magazine Você da Cecília.',
      },
      {
        question: 'O cupom Magalu vale na Black Friday?',
        answer:
          'Vale. Os cupons Magalu da Cecília, de R$ 10 a R$ 100 OFF, valem sobre o preço da Black Friday, com todas as formas de pagamento, na loja Magazine Você da Cecília, pelo navegador.',
      },
      {
        question: 'Comprar com o cupom gera comissão para a Cecília?',
        answer:
          'Sim, e vale ser transparente: compras feitas na loja Magazine Você da Cecília geram uma comissão paga pelo Magalu, sem custo extra para você. E quando você usa qualquer um destes cupons, o valor do desconto é abatido da comissão que a Cecília receberia pelo pedido — ou seja, o desconto sai da comissão dela, não do seu bolso.',
      },
    ],
    status: 'ativo',
    featured: false,
    relatedContent: [
      {
        title: 'Como usar o cupom Magalu da Cecília',
        url: '/reviews/cupom-magalu-em-casa-com-cecilia',
        type: 'review',
        publishedAt: '2026-07-17',
      },
    ],
    monthlyHighlight: {
      scope: 'na loja Magazine Você da Cecília',
      note: 'Estes códigos da Cecília funcionam somente pelo navegador, na loja Magazine Você da Cecília, em produtos vendidos e entregues pelo Magalu — não funcionam no app do Magalu',
    },
    tiers: [
      { code: '10EMCASACOMCECILIA', discount: 'R$ 10 OFF', minPurchase: 'R$ 499,90' },
      { code: '20EMCASACOMCECILIA', discount: 'R$ 20 OFF', minPurchase: 'R$ 999,90' },
      { code: '30EMCASACOMCECILIA', discount: 'R$ 30 OFF', minPurchase: 'R$ 1.499,90' },
      { code: '40EMCASACOMCECILIA', discount: 'R$ 40 OFF', minPurchase: 'R$ 1.999,90' },
      { code: '50EMCASACOMCECILIA', discount: 'R$ 50 OFF', minPurchase: 'R$ 2.499,90' },
      { code: '60EMCASACOMCECILIA', discount: 'R$ 60 OFF', minPurchase: 'R$ 2.999,90' },
      { code: '70EMCASACOMCECILIA', discount: 'R$ 70 OFF', minPurchase: 'R$ 3.499,90' },
      { code: '80EMCASACOMCECILIA', discount: 'R$ 80 OFF', minPurchase: 'R$ 3.999,90' },
      { code: '90EMCASACOMCECILIA', discount: 'R$ 90 OFF', minPurchase: 'R$ 4.499,90' },
      { code: '100EMCASACOMCECILIA', discount: 'R$ 100 OFF', minPurchase: 'R$ 4.999,90' },
    ],
  },
  {
    offerMode: 'discount-code',
    slug: 'letseatit',
    cartPrint: { article: 'cupom-mauad-lets-eat-it-como-usar', src: '/images/reviews/letseatit/passo-4-desconto-mauad-resumo.webp', alt: 'Resumo do pedido na Let\'s Eat It: subtotal de R$ 3.582,10, desconto MAUAD de R$ 179,10, frete calculado na próxima etapa e total de R$ 3.403,00', aspectRatio: 2.686 },
    brand: "Let's Eat It",
    officialUrl: 'https://letseatit.com.br/',
    offerUrl:
      'https://letseatit.com.br/?utm_source=embaixador&utm_medium=emcasacomcecilia&utm_campaign=inbazz&utm_content=organico',
    brandIcon: 'LEI',
    brandLogo: '/images/about/partners/letseatit-icon.png',
    brandLogoAlt: "Marca Let's Eat It",
    bubble: { src: '/images/logos/bolinhas/letseatit.png' },
    brandWatermark: '/images/logos/watermarks/letseatit.webp',
    brandColor: '#56624B',
    code: 'MAUAD',
    discount: '5% OFF',
    discountNumber: 5,
    category: 'Casa, cozinha e presentes',
    hubCategory: 'casa',
    shortDescription: "todo o site Let's Eat It",
    longDescription:
      'O cupom Let\'s Eat It da Cecília dá 5% OFF no site, para quem compra pela primeira vez e para quem já é cliente, soma com as promoções, a pré-venda e os 5% do Pix, e vale em todas as formas de pagamento. Testado no carrinho.',
    metaTitle: "Cupom Let's Eat It: 5% OFF no site, soma com Pix",
    metaTitleMonth: true,
    metaDescription:
      'Cupom Let\'s Eat It: 5% OFF no site oficial para cliente novo ou antigo, somando com promoções, pré-venda e os 5% do Pix. Use o código da Cecília.',
    eligibleCategories: "Todo o site Let's Eat It, conforme regras da loja",
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping: 'Calculado separadamente, conforme política da loja',
    combinable:
      'Soma com as promoções vigentes do site, inclusive em pré-venda, e com o desconto de 5% do Pix; vale com todas as formas de pagamento; a soma com outros cupons segue as regras da loja',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Soma com as promoções do site, inclusive em pré-venda' },
      { benefit: 'pix', stacks: 'sim', condition: 'Soma com os 5% de desconto do Pix que muitos produtos têm' },
    ],
    lastVerified: '2026-11-12',
    testedAt: '2026-11-12',
    testNote:
      'Com a Black November no ar, aplicamos o MAUAD num bowl de porcelana da campanha, de R$ 171,50 por R$ 102,90, e o total caiu para R$ 97,76, com R$ 5,14 de desconto: os 5% entraram sobre o preço da campanha. Em 11/11/2026, num pote de cerâmica Le Creuset em promoção, de R$ 519,00 por R$ 363,30, o total caiu para R$ 345,14. No teste de 02/10/2026, ele já tinha valido num carrinho com um item em pré-venda.',
    aboutBrand:
      "A Let's Eat It é uma loja online brasileira de casa e presentes, com curadoria de marcas como Le Creuset, KitchenAid, Porto Brasil e Bohemia Crystal. O catálogo cobre mesa posta, cozinha, bar, café e chá, decoração, outdoor e eletrodomésticos — itens que conversam com a rotina de quem cozinha e recebe em casa. O cupom MAUAD, com o sobrenome da Cecília, entra como benefício para quem acompanha o Em Casa com Cecília e quer economizar no site oficial. Como regras de desconto, frete e aplicação podem variar por campanha e produto, a recomendação é sempre conferir o desconto no checkout antes de finalizar a compra.",
    faqs: [
      {
        question: "O cupom MAUAD vale para todos os produtos da Let's Eat It?",
        answer:
          "O cupom MAUAD dá 5% OFF em compras no site da Let's Eat It. Se algum item ou campanha tiver regra própria, o checkout informa; confirme o desconto no resumo do pedido antes de finalizar.",
      },
      {
        question: 'O cupom vale no site letseatit.com.br?',
        answer:
          'Sim. O MAUAD vale no site oficial da Let\'s Eat It, o letseatit.com.br, que muita gente procura como "Lets Eat It" ou "letseatit". O código vai no campo de cupom do carrinho.',
      },
      {
        question: 'O cupom MAUAD vale no Pix e em outras formas de pagamento?',
        answer:
          "Sim. O MAUAD vale com todas as formas de pagamento da Let's Eat It e soma com o desconto de 5% que muitos produtos têm no Pix.",
      },
      {
        question: "O cupom MAUAD vale na primeira compra na Let's Eat It?",
        answer: 'Sim. O MAUAD vale na primeira compra e também para quem já comprou na loja.',
      },
      {
        question: 'Qual cupom Let\'s Eat It dá 5% para quem já é cliente?',
        answer:
          'O MAUAD. Ele dá 5% no site da Let\'s Eat It para quem compra pela primeira vez e para quem já comprou.',
      },
      {
        question: 'Existe cupom Let\'s Eat It de 10%?',
        answer:
          'Com código, o desconto que testamos é o do MAUAD: 5% no site. Não testamos os códigos de 10% que aparecem em sites de cupom. O MAUAD soma com as promoções e com os 5% de desconto do Pix que muitos produtos têm: no teste, os 5% entraram sobre o preço promocional.',
      },
      {
        question: 'O cupom MAUAD vale no Mercado Livre?',
        answer:
          "Não. O MAUAD é usado no checkout do site oficial da Let's Eat It e não vale no Mercado Livre nem em outros marketplaces. Pelo Mercado Livre, vale o preço do anúncio, sem o cupom.",
        mercadoLivreUrl: 'https://meli.la/1RHKLYr',
      },
      {
        question: "A Let's Eat It tem aplicativo?",
        answer:
          "Não. A Let's Eat It vende pelo site oficial, que funciona no navegador do celular e tem busca para achar os produtos. É lá que o MAUAD vale: digite o código no campo de cupom, antes de pagar.",
      },
      {
        question: 'Por que o cupom se chama MAUAD?',
        answer:
          'MAUAD é o sobrenome da Cecília Mauad, criadora do Em Casa com Cecília. É o código oficial da parceria com a loja.',
      },
      {
        question: 'Posso usar o cupom MAUAD mais de uma vez?',
        answer:
          'A regra de reutilização depende da política da loja e da campanha vigente. Se houver limite por conta, CPF ou pedido, o checkout informa.',
      },
      {
        question: 'O cupom dá frete grátis?',
        answer:
          'Não necessariamente. O cupom aplica desconto nos produtos; frete, prazo e condições de entrega seguem a política da loja oficial.',
      },
      {
        question: 'O que fazer se o cupom MAUAD não funcionar?',
        answer:
          "Confira se não há outro cupom no pedido e se o código foi digitado sem espaços no campo de cupom do site letseatit.com.br; no Mercado Livre ele não vale. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.",
      },
      {
        question: 'O cupom MAUAD é cumulativo?',
        answer:
          'O MAUAD soma com o desconto do Pix e, nos nossos testes, foi aceito em produto que já estava com preço promocional e em item de pré-venda. A soma com outros cupons segue as regras da loja; o valor final do checkout é a referência.',
      },
      {
        question: 'O link leva para a loja oficial?',
        answer:
          "Sim. O botão de compra aponta para o site oficial da Let's Eat It, com a identificação da parceria da Cecília.",
      },
      {
        question: "Tem cupom Let's Eat It na Black Friday?",
        answer:
          "Tem. O cupom Let's Eat It MAUAD dá 5% OFF em todo o site, em todas as formas de pagamento, e é o mesmo código do resto do ano.",
      },
      {
        question: "O cupom Let's Eat It vale na Black Friday?",
        answer:
          "Vale. O cupom Let's Eat It MAUAD dá 5% OFF e soma com os preços da Black November, a campanha da loja: no nosso teste, o desconto entrou sobre um produto da campanha.",
      },
      {
        question: 'Comprar com o cupom apoia o Em Casa com Cecília?',
        answer:
          'Sim, a compra pode gerar comissão para o Em Casa com Cecília, sem custo extra para você. O desconto aparece no checkout quando o cupom é aceito.',
      },
    ],
    monthlyHighlight: {
      scope: 'no site oficial',
      note: "Vale com todas as formas de pagamento no site oficial da Let's Eat It e soma com o desconto do Pix",
    },
    status: 'ativo',
    featured: false,
  },
  {
    offerMode: 'discount-code',
    slug: 'insider',
    cartPrint: { article: 'cupom-emcasacomcecilia-insider-store-como-usar', src: '/images/reviews/insider/insider-passo-4-desconto-ativado.webp', alt: 'Mensagem Melhor desconto ativado no checkout da Insider, com a etiqueta do cupom EMCASACOMCECILIA abaixo do campo Cupom de desconto ou Gift Card', aspectRatio: 1.343 },
    brand: 'Insider',
    officialUrl: 'https://www.insiderstore.com.br/',
    offerUrl:
      'https://www.insiderstore.com.br/discount/EMCASACOMCECILIA?redirect=/collections/outlet/?utm_source=influmkt&utm_medium=3c994aaa&utm_campaign=EMCASACOMCECILIA&cupom=EMCASACOMCECILIA',
    brandIcon: 'INS',
    brandLogo: '/images/about/partners/insider-icon.png',
    brandLogoAlt: 'Marca Insider',
    bubble: { src: '/images/logos/bolinhas/insider.png' },
    brandWatermark: '/images/logos/watermarks/insider.webp',
    brandColor: '#1A1A1A',
    code: 'EMCASACOMCECILIA',
    discount: '15% OFF',
    discountNumber: 15,
    category: 'Moda e roupas tecnológicas',
    hubCategory: 'moda',
    shortDescription: 'compras online na Insider, exceto lançamentos',
    longDescription:
      'O cupom Insider EMCASACOMCECILIA dá 15% OFF na primeira compra e nas seguintes, sem valor mínimo, nos produtos elegíveis da loja online: o desconto não diminui para quem já é cliente. Vale também sobre os preços de Black Friday, no Outlet e nos kits em promoção. Não vale em lançamentos nem na loja física, e a loja aceita um cupom por pedido.',
    metaTitle: 'Cupom Insider: 15% OFF com EMCASACOMCECILIA',
    metaTitleMonth: true,
    metaDescription:
      'Cupom Insider: EMCASACOMCECILIA dá 15% OFF na primeira compra e nas seguintes, sem mínimo. Soma com a Black Friday e o Outlet. Não vale em lançamentos.',
    eligibleCategories: 'Produtos da loja online da Insider, exceto lançamentos',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping: 'Frete grátis em compras acima de R$ 399, segundo a política de frete da loja; o valor conta depois do cupom',
    combinable:
      'Soma com as promoções vigentes da loja online, inclusive os preços de Black Friday, o Outlet e os kits com preço promocional; não acumula com outro cupom: a loja aceita um cupom por pedido',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Entra sobre os preços de Black Friday, do Outlet e dos kits em promoção; lançamentos ficam de fora' },
      { benefit: 'pix', stacks: 'sim', condition: 'Soma com o desconto do Pix, quando a loja oferece; o percentual aparece na hora do pagamento' },
      { benefit: 'outro-cupom', stacks: 'nao', condition: 'A loja aceita um cupom por pedido' },
      { benefit: 'frete', stacks: 'depende', condition: 'Grátis em compras acima de R$ 399; o valor conta depois do cupom' },
    ],
    lastVerified: '2026-11-11',
    testedAt: '2026-11-11',
    testNote:
      'No kit "Compre 1 Daily T-shirt e ganhe 1 Cueca Boxer Comfort", o carrinho sem cupom deu R$ 139,00, com a cueca grátis. Com o EMCASACOMCECILIA, o kit saiu por R$ 118,15: os 15% entraram e a cueca continuou grátis. No mesmo kit, o cupom da campanha da loja deu 5%, R$ 132,05. Em 31/10/2026, no esquenta de Black Friday da Insider, o EMCASACOMCECILIA deu os 15% sobre o preço já reduzido: a Tech T-Shirt, de R$ 169,00 por R$ 129,00, saiu por R$ 109,65, e uma Calça Pantalona InLounge do Outlet, de R$ 299,00 por R$ 179,00, saiu por R$ 152,15. O checkout fechou em R$ 261,80 com o cupom aplicado. Em 26/10, o cupom também valeu numa cueca em promoção e, nos testes de outubro, numa meia sozinha no carrinho, sem valor mínimo.',
    codeInstructions: [
      'Copie o código EMCASACOMCECILIA no card acima.',
      'Acesse a loja online da Insider pelo botão indicado: o link já leva o cupom para o carrinho.',
      'Adicione os produtos desejados ao carrinho. Lançamentos não entram no desconto.',
      'Se o cupom não aparecer aplicado, cole o código no campo de cupom antes de finalizar.',
      'Confira os 15% de desconto no resumo do pedido antes de pagar.',
    ],
    aboutBrand:
      'A Insider é uma marca brasileira de roupas com tecnologia têxtil, que cria peças funcionais e com proposta sustentável: camisetas, underwear, roupas esportivas e acessórios para usar no dia a dia. O cupom EMCASACOMCECILIA é o benefício da parceria para quem acompanha o Em Casa com Cecília e vale nas compras da loja online, com exceção dos lançamentos. Ele não vale nas lojas físicas e não acumula com outro cupom no mesmo pedido. O cupom dá 15% OFF, e o desconto aparece no carrinho quando o código é aceito; a recomendação é conferir o resumo do pedido antes de finalizar.',
    faqs: [
      {
        question: 'O cupom EMCASACOMCECILIA vale para todos os produtos da Insider?',
        answer:
          'Não para todos. O cupom vale nas compras da loja online, exceto produtos de lançamento. Se um item não receber o desconto, o carrinho mostra; confira o resumo do pedido antes de finalizar.',
      },
      {
        question: 'Quanto de desconto o cupom EMCASACOMCECILIA dá?',
        answer:
          'O EMCASACOMCECILIA dá 15% OFF nos produtos elegíveis da loja online, na primeira compra e nas seguintes, sem valor mínimo. O desconto aparece em cada item do resumo do pedido assim que o código é aceito.',
      },
      {
        question: 'Existe cupom Insider de 20%, 25% ou 30%?',
        answer:
          'Com código, o maior desconto que testamos na Insider é o do EMCASACOMCECILIA: 15%. Não testamos os códigos de 20% a 30% que aparecem em sites de cupom. O que rende mais é somar: os 15% entram sobre os preços de Black Friday e do Outlet, que já vêm reduzidos.',
      },
      {
        question: 'O cupom EMCASACOMCECILIA está funcionando hoje?',
        answer:
          'Sim. No teste de checkout mais recente, o EMCASACOMCECILIA aplicou os 15% num kit com brinde, que saiu de R$ 139,00 por R$ 118,15. A data e os valores do teste estão em "Como testamos o cupom", nesta página.',
      },
      {
        question: 'O cupom Insider vale na primeira compra? É melhor que o de boas-vindas?',
        answer:
          'Vale, e o desconto é o mesmo: o cupom de boas-vindas da Insider, liberado na primeira compra para quem cadastra o e-mail no site, também é de 15%. Como a loja aceita um cupom por pedido, os dois não somam. A diferença é que o EMCASACOMCECILIA não pede cadastro e vale também para quem já comprou.',
      },
      {
        question: 'Qual cupom Insider dá 15% para quem já é cliente?',
        answer:
          'O EMCASACOMCECILIA. Ele dá 15% nos produtos elegíveis da loja online para quem compra pela primeira vez e para quem já comprou: o desconto não diminui nas compras seguintes. Lançamentos ficam de fora, e a loja aceita um cupom por pedido.',
      },
      {
        question: 'Posso usar o cupom junto com outro cupom?',
        answer:
          'Não. A Insider aceita um cupom por pedido, e descontos de cupons diferentes não se somam.',
      },
      {
        question: 'O EMCASACOMCECILIA é cupom de influenciadora?',
        answer:
          'Sim. É o código da Cecília, do Em Casa com Cecília, testado por nós no checkout. Ele não soma com o cupom de outra influenciadora: a Insider aceita um cupom por pedido.',
      },
      {
        question: 'O cupom acumula com produtos em promoção?',
        answer:
          'Sim. Nos nossos testes, o EMCASACOMCECILIA deu os 15% numa calça do Outlet que já estava 40% mais barata, de R$ 179,00 por R$ 152,15, numa cueca em promoção e em kits com preço promocional. Lançamentos podem ficar de fora.',
      },
      {
        question: 'Tem cupom Insider na Black Friday?',
        answer:
          'Tem. O cupom Insider EMCASACOMCECILIA dá 15% OFF na loja online, em todas as formas de pagamento, fora os lançamentos, e é o mesmo código do resto do ano.',
      },
      {
        question: 'O cupom Insider vale na Black Friday?',
        answer:
          'Vale. O cupom Insider EMCASACOMCECILIA dá 15% OFF e entrou sobre os preços já reduzidos no nosso teste do esquenta de Black Friday: a Tech T-Shirt de R$ 129,00 saiu por R$ 109,65. Como a loja aceita um cupom por pedido, compare os 15% com o cupom da campanha da própria Insider antes de pagar.',
      },
      {
        question: 'O cupom vale nas lojas físicas da Insider?',
        answer: 'Não. O cupom EMCASACOMCECILIA é para compras na loja online.',
      },
      {
        question: 'O cupom EMCASACOMCECILIA vale no Mercado Livre?',
        answer:
          'Não. O EMCASACOMCECILIA é usado no checkout da loja online da Insider e não vale no Mercado Livre nem em outros marketplaces. Pelo Mercado Livre, vale o preço do anúncio, sem o cupom.',
        mercadoLivreUrl: 'https://meli.la/2TijWRi',
      },
      {
        question: 'A Insider tem aplicativo?',
        answer:
          'Não. A Insider vende pelo site oficial, que funciona no navegador do celular e tem busca para achar os produtos. É lá que o EMCASACOMCECILIA vale: digite o código no campo de cupom, antes de pagar.',
      },
      {
        question: 'O link já aplica o cupom?',
        answer:
          'Sim. O botão leva à loja online com o cupom EMCASACOMCECILIA já carregado no carrinho. Se ele não aparecer aplicado, digite o código no campo de cupom antes de pagar.',
      },
      {
        question: 'O cupom dá frete grátis?',
        answer:
          'O cupom não dá frete grátis. A Insider tem frete grátis em compras acima de R$ 399, e o valor conta depois do cupom.',
      },
      {
        question: 'O que fazer se o cupom EMCASACOMCECILIA não funcionar?',
        answer:
          'Veja se o item não é lançamento, que fica fora do desconto, e se não há outro cupom no pedido: a Insider aceita um por pedido. O cupom vale só na loja online, não nas lojas físicas nem no Mercado Livre. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.',
      },
      {
        question: 'Comprar com o cupom apoia o Em Casa com Cecília?',
        answer:
          'Sim, a compra pode gerar comissão para o Em Casa com Cecília, sem custo extra para você. O desconto aparece no checkout quando o cupom é aceito.',
      },
    ],
    relatedContent: [
      {
        title: 'Como usar o cupom EMCASACOMCECILIA na Insider Store',
        url: '/reviews/cupom-emcasacomcecilia-insider-store-como-usar',
        type: 'review',
        publishedAt: '2026-10-05',
      },
      {
        title: 'Insider Store é confiável? CNPJ, loja física e trocas',
        url: '/reviews/insider-store-e-confiavel',
        type: 'review',
        publishedAt: '2026-10-05',
      },
      {
        title: 'Insider Store no Reclame Aqui: nota e reclamações',
        url: '/reviews/insider-store-reclame-aqui-nota-reputacao',
        type: 'review',
        publishedAt: '2026-10-05',
      },
    ],
    monthlyHighlight: {
      scope: 'na loja online',
      note: 'Válido nas compras online da Insider, exceto lançamentos e lojas físicas',
    },
    status: 'ativo',
    featured: false,
  },
  {
    offerMode: 'affiliate-link',
    slug: 'shein',
    brand: 'SHEIN',
    officialUrl: 'https://br.shein.com/',
    offerUrl: 'https://br.shein.com/ark/5231?test=5051&url_from=affiliate_koc_6177013015&scene=1&ad_type=KOC&language=pt-br&siteuid=br&version_bid=101804616,101804641&version_eid=100693341&landing_page_id=5231&ad_test_id=49940&campaign=picklist&koc_id=6177013015&requestId=903986f526dd9d1c&search_redir=1&src_module=search&ici=s1%60EditSearch%604CW5Y%60_fb%60d1%60PageOthers&src_identifier=st%3D2%60sc%3D4CW5Y%60sr%3D0%60ps%3D1&tv_b=2&src_tab_page_id=page_home1786396601153&search_words=4CW5Y&campaign_id=20',
    brandIcon: 'S',
    brandLogo: '/images/about/partners/shein.webp',
    brandLogoAlt: 'Marca SHEIN',
    bubble: { src: '/images/logos/bolinhas/shein.png' },
    brandWatermark: '/images/logos/watermarks/shein.webp',
    brandColor: '#111111',
    discount: 'Promoções e descontos',
    offerTypeLabel: 'oferta',
    offerTypeLabelPlural: 'ofertas',
    offerActionLabel: 'Ver ofertas na SHEIN',
    category: 'Moda, acessórios, beleza e casa',
    hubCategory: 'moda',
    shortDescription: 'link principal, código de indicação e campanhas vigentes',
    longDescription:
      'O 4CW5Y é o código de indicação da Cecília: abre uma seleção da SHEIN com promoções e descontos. O botão abaixo já leva até ela; se preferir, copie o código e pesquise no app ou no site. Outras campanhas estão disponíveis abaixo.',
    metaTitle: 'SHEIN: 4CW5Y (indicação) e cupom de 50% para novos usuários',
    metaDescription:
      'Link da Cecília para a SHEIN: abre a página do 4CW5Y, com promoções e descontos, ou pesquise o código no app ou no site. K49L457: 50% para novos usuários.',
    eligibleCategories:
      'Moda, acessórios, beleza, casa e demais categorias elegíveis em cada campanha',
    validity: 'Links e campanhas sujeitos a alteração; confira as condições exibidas pela SHEIN',
    reusable: 'Conforme as regras apresentadas pela SHEIN em cada campanha',
    shipping: 'Calculado pela SHEIN conforme endereço, produtos e campanha',
    combinable: 'Pode variar por campanha, conta e produto; confira o valor final antes de pagar',
    lastVerified: '2026-10-24',
    aboutBrand:
      'A SHEIN é uma plataforma internacional de moda, acessórios, beleza e itens para casa. A página reúne o link principal da Cecília, o código de indicação informado pela parceria e campanhas que podem mudar ao longo do tempo. Links de produto específicos pertencem aos artigos de haul e reviews, porque disponibilidade, preço e estoque variam por peça. Compras feitas pelos links indicados podem gerar comissão para o Em Casa com Cecília, sem custo adicional para quem compra.',
    faqs: [
      {
        question: 'O código 4CW5Y é um cupom de desconto da SHEIN?',
        answer:
          'Não é cupom de checkout: o 4CW5Y é o código de indicação da Cecília. Ele abre uma página da SHEIN com uma seleção de produtos, promoções e descontos; quanto e em quais peças fica a critério da SHEIN. O botão desta página já abre essa seleção. Se preferir, copie o 4CW5Y e pesquise no app ou no site da SHEIN.',
      },
      {
        question: 'Preciso copiar e colar o 4CW5Y?',
        answer:
          'Não. O botão “Ver ofertas na SHEIN” desta página já abre a seleção do 4CW5Y. Copiar o código e pesquisar na busca do app ou do site da SHEIN leva à mesma página. Ele não vai no campo de cupom do checkout.',
      },
      {
        question: 'O que é o código 37S3442 na SHEIN?',
        answer:
          '37S3442 é o código de busca da campanha vigente de produtos selecionados. Os descontos são por tempo limitado e podem variar conforme o item.',
      },
      {
        question: 'Quem pode usar o código K49L457?',
        answer:
          'A campanha K49L457 dá cupom de 50% apenas para novos usuários: pesquise o código no aplicativo SHEIN ou abra o link da campanha. A elegibilidade e o desconto final são confirmados pela SHEIN na conta e no checkout.',
      },
      {
        question: 'Os links e códigos da SHEIN são permanentes?',
        answer:
          'Não. O link principal e as campanhas são reconferidos, mas a SHEIN pode reemitir links, encerrar campanhas ou alterar condições. A data de verificação desta página indica quando os dados foram revisados.',
      },
      {
        question: 'Comprar pelos links gera comissão para a Cecília?',
        answer:
          'Pode gerar. A SHEIN pode pagar comissão ao Em Casa com Cecília por compras atribuídas aos links da parceria, sem custo adicional para quem compra.',
      },
    ],
    linkInstructions: [
      'Toque em “Ver ofertas na SHEIN”: o link da Cecília já abre a página do 4CW5Y, sem copiar nada.',
      'Se preferir, copie o 4CW5Y e pesquise na busca do app ou do site da SHEIN.',
      'Para uma campanha específica, use o código de busca ou o botão correspondente nesta página.',
      'Confira os descontos de cada peça, a elegibilidade e o prazo na SHEIN.',
      'Verifique o valor final antes de concluir a compra.',
    ],
    linkNote:
      'O link da Cecília já abre a página do 4CW5Y, com promoções e descontos escolhidos pela SHEIN. Os códigos de indicação e de campanha também podem ser pesquisados no app ou no site, e nenhum deles vai no checkout.',
    affiliateAccountId: '6177013015',
    referral: {
      code: '4CW5Y',
      label: 'Código de indicação da Cecília',
      instructions: 'O botão desta página já abre a seleção do 4CW5Y. Se preferir, copie o código e pesquise no app ou no site da SHEIN: ele abre uma página com promoções e descontos escolhidos pela SHEIN.',
      verifiedAt: '2026-09-01',
    },
    status: 'ativo',
    featured: false,
  },
  {
    offerMode: 'discount-code',
    slug: 'kopenhagen',
    brand: 'Kopenhagen',
    officialUrl: 'https://www.kopenhagen.com.br/',
    offerUrl: 'https://www.kopenhagen.com.br/',
    brandIcon: 'K',
    brandLogo: '/images/about/partners/kopenhagen.jpg',
    brandLogoAlt: 'Marca Kopenhagen',
    brandColor: '#4B2415',
    code: 'CECILIA10',
    discount: '10% OFF',
    discountNumber: 10,
    category: 'Chocolates e presentes',
    hubCategory: 'alimentacao',
    shortDescription: 'chocolates, presentes e produtos da loja',
    longDescription:
      'Código da Cecília para economizar em compras de chocolates, presentes e produtos da Kopenhagen.',
    metaTitle: 'Cupom Kopenhagen 10% OFF • CECILIA10 ativo • Em Casa com Cecília',
    metaDescription:
      'Cupom Kopenhagen com 10% OFF. Use CECILIA10 no checkout para economizar em chocolates, presentes e produtos da loja.',
    eligibleCategories:
      'Chocolates, presentes, kits e produtos da loja conforme regras da campanha',
    validity: 'Cupom permanente enquanto a parceria estiver ativa',
    reusable: 'Sim, conforme regras da loja',
    shipping: 'Calculado separadamente, conforme política da loja',
    combinable: 'Pode variar conforme campanha ativa da Kopenhagen',
    lastVerified: '2026-07-02',
    aboutBrand:
      'A Kopenhagen é uma das marcas de chocolate mais conhecidas do Brasil, com linhas voltadas para presentes, datas comemorativas e momentos especiais em casa. No universo Em Casa com Cecília, o cupom CECILIA10 entra como benefício para quem quer comprar chocolates, kits e produtos da loja com desconto direto no checkout. Como as campanhas podem variar por data, estoque e categoria, a recomendação é conferir o desconto no carrinho antes de finalizar a compra. A página reúne o código ativo, instruções de uso e transparência sobre a parceria.',
    faqs: [
      {
        question: 'O cupom CECILIA10 funciona em todos os produtos da Kopenhagen?',
        answer:
          'O cupom pode valer para produtos da Kopenhagen conforme as regras atuais da loja. Confirme se o desconto aparece no checkout antes de finalizar.',
      },
      {
        question: 'O cupom CECILIA10 vale para presentes e kits?',
        answer:
          'Pode valer para kits, presentes e chocolates conforme as condições comerciais da campanha ativa.',
      },
      {
        question: 'O cupom Kopenhagen dá frete grátis?',
        answer:
          'Não necessariamente. O cupom aplica desconto nos produtos; frete, prazo e condições de entrega seguem as regras da loja.',
      },
      {
        question: 'O cupom CECILIA10 é cumulativo com outras promoções?',
        answer:
          'Normalmente cupons não acumulam com outras promoções, mas isso pode variar conforme campanha. O valor final no checkout é sempre a referência.',
      },
      {
        question: 'Posso usar o cupom CECILIA10 mais de uma vez?',
        answer:
          'A regra de reutilização depende da política da loja e da campanha vigente. Se houver limite por CPF ou pedido, o checkout informa.',
      },
      {
        question: 'Comprar com o cupom apoia o Em Casa com Cecília?',
        answer:
          'Sim, a compra pode gerar comissão para o Em Casa com Cecília, sem custo extra para você. O desconto aparece no checkout quando o cupom é aceito.',
      },
    ],
    status: 'pausado',
    featured: false,
  },
  {
    offerMode: 'discount-code',
    slug: 'probiotica',
    cartPrint: { article: 'cupom-probiotica-como-usar', src: '/images/reviews/probiotica/probiotica-cupom-03-desconto-aplicado.webp', alt: 'Resumo do pedido da Probiótica depois do cupom, com o código no lugar do campo e a linha Descontos com sinal de menos entre o subtotal e o total', aspectRatio: 1.021 },
    brand: 'Probiótica',
    officialUrl: 'https://www.probiotica.com.br/',
    offerUrl: 'https://www.probiotica.com.br?utm_source=creators&utm_medium=PRO10EMCASACOMCECILIA&utm_campaign=probi',
    brandIcon: 'PRO',
    brandLogo: '/images/about/partners/probiotica-icon.png',
    brandLogoAlt: 'Marca Probiótica',
    bubble: { src: '/images/logos/bolinhas/probiotica.png' },
    brandWatermark: '/images/logos/watermarks/probiotica.webp',
    brandColor: '#0A1FE9',
    code: 'PRO10EMCASACOMCECILIA',
    discount: 'Até 10% OFF',
    discountNumber: 10,
    category: 'Suplementos e nutrição esportiva',
    hubCategory: 'saude',
    shortDescription: 'suplementos no site oficial da Probiótica',
    longDescription:
      'O cupom Probiótica PRO10EMCASACOMCECILIA dá até 10% OFF no site oficial, para quem compra pela primeira vez e para quem já é cliente, soma com as promoções e vale em todas as formas de pagamento. Testado num whey em promoção e numa creatina a preço cheio: o desconto varia por item.',
    metaTitle: 'Cupom Probiótica: até 10% OFF com PRO10EMCASACOMCECILIA',
    metaDescription:
      'Cupom Probiótica: PRO10EMCASACOMCECILIA dá até 10% OFF no site oficial para cliente novo ou antigo, soma com as promoções e vale no Pix e no cartão.',
    eligibleCategories: 'Produtos do site oficial da Probiótica; o desconto chega a 10% e pode ser menor em alguns itens',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping: 'Frete grátis a partir de um mínimo por região, segundo a política de frete da loja: R$ 104 na capital de São Paulo, R$ 134 no Sudeste, R$ 204 no Centro-Oeste, R$ 249 no Sul, R$ 299 no Nordeste e R$ 599 no Norte; o valor conta depois do cupom',
    combinable: 'Soma com as promoções vigentes do site e vale com todas as formas de pagamento',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Entra sobre o preço promocional; o percentual do desconto varia por produto' },
      { benefit: 'pix', stacks: 'sim', condition: 'Soma com o desconto do Pix, que varia por produto e chega a 5%' },
      { benefit: 'frete', stacks: 'depende', condition: 'Grátis a partir de R$ 104 na capital de São Paulo, R$ 134 no Sudeste, R$ 204 no Centro-Oeste, R$ 249 no Sul, R$ 299 no Nordeste e R$ 599 no Norte, depois do cupom' },
    ],
    paymentPerks: [
      'Até 6x sem juros no cartão',
    ],
    lastVerified: '2026-11-11',
    testedAt: '2026-11-11',
    testNote:
      'Aplicamos o PRO10EMCASACOMCECILIA num Whey Hiper 100% Whey de 900 g em promoção, de R$ 210,39 por R$ 124,90, e o total caiu para R$ 116,16, com R$ 8,74 de desconto (7%). Numa creatina de 100 g a preço cheio, de R$ 33,89, o desconto foi de R$ 0,68 (2%). O percentual varia por produto.',
    aboutBrand:
      'A Probiótica é uma marca brasileira de suplementos alimentares, com linha de whey protein, creatina, colágeno, barras de proteína, pré-treinos e acessórios de treino vendidos no site oficial. O cupom PRO10EMCASACOMCECILIA é o benefício da parceria para quem acompanha o Em Casa com Cecília e dá até 10% OFF: o percentual varia conforme o produto, e o carrinho mostra quanto cada item recebeu. A recomendação é conferir o resumo do pedido antes de finalizar.',
    faqs: [
      {
        question: 'Quanto de desconto o cupom PRO10EMCASACOMCECILIA dá?',
        answer:
          'Até 10% OFF. O percentual varia conforme o produto: alguns itens recebem os 10%, outros um desconto menor. O resumo do pedido mostra o valor de cada item assim que o código é aceito.',
      },
      {
        question: 'Existe cupom Probiótica de 20%?',
        answer:
          'Com código, o desconto que testamos é o do PRO10EMCASACOMCECILIA: até 10%, variando por produto. Não testamos os códigos de 20% que aparecem em sites de cupom. Nos produtos em promoção, o cupom soma: no teste, a creatina com preço promocional recebeu os 10% por cima.',
      },
      {
        question: 'O cupom PRO10EMCASACOMCECILIA vale para todos os produtos da Probiótica?',
        answer:
          'Ele vale nas compras do site oficial da Probiótica, com o desconto variando por produto. Se um item não receber os 10%, o carrinho mostra; confira o resumo do pedido antes de pagar.',
      },
      {
        question: 'O cupom PRO10EMCASACOMCECILIA está funcionando hoje?',
        answer:
          'Sim. No teste de checkout mais recente, o PRO10EMCASACOMCECILIA foi aceito. A data e os valores do teste estão em "Como testamos o cupom", nesta página.',
      },
      {
        question: 'Onde coloco o cupom na Probiótica?',
        answer:
          'No carrinho do site oficial, no campo "Cupom de Desconto", antes de continuar para o pagamento.',
      },
      {
        question: 'O cupom soma com produtos em promoção?',
        answer:
          'Sim. No nosso teste mais recente, o cupom entrou num whey que já estava em promoção: de R$ 124,90 por R$ 116,16, 7% de desconto. O percentual varia por produto.',
      },
      {
        question: 'O cupom Probiótica vale na primeira compra?',
        answer:
          'Sim. O PRO10EMCASACOMCECILIA vale na primeira compra e também para quem já comprou na loja.',
      },
      {
        question: 'Qual cupom Probiótica vale para quem já é cliente?',
        answer:
          'O PRO10EMCASACOMCECILIA. Ele dá até 10% no site oficial para quem compra pela primeira vez e para quem já comprou. O percentual varia por produto.',
      },
      {
        question: 'O PRO10EMCASACOMCECILIA é cupom de influenciadora?',
        answer:
          'Sim. É o código da Cecília, do Em Casa com Cecília, testado por nós no checkout. Não testamos a soma com o cupom de outra pessoa; o resumo do pedido mostra qual código ficou aplicado.',
      },
      {
        question: 'O cupom PRO10EMCASACOMCECILIA vale no Mercado Livre?',
        answer:
          'Não. O PRO10EMCASACOMCECILIA é usado no checkout do site oficial da Probiótica e não vale no Mercado Livre nem em outros marketplaces. Pelo Mercado Livre, vale o preço do anúncio, sem o cupom.',
        mercadoLivreUrl: 'https://meli.la/1U1ttvv',
      },
      {
        question: 'A Probiótica tem aplicativo?',
        answer:
          'Não. A Probiótica vende pelo site oficial, que funciona no navegador do celular e tem busca para achar os produtos. É lá que o PRO10EMCASACOMCECILIA vale: digite o código no campo de cupom, antes de pagar.',
      },
      {
        question: 'O cupom dá frete grátis?',
        answer:
          'O cupom não dá frete grátis. A Probiótica tem frete grátis a partir de um mínimo por região, de R$ 104 na capital de São Paulo a R$ 599 no Norte, e o valor conta depois do cupom. A tabela "O que acumula com o cupom" traz o mínimo de cada região.',
      },
      {
        question: 'O que fazer se o cupom PRO10EMCASACOMCECILIA não funcionar?',
        answer:
          'Lembre que o desconto varia por produto: alguns itens recebem menos de 10%, e o resumo do pedido mostra quanto cada um teve. Confira se o código foi colado no campo "Cupom de Desconto" do carrinho, sem espaços, e se a compra é no site oficial, não no Mercado Livre. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.',
      },
      {
        question: 'Tem cupom Probiótica na Black Friday?',
        answer:
          'Tem. O cupom Probiótica PRO10EMCASACOMCECILIA dá até 10% OFF no site oficial, em todas as formas de pagamento; o percentual é menor em alguns produtos.',
      },
      {
        question: 'O cupom Probiótica vale na Black Friday?',
        answer:
          'O cupom Probiótica PRO10EMCASACOMCECILIA dá até 10% OFF no site oficial e soma com o preço promocional. Em produto com preço do Novembro PRO, a campanha da loja, a linha Descontos do carrinho mostra o valor antes de pagar.',
      },
      {
        question: 'Comprar com o cupom apoia o Em Casa com Cecília?',
        answer:
          'Sim, a compra pode gerar comissão para o Em Casa com Cecília, sem custo extra para você. O desconto aparece no checkout quando o cupom é aceito.',
      },
    ],
    monthlyHighlight: {
      scope: 'no site oficial',
      note: 'O desconto chega a 10% e pode ser menor em alguns produtos',
    },
    status: 'ativo',
    featured: false,
  },
  {
    offerMode: 'discount-code',
    slug: 'max-titanium',
    cartPrint: { article: 'cupom-max-titanium-como-usar', src: '/images/reviews/max-titanium/max-titanium-cupom-03-desconto-aplicado.webp', alt: 'Carrinho da Max Titanium depois do cupom, com o código no resumo e no item, a linha Descontos de menos R$ 16,75 e o total de R$ 172,25', aspectRatio: 2.676 },
    brand: 'Max Titanium',
    officialUrl: 'https://www.maxtitanium.com.br/',
    offerUrl: 'https://www.maxtitanium.com.br/',
    brandIcon: 'MAX',
    brandLogo: '/images/about/partners/max-titanium-icon.png',
    brandLogoAlt: 'Marca Max Titanium',
    bubble: { src: '/images/logos/bolinhas/max-titanium.png' },
    brandWatermark: '/images/logos/watermarks/max-titanium.webp',
    brandColor: '#C90C0F',
    code: 'MAX10EMCASACOMCECILIA',
    discount: 'Até 10% OFF',
    discountNumber: 10,
    category: 'Suplementos e nutrição esportiva',
    hubCategory: 'saude',
    shortDescription: 'suplementos no site oficial da Max Titanium',
    longDescription:
      'O cupom Max Titanium MAX10EMCASACOMCECILIA dá até 10% OFF no site oficial, para quem compra pela primeira vez e para quem já é cliente, testado num carrinho com Top Whey em promoção: soma com as promoções, mantém os brindes do carrinho e vale em todas as formas de pagamento.',
    metaTitle: 'Cupom Max Titanium: até 10% OFF com MAX10EMCASACOMCECILIA',
    metaDescription:
      'Cupom Max Titanium: MAX10EMCASACOMCECILIA dá até 10% OFF para cliente novo ou antigo, mantém os brindes do carrinho e vale no Pix e no cartão.',
    eligibleCategories: 'Produtos do site oficial da Max Titanium; o desconto chega a 10% e pode ser menor em alguns itens',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping: 'Frete grátis a partir de um mínimo por região, segundo a política de frete da loja: R$ 104 na capital de São Paulo, R$ 134 no Sudeste, R$ 204 no Centro-Oeste, R$ 249 no Sul, R$ 299 no Nordeste e R$ 599 no Norte; o valor conta depois do cupom',
    combinable:
      'Soma com as promoções vigentes do site e com os brindes do carrinho, e vale com todas as formas de pagamento',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Entra sobre o preço promocional, e os brindes do carrinho continuam nele; o percentual varia por produto' },
      { benefit: 'pix', stacks: 'sim', condition: 'Soma com o desconto do Pix, que varia por produto e chega a 5%' },
      { benefit: 'frete', stacks: 'depende', condition: 'Grátis a partir de R$ 104 na capital de São Paulo, R$ 134 no Sudeste, R$ 204 no Centro-Oeste, R$ 249 no Sul, R$ 299 no Nordeste e R$ 599 no Norte, depois do cupom' },
    ],
    lastVerified: '2026-11-11',
    testedAt: '2026-11-11',
    testNote:
      'Aplicamos o MAX10EMCASACOMCECILIA num Top Whey 3W + Sabor de 900 g em promoção, de R$ 273,55 por R$ 189,00, e o total caiu para R$ 172,25, com R$ 16,75 de desconto (8,9%). Num IsoWhey de 900 g a preço cheio, de R$ 326,18, o desconto foi de R$ 6,52 (2%), e a meia de brinde continuou no carrinho. O percentual varia por produto.',
    aboutBrand:
      'A Max Titanium é uma marca brasileira de suplementos alimentares, com linha de whey protein, creatina, pré-treinos, aminoácidos e snacks proteicos vendidos no site oficial. Faz parte do mesmo grupo da Probiótica e da Dr. Peanut. O cupom MAX10EMCASACOMCECILIA é o benefício da parceria para quem acompanha o Em Casa com Cecília e dá até 10% OFF: o percentual varia conforme o produto, e o carrinho mostra quanto cada item recebeu. Ele vale com qualquer forma de pagamento e soma com as promoções do site.',
    faqs: [
      {
        question: 'Quanto de desconto o cupom MAX10EMCASACOMCECILIA dá?',
        answer:
          'Até 10% OFF. O percentual varia conforme o produto: alguns itens recebem os 10%, outros um desconto menor. O resumo do pedido mostra o valor de cada item assim que o código é aceito.',
      },
      {
        question: 'Existe cupom Max Titanium de 20% ou 30%?',
        answer:
          'Com código, o desconto que testamos é o do MAX10EMCASACOMCECILIA: até 10%, variando por produto. Não testamos os códigos de 20% ou 30% que aparecem em sites de cupom. Nos produtos em promoção, o cupom soma, e os brindes do carrinho continuam nele.',
      },
      {
        question: 'O cupom MAX10EMCASACOMCECILIA vale no Pix, no cartão e em outras formas de pagamento?',
        answer:
          'Sim. O cupom vale com todas as formas de pagamento disponíveis no checkout, e o desconto não depende do meio escolhido.',
      },
      {
        question: 'O cupom Max Titanium vale na primeira compra?',
        answer: 'Sim. O MAX10EMCASACOMCECILIA vale na primeira compra e também para quem já comprou na loja.',
      },
      {
        question: 'Qual cupom Max Titanium vale para quem já é cliente?',
        answer:
          'O MAX10EMCASACOMCECILIA. Ele dá até 10% no site oficial para quem compra pela primeira vez e para quem já comprou. O percentual varia por produto.',
      },
      {
        question: 'O MAX10EMCASACOMCECILIA é cupom de influenciadora?',
        answer:
          'Sim. É o código da Cecília, do Em Casa com Cecília, testado por nós no checkout. Não testamos a soma com o cupom de outra pessoa; o resumo do pedido mostra qual código ficou aplicado.',
      },
      {
        question: 'O cupom MAX10EMCASACOMCECILIA vale no Mercado Livre?',
        answer:
          'Não. O MAX10EMCASACOMCECILIA é usado no checkout do site oficial da Max Titanium e não vale no Mercado Livre nem em outros marketplaces. Pelo Mercado Livre, vale o preço do anúncio, sem o cupom.',
        mercadoLivreUrl: 'https://meli.la/2wysiEJ',
      },
      {
        question: 'O cupom MAX10EMCASACOMCECILIA vale no app da Max Titanium?',
        answer:
          'Sim. O MAX10EMCASACOMCECILIA vale no aplicativo Max Titanium Suplementos, para Android e iPhone, do mesmo jeito que no site oficial: digite o código no campo de cupom, antes de pagar.',
      },
      {
        question: 'O cupom soma com produtos em promoção e com os brindes?',
        answer:
          'Sim. No nosso teste mais recente, o cupom deu desconto num whey que já estava em promoção, de R$ 189,00 por R$ 172,25. Em outro carrinho, com um whey a preço cheio, a meia de brinde continuou depois do cupom.',
      },
      {
        question: 'O cupom MAX10EMCASACOMCECILIA está funcionando hoje?',
        answer:
          'Sim. No teste de checkout mais recente, o MAX10EMCASACOMCECILIA foi aceito. A data e os valores do teste estão em "Como testamos o cupom", nesta página.',
      },
      {
        question: 'Onde coloco o cupom na Max Titanium?',
        answer:
          'No carrinho do site oficial, no campo "Cupom de Desconto", antes de continuar para o pagamento.',
      },
      {
        question: 'O cupom dá frete grátis?',
        answer:
          'O cupom não dá frete grátis. A Max Titanium tem frete grátis a partir de um mínimo por região, de R$ 104 na capital de São Paulo a R$ 599 no Norte, e o valor conta depois do cupom. A tabela "O que acumula com o cupom" traz o mínimo de cada região.',
      },
      {
        question: 'O que fazer se o cupom MAX10EMCASACOMCECILIA não funcionar?',
        answer:
          'Lembre que o desconto varia por produto: alguns itens recebem menos de 10%, e o resumo do pedido mostra quanto cada um teve. Confira se o código foi colado no campo "Cupom de Desconto", sem espaços, no site oficial ou no app da Max Titanium; no Mercado Livre ele não vale. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.',
      },
      {
        question: 'Tem cupom Max Titanium na Black Friday?',
        answer:
          'Tem. O cupom Max Titanium MAX10EMCASACOMCECILIA dá até 10% OFF no site oficial, em todas as formas de pagamento; o percentual é menor em alguns produtos.',
      },
      {
        question: 'O cupom Max Titanium vale na Black Friday?',
        answer:
          'O cupom Max Titanium MAX10EMCASACOMCECILIA dá até 10% OFF, é o mesmo código do resto do ano e soma com as promoções do site e com o Pix. Nos produtos com preço do Max November, a linha Descontos do carrinho mostra o valor do cupom antes de pagar.',
      },
      {
        question: 'Comprar com o cupom apoia o Em Casa com Cecília?',
        answer:
          'Sim, a compra pode gerar comissão para o Em Casa com Cecília, sem custo extra para você. O desconto aparece no checkout quando o cupom é aceito.',
      },
    ],
    monthlyHighlight: {
      scope: 'no site oficial',
      note: 'O desconto chega a 10% e pode ser menor em alguns produtos',
    },
    status: 'ativo',
    featured: false,
  },
  {
    offerMode: 'discount-code',
    slug: 'dr-peanut',
    cartPrint: { article: 'cupom-dr-peanut-como-usar', src: '/images/reviews/dr-peanut/dr-peanut-cupom-03-desconto-aplicado.webp', alt: 'Resumo do carrinho da Dr. Peanut depois do cupom: código DREMCASACOMCECILIA aceito, Subtotal de R$ 440,16, Descontos de R$ 44,02 e Total de R$ 396,14', aspectRatio: 1.042 },
    brand: 'Dr. Peanut',
    officialUrl: 'https://www.drpeanut.com.br/',
    offerUrl: 'https://www.drpeanut.com.br/',
    brandIcon: 'DP',
    brandLogo: '/images/about/partners/dr-peanut-icon.png',
    brandLogoAlt: 'Marca Dr. Peanut',
    bubble: { src: '/images/logos/bolinhas/dr-peanut.png' },
    brandWatermark: '/images/logos/watermarks/dr-peanut.webp',
    brandColor: '#FF7300',
    code: 'DREMCASACOMCECILIA',
    discount: '10% OFF',
    discountNumber: 10,
    category: 'Pastas de amendoim e snacks',
    hubCategory: 'saude',
    shortDescription: 'todo o site Dr. Peanut, com todas as formas de pagamento',
    longDescription:
      'O cupom Dr. Peanut DREMCASACOMCECILIA dá 10% OFF em todo o site, para quem compra pela primeira vez e para quem já é cliente, testado com uma pasta de amendoim em promoção: soma com as promoções e vale em todas as formas de pagamento.',
    metaTitle: 'Cupom Dr. Peanut: 10% OFF com DREMCASACOMCECILIA',
    metaTitleMonth: true,
    metaDescription:
      'Cupom Dr. Peanut: DREMCASACOMCECILIA dá 10% OFF em todo o site para cliente novo ou antigo, inclusive em promoção, e vale no Pix e no cartão.',
    eligibleCategories: 'Todos os produtos do site oficial da Dr. Peanut',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping:
      'Frete grátis a partir de R$ 149,90 no Sul e no Sudeste e de R$ 199,90 no Centro-Oeste, no Norte e no Nordeste, segundo a política de frete da loja; o valor conta depois do cupom',
    combinable: 'Soma com as promoções vigentes do site e vale com todas as formas de pagamento',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Os 10% entram sobre o preço promocional dos produtos do site' },
      { benefit: 'pix', stacks: 'sim', condition: 'Soma com o desconto do Pix, quando a loja oferece; o percentual aparece na hora do pagamento' },
      { benefit: 'frete', stacks: 'depende', condition: 'Grátis a partir de R$ 149,90 no Sul e no Sudeste e de R$ 199,90 nas demais regiões; o valor conta depois do cupom' },
    ],
    lastVerified: '2026-11-12',
    testedAt: '2026-11-12',
    testNote:
      'Aplicamos o DREMCASACOMCECILIA num carrinho com seis pastas de amendoim de R$ 25,89, R$ 155,34 no total, e os itens caíram para R$ 139,80, com R$ 15,54 de desconto, os 10%. Com entrega em São Paulo, o carrinho tinha frete grátis antes do cupom e passou a pagar R$ 12,23 de frete depois dele. Em 11/11/2026, numa pasta sabor avelã de 250 g em promoção, de R$ 28,90 por R$ 25,89, o total caiu para R$ 23,30: os 10% entraram sobre o preço promocional.',
    aboutBrand:
      'A Dr. Peanut é uma marca paranaense de pastas de amendoim, com sabores doces como Bombom Italiano e linha de alfajores, snacks e whey protein vendidos no site oficial. O cupom DREMCASACOMCECILIA é o benefício da parceria para quem acompanha o Em Casa com Cecília: dá 10% OFF em todo o site, com qualquer forma de pagamento, e soma com as promoções vigentes. A recomendação é conferir o resumo do pedido antes de finalizar.',
    faqs: [
      {
        question: 'O cupom DREMCASACOMCECILIA vale para todos os produtos da Dr. Peanut?',
        answer: 'Sim. O DREMCASACOMCECILIA dá 10% OFF em todos os produtos do site oficial da Dr. Peanut.',
      },
      {
        question: 'O cupom DREMCASACOMCECILIA vale no Pix, no cartão e em outras formas de pagamento?',
        answer:
          'Sim. O cupom vale com todas as formas de pagamento disponíveis no checkout, e o desconto de 10% não depende do meio escolhido.',
      },
      {
        question: 'O cupom DREMCASACOMCECILIA vale na primeira compra na Dr. Peanut?',
        answer: 'Sim. O DREMCASACOMCECILIA vale na primeira compra e também para quem já comprou na loja.',
      },
      {
        question: 'Qual cupom Dr. Peanut dá 10% para quem já é cliente?',
        answer:
          'O DREMCASACOMCECILIA. Ele dá 10% em todo o site para quem compra pela primeira vez e para quem já comprou.',
      },
      {
        question: 'Existe cupom Dr. Peanut de 15%?',
        answer:
          'Com código, o desconto que testamos é o do DREMCASACOMCECILIA: 10% em todo o site. Não testamos os códigos de 15% que aparecem em sites de cupom. Nos produtos em promoção, o cupom soma: no teste, os 10% entraram sobre o preço promocional de uma pasta de amendoim.',
      },
      {
        question: 'O cupom DREMCASACOMCECILIA vale no Mercado Livre?',
        answer:
          'Não. O DREMCASACOMCECILIA é usado no checkout do site oficial da Dr. Peanut e não vale no Mercado Livre nem em outros marketplaces. Pelo Mercado Livre, vale o preço do anúncio, sem o cupom.',
        mercadoLivreUrl: 'https://meli.la/1wNsKJB',
      },
      {
        question: 'A Dr. Peanut tem aplicativo?',
        answer:
          'Não. A Dr. Peanut vende pelo site oficial, que funciona no navegador do celular. É lá que o DREMCASACOMCECILIA vale: digite o código no campo de cupom, antes de pagar.',
      },
      {
        question: 'O cupom soma com produtos em promoção?',
        answer:
          'Sim. Nos nossos testes, os 10% entraram numa pasta de amendoim que já estava em promoção: de R$ 25,89 por R$ 23,30.',
      },
      {
        question: 'O cupom DREMCASACOMCECILIA está funcionando hoje?',
        answer:
          'Sim. No teste de checkout mais recente, o DREMCASACOMCECILIA aplicou os 10%. A data e os valores do teste estão em "Como testamos o cupom", nesta página.',
      },
      {
        question: 'A Dr. Peanut tem frete grátis?',
        answer:
          'Sim, com valor mínimo por região: a partir de R$ 149,90 no Sul e no Sudeste e de R$ 199,90 no Centro-Oeste, no Norte e no Nordeste, segundo a política de frete da loja. O valor conta depois do cupom: no nosso teste, com entrega em São Paulo, um carrinho de R$ 155,34 tinha frete grátis e, com o cupom, caiu para R$ 139,80 e passou a pagar R$ 12,23 de frete.',
      },
      {
        question: 'O que fazer se o cupom DREMCASACOMCECILIA não funcionar?',
        answer:
          'Confira se o código foi digitado sem espaços no campo de cupom do site oficial da Dr. Peanut. Ele vale em todos os produtos e soma com as promoções; no Mercado Livre ele não vale. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.',
      },
      {
        question: 'Tem cupom Dr. Peanut na Black Friday?',
        answer:
          'Tem. O cupom Dr. Peanut DREMCASACOMCECILIA dá 10% OFF em todo o site oficial, em todas as formas de pagamento, e é o mesmo código do resto do ano.',
      },
      {
        question: 'O cupom Dr. Peanut vale na Black Friday?',
        answer:
          'O cupom Dr. Peanut DREMCASACOMCECILIA dá 10% OFF e soma com as promoções do site, inclusive em produto que já está em promoção. Se a loja abrir campanha de Black Friday, o carrinho mostra se ele soma com a oferta.',
      },
      {
        question: 'Comprar com o cupom apoia o Em Casa com Cecília?',
        answer:
          'Sim, a compra pode gerar comissão para o Em Casa com Cecília, sem custo extra para você. O desconto aparece no checkout quando o cupom é aceito.',
      },
    ],
    monthlyHighlight: {
      scope: 'em todo o site',
      note: 'Vale com todas as formas de pagamento e soma com as promoções vigentes',
    },
    status: 'ativo',
    featured: false,
  },
  {
    offerMode: 'discount-code',
    slug: 'black-skull',
    cartPrint: { article: 'cupom-black-skull-como-usar', src: '/images/reviews/black-skull/black-skull-cupom-03-desconto-aplicado.webp', alt: 'Quadro da sacola da Black Skull depois do Adicionar, com CECILIA10 aplicado, Descontos de R$ -36,44 e total de R$ 327,89', aspectRatio: 0.848 },
    brand: 'Black Skull',
    officialUrl: 'https://www.blackskullusa.com.br/',
    offerUrl: 'https://www.blackskullusa.com.br/',
    brandIcon: 'BS',
    brandLogo: '/images/about/partners/black-skull-icon.png',
    brandLogoAlt: 'Marca Black Skull',
    bubble: { src: '/images/logos/bolinhas/black-skull.png', background: '#FF9601' },
    brandWatermark: '/images/logos/watermarks/black-skull.webp',
    brandColor: '#1C1C1E',
    code: 'CECILIA10',
    discount: '10% OFF',
    discountNumber: 10,
    category: 'Suplementos e nutrição esportiva',
    hubCategory: 'saude',
    shortDescription: 'todo o site Black Skull, com todas as formas de pagamento',
    longDescription:
      'O cupom Black Skull CECILIA10 dá 10% OFF em todo o site, para quem compra pela primeira vez e para quem já é cliente, testado com um kit de whey em promoção: soma com as promoções e vale em todas as formas de pagamento.',
    metaTitle: 'Cupom Black Skull: 10% OFF em tudo com CECILIA10',
    metaTitleMonth: true,
    metaDescription:
      'Cupom Black Skull: CECILIA10 dá 10% OFF em todo o site para cliente novo ou antigo, inclusive em promoção, e vale no Pix e no cartão.',
    eligibleCategories: 'Todos os produtos do site oficial da Black Skull',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping: 'Frete grátis acima de R$ 199,90 no Sul e no Sudeste, de R$ 249,90 no Centro-Oeste e de R$ 299,90 nas demais regiões, segundo a política de entrega da loja; vale o total do carrinho já com os descontos',
    combinable: 'Soma com as promoções vigentes do site e vale com todas as formas de pagamento',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Os 10% entram sobre o preço promocional dos produtos do site' },
      { benefit: 'pix', stacks: 'sim', condition: 'Soma com o desconto do Pix, quando a loja oferece; o percentual aparece na hora do pagamento' },
      { benefit: 'frete', stacks: 'depende', condition: 'Grátis acima de R$ 199,90 no Sul e no Sudeste, de R$ 249,90 no Centro-Oeste e de R$ 299,90 nas demais regiões, sobre o total já com os descontos' },
    ],
    paymentPerks: [
      'Até 8x sem juros no cartão, com parcela mínima de R$ 50',
      'Pix parcelado em 4x sem juros, com a primeira parcela na hora e as outras a cada 15 dias',
    ],
    lastVerified: '2026-11-11',
    testedAt: '2026-11-11',
    testNote:
      'Aplicamos o CECILIA10 num kit de 2 wheys Turbo de 907 g em promoção, de R$ 139,80 por R$ 132,81, e o total caiu para R$ 119,53, com R$ 13,28 de desconto: os 10% entraram sobre o preço promocional.',
    aboutBrand:
      'A Black Skull é uma marca de suplementos para quem treina, com whey protein, creatina, pré-treinos, aminoácidos como glutamina e roupas de treino vendidos no site oficial. O cupom CECILIA10 é o benefício da parceria para quem acompanha o Em Casa com Cecília: dá 10% OFF em todo o site, com qualquer forma de pagamento, e soma com as promoções vigentes. A recomendação é conferir o resumo do pedido antes de finalizar.',
    faqs: [
      {
        question: 'O cupom CECILIA10 vale para todos os produtos da Black Skull?',
        answer: 'Sim. O CECILIA10 dá 10% OFF em todos os produtos do site oficial da Black Skull, inclusive kits e roupas.',
      },
      {
        question: 'O cupom CECILIA10 vale no Pix, no cartão e em outras formas de pagamento?',
        answer:
          'Sim. O cupom vale com todas as formas de pagamento disponíveis no checkout, e o desconto de 10% não depende do meio escolhido.',
      },
      {
        question: 'O cupom CECILIA10 vale na primeira compra na Black Skull?',
        answer: 'Sim. O CECILIA10 vale na primeira compra e também para quem já comprou na loja.',
      },
      {
        question: 'Qual cupom Black Skull dá 10% para quem já é cliente?',
        answer:
          'O CECILIA10. Ele dá 10% em todo o site para quem compra pela primeira vez e para quem já comprou.',
      },
      {
        question: 'O cupom CECILIA10 vale no Mercado Livre?',
        answer:
          'Não. O CECILIA10 é usado no checkout do site oficial da Black Skull e não vale no Mercado Livre nem em outros marketplaces. Pelo Mercado Livre, vale o preço do anúncio, sem o cupom.',
        mercadoLivreUrl: 'https://meli.la/1R7Zwan',
      },
      {
        question: 'O cupom CECILIA10 vale no app da Black Skull?',
        answer:
          'Sim. O CECILIA10 vale no aplicativo Black Skull USA, para Android e iPhone, do mesmo jeito que no site oficial: digite o código no campo de cupom, antes de pagar.',
      },
      {
        question: 'O cupom soma com produtos em promoção?',
        answer:
          'Sim. No nosso teste mais recente, os 10% entraram num kit de whey que já estava em promoção: de R$ 132,81 por R$ 119,53.',
      },
      {
        question: 'O cupom CECILIA10 está funcionando hoje?',
        answer:
          'Sim. No teste de checkout mais recente, o CECILIA10 aplicou os 10% no carrinho. A data e os valores do teste estão em "Como testamos o cupom", nesta página.',
      },
      {
        question: 'O cupom dá frete grátis?',
        answer:
          'O cupom não dá frete grátis. A Black Skull tem frete grátis acima de R$ 199,90 no Sul e no Sudeste, de R$ 249,90 no Centro-Oeste e de R$ 299,90 nas demais regiões, sobre o total do carrinho já com os descontos.',
      },
      {
        question: 'O que fazer se o cupom CECILIA10 não funcionar?',
        answer:
          'Confira se o código foi digitado sem espaços no campo de cupom do site oficial ou do app Black Skull USA. Ele vale em todos os produtos e soma com as promoções; no Mercado Livre ele não vale. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.',
      },
      {
        question: 'Tem cupom Black Skull na Black Friday?',
        answer:
          'Tem. O cupom Black Skull CECILIA10 dá 10% OFF em todo o site, em todas as formas de pagamento, e é o mesmo código do resto do ano.',
      },
      {
        question: 'O cupom Black Skull vale na Black Friday?',
        answer:
          'O cupom Black Skull CECILIA10 dá 10% OFF em todo o site e soma com as promoções vigentes e com o desconto progressivo. Na Black Friday, a linha Descontos da sacola mostra o valor abatido antes de pagar.',
      },
      {
        question: 'Comprar com o cupom apoia o Em Casa com Cecília?',
        answer:
          'Sim, a compra pode gerar comissão para o Em Casa com Cecília, sem custo extra para você. O desconto aparece no checkout quando o cupom é aceito.',
      },
    ],
    monthlyHighlight: {
      scope: 'em todo o site',
      note: 'Vale com todas as formas de pagamento e soma com as promoções vigentes',
    },
    status: 'ativo',
    featured: false,
  },
  {
    offerMode: 'affiliate-link',
    slug: 'lejour',
    brand: 'Lejour',
    officialUrl: 'https://lejour.com.br/',
    offerUrl: 'https://painel.lejour.com.br/onboarding/inicio?affiliate=emcasacomcecilia&source=the-coachers',
    brandIcon: 'LJ',
    brandLogo: '/images/about/partners/lejour-icon.png',
    brandLogoAlt: 'Marca Lejour',
    bubble: { src: '/images/logos/bolinhas/lejour.png', background: '#E2645A' },
    brandWatermark: '/images/logos/watermarks/lejour.webp',
    brandColor: '#E2645A',
    discount: 'Lista grátis',
    offerTypeLabel: 'indicação',
    offerTypeLabelPlural: 'indicações',
    offerActionLabel: 'Criar a lista na Lejour',
    category: 'Lista de casamento e site dos noivos',
    hubCategory: 'casa',
    shortDescription: 'site do casamento e lista de presentes, com plano gratuito',
    longDescription:
      'Indicação da Cecília para casais que vão montar o site do casamento e a lista de presentes na Lejour. O cadastro é pelo link, e o plano Basic é gratuito.',
    metaTitle: 'Lejour: lista de casamento grátis e planos — indicação da Cecília',
    metaDescription:
      'Lista de casamento e site dos noivos na Lejour: o plano Basic é gratuito, e Premium e Pro são pagos uma vez. Veja as taxas e crie a lista pelo link da Cecília.',
    eligibleCategories: 'Cadastro de casais no site da Lejour: site do casamento e lista de presentes',
    validity: 'Indicação ativa enquanto a parceria estiver vigente',
    reusable: 'Não se aplica: é um cadastro, não um cupom',
    shipping: 'Não se aplica',
    combinable: 'Não há desconto para somar: o cadastro pelo link é uma indicação, sem benefício extra',
    lastVerified: '2026-10-13',
    linkInstructions: [
      'Abra o cadastro da Lejour pelo botão indicado.',
      'Crie a conta do casal pelo próprio link: a indicação só conta para cadastros feitos por ele.',
      'Escolha o plano: o Basic é gratuito; o Premium e o Pro são pagos uma única vez, à vista ou em até 12x.',
      'Monte o site do casamento e a lista de presentes e compartilhe com os convidados.',
    ],
    linkNote:
      'A indicação não dá desconto nem benefício extra: o cadastro e os planos são os mesmos do site da Lejour.',
    aboutBrand:
      'A Lejour é uma plataforma brasileira de casamento: o casal monta o site do evento e a lista de presentes, e os convidados presenteiam pelo próprio site. O plano Basic é gratuito; o Premium e o Pro são pagos uma única vez e baixam a taxa da lista de presentes, liberam saques ilimitados e incluem domínio personalizado. O cadastro pelo link é uma indicação do Em Casa com Cecília: não dá desconto, e as condições são as mesmas do site da Lejour.',
    faqs: [
      {
        question: 'Tem cupom de desconto da Lejour?',
        answer:
          'Não. O link da Cecília é uma indicação: o cadastro, os planos e as taxas são os mesmos do site da Lejour, sem desconto extra.',
      },
      {
        question: 'A lista de casamento da Lejour é grátis?',
        answer:
          'Sim, no plano Basic. Em 13/10/2026, ele não tinha mensalidade, cobrava 3,89% de taxa sobre os presentes e dava até 2 saques gratuitos.',
      },
      {
        question: 'Quanto custam os planos Premium e Pro da Lejour?',
        answer:
          'Em 13/10/2026, o Premium custava R$ 99,90 (de R$ 179,90) e o Pro, R$ 199,90, ambos vitalícios, pagos uma única vez ou em até 12x. A taxa da lista cai para 3,29% no Premium e 2,99% no Pro, os saques ficam ilimitados e o domínio personalizado (.site) vem incluso; no Basic, ele custa R$ 69,90.',
      },
      {
        question: 'Como faço o cadastro pela indicação da Cecília?',
        answer:
          'Abra o cadastro pelo botão desta página e crie a conta do casal por ele. A indicação só conta para cadastros feitos pelo link.',
      },
      {
        question: 'Fazer o cadastro pelo link apoia o Em Casa com Cecília?',
        answer:
          'Sim, a indicação pode gerar comissão para o Em Casa com Cecília, sem custo extra para o casal.',
      },
    ],
    status: 'ativo',
    featured: false,
  },
  {
    offerMode: 'discount-code',
    slug: 'clea-store',
    cartPrint: { article: 'cupom-clea-store-como-usar', src: '/images/reviews/clea-store/clea-store-cupom-03-desconto-aplicado.webp', alt: 'Checkout da Cléa Store depois do cupom, com a linha Desconto de menos R$ 25,80, o Cupom aplicado CSEMCASACOMCECILIA e o cashback de até R$ 23,22', aspectRatio: 0.931 },
    brand: 'Cléa Store',
    officialUrl: 'https://www.cleastore.com.br/',
    offerUrl: 'https://www.cleastore.com.br/',
    brandIcon: 'CS',
    brandLogo: '/images/about/partners/clea-store-icon.png',
    brandLogoAlt: 'Marca Cléa Store',
    bubble: { src: '/images/logos/bolinhas/clea-store.png' },
    brandWatermark: '/images/logos/watermarks/clea-store.webp',
    brandColor: '#111111',
    code: 'CSEMCASACOMCECILIA',
    discount: '10% OFF',
    discountNumber: 10,
    category: 'Moda feminina',
    hubCategory: 'moda',
    shortDescription: 'todo o site Cléa Store, com todas as formas de pagamento',
    longDescription:
      'O cupom Cléa Store CSEMCASACOMCECILIA dá 10% OFF em todo o site (alfaiataria, blusas, vestidos e t-shirts), para quem compra pela primeira vez e para quem já é cliente, testado num kit em promoção: o desconto soma com a promoção.',
    metaTitle: 'Cupom Cléa Store: 10% OFF com CSEMCASACOMCECILIA',
    metaTitleMonth: true,
    metaDescription:
      'Cupom Cléa Store: CSEMCASACOMCECILIA dá 10% OFF em todo o site para cliente novo ou antigo, soma com promoções e cashback e vale no Pix e no cartão.',
    eligibleCategories: 'Todos os produtos do site oficial da Cléa Store',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping: 'Frete grátis acima de R$ 599, segundo o aviso do site; abaixo disso, conforme a política da loja',
    combinable:
      'Soma com as promoções vigentes do site e com o cashback da loja, e vale com todas as formas de pagamento',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Os 10% entram sobre o preço de campanha e de promoção dos produtos' },
      { benefit: 'pix', stacks: 'sim', condition: 'Soma com o desconto do Pix, quando a loja oferece; o percentual aparece na hora do pagamento' },
      { benefit: 'cashback', stacks: 'sim', condition: 'O pedido com o cupom continua gerando cashback, calculado sobre o valor já com o desconto' },
      { benefit: 'frete', stacks: 'depende', condition: 'Grátis acima de R$ 599, segundo o aviso do site; abaixo disso, o frete é calculado no checkout' },
    ],
    paymentPerks: [
      'Até 12x no cartão, sendo até 4x sem juros, com parcela mínima de R$ 10',
    ],
    lastVerified: '2026-11-12',
    testedAt: '2026-11-08',
    testNote:
      'Aplicamos o CSEMCASACOMCECILIA no Kit 3 T-Shirts Oversized Classic, de R$ 387,00 por R$ 199,00 na campanha, e o carrinho caiu para R$ 179,10. Com um vestido de R$ 697,00, a R$ 487,90 com 30% OFF, o subtotal de R$ 686,90 teve R$ 68,69 de desconto e fechou em R$ 618,21: os 10% entraram sobre os preços da campanha.',
    aboutBrand:
      'A Cléa Store é uma marca brasileira de moda feminina, com alfaiataria, blusas, camisas, vestidos, conjuntos, t-shirts e acessórios vendidos no site oficial. O cupom CSEMCASACOMCECILIA é o benefício da parceria para quem acompanha o Em Casa com Cecília: dá 10% OFF em todo o site, com qualquer forma de pagamento, e soma com as promoções e com o cashback da loja. A recomendação é conferir o resumo do pedido antes de finalizar.',
    faqs: [
      {
        question: 'O cupom CSEMCASACOMCECILIA vale para todos os produtos da Cléa Store?',
        answer: 'Sim. O CSEMCASACOMCECILIA dá 10% OFF em todos os produtos do site oficial da Cléa Store.',
      },
      {
        question: 'O cupom CSEMCASACOMCECILIA vale no Pix, no cartão e em outras formas de pagamento?',
        answer:
          'Sim. O cupom vale com todas as formas de pagamento disponíveis no checkout, e o desconto de 10% não depende do meio escolhido.',
      },
      {
        question: 'O cupom CSEMCASACOMCECILIA vale na primeira compra na Cléa Store?',
        answer: 'Sim. O CSEMCASACOMCECILIA vale na primeira compra e também para quem já comprou na loja.',
      },
      {
        question: 'Qual cupom Cléa Store dá 10% para quem já é cliente?',
        answer:
          'O CSEMCASACOMCECILIA. Ele dá 10% em todo o site para quem compra pela primeira vez e para quem já comprou.',
      },
      {
        question: 'O cupom CSEMCASACOMCECILIA vale no Mercado Livre?',
        answer:
          'Não. O CSEMCASACOMCECILIA é usado no checkout do site oficial da Cléa Store e não vale no Mercado Livre nem em outros marketplaces. Pelo Mercado Livre, vale o preço do anúncio, sem o cupom.',
        mercadoLivreUrl: 'https://meli.la/1t3kn5d',
      },
      {
        question: 'A Cléa Store tem aplicativo?',
        answer:
          'Não. A Cléa Store vende pelo site oficial, que funciona no navegador do celular e tem busca para achar os produtos. É lá que o CSEMCASACOMCECILIA vale: digite o código no campo de cupom, antes de pagar.',
      },
      {
        question: 'O cupom soma com produtos em promoção?',
        answer:
          'Sim. No nosso teste mais recente, os 10% entraram num kit de t-shirts que já estava com preço de campanha: de R$ 199,00 por R$ 179,10.',
      },
      {
        question: 'O cupom soma com o cashback da Cléa Store?',
        answer:
          'Sim. No teste de 14/10/2026, o pedido com o cupom aplicado continuou gerando cashback, calculado sobre o valor já com o desconto.',
      },
      {
        question: 'O cupom CSEMCASACOMCECILIA está funcionando hoje?',
        answer:
          'Sim. No teste de checkout mais recente, o CSEMCASACOMCECILIA aplicou os 10%. A data e os valores do teste estão em "Como testamos o cupom", nesta página.',
      },
      {
        question: 'A Cléa Store tem frete grátis?',
        answer:
          'O site anuncia frete grátis acima de R$ 599. Abaixo disso, o frete é calculado pela loja no checkout.',
      },
      {
        question: 'O que fazer se o cupom CSEMCASACOMCECILIA não funcionar?',
        answer:
          'Confira se o código foi digitado sem espaços no campo de cupom do site oficial da Cléa Store. Ele vale em todos os produtos e soma com as promoções e com o cashback da loja; no Mercado Livre ele não vale. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.',
      },
      {
        question: 'Tem cupom Cléa Store na Black Friday?',
        answer:
          'Tem. O cupom Cléa Store CSEMCASACOMCECILIA dá 10% OFF em todo o site, em todas as formas de pagamento, e é o mesmo código do resto do ano.',
      },
      {
        question: 'O cupom Cléa Store vale na Black Friday?',
        answer:
          'Vale. O cupom Cléa Store CSEMCASACOMCECILIA dá 10% OFF sobre os preços da Black Friday: no nosso teste com a campanha no ar, entrou num kit e num vestido que já tinham o desconto da campanha. Os termos da loja preveem exceções: confira a linha Desconto antes de pagar.',
      },
      {
        question: 'Comprar com o cupom apoia o Em Casa com Cecília?',
        answer:
          'Sim, a compra pode gerar comissão para o Em Casa com Cecília, sem custo extra para você. O desconto aparece no checkout quando o cupom é aceito.',
      },
    ],
    monthlyHighlight: {
      scope: 'em todo o site',
      note: 'Vale com todas as formas de pagamento e soma com as promoções e o cashback',
    },
    status: 'ativo',
    featured: false,
  },
  {
    offerMode: 'discount-code',
    slug: 'belive',
    cartPrint: { article: 'cupom-belive-como-usar', src: '/images/reviews/belive/cupom-belive-resumo-desconto.webp', alt: 'Resumo do pedido da Belive depois do cupom, com o desconto de R$ 57,68, o total de R$ 519,14 e o total no Pix de R$ 493,18 marcados em amarelo', aspectRatio: 1.24 },
    brand: 'Belive',
    officialUrl: 'https://belivebefree.com.br/',
    offerUrl: 'https://belivebefree.com.br/',
    brandIcon: 'BL',
    brandLogo: '/images/about/partners/belive-icon.png',
    brandLogoAlt: 'Marca Belive',
    bubble: { src: '/images/logos/bolinhas/belive.png' },
    brandWatermark: '/images/logos/watermarks/belive.webp',
    brandColor: '#000000',
    code: 'MAUAD',
    discount: '10% OFF',
    discountNumber: 10,
    category: 'Doces, snacks e pães sem glúten',
    hubCategory: 'alimentacao',
    shortDescription: 'todo o site Belive, com todas as formas de pagamento',
    longDescription:
      'O cupom Belive MAUAD dá 10% OFF em todo o site, para quem compra pela primeira vez e para quem já é cliente, e soma com as ofertas e com os 5% do Pix. Testado num combo de pão de batata em oferta.',
    metaTitle: 'Cupom Belive: 10% OFF em tudo e soma com o Pix',
    metaTitleMonth: true,
    metaDescription:
      'Cupom Belive: use MAUAD e ganhe 10% OFF em todo o site, cliente novo ou antigo, somando com as ofertas e com os 5% de desconto do Pix.',
    eligibleCategories: 'Todos os produtos do site oficial da Belive',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping:
      'Frete grátis por região, segundo as regras de frete da loja: acima de R$ 170 em SP, MG, RJ, DF e GO, de R$ 250 no Sul e de R$ 300 nos demais estados; abaixo disso, o frete é calculado no checkout',
    combinable:
      'Soma com as promoções vigentes do site e com os 5% de desconto do Pix, e vale com todas as formas de pagamento',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Os 10% entram sobre o preço da oferta' },
      { benefit: 'pix', stacks: 'sim', condition: 'O carrinho com o cupom ainda ganha os 5% de desconto do Pix' },
      { benefit: 'frete', stacks: 'depende', condition: 'Grátis acima de R$ 170 em SP, MG, RJ, DF e GO, de R$ 250 no Sul e de R$ 300 nos demais estados' },
    ],
    paymentPerks: [
      'Até 2x sem juros no cartão',
    ],
    lastVerified: '2026-11-12',
    testedAt: '2026-11-12',
    testNote:
      'Com a Black November no ar, aplicamos o MAUAD em quatro pães de cenoura com o preço da campanha, de R$ 20,90 por R$ 14,63 cada, e o total caiu de R$ 58,52 para R$ 52,67, com R$ 5,85 de desconto: os 10% entraram sobre o preço da campanha, e o Pix ainda tirou os 5% dele. Em 11/11/2026, num combo de seis pacotes de pão de batata em oferta, de R$ 125,40 por R$ 106,59, o total caiu para R$ 95,93.',
    codeInstructions: [
      'Copie o código MAUAD no card acima.',
      'Acesse o site oficial da Belive pelo botão indicado e coloque os produtos no carrinho.',
      'No carrinho, cole o código no campo "Código do cupom" e clique em "Aplicar cupom".',
      'Confira os 10% de desconto no total do carrinho; no Pix, a loja ainda tira 5%.',
    ],
    aboutBrand:
      'A Belive é uma marca brasileira de alimentos sem glúten, sem leite e sem lactose, com doces sem açúcar, snacks, brownies proteicos e pães vendidos no site oficial. O cupom MAUAD é o benefício da parceria para quem acompanha o Em Casa com Cecília: dá 10% OFF em todo o site, com qualquer forma de pagamento, e soma com as ofertas e com o desconto de 5% do Pix. A recomendação é conferir o resumo do pedido antes de finalizar.',
    faqs: [
      {
        question: 'O cupom MAUAD vale para todos os produtos da Belive?',
        answer: 'Sim. O MAUAD dá 10% OFF em todos os produtos do site oficial da Belive, inclusive combos e kits.',
      },
      {
        question: 'O site oficial da Belive é belivebefree.com.br?',
        answer:
          'Sim. O site oficial é belivebefree.com.br, e o nome da marca é Belive, com um "e" só, não "Believe". É lá que o cupom MAUAD dá 10% OFF em todo o site.',
      },
      {
        question: 'O cupom MAUAD soma com o desconto do Pix?',
        answer:
          'Sim. No nosso teste, o carrinho com o MAUAD aplicado ainda ganhou os 5% de desconto do Pix: R$ 519,14 viraram R$ 493,18.',
      },
      {
        question: 'O cupom soma com produtos em promoção?',
        answer:
          'Sim. No nosso teste mais recente, os 10% entraram num combo que já estava em oferta: de R$ 106,59 por R$ 95,93.',
      },
      {
        question: 'O cupom MAUAD vale na primeira compra na Belive?',
        answer: 'Sim. O MAUAD vale na primeira compra e também para quem já comprou na loja.',
      },
      {
        question: 'Qual cupom Belive dá 10% para quem já é cliente?',
        answer:
          'O MAUAD. Ele dá 10% em todo o site da Belive para quem compra pela primeira vez e para quem já comprou.',
      },
      {
        question: 'O cupom MAUAD vale no Mercado Livre?',
        answer:
          'Não. O MAUAD é usado no checkout do site oficial da Belive e não vale no Mercado Livre nem em outros marketplaces. Pelo Mercado Livre, vale o preço do anúncio, sem o cupom.',
        mercadoLivreUrl: 'https://meli.la/2xDjP2k',
      },
      {
        question: 'A Belive tem aplicativo?',
        answer:
          'Não. A Belive vende pelo site oficial, que funciona no navegador do celular e tem busca para achar os produtos. É lá que o MAUAD vale: digite o código no campo de cupom, antes de pagar.',
      },
      {
        question: 'O cupom MAUAD está funcionando hoje?',
        answer:
          'Sim. No teste de checkout mais recente, o MAUAD aplicou os 10% no carrinho. A data e os valores do teste estão em "Como testamos o cupom", nesta página.',
      },
      {
        question: 'Onde coloco o cupom na Belive?',
        answer: 'No carrinho do site oficial, no campo "Código do cupom", e depois em "Aplicar cupom".',
      },
      {
        question: 'A Belive tem frete grátis?',
        answer:
          'Sim, com valor mínimo por região. As regras de frete da loja dão frete grátis acima de R$ 170 em SP, MG, RJ, DF e GO, acima de R$ 250 no Sul e acima de R$ 300 nos demais estados. Abaixo disso, o frete é calculado no checkout.',
      },
      {
        question: 'O que fazer se o cupom MAUAD não funcionar?',
        answer:
          'Confira se o código foi colado no campo "Código do cupom" do carrinho, sem espaços, e se você clicou em "Aplicar cupom". Ele vale em todos os produtos do site oficial belivebefree.com.br; no Mercado Livre ele não vale. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.',
      },
      {
        question: 'Tem cupom Belive na Black Friday?',
        answer:
          'Tem. O cupom Belive MAUAD dá 10% OFF em todo o site oficial, em todas as formas de pagamento, e é o mesmo código do resto do ano.',
      },
      {
        question: 'O cupom Belive vale na Black Friday?',
        answer:
          'Vale. O cupom Belive MAUAD dá 10% OFF e soma com os preços da Black November, a campanha da loja: no nosso teste, entrou sobre um produto da campanha, e o Pix ainda deu os 5% dele.',
      },
      {
        question: 'Comprar com o cupom apoia o Em Casa com Cecília?',
        answer:
          'Sim, a compra pode gerar comissão para o Em Casa com Cecília, sem custo extra para você. O desconto aparece no checkout quando o cupom é aceito.',
      },
    ],
    monthlyHighlight: {
      scope: 'em todo o site',
      note: 'Vale com todas as formas de pagamento e soma com as ofertas e o desconto do Pix',
    },
    status: 'ativo',
    featured: false,
  },
  {
    offerMode: 'discount-code',
    slug: 'mais-mu',
    cartPrint: { article: 'cupom-mais-mu-como-usar', src: '/images/reviews/mais-mu/mais-mu-cupom-03-desconto-aplicado.webp', alt: 'Resumo do pedido com o cupom aplicado: subtotal de R$ 239,89, Desconto do cupom de R$ 23,99, total de R$ 215,90 e Cupom MMEMCASACOMCECILIA', aspectRatio: 1.017 },
    brand: 'Mais Mu',
    officialUrl: 'https://www.lojamaismu.com.br/',
    offerUrl: 'https://www.lojamaismu.com.br/',
    brandIcon: 'MU',
    brandLogo: '/images/about/partners/mais-mu-icon.png',
    brandLogoAlt: 'Marca Mais Mu',
    bubble: { src: '/images/logos/bolinhas/mais-mu.png', background: '#00A0E3' },
    brandWatermark: '/images/logos/watermarks/mais-mu.webp',
    brandColor: '#06A1E2',
    code: 'MMEMCASACOMCECILIA',
    discount: '10% OFF',
    discountNumber: 10,
    category: 'Whey, creatina, pré-treino e snacks proteicos',
    hubCategory: 'saude',
    shortDescription: 'todo o site Mais Mu, com todas as formas de pagamento',
    longDescription:
      'O cupom Mais Mu MMEMCASACOMCECILIA dá 10% OFF em todo o site, para quem compra pela primeira vez e para quem já é cliente, soma com as ofertas e com os 3% do Pix, e vale em todas as formas de pagamento. Testado num carrinho com wheys e creatina em promoção.',
    metaTitle: 'Cupom Mais Mu: 10% OFF com MMEMCASACOMCECILIA',
    metaTitleMonth: true,
    metaDescription:
      'Cupom Mais Mu: MMEMCASACOMCECILIA dá 10% OFF em todo o site para cliente novo ou antigo, soma com as ofertas e com os 3% do Pix.',
    eligibleCategories: 'Todos os produtos do site oficial da Mais Mu',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping:
      'Frete grátis acima de R$ 299 no Sul, Sudeste e Centro-Oeste e acima de R$ 399 no Norte e Nordeste, segundo o aviso do site; abaixo disso, o frete é calculado no checkout',
    combinable:
      'Soma com as promoções vigentes do site e com os 3% de desconto do Pix, e vale com todas as formas de pagamento; não soma com outro cupom, como o crédito do cashback ou o desconto de boas-vindas',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Os 10% entram sobre os produtos que já estão em promoção' },
      { benefit: 'pix', stacks: 'sim', condition: 'No Pix, a Mais Mu ainda tira os 3% de desconto dela' },
      { benefit: 'cashback', stacks: 'depende', condition: 'A compra com o cupom gera cashback acima de R$ 250 já com o desconto; o crédito do cashback não vale junto com o cupom' },
      { benefit: 'outro-cupom', stacks: 'nao', condition: 'A loja não acumula cupons no mesmo pedido' },
      { benefit: 'frete', stacks: 'depende', condition: 'Grátis acima de R$ 299 no Sul, Sudeste e Centro-Oeste e acima de R$ 399 no Norte e Nordeste' },
    ],
    paymentPerks: [
      'Até 3x sem juros no cartão',
    ],
    lastVerified: '2026-11-12',
    testedAt: '2026-11-11',
    testNote:
      'Aplicamos o MMEMCASACOMCECILIA num carrinho com uma creatina refil de 500 g, de R$ 119,90 por R$ 74,90, e dois wheys Paçoquita de 450 g, de R$ 159,99 por R$ 135,99 cada. O subtotal de R$ 346,88 teve R$ 34,69 de desconto, os 10%, e o total caiu para R$ 312,19; a compra ainda gerou cashback.',
    codeInstructions: [
      'Copie o código MMEMCASACOMCECILIA no card acima.',
      'Acesse o site oficial da Mais Mu pelo botão indicado, coloque os produtos no carrinho e clique em "Iniciar compra".',
      'No checkout, clique em "Adicionar cupom de desconto", cole o código e aplique.',
      'Confira a linha "Desconto do cupom" no resumo do pedido antes de seguir para a entrega.',
    ],
    aboutBrand:
      'A Mais Mu é uma marca brasileira de proteína que começou com o whey "na garrafinha" e hoje vende whey concentrado, proteína vegetal, creatina, o pré-treino Exquenta, barras, Chocowheyfer e snacks salgados no site oficial. O cupom MMEMCASACOMCECILIA é o benefício da parceria para quem acompanha o Em Casa com Cecília: dá 10% OFF em todo o site, com qualquer forma de pagamento, e soma com as ofertas e com o desconto de 3% do Pix. A recomendação é conferir o resumo do pedido antes de finalizar.',
    faqs: [
      {
        question: 'O cupom MMEMCASACOMCECILIA vale para todos os produtos da Mais Mu?',
        answer: 'Sim. O MMEMCASACOMCECILIA dá 10% OFF em todos os produtos do site oficial da Mais Mu, inclusive combos.',
      },
      {
        question: 'O cupom soma com produtos em promoção?',
        answer:
          'Sim. No nosso teste mais recente, os 10% entraram num carrinho com uma creatina e dois wheys que já estavam em promoção: R$ 346,88 viraram R$ 312,19.',
      },
      {
        question: 'O cupom MMEMCASACOMCECILIA soma com o desconto do Pix?',
        answer:
          'Sim. O cupom vale com todas as formas de pagamento e, no Pix, a Mais Mu ainda tira os 3% de desconto dela.',
      },
      {
        question: 'Ganho o cashback da Mais Mu usando o cupom?',
        answer:
          'O cashback é um programa da própria Mais Mu: compras acima de R$ 250 devolvem 5% do valor como crédito para a próxima compra. No checkout de 20/10/2026, com o cupom aplicado, a loja contava os R$ 250 sobre o total já com o desconto.',
      },
      {
        question: 'Posso usar o crédito do cashback junto com o cupom?',
        answer:
          'Não. O crédito do cashback chega por e-mail como um código para o campo de cupom, e a Mais Mu não acumula cupons no mesmo pedido. O crédito vale 90 dias e pede um pedido mínimo a partir de R$ 200.',
      },
      {
        question: 'O cupom Mais Mu vale na primeira compra? É melhor que o de boas-vindas?',
        answer:
          'Vale, e o desconto é o mesmo: quem assina a newsletter da Mais Mu ganha 10% na primeira compra, o mesmo do MMEMCASACOMCECILIA. Como a loja não acumula cupons, os dois não somam. A diferença é que o MMEMCASACOMCECILIA não pede cadastro e vale também para quem já comprou.',
      },
      {
        question: 'Qual cupom Mais Mu dá 10% para quem já é cliente?',
        answer:
          'O MMEMCASACOMCECILIA. Ele dá 10% em todo o site para quem compra pela primeira vez e para quem já comprou.',
      },
      {
        question: 'Existe cupom Mais Mu de 15% ou 20%?',
        answer:
          'Com código, o desconto que testamos é o do MMEMCASACOMCECILIA: 10% em todo o site. Não testamos os códigos de 15% ou 20% que aparecem em sites de cupom. O cupom soma com as promoções e, no Pix, com os 3% da loja: no teste, os 10% entraram sobre wheys e creatina que já estavam em promoção.',
      },
      {
        question: 'O MMEMCASACOMCECILIA é cupom de influenciadora?',
        answer:
          'Sim. É o código da Cecília, do Em Casa com Cecília, testado por nós no checkout. Ele não soma com o cupom de outra pessoa: a Mais Mu não acumula cupons no mesmo pedido.',
      },
      {
        question: 'O cupom MMEMCASACOMCECILIA está funcionando hoje?',
        answer:
          'Sim. No teste de checkout mais recente, o MMEMCASACOMCECILIA aplicou os 10% no carrinho. A data e os valores do teste estão em "Como testamos o cupom", nesta página.',
      },
      {
        question: 'O cupom MMEMCASACOMCECILIA vale no Mercado Livre?',
        answer:
          'Não. O MMEMCASACOMCECILIA é usado no checkout do site oficial da Mais Mu e não vale no Mercado Livre nem em outros marketplaces. Pelo Mercado Livre, vale o preço do anúncio, sem o cupom.',
        mercadoLivreUrl: 'https://meli.la/24RjvdP',
      },
      {
        question: 'A Mais Mu tem aplicativo?',
        answer:
          'Não. A Mais Mu vende pelo site oficial, que funciona no navegador do celular e tem busca para achar os produtos. É lá que o MMEMCASACOMCECILIA vale: digite o código no campo de cupom, antes de pagar.',
      },
      {
        question: 'Onde coloco o cupom na Mais Mu?',
        answer: 'No checkout, em "Adicionar cupom de desconto", depois de clicar em "Iniciar compra" no carrinho.',
      },
      {
        question: 'A Mais Mu tem frete grátis?',
        answer:
          'Sim, com valor mínimo por região. O site dá frete grátis acima de R$ 299 no Sul, Sudeste e Centro-Oeste e acima de R$ 399 no Norte e Nordeste. Abaixo disso, o frete é calculado no checkout.',
      },
      {
        question: 'O que fazer se o cupom MMEMCASACOMCECILIA não funcionar?',
        answer:
          'Confira se não há outro código no pedido, como o crédito do cashback ou o desconto de boas-vindas: a Mais Mu não acumula cupons. O código vai em "Adicionar cupom de desconto", no checkout, depois de "Iniciar compra"; no Mercado Livre ele não vale. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.',
      },
      {
        question: 'Tem cupom Mais Mu na Black Friday?',
        answer:
          'Tem. O cupom Mais Mu MMEMCASACOMCECILIA dá 10% OFF em todo o site, em todas as formas de pagamento, e é o mesmo código do resto do ano.',
      },
      {
        question: 'O cupom Mais Mu vale na Black Friday?',
        answer:
          'O cupom Mais Mu MMEMCASACOMCECILIA dá 10% OFF, soma com as ofertas do site e com o Pix e não soma com o cashback. Em produto com o preço das ofertas de novembro, o resumo do pedido mostra a linha Desconto do cupom antes de pagar.',
      },
      {
        question: 'Comprar com o cupom apoia o Em Casa com Cecília?',
        answer:
          'Sim, a compra pode gerar comissão para o Em Casa com Cecília, sem custo extra para você. O desconto aparece no checkout quando o cupom é aceito.',
      },
    ],
    monthlyHighlight: {
      scope: 'em todo o site',
      note: 'Soma com as ofertas e os 3% do Pix; acima de R$ 250, já com o desconto, a loja ainda devolve 5% em cashback',
    },
    status: 'ativo',
    featured: false,
  },
  {
    offerMode: 'discount-code',
    slug: 'skelt',
    cartPrint: { article: 'cupom-skelt-como-usar', src: '/images/reviews/skelt/cupom-skelt-sacola-com-cupom.webp', alt: 'Sacola da Skelt com o cupom SKEMCASACOMCECILIA aplicado no campo Cupom de desconto, com a linha do produto já com o desconto e o resumo ao lado', aspectRatio: 1.82 },
    brand: 'Skelt',
    officialUrl: 'https://www.skelt.com.br/',
    offerUrl: 'https://www.skelt.com.br/?utm_source=creators&utm_medium=SKEMCASACOMCECILIA&utm_campaign=inbazz',
    brandIcon: 'SK',
    brandLogo: '/images/about/partners/skelt-icon.png',
    brandLogoAlt: 'Marca Skelt',
    bubble: { src: '/images/logos/bolinhas/skelt.png' },
    brandWatermark: '/images/logos/watermarks/skelt.webp',
    brandColor: '#212121',
    code: 'SKEMCASACOMCECILIA',
    discount: '10% OFF',
    discountNumber: 10,
    category: 'Autobronzeador, body splash e hidratação corporal',
    hubCategory: 'beleza',
    shortDescription: 'todo o site Skelt, com todas as formas de pagamento',
    longDescription:
      'O cupom Skelt SKEMCASACOMCECILIA dá 10% OFF em todo o site, para quem compra pela primeira vez e para quem já é cliente, soma com as promoções e com os 5% do Pix, e vale em todas as formas de pagamento. Testado num kit de body splashes em promoção.',
    metaTitle: 'Cupom Skelt: 10% OFF com SKEMCASACOMCECILIA',
    metaTitleMonth: true,
    metaDescription:
      'Cupom Skelt: SKEMCASACOMCECILIA dá 10% OFF em todo o site para cliente novo ou antigo, soma com as promoções e com os 5% do Pix.',
    eligibleCategories: 'Todos os produtos do site oficial da Skelt, inclusive kits e combos',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping:
      'Frete grátis sem valor mínimo no Sul, no Sudeste e no Centro-Oeste e a partir de R$ 199 no Norte e no Nordeste, sobre o valor final do pedido, segundo a política de frete da loja',
    combinable:
      'Soma com as promoções vigentes do site e com os 5% de desconto do Pix, e vale com todas as formas de pagamento; não soma com outro cupom, como o de primeira compra da loja',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Os 10% entram sobre o preço promocional, inclusive em kits' },
      { benefit: 'pix', stacks: 'sim', condition: 'No Pix, a loja tira mais 5% depois do código' },
      { benefit: 'outro-cupom', stacks: 'nao', condition: 'A loja aceita um cupom por pedido, e aplicar outro código troca o anterior' },
      { benefit: 'frete', stacks: 'depende', condition: 'Grátis sem mínimo no Sul, Sudeste e Centro-Oeste e a partir de R$ 199 no Norte e Nordeste, sobre o valor final do pedido' },
    ],
    lastVerified: '2026-11-12',
    testedAt: '2026-11-11',
    testNote:
      'Aplicamos o SKEMCASACOMCECILIA num kit de três body splashes, de R$ 297,00 por R$ 237,60 com os 20% da promoção do site, e o total caiu para R$ 213,84, com R$ 23,76 de desconto: os 10% entraram sobre o preço promocional. Em 21/10/2026, no Pix, a loja tirou mais 5% depois do código.',
    codeInstructions: [
      'Copie o código SKEMCASACOMCECILIA no card acima.',
      'Acesse o site oficial da Skelt pelo botão indicado e coloque os produtos no carrinho.',
      'No carrinho ou no checkout, cole o código no campo de cupom de desconto e aplique.',
      'Confira o desconto no resumo do pedido antes de escolher a forma de pagamento.',
    ],
    aboutBrand:
      'A Skelt é uma marca brasileira de Curitiba, criada em 2017, conhecida pelos autobronzeadores em mousse, água e gel, e que hoje também vende body splash, body cream, maquiagem corporal e kits, com fórmulas veganas e cruelty-free. O cupom SKEMCASACOMCECILIA é o benefício da parceria para quem acompanha o Em Casa com Cecília: dá 10% OFF em todo o site, com qualquer forma de pagamento, e soma com as promoções e com o desconto de 5% do Pix. A recomendação é conferir o resumo do pedido antes de finalizar.',
    faqs: [
      {
        question: 'O cupom SKEMCASACOMCECILIA vale para todos os produtos da Skelt?',
        answer: 'Sim. O SKEMCASACOMCECILIA dá 10% OFF em todos os produtos do site oficial da Skelt, inclusive kits e combos.',
      },
      {
        question: 'Qual cupom Skelt dá 10% para quem já é cliente?',
        answer:
          'O SKEMCASACOMCECILIA. Ele dá 10% em todo o site da Skelt para quem compra pela primeira vez e para quem já comprou.',
      },
      {
        question: 'Existe cupom Skelt de 15%?',
        answer:
          'Com código, o desconto que testamos é o do SKEMCASACOMCECILIA: 10% em todo o site. Ele soma com as promoções do site e, no Pix, com os 5% da loja: no teste, os 10% entraram sobre produtos que já estavam 10% mais baratos, e o Pix tirou mais 5%.',
      },
      {
        question: 'O cupom soma com produtos em promoção?',
        answer:
          'Sim. No nosso teste mais recente, os 10% do cupom entraram num kit que já estava com 20% da promoção do site: de R$ 237,60 por R$ 213,84.',
      },
      {
        question: 'O cupom SKEMCASACOMCECILIA soma com o desconto do Pix?',
        answer:
          'Sim. O cupom vale com todas as formas de pagamento e, no Pix, a Skelt ainda tira os 5% de desconto dela.',
      },
      {
        question: 'O SKEMCASACOMCECILIA vale na primeira compra? Soma com o PRIMEIRA5?',
        answer:
          'Vale, mas não soma: a Skelt aceita um cupom por pedido, e aplicar outro código troca o anterior. Na primeira compra, fique com o SKEMCASACOMCECILIA: ele dá 10%, e o PRIMEIRA5, o cupom de primeira compra da loja, dá 5%.',
      },
      {
        question: 'O SKEMCASACOMCECILIA é cupom de influenciadora?',
        answer:
          'Sim. É o código da Cecília, do Em Casa com Cecília, testado por nós no checkout. Ele não soma com o cupom de outra influenciadora: a Skelt aceita um cupom por pedido, e aplicar outro código troca o anterior.',
      },
      {
        question: 'O cupom tira o brinde do pedido?',
        answer:
          'Pode tirar. O valor mínimo dos brindes da Skelt conta o pedido depois dos descontos, então, se o cupom deixar o total abaixo do mínimo da campanha, o brinde sai do carrinho. Confira o carrinho antes de pagar.',
      },
      {
        question: 'O cupom SKEMCASACOMCECILIA está funcionando hoje?',
        answer:
          'Sim. No teste de checkout mais recente, o SKEMCASACOMCECILIA aplicou os 10% no carrinho. A data e os valores do teste estão em "Como testamos o cupom", nesta página.',
      },
      {
        question: 'O cupom SKEMCASACOMCECILIA vale no Mercado Livre?',
        answer:
          'Não. O SKEMCASACOMCECILIA é usado no checkout do site oficial da Skelt e não vale no Mercado Livre nem em outros marketplaces. Pelo Mercado Livre, vale o preço do anúncio, sem o cupom.',
        mercadoLivreUrl: 'https://meli.la/2unTb7k',
      },
      {
        question: 'A Skelt tem aplicativo?',
        answer:
          'Não. A Skelt vende pelo site oficial, que funciona no navegador do celular e tem busca para achar os produtos. É lá que o SKEMCASACOMCECILIA vale: digite o código no campo de cupom, antes de pagar.',
      },
      {
        question: 'Onde coloco o cupom na Skelt?',
        answer: 'No campo de cupom de desconto do carrinho ou do checkout, antes de escolher a forma de pagamento.',
      },
      {
        question: 'A Skelt tem frete grátis?',
        answer:
          'Sim. Pela política de frete da loja, o frete é grátis sem valor mínimo no Sul, no Sudeste e no Centro-Oeste e a partir de R$ 199 no Norte e no Nordeste. O valor conta o pedido já com os descontos.',
      },
      {
        question: 'O que fazer se o cupom SKEMCASACOMCECILIA não funcionar?',
        answer:
          'Confira se não há outro cupom no pedido, como o de primeira compra: a Skelt aceita um por pedido, e o último aplicado troca o anterior. Se o brinde sumiu ao aplicar o cupom, é o mínimo da campanha, que conta o pedido já com o desconto. O cupom vale no site oficial, não no Mercado Livre. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.',
      },
      {
        question: 'Tem cupom Skelt na Black Friday?',
        answer:
          'Tem. O cupom Skelt SKEMCASACOMCECILIA dá 10% OFF em todo o site, inclusive em kits e combos, em todas as formas de pagamento.',
      },
      {
        question: 'O cupom Skelt vale na Black Friday?',
        answer:
          'O cupom Skelt SKEMCASACOMCECILIA dá 10% OFF em todo o site. Ainda não testamos o código com uma campanha de Black Friday no ar: confira o total na sacola antes de pagar.',
      },
      {
        question: 'Comprar com o cupom apoia o Em Casa com Cecília?',
        answer:
          'Sim, a compra pode gerar comissão para o Em Casa com Cecília, sem custo extra para você. O desconto aparece no checkout quando o cupom é aceito.',
      },
    ],
    monthlyHighlight: {
      scope: 'em todo o site',
      note: 'Soma com as promoções do site e os 5% do Pix; vale também em kits e combos',
    },
    status: 'ativo',
    featured: false,
  },
  {
    offerMode: 'discount-code',
    slug: 'bagaggio',
    cartPrint: { article: 'cupom-bagaggio-como-usar', src: '/images/reviews/bagaggio/cupom-sacola-com-cupom.webp', alt: 'Sacola da Bagaggio com o CECILIA10 aplicado: etiqueta no campo Cupom de desconto, subtotal de R$ 179,90, descontos de R$ 17,99 e total de R$ 161,91', aspectRatio: 1.306 },
    brand: 'Bagaggio',
    officialUrl: 'https://www.bagaggio.com.br/',
    offerUrl: 'https://www.bagaggio.com.br/?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz',
    brandIcon: 'BG',
    brandLogo: '/images/about/partners/bagaggio-icon.png',
    brandLogoAlt: 'Marca Bagaggio',
    bubble: { src: '/images/logos/bolinhas/bagaggio.png' },
    brandWatermark: '/images/logos/watermarks/bagaggio.webp',
    brandColor: '#265842',
    code: 'CECILIA10',
    discount: '10% OFF',
    discountNumber: 10,
    category: 'Malas, mochilas e acessórios de viagem',
    hubCategory: 'moda',
    shortDescription: 'todo o site Bagaggio, com todas as formas de pagamento',
    longDescription:
      'O cupom Bagaggio CECILIA10 dá 10% OFF em malas, mochilas e acessórios no site oficial, para quem compra pela primeira vez e para quem já é cliente, soma com as promoções, o Outlet e os 5% do Pix, e vale em todas as formas de pagamento. Testado numa mala de bordo do Outlet.',
    metaTitle: 'Cupom Bagaggio: 10% OFF em tudo com CECILIA10',
    metaTitleMonth: true,
    metaDescription:
      'Cupom Bagaggio: CECILIA10 dá 10% OFF em malas e mochilas para cliente novo ou antigo, somando com as promoções, o Outlet e os 5% do Pix.',
    eligibleCategories: 'Todos os produtos do site oficial da Bagaggio, inclusive os do Outlet',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping: 'Calculado pelo CEP no carrinho; o site também mostra a retirada em lojas próximas, conforme a disponibilidade',
    combinable:
      'Soma com as promoções vigentes do site, inclusive o Outlet, e com os 5% de desconto do Pix, e vale com todas as formas de pagamento; não soma com outro cupom, como o da promoção de 50% na 2ª peça',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Entra sobre as promoções do site, inclusive os produtos do Outlet' },
      { benefit: 'pix', stacks: 'sim', condition: 'No Pix, a Bagaggio tira mais 5% depois do código' },
      { benefit: 'outro-cupom', stacks: 'nao', condition: 'A loja não acumula cupons no mesmo pedido' },
    ],
    paymentPerks: [
      'Até 6x sem juros no cartão com parcela mínima de R$ 50, ou até 10x sem juros com parcela mínima de R$ 200',
    ],
    lastVerified: '2026-11-11',
    testedAt: '2026-11-11',
    testNote:
      'Aplicamos o CECILIA10 numa mala de bordo Downtown do Outlet, de R$ 249,90 por R$ 179,90, e o total caiu para R$ 161,91, com R$ 17,99 de desconto. Em 22/10/2026, no Pix, a loja tirou mais 5% depois do código, para R$ 153,81.',
    codeInstructions: [
      'Copie o código CECILIA10 no card acima.',
      'Acesse o site oficial da Bagaggio pelo botão indicado e coloque os produtos no carrinho.',
      'No carrinho, cole o código no campo de cupom de desconto e aplique.',
      'Confira o desconto no resumo do pedido antes de escolher a forma de pagamento.',
    ],
    aboutBrand:
      'A Bagaggio é uma marca brasileira de malas, mochilas, bolsas e acessórios de viagem, no mercado desde 1942, com loja online e lojas físicas. O cupom CECILIA10 é o benefício da parceria para quem acompanha o Em Casa com Cecília: dá 10% OFF em todo o site, com qualquer forma de pagamento, e soma com as promoções, com o Outlet e com o desconto de 5% do Pix. A recomendação é conferir o resumo do pedido antes de finalizar.',
    faqs: [
      {
        question: 'O cupom CECILIA10 vale para todos os produtos da Bagaggio?',
        answer:
          'Sim. O CECILIA10 dá 10% OFF em todos os produtos do site oficial da Bagaggio: malas, mochilas, bolsas, carteiras e acessórios, inclusive os do Outlet.',
      },
      {
        question: 'O cupom soma com produtos em promoção?',
        answer:
          'Sim. No nosso teste mais recente, os 10% do cupom entraram numa mala do Outlet que já estava com desconto: de R$ 179,90 por R$ 161,91.',
      },
      {
        question: 'O cupom CECILIA10 soma com o desconto do Pix?',
        answer:
          'Sim. O cupom vale com todas as formas de pagamento e, no Pix, a Bagaggio ainda tira os 5% de desconto dela.',
      },
      {
        question: 'Posso usar o CECILIA10 junto com a promoção de 50% na 2ª peça?',
        answer:
          'Não. A promoção da 2ª peça funciona com outro cupom da loja, que não acumula com outros cupons. Levando duas peças de preço parecido, os 50% na mais barata costumam render mais que os 10%; levando uma, fique com o CECILIA10.',
      },
      {
        question: 'O cupom Bagaggio vale na primeira compra? É melhor que o de boas-vindas?',
        answer:
          'Vale, e rende mais: o desconto de primeira compra da própria Bagaggio é de 5%, e o CECILIA10 dá 10% OFF, também para quem já comprou na loja. Como a Bagaggio não acumula cupons no mesmo pedido, os dois não somam: na primeira compra, fique com o CECILIA10.',
      },
      {
        question: 'Qual cupom Bagaggio dá 10% para quem já é cliente?',
        answer:
          'O CECILIA10. Ele dá 10% no site oficial para quem compra pela primeira vez e para quem já comprou.',
      },
      {
        question: 'Existe cupom Bagaggio de 15% ou 20%?',
        answer:
          'Com código, o desconto que testamos é o do CECILIA10: 10% no site oficial, inclusive no Outlet. Não testamos os códigos de 15% ou 20% que aparecem em sites de cupom. O CECILIA10 soma com as promoções e, no Pix, com os 5% da loja: no teste, os 10% entraram sobre uma mala do Outlet, e o Pix tirou mais 5%.',
      },
      {
        question: 'O CECILIA10 é cupom de influenciadora?',
        answer:
          'Sim. É o código da Cecília, do Em Casa com Cecília, testado por nós no checkout. Ele não soma com o cupom de outra influenciadora: a Bagaggio não acumula cupons no mesmo pedido.',
      },
      {
        question: 'O cupom CECILIA10 está funcionando hoje?',
        answer:
          'Sim. No teste de checkout mais recente, o CECILIA10 aplicou os 10% no carrinho. A data e os valores do teste estão em "Como testamos o cupom", nesta página.',
      },
      {
        question: 'O cupom CECILIA10 vale no Mercado Livre?',
        answer:
          'Não. O CECILIA10 é usado no carrinho do site oficial da Bagaggio e não vale no Mercado Livre nem em outros marketplaces. Pelo Mercado Livre, vale o preço do anúncio, sem o cupom.',
        mercadoLivreUrl: 'https://meli.la/2KeydkG',
      },
      {
        question: 'O cupom CECILIA10 vale no app da Bagaggio?',
        answer:
          'Sim. O CECILIA10 vale no aplicativo Bagaggio, para Android e iPhone, do mesmo jeito que no site oficial: digite o código no campo de cupom, antes de pagar.',
      },
      {
        question: 'Onde coloco o cupom na Bagaggio?',
        answer: 'No campo de cupom de desconto do carrinho, antes de escolher a forma de pagamento.',
      },
      {
        question: 'Quanto custa o frete da Bagaggio?',
        answer:
          'O frete é calculado pelo CEP no carrinho. O site também mostra a retirada em lojas próximas, conforme a disponibilidade.',
      },
      {
        question: 'Posso desistir da compra feita com o cupom?',
        answer:
          'Sim. Em compras pelo site, a Bagaggio aceita a desistência em até 7 dias corridos depois do recebimento, com vale-troca ou devolução do valor pago.',
      },
      {
        question: 'O que fazer se o cupom CECILIA10 não funcionar?',
        answer:
          'Veja se não há outro cupom no carrinho, como o da promoção de 50% na 2ª peça: a Bagaggio não acumula cupons. O código vai no campo de cupom do carrinho, no site ou no app, sem espaços; no Mercado Livre ele não vale. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.',
      },
      {
        question: 'Tem cupom Bagaggio na Black Friday?',
        answer:
          'Tem. O cupom Bagaggio CECILIA10 dá 10% OFF em todo o site, inclusive no Outlet, em todas as formas de pagamento.',
      },
      {
        question: 'O cupom Bagaggio vale na Black Friday?',
        answer:
          'O cupom Bagaggio CECILIA10 dá 10% OFF em todo o site, com o Pix. Nos preços da campanha de Black Friday, aplique o código na sacola e confira a linha do desconto antes de pagar.',
      },
      {
        question: 'Comprar com o cupom apoia o Em Casa com Cecília?',
        answer:
          'Sim, a compra pode gerar comissão para o Em Casa com Cecília, sem custo extra para você. O desconto aparece no carrinho quando o cupom é aceito.',
      },
    ],
    monthlyHighlight: {
      scope: 'em todo o site',
      note: 'Soma com as promoções do site, o Outlet e os 5% do Pix',
    },
    status: 'ativo',
    featured: false,
  },
  {
    offerMode: 'discount-code',
    slug: 'toda-up',
    cartPrint: { src: '/images/reviews/toda-up/cupom-toda-up-checkout-com-cupom.webp', alt: 'Resumo do pedido no checkout da Toda Up com o código MAUAD aplicado na Fita Up e a linha Desconto no pedido', aspectRatio: 1.071 },
    brand: 'Toda Up',
    officialUrl: 'https://todaup.com/',
    offerUrl:
      'https://todaup.com/discount/MAUAD?redirect=/collections/squad-toda-up&utm_campaign=fluxoinfluenciadoras&utm_content=mensagem1&utm_medium=influs&utm_source=influs&utm_term=comissao',
    brandIcon: 'TU',
    brandLogo: '/images/about/partners/toda-up-icon.png',
    brandLogoAlt: 'Marca Toda Up',
    bubble: { src: '/images/logos/bolinhas/toda-up.png' },
    brandWatermark: '/images/logos/watermarks/toda-up.webp',
    brandColor: '#4A282C',
    code: 'MAUAD',
    discount: '15% OFF',
    discountNumber: 15,
    category: 'Moda íntima e lingerie',
    hubCategory: 'moda',
    shortDescription: 'todo o site Toda Up, inclusive nos produtos em promoção',
    longDescription:
      'O cupom Toda Up MAUAD dá 15% OFF em sutiãs, tops, calcinhas e adesivos no site oficial, para quem compra pela primeira vez e para quem já é cliente, e soma com as promoções do site, inclusive nos produtos que já estão com desconto. Testado num sutiã em promoção.',
    metaTitle: 'Cupom Toda Up: 15% OFF em tudo com MAUAD',
    metaTitleMonth: true,
    metaDescription:
      'Cupom Toda Up: MAUAD dá 15% OFF em sutiãs, tops, calcinhas e adesivos para cliente novo ou antigo e soma com as promoções do site.',
    eligibleCategories: 'Todos os produtos do site oficial da Toda Up, inclusive os que já estão em promoção',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping:
      'Calculado pelo CEP no checkout, por Sedex, Loggi ou Jadlog; o pedido sai em até 3 dias úteis depois da confirmação do pagamento',
    combinable:
      'Soma com as promoções vigentes do site e vale nos produtos que já estão com desconto; na Black VIP, a loja avisa que o cupom de influenciadora não soma com a escada de desconto',
    stacking: [
      { benefit: 'promocoes', stacks: 'depende', condition: 'Entra sobre o preço promocional; na Black VIP, a loja não soma o cupom de influenciadora com a escada de desconto' },
      { benefit: 'pix', stacks: 'sim', condition: 'Soma com o desconto do Pix, quando a loja oferece; o percentual aparece na hora do pagamento' },
    ],
    lastVerified: '2026-11-12',
    testedAt: '2026-11-12',
    testNote:
      'Aplicamos o MAUAD numa Fita Up de R$ 116,90: o cupom tirou R$ 17,53 e o total caiu para R$ 99,37, os 15%. Em 11/11/2026, num Sutiã Comfort Up em promoção, de R$ 199,90 por R$ 170,91, o total caiu para R$ 145,28, com R$ 25,63 de desconto: os 15% entraram sobre o preço promocional. No mesmo dia, num sutiã da Black VIP, o checkout não aplicou o cupom e avisou que o cupom de influenciadora não soma com a escada de desconto.',
    codeInstructions: [
      'Copie o código MAUAD no card acima.',
      'Acesse o site oficial da Toda Up pelo botão indicado e coloque os produtos no carrinho.',
      'No checkout, confira se o MAUAD já aparece aplicado; se não, cole o código no campo de cupom de desconto e aplique.',
      'Confira o desconto no resumo do pedido antes de pagar.',
    ],
    aboutBrand:
      'A Toda Up é uma marca brasileira de moda íntima feminina, de Biguaçu (SC). Começou com as fitas adesivas para decote e hoje vende sutiãs, tops e calcinhas segunda pele, sutiã de silicone, adesivos e acessórios. O cupom MAUAD é o benefício da parceria para quem acompanha o Em Casa com Cecília: dá 15% OFF em todo o site e soma com as promoções. A recomendação é conferir o resumo do pedido antes de pagar.',
    faqs: [
      {
        question: 'O cupom MAUAD vale para todos os produtos da Toda Up?',
        answer:
          'Sim. O MAUAD dá 15% OFF em todos os produtos do site oficial da Toda Up: sutiãs, tops, calcinhas, adesivos e acessórios, inclusive os que já estão em promoção. A exceção é a Black VIP, enquanto ela durar: nela, a loja não aceita o cupom de influenciadora.',
      },
      {
        question: 'Qual cupom Toda Up dá 15% para quem já é cliente?',
        answer:
          'O MAUAD. Ele dá 15% no site oficial da Toda Up para quem compra pela primeira vez e para quem já comprou. A exceção é a Black VIP, em que a loja não soma o cupom de influenciadora.',
      },
      {
        question: 'A Toda Up é a antiga Fita Up? O cupom vale no site todaup.com?',
        answer:
          'Sim. A loja se chamava Fita Up e hoje é Toda Up, com o site oficial todaup.com. O cupom MAUAD dá 15% OFF em todo o site.',
      },
      {
        question: 'O cupom soma com produtos em promoção?',
        answer:
          'Sim. Num teste nosso, os 15% do MAUAD entraram sobre um sutiã que já estava em promoção. A exceção é a Black VIP: nela, a loja avisa que o cupom de influenciadora não soma com a escada de desconto.',
      },
      {
        question: 'O cupom MAUAD está funcionando hoje?',
        answer:
          'Sim. No teste de checkout mais recente, o MAUAD aplicou os 15% no carrinho. A data e os valores do teste estão em "Como testamos o cupom", nesta página.',
      },
      {
        question: 'Onde coloco o cupom na Toda Up?',
        answer:
          'No campo de cupom de desconto do checkout, antes de pagar. Pelo botão desta página, o site da Toda Up já abre com o MAUAD aplicado; confira o desconto no resumo do pedido.',
      },
      {
        question: 'Quanto custa o frete da Toda Up?',
        answer:
          'O frete é calculado pelo CEP no checkout, por Sedex, Loggi ou Jadlog, e o pedido sai em até 3 dias úteis depois da confirmação do pagamento. O valor aparece no checkout antes de pagar.',
      },
      {
        question: 'O que fazer se o cupom MAUAD não funcionar?',
        answer:
          'Pelo botão desta página, o MAUAD já entra aplicado; se ele não aparecer no resumo do pedido, cole o código no campo de cupom do checkout, sem espaços. Ele vale em todo o site oficial todaup.com, inclusive nos produtos em promoção. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.',
      },
      {
        question: 'Posso trocar ou devolver a compra feita com o cupom?',
        answer:
          'Sim. A Toda Up aceita troca de modelo, tamanho ou cor e devolução por arrependimento em até 30 dias corridos depois do recebimento, pelo portal de trocas da loja.',
      },
      {
        question: 'Tem cupom Toda Up na Black Friday?',
        answer:
          'Tem. O cupom Toda Up MAUAD dá 15% OFF em todo o site, em todas as formas de pagamento, e é o mesmo código do resto do ano.',
      },
      {
        question: 'O cupom Toda Up vale na Black Friday?',
        answer:
          'O cupom Toda Up MAUAD dá 15% OFF e vale nos produtos em promoção. Na Black VIP, enquanto durar, o checkout não aceita o cupom, porque ele não soma com a escada de desconto. Nos preços da Black November, confira a linha do cupom no carrinho.',
      },
      {
        question: 'Comprar com o cupom apoia o Em Casa com Cecília?',
        answer:
          'Sim, a compra pode gerar comissão para o Em Casa com Cecília, sem custo extra para você. O desconto aparece no checkout quando o cupom é aceito.',
      },
    ],
    monthlyHighlight: {
      scope: 'em todo o site',
      note: 'Soma com as promoções do site, inclusive nos produtos já em desconto',
    },
    status: 'ativo',
    featured: false,
  },
  {
    offerMode: 'discount-code',
    slug: 'simple-organic',
    cartPrint: { src: '/images/reviews/simple-organic/cupom-simple-organic-checkout-com-cupom.webp', alt: 'Resumo do pedido no checkout da Simple Organic com o código S-EMCASACOMCECILIA aplicado e a linha Desconto no pedido', aspectRatio: 1.039 },
    brand: 'Simple Organic',
    officialUrl: 'https://simpleorganic.com.br/',
    // Link da parceria como veio (03/11/2026): abre o site com o cupom aplicado. Com redirect para um produto o
    // cupom não entra, então ele vai à home. Não editar o link.
    offerUrl: 'https://simpleorganic.com.br//discount/S-EMCASACOMCECILIA',
    brandIcon: 'S',
    brandLogo: '/images/about/partners/simple-organic-icon.png',
    brandLogoAlt: 'Marca Simple Organic',
    bubble: { src: '/images/logos/bolinhas/simple-organic.png' },
    brandWatermark: '/images/logos/watermarks/simple-organic.webp',
    brandColor: '#E6006F',
    code: 'S-EMCASACOMCECILIA',
    discount: '5% OFF',
    discountNumber: 5,
    category: 'Skincare e maquiagem vegana',
    hubCategory: 'beleza',
    shortDescription: 'todo o site Simple Organic, inclusive nos produtos em promoção e nos kits',
    longDescription:
      'O cupom Simple Organic S-EMCASACOMCECILIA dá 5% OFF em séruns, hidratantes, limpeza facial, maquiagem e body splash no site oficial, para quem compra pela primeira vez e para quem já é cliente, e entra também nos produtos que já estão em promoção e nos kits. Testado num carrinho com kit, produto em promoção e produto a preço cheio.',
    metaTitle: 'Cupom Simple Organic: 5% OFF em tudo com S-EMCASACOMCECILIA',
    metaTitleMonth: true,
    metaDescription:
      'Cupom Simple Organic: S-EMCASACOMCECILIA dá 5% OFF em séruns, hidratantes e maquiagem para cliente novo ou antigo, inclusive em promoção e nos kits.',
    eligibleCategories: 'Todos os produtos do site oficial da Simple Organic, inclusive os que já estão em promoção e os kits',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping:
      'Frete grátis a partir de R$ 99,00 em produtos; abaixo disso, calculado pelo CEP no checkout, por PAC, Sedex ou JadLog. O pedido sai em 3 a 5 dias úteis depois da confirmação do pagamento',
    combinable:
      'Soma com as promoções do site e vale nos kits: nos nossos testes, os 5% entraram sobre o preço promocional de todos os itens do carrinho',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Os 5% entram sobre o preço promocional e nos kits' },
      { benefit: 'pix', stacks: 'sim', condition: 'Soma com o desconto do Pix, quando a loja oferece; o percentual aparece na hora do pagamento' },
      { benefit: 'frete', stacks: 'depende', condition: 'Grátis a partir de R$ 99 em produtos; o mínimo conta depois do desconto do cupom' },
    ],
    paymentPerks: [
      'Até 5x sem juros no cartão, com parcela mínima de R$ 30',
    ],
    lastVerified: '2026-11-12',
    testedAt: '2026-11-12',
    testNote:
      'No checkout, o S-EMCASACOMCECILIA tirou R$ 4,55 do kit Rotina Pele Sensível em promoção, de R$ 182,00 por R$ 91,00, e o total caiu para R$ 86,45: os 5% entraram sobre o preço promocional. Em 10/11/2026, o código deu 5% nos 11 kits e nos 13 produtos avulsos que testamos, e o frete grátis a partir de R$ 99 contou depois do desconto: o Trio Body Splashes saiu a R$ 99,50 sem o código, com frete grátis, e a R$ 105,41 com ele, com R$ 10,88 de frete.',
    codeInstructions: [
      'Copie o código S-EMCASACOMCECILIA no card acima.',
      'Acesse o site oficial da Simple Organic pelo botão indicado: ele abre a loja com o cupom aplicado. Depois, coloque os produtos no carrinho.',
      'Confira se o S-EMCASACOMCECILIA aparece em "Desconto" no carrinho; se não, cole o código nesse campo ou no campo de cupom do checkout e clique em "Aplicar".',
      'Confira o desconto no resumo do pedido antes de pagar.',
    ],
    aboutBrand:
      'A Simple Organic é uma marca brasileira de beleza limpa e vegana, criada em 2017 em Florianópolis (SC) e parte da Hypera Pharma desde 2020. Vende séruns, hidratantes, limpeza facial, maquiagem e body splash. O cupom S-EMCASACOMCECILIA é o benefício da parceria para quem acompanha o Em Casa com Cecília: dá 5% OFF em todo o site, inclusive nos produtos em promoção e nos kits. A recomendação é conferir o resumo do pedido antes de pagar.',
    faqs: [
      {
        question: 'O cupom S-EMCASACOMCECILIA vale para todos os produtos da Simple Organic?',
        answer:
          'Sim. O S-EMCASACOMCECILIA dá 5% OFF nos produtos do site oficial da Simple Organic: séruns, hidratantes, limpeza facial, maquiagem e body splash, inclusive os kits e os duos.',
      },
      {
        question: 'Qual cupom Simple Organic dá 5% para quem já é cliente?',
        answer:
          'O S-EMCASACOMCECILIA. Ele dá 5% no site oficial da Simple Organic para quem compra pela primeira vez e para quem já comprou.',
      },
      {
        question: 'Existe cupom Simple Organic de 10% ou 15%?',
        answer:
          'Com código, o desconto que testamos é o do S-EMCASACOMCECILIA: 5% no site oficial. Não testamos os códigos de 10% ou 15% que aparecem em sites de cupom. O nosso entra também nos kits e nos produtos em promoção: nos testes, os 5% entraram sobre o preço promocional.',
      },
      {
        question: 'O cupom soma com produtos em promoção?',
        answer:
          'Sim. Nos nossos testes, os 5% entraram sobre o preço promocional de um hidratante e de um duo e sobre um kit que já estava com desconto. O desconto aparece no carrinho antes de pagar.',
      },
      {
        question: 'O cupom S-EMCASACOMCECILIA está funcionando hoje?',
        answer:
          'Sim. No teste de checkout mais recente, o S-EMCASACOMCECILIA aplicou os 5% no carrinho. A data e os valores do teste estão em "Como testamos o cupom", nesta página.',
      },
      {
        question: 'Onde coloco o cupom na Simple Organic?',
        answer:
          'No campo "Desconto" do carrinho ou no campo de cupom do checkout, antes de pagar. Pelo botão desta página, o site da Simple Organic já abre com o cupom aplicado; confira o desconto no resumo do pedido.',
      },
      {
        question: 'A Simple Organic tem frete grátis?',
        answer:
          'Sim, a partir de R$ 99,00 em produtos, segundo a faixa do site. Abaixo disso, o frete é calculado pelo CEP no checkout, por PAC, Sedex ou JadLog, e o pedido sai em 3 a 5 dias úteis depois da confirmação do pagamento.',
      },
      {
        question: 'O que fazer se o cupom S-EMCASACOMCECILIA não funcionar?',
        answer:
          'Pelo botão desta página, o cupom já entra aplicado; se ele não aparecer no carrinho, cole o código no campo "Desconto", sem espaços, e clique em "Aplicar". Ele vale no site oficial simpleorganic.com.br. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.',
      },
      {
        question: 'Posso trocar ou devolver a compra feita com o cupom?',
        answer:
          'Sim. A Simple Organic aceita troca ou desistência em até 7 dias corridos depois do recebimento, com o produto na embalagem original, sem uso e com o lacre inviolado. O pedido de troca vai pelo e-mail de atendimento da loja.',
      },
      {
        question: 'Tem cupom Simple Organic na Black Friday?',
        answer:
          'Tem. O cupom Simple Organic S-EMCASACOMCECILIA dá 5% OFF em todo o site, inclusive nos kits, em todas as formas de pagamento.',
      },
      {
        question: 'O cupom Simple Organic vale na Black Friday?',
        answer:
          'Vale. O cupom Simple Organic S-EMCASACOMCECILIA dá 5% OFF e, no nosso teste, entrou em itens com preço da Clean Friday, a campanha da loja. Confira a linha do cupom no carrinho.',
      },
      {
        question: 'Comprar com o cupom apoia o Em Casa com Cecília?',
        answer:
          'Sim, a compra pode gerar comissão para o Em Casa com Cecília, sem custo extra para você. O desconto aparece no checkout quando o cupom é aceito.',
      },
    ],
    monthlyHighlight: {
      scope: 'em todo o site',
      note: 'Vale também nos produtos em promoção e nos kits',
    },
    status: 'ativo',
    featured: false,
  },
  {
    offerMode: 'discount-code',
    slug: 'holyfoods',
    cartPrint: { src: '/images/reviews/holyfoods/cupom-holyfoods-checkout-com-cupom.webp', alt: 'Resumo da compra na HolyFoods com a linha Descontos e o aviso Cupom EMCASA adicionado', aspectRatio: 1.341 },
    brand: 'HolyFoods',
    officialUrl: 'https://holyfoods.com.br/',
    offerUrl: 'https://www.holyfoods.com.br/?utm_source=afiliados&utm_medium=emcasacomcecilia&utm_campaign=inbazz',
    brandIcon: 'HF',
    brandLogo: '/images/about/partners/holyfoods-icon.png',
    brandLogoAlt: 'Marca HolyFoods',
    bubble: { src: '/images/logos/bolinhas/holyfoods.png' },
    brandWatermark: '/images/logos/watermarks/holyfoods.webp',
    brandColor: '#005234',
    code: 'EMCASA',
    discount: '15% OFF',
    discountNumber: 15,
    category: 'Sopas, macarrões e risotos prontos',
    hubCategory: 'alimentacao',
    shortDescription: 'todo o site HolyFoods, inclusive nos produtos em promoção',
    longDescription:
      'O cupom HolyFoods EMCASA dá 15% OFF em todo o site, para quem compra pela primeira vez e para quem já é cliente, e soma com os preços já reduzidos da loja. Testado num carrinho de sopas que já estavam em promoção.',
    metaTitle: 'Cupom HolyFoods: 15% OFF com o código EMCASA',
    metaTitleMonth: true,
    metaDescription:
      'Cupom HolyFoods: use EMCASA e ganhe 15% OFF em sopas, macarrões, risotos e kits, cliente novo ou antigo, somando com os produtos em promoção.',
    eligibleCategories: 'Todos os produtos do site oficial da HolyFoods, avulsos e kits',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping:
      'Frete grátis a partir de um valor mínimo que muda conforme o estado; o carrinho mostra quanto falta para a sua região, e o prazo aparece no checkout',
    combinable: 'Soma com as promoções do site, inclusive nos produtos que já estão com desconto, e vale com todas as formas de pagamento',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Os 15% entram sobre os produtos que já estão com desconto da loja' },
      { benefit: 'pix', stacks: 'sim', condition: 'Soma com o desconto do Pix, quando a loja oferece; o percentual aparece na hora do pagamento' },
      { benefit: 'frete', stacks: 'depende', condition: 'Grátis a partir de um mínimo que muda conforme o estado; o carrinho mostra quanto falta para a sua região' },
    ],
    lastVerified: '2026-11-12',
    testedAt: '2026-11-12',
    testNote:
      'Aplicamos o EMCASA num carrinho com dois Kits Veganos de 10 unidades, R$ 250,60: o cupom tirou R$ 37,59 e o total caiu para R$ 213,01, os 15%. O checkout abriu com um cupom de campanha da própria loja no campo, e foi preciso removê-lo para colocar o EMCASA. Em 05/11/2026, num carrinho de R$ 69,79 com um Pack Sopa da Vovó e duas Sopas Detox, todos já com desconto da loja, o cupom tirou R$ 10,47 e o total caiu para R$ 59,32: os 15% inteiros sobre o preço promocional.',
    codeInstructions: [
      'Copie o código EMCASA no card acima.',
      'Acesse o site oficial da HolyFoods pelo botão indicado e coloque os produtos no carrinho.',
      'Na tela "Finalizar compra", clique em "Inserir cupom de desconto", cole o código no campo "Código do cupom" e clique em "Adicionar".',
      'Confira a linha "Cupom de desconto" no resumo da compra antes de pagar.',
    ],
    aboutBrand:
      'A HolyFoods é uma marca brasileira de refeições prontas para preparar em casa: sopas, macarrões, risotos, aveias, mel e kits, vendidos no site oficial, da Holy Group Ltda (CNPJ 50.874.415/0001-62). O cupom EMCASA é o benefício da parceria para quem acompanha o Em Casa com Cecília: dá 15% OFF em todo o site e soma com os preços que já estão em promoção. A recomendação é conferir o resumo da compra antes de pagar.',
    faqs: [
      {
        question: 'O cupom EMCASA vale para todos os produtos da HolyFoods?',
        answer: 'Sim. O EMCASA dá 15% OFF em todo o site oficial da HolyFoods, nos produtos avulsos e nos kits.',
      },
      {
        question: 'O cupom soma com os produtos em promoção?',
        answer:
          'Sim. Num teste nosso, os 15% entraram sobre sopas que já estavam com desconto da loja: R$ 69,79 viraram R$ 59,32.',
      },
      {
        question: 'Onde coloco o cupom na HolyFoods?',
        answer:
          'Na tela "Finalizar compra", que abre depois do carrinho: clique em "Inserir cupom de desconto", cole o EMCASA no campo "Código do cupom" e clique em "Adicionar". O desconto aparece no resumo da compra.',
      },
      {
        question: 'O site oficial da HolyFoods é holyfoods.com.br?',
        answer:
          'Sim. O site oficial é holyfoods.com.br, e o pagamento é feito em seguro.holyfoods.com.br, o checkout da própria loja. É lá que o EMCASA dá 15% OFF.',
      },
      {
        question: 'O cupom EMCASA vale na primeira compra?',
        answer: 'Sim. O EMCASA vale na primeira compra e também para quem já comprou na HolyFoods.',
      },
      {
        question: 'Qual cupom HolyFoods dá 15% para quem já é cliente?',
        answer:
          'O EMCASA. Ele dá 15% em todo o site da HolyFoods para quem compra pela primeira vez e para quem já comprou.',
      },
      {
        question: 'O cupom EMCASA vale no Mercado Livre?',
        answer:
          'Não. O EMCASA é usado no checkout do site oficial da HolyFoods e não vale no Mercado Livre nem em outros marketplaces. Pelo Mercado Livre, vale o preço do anúncio, sem o cupom.',
        mercadoLivreUrl: 'https://meli.la/2mjWEVp',
      },
      {
        question: 'A HolyFoods tem frete grátis?',
        answer:
          'Sim, a partir de um valor mínimo que muda conforme o estado. O carrinho mostra quanto falta para o frete grátis na sua região, e o prazo de entrega aparece no checkout.',
      },
      {
        question: 'E se eu não gostar dos produtos?',
        answer:
          'Pela garantia da loja, você tem 30 dias depois de receber para pedir a devolução: pode provar uma unidade, e as outras voltam fechadas. A devolução é sem custo, com reembolso dos produtos devolvidos.',
      },
      {
        question: 'O cupom EMCASA está funcionando hoje?',
        answer:
          'Sim. No teste de checkout mais recente, o EMCASA aplicou os 15% no carrinho. A data e os valores do teste estão em "Como testamos o cupom", nesta página.',
      },
      {
        question: 'O que fazer se o cupom EMCASA não funcionar?',
        answer:
          'Confira se o código foi colado no campo "Código do cupom" da tela "Finalizar compra", sem espaços, e se você clicou em "Adicionar". O campo "Cartão-presente" não aceita cupons. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.',
      },
      {
        question: 'Tem cupom HolyFoods na Black Friday?',
        answer:
          'Tem. O cupom HolyFoods EMCASA dá 15% OFF em todo o site, em avulsos e kits, na tela de finalizar a compra.',
      },
      {
        question: 'O cupom HolyFoods vale na Black Friday?',
        answer:
          'Vale. O cupom HolyFoods EMCASA dá 15% OFF e somou com a Black da loja nos nossos testes: o desconto entrou sobre o preço que já tinha os 30% da campanha.',
      },
      {
        question: 'Comprar com o cupom apoia o Em Casa com Cecília?',
        answer:
          'Sim, a compra pode gerar comissão para o Em Casa com Cecília, sem custo extra para você. O desconto aparece no checkout quando o cupom é aceito.',
      },
    ],
    monthlyHighlight: {
      scope: 'em todo o site',
      note: 'Vale também nos produtos em promoção e nos kits',
    },
    status: 'ativo',
    featured: false,
  },
  {
    offerMode: 'discount-code',
    slug: 'petz',
    cartPrint: { src: '/images/reviews/petz/cupom-petz-sacola-celular-com-cupom.webp', alt: 'Sacola da Petz no celular com o produto, o cupom EMCASA aplicado no campo Cupom de desconto e a linha Desconto Aplicado', aspectRatio: 1.013 },
    brand: 'Petz',
    officialUrl: 'https://www.petz.com.br/',
    // Loja da Cecília no programa Parceiro Petz (11/11/2026): o link marca a compra para a parceria, mas não aplica o
    // cupom, que é o foco da página. Não editar o link.
    offerUrl: 'https://petz.com.br/parceiro/emcasa',
    brandIcon: 'P',
    brandLogo: '/images/about/partners/petz-icon.png',
    brandLogoAlt: 'Marca Petz',
    bubble: { src: '/images/logos/bolinhas/petz.png' },
    brandWatermark: '/images/logos/watermarks/petz.webp',
    brandColor: '#175EA8',
    code: 'EMCASA',
    discount: '10% OFF',
    discountNumber: 10,
    category: 'Pet shop: ração, petiscos, higiene e acessórios',
    hubCategory: 'diversos',
    shortDescription: 'compras no site e no app da Petz',
    longDescription:
      'O cupom Petz EMCASA dá 10% OFF nas compras no site e no app, para quem compra pela primeira vez e para quem já é cliente, e soma com os 5% do Retire na Loja: 14,5% no total, em compras acima de R$ 199 no Centro-Oeste, no Sul e no Sudeste. Num produto que já está em oferta, o cupom não soma: a sacola fica com o desconto maior. Testado no carrinho.',
    metaTitle: 'Cupom Petz: 10% OFF com EMCASA + 5% na retirada',
    metaTitleMonth: true,
    metaDescription:
      'Cupom Petz: use EMCASA e ganhe 10% OFF no site e no app. Com os 5% do Retire na Loja, o total foi 14,5% no nosso teste. Em promoção, vale o desconto maior.',
    eligibleCategories: 'Produtos do site e do app da Petz; num item já em promoção, vale o desconto maior',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping:
      'Frete grátis acima de R$ 199 no Sul e no Sudeste e acima de R$ 299 no Norte, no Nordeste e no Centro-Oeste (medicamentos: acima de R$ 199 em todo o Brasil); o prazo aparece na sacola depois do CEP',
    combinable:
      'Soma com os 5% do Retire na Loja, que a Petz dá em compras acima de R$ 199 no Centro-Oeste, no Sul e no Sudeste: 14,5% no total. Não soma com promoções: num produto já em oferta, a sacola mantém o desconto maior. O desconto da Assinatura Petz não soma com cupons',
    stacking: [
      { benefit: 'retirada', stacks: 'sim', condition: 'Soma com os 5% do Retire na Loja: 14,5% no total, em compras acima de R$ 199 no Centro-Oeste, no Sul e no Sudeste' },
      { benefit: 'promocoes', stacks: 'nao', condition: 'Num produto já em oferta, a sacola fica com o desconto maior' },
      { benefit: 'pix', stacks: 'sim', condition: 'Soma com o desconto do Pix, quando a loja oferece; o percentual aparece na hora do pagamento' },
      { benefit: 'frete', stacks: 'depende', condition: 'Grátis acima de R$ 199 no Sul e no Sudeste e de R$ 299 nas demais regiões; medicamentos, acima de R$ 199' },
    ],
    paymentPerks: [
      'Até 3x sem juros no cartão, com parcela mínima de R$ 80',
    ],
    lastVerified: '2026-11-12',
    testedAt: '2026-11-12',
    testNote:
      'Aplicamos o EMCASA numa sacola com uma Cama Suspensa Cansei de Ser Gato a preço cheio, R$ 319,99: o cupom tirou R$ 32,00 e o total caiu para R$ 287,99, os 10%. Em 11/11/2026, numa sacola com uma ração Golden de R$ 22,99 e dois itens em promoção da Royal Canin, um sachê por R$ 9,90 (de R$ 10,99) e uma ração Maxi 12 kg por R$ 279,99 (de R$ 349,99), a Golden caiu para R$ 20,69; o sachê ficou com os 10% sobre o preço cheio, R$ 9,89; e a ração Maxi manteve os 20% da promoção.',
    codeInstructions: [
      'Copie o código EMCASA no card acima.',
      'Entre na Petz pelo botão desta página e coloque os produtos na sacola.',
      'Na sacola, cole o código no campo "Digite seu cupom" e aplique.',
      'No Centro-Oeste, no Sul e no Sudeste, em compras acima de R$ 199, escolha "Retire na Loja" para somar mais 5% OFF ao cupom.',
      'Confira a linha "Total de descontos" no resumo do pedido antes de ir para o pagamento.',
    ],
    aboutBrand:
      'A Petz é uma rede brasileira de pet shops, com lojas físicas, site e app, que vende ração, petiscos, higiene, farmácia, acessórios e itens de casa e jardim. O cupom EMCASA vem do programa Parceiro Petz e é o benefício para quem acompanha o Em Casa com Cecília: dá 10% OFF nas compras no site e no app. A recomendação é conferir o resumo do pedido antes de pagar.',
    faqs: [
      {
        question: 'O cupom EMCASA vale para todos os produtos da Petz?',
        answer:
          'O EMCASA dá 10% OFF nas compras no site e no app da Petz. Num produto que já está em promoção, ele não soma: a sacola fica com o desconto maior.',
      },
      {
        question: 'O cupom soma com os produtos em promoção?',
        answer:
          'Não. No nosso teste, um sachê em promoção por R$ 9,90 (de R$ 10,99) ficou com os 10% sobre o preço cheio, R$ 9,89, e uma ração com 20% OFF manteve o preço da promoção, R$ 279,99. Nos dois casos, a sacola ficou com o desconto maior.',
      },
      {
        question: 'O cupom soma com o desconto do Retire na Loja?',
        answer:
          'Sim. A Petz dá 5% OFF para retirar o pedido na loja em compras acima de R$ 199, no Centro-Oeste, no Sul e no Sudeste, e esse desconto soma com o EMCASA. No nosso teste, duas rações de R$ 189,99 (R$ 379,98) caíram para R$ 341,98 com o cupom e para R$ 324,88 com o cupom e a retirada: 14,5% no total, porque os 5% saem do valor já com o cupom.',
      },
      {
        question: 'Existe cupom Petz de 15%?',
        answer:
          'O EMCASA dá 10%. Quando aparece "até 15%", em geral é a soma desses 10% com os 5% do Retire na Loja, que vale em compras acima de R$ 199 no Centro-Oeste, no Sul e no Sudeste. Como os 5% saem do valor já com o cupom, a soma dá 14,5%.',
      },
      {
        question: 'Onde coloco o cupom na Petz?',
        answer:
          'Na sacola: cole o EMCASA no campo "Digite seu cupom" e aplique. O desconto aparece em "Total de descontos", no resumo do pedido.',
      },
      {
        question: 'O botão desta página já aplica o cupom?',
        answer:
          'Não. O botão abre a loja da Cecília dentro da Petz, mas o desconto só entra quando você coloca o EMCASA no campo de cupom da sacola.',
      },
      {
        question: 'O cupom EMCASA vale no app da Petz?',
        answer: 'Sim. O cupom do programa Parceiro Petz vale nas compras no app e no site da Petz.',
      },
      {
        question: 'O cupom soma com o desconto da Assinatura Petz?',
        answer:
          'Não. A Petz informa que o desconto da assinatura não soma com outros cupons. O EMCASA entra nas compras avulsas.',
      },
      {
        question: 'O cupom EMCASA está funcionando hoje?',
        answer:
          'Sim. No teste mais recente, o EMCASA aplicou os 10% na sacola. A data e os valores do teste estão em "Como testamos o cupom", nesta página.',
      },
      {
        question: 'O cupom EMCASA vale para quem já é cliente da Petz?',
        answer:
          'Sim. O EMCASA dá 10% no site e no app da Petz para quem compra pela primeira vez e para quem já comprou.',
      },
      {
        question: 'O que fazer se o cupom EMCASA não funcionar?',
        answer:
          'Confira se o código foi colado no campo "Digite seu cupom" da sacola, sem espaços. Se o produto estiver numa promoção maior que 10%, a sacola mantém o preço da promoção. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.',
      },
      {
        question: 'Tem cupom Petz na Black Friday?',
        answer:
          'Tem. O cupom Petz EMCASA dá 10% OFF no site e no app, e é o mesmo código do resto do ano.',
      },
      {
        question: 'O cupom Petz vale na Black Friday?',
        answer:
          'O cupom Petz EMCASA não soma com a oferta da Black Friday: pelo regulamento da campanha, a sacola fica com o desconto maior em cada item. Nos itens fora da oferta, ele dá os 10% e soma com o desconto de retirada na loja.',
      },
      {
        question: 'Comprar com o cupom apoia o Em Casa com Cecília?',
        answer:
          'Sim, a compra pode gerar comissão para o Em Casa com Cecília, sem custo extra para você. O desconto aparece no resumo do pedido quando o cupom é aceito.',
      },
    ],
    monthlyHighlight: {
      scope: 'no site e no app',
      note: 'Na retirada em loja, em compras acima de R$ 199 no Centro-Oeste, no Sul e no Sudeste, a Petz tira mais 5% do valor já com o cupom: 14,5% no total. Em produto já em promoção, o cupom não soma: vale o desconto maior',
    },
    status: 'ativo',
    featured: false,
  },
  {
    offerMode: 'discount-code',
    slug: 'prohall',
    cartPrint: { src: '/images/reviews/prohall/cupom-prohall-checkout-com-cupom.webp', alt: 'Resumo da compra no checkout da Prohall com o aviso "Cupom CECILIAMC aplicado", a linha Cupom CECILIAMC de menos R$ 26,64 e o total de R$ 354,06', aspectRatio: 0.473 },
    brand: 'Prohall',
    officialUrl: 'https://lojaprohall.com.br/',
    offerUrl: 'https://lojaprohall.com.br/',
    brandIcon: 'PH',
    brandLogo: '/images/about/partners/prohall-icon.png',
    brandLogoAlt: 'Marca Prohall',
    bubble: { src: '/images/logos/bolinhas/prohall.png' },
    brandWatermark: '/images/logos/watermarks/prohall.webp',
    brandColor: '#111111',
    code: 'CECILIAMC',
    codeFieldLabel: 'Código do cupom',
    discount: 'Até 10% OFF',
    discountNumber: 10,
    category: 'Cabelos e tratamento capilar',
    hubCategory: 'beleza',
    shortDescription: 'produtos para cabelo no site oficial da Prohall',
    longDescription:
      'O cupom Prohall CECILIAMC dá até 10% OFF no site oficial, para quem compra pela primeira vez e para quem já é cliente, e soma com as promoções: nos nossos testes, tirou 7% de produtos a preço cheio e em promoção. Vale em todas as formas de pagamento.',
    metaTitle: 'Cupom Prohall: até 10% OFF com CECILIAMC',
    metaTitleMonth: true,
    metaDescription:
      'Cupom Prohall: CECILIAMC dá até 10% OFF para cliente novo ou antigo, soma com as promoções do site e vale no Pix e no cartão. Nos testes, deu 7%.',
    eligibleCategories: 'Produtos do site oficial da Prohall; o desconto chega a 10% e pode ser menor: nos nossos testes, foi de 7%',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Pode ser usado em mais de uma compra, segundo a parceria',
    shipping: 'Frete grátis a partir de um mínimo por região, segundo a página de pagamento e envio da loja: R$ 99 no Sudeste, R$ 149 no Sul, R$ 179 no Centro-Oeste e R$ 199 no Norte e no Nordeste; o mínimo conta depois do cupom',
    combinable:
      'Soma com as promoções vigentes do site e vale com todas as formas de pagamento; não junta com o cupom de cashback da loja',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Entra sobre o preço promocional: nos testes, tirou 7% de produtos que já estavam com desconto' },
      { benefit: 'pix', stacks: 'sim', condition: 'Soma com o desconto do Pix, quando a loja oferece; o percentual aparece na hora do pagamento' },
      { benefit: 'cashback', stacks: 'nao', condition: 'O cashback da loja chega como cupom para a compra seguinte e não junta com outro cupom' },
      { benefit: 'frete', stacks: 'depende', condition: 'Grátis a partir de R$ 99 no Sudeste, R$ 149 no Sul, R$ 179 no Centro-Oeste e R$ 199 no Norte e no Nordeste; o mínimo conta depois do cupom' },
    ],
    paymentPerks: [
      'Até 10x sem juros no cartão, com parcela mínima de R$ 20',
    ],
    lastVerified: '2026-11-12',
    testedAt: '2026-11-12',
    testNote:
      'Num carrinho de quatro itens, com o kit Shampoo + Condicionador Absolut One em promoção, de R$ 149,90 por R$ 89,90, o CECILIAMC tirou R$ 26,64 dos R$ 380,70 e o total caiu para R$ 354,06: 7%. No mesmo dia, aplicamos o código em outros quatro carrinhos, com produtos a preço cheio e em promoção, e o desconto foi de 7% em todos: o Force Hair foi de R$ 264,90 para R$ 246,36, e o Kit Completo Absolut One, de R$ 349,90 para R$ 325,41.',
    aboutBrand:
      'A Prohall é uma marca brasileira de produtos para cabelo, fundada em 2017 em Lençóis Paulista (SP), com escovas antifrizz, shampoos, condicionadores, máscaras, óleos, séruns e finalizadores vendidos no site oficial. O cupom CECILIAMC é o benefício da parceria para quem acompanha o Em Casa com Cecília e dá até 10% OFF: nos nossos testes, o desconto foi de 7%, e o resumo da compra mostra o valor. Ele vale com qualquer forma de pagamento e soma com as promoções do site.',
    faqs: [
      {
        question: 'Quanto de desconto o cupom CECILIAMC dá?',
        answer:
          'Até 10% OFF, segundo a parceria. Nos nossos testes, o desconto foi de 7%, em produtos a preço cheio e em promoção. O resumo da compra mostra o valor assim que o código é aceito.',
      },
      {
        question: 'O cupom CECILIAMC vale no Pix, no cartão e em outras formas de pagamento?',
        answer:
          'Sim. O cupom vale com todas as formas de pagamento disponíveis no checkout, e o desconto não depende do meio escolhido.',
      },
      {
        question: 'O cupom Prohall vale na primeira compra?',
        answer: 'Sim. O CECILIAMC vale na primeira compra e também para quem já comprou na loja.',
      },
      {
        question: 'Qual cupom Prohall vale para quem já é cliente?',
        answer:
          'O CECILIAMC. Ele dá até 10% no site oficial para quem compra pela primeira vez e para quem já comprou, e pode ser usado em mais de uma compra.',
      },
      {
        question: 'O CECILIAMC é cupom de influenciadora?',
        answer:
          'Sim. É o código da Cecília, do Em Casa com Cecília, testado por nós no checkout. Não testamos a soma com o cupom de outra pessoa; o resumo da compra mostra qual código ficou aplicado.',
      },
      {
        question: 'O cupom soma com produtos em promoção?',
        answer:
          'Sim. No nosso teste, o cupom entrou num carrinho em que os produtos já estavam com desconto da loja: o total foi de R$ 380,70 para R$ 354,06.',
      },
      {
        question: 'O cupom CECILIAMC soma com o cashback da Prohall?',
        answer:
          'Não no mesmo pedido. A Prohall dá 10% de cashback em compras a partir de R$ 100, como cupom para a compra seguinte, válido por 30 dias, e a loja avisa que esse cupom não junta com outros.',
      },
      {
        question: 'O cupom CECILIAMC está funcionando hoje?',
        answer:
          'Sim. No teste de checkout mais recente, o CECILIAMC foi aceito. A data e os valores do teste estão em "Como testamos o cupom", nesta página.',
      },
      {
        question: 'Onde coloco o cupom na Prohall?',
        answer:
          'No checkout do site oficial: toque em "Tem um cupom?", digite CECILIAMC no campo "Código do cupom" e toque em "Aplicar". O resumo da compra passa a mostrar a linha "Cupom CECILIAMC".',
      },
      {
        question: 'O cupom CECILIAMC vale no app da Prohall?',
        answer: 'Sim. O CECILIAMC vale no site oficial e no app da Prohall.',
      },
      {
        question: 'O cupom dá frete grátis?',
        answer:
          'O cupom não dá frete grátis. A Prohall tem frete grátis a partir de R$ 99 no Sudeste, R$ 149 no Sul, R$ 179 no Centro-Oeste e R$ 199 no Norte e no Nordeste. O mínimo conta depois do cupom: é o valor do carrinho já com o desconto que precisa chegar a ele.',
      },
      {
        question: 'O que fazer se o cupom CECILIAMC não funcionar?',
        answer:
          'Confira se o código foi digitado no campo "Código do cupom", sem espaços, no site oficial da Prohall, e se o cupom de cashback da loja não está aplicado no mesmo pedido. Lembre que o desconto pode ser menor que 10%. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.',
      },
      {
        question: 'Tem cupom Prohall na Black Friday?',
        answer:
          'Tem. O cupom Prohall CECILIAMC dá até 10% OFF no site oficial e no app, em todas as formas de pagamento; nos nossos testes, o desconto foi de 7%.',
      },
      {
        question: 'O cupom Prohall vale na Black Friday?',
        answer:
          'Vale. O cupom Prohall CECILIAMC dá até 10% OFF em cima do preço da campanha: nos nossos testes, tirou 7% de produtos que já estavam em promoção.',
      },
      {
        question: 'Comprar com o cupom apoia o Em Casa com Cecília?',
        answer:
          'Sim, a compra pode gerar comissão para o Em Casa com Cecília, sem custo extra para você. O desconto aparece no checkout quando o cupom é aceito.',
      },
    ],
    monthlyHighlight: {
      scope: 'no site oficial',
      note: 'O desconto chega a 10%; nos nossos testes, foi de 7%',
    },
    status: 'ativo',
    featured: false,
  },
  {
    offerMode: 'discount-code',
    slug: 'la-ganexa',
    cartPrint: { src: '/images/reviews/laganexa/cupom-laganexa-checkout-com-cupom.webp', alt: 'Resumo da compra no checkout da La Ganexa com o cupom CECILIA no campo de cupom, a linha Descontos de menos R$ 26,44 e o total de R$ 237,96', aspectRatio: 1.473 },
    brand: 'La Ganexa',
    officialUrl: 'https://lojalaganexa.com.br/',
    offerUrl: 'https://lojalaganexa.com.br/',
    brandIcon: 'LG',
    brandLogo: '/images/about/partners/laganexa-icon.png',
    brandLogoAlt: 'Marca La Ganexa',
    bubble: { src: '/images/logos/bolinhas/laganexa.png' },
    brandWatermark: '/images/logos/watermarks/laganexa.webp',
    brandColor: '#2B1408',
    code: 'CECILIA',
    codeFieldLabel: 'Cupom (opcional)',
    discount: '10% OFF',
    discountNumber: 10,
    category: 'Pastas de amendoim e doces zero açúcar',
    hubCategory: 'alimentacao',
    shortDescription: 'pastas de amendoim e doces zero açúcar no site oficial da La Ganexa',
    longDescription:
      'O cupom La Ganexa CECILIA dá 10% OFF no site oficial, para quem compra pela primeira vez e para quem já é cliente, e soma com as promoções: no nosso teste, tirou 10% de um carrinho só com produtos em promoção. Vale em todas as formas de pagamento.',
    metaTitle: 'Cupom La Ganexa: 10% OFF com CECILIA',
    metaTitleMonth: true,
    metaDescription:
      'Cupom La Ganexa: CECILIA dá 10% OFF para cliente novo ou antigo, soma com as promoções do site e vale no Pix e no cartão. Testado no checkout.',
    eligibleCategories: 'Produtos do site oficial da La Ganexa; os kits que a loja marca como não cumulativos ficam de fora',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Pode ser usado por clientes novos e antigos',
    shipping: 'Frete grátis acima de R$ 250 no Sul e no Sudeste e de R$ 350 nas demais regiões, segundo a política de frete da loja; os kits promocionais que a loja deixa fora da regra não contam para o mínimo',
    combinable:
      'Soma com as promoções vigentes do site e vale com todas as formas de pagamento; os kits que a loja marca como não cumulativos não aceitam cupom',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Entra sobre o preço promocional; os kits de 2 Doce de Leite e de 2 Brigadeiros de Colher não acumulam com cupom, pelas regras da loja' },
      { benefit: 'pix', stacks: 'sim', condition: 'Soma com o desconto do Pix, quando a loja oferece; o percentual aparece na hora do pagamento' },
      { benefit: 'frete', stacks: 'depende', condition: 'Grátis acima de R$ 250 no Sul e no Sudeste e de R$ 350 nas demais regiões' },
    ],
    paymentPerks: [
      'Até 3x sem juros no cartão; de 4x a 12x, com juros da operadora',
    ],
    lastVerified: '2026-11-13',
    testedAt: '2026-11-13',
    testNote:
      'Num carrinho de quatro itens, todos com preço promocional, entre eles o Kit Degustação Pasta de Amendoim com 6 sabores, de R$ 149,99 por R$ 139,99, e o Doce de Leite Zero 400g, de R$ 84,99 por R$ 69,99, o CECILIA tirou R$ 26,44 dos R$ 264,40 e o total caiu para R$ 237,96: os 10% entraram sobre os preços em promoção.',
    aboutBrand:
      'A La Ganexa é uma marca brasileira de pastas de amendoim e doces zero açúcar e zero glúten, com fábrica em Peruíbe (SP): pastas de amendoim, doce de leite, cookies, panquecas, suspiros e alfajores, vendidos no site oficial. O cupom CECILIA é o benefício da parceria para quem acompanha o Em Casa com Cecília: 10% OFF, com qualquer forma de pagamento e sobre os preços em promoção do site.',
    faqs: [
      {
        question: 'Quanto de desconto o cupom CECILIA dá?',
        answer:
          '10% OFF. No nosso teste, o cupom tirou R$ 26,44 de um carrinho de R$ 264,40, e o resumo da compra mostrou o valor na linha Descontos.',
      },
      {
        question: 'O cupom CECILIA vale no Pix, no cartão e em outras formas de pagamento?',
        answer:
          'Sim. O cupom vale com todas as formas de pagamento disponíveis no checkout, e o desconto não depende do meio escolhido.',
      },
      {
        question: 'O cupom La Ganexa vale na primeira compra?',
        answer: 'Sim. O CECILIA vale na primeira compra e também para quem já comprou na loja.',
      },
      {
        question: 'Qual cupom La Ganexa vale para quem já é cliente?',
        answer:
          'O CECILIA. Ele dá 10% no site oficial para quem compra pela primeira vez e para quem já comprou.',
      },
      {
        question: 'O CECILIA é cupom de influenciadora?',
        answer:
          'Sim. É o código da Cecília, do Em Casa com Cecília, testado por nós no checkout. Não testamos a soma com o cupom de outra pessoa; o resumo da compra mostra qual código ficou aplicado.',
      },
      {
        question: 'O cupom soma com produtos em promoção?',
        answer:
          'Sim. No nosso teste, todos os produtos do carrinho já estavam com preço promocional, e o cupom tirou os 10% do total. A exceção são os kits que a loja marca como não cumulativos, como o de 2 Doce de Leite e o de 2 Brigadeiros de Colher.',
      },
      {
        question: 'O cupom CECILIA está funcionando hoje?',
        answer:
          'Sim. No teste de checkout mais recente, o CECILIA foi aceito. A data e os valores do teste estão em "Como testamos o cupom", nesta página.',
      },
      {
        question: 'Onde coloco o cupom na La Ganexa?',
        answer:
          'No checkout do site oficial: no Resumo da compra, toque em "Inserir cupom de desconto", digite CECILIA no campo "Cupom (opcional)" e toque em "Adicionar". O resumo passa a mostrar a linha "Descontos".',
      },
      {
        question: 'Tem cupom La Ganexa na Black Friday?',
        answer:
          'Tem. O cupom La Ganexa CECILIA dá 10% OFF no site oficial, em todas as formas de pagamento, e é o mesmo código do resto do ano.',
      },
      {
        question: 'O cupom La Ganexa vale na Black Friday?',
        answer:
          'O cupom La Ganexa CECILIA dá 10% OFF e soma com os preços promocionais do site: no nosso teste, entrou num carrinho só com produtos em promoção. Os kits que a loja marca como não cumulativos ficam de fora; confira a linha Descontos antes de pagar.',
      },
      {
        question: 'O cupom dá frete grátis?',
        answer:
          'O cupom não dá frete grátis. A La Ganexa tem frete grátis acima de R$ 250 no Sul e no Sudeste e de R$ 350 nas demais regiões.',
      },
      {
        question: 'O que fazer se o cupom CECILIA não funcionar?',
        answer:
          'Confira se o código foi digitado no campo "Cupom (opcional)", sem espaços, no site oficial da La Ganexa, e se o carrinho não tem só kits que a loja marca como não cumulativos com cupom. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.',
      },
      {
        question: 'Comprar com o cupom apoia o Em Casa com Cecília?',
        answer:
          'Sim, a compra pode gerar comissão para o Em Casa com Cecília, sem custo extra para você. O desconto aparece no checkout quando o cupom é aceito.',
      },
    ],
    monthlyHighlight: {
      scope: 'no site oficial',
      note: 'Soma com os preços em promoção do site',
    },
    status: 'ativo',
    featured: false,
  },
  {
    offerMode: 'discount-code',
    slug: 'hostinger',
    cartPrint: { src: '/images/reviews/hostinger/cupom-hostinger-carrinho-com-cupom.webp', alt: 'Resumo do pedido no carrinho da Hostinger com a linha Cupom aplicado e a etiqueta SONAR20', aspectRatio: 1.096 },
    brand: 'Hostinger',
    officialUrl: 'https://www.hostinger.com/',
    // Programa de agências do Bruno (29/10/2026): o SONAR20 vale digitado no carrinho e também vai no link de
    // indicação. Não editar o link.
    offerUrl: 'https://www.hostinger.com/br?REFERRALCODE=SONAR20',
    brandIcon: 'H',
    brandLogo: '/images/about/partners/hostinger-icon.png',
    brandLogoAlt: 'Marca Hostinger',
    bubble: { src: '/images/logos/bolinhas/hostinger.png', background: '#673DE6' },
    brandWatermark: '/images/logos/watermarks/hostinger.webp',
    brandColor: '#673DE6',
    code: 'SONAR20',
    discount: '20% OFF',
    discountNumber: 20,
    category: 'Hospedagem de sites e domínios',
    hubCategory: 'diversos',
    shortDescription: 'todos os planos da Hostinger, mensais ou anuais, para clientes novos e antigos',
    longDescription:
      'O cupom Hostinger SONAR20 dá 20% OFF em todos os planos, mensais ou anuais, para quem está chegando e para quem já é cliente. Cole o código no campo de cupom do carrinho. Testado no plano Startup, sobre o preço de Black Friday. O Em Casa com Cecília roda na Hostinger desde 2024.',
    metaTitle: 'Cupom Hostinger: 20% OFF em tudo com SONAR20',
    metaTitleMonth: true,
    metaDescription:
      'Cupom Hostinger: SONAR20 dá 20% OFF em planos mensais e anuais, para cliente novo ou antigo, inclusive na Black Friday.',
    eligibleCategories: 'Compra nova de qualquer plano da Hostinger, mensal ou anual, para clientes novos e antigos; a renovação sai sem desconto',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Vale em compra nova, para clientes novos e para quem já tem conta na Hostinger; na renovação, não há desconto',
    shipping: 'Não se aplica',
    combinable:
      'Soma com as promoções da Hostinger: no nosso teste mais recente, os 20% entraram sobre o preço de Black Friday; a soma com outros cupons não foi testada',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Os 20% entram sobre o preço promocional que a Hostinger já mostra no carrinho' },
    ],
    paymentPerks: [
      'O total do plano pode ser dividido em até 12 parcelas no cartão',
    ],
    lastVerified: '2026-11-12',
    testedAt: '2026-11-12',
    testNote:
      'Aplicamos o SONAR20 no campo "Tem um cupom de desconto?" do carrinho da Hostinger com o plano Single de 48 meses: o total foi de R$ 287,52 para R$ 230,02, R$ 57,50 a menos, 20% sobre o preço de Black Friday que a Hostinger já mostrava. Em 07/11/2026, com o plano Startup, que não entra no link de indicação, o período de 48 meses foi de R$ 1.919,52 para R$ 1.535,62 e o de 1 mês, de R$ 139,99 para R$ 111,99. No site global, em dólar, no teste de 29/10/2026, o mesmo plano Startup de 48 meses caiu de US$ 383,52 para US$ 306,82.',
    codeFieldLabel: 'Tem um cupom de desconto?',
    codeInstructions: [
      'Copie o código SONAR20 no card acima.',
      'Abra a Hostinger pelo botão desta página, escolha o plano e o período e siga para o carrinho.',
      'No resumo do pedido, clique em "Tem um cupom de desconto?", cole o SONAR20 e clique em Aplicar.',
      'Confira o desconto no carrinho antes de pagar. A renovação, no fim do período, sai pelo preço de tabela que aparece abaixo do plano.',
    ],
    aboutBrand:
      'A Hostinger é uma empresa de hospedagem de sites, com planos de hospedagem, criador de sites, VPS, domínios e e-mail. O Em Casa com Cecília roda na Hostinger desde 2024, como aplicação Node.js. O SONAR20 é o cupom da parceria: dá 20% OFF em todos os planos, para clientes novos e antigos.',
    faqs: [
      {
        question: 'O cupom SONAR20 da Hostinger está funcionando hoje?',
        answer:
          'Sim. No teste mais recente, o SONAR20 tirou 20% do plano Single de 48 meses no site brasileiro. A data e os valores do teste estão em "Como testamos o cupom", nesta página.',
      },
      {
        question: 'O SONAR20 vale para quem já é cliente da Hostinger?',
        answer: 'Sim, em compra nova: o cupom vale para quem está chegando e para quem já tem conta na Hostinger e contrata um plano novo. Na renovação de um plano, não há desconto.',
      },
      {
        question: 'Tem cupom de primeira compra na Hostinger?',
        answer:
          'Sim. O SONAR20 dá 20% OFF já no primeiro plano, mensal ou anual, e vale também para quem já é cliente.',
      },
      {
        question: 'Existe cupom Hostinger de 15%?',
        answer:
          'O SONAR20 dá mais: 20% OFF em todos os planos, mensais ou anuais, para clientes novos e antigos. No teste, os 20% entraram sobre o preço de Black Friday que a Hostinger já mostrava.',
      },
      {
        question: 'O cupom vale no plano mensal?',
        answer:
          'Sim. Num teste nosso, o plano Startup de 1 mês caiu de R$ 139,99 para R$ 111,99 com o SONAR20, os mesmos 20% do plano de 48 meses.',
      },
      {
        question: 'Onde coloco o cupom na Hostinger?',
        answer:
          'No carrinho, no resumo do pedido: clique em "Tem um cupom de desconto?", cole o SONAR20 e clique em Aplicar. O desconto aparece na linha "Cupom aplicado".',
      },
      {
        question: 'Preciso colar o cupom se eu entrar pelo link?',
        answer:
          'Confira o resumo do pedido: se não aparecer "Cupom aplicado", cole o SONAR20 no campo de cupom. O link desta página abre a Hostinger com a indicação do mesmo código.',
      },
      {
        question: 'O cupom Hostinger vale na Black Friday?',
        answer:
          'Vale. O cupom Hostinger SONAR20 dá 20% OFF em compra nova e, no nosso teste mais recente, entrou sobre o preço de Black Friday que a Hostinger já mostrava no carrinho.',
      },
      {
        question: 'O desconto vale na renovação?',
        answer:
          'Não. Os 20% do SONAR20 valem só na compra nova: pela regra do programa de indicação da Hostinger, a renovação sai pelo preço de tabela, sem desconto. Na compra nova, ele vale também no VPS; só não vale no registro de domínio. O carrinho mostra o preço de renovação abaixo do plano; confira esse valor antes de pagar.',
      },
      {
        question: 'O Em Casa com Cecília usa a Hostinger?',
        answer: 'Sim. O site roda na Hostinger desde 2024, como aplicação Node.js.',
      },
      {
        question: 'Comprar com o cupom apoia o Em Casa com Cecília?',
        answer:
          'Sim, a compra com o SONAR20 pode gerar comissão para o Em Casa com Cecília, sem custo extra para você.',
      },
    ],
    monthlyHighlight: {
      scope: 'em todos os planos',
      note: 'Vale na compra nova, para clientes novos e antigos, em planos mensais ou anuais; a renovação sai sem desconto',
    },
    status: 'ativo',
    featured: false,
  },
];

export const COUPONS: Coupon[] = STORE_COUPONS.map(withMercadoLivreCouponsFaq);

export function getActiveCoupons(): Coupon[] {
  return COUPONS.filter((coupon) => coupon.status === 'ativo');
}

export function getCouponBySlug(slug: string): Coupon | undefined {
  return COUPONS.find((coupon) => coupon.slug === slug && coupon.status === 'ativo');
}

// O tipo do código que um artigo mostra quando ele é o da loja em /cupons: o de recompensa da
// loja (YesStyle), o de indicação (SHEIN) ou nenhum, que é cupom comum. Outro código, ou outra
// loja, também não tem tipo.
export function getStoreCodeKind(store: Coupon | undefined, code: string | undefined): CouponCodeKind | undefined {
  if (!store || !code) return undefined;
  if (store.offerMode === 'discount-code') return store.code === code ? store.codeKind : undefined;
  return store.referral?.code === code ? 'referral' : undefined;
}

export function getOtherActiveCoupons(currentSlug: string): Coupon[] {
  return getActiveCoupons().filter((coupon) => coupon.slug !== currentSlug);
}

export function getAllActiveCouponSlugs(): string[] {
  return getActiveCoupons().map((coupon) => coupon.slug);
}

export function getCouponHubSections() {
  const activeCoupons = getActiveCoupons();

  return {
    featured: activeCoupons.filter((coupon) => coupon.featured),
    categories: COUPON_HUB_CATEGORIES.map((category) => ({
      ...category,
      coupons: activeCoupons.filter((coupon) => coupon.hubCategory === category.id),
    })).filter((category) => category.coupons.length > 0),
  };
}
