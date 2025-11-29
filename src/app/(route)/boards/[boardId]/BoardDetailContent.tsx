'use client';

import { mockArticle } from '@/types/_mock/ArticleType.mock';
import { mockComments } from '@/types/_mock/Comments.mock';
import { useState } from 'react';
import Board from './components/Board/Board';
import CommentCount from './components/CommentCount/CommentCount';
import CommentList from './components/CommentList/CommentList';
import CommentUploadBox from './components/CommentUploadBox/CommentUploadBox';
import ToListButton from './components/ToListButton/ToListButton';

// interface BoardDetailContentProps {
//   boardId: number;
// }

const BoardDetailContent = () => {
  const [isLogin, setIsLogin] = useState(false); // 임시 로그인/로그아웃 버튼
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  // const article = await fetchArticle(boardId);
  // const comments = await fetchComments(boardId);

  return (
    <div className="mt-15 mb-33 flex flex-col items-center gap-15">
      <Board article={mockArticle} isLogin={isLogin} />
      <ToListButton />
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <CommentCount count={mockComments.length} />
          <button
            onClick={() => {
              const newIsLogin = !isLogin;
              setIsLogin(newIsLogin);
              setCurrentUserId(newIsLogin ? 101 : null);
            }}
            className="absolute top-100 right-0 w-fit cursor-pointer rounded border bg-lime-400 px-2 py-1"
          >
            <span>{isLogin ? '로그아웃' : '로그인'}</span>
          </button>
          <CommentUploadBox isLogin={isLogin} />
        </div>
        <CommentList comments={mockComments} currentUserId={currentUserId} />
      </div>
    </div>
  );
};

BoardDetailContent.displayName = 'BoardDetailContent';
export default BoardDetailContent;
