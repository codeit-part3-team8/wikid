import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/mypage/', '/addboard/', '/signup/', '/login/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/mypage/', '/addboard/', '/signup/', '/login/'],
      },
    ],
    sitemap: 'https://wikid-19-8.vercel.app/sitemap.xml',
    host: 'https://wikid-19-8.vercel.app',
  };
}
