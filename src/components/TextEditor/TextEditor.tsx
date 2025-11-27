'use client';

import { EditorContent, Editor } from '@tiptap/react';

interface TextEditorProps {
  editor: Editor;
  className?: string;
  content?: string;
}

const TextEditor = ({ className = '', editor }: TextEditorProps) => {
  const handleWrapperClick = () => {
    editor.commands.focus();
  };

  // WikiTextEditor에서 사용되는 경우 커스텀 스타일 적용하지 않음 (CSS에서 처리)
  const editorClass = className.includes('wiki-editor-wrapper') ? '' : 'editor-style';

  return (
    <div className={`editor-wrapper ${className}`} onClick={handleWrapperClick}>
      <EditorContent editor={editor} className={editorClass} />
    </div>
  );
};

TextEditor.className = 'TextEditor';
export default TextEditor;
