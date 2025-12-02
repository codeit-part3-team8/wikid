'use client';

import { motion } from 'framer-motion';
import { useDeleteLike } from '../../hooks/like/useDeleteLike';
import { useCreateLike } from '../../hooks/like/useCreateLike';
import clsx from 'clsx';
import IconButton from '@/components/IconButton/IconButton';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useModal } from '@/hooks/useModal';
import BaseModal from '@/components/Modal/BaseModal';
import Button from '@/components/Button/Button';

interface LikeButtonProps {
  boardId: string;
  likeCount: number;
  isLiked: boolean;
}

const LikeButton = ({
  boardId,
  likeCount: initialCount,
  isLiked: initialLiked,
}: LikeButtonProps) => {
  const [scale, setScale] = useState(1);
  const [likeCount, setLikeCount] = useState(initialCount);
  const [isLiked, setIsLiked] = useState(initialLiked);
  const { isLoggedIn } = useAuth();
  const { isOpen, openModal, closeModal } = useModal();

  const { deleteLike } = useDeleteLike({ boardId, onSuccess: undefined });
  const { createLike } = useCreateLike({ boardId, onSuccess: undefined });

  const handleClick = async () => {
    if (!isLoggedIn) {
      openModal();
      return;
    }
    setScale(1.3);
    setTimeout(() => setScale(1), 150);

    const prevLiked = isLiked;
    const prevCount = likeCount;

    if (isLiked) {
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
      try {
        await deleteLike();
      } catch {
        setIsLiked(prevLiked);
        setLikeCount(prevCount);
      }
    } else {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
      try {
        await createLike();
      } catch {
        setIsLiked(prevLiked);
        setLikeCount(prevCount);
      }
    }
  };

  return (
    <>
      <div className="flex items-center gap-1">
        <motion.div animate={{ scale }} transition={{ duration: 0.15, ease: 'easeOut' }}>
          <IconButton
            icon={isLiked ? 'IC_HeartFilled' : 'IC_Heart'}
            aria-label="like button"
            size="xs"
            onClick={handleClick}
            className={clsx(
              'h-4 w-4 md:h-[18px] md:w-[18px]',
              isLiked ? 'text-secondary-red-200 hover:text-secondary-red-200' : 'text-grayscale-400'
            )}
          />
        </motion.div>
        <span className="responsive-text text-md-to-xs">{likeCount}</span>
      </div>
      <BaseModal size="image" isOpen={isOpen} onClose={closeModal}>
        <div className="mt-5 flex flex-col justify-center gap-5 p-3">
          <span className="text-lg">로그인이 필요한 서비스입니다.</span>
          <Button href="/login">로그인 페이지</Button>
        </div>
      </BaseModal>
    </>
  );
};

LikeButton.displayName = 'LikeButton';
export default LikeButton;
