import React from 'react';
import { tv } from 'tailwind-variants';

const timerStyle = tv({
  base: 'fixed z-50 flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-lg border border-grayscale-200',
  variants: {
    position: {
      desktop: 'bottom-6 left-6 max-[1024px]:hidden',
      mobile: 'bottom-6 left-6 hidden max-[1024px]:flex',
    },
    urgency: {
      normal: 'border-grayscale-200',
      warning: 'border-secondary-red-200 bg-secondary-red-100',
      critical: 'border-secondary-red-200 bg-secondary-red-200 text-white',
    },
  },
  defaultVariants: {
    position: 'desktop',
    urgency: 'normal',
  },
});

const timeTextStyle = tv({
  base: 'responsive-text text-md-to-sm font-medium tabular-nums',
  variants: {
    urgency: {
      normal: 'text-grayscale-500',
      warning: 'text-secondary-red-200',
      critical: 'text-white',
    },
  },
  defaultVariants: {
    urgency: 'normal',
  },
});

const iconStyle = tv({
  base: 'h-4 w-4',
  variants: {
    urgency: {
      normal: 'text-grayscale-400',
      warning: 'text-secondary-red-200',
      critical: 'text-white',
    },
  },
  defaultVariants: {
    urgency: 'normal',
  },
});

interface EditTimerProps {
  formattedTime: string;
  isVisible: boolean;
  position?: 'desktop' | 'mobile';
}

const EditTimer: React.FC<EditTimerProps> = ({
  formattedTime,
  isVisible,
  position = 'desktop',
}) => {
  if (!isVisible) return null;

  // 시간에 따른 긴급도 계산 (MM:SS 형식)
  const [minutes, seconds] = formattedTime.split(':').map(Number);
  const totalSeconds = minutes * 60 + seconds;

  let urgency: 'normal' | 'warning' | 'critical' = 'normal';
  if (totalSeconds <= 60) {
    urgency = 'critical'; // 1분 이하
  } else if (totalSeconds <= 120) {
    urgency = 'warning'; // 2분 이하
  }

  return (
    <div className={timerStyle({ position, urgency })}>
      {/* 시계 아이콘 */}
      <svg
        className={iconStyle({ urgency })}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12,6 12,12 16,14" />
      </svg>

      {/* 남은 시간 */}
      <span className={timeTextStyle({ urgency })}>{formattedTime}</span>
    </div>
  );
};

export default EditTimer;
