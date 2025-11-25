'use client';

import { Editor } from '@tiptap/react';
import ToolbarButton from './ToolbarButton';
import { tv } from 'tailwind-variants';
import { useRef } from 'react';

const barStyle = tv({
  base: 'flex gap-1 w-fit items-center',
});

interface ToolbarProps {
  editor: Editor;
  variant?: 'outlined';
}

const Toolbar = ({ editor, variant = 'outlined' }: ToolbarProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!editor) return null;

  // 파일 삽입
  const handleFileInsert = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
          .insertContent(`<a href="${file.name}" target="_blank">${file.name}</a>`)
          .run();
      }
    };
    reader.readAsDataURL(file);
  };

  // 링크 url 입력 시 썸네일 불러옴
  const handleAddLink = async () => {
    const url = prompt('링크 URL 입력');
    if (!url) return;

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    editor.chain().focus().insertContent(`<a href="${url}" target="_blank">${url}</a>`).run();
  };

  return (
    <div className={barStyle()}>
      <div>
        <ToolbarButton icon="TTIC_Bold" onClick={() => editor.chain().focus().toggleBold().run()} />
        <ToolbarButton
          icon="TTIC_Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <ToolbarButton
          icon="TTIC_Underline"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />
        <ToolbarButton
          icon="TTIC_Coloring"
          onClick={() => {
            const color = prompt('텍스트 배경색 입력 (#RRGGBB)');
            if (color) editor.chain().focus().setColor(color).run();
          }}
        />
      </div>

      {/* Alignments */}
      <ToolbarButton
        icon="TTIC_AlignmentLeft"
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
      />
      <ToolbarButton
        icon="TTIC_AlignmentCenter"
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
      />
      <ToolbarButton
        icon="TTIC_AlignmentRight"
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
      />
      <ToolbarButton
        icon="TTIC_Bullet"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      />
      <ToolbarButton
        icon="TTIC_Numbering"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      />
      {/* 가로선 */}
      <ToolbarButton
        icon="IC_Alarm"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      />
      {/* 표 */}
      <ToolbarButton
        icon="IC_Alarm"
        onClick={() =>
          editor.chain().focus().insertTable({ rows: 2, cols: 2, withHeaderRow: true }).run()
        }
      />
      {/* 파일 업로드 */}
      <ToolbarButton icon="IC_Alarm" onClick={() => fileInputRef.current?.click()} />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileInsert}
      />

      <ToolbarButton icon="IC_Link" onClick={handleAddLink} />
    </div>
  );
};

Toolbar.displayName = 'Toolbar';
export default Toolbar;
