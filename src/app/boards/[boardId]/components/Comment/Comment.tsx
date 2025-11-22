// import Avatar from '@/components/Avatar/Avatar';
// import IconButton from '@/components/IconButton/IconButton';
// import useAuthStore

import { CommentType } from '@/types/CommentType';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import { getFormatDate } from '@/utils/getFormatDate';

const isLogin = true;

interface CommentProps {
  comment: CommentType;
}

const Comment = ({ comment }: CommentProps) => {
  const formatDate = getFormatDate(comment.createdAt);
  return (
    <div className="flex w-84 rounded-xl px-7 py-5 shadow-[0_4px_20px_0_rgba(0,0,0,0.08)] md:w-156 lg:w-265">
      <div className="flex gap-5">
        <div>
          {/* <Avatar type={comment}/> */}
          <SVGIcon icon="IC_Profile" className="h-10 w-10 md:h-12 md:w-12" />
          {/* xl 사이즈 추가? */}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="text-2lg-semibold text-grayscale-500">{comment.writer.name}</span>
            {isLogin && (
              <div className="flex h-fit gap-2 md:gap-5">
                <button className="hover:cursor-pointer">
                  <SVGIcon icon="IC_Edit" className="text-grayscale-400 h-5 w-5 md:h-6 md:w-6" />
                </button>
                <button className="hover:cursor-pointer">
                  <SVGIcon icon="IC_Delete" className="text-grayscale-400 h-5 w-5 md:h-6 md:w-6" />
                </button>
              </div>
            )}
          </div>
          <span className="text-lg-regular text-grayscale-500">{comment.content}</span>
          <span className="text-md-regular text-grayscale-400">{formatDate}</span>
        </div>
      </div>
    </div>
  );
};

Comment.displayName = 'Comment';
export default Comment;
