import { Writer as WriterType } from './Writer';
export type Article = {
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
