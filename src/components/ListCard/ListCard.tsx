import Avatar from '../Avatar/Avatar';
import { tv } from 'tailwind-variants';
import LinkCopy from '../LinkCopy/LinkCopy';

// const profile = {
//   id: 1,
//   name: '양정훈',
//   email: 'jh@example.com',
//   image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
//   city: '서울',
//   nationality: '대한민국',
//   job: '개발자',
// };

const dummyCode = 'didwjdgns';

interface ListCardProps {
  image: string;
  name: string;
  city: string;
  nationality: string;
  job: string;
}

const listCardStyle = tv({
  base: 'flex items-center h-[150px] md:h-[142px] gap-[32px] py-6 px-9  shadow-[0px_4px_20px_rgba(0,0,0,0.08)]',
});
const cardInfoStyle = tv({
  base: 'flex flex-col  flex-1 justify-between gap-[10px] md:gap-[14px] ',
});

const nameStyle = tv({
  base: 'text-grayscale-500 text-xl font-semibold sm:text-[24px] sm:font-semibold',
});

export default function ListCard({ image, name, city, nationality, job }: ListCardProps) {
  return (
    <div className={listCardStyle()}>
      <Avatar imgUrl={image} name={name} variant="list" />
      <div className={cardInfoStyle()}>
        <span className={nameStyle()}>{name}</span>
        <div className="flex items-end justify-between max-[641px]:items-start max-[640px]:flex-col max-[640px]:gap-[14px]">
          <div className="text-grayscale-400 flex flex-col text-xs sm:text-sm">
            <div>
              {city},&nbsp;{nationality}
            </div>
            <div>{job}</div>
          </div>
          <div>
            <LinkCopy code={dummyCode} />
          </div>
        </div>
      </div>
    </div>
  );
}
