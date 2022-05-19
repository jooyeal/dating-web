/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
  },
  env: {
    HOST_URL: "http://localhost:5000",
    GOOGLE_CLIENTID:
      "642025015769-s1hiheikmqpcf8ala9r25crg4raa085j.apps.googleusercontent.com",
    GOOGLE_SECRET: "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",
  },
};

module.exports = nextConfig;
