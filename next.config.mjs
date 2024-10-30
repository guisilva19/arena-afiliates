/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `https://backend-production-8a06.up.railway.app/:path*`,
      },
    ];
  },
};

export default nextConfig;
