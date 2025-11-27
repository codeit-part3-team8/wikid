import React, { forwardRef } from 'react';
import { InputProps } from '../../types/Input.types';

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, fullWidth = false, className = '', ...props }, ref) => {
    const hasError = !!error;

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {/* Label */}
        {label && (
          <label htmlFor={props.id} className="text-md-regular text-grayscale-500 mb-2 block">
            {label}
          </label>
        )}

        {/* Input Field */}
        <input
          ref={ref}
          className={`text-md-regular bg-grayscale-100 text-grayscale-600 placeholder:text-grayscale-400 disabled:bg-grayscale-100 w-full rounded-lg px-4 py-3 transition-all duration-200 focus:outline-none disabled:cursor-not-allowed ${
            hasError
              ? 'border-secondary-red-200 focus:border-secondary-red-200 focus:ring-secondary-red-200/20 focus:ring-2'
              : 'border-grayscale-300 focus:border-primary-200 focus:ring-primary-200/20 focus:ring-2'
          } ${className} `}
          {...props}
        />

        {/* Helper Text or Error Message */}
        {(helperText || error) && (
          <p
            className={`text-xs-regular mt-2 ${
              hasError ? 'text-secondary-red-200' : 'text-grayscale-400'
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
