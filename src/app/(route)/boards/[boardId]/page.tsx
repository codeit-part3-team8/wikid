import BoardDetailContent from './BoardDetailContent';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ boardId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { boardId } = await params;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${boardId}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return {
        title: 'WIKID - 게시글',
        description: '위키드 게시글',
      };
    }

    const article = await res.json();
    const title = article.title || '게시글';
    const description =
      article.content?.replace(/<[^>]*>/g, '').substring(0, 160) || '위키드 게시글';
    const imageUrl = article.image || '/og-image.png';
    const author = article.writer?.name || 'WIKID';
    const publishedTime = article.createdAt;
    const modifiedTime = article.updatedAt;

    return {
      title: `${title}`,
      description,
      keywords: ['위키드', 'WIKID', '게시글', title],
      authors: [{ name: author }],
      creator: author,
      publisher: 'WIKID',
      openGraph: {
        title,
        description,
        url: `https://wikid-19-8.vercel.app/boards/${boardId}`,
        siteName: 'WIKID',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        locale: 'ko_KR',
        type: 'article',
        publishedTime,
        modifiedTime,
        authors: [author],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [imageUrl],
        creator: '@WIKID',
      },
      alternates: {
        canonical: `https://wikid-19-8.vercel.app/boards/${boardId}`,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    };
  } catch (error) {
    console.error('Failed to fetch article metadata:', error);
    return {
      title: 'WIKID - 게시글',
      description: '위키드 게시글',
    };
  }
}

export default async function BoardDetailPage({ params }: Props) {
  const { boardId } = await params;

  let jsonLd = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${boardId}`, {
      cache: 'no-store',
    });

    if (res.ok) {
      const article = await res.json();
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.content?.replace(/<[^>]*>/g, '').substring(0, 160),
        image: article.image || 'https://wikid-19-8.vercel.app/og-image.png',
        datePublished: article.createdAt,
        dateModified: article.updatedAt,
        author: {
          '@type': 'Person',
          name: article.writer?.name || 'WIKID',
        },
        publisher: {
          '@type': 'Organization',
          name: 'WIKID',
          url: 'https://wikid-19-8.vercel.app',
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://wikid-19-8.vercel.app/boards/${boardId}`,
        },
      };
    }
  } catch (error) {
    console.error('Failed to fetch article for structured data:', error);
  }

  return (
    <div>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <BoardDetailContent boardId={boardId} />
    </div>
  );
}
