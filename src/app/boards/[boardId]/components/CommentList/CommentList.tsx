'use client';

import { CommentType } from '@/types/CommentType';
import { useState } from 'react';
import Comment from '../Comment/Comment';
import Pagination from '@/components/Pagination/Pagination';

const VIEW_COUNT = 10;

interface CommentListProps {
  comments: CommentType[];
  currentUserId: number | null;
}

const CommentList = ({ comments, currentUserId }: CommentListProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  // 댓글 리스트 잘라오기
  const startIndex = (currentPage - 1) * VIEW_COUNT;
  const endIndex = startIndex + VIEW_COUNT;
  const currentComments = comments.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col items-center gap-10">
      <ul className="flex flex-col gap-6">
        {currentComments.map((comment) => (
          <li key={comment.id}>
            <Comment comment={comment} currentUserId={currentUserId} />
          </li>
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalCount={comments.length}
        setPage={setCurrentPage}
        viewCount={VIEW_COUNT}
      />
    </div>
  );
};

CommentList.displayName = 'CommentList';
export default CommentList;
