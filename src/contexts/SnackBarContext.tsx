'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import SnackBar from '@/components/SnackBar/SnackBar';

interface SnackBarItem {
  id: string;
  type: 'success' | 'error';
  message: string;
  duration?: number;
  createdAt: number;
  isClosing: boolean;
}

interface SnackBarContextType {
  showSnackBar: (snackBar: Omit<SnackBarItem, 'id' | 'createdAt' | 'isClosing'>) => void;
  showSuccess: (message: string, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
}

const SnackBarContext = createContext<SnackBarContextType | undefined>(undefined);

interface SnackBarProviderProps {
  children: ReactNode;
}

export function SnackBarProvider({ children }: SnackBarProviderProps) {
  const [snackBars, setSnackBars] = useState<SnackBarItem[]>([]);

  // 순차적 제거
  useEffect(() => {
    if (snackBars.length === 0) return;

    // 닫히지 않은 가장 오래된 스낵바 찾기
    const activeSnackBars = snackBars.filter((sb) => !sb.isClosing);
    if (activeSnackBars.length === 0) return;

    const oldestSnackBar = activeSnackBars.reduce((oldest, current) =>
      current.createdAt < oldest.createdAt ? current : oldest
    );

    const now = Date.now();
    const elapsed = now - oldestSnackBar.createdAt;
    const remainingTime = Math.max(0, (oldestSnackBar.duration || 3000) - elapsed);

    const timer = setTimeout(() => {
      setSnackBars((prev) =>
        prev.map((sb) => (sb.id === oldestSnackBar.id ? { ...sb, isClosing: true } : sb))
      );
    }, remainingTime);

    return () => clearTimeout(timer);
  }, [snackBars]);

  const addSnackBar = useCallback(
    (snackBar: Omit<SnackBarItem, 'id' | 'createdAt' | 'isClosing'>) => {
      const now = Date.now();
      const newId = `${now}-${Math.random().toString(36).substr(2, 9)}`;

      setSnackBars((prev) => {
        // 동일한 메시지가 이미 있는지 확인 (지난 1초 내)
        const isDuplicate = prev.some(
          (existing) =>
            existing.message === snackBar.message &&
            existing.type === snackBar.type &&
            !existing.isClosing &&
            now - existing.createdAt < 1000
        );

        if (isDuplicate) {
          return prev;
        }

        const newSnackBar = {
          ...snackBar,
          id: newId,
          createdAt: now,
          isClosing: false,
        };

        return [...prev, newSnackBar];
      });
    },
    []
  );

  const removeSnackBar = useCallback((id: string) => {
    setSnackBars((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const showSnackBar = useCallback(
    (snackBar: Omit<SnackBarItem, 'id' | 'createdAt' | 'isClosing'>) => {
      addSnackBar(snackBar);
    },
    [addSnackBar]
  );

  const showSuccess = useCallback(
    (message: string, duration?: number) => {
      addSnackBar({ type: 'success', message, duration });
    },
    [addSnackBar]
  );

  const showError = useCallback(
    (message: string, duration?: number) => {
      addSnackBar({ type: 'error', message, duration });
    },
    [addSnackBar]
  );

  const contextValue = useMemo(
    () => ({
      showSnackBar,
      showSuccess,
      showError,
    }),
    [showSnackBar, showSuccess, showError]
  );

  return (
    <SnackBarContext.Provider value={contextValue}>
      {children}

      {/* 전역 스낵바 렌더링 - 최신 항목이 맨 위에 표시되도록 역순 */}
      {snackBars
        .slice()
        .reverse()
        .map((snackBar, index) => (
          <SnackBar
            key={snackBar.id}
            isOpen={!snackBar.isClosing}
            type={snackBar.type}
            message={snackBar.message}
            duration={0}
            stackIndex={index}
            zIndex={1000}
            onClose={() => {
              removeSnackBar(snackBar.id);
            }}
          />
        ))}
    </SnackBarContext.Provider>
  );
}

export function useSnackBar() {
  const context = useContext(SnackBarContext);
  if (context === undefined) {
    throw new Error('useSnackBar는 반드시 SnackBarProvider 컴포넌트 내부에서 사용되어야 합니다.');
  }
  return context;
}
