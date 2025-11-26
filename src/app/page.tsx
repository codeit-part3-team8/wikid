'use client';

import { useState } from 'react';
import Button from '../components/Button/Button';
import Header from '../components/Header/Header';
import Input from '../components/Input/Input';
import WikiTextEditor from '@/components/TextEditor/WikiTextEditor';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('버튼 클릭!');
    }, 2000);
  };

  const validateEmail = (value: string) => {
    if (value && !value.includes('@')) {
      setEmailError('올바른 이메일 형식이 아닙니다');
    } else {
      setEmailError('');
    }
  };

  return (
    <div className="bg-grayscale-50 min-h-screen">
      <Header isLoggedIn={isLoggedIn} />
      <WikiTextEditor content="dd" />
      <main className="p-8">
        <div className="mx-auto max-w-4xl">
          {/* 헤더 상태 토글 */}
          <section className="mb-8 rounded-lg bg-white p-6 shadow-sm">
            <h2 className="text-xl-semibold text-grayscale-600 mb-4">헤더 테스트</h2>
            <div className="flex gap-4">
              <Button
                variant={!isLoggedIn ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setIsLoggedIn(false)}
              >
                로그아웃 상태
              </Button>
              <Button
                variant={isLoggedIn ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setIsLoggedIn(true)}
              >
                로그인 상태
              </Button>
            </div>
          </section>

          {/* Input 컴포넌트 테스트 */}
          <section className="mb-12 rounded-lg bg-white p-6 shadow-sm">
            <h2 className="text-xl-semibold text-grayscale-600 mb-6">Input 컴포넌트 테스트</h2>
            <div className="max-w-md space-y-6">
              {/* 기본 Input */}
              <Input
                label="이메일"
                type="email"
                placeholder="이메일을 입력해 주세요"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
                error={emailError}
                fullWidth
              />

              {/* 비밀번호 Input */}
              <Input
                label="비밀번호"
                type="password"
                placeholder="비밀번호를 입력해 주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />

              {/* Helper Text 있는 Input */}
              <Input
                label="닉네임"
                type="text"
                placeholder="닉네임을 입력하세요"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                helperText="2-10자 이내로 입력해주세요"
                fullWidth
              />

              {/* 비활성화 Input */}
              <Input
                label="비활성화 상태"
                type="text"
                placeholder="수정할 수 없습니다"
                disabled
                fullWidth
              />

              {/* 에러 상태 Input */}
              <Input
                label="에러 예시"
                type="text"
                placeholder="입력해보세요"
                error="올바른 형식이 아닙니다"
                fullWidth
              />

              {/* Required 표시 없는 Input */}
              <Input
                label="선택 입력"
                type="text"
                placeholder="선택 사항입니다"
                helperText="선택적으로 입력할 수 있습니다"
                fullWidth
              />
            </div>
          </section>

          <h1 className="text-3xl-semibold text-grayscale-600 mb-8">버튼 컴포넌트 테스트</h1>

          {/* Primary 버튼들 */}
          <section className="mb-12 rounded-lg bg-white p-6 shadow-sm">
            <h2 className="text-xl-semibold text-grayscale-600 mb-4">Primary 버튼</h2>
            <div className="space-y-4">
              <div>
                <p className="text-md-regular text-grayscale-500 mb-2">Small</p>
                <Button variant="primary" size="sm" onClick={handleClick}>
                  내 위키 만들기
                </Button>
              </div>

              <div>
                <p className="text-md-regular text-grayscale-500 mb-2">Medium (기본)</p>
                <Button variant="primary" size="md" onClick={handleClick}>
                  로그인
                </Button>
              </div>

              <div>
                <p className="text-md-regular text-grayscale-500 mb-2">Large (Full Width)</p>
                <Button variant="primary" size="lg" fullWidth onClick={handleClick}>
                  로그인
                </Button>
              </div>

              <div>
                <p className="text-md-regular text-grayscale-500 mb-2">Loading 상태</p>
                <Button variant="primary" loading={isLoading} onClick={handleClick}>
                  로그인
                </Button>
              </div>

              <div>
                <p className="text-md-regular text-grayscale-500 mb-2">Disabled 상태</p>
                <Button variant="primary" disabled>
                  로그인
                </Button>
              </div>
            </div>
          </section>

          {/* Secondary 버튼들 */}
          <section className="mb-12 rounded-lg bg-white p-6 shadow-sm">
            <h2 className="text-xl-semibold text-grayscale-600 mb-4">Secondary 버튼</h2>
            <div className="space-y-4">
              <div>
                <p className="text-md-regular text-grayscale-500 mb-2">Small</p>
                <Button variant="secondary" size="sm" onClick={handleClick}>
                  내 위키 만들기
                </Button>
              </div>

              <div>
                <p className="text-md-regular text-grayscale-500 mb-2">Medium (기본)</p>
                <Button variant="secondary" size="md" onClick={handleClick}>
                  로그인
                </Button>
              </div>

              <div>
                <p className="text-md-regular text-grayscale-500 mb-2">Large (Full Width)</p>
                <Button variant="secondary" size="lg" fullWidth onClick={handleClick}>
                  로그인
                </Button>
              </div>

              <div>
                <p className="text-md-regular text-grayscale-500 mb-2">Loading 상태</p>
                <Button variant="secondary" loading={isLoading} onClick={handleClick}>
                  로그인
                </Button>
              </div>

              <div>
                <p className="text-md-regular text-grayscale-500 mb-2">Disabled 상태</p>
                <Button variant="secondary" disabled>
                  로그인
                </Button>
              </div>
            </div>
          </section>

          {/* 실제 사용 예시 */}
          <section className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="text-xl-semibold text-grayscale-600 mb-4">실제 사용 예시</h2>
            <div className="flex gap-4">
              <Button variant="secondary" size="sm">
                내 위키 만들기
              </Button>
              <Button variant="primary" size="md">
                로그인
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
