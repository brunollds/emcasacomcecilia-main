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
    shortDescription: 'móveis premium selecionados',
    longDescription:
      'Código exclusivo da Cecília para economizar em poltronas, sofás, camas estofadas e móveis selecionados da DAMIE.',
    metaTitle: 'Cupom DAMIE 12% OFF • CECILIA12 ativo • Em Casa com Cecília',
    metaDescription:
      'Cupom DAMIE atualizado junho 2026: use CECILIA12 para 12% OFF em poltronas, sofás e móveis selecionados.',
    eligibleCategories:
      'Poltronas reclináveis, sofás, camas estofadas e móveis selecionados',
    validity: 'Cupom permanente enquanto a parceria estiver ativa',
    reusable: 'Sim, sem limite de usos por CPF',
    shipping: 'Calculado separadamente, conforme política da loja',
    combinable: 'Não cumulativo com outros cupons ou promoções especiais',
    lastVerified: '2026-06-09',
    aboutBrand:
      'A DAMIE é uma marca brasileira de móveis estofados premium, com foco em poltronas reclináveis, sofás, camas e soluções de conforto para a casa. A Cecília usa produtos da marca no dia a dia e produziu reviews mostrando montagem, acabamento, conforto e uso real em casa. O cupom CECILIA12 foi criado para quem acompanha o Em Casa com Cecília e quer comprar com desconto direto no checkout. A proposta da parceria é simples: indicar produtos que fazem sentido para uma casa mais confortável, sem esconder que existe relação comercial e comissão de afiliado quando uma compra é feita pelo link ou cupom.',
    faqs: [
      {
        question: 'O cupom CECILIA12 funciona em todos os produtos da DAMIE?',
        answer:
          'O cupom vale para produtos elegíveis da DAMIE. Em geral, inclui poltronas, sofás, camas e móveis selecionados, mas itens em promoção especial podem ter regra própria. Confira se o desconto aparece no checkout antes de finalizar.',
      },
      {
        question: 'O cupom CECILIA12 é cumulativo com outras promoções?',
        answer:
          'Normalmente não. Cupons promocionais costumam substituir outras condições de desconto. Se a DAMIE estiver com uma promoção sazonal, compare o valor final no checkout.',
      },
      {
        question: 'O cupom inclui frete grátis?',
        answer:
          'Não. O cupom aplica desconto no valor dos produtos elegíveis. O frete é calculado separadamente pela loja conforme CEP, produto e política de entrega.',
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
    shortDescription: 'cápsulas, máquinas e acessórios selecionados',
    longDescription:
      'Código da Cecília para economizar em compras na loja oficial Nescafé Dolce Gusto Brasil.',
    metaTitle: 'Cupom Dolce Gusto 5% OFF • CECI ativo • Em Casa com Cecília',
    metaDescription:
      'Cupom Dolce Gusto com 5% OFF. Use CECI no checkout para economizar em cápsulas, máquinas e acessórios.',
    eligibleCategories:
      'Cápsulas selecionadas, máquinas Dolce Gusto e acessórios oficiais',
    validity: 'Cupom permanente enquanto a parceria estiver ativa',
    reusable: 'Sim, conforme regras da loja',
    shipping: 'Calculado separadamente, conforme política da loja',
    combinable: 'Pode variar conforme campanha ativa da loja oficial',
    lastVerified: '2026-04-30',
    aboutBrand:
      'A Nescafé Dolce Gusto é uma linha de cafés e bebidas em cápsulas da Nestlé, com máquinas e sabores pensados para preparo rápido em casa. A marca combina praticidade com variedade: cafés intensos, bebidas com leite, cappuccinos, chocolates e opções geladas aparecem no catálogo da loja oficial. O cupom CECI entra como benefício para quem acompanha a Cecília e quer economizar em cápsulas, máquinas ou acessórios selecionados. Como em toda parceria comercial, a recomendação deve ser conferida no checkout: o desconto aparece antes da finalização quando o produto está elegível.',
    faqs: [
      {
        question: 'O cupom CECI vale para todas as cápsulas Dolce Gusto?',
        answer:
          'O cupom pode valer para cápsulas selecionadas, mas a elegibilidade depende das regras atuais da loja. Sempre confirme se o desconto aparece no carrinho antes de finalizar.',
      },
      {
        question: 'O cupom CECI funciona em máquinas Dolce Gusto?',
        answer:
          'Pode funcionar em máquinas selecionadas. Caso o produto tenha uma campanha própria ou restrição comercial, o checkout informa se o cupom é aceito.',
      },
      {
        question: 'Posso usar o cupom CECI mais de uma vez?',
        answer:
          'A regra pode variar conforme campanha da loja oficial, mas o cupom foi cadastrado como benefício recorrente da Cecília. Confira as condições no carrinho.',
      },
      {
        question: 'O cupom dá frete grátis?',
        answer:
          'Não necessariamente. O cupom concede desconto nos produtos elegíveis; frete, prazo e condições de entrega seguem as regras da loja oficial Dolce Gusto.',
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
    category: 'Beleza, moda e lifestyle',
    shortDescription: 'beleza coreana, skincare, moda e produtos selecionados',
    longDescription:
      'Código da Cecília para economizar em compras selecionadas na YesStyle, incluindo produtos de beleza, skincare, moda e lifestyle.',
    metaTitle: 'Cupom YesStyle 5% OFF • CECILIA010 ativo • Em Casa com Cecília',
    metaDescription:
      'Cupom YesStyle com 5% OFF. Use CECILIA010 para economizar em beleza coreana, skincare, moda e produtos selecionados.',
    eligibleCategories:
      'Produtos selecionados de beleza, skincare, moda, acessórios e lifestyle conforme regras da loja',
    validity: 'Cupom ativo enquanto a parceria estiver vigente',
    reusable: 'Sim, conforme regras da loja',
    shipping: 'Calculado separadamente, conforme política internacional da loja',
    combinable: 'Pode variar conforme campanha ativa da YesStyle',
    lastVerified: '2026-06-02',
    aboutBrand:
      'A YesStyle é uma loja internacional conhecida por produtos de beleza asiática, skincare, moda, acessórios e itens de lifestyle. O cupom CECILIA010 entra como benefício para quem acompanha o Em Casa com Cecília e quer economizar em compras selecionadas. Como regras de desconto, frete e elegibilidade podem variar por campanha, produto e país de entrega, a recomendação é sempre conferir o desconto aplicado no carrinho antes de finalizar a compra.',
    faqs: [
      {
        question: 'O cupom CECILIA010 funciona em todos os produtos da YesStyle?',
        answer:
          'O cupom pode valer para produtos selecionados da YesStyle. A elegibilidade depende das regras atuais da loja, então confirme se o desconto aparece no checkout antes de finalizar.',
      },
      {
        question: 'O cupom CECILIA010 vale para skincare e beleza coreana?',
        answer:
          'Pode valer para itens selecionados de skincare, beleza coreana e cosméticos, desde que estejam dentro das condições comerciais da campanha ativa.',
      },
      {
        question: 'O cupom YesStyle dá frete grátis?',
        answer:
          'Não necessariamente. O cupom aplica desconto nos produtos elegíveis; frete, prazo e condições de entrega seguem as regras internacionais da YesStyle.',
      },
      {
        question: 'O cupom CECILIA010 é cumulativo com outras promoções?',
        answer:
          'Pode variar conforme campanha vigente. O valor final exibido no carrinho é sempre a referência para saber se o cupom acumulou ou substituiu outra condição.',
      },
      {
        question: 'Posso usar o cupom CECILIA010 mais de uma vez?',
        answer:
          'A regra de reutilização depende da política da loja e da campanha vigente. Se houver limite por conta, CPF ou pedido, o checkout informa.',
      },
      {
        question: 'Comprar com o cupom apoia o Em Casa com Cecília?',
        answer:
          'Sim, a compra pode gerar comissão para o Em Casa com Cecília, sem custo extra para você. O desconto aparece no checkout quando o cupom é aceito.',
      },
    ],
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
    shortDescription: 'chocolates, presentes e produtos selecionados',
    longDescription:
      'Código da Cecília para economizar em compras de chocolates, presentes e produtos selecionados na Kopenhagen.',
    metaTitle: 'Cupom Kopenhagen 10% OFF • CECILIA10 ativo • Em Casa com Cecília',
    metaDescription:
      'Cupom Kopenhagen com 10% OFF. Use CECILIA10 no checkout para economizar em chocolates, presentes e produtos selecionados.',
    eligibleCategories:
      'Chocolates, presentes, kits e produtos selecionados conforme regras da loja',
    validity: 'Cupom permanente enquanto a parceria estiver ativa',
    reusable: 'Sim, conforme regras da loja',
    shipping: 'Calculado separadamente, conforme política da loja',
    combinable: 'Pode variar conforme campanha ativa da Kopenhagen',
    lastVerified: '2026-05-02',
    aboutBrand:
      'A Kopenhagen é uma das marcas de chocolate mais conhecidas do Brasil, com linhas voltadas para presentes, datas comemorativas e momentos especiais em casa. No universo Em Casa com Cecília, o cupom CECILIA10 entra como benefício para quem quer comprar chocolates, kits e produtos selecionados com desconto direto no checkout. Como as campanhas podem variar por data, estoque e categoria, a recomendação é conferir o desconto no carrinho antes de finalizar a compra. A página reúne o código ativo, instruções de uso e transparência sobre a parceria.',
    faqs: [
      {
        question: 'O cupom CECILIA10 funciona em todos os produtos da Kopenhagen?',
        answer:
          'O cupom pode valer para produtos selecionados da Kopenhagen. A elegibilidade depende das regras atuais da loja, então confirme se o desconto aparece no checkout antes de finalizar.',
      },
      {
        question: 'O cupom CECILIA10 vale para presentes e kits?',
        answer:
          'Pode valer para kits, presentes e chocolates selecionados, desde que estejam dentro das condições comerciais da campanha ativa.',
      },
      {
        question: 'O cupom Kopenhagen dá frete grátis?',
        answer:
          'Não necessariamente. O cupom aplica desconto nos produtos elegíveis; frete, prazo e condições de entrega seguem as regras da loja.',
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
