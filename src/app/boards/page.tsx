'use client';

import BestArticle from '@/components/BestArticle/BestArticle';
import Headers from '@/components/Header/Header';
import Button from '@/components/Button/Button';
import { tv } from 'tailwind-variants';
import SearchInput from '@/components/SearchInput/SearchInput';
import DropDown from '@/components/DropDown/DropDown';
import ArticleList from '@/components/ArticleList/ArticleList';
import { API } from '@/constants/api';
import { useState, useRef, useCallback, useEffect } from 'react';
import Pagination from '@/components/Pagination/Pagination';
import Link from 'next/link';
import axios from 'axios';

type ArticleProps = {
  id: number;
  title: string;
  writer: {
    id: number;
    name: string;
  };
  likeCount: number;
  createdAt: string;
  image?: string;
};

type SortOption = '최신순' | '인기순';
const PAGE_SIZE = 10;

const boardStyle = tv({
  base: 'lg:w-[1060px] m-auto px-[20px] sm:px-[60px] lg:px-[0] box-border',
});

export default function BoardsPage() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>('최신순');
  const [articleData, setArticleData] = useState<ArticleProps[]>([]); //이거
  const [filteredarticleData, setFilteredarticleData] = useState<ArticleProps[]>(articleData);
  const [page, setPage] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = () => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      setFilteredarticleData(articleData);
      setPage(1);
      return;
    }

    const result = articleData.filter((article) => {
      const title = article.title.toLowerCase();
      const writer = article.writer.name.toLowerCase();

      return title.includes(keyword) || writer.includes(keyword);
    });

    setFilteredarticleData(result);
    setPage(1);
  };

  const handleSelect = (option: SortOption) => {
    setSort(option);
    setPage(1);
  };

  const startIndex = (page - 1) * PAGE_SIZE;
  const sortedarticleData = [...filteredarticleData].sort((a, b) => {
    if (sort === '인기순') {
      return b.likeCount - a.likeCount;
    }

    return b.createdAt.localeCompare(a.createdAt);
  });

  const pagedarticleData = sortedarticleData.slice(startIndex, startIndex + PAGE_SIZE);
  //마우스 드래그
  const useHorizontalScroll = () => {
    const bestArticleRef = useRef<HTMLDivElement>(null);

    const handleWheel = useCallback((e: WheelEvent) => {
      const container = bestArticleRef.current;

      if (container) {
        if (window.innerWidth >= 640) {
          return;
        }

        const delta = e.deltaY;
        container.scrollLeft += delta;
        e.preventDefault();
      }
    }, []);
    useEffect(() => {
      const container = bestArticleRef.current;
      if (container) {
        container.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
          container.removeEventListener('wheel', handleWheel);
        };
      }
      return () => {};
    }, [handleWheel]);
    return bestArticleRef;
  };

  const bestRef = useHorizontalScroll();

  //api불러오기

  useEffect(() => {
    async function fetcharticleData() {
      try {
        const res = await axios.get(API.ARTICLES);
        console.log(res.data.list);

        // ✅ list가 배열이니까 그대로 넣어버리기
        setArticleData(res.data.list);
        setFilteredarticleData(res.data.list); // (테이블도 실제 데이터 쓰고 싶을 때)
      } catch (error) {
        console.error(error);
      }
    }

    fetcharticleData();
  }, []);
  return (
    <>
      <Headers />
      <div className={boardStyle()}>
        <div className="mt-[40px] mb-[40px] flex items-center justify-between sm:mt-[60px] sm:mb-[60px]">
          <h1 className="responsive-text text-3xl-to-2xl text-grayscale-500">베스트 게시글</h1>
          <Link href={'/addboard'}>
            <Button
              variant="primary"
              size="md"
              className="text-md-semibold flex h-[45px] items-center justify-center"
            >
              게시물 등록하기
            </Button>
          </Link>
        </div>

        <div
          ref={bestRef}
          id="dragBox"
          className="no-scrollbar mb-[40px] grid auto-cols-[250px] grid-flow-col gap-[16px] overflow-x-auto min-[640px]:auto-cols-auto min-[640px]:grid-flow-row min-[640px]:grid-cols-2 sm:mb-[60px] lg:grid-cols-4"
        >
          {' '}
          {[...articleData]
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
            {pagedarticleData.map((article) => (
              <ArticleList
                key={article.id}
                id={article.id}
                title={article.title}
                writer={article.writer.name}
                likeCount={article.likeCount}
                createdAt={article.createdAt}
              />
            ))}
          </tbody>
        </table>
        <div className="mb-[57px] flex justify-center md:mb-[80px] lg:mb-[120px]">
          <Pagination
            currentPage={page}
            totalCount={filteredarticleData.length}
            setPage={setPage}
            viewCount={PAGE_SIZE}
          />
        </div>
      </div>
    </>
  );
}
