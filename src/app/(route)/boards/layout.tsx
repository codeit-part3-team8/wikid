import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '게시판',
  description: 'WIKID 커뮤니티 게시판. 다양한 주제의 게시글을 읽고 공유하세요.',
  keywords: ['위키드', 'WIKID', '게시판', '커뮤니티', '게시글', '정보 공유'],
  openGraph: {
    title: '게시판 | WIKID',
    description: 'WIKID 커뮤니티 게시판. 다양한 주제의 게시글을 읽고 공유하세요.',
    url: 'https://wikid-19-8.vercel.app/boards',
    siteName: 'WIKID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '게시판 | WIKID',
    description: 'WIKID 커뮤니티 게시판. 다양한 주제의 게시글을 읽고 공유하세요.',
  },
  alternates: {
    canonical: 'https://wikid-19-8.vercel.app/boards',
  },
};

export default function BoardsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
