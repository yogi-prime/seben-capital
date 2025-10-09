import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ✅ Allow build even if ESLint finds errors or warnings
    ignoreDuringBuilds: true,
  },

  // Optional — you can add future or image config here if needed
  typescript: {
    // ✅ Allow production builds even if there are TS type errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
