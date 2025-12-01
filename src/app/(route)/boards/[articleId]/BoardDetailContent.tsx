import Board from './components/Board/Board';
import ToListButton from '@/components/Button/ToListButton/ToListButton';
import CommentSection from './components/CommentSection/CommentSection';

interface BoardDetailContentProps {
  articleId: string;
}

const BoardDetailContent = ({ articleId }: BoardDetailContentProps) => {
  // article

  return (
    <div className="mt-15 mb-33 flex flex-col items-center gap-15">
      <Board articleId={articleId} />
      <ToListButton />
      <CommentSection articleId={articleId} />
    </div>
  );
};

BoardDetailContent.displayName = 'BoardDetailContent';
export default BoardDetailContent;
