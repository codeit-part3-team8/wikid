import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
            },
          },
        ],
        as: '*.js',
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'loremflickr.com', // ✅ loremflickr 이미지 허용
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // ✅ unsplash 이미지도 같이 허용
      },
    ],
  },
};

export default nextConfig;
