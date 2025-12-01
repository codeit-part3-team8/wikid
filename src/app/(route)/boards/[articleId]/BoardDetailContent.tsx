'use client';

import { useArticle } from './hooks/articles/useArticle';
import { useDeleteArticle } from './hooks/articles/useDeleteArticle';
import { useRouter, notFound } from 'next/navigation';

import Board from './components/Board/Board';
import ToListButton from '@/components/Button/ToListButton/ToListButton';
import CommentSection from './components/CommentSection/CommentSection';

interface BoardDetailContentProps {
  articleId: string;
}

const BoardDetailContent = ({ articleId }: BoardDetailContentProps) => {
  const router = useRouter();

  // article
  const { article, loading: aloading, error: aerror } = useArticle({ articleId });
  const { deleteArticle } = useDeleteArticle({
    articleId,
    onSuccess: () => router.push('/boards'),
  });

  if (aloading) return <p>로딩중...</p>;
  if (aerror) return <p>에러: {aerror}</p>;
  if (!article) return notFound();

  return (
    <div className="mt-15 mb-33 flex flex-col items-center gap-15">
      <Board article={article} onDelete={deleteArticle} />
      <ToListButton />
      <CommentSection articleId={articleId} />
    </div>
  );
};

BoardDetailContent.displayName = 'BoardDetailContent';
export default BoardDetailContent;
