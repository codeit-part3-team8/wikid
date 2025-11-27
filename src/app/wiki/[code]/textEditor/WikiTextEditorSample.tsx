'use client';

import { useEffect } from 'react';
import TextEditor from '@/components/TextEditor/TextEditor';
import Toolbar from '@/components/TextEditor/Toolbar';
import { useCommonEditor } from '@/components/TextEditor/editorConfig';
import { wikiDefaultTemplate } from './WikiTemplate';
import './WikiTextEditorStyle.css';

interface WikiTextEditorProps {
  content: string;
}

const WikiTextEditor = ({ content }: WikiTextEditorProps) => {
  const editor = useCommonEditor(content || wikiDefaultTemplate);

  useEffect(() => {
    if (editor && !content) {
      editor.commands.setContent(wikiDefaultTemplate);
    }
  }, [editor, content]);

  if (!editor) return null;

  return (
    <div className="flex h-full w-full flex-col">
      {/* 툴바 영역 - 흰색 배경 */}
      <div className="border-grayscale-200 flex shrink-0 items-center justify-between rounded-md border bg-white px-8 py-3">
        <span className="text-grayscale-600 font-medium">이지동</span>
        <Toolbar editor={editor} />
      </div>

      {/* 1px 라인 */}
      <div className="bg-grayscale-200 h-px shrink-0"></div>

      {/* 텍스트 에디터 영역 - 툴바에서 65px 떨어진 영역 */}
      <div className="relative mt-16 flex-1">
        <TextEditor editor={editor} className="wiki-editor-wrapper h-full w-full" />
      </div>
    </div>
  );
};

export default WikiTextEditor;
