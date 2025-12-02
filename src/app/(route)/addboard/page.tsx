import AddBoardContent from './AddBoardContent';
import { API } from '@/constants/api';
import { safeFetch } from '@/utils/safeFetch';
import { Article as ArticleType } from '@/types/Article';

interface PageProps {
  params?: {
    id?: string; // 수정할 시 article id
  };
}

const emptyArticle: ArticleType = {
  updatedAt: '',
  createdAt: '',
  likeCount: 0,
  writer: { id: 0, name: '', image: '' },
  image: '',
  title: '',
  id: 0,
  isLiked: false,
  content: '',
};

export default async function AddBoardPage({ params }: PageProps) {
  let article: ArticleType = emptyArticle;

  if (params?.id) {
    // 수정
    try {
      const data = await safeFetch(`${API.ARTICLES}${params.id}`);
      article = data || emptyArticle;
    } catch {
      article = emptyArticle;
    }
  }
  return <AddBoardContent article={article} />;
}
