import { tv } from 'tailwind-variants';
import SVGIcon from '../SVGIcon/SVGIcon';
const PAGE_BLOCK = 5; // 보여지는 버튼 개수

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  setPage: (page: number) => void; //함수가 넘버타입의 페이지를 받아 아무것도 리턴하지 않음
  viewCount: number;
}

const paginationStyle = tv({
  base: 'relative flex items-center justify-between w-[320px] h-[45px] md:w-[385px]',
});

const paginationBtnStyle = tv({
  base: 'relative inline-flex items-center justify-center w-[40px] h-[40px] md:w-[45px] md:h-[45px] rounded-[10px] shadow-[0px_4px_20px_rgba(0,0,0,0.08)]',
});

const pagiNumStyle = tv({
  base: 'typo-xs-regular md:typo-2lg-regular',
  variants: {
    active: {
      true: 'text-[var(--primary-200)]',
      false: 'text-[var(--grayscale-400)]',
    },
  },
});

export default function Pagination({
  currentPage,
  totalCount,
  setPage,
  viewCount,
}: PaginationProps) {
  if (viewCount <= 0) return null;
  const totalPage = Math.ceil(totalCount / viewCount); //토탈페이지 완료
  if (totalPage <= 1) return null; // 다음 페이지 까지 넘어갈 데이터가 없으면 페이지네이션 안보임

  const pageBtn = Array.from({ length: PAGE_BLOCK }, (_, i) => i + 1);

  let startPage = currentPage - 2;
  let endPage = currentPage + 2;

  if (startPage < 1) {
    // endPage += 1 - startPage;
    startPage = 1;
  }

  if (endPage > totalPage) {
    startPage -= endPage - totalPage; // 차이 나는만큼 스타트 페이지 더 보이게
    endPage = totalPage;
  }

  if (startPage < 1) startPage = 1;

  const pageNumbers: number[] = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPage) return;
    setPage(page);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPage) {
      setPage(currentPage + 1);
    }
  };

  return (
    <div className={paginationStyle()}>
      <button className={paginationBtnStyle()} disabled={currentPage === 1} onClick={handlePrev}>
        <SVGIcon icon="IC_Expand" className="rotate-90" />
      </button>
      {pageBtn.map((_, num) => {
        const pageNum = startPage + num;
        if (pageNum > totalPage) return null;
        return (
          <button
            className={paginationBtnStyle()}
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
          >
            <span className={pagiNumStyle({ active: pageNum === currentPage })}>{pageNum}</span>
          </button>
        );
      })}
      <button
        className={paginationBtnStyle()}
        disabled={currentPage === totalPage}
        onClick={handleNext}
      >
        <SVGIcon icon="IC_Expand" className="rotate-270" />
      </button>
    </div>
  );
}
