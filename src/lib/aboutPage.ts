import { brandLinks } from '@/lib/brandLinks';
import { CECILIA_PERSON_ID, CECILIA_SINCE, YESSTYLE_CERTIFICATE, getCertificateYears, isCertificateValid } from '@/lib/ceciliaCredentials';
import { getActiveCoupons } from '@/lib/couponsData';
import { TRANSLATED_LOCALES } from '@/lib/couponTranslations';
import { CECILIA_PHOTO, getCeciliaSocialStats } from '@/lib/homeStores';
import { SITE_NAME, SITE_URL, absoluteMediaUrl, absoluteUrl, type PageLink } from '@/lib/pageSeo';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';
import { getListedPortugueseReviews, type ReviewDiscoveryItem } from '@/lib/reviewDiscovery';

// A /sobre: quem é a Cecília, os números do site e das redes, o que tem no site, como testamos, a história,
// o bloco para marcas e as marcas parceiras. Os números saem dos dados (os mesmos da home e das listas em
// português), nunca escritos à mão. Recebe as reviews e as receitas por parâmetro, como os outros hubs.

export const ABOUT_TRAIL: PageLink[] = [
  { name: 'Início', path: '/' },
  { name: 'Sobre', path: '/sobre' },
];

export const ABOUT_META = {
  title: 'Sobre a Cecília | Em Casa com Cecília',
  description:
    'Quem é a Cecília e o que você encontra no Em Casa com Cecília: guias e análises de produtos, códigos das lojas parceiras, vídeos e receitas.',
  image: { url: absoluteMediaUrl('/images/about/cecilia/cecilia-6.jpg'), alt: 'Cecília, do Em Casa com Cecília' },
};

const SOCIAL_LABELS = {
  Instagram: 'seguidores no Instagram',
  TikTok: 'seguidores no TikTok',
  YouTube: 'inscritos no YouTube',
  Facebook: 'seguidores no Facebook',
} as const;

export type AboutStat = { value: string; label: string };

export type AboutPath = { href: string; title: string; text: string; linkLabel: string };

export type AboutPartner = { name: string; src: string; href: string };

export type AboutCertificate = {
  title: string;
  tier: string;
  linkLabel: string;
  closeLabel: string;
  image: { src: string; width: number; height: number; alt: string };
};

const PARTNERS: AboutPartner[] = [
  { name: 'DAMIE', src: '/images/about/partners/damie.jpg', href: brandLinks.damie },
  { name: 'Shopee', src: '/images/about/partners/shopee.png', href: 'https://shopee.com.br' },
  { name: 'Polishop', src: '/images/about/partners/polishop.jpg', href: 'https://polishop.com.br' },
  { name: 'Kopenhagen', src: '/images/about/partners/kopenhagen.jpg', href: 'https://kopenhagen.com.br' },
  { name: 'Nescafé Dolce Gusto', src: '/images/about/partners/dolce-gusto.avif', href: 'https://dolce-gusto.com.br' },
  { name: 'WAP', src: '/images/about/partners/wap.png', href: 'https://wap.com.br' },
  { name: 'EOS', src: '/images/about/partners/eos.jpg', href: 'https://eos.com.br' },
  { name: 'Mollycook', src: '/images/about/partners/mollycook.jpg', href: 'https://mollycook.com.br' },
  { name: 'Okoshi', src: '/images/about/partners/okoshi.webp', href: 'https://okoshi.com.br' },
  { name: 'Tempero do Anjo', src: '/images/about/partners/tempero-do-anjo.webp', href: 'https://www.instagram.com/tempero.do.anjo/' },
  { name: 'Itatiaia', src: '/images/about/partners/itatiaia.webp', href: 'https://www.minhaitatiaia.com.br/' },
  { name: 'Belle House', src: '/images/about/partners/belle-house.png', href: 'https://www.bellehousemobilia.com.br/' },
  { name: 'Carolina Baby', src: '/images/about/partners/carolina-baby.webp', href: 'https://carolinababy.com.br' },
  { name: 'A3 Home Design', src: '/images/about/partners/a3-home-design.jpg', href: 'https://a3homedesign.com.br' },
  { name: 'Santos Simões', src: '/images/about/partners/santos-simoes.webp', href: 'https://santossimoes.com.br' },
  { name: 'Laticínios Ubari', src: '/images/about/partners/laticinios-ubari.jpg', href: 'https://www.instagram.com/laticiniosubari/' },
  { name: 'ABC da Construção', src: '/images/about/partners/abc-da-construcao.png', href: 'https://abcdaconstrucao.com.br' },
  { name: 'Promobit', src: '/images/about/partners/promobit.jpg', href: 'https://promobit.com.br' },
  { name: 'Shein', src: '/images/about/partners/shein.webp', href: 'https://shein.com' },
  { name: "Let's Eat It", src: '/images/about/partners/letseatit.png', href: 'https://letseatit.com.br' },
  { name: 'Insider', src: '/images/about/partners/insider.png', href: 'https://www.insiderstore.com.br' },
  { name: 'Probiótica', src: '/images/about/partners/probiotica.png', href: 'https://www.probiotica.com.br' },
  { name: 'Dr. Peanut', src: '/images/about/partners/dr-peanut.png', href: 'https://www.drpeanut.com.br' },
  { name: 'Black Skull', src: '/images/about/partners/black-skull.png', href: 'https://www.blackskullusa.com.br' },
  { name: 'Lejour', src: '/images/about/partners/lejour.png', href: 'https://lejour.com.br' },
  { name: 'Max Titanium', src: '/images/about/partners/max-titanium.png', href: 'https://www.maxtitanium.com.br' },
  { name: 'Cléa Store', src: '/images/about/partners/clea-store.png', href: 'https://www.cleastore.com.br' },
  { name: 'Belive', src: '/images/about/partners/belive.png', href: 'https://belivebefree.com.br' },
];

