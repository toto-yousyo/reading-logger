import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "books.google.com",
      },
    ],
  },
  experimental: {
    cacheComponents: true,
  },
};

export default nextConfig;
