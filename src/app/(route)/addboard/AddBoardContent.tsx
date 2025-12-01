'use client';

import ToListButton from '@/components/Button/ToListButton/ToListButton';
import Editbox from './components/Editbox';
import { Article as ArticleType } from '@/types/Article';

interface AddBoardContentProps {
  article: ArticleType;
}

const AddBoardContent = ({ article }: AddBoardContentProps) => {
  return (
    <div className="my-8 flex flex-col items-center gap-8 md:mt-10 md:gap-10 lg:mt-14 lg:gap-6">
      <Editbox article={article} />
      <ToListButton />
    </div>
  );
};

AddBoardContent.displayName = 'AddBoardContent';
export default AddBoardContent;
