import type { CouponCopyLocale } from '@/components/review/couponCopyLocale';

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
  // Com o fuso de Brasília (-03:00). Sem `endsAt`, o banner fica até sair deste arquivo.
  startsAt?: string;
  endsAt?: string;
  copy: Record<CouponCopyLocale, { headline: string; text: string; action: string; tag?: string }>;
};

export const STORE_BANNERS: StoreBanner[] = [
  {
    id: 'shein-novos-usuarios',
    affiliate: 'shein',
    slot: 'top',
    href: 'https://onelink.shein.com/58/66iudaefvx27',
    art: { kind: 'tag', value: '50%' },
    copy: {
      pt: {
        headline: 'Primeira compra na SHEIN? Até 50% para novos usuários',
        text: 'Campanha da própria SHEIN. As condições aparecem no site da SHEIN.',
        action: 'Ver a campanha',
        tag: 'ATÉ',
      },
      en: {
        headline: 'New to SHEIN? Up to 50% off for new users',
        text: 'Run by SHEIN itself. The terms are on the SHEIN website.',
        action: 'See the offer',
        tag: 'UP TO',
      },
      es: {
        headline: '¿Primera compra en SHEIN? Hasta un 50 % de descuento para nuevos usuarios',
        text: 'Una campaña de la propia SHEIN. Las condiciones están en el sitio de SHEIN.',
        action: 'Ver la oferta',
        tag: 'HASTA',
      },
      fr: {
        headline: 'Première commande chez SHEIN ? Jusqu’à 50 % de réduction pour les nouveaux clients',
        text: 'Une campagne de SHEIN. Les conditions sont sur le site de SHEIN.',
        action: 'Voir l’offre',
        tag: 'JUSQU’À',
      },
      it: {
        headline: 'Primo ordine su SHEIN? Fino al 50% di sconto per i nuovi utenti',
        text: 'Una campagna di SHEIN. Le condizioni sono sul sito di SHEIN.',
        action: 'Vedi l’offerta',
        tag: 'FINO AL',
      },
      de: {
        headline: 'Neu bei SHEIN? Bis zu 50 % Rabatt für Neukunden',
        text: 'Eine Aktion von SHEIN. Die Bedingungen stehen auf der SHEIN-Website.',
        action: 'Zum Angebot',
        tag: 'BIS ZU',
      },
      ja: {
        headline: 'SHEINで初めてのお買い物？新規ユーザーは最大50%オフ',
        text: 'SHEIN公式のキャンペーンです。条件はSHEINのサイトでご確認ください。',
        action: 'キャンペーンを見る',
        tag: '最大',
      },
      ko: {
        headline: 'SHEIN 첫 구매? 신규 회원 최대 50% 할인',
        text: 'SHEIN 자체 프로모션입니다. 조건은 SHEIN 사이트에서 확인하세요.',
        action: '혜택 보기',
        tag: '최대',
      },
      'zh-hans': {
        headline: '首次在SHEIN购物？新用户低至5折',
        text: 'SHEIN官方活动，具体条件以SHEIN网站为准。',
        action: '查看活动',
        tag: '最高',
      },
      'zh-hant': {
        headline: '首次在SHEIN購物？新用戶低至5折',
        text: 'SHEIN官方活動，具體條件以SHEIN網站為準。',
        action: '查看活動',
        tag: '最高',
      },
    },
  },
  {
    id: 'shein-itens-com-desconto',
    affiliate: 'shein',
    slot: 'mid',
    href: 'https://onelink.shein.com/58/66iufl9pp7qa',
    art: { kind: 'bag' },
    copy: {
      pt: { headline: 'Itens com desconto na SHEIN', text: 'A página de ofertas da loja, com os preços do dia.', action: 'Ver as ofertas' },
      en: { headline: 'Items on sale at SHEIN', text: 'The store’s deals page, with today’s prices.', action: 'See the deals' },
      es: { headline: 'Artículos con descuento en SHEIN', text: 'La página de ofertas de la tienda, con los precios del día.', action: 'Ver las ofertas' },
      fr: { headline: 'Articles en promotion chez SHEIN', text: 'La page des promos de la boutique, avec les prix du jour.', action: 'Voir les promos' },
      it: { headline: 'Articoli scontati su SHEIN', text: 'La pagina delle offerte del negozio, con i prezzi del giorno.', action: 'Vedi le offerte' },
      de: { headline: 'Reduzierte Artikel bei SHEIN', text: 'Die Angebotsseite des Shops mit den aktuellen Preisen.', action: 'Angebote ansehen' },
      ja: { headline: 'SHEINのセール商品', text: 'ストアのセールページです。価格は当日時点のものです。', action: 'セール商品を見る' },
      ko: { headline: 'SHEIN 할인 상품', text: '스토어의 할인 페이지입니다. 가격은 당일 기준입니다.', action: '할인 상품 보기' },
      'zh-hans': { headline: 'SHEIN折扣商品', text: '店铺的折扣页面，价格以当天为准。', action: '查看折扣' },
      'zh-hant': { headline: 'SHEIN折扣商品', text: '店鋪的折扣頁面，價格以當天為準。', action: '查看折扣' },
    },
  },
  {
    id: 'skelt-brinde-30-10',
    affiliate: 'skelt',
    slot: 'top',
    href: '/reviews/brinde-skelt-30-outubro-cupom',
    art: { kind: 'bag' },
    startsAt: '2026-10-30T00:00:00-03:00',
    endsAt: '2026-10-30T23:59:59-03:00',
    copy: {
      pt: {
        headline: 'Brinde da Skelt só hoje, 30/10',
        text: 'Trends Set acima de R$ 219 e Body Cream acima de R$ 249. Veja como garantir os dois.',
        action: 'Ver como garantir',
      },
      en: {
        headline: 'Skelt free gifts, today only (Oct 30)',
        text: 'Trends Set on orders over R$ 219 and Body Cream over R$ 249. See how to get both.',
        action: 'See how',
      },
      es: {
        headline: 'Regalos de Skelt solo hoy, 30/10',
        text: 'Trends Set en compras de más de R$ 219 y Body Cream de más de R$ 249. Mira cómo conseguir los dos.',
        action: 'Ver cómo',
      },
      fr: {
        headline: 'Cadeaux Skelt aujourd’hui seulement (30/10)',
        text: 'Trends Set dès R$ 219 d’achat et Body Cream dès R$ 249. Voir comment obtenir les deux.',
        action: 'Voir comment',
      },
      it: {
        headline: 'Omaggi Skelt solo oggi, 30/10',
        text: 'Trends Set sopra R$ 219 e Body Cream sopra R$ 249. Ecco come averli entrambi.',
        action: 'Scopri come',
      },
      de: {
        headline: 'Skelt-Geschenke nur heute (30.10.)',
        text: 'Trends Set ab R$ 219 Einkaufswert und Body Cream ab R$ 249. So bekommst du beide.',
        action: 'So geht’s',
      },
      ja: {
        headline: 'Skeltのプレゼントは10/30のみ',
        text: 'R$ 219以上でTrends Set、R$ 249以上でBody Creamも。両方もらう方法はこちら。',
        action: '方法を見る',
      },
      ko: {
        headline: 'Skelt 사은품, 10/30 하루만',
        text: 'R$ 219 이상 구매 시 Trends Set, R$ 249 이상이면 Body Cream까지. 둘 다 받는 방법을 확인하세요.',
        action: '방법 보기',
      },
      'zh-hans': {
        headline: 'Skelt赠品仅限10月30日',
        text: '满R$ 219送Trends Set，满R$ 249再送Body Cream。看看如何两样都拿到。',
        action: '查看方法',
      },
      'zh-hant': {
        headline: 'Skelt贈品僅限10月30日',
        text: '滿R$ 219送Trends Set，滿R$ 249再送Body Cream。看看如何兩樣都拿到。',
        action: '查看方法',
      },
    },
  },
  {
    id: 'yesstyle-halloween-beleza',
    affiliate: 'yesstyle',
    slot: 'top',
    href: 'https://www.yesstyle.com/beauty-beauty/list.html/bcc.15478_bpt.46?rco=CECILIA010&utm_term=CECILIA010&utm_medium=Influencer&utm_source=dynamic&mcg=influencer',
    art: { kind: 'tag', value: '50%' },
    endsAt: '2026-11-01T23:59:59-03:00',
    copy: {
      pt: {
        headline: 'Especial de Halloween na YesStyle: beleza com até 50% OFF',
        text: 'Campanha da própria YesStyle. Os preços e as condições aparecem no site da YesStyle.',
        action: 'Ver a campanha',
        tag: 'ATÉ',
      },
      en: {
        headline: 'YesStyle Halloween Special: beauty up to 50% off',
        text: 'Run by YesStyle itself. Prices and terms are on the YesStyle website.',
        action: 'See the offer',
        tag: 'UP TO',
      },
      es: {
        headline: 'Especial de Halloween en YesStyle: belleza con hasta un 50 % de descuento',
        text: 'Una campaña de la propia YesStyle. Los precios y las condiciones están en el sitio de YesStyle.',
        action: 'Ver la oferta',
        tag: 'HASTA',
      },
      fr: {
        headline: 'Spécial Halloween chez YesStyle : beauté jusqu’à -50 %',
        text: 'Une campagne de YesStyle. Les prix et les conditions sont sur le site de YesStyle.',
        action: 'Voir l’offre',
        tag: 'JUSQU’À',
      },
      it: {
        headline: 'Speciale Halloween su YesStyle: bellezza fino al 50% di sconto',
        text: 'Una campagna di YesStyle. I prezzi e le condizioni sono sul sito di YesStyle.',
        action: 'Vedi l’offerta',
        tag: 'FINO AL',
      },
      de: {
        headline: 'Halloween-Special bei YesStyle: Beauty bis zu 50 % reduziert',
        text: 'Eine Aktion von YesStyle. Preise und Bedingungen stehen auf der YesStyle-Website.',
        action: 'Zum Angebot',
        tag: 'BIS ZU',
      },
      ja: {
        headline: 'YesStyleのハロウィン特集：ビューティーが最大50%オフ',
        text: 'YesStyle公式のキャンペーンです。価格と条件はYesStyleのサイトでご確認ください。',
        action: 'キャンペーンを見る',
        tag: '最大',
      },
      ko: {
        headline: 'YesStyle 핼러윈 특집: 뷰티 최대 50% 할인',
        text: 'YesStyle 자체 프로모션입니다. 가격과 조건은 YesStyle 사이트에서 확인하세요.',
        action: '혜택 보기',
        tag: '최대',
      },
      'zh-hans': {
        headline: 'YesStyle万圣节特辑：美妆低至5折',
        text: 'YesStyle官方活动，价格和具体条件以YesStyle网站为准。',
        action: '查看活动',
        tag: '最高',
      },
      'zh-hant': {
        headline: 'YesStyle萬聖節特輯：美妝低至5折',
        text: 'YesStyle官方活動，價格和具體條件以YesStyle網站為準。',
        action: '查看活動',
        tag: '最高',
      },
    },
  },
];

