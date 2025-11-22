'use client';
import { tv } from 'tailwind-variants';
import clsx from 'clsx';
import SVGIcon from '../SVGIcon/SVGIcon';

const BASE_URL = 'https://www.wikied.kr'; //수정 예정

interface LinkCopyProps {
  code: string;
}

const LinkCopyStyle = tv({
  base: 'flex items-center gap-[5px] text-md-regular text-primary-200 cursor-pointer',
});

const SvgStyle = tv({
  base: 'w-[16px] h-[16px] md:w-[20px] md:h-[20px] text-primary-200',
});

export default function LinkCopy({ code }: LinkCopyProps) {
  const profileUrl = `${BASE_URL}/profiles/${code}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
    } catch (err) {
      console.error(err, '복사에 실패했습니다.');
    }
  };
  const classes = LinkCopyStyle();

  return (
    <button className={clsx(classes)} onClick={handleCopy}>
      <SVGIcon icon="IC_Link" className={SvgStyle()} />
      <span>{profileUrl}</span>
    </button>
  );
}
