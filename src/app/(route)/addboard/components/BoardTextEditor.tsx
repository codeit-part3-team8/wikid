'use client';

import TextEditor from '@/components/TextEditor/TextEditor';
import Toolbar from '@/components/TextEditor/Toolbar';
import { useCommonEditor } from '@/components/TextEditor/editorConfig';
import { useEffect, useState } from 'react';

interface BoardTextEditorProps {
  beforeValue: string;
  onContentChange: (v: string) => void;
  onImageChange: (v: string) => void;
}

const BoardTextEditor = ({ beforeValue, onContentChange, onImageChange }: BoardTextEditorProps) => {
  const editor = useCommonEditor(beforeValue);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');

  useEffect(() => {
    if (!editor) return;

    editor.on('update', () => {
      const html = editor.getHTML();
      onContentChange(html);
    });
  }, [editor, onContentChange]);

  useEffect(() => {
    onImageChange(thumbnailUrl); // 썸네일 URL 변경될 때 부모로 전달
  }, [thumbnailUrl, onImageChange]);

  if (!editor) return null;

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <TextEditor editor={editor} className="board custom-scrollbar overflow-auto" />
      <div className="border-grayscale-200 flex rounded-full border px-4 py-2 shadow-[0px_1px_2px_0px_#0000000D]">
        {/* Toolbar에 onSetThumbnail 전달 */}
        <Toolbar editor={editor} onSetThumbnail={setThumbnailUrl} />
      </div>
    </div>
  );
};

BoardTextEditor.displayName = 'BoardTextEditor';
export default BoardTextEditor;
