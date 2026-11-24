import type { Metadata } from 'next';
import { FestivalStageClient } from '@/components/festival/FestivalStageClient';
import { getActiveCoupons } from '@/lib/couponsData';
import { getFestivalBlackFridayData } from '@/lib/festivalBlackFriday';

export const revalidate = 300;

export function generateMetadata(): Metadata {
  const activeCount = getActiveCoupons().length;
  const title = `Festival de Cupons EXCLUSIVOS da Cecília — Black Friday (${activeCount} lojas)`;
  const description = `${activeCount} lojas parceiras num lugar só. Toque no código exclusivo para copiar e já abrir a loja oficial: Insider, DAMIE, Dolce Gusto, I Wanna Sleep e mais.`;

  return {
    title,
    description,
    alternates: {
      canonical: '/blackfriday',
    },
    // Fora do Google para não disputar busca orgânica com /cupons; foco em WhatsApp e Instagram.
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title,
      description,
      url: '/blackfriday',
      type: 'website',
      locale: 'pt_BR',
      siteName: 'Em Casa com Cecília',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function FestivalBlackFridayPage() {
  const data = getFestivalBlackFridayData(new Date());
  return <FestivalStageClient data={data} />;
}
