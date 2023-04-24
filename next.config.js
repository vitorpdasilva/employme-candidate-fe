const { NextFederationPlugin } = require("@module-federation/nextjs-mf")
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  webpack: (config, options) => {
    const { isServer } = options
    //config.experiments = { topLevelAwait: true, layers: false };
    config.module.rules.push({
      test: /\.m?js$/,
      resolve: {
        fullySpecified: false,
      },
    });
    config.resolve.alias = {
      ...config.resolve.alias,
      shell: 'shell/src',
    };
    config.plugins.push(
      new NextFederationPlugin({
        name: "candidate",
        remotes: {
          shell: `shell@http://localhost:3000/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`,
        },
        filename: "static/chunks/remoteEntry.js",
        exposes:{
          
        },
        extraOptions: {
          exposePages: true
        }
      })
    )
    return config
  }
}

module.exports = nextConfig
