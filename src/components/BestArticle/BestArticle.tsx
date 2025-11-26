import Image from 'next/image';
import noImage from '@/assets/noImage/noImage.avif';
import { tv } from 'tailwind-variants';
import SVGIcon from '../SVGIcon/SVGIcon';
interface BestArticleProps {
  id?: number;
  title: string;
  writer: string;
  createdAt: string;
  likeCount: number;
  image: string;
}

const bestStyle = tv({
  base: 'w-[250px] h-[200px] lg:w-[250px] lg:h-[220px] md:w-[302px] md:h-[220px] rounded-[10px] overflow-hidden shadow-[0px_4px_20px_rgba(0,0,0,0.08)] ',
});

const bestTextStyle = tv({
  base: 'flex flex-col justify-center items-start px-[20px] gap-[6px]',
});

export default function BestArticle({
  id,
  title,
  writer,
  createdAt,
  likeCount,
  image,
}: BestArticleProps) {
  function formatDate(createDate: string) {
    const date = new Date(createDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
  }

  return (
    <div className={bestStyle()}>
      {image ? (
        <Image
          src={image}
          alt={`${image} 이미지`}
          width={250}
          height={131}
          className="mb-[19px] h-[131px] w-full object-cover"
        />
      ) : (
        <Image
          className="mb-[19px] h-[131px] w-full border-b border-gray-200 object-cover"
          src={noImage}
          alt="이미지 없음"
          width={250}
          height={131}
        />
      )}

      <div className={bestTextStyle()}>
        <span className="responsive-text text-2lg-to-lg text-weight-semibold text-grayscale-500 block w-full truncate">
          {title}
        </span>
        <div className="responsive-text text-md-to-xs text-weight-regular text-grayscale-400 flex w-full items-center justify-between">
          <div className="flex gap-[8px]">
            <span>{writer}</span>
            <span>{formatDate(createdAt)}</span>
          </div>
          <div className="flex items-center justify-center gap-[4px]">
            <SVGIcon icon="IC_Heart" className="h-[18px] w-[18px]" />
            <span>{likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
