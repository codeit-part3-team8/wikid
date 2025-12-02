'use client';

import { Editor } from '@tiptap/react';
import { useRef, useState, useEffect } from 'react';
import ToolbarButton from './base/ToolbarButton';
import { API } from '@/constants/api';
import { getAccessToken } from '@/utils/auth';
import LoadingDots from '@/components/LoadingDots/LoadingDots';
import SnackBar from '@/components/SnackBar/SnackBar';
import BaseModal from '@/components/Modal/BaseModal';
import { useModal } from '@/hooks/useModal';
import Button from '@/components/Button/Button';
import IconButton from '@/components/IconButton/IconButton';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import Image from 'next/image';

interface ImageUploadButtonProps {
  editor: Editor;
  onSetThumbnail?: (url: string) => void; // 썸네일 설정 콜백
}

const ImageUploadButton = ({ editor, onSetThumbnail }: ImageUploadButtonProps) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();
  const [thumbnailChecked, setThumbnailChecked] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);

  const accessToken = getAccessToken();

  useEffect(() => {
    if (error) {
      Promise.resolve().then(() => setShowSnackBar(true));
    }
  }, [error]);

  useEffect(() => {
    if (!selectedFile) return;

    const img = new window.Image();
    img.src = URL.createObjectURL(selectedFile);
    img.onload = () => {
      setImageSize({ width: img.width, height: img.height });
    };
  }, [selectedFile]);

  const sanitizeFileName = (file: File) => {
    const ext = file.name.split('.').pop();
    const name = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9-_]/g, '_');
    return `${name}-${Date.now()}.${ext}`;
  };

  const uploadImageToServer = async (file: File): Promise<string> => {
    const newFile = new File([file], sanitizeFileName(file), { type: file.type });
    const formData = new FormData();
    formData.append('image', newFile);

    const res = await fetch(API.IMAGE, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`이미지 업로드 실패: ${res.status} ${errText}`);
    }

    const data = await res.json();
    const imageUrl = data.data?.presignedUrl || data.data?.url || data.url;
    if (!imageUrl) throw new Error('이미지 URL을 받지 못했습니다.');
    return imageUrl;
  };

  const handleInsertImage = async () => {
    if (!selectedFile) {
      setError('업로드할 이미지를 선택해주세요.');
      return;
    }

    try {
      setLoading(true);
      const url = await uploadImageToServer(selectedFile);

      if (editor) {
        editor.chain().focus().setImage({ src: url }).run();
      }

      closeModal();
      setSelectedFile(null);
      setThumbnailChecked(false);
      setImageSize(null);

      if (thumbnailChecked && onSetThumbnail) {
        setTimeout(() => onSetThumbnail(url), 0);
      }
    } catch (err) {
      if (err instanceof Error) setError(`이미지 업로드 실패: ${err.message}`);
      else setError('알 수 없는 에러가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToolbarButton
        icon="TTIC_Image"
        ariaLabel="add image"
        onClick={() => {
          if (!accessToken) {
            setError('로그인이 필요합니다.');
            return;
          }
          openModal();
        }}
      />

      <BaseModal isOpen={isOpen} onClose={closeModal} size="image">
        <div className="mt-5 flex flex-col gap-4">
          {!selectedFile && (
            <div
              className="bg-grayscale-200 flex h-50 w-80 items-center justify-center rounded p-4 hover:cursor-pointer"
              onClick={() => imageInputRef.current?.click()}
            >
              <SVGIcon icon="IC_Camera" size="xxl" className="text-grayscale-400" />
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            ref={imageInputRef}
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setSelectedFile(e.target.files[0]);
              }
            }}
          />

          {selectedFile && imageSize && (
            <div className="relative flex justify-center">
              <Image
                src={URL.createObjectURL(selectedFile)}
                alt="선택된 이미지"
                width={imageSize.width}
                height={imageSize.height}
                className="max-h-60 max-w-120 rounded object-contain"
              />
              <IconButton
                icon="IC_Close"
                variant="filled"
                size="sm"
                className="absolute top-2 right-2 opacity-70"
                onClick={() => {
                  setSelectedFile(null);
                  setImageSize(null);
                }}
              />
            </div>
          )}

          {onSetThumbnail && (
            <label className="flex w-fit items-center gap-2">
              <input
                type="checkbox"
                checked={thumbnailChecked}
                onChange={(e) => setThumbnailChecked(e.target.checked)}
              />
              썸네일로 사용
            </label>
          )}

          <Button onClick={handleInsertImage} disabled={loading || !selectedFile}>
            {loading ? <LoadingDots /> : '이미지 삽입'}
          </Button>
        </div>
      </BaseModal>

      <SnackBar
        message={error ?? '알 수 없는 에러가 발생했습니다.'}
        type="error"
        isOpen={showSnackBar}
        duration={2000}
        onClose={() => setShowSnackBar(false)}
      />
    </>
  );
};

ImageUploadButton.displayName = 'ImageUploadButton';
export default ImageUploadButton;
