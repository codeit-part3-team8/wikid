import BestArticle from '@/components/BestArticle/BestArticle';

export const bestArticleData = [
  {
    id: 101,
    title: 'Next.js 15에서 꼭 알아야 할 캐시 전략',
    writer: '철수',
    likeCount: 72,
    createdAt: '2025-11-20T09:10:00Z',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
  },
  {
    id: 102,
    title: 'React 19에서 form action 제대로 쓰는 법',
    writer: '유리',
    likeCount: 65,
    createdAt: '2025-11-19T14:22:00Z',
    image: 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=800&h=600&fit=crop',
  },
  {
    id: 103,
    title: 'Tailwind-Variants로 디자인 시스템 설계하기',
    writer: '짱구',
    likeCount: 59,
    createdAt: '2025-11-21T07:45:00Z',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=600&fit=crop',
  },
  {
    id: 104,
    title: '프론트엔드 취업을 위해 꼭 필요한 포트폴리오 구성',
    writer: '맹구',
    likeCount: 55,
    createdAt: '2025-11-18T11:30:00Z',
    image: '',
  },
  {
    id: 105,
    title: 'Prisma 마이그레이션 충돌 없이 배포하는 팁',
    writer: '훈이',
    likeCount: 51,
    createdAt: '2025-11-17T17:05:00Z',
    image: '',
  },
  {
    id: 106,
    title: 'SVG 아이콘 최적화와 OG 이미지 자동 생성 플로우',
    writer: '짱아',
    likeCount: 49,
    createdAt: '2025-11-22T10:15:00Z',
    image: '',
  },
  {
    id: 107,
    title: 'Git upstream 최신 내용으로 안전하게 동기화 하는 3가지 방법',
    writer: '흰둥이',
    likeCount: 46,
    createdAt: '2025-11-16T09:58:00Z',
    image: '',
  },
  {
    id: 108,
    title: '무한 스크롤 vs 페이지네이션 UX 비교 분석',
    writer: '치타',
    likeCount: 42,
    createdAt: '2025-11-23T20:10:00Z',
    image: '',
  },
];

export default function BoardsPage() {
  return (
    <div>
      <h1>자유게시판페이지</h1>
      <div className="flex justify-around">
        {bestArticleData
          .sort((a, b) => b.likeCount - a.likeCount)
          .slice(0, 4)
          .map((article) => (
            <BestArticle key={article.id} {...article} />
          ))}
      </div>
    </div>
  );
}
