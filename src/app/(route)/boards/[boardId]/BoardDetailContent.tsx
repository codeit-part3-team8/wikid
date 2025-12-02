'use client';

import Board from './components/Board/Board';
import ToListButton from '@/components/Button/ToListButton/ToListButton';
import CommentSection from './components/CommentSection/CommentSection';

interface Props {
  boardId: string;
}

const BoardDetailContent = ({ boardId }: Props) => {
  return (
    <div className="mt-15 mb-33 flex flex-col items-center gap-15">
      <Board boardId={boardId} />
      <ToListButton />
      <CommentSection boardId={boardId} />
    </div>
  );
};

BoardDetailContent.displayName = 'BoardDetailContent';
export default BoardDetailContent;
