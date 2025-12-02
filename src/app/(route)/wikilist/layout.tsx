import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '위키 목록',
  description: '다양한 사람들의 위키를 탐색하고 새로운 정보를 발견하세요.',
  keywords: ['위키드', 'WIKID', '위키 목록', '위키 검색', '프로필', '정보 탐색'],
  openGraph: {
    title: '위키 목록 | WIKID',
    description: '다양한 사람들의 위키를 탐색하고 새로운 정보를 발견하세요.',
    url: 'https://wikid-19-8.vercel.app/wikilist',
    siteName: 'WIKID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '위키 목록 | WIKID',
    description: '다양한 사람들의 위키를 탐색하고 새로운 정보를 발견하세요.',
  },
  alternates: {
    canonical: 'https://wikid-19-8.vercel.app/wikilist',
  },
};

export default function WikiListLayout({ children }: { children: React.ReactNode }) {
  return children;
}
