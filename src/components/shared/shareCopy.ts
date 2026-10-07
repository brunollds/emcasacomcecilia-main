import type { Locale } from '@/lib/i18n/locales';

// Textos da barra de compartilhar (ShareBar). Os nomes das redes não mudam de idioma.
export type ShareCopy = {
  share: string;
  shareOn: (network: string) => string;
  shareByEmail: string;
  copyLink: string;
  copied: string;
};

const shareCopy: Record<Locale, ShareCopy> = {
  pt: {
    share: 'Compartilhar:',
    shareOn: (network) => `Compartilhar no ${network}`,
    shareByEmail: 'Compartilhar por e-mail',
    copyLink: 'Copiar link',
    copied: 'Copiado!',
  },
  en: {
    share: 'Share:',
    shareOn: (network) => `Share on ${network}`,
    shareByEmail: 'Share by email',
    copyLink: 'Copy link',
    copied: 'Copied!',
  },
  es: {
    share: 'Compartir:',
    shareOn: (network) => `Compartir en ${network}`,
    shareByEmail: 'Compartir por correo electrónico',
    copyLink: 'Copiar enlace',
    copied: '¡Copiado!',
  },
  fr: {
    share: 'Partager :',
    shareOn: (network) => `Partager sur ${network}`,
    shareByEmail: 'Partager par e-mail',
    copyLink: 'Copier le lien',
    copied: 'Copié !',
  },
  de: {
    share: 'Teilen:',
    shareOn: (network) => `Auf ${network} teilen`,
    shareByEmail: 'Per E-Mail teilen',
    copyLink: 'Link kopieren',
    copied: 'Kopiert!',
  },
  it: {
    share: 'Condividi:',
    shareOn: (network) => `Condividi su ${network}`,
    shareByEmail: 'Condividi via e-mail',
    copyLink: 'Copia il link',
    copied: 'Copiato!',
  },
  ko: {
    share: '공유:',
    shareOn: (network) => `${network}에 공유`,
    shareByEmail: '이메일로 공유',
    copyLink: '링크 복사',
    copied: '복사됨!',
  },
  ja: {
    share: 'シェア：',
    shareOn: (network) => `${network}でシェア`,
    shareByEmail: 'メールでシェア',
    copyLink: 'リンクをコピー',
    copied: 'コピーしました！',
  },
  'zh-hant': {
    share: '分享：',
    shareOn: (network) => `分享到 ${network}`,
    shareByEmail: '以電子郵件分享',
    copyLink: '複製連結',
    copied: '已複製！',
  },
  'zh-hans': {
    share: '分享：',
    shareOn: (network) => `分享到 ${network}`,
    shareByEmail: '通过电子邮件分享',
    copyLink: '复制链接',
    copied: '已复制！',
  },
};

export function getShareCopy(locale: Locale): ShareCopy {
  return shareCopy[locale];
}
