'use client';

import React, { useState, useEffect, useCallback } from 'react';
import LinkCopy from '@/components/LinkCopy/LinkCopy';
import Profile from './components/Profile';
import WikiContent from './components/WikiContent';
import Header from '@/components/Header/Header';
import SnackBar from '@/components/SnackBar/SnackBar';
import QuizModal from '@/components/Modal/QuizModal';
import AlertModal from '@/components/Modal/AlertModal';
import Button from '@/components/Button/Button';
import EditTimer from '@/components/EditTimer/EditTimer';
import { useIdleTimer } from '@/hooks/useIdleTimer';
import { ProfileData, WikiPageProps } from '@/types/Wiki';

export default function WikiPage({ params }: WikiPageProps) {
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  const [hasEditPermission, setHasEditPermission] = useState(false);
  const [code, setCode] = useState<string>('');
  const [myCode] = useState<string>('my-code-123'); // TODO: 실제로는 사용자 코드를 가져와야 함

  const [wikiData, setWikiData] = useState({
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
  });

  // 내 위키인지 판단 - 위키 코드와 내 코드가 일치하는지 확인
  const isMyWiki = code === myCode;

  useEffect(() => {
    params
      .then(({ code }) => setCode(code))
      .catch((err) => {
        console.error('Failed to get params:', err);
      });
  }, [params]);

  // 5분 타임아웃 핸들러
  const handleTimeout = useCallback(() => {
    setShowTimeoutModal(true);
  }, []);

  // 아이들 타이머 훅 (5분 = 300,000ms)
  const { startTimer, stopTimer, formattedTime, isActive } = useIdleTimer(
    5 * 60 * 1000,
    handleTimeout
  );

  // 타임아웃 모달 닫기 핸들러
  const handleTimeoutModalClose = useCallback(() => {
    setShowTimeoutModal(false);
    setHasEditPermission(false);
    stopTimer();
  }, [stopTimer]);

  const handleProfileChange = useCallback((newData: ProfileData) => {
    console.log('프로필 데이터 변경:', newData);
  }, []);

  const handleAvatarChange = useCallback(
    (imageUrl?: string) => {
      if (imageUrl) {
        setWikiData((prev) => ({
          ...prev,
          profile: {
            ...prev.profile,
            imgUrl: imageUrl,
          },
        }));
        console.log('아바타 이미지 변경:', imageUrl);
      } else {
        console.log('아바타 변경 요청');
      }
    },
    [setWikiData]
  );

  const handleSave = useCallback(() => {
    console.log('위키 저장');
    setHasEditPermission(false);
    stopTimer();
  }, [stopTimer]);

  const handleCancel = useCallback(() => {
    console.log('위키 편집 취소');
    setHasEditPermission(false);
    stopTimer();
  }, [stopTimer]);

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
              canEditProfile={isMyWiki} // 내 위키일 때만 프로필 수정 가능
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

      {/* 태블릿/모바일용 이름 표시 및 버튼 */}
      {hasEditPermission && (
        <div
          className="bg-grayscale-100 absolute top-22 z-40 hidden rounded-md px-6 py-2.5 max-[1024px]:flex max-[1024px]:items-center max-[1024px]:justify-between max-[640px]:px-5"
          style={{
            left: 'clamp(20px, 6vw, 24px)',
            right: 'clamp(20px, 6vw, 24px)',
          }}
        >
          <h1 className="text-xl-semibold text-grayscale-500">{wikiData.name}</h1>
          <div className="flex gap-2.5">
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
          startTimer(); // 타이머 시작

          if (isMyWiki) {
            console.log('내 위키 - 모든 영역 수정 가능');
          } else {
            console.log('다른 사람의 위키 - 콘텐츠만 수정 가능');
          }
        }}
      />

      {/* 타임아웃 모달 */}
      <AlertModal
        isOpen={showTimeoutModal}
        onClose={handleTimeoutModalClose}
        title="5분 이상 글을 쓰지 않아 접속이 끊어졌어요"
        message="위키 참여하기를 통해 다시 위키를 수정해 주세요."
        buttonText="확인"
        buttonVariant="primary"
      />

      {/* 편집 타이머 - 데스크톱 */}
      <EditTimer
        formattedTime={formattedTime}
        isVisible={hasEditPermission && isActive}
        position="desktop"
      />

      {/* 편집 타이머 - 모바일/태블릿 */}
      <EditTimer
        formattedTime={formattedTime}
        isVisible={hasEditPermission && isActive}
        position="mobile"
      />
    </div>
  );
}
