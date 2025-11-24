import React, { forwardRef } from 'react';
import { InputProps } from '../../types/Input.types';

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, fullWidth = false, className = '', ...props }, ref) => {
    const hasError = !!error;

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {/* Label */}
        {label && (
          <label
            htmlFor={props.id}
            className="text-md-regular mb-2 block text-[var(--grayscale-500)]"
          >
            {label}
          </label>
        )}

        {/* Input Field */}
        <input
          ref={ref}
          className={`text-md-regular w-full rounded-lg border bg-white px-4 py-3 text-[var(--grayscale-600)] transition-all duration-200 placeholder:text-[var(--grayscale-400)] focus:outline-none disabled:cursor-not-allowed disabled:bg-[var(--grayscale-100)] ${
            hasError
              ? 'border-[var(--secondary-red-200)] focus:border-[var(--secondary-red-200)] focus:ring-2 focus:ring-[var(--secondary-red-200)]/20'
              : 'border-[var(--grayscale-300)] focus:border-[var(--primary-200)] focus:ring-2 focus:ring-[var(--primary-200)]/20'
          } ${className} `}
          {...props}
        />

        {/* Helper Text or Error Message */}
        {(helperText || error) && (
          <p
            className={`text-xs-regular mt-2 ${
              hasError ? 'text-[var(--secondary-red-200)]' : 'text-[var(--grayscale-400)]'
            }`}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
