import { InputHTMLAttributes } from 'react';

/**
 * Input 컴포넌트 Props
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Input 라벨
   */
  label?: string;

  /**
   * 에러 메시지
   */
  error?: string;

  /**
   * 도움말 텍스트
   */
  helperText?: string;

  /**
   * 전체 너비 사용 여부
   * @default false
   */
  fullWidth?: boolean;
}
