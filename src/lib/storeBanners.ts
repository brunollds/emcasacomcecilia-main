import type { CouponCopyLocale } from '@/components/review/couponCopyLocale';
import { storeBannersData } from '@/lib/generated/store-banners';

// Banners de campanha das lojas parceiras nos artigos, com o selo "Publicidade" (o selo fica em articleCopy.ts).
// Entram sozinhos em todo artigo com o `affiliate` da loja, nos 10 idiomas: o lugar `top` depois da 1ª seção do
// corpo e o `mid` antes do FAQ (sem FAQ, antes da última seção). O banner fala só da campanha: o código da loja
// continua no bloco da loja, e nenhum texto daqui cita o código nem diz que soma com ele.
export type StoreBannerSlot = 'top' | 'mid';

export type StoreBanner = {
  id: string;
  affiliate: string;
  slot: StoreBannerSlot;
  // Link de afiliado da campanha. Vale nos 10 idiomas, então nunca é um link da loja de um país só (br.shein.com).
  // A exceção é a campanha que só vale com o código da loja: o banner, que não cita o código, leva ao nosso artigo
  // que explica a campanha (`/reviews/<slug>`, da mesma loja), sem rel sponsored e nunca no próprio artigo.
  href: string;
  // A arte é desenhada no componente: a etiqueta com o número da campanha (com o `tag` do idioma em cima, o "até")
  // ou a sacola com a etiqueta de preço.
  art: { kind: 'tag'; value: string } | { kind: 'bag' };
  // Com o fuso de Brasília (-03:00). Sem `endsAt`, o banner fica até o arquivo dele sair de content/campanhas.
  startsAt?: string;
  endsAt?: string;
  copy: Record<CouponCopyLocale, { headline: string; text: string; action: string; tag?: string }>;
  // Onde a campanha foi vista (página da loja, e-mail ou painel do parceiro) e quando, no formato AAAA-MM-DD.
  source: string;
  verifiedAt: string;
};

// Cada campanha é um arquivo em content/campanhas/<id>.json, juntado pelo scripts/content/build-index.mjs.
export const STORE_BANNERS: StoreBanner[] = storeBannersData;

export function isStoreBannerLive(banner: Pick<StoreBanner, 'startsAt' | 'endsAt'>, now: Date): boolean {
  const time = now.getTime();
  if (banner.startsAt && time < Date.parse(banner.startsAt)) return false;
  return !banner.endsAt || time <= Date.parse(banner.endsAt);
}

export function isArticleBannerHref(href: string): boolean {
  return href.startsWith('/reviews/');
}

// Os banners que o artigo monta, em fila por lugar: os da loja que ainda não acabaram, menos o que leva ao próprio
// artigo, na ordem do início. As campanhas de um lugar não se sobrepõem (o test:store-banners confere), então no máximo
// uma está no ar. O artigo é gerado no build: a que ainda não começou entra escondida no HTML e aparece no navegador
// na hora do início (ArticlePromoBanner), e a do ar some no fim, sem esperar o próximo deploy.
export function getArticleStoreBanners(
  affiliate: string,
  reviewSlug: string,
  now: Date,
  banners: StoreBanner[] = STORE_BANNERS
): Partial<Record<StoreBannerSlot, StoreBanner[]>> {
  const queues: Partial<Record<StoreBannerSlot, StoreBanner[]>> = {};
  const startOf = (banner: StoreBanner) => (banner.startsAt ? Date.parse(banner.startsAt) : -Infinity);
  banners
    .filter((banner) => banner.affiliate === affiliate && isStoreBannerLive({ endsAt: banner.endsAt }, now))
    .filter((banner) => banner.href !== `/reviews/${reviewSlug}`)
    .sort((a, b) => startOf(a) - startOf(b))
    .forEach((banner) => (queues[banner.slot] ??= []).push(banner));
  return queues;
}

// Duas campanhas do mesmo lugar se sobrepõem quando uma começa antes de a outra acabar. Sem `startsAt`, a campanha
// já começou; sem `endsAt`, não acaba.
export function storeBannersOverlap(a: Pick<StoreBanner, 'startsAt' | 'endsAt'>, b: Pick<StoreBanner, 'startsAt' | 'endsAt'>): boolean {
  const start = (banner: typeof a) => (banner.startsAt ? Date.parse(banner.startsAt) : -Infinity);
  const end = (banner: typeof a) => (banner.endsAt ? Date.parse(banner.endsAt) : Infinity);
  return start(a) <= end(b) && start(b) <= end(a);
}

// A seção em que cada lugar cai, pelos ids das seções do corpo na ordem da página: o `top` vai depois da primeira;
// o `mid` vai antes do FAQ ou, sem FAQ, antes da última. Entre os dois banners fica pelo menos uma seção inteira.
export function placeStoreBanners(sectionIds: string[], faqIndex: number): Partial<Record<StoreBannerSlot, string>> {
  if (sectionIds.length === 0) return {};
  const midIndex = faqIndex >= 0 ? faqIndex : sectionIds.length - 1;
  return { top: sectionIds[0], ...(midIndex >= 2 && { mid: sectionIds[midIndex] }) };
}
