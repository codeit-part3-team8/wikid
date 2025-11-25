'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 로그인 로직
    setTimeout(() => {
      setIsLoading(false);
      console.log('로그인:', { email, password });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header isLoggedIn={false} />

      <main className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <h1 className="text-2xl-semibold text-grayscale-600 mb-8 text-center">로그인</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 이메일 */}
            <Input
              label="이메일"
              type="email"
              placeholder="이메일을 입력해 주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />

            {/* 비밀번호 */}
            <Input
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
