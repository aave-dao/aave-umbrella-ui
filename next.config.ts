import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // FIXME: Delete this setup where TS errors in main are fixed
  eslint: {
    ignoreDuringBuilds: true,
  },
  // FIXME: Delete this setup where TS errors in main are fixed
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config) {
    // @ts-expect-error NextConfig doesn't have proper types for webpack config yet
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"));

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },

  async headers() {
    return [
      {
        source: "/manifest.json",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-Requested-With, content-type, Authorization",
          },
          {
            key: "Content-Security-Policy",
            value: 'frame-ancestors "self" https://app.safe.global;',
          },
        ],
      },
    ];
  },

  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
