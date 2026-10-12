// Quem é a Cecília, para a home de cada idioma (/en, /ja…), e o certificado de Superstar Influencer da
// YesStyle que o hero mostra. Nome, região e datas não se traduzem.
export const CECILIA_FULL_NAME = 'Cecília Mauad Contin Linhares';
export const CECILIA_SINCE = 2018;
export const CECILIA_REGION = 'Minas Gerais';
export const CECILIA_COUNTRY = 'BR';

// O @id da Cecília no JSON-LD: a /sobre, a home de cada idioma e a autoria dos artigos e das receitas dela
// apontam para a mesma pessoa. Fica aqui, sem importar nada, porque os serializadores do conteúdo, que os
// componentes de cliente importam, também usam (o SITE_URL de pageSeo.ts levaria o mapa de mídia junto).
export const CECILIA_PERSON_ID = 'https://emcasacomcecilia.com/sobre#cecilia';

// As datas do certificado. O test:locale-home para a build quando a data UTC sai do intervalo (antes de
// validFrom ou depois de validUntil): troque a imagem (pelo fluxo do docs/GUIA-MIDIA-EDITORIAL.md) e as
// datas pelo certificado novo, ou tire o selo.
export const YESSTYLE_CERTIFICATE = {
  title: 'YesStyle Superstar Influencer',
  validFrom: '2026-08-09',
  validUntil: '2027-08-31',
  // O print do certificado, cortado; entra pelo fluxo de mídia do CDN.
  image: { src: '/images/about/cecilia/certificado-yesstyle-superstar-2026.webp', width: 597, height: 726 },
} as const;

// Datas AAAA-MM-DD se comparam como texto.
export function isCertificateValid(dayIso: string): boolean {
  return dayIso >= YESSTYLE_CERTIFICATE.validFrom && dayIso <= YESSTYLE_CERTIFICATE.validUntil;
}

export function getCertificateYears(): string {
  return `${YESSTYLE_CERTIFICATE.validFrom.slice(0, 4)}–${YESSTYLE_CERTIFICATE.validUntil.slice(0, 4)}`;
}
