import type { TranslatedLocale } from '@/lib/couponTranslations';

// Os textos do 404. A página é uma só para o site todo (o global-not-found não sabe o idioma da URL):
// português em destaque e, embaixo, uma linha por idioma com a frase traduzida.
export const NOT_FOUND_PT = {
  metaTitle: 'Página não encontrada',
  title: 'Esta página não existe',
  intro: 'O endereço pode ter mudado ou o conteúdo saiu do ar. Procure aqui ou siga por um destes caminhos.',
  pathsLabel: 'Caminhos do site',
  latestTitle: 'Acabou de sair',
  otherLanguagesTitle: 'Em outros idiomas',
};

export const NOT_FOUND_TITLE: Record<TranslatedLocale, string> = {
  en: "This page doesn't exist",
  es: 'Esta página no existe',
  fr: "Cette page n'existe pas",
  de: 'Diese Seite gibt es nicht',
  it: 'Questa pagina non esiste',
  ko: '존재하지 않는 페이지입니다',
  ja: 'このページは存在しません',
  'zh-hant': '這個頁面不存在',
  'zh-hans': '这个页面不存在',
};
