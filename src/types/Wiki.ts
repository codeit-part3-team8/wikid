import { APIProfileData } from './Api';

// 레거시 타입 (하위 호환성을 위해 유지)
export interface ProfileData {
  거주도시: string;
  MBTI: string;
  직업: string;
  SNS계정: string;
  생일: string;
  별명: string;
  혈액형: string;
  국적: string;
}

// Wiki 편집 상태 타입
export type WikiEditMode = 'view' | 'edit' | 'loading';

// Wiki 권한 타입
export interface WikiPermissions {
  canView: boolean;
  canEdit: boolean;
  isOwner: boolean;
}

export interface WikiData {
  name: string;
  code: string;
  hasContent: boolean;
  profile: {
    imgUrl: string;
    data: ProfileData;
  };
}

export interface ProfileProps {
  imgUrl: string;
  name: string;
  data: APIProfileData;
  className?: string;
  isEditMode?: boolean;
  canEditProfile?: boolean;
  onProfileChange?: (data: APIProfileData) => void;
  onAvatarChange?: (imageUrl?: string, file?: File) => void;
}

export interface WikiContentProps {
  hasContent: boolean;
  hasEditPermission: boolean;
  content?: string;
  onStartEdit: () => void;
  onContentChange?: (content: string) => void;
  className?: string;
  name: string;
}
