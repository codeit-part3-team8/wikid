import SnackBar from '@/components/SnackBar/SnackBar';
import QuizModal from '@/components/Modal/QuizModal';
import AlertModal from '@/components/Modal/AlertModal';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import { APIProfileData } from '@/types/Api';

interface WikiModalsProps {
  // Modal states
  showSnackBar: boolean;
  showErrorSnackBar: boolean;
  showLoginRequiredSnackBar: boolean;
  showQuizModal: boolean;
  showTimeoutModal: boolean;
  showSaveConfirmModal: boolean;
  showCancelConfirmModal: boolean;

  // Modal closers
  setShowSnackBar: (show: boolean) => void;
  setShowErrorSnackBar: (show: boolean) => void;
  setShowLoginRequiredSnackBar: (show: boolean) => void;
  setShowQuizModal: (show: boolean) => void;
  setShowSaveConfirmModal: (show: boolean) => void;
  setShowCancelConfirmModal: (show: boolean) => void;

  // Modal handlers
  onTimeoutModalClose: () => void;
  onConfirmSave: () => void;
  onConfirmCancel: () => void;

  // Quiz modal props
  profileData: APIProfileData | null;
  code: string;
  onCorrectAnswer: (question: string, answer: string) => void;
}

export default function WikiModals({
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
  setShowSaveConfirmModal,
  setShowCancelConfirmModal,
  onTimeoutModalClose,
  onConfirmSave,
  onConfirmCancel,
  profileData,
  code,
  onCorrectAnswer,
}: WikiModalsProps) {
  return (
    <>
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
        onCorrectAnswer={onCorrectAnswer}
      />

      <ConfirmModal
        isOpen={showSaveConfirmModal}
        onClose={() => setShowSaveConfirmModal(false)}
        title="정말 저장하시겠습니까?"
        message="수정된 내용이 반영됩니다."
        confirmText="저장"
        cancelText="취소"
        onConfirm={onConfirmSave}
      />

      <ConfirmModal
        isOpen={showCancelConfirmModal}
        onClose={() => setShowCancelConfirmModal(false)}
        title="저장하지 않고 나가시겠습니까?"
        message="작성하신 내용은 적용되지 않습니다."
        confirmText="확인"
        cancelText="취소"
        onConfirm={onConfirmCancel}
      />

      <AlertModal
        isOpen={showTimeoutModal}
        onClose={onTimeoutModalClose}
        title="5분 이상 글을 쓰지 않아 접속이 끊어졌어요"
        message="위키 참여하기를 통해 다시 위키를 수정해 주세요."
        buttonText="확인"
        buttonVariant="primary"
      />
    </>
  );
}
