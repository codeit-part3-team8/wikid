import { useCommonEditor } from '@/components/TextEditor/editorConfig';
import { EditorContent } from '@tiptap/react';

const BoardContent = ({ content }: { content: string }) => {
  const editor = useCommonEditor(content);

  return <EditorContent editor={editor} className="editor-style" />;
};

export default BoardContent;
