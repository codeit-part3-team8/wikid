'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import IconButton from '@/components/IconButton/IconButton';
import clsx from 'clsx';
// import { useAuthStore } from '@/stores/useAuthStore';

interface LikeButtonProps {
  likeCount: number;
  liked: boolean;
}

const LikeButton = ({ likeCount, liked }: LikeButtonProps) => {
  const [like, setLike] = useState(liked);
  const [scale, setScale] = useState(1);
  // const { isLogin } = useAuthStore();

  const handleClick = () => {
    setLike((prev) => !prev);
    setScale(1.3);
    setTimeout(() => setScale(1), 150);
  };

  return (
    <>
      <div className="flex items-center gap-1">
        <motion.div animate={{ scale }} transition={{ duration: 0.15, ease: 'easeOut' }}>
          <IconButton
            icon={like ? 'IC_HeartFilled' : 'IC_Heart'}
            aria-label="like button"
            size="xs"
            onClick={handleClick}
            className={clsx(
              'h-4 w-4 md:h-[18px] md:w-[18px]',
              like ? 'text-secondary-red-200 hover:text-secondary-red-200' : 'text-grayscale-400'
            )}
          />
        </motion.div>
        <span className="responsive-text text-md-to-xs">{likeCount}</span>
      </div>
    </>
  );
};

LikeButton.displayName = 'LikeButton';
export default LikeButton;
