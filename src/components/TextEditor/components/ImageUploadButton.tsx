'use client';

import { Editor } from '@tiptap/react';
import { useRef, useState, useEffect } from 'react';
import ToolbarButton from './base/ToolbarButton';
import { API } from '@/constants/api';
import { getAccessToken } from '@/utils/auth';
import LoadingDots from '@/components/LoadingDots/LoadingDots';
import SnackBar from '@/components/SnackBar/SnackBar';

interface ImageUploadButtonProps {
  editor: Editor;
}

const ImageUploadButton = ({ editor }: ImageUploadButtonProps) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSnackBar, setShowSnackBar] = useState(false);

  const accessToken = getAccessToken();

  // error가 생기면 SnackBar 띄움
  useEffect(() => {
    if (error) {
      Promise.resolve().then(() => setShowSnackBar(true));
    }
  }, [error]);

  // 파일명 한글/특수문자 제거  timestamp
  const sanitizeFileName = (file: File) => {
    const ext = file.name.split('.').pop();
    const name = file.name
      .replace(/\.[^/.]+$/, '') // 확장자 제거
      .replace(/[^a-zA-Z0-9-_]/g, '_'); // 한글/특수문자 -> '_'
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

  const handleFileInsert = async (file: File) => {
    try {
      setLoading(true);
      const url = await uploadImageToServer(file);
      if (!editor) return;

      editor.chain().focus().setImage({ src: url }).run();
    } catch (err) {
      if (err instanceof Error) {
        setError(`이미지 업로드에 실패했습니다. ${err.message}`);
      } else {
        setError('알 수 없는 에러가 발생했습니다.');
      }
    } finally {
      setLoading(false);
      if (imageInputRef.current) imageInputRef.current.value = '';
    }
  };

  return (
    <>
      <div>
        {loading && <LoadingDots />}
        <ToolbarButton
          icon="TTIC_Image"
          ariaLabel="add image"
          onClick={() => {
            if (!accessToken) {
              setError('로그인이 필요합니다.');
              return;
            }
            imageInputRef.current?.click();
          }}
        />

        <input
          type="file"
          accept="image/*"
          ref={imageInputRef}
          style={{ display: 'none' }}
          onChange={(e) => e.target.files && handleFileInsert(e.target.files[0])}
        />
      </div>

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
