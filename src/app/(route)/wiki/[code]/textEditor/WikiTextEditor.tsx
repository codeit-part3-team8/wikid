'use client';

import TextEditor from '@/components/TextEditor/TextEditor';
import Toolbar from '@/components/TextEditor/Toolbar';
import { useCommonEditor } from '@/components/TextEditor/editorConfig';
import styles from './WikiTextEditor.module.css';
import editorStyles from './WikiTextEditorContent.module.css';

interface WikiTextEditorProps {
  content: string;
  onContentChange?: (content: string) => void;
  name: string;
}

const WikiTextEditor = ({ content, onContentChange, name }: WikiTextEditorProps) => {
  const handleContentChange = (newContent: string) => {
    onContentChange?.(newContent);
  };

  const editor = useCommonEditor(content, handleContentChange);
  if (!editor) return null;

  return (
    <div className="flex h-full w-full flex-col">
      {/* 툴바 영역 */}
      <div
        className={`bg-grayscale-100 flex rounded-md px-6 ${styles.toolbarWrapper}`}
        style={{
          minHeight: '60px',
          height: 'auto',
        }}
      >
        <div className="flex w-full min-w-0 items-start py-4">
          {/* 데스크탑에서만 이름 표시 */}
          <div className="hidden h-full items-center min-[1025px]:flex">
            <span className="shrink-0 text-lg font-medium">{name}</span>
          </div>
          <div
            className={`min-w-0 flex-1 ${styles.toolbarContainer}`}
            style={{
              marginLeft: 'clamp(0px, 3vw, 120px)', // 데스크톱에서만 여백, 태블릿 이하에서는 0px
            }}
          >
            <div className="flex items-center">
              <Toolbar editor={editor} />
            </div>
          </div>
        </div>
      </div>

      {/* 텍스트 에디터 영역 */}
      <div className="mt-6 flex-1 md:mt-8 lg:mt-12">
        <div className={`wiki-text-editor-container ${editorStyles.wikiEditor}`}>
          <TextEditor editor={editor} className="wiki-editor-wrapper" />
        </div>
      </div>
    </div>
  );
};

export default WikiTextEditor;
