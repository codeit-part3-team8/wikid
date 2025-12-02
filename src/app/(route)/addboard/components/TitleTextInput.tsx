'use client';

import Input from '@/components/Input/Input';
import { useState } from 'react';

const MAX_LENGTH = 30;

interface TitleTextInput {
  beforeValue: string;
  onChange: (v: string) => void;
}

const TitleTextInput = ({ beforeValue, onChange }: TitleTextInput) => {
  const [value, setValue] = useState(beforeValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    // 최대 길이 자르기 (한글 포함)
    if (Array.from(newValue).length > MAX_LENGTH) {
      newValue = Array.from(newValue).slice(0, MAX_LENGTH).join('');
    }
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex items-center justify-between">
      <Input
        value={value}
        onChange={handleChange}
        placeholder="제목을 입력해주세요"
        maxLength={30}
        fullWidth
        className="bg-transparent p-0! py-1! text-[20px]! font-medium! focus:border-none focus:ring-0!"
      />
      <div className="flex text-[13px] md:text-[14px]">
        <span className={value.length >= MAX_LENGTH ? 'text-primary-300' : ''}>
          {value.length}/
        </span>
        <span className="text-primary-300">{MAX_LENGTH}</span>
      </div>
    </div>
  );
};

TitleTextInput.displayName = 'TitleTextInput';
export default TitleTextInput;
