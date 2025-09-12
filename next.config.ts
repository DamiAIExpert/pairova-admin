// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    // Allow your common remote sources (add more as needed)
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "avatar.vercel.sh" },
      // { protocol: "https", hostname: "your-cdn.example.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },

  experimental: {
    // Trim bundle size for lucide-react tree-shaking
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
