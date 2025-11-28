'use client';

import BaseModal from '@/components/Modal/BaseModal';
import Button from '@/components/Button/Button';
import { useState, useRef, ChangeEvent } from 'react';
import IconButton from '@/components/IconButton/IconButton';
import Image from 'next/image';
import { BaseModalProps } from '@/types/Modal';

interface AddImageModal extends Omit<BaseModalProps, 'onChange'> {
  onChange: (v: string) => void;
}

const AddImageModal = ({ isOpen, onClose, onChange }: AddImageModal) => {
  const [image, setImage] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteImage = () => {
    setImage('');
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleClose = () => {
    onChange(image);
    onClose();
  };

  const isDisabled = !image;

  return (
    <BaseModal isOpen={isOpen} size="image" onClose={handleClose}>
      <div className="flex flex-col items-center gap-5 pt-4">
        <span className="text-grayscale-500 text-[16px] font-semibold md:text-[20px]">이미지</span>
        {!image && (
          <div className="bg-grayscale-100 flex h-40 w-60 justify-center rounded-lg md:h-52 lg:w-90">
            <IconButton
              icon="IC_Camera"
              size="xl"
              onClick={handleClickUpload}
              className="text-grayscale-300! hover:text-grayscale-400!"
            />
          </div>
        )}

        {image && (
          <div className="relative inline-block overflow-hidden rounded-xl">
            <IconButton
              icon="IC_Close"
              size="sm"
              onClick={handleDeleteImage}
              variant="filled"
              className="absolute top-2 right-2 z-10 opacity-80 hover:opacity-100"
            />
            <Image
              src={image}
              alt="등록된 이미지"
              width={300} // 임시로 최대값 지정 가능
              height={300} // 원본 비율에 따라 자동 조절
              className="object-contain"
            />
          </div>
        )}
        {/* 숨겨진 파일 인풋 */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <div className="flex w-full justify-end">
          <Button
            disabled={isDisabled}
            size="lg"
            className="h-10 min-w-0! cursor-pointer px-5! py-0!"
            onClick={onClose}
          >
            삽입하기
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

AddImageModal.displayName = 'AddImageModal';
export default AddImageModal;
