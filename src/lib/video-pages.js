import {
  getYoutubeEmbedUrl,
  getYoutubeThumbnailUrl,
  localVideoMetadata,
  videoMetadata,
} from '@/lib/video-metadata';

const BASE_URL = 'https://emcasacomcecilia.com';

const videoPageDefinitions = [
  {
    slug: 'rabanada-com-doce-de-leite-video',
    kind: 'youtube',
    videoId: 'DSH6TZyiMms',
    sourcePath: '/receitas/rabanada-com-doce-de-leite',
    sourceTitle: 'Rabanada com doce de leite',
  },
  {
    slug: 'truque-manteiga-com-leite-funciona',
    kind: 'youtube',
    videoId: 'pftnU5mPuGU',
    sourcePath: '/reviews/minha-experiencia-manteiga-batida-aerada',
    sourceTitle: 'Minha experiência com manteiga batida aerada',
  },
  {
    slug: 'poltronas-reclinaveis-damie-sala-de-cinema',
    kind: 'youtube',
    videoId: 'brlxM4aUXkk',
    sourcePath: '/reviews/poltronas-reclinaveis-damie-vale-o-investimento',
    sourceTitle: 'Poltronas reclináveis Damie valem o investimento?',
  },
  {
    slug: 'sofa-modular-damie-na-caixa',
    kind: 'youtube',
    videoId: 'MoBWSbcFTbg',
    sourcePath: '/reviews/sofa-damie-na-caixa-vale-a-pena-o-modular',
    sourceTitle: 'Sofá Damie na caixa: vale a pena?',
  },
  {
    slug: 'aniversario-damie-poltronas-sofas-camas',
    kind: 'youtube',
    videoId: 'YUAO12eA0oo',
    sourcePath: '/reviews/poltrona-moon-design-que-parece-obra-de-arte',
    sourceTitle: 'Poltrona Moon: design que parece obra de arte',
  },
  {
    slug: 'poltrona-levita-damie',
    kind: 'youtube',
    videoId: 'jC0UZewMARE',
    sourcePath: '/reviews/poltrona-levita-o-topo-da-tecnologia-e-conforto',
    sourceTitle: 'Poltrona Levita: tecnologia e conforto',
  },
  {
    slug: 'poltrona-damie-para-maes-e-amamentacao',
    kind: 'youtube',
    videoId: 'ep2XlSQ_OiM',
    sourcePath: '/reviews/poltrona-amamentacao-rotina',
    sourceTitle: 'Poltrona de amamentação na rotina',
  },
  {
    slug: 'poltrona-reclinavel-damie-2-0',
    kind: 'youtube',
    videoId: 'B8L2YJC8gaE',
    sourcePath: '/reviews/poltrona-damie-e-boa',
    sourceTitle: 'Poltrona Damie 2.0 é boa?',
  },
  {
    slug: 'cobertor-iws-igloo-dupla-face',
    kind: 'youtube',
    videoId: 'BlBbtv-VuL8',
    sourcePath: '/reviews/i-wanna-sleep-cobertor-igloo-ficha-tecnica',
    sourceTitle: 'Cobertor IWS Igloo: ficha técnica e primeiras impressões',
  },
  {
    slug: 'unboxing-dolce-gusto-mini-me-2-0-primeiro-cafe',
    kind: 'youtube',
    videoId: 'RGM_61Heclo',
    sourcePath: '/reviews/dolce-gusto-mini-me-2-0-vale-a-pena',
    sourceTitle: 'NESCAFÉ Dolce Gusto Mini Me 2.0 é Boa? Teste Real na Cor Terracota',
  },
  {
    slug: 'como-usar-cupom-ceciemcasa-i-wanna-sleep',
    kind: 'local',
    contentUrl: '/images/reviews/iwannasleep/i-wanna-sleep-site-1.mp4',
    sourcePath: '/reviews/cupom-ceciemcasa-i-wanna-sleep-como-usar',
    sourceTitle: 'Como usar o cupom CECIEMCASA na I Wanna Sleep',
  },
  {
    slug: 'primeiro-preparo-dolce-gusto-genio-s-touch',
    kind: 'local',
    contentUrl: '/videos/reviews/dolcegusto/genio-s-touch-loop-1.mp4',
    sourcePath: '/reviews/dolce-gusto-genio-s-touch-vale-a-pena',
    sourceTitle: 'Dolce Gusto Genio S Touch vale a pena?',
  },
  {
    slug: 'minha-primeira-lava-e-seca-samsung-13kg-video',
    kind: 'youtube',
    videoId: 'xpXX_N002jo',
    sourcePath: '/reviews/samsung-lava-seca-13kg-primeiro-uso',
    sourceTitle: 'Minha primeira lava e seca: Samsung 13 kg, unboxing e primeiro uso',
  },
];

function buildVideoPage(definition) {
  if (definition.kind === 'youtube') {
    const metadata = videoMetadata[definition.videoId];
    const youtubeUrl = `https://www.youtube.com/watch?v=${definition.videoId}`;

    return {
      ...definition,
      ...metadata,
      youtubeUrl,
      embedUrl: getYoutubeEmbedUrl(youtubeUrl),
      thumbnailUrl: getYoutubeThumbnailUrl(youtubeUrl),
      canonicalUrl: `${BASE_URL}/videos/${definition.slug}`,
    };
  }

  const metadata = localVideoMetadata[definition.contentUrl];
  return {
    ...definition,
    ...metadata,
    canonicalUrl: `${BASE_URL}/videos/${definition.slug}`,
  };
}

export const videoPages = videoPageDefinitions.map(buildVideoPage);

export function getVideoPageBySlug(slug) {
  return videoPages.find((video) => video.slug === slug) || null;
}

export function getVideoPageForYoutubeUrl(url) {
  const embedUrl = getYoutubeEmbedUrl(url);
  return videoPages.find((video) => video.kind === 'youtube' && video.embedUrl === embedUrl) || null;
}

export function getVideoPageForSourcePath(sourcePath) {
  return videoPages.find((video) => video.sourcePath === sourcePath) || null;
}

export function getVideoPageUrl(videoPage) {
  return videoPage ? `/videos/${videoPage.slug}` : null;
}

export function isoDurationToSeconds(duration) {
  if (!duration) return undefined;

  const match = duration.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!match) return undefined;

  return Number(match[1] || 0) * 3600 + Number(match[2] || 0) * 60 + Number(match[3] || 0);
}
