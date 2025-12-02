'use client';
import { tv } from 'tailwind-variants';
import clsx from 'clsx';
import SVGIcon from '../SVGIcon/SVGIcon';

const BASE_URL =
  typeof window !== 'undefined'
    ? window.location.origin
    : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

interface LinkCopyProps {
  code: string;
  onCopySuccess?: () => void;
}

const LinkCopyStyle = tv({
  base: 'inline-flex max-w-full items-center gap-[5px] text-primary-200 cursor-pointer bg-primary-100 px-[10px] py-[4px] rounded-[10px]',
});

const SvgStyle = tv({
  base: 'w-[16px] h-[16px] md:w-[20px] md:h-[20px] shrink-0',
});

export default function LinkCopy({ code, onCopySuccess }: LinkCopyProps) {
  const profileUrl = `${BASE_URL}/wiki/${code}`;

  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

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
      <span className="w-full max-w-60 truncate text-sm max-[640px]:text-xs max-[480px]:max-w-[200px] max-[430px]:max-w-[150px] lg:max-w-60">
        {profileUrl}
      </span>
    </button>
  );
}
