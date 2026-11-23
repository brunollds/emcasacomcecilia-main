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
// `round`: a marca ocupa o disco quase inteiro, em vez dos 64% de um logo que precisa de margem: o selo redondo da
// Dolce Gusto e o letreiro largo da Starlink, que não tem símbolo à parte.
export type CouponBubble = { src: string; background?: string; round?: boolean };

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
  // Tamanho do cartão na prateleira do hub em PT (Bruno, 16/11/2026): 'destaque' é o cartão largo, no começo da
  // prateleira; 'reduzido', o estreito, no fim. Sem o campo, a largura sai do conteúdo (layoutShelf) e a loja fica
  // na ordem deste arquivo.
  hubCard?: 'destaque' | 'reduzido';
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
  // Tira a loja só da vitrine da home em português (a bolinha e o painel dela). Ela segue em /cupons, na página
  // dela, nas bolinhas de /reviews, na subpágina /reviews/loja, nas homes dos outros idiomas e nos artigos.
  hideFromPortugueseHome?: true;
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
  // percentual de hoje; trocou a oferta, troca ou tira o print. Na SHEIN, é o código de indicação na busca.
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
export type StackingBenefit = 'promocoes' | 'assinatura' | 'retirada' | 'pix' | 'cashback' | 'outro-cupom' | 'frete';
// `label` troca o nome do benefício quando a loja tem um nome próprio para ele (o giftback da DAMIE).
export type StackingRow = { benefit: StackingBenefit; stacks: 'sim' | 'nao' | 'depende'; condition: string; label?: string };

// O print do código aplicado no carrinho. Pode ser o mesmo de um artigo "como usar o cupom" da loja (`article` é o
// slug dele, e a página ganha o link do passo a passo) ou um print próprio da página, sem `article`.
// É demonstração visual: não diz a data do teste nem promete os valores da imagem. `aspectRatio` é largura / altura.
// `caption` troca a legenda padrão quando o código não entra no carrinho (o de indicação da SHEIN, que se pesquisa).
export type CartPrint = { article?: string; src: string; alt: string; aspectRatio: number; caption?: string };

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

// Um link de afiliado por produto da marca (Proton Mail, Proton VPN…), além do link principal do botão. A página da loja
// mostra a seção "Links por produto" com um link patrocinado para cada um; a tradução repete os mesmos endereços, na
// mesma ordem, e traduz o nome e a descrição.
export type ProductLink = { name: string; url: string; description: string };

