/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // NÃO use output: 'export' - precisamos de SSR!
  // Hostinger Node.js Web App suporta SSR perfeitamente
};

export default nextConfig;
