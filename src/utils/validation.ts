/**
 * 유효성 검사 유틸리티
 */

/**
 * 이메일 형식 검증
 */
export const validateEmail = (email: string): string | null => {
  if (!email) {
    return '이메일을 입력해주세요';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return '이메일 형식으로 작성해 주세요';
  }

  return null;
};

/**
 * 비밀번호 검증
 */
export const validatePassword = (password: string): string | null => {
  if (!password) {
    return '비밀번호를 입력해주세요';
  }

  if (password.length < 8) {
    return '8자 이상 작성해 주세요';
  }

  return null;
};

/**
 * 비밀번호 확인 검증
 */
export const validatePasswordConfirm = (
  password: string,
  passwordConfirm: string
): string | null => {
  if (!passwordConfirm) {
    return '비밀번호 확인을 입력해주세요';
  }

  if (password !== passwordConfirm) {
    return '비밀번호가 일치하지 않습니다';
  }

  return null;
};

/**
 * 이름 검증 (회원가입용)
 */
export const validateName = (name: string): string | null => {
  if (!name) {
    return '이름을 입력해주세요';
  }

  if (name.length > 10) {
    return '열 자 이하로 작성해주세요';
  }

  return null;
};
