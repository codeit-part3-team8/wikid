import BoardDetailContent from './BoardDetailContent';

export default async function BoardDetailPage({
  params,
}: {
  params: Promise<{ boardId: string }>;
}) {
  const { boardId } = await params;
  return (
    <div>
      <BoardDetailContent boardId={boardId} />
    </div>
  );
}
