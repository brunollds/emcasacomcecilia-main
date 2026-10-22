import { getPrimaryRewardCode, getLatestYesStyleVerifiedAtISO } from './yesstyleCoupons';

export interface CouponFAQ {
  question: string;
  answer: string;
  // Link de afiliado da marca no Mercado Livre, como veio do Bruno. Sai como sponsored e o clique é medido.
  mercadoLivreUrl?: string;
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

export interface CouponCampaign {
  title: string;
  code: string;
  offerUrl: string;
  description: string;
  eligibility: string;
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

interface CouponBase {
  slug: string;
  brand: string;
  officialUrl: string;
  offerUrl: string;
  brandIcon: string;
  brandLogo?: string;
  brandLogoAlt?: string;
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
  monthlyHighlight?: {
    scope: string;
    note: string;
    showCheckoutReminder?: boolean;
  };
  affiliateAccountId?: string;
  referral?: CouponReferral;
  campaigns?: CouponCampaign[];
}

export type CouponCodeOffer = CouponBase & {
  offerMode: 'discount-code';
  code: string;
  discountNumber: number;
  // O que a equipe viu no teste de checkout mais recente; a data é o lastVerified. Com ele, a página
  // diz "Cupom testado em" e ganha a seção "Como testamos o cupom".
  testNote?: string;
  // O código vai num campo próprio do checkout e não é cupom (o CECILIA010 da YesStyle).
  codeKind?: 'reward';
  codeFieldLabel?: string;
  codeInstructions?: string[];
  history?: CouponHistory[];
  tiers?: {
    code: string;
    discount: string;
    minPurchase: string;
  }[];
};

export type AffiliateLinkOffer = CouponBase & {
  offerMode: 'affiliate-link';
  linkInstructions?: string[];
  // Aviso no fim de "Como acessar a oferta"; sem ele a página usa o aviso padrão de link.
  linkNote?: string;
};

export type Coupon = CouponCodeOffer | AffiliateLinkOffer;

export const COUPONS: Coupon[] = [
  {
    offerMode: 'discount-code',
    slug: 'damie',
    brand: 'DAMIE',
    officialUrl: 'https://damie.com.br',
    offerUrl: 'https://damie.com.br',
    brandIcon: 'D',
    brandLogo: '/images/about/partners/damie.jpg',
    brandLogoAlt: 'Marca DAMIE',
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
      'Use CECILIA12 para ganhar 12% OFF em todos os produtos do site da DAMIE, com qualquer forma de pagamento disponível no checkout.',
    metaTitle: 'Cupom DAMIE CECILIA12: 12% OFF em todo o site',
    metaDescription:
      'Cupom DAMIE CECILIA12: 12% OFF em todos os produtos do site e em todas as formas de pagamento disponíveis, inclusive Pix e cartão.',
    eligibleCategories:
      'Todos os produtos do site DAMIE',
    validity: 'Cupom permanente enquanto a parceria estiver ativa',
    reusable: 'Sim, sem limite de usos por CPF',
    shipping: 'Calculado separadamente, conforme política da loja',
    combinable:
      'Soma com todas as promoções e descontos do site, inclusive os 10% do Pix e o desconto por quantidade dos consultores no WhatsApp; não soma com outro cupom nem com o giftback de 15%',
    lastVerified: '2026-10-01',
    testNote:
      'Aplicamos o CECILIA12 no checkout do site da DAMIE, e os 12% de desconto apareceram no resumo do pedido.',
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
        question: 'O cupom inclui frete grátis?',
        answer:
          'Não. O cupom aplica desconto no valor dos produtos. O frete é calculado separadamente pela loja conforme CEP, produto e política de entrega.',
      },
      {
        question: 'A Cecília testou produtos da DAMIE?',
        answer:
          'Sim. Há reviews e vídeos de produtos DAMIE usados pela Cecília em casa, incluindo poltronas e sofá modular. A página de cupom também aponta para esses conteúdos relacionados.',
      },
      {
        question: 'O cupom CECILIA12 tem validade?',
        answer:
          'O cupom está ativo enquanto a parceria estiver vigente. Esta página mostra a data da última verificação para você saber quando a informação foi revisada.',
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
    brand: 'Dolce Gusto',
    officialUrl: 'https://www.nescafe-dolcegusto.com.br/',
    offerUrl: 'https://www.nescafe-dolcegusto.com.br/',
    brandIcon: 'DG',
    brandLogo: '/images/about/partners/dolce-gusto.avif',
    brandLogoAlt: 'Marca Nescafé Dolce Gusto',
    brandWatermark: '/images/logos/watermarks/dolce-gusto.webp',
    // O logo é AVIF, que o cartão do X não mostra: o compartilhamento usa a capa do guia do cupom.
    socialImage: '/images/reviews/cupons/nescafe-dolce-gusto-hero.webp',
    socialImageAlt: 'Cecília com uma xícara de café ao lado da máquina Dolce Gusto e do cupom CECI',
    brandColor: '#7E2A1A',
    code: 'CECI',
    discount: '5% OFF',
    discountNumber: 5,
    category: 'Café e bebidas',
    hubCategory: 'alimentacao',
    shortDescription: 'cápsulas, máquinas e acessórios da loja oficial',
    longDescription:
      'Código da Cecília para economizar em compras na loja oficial Nescafé Dolce Gusto Brasil.',
    metaTitle: 'Cupom Dolce Gusto Outubro 2026: CECI — 5% OFF na Loja Oficial',
    metaDescription:
      'Cupom Dolce Gusto confirmado para outubro de 2026: use CECI no checkout da loja oficial Nescafé Dolce Gusto e ganhe 5% OFF em compras a partir de R$ 100.',
    eligibleCategories:
      'Todo o site oficial Dolce Gusto, em compras a partir de R$ 100',
    validity: 'Cupom permanente enquanto a parceria estiver ativa',
    reusable: 'Sim, até 3 usos por CPF',
    shipping: 'Calculado separadamente, conforme política da loja',
    combinable: 'Soma com as promoções vigentes da loja oficial',
    lastVerified: '2026-10-01',
    testNote:
      'Aplicamos o CECI no checkout da loja oficial Dolce Gusto, num carrinho acima de R$ 100, e os 5% de desconto apareceram no resumo do pedido.',
    aboutBrand:
      'A Nescafé Dolce Gusto é uma linha de cafés e bebidas em cápsulas da Nestlé, com máquinas e sabores pensados para preparo rápido em casa. A marca combina praticidade com variedade: cafés intensos, bebidas com leite, cappuccinos, chocolates e opções geladas aparecem no catálogo da loja oficial. O cupom CECI entra como benefício para quem acompanha a Cecília e quer economizar em compras na loja oficial. Como em toda parceria comercial, a recomendação deve ser conferida no checkout: o desconto aparece antes da finalização quando a regra da campanha permite.',
    faqs: [
      {
        question: 'O cupom CECI vale para todas as cápsulas Dolce Gusto?',
        answer:
          'Em nossa verificação de 1º de outubro de 2026, o CECI aplicou 5% OFF no site oficial Dolce Gusto em compras a partir de R$ 100. A elegibilidade pode variar; confirme o desconto no resumo do carrinho antes de finalizar.',
      },
      {
        question: 'O cupom CECI funciona em máquinas Dolce Gusto?',
        answer:
          'Pode funcionar em máquinas Dolce Gusto. Caso algum produto tenha uma campanha própria ou restrição comercial, o checkout informa se o cupom é aceito.',
      },
      {
        question: 'Posso usar o cupom CECI mais de uma vez?',
        answer:
          'Sim, o cupom aceita até 3 usos por CPF. Depois disso, o checkout deixa de aplicar o desconto para o mesmo cadastro.',
      },
      {
        question: 'O cupom CECI vale no Mercado Livre?',
        answer:
          'Não. O CECI é usado no checkout do site oficial da Dolce Gusto e não vale no Mercado Livre nem em outros marketplaces. Pelo Mercado Livre, vale o preço do anúncio, sem o cupom.',
        mercadoLivreUrl: 'https://meli.la/1Dj5ZpJ',
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
    ],
    status: 'ativo',
    featured: true,
    relatedContent: [
      {
        title: 'Cupom CECI NESCAFÉ Dolce Gusto: como usar o desconto de 5% (OUTUBRO 2026)',
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
    brand: 'Nestlé Nutre',
    officialUrl: 'https://www.nestlenutre.com.br/',
    offerUrl: 'https://www.nestlenutre.com.br/',
    brandIcon: 'N',
    brandLogo: '/images/about/partners/nutren.png',
    brandLogoAlt: 'Marca Nestlé Nutre',
    brandWatermark: '/images/logos/watermarks/nutren.webp',
    brandColor: '#0056A4',
    code: 'CECI',
    discount: '10% OFF',
    discountNumber: 10,
    category: 'Nutrição e bem-estar',
    hubCategory: 'alimentacao',
    shortDescription: 'produtos Nestlé Nutre, exceto Alfamino, Alfaré e fórmulas infantis de 0 a 12 meses',
    longDescription:
      'Código da Cecília para economizar em produtos Nestlé Nutre na loja oficial, exceto Alfamino, Alfaré e fórmulas infantis para bebês de 0 a 12 meses, como NAN.',
    metaTitle: 'Cupom Nestlé Nutre Outubro 2026: CECI — 10% OFF na Loja Oficial',
    metaDescription:
      'Cupom Nestlé Nutre confirmado para outubro de 2026: use CECI no checkout da loja oficial e ganhe 10% OFF. Não vale para Alfamino, Alfaré nem fórmulas infantis de 0 a 12 meses, como NAN.',
    eligibleCategories:
      'Produtos Nestlé Nutre, exceto Alfamino, Alfaré e fórmulas infantis para bebês de 0 a 12 meses (como NAN)',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping: 'Calculado separadamente, conforme política da loja',
    combinable: 'Soma com as promoções vigentes da loja oficial',
    lastVerified: '2026-10-04',
    testNote:
      'Num carrinho de R$ 1.121,84, o CECI aplicou R$ 112,18 de desconto, os 10%, e o total caiu para R$ 1.009,66.',
    aboutBrand:
      'A Nestlé Nutre é uma loja oficial da Nestlé voltada a produtos de nutrição e suplementação, com opções para diferentes rotinas e necessidades alimentares. Os produtos disponíveis podem fazer parte do dia a dia de quem busca praticidade na alimentação, sempre conforme as indicações do rótulo e, quando necessário, com orientação de um profissional de saúde. O cupom CECI foi criado para quem acompanha o Em Casa com Cecília e quer economizar na loja oficial, com exceção de Alfamino e Alfaré. A loja também vende fórmulas infantis NAN para bebês de 0 a 12 meses; nesses produtos o cupom não deve ser usado, porque o art. 5º do Decreto 9.579/2018 proíbe cupons e descontos promocionais em fórmulas para lactentes, inclusive na internet. Como em toda parceria comercial, a recomendação é conferir o desconto aplicado no checkout antes de finalizar a compra.',
    faqs: [
      {
        question: 'O cupom CECI vale para todos os produtos Nestlé Nutre?',
        answer:
          'Não para todos. O cupom vale para produtos Nestlé Nutre, com exceção de Alfamino, Alfaré e das fórmulas infantis para bebês de 0 a 12 meses, como NAN. Confirme se o desconto aparece no checkout antes de finalizar.',
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
        question: 'O cupom CECI vale no Mercado Livre?',
        answer:
          'Não. O CECI é usado no checkout do site oficial da Nestlé Nutre e não vale no Mercado Livre nem em outros marketplaces. Pelo Mercado Livre, vale o preço do anúncio, sem o cupom.',
        mercadoLivreUrl: 'https://meli.la/2zH895L',
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
    brand: 'I Wanna Sleep',
    officialUrl: 'https://www.iwannasleep.com.br',
    offerUrl: 'https://www.iwannasleep.com.br',
    brandIcon: 'IWS',
    brandLogo: '/images/about/partners/i-wanna-sleep.avif',
    brandLogoAlt: 'Marca I Wanna Sleep',
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
      'Código da Cecília para economizar em compras no site da I Wanna Sleep.',
    metaTitle: 'Cupom I Wanna Sleep Outubro 2026: CECIEMCASA — 10% OFF',
    metaDescription:
      'Cupom I Wanna Sleep confirmado para outubro de 2026: use CECIEMCASA no checkout e ganhe 10% OFF em todo o site oficial.',
    eligibleCategories:
      'Todo o site I Wanna Sleep',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping: 'Calculado separadamente, conforme política da loja',
    combinable: 'Soma com as promoções vigentes da loja oficial',
    lastVerified: '2026-10-01',
    testNote:
      'Aplicamos o CECIEMCASA no checkout do site da I Wanna Sleep, e os 10% de desconto apareceram no resumo do pedido.',
    aboutBrand:
      'A I Wanna Sleep é uma marca focada em produtos para sono, conforto e bem-estar do quarto, como colchões, travesseiros, lençóis e acessórios pensados para rotinas de descanso. O cupom CECIEMCASA entra como benefício para quem acompanha o Em Casa com Cecília e quer economizar no site oficial. Como regras de desconto, frete e aplicação podem variar por campanha e produto, a recomendação é sempre conferir o desconto no checkout antes de finalizar a compra.',
    faqs: [
      {
        question: 'O cupom CECIEMCASA vale para todos os produtos da I Wanna Sleep?',
        answer:
          'O cupom vale para compras no site da I Wanna Sleep. Confirme se o desconto aparece no checkout antes de finalizar.',
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
    brand: 'Magalu',
    officialUrl: 'https://www.magazineluiza.com.br/',
    offerUrl: 'https://www.magazinevoce.com.br/magazineemcasacomcecilia/',
    brandIcon: 'M',
    brandLogo: '/images/about/partners/magalu.webp',
    brandLogoAlt: 'Marca Magalu (Magazine Luiza)',
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
      'Códigos exclusivos da parceria da Cecília com o Magalu, em 10 faixas de R$ 10 a R$ 100 OFF conforme o valor do carrinho. Válidos apenas na loja Magazine Você da Cecília, em produtos vendidos e entregues pelo Magalu.',
    metaTitle: 'Cupom Magalu Outubro 2026: 100EMCASACOMCECILIA até R$ 100 OFF',
    metaDescription:
      'Cupom Magalu confirmado para outubro de 2026: use 100EMCASACOMCECILIA e ganhe até R$ 100 OFF na loja Magazine Você da Cecília. Válido só no navegador — veja todas as faixas.',
    eligibleCategories:
      'Produtos vendidos e entregues pelo Magalu, conforme a faixa de valor mínimo de cada cupom',
    validity: 'Cupons ativos enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja Magazine Você',
    shipping: 'Calculado separadamente, conforme política do Magalu',
    combinable:
      'Soma com as promoções vigentes da loja e com o desconto do Pix; confirme o valor no checkout',
    lastVerified: '2026-10-01',
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
          'A última confirmação dos 10 códigos foi em 1º de outubro de 2026. Todos estavam ativos. Esta página é atualizada sempre que algo muda na campanha — se um código deixar de funcionar, o aviso aparece aqui.',
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
    brand: "Let's Eat It",
    officialUrl: 'https://letseatit.com.br/',
    offerUrl:
      'https://letseatit.com.br/?utm_source=embaixador&utm_medium=emcasacomcecilia&utm_campaign=inbazz&utm_content=organico',
    brandIcon: 'LEI',
    brandLogo: '/images/about/partners/letseatit-icon.png',
    brandLogoAlt: "Marca Let's Eat It",
    brandWatermark: '/images/logos/watermarks/letseatit.webp',
    brandColor: '#56624B',
    code: 'MAUAD',
    discount: '5% OFF',
    discountNumber: 5,
    category: 'Casa, cozinha e presentes',
    hubCategory: 'casa',
    shortDescription: "todo o site Let's Eat It",
    longDescription:
      "Código da Cecília para economizar em compras de cozinha, mesa posta, decoração e presentes no site da Let's Eat It.",
    metaTitle: "Cupom Let's Eat It Outubro 2026: MAUAD — 5% OFF no Site",
    metaDescription:
      "Cupom Let's Eat It confirmado para outubro de 2026: use MAUAD no checkout e ganhe 5% OFF no site oficial de casa, cozinha, mesa posta e presentes.",
    eligibleCategories: "Todo o site Let's Eat It, conforme regras da loja",
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping: 'Calculado separadamente, conforme política da loja',
    combinable:
      'Soma com as promoções vigentes do site, inclusive em pré-venda (teste de 02/10/2026), e com o desconto de 5% do Pix; vale com todas as formas de pagamento; a soma com outros cupons segue as regras da loja',
    lastVerified: '2026-10-02',
    testNote:
      'O MAUAD foi aceito num carrinho com um item em pré-venda e outro com preço promocional, com R$ 179,10 de desconto sobre R$ 3.582,10, e também num pedido de um único item de R$ 62,90.',
    aboutBrand:
      "A Let's Eat It é uma loja online brasileira de casa e presentes, com curadoria de marcas como Le Creuset, KitchenAid, Porto Brasil e Bohemia Crystal. O catálogo cobre mesa posta, cozinha, bar, café e chá, decoração, outdoor e eletrodomésticos — itens que conversam com a rotina de quem cozinha e recebe em casa. O cupom MAUAD, com o sobrenome da Cecília, entra como benefício para quem acompanha o Em Casa com Cecília e quer economizar no site oficial. Como regras de desconto, frete e aplicação podem variar por campanha e produto, a recomendação é sempre conferir o desconto no checkout antes de finalizar a compra.",
    faqs: [
      {
        question: "O cupom MAUAD vale para todos os produtos da Let's Eat It?",
        answer:
          "O cupom MAUAD dá 5% OFF em compras no site da Let's Eat It. Se algum item ou campanha tiver regra própria, o checkout informa; confirme o desconto no resumo do pedido antes de finalizar.",
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
        question: 'O cupom MAUAD vale no Mercado Livre?',
        answer:
          "Não. O MAUAD é usado no checkout do site oficial da Let's Eat It e não vale no Mercado Livre nem em outros marketplaces. Pelo Mercado Livre, vale o preço do anúncio, sem o cupom.",
        mercadoLivreUrl: 'https://meli.la/1RHKLYr',
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
        question: 'O cupom MAUAD é cumulativo?',
        answer:
          'O MAUAD soma com o desconto do Pix e, no teste de 02/10/2026, foi aceito em produto que já estava com preço promocional e em item de pré-venda. A soma com outros cupons segue as regras da loja; o valor final do checkout é a referência.',
      },
      {
        question: 'O link leva para a loja oficial?',
        answer:
          "Sim. O botão de compra aponta para o site oficial da Let's Eat It, com a identificação da parceria da Cecília.",
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
    brand: 'Insider',
    officialUrl: 'https://www.insiderstore.com.br/',
    offerUrl:
      'https://www.insiderstore.com.br/discount/EMCASACOMCECILIA?redirect=/collections/outlet/?utm_source=influmkt&utm_medium=3c994aaa&utm_campaign=EMCASACOMCECILIA&cupom=EMCASACOMCECILIA',
    brandIcon: 'INS',
    brandLogo: '/images/about/partners/insider-icon.png',
    brandLogoAlt: 'Marca Insider',
    brandWatermark: '/images/logos/watermarks/insider.webp',
    brandColor: '#1A1A1A',
    code: 'EMCASACOMCECILIA',
    discount: '15% OFF',
    discountNumber: 15,
    category: 'Moda e roupas tecnológicas',
    hubCategory: 'moda',
    shortDescription: 'compras online na Insider, exceto lançamentos',
    longDescription:
      'Código da Cecília para economizar em camisetas, underwear, roupas esportivas e acessórios com tecnologia têxtil na loja online da Insider. Não vale para lançamentos.',
    metaTitle: 'Cupom Insider Outubro 2026: EMCASACOMCECILIA — 15% OFF na Loja Online',
    metaDescription:
      'Cupom Insider confirmado para outubro de 2026: use EMCASACOMCECILIA no checkout da loja online e ganhe 15% OFF. Não vale para lançamentos nem nas lojas físicas.',
    eligibleCategories: 'Produtos da loja online da Insider, exceto lançamentos',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping: 'Calculado separadamente, conforme política da loja',
    combinable:
      'Soma com as promoções vigentes da loja online, como o Outlet e os kits com preço promocional (teste de 05/10/2026); não acumula com outro cupom: a loja aceita um cupom por pedido',
    lastVerified: '2026-10-07',
    testNote:
      'Nos testes de 5 e 7 de outubro, uma Core T-Shirt de R$ 189,00 saiu por R$ 160,65 com o EMCASACOMCECILIA. O cupom também valeu em peças do Outlet, em kits com preço promocional e numa meia sozinha no carrinho, sem valor mínimo.',
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
          'O EMCASACOMCECILIA dá 15% OFF nos produtos elegíveis da loja online, sem valor mínimo. O desconto aparece em cada item do resumo do pedido assim que o código é aceito.',
      },
      {
        question: 'O cupom EMCASACOMCECILIA está funcionando hoje?',
        answer:
          'Sim. No último teste de checkout, em 07/10/2026, o EMCASACOMCECILIA aplicou os 15% em cada item elegível. A data do teste mais recente aparece no topo desta página.',
      },
      {
        question: 'O cupom vale na primeira compra na Insider?',
        answer:
          'Sim. O EMCASACOMCECILIA vale para clientes novos e antigos, sem cadastro prévio. Como a loja aceita um cupom por pedido, ele não soma com o cupom de boas-vindas da própria Insider.',
      },
      {
        question: 'Posso usar o cupom junto com outro cupom?',
        answer:
          'Não. A Insider aceita um cupom por pedido, e descontos de cupons diferentes não se somam.',
      },
      {
        question: 'O cupom acumula com produtos em promoção?',
        answer:
          'Sim. Nos testes de 05/10/2026, o EMCASACOMCECILIA deu desconto em peças do Outlet e em kits que já estavam com preço promocional. Lançamentos podem ficar de fora.',
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
        question: 'O link já aplica o cupom?',
        answer:
          'Sim. O botão leva à loja online com o cupom EMCASACOMCECILIA já carregado no carrinho. Se ele não aparecer aplicado, digite o código no campo de cupom antes de pagar.',
      },
      {
        question: 'O cupom dá frete grátis?',
        answer:
          'Não necessariamente. O cupom aplica desconto nos produtos; frete, prazo e condições de entrega seguem a política da loja.',
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
    brandWatermark: '/images/logos/watermarks/shein.webp',
    brandColor: '#111111',
    discount: 'Campanhas vigentes',
    offerTypeLabel: 'oferta',
    offerTypeLabelPlural: 'ofertas',
    offerActionLabel: 'Ver ofertas na SHEIN',
    category: 'Moda, acessórios, beleza e casa',
    hubCategory: 'moda',
    shortDescription: 'link principal, código de indicação e campanhas vigentes',
    longDescription:
      'Acesse a SHEIN pelo link principal da Cecília, consulte o código de indicação 4CW5Y e veja as campanhas confirmadas para produtos selecionados e novos usuários.',
    metaTitle: 'SHEIN: código de indicação 4CW5Y e cupom de 50% para novos usuários',
    metaDescription:
      'Acesse o link da Cecília para a SHEIN, pesquise 4CW5Y no app e confira as campanhas vigentes, incluindo produtos selecionados e 50% para novos usuários.',
    eligibleCategories:
      'Moda, acessórios, beleza, casa e demais categorias elegíveis em cada campanha',
    validity: 'Links e campanhas sujeitos a alteração; confira as condições exibidas pela SHEIN',
    reusable: 'Conforme as regras apresentadas pela SHEIN em cada campanha',
    shipping: 'Calculado pela SHEIN conforme endereço, produtos e campanha',
    combinable: 'Pode variar por campanha, conta e produto; confira o valor final antes de pagar',
    lastVerified: '2026-09-01',
    aboutBrand:
      'A SHEIN é uma plataforma internacional de moda, acessórios, beleza e itens para casa. A página reúne o link principal da Cecília, o código de indicação informado pela parceria e campanhas que podem mudar ao longo do tempo. Links de produto específicos pertencem aos artigos de haul e reviews, porque disponibilidade, preço e estoque variam por peça. Compras feitas pelos links indicados podem gerar comissão para o Em Casa com Cecília, sem custo adicional para quem compra.',
    faqs: [
      {
        question: 'O código 4CW5Y é um cupom de desconto da SHEIN?',
        answer:
          '4CW5Y é o código de indicação informado pela parceria. Pesquise o código no aplicativo SHEIN e confira as condições apresentadas para a sua conta; não tratamos esse código como um percentual fixo de desconto.',
      },
      {
        question: 'O que é o código 37S3442 na SHEIN?',
        answer:
          '37S3442 é o código de busca da campanha vigente de produtos selecionados. Os descontos são por tempo limitado e podem variar conforme o item.',
      },
      {
        question: 'Quem pode usar o código G326U6B?',
        answer:
          'A campanha G326U6B anuncia cupom de 50% apenas para novos usuários. A elegibilidade e o desconto final são confirmados pela SHEIN na conta e no checkout.',
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
      'Abra a SHEIN pelo link principal da Cecília.',
      'Para usar o código de indicação, pesquise 4CW5Y no aplicativo SHEIN.',
      'Para uma campanha específica, use o código de busca ou o botão correspondente nesta página.',
      'Confira elegibilidade, produtos e prazo diretamente na SHEIN.',
      'Verifique o valor final antes de concluir a compra.',
    ],
    linkNote:
      'O link principal abre a SHEIN; códigos de indicação e de campanha são pesquisados no aplicativo. Confirme as condições exibidas para a sua conta antes de pagar.',
    affiliateAccountId: '6177013015',
    referral: {
      code: '4CW5Y',
      label: 'Código de indicação da Cecília',
      instructions: 'Pesquise 4CW5Y no aplicativo SHEIN e confira as condições apresentadas para a sua conta.',
      verifiedAt: '2026-09-01',
    },
    campaigns: [
      {
        title: 'Produtos selecionados',
        code: '37S3442',
        offerUrl: 'https://onelink.shein.com/47/5yl4fyr203o0',
        description: 'Produtos selecionados com descontos por tempo limitado.',
        eligibility: 'Consulte os itens e as condições exibidas pela SHEIN.',
        verifiedAt: '2026-09-01',
      },
      {
        title: '50% para novos usuários',
        code: 'G326U6B',
        offerUrl: 'https://onelink.shein.com/47/5yl4h46pd93c',
        description: 'Campanha com cupom de 50% voltada apenas a novos usuários.',
        eligibility: 'Somente novos usuários elegíveis, conforme validação da SHEIN.',
        verifiedAt: '2026-09-01',
      },
    ],
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
    brand: 'Probiótica',
    officialUrl: 'https://www.probiotica.com.br/',
    offerUrl: 'https://www.probiotica.com.br?utm_source=creators&utm_medium=PRO10EMCASACOMCECILIA&utm_campaign=probi',
    brandIcon: 'PRO',
    brandLogo: '/images/about/partners/probiotica-icon.png',
    brandLogoAlt: 'Marca Probiótica',
    brandWatermark: '/images/logos/watermarks/probiotica.webp',
    brandColor: '#0A1FE9',
    code: 'PRO10EMCASACOMCECILIA',
    discount: '10% OFF',
    discountNumber: 10,
    category: 'Suplementos e nutrição esportiva',
    hubCategory: 'saude',
    shortDescription: 'suplementos no site oficial da Probiótica',
    longDescription:
      'Código da Cecília para economizar em whey, creatina, colágeno, barras de proteína e outros suplementos no site oficial da Probiótica.',
    metaTitle: 'Cupom Probiótica Outubro 2026: PRO10EMCASACOMCECILIA — 10% OFF',
    metaDescription:
      'Cupom Probiótica de outubro de 2026: use PRO10EMCASACOMCECILIA no checkout do site oficial e ganhe até 10% OFF em suplementos.',
    eligibleCategories: 'Produtos do site oficial da Probiótica; o desconto chega a 10% e pode ser menor em alguns itens',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping: 'Calculado separadamente, conforme política da loja',
    combinable: 'Soma com as promoções vigentes do site e vale com todas as formas de pagamento',
    lastVerified: '2026-10-13',
    testNote:
      'Aplicamos o PRO10EMCASACOMCECILIA num carrinho de R$ 659,35 com kit de colágeno, creatina em promoção, camiseta e barra de proteína, e o pedido saiu por R$ 604,60, com R$ 54,75 de desconto. O desconto chega a 10%, mas varia por produto: nem todo item recebe os 10%.',
    aboutBrand:
      'A Probiótica é uma marca brasileira de suplementos alimentares, com linha de whey protein, creatina, colágeno, barras de proteína, pré-treinos e acessórios de treino vendidos no site oficial. O cupom PRO10EMCASACOMCECILIA é o benefício da parceria para quem acompanha o Em Casa com Cecília e dá até 10% OFF: o percentual varia conforme o produto, e o carrinho mostra quanto cada item recebeu. A recomendação é conferir o resumo do pedido antes de finalizar.',
    faqs: [
      {
        question: 'Quanto de desconto o cupom PRO10EMCASACOMCECILIA dá?',
        answer:
          'Até 10% OFF. O percentual varia conforme o produto: alguns itens recebem os 10%, outros um desconto menor. O resumo do pedido mostra o valor de cada item assim que o código é aceito.',
      },
      {
        question: 'O cupom PRO10EMCASACOMCECILIA vale para todos os produtos da Probiótica?',
        answer:
          'Ele vale nas compras do site oficial da Probiótica, com o desconto variando por produto. Se um item não receber os 10%, o carrinho mostra; confira o resumo do pedido antes de pagar.',
      },
      {
        question: 'O cupom PRO10EMCASACOMCECILIA está funcionando hoje?',
        answer:
          'Sim. No teste de checkout de 13/10/2026, o PRO10EMCASACOMCECILIA foi aceito. A data do teste mais recente aparece no topo desta página.',
      },
      {
        question: 'Onde coloco o cupom na Probiótica?',
        answer:
          'No carrinho do site oficial, no campo "Cupom de Desconto", antes de continuar para o pagamento.',
      },
      {
        question: 'O cupom soma com produtos em promoção?',
        answer:
          'Sim. No teste de 13/10/2026, o cupom deu desconto também na creatina que já estava com preço promocional.',
      },
      {
        question: 'O cupom PRO10EMCASACOMCECILIA vale na primeira compra na Probiótica?',
        answer:
          'Sim. O PRO10EMCASACOMCECILIA vale na primeira compra e também para quem já comprou na loja.',
      },
      {
        question: 'O cupom PRO10EMCASACOMCECILIA vale no Mercado Livre?',
        answer:
          'Não. O PRO10EMCASACOMCECILIA é usado no checkout do site oficial da Probiótica e não vale no Mercado Livre nem em outros marketplaces. Pelo Mercado Livre, vale o preço do anúncio, sem o cupom.',
        mercadoLivreUrl: 'https://meli.la/1U1ttvv',
      },
      {
        question: 'O cupom dá frete grátis?',
        answer:
          'Não necessariamente. O cupom aplica desconto nos produtos; frete, prazo e condições de entrega seguem a política da loja.',
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
    brand: 'Max Titanium',
    officialUrl: 'https://www.maxtitanium.com.br/',
    offerUrl: 'https://www.maxtitanium.com.br/',
    brandIcon: 'MAX',
    brandLogo: '/images/about/partners/max-titanium-icon.png',
    brandLogoAlt: 'Marca Max Titanium',
    brandWatermark: '/images/logos/watermarks/max-titanium.webp',
    brandColor: '#C90C0F',
    code: 'MAX10EMCASACOMCECILIA',
    discount: '10% OFF',
    discountNumber: 10,
    category: 'Suplementos e nutrição esportiva',
    hubCategory: 'saude',
    shortDescription: 'suplementos no site oficial da Max Titanium',
    longDescription:
      'Código da Cecília para economizar em whey, creatina, pré-treinos e outros suplementos no site oficial da Max Titanium, com qualquer forma de pagamento.',
    metaTitle: 'Cupom Max Titanium Outubro 2026: MAX10EMCASACOMCECILIA — 10% OFF',
    metaDescription:
      'Cupom Max Titanium de outubro de 2026: use MAX10EMCASACOMCECILIA no checkout do site oficial e ganhe até 10% OFF em suplementos, em todas as formas de pagamento.',
    eligibleCategories: 'Produtos do site oficial da Max Titanium; o desconto chega a 10% e pode ser menor em alguns itens',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping: 'Calculado separadamente, conforme política da loja',
    combinable:
      'Soma com as promoções vigentes do site e com os brindes do carrinho, e vale com todas as formas de pagamento',
    lastVerified: '2026-10-14',
    testNote:
      'Aplicamos o MAX10EMCASACOMCECILIA num carrinho com um Top Whey 3W 900 g em promoção, de R$ 273,55 por R$ 189,00, e dois brindes. O pedido saiu por R$ 172,25, com R$ 16,75 de desconto, e os brindes continuaram no carrinho. O desconto chega a 10%, mas varia por produto: nem todo item recebe os 10%.',
    aboutBrand:
      'A Max Titanium é uma marca brasileira de suplementos alimentares, com linha de whey protein, creatina, pré-treinos, aminoácidos e snacks proteicos vendidos no site oficial. Faz parte do mesmo grupo da Probiótica e da Dr. Peanut. O cupom MAX10EMCASACOMCECILIA é o benefício da parceria para quem acompanha o Em Casa com Cecília e dá até 10% OFF: o percentual varia conforme o produto, e o carrinho mostra quanto cada item recebeu. Ele vale com qualquer forma de pagamento e soma com as promoções do site.',
    faqs: [
      {
        question: 'Quanto de desconto o cupom MAX10EMCASACOMCECILIA dá?',
        answer:
          'Até 10% OFF. O percentual varia conforme o produto: alguns itens recebem os 10%, outros um desconto menor. O resumo do pedido mostra o valor de cada item assim que o código é aceito.',
      },
      {
        question: 'O cupom MAX10EMCASACOMCECILIA vale no Pix, no cartão e em outras formas de pagamento?',
        answer:
          'Sim. O cupom vale com todas as formas de pagamento disponíveis no checkout, e o desconto não depende do meio escolhido.',
      },
      {
        question: 'O cupom MAX10EMCASACOMCECILIA vale na primeira compra na Max Titanium?',
        answer: 'Sim. O MAX10EMCASACOMCECILIA vale na primeira compra e também para quem já comprou na loja.',
      },
      {
        question: 'O cupom MAX10EMCASACOMCECILIA vale no Mercado Livre?',
        answer:
          'Não. O MAX10EMCASACOMCECILIA é usado no checkout do site oficial da Max Titanium e não vale no Mercado Livre nem em outros marketplaces. Pelo Mercado Livre, vale o preço do anúncio, sem o cupom.',
        mercadoLivreUrl: 'https://meli.la/2wysiEJ',
      },
      {
        question: 'O cupom soma com produtos em promoção e com os brindes?',
        answer:
          'Sim. No teste de 14/10/2026, o cupom deu desconto num whey que já estava com preço promocional, e os dois brindes escolhidos continuaram no carrinho.',
      },
      {
        question: 'O cupom MAX10EMCASACOMCECILIA está funcionando hoje?',
        answer:
          'Sim. No teste de checkout de 14/10/2026, o MAX10EMCASACOMCECILIA foi aceito. A data do teste mais recente aparece no topo desta página.',
      },
      {
        question: 'Onde coloco o cupom na Max Titanium?',
        answer:
          'No carrinho do site oficial, no campo "Cupom de Desconto", antes de continuar para o pagamento.',
      },
      {
        question: 'O cupom dá frete grátis?',
        answer:
          'Não necessariamente. O cupom aplica desconto nos produtos; frete, prazo e condições de entrega seguem a política da loja.',
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
    brand: 'Dr. Peanut',
    officialUrl: 'https://www.drpeanut.com.br/',
    offerUrl: 'https://www.drpeanut.com.br/',
    brandIcon: 'DP',
    brandLogo: '/images/about/partners/dr-peanut-icon.png',
    brandLogoAlt: 'Marca Dr. Peanut',
    brandWatermark: '/images/logos/watermarks/dr-peanut.webp',
    brandColor: '#FF7300',
    code: 'DREMCASACOMCECILIA',
    discount: '10% OFF',
    discountNumber: 10,
    category: 'Pastas de amendoim e snacks',
    hubCategory: 'saude',
    shortDescription: 'todo o site Dr. Peanut, com todas as formas de pagamento',
    longDescription:
      'Código da Cecília para economizar em pastas de amendoim, alfajores, snacks e whey no site oficial da Dr. Peanut, com qualquer forma de pagamento.',
    metaTitle: 'Cupom Dr. Peanut Outubro 2026: DREMCASACOMCECILIA — 10% OFF',
    metaDescription:
      'Cupom Dr. Peanut de outubro de 2026: use DREMCASACOMCECILIA e ganhe 10% OFF em todo o site, em todas as formas de pagamento e somando com as promoções.',
    eligibleCategories: 'Todos os produtos do site oficial da Dr. Peanut',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping:
      'Frete grátis quando o total, já com o cupom, chega a R$ 149,90 (aviso do carrinho em 13/10/2026); abaixo disso, conforme a política da loja',
    combinable: 'Soma com as promoções vigentes do site e vale com todas as formas de pagamento',
    lastVerified: '2026-10-13',
    testNote:
      'Aplicamos o DREMCASACOMCECILIA num carrinho de R$ 440,16 com pasta de amendoim em promoção, display de alfajor e whey, e o pedido saiu por R$ 396,14, com R$ 44,02 de desconto: os 10% valeram em todos os itens, inclusive no que já estava com preço promocional.',
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
        question: 'O cupom DREMCASACOMCECILIA vale no Mercado Livre?',
        answer:
          'Não. O DREMCASACOMCECILIA é usado no checkout do site oficial da Dr. Peanut e não vale no Mercado Livre nem em outros marketplaces. Pelo Mercado Livre, vale o preço do anúncio, sem o cupom.',
        mercadoLivreUrl: 'https://meli.la/1wNsKJB',
      },
      {
        question: 'O cupom soma com produtos em promoção?',
        answer:
          'Sim. No teste de 13/10/2026, os 10% entraram também na pasta de amendoim que já estava com preço promocional.',
      },
      {
        question: 'O cupom DREMCASACOMCECILIA está funcionando hoje?',
        answer:
          'Sim. No teste de checkout de 13/10/2026, o DREMCASACOMCECILIA aplicou os 10% em todos os itens. A data do teste mais recente aparece no topo desta página.',
      },
      {
        question: 'A Dr. Peanut tem frete grátis?',
        answer:
          'Em 13/10/2026, o carrinho avisava frete grátis quando o total, já com o cupom aplicado, chega a R$ 149,90. Abaixo disso, o frete é calculado pela loja.',
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
    brand: 'Black Skull',
    officialUrl: 'https://www.blackskullusa.com.br/',
    offerUrl: 'https://www.blackskullusa.com.br/',
    brandIcon: 'BS',
    brandLogo: '/images/about/partners/black-skull-icon.png',
    brandLogoAlt: 'Marca Black Skull',
    brandWatermark: '/images/logos/watermarks/black-skull.webp',
    brandColor: '#1C1C1E',
    code: 'CECILIA10',
    discount: '10% OFF',
    discountNumber: 10,
    category: 'Suplementos e nutrição esportiva',
    hubCategory: 'saude',
    shortDescription: 'todo o site Black Skull, com todas as formas de pagamento',
    longDescription:
      'Código da Cecília para economizar em whey, creatina, pré-treinos, aminoácidos e roupas de treino no site oficial da Black Skull, com qualquer forma de pagamento.',
    metaTitle: 'Cupom Black Skull Outubro 2026: CECILIA10 — 10% OFF',
    metaDescription:
      'Cupom Black Skull de outubro de 2026: use CECILIA10 e ganhe 10% OFF em todo o site, em todas as formas de pagamento e somando com as promoções.',
    eligibleCategories: 'Todos os produtos do site oficial da Black Skull',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping: 'Calculado separadamente, conforme política da loja',
    combinable: 'Soma com as promoções vigentes do site e vale com todas as formas de pagamento',
    lastVerified: '2026-10-13',
    testNote:
      'Aplicamos o CECILIA10 num carrinho de R$ 364,33 com regata, kit de whey, creatina e pré-treino e glutamina, e o pedido saiu por R$ 327,89, com R$ 36,44 de desconto: os 10% valeram em todos os itens, inclusive nos que já estavam com preço promocional.',
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
        question: 'O cupom CECILIA10 vale no Mercado Livre?',
        answer:
          'Não. O CECILIA10 é usado no checkout do site oficial da Black Skull e não vale no Mercado Livre nem em outros marketplaces. Pelo Mercado Livre, vale o preço do anúncio, sem o cupom.',
        mercadoLivreUrl: 'https://meli.la/1R7Zwan',
      },
      {
        question: 'O cupom soma com produtos em promoção?',
        answer:
          'Sim. No teste de 13/10/2026, os 10% entraram também na regata e no kit que já estavam com preço promocional.',
      },
      {
        question: 'O cupom CECILIA10 está funcionando hoje?',
        answer:
          'Sim. No teste de checkout de 13/10/2026, o CECILIA10 aplicou os 10% em todos os itens. A data do teste mais recente aparece no topo desta página.',
      },
      {
        question: 'O cupom dá frete grátis?',
        answer:
          'Não necessariamente. O cupom aplica desconto nos produtos; frete, prazo e condições de entrega seguem a política da loja.',
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
    brand: 'Cléa Store',
    officialUrl: 'https://www.cleastore.com.br/',
    offerUrl: 'https://www.cleastore.com.br/',
    brandIcon: 'CS',
    brandLogo: '/images/about/partners/clea-store-icon.png',
    brandLogoAlt: 'Marca Cléa Store',
    brandWatermark: '/images/logos/watermarks/clea-store.webp',
    brandColor: '#111111',
    code: 'CSEMCASACOMCECILIA',
    discount: '10% OFF',
    discountNumber: 10,
    category: 'Moda feminina',
    hubCategory: 'moda',
    shortDescription: 'todo o site Cléa Store, com todas as formas de pagamento',
    longDescription:
      'Código da Cecília para economizar em alfaiataria, blusas, vestidos, t-shirts e acessórios no site oficial da Cléa Store, com qualquer forma de pagamento.',
    metaTitle: 'Cupom Cléa Store Outubro 2026: CSEMCASACOMCECILIA — 10% OFF',
    metaDescription:
      'Cupom Cléa Store de outubro de 2026: use CSEMCASACOMCECILIA e ganhe 10% OFF em todo o site, em todas as formas de pagamento, somando com as promoções e o cashback.',
    eligibleCategories: 'Todos os produtos do site oficial da Cléa Store',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping: 'Frete grátis acima de R$ 599, segundo a faixa do site em 14/10/2026; abaixo disso, conforme a política da loja',
    combinable:
      'Soma com as promoções vigentes do site e com o cashback da loja, e vale com todas as formas de pagamento',
    lastVerified: '2026-10-14',
    testNote:
      'Aplicamos o CSEMCASACOMCECILIA num kit de 3 t-shirts em promoção, de R$ 387,00 por R$ 258,00, e o pedido saiu por R$ 232,20, com R$ 25,80 de desconto: os 10% valeram sobre o preço promocional, e o pedido continuou gerando cashback.',
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
        question: 'O cupom CSEMCASACOMCECILIA vale no Mercado Livre?',
        answer:
          'Não. O CSEMCASACOMCECILIA é usado no checkout do site oficial da Cléa Store e não vale no Mercado Livre nem em outros marketplaces. Pelo Mercado Livre, vale o preço do anúncio, sem o cupom.',
        mercadoLivreUrl: 'https://meli.la/1t3kn5d',
      },
      {
        question: 'O cupom soma com produtos em promoção?',
        answer:
          'Sim. No teste de 14/10/2026, os 10% entraram num kit de t-shirts que já estava com preço promocional.',
      },
      {
        question: 'O cupom soma com o cashback da Cléa Store?',
        answer:
          'Sim. No teste de 14/10/2026, o pedido com o cupom aplicado continuou gerando cashback, calculado sobre o valor já com o desconto.',
      },
      {
        question: 'O cupom CSEMCASACOMCECILIA está funcionando hoje?',
        answer:
          'Sim. No teste de checkout de 14/10/2026, o CSEMCASACOMCECILIA aplicou os 10%. A data do teste mais recente aparece no topo desta página.',
      },
      {
        question: 'A Cléa Store tem frete grátis?',
        answer:
          'Em 14/10/2026, o site anunciava frete grátis acima de R$ 599. Abaixo disso, o frete é calculado pela loja no checkout.',
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
    brand: 'Belive',
    officialUrl: 'https://belivebefree.com.br/',
    offerUrl: 'https://belivebefree.com.br/',
    brandIcon: 'BL',
    brandLogo: '/images/about/partners/belive-icon.png',
    brandLogoAlt: 'Marca Belive',
    brandWatermark: '/images/logos/watermarks/belive.webp',
    brandColor: '#000000',
    code: 'MAUAD',
    discount: '10% OFF',
    discountNumber: 10,
    category: 'Doces, snacks e pães sem glúten',
    hubCategory: 'alimentacao',
    shortDescription: 'todo o site Belive, com todas as formas de pagamento',
    longDescription:
      'Código da Cecília para economizar em doces sem açúcar, snacks, brownies proteicos e pães sem glúten, sem leite e sem lactose no site oficial da Belive, com qualquer forma de pagamento.',
    metaTitle: 'Cupom Belive Outubro 2026: MAUAD — 10% OFF',
    metaDescription:
      'Cupom Belive de outubro de 2026: use MAUAD e ganhe 10% OFF em todo o site, somando com as ofertas e com os 5% de desconto do Pix.',
    eligibleCategories: 'Todos os produtos do site oficial da Belive',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping:
      'Frete grátis por região, segundo as regras de frete da loja em 16/10/2026: acima de R$ 170 em SP, MG, RJ, DF e GO, de R$ 250 no Sul e de R$ 300 nos demais estados; abaixo disso, o frete é calculado no checkout',
    combinable:
      'Soma com as promoções vigentes do site e com os 5% de desconto do Pix, e vale com todas as formas de pagamento',
    lastVerified: '2026-10-16',
    testNote:
      'Aplicamos o MAUAD num carrinho de R$ 576,82 com quatro combos e kits em oferta, e o desconto foi de R$ 57,68: o total caiu para R$ 519,14, ou R$ 493,18 no Pix, com os 5% do Pix somados ao cupom.',
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
        question: 'O cupom MAUAD soma com o desconto do Pix?',
        answer:
          'Sim. No teste de 16/10/2026, o carrinho com o MAUAD aplicado ainda ganhou os 5% de desconto do Pix: R$ 519,14 viraram R$ 493,18.',
      },
      {
        question: 'O cupom soma com produtos em promoção?',
        answer:
          'Sim. No teste de 16/10/2026, os 10% entraram em quatro combos e kits que já estavam em oferta.',
      },
      {
        question: 'O cupom MAUAD vale na primeira compra na Belive?',
        answer: 'Sim. O MAUAD vale na primeira compra e também para quem já comprou na loja.',
      },
      {
        question: 'O cupom MAUAD vale no Mercado Livre?',
        answer:
          'Não. O MAUAD é usado no checkout do site oficial da Belive e não vale no Mercado Livre nem em outros marketplaces. Pelo Mercado Livre, vale o preço do anúncio, sem o cupom.',
        mercadoLivreUrl: 'https://meli.la/2xDjP2k',
      },
      {
        question: 'O cupom MAUAD está funcionando hoje?',
        answer:
          'Sim. No teste de checkout de 16/10/2026, o MAUAD aplicou os 10% no carrinho. A data do teste mais recente aparece no topo desta página.',
      },
      {
        question: 'Onde coloco o cupom na Belive?',
        answer: 'No carrinho do site oficial, no campo "Código do cupom", e depois em "Aplicar cupom".',
      },
      {
        question: 'A Belive tem frete grátis?',
        answer:
          'Sim, com valor mínimo por região. Em 16/10/2026, as regras de frete da loja davam frete grátis acima de R$ 170 em SP, MG, RJ, DF e GO, acima de R$ 250 no Sul e acima de R$ 300 nos demais estados. Abaixo disso, o frete é calculado no checkout.',
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
    brand: 'Mais Mu',
    officialUrl: 'https://www.lojamaismu.com.br/',
    offerUrl: 'https://www.lojamaismu.com.br/',
    brandIcon: 'MU',
    brandLogo: '/images/about/partners/mais-mu-icon.png',
    brandLogoAlt: 'Marca Mais Mu',
    brandWatermark: '/images/logos/watermarks/mais-mu.webp',
    brandColor: '#06A1E2',
    code: 'MMEMCASACOMCECILIA',
    discount: '10% OFF',
    discountNumber: 10,
    category: 'Whey, creatina, pré-treino e snacks proteicos',
    hubCategory: 'saude',
    shortDescription: 'todo o site Mais Mu, com todas as formas de pagamento',
    longDescription:
      'Código da Cecília para economizar em whey protein, creatina, pré-treino, barras e snacks proteicos no site oficial da Mais Mu, com qualquer forma de pagamento e inclusive nos produtos que já estão em oferta.',
    metaTitle: 'Cupom Mais Mu Outubro 2026: MMEMCASACOMCECILIA — 10% OFF',
    metaDescription:
      'Cupom Mais Mu de outubro de 2026: use MMEMCASACOMCECILIA e ganhe 10% OFF em todo o site, somando com as ofertas e com os 3% do Pix.',
    eligibleCategories: 'Todos os produtos do site oficial da Mais Mu',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping:
      'Frete grátis acima de R$ 299 no Sul, Sudeste e Centro-Oeste e acima de R$ 399 no Norte e Nordeste, segundo o site em 20/10/2026; abaixo disso, o frete é calculado no checkout',
    combinable:
      'Soma com as promoções vigentes do site e com os 3% de desconto do Pix, e vale com todas as formas de pagamento; não soma com outro cupom, como o crédito do cashback ou o desconto de boas-vindas',
    lastVerified: '2026-10-20',
    testNote:
      'Aplicamos o MMEMCASACOMCECILIA num carrinho de R$ 239,89 com um whey de R$ 159,99 e uma creatina em oferta, de R$ 79,90, e o desconto foi de R$ 23,99: o total caiu para R$ 215,90, com os 10% valendo também no item que já estava em oferta.',
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
          'Sim. No teste de 20/10/2026, os 10% entraram também na creatina que já estava com 33% de desconto.',
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
        question: 'O cupom MMEMCASACOMCECILIA vale na primeira compra na Mais Mu?',
        answer:
          'Sim. Ele vale na primeira compra e também para quem já comprou na loja. Como a Mais Mu não acumula cupons, ele substitui o desconto de boas-vindas da loja, de R$ 15 em compras acima de R$ 250.',
      },
      {
        question: 'O cupom MMEMCASACOMCECILIA está funcionando hoje?',
        answer:
          'Sim. No teste de checkout de 20/10/2026, o MMEMCASACOMCECILIA aplicou os 10% no carrinho. A data do teste mais recente aparece no topo desta página.',
      },
      {
        question: 'O cupom MMEMCASACOMCECILIA vale no Mercado Livre?',
        answer:
          'Não. O MMEMCASACOMCECILIA é usado no checkout do site oficial da Mais Mu e não vale no Mercado Livre nem em outros marketplaces. Pelo Mercado Livre, vale o preço do anúncio, sem o cupom.',
        mercadoLivreUrl: 'https://meli.la/24RjvdP',
      },
      {
        question: 'Onde coloco o cupom na Mais Mu?',
        answer: 'No checkout, em "Adicionar cupom de desconto", depois de clicar em "Iniciar compra" no carrinho.',
      },
      {
        question: 'A Mais Mu tem frete grátis?',
        answer:
          'Sim, com valor mínimo por região. Em 20/10/2026, o site dava frete grátis acima de R$ 299 no Sul, Sudeste e Centro-Oeste e acima de R$ 399 no Norte e Nordeste. Abaixo disso, o frete é calculado no checkout.',
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
    brand: 'Skelt',
    officialUrl: 'https://www.skelt.com.br/',
    offerUrl: 'https://www.skelt.com.br/?utm_source=creators&utm_medium=SKEMCASACOMCECILIA&utm_campaign=inbazz',
    brandIcon: 'SK',
    brandLogo: '/images/about/partners/skelt-icon.png',
    brandLogoAlt: 'Marca Skelt',
    brandWatermark: '/images/logos/watermarks/skelt.webp',
    brandColor: '#212121',
    code: 'SKEMCASACOMCECILIA',
    discount: '10% OFF',
    discountNumber: 10,
    category: 'Autobronzeador, body splash e hidratação corporal',
    hubCategory: 'beleza',
    shortDescription: 'todo o site Skelt, com todas as formas de pagamento',
    longDescription:
      'Código da Cecília para economizar em autobronzeador, body splash, body cream, maquiagem corporal e kits no site oficial da Skelt, com qualquer forma de pagamento e inclusive nos produtos que já estão em promoção.',
    metaTitle: 'Cupom Skelt Outubro 2026: SKEMCASACOMCECILIA — 10% OFF',
    metaDescription:
      'Cupom Skelt de outubro de 2026: use SKEMCASACOMCECILIA e ganhe 10% OFF em todo o site, somando com as promoções e com os 5% do Pix.',
    eligibleCategories: 'Todos os produtos do site oficial da Skelt, inclusive kits e combos',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping:
      'Frete grátis sem valor mínimo em 12 cidades, como São Paulo, Belo Horizonte, Curitiba e Goiânia; a partir de R$ 199 no Sul, Sudeste e Centro-Oeste e a partir de R$ 299 no Norte e Nordeste, sobre o valor final do pedido, segundo o site em 21/10/2026',
    combinable:
      'Soma com as promoções vigentes do site e com os 5% de desconto do Pix, e vale com todas as formas de pagamento; não soma com outro cupom, como o de primeira compra da loja',
    lastVerified: '2026-10-21',
    testNote:
      'Aplicamos o SKEMCASACOMCECILIA num carrinho com um body splash e um mousse autobronzeador, que já estavam com os 10% da promoção do site e somavam R$ 197,82, e o desconto foi de R$ 19,78: o total caiu para R$ 178,04, e no Pix a loja tirou mais 5%, para R$ 169,13.',
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
        question: 'O cupom soma com produtos em promoção?',
        answer:
          'Sim. No teste de 21/10/2026, os 10% do cupom entraram sobre os preços que já estavam com os 10% da promoção do site.',
      },
      {
        question: 'O cupom SKEMCASACOMCECILIA soma com o desconto do Pix?',
        answer:
          'Sim. O cupom vale com todas as formas de pagamento e, no Pix, a Skelt ainda tira os 5% de desconto dela.',
      },
      {
        question: 'Posso usar o SKEMCASACOMCECILIA junto com o cupom PRIMEIRA10?',
        answer:
          'Não. A Skelt aceita um cupom por pedido: aplicar outro código troca o anterior. Na primeira compra, fique com um dos dois; os dois dão 10%.',
      },
      {
        question: 'O cupom tira o brinde do pedido?',
        answer:
          'Pode tirar. O valor mínimo dos brindes da Skelt conta o pedido depois dos descontos, então, se o cupom deixar o total abaixo do mínimo da campanha, o brinde sai do carrinho. Confira o carrinho antes de pagar.',
      },
      {
        question: 'O cupom SKEMCASACOMCECILIA está funcionando hoje?',
        answer:
          'Sim. No teste de checkout de 21/10/2026, o SKEMCASACOMCECILIA aplicou os 10% no carrinho. A data do teste mais recente aparece no topo desta página.',
      },
      {
        question: 'O cupom SKEMCASACOMCECILIA vale no Mercado Livre?',
        answer:
          'Não. O SKEMCASACOMCECILIA é usado no checkout do site oficial da Skelt e não vale no Mercado Livre nem em outros marketplaces. Pelo Mercado Livre, vale o preço do anúncio, sem o cupom.',
        mercadoLivreUrl: 'https://meli.la/2unTb7k',
      },
      {
        question: 'Onde coloco o cupom na Skelt?',
        answer: 'No campo de cupom de desconto do carrinho ou do checkout, antes de escolher a forma de pagamento.',
      },
      {
        question: 'A Skelt tem frete grátis?',
        answer:
          'Sim. Em 21/10/2026, o frete era grátis sem valor mínimo em 12 cidades, como São Paulo, Belo Horizonte, Curitiba e Goiânia; a partir de R$ 199 no Sul, Sudeste e Centro-Oeste; e a partir de R$ 299 no Norte e Nordeste. O valor conta o pedido já com os descontos.',
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
    brand: 'Bagaggio',
    officialUrl: 'https://www.bagaggio.com.br/',
    offerUrl: 'https://www.bagaggio.com.br/?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz',
    brandIcon: 'BG',
    brandLogo: '/images/about/partners/bagaggio-icon.png',
    brandLogoAlt: 'Marca Bagaggio',
    brandWatermark: '/images/logos/watermarks/bagaggio.webp',
    brandColor: '#265842',
    code: 'CECILIA10',
    discount: '10% OFF',
    discountNumber: 10,
    category: 'Malas, mochilas e acessórios de viagem',
    hubCategory: 'moda',
    shortDescription: 'todo o site Bagaggio, com todas as formas de pagamento',
    longDescription:
      'Código da Cecília para economizar em malas de bordo e de viagem, mochilas, bolsas, carteiras e acessórios no site oficial da Bagaggio, com qualquer forma de pagamento e inclusive nos produtos que já estão em promoção e no Outlet.',
    metaTitle: 'Cupom Bagaggio Outubro 2026: CECILIA10 — 10% OFF',
    metaDescription:
      'Cupom Bagaggio de outubro de 2026: use CECILIA10 e ganhe 10% OFF em malas, mochilas e acessórios, somando com as promoções, o Outlet e os 5% do Pix.',
    eligibleCategories: 'Todos os produtos do site oficial da Bagaggio, inclusive os do Outlet',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping: 'Calculado pelo CEP no carrinho; o site também mostra a retirada em lojas próximas, conforme a disponibilidade',
    combinable:
      'Soma com as promoções vigentes do site, inclusive o Outlet, e com os 5% de desconto do Pix, e vale com todas as formas de pagamento; não soma com outro cupom, como o da promoção de 50% na 2ª peça',
    lastVerified: '2026-10-22',
    testNote:
      'Aplicamos o CECILIA10 num carrinho com uma mala de bordo Downtown do Outlet, que já estava de R$ 249,90 por R$ 179,90, e o desconto foi de R$ 17,99: o total caiu para R$ 161,91, e no Pix a loja tirou mais 5%, para R$ 153,81.',
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
          'Sim. No teste de 22/10/2026, os 10% do cupom entraram sobre malas que já estavam com desconto no Outlet e também sobre uma mala a preço cheio.',
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
        question: 'O cupom CECILIA10 está funcionando hoje?',
        answer:
          'Sim. No teste de checkout de 22/10/2026, o CECILIA10 aplicou os 10% no carrinho. A data do teste mais recente aparece no topo desta página.',
      },
      {
        question: 'O cupom CECILIA10 vale no Mercado Livre?',
        answer:
          'Não. O CECILIA10 é usado no carrinho do site oficial da Bagaggio e não vale no Mercado Livre nem em outros marketplaces. Pelo Mercado Livre, vale o preço do anúncio, sem o cupom.',
        mercadoLivreUrl: 'https://meli.la/2KeydkG',
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
    offerMode: 'affiliate-link',
    slug: 'hostinger',
    brand: 'Hostinger',
    officialUrl: 'https://www.hostinger.com/',
    // Link de indicação do Bruno; o código SONARDEOFERTAS vai no link e não se digita no checkout.
    offerUrl: 'https://www.hostinger.com/br?REFERRALCODE=SONARDEOFERTAS',
    brandIcon: 'H',
    brandLogo: '/images/about/partners/hostinger-icon.png',
    brandLogoAlt: 'Marca Hostinger',
    brandWatermark: '/images/logos/watermarks/hostinger.webp',
    brandColor: '#673DE6',
    discount: '20% OFF',
    offerTypeLabel: 'indicação',
    offerTypeLabelPlural: 'indicações',
    offerActionLabel: 'Ver os planos com desconto',
    category: 'Hospedagem de sites e domínios',
    hubCategory: 'diversos',
    shortDescription: 'primeiro período de qualquer plano novo, com o desconto já no link',
    longDescription:
      'Indicação para quem vai pôr um site no ar: pelo link, a Hostinger mostra os planos com 20% de desconto no primeiro período, sem cupom para digitar. O Em Casa com Cecília roda na Hostinger.',
    metaTitle: 'Desconto Hostinger: 20% OFF pelo link de indicação',
    metaDescription:
      'Desconto Hostinger de 20% no primeiro período de qualquer plano novo, já aplicado pelo link de indicação, sem cupom. Veja a renovação e o que não soma.',
    eligibleCategories: 'Primeiro período de qualquer plano novo da Hostinger, seja qual for o produto',
    validity: 'Indicação ativa enquanto o programa de indicação da Hostinger estiver vigente',
    reusable: 'Não se aplica: o desconto vem do link, não de um cupom',
    shipping: 'Não se aplica',
    combinable:
      'Não soma com outros cupons: segundo a Hostinger, o preço do link de indicação já é o melhor que ela oferece por ele',
    lastVerified: '2026-10-19',
    linkInstructions: [
      'Abra a Hostinger pelo botão indicado: os preços da página já aparecem com o desconto da indicação.',
      'Escolha o plano e o período e siga para o carrinho pelo próprio link.',
      'Não é preciso digitar cupom: o desconto já está vinculado ao link.',
      'Confira no carrinho o preço do primeiro período e o preço da renovação antes de pagar.',
    ],
    linkNote:
      'Os 20% valem só no primeiro período de um plano novo: a renovação sai pelo preço padrão do plano, e o desconto não vale em compras já feitas.',
    aboutBrand:
      'A Hostinger é uma empresa de hospedagem de sites, com planos de hospedagem, criador de sites, VPS, domínios e e-mail. O Em Casa com Cecília roda na Hostinger, como aplicação Node.js. O link desta página é uma indicação: abre o site da Hostinger com 20% de desconto no primeiro período de qualquer plano novo, sem cupom para digitar.',
    faqs: [
      {
        question: 'Tem cupom de desconto da Hostinger?',
        answer:
          'Não é preciso cupom. O desconto da indicação já vem no link desta página e aparece nos preços do site da Hostinger.',
      },
      {
        question: 'De quanto é o desconto da Hostinger pelo link?',
        answer:
          'De 20%, segundo a página de indicação da Hostinger em 19/10/2026, no primeiro período de qualquer plano novo, seja qual for o produto.',
      },
      {
        question: 'O desconto vale na renovação do plano?',
        answer:
          'Não. Os 20% valem só no primeiro período. Depois, o plano renova pelo preço padrão, que a Hostinger mostra abaixo do card de cada plano, e dá para trocar o período ou cancelar antes da renovação.',
      },
      {
        question: 'O desconto da indicação soma com outro cupom da Hostinger?',
        answer:
          'Não. A Hostinger informa que o preço do link de indicação já é o melhor que ela oferece por ele, e outros cupons não se acumulam.',
      },
      {
        question: 'O desconto vale para quem já é cliente da Hostinger?',
        answer:
          'Vale para um plano novo comprado pelo link. Planos já contratados e compras já feitas não ganham o desconto.',
      },
      {
        question: 'O Em Casa com Cecília usa a Hostinger?',
        answer: 'Sim. O site roda na Hostinger, como aplicação Node.js.',
      },
      {
        question: 'Comprar pelo link apoia o Em Casa com Cecília?',
        answer:
          'Sim, a compra pela indicação pode gerar crédito para o Em Casa com Cecília, sem custo extra para você.',
      },
    ],
    status: 'ativo',
    featured: false,
  },
];

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
    // Conferência mais recente entre os cupons ativos; datas ISO ordenam como texto.
    lastVerified: activeCoupons.map((coupon) => coupon.lastVerified).sort().pop(),
  };
}
