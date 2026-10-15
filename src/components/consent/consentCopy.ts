import type { Locale } from '@/lib/i18n/locales';

// Textos do aviso de cookies e do link do rodapé. A política de privacidade só existe em português,
// então fora do PT o link avisa o idioma dela.
export interface ConsentCopy {
  regionLabel: string;
  message: string;
  privacyLabel: string;
  decline: string;
  accept: string;
  preferences: string;
}

export const CONSENT_PRIVACY_HREF = '/privacidade';

export const CONSENT_COPY: Record<Locale, ConsentCopy> = {
  pt: {
    regionLabel: 'Aviso de cookies',
    message:
      'Usamos cookies do Google Analytics e do Microsoft Clarity para entender como o site é usado. Eles só são ativados se você aceitar.',
    privacyLabel: 'Política de privacidade',
    decline: 'Recusar',
    accept: 'Aceitar',
    preferences: 'Preferências de cookies',
  },
  en: {
    regionLabel: 'Cookie notice',
    message:
      'We use Google Analytics and Microsoft Clarity cookies to understand how the site is used. They are only turned on if you accept.',
    privacyLabel: 'Privacy policy (in Portuguese)',
    decline: 'Decline',
    accept: 'Accept',
    preferences: 'Cookie preferences',
  },
  es: {
    regionLabel: 'Aviso sobre cookies',
    message:
      'Usamos cookies de Google Analytics y Microsoft Clarity para entender cómo se usa el sitio. Solo se activan si aceptas.',
    privacyLabel: 'Política de privacidad (en portugués)',
    decline: 'Rechazar',
    accept: 'Aceptar',
    preferences: 'Preferencias de cookies',
  },
  fr: {
    regionLabel: 'Avis sur les cookies',
    message:
      'Nous utilisons des cookies de Google Analytics et de Microsoft Clarity pour comprendre comment le site est utilisé. Ils ne sont activés que si vous acceptez.',
    privacyLabel: 'Politique de confidentialité (en portugais)',
    decline: 'Refuser',
    accept: 'Accepter',
    preferences: 'Préférences de cookies',
  },
  de: {
    regionLabel: 'Cookie-Hinweis',
    message:
      'Wir verwenden Cookies von Google Analytics und Microsoft Clarity, um zu verstehen, wie die Website genutzt wird. Sie werden nur aktiviert, wenn Sie zustimmen.',
    privacyLabel: 'Datenschutzerklärung (auf Portugiesisch)',
    decline: 'Ablehnen',
    accept: 'Akzeptieren',
    preferences: 'Cookie-Einstellungen',
  },
  it: {
    regionLabel: 'Avviso sui cookie',
    message:
      'Usiamo i cookie di Google Analytics e Microsoft Clarity per capire come viene usato il sito. Vengono attivati solo se accetti.',
    privacyLabel: 'Informativa sulla privacy (in portoghese)',
    decline: 'Rifiuta',
    accept: 'Accetta',
    preferences: 'Preferenze sui cookie',
  },
  ko: {
    regionLabel: '쿠키 안내',
    message:
      '사이트 이용 방식을 파악하기 위해 Google Analytics와 Microsoft Clarity 쿠키를 사용합니다. 동의하신 경우에만 활성화됩니다.',
    privacyLabel: '개인정보처리방침(포르투갈어)',
    decline: '거부',
    accept: '동의',
    preferences: '쿠키 설정',
  },
  ja: {
    regionLabel: 'クッキーに関するお知らせ',
    message:
      'サイトの利用状況を把握するため、Google AnalyticsとMicrosoft Clarityのクッキーを使用しています。同意いただいた場合にのみ有効になります。',
    privacyLabel: 'プライバシーポリシー（ポルトガル語）',
    decline: '拒否する',
    accept: '同意する',
    preferences: 'クッキー設定',
  },
  'zh-hant': {
    regionLabel: 'Cookie 通知',
    message:
      '我們使用 Google Analytics 和 Microsoft Clarity 的 Cookie 來了解網站的使用情況。只有在您同意後才會啟用。',
    privacyLabel: '隱私權政策（葡萄牙文）',
    decline: '拒絕',
    accept: '接受',
    preferences: 'Cookie 偏好設定',
  },
  'zh-hans': {
    regionLabel: 'Cookie 通知',
    message:
      '我们使用 Google Analytics 和 Microsoft Clarity 的 Cookie 来了解网站的使用情况。只有在您同意后才会启用。',
    privacyLabel: '隐私政策（葡萄牙语）',
    decline: '拒绝',
    accept: '接受',
    preferences: 'Cookie 偏好设置',
  },
};

export function getConsentCopy(locale: Locale): ConsentCopy {
  return CONSENT_COPY[locale];
}
