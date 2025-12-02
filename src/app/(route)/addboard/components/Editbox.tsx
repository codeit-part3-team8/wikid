'use client';

import { Article as ArticleType } from '@/types/Article';
import { getFormatDate } from '@/utils/getFormatDate';
import { usePostArticle } from '../hooks/usePostArticle';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BoardTextEditor from './BoardTextEditor';
import Button from '@/components/Button/Button';
import Divider from '@/components/Divider/Divider';
import isHtmlEmpty from '../hooks/isHtmlempty';
import TitleTextInput from './TitleTextInput';
import SnackBar from '@/components/SnackBar/SnackBar';

interface EditBox {
  article?: ArticleType;
}
const Editbox = ({ article }: EditBox) => {
  const [title, setTitle] = useState(article?.title || '');
  const [content, setContent] = useState(article?.content || '');
  const [image, setImage] = useState(article?.image || '');
  const [showSnackBar, setShowSnackBar] = useState(false);

  const { postArticle, loading, error } = usePostArticle();
  const router = useRouter();

  const isDisabled = !(title.trim().length > 0 && !isHtmlEmpty(content)) || loading;

  const rawCreateDate = article?.createdAt;
  const rawUpdateDate = article?.updatedAt;

  const formatCreateDate = rawCreateDate ? getFormatDate(rawCreateDate) : getFormatDate(new Date());

  const formatUpdateDate =
    rawUpdateDate && rawUpdateDate !== rawCreateDate
      ? getFormatDate(rawUpdateDate)
      : formatCreateDate;

  // 게시글 등록 버튼
  const handleSubmit = useCallback(async () => {
    await postArticle({ title, content, image }, () => {
      router.push('/boards');
    });
  }, [title, content, image, postArticle, router]);

  // error가 생기면 SnackBar 띄우고 2초 후 닫기
  useEffect(() => {
    if (error) {
      Promise.resolve().then(() => setShowSnackBar(true));
      const timer = setTimeout(() => setShowSnackBar(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      <div className="md:border-grayscale-200 flex h-170 w-84 flex-col rounded-lg p-0 pb-7 md:h-173 md:w-156 md:border md:px-7 md:pt-10 md:shadow-[0px_4px_20px_0px_#00000014] lg:h-212 lg:w-265 lg:pt-11">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <span className="text-grayscale-500 text-lg font-semibold md:text-xl lg:text-2xl">
              게시물 등록하기
            </span>
            <Button
              disabled={isDisabled}
              onClick={handleSubmit}
              loading={loading}
              className="h-11 min-w-[140px]! cursor-pointer py-0!"
            >
              등록하기
            </Button>
          </div>
          <div className="flex gap-5">
            <div className="text-grayscale-400 flex gap-2 text-[12px] md:text-[16px]">
              <span>등록일</span>
              <span>{formatCreateDate}</span>
            </div>
            {formatCreateDate !== formatUpdateDate && (
              <div className="text-grayscale-400 flex gap-2 text-[12px] md:text-[16px]">
                <span>수정일</span>
                <span>{formatUpdateDate}</span>
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
        message="게시글 등록에 실패했습니다"
        type="error"
        onClose={() => setShowSnackBar(false)}
      />
    </>
  );
};

Editbox.displayName = 'Editbox';
export default Editbox;
