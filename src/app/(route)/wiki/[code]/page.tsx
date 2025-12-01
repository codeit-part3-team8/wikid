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
import { APIProfileData } from '@/types/Api';

export default function WikiPage() {
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [showErrorSnackBar, setShowErrorSnackBar] = useState(false);
  const [showLoginRequiredSnackBar, setShowLoginRequiredSnackBar] = useState(false);
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

  // 현재 사용자 정보 (클라이언트에서 직접 환경변수 로드)
  const currentUserCode = process.env.NEXT_PUBLIC_WIKID_CURRENT_USER_CODE || '';
  const currentUserID = parseInt(process.env.NEXT_PUBLIC_WIKID_CURRENT_USER_ID || '0');

  // 로그인 상태 확인 (code 값이 존재하지 않으면 비로그인 상태)
  const isLoggedIn = Boolean(currentUserCode);

  const [profileData, setProfileData] = useState<APIProfileData | null>(null);
  // 보안 질문과 답변을 저장 (프로필 수정 시 사용)
  const [securityData, setSecurityData] = useState<{ question: string; answer: string } | null>(
    null
  );
  // 편집된 프로필 데이터를 임시 저장
  const [editedProfileData, setEditedProfileData] = useState<APIProfileData | null>(null);
  const [editedContent, setEditedContent] = useState<string>('');
  const [changedAvatar, setChangedAvatar] = useState<string | File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // 유효한 이미지 URL인지 확인하는 함수
  const getValidImageUrl = (imageUrl: string | null): string => {
    if (!imageUrl) return '';

    // Data URL (base64)인 경우 그대로 반환 (미리보기용)
    if (imageUrl.startsWith('data:image/')) return imageUrl;

    // 예시 URL 필터링
    const INVALID_PATTERNS = ['example.com', 'placeholder', 'mock', 'test.com'];
    if (INVALID_PATTERNS.some((pattern) => imageUrl.includes(pattern))) return '';

    try {
      const url = new URL(imageUrl);
      // HTTPS만 허용하거나, 프로토콜 검증 추가 가능
      return url.protocol === 'https:' ? imageUrl : '';
    } catch {
      return '';
    }
  };

  // 위키 코드와 내 코드가 일치하는지 확인
  const isMyWiki = code === currentUserCode;

  const checkEditingStatus = useCallback(async (): Promise<boolean> => {
    try {
      const response = await fetch(`/api/profiles/${code}/ping`);
      const result = await response.json();

      if (response.ok && result.data) {
        const { isEditing, userId } = result.data;
        const editingByOther = !isMyWiki && isEditing && userId && userId !== currentUserID;

        setIsBeingEdited(editingByOther);
        if (editingByOther) {
          setShowErrorSnackBar(true);
        }

        return editingByOther;
      }
    } catch (error) {
      console.error('편집 상태 확인 실패:', error);
    }

    setIsBeingEdited(false);
    return false;
  }, [code, currentUserID, isMyWiki]);
  useEffect(() => {
    if (code) {
      checkEditingStatus();
    }
  }, [code, checkEditingStatus, isMyWiki]);

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

  // 초기 로그인 상태 확인
  useEffect(() => {
    if (!isLoggedIn) {
      setShowLoginRequiredSnackBar(true);
    }
  }, [isLoggedIn]);

  // 초기 로그인 상태 확인
  useEffect(() => {
    if (!isLoggedIn) {
      setShowLoginRequiredSnackBar(true);
    }
  }, [isLoggedIn]);

  // 5분 타임아웃 핸들러 - 알림 모달 표시
  const handleTimeout = useCallback(() => {
    setShowTimeoutModal(true);
  }, []);

  // 아이들 타이머 훅 (5분 = 300,000ms)
  const { startTimer, stopTimer, formattedTime, isActive } = useIdleTimer(
    5 * 60 * 1000,
    handleTimeout
  );

  // 타임아웃 모달 닫기 핸들러 - 편집 상태 정리하고 데이터 새로고침
  const handleTimeoutModalClose = useCallback(async () => {
    setShowTimeoutModal(false);
    setHasEditPermission(false);
    setEditedProfileData(null);
    setEditedContent('');
    setChangedAvatar(null);
    stopTimer();

    // 프로필 데이터와 편집 상태 새로고침
    await fetchWikiData();
    await checkEditingStatus();
  }, [stopTimer, fetchWikiData, checkEditingStatus]);

  const handleProfileChange = useCallback((newData: APIProfileData) => {
    setEditedProfileData(newData);
  }, []);

  const handleAvatarChange = useCallback((imageUrl?: string, file?: File) => {
    if (imageUrl) {
      // File 객체가 있으면 우선적으로 사용
      setChangedAvatar(file || imageUrl);
      // 미리보기를 위해 profileData도 업데이트 (Data URL 사용)
      setProfileData((prev: APIProfileData | null) => {
        if (!prev) return null;
        return {
          ...prev,
          image: imageUrl,
        };
      });
    }
  }, []);

  const handleContentChange = (content: string) => {
    setEditedContent(content);
  };

  // 비활성화된 버튼 클릭 핸들러
  const handleDisabledButtonClick = () => {
    setShowErrorSnackBar(true);
  };

  // 비로그인 상태에서 위키 참여 시도 시 스낵바 표시
  const handleLoginRequired = () => {
    setShowLoginRequiredSnackBar(true);
  };

  // 위키 참여하기 버튼 클릭 핸들러 (편집 상태 확인 후 퀴즈 모달 열기)
  const handleWikiParticipate = useCallback(async () => {
    // 로그인 상태 확인
    if (!isLoggedIn) {
      return;
    }

    const editingByOther = await checkEditingStatus();
    if (!editingByOther) {
      setShowQuizModal(true);
    }
  }, [checkEditingStatus, isLoggedIn]);

  // HTML 태그만 있고 실제 텍스트가 없는지 확인하는 함수
  const hasOnlyEmptyTags = useCallback((content: string): boolean => {
    if (!content || content.trim() === '') return true;

    // HTML 태그를 모두 제거하고 남은 텍스트를 확인
    const textContent = content
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return textContent === '';
  }, []);

  // 실제 저장 로직
  const performSave = useCallback(async () => {
    if (!profileData || !securityData) {
      return;
    }

    setIsSaving(true);
    try {
      let contentToSave = editedContent.trim() ? editedContent : profileData.content || '';

      // 태그만 있고 실제 텍스트가 없다면 빈 문자열로 처리
      if (hasOnlyEmptyTags(contentToSave)) {
        contentToSave = '';
      }

      // 컨텐츠 내의 base64 이미지를 S3 URL로 변환
      const base64ImageRegex = /<img[^>]*src="data:image\/([^;]+);base64,([^"]+)"[^>]*>/g;
      const base64Images = [...contentToSave.matchAll(base64ImageRegex)];

      if (base64Images.length > 0) {
        try {
          // 병렬 이미지 업로드 처리
          const uploadResults = await Promise.all(
            base64Images.map(async (match) => {
              const [fullMatch, imageType, base64Data] = match;

              // base64를 File 객체로 변환
              const byteCharacters = atob(base64Data);
              const byteNumbers = new Array(byteCharacters.length);
              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
              const file = new File([byteArray], `image.${imageType}`, {
                type: `image/${imageType}`,
              });

              // 이미지 업로드 API 호출
              const imageFormData = new FormData();
              imageFormData.append('image', file);

              const imageResponse = await fetch('/api/images/upload', {
                method: 'POST',
                body: imageFormData,
              });

              const imageResult = await imageResponse.json();

              if (imageResponse.ok) {
                const newUrl = imageResult.data?.url || imageResult.url;
                if (!newUrl) {
                  throw new Error('업로드된 이미지 URL을 찾을 수 없습니다.');
                }
                return {
                  success: true,
                  fullMatch,
                  newUrl,
                };
              } else {
                console.error('이미지 업로드 실패:', imageResult);
                throw new Error(`이미지 업로드 실패: ${imageResult.error}`);
              }
            })
          );

          // 모든 업로드가 성공하면 컨텐츠 내 이미지 URL 교체
          uploadResults.forEach(({ fullMatch, newUrl }) => {
            const newImgTag = fullMatch.replace(/src="data:[^"]+"/g, `src="${newUrl}"`);
            contentToSave = contentToSave.replace(fullMatch, newImgTag);
          });
        } catch (error) {
          console.error('이미지 변환 또는 업로드 오류:', error);
          alert(error instanceof Error ? error.message : '이미지 처리 중 오류가 발생했습니다.');
          return;
        }
      }

      const saveData = {
        securityAnswer: securityData.answer,
        securityQuestion: securityData.question,
        nationality: editedProfileData?.nationality || profileData.nationality || '',
        family: profileData.family || '',
        bloodType: editedProfileData?.bloodType || profileData.bloodType || '',
        nickname: editedProfileData?.nickname || profileData.nickname || '',
        birthday: editedProfileData?.birthday || profileData.birthday || '',
        sns: editedProfileData?.sns || profileData.sns || '',
        job: editedProfileData?.job || profileData.job || '',
        mbti: editedProfileData?.mbti || profileData.mbti || '',
        city: editedProfileData?.city || profileData.city || '',
        image: (profileData.image?.startsWith('data:') ? '' : profileData.image) || '',
        content: contentToSave,
      };

      // 이미지 업로드 처리
      let imageUrl = saveData.image;

      if (changedAvatar && changedAvatar instanceof File) {
        try {
          const imageFormData = new FormData();
          imageFormData.append('image', changedAvatar);

          const imageResponse = await fetch('/api/images/upload', {
            method: 'POST',
            body: imageFormData,
          });

          const imageResult = await imageResponse.json();

          if (imageResponse.ok && imageResult.data?.url) {
            imageUrl = imageResult.data.url;
          } else {
            console.error('아바타 이미지 업로드 실패:', imageResult);
            alert(`이미지 업로드 실패: ${imageResult.error || '알 수 없는 오류'}`);
            return;
          }
        } catch (error) {
          console.error('아바타 이미지 업로드 오류:', error);
          alert('이미지 업로드 중 오류가 발생했습니다.');
          return;
        }
      } else if (
        changedAvatar &&
        typeof changedAvatar === 'string' &&
        changedAvatar.startsWith('http')
      ) {
        // 이미 HTTP URL인 경우
        imageUrl = changedAvatar;
      }

      // 프로필 업데이트용 데이터
      const finalSaveData = {
        ...saveData,
        image: imageUrl,
      };

      const response = await fetch(`/api/profiles/${code}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalSaveData),
      });

      const result = await response.json();

      if (!response.ok) {
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
      setChangedAvatar(null);
      setHasEditPermission(false);
      stopTimer();
    } catch (error) {
      alert(error instanceof Error ? error.message : '프로필 저장 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  }, [
    profileData,
    securityData,
    editedProfileData,
    editedContent,
    changedAvatar,
    code,
    stopTimer,
    hasOnlyEmptyTags,
  ]);

  // 저장 버튼 클릭 - 확인 모달 표시
  const handleSave = useCallback(() => {
    setShowSaveConfirmModal(true);
  }, []);

  // 저장
  const handleConfirmSave = useCallback(async () => {
    setShowSaveConfirmModal(false);
    await performSave();
  }, [performSave]);

  // 취소
  const performCancel = useCallback(async () => {
    setHasEditPermission(false);
    setEditedProfileData(null);
    setEditedContent('');
    setChangedAvatar(null);
    stopTimer();
    await fetchWikiData();
  }, [stopTimer, fetchWikiData]);

  // 취소 버튼 클릭 - 확인 모달 표시
  const handleCancel = useCallback(() => {
    setShowCancelConfirmModal(true);
  }, []);

  // 취소 확인 후 취소
  const handleConfirmCancel = useCallback(async () => {
    setShowCancelConfirmModal(false);
    await performCancel();
  }, [performCancel]);

  if (isLoading) {
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

  if (!profileData) {
    return (
      <div className="bg-grayscale-50 flex min-h-screen items-center justify-center overflow-x-hidden">
        <div className="text-center">
          <p className="text-grayscale-500 mb-4">위키 데이터를 찾을 수 없습니다.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary-200 hover:bg-primary-300 rounded px-4 py-2 text-white"
          >
            새로고침
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
                    disabled={isBeingEdited || !isLoggedIn}
                    loading={isBeingEdited}
                    variant={!isLoggedIn ? 'secondary' : 'primary'}
                    size="md"
                    className={`flex items-center justify-center whitespace-nowrap ${!isLoggedIn ? 'bg-grayscale-300! border-grayscale-300! text-white!' : ''}`}
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
              onStartEdit={
                isBeingEdited
                  ? handleDisabledButtonClick
                  : !isLoggedIn
                    ? handleLoginRequired
                    : handleWikiParticipate
              }
              onContentChange={handleContentChange}
              className="block max-[1024px]:hidden"
              name={profileData.name || ''}
            />
          </div>

          <div className="shrink-0 max-[1024px]:w-full">
            <Profile
              imgUrl={getValidImageUrl(profileData.image)}
              name={profileData.name || ''}
              data={profileData}
              isEditMode={hasEditPermission}
              canEditProfile={isMyWiki}
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
                  disabled={isSaving}
                  className="text-lg-semibold! flex h-10! min-w-0! items-center justify-center px-5! py-[11px]!"
                >
                  {isSaving ? '저장 중...' : '저장'}
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
            onStartEdit={
              isBeingEdited
                ? handleDisabledButtonClick
                : !isLoggedIn
                  ? handleLoginRequired
                  : handleWikiParticipate
            }
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
              disabled={isSaving}
              className="text-lg-semibold! flex h-10! min-w-0! items-center justify-center px-5! py-[11px]!"
            >
              {isSaving ? '저장 중...' : '저장'}
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

      <SnackBar
        isOpen={showLoginRequiredSnackBar}
        message="위키를 편집하기 위해서는 로그인이 필요합니다."
        type="error"
        onClose={() => setShowLoginRequiredSnackBar(false)}
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
