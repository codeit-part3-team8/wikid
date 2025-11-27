import SVGIcon from '../SVGIcon/SVGIcon';

interface ArticleListProps {
  id: number;
  title: string;
  writer: string;
  likeCount: number;
  creatdeAt: string;
}

export default function ArticleList({ id, title, writer, likeCount, creatdeAt }: ArticleListProps) {
  return (
    <>
      <tr className="text-lg-regular text-grayscale-500 border-grayscale-200 hidden border-b min-[640px]:table-row md:table-row">
        <td className="w-[80px] py-[11px] text-center">{id}</td>
        <td className="py-[11px] text-center">{title}</td>
        <td className="w-[120px] py-[11px] text-center">{writer}</td>
        <td className="w-[80px] py-[11px] text-center">{likeCount}</td>
        <td className="w-[120px] py-[11px] text-center whitespace-nowrap">{creatdeAt}</td>
      </tr>
      {/* 모바일 */}
      <tr className="border-grayscale-200 table-row min-[640px]:hidden">
        <td className="w-full px-4 py-[11px]">
          <div className="flex w-full flex-col gap-[4px]">
            <p className="text-lg-regular text-grayscale-700 text-left">{title}</p>

            <div className="text-grayscale-400 flex w-full items-center justify-between text-sm">
              <div className="flex items-center gap-[16px]">
                <span className="text-grayscale-500">{writer}</span>
                <span className="whitespace-nowrap">{creatdeAt}</span>
              </div>
              <div className="text-grayscale-500 flex items-center gap-[5px]">
                <SVGIcon icon="IC_Heart" />
                <span>{likeCount}</span>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}
