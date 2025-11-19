import Image from 'next/image';
import { tv } from 'tailwind-variants';
import { clsx } from 'clsx';

type AvatarVariant = 'profile' | 'comment' | 'header';
type AvatarShape = 'circle';

const AvatarStyle = tv({
  base: 'relative flex items-center justify-center overflow-hidden select-none',
  variants: {
    variant: {
      //내 위키 프로필
      profile: 'w-[62px] h-[62px] md:w-[71px] md:h-[71px] lg:w-[200px] lg:h-[200px]',
      //위키리스트 댓글 프로필
      comment: 'w-[60px] h-[60px] md:w-[85px] md:h-[85px]',
      //헤더 프로필
      header: 'w-[32px] h-[32px]',
    },
    shape: {
      circle: 'rounded-full',
    },
  },
});

interface AvatarProps {
  src?: string;
  alt: string;
  variant?: AvatarVariant;
  shape?: AvatarShape;
  className?: string;
}

export default function Avatar({
  src,
  alt,
  variant = 'profile',
  shape = 'circle',
  className,
}: AvatarProps) {
  const classes = AvatarStyle({ variant, shape });
  return (
    <div className={clsx(classes, className)}>
      {src ? (
        <Image src={src} alt={alt} fill />
      ) : (
        <Image src="/fallback_avatar.avif" alt="fallback avatar" fill className="object-cover" />
      )}
    </div>
  );
}
