/**
 * Allowlist de hosts de imagem remota. Fonte única — usada tanto por
 * next.config.mjs (remotePatterns) quanto por código que precisa validar,
 * antes de renderizar, se uma URL de imagem vinda de um feed externo
 * (ex.: dicasOffers.ts) está dentro do que o Next está configurado a aceitar.
 */
export const IMAGE_REMOTE_PATTERNS = [
  { protocol: 'https', hostname: 'dicas.emcasacomcecilia.com' },
  { protocol: 'https', hostname: 'central.emcasacomcecilia.com' },
  { protocol: 'https', hostname: 'media.emcasacomcecilia.com' },
  { protocol: 'https', hostname: 'http2.mlstatic.com' },
  { protocol: 'https', hostname: 'm.media-amazon.com' },
  { protocol: 'https', hostname: 'images-na.ssl-images-amazon.com' },
  { protocol: 'https', hostname: 'img.magazineluiza.com.br' },
  { protocol: 'https', hostname: 'a-static.mlcdn.com.br' },
  { protocol: 'https', hostname: 'cf.shopee.com.br' },
  { protocol: 'https', hostname: 'deo.shopeemobile.com' },
  { protocol: 'https', hostname: 'down-br.img.susercontent.com' },
  { protocol: 'https', hostname: '**.kwcdn.com' },
  { protocol: 'https', hostname: 'ae01.alicdn.com' },
  { protocol: 'https', hostname: 'ae04.alicdn.com' },
  { protocol: 'https', hostname: 'gaming-cdn.com' },
  { protocol: 'https', hostname: 'ae-pic-a1.aliexpress-media.com' },
  { protocol: 'https', hostname: 'm.magazineluiza.com.br' },
  { protocol: 'https', hostname: 'www.damie.com.br' },
  { protocol: 'http', hostname: 'www.damie.com.br' },
  { protocol: 'https', hostname: 'damie.com.br' },
  { protocol: 'http', hostname: 'damie.com.br' },
  { protocol: 'https', hostname: 'cdn.shopify.com' },
  { protocol: 'https', hostname: 'i.ytimg.com' },
];

function hostnameMatchesPattern(hostname, pattern) {
  if (pattern.startsWith('**.')) {
    return hostname.endsWith(pattern.slice(2));
  }

  if (pattern.startsWith('*.')) {
    const suffix = pattern.slice(1);
    const prefix = hostname.slice(0, -suffix.length);
    return hostname.endsWith(suffix) && prefix.length > 0 && !prefix.includes('.');
  }

  if (pattern.includes('*')) {
    throw new Error(`Padrão de hostname de imagem não suportado: ${pattern}`);
  }

  return hostname === pattern;
}

export function isAllowedImageHost(url) {
  if (!url) {
    return false;
  }

  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }

  const protocol = parsed.protocol.replace(':', '');

  return IMAGE_REMOTE_PATTERNS.some(
    (allowed) =>
      allowed.protocol === protocol && hostnameMatchesPattern(parsed.hostname, allowed.hostname)
  );
}
