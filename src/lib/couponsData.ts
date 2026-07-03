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

export interface Coupon {
  slug: string;
  brand: string;
  brandUrl: string;
  brandIcon: string;
  brandLogo?: string;
  brandLogoAlt?: string;
  socialImage?: string;
  socialImageAlt?: string;
  brandColor: string;
  code: string;
  discount: string;
  discountNumber: number;
  offerTypeLabel?: string;
  offerTypeLabelPlural?: string;
  offerActionLabel?: string;
  codeFieldLabel?: string;
  codeInstructions?: string[];
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
  history?: CouponHistory[];
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
}

export const COUPONS: Coupon[] = [
  {
    slug: 'damie',
    brand: 'DAMIE',
    brandUrl: 'https://damie.com.br',
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
      'Cupom DAMIE atualizado julho 2026: use CECILIA12 para 12% OFF em todo o site.',
    eligibleCategories:
      'Todo o site DAMIE',
    validity: 'Cupom permanente enquanto a parceria estiver ativa',
    reusable: 'Sim, sem limite de usos por CPF',
    shipping: 'Calculado separadamente, conforme política da loja',
    combinable: 'Não cumulativo com outros cupons ou promoções especiais',
    lastVerified: '2026-07-09',
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
    slug: 'dolce-gusto',
    brand: 'Dolce Gusto',
    brandUrl: 'https://www.nescafe-dolcegusto.com.br/',
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
    metaTitle: 'Cupom Dolce Gusto 5% OFF • CECI ativo • Em Casa com Cecília',
    metaDescription:
      'Cupom Dolce Gusto com 5% OFF. Use CECI no checkout para economizar em cápsulas, máquinas e acessórios.',
    eligibleCategories:
      'Todo o site oficial Dolce Gusto, conforme regras da campanha',
    validity: 'Cupom permanente enquanto a parceria estiver ativa',
    reusable: 'Sim, conforme regras da loja',
    shipping: 'Calculado separadamente, conforme política da loja',
    combinable: 'Pode variar conforme campanha ativa da loja oficial',
    lastVerified: '2026-07-30',
    aboutBrand:
      'A Nescafé Dolce Gusto é uma linha de cafés e bebidas em cápsulas da Nestlé, com máquinas e sabores pensados para preparo rápido em casa. A marca combina praticidade com variedade: cafés intensos, bebidas com leite, cappuccinos, chocolates e opções geladas aparecem no catálogo da loja oficial. O cupom CECI entra como benefício para quem acompanha a Cecília e quer economizar em compras na loja oficial. Como em toda parceria comercial, a recomendação deve ser conferida no checkout: o desconto aparece antes da finalização quando a regra da campanha permite.',
    faqs: [
      {
        question: 'O cupom CECI vale para todas as cápsulas Dolce Gusto?',
        answer:
          'O cupom vale para compras na loja oficial Dolce Gusto, conforme as regras ativas da campanha. Sempre confirme se o desconto aparece no carrinho antes de finalizar.',
      },
      {
        question: 'O cupom CECI funciona em máquinas Dolce Gusto?',
        answer:
          'Pode funcionar em máquinas Dolce Gusto. Caso algum produto tenha uma campanha própria ou restrição comercial, o checkout informa se o cupom é aceito.',
      },
      {
        question: 'Posso usar o cupom CECI mais de uma vez?',
        answer:
          'A regra pode variar conforme campanha da loja oficial, mas o cupom foi cadastrado como benefício recorrente da Cecília. Confira as condições no carrinho.',
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
    monthlyHighlight: {
      scope: 'na loja oficial',
      note: 'Pode variar conforme campanha ativa da loja',
    },
    status: 'ativo',
    featured: true,
  },
  {
    slug: 'yesstyle',
    brand: 'YesStyle',
    brandUrl: 'https://ystyle.co/x5pes',
    brandIcon: 'YS',
    brandLogo: '/images/logos/yesstyle.jpg',
    brandLogoAlt: 'Marca YesStyle',
    brandColor: '#111827',
    code: 'CECILIA010',
    discount: '5% OFF',
    discountNumber: 5,
    offerTypeLabel: 'código de recompensa',
    offerTypeLabelPlural: 'códigos de recompensa',
    offerActionLabel: 'somar 5% extras',
    codeFieldLabel: 'Reward Code / Código de Recompensa',
    codeInstructions: [
      'Copie o código de recompensa CECILIA010 no card acima.',
      'Acesse a YesStyle e adicione seus produtos ao carrinho.',
      'No checkout, cole CECILIA010 no campo Reward Code / Código de Recompensa, não no campo de cupom.',
      'Se houver um cupom promocional ativo da YesStyle, aplique esse cupom no campo Coupon Code / Código de Cupom.',
      'Confira se o desconto do cupom e os 5% extras do CECILIA010 aparecem separados no resumo do pedido.',
    ],
    category: 'Beleza, moda e lifestyle',
    shortDescription: 'beleza coreana, skincare, moda e lifestyle',
    longDescription:
      'CECILIA010 é um código de recompensa da YesStyle, não um cupom tradicional: ele adiciona 5% extras no campo Reward Code e pode ser usado junto com cupons promocionais ativos.',
    metaTitle: 'Código de recompensa YesStyle • CECILIA010 + cupons',
    metaDescription:
      'CECILIA010 é código de recompensa YesStyle: use no campo Reward Code para somar 5% extras aos cupons ativos em K-beauty, skincare e moda.',
    eligibleCategories:
      'Beleza, skincare, moda, acessórios e lifestyle, conforme regras da loja',
    validity: 'Código de recompensa ativo enquanto a parceria estiver vigente',
    reusable: 'Sim, conforme regras da loja',
    shipping: 'Calculado separadamente, conforme política internacional da loja',
    combinable: 'Sim: deve ser usado no campo Reward Code e pode somar aos cupons ativos aplicados no campo Coupon Code',
    lastVerified: '2026-07-02',
    aboutBrand:
      'A YesStyle é uma loja internacional conhecida por produtos de beleza asiática, skincare, moda, acessórios e itens de lifestyle. O CECILIA010 entra como código de recompensa de influenciador para quem acompanha o Em Casa com Cecília e quer economizar no site. A diferença importante é que ele não substitui o cupom promocional da loja: deve ser aplicado no campo Reward Code para somar 5% extras aos cupons ativos inseridos no campo Coupon Code. Como regras de desconto, frete e aplicação podem variar por campanha, produto e país de entrega, confira sempre o resumo do carrinho antes de finalizar a compra.',
    faqs: [
      {
        question: 'CECILIA010 é cupom ou código de recompensa da YesStyle?',
        answer:
          'CECILIA010 é um código de recompensa (Reward Code) de influenciador. Ele deve ser colocado no campo Reward Code / Código de Recompensa, não no campo de cupom tradicional.',
      },
      {
        question: 'Posso usar CECILIA010 junto com um cupom YesStyle?',
        answer:
          'Sim. A principal vantagem é justamente somar: CECILIA010 vai no campo Reward Code e o cupom promocional ativo vai no campo Coupon Code. Confira os dois descontos no resumo do pedido.',
      },
      {
        question: 'O código de recompensa CECILIA010 vale para skincare e beleza coreana?',
        answer:
          'Pode valer para skincare, K-beauty, cosméticos, moda e lifestyle conforme as condições comerciais da YesStyle. O checkout sempre mostra se o benefício foi aplicado.',
      },
      {
        question: 'CECILIA010 dá frete grátis?',
        answer:
          'Não necessariamente. O código de recompensa adiciona benefício nos produtos elegíveis; frete, prazo e condições de entrega seguem as regras internacionais da YesStyle.',
      },
      {
        question: 'Posso usar CECILIA010 mais de uma vez?',
        answer:
          'A regra de reutilização depende da política da YesStyle e do programa de recompensas vigente. Se houver limite por conta ou pedido, o checkout informa.',
      },
      {
        question: 'Usar o código de recompensa apoia o Em Casa com Cecília?',
        answer:
          'Sim, o uso do CECILIA010 pode gerar comissão, crédito ou benefício de afiliado para o Em Casa com Cecília, sem custo extra para você.',
      },
    ],
    monthlyHighlight: {
      scope: 'na YesStyle',
      note: 'Não é cupom tradicional: use no campo Reward Code para somar 5% extras aos cupons ativos',
    },
    status: 'ativo',
    featured: true,
  },
  {
    slug: 'nutren',
    brand: 'Nestlé Nutre',
    brandUrl: 'https://www.nestlenutre.com.br/',
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
    metaTitle: 'Cupom Nestlé Nutre 5% OFF • CECI ativo • Em Casa com Cecília',
    metaDescription:
      'Cupom Nestlé Nutre com 5% OFF. Use CECI no checkout para economizar em produtos Nestlé Nutre, exceto Alfamino e Alfaré.',
    eligibleCategories: 'Produtos Nestlé Nutre, exceto Alfamino e Alfaré',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping: 'Calculado separadamente, conforme política da loja',
    combinable: 'Pode variar conforme campanha ativa da loja oficial',
    lastVerified: '2026-07-26',
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
    monthlyHighlight: {
      scope: 'em produtos Nestlé Nutre, exceto Alfamino e Alfaré',
      note: 'Válido para a loja Nestlé Nutre, com exceção de Alfamino e Alfaré',
    },
    status: 'ativo',
    featured: true,
  },
  {
    slug: 'i-wanna-sleep',
    brand: 'I Wanna Sleep',
    brandUrl: 'https://www.iwannasleep.com.br',
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
    metaTitle: 'Cupom I Wanna Sleep 10% OFF • CECIEMCASA ativo • Em Casa com Cecília',
    metaDescription:
      'Cupom I Wanna Sleep com 10% OFF. Use CECIEMCASA para economizar em todo o site.',
    eligibleCategories:
      'Todo o site I Wanna Sleep',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Conforme regras da loja',
    shipping: 'Calculado separadamente, conforme política da loja',
    combinable: 'Pode variar conforme campanha ativa da loja oficial',
    lastVerified: '2026-07-26',
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
    slug: 'kopenhagen',
    brand: 'Kopenhagen',
    brandUrl: 'https://www.kopenhagen.com.br/',
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
  const averageDiscount = activeCoupons.length
    ? activeCoupons.reduce((total, coupon) => total + coupon.discountNumber, 0) / activeCoupons.length
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
