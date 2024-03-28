/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aws-s3-glimpse.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/image/users/*',
      },
    ],
    domains: [
      'avatars.githubusercontent.com',
      'localhost',
      'aws-s3-glimpse.s3.ap-northeast-2.amazonaws.com',
    ],
  },
};

module.exports = nextConfig;
