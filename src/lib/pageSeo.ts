import type { Coupon } from '@/lib/couponsData';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';

// Imagem de compartilhamento e JSON-LD das páginas que listam artigos (subpágina de loja e página da
// data) e da página de cupom.

const SITE_URL = 'https://emcasacomcecilia.com';
export const SITE_NAME = 'Em Casa com Cecília';
const SITE_LOGO = '/images/logos/logo-em-casa-com-cecilia.png';

export const absoluteUrl = (path: string) => (path === '/' ? SITE_URL : `${SITE_URL}${path}`);

// Endereço completo da imagem, já no endereço de entrega (CDN ou o próprio site).
export function absoluteMediaUrl(path: string): string {
  return new URL(resolveMediaUrl(path), SITE_URL).toString();
}

export type SocialImage = { url: string; alt: string };

export const SITE_SOCIAL_IMAGE: SocialImage = { url: absoluteMediaUrl(SITE_LOGO), alt: SITE_NAME };

// A imagem da loja: a de compartilhamento, senão o logo da marca, senão o logo do site.
export function getStoreSocialImage(
  store: Pick<Coupon, 'socialImage' | 'socialImageAlt' | 'brandLogo' | 'brandLogoAlt'>
): SocialImage {
  return {
    url: absoluteMediaUrl(store.socialImage || store.brandLogo || SITE_LOGO),
    alt: store.socialImageAlt || store.brandLogoAlt || SITE_NAME,
  };
}

type PageLink = { name: string; path: string };

// A página como lista de artigos e o caminho até ela; o último item do caminho é a própria página.
export function getCollectionPageJsonLd({
  name,
  description,
  path,
  items,
  breadcrumb,
}: {
  name: string;
  description: string;
  path: string;
  items: PageLink[];
  breadcrumb: PageLink[];
}) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name,
      description,
      url: absoluteUrl(path),
      inLanguage: 'pt-BR',
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          url: absoluteUrl(item.path),
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [...breadcrumb, { name, path }].map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: absoluteUrl(item.path),
      })),
    },
  ];
}
