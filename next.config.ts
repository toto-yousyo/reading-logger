import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "covers.openlibrary.org",
      },
      {
        hostname: "books.google.com",
      },
      {
        hostname: "images-na.ssl-images-amazon.com",
      },
      {
        hostname: "m.media-amazon.com",
      },
    ],
  },
  experimental: {
    cacheComponents: true,
  },
};

export default nextConfig;
