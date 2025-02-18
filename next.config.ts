import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["lucide-react"],
  experimental: {
    esmExternals: true,
  },
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
 images: {
  remotePatterns: [{
    protocol: "https",
    hostname: "*"
  }]
 }
};

export default nextConfig;
