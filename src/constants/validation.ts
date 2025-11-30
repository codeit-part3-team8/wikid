export const LIMITS = {
  IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  EDIT_TIMEOUT: 5 * 60 * 1000, // 5분
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] as const,
} as const;

export const MESSAGES = {
  IMAGE_SIZE_ERROR: `이미지 크기는 ${LIMITS.IMAGE_SIZE / (1024 * 1024)}MB 이하여야 합니다.`,
  IMAGE_TYPE_ERROR: '지원하지 않는 이미지 형식입니다.',
  IMAGE_REQUIRED_ERROR: '이미지 파일이 필요합니다.',
  SERVER_CONFIG_ERROR: '서버 설정 오류입니다.',
  IMAGE_UPLOAD_ERROR: '이미지 업로드 중 오류가 발생했습니다.',
  PROFILE_UPDATE_SUCCESS: '프로필이 성공적으로 업데이트되었습니다.',
  PROFILE_FETCH_ERROR: '프로필 조회에 실패했습니다.',
  PROFILE_UPDATE_ERROR: '프로필 업데이트에 실패했습니다.',
  EDIT_STATUS_ERROR: '편집 상태 확인에 실패했습니다.',
  SERVER_ERROR: '서버 내부 오류가 발생했습니다.',
} as const;
