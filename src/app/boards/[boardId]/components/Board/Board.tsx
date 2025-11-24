// import Button from '@/components/Button/Button'
import { getFormatDate } from '@/utils/getFormatDate';
import { ArticleType } from '@/types/ArticleType';

import Image from 'next/image';

import defaultImage from '@/assets/images/share-message.png';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import LikeButton from './LikeButton';
import Divider from '@/components/Divider/Divider';

interface BoardProps {
  isLogin: boolean;
  article: ArticleType;
}

const Board = ({ article, isLogin }: BoardProps) => {
  const formatDate = getFormatDate(article.createdAt);

  return (
    <div className="text-grayscale-500 flex w-84 flex-col gap-7 rounded-xl px-7 py-10 shadow-[0px_4px_20px_0px_#00000014] md:w-156 lg:w-265">
      <div className="header flex justify-between">
        <span className="responsive-text text-3xl-to-2xl-semibold">{article.title}</span>{' '}
        <div className="flex gap-3">
          <EditButton />
          <DeleteButton />
        </div>
      </div>
      <div className="subheader text-md-regular text-grayscale-400 flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="responsive-text text-md-to-xs flex gap-2">
            <span>{article.writer.name}</span>
            <span>{formatDate}</span>
          </div>
          <LikeButton likeCount={article.likeCount} isLogin={isLogin} />
        </div>
        <Divider className="lg:hidden" />
      </div>
      <div className="content flex flex-col">
        <div>
          <Image src={article.image || defaultImage} alt="게시글 이미지" />
        </div>
        <span className="text-lg-regular">{article.content}</span> {/* sm:text-md-regular */}
      </div>
    </div>
  );
};

Board.displayName = 'Board';
export default Board;
