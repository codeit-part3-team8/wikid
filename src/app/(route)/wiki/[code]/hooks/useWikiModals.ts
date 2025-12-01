import { useState, useCallback } from 'react';

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

  // Convenience methods
  const handleCopySuccess = useCallback(() => {
    setShowSnackBar(true);
  }, []);

  const handleDisabledButtonClick = useCallback(() => {
    setShowErrorSnackBar(true);
  }, []);

  const handleLoginRequired = useCallback(() => {
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
    setShowErrorSnackBar,
    setShowLoginRequiredSnackBar,
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
