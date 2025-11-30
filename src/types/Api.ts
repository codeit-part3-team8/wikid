// API 관련 공통 타입들
export interface BaseParams {
  code: string;
}

export interface PingResponse {
  userId?: number;
  registeredAt?: string;
  isEditing: boolean;
}

export interface PingRequest {
  securityAnswer?: string;
  securityQuestion?: string;
}

export interface ProfileUpdateRequest {
  securityAnswer: string;
  securityQuestion: string;
  nationality: string;
  family: string;
  bloodType: string;
  nickname: string;
  birthday: string;
  sns: string;
  job: string;
  mbti: string;
  city: string;
  image: string;
  content: string;
}

export interface APIProfileData {
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

export interface ImageUploadRequest {
  image: File;
}

export interface ImageUploadResponse {
  message: string;
  url: string;
}

// 클라이언트 사이드 프로필 데이터 (편집용)
export interface EditableProfileData {
  국적?: string;
  혈액형?: string;
  별명?: string;
  생일?: string;
  SNS계정?: string;
  직업?: string;
  MBTI?: string;
  거주도시?: string;
  [key: string]: string | undefined;
}

// 위키 관련 타입들
export interface WikiSecurityData {
  question: string;
  answer: string;
}

export type AvatarChange = string | File | null;
