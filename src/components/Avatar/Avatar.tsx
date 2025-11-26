import Image from 'next/image';
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
  const classes = AvatarStyle({ variant });

  return (
    <div className={clsx(classes, className)}>
      {imgUrl ? (
        <Image
          src={imgUrl}
          alt={`${name}이미지`}
          fill
          className="object-cover"
          priority={priority}
        />
      ) : (
        <Image
          src={AvatarFallback}
          alt="fallback이미지"
          fill
          className="object-cover"
          priority={priority}
        />
      )}
    </div>
  );
}
