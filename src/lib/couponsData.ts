import { getPrimaryRewardCode, getLatestYesStyleVerifiedAtISO } from './yesstyleCoupons';

export interface CouponFAQ {
  question: string;
  answer: string;
}

export interface CouponHistory {
  date: string;
  code: string;
  discount: string;
  note?: string;
}

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

interface CouponBase {
  slug: string;
  brand: string;
  officialUrl: string;
  offerUrl: string;
  brandIcon: string;
  brandLogo?: string;
  brandLogoAlt?: string;
  socialImage?: string;
  socialImageAlt?: string;
  brandColor: string;
  discount: string;
  offerTypeLabel?: string;
  offerTypeLabelPlural?: string;
  offerActionLabel?: string;
  category: string;
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
  featured: boolean;
  relatedContent?: {
    title: string;
    url: string;
    type: 'review' | 'post';
    publishedAt: string;
  }[];
  monthlyHighlight?: {
    scope: string;
    note: string;
  };
  affiliateAccountId?: string;
  referral?: CouponReferral;
  campaigns?: CouponCampaign[];
}

export type CouponCodeOffer = CouponBase & {
  offerMode: 'discount-code';
  code: string;
  discountNumber: number;
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
    socialImage: '/images/reviews/poltronas-reclinaveis-damie.webp',
    socialImageAlt: 'Poltronas reclináveis DAMIE',
    brandColor: '#C24B1F',
    code: 'CECILIA12',
    discount: '12% OFF',
    discountNumber: 12,
    category: 'Móveis e decoração',
    shortDescription: 'todo o site DAMIE',
    longDescription:
      'Código exclusivo da Cecília para economizar em compras no site da DAMIE.',
    metaTitle: 'Cupom DAMIE 12% OFF • CECILIA12 ativo • Em Casa com Cecília',
    metaDescription:
      'Cupom DAMIE atualizado agosto 2026: use CECILIA12 para 12% OFF em todo o site.',
    eligibleCategories:
      'Todo o site DAMIE',
    validity: 'Cupom permanente enquanto a parceria estiver ativa',
    reusable: 'Sim, sem limite de usos por CPF',
    shipping: 'Calculado separadamente, conforme política da loja',
    combinable: 'Não cumulativo com outros cupons ou promoções especiais',
    lastVerified: '2026-08-01',
    aboutBrand:
      'A DAMIE é uma marca brasileira de móveis estofados premium, com foco em poltronas reclináveis, sofás, camas e soluções de conforto para a casa. A Cecília usa produtos da marca no dia a dia e produziu reviews mostrando montagem, acabamento, conforto e uso real em casa. O cupom CECILIA12 foi criado para quem acompanha o Em Casa com Cecília e quer comprar com desconto direto no checkout. A proposta da parceria é simples: indicar produtos que fazem sentido para uma casa mais confortável, sem esconder que existe relação comercial e comissão de afiliado quando uma compra é feita pelo link ou cupom.',
    faqs: [
      {
        question: 'O cupom CECILIA12 funciona em todos os produtos da DAMIE?',
        answer:
          'O cupom vale para compras no site da DAMIE. Se algum item tiver uma campanha especial com regra própria, o checkout informa antes da finalização.',
      },
      {
        question: 'O cupom CECILIA12 é cumulativo com outras promoções?',
        answer:
          'Normalmente não. Cupons promocionais costumam substituir outras condições de desconto. Se a DAMIE estiver com uma promoção sazonal, compare o valor final no checkout.',
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
      scope: 'em todo o site',
      note: 'Funciona com Pix e cartão',
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
    brandColor: '#7E2A1A',
    code: 'CECI',
    discount: '5% OFF',
    discountNumber: 5,
    category: 'Café e bebidas',
    shortDescription: 'cápsulas, máquinas e acessórios da loja oficial',
    longDescription:
      'Código da Cecília para economizar em compras na loja oficial Nescafé Dolce Gusto Brasil.',
    metaTitle: 'Cupom Dolce Gusto Agosto 2026: CECI — 5% OFF na Loja Oficial',
    metaDescription:
      'Cupom Dolce Gusto testado em agosto de 2026: use CECI no checkout da loja oficial Nescafé Dolce Gusto e ganhe 5% OFF em compras a partir de R$ 100.',
    eligibleCategories:
      'Todo o site oficial Dolce Gusto, em compras a partir de R$ 100',
    validity: 'Cupom permanente enquanto a parceria estiver ativa',
    reusable: 'Sim, até 3 usos por CPF',
    shipping: 'Calculado separadamente, conforme política da loja',
    combinable: 'Pode variar conforme campanha ativa da loja oficial',
    lastVerified: '2026-08-01',
    aboutBrand:
      'A Nescafé Dolce Gusto é uma linha de cafés e bebidas em cápsulas da Nestlé, com máquinas e sabores pensados para preparo rápido em casa. A marca combina praticidade com variedade: cafés intensos, bebidas com leite, cappuccinos, chocolates e opções geladas aparecem no catálogo da loja oficial. O cupom CECI entra como benefício para quem acompanha a Cecília e quer economizar em compras na loja oficial. Como em toda parceria comercial, a recomendação deve ser conferida no checkout: o desconto aparece antes da finalização quando a regra da campanha permite.',
    faqs: [
      {
        question: 'O cupom CECI vale para todas as cápsulas Dolce Gusto?',
        answer:
          'Sim: o CECI dá 5% OFF em todo o catálogo da loja oficial Dolce Gusto — cápsulas, máquinas e acessórios — em compras a partir de R$ 100. Confirme o desconto no resumo do carrinho antes de finalizar.',
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
        question: 'O cupom dá frete grátis?',
        answer:
          'Não necessariamente. O cupom concede desconto nos produtos; frete, prazo e condições de entrega seguem as regras da loja oficial Dolce Gusto.',
      },
      {
        question: 'O cupom CECI é cumulativo?',
        answer:
          'Depende da campanha vigente. Cupons costumam não acumular com outras promoções, mas alguns kits podem aceitar desconto. O valor final do carrinho é a referência.',
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
        title: 'Cupom CECI NESCAFÉ Dolce Gusto: como usar o desconto de 5% (AGOSTO 2026)',
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
      note: 'Pode variar conforme campanha ativa da loja',
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
    brandColor: '#111827',
    get code() { return getPrimaryRewardCode().code; },
    get discount() { return `Até ${getPrimaryRewardCode().newCustomerDiscount}% OFF`; },
    get discountNumber() { return getPrimaryRewardCode().newCustomerDiscount; },
    offerTypeLabel: 'código de recompensa',
    offerTypeLabelPlural: 'códigos de recompensa',
    get offerActionLabel() { return `somar até ${getPrimaryRewardCode().newCustomerDiscount}% extras`; },
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
    featured: true,
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
          url: '/reviews/yesstyle-reward-code-coupon-cecilia010',
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
    slug: 'nutren',
    brand: 'Nestlé Nutre',
    officialUrl: 'https://www.nestlenutre.com.br/',
    offerUrl: 'https://www.nestlenutre.com.br/',
    brandIcon: 'N',
    brandLogo: '/images/about/partners/nutren.png',
    brandLogoAlt: 'Marca Nestlé Nutre',
    brandColor: '#0056A4',
    code: 'CECI',
    discount: '5% OFF',
    discountNumber: 5,
    category: 'Nutrição e bem-estar',
    shortDescription: 'produtos Nestlé Nutre, exceto Alfamino e Alfaré',
    longDescription:
      'Código da Cecília para economizar em produtos Nestlé Nutre na loja oficial, exceto Alfamino e Alfaré.',
    metaTitle: 'Cupom Nestlé Nutre Agosto 2026: CECI — 5% OFF na Loja Oficial',
    metaDescription:
      'Cupom Nestlé Nutre testado em agosto de 2026: use CECI no checkout da loja oficial e ganhe 5% OFF. Válido para produtos Nestlé Nutre, exceto Alfamino e Alfaré.',
    eligibleCategories: 'Produtos Nestlé Nutre, exceto Alfamino e Alfaré',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping: 'Calculado separadamente, conforme política da loja',
    combinable: 'Pode variar conforme campanha ativa da loja oficial',
    lastVerified: '2026-08-01',
    aboutBrand:
      'A Nestlé Nutre é uma loja oficial da Nestlé voltada a produtos de nutrição e suplementação, com opções para diferentes rotinas e necessidades alimentares. Os produtos disponíveis podem fazer parte do dia a dia de quem busca praticidade na alimentação, sempre conforme as indicações do rótulo e, quando necessário, com orientação de um profissional de saúde. O cupom CECI foi criado para quem acompanha o Em Casa com Cecília e quer economizar na loja oficial, com exceção de Alfamino e Alfaré. Como em toda parceria comercial, a recomendação é conferir o desconto aplicado no checkout antes de finalizar a compra.',
    faqs: [
      {
        question: 'O cupom CECI vale para todos os produtos Nestlé Nutre?',
        answer:
          'O cupom vale para produtos Nestlé Nutre, com exceção de Alfamino e Alfaré. Confirme se o desconto aparece no checkout antes de finalizar.',
      },
      {
        question: 'O cupom CECI funciona nos produtos Nestlé Nutre?',
        answer:
          'Sim, o cupom foi cadastrado para produtos Nestlé Nutre, exceto Alfamino e Alfaré. Valide no carrinho antes de concluir a compra.',
      },
      {
        question: 'Posso usar o cupom CECI mais de uma vez?',
        answer:
          'A regra de reutilização depende da política da loja e da campanha vigente. Se houver limite por conta, CPF ou pedido, o checkout informa.',
      },
      {
        question: 'O cupom dá frete grátis?',
        answer:
          'Não necessariamente. O cupom aplica desconto nos produtos; frete, prazo e condições de entrega seguem a política da loja oficial.',
      },
      {
        question: 'O cupom CECI é cumulativo?',
        answer:
          'Pode variar conforme campanha ativa da loja oficial. O valor final exibido no carrinho é a referência para saber se o cupom acumulou ou substituiu outra condição.',
      },
      {
        question: 'O link leva para a loja oficial?',
        answer:
          'Sim. O botão de compra aponta para o site oficial Nestlé Nutre informado pela parceria.',
      },
      {
        question: 'O que fazer se o cupom CECI não funcionar?',
        answer:
          'Verifique se o produto não é Alfamino ou Alfaré, se o código foi digitado corretamente e se a campanha ainda está ativa. Se ainda assim não funcionar, avise pelo contato do site para que a informação seja revisada.',
      },
    ],
    status: 'ativo',
    featured: true,
    relatedContent: [
      {
        title: 'Cupom Nestlé Nutre CECI: como usar o desconto de 5%',
        url: '/reviews/cupom-ceci-nestle-nutre-como-usar',
        type: 'review',
        publishedAt: '2026-07-10',
      },
    ],
    monthlyHighlight: {
      scope: 'em produtos Nestlé Nutre, exceto Alfamino e Alfaré',
      note: 'Válido para a loja Nestlé Nutre, com exceção de Alfamino e Alfaré',
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
    brandColor: '#2D1B4E',
    code: 'CECIEMCASA',
    discount: '10% OFF',
    discountNumber: 10,
    category: 'Sono e conforto',
    shortDescription: 'todo o site I Wanna Sleep',
    longDescription:
      'Código da Cecília para economizar em compras no site da I Wanna Sleep.',
    metaTitle: 'Cupom I Wanna Sleep Agosto 2026: CECIEMCASA — 10% OFF',
    metaDescription:
      'Cupom I Wanna Sleep atualizado em agosto de 2026: use CECIEMCASA no checkout e ganhe 10% OFF em todo o site oficial.',
    eligibleCategories:
      'Todo o site I Wanna Sleep',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping: 'Calculado separadamente, conforme política da loja',
    combinable: 'Pode variar conforme campanha ativa da loja oficial',
    lastVerified: '2026-08-01',
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
        question: 'O cupom dá frete grátis?',
        answer:
          'Não necessariamente. O cupom aplica desconto nos produtos; frete, prazo e condições de entrega seguem a política da loja oficial.',
      },
      {
        question: 'O cupom CECIEMCASA é cumulativo?',
        answer:
          'Pode variar conforme campanha ativa da loja oficial. O valor final exibido no carrinho é a referência para saber se o cupom acumulou ou substituiu outra condição.',
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
    featured: true,
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
    shortDescription: 'produtos vendidos e entregues pelo Magalu na loja Magazine Você da Cecília',
    longDescription:
      'Códigos exclusivos da parceria da Cecília com o Magalu, em 10 faixas de R$ 10 a R$ 100 OFF conforme o valor do carrinho. Válidos apenas na loja Magazine Você da Cecília, em produtos vendidos e entregues pelo Magalu.',
    metaTitle: 'Cupom Magalu Agosto 2026: 100EMCASACOMCECILIA até R$ 100 OFF',
    metaDescription:
      'Cupom Magalu em agosto 2026: use 100EMCASACOMCECILIA e ganhe até R$ 100 OFF na loja Magazine Você da Cecília. Válido só no navegador — veja todas as faixas.',
    eligibleCategories:
      'Produtos vendidos e entregues pelo Magalu, conforme a faixa de valor mínimo de cada cupom',
    validity: 'Cupons ativos enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja Magazine Você',
    shipping: 'Calculado separadamente, conforme política do Magalu',
    combinable:
      'Em regra, cupons não acumulam com outras promoções; confirme no checkout',
    lastVerified: '2026-08-01',
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
          'Em regra, estes códigos da Cecília não acumulam com outras promoções ou códigos na loja Magazine Você da Cecília. O valor final exibido no checkout é sempre a referência.',
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
          'A última verificação dos 10 códigos foi em 1º de agosto de 2026. Todos estavam ativos. Esta página é atualizada sempre que algo muda na campanha — se um código deixar de funcionar, o aviso aparece aqui.',
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
    featured: true,
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
    offerMode: 'affiliate-link',
    slug: 'shein',
    brand: 'SHEIN',
    officialUrl: 'https://br.shein.com/',
    offerUrl: 'https://br.shein.com/ark/5231?test=5051&url_from=affiliate_koc_6177013015&scene=1&ad_type=KOC&language=pt-br&siteuid=br&version_bid=101804616,101804641&version_eid=100693341&landing_page_id=5231&ad_test_id=49940&campaign=picklist&koc_id=6177013015&requestId=903986f526dd9d1c&search_redir=1&src_module=search&ici=s1%60EditSearch%604CW5Y%60_fb%60d1%60PageOthers&src_identifier=st%3D2%60sc%3D4CW5Y%60sr%3D0%60ps%3D1&tv_b=2&src_tab_page_id=page_home1786396601153&search_words=4CW5Y&campaign_id=20',
    brandIcon: 'S',
    brandLogo: '/images/about/partners/shein.webp',
    brandLogoAlt: 'Marca SHEIN',
    brandColor: '#111111',
    discount: 'Campanhas vigentes',
    offerTypeLabel: 'oferta',
    offerTypeLabelPlural: 'ofertas',
    offerActionLabel: 'Ver ofertas na SHEIN',
    category: 'Moda, acessórios, beleza e casa',
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
    lastVerified: '2026-08-11',
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
    affiliateAccountId: '6177013015',
    referral: {
      code: '4CW5Y',
      label: 'Código de indicação da Cecília',
      instructions: 'Pesquise 4CW5Y no aplicativo SHEIN e confira as condições apresentadas para a sua conta.',
      verifiedAt: '2026-08-11',
    },
    campaigns: [
      {
        title: 'Produtos selecionados',
        code: '37S3442',
        offerUrl: 'https://onelink.shein.com/47/5yl4fyr203o0',
        description: 'Produtos selecionados com descontos por tempo limitado.',
        eligibility: 'Consulte os itens e as condições exibidas pela SHEIN.',
        verifiedAt: '2026-08-11',
      },
      {
        title: '50% para novos usuários',
        code: 'G326U6B',
        offerUrl: 'https://onelink.shein.com/47/5yl4h46pd93c',
        description: 'Campanha com cupom de 50% voltada apenas a novos usuários.',
        eligibility: 'Somente novos usuários elegíveis, conforme validação da SHEIN.',
        verifiedAt: '2026-08-11',
      },
    ],
    status: 'ativo',
    featured: true,
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
    featured: true,
  },
];

export function getActiveCoupons(): Coupon[] {
  return COUPONS.filter((coupon) => coupon.status === 'ativo');
}

export function getCouponBySlug(slug: string): Coupon | undefined {
  return COUPONS.find((coupon) => coupon.slug === slug && coupon.status === 'ativo');
}

export function getOtherActiveCoupons(currentSlug: string): Coupon[] {
  return getActiveCoupons().filter((coupon) => coupon.slug !== currentSlug);
}

export function getAllActiveCouponSlugs(): string[] {
  return getActiveCoupons().map((coupon) => coupon.slug);
}

export function getCouponStats() {
  const activeCoupons = getActiveCoupons();
  const couponCodeOffers = activeCoupons.filter(
    (coupon): coupon is CouponCodeOffer => coupon.offerMode === 'discount-code'
  );
  const averageDiscount = couponCodeOffers.length
    ? couponCodeOffers.reduce((total, coupon) => total + coupon.discountNumber, 0) / couponCodeOffers.length
    : 0;
  const lastUpdate = activeCoupons
    .map((coupon) => coupon.lastVerified)
    .sort()
    .reverse()[0];

  return {
    activeCount: activeCoupons.length,
    averageDiscount: Math.round(averageDiscount),
    lastUpdate,
  };
}
