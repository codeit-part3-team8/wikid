'use client';

import IconButton from '@/components/IconButton/IconButton';
import TextEditor from '@/components/TextEditor/TextEditor';
import Toolbar from '@/components/TextEditor/Toolbar';
import { useCommonEditor } from '@/components/TextEditor/editorConfig';
import { useEffect } from 'react';
import { useModal } from '@/hooks/useModal';

interface BoardTextEditorProps {
  beforeValue: string;
  onContentChange: (v: string) => void;
  onImageChange: (v: string) => void;
}

const BoardTextEditor = ({ beforeValue, onContentChange, onImageChange }: BoardTextEditorProps) => {
  const editor = useCommonEditor(beforeValue);
  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    if (!editor) return;

    editor.on('update', () => {
      const html = editor.getHTML();
      onContentChange(html);
    });
  }, [editor, onContentChange]);

  if (!editor) return null;

  return (
    <>
      <div className="flex h-full w-full flex-col justify-between">
        <TextEditor editor={editor} className="board custom-scrollbar overflow-auto" />
        <div className="border-grayscale-200 flex rounded-full border px-4 py-2 shadow-[0px_1px_2px_0px_#0000000D]">
          <Toolbar editor={editor} />
        </div>
      </div>
    </>
  );
};

BoardTextEditor.displayName = 'BoardTextEditor';
export default BoardTextEditor;
