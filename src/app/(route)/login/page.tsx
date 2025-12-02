'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import { useAuth } from '@/contexts/AuthContext';
import SnackBar from '@/components/SnackBar/SnackBar';

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
  const { login, isLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorSnackBar, setShowErrorSnackBar] = useState(false);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
  const [previousPath, setPreviousPath] = useState<string | null>(null);

  // 이전 페이지 경로 저장
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const referrer = document.referrer;
      if (referrer && !referrer.includes('/login')) {
        setPreviousPath(referrer);
      }
    }
  }, []);

  // 페이지 마운트 시 이미 로그인된 경우 랜딩 페이지로 리다이렉트
  useEffect(() => {
    if (!hasCheckedAuth && isLoggedIn) {
      router.push('/');
    }
    setHasCheckedAuth(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

      // 로그인 처리 (액세스 토큰만 저장, 리프레시 토큰은 서버가 쿠키로 설정)
      login(response.accessToken, '', response);

      // 위키 코드 유무에 따라 페이지 이동
      const userCode = response.user?.profile?.code;
      if (userCode) {
        // 코드가 있으면 이전 페이지로 이동 (없으면 뒤로가기)
        if (previousPath) {
          window.location.href = previousPath;
        } else {
          router.back();
        }
      } else {
        // 코드가 없으면 위키 생성 페이지로 이동
        router.push('/wikicreate');
      }
    } catch (error) {
      console.error('로그인 실패:', error);

      // SnackBar로 에러 표시
      setShowErrorSnackBar(true);
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

      <SnackBar
        type="error"
        message="잘못된 유저 정보 입니다"
        isOpen={showErrorSnackBar}
        onClose={() => setShowErrorSnackBar(false)}
        duration={3000}
      />
    </div>
  );
}
