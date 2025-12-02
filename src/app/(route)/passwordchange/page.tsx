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
    newPassword: '',
    newPasswordConfirm: '',
  });
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });
  const [isLoading, setIsLoading] = useState(false);

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

  const handleBlur = (field: keyof typeof formData) => {
    let error = '';

    switch (field) {
      case 'currentPassword':
        error = validatePassword(formData.currentPassword) || '';
        break;
      case 'newPassword':
        error = validatePassword(formData.newPassword) || '';
        // 현재 비밀번호와 새 비밀번호가 같은지 확인
        if (!error && formData.currentPassword === formData.newPassword) {
          error = '새 비밀번호는 현재 비밀번호와 달라야 합니다';
        }
        break;
      case 'newPasswordConfirm':
        error = validatePasswordConfirm(formData.newPassword, formData.newPasswordConfirm) || '';
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const currentPasswordError = validatePassword(formData.currentPassword);
    const newPasswordError = validatePassword(formData.newPassword);
    const newPasswordConfirmError = validatePasswordConfirm(
      formData.newPassword,
      formData.newPasswordConfirm
    );

    // 현재 비밀번호와 새 비밀번호가 같은지 확인
    let samePasswordError = '';
    if (formData.currentPassword === formData.newPassword) {
      samePasswordError = '새 비밀번호는 현재 비밀번호와 달라야 합니다';
    }

    if (currentPasswordError || newPasswordError || newPasswordConfirmError || samePasswordError) {
      setErrors({
        currentPassword: currentPasswordError || '',
        newPassword: newPasswordError || samePasswordError || '',
        newPasswordConfirm: newPasswordConfirmError || '',
      });
      return;
    }

    setIsLoading(true);

    try {
      await changePassword({
        passwordConfirmation: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      alert('비밀번호가 변경되었습니다. 다시 로그인해주세요.');

      // 비밀번호 변경 후 로그아웃 처리
      logout();
      router.push('/login');
    } catch (error) {
      console.error('비밀번호 변경 실패:', error);
      const errorMessage = error instanceof Error ? error.message : '비밀번호 변경에 실패했습니다';

      // 현재 비밀번호가 틀린 경우
      if (errorMessage.includes('비밀번호') || errorMessage.includes('password')) {
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
            <h1 className="text-2xl-semibold text-grayscale-600 mb-12 text-center">계정 설정</h1>

            <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-6">
              {/* 현재 비밀번호 */}
              <Input
                label="비밀번호 변경"
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
                name="newPassword"
                type="password"
                placeholder="새 비밀번호"
                value={formData.newPassword}
                onChange={handleChange}
                onBlur={() => handleBlur('newPassword')}
                error={errors.newPassword}
                required
                fullWidth
              />

              {/* 새 비밀번호 확인 */}
              <Input
                label="새 비밀번호 확인"
                name="newPasswordConfirm"
                type="password"
                placeholder="새 비밀번호 확인"
                value={formData.newPasswordConfirm}
                onChange={handleChange}
                onBlur={() => handleBlur('newPasswordConfirm')}
                error={errors.newPasswordConfirm}
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
