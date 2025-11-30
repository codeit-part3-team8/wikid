'use client';

import { useState } from 'react';
import { useArticle } from './hooks/useArticle';
import { useDeleteArticle } from './hooks/useDeleteArticle';
import { useComments } from './hooks/comment/useComments';
import { useCreateComment } from './hooks/comment/useCreateComment';
import { useRouter } from 'next/navigation';
import Board from './components/Board/Board';
import CommentCount from './components/CommentCount/CommentCount';
import CommentList from './components/CommentList/CommentList';
import CommentUploadBox from './components/CommentUploadBox/CommentUploadBox';
import ToListButton from '@/components/Button/ToListButton/ToListButton';

interface BoardDetailContentProps {
  articleId: string;
}

const BoardDetailContent = ({ articleId }: BoardDetailContentProps) => {
  const router = useRouter();
  const [currentUserId] = useState<number | null>(null);

  // article
  const { article, loading, error } = useArticle({ articleId });
  const { deleteArticle } = useDeleteArticle({
    articleId,
    onSuccess: () => router.push('/boards'),
  });

  // comment
  const { comments } = useComments({ articleId });
  const { createComment } = useCreateComment(articleId);
  const handleUpload = async (content: string) => {
    const newComment = await createComment(content);
    if (newComment) {
    }
  };

  if (loading) return <p>로딩중...</p>;
  if (error) return <p>에러: {error}</p>;
  if (!article) return null;

  return (
    <div className="mt-15 mb-33 flex flex-col items-center gap-15">
      <Board article={article} onDelete={deleteArticle} />
      <ToListButton />
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <CommentCount count={comments.length} />
          <CommentUploadBox onSubmit={handleUpload} />
        </div>
        <CommentList comments={comments} currentUserId={currentUserId} />
      </div>
    </div>
  );
};

BoardDetailContent.displayName = 'BoardDetailContent';
export default BoardDetailContent;
