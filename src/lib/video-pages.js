import {
  getYoutubeEmbedUrl,
  getYoutubeThumbnailUrl,
  localVideoMetadata,
  videoMetadata,
} from '@/lib/video-metadata';

const BASE_URL = 'https://emcasacomcecilia.com';

// aspect: o formato do vídeo, que o player e o destaque de /videos seguem. 'vertical' para os Shorts
// (https://www.youtube.com/shorts/<id> responde 200), 'horizontal' para o vídeo comum (a mesma URL
// redireciona para /watch) e 'square' para o MP4 quadrado. O validate:video exige um dos três.
// seoTitle e seoDescription (opcionais): a versão curta para o <title> e a meta description, e para o
// og e o twitter. O h1 e o VideoObject seguem com o título e a descrição reais do vídeo. O validate:video
// cobra o seoTitle quando o <title> passa de 65 caracteres e a seoDescription quando a descrição passa de 160.
const videoPageDefinitions = [
  {
    slug: 'rabanada-com-doce-de-leite-video',
    seoTitle: 'Rabanada com doce de leite: passo a passo',
    kind: 'youtube',
    aspect: 'vertical',
    videoId: 'DSH6TZyiMms',
    sourcePath: '/receitas/rabanada-com-doce-de-leite',
    sourceTitle: 'Rabanada com doce de leite',
  },
  {
    slug: 'truque-manteiga-com-leite-funciona',
    seoTitle: 'Manteiga com leite integral: funciona?',
    kind: 'youtube',
    aspect: 'vertical',
    videoId: 'pftnU5mPuGU',
    sourcePath: '/reviews/minha-experiencia-manteiga-batida-aerada',
    sourceTitle: 'Minha experiência com manteiga batida aerada',
  },
  {
    slug: 'poltronas-reclinaveis-damie-sala-de-cinema',
    seoTitle: 'Poltronas reclináveis Damie na sala de TV',
    kind: 'youtube',
    aspect: 'vertical',
    videoId: 'brlxM4aUXkk',
    sourcePath: '/reviews/poltronas-reclinaveis-damie-vale-o-investimento',
    sourceTitle: 'Poltronas reclináveis Damie valem o investimento?',
  },
  {
    slug: 'sofa-modular-damie-na-caixa',
    seoTitle: 'Sofá modular Damie que chega na caixa',
    kind: 'youtube',
    aspect: 'vertical',
    videoId: 'MoBWSbcFTbg',
    sourcePath: '/reviews/sofa-damie-na-caixa-vale-a-pena-o-modular',
    sourceTitle: 'Sofá Damie na caixa: vale a pena?',
  },
  {
    slug: 'aniversario-damie-poltronas-sofas-camas',
    seoTitle: 'Aniversário da Damie: poltronas e sofás',
    kind: 'youtube',
    aspect: 'vertical',
    videoId: 'YUAO12eA0oo',
    sourcePath: '/reviews/poltrona-moon-design-que-parece-obra-de-arte',
    sourceTitle: 'Poltrona Moon: design que parece obra de arte',
  },
  {
    slug: 'poltrona-levita-damie',
    seoTitle: 'Poltrona Levita Damie: demonstração',
    kind: 'youtube',
    aspect: 'vertical',
    videoId: 'jC0UZewMARE',
    sourcePath: '/reviews/poltrona-levita-o-topo-da-tecnologia-e-conforto',
    sourceTitle: 'Poltrona Levita: tecnologia e conforto',
  },
  {
    slug: 'poltrona-damie-para-maes-e-amamentacao',
    seoTitle: 'Poltrona Damie para descanso e amamentação',
    kind: 'youtube',
    aspect: 'vertical',
    videoId: 'ep2XlSQ_OiM',
    sourcePath: '/reviews/poltrona-amamentacao-rotina',
    sourceTitle: 'Poltrona de amamentação na rotina',
  },
  {
    slug: 'poltrona-reclinavel-damie-2-0',
    seoTitle: 'Poltrona Reclinável 2.0 da Damie',
    seoDescription:
      'Primeiras impressões da Poltrona Reclinável 2.0 da DAMIE (versão 2026): massagem, motor do apoio de cabeça, suporte para tablet e Corino Importado.',
    kind: 'youtube',
    aspect: 'vertical',
    videoId: 'B8L2YJC8gaE',
    sourcePath: '/reviews/poltrona-damie-e-boa',
    sourceTitle: 'Poltrona Damie 2.0 é boa?',
  },
  {
    slug: 'cobertor-iws-igloo-dupla-face',
    seoTitle: 'Cobertor IWS Igloo dupla-face: teste',
    kind: 'youtube',
    aspect: 'vertical',
    videoId: 'BlBbtv-VuL8',
    sourcePath: '/reviews/i-wanna-sleep-cobertor-igloo-ficha-tecnica',
    sourceTitle: 'Cobertor IWS Igloo: ficha técnica e primeiras impressões',
  },
  {
    slug: 'unboxing-dolce-gusto-mini-me-2-0-primeiro-cafe',
    seoTitle: 'Unboxing da Dolce Gusto Mini Me 2.0',
    seoDescription:
      'Unboxing ASMR da Mini Me 2.0 da NESCAFÉ Dolce Gusto, da abertura da caixa ao primeiro café, um Leite Moça Pistache.',
    kind: 'youtube',
    aspect: 'vertical',
    videoId: 'RGM_61Heclo',
    sourcePath: '/reviews/dolce-gusto-mini-me-2-0-vale-a-pena',
    sourceTitle: 'NESCAFÉ Dolce Gusto Mini Me 2.0 é Boa? Teste Real na Cor Terracota',
  },
  {
    slug: 'risoto-holyfoods-kit-tiktok-shop',
    seoTitle: 'Provei o risoto proteico da HolyFoods',
    kind: 'youtube',
    aspect: 'vertical',
    videoId: 'cSGGCKqv4VU',
    sourcePath: '/reviews/holyfoods-e-confiavel',
    sourceTitle: 'HolyFoods é confiável? CNPJ, site oficial, entrega e a garantia de 30 dias',
  },
  {
    slug: 'mac-queijo-holyfoods-na-panela',
    kind: 'youtube',
    aspect: 'vertical',
    videoId: 'EFJy5dJudpw',
    sourcePath: '/reviews/cupom-holyfoods-como-usar',
    sourceTitle: 'Como usar o cupom EMCASA na HolyFoods e onde ele vale',
  },
  {
    slug: 'como-usar-cupom-ceciemcasa-i-wanna-sleep',
    seoTitle: 'Cupom CECIEMCASA na I Wanna Sleep em vídeo',
    kind: 'local',
    aspect: 'square',
    contentUrl: '/images/reviews/iwannasleep/i-wanna-sleep-site-1.mp4',
    sourcePath: '/reviews/cupom-ceciemcasa-i-wanna-sleep-como-usar',
    sourceTitle: 'Como usar o cupom CECIEMCASA na I Wanna Sleep',
  },
  {
    slug: 'primeiro-preparo-dolce-gusto-genio-s-touch',
    seoTitle: 'Primeiro uso da Dolce Gusto Genio S Touch',
    kind: 'local',
    aspect: 'square',
    contentUrl: '/videos/reviews/dolcegusto/genio-s-touch-loop-1.mp4',
    sourcePath: '/reviews/dolce-gusto-genio-s-touch-vale-a-pena',
    sourceTitle: 'Dolce Gusto Genio S Touch vale a pena?',
  },
  {
    slug: 'minha-primeira-lava-e-seca-samsung-13kg-video',
    seoTitle: 'Lava e seca Samsung 13 kg: primeiro uso',
    seoDescription:
      'Unboxing, instalação e primeiro teste da lava e seca Samsung 13 kg (WD13FG): lavagem de toalhas a 60 °C e secagem completa.',
    kind: 'youtube',
    aspect: 'horizontal',
    videoId: 'xpXX_N002jo',
    sourcePath: '/reviews/samsung-lava-seca-13kg-primeiro-uso',
    sourceTitle: 'Minha primeira lava e seca: Samsung 13 kg, unboxing e primeiro uso',
  },
  {
    slug: 'rotina-skincare-coreano-30-anos-abib-video',
    seoTitle: 'Skincare coreano aos 30 anos: rotina Abib',
    seoDescription:
      'Primeiro uso de uma rotina de skincare coreano da Abib aos 30 anos: adesivo de hidrogel para os olhos, creme com retinal e máscara labial em gel.',
    kind: 'youtube',
    aspect: 'horizontal',
    videoId: 'agfG-x5lq1s',
    sourcePath: '/reviews/skincare-coreano-30-anos-rotina-iniciante-yesstyle',
    sourceTitle: 'Skincare Coreano aos 30 Anos: Testei uma Rotina de Iniciante com a Abib da YesStyle',
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

// O título e a descrição do <head> da página do vídeo: os curtos quando existem, senão os do vídeo.
export function getVideoPageSeo(videoPage) {
  const title = videoPage.seoTitle || videoPage.title;
  return {
    title,
    documentTitle: `${title} - Em Casa com Cecília`,
    description: videoPage.seoDescription || videoPage.description,
  };
}

export function isoDurationToSeconds(duration) {
  if (!duration) return undefined;

  const match = duration.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!match) return undefined;

  return Number(match[1] || 0) * 3600 + Number(match[2] || 0) * 60 + Number(match[3] || 0);
}
