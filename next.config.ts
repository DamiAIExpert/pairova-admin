// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    // allow remote placeholders + any future CDN(s) you’ll use
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "avatar.vercel.sh" },
      // { protocol: "https", hostname: "your-cdn.example.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },

  experimental: {
    // trims bundle size for lucide-react imports
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
