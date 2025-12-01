'use client';

import React, { useCallback, useEffect } from 'react';
import { useParams } from 'next/navigation';
import LinkCopy from '@/components/LinkCopy/LinkCopy';
import Profile from './components/Profile';
import WikiContent from './components/WikiContent';
import EditTimer from '@/components/EditTimer/EditTimer';
import { wikiDefaultTemplate } from './textEditor/WikiTemplate';
import { APIProfileData } from '@/types/Api';
import { useWikiPage } from './hooks/useWikiPage';
import { useWikiEditor } from './hooks/useWikiEditor';
import { useWikiModals } from './hooks/useWikiModals';
import WikiHeader from './components/WikiHeader';
import { EditActionButtons, MobileEditHeader } from './components/EditActionButtons';
import { LoadingState, ErrorState, NotFoundState } from './components/LoadingStates';
import WikiModals from './components/WikiModals';
import { getValidImageUrl } from './types';

export default function WikiPage() {
  const params = useParams();
  const code = params.code as string;

  // 커스텀 훅으로 메인 상태 관리
  const {
    profileData,
    isLoading,
    error,
    isBeingEdited,
    hasEditPermission,
    isLoggedIn,
    isMyWiki,
    fetchWikiData,
    checkEditingStatus,
    setProfileData,
    setHasEditPermission,
  } = useWikiPage(code);

  // 모달 관리 커스텀 훅
  const {
    showSnackBar,
    showErrorSnackBar,
    showLoginRequiredSnackBar,
    showQuizModal,
    showTimeoutModal,
    showSaveConfirmModal,
    showCancelConfirmModal,
    setShowSnackBar,
    setShowErrorSnackBar,
    setShowLoginRequiredSnackBar,
    setShowQuizModal,
    setShowTimeoutModal,
    setShowSaveConfirmModal,
    setShowCancelConfirmModal,
    handleCopySuccess,
    handleDisabledButtonClick,
    handleLoginRequired,
    handleTimeout: handleModalTimeout,
    handleSaveRequest,
    handleCancelRequest,
  } = useWikiModals();

  // 편집 관련 커스텀 훅
  const {
    securityData,
    editedProfileData,
    editedContent,
    changedAvatar,
    isSaving,
    formattedTime,
    isActive,
    setSecurityData,
    setEditedProfileData,
    setEditedContent,
    setChangedAvatar,
    startTimer,
    stopTimer,
    hasOnlyEmptyTags,
    performSave,
    performCancel,
  } = useWikiEditor(handleModalTimeout);

  // 편집 중일 때 에러 스낵바 표시 로직
  useEffect(() => {
    if (isBeingEdited && !showErrorSnackBar) {
      setShowErrorSnackBar(true);
    }
  }, [isBeingEdited, showErrorSnackBar, setShowErrorSnackBar]);

  // 초기 로그인 상태 확인
  useEffect(() => {
    if (!isLoggedIn && !showLoginRequiredSnackBar) {
      setShowLoginRequiredSnackBar(true);
    }
  }, [isLoggedIn, showLoginRequiredSnackBar, setShowLoginRequiredSnackBar]);

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
  }, [
    stopTimer,
    fetchWikiData,
    checkEditingStatus,
    setHasEditPermission,
    setEditedProfileData,
    setEditedContent,
    setChangedAvatar,
    setShowTimeoutModal,
  ]);

  const handleProfileChange = useCallback(
    (newData: APIProfileData) => {
      setEditedProfileData(newData);
    },
    [setEditedProfileData]
  );

  const handleAvatarChange = useCallback(
    (imageUrl?: string, file?: File) => {
      if (imageUrl) {
        // File 객체가 있으면 우선적으로 사용
        setChangedAvatar(file || imageUrl);
        // 미리보기를 위해 profileData도 업데이트 (Data URL 사용)
        if (profileData) {
          setProfileData({
            ...profileData,
            image: imageUrl,
          });
        }
      }
    },
    [profileData, setProfileData, setChangedAvatar]
  );

  const handleContentChange = (content: string) => {
    setEditedContent(content);
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
  }, [checkEditingStatus, isLoggedIn, setShowQuizModal]);

  // 저장 확인 후 저장
  const handleConfirmSave = useCallback(async () => {
    setShowSaveConfirmModal(false);
    await performSave(profileData, code, setProfileData, setHasEditPermission);
  }, [
    performSave,
    profileData,
    code,
    setProfileData,
    setHasEditPermission,
    setShowSaveConfirmModal,
  ]);

  // 취소 확인 후 취소
  const handleConfirmCancel = useCallback(async () => {
    setShowCancelConfirmModal(false);
    await performCancel(fetchWikiData, setHasEditPermission);
  }, [performCancel, fetchWikiData, setHasEditPermission, setShowCancelConfirmModal]);

  // 퀴즈 모달 정답 처리
  const handleQuizCorrectAnswer = useCallback(
    (question: string, answer: string) => {
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
    },
    [
      profileData,
      hasOnlyEmptyTags,
      setSecurityData,
      setShowQuizModal,
      setHasEditPermission,
      setEditedContent,
      startTimer,
    ]
  );

  if (isLoading) {
    return <LoadingState message="위키 데이터를 로드하고 있습니다..." />;
  }

  if (error) {
    return (
      <ErrorState
        message={`에러가 발생했습니다: ${error}`}
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!profileData) {
    return <NotFoundState onRetry={() => window.location.reload()} />;
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
            <WikiHeader
              profileName={profileData.name || ''}
              hasContent={!!(profileData.content && profileData.content.trim())}
              hasEditPermission={hasEditPermission}
              isBeingEdited={isBeingEdited}
              isLoggedIn={isLoggedIn}
              onParticipate={handleWikiParticipate}
              onDisabledClick={handleDisabledButtonClick}
            />

            {!hasEditPermission && (
              <div className="mb-4 w-full max-w-3xl max-[640px]:mb-[13px]">
                <div className="bg-primary-100 inline-block rounded-[10px] px-2.5 py-1.25">
                  <LinkCopy code={code} onCopySuccess={handleCopySuccess} />
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
              <div className="mt-[30px] justify-end max-[1024px]:hidden">
                <EditActionButtons
                  isSaving={isSaving}
                  onSave={handleSaveRequest}
                  onCancel={handleCancelRequest}
                />
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
        <MobileEditHeader
          profileName={profileData.name || ''}
          isSaving={isSaving}
          onSave={handleSaveRequest}
          onCancel={handleCancelRequest}
        />
      )}

      <WikiModals
        showSnackBar={showSnackBar}
        showErrorSnackBar={showErrorSnackBar}
        showLoginRequiredSnackBar={showLoginRequiredSnackBar}
        showQuizModal={showQuizModal}
        showTimeoutModal={showTimeoutModal}
        showSaveConfirmModal={showSaveConfirmModal}
        showCancelConfirmModal={showCancelConfirmModal}
        setShowSnackBar={setShowSnackBar}
        setShowErrorSnackBar={setShowErrorSnackBar}
        setShowLoginRequiredSnackBar={setShowLoginRequiredSnackBar}
        setShowQuizModal={setShowQuizModal}
        setShowSaveConfirmModal={setShowSaveConfirmModal}
        setShowCancelConfirmModal={setShowCancelConfirmModal}
        onTimeoutModalClose={handleTimeoutModalClose}
        onConfirmSave={handleConfirmSave}
        onConfirmCancel={handleConfirmCancel}
        profileData={profileData}
        code={code}
        onCorrectAnswer={handleQuizCorrectAnswer}
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
