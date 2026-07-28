const YOUTUBE_VIDEO_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;

/**
 * Metadados persistidos dos vídeos incorporados no domínio principal.
 *
 * O build não consulta APIs externas. Vídeos novos precisam ser adicionados
 * aqui antes da publicação para que o VideoObject seja emitido.
 */
export const videoMetadata = {
  DSH6TZyiMms: {
    uploadDate: '2024-12-08T15:00:11-08:00',
    duration: 'PT52S',
    title: 'Rabanada com Doce de Leite: Uma Explosão de Sabor! #ceiadenatal',
    description:
      'Passo a passo da rabanada recheada com doce de leite, empanada em leite condensado e finalizada com açúcar e canela.',
  },
  pftnU5mPuGU: {
    uploadDate: '2024-11-03T03:00:54-08:00',
    duration: 'PT57S',
    title: 'Aumentando a Quantidade de Manteiga com Leite Integral: Funciona? Testei e Mostro o Resultado',
    description:
      'Teste do truque culinário que mistura manteiga e leite integral para aumentar o volume, mostrando o preparo, a textura e o resultado real.',
  },
  brlxM4aUXkk: {
    uploadDate: '2025-02-26',
    duration: 'PT1M7S',
    title: '🛋️ Poltronas Damie: Conforto Sala de Cinema de LUXO na sua CASA | CUPOM CECILIA12',
    description:
      'As três poltronas reclináveis Damie em linho bege na sala de TV da Cecília: reclinação elétrica, conforto de cinema em casa e uso no dia a dia.',
  },
  MoBWSbcFTbg: {
    uploadDate: '2025-09-03',
    duration: 'PT1M12S',
    title: 'Esse Sofá é MODULAR, Vem numa Caixa e Tem Suporte para Celular 🤔📱 | CUPOM CECILIA12',
    description:
      'O sofá modular Damie que chega em caixas por módulo: montagem sem ferramenta complexa, puff incluso e suporte para celular no braço.',
  },
  YUAO12eA0oo: {
    uploadDate: '2026-03-19',
    duration: 'PT42S',
    title: 'Poltronas, Sofás e Camas no aniversário da DAMIE 💆‍♀️✨ | CUPOM CECILIA12',
    description:
      'Visita da Cecília ao aniversário da Damie, mostrando poltronas, sofás e camas da marca e diferentes opções de conforto e acabamento.',
  },
  jC0UZewMARE: {
    uploadDate: '2026-04-15',
    duration: 'PT37S',
    title: 'Poltrona Levita Damie: Conforto Premium na sua Casa | CUPOM CECILIA12',
    description:
      'Demonstração da Poltrona Levita Damie com dois motores independentes, ajustes de reclinação e pescoço, base giratória e acabamento premium.',
  },
  ep2XlSQ_OiM: {
    uploadDate: '2026-05-06',
    duration: 'PT54S',
    title: 'A Poltrona Perfeita pra Sua Mãe 🛋️ | Cupom CECILIA12',
    description:
      'Demonstração de uma poltrona reclinável Damie para descanso e amamentação, com apoio para braços, pernas e mudanças de posição na rotina.',
  },
  B8L2YJC8gaE: {
    uploadDate: '2026-07-20',
    duration: 'PT1M31S',
    title: 'CUPOM DAMIE CECILIA12 | Lançamento Poltrona Reclinável 2.0',
    description:
      'Primeiras impressões da Poltrona Reclinável Damie 2.0 (versão 2026): sistema de massagem, motor do apoio de cabeça, suporte para tablet e revestimento Corino Importado.',
  },
  'BlBbtv-VuL8': {
    uploadDate: '2026-07-11T17:15:26-07:00',
    duration: 'PT1M50S',
    title: 'CUPOM CECIEMCASA I WANNA SLEEP | Cobertor que esquenta E esfria? Testei',
    description:
      'Teste do Cobertor IWS Igloo dupla-face, comparando o lado de toque gelado com o lado quente e aconchegante para diferentes noites e temperaturas.',
  },
};

