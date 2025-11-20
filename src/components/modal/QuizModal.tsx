'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { tv } from 'tailwind-variants';
import { BaseModal } from '@/components/Modal';
import SVGIcon from '@/components/SVGIcon/SVGIcon';

// Quiz input 스타일 정의
const quizInputStyle = tv({
  base: 'w-full h-[45px] px-5 py-[14px] text-md-regular text-grayscale-500 rounded-lg border border-transparent transition-colors focus:outline-none',
  variants: {
    state: {
      default: 'bg-grayscale-100 placeholder:text-grayscale-400',
      error: 'bg-secondary-red-100 placeholder:text-grayscale-400',
    },
  },
  defaultVariants: {
    state: 'default',
  },
});

// Quiz button 스타일 정의
const quizButtonStyle = tv({
  base: 'w-full h-[40px] px-5 py-[11px] bg-primary-200 hover:bg-primary-300 text-lg-semibold rounded-lg transition-colors flex items-center justify-center text-white',
});

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCorrectAnswer: () => void;
  title: string;
  placeholder?: string;
  correctAnswer: string;
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
}

export default function QuizModal({
  isOpen,
  onClose,
  onCorrectAnswer,
  title,
  placeholder = '정답을 입력하세요',
  correctAnswer,
  showCloseButton = true,
  closeOnBackdropClick = false, // 퀴즈 모달은 기본적으로 배경 클릭으로 닫히지 않음
}: QuizModalProps) {
  const [inputValue, setInputValue] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleSubmit = () => {
    if (inputValue.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      // 정답인 경우
      onCorrectAnswer();
      handleModalClose();
    } else {
      // 오답인 경우
      setHasError(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    // 입력값이 변경되면 에러 상태 초기화
    if (hasError) {
      setHasError(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleModalClose = () => {
    setInputValue('');
    setHasError(false);
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleModalClose}
      size="sm"
      showCloseButton={showCloseButton}
      closeOnBackdropClick={closeOnBackdropClick}
    >
      <div className="flex h-full flex-col pt-4">
        {/* 자물쇠 아이콘 */}
        <div className="text-grayscale-400 flex justify-center">
          <SVGIcon icon="IC_Lock" size="sm" />
        </div>

        {/* 안내 텍스트 */}
        <p className="text-md-regular text-grayscale-400 mt-5 text-center">
          다음 퀴즈를 맞추고
          <br />
          위키를 작성해 보세요.
        </p>

        {/* 퀴즈 제목 */}
        <h3 className="text-2lg-semibold text-grayscale-500 mt-9 w-full text-left">{title}</h3>

        {/* 입력 필드 */}
        <div className="mt-2.5 w-full">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={clsx(quizInputStyle({ state: hasError ? 'error' : 'default' }))}
          />
        </div>

        {/* 에러 메시지 */}
        {hasError && (
          <p className="text-xs-regular text-secondary-red-200 mt-2.5 w-full text-left">
            정답이 아닙니다. 다시 시도해 주세요.
          </p>
        )}

        {/* 확인 버튼 */}
        <div className="w-full" style={{ marginTop: hasError ? '36px' : '40px' }}>
          <button onClick={handleSubmit} className={clsx(quizButtonStyle())}>
            확인
          </button>
        </div>

        {/* 하단 안내 텍스트 */}
        <div className="text-xs-regular text-grayscale-400 mt-5 text-center">
          <p>위키드는 지인들과 함께하는 즐거운 공간입니다.</p>
          <p>지인에게 상처를 주지 않도록 작성해 주세요.</p>
        </div>
      </div>
    </BaseModal>
  );
}
