import { mockArticle } from '@/types/_mock/ArticleType.mock';
import Board from './components/Board';

export default function BoardDetailPage() {
  return (
    <div className="flex flex-col items-center pt-20">
      <h1>게시글 상세페이지</h1>
      <Board article={mockArticle} />
    </div>
  );
}
