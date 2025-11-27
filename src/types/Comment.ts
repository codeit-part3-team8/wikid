import { Writer as WriterType } from './Writer';

export type Comment = {
  writer: WriterType;
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
};
