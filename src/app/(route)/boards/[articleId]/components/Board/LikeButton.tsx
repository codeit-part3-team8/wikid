'use client';

import { motion } from 'framer-motion';
import { useLike } from '../../hooks/like/useLike';
import { useDeleteLike } from '../../hooks/like/useDeleteLike';
import { useCreateLike } from '../../hooks/like/useCreateLike';
import { useState } from 'react';
import clsx from 'clsx';
import IconButton from '@/components/IconButton/IconButton';

interface LikeButtonProps {
  articleId: string;
}

const LikeButton = ({ articleId }: LikeButtonProps) => {
  const { like, refetch } = useLike({ articleId });
  const { deleteLike } = useDeleteLike({ articleId, onSuccess: refetch });
  const { createLike } = useCreateLike({ articleId, onSuccess: refetch });
  const [scale, setScale] = useState(1);

  const handleClick = async () => {
    setScale(1.3);
    setTimeout(() => setScale(1), 150);

    if (like?.isLiked) {
      await deleteLike();
    } else {
      await createLike();
    }
  };

  return (
    <>
      <div className="flex items-center gap-1">
        <motion.div animate={{ scale }} transition={{ duration: 0.15, ease: 'easeOut' }}>
          <IconButton
            icon={like?.isLiked ? 'IC_HeartFilled' : 'IC_Heart'}
            aria-label="like button"
            size="xs"
            onClick={handleClick}
            className={clsx(
              'h-4 w-4 md:h-[18px] md:w-[18px]',
              like?.isLiked
                ? 'text-secondary-red-200 hover:text-secondary-red-200'
                : 'text-grayscale-400'
            )}
          />
        </motion.div>
        <span className="responsive-text text-md-to-xs">{like?.likeCount}</span>
      </div>
    </>
  );
};

LikeButton.displayName = 'LikeButton';
export default LikeButton;
