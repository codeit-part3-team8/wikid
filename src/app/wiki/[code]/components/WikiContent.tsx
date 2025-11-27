'use client';

import React from 'react';
import { tv } from 'tailwind-variants';
import { WikiContentProps } from '@/types/Wiki';
import WikiTextEditor from '../textEditor/WikiTextEditorSample';

// WikiContent 컨테이너 스타일
const wikiContentStyle = tv({
  base: 'border-grayscale-200 w-full rounded-lg bg-gray-100 py-10',
});

// 빈 컨텐츠 영역 스타일
const emptyContentStyle = tv({
  base: 'flex flex-col items-center justify-center',
});

// 편집 모드 컨텐츠 영역 스타일
const editContentStyle = tv({
  base: 'px-6 py-4',
});

export default function WikiContent({
  hasContent,
  hasEditPermission,
  content = '',
  onStartEdit,
  className,
}: WikiContentProps) {
  if (hasEditPermission && !hasContent) {
    // 편집 권한이 있고 컨텐츠가 없는 경우 - 에디터 모드
    return (
      <div className={wikiContentStyle({ className })}>
        <div className={editContentStyle()}>
          <WikiTextEditor content={content} />
        </div>
      </div>
    );
  }

  if (hasContent) {
    // 컨텐츠가 있는 경우 - 뷰어 모드 또는 편집 모드
    return (
      <div className={wikiContentStyle({ className })}>
        <div className={hasEditPermission ? editContentStyle() : 'px-6 py-4'}>
          {hasEditPermission ? (
            <WikiTextEditor content={content} />
          ) : (
            <div className="prose max-w-none">
              <p className="responsive-text text-md-to-sm text-grayscale-500">
                {content || '위키 컨텐츠가 여기에 표시됩니다.'}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 컨텐츠가 없고 편집 권한도 없는 경우 - 초기 상태
  return (
    <div className={wikiContentStyle({ className })}>
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
