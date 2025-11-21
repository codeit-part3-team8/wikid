'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Toolbar from './Toolbar';
import Placeholder from '@tiptap/extension-placeholder';

const TextEditor = () => {
  // TipTap Editor 초기화
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: '본문을 입력해주세요',
      }),
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image,
      Link.configure({ openOnClick: true }),
    ],
    immediatelyRender: false,
  });

  return (
    <div className="h-170 w-84 border md:h-173 md:w-156 lg:h-211 lg:w-265">
      {/* 본문 */}
      <div className="rounded border p-2">
        <EditorContent editor={editor} />
      </div>
      {/* 툴바 */}
      {editor && <Toolbar editor={editor} />}
    </div>
  );
};

export default TextEditor;
