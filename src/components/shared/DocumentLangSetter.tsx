'use client';

import { useEffect } from 'react';

export function DocumentLangSetter({ locale }: { locale: string }) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const htmlLang = locale === 'pt' ? 'pt-BR' : (locale === 'zh-hant' ? 'zh-Hant' : (locale === 'zh-hans' ? 'zh-Hans' : locale));
      document.documentElement.lang = htmlLang;
    }
  }, [locale]);

  return null;
}
