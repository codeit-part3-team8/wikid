'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header/Header';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import { validatePassword, validatePasswordConfirm } from '@/utils/validation';

export default function PasswordChangePage() {
  const router = useRouter();
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

    if (currentPasswordError || newPasswordError || newPasswordConfirmError) {
      setErrors({
        currentPassword: currentPasswordError || '',
        newPassword: newPasswordError || '',
        newPasswordConfirm: newPasswordConfirmError || '',
      });
      return;
    }

    setIsLoading(true);

    try {
      // TODO: 비밀번호 변경 API 호출
      // await changePassword(formData);

      alert('비밀번호가 변경되었습니다');
      router.push('/');
    } catch (error) {
      console.error('비밀번호 변경 실패:', error);
      alert(error instanceof Error ? error.message : '비밀번호 변경에 실패했습니다');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header isLoggedIn={true} />

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
