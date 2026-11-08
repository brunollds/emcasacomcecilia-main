import { type Locale } from './locales';
import { COUPON_STORE_COPY } from '@/components/coupons/couponStoreCopy';
import { LOCALE_FAQ_COPY } from '@/components/faqs/localeFaqCopy';
import { getShellCopy } from './shellDictionary';
import { getReviewHubPath } from '@/lib/review-hubs';
import { REVIEW_CATEGORIES, parseReviewCategory, type ReviewCategory } from '@/lib/reviewDiscovery';

export type NavId =
  | 'reviews'
  | 'reviews-all'
  | `categoria:${ReviewCategory}`
  | 'cupons'
  | 'receitas'
  | 'videos'
  | 'sobre'
  | 'faqs'
  | 'contato';

export interface NavItem {
  id: NavId;
  href: string;
  label: string;
}

export interface ShellMenu {
  primary: Array<NavItem & { children?: NavItem[] }>;
  more: NavItem[];
  moreLabel: string | null;
  searchLabels: { open: string; close: string };
  reviewsListLabel: string | null;
  dicasLabels: { short: string; long: string } | null;
  footerLabels: { partners: string } | null;
  footerFaq: { href: string; label: string } | null;
  mediaKitLabel: string | null;
}

export interface ActiveNav {
  section: 'reviews' | 'cupons' | 'receitas' | 'more' | null;
  item: NavId | null;
  pageHref: string | null;
}

const NO_ACTIVE: ActiveNav = { section: null, item: null, pageHref: null };

const PT_MORE: NavItem[] = [
  { id: 'videos', href: '/videos', label: 'Vídeos' },
  { id: 'sobre', href: '/sobre', label: 'Sobre' },
  { id: 'faqs', href: '/faqs', label: 'FAQs' },
  { id: 'contato', href: '/contato', label: 'Contato' },
];

// O hub de cupons de cada idioma. Não importamos de couponHub.ts (getCouponHubPath) porque o menu roda no cliente
// e aquele arquivo traz os textos dos cupons; o teste do shell confere que é o mesmo endereço.
const couponsPath = (locale: Locale) => `/${locale}/coupons`;

export function getShellMenu(locale: Locale): ShellMenu {
  const copy = getShellCopy(locale);
  // A lupa existe nos 10 idiomas; fora do PT, ela busca no índice do idioma (artigos e lojas).
  const searchLabels = { open: copy.openSearchLabel, close: copy.closeSearchLabel };

  if (locale !== 'pt') {
    return {
      primary: [
        { id: 'reviews', href: getReviewHubPath(locale), label: copy.reviewHubLabel },
        { id: 'cupons', href: couponsPath(locale), label: COUPON_STORE_COPY[locale].couponsLabel },
      ],
      more: [],
      moreLabel: null,
      searchLabels,
      reviewsListLabel: null,
      dicasLabels: null,
      footerLabels: null,
      footerFaq: { href: `/${locale}/faq`, label: LOCALE_FAQ_COPY[locale].title },
      mediaKitLabel: LOCALE_FAQ_COPY[locale].newsMediaKit,
    };
  }

  const reviewChildren: NavItem[] = [
    { id: 'reviews-all', href: '/reviews', label: 'Todos os guias e análises' },
    ...REVIEW_CATEGORIES.map(({ value, label }): NavItem => ({
      id: `categoria:${value}`,
      href: `/reviews?categoria=${value}`,
      label,
    })),
  ];

  return {
    primary: [
      { id: 'reviews', href: '/reviews', label: 'Guias & Análises', children: reviewChildren },
      { id: 'cupons', href: '/cupons', label: 'Cupons' },
      { id: 'receitas', href: '/receitas', label: 'Receitas' },
    ],
    more: PT_MORE,
    moreLabel: 'Mais',
    searchLabels,
    reviewsListLabel: 'Categorias de Guias & Análises',
    dicasLabels: { short: 'Dicas', long: 'Dicas & Ofertas' },
    footerLabels: { partners: 'Parceiros' },
    footerFaq: null,
    mediaKitLabel: 'Media Kit',
  };
}

// "page" no link da página aberta; "true" no item principal da seção em que ela está.
export function getAriaCurrent(href: string, active: ActiveNav, inSection: boolean): 'page' | 'true' | undefined {
  if (href === active.pageHref) return 'page';
  return inSection ? 'true' : undefined;
}

function trimSlash(path: string): string {
  return path.length > 1 ? path.replace(/\/+$/, '') : path;
}

// O caminho é a própria seção ou está dentro dela (a barra importa: /reviewsx não é /reviews).
function isWithin(path: string, base: string): boolean {
  return path === base || path.startsWith(`${base}/`);
}

export function getActiveNav(pathname: string, search: string, locale: Locale): ActiveNav {
  const path = trimSlash(pathname);

  if (locale !== 'pt') {
    // Fora do PT, as lojas (e a YesStyle, em /<locale>/coupons/yesstyle) ficam dentro da seção Coupons.
    const sections = [
      ['reviews', getReviewHubPath(locale)],
      ['cupons', couponsPath(locale)],
    ] as const;
    for (const [section, base] of sections) {
      if (isWithin(path, base)) return { section, item: null, pageHref: path === base ? base : null };
    }
    return NO_ACTIVE;
  }

  if (path === '/reviews') {
    const rawCategory = new URLSearchParams(search).get('categoria');
    const category = parseReviewCategory(rawCategory);
    if (category) {
      return {
        section: 'reviews',
        item: `categoria:${category}`,
        pageHref: `/reviews?categoria=${category}`,
      };
    }
    return { section: 'reviews', item: 'reviews-all', pageHref: rawCategory ? null : '/reviews' };
  }
  if (isWithin(path, '/reviews')) return { section: 'reviews', item: null, pageHref: null };

  for (const section of ['cupons', 'receitas'] as const) {
    const base = `/${section}`;
    if (isWithin(path, base)) return { section, item: null, pageHref: path === base ? base : null };
  }

  for (const { id, href } of PT_MORE) {
    if (isWithin(path, href)) return { section: 'more', item: id, pageHref: path === href ? href : null };
  }

  return NO_ACTIVE;
}
