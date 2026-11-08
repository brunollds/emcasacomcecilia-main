import { getCouponCopyLabels } from '@/components/review/couponCopyLocale';
import { getLocaleHomeCopy } from '@/components/sections/localeHomeCopy';
import type { Locale } from '@/lib/i18n/locales';

// Os textos de interface que a home em português e a de cada idioma dividem: a vitrine, as abas das lojas,
// o painel da Cecília e "Acabou de sair". Os componentes de cliente (a vitrine) recebem estas strings prontas
// por props, sem funções; onde há um marcador ({title}, {store}), quem preenche é o componente ou o servidor.
// Este arquivo não importa valores de módulos grandes: o cliente só usa o tipo.

export type HomeChromeCopy = {
  sectionLabel: string;
  tablist: string;
  previousStores: string;
  nextStores: string;
  pick: string;
  latestTitle: string;
  latestAll: string;
  latestAllShort: string;
  readArticle: string;
  readArticleNamed: string;
  previousArticle: string;
  nextArticle: string;
  storePage: string;
  storeArticles: string;
  storeEmpty: string;
  storeGo: string;
};

export type HomeCopy = HomeChromeCopy & { copy: string; copied: string };

export const PT_HOME_CHROME: HomeChromeCopy = {
  sectionLabel: 'A Cecília e as lojas parceiras',
  tablist: 'Escolha a Cecília ou uma loja',
  previousStores: 'Ver lojas anteriores',
  nextStores: 'Ver mais lojas',
  pick: 'Escolha uma loja nas bolinhas para ver o código e os artigos dela.',
  latestTitle: 'Acabou de sair',
  latestAll: 'Ver todos os guias e análises',
  latestAllShort: 'Ver todos',
  readArticle: 'Ler o artigo',
  readArticleNamed: 'Ler o artigo: {title}',
  previousArticle: 'Artigo anterior',
  nextArticle: 'Próximo artigo',
  storePage: 'Ver a página da loja',
  storeArticles: 'Artigos {store}',
  storeEmpty: 'Ainda não há artigo {store} por aqui. As campanhas vigentes ficam na página da loja.',
  storeGo: 'Ir para {store}',
};

// Os textos da home de um idioma: a interface vem do idioma e os rótulos de cópia do código, do mesmo arquivo
// que as páginas de loja usam. Só o servidor chama esta função.
export function getHomeCopy(locale: Locale): HomeCopy {
  const labels = getCouponCopyLabels(locale);
  const chrome = locale === 'pt' ? PT_HOME_CHROME : getLocaleHomeCopy(locale).chrome;
  return { ...chrome, copy: labels.copy, copied: labels.copied };
}
