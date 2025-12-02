import { useCommonEditor } from '@/components/TextEditor/editorConfig';
import { EditorContent } from '@tiptap/react';
import { useEffect } from 'react';

const BoardContent = ({ content }: { content: string }) => {
  const editor = useCommonEditor(content);

  // 에디터 인스턴스 정리
  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  return <EditorContent editor={editor} className="editor-style" />;
};

export default BoardContent;
