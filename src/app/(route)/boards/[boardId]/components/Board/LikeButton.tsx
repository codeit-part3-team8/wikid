'use client';

import { motion } from 'framer-motion';
import { useDeleteLike } from '../../hooks/like/useDeleteLike';
import { useCreateLike } from '../../hooks/like/useCreateLike';
import { useState } from 'react';
import clsx from 'clsx';
import IconButton from '@/components/IconButton/IconButton';

interface LikeButtonProps {
  boardId: string;
  likeCount: number;
  isLiked: boolean;
}

const LikeButton = ({ boardId, likeCount, isLiked }: LikeButtonProps) => {
  const { deleteLike } = useDeleteLike({ boardId });
  const { createLike } = useCreateLike({ boardId });

  // 로컬 상태로 관리
  const [localLiked, setLocalLiked] = useState(isLiked);
  const [localCount, setLocalCount] = useState(likeCount);
  const [scale, setScale] = useState(1);

  const handleClick = async () => {
    setScale(1.3);
    setTimeout(() => setScale(1), 150);

    if (localLiked) {
      setLocalLiked(false);
      setLocalCount((prev) => prev - 1);
      try {
        await deleteLike();
      } catch (error) {
        // 서버 요청 실패 시 롤백
        setLocalLiked(true);
        setLocalCount((prev) => prev + 1);
        console.error(error);
      }
    } else {
      setLocalLiked(true);
      setLocalCount((prev) => prev + 1);
      try {
        await createLike();
      } catch (error) {
        // 서버 요청 실패 시 롤백
        setLocalLiked(false);
        setLocalCount((prev) => prev - 1);
        console.error(error);
      }
    }
  };

  return (
    <div className="flex items-center gap-1">
      <motion.div animate={{ scale }} transition={{ duration: 0.15, ease: 'easeOut' }}>
        <IconButton
          icon={localLiked ? 'IC_HeartFilled' : 'IC_Heart'}
          aria-label="like button"
          size="xs"
          onClick={handleClick}
          className={clsx(
            'h-4 w-4 md:h-[18px] md:w-[18px]',
            localLiked
              ? 'text-secondary-red-200 hover:text-secondary-red-200'
              : 'text-grayscale-400'
          )}
        />
      </motion.div>
      <span className="responsive-text text-md-to-xs">{localCount}</span>
    </div>
  );
};

LikeButton.displayName = 'LikeButton';
export default LikeButton;
