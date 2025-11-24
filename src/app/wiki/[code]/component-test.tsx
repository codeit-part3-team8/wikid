'use client';

import { useState } from 'react';
import AlertModal from '@/components/Modal/AlertModal';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import QuizModal from '@/components/Modal/QuizModal';
import { useSnackBar } from '@/contexts/SnackBarContext';

export default function WikiPageTest() {
  const [alertModal1, setAlertModal1] = useState(false);
  const [alertModal2, setAlertModal2] = useState(false);
  const [confirmModal1, setConfirmModal1] = useState(false);
  const [confirmModal2, setConfirmModal2] = useState(false);
  const [quizModal, setQuizModal] = useState(false);

  const { showSuccess, showError } = useSnackBar();

  return (
    <div className="p-8">
      <h1 className="mb-8 text-2xl font-bold">내 위키페이지</h1>

      {/* AlertModal 테스트 섹션 */}
      <div className="rounded-lg border bg-gray-50 p-6">
        <h2 className="mb-4 text-lg font-semibold">AlertModal 테스트</h2>

        <div className="space-y-3">
          {/* 첫 번째 AlertModal - 세션 만료 알림 */}
          <button
            onClick={() => setAlertModal1(true)}
            className="bg-primary-200 hover:bg-primary-300 rounded-md px-4 py-2 text-white transition-colors"
          >
            세션 만료 알림 모달 열기
          </button>

          {/* 두 번째 AlertModal - 저장 확인 */}
          <button
            onClick={() => setAlertModal2(true)}
            className="bg-secondary-red-200 hover:bg-secondary-red-300 ml-3 rounded-md px-4 py-2 text-white transition-colors"
          >
            저장 확인 모달 열기
          </button>
        </div>
      </div>

      {/* ConfirmModal 테스트 섹션 */}
      <div className="mt-6 rounded-lg border bg-gray-50 p-6">
        <h2 className="mb-4 text-lg font-semibold">ConfirmModal 테스트</h2>

        <div className="space-y-3">
          {/* 첫 번째 ConfirmModal - 삭제 확인 */}
          <button
            onClick={() => setConfirmModal1(true)}
            className="bg-secondary-red-200 hover:bg-secondary-red-300 rounded-md px-4 py-2 text-white transition-colors"
          >
            삭제 확인 모달 열기
          </button>

          {/* 두 번째 ConfirmModal - 수정 확인 */}
          <button
            onClick={() => setConfirmModal2(true)}
            className="bg-primary-200 hover:bg-primary-300 ml-3 rounded-md px-4 py-2 text-white transition-colors"
          >
            수정 확인 모달 열기
          </button>
        </div>
      </div>

      {/* QuizModal 테스트 섹션 */}
      <div className="mt-6 rounded-lg border bg-gray-50 p-6">
        <h2 className="mb-4 text-lg font-semibold">QuizModal 테스트</h2>

        <div className="space-y-3">
          <button
            onClick={() => setQuizModal(true)}
            className="bg-grayscale-500 hover:bg-grayscale-600 rounded-md px-4 py-2 text-white transition-colors"
          >
            퀴즈 모달 열기
          </button>
        </div>
      </div>

      {/* SnackBar 테스트 섹션 */}
      <div className="mt-6 rounded-lg border bg-gray-50 p-6">
        <h2 className="mb-4 text-lg font-semibold">SnackBar 테스트</h2>

        <div className="space-y-3">
          {/* 성공 스낵바 테스트 */}
          <button
            onClick={() => showSuccess('내 위키 링크가 복사되었습니다.')}
            className="bg-primary-200 hover:bg-primary-300 rounded-md px-4 py-2 text-white transition-colors"
          >
            성공 스낵바 테스트 (위키 링크 복사)
          </button>

          {/* 오류 스낵바 테스트 */}
          <button
            onClick={() =>
              showError('다른 친구가 편집하고 있어요. 나중에 다시 시도해 주세요.', 4000)
            }
            className="bg-secondary-red-200 hover:bg-secondary-red-300 ml-3 rounded-md px-4 py-2 text-white transition-colors"
          >
            오류 스낵바 테스트 (편집 충돌)
          </button>

          {/* 연속 테스트 버튼 */}
          <button
            onClick={() => {
              showSuccess('첫 번째 성공 메시지');
              setTimeout(() => showError('두 번째 오류 메시지'), 500);
              setTimeout(() => showSuccess('세 번째 성공 메시지'), 1000);
            }}
            className="bg-grayscale-500 hover:bg-grayscale-600 ml-3 rounded-md px-4 py-2 text-white transition-colors"
          >
            연속 스낵바 테스트 (스택 확인)
          </button>
        </div>

        <div className="text-grayscale-500 mt-4 text-sm">
          <p>💡 스낵바는 3초 후 자동으로 사라집니다.</p>
          <p>💡 나중에 생성된 스낵바가 위에 표시됩니다.</p>
          <p>💡 연속 테스트로 스택 기능을 확인해보세요.</p>
          <p>💡 480px 이하에서는 하단에서 나타납니다.</p>
        </div>
      </div>

      {/* AlertModal 1 - 세션 만료 알림 */}
      <AlertModal
        isOpen={alertModal1}
        onClose={() => setAlertModal1(false)}
        title="5분 이상 글을 쓰지 않아 접속이 끊어졌어요."
        message="위키 참여하기를 통해 다시 위키를 수정해 주세요."
        buttonText="확인"
        buttonVariant="primary"
      />

      {/* AlertModal 2 - 저장 확인 */}
      <AlertModal
        isOpen={alertModal2}
        onClose={() => setAlertModal2(false)}
        title="저장하지 않고 나가시겠어요?"
        message="작성하신 모든 내용이 사라집니다."
        buttonText="페이지 나가기"
        buttonVariant="secondary"
      />

      {/* ConfirmModal 1 - 삭제 확인 */}
      <ConfirmModal
        isOpen={confirmModal1}
        onClose={() => setConfirmModal1(false)}
        onConfirm={() => {
          console.log('삭제가 실행되었습니다!');
          alert('데이터가 삭제되었습니다.');
        }}
        title="정말 삭제하시겠습니까?"
        message="삭제한 데이터는 복구할 수 없습니다."
        cancelText="취소"
        cancelVariant="outline"
        confirmText="삭제"
        confirmVariant="secondary"
      />

      {/* ConfirmModal 2 - 수정 확인 */}
      <ConfirmModal
        isOpen={confirmModal2}
        onClose={() => setConfirmModal2(false)}
        onConfirm={() => {
          console.log('수정이 실행되었습니다!');
          alert('데이터가 수정되었습니다.');
        }}
        title="정말 수정하시겠습니까?"
        message="수정한 데이터를 저장합니다."
        cancelText="취소"
        cancelVariant="outline"
        confirmText="확인"
        confirmVariant="primary"
      />

      {/* QuizModal - 퀴즈 테스트 */}
      <QuizModal
        isOpen={quizModal}
        onClose={() => setQuizModal(false)}
        onCorrectAnswer={() => {
          console.log('퀴즈 정답! 위키 작성 권한 얻음');
          alert('정답입니다! 위키를 작성할 수 있습니다.');
        }}
        title="특별히 싫어하는 음식은?"
        placeholder="답안을 입력해 주세요"
        correctAnswer="마라탕"
        closeOnBackdropClick={false}
      />
    </div>
  );
}
