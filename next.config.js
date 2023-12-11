/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["flagcdn.com", "upload.wikimedia.org"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "flagcdn.com",
    //     port: "",
    //     pathname: "/w320/**",
    //   },
    // ],
  },
};

module.exports = nextConfig;
