'use client';
import { Editor } from '@tiptap/react';
import ToolbarButton from './ToobarButton';

interface ToolbarProps {
  editor: Editor;
}

const Toolbar = ({ editor }: ToolbarProps) => {
  return (
    <div className="flex gap-1 rounded-full border px-4 py-2">
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
      <ToolbarButton
        icon="TTIC_Coloring"
        onClick={() => {
          const color = prompt('텍스트 배경색 입력 (#RRGGBB)');
          if (color) editor.chain().focus().setColor(color).run();
        }}
      />
      <ToolbarButton
        icon="TTIC_Image"
        onClick={() => {
          const url = prompt('이미지 URL 입력');
          if (url) editor.chain().focus().setImage({ src: url }).run();
        }}
      />
      <ToolbarButton
        icon="IC_Link"
        onClick={() => {
          const url = prompt('링크 URL 입력');
          if (url) editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
        }}
      />
    </div>
  );
};

export default Toolbar;
