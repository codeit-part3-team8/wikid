interface CommentCountProps {
  count: number;
}

const CommentCount = ({ count }: CommentCountProps) => {
  return (
    <div className="responsive-text text-2lg-to-lg-semibold flex gap-1">
      <span className="text-grayscale-500">댓글</span>
      <span className="text-primary-200">{count}</span>
    </div>
  );
};

CommentCount.displayName = 'CommentCount';
export default CommentCount;
