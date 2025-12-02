'use client';
import { useRouter } from 'next/navigation';
import SVGIcon from '../SVGIcon/SVGIcon';
import BaseModal from '../Modal/BaseModal';
import { useModal } from '@/hooks/useModal';
import Button from '../Button/Button';

interface ArticleListProps {
  id: number;
  title: string;
  writer: string;
  likeCount: number;
  createdAt: string;
  isLoggedIn: boolean;
}

export default function ArticleList({
  id,
  title,
  writer,
  likeCount,
  createdAt,
  isLoggedIn,
}: ArticleListProps) {
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
      <tr onClick={handleClick} className="cursor-pointer border-b border-[#E4E5F0]">
        <td className="text-grayscale-500 hidden w-20 py-[11px] text-center text-sm min-[640px]:table-cell">
          {id}
        </td>

        <td className="text-grayscale-500 text-lg-regular hidden py-[11px] text-center whitespace-nowrap min-[640px]:table-cell">
          {title}
        </td>
        <td className="text-grayscale-500 hidden w-30 py-[11px] text-center text-sm min-[640px]:table-cell">
          {writer}
        </td>
        <td className="text-grayscale-500 hidden w-20 py-[11px] text-center text-sm min-[640px]:table-cell">
          {likeCount}
        </td>
        <td className="text-grayscale-500 hidden w-30 py-[11px] text-center text-sm whitespace-nowrap min-[640px]:table-cell">
          {formatDate(createdAt)}
        </td>

        <td className="table-cell w-full px-4 py-[11px] min-[640px]:hidden" colSpan={5}>
          <div className="flex w-full flex-col gap-1">
            <p className="text-lg-regular text-grayscale-500 text-left">{title}</p>

            <div className="text-grayscale-400 flex w-full items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <span className="text-grayscale-500">{writer}</span>
                <span className="text-grayscale-500 whitespace-nowrap">
                  {formatDate(createdAt)}
                </span>
              </div>

              <div className="text-grayscale-500 flex items-center gap-1">
                <SVGIcon icon="IC_Heart" className="text-grayscale-500" />
                <span>{likeCount}</span>
              </div>
            </div>
          </div>
        </td>
      </tr>

      <BaseModal size="image" isOpen={isOpen} onClose={closeModal}>
        <div className="mt-5 flex flex-col justify-center gap-5 p-3">
          <span className="text-lg">로그인이 필요한 서비스입니다.</span>
          <Button href="/login">로그인 페이지</Button>
        </div>
      </BaseModal>
    </>
  );
}
