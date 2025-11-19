// import Button from '@/components/Button/Button'
import { getFormatDate } from '@/utils/getFormatDate';
import { ArticleType } from '@/types/ArticleType';

import Image from 'next/image';

import defaultImage from '@/assets/images/share-message.png';

interface BoardProps {
  article: ArticleType;
}

const Board = ({ article }: BoardProps) => {
  const formatDate = getFormatDate(article.createdAt);

  return (
    <div className="text-grayscale-500 flex w-84 flex-col gap-7 rounded-xl px-7 py-10 shadow-lg md:w-156 lg:w-265">
      <div className="header flex justify-between">
        <span className="text-3xl-semibold">{article.title}</span>{' '}
        {/* 반응형 추가 필요 md:text-3xl-semibold sm:text-2xl-semibold*/}
        <div className="flex gap-3">
          <button className="hidden h-[45px] rounded-2xl bg-[#4CBFA4] sm:block md:w-30 lg:w-[140px]">
            수정하기
          </button>
          <button className="hidden h-[45px] rounded-2xl bg-[#4CBFA4] sm:block md:w-30 lg:w-[140px]">
            삭제하기
          </button>
          <button className="h-6 w-6 rounded-2xl sm:hidden">✏️</button>
          <button className="h-6 w-6 rounded-2xl sm:hidden">🗑️</button>
        </div>
      </div>
      <div className="subheader text-md-regular text-grayscale-400 flex justify-between">
        {/* ↓ md:text-md-regular sm:text-xs-regular */}
        <div className="flex gap-2">
          <span>{article.writer.name}</span>
          <span>{formatDate}</span>
        </div>
        <button>❤️ {article.likeCount}</button> {/* 반응형 md:아이콘 18px sm:아이콘16px */}
      </div>
      {/* Divider */}
      <div className="content flex flex-col">
        <div>
          <Image src={article.image || defaultImage} alt="게시글 이미지" />
        </div>
        <span className="text-lg-regular">{article.content}</span> {/* sm:text-md-regular */}
      </div>
    </div>
  );
};

Board.display = 'Board';
export default Board;
