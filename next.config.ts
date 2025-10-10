import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // run as a real Node app
  output: "standalone",

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // add remote domains here if you ever load external images
  // images: { domains: ["res.cloudinary.com", "images.ctfassets.net"] },
};

export default nextConfig;
