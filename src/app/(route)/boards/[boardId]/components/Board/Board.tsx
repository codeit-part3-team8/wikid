'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useArticle } from '../../hooks/articles/useArticle';
import { useDeleteArticle } from '../../hooks/articles/useDeleteArticle';
import { getFormatDate } from '@/utils/getFormatDate';
import { useRouter } from 'next/navigation';

import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import LikeButton from './LikeButton';
import Divider from '@/components/Divider/Divider';
import LoadingDots from '@/components/LoadingDots/LoadingDots';
import BoardContent from './BoardContent';

interface BoardProps {
  boardId: string;
}

const Board = ({ boardId }: BoardProps) => {
  const router = useRouter();
  const { user } = useAuth();
  const currentUserId = user?.id?.toString() ?? null;

  const { article, loading, error } = useArticle({ boardId });
  const { deleteArticle } = useDeleteArticle({
    boardId,
    onSuccess: () => router.push('/boards'),
  });

  const isWriter = currentUserId !== null && article?.writer.id.toString() === currentUserId;

  if (loading) return <LoadingDots />;
  if (error) return <p>에러가 발생했습니다: {error}</p>;
  if (!article) return <p>게시글이 존재하지 않습니다.</p>;

  const formatDate = getFormatDate(article.createdAt);

  return (
    <div className="text-grayscale-500 flex w-84 flex-col gap-7 rounded-xl px-7 py-10 shadow-[0px_4px_20px_0px_#00000014] md:w-156 lg:w-265">
      <div className="header flex justify-between">
        <span className="responsive-text text-3xl-to-2xl-semibold">{article.title}</span>{' '}
        {isWriter && (
          <div className="flex gap-3">
            <EditButton boardId={boardId} />
            <DeleteButton onDelete={deleteArticle} />
          </div>
        )}
      </div>
      <div className="subheader text-md-regular text-grayscale-400 flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="responsive-text text-md-to-xs flex gap-2">
            <span>{article.writer.name}</span>
            <span>{formatDate}</span>
          </div>
          <LikeButton boardId={boardId} likeCount={article.likeCount} isLiked={article.isLiked} />
        </div>
        <Divider className="lg:hidden" />
      </div>
      <div className="content flex flex-col gap-4">
        <BoardContent content={article.content} />
      </div>
    </div>
  );
};

Board.displayName = 'Board';
export default Board;
