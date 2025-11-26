'use client';

import { EditorDropdown, EditorDropdownMenu } from './base/EditorDropdown';
import { Editor } from '@tiptap/react';
import { useRef } from 'react';

interface FileUploadDropdownProps {
  editor: Editor;
}

const FileUploadDropdown = ({ editor }: FileUploadDropdownProps) => {
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
      } else if (fileType.startsWith('video/')) {
        // setVideo 대신 insertContent 사용
        editor
          .chain()
          .focus()
          .insertContent(`<video controls src="${data}" class="max-w-full"/>`)
          .run();
      } else {
        editor
          .chain()
          .focus()
          .insertContent(
            `<a href="${file.name}" download="${file.name}" target="_blank">${file.name}</a>`
          )
          .run();
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <EditorDropdown icon="TTIC_Photo" ariaLabel="파일 업로드">
        <EditorDropdownMenu
          icon="TTIC_Photo"
          ariaLabel="이미지 업로드"
          onClick={() => imageInputRef.current?.click()}
        />
        <EditorDropdownMenu
          icon="TTIC_Video"
          ariaLabel="비디오 업로드"
          onClick={() => videoInputRef.current?.click()}
        />
        <EditorDropdownMenu
          icon="TTIC_File"
          ariaLabel="파일 업로드"
          onClick={() => fileInputRef.current?.click()}
        />
      </EditorDropdown>

      {/* 숨겨진 input들 */}
      <input
        type="file"
        accept="image/*"
        ref={imageInputRef}
        style={{ display: 'none' }}
        onChange={(e) => e.target.files && handleFileInsert(e.target.files[0])}
      />
      <input
        type="file"
        accept="video/*"
        ref={videoInputRef}
        style={{ display: 'none' }}
        onChange={(e) => e.target.files && handleFileInsert(e.target.files[0])}
      />
      <input
        type="file"
        accept="*/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={(e) => e.target.files && handleFileInsert(e.target.files[0])}
      />
    </>
  );
};

FileUploadDropdown.displayName = 'FileUploadDropdown';
export default FileUploadDropdown;
