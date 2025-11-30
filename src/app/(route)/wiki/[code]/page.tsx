'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'next/navigation';
import LinkCopy from '@/components/LinkCopy/LinkCopy';
import Profile from './components/Profile';
import WikiContent from './components/WikiContent';
import SnackBar from '@/components/SnackBar/SnackBar';
import QuizModal from '@/components/Modal/QuizModal';
import AlertModal from '@/components/Modal/AlertModal';
import { wikiDefaultTemplate } from './textEditor/WikiTemplate';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import Button from '@/components/Button/Button';
import EditTimer from '@/components/EditTimer/EditTimer';
import { useIdleTimer } from '@/hooks/useIdleTimer';
import { ProfileData } from '@/types/Wiki';

interface ApiProfileData {
  id: number;
  code: string;
  image: string | null;
  city: string;
  mbti: string;
  job: string;
  sns: string;
  birthday: string;
  nickname: string;
  bloodType: string;
  family: string;
  nationality: string;
  content: string;
  teamId: string;
  securityQuestion: string;
  updatedAt: string;
  name: string;
}

export default function WikiPage() {
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [showErrorSnackBar, setShowErrorSnackBar] = useState(false);
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  const [showSaveConfirmModal, setShowSaveConfirmModal] = useState(false);
  const [showCancelConfirmModal, setShowCancelConfirmModal] = useState(false);
  const [hasEditPermission, setHasEditPermission] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const code = params.code as string;

  // 현재 사용자 정보 (환경변수에서 로드)
  const currentUserCode = process.env.NEXT_PUBLIC_WIKID_CURRENT_USER_CODE || '';
  const currentUserID = parseInt(process.env.NEXT_PUBLIC_WIKID_CURRENT_USER_ID || '0');

  const [profileData, setProfileData] = useState<ApiProfileData | null>(null);
  // 보안 질문과 답변을 저장 (프로필 수정 시 사용)
  const [securityData, setSecurityData] = useState<{ question: string; answer: string } | null>(
    null
  );
  // 편집된 프로필 데이터를 임시 저장
  const [editedProfileData, setEditedProfileData] = useState<ProfileData | null>(null);
  // 편집된 컨텐츠를 임시 저장
  const [editedContent, setEditedContent] = useState<string>('');

  // 유효한 이미지 URL인지 확인하는 함수
  const getValidImageUrl = (imageUrl: string | null): string => {
    if (!imageUrl) return '';
    if (imageUrl.includes('example.com') || imageUrl === 'https://example.com/...') return '';
    try {
      new URL(imageUrl);
      return imageUrl;
    } catch {
      return '';
    }
  };

  // 내 위키인지 판단 - 위키 코드와 내 코드가 일치하는지 확인
  const isMyWiki = code === currentUserCode;

  const checkEditingStatus = useCallback(async () => {
    try {
      const response = await fetch(`/api/profiles/${code}/ping`);

      if (response.status === 200) {
        const data = await response.json();
        if (data.userId && data.userId !== currentUserID) {
          setIsBeingEdited(true);
          setShowErrorSnackBar(true);
        } else {
          setIsBeingEdited(false);
        }
      } else if (response.status === 204) {
        setIsBeingEdited(false);
      } else {
        setIsBeingEdited(false);
      }
    } catch (error) {
      console.error('편집 상태 확인 오류:', error);
      setIsBeingEdited(false);
    }
  }, [code, currentUserID]);
  useEffect(() => {
    if (code) {
      checkEditingStatus();
    }
  }, [code, checkEditingStatus, isMyWiki]);

  // API를 통해 위키 데이터 로드하는 함수
  const fetchWikiData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/profiles/${code}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch wiki data');
      }

      const apiProfileData = result.data;
      setProfileData(apiProfileData);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다');
    } finally {
      setIsLoading(false);
    }
  }, [code]);

  // 초기 데이터 로드
  useEffect(() => {
    if (code) {
      fetchWikiData();
    }
  }, [code, fetchWikiData]);

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
    setEditedProfileData(newData);
  }, []);

  const handleAvatarChange = useCallback((imageUrl?: string) => {
    if (imageUrl) {
      setProfileData((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          image: imageUrl,
        };
      });
    } else {
    }
  }, []);

  const handleContentChange = useCallback((content: string) => {
    setEditedContent(content);
  }, []);

  // 비활성화된 버튼 클릭 핸들러
  const handleDisabledButtonClick = useCallback(() => {
    setShowErrorSnackBar(true);
  }, []);

  // 위키 참여하기 버튼 클릭 핸들러 (편집 상태 확인 후 퀴즈 모달 열기)
  const handleWikiParticipate = useCallback(async () => {
    // 먼저 편집 상태 확인
    await checkEditingStatus();

    // 편집 중이 아닌 경우에만 퀴즈 모달 열기
    if (!isBeingEdited) {
      setShowQuizModal(true);
    }
  }, [checkEditingStatus, isBeingEdited]);

  // HTML 태그만 있고 실제 텍스트가 없는지 확인하는 함수
  const hasOnlyEmptyTags = useCallback((content: string): boolean => {
    if (!content || content.trim() === '') return true;

    // HTML 태그를 모두 제거하고 남은 텍스트를 확인
    const textContent = content
      .replace(/<[^>]*>/g, '') // HTML 태그 제거
      .replace(/&nbsp;/g, ' ') // &nbsp; 엔티티를 공백으로 변환
      .replace(/\s+/g, ' ') // 여러 공백을 하나로 변환
      .trim();

    return textContent === '';
  }, []);

  // 실제 저장 로직
  const performSave = useCallback(async () => {
    if (!profileData || !securityData) {
      return;
    }

    try {
      // 저장할 데이터 준비
      let contentToSave = editedContent.trim() ? editedContent : profileData.content || '';

      // 태그만 있고 실제 텍스트가 없다면 빈 문자열로 처리
      if (hasOnlyEmptyTags(contentToSave)) {
        contentToSave = '';
      }

      // 컨텐츠 크기 체크 (100KB 제한)
      if (contentToSave.length > 95000) {
        // 95,000자 제한 (약 100KB)
        alert(
          `컨텐츠가 너무 큽니다. 현재: ${contentToSave.length}자\n최대 95,000자까지 가능합니다. 이미지 크기나 개수를 줄여주세요.`
        );
        return;
      }

      const saveData = {
        securityAnswer: securityData.answer,
        securityQuestion: securityData.question,
        nationality: editedProfileData?.국적 || profileData.nationality || '',
        family: profileData.family || '',
        bloodType: editedProfileData?.혈액형 || profileData.bloodType || '',
        nickname: editedProfileData?.별명 || profileData.nickname || '',
        birthday: editedProfileData?.생일 || profileData.birthday || '',
        sns: editedProfileData?.SNS계정 || profileData.sns || '',
        job: editedProfileData?.직업 || profileData.job || '',
        mbti: editedProfileData?.MBTI || profileData.mbti || '',
        city: editedProfileData?.거주도시 || profileData.city || '',
        image: profileData.image || '',
        content: contentToSave,
      };

      const hasImages = saveData.content.includes('data:image');

      // 컨텐츠가 너무 크고 이미지가 포함된 경우 경고 (90,000자 제한)
      if (saveData.content.length > 90000 && hasImages) {
        const shouldTryWithoutImages = confirm(
          `컨텐츠가 너무 클 수 있습니다. (${saveData.content.length}자)\n` +
            '이미지를 제거하고 텍스트만 저장해보시겠습니까?'
        );
        if (shouldTryWithoutImages) {
          const contentWithoutImages = saveData.content.replace(/<img[^>]*>/g, '[이미지 제거됨]');
          saveData.content = contentWithoutImages;
        }
      }

      // FormData로 전송 (큰 이미지 데이터 처리에 더 적합)
      const formData = new FormData();

      // 모든 필드를 FormData에 추가
      Object.entries(saveData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, String(value));
        }
      });

      const response = await fetch(`/api/profiles/${code}`, {
        method: 'PATCH',
        body: formData, // FormData는 Content-Type 헤더를 자동으로 설정함
      });

      const result = await response.json();

      if (!response.ok) {
        // 더 구체적인 에러 메시지 제공
        let errorMessage = `프로필 저장에 실패했습니다. (상태: ${response.status})`;
        if (result.message) {
          errorMessage += `\n서버 메시지: ${result.message}`;
        }
        if (result.error) {
          errorMessage += `\n에러: ${result.error}`;
        }

        throw new Error(errorMessage);
      }

      setProfileData(result.data);
      setEditedProfileData(null);
      setHasEditPermission(false);
      stopTimer();
    } catch (error) {
      alert(error instanceof Error ? error.message : '프로필 저장 중 오류가 발생했습니다.');
    }
  }, [
    profileData,
    securityData,
    editedProfileData,
    editedContent,
    code,
    stopTimer,
    hasOnlyEmptyTags,
  ]);

  // 저장 버튼 클릭 - 확인 모달 표시
  const handleSave = useCallback(() => {
    setShowSaveConfirmModal(true);
  }, []);

  // 저장 확인 후 실제 저장
  const handleConfirmSave = useCallback(async () => {
    setShowSaveConfirmModal(false);
    await performSave();
  }, [performSave]);

  // 실제 취소 로직
  const performCancel = useCallback(async () => {
    setHasEditPermission(false);
    setEditedProfileData(null);
    setEditedContent('');
    stopTimer();
    await fetchWikiData();
  }, [stopTimer, fetchWikiData]);

  // 취소 버튼 클릭 - 확인 모달 표시
  const handleCancel = useCallback(() => {
    setShowCancelConfirmModal(true);
  }, []);

  // 취소 확인 후 실제 취소
  const handleConfirmCancel = useCallback(async () => {
    setShowCancelConfirmModal(false);
    await performCancel();
  }, [performCancel]);

  if (isLoading || !profileData) {
    return (
      <div className="bg-grayscale-50 flex min-h-screen items-center justify-center overflow-x-hidden">
        <div className="text-center">
          <div className="border-primary-200 mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2"></div>
          <p className="text-grayscale-400">위키 데이터를 로드하고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-grayscale-50 flex min-h-screen items-center justify-center overflow-x-hidden">
        <div className="text-center">
          <p className="mb-4 text-red-500">에러가 발생했습니다: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary-200 hover:bg-primary-300 rounded px-4 py-2 text-white"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-grayscale-50 min-h-screen overflow-x-hidden">
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
              <div className="mb-8 flex w-full items-center justify-between max-[640px]:mb-6">
                <h1 className="responsive-text text-5xl-to-3xl text-weight-semibold text-grayscale-500 text-left">
                  {profileData.name || ''}
                </h1>
                {profileData.content && profileData.content.trim() && (
                  <Button
                    onClick={isBeingEdited ? handleDisabledButtonClick : handleWikiParticipate}
                    disabled={isBeingEdited}
                    loading={isBeingEdited}
                    variant="primary"
                    size="md"
                    className="flex items-center justify-center whitespace-nowrap"
                    style={{
                      width: '160px',
                      height: '45px',
                    }}
                  >
                    {isBeingEdited ? '편집 중' : '위키 참여하기'}
                  </Button>
                )}
              </div>
            )}

            {!hasEditPermission && (
              <div className="mb-4 w-full max-w-3xl max-[640px]:mb-[13px]">
                <div className="bg-primary-100 inline-block rounded-[10px] px-2.5 py-1.25">
                  <LinkCopy code={code} onCopySuccess={() => setShowSnackBar(true)} />
                </div>
              </div>
            )}

            <WikiContent
              hasContent={!!(profileData.content && profileData.content.trim())}
              hasEditPermission={hasEditPermission}
              content={profileData.content || ''}
              onStartEdit={() => setShowQuizModal(true)}
              onContentChange={handleContentChange}
              className="block max-[1024px]:hidden"
              name={profileData.name || ''}
            />
          </div>

          <div className="shrink-0 max-[1024px]:w-full">
            <Profile
              imgUrl={getValidImageUrl(profileData.image)}
              name={profileData.name || ''}
              data={{
                거주도시: profileData.city || '',
                MBTI: profileData.mbti || '',
                직업: profileData.job || '',
                SNS계정: profileData.sns || '',
                생일: profileData.birthday || '',
                별명: profileData.nickname || '',
                혈액형: profileData.bloodType || '',
                국적: profileData.nationality || '',
              }}
              isEditMode={hasEditPermission}
              canEditProfile={isMyWiki} // 내 위키일 때만 프로필 수정 가능
              onProfileChange={handleProfileChange}
              onAvatarChange={handleAvatarChange}
            />

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

        <div className="mt-[60px] hidden max-[1024px]:block max-[640px]:mt-10">
          <WikiContent
            hasContent={!!(profileData.content && profileData.content.trim())}
            hasEditPermission={hasEditPermission}
            content={profileData.content || ''}
            onStartEdit={() => setShowQuizModal(true)}
            onContentChange={handleContentChange}
            name={profileData.name || ''}
            className="block"
          />
        </div>
      </div>

      {hasEditPermission && (
        <div
          className="bg-grayscale-100 absolute top-22 z-40 hidden rounded-md px-6 py-2.5 max-[1024px]:flex max-[1024px]:items-center max-[1024px]:justify-between max-[640px]:px-5"
          style={{
            left: 'clamp(20px, 6vw, 24px)',
            right: 'clamp(20px, 6vw, 24px)',
          }}
        >
          <h1 className="text-xl-semibold text-grayscale-500">{profileData.name || ''}</h1>
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

      <SnackBar
        isOpen={showSnackBar}
        message="내 위키 링크가 복사되었습니다."
        type="success"
        onClose={() => setShowSnackBar(false)}
      />

      <SnackBar
        isOpen={showErrorSnackBar}
        message="다른 친구가 편집하고 있어요. 나중에 다시 시도해 주세요."
        type="error"
        onClose={() => setShowErrorSnackBar(false)}
      />
      <QuizModal
        isOpen={showQuizModal}
        onClose={() => setShowQuizModal(false)}
        title={profileData?.securityQuestion || '위키 참여하기'}
        code={code}
        placeholder="정답을 입력해 주세요"
        onCorrectAnswer={(question, answer) => {
          setSecurityData({ question, answer });
          setShowQuizModal(false);
          setHasEditPermission(true);

          const currentContent = profileData?.content || '';
          const hasActualContent = currentContent.trim() && !hasOnlyEmptyTags(currentContent);

          if (!hasActualContent) {
            setEditedContent(wikiDefaultTemplate);
          } else {
            setEditedContent(currentContent);
          }

          startTimer();
        }}
      />

      <ConfirmModal
        isOpen={showSaveConfirmModal}
        onClose={() => setShowSaveConfirmModal(false)}
        title="정말 저장하시겠습니까?"
        message="수정된 내용이 반영됩니다."
        confirmText="저장"
        cancelText="취소"
        onConfirm={handleConfirmSave}
      />

      <ConfirmModal
        isOpen={showCancelConfirmModal}
        onClose={() => setShowCancelConfirmModal(false)}
        title="저장하지 않고 나가시겠습니까?"
        message="작성하신 내용은 적용되지 않습니다."
        confirmText="확인"
        cancelText="취소"
        onConfirm={handleConfirmCancel}
      />

      <AlertModal
        isOpen={showTimeoutModal}
        onClose={handleTimeoutModalClose}
        title="5분 이상 글을 쓰지 않아 접속이 끊어졌어요"
        message="위키 참여하기를 통해 다시 위키를 수정해 주세요."
        buttonText="확인"
        buttonVariant="primary"
      />

      <EditTimer
        formattedTime={formattedTime}
        isVisible={hasEditPermission && isActive}
        position="desktop"
      />

      <EditTimer
        formattedTime={formattedTime}
        isVisible={hasEditPermission && isActive}
        position="mobile"
      />
    </div>
  );
}
