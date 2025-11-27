import { Comment as CommentType } from '../Comment';

export const mockComments: CommentType[] = [
  {
    id: 1,
    writer: { id: 101, name: '홍길동', image: '' },
    content:
      '좋은 글 잘 읽었습니다!좋은 글 잘 읽었습니다!좋은 글 잘 읽었습니다!좋은 글 잘 읽었습니다!',
    createdAt: '2025-11-21T10:00:00Z',
    updatedAt: '2025-11-21T10:05:00Z',
  },
  {
    id: 2,
    writer: { id: 102, name: '김영희', image: '' },
    content: '저는 조금 다른 의견이 있어요. 참고만 해주세요.',
    createdAt: '2025-11-21T10:10:00Z',
    updatedAt: '2025-11-21T10:12:00Z',
  },
  {
    id: 3,
    writer: { id: 103, name: '최민수', image: '' },
    content:
      '이 내용은 사실과 다릅니다. 허위사실이나 비방은 피해주세요. 꼭 확인 후 작성 부탁드립니다.',
    createdAt: '2025-11-21T10:15:00Z',
    updatedAt: '2025-11-21T10:20:00Z',
  },
  {
    id: 4,
    writer: { id: 104, name: '이서준', image: '' },
    content: '댓글이 길어질 경우 자동으로 줄바꿈 됩니다. 테스트용으로 긴 댓글 작성 중입니다.',
    createdAt: '2025-11-21T10:30:00Z',
    updatedAt: '2025-11-21T10:35:00Z',
  },
  // 추가 17개 댓글
  ...Array.from({ length: 17 }, (_, i) => ({
    id: 5 + i,
    writer: { id: 105 + i, name: `작성자${5 + i}`, image: '' },
    content: `테스트 댓글 ${5 + i}`,
    createdAt: new Date(2025, 10, 21, 11, i * 5).toISOString(), // 시각만 조금씩 다르게
    updatedAt: new Date(2025, 10, 21, 11, i * 5 + 2).toISOString(),
  })),
];
