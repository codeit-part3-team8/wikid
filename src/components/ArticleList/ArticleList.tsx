import SVGIcon from '../SVGIcon/SVGIcon';

interface ArticleListProps {
  id: number;
  title: string;
  writer: string;
  likeCount: number;
  createdAt: string;
}

export default function ArticleList({ id, title, writer, likeCount, createdAt }: ArticleListProps) {
  return (
    <tr className="border-b border-[#E4E5F0]">
      {/* ✅ PC용 각각의 td */}
      <td className="text-grayscale-500 hidden w-[80px] py-[11px] text-center text-sm min-[640px]:table-cell">
        {id}
      </td>
      <td className="text-grayscale-500 text-lg-regular hidden py-[11px] text-center min-[640px]:table-cell">
        {title}
      </td>
      <td className="text-grayscale-500 hidden w-[120px] py-[11px] text-center text-sm min-[640px]:table-cell">
        {writer}
      </td>
      <td className="text-grayscale-500 hidden w-[80px] py-[11px] text-center text-sm min-[640px]:table-cell">
        {likeCount}
      </td>
      <td className="text-grayscale-500 hidden w-[120px] py-[11px] text-center text-sm whitespace-nowrap min-[640px]:table-cell">
        {createdAt}
      </td>

      {/* ✅ 모바일에서만 보이는 1칸짜리 큰 td */}
      <td className="table-cell w-full px-4 py-[11px] min-[640px]:hidden" colSpan={5}>
        <div className="flex w-full flex-col gap-[4px]">
          {/* ✅ 네가 쓰던 텍스트 스타일 그대로 */}
          <p className="text-lg-regular text-grayscale-500 text-left">{title}</p>

          <div className="text-grayscale-400 flex w-full items-center justify-between text-sm">
            <div className="flex items-center gap-[16px]">
              {/* ✅ writer 스타일도 그대로 */}
              <span className="text-grayscale-500">{writer}</span>
              <span className="text-grayscale-500 whitespace-nowrap">{createdAt}</span>
            </div>

            {/* ✅ 좋아요 영역도 너 스타일 유지 */}
            <div className="text-grayscale-500 flex items-center gap-1">
              <SVGIcon icon="IC_Heart" className="text-grayscale-500" />
              <span>{likeCount}</span>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}
