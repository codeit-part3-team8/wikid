'use client';

import { mockComments } from '@/types/_mock/Comments.mock';
import { useState } from 'react';
import { useArticle } from './hooks/useArticle';
import { useDeleteArticle } from './hooks/useDeleteArticle';
import { useRouter } from 'next/navigation';
import Board from './components/Board/Board';
import CommentCount from './components/CommentCount/CommentCount';
import CommentList from './components/CommentList/CommentList';
import CommentUploadBox from './components/CommentUploadBox/CommentUploadBox';
import ToListButton from '@/components/Button/ToListButton/ToListButton';

interface BoardDetailContentProps {
  articleId: string;
  commentId: string;
}

const BoardDetailContent = ({ articleId }: BoardDetailContentProps) => {
  const router = useRouter();

  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  // article
  const { article, loading, error } = useArticle({ articleId });
  const { deleteArticle } = useDeleteArticle({
    articleId,
    onSuccess: () => router.push('/boards'),
  });

  // comment
  // const {comments, loading, error} = useComments({commentId});

  if (loading) return <p>로딩중...</p>;
  if (error) return <p>에러: {error}</p>;
  if (!article) return null;

  return (
    <div className="mt-15 mb-33 flex flex-col items-center gap-15">
      <Board article={article} onDelete={deleteArticle} />
      <ToListButton />
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <CommentCount count={mockComments.length} />
          <CommentUploadBox />
        </div>
        <CommentList comments={mockComments} currentUserId={currentUserId} />
      </div>
    </div>
  );
};

BoardDetailContent.displayName = 'BoardDetailContent';
export default BoardDetailContent;
