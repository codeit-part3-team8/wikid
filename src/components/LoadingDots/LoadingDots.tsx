import React from 'react';
import { LoadingDotsProps } from '../../types/LoadingDots';

const LoadingDots: React.FC<LoadingDotsProps> = ({ className = '' }) => {
  return (
    <span className={`inline-flex gap-0.5 ${className}`}>
      <span className="animate-bounce [animation-delay:0s]">.</span>
      <span className="animate-bounce [animation-delay:0.15s]">.</span>
      <span className="animate-bounce [animation-delay:0.3s]">.</span>
      <style jsx>{`
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        .animate-bounce {
          animation: bounce 1s ease-in-out infinite;
        }
      `}</style>
    </span>
  );
};

export default LoadingDots;
