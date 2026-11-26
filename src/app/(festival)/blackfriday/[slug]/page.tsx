import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { FestivalPartnerClient } from '@/components/festival/FestivalPartnerClient';
import {
  getFestivalPartnerMeta,
  getFestivalPartnerPageData,
  getFestivalPartnerSlugs,
  isBlackFridaySeason,
} from '@/lib/festivalBlackFriday';

export const dynamicParams = false;
export const revalidate = 300;

export function generateStaticParams() {
  return getFestivalPartnerSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  {
    params,
  }: {
    params: Promise<{ slug: string }>;
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const store = getFestivalPartnerMeta(slug);
  if (!store) return {};

  const resolvedParent = await parent;
  const parentOgImages = resolvedParent.openGraph?.images;
  const parentTwitterImages = resolvedParent.twitter?.images;

  const isBf = isBlackFridaySeason(Date.now());
  const seasonLabel = isBf ? 'Black Friday' : 'Festival de Cupons';
  const isReward = store.offerMode === 'discount-code' && store.codeKind === 'reward';

  const title = isReward
    ? `${store.brand} (${store.discount}) — Reward Code ${store.code} | ${seasonLabel} da Cecília`
    : store.offerMode === 'discount-code' && store.code
      ? `${store.brand}: ${store.discount} com ${store.code} | ${seasonLabel} da Cecília`
      : `${store.brand}: ${store.discount} | ${seasonLabel} da Cecília`;

  const description = isReward
    ? `Reward Code ${store.code} (${store.discount}) na ${store.brand}, campanhas ativas e guias do Em Casa com Cecília.`
    : store.offerMode === 'discount-code' && store.code
      ? `Copie o código ${store.code} (${store.discount}) e abra o site oficial da ${store.brand}. Veja campanhas ativas, regras e guias.`
      : `Acesse ${store.discount} no site oficial da ${store.brand} pelo link oficial da parceria Em Casa com Cecília.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/blackfriday/${store.slug}`,
    },
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title,
      description,
      url: `/blackfriday/${store.slug}`,
      type: 'website',
      locale: 'pt_BR',
      siteName: 'Em Casa com Cecília',
      ...(parentOgImages ? { images: parentOgImages } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(parentTwitterImages ? { images: parentTwitterImages } : {}),
    },
  };
}

export default async function FestivalPartnerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getFestivalPartnerPageData(slug, new Date());
  if (!data) notFound();
  return <FestivalPartnerClient data={data} />;
}
