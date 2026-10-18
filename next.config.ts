import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  // Static export: the footer year is fixed at build time (no Date() during prerender).
  env: {
    BUILD_YEAR: String(new Date().getFullYear()),
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    agentFeedback: true,
  },
  // cacheComponents / partialPrefetching need a server (PPR); they cannot be used with output: "export".
  turbopack: {
    rules: {
      "*.css": {
        // CSS Modules must keep their own pipeline; renaming them via `as` drops scoping.
        condition: { not: { path: "*.module.css" } },
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
