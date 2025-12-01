import { useState, useCallback, useRef } from 'react';

interface UseWikiModalsReturn {
  // Modal states
  showSnackBar: boolean;
  showErrorSnackBar: boolean;
  showLoginRequiredSnackBar: boolean;
  showQuizModal: boolean;
  showTimeoutModal: boolean;
  showSaveConfirmModal: boolean;
  showCancelConfirmModal: boolean;

  // Modal actions
  setShowSnackBar: (show: boolean) => void;
  setShowErrorSnackBar: (show: boolean) => void;
  setShowLoginRequiredSnackBar: (show: boolean) => void;
  setShowQuizModal: (show: boolean) => void;
  setShowTimeoutModal: (show: boolean) => void;
  setShowSaveConfirmModal: (show: boolean) => void;
  setShowCancelConfirmModal: (show: boolean) => void;

  // Convenience methods
  handleCopySuccess: () => void;
  handleDisabledButtonClick: () => void;
  handleLoginRequired: () => void;
  handleTimeout: () => void;
  handleSaveRequest: () => void;
  handleCancelRequest: () => void;
  closeAllModals: () => void;
}

export const useWikiModals = (): UseWikiModalsReturn => {
  // Modal states
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [showErrorSnackBar, setShowErrorSnackBar] = useState(false);
  const [showLoginRequiredSnackBar, setShowLoginRequiredSnackBar] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  const [showSaveConfirmModal, setShowSaveConfirmModal] = useState(false);
  const [showCancelConfirmModal, setShowCancelConfirmModal] = useState(false);

  // 로그인 필요 스낵바 중복 표시 방지
  const loginRequiredShownRef = useRef(false);
  // 편집 중 스낵바 중복 표시 방지
  const editingErrorShownRef = useRef(false);

  // 래핑된 setShowLoginRequiredSnackBar (ref 초기화 포함)
  const handleSetShowLoginRequiredSnackBar = useCallback((show: boolean) => {
    if (!show) {
      loginRequiredShownRef.current = false;
    }
    setShowLoginRequiredSnackBar(show);
  }, []);

  // 래핑된 setShowErrorSnackBar (ref 초기화 포함)
  const handleSetShowErrorSnackBar = useCallback((show: boolean) => {
    if (!show) {
      editingErrorShownRef.current = false;
    }
    setShowErrorSnackBar(show);
  }, []);

  // Convenience methods
  const handleCopySuccess = useCallback(() => {
    setShowSnackBar(true);
  }, []);

  const handleDisabledButtonClick = useCallback(() => {
    // 이미 표시되었으면 다시 표시하지 않음
    if (editingErrorShownRef.current) {
      return;
    }

    editingErrorShownRef.current = true;
    setShowErrorSnackBar(true);
  }, []);

  const handleLoginRequired = useCallback(() => {
    // 이미 표시되었으면 다시 표시하지 않음
    if (loginRequiredShownRef.current) {
      return;
    }

    loginRequiredShownRef.current = true;
    setShowLoginRequiredSnackBar(true);
  }, []);

  const handleTimeout = useCallback(() => {
    setShowTimeoutModal(true);
  }, []);

  const handleSaveRequest = useCallback(() => {
    setShowSaveConfirmModal(true);
  }, []);

  const handleCancelRequest = useCallback(() => {
    setShowCancelConfirmModal(true);
  }, []);

  const closeAllModals = useCallback(() => {
    setShowSnackBar(false);
    setShowErrorSnackBar(false);
    setShowLoginRequiredSnackBar(false);
    setShowQuizModal(false);
    setShowTimeoutModal(false);
    setShowSaveConfirmModal(false);
    setShowCancelConfirmModal(false);

    // 스낵바 표시 상태 초기화
    loginRequiredShownRef.current = false;
    editingErrorShownRef.current = false;
  }, []);
  return {
    // Modal states
    showSnackBar,
    showErrorSnackBar,
    showLoginRequiredSnackBar,
    showQuizModal,
    showTimeoutModal,
    showSaveConfirmModal,
    showCancelConfirmModal,

    // Modal actions
    setShowSnackBar,
    setShowErrorSnackBar: handleSetShowErrorSnackBar,
    setShowLoginRequiredSnackBar: handleSetShowLoginRequiredSnackBar,
    setShowQuizModal,
    setShowTimeoutModal,
    setShowSaveConfirmModal,
    setShowCancelConfirmModal,

    // Convenience methods
    handleCopySuccess,
    handleDisabledButtonClick,
    handleLoginRequired,
    handleTimeout,
    handleSaveRequest,
    handleCancelRequest,
    closeAllModals,
  };
};
