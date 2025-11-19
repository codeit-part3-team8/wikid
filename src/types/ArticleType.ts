import { WriterType } from './writerType';

export type ArticleType = {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: WriterType;
  image: string;
  title: string;
  id: number;
  isLiked: boolean;
  content: string;
};