/**
 * Classificação editorial de todos os MP4 incorporados em reviews.
 *
 * Apenas registros `primary` podem gerar VideoObject. Os demais permanecem
 * visíveis na página, mas não competem com o vídeo principal no schema.
 */
export const localVideoMetadata = {
  '/images/reviews/iwannasleep/i-wanna-sleep-site-1.mp4': {
    classification: 'primary',
    reviewSlug: 'cupom-ceciemcasa-i-wanna-sleep-como-usar',
    title: 'Como usar o cupom CECIEMCASA na I Wanna Sleep',
    description:
      'Demonstração do site da I Wanna Sleep e do caminho para escolher produtos, avançar ao checkout e aplicar o cupom CECIEMCASA.',
    thumbnailUrl: '/images/reviews/iwannasleep/i-wanna-sleep-site-1-poster.jpg',
    uploadDate: '2026-07-07',
  },
  '/videos/reviews/dolcegusto/genio-s-touch-loop-1.mp4': {
    classification: 'primary',
    reviewSlug: 'dolce-gusto-genio-s-touch-vale-a-pena',
    title: 'Primeiro preparo na NESCAFÉ Dolce Gusto Genio S Touch',
    description:
      'Demonstração do primeiro uso da Genio S Touch, com a colocação da cápsula e o início do preparo de uma bebida na máquina.',
    thumbnailUrl: '/images/reviews/dolcegusto/genio-s-touch-loop-1-poster.webp',
    uploadDate: '2026-07-23',
  },
  '/videos/reviews/damie/poltrona-reclinavel-damie-2-0-hero-loop.mp4': {
    classification: 'decorative',
    reviewSlug: 'poltrona-damie-e-boa',
    reason: 'Ambientação visual do hero; o YouTube é o vídeo editorial principal.',
  },
  '/videos/reviews/damie/poltrona-reclinavel-damie-2-0-loop.mp4': {
    classification: 'secondary',
    reviewSlug: 'poltrona-damie-e-boa',
    reason: 'Demonstração complementar; a página já possui vídeo principal do YouTube.',
  },
  '/images/reviews/iwannasleep/cobertor-igloo-1.mp4': {
    classification: 'secondary',
    reviewSlug: 'i-wanna-sleep-cobertor-igloo-ficha-tecnica',
    reason: 'Loop complementar; a página já possui vídeo principal do YouTube.',
  },
  '/videos/reviews/dolcegusto/genio-s-touch-loop-2.mp4': {
    classification: 'secondary',
    reviewSlug: 'dolce-gusto-genio-s-touch-vale-a-pena',
    reason: 'Demonstração complementar do painel touch.',
  },
};

export function getPrimaryLocalVideoMeta(reviewSlug) {
  const entry = Object.entries(localVideoMetadata).find(
    ([, metadata]) =>
      metadata.classification === 'primary' && metadata.reviewSlug === reviewSlug
  );

  if (!entry) return null;

  const [contentUrl, metadata] = entry;
  return {
    ...metadata,
    contentUrl,
  };
}

export function getYoutubeVideoId(url) {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace(/^www\./, '');
    let id = null;

    if (hostname === 'youtu.be') {
      id = parsed.pathname.split('/').filter(Boolean)[0] || null;
    } else if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
      if (parsed.pathname === '/watch') {
        id = parsed.searchParams.get('v');
      } else {
        const [type, pathId] = parsed.pathname.split('/').filter(Boolean);
        if (['embed', 'shorts', 'live'].includes(type)) {
          id = pathId || null;
        }
      }
    }

    return id && YOUTUBE_VIDEO_ID_PATTERN.test(id) ? id : null;
  } catch {
    return null;
  }
}

export function getYoutubeEmbedUrl(url) {
  const id = getYoutubeVideoId(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}

export function getYoutubeWatchUrl(url) {
  const id = getYoutubeVideoId(url);
  return id ? `https://www.youtube.com/watch?v=${id}` : null;
}

export function getYoutubeThumbnailUrl(url) {
  const id = getYoutubeVideoId(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
}

export function getVideoMeta(url) {
  const id = getYoutubeVideoId(url);
  return id ? videoMetadata[id] || null : null;
}
