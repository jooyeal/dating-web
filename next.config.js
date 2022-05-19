/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    HOST_URL: "https://datingapp-back.herokuapp.com",
    GOOGLE_CLIENTID:
      "642025015769-s1hiheikmqpcf8ala9r25crg4raa085j.apps.googleusercontent.com",
    GOOGLE_SECRET: "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",
  },
};

module.exports = nextConfig;
