import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // You can also exclude large modules here if needed
  webpack(config, { isServer }) {
    if (isServer) {
      // Example: prevent huge libs from bundling server-side
      config.externals.push("chart.js", "three");
    }
    return config;
  },
};

export default withAnalyzer(nextConfig);