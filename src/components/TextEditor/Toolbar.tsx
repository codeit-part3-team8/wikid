'use client';

import React from 'react';
import { Editor } from '@tiptap/react';

interface ToolbarProps {
  editor: Editor;
}

const Toolbar = ({ editor }: ToolbarProps) => {
  return (
    <div className="mt-2 flex flex-wrap gap-2 border-t pt-2">
      {/* Bold */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className="rounded border px-2 py-1"
      >
        Bold
      </button>

      {/* Italic */}
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className="rounded border px-2 py-1"
      >
        Italic
      </button>

      {/* Underline */}
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className="rounded border px-2 py-1"
      >
        Underline
      </button>

      {/* Alignments */}
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className="rounded border px-2 py-1"
      >
        Left
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className="rounded border px-2 py-1"
      >
        Center
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className="rounded border px-2 py-1"
      >
        Right
      </button>

      {/* Bullet List */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className="rounded border px-2 py-1"
      >
        점리스트
      </button>

      {/* Ordered List */}
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className="rounded border px-2 py-1"
      >
        숫자리스트
      </button>

      {/* Background Color */}
      <button
        onClick={() => {
          const color = prompt('텍스트 배경색 입력 (#RRGGBB)');
          if (color) editor.chain().focus().setColor(color).run();
        }}
        className="rounded border px-2 py-1"
      >
        배경색
      </button>

      {/* Image */}
      <button
        onClick={() => {
          const url = prompt('이미지 URL 입력');
          if (url) editor.chain().focus().setImage({ src: url }).run();
        }}
        className="rounded border px-2 py-1"
      >
        이미지
      </button>

      {/* Link */}
      <button
        onClick={() => {
          const url = prompt('링크 URL 입력');
          if (url) editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
        }}
        className="rounded border px-2 py-1"
      >
        링크
      </button>
    </div>
  );
};

export default Toolbar;
