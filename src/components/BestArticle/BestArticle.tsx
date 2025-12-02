import Image from 'next/image';
import { tv } from 'tailwind-variants';
import SVGIcon from '../SVGIcon/SVGIcon';
import { useRouter } from 'next/navigation';
import BaseModal from '../Modal/BaseModal';
import { useModal } from '@/hooks/useModal';
import Button from '../Button/Button';
interface BestArticleProps {
  id?: number;
  title: string;
  writer: {
    id: number;
    name: string;
  };
  createdAt: string;
  likeCount: number;
  image?: string;
  isLoggedIn: boolean;
}

const bestStyle = tv({
  base: ' w-[250px] h-[200px] lg:w-[250px] lg:h-[220px]  sm:w-full sm:h-auto rounded-[10px] overflow-hidden cursor-pointer shadow-[0px_4px_20px_rgba(0,0,0,0.08)]',
});

const bestTextStyle = tv({
  base: 'flex flex-col justify-center items-start px-[20px] gap-[6px] pb-[14px]',
});

export default function BestArticle({
  id,
  title,
  writer,
  createdAt,
  likeCount,
  image,
  isLoggedIn,
}: BestArticleProps) {
  const router = useRouter();

  const { isOpen, openModal, closeModal } = useModal();

  function formatDate(createDate: string) {
    const date = new Date(createDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
  }
  function handleClick() {
    if (!isLoggedIn) {
      openModal();
      return;
    }
    router.push(`/boards/${id}`);
  }

  return (
    <>
      <div onClick={handleClick} className={bestStyle()}>
        {image ? (
          <Image
            src={image}
            alt={`${image} 이미지`}
            width={250}
            height={131}
            className="mb-[19px] h-[131px] w-full object-cover sm:h-[180px] lg:h-[131px]"
          />
        ) : (
          <div className="mb-[19px] flex h-[131px] w-full items-center justify-center border-b border-gray-200 bg-gray-100 sm:h-[180px] lg:h-[131px]">
            <span className="text-sm text-gray-400">이미지 없음</span>
          </div>
        )}

        <div className={bestTextStyle()}>
          <span className="responsive-text text-2lg-to-lg text-weight-semibold text-grayscale-500 block w-full truncate">
            {title}
          </span>
          <div className="responsive-text text-md-to-xs text-weight-regular text-grayscale-400 flex w-full items-center justify-between">
            <div className="flex gap-2">
              <span>{writer.name}</span>
              <span>{formatDate(createdAt)}</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <SVGIcon icon="IC_Heart" className="h-[18px] w-[18px]" />
              <span>{likeCount}</span>
            </div>
          </div>
        </div>
      </div>
      <BaseModal size="image" isOpen={isOpen} onClose={closeModal}>
        <div className="mt-5 flex flex-col justify-center gap-5 p-3">
          <span className="text-lg">로그인이 필요한 서비스입니다.</span>
          <Button href="/login">로그인 페이지</Button>
        </div>
      </BaseModal>
    </>
  );
}
