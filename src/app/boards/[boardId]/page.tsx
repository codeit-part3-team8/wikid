import { mockArticle } from '@/types/_mock/ArticleType.mock';
import Board from './components/Board';
import CommentUploadBox from './components/CommentUploadBox/CommentUploadBox';

export default function BoardDetailPage() {
  return (
    <div className="flex flex-col items-center gap-10 pt-20 pb-30">
      <h1>게시글 상세페이지</h1>
      <Board article={mockArticle} />
      <CommentUploadBox />
    </div>
  );
}