const PORTUGUESE_LONG_DATE = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const longDate = (dayIso: string) => PORTUGUESE_LONG_DATE.format(new Date(`${dayIso}T00:00:00Z`));

// O selo só aparece enquanto o certificado vale. A página é gerada na build, então o dia é o da build.
function getCertificate(dayIso: string): AboutCertificate | null {
  if (!isCertificateValid(dayIso)) return null;
  return {
    title: YESSTYLE_CERTIFICATE.title,
    tier: `nível mais alto do programa de influenciadores da YesStyle · ${getCertificateYears()}`,
    linkLabel: 'Ver certificado',
    closeLabel: 'Fechar',
    image: {
      src: resolveMediaUrl(YESSTYLE_CERTIFICATE.image.src),
      width: YESSTYLE_CERTIFICATE.image.width,
      height: YESSTYLE_CERTIFICATE.image.height,
      alt: `Certificado de YesStyle Superstar Influencer da Cecília, válido de ${longDate(YESSTYLE_CERTIFICATE.validFrom)} a ${longDate(YESSTYLE_CERTIFICATE.validUntil)}`,
    },
  };
}

type AboutInput = {
  reviews: readonly ReviewDiscoveryItem[];
  recipes: readonly unknown[];
  // AAAA-MM-DD, em UTC; o padrão é hoje.
  today?: string;
};

export function getAboutContent({ reviews, recipes, today = new Date().toISOString().slice(0, 10) }: AboutInput) {
  const social = getCeciliaSocialStats();
  const counts = {
    articles: getListedPortugueseReviews(reviews).length,
    stores: getActiveCoupons().length,
    recipes: recipes.length,
  };

  const stats: AboutStat[] = [
    ...social.flatMap(({ name, followers }) => (followers ? [{ value: followers, label: SOCIAL_LABELS[name] }] : [])),
    { value: String(counts.articles), label: 'guias e análises' },
    { value: String(counts.stores), label: 'lojas parceiras' },
    { value: String(counts.recipes), label: 'receitas' },
  ];

  const paths: AboutPath[] = [
    {
      href: '/reviews',
      title: 'Guias & Análises',
      text: 'Como escolher, como usar e o que esperar de um produto antes de comprar. Quando a Cecília usou o produto, o artigo diz; quando o texto parte de fontes públicas, também diz.',
      linkLabel: 'Ver os guias e análises',
    },
    {
      href: '/cupons',
      title: 'Cupons e códigos',
      text: `Os códigos das ${counts.stores} lojas parceiras, com as regras, a validade e a data da última conferência de cada um.`,
      linkLabel: 'Ver os cupons',
    },
    {
      href: '/videos',
      title: 'Vídeos',
      text: 'Os vídeos da Cecília com o produto em uso, cada um com a página da loja quando há parceria.',
      linkLabel: 'Ver os vídeos',
    },
    {
      href: '/receitas',
      title: 'Receitas',
      text: 'As receitas que a Cecília faz em casa, com passo a passo e vídeo quando há.',
      linkLabel: 'Ver as receitas',
    },
  ];

  return {
    trail: ABOUT_TRAIL,
    since: CECILIA_SINCE,
    instagramFollowers: social.find(({ name }) => name === 'Instagram')?.followers,
    counts,
    stats,
    certificate: getCertificate(today),
    paths,
    otherLanguages: `Parte dos guias e as páginas da YesStyle e da SHEIN também existem em outros ${TRANSLATED_LOCALES.length} idiomas.`,
    contactEmail: brandLinks.contactEmail,
    contactMailto: brandLinks.contactMailto,
    mediaKit: brandLinks.mediaKit,
    partners: PARTNERS,
  };
}

export type AboutContent = ReturnType<typeof getAboutContent>;

// A Cecília no JSON-LD: o mesmo @id da home de cada idioma e da autoria dos artigos. A descrição é a do
// começo da página.
export function getAboutPersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': CECILIA_PERSON_ID,
    name: 'Cecília Mauad',
    url: absoluteUrl('/sobre'),
    image: new URL(CECILIA_PHOTO, SITE_URL).href,
    jobTitle: 'Jornalista e criadora de conteúdo',
    description: `Jornalista, mineira e mãe de dois, a Cecília mostra desde ${CECILIA_SINCE}, no ${SITE_NAME} e nas redes, o que usa e cozinha em casa.`,
    sameAs: [brandLinks.instagram, brandLinks.tiktok, brandLinks.youtube, brandLinks.facebook],
  };
}