export type AffiliateLinkOffer = CouponBase & {
  offerMode: 'affiliate-link';
  productLinks?: ProductLink[];
  linkInstructions?: string[];
  // Aviso no fim de "Como acessar a oferta"; sem ele a página usa o aviso padrão de link.
  linkNote?: string;
  // A frase acima do botão no recorte e no cartão de /cupons; sem ela, a padrão ("Sem cupom para copiar…").
  cutoutNote?: string;
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
    cartPrint: { article: 'cupom-cecilia12-como-usar', src: '/images/reviews/cupom-cecilia12/4-confirme-desconto-recorte.webp', alt: 'Resumo do pedido da DAMIE com o CECILIA12 no campo de cupom e a linha Descontos', aspectRatio: 1 },
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
        question: 'Qual é o cupom da DAMIE?',
        answer:
          'O cupom da DAMIE da nossa parceria é o CECILIA12, com 12% OFF em todo o site oficial, em todas as formas de pagamento, e soma com as promoções e com os 10% do Pix. Não soma com outro cupom nem com o giftback de 15% e não vale no Mercado Livre.',
      },
      {
        question: 'O cupom CECILIA12 funciona em todos os produtos da DAMIE?',
        answer:
          'Sim. O CECILIA12 dá 12% OFF em todos os produtos disponíveis no site da DAMIE, sem restrição de categoria ou modelo.',
      },
      {
        question: 'O cupom CECILIA12 vale em todas as formas de pagamento?',
        answer:
          'Sim. O CECILIA12 vale em todas as formas de pagamento do checkout da DAMIE. O desconto de 12% não depende do meio de pagamento escolhido.',
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
          'Tem. O cupom DAMIE CECILIA12 dá 12% OFF em todos os produtos do site, em todas as formas de pagamento, e é o mesmo código do resto do ano. A Black Friday da DAMIE vai até 27/11: R$ 1.000 de desconto nas poltronas, já no preço, e massagem, entrada USB e porta-copos de brinde na compra de poltrona.',
      },
      {
        question: 'O cupom DAMIE vale na Black Friday?',
        answer:
          'Vale. O CECILIA12 soma com as promoções, os brindes e o desconto do Pix; só não soma com outro cupom nem com o giftback.',
      },
      {
        question: 'Comprar com o cupom muda o preço para mim?',
        answer:
          'Não no sentido de custo extra. Você recebe o desconto informado quando o cupom é aceito, e o Em Casa com Cecília pode receber comissão da marca por indicação.',
      },
    ],
    status: 'ativo',
    featured: true,
    featuredPitch: 'Poltronas reclináveis, sofás e camas.',
    relatedContent: [
      {
        title: 'Como usar o cupom CECILIA12 na DAMIE',
        url: '/reviews/cupom-cecilia12-como-usar',
        type: 'review',
        publishedAt: '2026-06-11',
      },
      {
        title: 'Black Friday DAMIE 2026',
        url: '/reviews/black-friday-damie',
        type: 'review',
        publishedAt: '2026-10-09',
      },
      {
        title: 'Poltrona DAMIE é boa? Minha experiência com a 2.0',
        url: '/reviews/poltrona-damie-e-boa',
        type: 'review',
        publishedAt: '2026-07-21',
      },
      {
        title: 'DAMIE no Reclame Aqui: o que os dados mostram',
        url: '/reviews/damie-reclame-aqui-o-que-os-dados-mostram',
        type: 'review',
        publishedAt: '2026-06-20',
      },
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
      note: 'Válido em todas as formas de pagamento e soma com os 10% do Pix',
      showCheckoutReminder: false,
    },
  },
  {
    offerMode: 'discount-code',
    slug: 'dolce-gusto',
    cartPrint: { article: 'cupom-ceci-nescafe-dolce-gusto-como-usar', src: '/images/reviews/dolcegusto/cupom-dolce-gusto-carrinho-com-cupom.webp', alt: 'Carrinho da NESCAFÉ Dolce Gusto com o código CECI aplicado e, no resumo do pedido, a linha Você ganhou 10% OFF', aspectRatio: 1.263 },
    brand: 'Dolce Gusto',
    officialUrl: 'https://www.nescafe-dolcegusto.com.br/',
    offerUrl: 'https://www.nescafe-dolcegusto.com.br/',
    brandIcon: 'DG',
    brandLogo: '/images/about/partners/dolce-gusto.avif',
    brandLogoAlt: 'Marca Nescafé Dolce Gusto',
    bubble: { src: '/images/logos/bolinhas/dolce-gusto.png', round: true },
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
      'O cupom Dolce Gusto CECI dá 10% OFF na loja oficial Nescafé Dolce Gusto em compras a partir de R$ 100, para quem compra pela primeira vez e para quem já é cliente, e soma com as promoções, inclusive nas máquinas. Testado numa Mini Me 2.0 em promoção, de R$ 369,90, com R$ 36,99 de desconto.',
    metaTitle: 'Cupom Dolce Gusto: 10% OFF com CECI',
    metaTitleMonth: true,
    metaDescription:
      'Cupom Dolce Gusto: CECI dá 10% OFF na loja oficial em compras a partir de R$ 100, para cliente novo ou antigo, e soma com as promoções.',
    eligibleCategories:
      'Todo o site oficial Dolce Gusto, em compras a partir de R$ 100',
    validity: 'Cupom permanente enquanto a parceria estiver ativa',
    reusable: 'Sim, vale em mais de um pedido',
    shipping: 'O cupom desconta só os produtos; o frete segue a política da loja',
    combinable: 'Soma com as promoções vigentes da loja oficial e com a assinatura; não vale com o resgate de pontos do Club',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Os 10% entram sobre o preço promocional, inclusive em produtos que já estão em promoção' },
      { benefit: 'assinatura', stacks: 'sim', condition: 'Os 10% entram sobre o preço do plano quando o subtotal, já com o desconto da assinatura, passa de R$ 100' },
      { benefit: 'pix', stacks: 'sim', condition: 'Soma com o desconto do Pix, quando a loja oferece; o percentual aparece na hora do pagamento' },
    ],
    codeFieldLabel: 'Código do voucher',
    lastVerified: '2026-11-23',
    testedAt: '2026-11-17',
    testNote:
      'Numa máquina Mini Me 2.0 em promoção, de R$ 599,90 por R$ 369,90, o CECI tirou R$ 36,99, os 10%, e o total caiu para R$ 332,91. Em 12/11/2026, num carrinho de sete caixas de Espresso Intenso, de R$ 19,99 cada, o CECI tirou R$ 13,99 dos R$ 139,93 e o total caiu para R$ 125,94; no mesmo dia, num combo da Black Friday, de R$ 207,20 por R$ 145,04, o CECI tirou R$ 14,50 e o total caiu para R$ 130,54. Em 11/11/2026, em sete caixas de Cappuccino em promoção, de R$ 25,90 por R$ 15,90 cada, o CECI tirou R$ 11,13 dos R$ 111,30. Em 26/10/2026, com o carrinho abaixo de R$ 100, a loja recusou o cupom.',
    aboutBrand:
      'A Nescafé Dolce Gusto é uma linha de cafés e bebidas em cápsulas da Nestlé, com máquinas e sabores pensados para preparo rápido em casa. A marca combina praticidade com variedade: cafés intensos, bebidas com leite, cappuccinos, chocolates e opções geladas aparecem no catálogo da loja oficial. O cupom CECI entra como benefício para quem acompanha a Cecília e quer economizar em compras na loja oficial. Como em toda parceria comercial, a recomendação deve ser conferida no checkout: o desconto aparece antes da finalização quando a regra da campanha permite.',
    faqs: [
      {
        question: 'Qual é o cupom da Dolce Gusto?',
        answer:
          'É o CECI, com 10% OFF na loja oficial e no app da Nescafé Dolce Gusto em compras a partir de R$ 100, em todas as formas de pagamento. No carrinho, clique em "Resgatar códigos promocionais", digite CECI em "Código do voucher" e confira a linha do desconto antes de pagar.',
      },
      {
        question: 'O cupom CECI vale para todas as cápsulas Dolce Gusto?',
        answer:
          'No nosso teste no carrinho, o CECI aplicou 10% OFF no site oficial Dolce Gusto em compras a partir de R$ 100. A elegibilidade pode variar; confirme o desconto no resumo do carrinho antes de finalizar.',
      },
      {
        question: 'O cupom CECI funciona em máquinas Dolce Gusto?',
        answer:
          'Funciona. No nosso teste, o CECI tirou 10% de uma Mini Me 2.0 que já estava em promoção: R$ 36,99 de desconto, e a máquina de R$ 369,90 saiu por R$ 332,91. O resumo do carrinho mostra a linha "Você ganhou 10% OFF" antes de pagar.',
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
          'O código da parceria é o CECI: 10% em compras a partir de R$ 100. Os descontos maiores da Dolce Gusto vêm das promoções da própria loja, e o CECI soma com elas: os 10% entram sobre o preço promocional.',
      },
      {
        question: 'Posso usar o cupom CECI mais de uma vez?',
        answer:
          'Pode. O CECI vale em mais de um pedido, sempre em compras a partir de R$ 100. Se o checkout recusar o código, confira o valor do carrinho e se há resgate de pontos do Club no pedido.',
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
        question: 'O cupom CECI vale para CNPJ, na Dolce Gusto Negócios?',
        answer:
          'Vale. O CECI vale em todo o site oficial, inclusive na área para CNPJ, e soma com os 10% extras que a loja dá a CNPJ nos combos da linha Negócios. O resumo do carrinho mostra o valor final antes de pagar.',
      },
      {
        question: 'O CECI dá 5% ou 10% na Dolce Gusto?',
        answer:
          'Hoje, dá 10%, em compras a partir de R$ 100. O código já deu 5% numa campanha anterior; os testes de novembro mostram 10%, inclusive numa máquina em promoção. O que vale é a linha "Você ganhou 10% OFF" no resumo do carrinho, antes de pagar.',
      },
      {
        question: 'O cupom dá frete grátis?',
        answer:
          'Não. O CECI desconta só os produtos. O frete grátis, quando existe, vem das promoções da própria loja, e o prazo e as condições de entrega seguem a política da loja oficial.',
      },
      {
        question: 'O cupom CECI é cumulativo?',
        answer:
          'Sim. O CECI soma com as promoções vigentes da loja oficial, inclusive em produtos que já estão com preço promocional, e com a assinatura. Só não vale com o resgate de pontos do Club no mesmo carrinho. O resumo do carrinho mostra o desconto antes de você pagar.',
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
      {
        title: 'Black Friday Dolce Gusto: qual máquina comprar e a conta das cápsulas',
        url: '/reviews/black-friday-dolce-gusto',
        type: 'review',
        publishedAt: '2026-10-09',
      },
      {
        title: 'Qual Dolce Gusto comprar: Mini Me 2.0, Genio S ou NEO',
        url: '/reviews/dolce-gusto-maquinas-qual-escolher',
        type: 'review',
        publishedAt: '2026-10-12',
      },
      {
        title: 'Quanto custa cada bebida Dolce Gusto, por cápsula e por xícara',
        url: '/reviews/quanto-custa-capsula-dolce-gusto',
        type: 'review',
        publishedAt: '2026-10-12',
      },
      {
        title: 'Assinatura Dolce Gusto vale a pena? Valor e cupom CECI',
        url: '/reviews/assinatura-dolce-gusto-vale-a-pena',
        type: 'review',
        publishedAt: '2026-10-05',
      },
      {
        title: 'Dolce Gusto no Reclame Aqui: nota e reclamações',
        url: '/reviews/dolce-gusto-reclame-aqui-nota-reputacao',
        type: 'review',
        publishedAt: '2026-11-05',
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
      'O cupom Nestlé Nutre CECI dá 10% OFF na loja oficial, para quem compra pela primeira vez e para quem já é cliente, e soma com as promoções; não vale em Alfamino, Alfaré nem fórmulas infantis de 0 a 12 meses. Testado na Semana Black Friday: entrou sobre o preço da campanha, com 10% a menos no total.',
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
    lastVerified: '2026-11-23',
    testedAt: '2026-11-23',
    testNote:
      'Num carrinho com a Nutren Creatina Sachet de 300 g por R$ 47,92, já no preço da Semana Black Friday, o CECI aplicou R$ 4,79 de desconto, os 10%, e o total caiu para R$ 43,13.',
    aboutBrand:
      'A Nestlé Nutre é uma loja oficial da Nestlé voltada a produtos de nutrição e suplementação, com opções para diferentes rotinas e necessidades alimentares. Os produtos disponíveis podem fazer parte do dia a dia de quem busca praticidade na alimentação, sempre conforme as indicações do rótulo e, quando necessário, com orientação de um profissional de saúde. O cupom CECI foi criado para quem acompanha o Em Casa com Cecília e quer economizar na loja oficial, com exceção de Alfamino e Alfaré. A loja também vende fórmulas infantis NAN para bebês de 0 a 12 meses; nesses produtos o cupom não deve ser usado, porque o art. 5º do Decreto 9.579/2018 proíbe cupons e descontos promocionais em fórmulas para lactentes, inclusive na internet. Como em toda parceria comercial, a recomendação é conferir o desconto aplicado no checkout antes de finalizar a compra.',
    faqs: [
      {
        question: 'Qual é o cupom da Nestlé Nutre?',
        answer:
          'O cupom da Nestlé Nutre da nossa parceria é o CECI, com 10% OFF na compra única do site oficial, em todas as formas de pagamento, e soma com as promoções da loja. Não vale em Alfamino, Alfaré, fórmulas infantis de 0 a 12 meses, na assinatura nem no Mercado Livre.',
      },
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
          'Sim. A linha Nutren é vendida na loja Nestlé Nutre, e o CECI vale nela como nos outros produtos da loja, exceto Alfamino, Alfaré e as fórmulas infantis de 0 a 12 meses. No nosso teste mais recente, na Semana Black Friday, a Nutren Creatina de 300 g saiu de R$ 47,92 por R$ 43,13.',
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
        question: 'O cupom CECI vale na assinatura da Nestlé Nutre?',
        answer:
          'Não. O CECI vale só na compra única. A assinatura tem o desconto dela: 10% nas três primeiras entregas e 15% a partir da quarta, sobre o preço do site, com frete grátis acima de R$ 200.',
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
          'Vale. No nosso teste, o CECI deu 10% OFF sobre os preços da Semana Black Friday da Nestlé Nutre, nos produtos elegíveis. A loja aceita um cupom por pedido.',
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
        title: 'Como usar o cupom CECI na Nestlé Nutre: 10% de desconto',
        url: '/reviews/cupom-ceci-nestle-nutre-como-usar',
        type: 'review',
        publishedAt: '2026-07-10',
      },
      {
        title: 'Nestlé Nutre é confiável? O que observar antes de comprar',
        url: '/reviews/nestle-nutre-e-confiavel',
        type: 'review',
        publishedAt: '2026-08-05',
      },
      {
        title: 'Cupom Nestlé Nutre primeira compra: CECI dá 10% OFF e vale nas compras seguintes',
        url: '/reviews/cupom-nestle-nutre-primeira-compra',
        type: 'review',
        publishedAt: '2026-11-12',
      },
      {
        title: 'Nutren Senior: qual tamanho e qual forma de compra compensam (370 g, 740 g, kit, combo ou assinatura)',
        url: '/reviews/nutren-senior-kit-combo-ou-assinatura',
        type: 'review',
        publishedAt: '2026-10-28',
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
      'O cupom I Wanna Sleep CECIEMCASA dá 10% OFF em todo o site (travesseiros, cobertores, pillow top e acessórios), para quem compra pela primeira vez e para quem já é cliente, e soma com as promoções da loja. Testado numa máscara de dormir em promoção.',
    metaTitle: 'Cupom I Wanna Sleep: 10% OFF com CECIEMCASA',
    metaTitleMonth: true,
    metaDescription:
      'Cupom I Wanna Sleep: CECIEMCASA dá 10% OFF em todo o site oficial para cliente novo ou antigo e soma com as promoções da loja.',
    eligibleCategories:
      'Todo o site I Wanna Sleep',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping: 'Frete grátis acima de R$ 150, exceto colchões, box, baús e cabeceiras, segundo a central de ajuda da loja',
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
      'Aplicamos o CECIEMCASA na Caracol Sleep Mask em promoção, de R$ 177,00 por R$ 160,00, e o total caiu para R$ 144,00, com R$ 16,00 de desconto: os 10% entraram sobre o preço promocional. Em 24/10/2026, num carrinho com um kit Pillow Top Magnum, os 10% também valeram.',
    aboutBrand:
      'A I Wanna Sleep é uma marca focada em produtos para sono, conforto e bem-estar do quarto, como colchões, travesseiros, lençóis e acessórios pensados para rotinas de descanso. O cupom CECIEMCASA entra como benefício para quem acompanha o Em Casa com Cecília e quer economizar no site oficial. Como regras de desconto, frete e aplicação podem variar por campanha e produto, a recomendação é sempre conferir o desconto no checkout antes de finalizar a compra.',
    relatedContent: [
      {
        title: 'Como usar o cupom CECIEMCASA na I Wanna Sleep: 10% de desconto',
        url: '/reviews/cupom-ceciemcasa-i-wanna-sleep-como-usar',
        type: 'review',
        publishedAt: '2026-07-07',
      },
      {
        title: 'Cupom I Wanna Sleep primeira compra: CECIEMCASA dá 10% OFF e vale nas compras seguintes',
        url: '/reviews/cupom-i-wanna-sleep-primeira-compra',
        type: 'review',
        publishedAt: '2026-11-12',
      },
      {
        title: 'Black Friday I Wanna Sleep 2026: o que comprar e o cupom CECIEMCASA',
        url: '/reviews/black-friday-i-wanna-sleep',
        type: 'review',
        publishedAt: '2026-10-10',
      },
      {
        title: 'I Wanna Sleep é boa? Travesseiros, melatonina e o que vale comprar da marca',
        url: '/reviews/i-wanna-sleep-e-boa',
        type: 'review',
        publishedAt: '2026-11-04',
      },
      {
        title: 'I Wanna Sleep é confiável? O que observar antes de comprar',
        url: '/reviews/i-wanna-sleep-e-confiavel',
        type: 'review',
        publishedAt: '2026-08-14',
      },
      {
        title: 'I Wanna Sleep no Reclame Aqui: nota, reclamações e o que os dados mostram',
        url: '/reviews/i-wanna-sleep-reclame-aqui-nota-reputacao',
        type: 'review',
        publishedAt: '2026-10-24',
      },
      {
        title: 'Qual travesseiro escolher? Guia das linhas I Wanna Sleep por posição, material e altura',
        url: '/reviews/qual-travesseiro-escolher-guia-linhas-i-wanna-sleep',
        type: 'review',
        publishedAt: '2026-09-04',
      },
      {
        title: 'Qual Cobertor Escolher? As opções da I Wanna Sleep',
        url: '/reviews/qual-cobertor-escolher-guia-linhas-i-wanna-sleep',
        type: 'review',
        publishedAt: '2026-09-07',
      },
      {
        title: 'Travesseiro I Wanna Sleep ou Ortobom: qual escolher por material, altura e jeito de dormir',
        url: '/reviews/i-wanna-sleep-ou-ortobom',
        type: 'review',
        publishedAt: '2026-10-16',
      },
      {
        title: 'Travesseiro I Wanna Sleep ou Emma (e Ortobom): qual escolher pelo seu jeito de dormir',
        url: '/reviews/travesseiro-i-wanna-sleep-ou-emma',
        type: 'review',
        publishedAt: '2026-10-12',
      },
      {
        title: 'Pillow Top Magnum IWS vale a pena? Guia para colchão duro',
        url: '/reviews/pillow-top-magnum-iws-colchao-dor-nas-costas',
        type: 'review',
        publishedAt: '2026-10-03',
      },
      {
        title: 'Cobertor Igloo da I Wanna Sleep: lado gelado, lado quente e primeira noite',
        url: '/reviews/i-wanna-sleep-cobertor-igloo-ficha-tecnica',
        type: 'review',
        publishedAt: '2026-07-16',
      },
      {
        title: 'Melatonina Líquida IWS 30 ml: ficha do rótulo e preço',
        url: '/reviews/melatonina-liquida-iws-ficha-tecnica',
        type: 'review',
        publishedAt: '2026-08-20',
      },
      {
        title: 'Melatonina Gummy IWS: para que serve, como tomar e cuidados',
        url: '/reviews/melatonina-gummy-iws-para-que-serve-como-tomar',
        type: 'review',
        publishedAt: '2026-08-26',
      },
      {
        title: 'SleepSpray Kidz IWS: Como Funciona o Spray para Travesseiro e o Ritual do Sono Infantil',
        url: '/reviews/sleepspray-kidz-iws-como-funciona-ritual-do-sono',
        type: 'review',
        publishedAt: '2026-09-29',
      },
      {
        title: 'Aliv Head Gel IWS: máscara térmica fria ou quente, como usar e para quem serve',
        url: '/reviews/aliv-head-gel-iws-mascara-termica-enxaqueca',
        type: 'review',
        publishedAt: '2026-08-04',
      },
    ],
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
        question: 'O cupom CECIEMCASA funciona em travesseiros, cobertores e acessórios?',
        answer:
          'Sim. Ele vale nos produtos vendidos no site, como travesseiros, cobertores, pillow top, roupa de cama e acessórios. Colchões e box são vendidos nas lojas físicas da I Wanna Sleep, fora do site.',
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
          'Não. O cupom dá desconto nos produtos. Pela central de ajuda da loja, o frete é grátis em compras acima de R$ 150, exceto colchões, box, baús e cabeceiras, e o prazo sai pelo CEP no fechamento da compra.',
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
    cartPrint: { article: 'cupom-magalu-em-casa-com-cecilia', src: '/images/reviews/magalu/magalu-cupom-aplicado.webp', alt: 'Campo de cupom com desconto aplicado na revisão do pedido', aspectRatio: 2.812 },
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
      'O campo do código não fica na sacola: ele aparece na etapa de pagamento, depois de entrar na conta e escolher a entrega.',
      'No pagamento, aplique o código correspondente à sua faixa (ex.: 50EMCASACOMCECILIA para R$ 50 OFF em compras a partir de R$ 2.499,90).',
      'Confira se o desconto apareceu no resumo do pedido antes de finalizar.',
    ],
    category: 'Eletrônicos, eletrodomésticos, móveis e mais',
    // Fora da vitrine da home em português (Bruno, 16/11/2026); segue em /cupons e em /reviews.
    hideFromPortugueseHome: true,
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
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Vale sobre o preço em oferta, inclusive o da Black Friday, nos produtos vendidos e entregues pelo Magalu' },
      { benefit: 'pix', stacks: 'sim', condition: 'Soma com o desconto do Pix, que muda de produto para produto (de 0% a 12% nas listas que lemos)' },
      { benefit: 'outro-cupom', stacks: 'nao', condition: 'Vale um cupom por pedido: se o produto mostrar um cupom do Magalu, compare e use o que der mais desconto' },
      { benefit: 'frete', stacks: 'depende', condition: 'O desconto é só nos produtos; o frete é calculado pelo CEP' },
    ],
    paymentPerks: [
      'O código vale em todas as formas de pagamento',
      'No Pix, o desconto da loja muda por produto e aparece na página do item',
    ],
    lastVerified: '2026-11-11',
    testedAt: '2026-10-01',
    testNote:
      'Aplicamos os códigos no checkout da loja Magazine Você da Cecília, pelo navegador, em produtos vendidos e entregues pelo Magalu, e o desconto em reais da faixa alcançada apareceu no resumo do pedido.',
    aboutBrand:
      'A loja Magazine Você da Cecília faz parte do programa oficial Influenciador Magalu (antigo Magazine Você), mantido pela Magazine Luiza S/A (CNPJ 47.960.950/0001-21). O domínio magazinevoce.com.br pertence à própria Magalu desde 2011, o que significa que quem vende, cobra, entrega e faz o pós-venda é o Magalu — e o login usado na loja é a conta Magalu que você já tem no site e no app. Os códigos desta campanha são criados pela Cecília para a própria loja: estes códigos da Cecília funcionam somente pelo navegador, na loja Magazine Você da Cecília — não no app do Magalu nem no site principal. Comprar por essa loja pode gerar comissão para o Em Casa com Cecília, sem custo extra para você: o preço e o desconto exibidos no checkout são exatamente os da sua faixa.',
    faqs: [
      {
        question: 'Qual é o cupom do Magalu?',
        answer:
          'Na loja Magazine Você da Cecília, pelo navegador, os códigos vão de 10EMCASACOMCECILIA (R$ 10 OFF a partir de R$ 499,90) até 100EMCASACOMCECILIA (R$ 100 OFF a partir de R$ 4.999,90), em produtos vendidos e entregues pelo Magalu e em todas as formas de pagamento. Use o código da maior faixa que o seu carrinho alcançar; no app do Magalu, ele não funciona.',
      },
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
      { title: 'Black Friday Magalu 2026: é 27 de novembro, as ofertas antecipadas já estão no ar e qual código da Cecília usar', url: '/reviews/black-friday-magalu', type: 'review', publishedAt: '2026-10-11' },
      { title: 'Cupom Magalu primeira compra: os códigos valem para cliente novo e antigo', url: '/reviews/cupom-magalu-primeira-compra', type: 'review', publishedAt: '2026-11-12' },
      { title: 'Magazine Você é confiável? É golpe? Como funciona a loja de influenciador do Magalu', url: '/reviews/magazine-voce-e-confiavel', type: 'review', publishedAt: '2026-10-12' },
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
      'O cupom Let\'s Eat It MAUAD dá 5% OFF no site, para quem compra pela primeira vez e para quem já é cliente, soma com as promoções, a pré-venda e os 5% do Pix, e vale em todas as formas de pagamento. Testado no carrinho.',
    metaTitle: "Cupom Let's Eat It: 5% OFF com MAUAD + Pix",
    metaTitleMonth: true,
    metaDescription:
      'Cupom Let\'s Eat It: MAUAD dá 5% OFF no site oficial para cliente novo ou antigo, somando com promoções, pré-venda e os 5% do Pix.',
    eligibleCategories: "Todo o site Let's Eat It, conforme regras da loja",
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping: 'Calculado separadamente, conforme política da loja',
    combinable:
      'Soma com as promoções vigentes do site, inclusive em pré-venda, e com o desconto de 5% do Pix; vale com todas as formas de pagamento; a soma com outros cupons segue as regras da loja',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Soma com as promoções do site, inclusive o Outlet e a pré-venda' },
      { benefit: 'pix', stacks: 'sim', condition: 'Soma com os 5% de desconto do Pix que muitos produtos têm' },
    ],
    lastVerified: '2026-11-22',
    testedAt: '2026-11-18',
    testNote:
      'Num jogo de 6 bowls de cerâmica Scalla em promoção, de R$ 610,00 por R$ 366,00, o MAUAD tirou R$ 18,30 e o total caiu para R$ 347,70. Numa caneca Le Creuset de 100 ml sem promoção, de R$ 129,00, o desconto foi de R$ 6,45, e o total ficou em R$ 122,55: os 5% entraram com e sem promoção. Em 12/11/2026, os 5% já tinham entrado num bowl de porcelana da Black November, de R$ 171,50 por R$ 102,90. Em 11/11/2026, num pote de cerâmica Le Creuset em promoção, de R$ 519,00 por R$ 363,30, o total caiu para R$ 345,14. No teste de 02/10/2026, ele já tinha valido num carrinho com um item em pré-venda.',
    aboutBrand:
      "A Let's Eat It é uma loja online brasileira de casa e presentes, com curadoria de marcas como Le Creuset, KitchenAid, Porto Brasil e Bohemia Crystal. O catálogo cobre mesa posta, cozinha, bar, café e chá, decoração, outdoor e eletrodomésticos — itens que conversam com a rotina de quem cozinha e recebe em casa. O cupom MAUAD, com o sobrenome da Cecília, entra como benefício para quem acompanha o Em Casa com Cecília e quer economizar no site oficial. Como regras de desconto, frete e aplicação podem variar por campanha e produto, a recomendação é sempre conferir o desconto no checkout antes de finalizar a compra.",
    relatedContent: [
      {
        title: "Como usar o cupom MAUAD na Let's Eat It",
        url: '/reviews/cupom-mauad-lets-eat-it-como-usar',
        type: 'review',
        publishedAt: '2026-10-03',
      },
      {
        title: "Black Friday Let's Eat It: o que comprar",
        url: '/reviews/black-friday-letseatit',
        type: 'review',
        publishedAt: '2026-10-09',
      },
      {
        title: "Let's Eat It é boa? O que a loja vende",
        url: '/reviews/lets-eat-it-e-boa',
        type: 'review',
        publishedAt: '2026-11-04',
      },
      {
        title: 'Le Creuset vale a pena?',
        url: '/reviews/le-creuset-vale-a-pena',
        type: 'review',
        publishedAt: '2026-10-12',
      },
      {
        title: 'Le Creuset 20 ou 24 cm: qual tamanho escolher',
        url: '/reviews/le-creuset-qual-tamanho-escolher',
        type: 'review',
        publishedAt: '2026-10-26',
      },
      {
        title: 'Porto Brasil é boa?',
        url: '/reviews/porto-brasil-e-boa',
        type: 'review',
        publishedAt: '2026-10-12',
      },
      {
        title: 'Mesa posta de Natal: o que precisa e quanto custa',
        url: '/reviews/mesa-posta-natal-o-que-precisa-quanto-custa',
        type: 'review',
        publishedAt: '2026-10-20',
      },
      {
        title: "Casa Let's: a loja física da Let's Eat It",
        url: '/reviews/lets-eat-it-loja-fisica-endereco',
        type: 'review',
        publishedAt: '2026-11-21',
      },
      {
        title: "Let's Eat It no Reclame Aqui",
        url: '/reviews/lets-eat-it-reclame-aqui-nota-reputacao',
        type: 'review',
        publishedAt: '2026-10-03',
      },
    ],
    faqs: [
      {
        question: "Qual é o cupom da Let's Eat It?",
        answer:
          "O cupom da Let's Eat It do Em Casa com Cecília é MAUAD, com 5% OFF em todo o site oficial, válido em todas as formas de pagamento e cumulativo com promoções e Pix.",
      },
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
          'Nos nossos testes, não. No teste mais recente, colocamos o DOHER10 e o BEMVINDO10, códigos de 10% que circulam em sites de cupom e em respostas de IA, nos mesmos carrinhos do MAUAD: o DOHER10 deu 5%, o mesmo desconto do MAUAD, tanto nos bowls em promoção de R$ 366,00 quanto na caneca de R$ 129,00 sem promoção, e o BEMVINDO10 foi recusado nos dois, com a mensagem "Insira um código de desconto válido". O teste foi feito sem login e não confirma regras de primeira compra. O MAUAD dá 5% e soma com as promoções e com os 5% de desconto do Pix que muitos produtos têm.',
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
          'Com código, o maior desconto que testamos na Insider é o do EMCASACOMCECILIA: 15% OFF para clientes novos e antigos, sem valor mínimo, nos produtos elegíveis da loja online, inclusive Outlet, kits e preços de Black Friday. Lançamentos ficam de fora. Ao comparar com percentuais maiores, confira se o desconto anunciado vem de um código, de uma seleção promocional ou da combinação de benefícios.',
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
    hubCard: 'reduzido',
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
    lastVerified: '2026-11-23',
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
    cartPrint: {
      article: 'codigo-de-indicacao-shein',
      src: '/images/reviews/shein/shein-busca-4cw5y.webp',
      alt: 'Barra de busca da SHEIN com o código 4CW5Y digitado, que aparece na tela como 4Cw5y',
      aspectRatio: 1.4722,
      caption: 'Exemplo do 4CW5Y na busca da SHEIN, que é onde o código de indicação entra. A pesquisa abre uma página de promoções, e o desconto de cada peça é a SHEIN que define.',
    },
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
    offerMode: 'affiliate-link',
    slug: 'temu',
    brand: 'Temu',
    officialUrl: 'https://www.temu.com/br',
    // Link de afiliado como veio do Bruno (16/11/2026); a Temu leva o visitante à loja da região dele. Não editar.
    offerUrl: 'https://temu.to/k/glfwht5gllj',
    brandIcon: 'T',
    brandLogo: '/images/about/partners/temu.png',
    brandLogoAlt: 'Marca Temu',
    bubble: { src: '/images/logos/bolinhas/temu.png', background: '#FB7701' },
    brandWatermark: '/images/logos/watermarks/temu.webp',
    brandColor: '#FB7701',
    discount: 'Promoções',
    offerTypeLabel: 'oferta',
    offerTypeLabelPlural: 'ofertas',
    offerActionLabel: 'Ver ofertas na Temu',
    category: 'Moda, casa, eletrônicos e utilidades',
    hubCategory: 'diversos',
    hubCard: 'reduzido',
    // Fora da vitrine da home em português (Bruno, 16/11/2026); segue em /cupons, em /reviews e nos outros idiomas.
    hideFromPortugueseHome: true,
    shortDescription: 'link da Cecília para as promoções da loja',
    longDescription:
      'O Em Casa com Cecília não tem cupom na Temu: o botão abaixo abre a loja pelo link da Cecília, com as promoções que estiverem no ar. O preço e o desconto de cada produto são os que a Temu mostra na página e no carrinho.',
    metaTitle: 'Temu: promoções pelo link da Cecília, frete e devolução',
    metaDescription:
      'Link da Cecília para a Temu: promoções da loja, frete grátis a partir de R$ 69 e devolução em até 90 dias da compra. Não há cupom nosso na Temu.',
    eligibleCategories: 'Todas as categorias da Temu; cada promoção vale para os produtos que a loja indicar',
    validity: 'As promoções mudam sem aviso: vale o preço que a Temu mostra no dia da compra',
    reusable: 'O link pode ser usado em toda compra',
    shipping: 'Envio padrão: R$ 15 em pedidos abaixo de R$ 69 e grátis a partir de R$ 69; a Temu informa de 17 a 30 dias para a entrega',
    combinable: 'O link não dá desconto próprio: valem as promoções que a Temu mostrar na página do produto e no carrinho',
    lastVerified: '2026-11-16',
    aboutBrand:
      'A Temu é uma loja online internacional que vende moda, itens para casa, eletrônicos e utilidades, com envio para o Brasil. Esta página reúne o link da Cecília e as regras de frete e de devolução publicadas pela loja. Compras feitas pelo link podem gerar comissão para o Em Casa com Cecília, sem custo adicional para quem compra.',
    faqs: [
      {
        question: 'Tem cupom da Cecília na Temu?',
        answer:
          'Não. O Em Casa com Cecília tem um link de afiliado da Temu, não um cupom: o link abre a loja com as promoções que estiverem no ar, e o desconto de cada produto é o que a Temu mostra.',
      },
      {
        question: 'Quanto é o frete da Temu?',
        answer:
          'Em 16/11/2026, a página de envio da Temu informava R$ 15 no envio padrão para pedidos abaixo de R$ 69 e frete grátis a partir de R$ 69, com entrega em 17 a 30 dias e de 1 a 3 dias para processar o pedido.',
      },
      {
        question: 'Como funciona a devolução na Temu?',
        answer:
          'Pela política da Temu, o prazo é de 90 dias a partir da data da compra para a maioria dos itens, e nunca menos de 7 dias depois do recebimento. A primeira devolução de cada pedido é grátis; da segunda em diante, a Temu desconta R$ 35 do reembolso. Roupa usada, lavada ou sem etiqueta não volta, e eletrônicos podem ter prazo de 45, 60 ou 90 dias, conforme o vendedor.',
      },
      {
        question: 'Quais formas de pagamento a Temu aceita?',
        answer:
          'Pela central de ajuda da Temu, lida em 16/11/2026: cartão de crédito e de débito (Visa, Mastercard, Hipercard, Elo, Maestro, American Express, Discover, Diners Club e JCB), Pix, boleto, PayPal, Apple Pay, Google Pay e créditos da Temu.',
      },
      {
        question: 'A Temu cobra imposto de importação?',
        answer:
          'Sim. A Temu participa do Remessa Conforme e cobra os impostos no pedido. Em pedidos de até US$ 50, o imposto de importação é zero e o ICMS vai de 17% a 20%, conforme o estado. Acima de US$ 50 e até US$ 3.000, o imposto de importação é de 60%, com dedução de US$ 30, e o ICMS continua valendo. As regras são da central de ajuda da Temu, lida em 16/11/2026.',
      },
      {
        question: 'Preciso copiar algum código para comprar pelo link?',
        answer:
          'Não. Basta abrir a Temu pelo botão desta página e comprar normalmente. Não há código nosso para colar no carrinho.',
      },
      {
        question: 'Comprar pelo link gera comissão para a Cecília?',
        answer:
          'Pode gerar. A Temu pode pagar comissão ao Em Casa com Cecília por compras atribuídas ao link, sem custo adicional para quem compra.',
      },
    ],
    linkInstructions: [
      'Toque em “Ver ofertas na Temu”: o link da Cecília abre a loja, sem copiar nada.',
      'Escolha os produtos e confira o preço e a promoção de cada um na página dele.',
      'No carrinho, veja o frete: o envio padrão é grátis a partir de R$ 69.',
      'Confira o valor final, com os impostos, antes de concluir a compra.',
    ],
    linkNote:
      'O link da Cecília não dá desconto próprio nem leva código: o preço e as promoções são os que a Temu mostra na página do produto e no carrinho.',
    status: 'ativo',
    featured: false,
  },
  {
    offerMode: 'affiliate-link',
    slug: 'aliexpress',
    brand: 'AliExpress',
    officialUrl: 'https://pt.aliexpress.com/',
    // Link de afiliado como veio do Bruno (16/11/2026); o AliExpress leva o visitante à loja da região dele. Não editar.
    offerUrl: 'https://s.click.aliexpress.com/e/_c37RSyBR',
    brandIcon: 'AE',
    brandLogo: '/images/about/partners/aliexpress.webp',
    brandLogoAlt: 'Marca AliExpress',
    bubble: { src: '/images/logos/bolinhas/aliexpress.png' },
    brandWatermark: '/images/logos/watermarks/aliexpress.webp',
    brandColor: '#191919',
    discount: 'Promoções',
    offerTypeLabel: 'oferta',
    offerTypeLabelPlural: 'ofertas',
    offerActionLabel: 'Ver ofertas no AliExpress',
    category: 'Eletrônicos, moda, casa e acessórios',
    hubCategory: 'diversos',
    hubCard: 'reduzido',
    // Fora da vitrine da home em português (Bruno, 16/11/2026); segue em /cupons, em /reviews e nos outros idiomas.
    hideFromPortugueseHome: true,
    shortDescription: 'link da Cecília para as promoções da loja',
    longDescription:
      'O Em Casa com Cecília não tem cupom no AliExpress: o botão abaixo abre a loja pelo link da Cecília, com as promoções que estiverem no ar. O preço, o frete e o prazo de cada produto são os que o AliExpress mostra na página dele.',
    metaTitle: 'AliExpress: promoções pelo link da Cecília, frete e devolução',
    metaDescription:
      'Link da Cecília para o AliExpress: promoções da loja, frete e prazo na página de cada produto e as regras de devolução. Não há cupom nosso no AliExpress.',
    eligibleCategories: 'Todas as categorias do AliExpress; cada promoção vale para os produtos que a loja indicar',
    validity: 'As promoções mudam sem aviso: vale o preço que o AliExpress mostra no dia da compra',
    reusable: 'O link pode ser usado em toda compra',
    shipping: 'O frete e o prazo de entrega aparecem na página de cada produto e mudam conforme o vendedor e o local de envio',
    combinable: 'O link não dá desconto próprio: valem as promoções que o AliExpress mostrar na página do produto e no carrinho',
    lastVerified: '2026-11-16',
    aboutBrand:
      'O AliExpress é um marketplace internacional do grupo Alibaba, em que vendedores de vários países anunciam eletrônicos, moda, itens para casa e acessórios. Esta página reúne o link da Cecília e as regras de devolução publicadas pela loja. Compras feitas pelo link podem gerar comissão para o Em Casa com Cecília, sem custo adicional para quem compra.',
    faqs: [
      {
        question: 'Tem cupom da Cecília no AliExpress?',
        answer:
          'Não. O Em Casa com Cecília tem um link de afiliado do AliExpress, não um cupom: o link abre a loja com as promoções que estiverem no ar, e o desconto de cada produto é o que o AliExpress mostra.',
      },
      {
        question: 'Quanto é o frete do AliExpress?',
        answer:
          'Depende do produto. O AliExpress é um marketplace: cada anúncio mostra o frete e a data estimada de entrega na própria página, e os dois mudam conforme o vendedor e o local de onde o produto sai.',
      },
      {
        question: 'Como funciona a devolução no AliExpress?',
        answer:
          'Pela política do AliExpress para o Brasil, lida em 16/11/2026, quem desiste da compra tem 7 dias depois da entrega para pedir a devolução. Se o item chega danificado, com defeito ou diferente do anúncio, o prazo é de 30 dias depois da entrega, ou de 90 dias em bens duráveis. Roupa só volta sem uso, sem lavar e com as etiquetas.',
      },
      {
        question: 'Quais formas de pagamento o AliExpress aceita?',
        answer:
          'A lista completa aparece no checkout, depois do login, e não a conferimos. Na página dos produtos, em 16/11/2026, o AliExpress mostrava o preço também dividido em 12 parcelas; as condições do parcelamento aparecem no pagamento.',
      },
      {
        question: 'O AliExpress cobra imposto de importação?',
        answer:
          'Sim, nas compras internacionais. Pela regra que o AliExpress publica na página do produto, lida em 16/11/2026: em pedidos de até US$ 50 não há imposto de importação, e o ICMS vai de 17% a 20%, conforme o estado. Acima de US$ 50, o imposto de importação é de 60% do pedido, com desconto de US$ 30, e o ICMS incide sobre o pedido mais o imposto. A página do produto mostra o imposto estimado antes da compra.',
      },
      {
        question: 'Preciso copiar algum código para comprar pelo link?',
        answer:
          'Não. Basta abrir o AliExpress pelo botão desta página e comprar normalmente. Não há código nosso para colar no carrinho.',
      },
      {
        question: 'Comprar pelo link gera comissão para a Cecília?',
        answer:
          'Pode gerar. O AliExpress pode pagar comissão ao Em Casa com Cecília por compras atribuídas ao link, sem custo adicional para quem compra.',
      },
    ],
    linkInstructions: [
      'Toque em “Ver ofertas no AliExpress”: o link da Cecília abre a loja, sem copiar nada.',
      'Escolha os produtos e confira o preço, o frete e a data estimada de entrega na página de cada um.',
      'Veja a reputação do vendedor e as regras de devolução do anúncio.',
      'Confira o valor final, com os impostos, antes de concluir a compra.',
    ],
    linkNote:
      'O link da Cecília não dá desconto próprio nem leva código: o preço e as promoções são os que o AliExpress mostra na página do produto e no carrinho.',
    status: 'ativo',
    featured: false,
  },
  {
    offerMode: 'affiliate-link',
    slug: 'proton',
    brand: 'Proton',
    officialUrl: 'https://proton.me',
    // Links de afiliado como vieram do Bruno (17/11/2026), um por produto; o do botão principal é o do Proton VPN, que
    // leva aos planos VPN Plus e Proton Unlimited. A Proton é global: os links valem para quem assina de qualquer país.
    // Não editar nem conferir clicando: o clique registra atribuição.
    offerUrl: 'https://go.getproton.me/SH39K',
    brandIcon: 'P',
    brandLogo: '/images/about/partners/proton.png',
    brandLogoAlt: 'Marca Proton',
    bubble: { src: '/images/logos/bolinhas/proton.png' },
    brandWatermark: '/images/logos/watermarks/proton.webp',
    brandColor: '#6D4AFF',
    discount: 'Até 75% OFF',
    offerTypeLabel: 'oferta',
    offerTypeLabelPlural: 'ofertas',
    offerActionLabel: 'Pegar até 75% OFF pelo link',
    category: 'VPN, e-mail, senhas e nuvem com privacidade',
    hubCategory: 'diversos',
    shortDescription: 'até 75% OFF no Proton VPN, Mail, Pass, Drive e Lumo pelos links da Cecília',
    longDescription:
      'Na Black Friday, a Proton está com até 75% OFF em todas as linhas pelos links da Cecília: Proton VPN, Mail, Pass, Drive, Lumo e Proton Unlimited. É só tocar no botão do produto, escolher o plano e assinar, sem código para copiar. E, se não gostar, a Proton devolve o valor da assinatura se o reembolso for pedido em até 30 dias.',
    metaTitle: 'Proton Black Friday: até 75% OFF pelo link da Cecília',
    metaDescription:
      'Proton com até 75% OFF na Black Friday pelos links da Cecília: VPN, Mail, Pass, Drive e Lumo, sem código para copiar e com reembolso em até 30 dias.',
    eligibleCategories: 'Planos pagos do Proton VPN, Proton Mail, Proton Pass, Proton Drive, Lumo e Proton Unlimited',
    validity: 'Promoção de Black Friday da Proton, sem data de fim anunciada; o preço final é o que a Proton mostra no checkout no dia da assinatura',
    reusable: 'Os links podem ser usados em toda assinatura',
    shipping: 'Não se aplica: os planos são digitais e liberados na conta Proton',
    combinable: 'Os links da Cecília abrem a Proton com até 75% OFF na Black Friday, sem código para somar',
    lastVerified: '2026-11-23',
    aboutBrand:
      'A Proton é uma empresa suíça de serviços com foco em privacidade e criptografia: VPN, e-mail, gerenciador de senhas, armazenamento em nuvem e o Lumo, um assistente de inteligência artificial. Os produtos têm plano grátis, e os pagos podem ser assinados um a um ou juntos no Proton Unlimited. Esta página reúne os links da Cecília para cada produto. Assinaturas feitas pelos links podem gerar comissão para o Em Casa com Cecília, sem custo adicional para quem assina.',
    productLinks: [
      {
        name: 'Proton VPN',
        url: 'https://go.getproton.me/SH39K',
        description:
          'Até 75% OFF pelo link da Cecília. VPN com plano grátis e o VPN Plus, para até 10 aparelhos e servidores em mais de 140 países. O link leva também ao Proton Unlimited.',
      },
      {
        name: 'Proton Mail',
        url: 'https://go.getproton.me/SH39L',
        description: 'Até 75% OFF pelo link da Cecília. E-mail com criptografia de ponta a ponta, com plano grátis e planos pagos com mais espaço e endereços.',
      },
      {
        name: 'Proton Pass',
        url: 'https://go.getproton.me/SH39M',
        description: 'Até 75% OFF pelo link da Cecília. Gerenciador de senhas com criptografia, para guardar senhas, cartões e notas e preencher logins no navegador e no celular.',
      },
      {
        name: 'Proton Drive',
        url: 'https://go.getproton.me/SH39N',
        description: 'Até 75% OFF pelo link da Cecília. Armazenamento em nuvem com criptografia de ponta a ponta para fotos e documentos, com plano grátis.',
      },
      {
        name: 'Lumo',
        url: 'https://go.getproton.me/SH39O',
        description: 'Até 75% OFF pelo link da Cecília. O assistente de inteligência artificial da Proton, feito para conversar sem abrir mão da privacidade.',
      },
    ],
    faqs: [
      {
        question: 'Quanto a Proton dá de desconto na Black Friday?',
        answer:
          'Até 75% OFF em todas as linhas pelos links da Cecília: Proton VPN, Mail, Pass, Drive, Lumo e Proton Unlimited. O desconto de cada plano aparece na página de planos que o link abre, e o preço final, no checkout.',
      },
      {
        question: 'Tem cupom da Cecília na Proton?',
        answer:
          'Não precisa de cupom: na Black Friday, os links da Cecília já abrem a Proton com até 75% OFF. É só tocar no botão do produto que você quer, escolher o plano e assinar, sem código para colar no checkout.',
      },
      {
        question: 'A Proton devolve o dinheiro se eu não gostar?',
        answer:
          'Sim. Pela página de planos do Proton VPN, lida em 17/11/2026, a Proton devolve o valor de qualquer assinatura se o reembolso for pedido em até 30 dias. Pagamentos em dinheiro e por transferência bancária não têm reembolso, segundo a central de ajuda da Proton.',
      },
      {
        question: 'A Proton tem plano grátis?',
        answer:
          'Tem. Pelas páginas de planos lidas em 17/11/2026, o Proton VPN grátis protege 1 aparelho por vez, com servidores em 10 países, e a conta grátis inclui e-mail e 5 GB no Proton Drive. Os planos pagos liberam mais aparelhos, espaço e recursos.',
      },
      {
        question: 'Quais formas de pagamento a Proton aceita?',
        answer:
          'Pela central de ajuda da Proton, lida em 17/11/2026: cartão de crédito e de débito, PayPal, Apple Pay, Google Pay, Bitcoin, dinheiro e transferência bancária. Os preços aparecem em dólar, euro ou franco suíço.',
      },
      {
        question: 'O que é o Proton Unlimited?',
        answer:
          'É o plano que junta os produtos pagos da Proton numa assinatura só. O link do Proton VPN, nesta página, leva aos planos VPN Plus e Proton Unlimited.',
      },
      {
        question: 'Preciso copiar algum código para assinar pelo link?',
        answer:
          'Não. Basta abrir a Proton pelo botão do produto que você quer e assinar normalmente. Não há código nosso para colar no checkout.',
      },
      {
        question: 'Assinar pelo link gera comissão para a Cecília?',
        answer:
          'Pode gerar. A Proton pode pagar comissão ao Em Casa com Cecília por assinaturas feitas pelos links desta página, inclusive renovações, sem custo adicional para quem assina.',
      },
    ],
    linkInstructions: [
      'Escolha o produto em “Links da Proton por produto” ou toque em “Pegar até 75% OFF pelo link”: o link da Cecília abre o site oficial, sem copiar nada.',
      'Compare os planos: os produtos têm plano grátis e planos pagos, por mês ou por ano.',
      'Crie a conta Proton, ou entre na sua, e confira o preço no checkout, na moeda que a Proton mostrar.',
      'Se não gostar, peça o reembolso nos primeiros 30 dias.',
    ],
    linkNote:
      'Na Black Friday, os links da Cecília abrem a Proton com até 75% OFF, sem código para copiar: o desconto de cada plano aparece na página de planos, e o preço final, no checkout.',
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
    hubCard: 'reduzido',
    shortDescription: 'suplementos no site oficial da Probiótica',
    longDescription:
      'O cupom Probiótica PRO10EMCASACOMCECILIA dá até 10% OFF no site oficial, para quem compra pela primeira vez e para quem já é cliente, soma com as promoções e vale em todas as formas de pagamento. Testado num whey em promoção e numa creatina a preço cheio: o desconto varia por item.',
    metaTitle: 'Cupom Probiótica: até 10% OFF com PRO10EMCASACOMCECILIA',
    metaDescription:
      'Cupom Probiótica: PRO10EMCASACOMCECILIA dá até 10% OFF no site oficial, para cliente novo ou antigo, e vale em todas as formas de pagamento.',
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
    relatedContent: [
      {
        title: 'Como usar o cupom PRO10EMCASACOMCECILIA na Probiótica: até 10% de desconto',
        url: '/reviews/cupom-probiotica-como-usar',
        type: 'review',
        publishedAt: '2026-10-14',
      },
      {
        title: 'Black Friday Probiótica 2026: qual whey e creatina comprar no Novembro PRO e quanto o cupom PRO10EMCASACOMCECILIA tira',
        url: '/reviews/black-friday-probiotica',
        type: 'review',
        publishedAt: '2026-10-15',
      },
      {
        title: 'Whey Probiótica: qual escolher entre 100% Pure, Zero Lactose, Hiper e Iso Pro',
        url: '/reviews/whey-probiotica-qual-escolher',
        type: 'review',
        publishedAt: '2026-11-05',
      },
      {
        title: 'Creatina Probiótica: qual versão compensa pelo preço por 100 g e pelo rótulo',
        url: '/reviews/creatina-probiotica-qual-compensa',
        type: 'review',
        publishedAt: '2026-10-28',
      },
      {
        title: 'Probiótica é boa? O whey, a creatina e o que vale comprar da marca',
        url: '/reviews/probiotica-e-boa',
        type: 'review',
        publishedAt: '2026-11-02',
      },
      {
        title: 'Probiótica no Reclame Aqui: nota, reclamações e o que os dados mostram',
        url: '/reviews/probiotica-reclame-aqui-nota-reputacao',
        type: 'review',
        publishedAt: '2026-10-14',
      },
    ],
    lastVerified: '2026-11-22',
    testedAt: '2026-11-11',
    testNote:
      'Aplicamos o PRO10EMCASACOMCECILIA num Whey Hiper 100% Whey de 900 g em promoção, de R$ 210,39 por R$ 124,90, e o total caiu para R$ 116,16, com R$ 8,74 de desconto (7%). Numa creatina de 100 g a preço cheio, de R$ 33,89, o desconto foi de R$ 0,68 (2%). O percentual varia por produto.',
    aboutBrand:
      'A Probiótica é uma marca brasileira de suplementos alimentares, com linha de whey protein, creatina, colágeno, barras de proteína, pré-treinos e acessórios de treino vendidos no site oficial. O cupom PRO10EMCASACOMCECILIA é o benefício da parceria para quem acompanha o Em Casa com Cecília e dá até 10% OFF: o percentual varia conforme o produto, e o carrinho mostra quanto cada item recebeu. A recomendação é conferir o resumo do pedido antes de finalizar.',
    faqs: [
      {
        question: 'Qual é o cupom da Probiótica?',
        answer:
          'O código da nossa parceria é PRO10EMCASACOMCECILIA, que dá até 10% OFF no site oficial da Probiótica, para conta nova e para quem já comprou, em todas as formas de pagamento. Cole no campo "Cupom de Desconto" do carrinho e confira a linha Descontos: o percentual varia por produto.',
      },
      {
        question: 'Quanto de desconto o cupom PRO10EMCASACOMCECILIA dá?',
        answer:
          'Até 10% OFF. O percentual varia conforme o produto: alguns itens recebem os 10%, outros um desconto menor. O resumo do pedido mostra o valor de cada item assim que o código é aceito.',
      },
      {
        question: 'Existe cupom Probiótica de 20%?',
        answer:
          'Com código, o desconto que testamos é o do PRO10EMCASACOMCECILIA: até 10%, variando por produto. Não testamos os códigos de 20% que aparecem em sites de cupom. Nos produtos em promoção, o cupom soma, com um percentual que varia: nos testes, o Hiper 100% Whey em promoção recebeu 7% por cima, as creatinas receberam 2% e um carrinho misto teve cerca de 8,3%. A linha Descontos do carrinho mostra o valor de cada pedido.',
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
    hubCard: 'reduzido',
    shortDescription: 'suplementos no site oficial da Max Titanium',
    longDescription:
      'O cupom Max Titanium MAX10EMCASACOMCECILIA dá até 10% OFF no site oficial, para quem compra pela primeira vez e para quem já é cliente, testado num carrinho com Top Whey em promoção: soma com as promoções, mantém os brindes do carrinho e vale em todas as formas de pagamento.',
    metaTitle: 'Cupom Max Titanium: até 10% OFF com MAX10EMCASACOMCECILIA',
    metaDescription:
      'Cupom Max Titanium: MAX10EMCASACOMCECILIA dá até 10% OFF para cliente novo ou antigo, mantém os brindes e vale em todas as formas de pagamento.',
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
    lastVerified: '2026-11-22',
    testedAt: '2026-11-22',
    testNote:
      'Testamos o MAX10EMCASACOMCECILIA em dois carrinhos, com 31 produtos. O Top Whey 3W + Sabor de 900 g em promoção caiu de R$ 189,00 para R$ 172,25 (8,9%), e o mesmo percentual apareceu no Whey Pro 1 kg, no Whey Blend, no Kit 2x Whey Pro e no Femini Whey. Nos demais, como IsoWhey, 100% Whey, creatinas, pré-treinos, Mass Titanium e BCAA, o desconto foi de 2%. A meia e a caixa de barras de brinde continuaram no carrinho. O percentual varia por produto.',
    aboutBrand:
      'A Max Titanium é uma marca brasileira de suplementos alimentares, com linha de whey protein, creatina, pré-treinos, aminoácidos e snacks proteicos vendidos no site oficial. Faz parte do mesmo grupo da Probiótica e da Dr. Peanut. O cupom MAX10EMCASACOMCECILIA é o benefício da parceria para quem acompanha o Em Casa com Cecília e dá até 10% OFF: o percentual varia conforme o produto, e o carrinho mostra quanto cada item recebeu. Ele vale com qualquer forma de pagamento e soma com as promoções do site.',
    faqs: [
      {
        question: 'Qual é o cupom da Max Titanium?',
        answer:
          'O cupom da Max Titanium da nossa parceria é MAX10EMCASACOMCECILIA, com até 10% OFF no site oficial e no aplicativo, em todas as formas de pagamento.',
      },
      {
        question: 'Quanto de desconto o cupom MAX10EMCASACOMCECILIA dá?',
        answer:
          'Até 10% OFF. O percentual varia conforme o produto: no teste de novembro, alguns wheys em promoção receberam perto de 9% e a maioria dos itens, 2%. O resumo do pedido mostra o valor de cada item assim que o código é aceito.',
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
          'No carrinho do site oficial: clique em "Adicionar cupom de desconto", cole o código no campo e toque em "Adicionar", antes de continuar para o pagamento. O valor aparece na linha "Descontos" do resumo.',
      },
      {
        question: 'O cupom dá frete grátis?',
        answer:
          'O cupom não dá frete grátis. A Max Titanium tem frete grátis a partir de um mínimo por região, de R$ 104 na capital de São Paulo a R$ 599 no Norte, e o valor conta depois do cupom. A tabela "O que acumula com o cupom" traz o mínimo de cada região.',
      },
      {
        question: 'O que fazer se o cupom MAX10EMCASACOMCECILIA não funcionar?',
        answer:
          'Lembre que o desconto varia por produto: alguns itens recebem menos de 10%, e o resumo do pedido mostra quanto cada um teve. Confira se o código foi colado no campo de cupom do carrinho, sem espaços, no site oficial ou no app da Max Titanium; no Mercado Livre ele não vale. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.',
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
    relatedContent: [
      {
        title: 'Como usar o cupom MAX10EMCASACOMCECILIA na Max Titanium: até 10% OFF',
        url: '/reviews/cupom-max-titanium-como-usar',
        type: 'review',
        publishedAt: '2026-10-14',
      },
      {
        title: 'Black Friday Max Titanium 2026: Max November, qual whey, creatina e pré-treino comprar e o cupom MAX10EMCASACOMCECILIA',
        url: '/reviews/black-friday-max-titanium',
        type: 'review',
        publishedAt: '2026-10-15',
      },
      {
        title: 'Whey Max Titanium: 100%, Pro, 3W, IsoWhey ou Super Whey, qual a diferença',
        url: '/reviews/whey-max-titanium-qual-escolher',
        type: 'review',
        publishedAt: '2026-11-05',
      },
      {
        title: 'Creatina Max Titanium: qual pote compensa (100 g, 300 g, 500 g) e se é Creapure',
        url: '/reviews/creatina-max-titanium-qual-pote',
        type: 'review',
        publishedAt: '2026-10-28',
      },
      {
        title: 'Pré-treino Max Titanium: Hórus ou Égide, pela cafeína no rótulo e pelo preço por dose',
        url: '/reviews/pre-treino-max-titanium-horus-ou-egide',
        type: 'review',
        publishedAt: '2026-10-28',
      },
      {
        title: 'Kit Max Titanium: quando compensa mais que comprar avulso',
        url: '/reviews/kit-max-titanium-quando-compensa',
        type: 'review',
        publishedAt: '2026-11-20',
      },
      {
        title: 'Max Titanium é boa? O whey, a creatina e o que vale comprar da marca',
        url: '/reviews/max-titanium-e-boa',
        type: 'review',
        publishedAt: '2026-11-02',
      },
      {
        title: 'Max Titanium no Reclame Aqui: nota, reclamações e o que os dados mostram',
        url: '/reviews/max-titanium-reclame-aqui-nota-reputacao',
        type: 'review',
        publishedAt: '2026-10-14',
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
    hubCard: 'reduzido',
    shortDescription: 'todo o site Dr. Peanut, com todas as formas de pagamento',
    longDescription:
      'O cupom Dr. Peanut DREMCASACOMCECILIA dá 10% OFF em todo o site, para quem compra pela primeira vez e para quem já é cliente, testado com uma pasta de amendoim em promoção: soma com as promoções e vale em todas as formas de pagamento.',
    metaTitle: 'Cupom Dr. Peanut: 10% OFF com DREMCASACOMCECILIA',
    metaTitleMonth: true,
    metaDescription:
      'Cupom Dr. Peanut: DREMCASACOMCECILIA dá 10% OFF em todo o site para cliente novo ou antigo, inclusive em promoção, e vale em todas as formas de pagamento.',
    eligibleCategories: 'Todos os produtos do site oficial da Dr. Peanut',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping:
      'Frete grátis a partir de R$ 149,90 no Sul e no Sudeste e de R$ 199,90 no Centro-Oeste, no Norte e no Nordeste, segundo a política de frete da loja; o valor conta depois do cupom',
    combinable: 'Soma com as promoções vigentes do site e vale com todas as formas de pagamento',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Os 10% entram sobre o preço promocional dos produtos do site' },
      { benefit: 'pix', stacks: 'sim', condition: 'Soma com os 3% do Pix no checkout, calculados sobre o valor já com o cupom' },
      { benefit: 'assinatura', stacks: 'sim', condition: 'Soma no primeiro pedido com o desconto progressivo das pastas de 250 g, dando 10% sobre o subtotal' },
      { benefit: 'frete', stacks: 'depende', condition: 'Grátis a partir de R$ 149,90 no Sul e no Sudeste e de R$ 199,90 nas demais regiões; o valor conta depois do cupom' },
    ],
    relatedContent: [
      {
        title: 'Como usar o cupom DREMCASACOMCECILIA na Dr. Peanut: 10% em todo o site',
        url: '/reviews/cupom-dr-peanut-como-usar',
        type: 'review',
        publishedAt: '2026-10-14',
      },
      {
        title: 'Black Friday Dr. Peanut 2026: qual pasta, combo ou snack comprar e a conta com o cupom DREMCASACOMCECILIA',
        url: '/reviews/black-friday-dr-peanut',
        type: 'review',
        publishedAt: '2026-10-15',
      },
      {
        title: 'Dr. Peanut: qual o melhor sabor? Os 10 sabores de pasta de amendoim (e os 5 de whey) comparados por rótulo e preço',
        url: '/reviews/dr-peanut-melhor-sabor',
        type: 'review',
        publishedAt: '2026-10-16',
      },
      {
        title: 'Dr. Peanut: 250 g, 600 g ou kit, qual tamanho compensa',
        url: '/reviews/dr-peanut-qual-tamanho-compensa',
        type: 'review',
        publishedAt: '2026-10-25',
      },
      {
        title: 'Doctor Bar, alfajor e Doctor Wafer: qual snack da Dr. Peanut escolher (proteína, açúcar e preço por unidade)',
        url: '/reviews/snacks-dr-peanut-qual-escolher',
        type: 'review',
        publishedAt: '2026-10-25',
      },
      {
        title: 'Dr. Peanut é boa? A pasta de amendoim, o whey, os snacks e o que vale comprar da marca',
        url: '/reviews/dr-peanut-e-boa',
        type: 'review',
        publishedAt: '2026-11-03',
      },
      {
        title: 'Dr. Peanut no Reclame Aqui: nota, reclamações e o que os dados mostram',
        url: '/reviews/dr-peanut-reclame-aqui-nota-reputacao',
        type: 'review',
        publishedAt: '2026-10-14',
      },
    ],
    lastVerified: '2026-11-22',
    testedAt: '2026-11-12',
    testNote:
      'Aplicamos o DREMCASACOMCECILIA num carrinho com seis pastas de amendoim de R$ 25,89, R$ 155,34 no total, e os itens caíram para R$ 139,80, com R$ 15,54 de desconto, os 10%. Com entrega em São Paulo, o carrinho tinha frete grátis antes do cupom e passou a pagar R$ 12,23 de frete depois dele. Em 11/11/2026, numa pasta sabor avelã de 250 g em promoção, de R$ 28,90 por R$ 25,89, o total caiu para R$ 23,30: os 10% entraram sobre o preço promocional.',
    aboutBrand:
      'A Dr. Peanut é uma marca paranaense de pastas de amendoim, com sabores doces como Bombom Italiano e linha de alfajores, snacks e whey protein vendidos no site oficial. O cupom DREMCASACOMCECILIA é o benefício da parceria para quem acompanha o Em Casa com Cecília: dá 10% OFF em todo o site, com qualquer forma de pagamento, e soma com as promoções vigentes. A recomendação é conferir o resumo do pedido antes de finalizar.',
    faqs: [
      {
        question: 'Qual é o cupom da Dr. Peanut?',
        answer:
          'O código da nossa parceria é DREMCASACOMCECILIA, que dá 10% OFF em todo o site da Dr. Peanut, para conta nova e para quem já comprou, em todas as formas de pagamento. Cole no campo "Código" do carrinho, clique em Adicionar e confira o desconto no resumo.',
      },
      {
        question: 'O cupom DREMCASACOMCECILIA vale para todos os produtos da Dr. Peanut?',
        answer: 'Sim. O DREMCASACOMCECILIA dá 10% OFF em todos os produtos do site oficial da Dr. Peanut.',
      },
      {
        question: 'O cupom DREMCASACOMCECILIA vale em todas as formas de pagamento?',
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
          'Vale. A campanha de novembro da Dr. Peanut se chama Doctor November, com o Leve 8, pague 5, o Comprou, ganhou e a Assinatura Doctor de até 20% OFF. O DREMCASACOMCECILIA dá 10% OFF e soma com as promoções do site; confira o total no carrinho antes de pagar.',
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
    hubCard: 'reduzido',
    shortDescription: 'todo o site Black Skull, com todas as formas de pagamento',
    longDescription:
      'O cupom Black Skull CECILIA10 dá 10% OFF em todo o site, para quem compra pela primeira vez e para quem já é cliente, testado com um kit de whey em promoção: soma com as promoções e vale em todas as formas de pagamento.',
    metaTitle: 'Cupom Black Skull: 10% OFF em tudo com CECILIA10',
    metaTitleMonth: true,
    metaDescription:
      'Cupom Black Skull: CECILIA10 dá 10% OFF em todo o site para cliente novo ou antigo, inclusive em promoção, em todas as formas de pagamento.',
    eligibleCategories: 'Todos os produtos do site oficial da Black Skull',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping: 'Frete grátis acima de R$ 199,90 no Sul e no Sudeste, de R$ 249,90 no Centro-Oeste e de R$ 299,90 nas demais regiões, segundo a política de entrega da loja; vale o total do carrinho já com os descontos',
    combinable: 'Soma com as promoções vigentes do site e vale com todas as formas de pagamento',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Os 10% entram sobre o preço promocional dos produtos do site' },
      { benefit: 'pix', stacks: 'sim', condition: 'O site não dá desconto próprio no Pix; o cupom vale no Pix, no Pix parcelado, no cartão e no boleto' },
      { benefit: 'frete', stacks: 'depende', condition: 'Grátis acima de R$ 199,90 no Sul e no Sudeste, de R$ 249,90 no Centro-Oeste e de R$ 299,90 nas demais regiões, sobre o total já com os descontos' },
    ],
    paymentPerks: [
      'Até 8x sem juros no cartão, com parcela mínima de R$ 50',
      'Pix parcelado em 4x sem juros, com a primeira parcela na hora e as outras a cada 15 dias',
    ],
    relatedContent: [
      { title: 'Como usar o cupom CECILIA10 na Black Skull: 10% em todo o site', url: '/reviews/cupom-black-skull-como-usar', type: 'review', publishedAt: '2026-10-14' },
      { title: 'Black Friday Black Skull 2026: qual whey, creatina e pré-treino comprar com o CECILIA10', url: '/reviews/black-friday-black-skull', type: 'review', publishedAt: '2026-10-15' },
      { title: 'Whey Black Skull: qual escolher entre 80% HD, 100% HD, 3W Core, Gourmet e Turbo', url: '/reviews/whey-black-skull-qual-escolher', type: 'review', publishedAt: '2026-10-23' },
      { title: 'Creatina Black Skull: Creator, Creatine ou Turbo, qual escolher', url: '/reviews/creatina-black-skull-qual-escolher', type: 'review', publishedAt: '2026-10-23' },
      { title: 'Pré-treino Black Skull: BOPE ou Bone Crusher', url: '/reviews/pre-treino-black-skull-bope-ou-bone-crusher', type: 'review', publishedAt: '2026-10-23' },
      { title: 'Black Skull é boa? O whey, a creatina e o que vale comprar da marca', url: '/reviews/black-skull-e-boa', type: 'review', publishedAt: '2026-11-02' },
      { title: 'Black Skull no Reclame Aqui: nota, reclamações e o que os dados mostram', url: '/reviews/black-skull-reclame-aqui-nota-reputacao', type: 'review', publishedAt: '2026-10-14' },
    ],
    lastVerified: '2026-11-11',
    testedAt: '2026-11-11',
    testNote:
      'Aplicamos o CECILIA10 num kit de 2 wheys Turbo de 907 g em promoção, de R$ 139,80 por R$ 132,81, e o total caiu para R$ 119,53, com R$ 13,28 de desconto: os 10% entraram sobre o preço promocional.',
    aboutBrand:
      'A Black Skull é uma marca de suplementos para quem treina, com whey protein, creatina, pré-treinos, aminoácidos como glutamina e roupas de treino vendidos no site oficial. O cupom CECILIA10 é o benefício da parceria para quem acompanha o Em Casa com Cecília: dá 10% OFF em todo o site, com qualquer forma de pagamento, e soma com as promoções vigentes. A recomendação é conferir o resumo do pedido antes de finalizar.',
    faqs: [
      {
        question: 'Qual é o cupom da Black Skull?',
        answer:
          'O cupom da Black Skull da nossa parceria é CECILIA10, com 10% OFF em todo o site oficial, em todas as formas de pagamento, somando com as promoções vigentes. Vale para quem compra pela primeira vez e para quem já é cliente, no site e no app Black Skull USA.',
      },
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
          'Vale. O CECILIA10 dá 10% OFF em todo o site e entra sobre o preço promocional dos produtos da Black Friday. A linha Descontos da sacola mostra o valor abatido antes de pagar.',
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
    // Fora da vitrine da home em português (Bruno, 16/11/2026); segue em /cupons e em /reviews.
    hideFromPortugueseHome: true,
    hubCategory: 'casa',
    hubCard: 'reduzido',
    shortDescription: 'site do casamento e lista de presentes, com plano gratuito',
    longDescription:
      'Indicação da Cecília para casais que vão montar o site do casamento e a lista de presentes na Lejour. O cadastro é pelo link, e o plano Basic é gratuito.',
    metaTitle: 'Lejour: lista de casamento grátis e planos (indicação)',
    metaDescription:
      'Indicação Lejour: o plano Basic é grátis, e o Premium e o Pro são pagos uma vez. Veja as taxas de 3,89% a 2,99% e crie a lista pelo link da Cecília.',
    eligibleCategories: 'Cadastro de casais no site da Lejour: site do casamento e lista de presentes',
    validity: 'Indicação ativa enquanto a parceria estiver vigente',
    reusable: 'Não se aplica: é um cadastro, não um cupom',
    shipping: 'Não se aplica',
    combinable: 'Não há desconto para somar: o cadastro pelo link é uma indicação, sem benefício extra',
    lastVerified: '2026-11-21',
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
    relatedContent: [
      {
        title: 'O que é a Lejour e como funciona: site de casamento, lista de presentes, taxas e planos',
        url: '/reviews/lejour-como-funciona',
        type: 'review',
        publishedAt: '2026-10-14',
      },
      {
        title: 'Como criar a lista de casamento na Lejour: passo a passo do site e da lista de presentes',
        url: '/reviews/lista-de-casamento-lejour-como-criar',
        type: 'review',
        publishedAt: '2026-10-14',
      },
      {
        title: 'Lejour, iCasei ou Casar.com: taxas, planos e quanto o casal recebe numa lista de R$ 20 mil',
        url: '/reviews/lejour-ou-icasei',
        type: 'review',
        publishedAt: '2026-10-16',
      },
      {
        title: 'Black Friday Lejour 2026: Black November com planos e adicionais com 50% OFF, e vale assinar o Premium?',
        url: '/reviews/black-friday-lejour',
        type: 'review',
        publishedAt: '2026-10-15',
      },
      {
        title: 'Lejour é confiável? Quem está por trás, Fast Shop, segurança e saques',
        url: '/reviews/lejour-e-confiavel',
        type: 'review',
        publishedAt: '2026-10-14',
      },
      {
        title: 'Lejour no Reclame Aqui: nota 9,8, reputação Ótima e reclamações',
        url: '/reviews/lejour-reclame-aqui-nota-reputacao',
        type: 'review',
        publishedAt: '2026-10-14',
      },
    ],
    faqs: [
      {
        question: 'Tem cupom de desconto da Lejour?',
        answer:
          'Não. O link da Cecília é uma indicação: o cadastro, os planos e as taxas são os mesmos do site da Lejour, sem desconto extra.',
      },
      {
        question: 'A lista de casamento da Lejour é grátis?',
        answer:
          'Sim, no plano Basic. Em 21/11/2026, ele não tinha mensalidade, cobrava até 3,89% de taxa sobre os presentes e dava até 2 saques gratuitos.',
      },
      {
        question: 'Quanto custam os planos Premium e Pro da Lejour?',
        answer:
          'Em 21/11/2026, fora das campanhas, o Premium custava R$ 99,90 e o Pro, R$ 199,90, ambos vitalícios, pagos uma única vez ou em até 12x. A taxa da lista cai para 3,29% no Premium e 2,99% no Pro, os saques ficam ilimitados e o domínio personalizado (.site) vem incluso; no Basic, ele custa R$ 69,90.',
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
      { benefit: 'pix', stacks: 'sim', condition: 'Vale pagando no Pix; a Cléa Store não dá desconto extra no Pix, então o abatimento é o dos 10% do cupom' },
      { benefit: 'cashback', stacks: 'sim', condition: 'O pedido com o cupom continua gerando cashback, calculado sobre o valor já com o desconto' },
      { benefit: 'frete', stacks: 'depende', condition: 'Grátis acima de R$ 599, segundo o aviso do site; abaixo disso, o frete é calculado no checkout' },
    ],
    paymentPerks: [
      'Até 12x no cartão, sendo até 4x sem juros, com parcela mínima de R$ 10',
    ],
    lastVerified: '2026-11-21',
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
          'Sim. O cupom vale com todas as formas de pagamento disponíveis no checkout, e o desconto de 10% não depende do meio escolhido. A loja não dá desconto extra no Pix: o abatimento é o do cupom. No cartão, são até 12x, sendo até 4x sem juros, com parcela mínima de R$ 10.',
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
          'Sim. No nosso teste mais recente, os 10% entraram num kit de t-shirts que já estava com preço de campanha: de R$ 199,00 por R$ 179,10. O preço do kit muda com as campanhas; na consulta de 21/11/2026, ele estava de R$ 387,00 por R$ 258,00.',
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
        question: 'Como funciona a troca e a devolução na Cléa Store?',
        answer:
          'Pela política da loja, a devolução pode ser pedida em até 30 dias corridos depois do recebimento, e o produto com defeito, em até 90 dias. O pedido é feito pelo formulário do site, e a loja manda um código de postagem dos Correios válido por 7 dias. A peça volta na embalagem original, com a nota fiscal, e o brinde volta junto quando a devolução é total. O reembolso pode ser em crédito na loja, válido por 360 dias, por Pix em até 6 dias úteis ou como estorno no cartão; cashback, cupons e frete grátis não são reembolsados.',
      },
      {
        question: 'O que fazer se o cupom CSEMCASACOMCECILIA não funcionar?',
        answer:
          'Confira se o código foi digitado sem espaços no campo de cupom do site oficial da Cléa Store. Ele vale em todos os produtos e soma com as promoções e com o cashback da loja; no Mercado Livre ele não vale. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.',
      },
      {
        question: 'Tem cupom Cléa Store na Black Friday?',
        answer:
          'Tem. O cupom Cléa Store CSEMCASACOMCECILIA dá 10% OFF em todo o site, em todas as formas de pagamento, e é o mesmo código do resto do ano. Na Black Friday, a loja também dá uma T-shirt Oversized de brinde para quem compra qualquer peça, e o cupom vale no mesmo pedido.',
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
    relatedContent: [
      { title: 'Cléa Store é boa? Camisetas, bodies e alfaiataria', url: '/reviews/clea-store-e-boa', type: 'review', publishedAt: '2026-11-04' },
      { title: 'Cupom Cléa Store na primeira compra', url: '/reviews/cupom-clea-store-primeira-compra', type: 'review', publishedAt: '2026-11-12' },
      { title: 'Camiseta Cléa Store é boa? Tecido, kits e preço', url: '/reviews/camiseta-clea-store-e-boa', type: 'review', publishedAt: '2026-10-23' },
      { title: 'Body Cléa Store Second Skin: qual escolher', url: '/reviews/body-clea-store-second-skin-qual-escolher', type: 'review', publishedAt: '2026-10-20' },
      { title: 'Alfaiataria de verão na Cléa Store', url: '/reviews/alfaiataria-verao-clea-store', type: 'review', publishedAt: '2026-10-25' },
      { title: 'Looks com camiseta básica feminina', url: '/reviews/looks-com-camiseta-basica-feminina', type: 'review', publishedAt: '2026-11-11' },
      { title: 'Cléa Store no Reclame Aqui: nota e reclamações', url: '/reviews/clea-store-reclame-aqui-nota-reputacao', type: 'review', publishedAt: '2026-10-14' },
    ],
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
      'Frete grátis por região, segundo as regras de frete da loja: acima de R$ 170 em SP, MG, RJ, DF e GO, de R$ 250 no Sul e de R$ 300 nos demais estados. O mínimo conta pelo valor dos produtos antes do cupom: no nosso teste, um pedido de R$ 175,90 seguiu com frete grátis em SP depois do MAUAD. Abaixo disso, o frete é calculado no checkout',
    combinable:
      'Soma com as promoções vigentes do site e com os 5% de desconto do Pix, e vale com todas as formas de pagamento',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Os 10% entram sobre o preço da oferta' },
      { benefit: 'pix', stacks: 'sim', condition: 'O Pix tira 5% do total que sobra depois do cupom: os dois juntos dão 14,5% sobre o valor dos produtos' },
      { benefit: 'frete', stacks: 'depende', condition: 'Grátis acima de R$ 170 em SP, MG, RJ, DF e GO, de R$ 250 no Sul e de R$ 300 nos demais estados, contando o valor antes do cupom' },
    ],
    paymentPerks: [
      'Até 2x sem juros no cartão',
    ],
    lastVerified: '2026-11-22',
    testedAt: '2026-11-22',
    testNote:
      'Com a Black November no ar, aplicamos o MAUAD num Kit 3 Panetones de R$ 175,90: o cupom tirou R$ 17,59, o total caiu para R$ 158,31 e o total no Pix ficou em R$ 150,39. O frete econômico para São Paulo seguiu grátis depois do cupom, porque o mínimo conta pelo valor dos produtos. Em 11/11/2026, num combo de seis pacotes de pão de batata em oferta, de R$ 125,40 por R$ 106,59, o total caiu para R$ 95,93.',
    codeInstructions: [
      'Copie o código MAUAD no card acima.',
      'Acesse o site oficial da Belive pelo botão indicado e coloque os produtos no carrinho.',
      'No carrinho, cole o código no campo "Código do cupom" e clique em "Aplicar cupom".',
      'Confira os 10% de desconto no total do carrinho; no Pix, a loja ainda tira 5%.',
    ],
    aboutBrand:
      'A Belive é uma marca brasileira de alimentos sem glúten, sem leite e sem lactose, com doces sem açúcar, snacks, brownies proteicos e pães vendidos no site oficial. O cupom MAUAD é o benefício da parceria para quem acompanha o Em Casa com Cecília: dá 10% OFF em todo o site, com qualquer forma de pagamento, e soma com as ofertas e com o desconto de 5% do Pix. A recomendação é conferir o resumo do pedido antes de finalizar.',
    relatedContent: [
      {
        title: 'Como usar o cupom da Belive e o que ele soma',
        url: '/reviews/cupom-belive-como-usar',
        type: 'review',
        publishedAt: '2026-10-16',
      },
      {
        title: 'Cupom Belive primeira compra: MAUAD dá 10% OFF e vale nas compras seguintes',
        url: '/reviews/cupom-belive-primeira-compra',
        type: 'review',
        publishedAt: '2026-11-12',
      },
      {
        title: 'Black Friday Belive 2026: o que comprar na Black November, avulso ou kit, e quanto fica com o cupom MAUAD',
        url: '/reviews/black-friday-belive',
        type: 'review',
        publishedAt: '2026-10-16',
      },
      {
        title: 'Belive é boa? Os doces sem açúcar, os salgadinhos, os pães e o que vale comprar da marca',
        url: '/reviews/belive-e-boa',
        type: 'review',
        publishedAt: '2026-11-03',
      },
      {
        title: 'Panetone Belive é bom? Chocotone, zero açúcar e sem glúten pelo rótulo',
        url: '/reviews/panetone-belive-e-bom',
        type: 'review',
        publishedAt: '2026-11-04',
      },
      {
        title: 'Doces sem açúcar para diabéticos: o que olhar no rótulo',
        url: '/reviews/doces-sem-acucar-para-diabeticos',
        type: 'review',
        publishedAt: '2026-10-17',
      },
      {
        title: 'Belive é confiável? Quem vende, CNPJ, trocas, frete e onde comprar',
        url: '/reviews/belive-e-confiavel',
        type: 'review',
        publishedAt: '2026-10-16',
      },
      {
        title: 'Belive no Reclame Aqui: nota, reputação e reclamações',
        url: '/reviews/belive-reclame-aqui-nota-reputacao',
        type: 'review',
        publishedAt: '2026-10-16',
      },
    ],
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
          'Sim. No nosso teste, o carrinho com o MAUAD aplicado ainda ganhou os 5% de desconto do Pix: R$ 519,14 viraram R$ 493,18. Os descontos são um depois do outro, e não 15% de uma vez: os 10% do cupom e depois 5% sobre o que sobrou dão 14,5% sobre o valor dos produtos.',
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
          'Sim, com valor mínimo por região. As regras de frete da loja dão frete grátis acima de R$ 170 em SP, MG, RJ, DF e GO, acima de R$ 250 no Sul e acima de R$ 300 nos demais estados. O mínimo conta pelo valor dos produtos antes do cupom MAUAD. Abaixo disso, o frete é calculado no checkout.',
      },
      {
        question: 'Dá para trocar ou devolver um pedido da Belive?',
        answer:
          'Dá. Na compra pelo site, você pode desistir em até 7 dias corridos depois de receber, como prevê o Código de Defesa do Consumidor. Produto com defeito ou avariado vai pelo SAC da loja, sac@nhdfoods.com.br, ou pelo formulário de contato do site, com o número do pedido e fotos.',
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
    hubCard: 'reduzido',
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
      { benefit: 'cashback', stacks: 'depende', condition: 'A compra com o cupom gera o cashback da loja, calculado sobre o total já com o desconto; o crédito do cashback não vale junto com o cupom' },
      { benefit: 'outro-cupom', stacks: 'nao', condition: 'A loja não acumula cupons no mesmo pedido' },
      { benefit: 'frete', stacks: 'depende', condition: 'Grátis acima de R$ 299 no Sul, Sudeste e Centro-Oeste e acima de R$ 399 no Norte e Nordeste' },
    ],
    paymentPerks: [
      'Até 3x sem juros no cartão',
    ],
    lastVerified: '2026-11-23',
    testedAt: '2026-11-23',
    testNote:
      'Na Blue Friday, aplicamos o MMEMCASACOMCECILIA num carrinho com o Whey Concentrado Baunilha refil de 900 g (R$ 209,25), a creatina refil de 500 g (R$ 74,90) e dois wheys Paçoquita de 450 g (R$ 271,98), todos com preço de campanha. O subtotal de R$ 556,13 teve R$ 55,61 de desconto, os 10%, e o total caiu para R$ 500,52; a creatina de 210 g que a loja dá de brinde na campanha entrou no pedido junto com o cupom.',
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
        question: 'Qual é o cupom da Mais Mu?',
        answer:
          'O cupom da Mais Mu da nossa parceria é MMEMCASACOMCECILIA, com 10% OFF no site oficial, em todas as formas de pagamento. Vale para cliente novo e antigo e soma com as ofertas do site.',
      },
      {
        question: 'O cupom MMEMCASACOMCECILIA vale para todos os produtos da Mais Mu?',
        answer: 'Sim. O MMEMCASACOMCECILIA dá 10% OFF em todos os produtos do site oficial da Mais Mu, inclusive combos.',
      },
      {
        question: 'O cupom soma com produtos em promoção?',
        answer:
          'Sim. No nosso teste mais recente, na Blue Friday, os 10% entraram num carrinho só com produtos em promoção: R$ 556,13 viraram R$ 500,52.',
      },
      {
        question: 'O cupom MMEMCASACOMCECILIA soma com o desconto do Pix?',
        answer:
          'Sim. O cupom vale com todas as formas de pagamento e, no Pix, a Mais Mu ainda tira os 3% de desconto dela.',
      },
      {
        question: 'Ganho o cashback da Mais Mu usando o cupom?',
        answer:
          'O cashback é um programa da própria Mais Mu, com percentual e valor mínimo definidos pela loja, que mudam nas campanhas. No nosso teste, com o cupom aplicado, o checkout calculou o cashback sobre o total já com o desconto. O crédito que ele gera não soma com o cupom numa compra futura.',
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
          'Vale. O MMEMCASACOMCECILIA dá 10% OFF sobre os preços da Blue Friday e soma com os 3% do Pix. No nosso teste da campanha, o cupom entrou junto com a creatina de 210 g que a loja dá de brinde em qualquer compra, enquanto durar o estoque. Confira a linha Desconto do cupom antes de pagar.',
      },
      {
        question: 'Comprar com o cupom apoia o Em Casa com Cecília?',
        answer:
          'Sim, a compra pode gerar comissão para o Em Casa com Cecília, sem custo extra para você. O desconto aparece no checkout quando o cupom é aceito.',
      },
    ],
    monthlyHighlight: {
      scope: 'em todo o site',
      note: 'Soma com as ofertas da Blue Friday e com os 3% do Pix',
    },
    relatedContent: [
      { title: 'Como usar o cupom MMEMCASACOMCECILIA na Mais Mu e o que ele não cobre', url: '/reviews/cupom-mais-mu-como-usar', type: 'review', publishedAt: '2026-10-20' },
      { title: 'Cupom Mais Mu primeira compra: MMEMCASACOMCECILIA dá 10% OFF e vale nas compras seguintes', url: '/reviews/cupom-mais-mu-primeira-compra', type: 'review', publishedAt: '2026-11-12' },
      { title: 'Black Friday Mais Mu 2026: Blue Friday com até 50%, qual whey, creatina e barrinha comprar e o cupom MMEMCASACOMCECILIA', url: '/reviews/black-friday-mais-mu', type: 'review', publishedAt: '2026-10-20' },
      { title: 'Mais Mu é boa? O whey, o Exquenta, as barras e o que vale comprar da marca', url: '/reviews/mais-mu-e-boa', type: 'review', publishedAt: '2026-11-03' },
      { title: 'Whey Mais Mu: qual sabor e qual versão escolher (pote, refil, sachê e isolado)', url: '/reviews/whey-mais-mu-qual-escolher', type: 'review', publishedAt: '2026-10-25' },
      { title: 'Barrinhas e wafers proteicos da Mais Mu: Mukebar, Crush Bar e Chocowheyfer, qual escolher (proteína, açúcar e preço por unidade)', url: '/reviews/barra-de-proteina-mais-mu-qual-escolher', type: 'review', publishedAt: '2026-10-25' },
      { title: 'Exquenta Mais Mu: o que o rótulo mostra em cada sabor, sachê e versão sem cafeína', url: '/reviews/pre-treino-exquenta-mais-mu-e-bom', type: 'review', publishedAt: '2026-10-25' },
      { title: 'Mais Mu no Reclame Aqui: nota, reclamações e o que os dados mostram', url: '/reviews/mais-mu-reclame-aqui-nota-reputacao', type: 'review', publishedAt: '2026-10-20' },
    ],
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
    lastVerified: '2026-11-22',
    testedAt: '2026-11-22',
    testNote:
      'Aplicamos o SKEMCASACOMCECILIA num kit de três body splashes, de R$ 297,00 por R$ 237,60 com os 20% da promoção do site, e o total caiu para R$ 213,84, com R$ 23,76 de desconto: os 10% entraram sobre o preço promocional. Em 21/10/2026, no Pix, a loja tirou mais 5% depois do código. Em 22/11/2026, com a campanha November Glow no ar, o código tirou 5% dos preços da campanha nos seis produtos testados: o Mousse foi de R$ 101,92 para R$ 96,82.',
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
        question: 'Qual é o cupom da Skelt?',
        answer:
          'O cupom da Skelt da nossa parceria é SKEMCASACOMCECILIA, com 10% OFF em todo o site oficial, para cliente novo ou antigo, em todas as formas de pagamento.',
      },
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
          'Sim. No teste de checkout mais recente, o SKEMCASACOMCECILIA foi aceito no carrinho. A data e os valores do teste estão em "Como testamos o cupom", nesta página.',
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
          'Vale. O SKEMCASACOMCECILIA é o código de 10% OFF da parceria. Com a campanha November Glow no ar, em novembro, o carrinho aplicou 5% sobre os preços da campanha nos seis produtos que testamos. Confira o total na sacola antes de pagar.',
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
    relatedContent: [
      {
        title: 'Como usar o cupom SKEMCASACOMCECILIA na Skelt e o que ele soma',
        url: '/reviews/cupom-skelt-como-usar',
        type: 'review',
        publishedAt: '2026-10-21',
      },
      {
        title: 'Black Friday Skelt 2026: o que comprar, kits e o cupom SKEMCASACOMCECILIA',
        url: '/reviews/black-friday-skelt',
        type: 'review',
        publishedAt: '2026-10-21',
      },
      {
        title: 'Autobronzeador Skelt: qual escolher entre mousse, água, gel, bifásico e Dark',
        url: '/reviews/autobronzeador-skelt-qual-escolher',
        type: 'review',
        publishedAt: '2026-10-23',
      },
      {
        title: 'Body splash Skelt: qual escolher por fragrância, com hidratantes e kits',
        url: '/reviews/body-splash-skelt-qual-escolher',
        type: 'review',
        publishedAt: '2026-10-23',
      },
      {
        title: 'Hidratante corporal Skelt: qual fragrância escolher e quanto sai por 100 g',
        url: '/reviews/hidratante-corporal-skelt-qual-fragrancia',
        type: 'review',
        publishedAt: '2026-10-29',
      },
      {
        title: 'Skelt é boa? Autobronzeadores, body splash e o que vale comprar da marca',
        url: '/reviews/skelt-e-boa',
        type: 'review',
        publishedAt: '2026-11-04',
      },
      {
        title: 'Skelt no Reclame Aqui: nota, reclamações e o que os dados mostram',
        url: '/reviews/skelt-reclame-aqui-nota-reputacao',
        type: 'review',
        publishedAt: '2026-10-21',
      },
    ],
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
    hubCard: 'destaque',
    shortDescription: 'todo o site Bagaggio, com todas as formas de pagamento',
    longDescription:
      'O cupom Bagaggio CECILIA10 dá 10% OFF em malas, mochilas e acessórios no site oficial, para quem compra pela primeira vez e para quem já é cliente, soma com as promoções, o Outlet e os 5% do Pix, e vale em todas as formas de pagamento. Testado em mala, conjunto e mochila.',
    metaTitle: 'Cupom Bagaggio: 10% OFF em tudo com CECILIA10',
    metaTitleMonth: true,
    metaDescription:
      'Cupom Bagaggio: CECILIA10 dá 10% OFF em malas e mochilas para cliente novo ou antigo, somando com as promoções, o Outlet e os 5% do Pix.',
    eligibleCategories: 'Todos os produtos do site oficial da Bagaggio, inclusive os do Outlet',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping:
      'Calculado pelo CEP no carrinho, sem um mínimo geral para frete grátis; alguns produtos entram em promoção de frete grátis, e a retirada numa loja Bagaggio próxima sai sem custo, conforme a disponibilidade',
    combinable:
      'Soma com as promoções vigentes do site, inclusive o Outlet, e com os 5% de desconto do Pix, e vale com todas as formas de pagamento; não soma com outro cupom, porque a loja aceita um por pedido',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Entra sobre as promoções do site, inclusive os produtos do Outlet' },
      { benefit: 'pix', stacks: 'sim', condition: 'No Pix, a Bagaggio tira mais 5% depois do código' },
      { benefit: 'outro-cupom', stacks: 'nao', condition: 'A loja não acumula cupons no mesmo pedido' },
    ],
    paymentPerks: [
      'Até 6x sem juros no cartão com parcela mínima de R$ 50, ou até 10x sem juros com parcela mínima de R$ 200',
    ],
    lastVerified: '2026-11-22',
    testedAt: '2026-11-22',
    testNote:
      'Aplicamos o CECILIA10 numa mala de bordo Detroit, de R$ 379,90 por R$ 249,90, e o total caiu para R$ 224,91, com R$ 24,99 de desconto; no Pix, a loja tirou mais 5% depois do código, para R$ 213,66. O código também deu 10% num conjunto de malas Malta P e M e numa mochila Explore. A mala Downtown do print saiu de R$ 179,90 para R$ 161,91. No resumo do pedido, o desconto aparece como "Cupom UGC".',
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
          'Sim. No nosso teste mais recente, os 10% do cupom entraram numa mala de bordo Detroit que já estava com desconto: de R$ 249,90 por R$ 224,91.',
      },
      {
        question: 'O cupom CECILIA10 soma com o desconto do Pix?',
        answer:
          'Sim. O cupom vale com todas as formas de pagamento e, no Pix, a Bagaggio ainda tira os 5% de desconto dela.',
      },
      {
        question: 'O CECILIA10 soma com outra promoção que pede cupom?',
        answer:
          'Não. Quando a Bagaggio roda uma promoção com cupom próprio, esse cupom ocupa o lugar do CECILIA10, porque a loja aceita um cupom por pedido. As promoções sem cupom, com o preço já baixado no site, somam com o CECILIA10.',
      },
      {
        question: 'O cupom Bagaggio vale na primeira compra? É melhor que o de boas-vindas?',
        answer:
          'Vale. O CECILIA10 dá 10% OFF na primeira compra e também para quem já comprou na loja. A Bagaggio aceita um cupom por pedido, então ele não soma com o cupom de boas-vindas da loja: use um ou outro.',
      },
      {
        question: 'Qual cupom Bagaggio dá 10% para quem já é cliente?',
        answer:
          'O CECILIA10. Ele dá 10% no site oficial para quem compra pela primeira vez e para quem já comprou.',
      },
      {
        question: 'Existe cupom Bagaggio de 15% ou 20%?',
        answer:
          'Com código, o desconto que testamos é o do CECILIA10: 10% no site oficial, inclusive no Outlet. Não testamos os códigos de 15% ou 20% que aparecem em sites de cupom. O CECILIA10 soma com as promoções e, no Pix, com os 5% da loja: no teste, os 10% entraram sobre uma mala de bordo com desconto, e o Pix tirou mais 5%.',
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
          'O frete é calculado pelo CEP no carrinho, pelo peso e pelo volume. Não encontramos um mínimo geral para frete grátis, mas a loja pode pôr produtos em promoção de frete grátis; o carrinho mostra o valor pelo CEP. Na nossa simulação, a entrega de uma mala de bordo em capitais ficou entre cerca de R$ 27 e R$ 32. A retirada numa loja Bagaggio próxima sai sem custo, conforme a disponibilidade.',
      },
      {
        question: 'Posso desistir da compra feita com o cupom?',
        answer:
          'Sim. Em compras pelo site, a Bagaggio aceita a desistência em até 7 dias corridos depois do recebimento, com vale-troca ou devolução do valor pago.',
      },
      {
        question: 'O que fazer se o cupom CECILIA10 não funcionar?',
        answer:
          'Veja se não há outro cupom no carrinho: a Bagaggio não acumula cupons. O código vai no campo de cupom do carrinho, no site ou no app, sem espaços; no Mercado Livre ele não vale. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.',
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
    relatedContent: [
      {
        title: 'Como usar o cupom CECILIA10 na Bagaggio e o que ele soma',
        url: '/reviews/cupom-bagaggio-como-usar',
        type: 'review',
        publishedAt: '2026-10-22',
      },
      {
        title: 'Black Friday Bagaggio 2026: o que comprar, conjuntos e o cupom CECILIA10',
        url: '/reviews/black-friday-bagaggio',
        type: 'review',
        publishedAt: '2026-10-22',
      },
      {
        title: 'Mala de bordo Bagaggio: qual compensa em preço, medida e selo',
        url: '/reviews/mala-de-bordo-bagaggio-qual-compensa',
        type: 'review',
        publishedAt: '2026-10-30',
      },
      {
        title: 'Garantia vitalícia Bagaggio: o que cobre, o que não cobre e como acionar',
        url: '/reviews/bagaggio-garantia-vitalicia',
        type: 'review',
        publishedAt: '2026-10-22',
      },
      {
        title: 'Bagaggio é confiável? Empresa, CNPJ, site oficial e garantia',
        url: '/reviews/bagaggio-e-confiavel',
        type: 'review',
        publishedAt: '2026-10-22',
      },
      {
        title: 'Bagaggio no Reclame Aqui: nota, reputação e principais reclamações',
        url: '/reviews/bagaggio-reclame-aqui-nota-reputacao',
        type: 'review',
        publishedAt: '2026-10-22',
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
    cartPrint: { article: 'cupom-toda-up-como-usar', src: '/images/reviews/toda-up/cupom-toda-up-checkout-mauad-10.webp', alt: 'Resumo do pedido no checkout da Toda Up com o código MAUAD aplicado na Fita Up de R$ 116,90: desconto de R$ 11,69 e total de R$ 105,21', aspectRatio: 1.171 },
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
    discount: '10% OFF',
    discountNumber: 10,
    category: 'Moda íntima e lingerie',
    hubCategory: 'moda',
    hubCard: 'destaque',
    shortDescription: 'todo o site Toda Up, inclusive nos produtos em promoção',
    longDescription:
      'O cupom Toda Up MAUAD dá 10% OFF em sutiãs, tops, calcinhas e adesivos no site oficial, para quem compra pela primeira vez e para quem já é cliente, e soma com as promoções do site, inclusive com a escada de desconto da Black Week. Ele não vale nos itens marcados como Black VIP, Todalovers, Influ ou Oferta Exclusiva.',
    metaTitle: 'Cupom Toda Up: 10% OFF em tudo com MAUAD',
    metaTitleMonth: true,
    metaDescription:
      'Cupom Toda Up: MAUAD dá 10% OFF em sutiãs, tops, calcinhas e adesivos para cliente novo ou antigo e soma com as promoções do site.',
    eligibleCategories: 'Todos os produtos do site oficial da Toda Up, inclusive os que já estão em promoção',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping:
      'Calculado pelo CEP no checkout, por Sedex, Loggi ou Jadlog; o pedido sai em até 3 dias úteis depois da confirmação do pagamento',
    combinable:
      'Soma com as promoções vigentes do site, inclusive com a escada de desconto da Black Week, e vale nos produtos que já estão com desconto; não vale nos itens marcados como Black VIP, Todalovers, Influ ou Oferta Exclusiva',
    stacking: [
      { benefit: 'promocoes', stacks: 'depende', condition: 'Entra sobre o preço promocional e sobre a escada da Black Week; não vale nos itens marcados como Black VIP, Todalovers, Influ ou Oferta Exclusiva' },
      { benefit: 'pix', stacks: 'sim', condition: 'Soma com o desconto do Pix, quando a loja oferece; o percentual aparece na hora do pagamento' },
    ],
    lastVerified: '2026-11-23',
    testedAt: '2026-11-23',
    testNote:
      'Montamos dois carrinhos no site oficial. Na Fita Up de R$ 116,90, posta pelo botão "Comprar agora", a Black Week tirou 25% e o total foi a R$ 87,68; o MAUAD tirou mais R$ 8,76, e o checkout fechou em R$ 78,92. Num carrinho de R$ 509,70 com o Sutiã Comfort Up, o Top Segunda Pele e o Sutiã de Silicone Invisível, o MAUAD tirou R$ 50,97, os 10%, e o total foi a R$ 458,73. Nos dois, o desconto apareceu na linha MAUAD do resumo do pedido.',
    codeInstructions: [
      'Copie o código MAUAD no card acima.',
      'Acesse o site oficial da Toda Up pelo botão indicado e coloque os produtos no carrinho.',
      'No checkout, confira se o MAUAD já aparece aplicado; se não, cole o código no campo "Código de desconto ou cartão-presente" e aplique.',
      'Confira o desconto no resumo do pedido antes de pagar.',
    ],
    aboutBrand:
      'A Toda Up é uma marca brasileira de moda íntima feminina, de Biguaçu (SC). Começou com as fitas adesivas para decote e hoje vende sutiãs, tops e calcinhas segunda pele, sutiã de silicone, adesivos e acessórios. O cupom MAUAD é o benefício da parceria para quem acompanha o Em Casa com Cecília: dá 10% OFF no site e soma com as promoções, inclusive com a escada da Black Week. A recomendação é conferir o resumo do pedido antes de pagar.',
    faqs: [
      {
        question: 'Qual é o cupom da Toda Up?',
        answer:
          'O cupom da Toda Up da nossa parceria é MAUAD, com 10% OFF no site oficial, em todas as formas de pagamento, válido inclusive em kits e peças em promoção. Ele não vale nos itens marcados como Black VIP, Todalovers, Influ ou Oferta Exclusiva.',
      },
      {
        question: 'O cupom MAUAD vale para todos os produtos da Toda Up?',
        answer:
          'Vale em sutiãs, tops, calcinhas, adesivos e acessórios do site oficial, inclusive nos que já estão em promoção. As exceções são os itens marcados como Black VIP, Todalovers, Influ ou Oferta Exclusiva: com um deles no carrinho, o checkout não aplica o cupom.',
      },
      {
        question: 'Qual cupom Toda Up vale para quem já é cliente?',
        answer:
          'O MAUAD. Ele dá 10% no site oficial da Toda Up para quem compra pela primeira vez e para quem já comprou.',
      },
      {
        question: 'A Toda Up é a antiga Fita Up? O cupom vale no site todaup.com?',
        answer:
          'Sim. A loja se chamava Fita Up e hoje é Toda Up, com o site oficial todaup.com. O cupom MAUAD dá 10% OFF em todo o site.',
      },
      {
        question: 'O cupom soma com produtos em promoção?',
        answer:
          'Sim. No teste de novembro, a Fita Up em promoção ganhou os 25% da Black Week e, depois, os 10% do MAUAD sobre o que sobrou. A conta está em "Como testamos o cupom", nesta página.',
      },
      {
        question: 'O cupom MAUAD está funcionando hoje?',
        answer:
          'Sim. No teste de checkout mais recente, o MAUAD aplicou os 10% no carrinho. A data e os valores do teste estão em "Como testamos o cupom", nesta página.',
      },
      {
        question: 'O MAUAD dá 15% na Toda Up?',
        answer:
          'Hoje, dá 10%: no teste de novembro, o checkout mostrou 10%. Em alguns dias de campanha a loja já deu um percentual maior com o código; o que vale é a linha MAUAD no resumo do pedido, antes de pagar.',
      },
      {
        question: 'Os cupons MARESSA e BEARAMOS dão 25% e 15% na Toda Up?',
        answer:
          'No nosso teste, não: o MARESSA e o BEARAMOS deram 10%, o mesmo desconto do MAUAD, na Fita Up e num carrinho maior. Os 25% e os 15% anunciados não se confirmaram nesses carrinhos.',
      },
      {
        question: 'Onde coloco o cupom na Toda Up?',
        answer:
          'No campo "Código de desconto ou cartão-presente" do checkout, antes de pagar. Pelo botão desta página, o site da Toda Up já abre com o MAUAD aplicado; confira a linha MAUAD no resumo do pedido.',
      },
      {
        question: 'Quanto custa o frete da Toda Up?',
        answer:
          'Na Black Week, a faixa do site anuncia frete fixo de R$ 9,90. Fora da campanha, o frete é calculado pelo CEP no checkout, por Sedex, Loggi ou Jadlog, e o pedido sai em até 3 dias úteis depois da confirmação do pagamento.',
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
          'Tem. O MAUAD dá 10% OFF em todas as formas de pagamento e soma com a escada da Black Week da loja, que tira 25%, 30% ou 35% conforme o número de produtos.',
      },
      {
        question: 'O cupom Toda Up vale na Black Friday?',
        answer:
          'Vale. No teste de novembro, a escada da Black Week entrou primeiro e o MAUAD tirou mais 10% do que sobrou. Ele só não vale nos itens marcados como Black VIP, Todalovers, Influ ou Oferta Exclusiva.',
      },
      {
        question: 'Comprar com o cupom apoia o Em Casa com Cecília?',
        answer:
          'Sim, a compra pode gerar comissão para o Em Casa com Cecília, sem custo extra para você. O desconto aparece no checkout quando o cupom é aceito.',
      },
    ],
    relatedContent: [
      { title: 'Como usar o cupom da Toda Up e o que ele soma com a Black Week', url: '/reviews/cupom-toda-up-como-usar', type: 'review', publishedAt: '2026-10-26' },
      { title: 'Cupom Toda Up primeira compra: MAUAD dá 10% OFF e vale nas compras seguintes', url: '/reviews/cupom-toda-up-primeira-compra', type: 'review', publishedAt: '2026-11-12' },
      { title: 'Black Friday Toda Up 2026: qual sutiã escolher, quando o kit compensa e o cupom MAUAD', url: '/reviews/black-friday-toda-up', type: 'review', publishedAt: '2026-10-26' },
      { title: 'Toda Up é boa? Sutiãs, segunda pele, Fita Up e kits: o que vale comprar da marca', url: '/reviews/toda-up-e-boa', type: 'review', publishedAt: '2026-11-04' },
      { title: 'Sutiã Toda Up: Comfort Up, Comfort Line ou Comfort Slim, qual escolher', url: '/reviews/sutia-toda-up-qual-escolher', type: 'review', publishedAt: '2026-10-30' },
      { title: 'SkinUp ou Cotton Up: segunda pele ou algodão, qual escolher na Toda Up', url: '/reviews/skinup-ou-cotton-up-toda-up', type: 'review', publishedAt: '2026-10-31' },
      { title: 'Fita Up: como usar no tomara que caia e no decote (e se dá para reutilizar)', url: '/reviews/fita-up-como-usar', type: 'review', publishedAt: '2026-10-27' },
      { title: 'Sutiã de silicone invisível: como usar e para qual roupa', url: '/reviews/sutia-de-silicone-invisivel-como-usar', type: 'review', publishedAt: '2026-10-27' },
      { title: 'Toda Up (antiga Fita Up) no Reclame Aqui: nota, reputação e o que os números mostram', url: '/reviews/toda-up-reclame-aqui-nota-reputacao', type: 'review', publishedAt: '2026-10-26' },
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
    cartPrint: { article: 'cupom-simple-organic-como-usar', src: '/images/reviews/simple-organic/cupom-simple-organic-checkout-com-cupom.webp', alt: 'Resumo do pedido no checkout da Simple Organic com o código S-EMCASACOMCECILIA aplicado e a linha Desconto no pedido', aspectRatio: 1.039 },
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
    metaTitle: 'Cupom Simple Organic: 5% com S-EMCASACOMCECILIA',
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
      { benefit: 'pix', stacks: 'sim', condition: 'O código vale com qualquer forma de pagamento; no teste, o checkout não mostrou desconto próprio no Pix' },
      { benefit: 'frete', stacks: 'depende', condition: 'Grátis a partir de R$ 99 em produtos; o mínimo conta depois do desconto do cupom' },
    ],
    paymentPerks: [
      'Até 5x sem juros no cartão, com parcela mínima de R$ 30',
    ],
    relatedContent: [
      {
        title: 'Como usar o cupom S-EMCASACOMCECILIA na Simple Organic e onde ele vale',
        url: '/reviews/cupom-simple-organic-como-usar',
        type: 'review',
        publishedAt: '2026-11-03',
      },
      {
        title: 'Simple Organic é boa? Os séruns, as soluções e o que vale comprar da marca',
        url: '/reviews/simple-organic-e-boa',
        type: 'review',
        publishedAt: '2026-11-03',
      },
      {
        title: 'Black Friday Simple Organic 2026: a Clean Friday com até 50% OFF e o cupom',
        url: '/reviews/black-friday-simple-organic',
        type: 'review',
        publishedAt: '2026-11-03',
      },
      {
        title: 'Kit de skincare para presente: como escolher na Simple Organic',
        url: '/reviews/kit-skincare-presente-simple-organic',
        type: 'review',
        publishedAt: '2026-11-10',
      },
      {
        title: 'Simple Organic é confiável? CNPJ, Hypera, site oficial, lojas e trocas',
        url: '/reviews/simple-organic-e-confiavel',
        type: 'review',
        publishedAt: '2026-11-03',
      },
      {
        title: 'Simple Organic no Reclame Aqui: nota, reputação e do que as pessoas reclamam',
        url: '/reviews/simple-organic-reclame-aqui-nota-reputacao',
        type: 'review',
        publishedAt: '2026-11-03',
      },
    ],
    lastVerified: '2026-11-22',
    testedAt: '2026-11-22',
    testNote:
      'No checkout da Clean Friday, com o Hidratante Facial Antioleosidade a R$ 27,00 e o Ultra Sérum Vitamina C a R$ 41,40, o S-EMCASACOMCECILIA tirou R$ 3,42 dos R$ 68,40, 5% do pedido, e o total caiu para R$ 64,98: os 5% entraram sobre os preços já reduzidos. Em testes anteriores, o código deu 5% em 11 kits e 13 produtos avulsos, e o frete grátis a partir de R$ 99 contou depois do desconto: o Trio Body Splashes saiu a R$ 99,50 sem o código, com frete grátis, e a R$ 105,41 com ele, com R$ 10,88 de frete.',
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
    cartPrint: { article: 'cupom-holyfoods-como-usar', src: '/images/reviews/holyfoods/cupom-holyfoods-checkout-com-cupom.webp', alt: 'Resumo da compra na HolyFoods com a linha Descontos e o aviso Cupom EMCASA adicionado', aspectRatio: 1.341 },
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
      'Frete grátis a partir de R$ 199 em SP, de R$ 249 no RJ, em MG, no DF e no PR e de R$ 289 em GO, SC, ES e RS; nos outros estados, o frete sai pelo CEP no checkout. O carrinho mostra quanto falta para a sua região, e o prazo aparece no checkout',
    combinable: 'Soma com as promoções do site, inclusive com os 30% da Black da Holy, e vale no Pix e no cartão',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Os 15% entram sobre os produtos que já estão com desconto da loja' },
      { benefit: 'pix', stacks: 'sim', condition: 'O EMCASA vale no pagamento por Pix; na consulta mais recente, a loja não dava desconto extra no Pix' },
      { benefit: 'frete', stacks: 'depende', condition: 'Grátis a partir de R$ 199 em SP, de R$ 249 no RJ, em MG, no DF e no PR e de R$ 289 em GO, SC, ES e RS; nos outros estados, pelo CEP' },
    ],
    paymentPerks: [
      'Até 3x sem juros no cartão',
      'Pix ou cartão de crédito',
    ],
    lastVerified: '2026-11-22',
    testedAt: '2026-11-22',
    testNote:
      'Com a Black da Holy no ar, aplicamos o EMCASA em dois Projetos 21 Dias, R$ 205,80 já com os 30% da campanha: o cupom tirou R$ 30,87 e o total caiu para R$ 174,93, os 15% inteiros por cima do preço da Black. Em 12/11/2026, o checkout abriu com um cupom de campanha da própria loja no campo, e foi preciso removê-lo para colocar o EMCASA; no teste mais recente, o campo veio vazio. Em 05/11/2026, num carrinho de R$ 69,79 com um Pack Sopa da Vovó e duas Sopas Detox, todos já com desconto da loja, o cupom tirou R$ 10,47 e o total caiu para R$ 59,32: os 15% inteiros sobre o preço promocional.',
    codeInstructions: [
      'Copie o código EMCASA no card acima.',
      'Acesse o site oficial da HolyFoods pelo botão indicado, coloque os produtos no carrinho e clique em "Finalizar compra".',
      'No resumo da compra, clique em "Inserir cupom de desconto", cole o código no campo "Código do cupom" e clique em "Adicionar". Se outro código já estiver aplicado, remova-o antes.',
      'Confira a linha "Cupom de desconto" no resumo da compra antes de pagar.',
    ],
    aboutBrand:
      'A HolyFoods é uma marca brasileira de refeições prontas para preparar em casa: sopas, macarrões, risotos e kits, vendidos no site oficial, da Holy Group Ltda (CNPJ 50.874.415/0001-62). O cupom EMCASA é o benefício da parceria para quem acompanha o Em Casa com Cecília: dá 15% OFF em todo o site e soma com os preços que já estão em promoção. A recomendação é conferir o resumo da compra antes de pagar.',
    relatedContent: [
      {
        title: 'Como usar o cupom EMCASA na HolyFoods e onde ele vale',
        url: '/reviews/cupom-holyfoods-como-usar',
        type: 'review',
        publishedAt: '2026-11-05',
      },
      {
        title: 'Cupom HolyFoods primeira compra: EMCASA dá 15% OFF e vale nas compras seguintes',
        url: '/reviews/cupom-holyfoods-primeira-compra',
        type: 'review',
        publishedAt: '2026-11-12',
      },
      {
        title: 'Black Friday HolyFoods 2026: 30% no site todo, os kits da Black e o cupom EMCASA por cima',
        url: '/reviews/black-friday-holyfoods',
        type: 'review',
        publishedAt: '2026-11-05',
      },
      {
        title: 'HolyFoods é boa? Sopas, risotos e macs pelo rótulo, um a um',
        url: '/reviews/holyfoods-e-boa',
        type: 'review',
        publishedAt: '2026-11-10',
      },
      {
        title: 'Como preparar HolyFoods: sopa, risoto e mac, com a água e o tempo de cada ficha',
        url: '/reviews/holyfoods-como-preparar',
        type: 'review',
        publishedAt: '2026-11-20',
      },
      {
        title: 'Projeto 21 Dias HolyFoods: o que vem no kit, quanto custa por sachê e como preparar',
        url: '/reviews/holyfoods-projeto-21-dias',
        type: 'review',
        publishedAt: '2026-11-20',
      },
      {
        title: 'HolyFoods ou Mexidona: sopas, risotos e macs pela tabela e pelo preço por 100 g',
        url: '/reviews/holyfoods-ou-mexidona',
        type: 'review',
        publishedAt: '2026-11-20',
      },
      {
        title: 'HolyFoods é confiável? CNPJ, site oficial, entrega e a garantia de 30 dias',
        url: '/reviews/holyfoods-e-confiavel',
        type: 'review',
        publishedAt: '2026-11-05',
      },
      {
        title: 'HolyFoods no Reclame Aqui: nota, reputação e do que as pessoas reclamam',
        url: '/reviews/holyfoods-reclame-aqui-nota-reputacao',
        type: 'review',
        publishedAt: '2026-11-05',
      },
    ],
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
          'Sim, com valor mínimo por região: a partir de R$ 199 em SP, de R$ 249 no RJ, em MG, no DF e no PR e de R$ 289 em GO, SC, ES e RS. Nos outros estados, o frete é calculado pelo CEP no checkout, onde também aparece o prazo.',
      },
      {
        question: 'E se eu não gostar dos produtos?',
        answer:
          'Pela garantia da loja, você tem 30 dias depois de receber para pedir a devolução: pode provar uma unidade, e as outras voltam fechadas. A devolução é sem custo, com reembolso dos produtos devolvidos. A garantia vem além do direito de desistir em até 7 dias do recebimento, previsto no Código de Defesa do Consumidor; o pedido vai para contato@holyfoods.com.br, com o número do pedido.',
      },
      {
        question: 'A HolyFoods tem desconto no Pix e parcela no cartão?',
        answer:
          'A loja aceita Pix e cartão de crédito e parcela em até 3x sem juros. Na nossa consulta mais recente, o preço no Pix era o mesmo do cartão, sem desconto extra; o EMCASA vale nas duas formas de pagamento.',
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
    cartPrint: { article: 'cupom-petz-como-usar', src: '/images/reviews/petz/cupom-petz-sacola-celular-com-cupom.webp', alt: 'Sacola da Petz no celular com o produto, o cupom EMCASA aplicado no campo Cupom de desconto e a linha Desconto Aplicado', aspectRatio: 1.013 },
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
    hubCard: 'destaque',
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
      { benefit: 'assinatura', stacks: 'nao', condition: 'Não soma com os 10% da Assinatura Petz; o EMCASA entra nas compras avulsas' },
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
      'Entre na Petz pelo botão desta página e coloque os produtos na sacola. O botão abre a loja da Cecília na Petz (petz.com.br/parceiro/emcasa), mas não aplica o EMCASA sozinho; os preços 10% menores que aparecem nos produtos são os de assinante.',
      'Na sacola, cole o código no campo "Digite seu cupom" e aplique.',
      'No Centro-Oeste, no Sul e no Sudeste, em compras acima de R$ 199, escolha "Retire na Loja" para somar mais 5% OFF ao cupom.',
      'Confira a linha "Total de descontos" no resumo do pedido antes de ir para o pagamento.',
    ],
    aboutBrand:
      'A Petz é uma rede brasileira de pet shops, com lojas físicas, site e app, que vende ração, petiscos, higiene, farmácia, acessórios e itens de casa e jardim. O cupom EMCASA vem do programa Parceiro Petz e é o benefício para quem acompanha o Em Casa com Cecília: dá 10% OFF nas compras no site e no app. A recomendação é conferir o resumo do pedido antes de pagar.',
    faqs: [
      {
        question: 'Qual é o cupom da Petz?',
        answer:
          'O cupom da Petz é o EMCASA, que dá 10% OFF no site e no app, em todas as formas de pagamento, para quem compra pela primeira vez e para quem já é cliente. Cole o código no campo "Digite seu cupom" da sacola: o botão da loja não aplica o desconto sozinho.',
      },
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
        question: 'De quem é o cupom EMCASA da Petz?',
        answer:
          'EMCASA é o cupom do Em Casa com Cecília no programa Parceiro Petz. Dá 10% de desconto no site e no app da Petz, na primeira compra e para quem já é cliente. Se o produto estiver em promoção, a sacola aplica o maior desconto.',
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
    relatedContent: [
      { title: 'Como usar o cupom EMCASA na Petz: promoção, retirada e frete', url: '/reviews/cupom-petz-como-usar', type: 'review', publishedAt: '2026-11-11' },
      { title: 'Black Friday Petz 2026: regras, Clubz e quando o cupom ainda ajuda', url: '/reviews/black-friday-petz', type: 'review', publishedAt: '2026-11-11' },
      { title: 'Assinatura Petz ou cupom EMCASA: qual sai mais barato', url: '/reviews/assinatura-petz-ou-cupom', type: 'review', publishedAt: '2026-11-11' },
      { title: 'Areia para gato na Petz: quanto custa o quilo de cada tipo', url: '/reviews/areia-para-gato-petz-custo-por-quilo', type: 'review', publishedAt: '2026-11-15' },
      { title: 'Enxoval do filhote de cachorro: a lista com preço na Petz', url: '/reviews/enxoval-filhote-cachorro-lista-com-preco', type: 'review', publishedAt: '2026-11-21' },
      { title: 'Peitoral para cachorro: os modelos da Petz, com preço e medidas', url: '/reviews/peitoral-cachorro', type: 'review', publishedAt: '2026-11-21' },
      { title: 'Petz no Reclame Aqui: nota, reputação e o que mais gera reclamação', url: '/reviews/petz-reclame-aqui-nota-reputacao', type: 'review', publishedAt: '2026-11-11' },
    ],
    status: 'ativo',
    featured: false,
  },
  {
    offerMode: 'discount-code',
    slug: 'prohall',
    cartPrint: { article: 'cupom-prohall-como-usar', src: '/images/reviews/prohall/cupom-prohall-checkout-desktop-com-cupom.webp', alt: 'Resumo do checkout da Prohall no computador com o código CECILIAMC aplicado: subtotal de R$ 279,70, desconto no pedido de menos R$ 19,57 e total de R$ 260,13', aspectRatio: 1.82 },
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
    codeFieldLabel: 'Código de desconto',
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
      'Cupom Prohall: CECILIAMC dá até 10% OFF para cliente novo ou antigo, soma com as promoções do site, em todas as formas de pagamento. Nos testes, deu 7%.',
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
    lastVerified: '2026-11-22',
    testedAt: '2026-11-22',
    testNote:
      'Num carrinho de quatro itens, com o kit Shampoo + Condicionador Absolut One em promoção, de R$ 149,90 por R$ 89,90, o CECILIAMC tirou R$ 26,64 dos R$ 380,70 e o total caiu para R$ 354,06: 7%. No mesmo dia, aplicamos o código em outros quatro carrinhos, com produtos a preço cheio e em promoção, e o desconto foi de 7% em todos: o Force Hair foi de R$ 264,90 para R$ 246,36, e o Kit Completo Absolut One, de R$ 349,90 para R$ 325,41. Em 22/11/2026, com a Black Prohall no ar, o código tirou R$ 19,57 de um carrinho de R$ 279,70, com o kit Force Hair, o Burix One e o Select One em promoção: 7% de novo, com o total em R$ 260,13.',
    aboutBrand:
      'A Prohall é uma marca brasileira de produtos para cabelo, fundada em 2017 em Lençóis Paulista (SP), com escovas antifrizz, shampoos, condicionadores, máscaras, óleos, séruns e finalizadores vendidos no site oficial. O cupom CECILIAMC é o benefício da parceria para quem acompanha o Em Casa com Cecília e dá até 10% OFF: nos nossos testes, o desconto foi de 7%, e o resumo da compra mostra o valor. Ele vale com qualquer forma de pagamento e soma com as promoções do site.',
    faqs: [
      {
        question: 'Qual é o cupom da Prohall?',
        answer:
          'O cupom da Prohall da nossa parceria é CECILIAMC, com até 10% OFF no site oficial e no aplicativo, em todas as formas de pagamento.',
      },
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
          'No checkout do site oficial: digite CECILIAMC no campo "Código de desconto" e toque em "Aplicar". O resumo da compra passa a mostrar a linha "Desconto no pedido", com o código e o valor descontado.',
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
          'Confira se o código foi digitado no campo "Código de desconto", sem espaços, no site oficial da Prohall, e se o cupom de cashback da loja não está aplicado no mesmo pedido. Lembre que o desconto pode ser menor que 10%. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.',
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
    relatedContent: [
      {
        title: 'Como usar o cupom CECILIAMC na Prohall: até 10% OFF no site e no app',
        url: '/reviews/cupom-prohall-como-usar',
        type: 'review',
        publishedAt: '2026-11-12',
      },
      {
        title: 'Black Friday Prohall 2026: o que está em oferta e como o cupom entra',
        url: '/reviews/black-friday-prohall',
        type: 'review',
        publishedAt: '2026-11-12',
      },
      {
        title: 'Select One ou Burix One: qual escolher, pelo que a Prohall declara e pelo preço por ml',
        url: '/reviews/select-one-ou-burix-one',
        type: 'review',
        publishedAt: '2026-11-20',
      },
      {
        title: 'Biomask Prohall: para que serve, como usar e quanto custa cada tamanho',
        url: '/reviews/biomask-prohall-para-que-serve',
        type: 'review',
        publishedAt: '2026-11-20',
      },
      {
        title: 'Force Hair Prohall: o que vem na linha, como usar e quanto custa',
        url: '/reviews/force-hair-prohall-para-que-serve',
        type: 'review',
        publishedAt: '2026-11-20',
      },
      {
        title: 'Cabelo fino e fraco: Encorpax, Selve Power ou Force Hair, qual linha da Prohall escolher',
        url: '/reviews/cabelo-fino-e-fraco-qual-linha-prohall',
        type: 'review',
        publishedAt: '2026-11-21',
      },
      {
        title: 'Prohall é boa? As linhas da marca, o que os clientes dizem e para quem vale a pena',
        url: '/reviews/prohall-e-boa',
        type: 'review',
        publishedAt: '2026-11-12',
      },
      {
        title: 'Prohall no Reclame Aqui: nota, reputação e o que mais gera reclamação',
        url: '/reviews/prohall-reclame-aqui-nota-reputacao',
        type: 'review',
        publishedAt: '2026-11-12',
      },
    ],
    status: 'ativo',
    featured: false,
  },
  {
    offerMode: 'discount-code',
    slug: 'la-ganexa',
    cartPrint: { article: 'cupom-la-ganexa-como-usar', src: '/images/reviews/laganexa/cupom-laganexa-checkout-com-cupom.webp', alt: 'Resumo da compra no checkout da La Ganexa com CECILIA no campo Cupom (opcional), a linha Descontos de menos R$ 26,44 e o total de R$ 237,96', aspectRatio: 1.473 },
    brand: 'La Ganexa',
    officialUrl: 'https://lojalaganexa.com.br/',
    offerUrl: 'https://lojalaganexa.com.br/',
    brandIcon: 'LG',
    brandLogo: '/images/about/partners/laganexa-icon.png',
    brandLogoAlt: 'Marca La Ganexa',
    bubble: { src: '/images/logos/bolinhas/laganexa-letreiro.png', background: '#2B1408' },
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
      'Cupom La Ganexa: CECILIA dá 10% OFF para cliente novo ou antigo, soma com as promoções e vale em todas as formas de pagamento. Testado no checkout.',
    eligibleCategories: 'Produtos do site oficial da La Ganexa, inclusive os que já estão em promoção',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Pode ser usado por clientes novos e antigos',
    shipping: 'Frete grátis acima de R$ 250 no Sul e no Sudeste e de R$ 350 nas demais regiões, segundo a política de frete da loja; os kits promocionais que a loja deixa fora da regra não contam para o mínimo',
    combinable:
      'Soma com as promoções vigentes do site e vale com todas as formas de pagamento; a loja marca dois kits como não cumulativos com cupom, e no nosso teste o checkout aceitou o código nos dois',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Entra sobre o preço promocional; no teste, entrou até no Kit 2 Doce de Leite e no Kit 2 Brigadeiro de Colher, que as regras da loja marcam como não cumulativos' },
      { benefit: 'pix', stacks: 'sim', condition: 'Soma com o desconto do Pix, quando a loja oferece; o percentual aparece na hora do pagamento' },
      { benefit: 'frete', stacks: 'depende', condition: 'Grátis acima de R$ 250 no Sul e no Sudeste e de R$ 350 nas demais regiões' },
    ],
    paymentPerks: [
      'Até 3x sem juros no cartão; de 4x a 12x, com juros da operadora',
    ],
    lastVerified: '2026-11-23',
    testedAt: '2026-11-23',
    testNote:
      'No checkout seguro da loja (seguro.lojalaganexa.com.br), aplicamos o CECILIA nos dois kits que a página de regras marca como não cumulativos com cupom. Só com o Kit 2 Brigadeiro de Colher, o total foi de R$ 83,99 para R$ 75,59; com o Kit 2 Doce de Leite Zero 400g junto, de R$ 211,98 para R$ 190,78, os 10%. O produto surpresa que a loja dá acima de R$ 180 entrou no pedido, contado depois do cupom. Num teste anterior, com quatro itens em promoção, o CECILIA tirou R$ 26,44 de R$ 264,40.',
    codeInstructions: [
      'Copie o código CECILIA no card acima.',
      'Monte o carrinho no site oficial da La Ganexa e clique em "Finalizar a compra".',
      'No checkout seguro da loja (seguro.lojalaganexa.com.br), toque em "Inserir cupom de desconto", digite CECILIA no campo "Cupom (opcional)" e toque em "Adicionar".',
      'Confira a linha "Descontos" no resumo da compra antes de pagar.',
    ],
    aboutBrand:
      'A La Ganexa é uma marca brasileira de pastas de amendoim e doces zero açúcar e zero glúten, com fábrica em Peruíbe (SP): pastas de amendoim, doce de leite, cookies, panquecas, suspiros e alfajores, vendidos no site oficial. O cupom CECILIA é o benefício da parceria para quem acompanha o Em Casa com Cecília: 10% OFF, com qualquer forma de pagamento e sobre os preços em promoção do site.',
    faqs: [
      {
        question: 'Qual é o cupom da La Ganexa?',
        answer:
          'O cupom da La Ganexa da nossa parceria é CECILIA, com 10% OFF no site oficial da loja, em todas as formas de pagamento. Vale para cliente novo e antigo e soma com as promoções do site.',
      },
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
          'Sim. CECILIA é o cupom do Em Casa com Cecília na La Ganexa e dá 10% OFF no site oficial para clientes novos e antigos. No nosso teste, o desconto entrou sobre quatro produtos que já estavam em promoção. Veja o print em “Como usar o cupom CECILIA”.',
      },
      {
        question: 'O cupom soma com produtos em promoção?',
        answer:
          'Sim. No nosso teste, todos os produtos do carrinho já estavam com preço promocional, e o cupom tirou os 10% do total. A página de regras da loja diz que o Kit 2 Doce de Leite e o Kit 2 Brigadeiros de Colher não acumulam com cupom, mas no nosso teste o checkout aceitou o código nos dois: confira a linha Descontos antes de pagar.',
      },
      {
        question: 'O cupom CECILIA está funcionando hoje?',
        answer:
          'Sim. No teste de checkout mais recente, o CECILIA foi aceito. A data e os valores do teste estão em "Como testamos o cupom", nesta página.',
      },
      {
        question: 'Onde coloco o cupom na La Ganexa?',
        answer:
          'No checkout: depois de "Finalizar a compra", o site abre o checkout seguro da loja, em seguro.lojalaganexa.com.br. No Resumo da compra, toque em "Inserir cupom de desconto", digite CECILIA no campo "Cupom (opcional)" e toque em "Adicionar". O resumo passa a mostrar a linha "Descontos".',
      },
      {
        question: 'Tem cupom La Ganexa na Black Friday?',
        answer:
          'Tem. O cupom La Ganexa CECILIA dá 10% OFF no site oficial, em todas as formas de pagamento, e é o mesmo código do resto do ano.',
      },
      {
        question: 'O cupom La Ganexa vale na Black Friday?',
        answer:
          'Vale. O CECILIA dá 10% OFF e soma com os preços do Esquenta Black Friday: no nosso teste, entrou sobre os kits em oferta e o produto surpresa acima de R$ 180 continuou no pedido. Confira a linha Descontos antes de pagar.',
      },
      {
        question: 'O cupom dá frete grátis?',
        answer:
          'O cupom não dá frete grátis. A La Ganexa tem frete grátis acima de R$ 250 no Sul e no Sudeste e de R$ 350 nas demais regiões.',
      },
      {
        question: 'O que fazer se o cupom CECILIA não funcionar?',
        answer:
          'Confira se o código foi digitado no campo "Cupom (opcional)", sem espaços, no site oficial da La Ganexa, e se a linha Descontos apareceu no resumo. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.',
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
    relatedContent: [
      { title: 'Como usar o cupom CECILIA na La Ganexa: 10% OFF, inclusive em promoção', url: '/reviews/cupom-la-ganexa-como-usar', type: 'review', publishedAt: '2026-11-13' },
      { title: 'Cupom La Ganexa primeira compra: CECILIA dá 10% OFF e vale nas compras seguintes', url: '/reviews/cupom-la-ganexa-primeira-compra', type: 'review', publishedAt: '2026-11-13' },
      { title: 'Black Friday La Ganexa 2026: o que está em oferta e como o cupom entra', url: '/reviews/black-friday-la-ganexa', type: 'review', publishedAt: '2026-11-13' },
      { title: 'La Ganexa é boa? As pastas e o doce de leite pelo rótulo e pelo preço com cupom', url: '/reviews/la-ganexa-e-boa', type: 'review', publishedAt: '2026-11-13' },
      { title: 'Kit La Ganexa ou pote avulso: qual sai mais barato com o cupom CECILIA', url: '/reviews/kit-la-ganexa-ou-avulso-qual-sai-mais-barato', type: 'review', publishedAt: '2026-11-15' },
      { title: 'Dr. Peanut ou La Ganexa: qual pasta de amendoim escolher (rótulo, proteína e preço por 100 g)', url: '/reviews/dr-peanut-ou-la-ganexa', type: 'review', publishedAt: '2026-10-25' },
      { title: 'La Ganexa é confiável? De onde é, site oficial, entrega e trocas', url: '/reviews/la-ganexa-e-confiavel', type: 'review', publishedAt: '2026-11-13' },
      { title: 'La Ganexa no Reclame Aqui: nota, reputação e o que mais gera reclamação', url: '/reviews/la-ganexa-reclame-aqui-nota-reputacao', type: 'review', publishedAt: '2026-11-13' },
    ],
    status: 'ativo',
    featured: false,
  },
  {
    offerMode: 'discount-code',
    slug: 'baw',
    cartPrint: { article: 'cupom-baw-como-usar', src: '/images/reviews/baw/cupom-baw-carrinho-com-cupom.webp', alt: 'Resumo do carrinho da BAW Clothing com o código BAWEMCASACOMCECILIA no campo Cupom de desconto, o aviso Cupom aplicado, a linha Cupom de menos R$ 14,80 e o total de R$ 133,20', aspectRatio: 2.646 },
    brand: 'BAW Clothing',
    officialUrl: 'https://www.bawclothing.com.br/',
    offerUrl: 'https://www.bawclothing.com.br/',
    brandIcon: 'BAW',
    brandLogo: '/images/about/partners/baw.png',
    brandLogoAlt: 'Marca BAW Clothing',
    bubble: { src: '/images/logos/bolinhas/baw.png', background: '#000000' },
    brandWatermark: '/images/logos/watermarks/baw.webp',
    brandColor: '#000000',
    code: 'BAWEMCASACOMCECILIA',
    discount: '10% OFF',
    discountNumber: 10,
    category: 'Streetwear: camisetas, moletons, calças e acessórios',
    hubCategory: 'moda',
    shortDescription: 'todo o site e o app da BAW Clothing, com todas as formas de pagamento',
    longDescription:
      'O cupom BAW Clothing BAWEMCASACOMCECILIA dá 10% OFF em todo o site e no aplicativo, para quem compra pela primeira vez e para quem já é cliente. Na primeira compra, é o mesmo desconto do FIRSTBAW, o cupom de primeira compra da loja. Soma com as promoções e com os 5% do Pix, em qualquer forma de pagamento.',
    metaTitle: 'Cupom BAW: 10% OFF com BAWEMCASACOMCECILIA',
    metaTitleMonth: true,
    metaDescription:
      'Cupom BAW Clothing: BAWEMCASACOMCECILIA dá 10% OFF em todo o site e no app, para cliente novo ou antigo, e soma com as promoções e os 5% do Pix.',
    eligibleCategories: 'Todos os produtos do site oficial e do aplicativo da BAW Clothing, inclusive os que já estão em promoção',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Pode ser usado por clientes novos e antigos',
    shipping: 'Frete grátis a partir de R$ 399, segundo o aviso do site; abaixo disso, frete e prazo calculados no carrinho pelo CEP, a partir do faturamento do pedido',
    combinable:
      'Soma com as promoções vigentes do site e com os 5% de desconto do Pix, e vale com todas as formas de pagamento e no aplicativo; o frete grátis depende do valor do pedido, não do cupom',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Entra sobre o preço promocional: no teste, os 10% entraram numa camiseta em promoção de Black Friday' },
      { benefit: 'pix', stacks: 'sim', condition: 'No Pix, a loja dá 5% de desconto, que soma com o código' },
      { benefit: 'frete', stacks: 'depende', condition: 'Grátis a partir de R$ 399, segundo o aviso do site; abaixo disso, o frete sai pelo CEP, à parte do cupom' },
    ],
    paymentPerks: [
      'Até 10x sem juros no cartão, com parcela mínima de R$ 50',
      'Programa de fidelidade BAWPOINTS, com pontos e cashback para quem se cadastra no site',
    ],
    lastVerified: '2026-11-22',
    testedAt: '2026-11-17',
    testNote:
      'Num carrinho com duas camisetas, a Regular Locally Grown pelo preço cheio de R$ 89,00 e a Regular Goth 3.0 em promoção de Black Friday, de R$ 89,00 por R$ 59,00, o BAWEMCASACOMCECILIA tirou R$ 14,80 dos R$ 148,00 e o total caiu para R$ 133,20: os 10% entraram também sobre a peça em promoção. O frete, calculado pelo CEP, ficou de fora do desconto. Em 17/11/2026, o BAWEMCASACOMCECILIA e o FIRSTBAW, o cupom de primeira compra da própria BAW, deram o mesmo desconto no mesmo carrinho, no aplicativo e no site. No site, com a Camiseta Regular Logo e a Camiseta Regular Pima, os dois tiraram R$ 20,80 de R$ 208,00, e o total ficou em R$ 187,20.',
    codeInstructions: [
      'Copie o código BAWEMCASACOMCECILIA no card acima.',
      'Acesse o site oficial da BAW Clothing pelo botão indicado, escolha o tamanho de cada peça e coloque no carrinho.',
      'No carrinho, digite o código no campo Cupom de desconto e confirme pela seta.',
      'Confira o aviso Cupom aplicado e a linha Cupom no resumo antes de ir para o pagamento.',
    ],
    aboutBrand:
      'A BAW Clothing é uma marca brasileira de streetwear, com o lema "We make noise, not fashion": camisetas, moletons, calças e acessórios, vendidos no site oficial. O cupom BAWEMCASACOMCECILIA é o benefício da parceria para quem acompanha o Em Casa com Cecília: 10% OFF em todo o site e no aplicativo, com qualquer forma de pagamento e também sobre as peças em promoção.',
    faqs: [
      {
        question: 'Quanto de desconto o cupom BAWEMCASACOMCECILIA dá?',
        answer:
          '10% OFF em todo o site e no aplicativo da BAW Clothing. No nosso teste, o cupom tirou R$ 14,80 de um carrinho de R$ 148,00, e o resumo mostrou o valor na linha Cupom.',
      },
      {
        question: 'O cupom BAWEMCASACOMCECILIA soma com o desconto do Pix?',
        answer:
          'Sim. O cupom vale com todas as formas de pagamento e, no Pix, a BAW ainda dá 5% de desconto. A loja aceita Pix e cartão de crédito Visa, Mastercard, Elo, American Express e Hipercard.',
      },
      {
        question: 'O cupom BAW vale na primeira compra? É melhor que o FIRSTBAW?',
        answer:
          'Vale, e o desconto é o mesmo. No nosso teste, o BAWEMCASACOMCECILIA e o FIRSTBAW, o cupom de primeira compra da própria BAW, deram o mesmo desconto no mesmo carrinho, no aplicativo e no site: no site, R$ 20,80 de um carrinho de R$ 208,00, com qualquer um dos dois. A diferença é que o BAWEMCASACOMCECILIA vale também para quem já comprou na loja.',
      },
      {
        question: 'Qual cupom BAW vale para quem já é cliente?',
        answer:
          'O BAWEMCASACOMCECILIA. Ele dá 10% no site oficial para quem compra pela primeira vez e para quem já comprou.',
      },
      {
        question: 'O BAWEMCASACOMCECILIA é cupom de influenciadora?',
        answer:
          'Sim. BAWEMCASACOMCECILIA é o cupom do Em Casa com Cecília na BAW Clothing e dá 10% OFF no site oficial para clientes novos e antigos. Veja o print do carrinho em “Como usar o cupom BAWEMCASACOMCECILIA”.',
      },
      {
        question: 'O cupom soma com produtos em promoção?',
        answer:
          'Sim. No nosso teste, uma das camisetas estava em promoção de Black Friday, de R$ 89,00 por R$ 59,00, e o cupom tirou os 10% dela também.',
      },
      {
        question: 'O cupom BAWEMCASACOMCECILIA está funcionando hoje?',
        answer:
          'Sim. No teste de carrinho mais recente, o BAWEMCASACOMCECILIA foi aceito. A data e os valores do teste estão em "Como testamos o cupom", nesta página.',
      },
      {
        question: 'Onde coloco o cupom na BAW Clothing?',
        answer:
          'No carrinho do site oficial: digite BAWEMCASACOMCECILIA no campo Cupom de desconto, ao lado do resumo, e confirme pela seta. Aparece o aviso Cupom aplicado, e o resumo passa a mostrar a linha Cupom.',
      },
      {
        question: 'O cupom BAWEMCASACOMCECILIA vale no app da BAW?',
        answer:
          'Sim. O código vale no site oficial e também no aplicativo da BAW Clothing: digite BAWEMCASACOMCECILIA no campo de cupom antes de pagar.',
      },
      {
        question: 'Tem cupom BAW Clothing na Black Friday?',
        answer:
          'Tem. O cupom BAW Clothing BAWEMCASACOMCECILIA dá 10% OFF no site oficial, em todas as formas de pagamento, e é o mesmo código do resto do ano. Na Black Friday, a BAW anuncia peças com até 80% OFF, e os 10% do código entram sobre o preço da campanha.',
      },
      {
        question: 'O cupom BAW Clothing vale na Black Friday?',
        answer:
          'Vale. No nosso teste, em novembro, os 10% entraram numa camiseta que já estava em promoção de Black Friday. Confira a linha Cupom no resumo antes de pagar.',
      },
      {
        question: 'O cupom dá frete grátis?',
        answer:
          'O cupom não dá frete grátis: o site anuncia frete grátis a partir de R$ 399, e abaixo disso o frete e o prazo saem no carrinho pelo CEP. No nosso teste, com um carrinho abaixo desse valor e um CEP da cidade de São Paulo, o frete foi de R$ 10,62, com entrega em até 4 dias úteis.',
      },
      {
        question: 'Como funciona a troca na BAW Clothing?',
        answer:
          'Pela política da loja, a troca ou a devolução é pedida em até 7 dias corridos depois do recebimento, ou em até 90 dias em caso de defeito, com a peça sem uso, com etiqueta e na embalagem original. A troca vira crédito na loja, não outra peça direto, e a primeira troca ou devolução tem o frete grátis; nas seguintes, o frete é do cliente.',
      },
      {
        question: 'O que fazer se o cupom BAWEMCASACOMCECILIA não funcionar?',
        answer:
          'Confira se o código foi digitado no campo Cupom de desconto, sem espaços, no site oficial da BAW Clothing, e se o aviso Cupom aplicado apareceu. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.',
      },
      {
        question: 'Comprar com o cupom apoia o Em Casa com Cecília?',
        answer:
          'Sim, a compra pode gerar comissão para o Em Casa com Cecília, sem custo extra para você. O desconto aparece no carrinho quando o cupom é aceito.',
      },
    ],
    monthlyHighlight: {
      scope: 'em todo o site e no app',
      note: 'Soma com os preços em promoção do site e com os 5% do Pix',
    },
    relatedContent: [
      { title: 'BAW Clothing é boa? Tecidos, medidas e cuidados', url: '/reviews/baw-clothing-e-boa', type: 'review', publishedAt: '2026-11-16' },
      { title: 'Cupom BAW na primeira compra', url: '/reviews/cupom-baw-primeira-compra', type: 'review', publishedAt: '2026-11-16' },
      { title: 'Como usar o cupom BAWEMCASACOMCECILIA', url: '/reviews/cupom-baw-como-usar', type: 'review', publishedAt: '2026-11-16' },
      { title: 'Tênis BAW é bom? Modelos, preço e numeração', url: '/reviews/tenis-baw-e-bom', type: 'review', publishedAt: '2026-11-21' },
      { title: 'Sandália Linus + BAW: cores e numeração', url: '/reviews/sandalia-linus-baw', type: 'review', publishedAt: '2026-11-21' },
      { title: 'BAW ou Pace? Preço, peças e tênis', url: '/reviews/baw-ou-pace', type: 'review', publishedAt: '2026-11-21' },
      { title: 'BAW Clothing no Reclame Aqui: nota e reclamações', url: '/reviews/baw-clothing-reclame-aqui-nota-reputacao', type: 'review', publishedAt: '2026-11-16' },
    ],
    status: 'ativo',
    featured: false,
  },
  {
    offerMode: 'discount-code',
    slug: 'lamazonie',
    cartPrint: { article: 'cupom-lamazonie-como-usar', src: '/images/reviews/lamazonie/cupom-lamazonie-checkout-com-cupom.webp', alt: "Resumo do checkout da L'Amazonie com o cupom CECILIA no campo Tem um cupom?, o aviso Desconto de menos R$ 20,40, a linha Descontos e o total de R$ 387,60", aspectRatio: 1.06 },
    brand: "L'Amazonie",
    officialUrl: 'https://www.lamazonie.com.br/',
    offerUrl: 'https://www.lamazonie.com.br/',
    brandIcon: 'LA',
    brandLogo: '/images/about/partners/lamazonie.png',
    brandLogoAlt: "Marca L'Amazonie",
    bubble: { src: '/images/logos/bolinhas/lamazonie.png', background: '#0E423A' },
    brandWatermark: '/images/logos/watermarks/lamazonie.webp',
    brandColor: '#0E423A',
    code: 'CECILIA',
    codeFieldLabel: 'Tem um cupom?',
    discount: '5% OFF',
    discountNumber: 5,
    category: 'Skincare: sérum para cílios e sobrancelhas, vitamina C, protetor solar e clareadores',
    hubCategory: 'beleza',
    shortDescription: "todo o site da L'Amazonie, com todas as formas de pagamento",
    longDescription:
      "O cupom L'Amazonie CECILIA dá 5% OFF no site oficial, para quem compra pela primeira vez e para quem já é cliente, e soma com as promoções e com os 3% do Pix: no nosso teste, os 5% entraram também num kit de protetores em promoção. Vale em todas as formas de pagamento.",
    metaTitle: "Cupom L'Amazonie: 5% OFF com CECILIA",
    metaTitleMonth: true,
    metaDescription:
      "Cupom L'Amazonie: CECILIA dá 5% OFF para cliente novo ou antigo e soma com as promoções e os 3% do Pix. Testado no checkout.",
    eligibleCategories: "Produtos do site oficial da L'Amazonie, inclusive os kits em promoção",
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Pode ser usado por clientes novos e antigos',
    shipping: 'Frete grátis acima de R$ 199 para quase todo o Brasil e acima de R$ 500 no Acre, no Piauí, em Rondônia e em Roraima, segundo a loja; abaixo disso, frete e prazo saem no checkout pelo CEP',
    combinable:
      'Soma com as promoções vigentes do site e com os 3% de desconto do Pix, e vale com todas as formas de pagamento',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Entra sobre o preço promocional: no teste, os 5% entraram num kit de protetores em promoção' },
      { benefit: 'pix', stacks: 'sim', condition: 'A loja anuncia 3% de desconto no Pix no checkout; o código e o desconto do Pix são calculados à parte, sem virar um percentual único' },
      { benefit: 'frete', stacks: 'depende', condition: 'Grátis acima de R$ 199 para quase todo o Brasil; no Acre, no Piauí, em Rondônia e em Roraima, acima de R$ 500' },
    ],
    paymentPerks: [
      'Até 6x sem juros no cartão de crédito',
      'Cashback de 15% para a próxima compra no site, com validade, que paga até 30% do pedido seguinte',
      'Garantia Mais Fios no sérum de sobrancelhas: sem fios novos em 60 dias de uso, a loja devolve o dinheiro',
    ],
    relatedContent: [
      {
        title: 'Cupom L\'Amazonie: como aplicar o CECILIA pelo botão Finalizar compra',
        url: '/reviews/cupom-lamazonie-como-usar',
        type: 'review',
        publishedAt: '2026-11-16',
      },
      {
        title: 'L’Amazonie é boa? O que conferir antes de comprar o sérum de sobrancelhas',
        url: '/reviews/lamazonie-e-boa',
        type: 'review',
        publishedAt: '2026-11-16',
      },
      {
        title: 'Black Friday L’Amazonie 2026: o que é campanha, o que é kit da tabela regular e como o cupom entra',
        url: '/reviews/black-friday-lamazonie',
        type: 'review',
        publishedAt: '2026-11-16',
      },
      {
        title: 'L’Amazonie é confiável? CNPJ, Anvisa, garantia de 60 dias e devolução',
        url: '/reviews/lamazonie-e-confiavel',
        type: 'review',
        publishedAt: '2026-11-16',
      },
      {
        title: 'L’Amazonie no Reclame Aqui: nota, reputação e o que mais gera reclamação',
        url: '/reviews/lamazonie-reclame-aqui-nota-reputacao',
        type: 'review',
        publishedAt: '2026-11-16',
      },
      {
        title: 'Cupom L’Amazonie primeira compra: CECILIA dá 5% OFF e vale nas compras seguintes',
        url: '/reviews/cupom-lamazonie-primeira-compra',
        type: 'review',
        publishedAt: '2026-11-16',
      },
    ],
    lastVerified: '2026-11-22',
    testedAt: '2026-11-22',
    testNote:
      'No checkout seguro.lamazonie.com.br, com a oferta de Black Friday do Sérum para crescimento de Cílios e Sobrancelhas com protetor de brinde, de R$ 159,00, o CECILIA tirou R$ 7,95 e o total caiu para R$ 151,05, 5% do pedido. No teste anterior, os 5% também entraram sobre o Kit 2 Protetores Solares de Tratamento FPS 99 em promoção, de R$ 278,00 por R$ 249,00.',
    codeInstructions: [
      'Copie o código CECILIA no card acima.',
      "Acesse o site oficial da L'Amazonie pelo botão indicado, coloque os produtos no carrinho e clique em Finalizar compra.",
      'No checkout da própria loja, em seguro.lamazonie.com.br, digite o código no campo Tem um cupom?, no resumo, e clique em Adicionar.',
      'Confira o aviso Desconto em verde e a linha Descontos no resumo antes de pagar.',
    ],
    aboutBrand:
      "A L'Amazonie Skincare é uma marca brasileira de dermocosméticos veganos e cruelty free, com ativos da Amazônia: sérum para crescimento de cílios e sobrancelhas, sérum de vitamina C, protetor solar e cremes clareadores, vendidos no site oficial. O cupom CECILIA é o benefício da parceria para quem acompanha o Em Casa com Cecília: 5% OFF, com qualquer forma de pagamento e também sobre os kits em promoção.",
    faqs: [
      {
        question: "Quanto de desconto o cupom CECILIA dá na L'Amazonie?",
        answer:
          '5% OFF nos produtos do site oficial. No nosso teste, o cupom tirou R$ 20,40 de um carrinho de R$ 408,00, e o resumo do checkout mostrou o valor na linha Descontos.',
      },
      {
        question: "O cupom CECILIA soma com o desconto do Pix na L'Amazonie?",
        answer:
          "Sim. O cupom vale com todas as formas de pagamento e, no Pix, a L'Amazonie anuncia 3% de desconto no checkout. Os dois descontos são calculados à parte, sem virar um percentual único. No cartão de crédito, a loja parcela em até 6x sem juros e aceita Visa, Mastercard, Elo, American Express, Diners, Discover e Hipercard.",
      },
      {
        question: "O cupom L'Amazonie vale na primeira compra?",
        answer: 'Sim. O CECILIA vale na primeira compra e também para quem já comprou na loja.',
      },
      {
        question: "Qual cupom L'Amazonie vale para quem já é cliente?",
        answer: 'O CECILIA. Ele dá 5% no site oficial para quem compra pela primeira vez e para quem já comprou.',
      },
      {
        question: "O CECILIA é cupom de influenciadora da L'Amazonie?",
        answer:
          "Sim. CECILIA é o cupom do Em Casa com Cecília na L'Amazonie e dá 5% OFF no site oficial para clientes novos e antigos. Veja o print do checkout em “Como usar o cupom CECILIA”.",
      },
      {
        question: 'O cupom soma com produtos em promoção?',
        answer:
          'Sim. No nosso teste, o Kit 2 Protetores Solares de Tratamento FPS 99 estava em promoção, de R$ 278,00 por R$ 249,00, e o cupom tirou os 5% dele também.',
      },
      {
        question: 'O cupom CECILIA está funcionando hoje?',
        answer:
          'Sim. No teste de carrinho mais recente, o CECILIA foi aceito. A data e os valores do teste estão em "Como testamos o cupom", nesta página.',
      },
      {
        question: "Onde coloco o cupom na L'Amazonie?",
        answer:
          'No checkout do site oficial, que abre pelo botão Finalizar compra do carrinho: digite CECILIA no campo Tem um cupom?, no resumo, e clique em Adicionar. Aparece o aviso Desconto em verde, e o resumo passa a mostrar a linha Descontos.',
      },
      {
        question: "Tem cupom L'Amazonie na Black Friday?",
        answer:
          "Tem. O cupom L'Amazonie CECILIA dá 5% OFF no site oficial, em todas as formas de pagamento, e é o mesmo código do resto do ano.",
      },
      {
        question: "O cupom L'Amazonie vale na Black Friday?",
        answer:
          'Vale. No nosso teste, em novembro, os 5% entraram num kit que já estava em promoção. Confira a linha Descontos no resumo antes de pagar.',
      },
      {
        question: 'O cupom dá frete grátis?',
        answer:
          'O cupom não mexe no frete, mas a loja dá frete grátis acima de R$ 199 para quase todo o Brasil, e acima de R$ 500 no Acre, no Piauí, em Rondônia e em Roraima. Abaixo disso, o frete e o prazo aparecem no checkout depois do CEP. A loja envia pelos Correios, com PAC e SEDEX, e pela Total Express.',
      },
      {
        question: "Como funciona a troca na L'Amazonie?",
        answer:
          'Pela política da loja, a devolução é pedida pelo e-mail sac@lamazonie.com.br em até 7 dias depois do recebimento, com a caixa lacrada e o produto sem uso. A loja agenda a coleta no endereço da entrega, e o frete da devolução fica por conta do cliente.',
      },
      {
        question: 'O que fazer se o cupom CECILIA não funcionar?',
        answer:
          "Confira se a barra de endereço mostra seguro.lamazonie.com.br, o checkout da própria loja, que abre pelo botão Finalizar compra do carrinho: o código só vale lá. Depois, veja se ele foi digitado no campo Tem um cupom?, sem espaços, e se o aviso Desconto apareceu em verde. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.",
      },
      {
        question: 'Comprar com o cupom apoia o Em Casa com Cecília?',
        answer:
          'Sim, a compra pode gerar comissão para o Em Casa com Cecília, sem custo extra para você. O desconto aparece no checkout quando o cupom é aceito.',
      },
    ],
    monthlyHighlight: {
      scope: 'no site oficial',
      note: 'Soma com os preços em promoção do site e com os 3% do Pix',
    },
    status: 'ativo',
    featured: false,
  },
  {
    offerMode: 'discount-code',
    slug: 'rituaria',
    cartPrint: { article: 'cupom-rituaria-como-usar', src: '/images/reviews/rituaria/cupom-rituaria-checkout-com-cupom.webp', alt: 'Resumo do checkout da Rituária com o cupom EMCASA no campo Tem um cupom?, o aviso Desconto (- R$ 11,98), a linha Descontos e o total de R$ 107,82', aspectRatio: 0.894 },
    brand: 'Rituária',
    officialUrl: 'https://www.rituaria.com.br/',
    // A parceria não tem link próprio (Bruno, 17/11/2026): o botão leva ao site oficial.
    offerUrl: 'https://www.rituaria.com.br/',
    brandIcon: 'R',
    brandLogo: '/images/about/partners/rituaria.png',
    brandLogoAlt: 'Marca Rituária',
    bubble: { src: '/images/logos/bolinhas/rituaria.png', background: '#8E7396' },
    brandWatermark: '/images/logos/watermarks/rituaria.webp',
    brandColor: '#8E7396',
    code: 'EMCASA',
    codeFieldLabel: 'Tem um cupom?',
    discount: '10% OFF',
    discountNumber: 10,
    category: 'Suplementos, superfoods e skincare: magnésio, complexo B, colágeno, prebióticos e maca peruana',
    hubCategory: 'saude',
    hubCard: 'reduzido',
    shortDescription: 'todo o site da Rituária, inclusive os produtos em promoção',
    longDescription:
      'O cupom Rituária EMCASA dá 10% OFF no site oficial, para quem compra pela primeira vez e para quem já é cliente, e soma com os preços em promoção: no nosso teste, os 10% entraram também em fórmulas que já estavam com desconto. Vale em todas as formas de pagamento.',
    metaTitle: 'Cupom Rituária: 10% OFF com EMCASA',
    metaTitleMonth: true,
    metaDescription:
      'Cupom Rituária: EMCASA dá 10% OFF em suplementos e skincare, para cliente novo ou antigo, e soma com as promoções do site. Testado no checkout.',
    eligibleCategories: 'Produtos do site oficial da Rituária, inclusive os que estão em promoção',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Pode ser usado por clientes novos e antigos',
    shipping:
      'Frete grátis acima de R$ 199 em SP, ES, RJ e MG, de R$ 229 no Sul e no Centro-Oeste, de R$ 279 no Nordeste e de R$ 349 no Norte, segundo a central de ajuda da loja; abaixo disso, frete e prazo saem no checkout pelo CEP',
    combinable:
      'Soma com as promoções vigentes do site e vale com todas as formas de pagamento; pelos termos da loja, não junta com o cashback',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Entra sobre o preço promocional e sobre o Leve 3, Pague 2: no teste, os 10% entraram depois da promoção, até com 3 unidades iguais' },
      { benefit: 'pix', stacks: 'sim', condition: 'No Pix, a loja dá 5% de desconto, que soma com o código' },
      { benefit: 'cashback', stacks: 'nao', condition: 'O cashback de 10% chega como cupom para a compra seguinte, e os termos da loja dizem que desconto e cashback não são cumulativos: um benefício por compra' },
      { benefit: 'frete', stacks: 'depende', condition: 'Grátis acima de R$ 199 no Sudeste, de R$ 229 no Sul e no Centro-Oeste, de R$ 279 no Nordeste e de R$ 349 no Norte' },
    ],
    paymentPerks: ['Até 3x sem juros no cartão de crédito'],
    relatedContent: [
      {
        title: 'Como usar o cupom EMCASA na Rituária: onde aplicar e com o que acumula',
        url: '/reviews/cupom-rituaria-como-usar',
        type: 'review',
        publishedAt: '2026-11-18',
      },
      {
        title: 'Rituária é boa? Composição, preço por porção e o que conferir',
        url: '/reviews/rituaria-e-boa',
        type: 'review',
        publishedAt: '2026-11-18',
      },
      {
        title: 'Black Friday Rituária 2026: como funciona o Leve 3, Pague 2 e como o cupom entra',
        url: '/reviews/black-friday-rituaria',
        type: 'review',
        publishedAt: '2026-11-18',
      },
      {
        title: 'Rituária Brain+: para que serve, o que vem no frasco e quanto custa',
        url: '/reviews/rituaria-brain-para-que-serve',
        type: 'review',
        publishedAt: '2026-11-21',
      },
      {
        title: 'Cupom Rituária primeira compra: EMCASA dá 10% OFF e vale nas compras seguintes',
        url: '/reviews/cupom-rituaria-primeira-compra',
        type: 'review',
        publishedAt: '2026-11-18',
      },
      {
        title: 'Rituária é confiável? CNPJ, Anvisa, pagamento e trocas',
        url: '/reviews/rituaria-e-confiavel',
        type: 'review',
        publishedAt: '2026-11-18',
      },
      {
        title: 'Rituária no Reclame Aqui: nota, reputação e o que mais gera reclamação',
        url: '/reviews/rituaria-reclame-aqui-nota-reputacao',
        type: 'review',
        publishedAt: '2026-11-18',
      },
    ],
    lastVerified: '2026-11-22',
    testedAt: '2026-11-22',
    testNote:
      'Num carrinho com 3 unidades da Fórmula Brain+ 30 dias, de R$ 69,90 cada, o Leve 3, Pague 2 tirou R$ 69,90 dos R$ 209,70, e o EMCASA tirou mais R$ 13,98 dos R$ 139,80: o total caiu para R$ 125,82, e os 10% entraram depois da promoção, mesmo com os 3 produtos iguais. Num teste anterior, com a Capilar Nutri - 30 dias pelo preço cheio de R$ 49,90 e a Fórmula Mov Nutri - 30 dias em promoção, de R$ 149,00 por R$ 69,90, o código tirou R$ 11,98 dos R$ 119,80 e o total caiu para R$ 107,82.',
    codeInstructions: [
      'Copie o código EMCASA no card acima.',
      'Acesse o site oficial da Rituária pelo botão indicado, coloque os produtos no carrinho e siga para o checkout.',
      'No checkout da própria loja, em seguro.rituaria.com.br, digite o código no campo Tem um cupom?, no resumo, e clique em Adicionar.',
      'Confira o aviso Desconto em verde e a linha Descontos no resumo antes de pagar.',
    ],
    aboutBrand:
      'A Rituária é uma marca brasileira de suplementos, superfoods e dermocosméticos, criada em 2021, com a proposta de cuidado de dentro para fora: fórmulas de magnésio, complexo B, colágeno e prebióticos, maca peruana e produtos de skincare, vendidos no site oficial. O cupom EMCASA é o benefício da parceria para quem acompanha o Em Casa com Cecília: 10% OFF, com qualquer forma de pagamento e também sobre os produtos em promoção.',
    faqs: [
      {
        question: 'Quanto de desconto o cupom EMCASA dá na Rituária?',
        answer:
          '10% OFF nos produtos do site oficial. No nosso teste, o cupom tirou R$ 11,98 de um carrinho de R$ 119,80, e o resumo do checkout mostrou o valor na linha Descontos.',
      },
      {
        question: 'Existe cupom Rituária de 20%?',
        answer:
          'Sites de cupom anunciam códigos com percentuais maiores, que nós não testamos. O cupom da Cecília é o EMCASA: 10% OFF, aceito no checkout no nosso teste mais recente, inclusive sobre os produtos em promoção.',
      },
      {
        question: 'O cupom EMCASA soma com o desconto do Pix na Rituária?',
        answer:
          'Sim. O cupom vale com todas as formas de pagamento e, no Pix, a Rituária mostra no checkout um desconto de 5%. No cartão de crédito, a loja parcela em até 3x sem juros.',
      },
      {
        question: 'O cupom Rituária vale na primeira compra?',
        answer: 'Sim. O EMCASA vale na primeira compra e também para quem já comprou na loja.',
      },
      {
        question: 'Qual cupom Rituária vale para quem já é cliente?',
        answer: 'O EMCASA. Ele dá 10% no site oficial para quem compra pela primeira vez e para quem já comprou.',
      },
      {
        question: 'O EMCASA é cupom de influenciadora da Rituária?',
        answer:
          'Sim. EMCASA é o cupom do Em Casa com Cecília na Rituária e dá 10% OFF no site oficial para clientes novos e antigos.',
      },
      {
        question: 'O cupom soma com produtos em promoção?',
        answer:
          'Sim. No nosso teste, a Fórmula 4Mag (Magnésio) - 30 dias estava em promoção, de R$ 99,90 por R$ 59,90, e o cupom tirou os 10% dela também.',
      },
      {
        question: 'O cupom EMCASA soma com o cashback da Rituária?',
        answer:
          'Não. O cashback de 10% da Rituária chega como cupom para a compra seguinte, e os termos da loja dizem que descontos e cashback não são cumulativos: vale um benefício por compra.',
      },
      {
        question: 'O cupom EMCASA está funcionando hoje?',
        answer:
          'Sim. No teste de carrinho mais recente, o EMCASA foi aceito. A data e os valores do teste estão em "Como testamos o cupom", nesta página.',
      },
      {
        question: 'Onde coloco o cupom na Rituária?',
        answer:
          'No checkout do site oficial, em seguro.rituaria.com.br, que abre quando você segue do carrinho: digite EMCASA no campo Tem um cupom?, no resumo, e clique em Adicionar. Aparece o aviso Desconto em verde, e o resumo passa a mostrar a linha Descontos.',
      },
      {
        question: 'Tem cupom Rituária na Black Friday?',
        answer:
          'Tem. O cupom Rituária EMCASA dá 10% OFF no site oficial, em todas as formas de pagamento, e é o mesmo código do resto do ano.',
      },
      {
        question: 'O cupom Rituária vale na Black Friday?',
        answer:
          'Vale. No nosso teste, em novembro, os 10% entraram em fórmulas que já estavam em promoção. Confira a linha Descontos no resumo antes de pagar.',
      },
      {
        question: 'O cupom dá frete grátis?',
        answer:
          'O cupom não mexe no frete, mas a loja dá frete grátis acima de R$ 199 em SP, ES, RJ e MG, de R$ 229 no Sul e no Centro-Oeste, de R$ 279 no Nordeste e de R$ 349 no Norte. Abaixo disso, o frete é calculado pelo peso e pelo volume e aparece no checkout depois do CEP. A loja envia pelos Correios, com PAC e SEDEX.',
      },
      {
        question: 'Como funciona a troca na Rituária?',
        answer:
          'Pela central de ajuda da loja, a desistência pode ser pedida em até 7 dias corridos depois do recebimento, com o produto completo e sem uso, e a devolução é gratuita, com reembolso integral, frete incluído. Produto com defeito, avaria ou errado pode ser informado em até 30 dias. A loja não troca por insatisfação depois do uso. O pedido é aberto no portal de trocas da Rituária.',
      },
      {
        question: 'O que fazer se o cupom EMCASA não funcionar?',
        answer:
          'Confira se o código foi digitado no campo Tem um cupom?, no resumo do checkout, sem espaços, e se o aviso Desconto apareceu em verde. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.',
      },
      {
        question: 'Comprar com o cupom apoia o Em Casa com Cecília?',
        answer:
          'Sim, a compra pode gerar comissão para o Em Casa com Cecília, sem custo extra para você. O desconto aparece no checkout quando o cupom é aceito.',
      },
    ],
    monthlyHighlight: {
      scope: 'no site oficial',
      note: 'Soma com os preços em promoção do site e com os 5% do Pix',
    },
    status: 'ativo',
    featured: false,
  },
  {
    offerMode: 'discount-code',
    slug: 'adaptogen',
    brand: 'Adaptogen',
    officialUrl: 'https://www.adaptogen.com.br/',
    // Link de afiliado da parceria (Bruno, 18/11/2026): o parâmetro parceiro marca a compra; não aplica o cupom.
    offerUrl: 'https://www.adaptogen.com.br/?parceiro=CECILIA',
    brandIcon: 'A',
    brandLogo: '/images/about/partners/adaptogen.png',
    brandLogoAlt: 'Marca Adaptogen Science',
    bubble: { src: '/images/logos/bolinhas/adaptogen.png', background: '#000000' },
    brandWatermark: '/images/logos/watermarks/adaptogen.webp',
    brandColor: '#FFE412',
    cartPrint: {
      article: 'cupom-adaptogen-como-usar',
      src: '/images/reviews/adaptogen/cupom-adaptogen-checkout-cecilia-creatina-flavor.webp',
      alt: 'Resumo do checkout da Adaptogen com a Creatina Flavor 300 g, o código CECILIA no campo Cupom de desconto, o aviso Cupom aplicado, a linha Cupom de menos R$ 9,78 e o total de R$ 87,97',
      aspectRatio: 1.927,
    },
    code: 'CECILIA',
    codeFieldLabel: 'Cupom de desconto',
    discount: '10% OFF',
    discountNumber: 10,
    category: 'Suplementos esportivos: whey protein, creatina, pré-treino, vitaminas, snacks proteicos e roupas de treino',
    hubCategory: 'saude',
    hubCard: 'reduzido',
    shortDescription: 'todo o site da Adaptogen, inclusive os produtos em promoção',
    longDescription:
      'O cupom Adaptogen CECILIA dá 10% OFF no site oficial, para quem compra pela primeira vez e para quem já é cliente, e soma com os preços em promoção: no nosso teste, os 10% entraram em cima dos preços da Black Friday da loja. Vale em todas as formas de pagamento.',
    metaTitle: 'Cupom Adaptogen: 10% OFF com CECILIA',
    metaTitleMonth: true,
    metaDescription:
      'Cupom Adaptogen: CECILIA dá 10% OFF em whey, creatina e pré-treino, para cliente novo ou antigo, e soma com as promoções do site. Testado no checkout.',
    eligibleCategories: 'Produtos do site oficial da Adaptogen, inclusive os que estão em promoção',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Pode ser usado por clientes novos e antigos',
    shipping:
      'Frete grátis acima de R$ 199 no Sudeste, de R$ 249 no Sul e no Centro-Oeste, de R$ 399 no Nordeste e de R$ 599 no Norte, segundo a política de entrega da loja; abaixo disso, frete e prazo saem no checkout pelo CEP',
    combinable: 'Soma com as promoções vigentes do site e vale com todas as formas de pagamento',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Entra sobre o preço promocional: no teste, os 10% entraram na creatina e no whey com os preços da Black Friday' },
      { benefit: 'pix', stacks: 'sim', condition: 'No Pix e no boleto, a loja dá 5% de desconto, que soma com o código' },
      { benefit: 'frete', stacks: 'depende', condition: 'Grátis acima de R$ 199 no Sudeste, de R$ 249 no Sul e no Centro-Oeste, de R$ 399 no Nordeste e de R$ 599 no Norte' },
    ],
    paymentPerks: ['Até 6x sem juros no cartão de crédito, com parcela mínima de R$ 50', 'Pix parcelado em até 4x sem juros'],
    relatedContent: [
      {
        title: 'Cupom Adaptogen: como aplicar o CECILIA no checkout e com o que ele soma',
        url: '/reviews/cupom-adaptogen-como-usar',
        type: 'review',
        publishedAt: '2026-11-18',
      },
      {
        title: 'Adaptogen é boa? O que dá para conferir nos wheys e na creatina antes de comprar',
        url: '/reviews/adaptogen-e-boa',
        type: 'review',
        publishedAt: '2026-11-18',
      },
      {
        title: 'Black Friday Adaptogen 2026: o que está na campanha e como o cupom CECILIA entra',
        url: '/reviews/black-friday-adaptogen',
        type: 'review',
        publishedAt: '2026-11-18',
      },
      {
        title: 'Tasty Iso da Adaptogen vale a pena? Rótulo e custo por 100 g de proteína',
        url: '/reviews/tasty-iso-adaptogen-vale-a-pena',
        type: 'review',
        publishedAt: '2026-11-21',
      },
      {
        title: 'Adaptogen ou Growth: preço dos wheys, lactose e outras proteínas',
        url: '/reviews/adaptogen-ou-growth',
        type: 'review',
        publishedAt: '2026-11-18',
      },
      {
        title: 'Adaptogen ou Dux: whey comparado por dose, proteína e preço',
        url: '/reviews/adaptogen-ou-dux',
        type: 'review',
        publishedAt: '2026-11-18',
      },
      {
        title: 'Cupom Adaptogen primeira compra: CECILIA dá 10% OFF e vale nas compras seguintes',
        url: '/reviews/cupom-adaptogen-primeira-compra',
        type: 'review',
        publishedAt: '2026-11-18',
      },
    ],
    lastVerified: '2026-11-22',
    testedAt: '2026-11-22',
    testNote:
      'Num carrinho com a Creatina Flavor 300 g na Black Friday, de R$ 115,00 por R$ 97,75, o CECILIA tirou R$ 9,78 e o total caiu para R$ 87,97: os 10% entraram por cima do preço promocional. Num teste anterior, com o HIT Protein Bag 900 g, de R$ 173,15 por R$ 147,18, no mesmo carrinho da creatina, os R$ 244,93 ganharam R$ 24,49 de desconto, e o total ficou em R$ 220,44. Os três wheys de 900 g também passaram pelo carrinho com o código: Tasty Iso por R$ 352,59, Tasty Whey 3W por R$ 243,20 e Gold Whey por R$ 201,12.',
    codeInstructions: [
      'Copie o código CECILIA no card acima.',
      'Acesse o site oficial da Adaptogen pelo botão indicado, coloque os produtos na sacola e clique em Finalizar Compra.',
      'No resumo do checkout, digite o código no campo Cupom de desconto e clique em Aplicar.',
      'Confira o aviso Cupom aplicado, em verde, e a linha Cupom no resumo antes de seguir para o pagamento.',
    ],
    aboutBrand:
      'A Adaptogen Science é uma marca de suplementos esportivos criada em 2014 nos Estados Unidos, na Flórida, e vendida no Brasil pelo site oficial: whey protein como a Tasty Whey e o HIT Protein, creatina, pré-treinos como o Panic e o Muscle Bunny, vitaminas, snacks proteicos e roupas de treino. O cupom CECILIA é o benefício da parceria para quem acompanha o Em Casa com Cecília: 10% OFF, com qualquer forma de pagamento e também sobre os produtos em promoção.',
    faqs: [
      {
        question: 'Quanto de desconto o cupom CECILIA dá na Adaptogen?',
        answer:
          '10% OFF nos produtos do site oficial. No nosso teste, o cupom tirou R$ 24,49 de um carrinho de R$ 244,93, e o resumo do checkout mostrou o valor na linha Cupom.',
      },
      {
        question: 'Existe cupom Adaptogen de 20%?',
        answer:
          'Sites de cupom anunciam códigos com percentuais maiores, que nós não testamos. O cupom da Cecília é o CECILIA: 10% OFF, aceito no checkout no nosso teste mais recente, inclusive sobre os produtos em promoção.',
      },
      {
        question: 'O cupom CECILIA soma com o desconto do Pix na Adaptogen?',
        answer:
          'Sim. O cupom vale com todas as formas de pagamento, e no Pix e no boleto a Adaptogen dá 5% de desconto. No cartão de crédito, a loja parcela em até 6x sem juros, com parcela mínima de R$ 50.',
      },
      {
        question: 'O cupom Adaptogen vale na primeira compra?',
        answer: 'Sim. O CECILIA vale na primeira compra e também para quem já comprou na loja.',
      },
      {
        question: 'Qual cupom Adaptogen vale para quem já é cliente?',
        answer: 'O CECILIA. Ele dá 10% no site oficial para quem compra pela primeira vez e para quem já comprou.',
      },
      {
        question: 'O CECILIA é cupom de influenciadora da Adaptogen?',
        answer:
          'Sim. CECILIA é o cupom do Em Casa com Cecília na Adaptogen e dá 10% OFF no site oficial para clientes novos e antigos.',
      },
      {
        question: 'O cupom soma com produtos em promoção?',
        answer:
          'Sim. No nosso teste, a Creatina Flavor 300 g estava em promoção, de R$ 115,00 por R$ 97,75, e o cupom tirou os 10% dela também.',
      },
      {
        question: 'O cupom CECILIA está funcionando hoje?',
        answer:
          'Sim. No teste de carrinho mais recente, o CECILIA foi aceito. A data e os valores do teste estão em "Como testamos o cupom", nesta página.',
      },
      {
        question: 'Onde coloco o cupom na Adaptogen?',
        answer:
          'No checkout do site oficial, que abre quando você clica em Finalizar Compra na sacola: digite CECILIA no campo Cupom de desconto e clique em Aplicar. Aparece o aviso Cupom aplicado, em verde, e o resumo passa a mostrar a linha Cupom.',
      },
      {
        question: 'Tem cupom Adaptogen na Black Friday?',
        answer:
          'Tem. O cupom Adaptogen CECILIA dá 10% OFF no site oficial, em todas as formas de pagamento, e é o mesmo código do resto do ano.',
      },
      {
        question: 'O cupom Adaptogen vale na Black Friday?',
        answer:
          'Vale. No nosso teste, em novembro, os 10% entraram em cima dos preços da Black Friday da loja. Confira a linha Cupom no resumo antes de pagar.',
      },
      {
        question: 'O cupom dá frete grátis?',
        answer:
          'O cupom não mexe no frete, mas a loja dá frete grátis acima de R$ 199 no Sudeste, de R$ 249 no Sul e no Centro-Oeste, de R$ 399 no Nordeste e de R$ 599 no Norte. Abaixo disso, o valor e o prazo aparecem no checkout depois do CEP.',
      },
      {
        question: 'Como funciona a troca na Adaptogen?',
        answer:
          'Pela política da loja, a desistência pode ser pedida ao atendimento em até 7 dias corridos depois do recebimento, com o produto lacrado e sem uso, na embalagem original e com a nota fiscal. Produto com defeito pode ser informado em até 30 dias. Se a caixa chegar avariada ou violada, a loja pede para recusar a entrega e avisar o atendimento.',
      },
      {
        question: 'O que fazer se o cupom CECILIA não funcionar?',
        answer:
          'Confira se o código foi digitado no campo Cupom de desconto do checkout, sem espaços, e se apareceu o aviso Cupom aplicado. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.',
      },
      {
        question: 'Comprar com o cupom apoia o Em Casa com Cecília?',
        answer:
          'Sim, a compra pode gerar comissão para o Em Casa com Cecília, sem custo extra para você. O desconto aparece no checkout quando o cupom é aceito.',
      },
    ],
    monthlyHighlight: {
      scope: 'no site oficial',
      note: 'Soma com os preços em promoção do site e com os 5% do Pix',
    },
    status: 'ativo',
    featured: false,
  },
  {
    offerMode: 'discount-code',
    slug: 'barbours',
    brand: "Barbour's Beauty",
    officialUrl: 'https://www.thebarboursbeauty.com.br/',
    // Link de afiliado da parceria, pela GoGroup (Bruno, 18/11/2026). Nunca abrir o link para conferir.
    offerUrl: 'https://barbours.gogroup.com.br/emcasacomcecilia',
    brandIcon: 'B',
    brandLogo: '/images/about/partners/barbours.png',
    brandLogoAlt: "Marca Barbour's Beauty",
    bubble: { src: '/images/logos/bolinhas/barbours.png', background: '#CD2D2F' },
    brandWatermark: '/images/logos/watermarks/barbours.webp',
    brandColor: '#CD2D2F',
    cartPrint: {
      article: 'cupom-barbours-como-usar',
      src: '/images/reviews/barbours/cupom-barbours-checkout-com-cupom.webp',
      alt: "Resumo da compra no checkout da Barbour's Beauty com o código CECILIALINHARES no campo Cupom (opcional), a linha Descontos com R$ 21,98 a menos e o total de R$ 197,82",
      aspectRatio: 0.79,
    },
    code: 'CECILIALINHARES',
    codeFieldLabel: 'Cupom (opcional)',
    discount: '10% OFF',
    discountNumber: 10,
    category: 'Fragrâncias para o corpo: body splash, perfume para cabelo, hidratantes, óleo de banho e a linha masculina Homme',
    hubCategory: 'beleza',
    shortDescription: "todo o site da Barbour's Beauty, inclusive os kits em promoção",
    longDescription:
      "O cupom Barbour's Beauty CECILIALINHARES dá 10% OFF no site oficial, para quem compra pela primeira vez e para quem já é cliente, e soma com os preços em promoção: no nosso teste, os 10% entraram num kit em promoção e num produto pelo preço cheio. Vale em todas as formas de pagamento.",
    metaTitle: "Cupom Barbour's: 10% OFF com CECILIALINHARES",
    metaTitleMonth: true,
    metaDescription:
      "Cupom Barbour's: CECILIALINHARES dá 10% OFF em body splash e perfume capilar, para cliente novo ou antigo, e soma com as promoções. Testado no checkout.",
    eligibleCategories: "Produtos do site oficial da Barbour's Beauty, inclusive os kits em promoção",
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Pode ser usado por clientes novos e antigos',
    shipping:
      'Frete grátis acima de R$ 119 em São Paulo, de R$ 149 no Espírito Santo, no Rio de Janeiro e em Minas Gerais, de R$ 169 no Sul e no Centro-Oeste, de R$ 199 no Nordeste e de R$ 259 no Norte, segundo a central de ajuda da loja; abaixo disso, frete e prazo saem no checkout pelo CEP',
    combinable: 'Soma com as promoções vigentes do site e vale com todas as formas de pagamento',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Entra sobre o preço promocional: no teste, os 10% entraram num kit de R$ 209,70 por R$ 109,90' },
      { benefit: 'pix', stacks: 'sim', condition: 'O cupom vale no Pix; não vimos desconto extra para o Pix nas páginas de produto nem no começo do checkout' },
      { benefit: 'frete', stacks: 'depende', condition: 'Grátis acima de R$ 119 em SP, R$ 149 no ES, RJ e MG, R$ 169 no Sul e no Centro-Oeste, R$ 199 no Nordeste e R$ 259 no Norte; o carrinho conta o valor antes do cupom' },
    ],
    paymentPerks: ['Até 4x sem juros no cartão de crédito, conforme o valor da compra', 'Pix e cartões Visa, Mastercard, Elo, American Express, Hipercard, Diners, Discover e Aura'],
    lastVerified: '2026-11-21',
    testedAt: '2026-11-21',
    testNote:
      'Num carrinho com o Kit Clássicos Masculinos (Bold Homme, Seduction Homme e Ocean Homme) em promoção, de R$ 209,70 por R$ 109,90, e a Necessaire + Perfume + Body My Sweet Delight pelo preço cheio de R$ 109,90, o CECILIALINHARES tirou R$ 21,98 dos R$ 219,80, e o total caiu para R$ 197,82: os 10% entraram nos dois produtos. Sozinho, o kit em promoção ganhou R$ 10,99 de desconto e saiu por R$ 98,91, resultado que se repetiu no reteste de 21/11, com a Black Week da loja no ar.',
    codeInstructions: [
      'Copie o código CECILIALINHARES no card acima.',
      "Acesse o site oficial da Barbour's Beauty pelo botão indicado, coloque os produtos no carrinho e clique em Finalizar a compra.",
      'No checkout da própria loja, em seguro.thebarboursbeauty.com.br, clique em Inserir cupom de desconto, no resumo da compra, digite o código no campo Cupom (opcional) e clique em Adicionar.',
      'Confira a linha Descontos e o total no resumo antes de pagar.',
    ],
    aboutBrand:
      "A Barbour's Beauty é uma marca brasileira de fragrâncias para o corpo: body splash, perfume para cabelo, geleias e cremes hidratantes, óleo de banho, iluminador corporal e a linha masculina Homme, vendidos em unidades e em kits no site oficial. O cupom CECILIALINHARES é o benefício da parceria para quem acompanha o Em Casa com Cecília: 10% OFF, com qualquer forma de pagamento e também sobre os kits em promoção.",
    faqs: [
      {
        question: "Quanto de desconto o cupom CECILIALINHARES dá na Barbour's?",
        answer:
          '10% OFF nos produtos do site oficial. No nosso teste, o cupom tirou R$ 21,98 de um carrinho de R$ 219,80, e o resumo da compra mostrou o valor na linha Descontos.',
      },
      {
        question: "Existe cupom Barbour's de 20%?",
        answer:
          'Sites de cupom anunciam códigos com percentuais maiores, que nós não testamos. O cupom da Cecília é o CECILIALINHARES: 10% OFF, aceito no checkout no nosso teste mais recente, inclusive sobre os kits em promoção.',
      },
      {
        question: "O cupom CECILIALINHARES vale no Pix na Barbour's?",
        answer:
          'Vale. O cupom vale com todas as formas de pagamento: a loja aceita Pix e cartão de crédito, com parcelamento em até 4x sem juros conforme o valor da compra. Nas páginas de produto e no começo do checkout, não vimos desconto extra para o Pix.',
      },
      {
        question: "O cupom Barbour's vale na primeira compra?",
        answer: 'Sim. O CECILIALINHARES vale na primeira compra e também para quem já comprou na loja.',
      },
      {
        question: "Qual cupom Barbour's vale para quem já é cliente?",
        answer: 'O CECILIALINHARES. Ele dá 10% no site oficial para quem compra pela primeira vez e para quem já comprou.',
      },
      {
        question: "O CECILIALINHARES é cupom de influenciadora da Barbour's?",
        answer:
          "Sim. CECILIALINHARES é o cupom do Em Casa com Cecília na Barbour's Beauty e dá 10% OFF no site oficial para clientes novos e antigos.",
      },
      {
        question: 'O cupom soma com produtos em promoção?',
        answer:
          'Sim. No nosso teste, o Kit Clássicos Masculinos estava em promoção, de R$ 209,70 por R$ 109,90, e o cupom tirou os 10% dele também: o kit saiu por R$ 98,91.',
      },
      {
        question: 'O cupom CECILIALINHARES está funcionando hoje?',
        answer:
          'Sim. No teste de carrinho mais recente, o CECILIALINHARES foi aceito. A data e os valores do teste estão em "Como testamos o cupom", nesta página.',
      },
      {
        question: "Onde coloco o cupom na Barbour's?",
        answer:
          'No checkout da própria loja, que abre quando você clica em Finalizar a compra no carrinho: no resumo da compra, clique em Inserir cupom de desconto, digite CECILIALINHARES no campo Cupom (opcional) e clique em Adicionar. O resumo passa a mostrar a linha Descontos.',
      },
      {
        question: "Tem cupom Barbour's na Black Friday?",
        answer:
          "Tem. O cupom Barbour's CECILIALINHARES dá 10% OFF no site oficial, em todas as formas de pagamento, e é o mesmo código do resto do ano.",
      },
      {
        question: "O cupom Barbour's vale na Black Friday?",
        answer:
          'Vale. No nosso teste, em novembro, os 10% entraram também num kit em promoção. Confira a linha Descontos no resumo antes de pagar.',
      },
      {
        question: 'O cupom dá frete grátis?',
        answer:
          'O cupom não mexe no frete, mas a loja dá frete grátis acima de R$ 119 em São Paulo, de R$ 149 no Espírito Santo, no Rio de Janeiro e em Minas Gerais, de R$ 169 no Sul e no Centro-Oeste, de R$ 199 no Nordeste e de R$ 259 no Norte. A barra do carrinho conta o valor dos produtos antes do cupom; abaixo do mínimo, o valor e o prazo aparecem no checkout depois do CEP.',
      },
      {
        question: "Como funciona a troca na Barbour's?",
        answer:
          'Pela política da loja, a desistência por arrependimento pode ser pedida em até 7 dias depois do recebimento. Depois que o pedido sai para entrega, ele não pode mais ser cancelado: dá para recusar o recebimento, e o valor é devolvido quando o pacote volta para a loja. As trocas e devoluções são pedidas pelo portal de trocas indicado no rodapé do site.',
      },
      {
        question: 'O que fazer se o cupom CECILIALINHARES não funcionar?',
        answer:
          'Confira se o código foi digitado no campo Cupom (opcional) do checkout que abre pelo botão Finalizar a compra do carrinho, sem espaços, e se apareceu a linha Descontos. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.',
      },
      {
        question: 'Comprar com o cupom apoia o Em Casa com Cecília?',
        answer:
          'Sim, a compra pode gerar comissão para o Em Casa com Cecília, sem custo extra para você. O desconto aparece no checkout quando o cupom é aceito.',
      },
    ],
    relatedContent: [
      {
        title: "Body splash Barbour's: a inspiração de cada fragrância",
        url: '/reviews/barbours-body-splash-inspiracoes',
        type: 'review',
        publishedAt: '2026-11-21',
      },
      {
        title: "Cupom Barbour's Beauty: como aplicar o CECILIALINHARES no checkout e o que soma com ele",
        url: '/reviews/cupom-barbours-como-usar',
        type: 'review',
        publishedAt: '2026-11-18',
      },
      {
        title: "Cupom Barbour's primeira compra: CECILIALINHARES dá 10% OFF e vale nas compras seguintes",
        url: '/reviews/cupom-barbours-primeira-compra',
        type: 'review',
        publishedAt: '2026-11-18',
      },
      {
        title: "Barbour's Beauty é boa? O que a página, as avaliações e o Reclame Aqui mostram",
        url: '/reviews/barbours-e-boa',
        type: 'review',
        publishedAt: '2026-11-18',
      },
      {
        title: "Barbour's Beauty no Reclame Aqui: a nota, o selo RA1000 e o que mais gera reclamação",
        url: '/reviews/barbours-reclame-aqui-nota-reputacao',
        type: 'review',
        publishedAt: '2026-11-18',
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
    slug: 'bold',
    brand: 'BOLD Snacks',
    officialUrl: 'https://www.boldsnacks.com.br/',
    // Link da parceria (Bruno, 18/11/2026): o /discount/ do Shopify já leva o código ao carrinho. Nunca abrir para conferir.
    offerUrl: 'https://www.boldsnacks.com.br/discount/CECILIA15',
    brandIcon: 'B',
    brandLogo: '/images/about/partners/bold.png',
    brandLogoAlt: 'Marca BOLD Snacks',
    bubble: { src: '/images/logos/bolinhas/bold.png', background: '#00A0B1' },
    brandWatermark: '/images/logos/watermarks/bold.webp',
    brandColor: '#00A0B1',
    cartPrint: {
      article: 'cupom-bold-snacks-como-usar',
      src: '/images/reviews/bold/cupom-bold-checkout-com-cupom.webp',
      alt: 'Resumo do checkout da BOLD Snacks com o cupom CECILIA15 aplicado e o código mostrado embaixo de cada produto, com o valor do desconto',
      aspectRatio: 0.92,
    },
    code: 'CECILIA15',
    codeFieldLabel: 'Código de desconto ou cartão-presente',
    discount: '20% OFF',
    discountNumber: 20,
    category: 'Barras de proteína, whey protein, creatina e snacks proteicos (Crunch, Tube e Wafer)',
    hubCategory: 'saude',
    hubCard: 'reduzido',
    shortDescription: 'todo o site da BOLD Snacks, inclusive os produtos em promoção',
    longDescription:
      'O cupom BOLD Snacks CECILIA15 dá 20% OFF no site oficial, para quem compra pela primeira vez e para quem já é cliente, e soma com os preços em promoção: no nosso teste, os 20% entraram numa caixa de barras pelo preço cheio, num whey em promoção e no preço de assinatura do BOLD Club.',
    metaTitle: 'Cupom BOLD Snacks: 20% OFF com CECILIA15',
    metaTitleMonth: true,
    metaDescription:
      'Cupom BOLD Snacks: CECILIA15 dá 20% OFF em barra de proteína e whey, para cliente novo ou antigo, e soma com as promoções. Testado no checkout.',
    eligibleCategories: 'Produtos do site oficial da BOLD Snacks, inclusive os que estão em promoção e, no nosso teste, a assinatura BOLD Club',
    validity: 'Cupom ativo enquanto a parceria estiver vigente; o percentual pode mudar com as campanhas da loja',
    reusable: 'Pode ser usado por clientes novos e antigos',
    shipping: 'Entrega para todo o Brasil; o valor e o prazo do frete saem no checkout pelo CEP, segundo a política de entrega da loja',
    combinable: 'Soma com as promoções vigentes do site e, no nosso teste, com o preço de assinatura do BOLD Club; vale com todas as formas de pagamento, e a loja aceita um cupom por pedido',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Entra sobre o preço promocional: no teste, o whey de R$ 209 por R$ 189 saiu por R$ 151,20' },
      { benefit: 'assinatura', stacks: 'sim', condition: 'No nosso teste, o código entrou sobre o preço de assinatura do BOLD Club: a caixa de barras de R$ 152,00 saiu por R$ 121,60' },
      { benefit: 'pix', stacks: 'sim', condition: 'O cupom vale no Pix, como nas outras formas de pagamento' },
      { benefit: 'outro-cupom', stacks: 'nao', condition: 'A loja aceita um cupom promocional por pedido' },
      { benefit: 'cashback', stacks: 'nao', condition: 'Pela política da loja, o cashback não soma automaticamente com cupons promocionais' },
      { benefit: 'frete', stacks: 'nao', condition: 'O frete sai pelo CEP, à parte do cupom' },
    ],
    paymentPerks: ['Até 3x sem juros no cartão de crédito'],
    lastVerified: '2026-11-18',
    testedAt: '2026-11-18',
    testNote:
      'Num carrinho com a BOLD Caixa Mista pelo preço cheio de R$ 179,00 e o BOLD Whey Chocolate ao Leite de 450 g em promoção, de R$ 209,00 por R$ 189,00, o CECILIA15 tirou R$ 35,80 da caixa e R$ 37,80 do whey: os dois saíram por R$ 143,20 e R$ 151,20, com 20% de desconto em cada um. O resumo mostrou os dois brindes que o carrinho incluiu, uma coqueteleira e uma bolsa térmica a R$ 0,01, e o total ficou em R$ 294,42. Num segundo carrinho, a caixa BOLD Mousse de Maracujá na assinatura, com entrega a cada 2 meses, custava R$ 152,00, 15% abaixo dos R$ 179,00 da compra única, e o CECILIA15 tirou mais R$ 30,40: a caixa saiu por R$ 121,60.',
    codeInstructions: [
      'Copie o código CECILIA15 no card acima.',
      'Acesse o site oficial da BOLD Snacks pelo botão indicado, coloque os produtos no carrinho e clique em Finalizar.',
      'No resumo do checkout, digite o código no campo Código de desconto ou cartão-presente e clique em Aplicar.',
      'Confira o código CECILIA15 embaixo de cada produto, com o valor do desconto, e o total antes de pagar.',
    ],
    aboutBrand:
      'A BOLD Snacks é uma marca brasileira de snacks proteicos criada em 2018: barras de proteína BOLD em caixas de um sabor ou mistas, as linhas Crunch, Tube e Wafer, whey protein em potes e sachês e creatina, vendidos no site oficial. O cupom CECILIA15 é o benefício da parceria para quem acompanha o Em Casa com Cecília: 20% OFF no nosso teste, com qualquer forma de pagamento e também sobre os produtos em promoção.',
    faqs: [
      {
        question: 'Quanto de desconto o cupom CECILIA15 dá na BOLD Snacks?',
        answer:
          '20% OFF nos produtos do site oficial, no nosso teste mais recente. O cupom tirou R$ 73,60 de uma caixa de barras e de um whey que somavam R$ 368,00, e o checkout mostrou o desconto embaixo de cada produto.',
      },
      {
        question: 'Por que o cupom se chama CECILIA15 e dá 20%?',
        answer:
          'O nome do código vem da parceria, mas no nosso teste, durante a campanha de Black Friday da loja, o CECILIA15 deu 20% em cada produto. O percentual pode mudar com as campanhas da BOLD: confira o desconto no resumo do checkout antes de pagar.',
      },
      {
        question: 'O cupom CECILIA15 vale na primeira compra?',
        answer: 'Sim. O CECILIA15 vale na primeira compra e também para quem já comprou na BOLD.',
      },
      {
        question: 'Qual cupom BOLD vale para quem já é cliente?',
        answer: 'O CECILIA15. Ele dá 20% no site oficial para quem compra pela primeira vez e para quem já comprou.',
      },
      {
        question: 'O CECILIA15 é cupom de influenciadora da BOLD?',
        answer:
          'Sim. CECILIA15 é o cupom do Em Casa com Cecília na BOLD Snacks e deu 20% OFF no site oficial no nosso teste, para clientes novos e antigos.',
      },
      {
        question: 'O cupom soma com produtos em promoção?',
        answer:
          'Sim. No nosso teste, o BOLD Whey Chocolate ao Leite de 450 g estava em promoção, de R$ 209,00 por R$ 189,00, e o cupom tirou os 20% dele também: o pote saiu por R$ 151,20.',
      },
      {
        question: 'O cupom CECILIA15 vale na assinatura da BOLD?',
        answer:
          'No nosso teste, valeu. A caixa BOLD Mousse de Maracujá na assinatura BOLD Club, com entrega a cada 2 meses, custava R$ 152,00, 15% abaixo dos R$ 179,00 da compra única, e o CECILIA15 tirou mais 20%: a caixa saiu por R$ 121,60. A política de assinatura diz que as condições dela não se acumulam automaticamente com cupons, então confira o código no resumo do checkout antes de assinar. A assinatura tem frete grátis nas entregas recorrentes e pede permanência mínima de 2 ciclos.',
      },
      {
        question: 'Dá para usar o CECILIA15 junto com outro cupom?',
        answer:
          'Não. Pela política de promoções da BOLD, vale um cupom promocional por pedido. O cashback da loja também não soma automaticamente com os cupons.',
      },
      {
        question: 'O cupom CECILIA15 está funcionando hoje?',
        answer:
          'Sim. No teste de carrinho mais recente, o CECILIA15 foi aceito. A data e os valores do teste estão em "Como testamos o cupom", nesta página.',
      },
      {
        question: 'Onde coloco o cupom na BOLD?',
        answer:
          'No checkout do site oficial, que abre quando você clica em Finalizar no carrinho: digite CECILIA15 no campo Código de desconto ou cartão-presente e clique em Aplicar. O código aparece embaixo de cada produto, com o valor do desconto.',
      },
      {
        question: 'Tem cupom BOLD na Black Friday?',
        answer:
          'Tem. O cupom BOLD Snacks CECILIA15 vale no site oficial, em todas as formas de pagamento, e no nosso teste de novembro deu 20% OFF.',
      },
      {
        question: 'O cupom BOLD vale na Black Friday?',
        answer:
          'Vale. No nosso teste, em novembro, os 20% entraram também num whey em promoção. Confira o desconto no resumo do checkout antes de pagar.',
      },
      {
        question: 'O cupom dá frete grátis?',
        answer:
          'Não. O cupom não mexe no frete: a BOLD entrega em todo o Brasil, e o valor e o prazo aparecem no checkout depois do CEP.',
      },
      {
        question: 'Como funciona a troca na BOLD?',
        answer:
          'Pela política da loja, a desistência pode ser pedida em até 7 dias depois da entrega, com o produto na embalagem original, sem violação do lacre, acompanhado da nota fiscal e de todos os produtos do pedido. A troca e o cancelamento são pedidos pelo atendimento da loja.',
      },
      {
        question: 'O que fazer se o cupom CECILIA15 não funcionar?',
        answer:
          'Confira se o código foi digitado no campo Código de desconto ou cartão-presente do checkout, sem espaços, e se ele apareceu embaixo dos produtos. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.',
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
    slug: 'pinkcheeks',
    brand: 'Pink Cheeks',
    officialUrl: 'https://pinkcheeks.com.br/',
    // A parceria não tem link próprio (Bruno, 19/11/2026): o botão abre o site oficial.
    offerUrl: 'https://pinkcheeks.com.br/',
    brandIcon: 'PC',
    brandLogo: '/images/about/partners/pinkcheeks.png',
    brandLogoAlt: 'Marca Pink Cheeks',
    bubble: { src: '/images/logos/bolinhas/pinkcheeks.png', background: '#FF7800' },
    brandWatermark: '/images/logos/watermarks/pinkcheeks.webp',
    brandColor: '#FF7800',
    cartPrint: {
      article: 'cupom-pinkcheeks-como-usar',
      src: '/images/reviews/pinkcheeks/cupom-pinkcheeks-checkout-com-cupom.webp',
      alt: 'Resumo do checkout da Pink Cheeks com dois itens, o código PNK-EMCASACOMCECILIA aplicado, a linha Desconto no pedido de menos R$ 16,98 e o total de R$ 152,82',
      aspectRatio: 0.96,
    },
    code: 'PNK-EMCASACOMCECILIA',
    codeFieldLabel: 'Código de desconto ou cartão-presente',
    discount: '10% OFF',
    discountNumber: 10,
    category: 'Protetor solar, maquiagem com FPS, antiatrito e cabelos',
    hubCategory: 'beleza',
    shortDescription: 'todo o site da Pink Cheeks, inclusive os produtos em promoção',
    longDescription:
      'O cupom Pink Cheeks PNK-EMCASACOMCECILIA dá 10% OFF no site oficial, para quem compra pela primeira vez e para quem já é cliente, e soma com as promoções: no nosso teste, os 10% entraram num pó translúcido pelo preço cheio e também num blush em promoção de Black Friday. Vale em todas as formas de pagamento.',
    metaTitle: 'Cupom Pink Cheeks: 10% com PNK-EMCASACOMCECILIA',
    metaTitleMonth: true,
    metaDescription:
      'Cupom Pink Cheeks: PNK-EMCASACOMCECILIA dá 10% OFF em protetor solar e maquiagem com FPS, para cliente novo ou antigo. Testado no checkout.',
    eligibleCategories: 'Produtos do site oficial da Pink Cheeks, inclusive os que estão em promoção',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Pode ser usado por clientes novos e antigos',
    shipping: 'Frete grátis na Entrega Normal em compras a partir de R$ 199, segundo a loja; na Black Friday, a faixa do site anuncia frete grátis nas compras acima de 3 itens; a Entrega Expressa tem valor e prazo no checkout',
    combinable: 'Soma com as promoções vigentes do site e vale com todas as formas de pagamento, inclusive o Pix',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Entra sobre o preço promocional: no teste, o blush de R$ 89,90 por R$ 69,90 também ganhou os 10%' },
      { benefit: 'pix', stacks: 'sim', condition: 'O código seguiu aplicado com o Pix escolhido no checkout; a loja não dá desconto próprio no Pix' },
      { benefit: 'frete', stacks: 'depende', condition: 'Grátis na Entrega Normal a partir de R$ 199 ou, na Black Friday, acima de 3 itens, segundo a loja; fora disso e na Expressa, o frete sai pelo CEP' },
    ],
    paymentPerks: ['Até 5x sem juros no cartão de crédito'],
    relatedContent: [
      {
        title: 'Cupom Pink Cheeks: como aplicar o PNK-EMCASACOMCECILIA no checkout e com o que ele soma',
        url: '/reviews/cupom-pinkcheeks-como-usar',
        type: 'review',
        publishedAt: '2026-11-19',
      },
      {
        title: 'Pink Stick: como escolher entre oito tons e a versão incolor',
        url: '/reviews/pink-stick-qual-cor-escolher',
        type: 'review',
        publishedAt: '2026-11-21',
      },
      {
        title: 'Pink Cheeks é boa? Como escolher entre Pink Stick, Pro Stick e Clear Stick',
        url: '/reviews/pinkcheeks-e-boa',
        type: 'review',
        publishedAt: '2026-11-19',
      },
      {
        title: 'Black Friday Pink Cheeks 2026: o que vem nos kits e onde o cupom deu 10%',
        url: '/reviews/black-friday-pinkcheeks',
        type: 'review',
        publishedAt: '2026-11-19',
      },
      {
        title: 'Pink Cheeks é confiável? Quem vende, nota no Reclame Aqui e trocas',
        url: '/reviews/pinkcheeks-e-confiavel',
        type: 'review',
        publishedAt: '2026-11-19',
      },
      {
        title: 'Pink Cheeks no Reclame Aqui: nota, queixas e como falar com a loja',
        url: '/reviews/pinkcheeks-reclame-aqui-nota-reputacao',
        type: 'review',
        publishedAt: '2026-11-19',
      },
    ],
    lastVerified: '2026-11-22',
    testedAt: '2026-11-22',
    testNote:
      'Num carrinho da Black Friday com o Kit Natação, de R$ 269,70 por R$ 134,85, e o Pink Stick 21 KM, de R$ 129,90 por R$ 99,90, o PNK-EMCASACOMCECILIA tirou R$ 23,47 dos R$ 234,75, 10% do pedido, e o total caiu para R$ 211,28: o código entrou sobre os preços promocionais do kit e do bastão. No teste anterior, com o Pix escolhido como pagamento, o código seguiu aplicado e o total não mudou.',
    codeInstructions: [
      'Copie o código PNK-EMCASACOMCECILIA no card acima.',
      'Acesse o site oficial da Pink Cheeks pelo botão indicado, adicione os produtos ao carrinho e clique em Finalizar pedido.',
      'No resumo do checkout, digite o código no campo Código de desconto ou cartão-presente e clique em Aplicar.',
      'Confira a linha Desconto no pedido, com o código e o valor, e o total antes de pagar.',
    ],
    aboutBrand:
      'A Pink Cheeks é uma marca brasileira nascida no esporte há mais de uma década e criada por atletas: protetores solares, maquiagens com FPS, como blush, pó translúcido e batom, além de produtos antiatrito e para cabelos, vendidos no site oficial. O cupom PNK-EMCASACOMCECILIA é o benefício da parceria para quem acompanha o Em Casa com Cecília: 10% OFF, com qualquer forma de pagamento e também sobre os produtos em promoção.',
    faqs: [
      {
        question: 'Quanto de desconto o cupom PNK-EMCASACOMCECILIA dá na Pink Cheeks?',
        answer:
          '10% OFF nos produtos do site oficial. No nosso teste, o cupom tirou R$ 16,98 de um carrinho de R$ 169,80, e o resumo do checkout mostrou o valor na linha Desconto no pedido.',
      },
      {
        question: 'O cupom Pink Cheeks vale na primeira compra?',
        answer: 'Sim. O PNK-EMCASACOMCECILIA vale na primeira compra e também para quem já comprou na loja.',
      },
      {
        question: 'Qual cupom Pink Cheeks vale para quem já é cliente?',
        answer: 'O PNK-EMCASACOMCECILIA. Ele dá 10% no site oficial para quem compra pela primeira vez e para quem já comprou.',
      },
      {
        question: 'O PNK-EMCASACOMCECILIA é cupom de influenciadora da Pink Cheeks?',
        answer:
          'Sim. PNK-EMCASACOMCECILIA é o cupom do Em Casa com Cecília na Pink Cheeks e dá 10% OFF no site oficial para clientes novos e antigos.',
      },
      {
        question: 'O cupom soma com produtos em promoção?',
        answer:
          'Sim. No nosso teste, o Blush All In One FPS30 Terracota estava em promoção, de R$ 89,90 por R$ 69,90, e o cupom tirou os 10% dele também.',
      },
      {
        question: 'O cupom vale no Pix?',
        answer:
          'Vale. No nosso teste, o código seguiu aplicado com o Pix escolhido no checkout, e o total não mudou: a Pink Cheeks não dá desconto próprio no Pix. No cartão de crédito, a loja parcela em até 5x sem juros.',
      },
      {
        question: 'O cupom PNK-EMCASACOMCECILIA está funcionando hoje?',
        answer:
          'Sim. No teste de carrinho mais recente, o PNK-EMCASACOMCECILIA foi aceito. A data e os valores do teste estão em "Como testamos o cupom", nesta página.',
      },
      {
        question: 'Onde coloco o cupom na Pink Cheeks?',
        answer:
          'No checkout do site oficial, que abre pelo botão Finalizar pedido do carrinho: digite PNK-EMCASACOMCECILIA no campo Código de desconto ou cartão-presente e clique em Aplicar. O resumo passa a mostrar a linha Desconto no pedido, com o valor.',
      },
      {
        question: 'Tem cupom Pink Cheeks na Black Friday?',
        answer:
          'Tem. O cupom Pink Cheeks PNK-EMCASACOMCECILIA dá 10% OFF no site oficial, em todas as formas de pagamento, e é o mesmo código do resto do ano.',
      },
      {
        question: 'O cupom Pink Cheeks vale na Black Friday?',
        answer:
          'Vale. No nosso teste, em novembro, os 10% entraram também num blush em promoção de Black Friday. Confira a linha Desconto no pedido no resumo antes de pagar.',
      },
      {
        question: 'O cupom dá frete grátis?',
        answer:
          'O cupom não mexe no frete, mas a loja dá frete grátis na Entrega Normal em compras a partir de R$ 199, e na Black Friday a faixa do site anuncia frete grátis nas compras acima de 3 itens. Fora disso, e na Entrega Expressa, o valor e o prazo aparecem no checkout depois do CEP.',
      },
      {
        question: 'Como funciona a troca na Pink Cheeks?',
        answer:
          'Pela política da loja, a desistência da compra pode ser pedida em até 7 dias depois do recebimento, e o produto com defeito, em até 30 dias. O pedido de troca ou devolução é feito no portal de trocas indicado na página Trocas e Devoluções do site, com o e-mail ou o CPF e o número do pedido.',
      },
      {
        question: 'O que fazer se o cupom PNK-EMCASACOMCECILIA não funcionar?',
        answer:
          'Confira se o código foi digitado inteiro, com o hífen depois de PNK e sem espaços, no campo Código de desconto ou cartão-presente do checkout. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.',
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
    slug: 'gocase',
    brand: 'Gocase',
    officialUrl: 'https://www.gocase.com.br/',
    // Link de afiliado da GoGroup (Bruno, 19/11/2026). Nunca abrir para conferir. A página de entrada anuncia faixas de
    // R$ 15, R$ 30 e R$ 45 ("15%"), mas nos três testes de 19/11 o CECILIAA deu 5%, pelo link e direto no site.
    offerUrl: 'https://gocase.gogroup.com.br/emcasacomcecilia',
    brandIcon: 'G',
    brandLogo: '/images/about/partners/gocase.png',
    brandLogoAlt: 'Marca Gocase',
    bubble: { src: '/images/logos/bolinhas/gocase.png', background: '#005BAA' },
    brandWatermark: '/images/logos/watermarks/gocase.webp',
    brandColor: '#005BAA',
    cartPrint: {
      article: 'cupom-gocase-como-usar',
      src: '/images/reviews/gocase/cupom-gocase-checkout-com-cupom.webp',
      alt: 'Resumo do checkout da Gocase com o cupom CECILIAA aplicado: desconto de R$ 18,99 sobre R$ 379,70 em produtos e total de R$ 360,71',
      aspectRatio: 0.65,
    },
    code: 'CECILIAA',
    codeFieldLabel: 'Tem um cupom?',
    discount: '5% OFF',
    discountNumber: 5,
    category: 'Capinhas de celular, garrafas e copos térmicos, bolsas, mochilas, malas e acessórios',
    hubCategory: 'diversos',
    shortDescription: 'todo o site da Gocase, inclusive os preços da GoBlack',
    longDescription:
      'O cupom Gocase CECILIAA dá 5% OFF no site oficial, para quem compra pela primeira vez e para quem já é cliente, e soma com os preços de Black Friday da GoBlack: nos nossos testes, os 5% entraram sobre bolsas, garrafas e copos térmicos que já estavam em promoção. Vale em todas as formas de pagamento.',
    metaTitle: 'Cupom Gocase: 5% OFF com CECILIAA',
    metaTitleMonth: true,
    metaDescription:
      'Cupom Gocase: CECILIAA dá 5% OFF em capinhas, garrafas térmicas e bolsas e soma com os preços da GoBlack. Testado no checkout.',
    eligibleCategories: 'Produtos do site oficial da Gocase, inclusive os que estão em promoção',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Pode ser usado por clientes novos e antigos',
    shipping:
      'Frete grátis na entrega Normal pelo valor final com os descontos: o regulamento e a faixa do site informam R$ 229,90 no DF, ES, GO, MG, MS, PR, RJ, RS, SC e SP, enquanto a Central de Ajuda cita R$ 199,90 para esses estados; nos demais, R$ 399,00. Pedidos com mala de bordo ou mochila de rodinhas ficam fora, e o valor que vale para o seu estado aparece no carrinho',
    combinable: 'Soma com as promoções vigentes do site, inclusive os preços da GoBlack, e vale com todas as formas de pagamento. A exceção é o Compre 1 e Leve 2 das capinhas, que pelo regulamento não soma com cupom',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Entra sobre o preço da GoBlack: no teste, a Tote Mini de R$ 219,90 por R$ 149,90 também ganhou os 5%. O Compre 1 e Leve 2 das capinhas não soma com cupom' },
      { benefit: 'pix', stacks: 'sim', condition: 'O cupom vale no Pix, como nas outras formas de pagamento' },
      { benefit: 'frete', stacks: 'depende', condition: 'Grátis acima de R$ 229,90 pelo regulamento (a Central de Ajuda cita R$ 199,90) no Sul, no Sudeste e em parte do Centro-Oeste; R$ 399,00 nos demais' },
    ],
    lastVerified: '2026-11-19',
    testedAt: '2026-11-19',
    testNote:
      'Num carrinho com dois Copos Térmicos Moove pelo preço cheio, de R$ 99,90 e R$ 129,90, e a Tote Mini em promoção, de R$ 219,90 por R$ 149,90, o CECILIAA tirou R$ 18,99 dos R$ 379,70 em produtos, 5%, e o total caiu para R$ 360,71. Em outros dois carrinhos do mesmo dia, de R$ 319,70 e de R$ 789,60, o desconto também foi de 5%: R$ 15,99, com frete grátis, e R$ 39,48, num pedido só de produtos da GoBlack.',
    codeInstructions: [
      'Copie o código CECILIAA no card acima.',
      'Acesse o site oficial da Gocase pelo botão indicado, adicione os produtos ao carrinho e clique em Finalizar compra.',
      'No checkout, informe primeiro o seu e-mail e o CPF: antes dessa etapa, o campo Tem um cupom? recusa o CECILIAA.',
      'No resumo do checkout, digite o código no campo Tem um cupom? e clique em Aplicar.',
      'Confira o aviso Cupom CECILIAA aplicado e a linha Desconto (CECILIAA) antes de pagar.',
    ],
    aboutBrand:
      'A Gocase é uma marca brasileira com mais de 10 anos de capinhas de celular, garrafas e copos térmicos, bolsas, mochilas, malas, acessórios e linha pet, muitos deles personalizáveis, vendidos no site oficial e em lojas em Fortaleza, Brasília e São Paulo. O cupom CECILIAA é o benefício da parceria para quem acompanha o Em Casa com Cecília: 5% OFF, com qualquer forma de pagamento e também sobre os preços em promoção.',
    faqs: [
      {
        question: 'Qual é o cupom da Gocase?',
        answer:
          'O cupom da Gocase é o CECILIAA, com dois A no fim, que dá 5% OFF no site oficial, em todas as formas de pagamento, para clientes novos e antigos, e soma com os preços da GoBlack. No checkout, informe o e-mail e o CPF antes de digitar o código no campo Tem um cupom?.',
      },
      {
        question: 'Quanto de desconto o cupom CECILIAA dá na Gocase?',
        answer:
          '5% OFF nos produtos do site oficial. Nos nossos testes, o cupom tirou R$ 18,99 de um carrinho de R$ 379,70, e o resumo do checkout mostrou o valor na linha Desconto (CECILIAA).',
      },
      {
        question: 'O cupom Gocase soma com os preços da GoBlack?',
        answer:
          'Sim. Nos nossos testes de novembro, os 5% entraram sobre produtos que já estavam com o preço da GoBlack: a Tote Mini de R$ 219,90 por R$ 149,90, por exemplo, também ganhou o desconto.',
      },
      {
        question: 'O cupom Gocase vale na primeira compra?',
        answer: 'Sim. O CECILIAA vale na primeira compra e também para quem já comprou na Gocase.',
      },
      {
        question: 'Qual cupom Gocase vale para quem já é cliente?',
        answer: 'O CECILIAA. Ele dá 5% no site oficial para quem compra pela primeira vez e para quem já comprou.',
      },
      {
        question: 'O CECILIAA é cupom de influenciadora da Gocase?',
        answer:
          'Sim. CECILIAA, com dois A no fim, é o cupom do Em Casa com Cecília na Gocase e dá 5% OFF no site oficial para clientes novos e antigos.',
      },
      {
        question: 'O cupom CECILIAA está funcionando hoje?',
        answer:
          'Sim. No teste de carrinho mais recente, o CECILIAA foi aceito. A data e os valores do teste estão em "Como testamos o cupom", nesta página.',
      },
      {
        question: 'Onde coloco o cupom na Gocase?',
        answer:
          'No checkout do site oficial, que abre pelo botão Finalizar compra do carrinho. Informe primeiro o e-mail e o CPF; depois, digite CECILIAA no campo Tem um cupom?, no resumo, e clique em Aplicar. Aparece o aviso Cupom CECILIAA aplicado, e o resumo passa a mostrar a linha Desconto (CECILIAA).',
      },
      {
        question: 'O cupom soma com o Compre 1 e Leve 2 das capinhas?',
        answer:
          'Não. Pelo regulamento da Gocase, a promoção Compre 1 e Leve 2 das capinhas não soma com cupom. Nas outras promoções do site, como os preços da GoBlack, o CECILIAA entra normalmente.',
      },
      {
        question: 'Tem cupom Gocase na Black Friday?',
        answer:
          'Tem. O cupom Gocase CECILIAA dá 5% OFF no site oficial, em todas as formas de pagamento, e soma com os preços da GoBlack.',
      },
      {
        question: 'O cupom Gocase vale na Black Friday?',
        answer:
          'Vale. Nos nossos testes, em novembro, os 5% entraram também em produtos com o preço da GoBlack. Confira a linha Desconto (CECILIAA) no resumo antes de pagar.',
      },
      {
        question: 'O cupom dá frete grátis?',
        answer:
          'O cupom não mexe no frete. O regulamento e a faixa do site da Gocase informam frete grátis na entrega Normal acima de R$ 229,90 no DF, ES, GO, MG, MS, PR, RJ, RS, SC e SP, enquanto a Central de Ajuda cita R$ 199,90 para esses estados; nos demais, o valor é R$ 399,00. Conta o valor final do pedido com os descontos, e pedidos com mala de bordo ou mochila de rodinhas ficam fora. O valor que vale para o seu estado aparece no carrinho.',
      },
      {
        question: 'Como funciona a troca na Gocase?',
        answer:
          'Pela política da loja, os produtos sem personalização podem ser trocados ou devolvidos em até 7 dias corridos depois do recebimento, sem sinais de uso. Os personalizados, com estampa, nome ou foto, não são trocados por arrependimento, só em caso de defeito de fabricação.',
      },
      {
        question: 'O que fazer se o cupom CECILIAA não funcionar?',
        answer:
          'Confira se o código foi digitado com dois A no fim, sem espaços, no campo Tem um cupom? do checkout, e se apareceu o aviso Cupom CECILIAA aplicado. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.',
      },
      {
        question: 'Comprar com o cupom apoia o Em Casa com Cecília?',
        answer:
          'Sim, a compra pode gerar comissão para o Em Casa com Cecília, sem custo extra para você. O desconto aparece no checkout quando o cupom é aceito.',
      },
    ],
    monthlyHighlight: {
      scope: 'no site oficial',
      note: 'Soma com os preços da GoBlack',
    },
    relatedContent: [
      { title: 'Cupom Gocase: como aplicar o CECILIAA no checkout e com o que ele soma', url: '/reviews/cupom-gocase-como-usar', type: 'review', publishedAt: '2026-11-19' },
      { title: 'Black Friday Gocase 2026: preços de garrafas, copos e bolsas com o CECILIAA', url: '/reviews/black-friday-gocase', type: 'review', publishedAt: '2026-11-19' },
      { title: 'Gocase é boa? Como escolher garrafa térmica, bolsa e capinha', url: '/reviews/gocase-e-boa', type: 'review', publishedAt: '2026-11-19' },
      { title: 'Garrafa térmica: qual escolher entre Gocase e Bagaggio', url: '/reviews/garrafa-termica-qual-escolher-parceiras', type: 'review', publishedAt: '2026-11-21' },
      { title: 'Cupom Gocase na primeira compra: 5% OFF com CECILIAA', url: '/reviews/cupom-gocase-primeira-compra', type: 'review', publishedAt: '2026-11-19' },
      { title: 'Gocase no Reclame Aqui: a nota, o que mais gera reclamação e como a loja responde', url: '/reviews/gocase-reclame-aqui-nota-reputacao', type: 'review', publishedAt: '2026-11-19' },
    ],
    status: 'ativo',
    featured: false,
  },
  {
    offerMode: 'discount-code',
    slug: 'colaedecora',
    brand: 'Cola e Decora',
    officialUrl: 'https://www.lojacolaedecora.com.br/',
    // A parceria não tem link próprio (Bruno, 19/11/2026): o botão abre o site oficial.
    offerUrl: 'https://www.lojacolaedecora.com.br/',
    brandIcon: 'CD',
    brandLogo: '/images/about/partners/colaedecora.png',
    brandLogoAlt: 'Marca Cola e Decora',
    bubble: { src: '/images/logos/bolinhas/colaedecora.png', background: '#DF7D66' },
    brandWatermark: '/images/logos/watermarks/colaedecora.webp',
    brandColor: '#DF7D66',
    cartPrint: {
      article: 'cupom-colaedecora-como-usar',
      src: '/images/reviews/colaedecora/cupom-colaedecora-carrinho-com-cupom.webp',
      alt: 'Carrinho da Cola e Decora com o cupom EMCASACOMCECILIA aplicado, desconto de R$ 13,98 sobre R$ 139,80 e subtotal de R$ 125,82',
      aspectRatio: 1.28,
    },
    code: 'EMCASACOMCECILIA',
    codeFieldLabel: 'Tem um cupom?',
    discount: '10% OFF',
    discountNumber: 10,
    category: 'Decoração infantil: móveis, quadros, almofadas, prateleiras, tapetes, enfeites e brinquedos',
    hubCategory: 'casa',
    shortDescription: 'todo o site da Cola e Decora, inclusive os produtos em promoção',
    longDescription:
      'O cupom Cola e Decora EMCASACOMCECILIA dá 10% OFF no site oficial, para quem compra pela primeira vez e para quem já é cliente, e soma com as promoções: no nosso teste, os 10% entraram num quadro e numa prateleira de livros que já estavam com o preço de Black Friday. Vale em todas as formas de pagamento.',
    metaTitle: 'Cupom Cola e Decora: 10% OFF com EMCASACOMCECILIA',
    metaTitleMonth: true,
    metaDescription:
      'Cupom Cola e Decora: EMCASACOMCECILIA dá 10% OFF em decoração infantil, quadros e móveis e soma com as promoções. Testado no carrinho.',
    eligibleCategories: 'Produtos do site oficial da Cola e Decora, inclusive os que estão em promoção',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Pode ser usado por clientes novos e antigos',
    shipping: 'Frete grátis em compras a partir de R$ 599 em produtos, segundo a loja; abaixo disso, o valor e o prazo saem no checkout pelo CEP',
    combinable: 'Soma com as promoções vigentes do site e vale com todas as formas de pagamento',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Entra sobre o preço promocional: no teste, a prateleira de R$ 199,90 por R$ 59,90 também ganhou os 10%' },
      { benefit: 'pix', stacks: 'sim', condition: 'No teste, o código seguiu aplicado com o Pix escolhido no pagamento; a loja não dá desconto próprio no Pix' },
      { benefit: 'frete', stacks: 'depende', condition: 'Grátis a partir de R$ 599 em produtos, segundo a loja; abaixo disso, o frete sai pelo CEP no checkout' },
    ],
    paymentPerks: ['Até 10x sem juros no cartão de crédito, conforme o valor do pedido'],
    lastVerified: '2026-11-19',
    testedAt: '2026-11-19',
    testNote:
      'Num carrinho com o Quadro Infantil Oração Santo Anjo, de R$ 99,90 por R$ 79,90, e a Prateleira de Livros 50cm Rosa - Theo, de R$ 199,90 por R$ 59,90, os dois com o preço de Black Friday, o EMCASACOMCECILIA tirou R$ 13,98 dos R$ 139,80, 10%, e o subtotal caiu para R$ 125,82. No checkout, o resumo do pedido manteve o cupom ativo de R$ 13,98. Num segundo carrinho do mesmo dia, com 5 Cadeiras Infantis Brancas - Theo a R$ 159,90 cada, os R$ 799,50 caíram para R$ 719,55 com o cupom, com frete grátis, e o Pix escolhido no pagamento manteve os R$ 719,55.',
    codeInstructions: [
      'Copie o código EMCASACOMCECILIA no card acima.',
      'Acesse o site oficial da Cola e Decora pelo botão indicado e clique em Comprar nos produtos: o carrinho abre ao lado.',
      'No carrinho, toque em aplicar, ao lado de Tem um cupom?, digite o código e clique em aplicar.',
      'Confira o aviso Cupom aplicado, com os 10% OFF, e o subtotal antes de clicar em Finalizar compra.',
    ],
    aboutBrand:
      'A Cola e Decora é uma loja brasileira de decoração para o quarto das crianças: móveis montessorianos, quadros, almofadas, prateleiras, tapetes, móbiles, enfeites e brinquedos, muitos com o nome da criança, vendidos no site oficial. O cupom EMCASACOMCECILIA é o benefício da parceria para quem acompanha o Em Casa com Cecília: 10% OFF, com qualquer forma de pagamento e também sobre os produtos em promoção.',
    faqs: [
      {
        question: 'Quanto de desconto o cupom EMCASACOMCECILIA dá na Cola e Decora?',
        answer:
          '10% OFF nos produtos do site oficial. No nosso teste, o cupom tirou R$ 13,98 de um carrinho de R$ 139,80, e o carrinho mostrou o aviso Cupom aplicado, com os 10% OFF.',
      },
      {
        question: 'O cupom Cola e Decora vale na primeira compra?',
        answer: 'Sim. O EMCASACOMCECILIA vale na primeira compra e também para quem já comprou na loja.',
      },
      {
        question: 'Qual cupom Cola e Decora vale para quem já é cliente?',
        answer: 'O EMCASACOMCECILIA. Ele dá 10% no site oficial para quem compra pela primeira vez e para quem já comprou.',
      },
      {
        question: 'O EMCASACOMCECILIA é cupom de influenciadora da Cola e Decora?',
        answer:
          'Sim. EMCASACOMCECILIA é o cupom do Em Casa com Cecília na Cola e Decora e dá 10% OFF no site oficial para clientes novos e antigos.',
      },
      {
        question: 'O cupom soma com produtos em promoção?',
        answer:
          'Sim. No nosso teste, a Prateleira de Livros 50cm Rosa - Theo estava de R$ 199,90 por R$ 59,90, e o cupom tirou os 10% dela também.',
      },
      {
        question: 'O cupom vale no Pix?',
        answer:
          'Vale. No nosso teste, com o Pix escolhido no pagamento, o cupom seguiu aplicado e o pedido de R$ 799,50 ficou em R$ 719,55. A Cola e Decora não dá desconto próprio no Pix; no cartão de crédito, parcela em até 10x sem juros, conforme o valor do pedido.',
      },
      {
        question: 'O cupom EMCASACOMCECILIA está funcionando hoje?',
        answer:
          'Sim. No teste de carrinho mais recente, o EMCASACOMCECILIA foi aceito. A data e os valores do teste estão em "Como testamos o cupom", nesta página.',
      },
      {
        question: 'Onde coloco o cupom na Cola e Decora?',
        answer:
          'No carrinho, que abre ao lado da página quando você clica em Comprar: toque em aplicar, ao lado de Tem um cupom?, digite EMCASACOMCECILIA e clique em aplicar. O desconto aparece no carrinho e segue para o resumo do checkout, como cupom ativo.',
      },
      {
        question: 'Tem cupom Cola e Decora na Black Friday?',
        answer:
          'Tem. O cupom Cola e Decora EMCASACOMCECILIA dá 10% OFF no site oficial, em todas as formas de pagamento, e soma com os preços de Black Friday.',
      },
      {
        question: 'O cupom Cola e Decora vale na Black Friday?',
        answer:
          'Vale. No nosso teste, em novembro, os 10% entraram em produtos que já estavam com o preço de Black Friday. Confira o aviso Cupom aplicado no carrinho antes de finalizar.',
      },
      {
        question: 'O cupom dá frete grátis?',
        answer:
          'O cupom não mexe no frete. Pela página de frete da loja, o frete é grátis em compras a partir de R$ 599 em produtos, e no nosso teste um pedido de R$ 799,50 saiu com frete grátis, já com o cupom aplicado. Abaixo disso, o valor e o prazo aparecem no checkout depois do CEP, e em qualquer valor vale conferir a opção de frete grátis na cotação do checkout.',
      },
      {
        question: 'Como funciona a troca na Cola e Decora?',
        answer:
          'Pela política da loja, a troca ou devolução é pedida em até 7 dias corridos depois do recebimento, pelo sistema de trocas indicado na página Trocas e Devoluções. O produto volta na embalagem original, sem sinais de uso, com as etiquetas e a nota fiscal.',
      },
      {
        question: 'O que fazer se o cupom EMCASACOMCECILIA não funcionar?',
        answer:
          'Confira se o código foi digitado inteiro, sem espaços, no campo do carrinho e se apareceu o aviso Cupom aplicado. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.',
      },
      {
        question: 'Comprar com o cupom apoia o Em Casa com Cecília?',
        answer:
          'Sim, a compra pode gerar comissão para o Em Casa com Cecília, sem custo extra para você. O desconto aparece no carrinho quando o cupom é aceito.',
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
    slug: 'denavita',
    brand: 'Denavita',
    officialUrl: 'https://www.denavita.com.br/',
    // Link de afiliado da GoGroup (Bruno, 19/11/2026). Nunca abrir para conferir. O teste foi pelo site oficial.
    offerUrl: 'https://denavita.gogroup.com.br/emcasacomcecilia',
    brandIcon: 'D',
    brandLogo: '/images/about/partners/denavita.png',
    brandLogoAlt: 'Marca Denavita',
    bubble: { src: '/images/logos/bolinhas/denavita-folhas.png', background: '#54B101' },
    brandWatermark: '/images/logos/watermarks/denavita.webp',
    brandColor: '#54B101',
    cartPrint: {
      article: 'cupom-denavita-como-usar',
      src: '/images/reviews/denavita/cupom-denavita-checkout-com-cupom.webp',
      alt: 'Resumo do checkout da Denavita com o código EMCASA no campo Tem um cupom?: desconto de R$ 39,98 sobre R$ 399,80 em produtos e total de R$ 359,82',
      aspectRatio: 0.54,
    },
    code: 'EMCASA',
    codeFieldLabel: 'Tem um cupom?',
    discount: '10% OFF',
    discountNumber: 10,
    category: 'Vitaminas e suplementos: laranja moro, magnésio, ômega 3, colágeno, creatina e kits',
    hubCategory: 'saude',
    hubCard: 'reduzido',
    shortDescription: 'todo o site da Denavita, inclusive os produtos em promoção',
    longDescription:
      'O cupom Denavita EMCASA dá 10% OFF no site oficial, para quem compra pela primeira vez e para quem já é cliente, e soma com os preços em promoção: nos nossos testes, os 10% entraram sobre vitaminas, suplementos e kits que já estavam com desconto. Vale em todas as formas de pagamento, inclusive no Pix.',
    metaTitle: 'Cupom Denavita: 10% OFF com EMCASA',
    metaTitleMonth: true,
    metaDescription:
      'Cupom Denavita: EMCASA dá 10% OFF em vitaminas e suplementos, para cliente novo ou antigo, e soma com as promoções do site. Testado no checkout.',
    eligibleCategories: 'Produtos do site oficial da Denavita, inclusive os que estão em promoção',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Pode ser usado por clientes novos e antigos',
    shipping:
      'O site anuncia frete grátis em compras a partir de R$ 199,90, com regras próprias; o valor do frete e o prazo saem no checkout depois do CEP',
    // O "Leve 3, Pague 2" do carrinho não apareceu junto com o cupom em nenhum teste: só os preços em promoção.
    combinable: 'Soma com as promoções de preço do site e vale com todas as formas de pagamento, inclusive o Pix',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Entra sobre o preço promocional: no teste, a Laranja Moro de R$ 129,90 por R$ 76,90 também ganhou os 10%' },
      { benefit: 'pix', stacks: 'sim', condition: 'No teste, o desconto do cupom se manteve com o Pix escolhido' },
      { benefit: 'frete', stacks: 'depende', condition: 'O site anuncia frete grátis a partir de R$ 199,90; confira a opção no checkout depois do CEP' },
    ],
    paymentPerks: ['Parcelamento em até 12x no cartão de crédito, como mostra o resumo do checkout'],
    lastVerified: '2026-11-19',
    testedAt: '2026-11-19',
    testNote:
      'Num carrinho com a Laranja Moro Morosil, Picolinato de Cromo e Café Verde em promoção, de R$ 129,90 por R$ 76,90, o EMCASA tirou R$ 7,69 e o total caiu para R$ 69,21. Com o Jejoom Shot Matinal, de R$ 94,90, e o Trio Magnésio, de R$ 46,90, no mesmo carrinho, os R$ 218,70 em produtos ganharam R$ 21,87 de desconto, 10%, e o total ficou em R$ 196,83. Num carrinho com o Kit Vida Fit e o Turbo Metabolismo, de R$ 199,90 cada, o código tirou R$ 39,98 dos R$ 399,80, e o total caiu para R$ 359,82; com o Pix escolhido, o desconto se manteve.',
    codeInstructions: [
      'Copie o código EMCASA no card acima.',
      'Acesse o site oficial da Denavita pelo botão indicado, adicione os produtos ao carrinho e clique em Finalizar compra.',
      'No resumo do checkout, digite o código no campo Tem um cupom? e clique em Adicionar.',
      'Confira a linha Cupom de desconto, em Descontos, antes de seguir para a entrega e o pagamento.',
    ],
    aboutBrand:
      'A Denavita é uma marca de vitaminas e suplementos vendida pelo site oficial, com cápsulas de laranja moro, magnésio, ômega 3, coenzima Q10, colágeno tipo II, NAC com polivitamínico, vinagre de maçã em gomas, creatina, colágeno em pó e kits. O cupom EMCASA é o benefício da parceria para quem acompanha o Em Casa com Cecília: 10% OFF, com qualquer forma de pagamento e também sobre os produtos em promoção.',
    faqs: [
      {
        question: 'Quanto de desconto o cupom EMCASA dá na Denavita?',
        answer:
          '10% OFF nos produtos do site oficial. No nosso teste, o cupom tirou R$ 21,87 de um carrinho de R$ 218,70, e o resumo do checkout mostrou o valor na linha Cupom de desconto.',
      },
      {
        question: 'Os cupons de 15% e 20% que aparecem por aí funcionam na Denavita?',
        answer:
          'No teste de 22/11/2026, não. Num carrinho de R$ 226,80, o VITA15 e o VITA20 voltaram como "Cupom inválido", e os outros códigos anunciados com 15% tiraram R$ 22,68, os mesmos 10% do EMCASA. Confira a linha de desconto no resumo do pedido antes de pagar.',
      },
      {
        question: 'O cupom Denavita soma com os produtos em promoção?',
        answer:
          'Sim. No nosso teste, a Laranja Moro estava em promoção, de R$ 129,90 por R$ 76,90, e o cupom tirou os 10% dela também: R$ 7,69, com o total em R$ 69,21.',
      },
      {
        question: 'O cupom EMCASA vale no Pix?',
        answer:
          'Vale. No nosso teste, o desconto do cupom se manteve com o Pix escolhido. No cartão de crédito, o resumo do checkout mostra o parcelamento em até 12x.',
      },
      {
        question: 'O cupom Denavita vale na primeira compra?',
        answer: 'Sim. O EMCASA vale na primeira compra e também para quem já comprou na Denavita.',
      },
      {
        question: 'Qual cupom Denavita vale para quem já é cliente?',
        answer: 'O EMCASA. Ele dá 10% no site oficial para quem compra pela primeira vez e para quem já comprou.',
      },
      {
        question: 'O EMCASA é cupom de influenciadora da Denavita?',
        answer:
          'Sim. EMCASA é o cupom do Em Casa com Cecília na Denavita e dá 10% OFF no site oficial para clientes novos e antigos.',
      },
      {
        question: 'O cupom EMCASA está funcionando hoje?',
        answer:
          'Sim. No teste de carrinho mais recente, o EMCASA foi aceito. A data e os valores do teste estão em "Como testamos o cupom", nesta página.',
      },
      {
        question: 'Onde coloco o cupom na Denavita?',
        answer:
          'No checkout do site oficial, que abre pelo botão Finalizar compra do carrinho: digite EMCASA no campo Tem um cupom?, no resumo, e clique em Adicionar. O resumo passa a mostrar o desconto na linha Cupom de desconto, antes mesmo de preencher a entrega.',
      },
      {
        question: 'Tem cupom Denavita na Black Friday?',
        answer:
          'Tem. O cupom Denavita EMCASA dá 10% OFF no site oficial, em todas as formas de pagamento, e é o mesmo código do resto do ano.',
      },
      {
        question: 'O cupom Denavita vale na Black Friday?',
        answer:
          'Vale. No nosso teste, em novembro, os 10% entraram em cima dos preços em promoção do site. Confira a linha Cupom de desconto no resumo antes de pagar.',
      },
      {
        question: 'O cupom dá frete grátis?',
        answer:
          'O cupom não mexe no frete. O site da Denavita anuncia frete grátis em compras a partir de R$ 199,90, com regras próprias: confira a opção no checkout, depois de informar o CEP.',
      },
      {
        question: 'Como funciona a troca na Denavita?',
        answer:
          'Pela central de ajuda da loja, a desistência pode ser pedida pelo portal de trocas em até 7 dias corridos depois do recebimento, sem abrir a caixa, e produto com defeito ou diferente do pedido, em até 30 dias, com o número do pedido em mãos.',
      },
      {
        question: 'O que fazer se o cupom EMCASA não funcionar?',
        answer:
          'Confira se o código foi digitado no campo Tem um cupom? do checkout, sem espaços, e se a linha Cupom de desconto apareceu no resumo. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.',
      },
      {
        question: 'Comprar com o cupom apoia o Em Casa com Cecília?',
        answer:
          'Sim, a compra pode gerar comissão para o Em Casa com Cecília, sem custo extra para você. O desconto aparece no checkout quando o cupom é aceito.',
      },
    ],
    monthlyHighlight: {
      scope: 'no site oficial',
      note: 'Soma com os preços em promoção do site e com o Pix',
    },
    status: 'ativo',
    featured: false,
  },
  {
    offerMode: 'discount-code',
    slug: 'hostinger',
    cartPrint: { article: 'cupom-hostinger-indicacao', src: '/images/reviews/hostinger/cupom-hostinger-carrinho-com-cupom.webp', alt: 'Resumo do pedido no carrinho da Hostinger com a linha Cupom aplicado e a etiqueta SONAR20', aspectRatio: 1.096 },
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
    hubCard: 'destaque',
    shortDescription: 'compra nova de planos da Hostinger, para clientes novos e antigos',
    longDescription:
      'O cupom Hostinger SONAR20 dá 20% OFF no primeiro período de uma compra nova, para quem está chegando e para quem já é cliente. Nos planos de 12, 24 e 48 meses ele entra; no de 1 mês, depende do plano. Cole o código no campo de cupom do carrinho e confira a linha "Cupom aplicado". O Em Casa com Cecília roda na Hostinger desde 2024.',
    metaTitle: 'Cupom Hostinger: SONAR20 com 20% OFF na compra nova',
    metaTitleMonth: true,
    metaDescription:
      'Cupom Hostinger: SONAR20 dá 20% OFF na compra nova, para cliente novo ou antigo, inclusive na Black Friday, nos planos de 12 meses ou mais.',
    eligibleCategories: 'Compra nova de planos da Hostinger, para clientes novos e antigos, nos ciclos de 12, 24 e 48 meses; no ciclo de 1 mês, depende do plano; a renovação e o domínio avulso saem sem desconto',
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
    lastVerified: '2026-11-23',
    testedAt: '2026-11-23',
    testNote:
      'Aplicamos o SONAR20 no campo "Tem um cupom de desconto?" do carrinho da Hostinger em 23/11/2026, já com os preços de Black Friday. No plano Single de 12 meses, o total foi de R$ 143,88 para R$ 115,10. No Cloud Startup de 1 mês, de R$ 139,99 para R$ 111,99. Nos planos Single e Premium de 1 mês, o carrinho respondeu "O cupom é inválido". No site global, em dólar, no teste de 14/11/2026, o Startup de 48 meses caiu de US$ 383,52 para US$ 306,82.',
    codeFieldLabel: 'Tem um cupom de desconto?',
    codeInstructions: [
      'Copie o código SONAR20 no card acima.',
      'Abra a Hostinger pelo botão desta página, escolha o plano e o período e siga para o carrinho.',
      'No resumo do pedido, clique em "Tem um cupom de desconto?", cole o SONAR20 e clique em Aplicar.',
      'Confira a linha "Cupom aplicado" antes de pagar: no plano de 1 mês, o cupom pode ser recusado. A renovação, no fim do período, sai pelo preço de tabela que aparece abaixo do plano.',
    ],
    aboutBrand:
      'A Hostinger é uma empresa de hospedagem de sites, com planos de hospedagem, criador de sites, VPS, domínios e e-mail. O Em Casa com Cecília roda na Hostinger desde 2024, como aplicação Node.js. O SONAR20 é o cupom da parceria: dá 20% OFF no primeiro período da compra nova, para clientes novos e antigos.',
    faqs: [
      {
        question: 'Qual é o cupom da Hostinger?',
        answer:
          'O cupom da Hostinger é o SONAR20, com 20% OFF no primeiro período de uma compra nova elegível: digite o código no campo "Tem um cupom de desconto?" do carrinho e confira a linha "Cupom aplicado" antes de pagar. A renovação sai pelo preço de tabela, sem desconto.',
      },
      {
        question: 'O cupom SONAR20 da Hostinger está funcionando hoje?',
        answer:
          'Sim. No teste mais recente, o SONAR20 tirou 20% do plano Single de 12 meses no site brasileiro. A data e os valores do teste estão em "Como testamos o cupom", nesta página.',
      },
      {
        question: 'O SONAR20 vale para quem já é cliente da Hostinger?',
        answer: 'Sim, em compra nova: o cupom vale para quem está chegando e para quem já tem conta na Hostinger e contrata um plano novo. Na renovação de um plano, não há desconto.',
      },
      {
        question: 'Tem cupom de primeira compra na Hostinger?',
        answer:
          'Sim. O SONAR20 dá 20% OFF já no primeiro plano, nos ciclos de 12 meses ou mais, e vale também para quem já é cliente.',
      },
      {
        question: 'Existe cupom Hostinger de 15%?',
        answer:
          'O SONAR20 dá mais: 20% OFF na compra nova, para clientes novos e antigos. No teste, os 20% entraram sobre o preço de Black Friday que a Hostinger já mostrava.',
      },
      {
        question: 'O cupom vale no plano mensal?',
        answer:
          'Depende do plano. No nosso teste de novembro, o Cloud Startup de 1 mês caiu de R$ 139,99 para R$ 111,99, mas o carrinho recusou o código no Single e no Premium de 1 mês. Nos ciclos de 12, 24 e 48 meses, os 20% entraram. Confira a linha "Cupom aplicado" antes de pagar.',
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
      scope: 'na compra nova',
      note: 'Vale na compra nova, para clientes novos e antigos, nos planos de 12 meses ou mais (no de 1 mês, depende do plano); a renovação sai sem desconto',
    },
    status: 'ativo',
    featured: false,
  },
  {
    offerMode: 'affiliate-link',
    slug: 'starlink',
    brand: 'Starlink',
    officialUrl: 'https://www.starlink.com/br',
    // Link de indicação da conta do Bruno, como veio dele (19/11/2026): R$ 200 para quem assina pela primeira vez, e o
    // mesmo valor para quem indicou. Não editar nem conferir clicando: a indicação só conta para o pedido feito pelo link.
    offerUrl: 'https://starlink.com/?referral=RC-DF-17132118-63432-88',
    brandIcon: 'S',
    brandLogo: '/images/about/partners/starlink.png',
    brandLogoAlt: 'Marca Starlink',
    // O letreiro é largo e não tem símbolo à parte: ocupa o disco preto quase inteiro, como o selo da Dolce Gusto.
    bubble: { src: '/images/logos/bolinhas/starlink.png', background: '#000000', round: true },
    brandWatermark: '/images/logos/watermarks/starlink.webp',
    brandColor: '#000000',
    discount: 'R$ 200 de bônus',
    offerTypeLabel: 'indicação',
    offerTypeLabelPlural: 'indicações',
    offerActionLabel: 'Receba seus R$ 200',
    cutoutNote: 'Aplicado automaticamente pelo link da Cecília.',
    category: 'Internet via satélite',
    hubCategory: 'diversos',
    hubCard: 'reduzido',
    shortDescription: 'cliente novo: receba R$ 200 do programa oficial de indicação da Starlink pelo link da Cecília',
    longDescription:
      'Cliente novo: receba R$ 200 do programa oficial de indicação da Starlink assinando pelo link da Cecília. A indicação só conta no pedido feito pelo link, em starlink.com, nos planos Residencial e Viagem, e o valor entra depois de dois meses de assinatura, por padrão como crédito na fatura. A Starlink dá 30 dias de teste com reembolso integral.',
    metaTitle: 'Cupom Starlink? Indicação de R$ 200 pelo link da Cecília',
    metaDescription:
      'Indicação Starlink: R$ 200 para quem assina pela primeira vez pelo link da Cecília, em crédito na fatura depois de dois meses. Residencial e Viagem.',
    eligibleCategories:
      'Primeira assinatura de um plano Residencial (Lite, 100 Mbps, 200 Mbps, Residencial e Máx) ou Viagem (100 GB, 300 GB e Ilimitado), pedida em starlink.com pelo link',
    validity: 'Indicação ativa enquanto o programa de indicação da Starlink estiver valendo; o valor é o que a Starlink paga no Brasil',
    reusable: 'Só para quem nunca foi cliente da Starlink: clientes atuais e antigos não recebem o valor',
    shipping: 'O preço do kit e da entrega aparece no pedido, em starlink.com, depois do endereço',
    combinable:
      'Os R$ 200 não são desconto no pedido: entram depois de dois meses de assinatura, e o pedido segue com o preço e as promoções que a Starlink mostrar no dia',
    lastVerified: '2026-11-23',
    linkInstructions: [
      'Toque em “Receba seus R$ 200”: o link da Cecília abre o site oficial da Starlink, sem código para copiar.',
      'Informe o endereço, escolha um plano Residencial ou Viagem e faça o pedido pelo próprio link: pedido sem o link, por revendedor ou em marketplace não conta como indicação, e ela não pode ser incluída depois.',
      'Pague o primeiro mês e ative o kit.',
      'Com dois meses de assinatura, os R$ 200 entram na conta, por padrão como crédito descontado da fatura seguinte.',
    ],
    linkNote:
      'A indicação vale só para quem nunca foi cliente da Starlink e só no pedido feito em starlink.com pelo link. Quem indicou recebe o mesmo valor.',
    aboutBrand:
      'A Starlink é a internet via satélite da SpaceX, com planos residenciais e de viagem e um kit de configuração plug and play. No Brasil, o pedido é feito em starlink.com, com 30 dias de teste e reembolso integral. Esta página traz o link de indicação da Cecília: quem assina por ele pela primeira vez recebe R$ 200, e o Em Casa com Cecília recebe o mesmo valor, sem custo adicional para quem assina.',
    faqs: [
      {
        question: 'Tem cupom de desconto da Starlink?',
        answer:
          'Não há código para colar: o benefício é o link de indicação da Cecília. Quem assina a Starlink pela primeira vez por ele recebe R$ 200 depois de dois meses de assinatura, por padrão como crédito na fatura.',
      },
      {
        question: 'Como funciona a indicação da Starlink?',
        answer:
          'Pela central de ajuda da Starlink, lida em 19/11/2026, quem assina pelo link e quem indicou recebem o mesmo valor depois que a nova assinatura completa dois meses. No Brasil, o valor é R$ 200. Por padrão, o valor entra como crédito de serviço e é descontado da fatura seguinte. Onde a Starlink oferece, dá para trocar por dinheiro na aba Indicações da conta.',
      },
      {
        question: 'Quem pode receber os R$ 200 da indicação?',
        answer:
          'Quem nunca foi cliente da Starlink e assina um plano Residencial ou Viagem em starlink.com pelo link. Clientes atuais e antigos não recebem, e kits de revendedor, compras em marketplace e transferências de conta não entram.',
      },
      {
        question: 'O link de indicação da Starlink vale fora do Brasil?',
        answer:
          'Vale. Pela central de ajuda da Starlink, a indicação funciona na maioria dos países onde a Starlink está disponível, sempre com o pedido feito em starlink.com pelo link. O valor depende do país em que a pessoa se cadastra: os R$ 200 valem para o Brasil, e em outro país o valor pode ser diferente.',
      },
      {
        question: 'Comprei a Starlink sem o link. Dá para incluir a indicação depois?',
        answer:
          'Não. Pela central de ajuda da Starlink, a indicação só é registrada quando o pedido é feito pelo link; pedido sem ele, ou pelo link de outra pessoa, não pode ser ajustado depois.',
      },
      {
        question: 'A Starlink tem período de teste?',
        answer:
          'Tem. Pela página da Starlink lida em 19/11/2026, são 30 dias de teste: se não ficar satisfeito, a Starlink devolve o valor integral.',
      },
      {
        question: 'Preciso copiar algum código para receber os R$ 200?',
        answer:
          'Não. Basta fazer o pedido em starlink.com pelo botão desta página: o link já leva a indicação, e o valor aparece depois na aba Indicações da sua conta Starlink.',
      },
      {
        question: 'Assinar pelo link apoia o Em Casa com Cecília?',
        answer:
          'Sim. Pelo programa da Starlink, quem indicou recebe o mesmo valor de quem assina, sem custo adicional para você.',
      },
    ],
    status: 'ativo',
    featured: false,
  },
  {
    offerMode: 'discount-code',
    slug: 'biobio',
    brand: 'BioBio',
    officialUrl: 'https://biobio.com.br/',
    // A parceria não tem link próprio (Bruno, 20/11/2026): o botão abre o site oficial.
    offerUrl: 'https://biobio.com.br/',
    brandIcon: 'BB',
    brandLogo: '/images/about/partners/biobio.png',
    brandLogoAlt: 'Marca BioBio',
    // O letreiro é largo e não tem símbolo à parte: ocupa o disco laranja quase inteiro, como o da Starlink.
    bubble: { src: '/images/logos/bolinhas/biobio.png', background: '#F09604', round: true },
    brandWatermark: '/images/logos/watermarks/biobio.webp',
    brandColor: '#F09604',
    cartPrint: {
      article: 'cupom-biobio-como-usar',
      src: '/images/reviews/biobio/cupom-biobio-checkout-com-cupom.webp',
      alt: 'Resumo da compra no checkout da BioBio com o cupom EMCASABIOBIO aplicado: desconto de R$ 10,49 sobre R$ 104,93, total de R$ 94,44 e 10% de cashback para a próxima compra',
      aspectRatio: 0.64,
    },
    code: 'EMCASABIOBIO',
    codeFieldLabel: 'Cupom (opcional)',
    discount: '10% OFF',
    discountNumber: 10,
    category: 'Protetor solar, maquiagem com FPS e skincare naturais',
    hubCategory: 'beleza',
    shortDescription: 'protetor solar, maquiagem com FPS e skincare da BioBio, inclusive os produtos em promoção',
    longDescription:
      'O cupom BioBio EMCASABIOBIO dá 10% OFF no site oficial, para quem compra pela primeira vez e para quem já é cliente, e soma com as promoções e com o cashback da loja: no nosso teste, os 10% entraram num protetor solar que já estava em promoção, e o checkout seguiu mostrando os 10% de cashback para a próxima compra.',
    metaTitle: 'Cupom BioBio: 10% OFF com EMCASABIOBIO',
    metaTitleMonth: true,
    metaDescription:
      'Cupom BioBio: EMCASABIOBIO dá 10% OFF em protetor solar e maquiagem com FPS, soma com promoção e com o cashback da loja. Testado no checkout.',
    eligibleCategories: 'Produtos do site oficial da BioBio, inclusive os que estão em promoção',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Pode ser usado por clientes novos e antigos',
    shipping: 'Frete grátis para o Sul e o Sudeste em compras acima de R$ 279, segundo a loja; nas outras regiões e abaixo disso, o frete sai pelo CEP',
    combinable: 'Soma com as promoções do site e com o cashback de 10% da loja',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Entra sobre o preço promocional: no teste, o protetor de R$ 139,90 por R$ 104,93 também ganhou os 10%' },
      { benefit: 'cashback', stacks: 'sim', condition: 'Com o cupom, o checkout seguiu mostrando os 10% de cashback para a próxima compra; a loja diz que saldo e cupom entram na mesma compra' },
      { benefit: 'pix', stacks: 'sim', condition: 'O cupom vale no Pix e nas outras formas de pagamento; desconto próprio no Pix é critério da loja' },
      { benefit: 'frete', stacks: 'depende', condition: 'Grátis para o Sul e o Sudeste acima de R$ 279, segundo a loja; abaixo disso e nas outras regiões, o frete sai pelo CEP' },
    ],
    paymentPerks: ['Até 8x sem juros no cartão de crédito'],
    lastVerified: '2026-11-20',
    testedAt: '2026-11-20',
    testNote:
      'Num carrinho com o Protetor Solar 100% Físico e Mineral (Sunnature FPS 30) em promoção, de R$ 139,90 por R$ 104,93, o EMCASABIOBIO tirou R$ 10,49, 10% do pedido, e o total caiu para R$ 94,44. O resumo da compra seguiu mostrando os 10% de cashback para a próxima compra.',
    codeInstructions: [
      'Copie o código EMCASABIOBIO no card acima.',
      'Acesse o site oficial da BioBio pelo botão indicado, adicione os produtos ao carrinho e clique em Finalizar compra.',
      'No Resumo da compra, ao lado dos seus dados, clique em Inserir cupom de desconto, digite o código no campo Cupom (opcional) e clique em Adicionar.',
      'Confira a linha Cupom de desconto, com o valor, e o total antes de seguir para a entrega e o pagamento.',
    ],
    aboutBrand:
      'A BioBio é uma marca brasileira de dermocosméticos de origem natural e veganos: protetores solares minerais, maquiagens com FPS em bastão, como a base multifuncional e o BBS, pó facial com FPS e skincare, vendidos no site oficial. O cupom EMCASABIOBIO é o benefício da parceria para quem acompanha o Em Casa com Cecília: 10% OFF, também sobre os produtos em promoção.',
    faqs: [
      {
        question: 'Quanto de desconto o cupom EMCASABIOBIO dá na BioBio?',
        answer:
          '10% OFF nos produtos do site oficial. No nosso teste, o cupom tirou R$ 10,49 de um protetor solar de R$ 104,93, e o resumo da compra mostrou o valor na linha Cupom de desconto.',
      },
      {
        question: 'O cupom BioBio vale na primeira compra?',
        answer: 'Sim. O EMCASABIOBIO vale na primeira compra e também para quem já comprou na loja.',
      },
      {
        question: 'Qual cupom BioBio vale para quem já é cliente?',
        answer: 'O EMCASABIOBIO. Ele dá 10% no site oficial para quem compra pela primeira vez e para quem já comprou.',
      },
      {
        question: 'O EMCASABIOBIO é cupom de influenciadora da BioBio?',
        answer: 'Sim. EMCASABIOBIO é o cupom do Em Casa com Cecília na BioBio e dá 10% OFF no site oficial.',
      },
      {
        question: 'O cupom BioBio soma com produtos em promoção?',
        answer:
          'Sim. No nosso teste, o Protetor Solar 100% Físico e Mineral estava em promoção, de R$ 139,90 por R$ 104,93, e o cupom tirou os 10% dele também.',
      },
      {
        question: 'O cupom BioBio soma com o cashback?',
        answer:
          'Soma. Com o EMCASABIOBIO aplicado, o resumo da compra seguiu mostrando 10% de cashback para a próxima compra, e a página de cashback da loja diz que saldo e cupom entram na mesma compra. Segundo a loja, o cashback vale em pedidos a partir de R$ 99,90, e o saldo fica disponível por 45 dias.',
      },
      {
        question: 'O cupom EMCASABIOBIO está funcionando hoje?',
        answer:
          'Sim. No teste de carrinho mais recente, o EMCASABIOBIO foi aceito. A data e os valores do teste estão em "Como testamos o cupom", nesta página.',
      },
      {
        question: 'Onde coloco o cupom na BioBio?',
        answer:
          'No checkout do site oficial, que abre pelo botão Finalizar compra do carrinho: no Resumo da compra, clique em Inserir cupom de desconto, digite EMCASABIOBIO no campo Cupom (opcional) e clique em Adicionar. O cupom entra antes mesmo de você preencher os dados de entrega.',
      },
      {
        question: 'Tem cupom BioBio na Black Friday?',
        answer:
          'Tem. O cupom BioBio EMCASABIOBIO dá 10% OFF no site oficial e, no nosso teste de novembro, entrou também num protetor solar em promoção do Black Month da loja.',
      },
      {
        question: 'O cupom dá frete grátis?',
        answer:
          'O cupom não mexe no frete, mas a loja dá frete grátis para o Sul e o Sudeste em compras acima de R$ 279. Nas outras regiões, e abaixo desse valor, o frete aparece no checkout depois do CEP.',
      },
      {
        question: 'Como funciona a troca na BioBio?',
        answer:
          'Pela política da loja, a desistência pode ser pedida em até 7 dias corridos depois do recebimento, com o produto na embalagem original, sem uso e com o lacre inviolado. O pedido é feito pelo e-mail sac@biobio.com.br ou pelo WhatsApp do SAC, com o número do pedido.',
      },
      {
        question: 'O que fazer se o cupom EMCASABIOBIO não funcionar?',
        answer:
          'Confira se o código foi digitado inteiro, sem espaços, no campo Cupom (opcional) do resumo da compra, e se clicou em Adicionar. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.',
      },
      {
        question: 'Comprar com o cupom apoia o Em Casa com Cecília?',
        answer:
          'Sim, a compra pode gerar comissão para o Em Casa com Cecília, sem custo extra para você. O desconto aparece no checkout quando o cupom é aceito.',
      },
    ],
    monthlyHighlight: {
      scope: 'no site oficial',
      note: 'Soma com os preços em promoção e com o cashback da loja',
    },
    status: 'ativo',
    featured: false,
  },
  {
    offerMode: 'discount-code',
    slug: 'oceane',
    brand: 'Océane',
    officialUrl: 'https://www.oceane.com.br/',
    // Link da parceria como veio (Bruno, 23/11/2026): o site oficial com o parâmetro da campanha.
    offerUrl: 'https://www.oceane.com.br/?utmi_pc=emcasa',
    brandIcon: 'OC',
    brandLogo: '/images/about/partners/oceane.png',
    brandLogoAlt: 'Marca Océane',
    // O letreiro é largo: ocupa o disco grafite quase inteiro, como o da BioBio.
    bubble: { src: '/images/logos/bolinhas/oceane.png', background: '#383935', round: true },
    brandWatermark: '/images/logos/watermarks/oceane.webp',
    brandColor: '#383935',
    cartPrint: {
      src: '/images/reviews/oceane/cupom-oceane-sacola-app-com-cupom.webp',
      alt: 'Sacola do aplicativo da Océane com o cupom EMCASA aplicado: subtotal de R$ 201,70, desconto de R$ 20,17 e total de R$ 181,53',
      aspectRatio: 0.5,
    },
    code: 'EMCASA',
    codeFieldLabel: 'Cupom de desconto',
    discount: '10% OFF',
    discountNumber: 10,
    category: 'Maquiagem, skincare, cabelos e bem-estar',
    hubCategory: 'beleza',
    shortDescription: 'maquiagem, skincare e cabelos da Océane, no site e no app, inclusive os produtos com preço especial',
    longDescription:
      'O cupom Océane EMCASA dá 10% OFF no site oficial e no aplicativo, para quem compra pela primeira vez e para quem já é cliente, e soma com os preços especiais: no nosso teste no app, os 10% entraram em duas peças da Océane Edition que já estavam com preço especial.',
    metaTitle: 'Cupom Océane: 10% OFF com EMCASA',
    metaTitleMonth: true,
    metaDescription:
      'Cupom Océane: EMCASA dá 10% OFF em maquiagem e skincare, no site e no app, e soma com os preços especiais. Vale para clientes novos e antigos.',
    eligibleCategories: 'Produtos do site oficial e do aplicativo da Océane, inclusive os que estão com preço especial',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Pode ser usado por clientes novos e antigos',
    shipping: 'Frete calculado pelo CEP. Segundo a loja, o frete grátis vale acima de um valor mínimo, que pode variar por estado; aplique o cupom, informe o CEP e confira o total com frete',
    combinable: 'Soma com as promoções testadas: preços especiais do app, itens da Black Month e kits Minis Edition. Em combos “Leve X por R$ Y” ou pedidos com brinde, confira na sacola se o desconto continua aplicado',
    stacking: [
      { benefit: 'promocoes', stacks: 'sim', condition: 'Entra sobre o preço especial: no teste no app, a Face Palette e o Mini Retouch já estavam com desconto e ganharam os 10%' },
      { benefit: 'pix', stacks: 'sim', condition: 'O cupom vale no Pix e nas outras formas de pagamento; desconto próprio no Pix é critério da loja' },
      { benefit: 'frete', stacks: 'depende', condition: 'Frete grátis acima de um valor mínimo, que pode variar por estado, segundo a loja; aplique o cupom, informe o CEP e confira o total com frete' },
    ],
    paymentPerks: ['Até 6x sem juros no cartão de crédito, com parcela mínima de R$ 30, segundo a loja'],
    lastVerified: '2026-11-23',
    testedAt: '2026-11-23',
    testNote:
      'No aplicativo, numa sacola de R$ 201,70 com a Face Palette e o Mini Retouch da Océane Edition em preço especial e o Repair Eye Cream, o EMCASA tirou R$ 20,17, 10% do pedido, e o total caiu para R$ 181,53. No site, o Repair Eye Cream de R$ 65,90 ficou em R$ 59,31 com o cupom na sacola: R$ 6,59 a menos.',
    codeInstructions: [
      'Copie o código EMCASA no card acima.',
      'Acesse o site oficial da Océane pelo botão indicado, adicione os produtos à sacola e siga para a sacola de compras.',
      'Na sacola, digite o código no campo Cupom de desconto e clique em Adicionar.',
      'Confira a linha Descontos e o total antes de clicar em Continuar pagamento. No aplicativo, o cupom entra na Sacola, antes de Finalizar Compra.',
    ],
    aboutBrand:
      'A Océane é uma marca brasileira de beleza com quinze anos, vendida no site oficial, no aplicativo e nas lojas próprias: maquiagem, como as paletas e os pós da linha Océane Edition, skincare com produtos feitos na Coreia do Sul, cuidados para cabelos e acessórios de bem-estar. O cupom EMCASA é o benefício da parceria para quem acompanha o Em Casa com Cecília: 10% OFF, também sobre os preços especiais.',
    faqs: [
      {
        question: 'Quanto de desconto o cupom EMCASA dá na Océane?',
        answer:
          '10% OFF. No nosso teste no aplicativo, o cupom tirou R$ 20,17 de uma sacola de R$ 201,70, e o total ficou em R$ 181,53. No site, os mesmos 10% tiraram R$ 6,59 de um creme para a área dos olhos de R$ 65,90.',
      },
      {
        question: 'O cupom Océane vale na primeira compra?',
        answer: 'Sim. O EMCASA vale na primeira compra e também para quem já comprou na Océane.',
      },
      {
        question: 'Qual cupom Océane vale para quem já é cliente?',
        answer: 'O EMCASA. Ele dá 10% no site e no aplicativo para quem compra pela primeira vez e para quem já comprou.',
      },
      {
        question: 'O EMCASA é cupom de influenciadora da Océane?',
        answer: 'Sim. EMCASA é o cupom do Em Casa com Cecília na Océane e dá 10% OFF no site oficial e no aplicativo.',
      },
      {
        question: 'O cupom Océane vale no aplicativo?',
        answer:
          'Vale. No nosso teste no aplicativo da Océane, o EMCASA entrou na Sacola e tirou 10% do pedido, inclusive dos produtos com preço especial do app.',
      },
      {
        question: 'O cupom Océane soma com produtos em promoção?',
        answer:
          'Sim. No nosso teste no app, a Face Palette e o Mini Retouch da Océane Edition já estavam com preço especial, e o cupom tirou os 10% deles também. Nos testes, ele também entrou em itens da Black Month e nos kits Minis Edition. Em combos “Leve X por R$ Y” ou pedidos com brinde, confira na sacola se o desconto continua aplicado.',
      },
      {
        question: 'O cupom EMCASA está funcionando hoje?',
        answer:
          'Sim. No teste de carrinho mais recente, o EMCASA foi aceito. A data e os valores do teste estão em "Como testamos o cupom", nesta página.',
      },
      {
        question: 'Onde coloco o cupom na Océane?',
        answer:
          'Na sacola: no site, digite EMCASA no campo Cupom de desconto e clique em Adicionar, antes de Continuar pagamento; no aplicativo, o cupom entra na Sacola, antes de Finalizar Compra. O desconto aparece no resumo antes de você preencher os dados de entrega.',
      },
      {
        question: 'Tem cupom Océane na Black Friday?',
        answer:
          'Tem. O cupom Océane EMCASA dá 10% OFF no site e no aplicativo e, nos nossos testes de novembro, entrou também nos itens da Black Month e nos produtos com preço especial do app.',
      },
      {
        question: 'O cupom dá frete grátis?',
        answer:
          'Aplique o cupom, informe o CEP e confira o total com frete. Segundo a política de entrega da Océane, o frete grátis vale acima de um valor mínimo, que pode variar por estado e só existe em algumas regiões.',
      },
      {
        question: 'Como funciona a troca na Océane?',
        answer:
          'Pela política da loja, a devolução pode ser pedida em até 7 dias corridos depois do recebimento, e o produto com defeito, em até 30 dias, sem sinais de uso, na embalagem original e com a nota fiscal. O pedido é feito pelo e-mail info@oceane.com.br, e a troca sai como vale-compras. Pelo Código de Defesa do Consumidor, a desistência da compra online em até 7 dias dá direito a reembolso, e o prazo para reclamar de defeito é de 30 dias para produto não durável e de 90 para durável.',
      },
      {
        question: 'O que fazer se o cupom EMCASA não funcionar?',
        answer:
          'Confira se o código foi digitado inteiro, sem espaços, no campo Cupom de desconto da sacola, e se a linha Descontos apareceu no resumo. Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.',
      },
      {
        question: 'Comprar com o cupom apoia o Em Casa com Cecília?',
        answer:
          'Sim, a compra pode gerar comissão para o Em Casa com Cecília, sem custo extra para você. O desconto aparece na sacola quando o cupom é aceito.',
      },
    ],
    monthlyHighlight: {
      scope: 'no site oficial e no app',
      note: 'Soma com os preços especiais do site e do aplicativo',
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

const HUB_CARD_ORDER = { destaque: 0, auto: 1, reduzido: 2 } as const;

export function getCouponHubSections() {
  const activeCoupons = getActiveCoupons();

  return {
    featured: activeCoupons.filter((coupon) => coupon.featured),
    categories: COUPON_HUB_CATEGORIES.map((category) => ({
      ...category,
      coupons: activeCoupons
        .filter((coupon) => coupon.hubCategory === category.id)
        .sort((a, b) => HUB_CARD_ORDER[a.hubCard ?? 'auto'] - HUB_CARD_ORDER[b.hubCard ?? 'auto']),
    })).filter((category) => category.coupons.length > 0),
  };
}
