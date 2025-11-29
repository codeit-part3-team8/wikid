'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header/Header';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import { signUp } from '@/api/auth';
import { setAccessToken, setRefreshToken } from '@/utils/auth';
import {
  validateName,
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
} from '@/utils/validation';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 입력 시 에러 제거
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleBlur = (field: keyof typeof formData) => {
    let error = '';

    switch (field) {
      case 'name':
        error = validateName(formData.name) || '';
        break;
      case 'email':
        error = validateEmail(formData.email) || '';
        break;
      case 'password':
        error = validatePassword(formData.password) || '';
        break;
      case 'passwordConfirm':
        error = validatePasswordConfirm(formData.password, formData.passwordConfirm) || '';
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 전체 유효성 검사
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const passwordConfirmError = validatePasswordConfirm(
      formData.password,
      formData.passwordConfirm
    );

    if (nameError || emailError || passwordError || passwordConfirmError) {
      setErrors({
        name: nameError || '',
        email: emailError || '',
        password: passwordError || '',
        passwordConfirm: passwordConfirmError || '',
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await signUp({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        passwordConfirmation: formData.passwordConfirm,
      });

      // 토큰 저장
      setAccessToken(response.accessToken);
      setRefreshToken(response.refreshToken);

      // 성공 알림
      alert('가입이 완료되었습니다');

      // 로그인 페이지로 이동
      router.push('/login');
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert(error instanceof Error ? error.message : '회원가입에 실패했습니다');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header isLoggedIn={false} />

      <main className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <h1 className="text-2xl-semibold text-grayscale-600 mb-8 text-center">회원가입</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 이름 */}
            <Input
              label="이름"
              name="name"
              type="text"
              placeholder="이름을 입력해 주세요"
              value={formData.name}
              onChange={handleChange}
              onBlur={() => handleBlur('name')}
              error={errors.name}
              required
              fullWidth
            />

            {/* 이메일 */}
            <Input
              label="이메일"
              name="email"
              type="email"
              placeholder="이메일을 입력해 주세요"
              value={formData.email}
              onChange={handleChange}
              onBlur={() => handleBlur('email')}
              error={errors.email}
              required
              fullWidth
            />

            {/* 비밀번호 */}
            <Input
              label="비밀번호"
              name="password"
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              value={formData.password}
              onChange={handleChange}
              onBlur={() => handleBlur('password')}
              error={errors.password}
              required
              fullWidth
            />

            {/* 비밀번호 확인 */}
            <Input
              label="비밀번호 확인"
              name="passwordConfirm"
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              value={formData.passwordConfirm}
              onChange={handleChange}
              onBlur={() => handleBlur('passwordConfirm')}
              error={errors.passwordConfirm}
              required
              fullWidth
            />

            {/* 회원가입 버튼 */}
            <Button type="submit" variant="primary" size="lg" fullWidth loading={isLoading}>
              가입하기
            </Button>

            {/* 로그인 링크 */}
            <p className="text-md-regular text-grayscale-400 text-center">
              이미 회원이신가요?{' '}
              <Link
                href="/login"
                className="text-md-medium text-primary-200 hover:text-primary-300"
              >
                로그인하기
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
