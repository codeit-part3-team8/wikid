import React, { forwardRef, HTMLAttributes } from 'react';
import clsx from 'clsx';
import { tv } from 'tailwind-variants';

const wholeBoxStyle = tv({
  base: 'relative inline-block bg-grayscale-100 w-full pl-[15px] pr-2 py-[13px] rounded-lg',
});
const textAreaStyle = tv({
  base: 'placeholder:text-grayscale-400 w-full text-grayscale-900 w-full resize-none focus:outline-none mb-2 custom-scrollbar',
});

interface TextAreaProps
  extends Omit<HTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange' | 'onSubmit'> {
  heightLines: number;
  maxLength?: number;
  placeholder?: string;
  value: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit?: (e?: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      heightLines,
      maxLength = 0,
      placeholder = '',
      value,
      disabled = false,
      onChange,
      onSubmit,
      ...rest
    },
    ref
  ) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
        e.preventDefault(); // enter로 줄바꿈 방지
        onSubmit?.();
      }
    };

    return (
      <div className={wholeBoxStyle()}>
        <textarea
          aria-label={placeholder}
          maxLength={maxLength > 0 ? maxLength : undefined}
          placeholder={placeholder}
          style={{ minHeight: `${heightLines * 26}px` }}
          value={value}
          disabled={disabled}
          ref={ref}
          className={clsx(textAreaStyle(), className)}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          {...rest}
        />
        {maxLength > 0 && (
          <span
            className={clsx(
              'text-md-regular absolute bottom-1 left-4 select-none',
              value.length >= maxLength ? 'text-secondary-red-200' : 'text-grayscale-300'
            )}
            aria-live="polite"
            aria-atomic="true"
            role="status"
          >
            {value.length}/{maxLength}
          </span>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
export default TextArea;
