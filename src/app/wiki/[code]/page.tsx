'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import LinkCopy from '@/components/LinkCopy/LinkCopy';
import Profile from './components/Profile';
import WikiContent from './components/WikiContent';
import Header from '@/components/Header/Header';
import SnackBar from '@/components/SnackBar/SnackBar';
import QuizModal from '@/components/Modal/QuizModal';
import Button from '@/components/Button/Button';
import { ProfileData, WikiPageProps } from '@/types/Wiki';

export default function WikiPage({ params }: WikiPageProps) {
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [hasEditPermission, setHasEditPermission] = useState(true);
  const [isMyWiki] = useState(true);
  const [code, setCode] = useState<string>('');

  useEffect(() => {
    params.then(({ code }) => setCode(code));
  }, [params]);

  const handleProfileChange = useCallback((newData: ProfileData) => {
    console.log('프로필 데이터 변경:', newData);
  }, []);

  const handleAvatarChange = useCallback(() => {
    console.log('아바타 변경 요청');
  }, []);

  const handleSave = useCallback(() => {
    console.log('위키 저장');
    setHasEditPermission(false);
  }, []);

  const handleCancel = useCallback(() => {
    console.log('위키 편집 취소');
    setHasEditPermission(false);
  }, []);

  const wikiData = useMemo(
    () => ({
      name: '이지동',
      code: code,
      hasContent: false,
      profile: {
        imgUrl: '',
        data: {
          거주도시: '서울',
          MBTI: 'INFJ',
          직업: '코드잇 콘텐츠 프로듀서',
          SNS계정: 'dlwlehd_official',
          생일: '1999-12-31',
          별명: '없음',
          혈액형: 'A',
          국적: '대한민국',
        },
      },
    }),
    [code]
  );

  return (
    <div className="bg-grayscale-50 min-h-screen overflow-x-hidden">
      <Header />
      <div
        className={`mx-auto px-6 pb-8 max-[1024px]:px-6 max-[1024px]:pt-[60px] max-[640px]:px-5 max-[640px]:pt-10 min-[1024px]:px-6 ${
          hasEditPermission ? 'pt-10' : 'pt-20'
        }`}
        style={{ minWidth: '0' }}
      >
        <div
          className="mx-auto flex max-w-[1520px] gap-20 max-[1024px]:flex-col max-[1024px]:gap-[60px] min-[640px]:gap-10"
          style={{ minWidth: '0' }}
        >
          <div className="flex max-w-[1120px] min-w-0 flex-1 flex-col items-start">
            {!hasEditPermission && (
              <h1 className="responsive-text text-5xl-to-3xl text-weight-semibold text-grayscale-500 mb-8 w-full max-w-3xl text-left max-[640px]:mb-6">
                {wikiData.name}
              </h1>
            )}

            {/* LinkCopy 컴포넌트 - 편집 모드에서 숨김 */}
            {!hasEditPermission && (
              <div className="mb-4 w-full max-w-3xl max-[640px]:mb-[13px]">
                <div className="bg-primary-100 inline-block rounded-[10px] px-2.5 py-1.25">
                  <LinkCopy code={code} onCopySuccess={() => setShowSnackBar(true)} />
                </div>
              </div>
            )}

            {/* 컨텐츠 영역 - 데스크톱에서만 표시 */}
            <WikiContent
              hasContent={wikiData.hasContent}
              hasEditPermission={hasEditPermission}
              content={''} // TODO: API에서 실제 컨텐츠 로드
              onStartEdit={() => setShowQuizModal(true)}
              className="max-[1024px]:hidden"
            />
          </div>

          {/* 프로필 영역 */}
          <div className="shrink-0 max-[1024px]:w-full">
            <Profile
              imgUrl={wikiData.profile.imgUrl}
              name={wikiData.name}
              data={wikiData.profile.data}
              isEditMode={hasEditPermission}
              canEditProfile={isMyWiki}
              onProfileChange={handleProfileChange}
              onAvatarChange={handleAvatarChange}
            />

            {/* 편집 모드일 때 하단 버튼 */}
            {hasEditPermission && (
              <div className="mt-[30px] flex justify-end gap-2.5 max-[1024px]:hidden">
                <Button
                  variant="secondary"
                  onClick={handleCancel}
                  className="border-primary-200! text-primary-200! text-lg-semibold! flex! h-10! min-w-0! items-center! justify-center! border! px-5! py-[11px]!"
                >
                  취소
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSave}
                  className="text-lg-semibold! flex h-10! min-w-0! items-center justify-center px-5! py-[11px]!"
                >
                  저장
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* 모바일/태블릿용 컨텐츠 영역 */}
        <div className="mt-[60px] hidden max-[1024px]:block max-[640px]:mt-10">
          <WikiContent
            hasContent={wikiData.hasContent}
            hasEditPermission={hasEditPermission}
            content={''}
            onStartEdit={() => setShowQuizModal(true)}
          />
        </div>
      </div>

      {/* 태블릿/모바일용 편집 버튼 */}
      {hasEditPermission && (
        <div className="absolute top-22 right-6 z-50 hidden gap-2.5 max-[1024px]:flex">
          <Button
            variant="secondary"
            onClick={handleCancel}
            className="border-primary-200! text-primary-200! text-lg-semibold! flex! h-10! min-w-0! items-center! justify-center! border! px-5! py-[11px]!"
          >
            취소
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            className="text-lg-semibold! flex h-10! min-w-0! items-center justify-center px-5! py-[11px]!"
          >
            저장
          </Button>
        </div>
      )}

      {/* 스낵바 */}
      <SnackBar
        isOpen={showSnackBar}
        message="내 위키 링크가 복사되었습니다."
        type="success"
        onClose={() => setShowSnackBar(false)}
      />

      {/* 퀴즈 모달 */}
      <QuizModal
        isOpen={showQuizModal}
        onClose={() => setShowQuizModal(false)}
        title="위키 참여하기"
        correctAnswer={wikiData.name}
        placeholder="이름을 입력해 주세요"
        onCorrectAnswer={() => {
          setShowQuizModal(false);
          setHasEditPermission(true);
          console.log('퀴즈 정답! 위키 편집 권한 획득');
        }}
      />
    </div>
  );
}
