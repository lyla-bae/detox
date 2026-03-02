import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@fortawesome/free-solid-svg-icons"],
  },
};

export default nextConfig;
