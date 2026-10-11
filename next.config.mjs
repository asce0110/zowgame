/** @type {import('next').NextConfig} */
export default {
  distDir: process.env.ZOW_BUILD_DIR || ".next",
  devIndicators: false,
  // output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};
