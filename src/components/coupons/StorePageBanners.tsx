import { ArticlePromoBanner } from '@/components/review/article/ArticlePromoBanner';
import type { Locale } from '@/lib/i18n/locales';
import { getStorePageBanners, isStoreBannerLive } from '@/lib/storeBanners';

// As campanhas da loja na página dela (content/campanhas/), logo antes das regras, com o mesmo banner dos artigos.
// A página é gerada no build: a campanha que ainda não começou vai escondida no HTML e aparece no navegador no início.
export function StorePageBanners({ affiliate, brand, locale }: { affiliate: string; brand: string; locale: Locale }) {
  const now = new Date();
  const banners = getStorePageBanners(affiliate, locale, now);
  if (banners.length === 0) return null;
  return (
    <div data-store-page-banners="" className="grid gap-6">
      {banners.map((banner) => (
        <ArticlePromoBanner
          key={banner.id}
          banner={banner}
          locale={locale}
          storeBrand={brand}
          place="store-page"
          hiddenInHtml={!isStoreBannerLive(banner, now)}
        />
      ))}
    </div>
  );
}
