'use client';

import AddBoardContent from '@/app/(route)/addboard/AddBoardContent';
import { useArticle } from '../hooks/articles/useArticle';
import LoadingDots from '@/components/LoadingDots/LoadingDots';
import { use } from 'react';

interface EditPageProps {
  params: Promise<{ boardId: string }>;
}

export default function EditPage({ params }: EditPageProps) {
  const { boardId } = use(params);
  const { article, loading, error } = useArticle({ boardId });

  if (loading) return <LoadingDots />;
  if (error) return <p>에러: {error}</p>;
  if (!article) return <p>게시글을 찾을 수 없습니다.</p>;

  return <AddBoardContent article={article} isEditMode />;
}
