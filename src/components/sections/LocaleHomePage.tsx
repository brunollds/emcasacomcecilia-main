import { HomeCeciliaPanel } from '@/components/sections/HomeCeciliaPanel';
import { HomeLatest } from '@/components/sections/HomeLatest';
import { HomeStoreStories } from '@/components/sections/HomeStoreStories';
import { CECILIA_TAB_ID } from '@/lib/homeStoreTabs';
import { CECILIA_PHOTO } from '@/lib/homeStores';
import { serializeJsonLd } from '@/lib/jsonLd';
import { getLocaleHomeJsonLd, type LocaleHomeContent } from '@/lib/localeHome';

// A home de cada idioma tem a mesma ordem da home em português, que abre na vitrine: a Cecília primeiro (quem
// chega de fora cai no artigo e abre a home para ver quem está por trás do site), depois "Acabou de sair". Não
// importa next/font (o teste roda em tsx): a rota passa as fontes pelo className.
export function LocaleHomePage({ content, className = '' }: { content: LocaleHomeContent; className?: string }) {
  return (
    <main className={`${className} min-h-screen bg-white`}>
      {getLocaleHomeJsonLd(content).map((schema) => (
        <script key={schema['@type']} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
      ))}
      <h1 className="sr-only">{content.meta.title}</h1>

      <div className="pb-8 md:pb-10">
        <HomeStoreStories
          tabs={content.stores}
          ceciliaPanel={<HomeCeciliaPanel copy={content.panel} eager />}
          ceciliaPhoto={CECILIA_PHOTO}
          copy={content.copy}
          defaultTabId={CECILIA_TAB_ID}
        />
      </div>

      <div className="pb-8 md:pb-10">
        <HomeLatest articles={content.latest} copy={content.copy} allHref={content.latestAllHref} />
      </div>
    </main>
  );
}
