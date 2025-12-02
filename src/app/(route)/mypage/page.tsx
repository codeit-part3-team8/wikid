'use client';

import Button from '@/components/Button/Button';
import { useRouter } from 'next/navigation';

export default function MyPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white">
      <main className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-2xl">
          <div className="p-12">
            <h1 className="text-2xl-semibold text-grayscale-600 mb-12 text-center">계정 설정</h1>

            <div className="mx-auto max-w-md space-y-6">
              {/* 비밀번호 변경 버튼 */}
              <Button size="lg" fullWidth onClick={() => router.push('/passwordChange')}>
                비밀번호 변경
              </Button>

              {/* 구분선 */}
              <div className="border-grayscale-600 border-t"></div>

              {/* 위키 생성하기 버튼 */}
              <Button size="lg" fullWidth onClick={() => router.push('/wiki/create')}>
                위키 생성하기
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
