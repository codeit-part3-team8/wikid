'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import { useAuth } from '@/contexts/AuthContext';

// 로그인 API 함수
async function signIn(data: { email: string; password: string }) {
  const response = await fetch('/api/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || '로그인에 실패했습니다.');
  }

  const result = await response.json();
  return result.data;
}

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
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
      case 'email':
        if (!formData.email) error = '이메일을 입력해주세요.';
        break;
      case 'password':
        if (!formData.password) error = '비밀번호를 입력해주세요.';
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
    const emailError = !formData.email ? '이메일을 입력해주세요.' : '';
    const passwordError = !formData.password ? '비밀번호를 입력해주세요.' : '';

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await signIn({
        email: formData.email,
        password: formData.password,
      });

      // 로그인 처리 (토큰 저장 및 사용자 정보 저장)
      login(response.accessToken, response.refreshToken, response);

      // 메인 페이지로 이동
      router.push('/');
    } catch (error) {
      console.error('로그인 실패:', error);

      // 비밀번호 에러 표시
      const errorMessage = error instanceof Error ? error.message : '로그인에 실패했습니다';

      if (errorMessage.includes('비밀번호') || errorMessage.includes('password')) {
        setErrors((prev) => ({
          ...prev,
          password: '비밀번호가 일치하지 않습니다',
        }));
      } else {
        alert(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <h1 className="text-2xl-semibold text-grayscale-600 mb-8 text-center">로그인</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            {/* 로그인 버튼 */}
            <Button type="submit" variant="primary" size="lg" fullWidth loading={isLoading}>
              로그인
            </Button>

            {/* 회원가입 링크 */}
            <p className="text-md-regular text-grayscale-400 text-center">
              {' '}
              <Link
                href="/signup"
                className="text-md-medium text-primary-200 hover:text-primary-300"
              >
                회원가입
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
