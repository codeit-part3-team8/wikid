import { useCallback, useRef, useState } from 'react';

export const useIdleTimer = (timeoutMs: number, onTimeout: () => void) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [remainingTime, setRemainingTime] = useState(timeoutMs);
  const [isActive, setIsActive] = useState(false);

  const clearTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resetTimer = useCallback(
    (forceActive = false) => {
      clearTimers();
      setRemainingTime(timeoutMs);

      if (!isActive && !forceActive) return;

      // 타임아웃 설정
      timeoutRef.current = setTimeout(() => {
        setIsActive(false);
        setRemainingTime(0);
        onTimeout();
        clearTimers(); // Ensure cleanup after callback executes
      }, timeoutMs);

      // 1초마다 남은 시간 업데이트
      const startTime = Date.now();
      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, timeoutMs - elapsed);
        setRemainingTime(remaining);

        if (remaining === 0) {
          // Only clear interval here; onTimeout clears both timers
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      }, 1000);
    },
    [timeoutMs, onTimeout, isActive, clearTimers]
  );
  const startTimer = useCallback(() => {
    setIsActive(true);

    const events = ['keydown'];

    const handleActivity = () => {
      resetTimer(true);
    };

    // 이벤트 리스너 등록
    events.forEach((event) => {
      document.addEventListener(event, handleActivity, { passive: true });
    });

    // 타이머 즉시 시작
    setTimeout(() => {
      resetTimer(true);
    }, 0);

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity);
      });
      clearTimers();
      setIsActive(false);
    };
  }, [resetTimer, clearTimers]);

  const stopTimer = useCallback(() => {
    setIsActive(false);
    clearTimers();
    setRemainingTime(timeoutMs);
  }, [clearTimers, timeoutMs]);

  // 포맷된 시간 반환 (MM:SS)
  const formattedTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  return {
    startTimer,
    stopTimer,
    resetTimer,
    remainingTime,
    formattedTime: formattedTime(remainingTime),
    isActive,
  };
};
