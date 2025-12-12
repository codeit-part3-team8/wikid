import Avatar from '../Avatar/Avatar';
import { tv } from 'tailwind-variants';
import LinkCopy from '../LinkCopy/LinkCopy';
import Link from 'next/link';
import SnackBar from '../SnackBar/SnackBar';
import { useState } from 'react';

interface ListCardProps {
  image: string;
  name: string;
  city: string;
  nationality: string;
  job: string;
  code: string;
}

const listCardStyle = tv({
  base: 'flex items-center h-[150px] md:h-[142px] min-h-[150px] md:min-h-[142px] gap-[32px] py-6 px-9  shadow-[0px_4px_20px_rgba(0,0,0,0.08)] overflow-hidden',
});
const cardInfoStyle = tv({
  base: 'flex flex-col  flex-1 justify-between gap-[10px] md:gap-[14px] ',
});

const nameStyle = tv({
  base: 'text-grayscale-500 text-xl font-semibold sm:text-[24px] sm:font-semibold',
});

export default function ListCard({ code, image, name, city, nationality, job }: ListCardProps) {
  const [showSnackBar, setShowSnackBar] = useState(false);
  return (
    <>
      <Link href={`/wiki/${code}`}>
        <div className={listCardStyle()}>
          <Avatar className="shrink-0" imgUrl={image} name={name} variant="list" />
          <div className={cardInfoStyle()}>
            <span className={nameStyle()}>{name}</span>
            <div className="flex items-end justify-between max-[641px]:items-start max-[640px]:flex-col max-[640px]:gap-3.5">
              <div className="text-grayscale-400 flex flex-col text-xs sm:text-sm">
                <div>
                  {city}&nbsp;{nationality}
                </div>
                <div>{job}</div>
              </div>
              <div>
                <LinkCopy code={code} onCopySuccess={() => setShowSnackBar(true)} />
              </div>
            </div>
          </div>
        </div>
      </Link>
      <SnackBar
        isOpen={showSnackBar}
        message="내 위키 링크가 복사되었습니다."
        type="success"
        onClose={() => setShowSnackBar(false)}
      />
    </>
  );
}
