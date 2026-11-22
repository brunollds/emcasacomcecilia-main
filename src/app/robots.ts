import type { MetadataRoute } from 'next';

// Liberação explícita dos motores de busca e de resposta de IA para indexação e citação pública,
// bloqueando apenas rotas internas de /api/.
const AI_AND_SEARCH_CRAWLERS = [
  'Googlebot',
  'Bingbot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  'PerplexityBot',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'Applebot',
  'Applebot-Extended',
  'Google-Extended',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: AI_AND_SEARCH_CRAWLERS,
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://emcasacomcecilia.com/sitemap.xml',
  };
}
