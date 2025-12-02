'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import { changePassword } from '@/app/api/auth';
import { validatePassword, validatePasswordConfirm } from '@/utils/validation';
import { useAuth } from '@/contexts/AuthContext';

export default function PasswordChangePage() {
  const router = useRouter();
  const { logout } = useAuth();
  const [formData, setFormData] = useState({
    currentPassword: '',
    password: '',
    passwordConfirmation: '',
  });
  const [errors, setErrors] = useState({
    currentPassword: '',
    password: '',
    passwordConfirmation: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // input 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // blur 시 유효성 검사
  const handleBlur = (field: keyof typeof formData) => {
    let error = '';
    switch (field) {
      case 'currentPassword':
        error = validatePassword(formData.currentPassword) || '';
        break;
      case 'password':
        error = validatePassword(formData.password) || '';
        // 현재/새 비밀번호 동일 체크
        if (!error && formData.currentPassword === formData.password) {
          error = '새 비밀번호는 현재 비밀번호와 달라야 합니다';
        }
        break;
      case 'passwordConfirmation':
        error = validatePasswordConfirm(formData.password, formData.passwordConfirmation) || '';
        break;
    }
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  // submit 이벤트
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    const currentPasswordError = validatePassword(formData.currentPassword);
    const passwordError = validatePassword(formData.password);
    const passwordConfirmationError = validatePasswordConfirm(
      formData.password,
      formData.passwordConfirmation
    );
    let samePasswordError = '';
    if (formData.currentPassword === formData.password) {
      samePasswordError = '새 비밀번호는 현재 비밀번호와 달라야 합니다';
    }
    if (currentPasswordError || passwordError || passwordConfirmationError || samePasswordError) {
      setErrors({
        currentPassword: currentPasswordError || '',
        password: passwordError || samePasswordError || '',
        passwordConfirmation: passwordConfirmationError || '',
      });
      return;
    }

    setIsLoading(true);
    try {
      // 서버 명세에 맞는 필드명으로 데이터 전달!
      await changePassword({
        currentPassword: formData.currentPassword,
        password: formData.password,
        passwordConfirmation: formData.passwordConfirmation,
      });

      alert('비밀번호가 변경되었습니다. 다시 로그인해주세요.');

      // 변경 성공시 로그아웃 및 로그인페이지로
      logout();
      router.push('/login');
    } catch (error) {
      console.error('비밀번호 변경 실패:', error);
      const errorMessage = error instanceof Error ? error.message : '비밀번호 변경에 실패했습니다';

      // 서버에서 currentPassword 오류 등 세밀하게 분기 가능
      if (errorMessage.includes('비밀번호') || errorMessage.toLowerCase().includes('password')) {
        setErrors((prev) => ({
          ...prev,
          currentPassword: '현재 비밀번호가 일치하지 않습니다',
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
        <div className="w-full max-w-2xl">
          <div className="p-12">
            <h1 className="text-grayscale-600 mb-12 text-center text-2xl font-semibold">
              비밀번호 변경하기
            </h1>

            <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-6">
              {/* 현재 비밀번호 */}
              <Input
                label="현재 비밀번호"
                name="currentPassword"
                type="password"
                placeholder="기존 비밀번호 입력"
                value={formData.currentPassword}
                onChange={handleChange}
                onBlur={() => handleBlur('currentPassword')}
                error={errors.currentPassword}
                required
                fullWidth
              />

              {/* 새 비밀번호 */}
              <Input
                label="새 비밀번호"
                name="password"
                type="password"
                placeholder="새 비밀번호"
                value={formData.password}
                onChange={handleChange}
                onBlur={() => handleBlur('password')}
                error={errors.password}
                required
                fullWidth
              />

              {/* 새 비밀번호 확인 */}
              <Input
                label="새 비밀번호 확인"
                name="passwordConfirmation"
                type="password"
                placeholder="새 비밀번호 확인"
                value={formData.passwordConfirmation}
                onChange={handleChange}
                onBlur={() => handleBlur('passwordConfirmation')}
                error={errors.passwordConfirmation}
                required
                fullWidth
              />

              {/* 변경하기 버튼 */}
              <Button type="submit" variant="primary" size="lg" fullWidth loading={isLoading}>
                변경하기
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
