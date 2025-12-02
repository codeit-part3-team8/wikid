interface LoadingStateProps {
  message: string;
}

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function LoadingState({ message }: LoadingStateProps) {
  return (
    <div className="bg-grayscale-50 flex min-h-screen items-center justify-center overflow-x-hidden">
      <div className="text-center">
        <div className="border-primary-200 mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2"></div>
        <p className="text-grayscale-400">{message}</p>
      </div>
    </div>
  );
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="bg-grayscale-50 flex min-h-screen items-center justify-center overflow-x-hidden">
      <div className="text-center">
        <p className="mb-4 text-red-500">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-primary-200 hover:bg-primary-300 rounded px-4 py-2 text-white"
          >
            다시 시도
          </button>
        )}
      </div>
    </div>
  );
}

export function NotFoundState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="bg-grayscale-50 flex min-h-screen items-center justify-center overflow-x-hidden">
      <div className="text-center">
        <p className="text-grayscale-500 mb-4">위키 데이터를 찾을 수 없습니다.</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-primary-200 hover:bg-primary-300 rounded px-4 py-2 text-white"
          >
            새로고침
          </button>
        )}
      </div>
    </div>
  );
}
