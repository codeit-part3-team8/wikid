'use client';
import { tv } from 'tailwind-variants';
import clsx from 'clsx';
import SVGIcon from '../SVGIcon/SVGIcon';

const BASE_URL = 'https://www.wikied.kr'; //수정 예정

interface LinkCopyProps {
  code: string;
  onCopySuccess?: () => void;
}

const LinkCopyStyle = tv({
  base: 'flex items-center gap-[5px] text-primary-200 cursor-pointer',
});

const SvgStyle = tv({
  base: 'w-[16px] h-[16px] md:w-[20px] md:h-[20px]',
});

// 커스텀이라 안먹어서 css로 대체 팀미팅때 물어보고 수정하겠습니다.
// const UrlStyle = tv({ base: 'text-xs-regular md:text-md-regular', });

export default function LinkCopy({ code, onCopySuccess }: LinkCopyProps) {
  const profileUrl = `${BASE_URL}/profiles/${code}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      onCopySuccess?.();
    } catch (err) {
      console.error(err, '복사에 실패했습니다.');
    }
  };

  const classes = LinkCopyStyle();

  return (
    <button className={clsx(classes)} onClick={handleCopy}>
      <SVGIcon icon="IC_Link" className={SvgStyle()} />
      <span className="text-[14px] max-[640px]:text-xs">{profileUrl}</span>
    </button>
  );
}
