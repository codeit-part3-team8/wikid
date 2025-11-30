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
  data: ProfileData;
  className?: string;
  isEditMode?: boolean;
  canEditProfile?: boolean;
  onProfileChange?: (data: ProfileData) => void;
  onAvatarChange?: (imageUrl?: string) => void;
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
