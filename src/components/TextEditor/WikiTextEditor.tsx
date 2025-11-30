'use client';

import TextEditor from './TextEditor';
import Toolbar from './Toolbar';
import { useCommonEditor } from './editorConfig';

interface WikiTextEditorProps {
  content: string;
  name?: string;
  onContentChange?: (content: string) => void;
}

const WikiTextEditor = ({ content, name = '이지동', onContentChange }: WikiTextEditorProps) => {
  const editor = useCommonEditor(content, onContentChange);
  if (!editor) return null;

  return (
    <div className="flex h-full w-84 flex-col md:w-156 lg:w-280">
      <div className="bg-grayscale-100 flex items-center gap-44 rounded-md px-8 py-3">
        <span>{name}</span>
        <Toolbar editor={editor} />
      </div>
      <TextEditor editor={editor} />
    </div>
  );
};

export default WikiTextEditor;
