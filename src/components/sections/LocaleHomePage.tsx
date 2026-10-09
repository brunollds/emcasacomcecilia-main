import { LocaleHomeHero } from '@/components/sections/LocaleHomeHero';
import {
  LocaleHomeArticles,
  LocaleHomeFaq,
  LocaleHomeFollow,
  LocaleHomeSafety,
  LocaleHomeStores,
} from '@/components/sections/LocaleHomeSections';
import { CECILIA_COUNTRY, CECILIA_REGION } from '@/lib/ceciliaCredentials';
import { serializeJsonLd } from '@/lib/jsonLd';
import type { LocaleHomeContent } from '@/lib/localeHome';
import { absoluteUrl } from '@/lib/pageSeo';

// O Person liga o site à Cecília de verdade (nome completo, região e redes); o FAQPage repete as
// perguntas da página. Organization e WebSite já vêm do layout.
export function getLocaleHomeJsonLd(content: LocaleHomeContent) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: content.hero.name,
      url: absoluteUrl(content.path),
      image: content.hero.photoUrl,
      address: { '@type': 'PostalAddress', addressRegion: CECILIA_REGION, addressCountry: CECILIA_COUNTRY },
      sameAs: content.follow.networks.map((network) => network.href),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: content.htmlLang,
      mainEntity: content.faq.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ];
}

// A home de cada idioma, na ordem aprovada: confiança primeiro, porque quem chega de fora cai no artigo
// e só abre a home para ver quem está por trás do site. Não importa next/font (o teste roda em tsx): a
// rota passa as fontes pelo className.
export function LocaleHomePage({ content, className = '' }: { content: LocaleHomeContent; className?: string }) {
  return (
    <main className={`${className} min-h-screen bg-white`}>
      {getLocaleHomeJsonLd(content).map((schema) => (
        <script key={schema['@type']} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
      ))}
      <div className="pb-8 md:pb-10">
        <LocaleHomeHero hero={content.hero} />
      </div>
      <LocaleHomeStores stores={content.stores} />
      <LocaleHomeArticles articles={content.articles} />
      <LocaleHomeSafety safety={content.safety} />
      <LocaleHomeFaq faq={content.faq} />
      <LocaleHomeFollow follow={content.follow} />
    </main>
  );
}
