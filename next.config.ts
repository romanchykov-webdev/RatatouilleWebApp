import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // добавляем сюда домен
  },
};

export default nextConfig;
