'use client';

import React from 'react';
import { tv } from 'tailwind-variants';
import { WikiContentProps } from '@/types/Wiki';
import WikiTextEditor from '../textEditor/WikiTextEditor';
import { wikiDefaultTemplate } from '../textEditor/WikiTemplate';

// WikiContent 컨테이너 스타일
const wikiContentStyle = tv({
  base: 'w-full max-w-[1120px] rounded-lg relative z-10 max-[1024px]:mt-4',
  variants: {
    editMode: {
      true: 'bg-white',
      false: 'bg-grayscale-100 py-10',
    },
  },
});

// 빈 컨텐츠 영역 스타일
const emptyContentStyle = tv({
  base: 'flex flex-col items-center justify-center',
});

// 편집 모드 컨텐츠 영역 스타일
const editContentStyle = tv({
  base: 'rounded-lg',
});

export default function WikiContent({
  hasContent,
  hasEditPermission,
  content = '',
  onStartEdit,
  className,
}: WikiContentProps) {
  // 편집 모드에서 사용할 컨텐츠 결정
  const getEditorContent = () => {
    if (hasContent && content) {
      return content;
    }
    return wikiDefaultTemplate;
  };

  if (hasEditPermission) {
    // 편집 모드 - 항상 WikiTextEditor 사용, 배경색 흰색
    return (
      <div className={wikiContentStyle({ editMode: true, className })}>
        <div className={editContentStyle()}>
          <WikiTextEditor content={getEditorContent()} />
        </div>
      </div>
    );
  }

  if (hasContent) {
    // 컨텐츠가 있는 경우 - 뷰어 모드
    return (
      <div className={wikiContentStyle({ editMode: false, className })}>
        <div>
          <div className="prose max-w-none">
            <p className="responsive-text text-md-to-sm text-grayscale-500">
              {content || '위키 컨텐츠가 여기에 표시됩니다.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 컨텐츠가 없고 편집 권한도 없는 경우 - 초기 상태
  return (
    <div className={wikiContentStyle({ editMode: false, className })}>
      <div className={emptyContentStyle()}>
        <p className="responsive-text text-lg-to-md text-grayscale-400 mb-5 text-center leading-relaxed">
          아직 작성된 내용이 없네요.
          <br />
          위키에 참여해 보세요!
        </p>

        <button
          className="bg-primary-200 hover:bg-primary-300 flex h-10 cursor-pointer items-center justify-center rounded-lg px-5 py-[11px] transition-colors"
          onClick={onStartEdit}
        >
          <span className="responsive-text text-lg-to-md text-weight-semibold text-grayscale-50">
            시작하기
          </span>
        </button>
      </div>
    </div>
  );
}
