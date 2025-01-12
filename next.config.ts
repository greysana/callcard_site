import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.svg$/, // Match SVG files
  //     issuer: /\.[jt]sx?$/, // Only for JavaScript/TypeScript files
  //     use: ['@svgr/webpack'], // Use SVGR loader
  //   });
  //   return config;
  // },
};

export default nextConfig;
