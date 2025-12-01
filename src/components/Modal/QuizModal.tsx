'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import clsx from 'clsx';
import { tv } from 'tailwind-variants';
import BaseModal from './BaseModal';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import { BaseModalProps } from '@/types/Modal';

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
  base: 'w-full h-[40px] px-5 py-[11px] bg-primary-200 hover:bg-primary-300 rounded-lg transition-colors flex items-center justify-center text-white',
});

interface QuizModalProps extends BaseModalProps {
  onCorrectAnswer: (securityQuestion: string, securityAnswer: string) => void;
  title: string;
  placeholder?: string;
  code: string; // API 호출에 필요한 위키 코드
}

export default function QuizModal({
  isOpen,
  onClose,
  onCorrectAnswer,
  title,
  placeholder = '정답을 입력하세요',
  code,
  showCloseButton = true,
  closeOnBackdropClick = false, // 퀴즈 모달은 배경 클릭으로 닫히지 않음
}: QuizModalProps) {
  const [inputValue, setInputValue] = useState('');
  const [hasError, setHasError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 모달이 열리면 입력 필드로 포커스 이동
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleModalClose = useCallback(() => {
    setInputValue('');
    setHasError(false);
    onClose();
  }, [onClose]);

  const handleSubmit = useCallback(async () => {
    if (isSubmitting || !inputValue.trim()) return;

    setIsSubmitting(true);
    setHasError(false);

    try {
      const response = await fetch(`/api/profiles/${code}/ping`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          securityAnswer: inputValue.trim(),
        }),
      });

      if (response.ok) {
        // 정답인 경우 - 질문과 답변을 함께 전달
        onCorrectAnswer(title, inputValue.trim());
        handleModalClose();
      } else {
        // 오답인 경우
        setHasError(true);
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }
    } catch (error) {
      console.error('보안 질문 확인 에러:', error);
      setHasError(true);
    } finally {
      setIsSubmitting(false);
    }
  }, [inputValue, code, title, onCorrectAnswer, handleModalClose, isSubmitting]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);

      // 입력값이 변경되면 에러 상태 초기화
      if (hasError && newValue.trim().length > 0) {
        setHasError(false);
      }
    },
    [hasError]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleModalClose}
      size="quiz"
      showCloseButton={showCloseButton}
      closeOnBackdropClick={closeOnBackdropClick}
      aria-labelledby="quiz-modal-title"
      aria-describedby="quiz-modal-description"
    >
      <div className="flex h-full flex-col pt-4">
        <div className="text-grayscale-400 flex justify-center">
          <SVGIcon icon="IC_Lock" size="sm" />
        </div>
        <p
          id="quiz-modal-description"
          className="responsive-text text-md-to-md text-grayscale-400 mt-5 text-center"
        >
          다음 퀴즈를 맞추고
          <br />
          위키를 작성해 보세요.
        </p>
        <h3
          id="quiz-modal-title"
          className="responsive-text text-2lg-to-lg text-weight-semibold text-grayscale-500 mt-9 w-full text-left"
        >
          {title}
        </h3>
        {/* 입력 필드 */}
        <div className="mt-2.5 w-full">
          <input
            id="quiz-input"
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={clsx(quizInputStyle({ state: hasError ? 'error' : 'default' }))}
            aria-invalid={hasError}
            aria-describedby={hasError ? 'quiz-error' : undefined}
          />
        </div>
        {hasError && (
          <p
            className="responsive-text text-xs-to-xs text-secondary-red-200 mt-2.5 w-full text-left"
            id="quiz-error"
          >
            정답이 아닙니다. 다시 시도해 주세요.
            <br />
          </p>
        )}
        <div className={clsx('w-full', hasError ? 'mt-9' : 'mt-10')}>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || !inputValue.trim()}
            className={clsx(
              quizButtonStyle(),
              'responsive-text text-lg-to-md text-weight-semibold',
              {
                'cursor-not-allowed opacity-50': isSubmitting || !inputValue.trim(),
                'cursor-pointer': !isSubmitting && inputValue.trim(),
              }
            )}
          >
            {isSubmitting ? '확인 중...' : '확인'}
          </button>
        </div>
        <div className="responsive-text text-xs-to-xs text-grayscale-400 mt-5 text-center">
          <p>위키드는 지인들과 함께하는 즐거운 공간입니다.</p>
          <p>지인에게 상처를 주지 않도록 작성해 주세요.</p>
        </div>
      </div>
    </BaseModal>
  );
}
