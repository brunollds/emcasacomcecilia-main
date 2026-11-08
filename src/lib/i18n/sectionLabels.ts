import type { Locale } from './locales';

// Rótulos curtos que o menu e o rodapé mostram nos 10 idiomas. Ficam aqui, sem imports pesados, porque o
// Navbar e o Footer são componentes cliente: se o shellMenu lesse esses textos direto de
// couponStoreCopy.tsx e localeFaqCopy.ts, os dois arquivos inteiros iriam para o JS de toda página.
// Os dois seguem com os campos (couponsLabel, title, newsMediaKit) e leem o valor daqui.
export type SectionLabels = {
  couponsLabel: string;
  faqTitle: string;
  mediaKitLabel: string;
};

export const SECTION_LABELS: Record<Locale, SectionLabels> = {
  pt: {
    couponsLabel: 'Cupons',
    faqTitle: 'Perguntas frequentes',
    mediaKitLabel: 'Ver o mídia kit (em português)',
  },
  en: {
    couponsLabel: 'Coupons',
    faqTitle: 'Frequently asked questions',
    mediaKitLabel: 'See the media kit (in Portuguese)',
  },
  es: {
    couponsLabel: 'Cupones',
    faqTitle: 'Preguntas frecuentes',
    mediaKitLabel: 'Ver el media kit (en portugués)',
  },
  fr: {
    couponsLabel: 'Codes promo',
    faqTitle: 'Questions fréquentes',
    mediaKitLabel: 'Voir le kit média (en portugais)',
  },
  de: {
    couponsLabel: 'Gutscheine',
    faqTitle: 'Häufige Fragen',
    mediaKitLabel: 'Mediakit ansehen (auf Portugiesisch)',
  },
  it: {
    couponsLabel: 'Coupon',
    faqTitle: 'Domande frequenti',
    mediaKitLabel: 'Vedi il media kit (in portoghese)',
  },
  ko: {
    couponsLabel: '쿠폰',
    faqTitle: '자주 묻는 질문',
    mediaKitLabel: '미디어 킷 보기(포르투갈어)',
  },
  ja: {
    couponsLabel: 'クーポン',
    faqTitle: 'よくある質問',
    mediaKitLabel: 'メディアキットを見る（ポルトガル語）',
  },
  'zh-hant': {
    couponsLabel: '優惠碼',
    faqTitle: '常見問題',
    mediaKitLabel: '查看Media Kit（葡萄牙文）',
  },
  'zh-hans': {
    couponsLabel: '优惠码',
    faqTitle: '常见问题',
    mediaKitLabel: '查看Media Kit（葡萄牙文）',
  },
};
