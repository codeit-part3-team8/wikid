'use client';

import BestArticle from '@/components/BestArticle/BestArticle';
import Headers from '@/components/Header/Header';
import Button from '@/components/Button/Button';
import { tv } from 'tailwind-variants';
import SearchInput from '@/components/SearchInput/SearchInput';
import DropDown from '@/components/DropDown/DropDown';
import ArticleList from '@/components/ArticleList/ArticleList';

import { useState } from 'react';
import Pagination from '@/components/Pagination/Pagination';

type ArticleProps = {
  id: number;
  title: string;
  writer: string;
  likeCount: number;
  createdAt: string;
};

type SortOption = '최신순' | '인기순';
const PAGE_SIZE = 10;
const bestArticleData = [
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
  {
    id: 109,
    title: '하루 종일 앉아있어서 허리 아프다',
    writer: '고구마',
    likeCount: 42,
    createdAt: '2025-11-23T20:10:00Z',
    image: '',
  },
  {
    id: 110,
    title: '프로젝트 너무 어렵다 때려치고 싶다',
    writer: '감자',
    likeCount: 42,
    createdAt: '2025-11-23T20:10:00Z',
    image: '',
  },
];

const dummyArticles: ArticleProps[] = [
  {
    id: 1001,
    title: '프론트엔드 개발 시작 가이드',
    writer: '정훈',
    likeCount: 87,
    createdAt: '2025.10.06',
  },
  {
    id: 1002,
    title: 'React와 Next.js 컴포넌트 설계 비교',
    writer: '희주',
    likeCount: 14,
    createdAt: '2025.11.03',
  },
  {
    id: 1003,
    title: 'Tailwind CSS 실전 레이아웃 팁',
    writer: '민수',
    likeCount: 102,
    createdAt: '2025.10.22',
  },
  {
    id: 1004,
    title: '디자인 시스템을 만드는 4단계',
    writer: '지영',
    likeCount: 9,
    createdAt: '2025.11.22',
  },
  {
    id: 1005,
    title: 'Git 브랜치 전략 초간단 정리',
    writer: '도진',
    likeCount: 56,
    createdAt: '2025.10.19',
  },
  {
    id: 1006,
    title: 'UX 관점에서 본 페이지네이션 설계',
    writer: '시우',
    likeCount: 33,
    createdAt: '2025.11.05',
  },
  {
    id: 1007,
    title: 'SVG 아이콘 최적화 실제 적용기',
    writer: '예린',
    likeCount: 68,
    createdAt: '2025.11.14',
  },
  {
    id: 1008,
    title: 'axios vs fetch 어떤 상황에 쓰는가?',
    writer: '민재',
    likeCount: 21,
    createdAt: '2025.11.07',
  },
  {
    id: 1009,
    title: 'Next.js 캐시와 revalidate 완전 이해',
    writer: '성민',
    likeCount: 119,
    createdAt: '2025.10.27',
  },
  {
    id: 1010,
    title: '웹 접근성 라벨링 실전 적용',
    writer: '은서',
    likeCount: 5,
    createdAt: '2025.11.06',
  },
  {
    id: 1011,
    title: '반응형 flex 모바일 column 전략',
    writer: '준호',
    likeCount: 76,
    createdAt: '2025.11.17',
  },
  {
    id: 1012,
    title: '커스텀 버튼 컴포넌트 확장 설계',
    writer: '수현',
    likeCount: 44,
    createdAt: '2025.10.04',
  },
  {
    id: 1013,
    title: 'Next.js 이미지 최적화 전략',
    writer: '철수',
    likeCount: 98,
    createdAt: '2025.10.18',
  },
  {
    id: 1014,
    title: 'SEO 메타데이터 자동생성 플로우',
    writer: '유리',
    likeCount: 7,
    createdAt: '2025.11.15',
  },
  {
    id: 1015,
    title: '상태관리 도입 전/후 이점 분석',
    writer: '짱구',
    likeCount: 61,
    createdAt: '2025.10.05',
  },
  {
    id: 1016,
    title: 'axios vs fetch 어떤 상황에 쓰는가?',
    writer: '수현',
    likeCount: 24,
    createdAt: '2025.11.27',
  },
  {
    id: 1017,
    title: '프론트엔드 개발 시작 가이드',
    writer: '민재',
    likeCount: 112,
    createdAt: '2025.10.08',
  },
  {
    id: 1018,
    title: 'React와 Next.js 컴포넌트 설계 비교',
    writer: '정훈',
    likeCount: 13,
    createdAt: '2025.11.08',
  },
  {
    id: 1019,
    title: 'Tailwind CSS 실전 레이아웃 팁',
    writer: '희주',
    likeCount: 90,
    createdAt: '2025.10.07',
  },
  {
    id: 1020,
    title: '디자인 시스템을 만드는 4단계',
    writer: '지영',
    likeCount: 46,
    createdAt: '2025.11.01',
  },
  {
    id: 1021,
    title: 'Git 브랜치 전략 초간단 정리',
    writer: '맹구',
    likeCount: 3,
    createdAt: '2025.10.03',
  },
  {
    id: 1022,
    title: 'UX 관점에서 본 페이지네이션 설계',
    writer: '시우',
    likeCount: 65,
    createdAt: '2025.10.02',
  },
  {
    id: 1023,
    title: 'SVG 아이콘 최적화 실제 적용기',
    writer: '예린',
    likeCount: 15,
    createdAt: '2025.11.12',
  },
  {
    id: 1024,
    title: 'axios vs fetch 어떤 상황에 쓰는가?',
    writer: '민수',
    likeCount: 71,
    createdAt: '2025.11.24',
  },
  {
    id: 1025,
    title: 'Next.js 캐시와 revalidate 완전 이해',
    writer: '성민',
    likeCount: 40,
    createdAt: '2025.10.10',
  },
  {
    id: 1026,
    title: '웹 접근성 라벨링 실전 적용',
    writer: '준호',
    likeCount: 23,
    createdAt: '2025.11.23',
  },
  {
    id: 1027,
    title: '반응형 flex 모바일 column 전략',
    writer: '은서',
    likeCount: 55,
    createdAt: '2025.11.06',
  },
  {
    id: 1028,
    title: '커스텀 버튼 컴포넌트 확장 설계',
    writer: '민재',
    likeCount: 17,
    createdAt: '2025.11.20',
  },
  {
    id: 1029,
    title: 'Next.js 이미지 최적화 전략',
    writer: '정훈',
    likeCount: 99,
    createdAt: '2025.10.31',
  },
  {
    id: 1030,
    title: 'SEO 메타데이터 자동생성 플로우',
    writer: '희주',
    likeCount: 108,
    createdAt: '2025.11.14',
  },
  {
    id: 1031,
    title: '상태관리 도입 전/후 이점 분석',
    writer: '민수',
    likeCount: 8,
    createdAt: '2025.10.02',
  },
  {
    id: 1032,
    title: '프론트엔드 개발 시작 가이드',
    writer: '지영',
    likeCount: 66,
    createdAt: '2025.11.05',
  },
  {
    id: 1033,
    title: 'React와 Next.js 컴포넌트 설계 비교',
    writer: '도진',
    likeCount: 44,
    createdAt: '2025.11.22',
  },
  {
    id: 1034,
    title: 'Tailwind CSS 실전 레이아웃 팁',
    writer: '시우',
    likeCount: 96,
    createdAt: '2025.10.14',
  },
  {
    id: 1035,
    title: '디자인 시스템을 만드는 4단계',
    writer: '예린',
    likeCount: 22,
    createdAt: '2025.10.27',
  },
  {
    id: 1036,
    title: 'Git 브랜치 전략 초간단 정리',
    writer: '정훈',
    likeCount: 120,
    createdAt: '2025.11.11',
  },
  {
    id: 1037,
    title: 'UX 관점에서 본 페이지네이션 설계',
    writer: '은서',
    likeCount: 19,
    createdAt: '2025.11.16',
  },
  {
    id: 1038,
    title: 'SVG 아이콘 최적화 실제 적용기',
    writer: '준호',
    likeCount: 79,
    createdAt: '2025.11.08',
  },
  {
    id: 1039,
    title: 'axios vs fetch 어떤 상황에 쓰는가?',
    writer: '정훈',
    likeCount: 38,
    createdAt: '2025.10.03',
  },
  {
    id: 1040,
    title: 'Next.js 캐시와 revalidate 완전 이해',
    writer: '희주',
    likeCount: 110,
    createdAt: '2025.11.03',
  },
  {
    id: 1041,
    title: '웹 접근성 라벨링 실전 적용',
    writer: '철수',
    likeCount: 6,
    createdAt: '2025.11.07',
  },
  {
    id: 1042,
    title: '반응형 flex 모바일 column 전략',
    writer: '유리',
    likeCount: 73,
    createdAt: '2025.10.21',
  },
  {
    id: 1043,
    title: '커스텀 버튼 컴포넌트 확장 설계',
    writer: '미선',
    likeCount: 42,
    createdAt: '2025.10.05',
  },
  {
    id: 1044,
    title: 'Next.js 이미지 최적화 전략',
    writer: '정훈',
    likeCount: 69,
    createdAt: '2025.11.01',
  },
  {
    id: 1045,
    title: 'SEO 메타데이터 자동생성 플로우',
    writer: '맹구',
    likeCount: 11,
    createdAt: '2025.11.14',
  },
  {
    id: 1046,
    title: '상태관리 도입 전/후 이점 분석',
    writer: '정훈',
    likeCount: 95,
    createdAt: '2025.10.17',
  },
  {
    id: 1047,
    title: '프론트엔드 개발 시작 가이드',
    writer: '형만',
    likeCount: 2,
    createdAt: '2025.10.22',
  },
  {
    id: 1048,
    title: 'React와 Next.js 컴포넌트 설계 비교',
    writer: '정훈',
    likeCount: 75,
    createdAt: '2025.11.03',
  },
  {
    id: 1049,
    title: 'Tailwind CSS 실전 레이아웃 팁',
    writer: '지영',
    likeCount: 31,
    createdAt: '2025.11.16',
  },
  {
    id: 1050,
    title: '디자인 시스템을 만드는 4단계',
    writer: '진우',
    likeCount: 120,
    createdAt: '2025.11.07',
  },
  {
    id: 1051,
    title: 'Git 브랜치 전략 초간단 정리',
    writer: '정훈',
    likeCount: 92,
    createdAt: '2025.11.10',
  },
  {
    id: 1052,
    title: 'UX 관점에서 본 페이지네이션 설계',
    writer: '예린',
    likeCount: 23,
    createdAt: '2025.11.20',
  },
  {
    id: 1053,
    title: 'SVG 아이콘 최적화 실제 적용기',
    writer: '희주',
    likeCount: 12,
    createdAt: '2025.11.14',
  },
  {
    id: 1054,
    title: 'axios vs fetch 어떤 상황에 쓰는가?',
    writer: '미선',
    likeCount: 50,
    createdAt: '2025.11.03',
  },
  {
    id: 1055,
    title: 'Next.js 캐시와 revalidate 완전 이해',
    writer: '형만',
    likeCount: 110,
    createdAt: '2025.10.24',
  },
  {
    id: 1056,
    title: '웹 접근성 라벨링 실전 적용',
    writer: '정훈',
    likeCount: 10,
    createdAt: '2025.11.21',
  },
  {
    id: 1057,
    title: '반응형 flex 모바일 column 전략',
    writer: '준호',
    likeCount: 92,
    createdAt: '2025.10.19',
  },
  {
    id: 1058,
    title: '커스텀 버튼 컴포넌트 확장 설계',
    writer: '은서',
    likeCount: 39,
    createdAt: '2025.11.08',
  },
  {
    id: 1059,
    title: 'Next.js 이미지 최적화 전략',
    writer: '철수',
    likeCount: 68,
    createdAt: '2025.11.01',
  },
  {
    id: 1060,
    title: 'SEO 메타데이터 자동생성 플로우',
    writer: '정훈',
    likeCount: 0,
    createdAt: '2025.10.14',
  },
  {
    id: 1061,
    title: '상태관리 도입 전/후 이점 분석',
    writer: '민재',
    likeCount: 78,
    createdAt: '2025.11.25',
  },
  {
    id: 1062,
    title: '프론트엔드 개발 시작 가이드',
    writer: '정훈',
    likeCount: 116,
    createdAt: '2025.11.14',
  },
  {
    id: 1063,
    title: 'React와 Next.js 컴포넌트 설계 비교',
    writer: '유리',
    likeCount: 19,
    createdAt: '2025.11.03',
  },
  {
    id: 1064,
    title: 'Tailwind CSS 실전 레이아웃 팁',
    writer: '맹구',
    likeCount: 45,
    createdAt: '2025.11.22',
  },
  {
    id: 1065,
    title: '디자인 시스템을 만드는 4단계',
    writer: '정훈',
    likeCount: 32,
    createdAt: '2025.11.06',
  },
  {
    id: 1066,
    title: 'Git 브랜치 전략 초간단 정리',
    writer: '짱구',
    likeCount: 97,
    createdAt: '2025.10.07',
  },
  {
    id: 1067,
    title: 'UX 관점에서 본 페이지네이션 설계',
    writer: '희주',
    likeCount: 5,
    createdAt: '2025.10.18',
  },
  {
    id: 1068,
    title: 'SVG 아이콘 최적화 실제 적용기',
    writer: '정훈',
    likeCount: 68,
    createdAt: '2025.11.27',
  },
  {
    id: 1069,
    title: 'axios vs fetch 어떤 상황에 쓰는가?',
    writer: '철수',
    likeCount: 46,
    createdAt: '2025.11.03',
  },
  {
    id: 1070,
    title: 'Next.js 이미지 최적화 전략',
    writer: '정훈',
    likeCount: 120,
    createdAt: '2025.10.05',
  },
  {
    id: 1071,
    title: 'SEO 메타데이터 자동생성 플로우',
    writer: '예린',
    likeCount: 95,
    createdAt: '2025.11.14',
  },
  {
    id: 1072,
    title: '상태관리 도입 전/후 이점 분석',
    writer: '정훈',
    likeCount: 32,
    createdAt: '2025.10.19',
  },
  {
    id: 1073,
    title: '프론트엔드 개발 시작 가이드',
    writer: '정훈',
    likeCount: 12,
    createdAt: '2025.11.23',
  },
  {
    id: 1074,
    title: 'React와 Next.js 컴포넌트 설계 비교',
    writer: '민재',
    likeCount: 67,
    createdAt: '2025.11.07',
  },
  {
    id: 1075,
    title: 'Tailwind CSS 실전 레이아웃 팁',
    writer: '정훈',
    likeCount: 73,
    createdAt: '2025.11.01',
  },
  {
    id: 1076,
    title: '디자인 시스템을 만드는 4단계',
    writer: '성민',
    likeCount: 120,
    createdAt: '2025.10.19',
  },
  {
    id: 1077,
    title: 'Git 브랜치 전략 초간단 정리',
    writer: '맹구',
    likeCount: 50,
    createdAt: '2025.10.24',
  },
  {
    id: 1078,
    title: 'UX 관점에서 본 페이지네이션 설계',
    writer: '은서',
    likeCount: 68,
    createdAt: '2025.10.02',
  },
  {
    id: 1079,
    title: 'SVG 아이콘 최적화 실제 적용기',
    writer: '짱아',
    likeCount: 19,
    createdAt: '2025.10.18',
  },
  {
    id: 1080,
    title: 'axios vs fetch 어떤 상황에 쓰는가?',
    writer: '지영',
    likeCount: 116,
    createdAt: '2025.11.16',
  },
  {
    id: 1081,
    title: 'Next.js 이미지 최적화 전략',
    writer: '정훈',
    likeCount: 46,
    createdAt: '2025.11.25',
  },
  {
    id: 1082,
    title: 'SEO 메타데이터 자동생성 플로우',
    writer: '도진',
    likeCount: 95,
    createdAt: '2025.10.14',
  },
  {
    id: 1083,
    title: '상태관리 도입 전/후 이점 분석',
    writer: '철수',
    likeCount: 14,
    createdAt: '2025.11.01',
  },
  {
    id: 1084,
    title: '프론트엔드 개발 시작 가이드',
    writer: '정훈',
    likeCount: 87,
    createdAt: '2025.10.05',
  },
  {
    id: 1085,
    title: 'React와 Next.js 컴포넌트 설계 비교',
    writer: '민재',
    likeCount: 31,
    createdAt: '2025.10.24',
  },
  {
    id: 1086,
    title: 'Tailwind CSS 실전 레이아웃 팁',
    writer: '은서',
    likeCount: 68,
    createdAt: '2025.11.21',
  },
  {
    id: 1087,
    title: '디자인 시스템을 만드는 4단계',
    writer: '지영',
    likeCount: 0,
    createdAt: '2025.11.23',
  },
  {
    id: 1088,
    title: 'Git 브랜치 전략 초간단 정리',
    writer: '철수',
    likeCount: 78,
    createdAt: '2025.10.02',
  },
  {
    id: 1089,
    title: 'UX 관점에서 본 페이지네이션 설계',
    writer: '민재',
    likeCount: 95,
    createdAt: '2025.10.19',
  },
  {
    id: 1090,
    title: 'SVG 아이콘 최적화 실제 적용기',
    writer: '희주',
    likeCount: 102,
    createdAt: '2025.11.27',
  },
  {
    id: 1091,
    title: 'axios vs fetch 어떤 상황에 쓰는가?',
    writer: '정훈',
    likeCount: 19,
    createdAt: '2025.11.25',
  },
];

