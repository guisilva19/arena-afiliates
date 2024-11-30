/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        // destination: `http://localhost:8000/:path*`,
        destination: `https://backend-production-8a06.up.railway.app/:path*`,
      },
    ];
  },
};

export default nextConfig;
