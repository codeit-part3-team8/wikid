'use client';
import { mockArticle } from '@/types/_mock/ArticleType.mock';
import Board from './components/Board';
import CommentUploadBox from './components/CommentUploadBox/CommentUploadBox';
import { mockComments } from '@/types/_mock/Comments.mock';
import Comment from './components/Comment/Comment';

export default function BoardDetailPage() {
  return (
    <div className="flex flex-col items-center gap-10 pt-20 pb-40">
      <h1>게시글 상세페이지</h1>
      <Board article={mockArticle} />
      <CommentUploadBox />
      <Comment comment={mockComments[0]} />
    </div>
  );
}