export function isStoreBannerLive(banner: Pick<StoreBanner, 'startsAt' | 'endsAt'>, now: Date): boolean {
  const time = now.getTime();
  if (banner.startsAt && time < Date.parse(banner.startsAt)) return false;
  return !banner.endsAt || time <= Date.parse(banner.endsAt);
}

export function isArticleBannerHref(href: string): boolean {
  return href.startsWith('/reviews/');
}

// Os banners que o artigo monta, um por lugar: os da loja que ainda não acabaram, menos o que leva ao próprio artigo.
// O artigo é gerado no build, então a campanha que ainda não começou entra escondida no HTML e aparece no navegador
// na hora do início (ArticlePromoBanner).
export function getArticleStoreBanners(
  affiliate: string,
  reviewSlug: string,
  now: Date,
  banners: StoreBanner[] = STORE_BANNERS
): Partial<Record<StoreBannerSlot, StoreBanner>> {
  return Object.fromEntries(
    banners
      .filter((banner) => banner.affiliate === affiliate && isStoreBannerLive({ endsAt: banner.endsAt }, now))
      .filter((banner) => banner.href !== `/reviews/${reviewSlug}`)
      .map((banner) => [banner.slot, banner])
  );
}

// A seção em que cada lugar cai, pelos ids das seções do corpo na ordem da página: o `top` vai depois da primeira;
// o `mid` vai antes do FAQ ou, sem FAQ, antes da última. Entre os dois banners fica pelo menos uma seção inteira.
export function placeStoreBanners(sectionIds: string[], faqIndex: number): Partial<Record<StoreBannerSlot, string>> {
  if (sectionIds.length === 0) return {};
  const midIndex = faqIndex >= 0 ? faqIndex : sectionIds.length - 1;
  return { top: sectionIds[0], ...(midIndex >= 2 && { mid: sectionIds[midIndex] }) };
}
