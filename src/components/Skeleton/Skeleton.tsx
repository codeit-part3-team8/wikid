import React from 'react';
import { tv } from 'tailwind-variants';

const skeletonStyle = tv({
  base: 'animate-pulse bg-gray-200 rounded',
  variants: {
    variant: {
      text: 'h-4 w-full',
      title: 'h-6 w-3/4',
      avatar: 'rounded-full',
      image: 'w-full',
      card: 'w-full h-full',
    },
  },
});

interface SkeletonProps {
  variant?: 'text' | 'title' | 'avatar' | 'image' | 'card';
  className?: string;
  width?: string;
  height?: string;
}

export default function Skeleton({
  variant = 'text',
  className = '',
  width,
  height,
}: SkeletonProps) {
  const style =
    width || height
      ? {
          width: width || undefined,
          height: height || undefined,
        }
      : undefined;

  return <div className={`${skeletonStyle({ variant })} ${className}`} style={style} />;
}

// 조합형 Skeleton 컴포넌트들
export function ListCardSkeleton() {
  return (
    <div className="flex h-[150px] min-h-[150px] items-center gap-8 px-9 py-6 shadow-[0px_4px_20px_rgba(0,0,0,0.08)] md:h-[142px] md:min-h-[142px]">
      <Skeleton variant="avatar" className="h-[60px] w-[60px] shrink-0 sm:h-[85px] sm:w-[85px]" />
      <div className="flex flex-1 flex-col gap-3">
        <Skeleton variant="title" className="w-2/3" />
        <Skeleton variant="text" className="w-1/2" />
        <Skeleton variant="text" className="w-1/3" />
      </div>
    </div>
  );
}

export function BestArticleSkeleton() {
  return (
    <div className="h-[200px] min-h-[200px] w-[250px] overflow-hidden rounded-[10px] shadow-[0px_4px_20px_rgba(0,0,0,0.08)] sm:h-auto sm:w-full lg:h-[220px] lg:min-h-[220px] lg:w-[250px]">
      <Skeleton variant="image" className="mb-[19px] h-[131px] sm:h-[180px] lg:h-[131px]" />
      <div className="flex flex-col gap-2 px-5 pb-3.5">
        <Skeleton variant="title" className="w-full" />
        <div className="flex justify-between">
          <Skeleton variant="text" className="w-1/3" />
          <Skeleton variant="text" className="w-1/6" />
        </div>
      </div>
    </div>
  );
}

export function ArticleRowSkeleton() {
  return (
    <tr className="min-h-[60px] border-b border-[#E4E5F0]">
      <td className="hidden w-20 py-[11px] text-center min-[640px]:table-cell">
        <Skeleton variant="text" className="mx-auto w-12" />
      </td>
      <td className="hidden py-[11px] text-center min-[640px]:table-cell">
        <Skeleton variant="text" className="mx-auto w-full max-w-xs" />
      </td>
      <td className="hidden w-30 py-[11px] text-center min-[640px]:table-cell">
        <Skeleton variant="text" className="mx-auto w-20" />
      </td>
      <td className="hidden w-20 py-[11px] text-center min-[640px]:table-cell">
        <Skeleton variant="text" className="mx-auto w-12" />
      </td>
      <td className="hidden w-30 py-[11px] text-center min-[640px]:table-cell">
        <Skeleton variant="text" className="mx-auto w-24" />
      </td>
      <td className="table-cell w-full px-4 py-[11px] min-[640px]:hidden">
        <div className="flex flex-col gap-2">
          <Skeleton variant="title" className="w-3/4" />
          <div className="flex justify-between">
            <Skeleton variant="text" className="w-1/3" />
            <Skeleton variant="text" className="w-1/6" />
          </div>
        </div>
      </td>
    </tr>
  );
}

export function ProfileCardSkeleton() {
  return (
    <div className="relative flex h-auto min-h-[500px] w-[400px] flex-col items-center rounded-[10px] bg-white px-[30px] pt-[60px] pb-12 shadow-[0_4px_20px_0_rgba(0,0,0,0.08)] max-[1024px]:w-full max-[1024px]:px-[30px] max-[1024px]:pt-5 max-[1024px]:pb-6 max-[640px]:px-5 max-[640px]:pt-[15px] max-[640px]:pb-[22px]">
      <div className="mb-[60px] max-[1024px]:mb-10 max-[640px]:mb-5">
        <Skeleton
          variant="avatar"
          className="h-[62px] w-[62px] sm:h-[71px] sm:w-[71px] lg:h-[200px] lg:w-[200px]"
        />
      </div>
      <div className="flex w-full flex-col gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="flex gap-5">
            <Skeleton variant="text" className="w-[60px]" />
            <Skeleton variant="text" className="flex-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
