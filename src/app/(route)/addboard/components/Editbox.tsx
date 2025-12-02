'use client';

import { Article as ArticleType } from '@/types/Article';
import { getFormatDate } from '@/utils/getFormatDate';
import { usePostArticle } from '../hooks/usePostArticle';
import { useUpdateArticle } from '../../boards/[boardId]/edit/hooks/useUpdateArticle';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BoardTextEditor from './BoardTextEditor';
import Button from '@/components/Button/Button';
import Divider from '@/components/Divider/Divider';
import isHtmlEmpty from '../hooks/isHtmlempty';
import TitleTextInput from './TitleTextInput';
import SnackBar from '@/components/SnackBar/SnackBar';
import { ArticlePayload } from '@/types/ArticlePayload';

interface EditBoxProps {
  article?: ArticleType;
  isEditMode?: boolean;
}

const Editbox = ({ article, isEditMode = false }: EditBoxProps) => {
  const [title, setTitle] = useState(article?.title ?? '');
  const [content, setContent] = useState(article?.content ?? '');
  const [image, setImage] = useState(article?.image ?? '');
  const [showSnackBar, setShowSnackBar] = useState(false);

  const router = useRouter();
  const { postArticle, loading: postLoading, error: postError } = usePostArticle();
  const {
    updateArticle,
    loading: updateLoading,
    error: updateError,
  } = useUpdateArticle({
    boardId: article?.id ?? 0,
    onSuccess: () => {
      router.push(`/boards/${article?.id}`);
    },
  });

  const loading = isEditMode ? updateLoading : postLoading;
  const error = isEditMode ? updateError : postError;

  const isDisabled = !(title.trim().length > 0 && !isHtmlEmpty(content)) || loading;

  const created = article?.createdAt ? getFormatDate(article.createdAt) : getFormatDate(new Date());
  const updated =
    article?.updatedAt && article.updatedAt !== article.createdAt
      ? getFormatDate(article.updatedAt)
      : created;

  /** ▶ 게시글 "등록 / 수정" 제출 버튼 */
  const handleSubmit = useCallback(async () => {
    const payload: ArticlePayload = { title, content, image };

    if (isEditMode) {
      await updateArticle(payload);
    } else {
      await postArticle(payload, () => {
        router.push('/boards');
      });
    }
  }, [title, content, image, isEditMode, updateArticle, postArticle, router]);

  // 등록/수정 실패 Snackbar
  useEffect(() => {
    if (error) {
      Promise.resolve().then(() => setShowSnackBar(true));
    }
  }, [error]);

  return (
    <>
      <div className="md:border-grayscale-200 flex h-170 w-84 flex-col rounded-lg p-0 pb-7 md:h-173 md:w-156 md:border md:px-7 md:pt-10 md:shadow-[0px_4px_20px_0px_#00000014] lg:h-212 lg:w-265 lg:pt-11">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <span className="text-grayscale-500 text-lg font-semibold md:text-xl lg:text-2xl">
              {isEditMode ? '게시물 수정하기' : '게시물 등록하기'}
            </span>
            <Button
              disabled={isDisabled}
              onClick={handleSubmit}
              loading={loading}
              className="h-11 min-w-[140px]! cursor-pointer py-0!"
            >
              {isEditMode ? '수정하기' : '등록하기'}
            </Button>
          </div>

          <div className="flex gap-5">
            <div className="text-grayscale-400 flex gap-2 text-[12px] md:text-[16px]">
              <span>등록일</span>
              <span>{created}</span>
            </div>

            {created !== updated && (
              <div className="text-grayscale-400 flex gap-2 text-[12px] md:text-[16px]">
                <span>수정일</span>
                <span>{updated}</span>
              </div>
            )}
          </div>

          <Divider />
        </div>

        <div className="mt-3 flex flex-col gap-3">
          <TitleTextInput beforeValue={title} onChange={setTitle} />
          <Divider />
        </div>

        <div className="mt-5 flex min-h-0 w-full flex-1">
          <BoardTextEditor
            beforeValue={content}
            onContentChange={setContent}
            onImageChange={setImage}
          />
        </div>
      </div>

      <SnackBar
        isOpen={showSnackBar}
        message={isEditMode ? '게시글 수정에 실패했습니다.' : '게시글 등록에 실패했습니다.'}
        type="error"
        onClose={() => setShowSnackBar(false)}
        duration={2000}
      />
    </>
  );
};

Editbox.displayName = 'Editbox';
export default Editbox;
