const {
  NEXT_PUBLIC_CLIENT_ID,
  NEXT_PUBLIC_CLIENT_SECRET,
  NEXT_PUBLIC_CLIENT_ISSUER,
  NEXT_PUBLIC_DEV_GRAPHQL_ENDPOINT,
  NEXTAUTH_SECRET,
  NEXTAUTH_URL,
  NEXT_OPENAPI_BASE_PATH,
  NEXT_PUBLIC_IMAGE_BASE_PATH,
  NEXT_HOTJAR_ID,
} = process.env;

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_CLIENT_ID,
    NEXT_PUBLIC_CLIENT_SECRET,
    NEXT_PUBLIC_CLIENT_ISSUER,
    NEXT_PUBLIC_DEV_GRAPHQL_ENDPOINT,
    NEXTAUTH_SECRET,
    NEXTAUTH_URL,
    NEXT_ACCESS_TOKEN_URL,
    NEXT_AUTH_URL,
    NEXT_OPENAPI_BASE_PATH,
    NEXT_PUBLIC_IMAGE_BASE_PATH,
    NEXT_HOTJAR_ID,
  },
  images: {
    domains: [NEXT_PUBLIC_IMAGE_BASE_PATH]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    });

    return config;
  },
};

module.exports = nextConfig;
