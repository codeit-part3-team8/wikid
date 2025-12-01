import Image from 'next/image';
import { useState } from 'react';
import { tv } from 'tailwind-variants';
import { clsx } from 'clsx';
import AvatarFallback from '@/assets/avatarFallback/fallback_avatar.avif';

type AvatarVariant = 'profile' | 'comment' | 'header' | 'list';

const AvatarStyle = tv({
  base: 'relative flex items-center justify-center rounded-full overflow-hidden select-none',
  variants: {
    variant: {
      //내 위키 프로필
      profile: 'w-[62px] h-[62px] sm:w-[71px] sm:h-[71px] lg:w-[200px] lg:h-[200px]',
      //위키리스트 댓글 프로필
      comment: 'w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]',
      //헤더 프로필
      header: 'w-[32px] h-[32px]',
      //리스트
      list: 'w-[60px] h-[60px] sm:w-[85px] sm:h-[85px]',
    },
  },
});

interface AvatarProps {
  imgUrl: string;
  name: string;
  variant?: AvatarVariant;
  className?: string;
  priority?: boolean;
}

export default function Avatar({
  imgUrl,
  name,
  variant = 'profile',
  className,
  priority = false,
}: AvatarProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const classes = AvatarStyle({ variant });

  const shouldUseFallback = !imgUrl || hasError;

  // variant에 따른 적절한 sizes 설정
  const getSizes = () => {
    switch (variant) {
      case 'profile':
        return '(max-width: 640px) 62px, (max-width: 1024px) 71px, 200px';
      case 'comment':
        return '(max-width: 640px) 40px, 50px';
      case 'header':
        return '32px';
      case 'list':
        return '(max-width: 640px) 60px, 85px';
      default:
        return '62px';
    }
  };

  return (
    <div className={clsx(classes, className)}>
      {/* Loading skeleton */}
      {isLoading && !shouldUseFallback && (
        <div className="absolute inset-0 animate-pulse rounded-full bg-gray-200" />
      )}

      {shouldUseFallback ? (
        <Image
          src={AvatarFallback}
          alt="기본 프로필 이미지"
          fill
          sizes={getSizes()}
          className="object-cover"
          priority={priority}
          onLoad={() => setIsLoading(false)}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2Y0ZjRmNCIvPgo8L3N2Zz4="
        />
      ) : (
        <Image
          src={imgUrl}
          alt={`${name}의 프로필 이미지`}
          fill
          sizes={getSizes()}
          className="object-cover transition-opacity duration-300"
          priority={priority}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
          onLoad={() => setIsLoading(false)}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2Y0ZjRmNCIvPgo8L3N2Zz4="
        />
      )}
    </div>
  );
}
