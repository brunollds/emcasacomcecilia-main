import type { CouponHubCategory } from './couponsData';

// Cadastro enxuto de ofertas especiais por link convertido (sem cupom exclusivo em couponsData.ts)
// para a landing page /blackfriday e suas subpáginas /blackfriday/[slug].
// Importante: ao adicionar um novo domínio externo aqui, inclua-o também em PARTNER_HOSTS (src/lib/partnerHosts.ts).

export type FestivalBannerStrip = {
  id: string;
  slug: string;
  brand: string;
  initials: string;
  brandColor: string;
  orbBackground?: string;
  eyebrow: string;
  tag: string;
  headline: string;
  subtext: string;
  href: string;
  // Arte opcional servida pela própria CDN do site (src/lib/generated/media-delivery-map.json).
  // Não usar URL de imagem/pixel de servidor externo de afiliados enquanto o aviso de cookies cobrir só GA4 e Clarity.
  bannerImgSrc?: string;
  bannerImgAlt?: string;
  actionLabel: string;
  startsAt?: string;
  endsAt?: string;
};

export type FestivalExtraLinkPartner = {
  slug: string;
  brand: string;
  officialUrl: string;
  offerUrl: string;
  initials: string;
  brandColor: string;
  orbBackground?: string;
  hubCategory: CouponHubCategory;
  categoryName: string;
  discount: string;
  shortDescription: string;
  eligibleCategories: string;
  combinable: string;
  actionLabel: string;
  aboutBrand: string;
  shipping: string;
  validity: string;
  reusable: string;
  instructions?: string[];
  featured?: boolean;
  // Caminho já mapeado em src/lib/generated/media-delivery-map.json, se a loja tiver foto para a Vitrine.
  spotlightImage?: string;
  searchKeywords?: string[];
  campaigns?: {
    id: string;
    headline: string;
    text: string;
    action: string;
    tag?: string;
    href?: string;
    startsAt?: string;
    endsAt?: string;
  }[];
};

// Banners tipo faixa exibidos em "Destaques da Semana" na /blackfriday (e na subpágina /blackfriday/[slug]).
// Renderizados como faixa nativa com o link oficial convertido, sem carregar pixels externos de terceiros.
export const FESTIVAL_BANNER_STRIPS: readonly FestivalBannerStrip[] = [
  {
    id: 'netshoes-maior-barato-2026',
    slug: 'netshoes',
    brand: 'Netshoes',
    initials: 'NS',
    brandColor: '#5A2D82',
    orbBackground: '#efe5ff',
    eyebrow: 'Oferta Especial · Link Oficial',
    tag: 'BLACK FRIDAY',
    headline: 'Netshoes: O maior barato do ano',
    subtext:
      'Tênis, roupas esportivas, suplementos e equipamentos pelo link oficial convertido da parceria — sem precisar digitar cupom.',
    href: 'https://click.linksynergy.com/fs-bin/click?id=hDg25%2aL35IM&offerid=951620.378&subid=0&type=4',
    actionLabel: 'Abrir ofertas na Netshoes',
    endsAt: '2026-11-30T23:59:59-03:00',
  },
];

// Parceiros de link convertido exclusivos do Festival (/blackfriday): entram nos Stories, Pôster,
// Busca/Filtros, Modal e ganham subpágina /blackfriday/[slug], sem gerar rota em /cupons/[slug].
export const FESTIVAL_EXTRA_LINK_PARTNERS: readonly FestivalExtraLinkPartner[] = [
  {
    slug: 'netshoes',
    brand: 'Netshoes',
    officialUrl: 'https://www.netshoes.com.br',
    offerUrl:
      'https://click.linksynergy.com/fs-bin/click?id=hDg25%2aL35IM&offerid=951620.378&subid=0&type=4',
    initials: 'NS',
    brandColor: '#5A2D82',
    orbBackground: '#efe5ff',
    hubCategory: 'moda',
    categoryName: 'Esportes, tênis e moda fitness',
    discount: 'Ofertas oficiais',
    shortDescription: 'tênis, roupas esportivas, suplementos e equipamentos pelo link oficial da parceria',
    eligibleCategories: 'Ofertas e produtos selecionados no site oficial da Netshoes',
    combinable:
      'Sem código para copiar: os preços promocionais já aparecem aplicados pelo link oficial',
    actionLabel: 'Abrir ofertas na Netshoes',
    aboutBrand:
      'A Netshoes é uma das maiores lojas online de artigos esportivos do Brasil, com tênis de corrida e treino, roupas fitness, camisas de time, suplementos e acessórios. No Festival da Cecília, o acesso é direto pelo link oficial convertido da parceria via Rakuten Advertising, sem precisar digitar código no checkout.',
    shipping: 'Calculado pelo CEP no site ou aplicativo da Netshoes, conforme o lojista e a região',
    validity: 'Enquanto a parceria estiver ativa no site oficial da Netshoes',
    reusable: 'Sim, você pode acessar pelo link oficial quantas vezes quiser',
    instructions: [
      'Toque no botão acima para abrir a Netshoes pelo link oficial da parceria.',
      'Escolha os produtos desejados no site da loja, conferindo tamanho, cor e vendedor.',
      'Revise o valor final e o frete diretamente no resumo do carrinho da Netshoes antes de concluir.',
    ],
    searchKeywords: [
      'tenis',
      'corrida',
      'academia',
      'esporte',
      'esportes',
      'chuteira',
      'camisa de time',
      'fitness',
      'treino',
    ],
    campaigns: [
      {
        id: 'netshoes-maior-barato-camp-2026',
        headline: 'O maior barato do ano na Netshoes: ofertas de Black Friday',
        text: 'Campanha da própria Netshoes acessada direto pelo link convertido da parceria. Os produtos e as condições aparecem no site da loja.',
        action: 'Ver ofertas na Netshoes',
        tag: 'BLACK FRIDAY',
        endsAt: '2026-11-30T23:59:59-03:00',
      },
    ],
  },
];
