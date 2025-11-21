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
  return (
    <div className={`editor-wrapper ${className}`} onClick={handleWrapperClick}>
      <EditorContent editor={editor} className="editor-style" />
    </div>
  );
};

TextEditor.className = 'TextEditor';
export default TextEditor;
