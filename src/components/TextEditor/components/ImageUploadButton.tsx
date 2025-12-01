'use client';

import { EditorDropdown, EditorDropdownMenu } from './base/EditorDropdown';
import { Editor } from '@tiptap/react';
import { useRef } from 'react';
import ToolbarButton from './base/ToolbarButton';

interface ImageUploadButtonProps {
  editor: Editor;
}

const ImageUploadButton = ({ editor }: ImageUploadButtonProps) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInsert = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result;
      if (!data) return;

      const fileType = file.type;
      // 이미지, 비디오, 기타 파일 삽입
      if (fileType.startsWith('image/')) {
        editor
          .chain()
          .focus()
          .setImage({ src: data as string })
          .run();
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
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
    </>
  );
};

ImageUploadButton.displayName = 'ImageUploadButton';
export default ImageUploadButton;
