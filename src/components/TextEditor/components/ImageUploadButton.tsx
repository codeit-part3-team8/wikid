'use client';

import { Editor } from '@tiptap/react';
import { useRef, useState } from 'react';
import ToolbarButton from './base/ToolbarButton';
import { API } from '@/constants/api';
import { getAccessToken } from '@/utils/auth';

interface ImageUploadButtonProps {
  editor: Editor;
}

const ImageUploadButton = ({ editor }: ImageUploadButtonProps) => {
  const accessToken = getAccessToken();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  // 파일명 한글/특수문자 제거 + timestamp
  const sanitizeFileName = (file: File) => {
    const ext = file.name.split('.').pop();
    const name = file.name
      .replace(/\.[^/.]+$/, '') // 확장자 제거
      .replace(/[^a-zA-Z0-9-_]/g, '_'); // 한글/특수문자 -> '_'
    return `${name}-${Date.now()}.${ext}`;
  };

  // 서버에 이미지 업로드 후 presigned URL 받기
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

    // presigned URL 또는 접근 가능한 S3 URL 사용
    const imageUrl = data.data?.presignedUrl || data.data?.url || data.url;
    if (!imageUrl) throw new Error('이미지 URL을 받지 못했습니다.');
    return imageUrl;
  };

  // TipTap 에디터에 이미지 삽입
  const handleFileInsert = async (file: File) => {
    try {
      setLoading(true);
      const url = await uploadImageToServer(file);
      if (!editor) return;

      // TipTap 커서 위치에 이미지 삽입
      editor.chain().focus().setImage({ src: url }).run();
    } catch (err) {
      console.error(err);
      alert('이미지 업로드 실패');
    } finally {
      setLoading(false);
      if (imageInputRef.current) imageInputRef.current.value = '';
    }
  };

  return (
    <div>
      <ToolbarButton
        icon="TTIC_Image"
        ariaLabel="add image"
        onClick={() => imageInputRef.current?.click()}
      />

      <input
        type="file"
        accept="image/*"
        ref={imageInputRef}
        style={{ display: 'none' }}
        onChange={(e) => e.target.files && handleFileInsert(e.target.files[0])}
      />
    </div>
  );
};

ImageUploadButton.displayName = 'ImageUploadButton';
export default ImageUploadButton;