const boardStyle = tv({
  base: 'lg:w-[1060px] m-auto px-[20px] sm:px-[60px] lg:px-[0] box-border',
});

export default function BoardsPage() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>('최신순'); // ✅ 부모에서도 상태 생성 (확인용)
  const [filteredArticles, setFilteredArticles] = useState<ArticleProps[]>(dummyArticles);
  const [page, setPage] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = () => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      setFilteredArticles(dummyArticles);
      setPage(1);
      return;
    }

    const result = dummyArticles.filter((article) => {
      const title = article.title.toLowerCase();
      const writer = article.writer.toLowerCase();

      return title.includes(keyword) || writer.includes(keyword);
    });

    setFilteredArticles(result);
    setPage(1);
  };

  const handleSelect = (option: SortOption) => {
    setSort(option);
    setPage(1);
  };

  const startIndex = (page - 1) * PAGE_SIZE;
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sort === '인기순') {
      return b.likeCount - a.likeCount; // 좋아요 내림차순
    }

    // 최신순 (문자열 비교지만 YYYY.MM.DD 포맷이라 괜찮음)
    return b.createdAt.localeCompare(a.createdAt);
  });

  const pagedArticles = sortedArticles.slice(startIndex, startIndex + PAGE_SIZE);
  return (
    <>
      <Headers />
      <div className={boardStyle()}>
        <div className="mt-[40px] mb-[40px] flex items-center justify-between sm:mt-[60px] sm:mb-[60px]">
          <h1 className="responsive-text text-3xl-to-2xl text-grayscale-500">베스트 게시글</h1>
          <Button
            variant="primary"
            size="md"
            className="text-md-semibold flex h-[45px] items-center justify-center"
          >
            게시물 등록하기
          </Button>
        </div>
        <div className="mb-[40px] grid auto-cols-[250px] grid-flow-col gap-[16px] overflow-x-auto min-[640px]:auto-cols-auto min-[640px]:grid-flow-row min-[640px]:grid-cols-2 min-[640px]:overflow-visible sm:mb-[60px] lg:grid-cols-4">
          {' '}
          {[...bestArticleData]
            .sort((a, b) => b.likeCount - a.likeCount)
            .slice(0, 4)
            .map((article) => (
              <BestArticle key={article.id} {...article} />
            ))}{' '}
        </div>
        <div className="flex flex-col gap-[20px] sm:flex-row">
          <div className="flex flex-1 gap-[20px]">
            <SearchInput value={search} onChange={handleChange} onSubmit={handleSearchSubmit} />
            <button
              onClick={handleSearchSubmit}
              className="hover:bg-primary-300 active:bg-primary-300 bg-primary-200 text-grayscale-50 h-[45px] w-[80px] rounded-[10px]"
            >
              검색
            </button>
          </div>
          <DropDown onSelect={handleSelect} />
        </div>
        <table className="text-grayscale-400 m-auto mt-[30px] mb-[32px] w-full sm:mt-[20px] sm:mb-[60px] md:px-[60px] lg:w-[1060px]">
          <thead className="text-lg-regular max-[640px]:hidden">
            <tr className="border-b">
              <th className="text-lg-regular px-4 py-2">번호</th>
              <th className="text-lg-regular px-4 py-2">제목</th>
              <th className="text-lg-regular px-4 py-2">작성자</th>
              <th className="text-lg-regular px-4 py-2">좋아요</th>
              <th className="text-lg-regular px-4 py-2">날짜</th>
            </tr>
          </thead>
          <tbody>
            {pagedArticles.map((article) => (
              <ArticleList
                key={article.id}
                id={article.id}
                title={article.title}
                writer={article.writer}
                likeCount={article.likeCount}
                createdAt={article.createdAt}
              />
            ))}
          </tbody>
        </table>
        <div className="mb-[57px] flex justify-center md:mb-[80px] lg:mb-[120px]">
          <Pagination
            currentPage={page}
            totalCount={filteredArticles.length}
            setPage={setPage}
            viewCount={PAGE_SIZE}
          />
        </div>
      </div>
    </>
  );
}
