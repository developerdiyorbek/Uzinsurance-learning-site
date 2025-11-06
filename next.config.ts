import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "edu.agros.uz",
      },
      {
        protocol: "http",
        hostname: "edu.agros.uz",
      },
    ],
  },
};

export default nextConfig;
