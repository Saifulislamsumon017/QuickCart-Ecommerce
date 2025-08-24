/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // যেকোনো host
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
