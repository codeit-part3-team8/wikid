'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="from-grayscale-50 to-primary-100 min-h-screen bg-linear-to-br">
      <div className="flex min-h-screen items-center justify-center p-6 max-[640px]:p-4">
        <div className="w-full max-w-lg">
          {/* 카드 컨테이너 */}
          <div className="rounded-2xl bg-white px-10 py-14 text-center shadow-xl max-[640px]:px-8 max-[640px]:py-12">
            {/* 404 숫자 */}
            <div className="relative mb-6">
              <h1 className="text-primary-200 text-8xl font-bold opacity-90 max-[640px]:text-7xl">
                404
              </h1>
              <div className="absolute inset-0 blur-sm">
                <h1 className="text-primary-100 text-8xl font-bold max-[640px]:text-7xl">404</h1>
              </div>
            </div>

            {/* 메인 메시지 */}
            <h2 className="responsive-text text-3xl-to-2xl text-weight-bold text-grayscale-600 mb-4">
              페이지를 찾을 수 없습니다
            </h2>

            {/* 서브 메시지 */}
            <p className="responsive-text text-lg-to-md text-grayscale-400 mx-auto mb-8 max-w-sm leading-relaxed">
              요청하신 페이지가 존재하지 않거나
              <br />
              잘못된 경로입니다.
            </p>

            {/* 메인으로 가기 버튼 */}
            <div className="mb-8">
              <Button
                variant="primary"
                size="md"
                fullWidth={true}
                onClick={() => router.push('/')}
                className="cursor-pointer shadow-lg transition-shadow duration-200 hover:shadow-xl"
              >
                메인화면으로 가기
              </Button>
            </div>

            {/* 추가 정보 */}
            <p className="responsive-text text-sm-to-xs text-grayscale-300">
              문제가 지속되면 관리자에게 문의해주세요
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
