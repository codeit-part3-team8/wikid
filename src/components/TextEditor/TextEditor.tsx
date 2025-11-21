'use client';

import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Toolbar from './Toolbar';

const TextEditor = () => {
  const [title, setTitle] = useState('');
  const [titleLength, setTitleLength] = useState(0);
  const [textLengthWithSpace, setTextLengthWithSpace] = useState(0);
  const [textLengthWithoutSpace, setTextLengthWithoutSpace] = useState(0);

  // TipTap Editor 초기화
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image,
      Link.configure({ openOnClick: true }),
    ],
    onUpdate: ({ editor }) => {
      const text = editor.getText();
      setTextLengthWithSpace(text.length);
      setTextLengthWithoutSpace(text.replace(/\s/g, '').length);
    },
    immediatelyRender: false,
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 30);
    setTitle(value);
    setTitleLength(value.length);
  };

  return (
    <div className="h-170 w-84 md:h-173 md:w-156 lg:h-211 lg:w-265">
      {/* 제목 */}
      <div>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={handleTitleChange}
          className="w-full rounded border p-2 text-lg"
        />
        <div className="text-right text-sm text-gray-500">{titleLength}/30</div>
      </div>
      {/* 글자 수 */}
      <div className="mt-1 text-sm text-gray-500">
        공백 포함: {textLengthWithSpace}글자 / 공백 제외: {textLengthWithoutSpace}글자
      </div>
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
