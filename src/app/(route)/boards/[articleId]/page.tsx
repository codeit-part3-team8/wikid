import BoardDetailContent from './BoardDetailContent';

interface Props {
  params: { articleId: string };
}

export default async function BoardDetailPage({ params }: Props) {
  const { articleId } = params;
  return (
    <div>
      <BoardDetailContent articleId={articleId} />
    </div>
  );
}
