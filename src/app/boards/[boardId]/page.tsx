import BoardDetailContent from './BoardDetailContent';

export default async function BoardDetailPage({
  params,
}: {
  params: Promise<{ boardId: number }>;
}) {
  const { boardId } = await params;
  return (
    <div>
      <BoardDetailContent />
    </div>
  );
}
