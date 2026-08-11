import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { validateRedirectsFromDisk } from './scripts/content/validate-redirects.mjs';
import { readReleaseIdentity } from './scripts/content/release-identity.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Fail-loud no build: redirects.json inválido derruba o build (o script `build` não chama
// validate:content, então a validação mora aqui).
const redirects = validateRedirectsFromDisk(
  path.join(__dirname, 'content', 'redirects.json'),
  path.join(__dirname, 'content')
);

const releaseIdentity = readReleaseIdentity({
  sourcePath: path.join(__dirname, 'release-meta.json'),
  required: process.env.RELEASE_META_REQUIRED === '1',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  ...(releaseIdentity.target_sha
    ? { generateBuildId: async () => releaseIdentity.target_sha }
    : {}),
  env: {
    EMCASA_RELEASE_TARGET_SHA: releaseIdentity.target_sha ?? '',
    EMCASA_RELEASE_DEPLOY_UUID: releaseIdentity.deploy_uuid ?? '',
  },
  async redirects() {
    return redirects;
  },
  reactStrictMode: true,
  experimental: {
    cpus: 1,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dicas.emcasacomcecilia.com',
      },
      {
        protocol: 'https',
        hostname: 'central.emcasacomcecilia.com',
      },
      {
        protocol: 'https',
        hostname: 'media.emcasacomcecilia.com',
      },
      {
        protocol: 'https',
        hostname: 'http2.mlstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'images-na.ssl-images-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'img.magazineluiza.com.br',
      },
      {
        protocol: 'https',
        hostname: 'a-static.mlcdn.com.br',
      },
      {
        protocol: 'https',
        hostname: 'cf.shopee.com.br',
      },
      {
        protocol: 'https',
        hostname: 'deo.shopeemobile.com',
      },
      {
        protocol: 'https',
        hostname: 'down-br.img.susercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.kwcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'ae01.alicdn.com',
      },
      {
        protocol: 'https',
        hostname: 'ae04.alicdn.com',
      },
      {
        protocol: 'https',
        hostname: 'gaming-cdn.com',
      },
      {
        protocol: 'https',
        hostname: 'ae-pic-a1.aliexpress-media.com',
      },
      {
        protocol: 'https',
        hostname: 'm.magazineluiza.com.br',
      },
      {
        protocol: 'https',
        hostname: 'www.damie.com.br',
      },
      {
        protocol: 'http',
        hostname: 'www.damie.com.br',
      },
      {
        protocol: 'https',
        hostname: 'damie.com.br',
      },
      {
        protocol: 'http',
        hostname: 'damie.com.br',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
  },
  // NÃO use output: 'export' - precisamos de SSR!
  // Hostinger Node.js Web App suporta SSR perfeitamente
};

export default nextConfig;
