'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface ActionButtonProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export default function ActionButton({ to, children, className }: ActionButtonProps) {
  const router = useRouter();
  const { isLoggedIn, isLoading } = useAuth();

  const handleClick = () => {
    if (isLoading) return; // 인증 체크 중엔 동작X
    if (isLoggedIn) {
      router.push(to);
    } else {
      router.push('/login');
    }
  };

  return (
    <button type="button" className={className} onClick={handleClick} disabled={isLoading}>
      {children}
    </button>
  );
}
