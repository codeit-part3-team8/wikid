import BoardDetailContent from './BoardDetailContent';

interface Props {
  params: { articleId: string; commentId: string };
}

export default async function BoardDetailPage({ params }: Props) {
  const { articleId, commentId } = await params;
  return (
    <div>
      <BoardDetailContent articleId={articleId} commentId={commentId} />
    </div>
  );
}
