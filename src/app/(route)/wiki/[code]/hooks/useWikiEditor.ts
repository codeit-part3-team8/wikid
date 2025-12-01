import { useState, useCallback } from 'react';
import { APIProfileData } from '@/types/Api';
import { useIdleTimer } from '@/hooks/useIdleTimer';
import { API } from '@/constants/api';

interface UseWikiEditorReturn {
  // Editor states
  securityData: { question: string; answer: string } | null;
  editedProfileData: APIProfileData | null;
  editedContent: string;
  changedAvatar: string | File | null;
  isSaving: boolean;

  // Timer states
  formattedTime: string;
  isActive: boolean;

  // Actions
  setSecurityData: (data: { question: string; answer: string } | null) => void;
  setEditedProfileData: (data: APIProfileData | null) => void;
  setEditedContent: (content: string) => void;
  setChangedAvatar: (avatar: string | File | null) => void;
  setIsSaving: (saving: boolean) => void;

  // Timer actions
  startTimer: () => void;
  stopTimer: () => void;

  // Content validation
  hasOnlyEmptyTags: (content: string) => boolean;

  // Save logic
  performSave: (
    profileData: APIProfileData | null,
    code: string,
    setProfileData: (data: APIProfileData) => void,
    setHasEditPermission: (permission: boolean) => void,
    fetchWikiData?: () => Promise<void>
  ) => Promise<void>;

  // Cancel logic
  performCancel: (
    fetchWikiData: () => Promise<void>,
    setHasEditPermission: (permission: boolean) => void
  ) => Promise<void>;
}

export const useWikiEditor = (onTimeout: () => void): UseWikiEditorReturn => {
  // Editor states
  const [securityData, setSecurityData] = useState<{ question: string; answer: string } | null>(
    null
  );
  const [editedProfileData, setEditedProfileData] = useState<APIProfileData | null>(null);
  const [editedContent, setEditedContent] = useState<string>('');
  const [changedAvatar, setChangedAvatar] = useState<string | File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // 아이들 타이머 훅 (5분 = 300,000ms)
  const { startTimer, stopTimer, formattedTime, isActive } = useIdleTimer(5 * 60 * 1000, onTimeout);

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
  const performSave = useCallback(
    async (
      profileData: APIProfileData | null,
      code: string,
      setProfileData: (data: APIProfileData) => void,
      setHasEditPermission: (permission: boolean) => void,
      fetchWikiData?: () => Promise<void>
    ) => {
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

                const imageResponse = await fetch(`${API.IMAGE}`, {
                  method: 'POST',
                  body: imageFormData,
                  headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_WIKID_ACCESS_TOKEN || ''}`,
                  },
                });

                if (!imageResponse.ok) {
                  throw new Error(
                    `이미지 업로드 실패: ${imageResponse.status} ${imageResponse.statusText}`
                  );
                }

                const text = await imageResponse.text();
                if (!text.trim()) {
                  throw new Error('이미지 업로드 응답이 비어있음');
                }

                let imageResult;
                try {
                  imageResult = JSON.parse(text);
                } catch {
                  throw new Error(
                    `이미지 업로드 응답이 JSON 형식이 아님: ${text.substring(0, 100)}...`
                  );
                }

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

            const imageResponse = await fetch(`${API.IMAGE}`, {
              method: 'POST',
              body: imageFormData,
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_WIKID_ACCESS_TOKEN || ''}`,
              },
            });

            if (!imageResponse.ok) {
              alert(`이미지 업로드 실패: ${imageResponse.status} ${imageResponse.statusText}`);
              return;
            }

            const text = await imageResponse.text();
            if (!text.trim()) {
              //console.error('아바타 이미지 업로드 응답이 비어있음');
              alert('이미지 업로드 응답이 비어있습니다.');
              return;
            }

            let imageResult;
            try {
              imageResult = JSON.parse(text);
              //console.log('아바타 이미지 업로드 응답 파싱됨:', imageResult);
            } catch {
              //console.error('아바타 이미지 업로드 응답이 JSON 형식이 아님:', text);
              alert('이미지 업로드 응답이 올바르지 않습니다.');
              return;
            }

            // 응답 구조에 따라 URL 추출 (data.url 또는 직접 url)
            const uploadedUrl = imageResult.data?.url || imageResult.url;

            if (imageResponse.ok && uploadedUrl) {
              imageUrl = uploadedUrl;
            } else {
              alert(`이미지 업로드 실패: ${imageResult.error || '알 수 없는 오류'}`);
              return;
            }
          } catch (error) {
            alert('이미지 업로드 중 오류가 발생했습니다.');
            return;
          }
        } else if (
          changedAvatar &&
          typeof changedAvatar === 'string' &&
          changedAvatar.startsWith('http')
        ) {
          imageUrl = changedAvatar;
        }

        // 프로필 업데이트용 데이터
        const finalSaveData = {
          ...saveData,
          image: imageUrl,
        };

        const response = await fetch(`${API.PROFILE}${code}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_WIKID_ACCESS_TOKEN || ''}`,
          },
          body: JSON.stringify(finalSaveData),
        });

        if (!response.ok) {
          throw new Error(
            `프로필 저장에 실패했습니다. (상태: ${response.status} ${response.statusText})`
          );
        }

        const text = await response.text();
        if (!text.trim()) {
          throw new Error('프로필 저장 응답이 비어있습니다.');
        }

        let result;
        try {
          result = JSON.parse(text);
        } catch {
          throw new Error(`프로필 저장 응답이 JSON 형식이 아님: ${text.substring(0, 100)}...`);
        }

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

        // 저장된 데이터로 상태 업데이트
        if (result.data) {
          setProfileData(result.data);
        }

        setEditedProfileData(null);
        setChangedAvatar(null);
        setHasEditPermission(false);
        stopTimer();

        // 최신 데이터 동기화
        if (fetchWikiData) {
          await fetchWikiData();
        }
      } catch (error) {
        alert(error instanceof Error ? error.message : '프로필 저장 중 오류가 발생했습니다.');
      } finally {
        setIsSaving(false);
      }
    },
    [securityData, editedProfileData, editedContent, changedAvatar, stopTimer, hasOnlyEmptyTags]
  );

  // 취소 로직
  const performCancel = useCallback(
    async (
      fetchWikiData: () => Promise<void>,
      setHasEditPermission: (permission: boolean) => void
    ) => {
      setHasEditPermission(false);
      setEditedProfileData(null);
      setEditedContent('');
      setChangedAvatar(null);
      stopTimer();
      await fetchWikiData();
    },
    [stopTimer]
  );

  return {
    // Editor states
    securityData,
    editedProfileData,
    editedContent,
    changedAvatar,
    isSaving,

    // Timer states
    formattedTime,
    isActive,

    // Actions
    setSecurityData,
    setEditedProfileData,
    setEditedContent,
    setChangedAvatar,
    setIsSaving,

    // Timer actions
    startTimer,
    stopTimer,

    // Utilities
    hasOnlyEmptyTags,
    performSave,
    performCancel,
  };
};
