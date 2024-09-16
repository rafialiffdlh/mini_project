/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "assets.loket.com",
        port: "",
      },

      {
        protocol: "http",
        hostname: "localhost",
        port: "8002",
      },
    ],
  },
};

export default nextConfig;
