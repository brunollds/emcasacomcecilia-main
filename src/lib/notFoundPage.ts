import { NOT_FOUND_PT, NOT_FOUND_TITLE } from '@/components/notFound/notFoundCopy';
import { TRANSLATED_LOCALES } from '@/lib/couponTranslations';
import { getHomeLatest, type HomeLatestArticle, type StoreReview } from '@/lib/homeStores';
import { LOCALES } from '@/lib/i18n/locales';
import { getShellCopy, getShellHomeHref } from '@/lib/i18n/shellDictionary';
import { getReviewHubCopy, getReviewHubPath } from '@/lib/review-hubs';

// O 404 do site: a busca, quatro caminhos e os 3 artigos mais novos em português e, embaixo, uma linha
// por idioma com a frase traduzida, a home do idioma e a lista de guias.

const LATEST_LIMIT = 3;

export type NotFoundPath = { href: string; label: string; description: string };

export type NotFoundLanguage = {
  locale: string;
  htmlLang: string;
  name: string;
  title: string;
  links: Array<{ href: string; label: string }>;
};

export type NotFoundContent = typeof NOT_FOUND_PT & {
  paths: NotFoundPath[];
  articles: HomeLatestArticle[];
  languages: NotFoundLanguage[];
};

const PATHS: NotFoundPath[] = [
  { href: '/reviews', label: 'Guias & Análises', description: 'Testes, comparativos e guias de compra' },
  { href: '/cupons', label: 'Cupons', description: 'Os códigos de desconto das lojas parceiras' },
  { href: '/videos', label: 'Vídeos', description: 'Unboxings e primeiras impressões' },
  { href: '/receitas', label: 'Receitas', description: 'Receitas testadas na cozinha de casa' },
];

export function getNotFoundContent(reviews: readonly StoreReview[]): NotFoundContent {
  return {
    ...NOT_FOUND_PT,
    paths: PATHS,
    articles: getHomeLatest(reviews).slice(0, LATEST_LIMIT),
    languages: TRANSLATED_LOCALES.map((locale) => ({
      locale,
      htmlLang: LOCALES[locale].htmlLang,
      name: LOCALES[locale].label,
      title: NOT_FOUND_TITLE[locale],
      links: [
        { href: getShellHomeHref(locale), label: getShellCopy(locale).homeLabel },
        { href: getReviewHubPath(locale), label: getReviewHubCopy(locale).title },
      ],
    })),
  };
}
