import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://wikid-19-8.vercel.app';

  // 정적 페이지
  const routes = ['', '/wikilist', '/boards'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    // 게시글 목록 가져오기
    const articlesRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles?pageSize=100`,
      {
        cache: 'no-store',
      }
    );

    if (articlesRes.ok) {
      const articlesData = await articlesRes.json();
      const articles = articlesData.list || [];

      const articleRoutes = articles.map((article: { id: number; updatedAt: string }) => ({
        url: `${baseUrl}/boards/${article.id}`,
        lastModified: new Date(article.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));

      routes.push(...articleRoutes);
    }
  } catch (error) {
    console.error('Failed to fetch articles for sitemap:', error);
  }

  try {
    // 위키 목록 가져오기
    const profilesRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/profiles?pageSize=100`,
      {
        cache: 'no-store',
      }
    );

    if (profilesRes.ok) {
      const profilesData = await profilesRes.json();
      const profiles = profilesData.list || [];

      const wikiRoutes = profiles.map((profile: { code: string; updatedAt: string }) => ({
        url: `${baseUrl}/wiki/${profile.code}`,
        lastModified: new Date(profile.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));

      routes.push(...wikiRoutes);
    }
  } catch (error) {
    console.error('Failed to fetch profiles for sitemap:', error);
  }

  return routes;
}
