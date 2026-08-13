import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { validateRedirectsFromDisk } from './scripts/content/validate-redirects.mjs';
import { readReleaseIdentity } from './scripts/content/release-identity.mjs';
import { IMAGE_REMOTE_PATTERNS } from './src/lib/imageHosts.mjs';

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
    remotePatterns: IMAGE_REMOTE_PATTERNS,
  },
  // NÃO use output: 'export' - precisamos de SSR!
  // Hostinger Node.js Web App suporta SSR perfeitamente
};

export default nextConfig;
