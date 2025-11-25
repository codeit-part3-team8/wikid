'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header/Header';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';

export default function SignupPage() {
  const [formData, setFormData] = useState({
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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 회원가입 로직
    setTimeout(() => {
      setIsLoading(false);
      console.log('회원가입:', formData);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header isLoggedIn={false} />

      <main className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <h1 className="text-2xl-semibold text-grayscale-500 mb-8 text-center">회원가입</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 이름 */}
            <Input
              label="이름"
              name="name"
              type="text"
              placeholder="이름을 입력해 주세요"
              value={formData.name}
              onChange={handleChange}
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
