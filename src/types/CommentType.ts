import { WriterType } from './writerType';

export type CommentType = {
  writer: WriterType;
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
};
