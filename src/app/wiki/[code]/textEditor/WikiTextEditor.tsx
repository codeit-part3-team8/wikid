'use client';

import TextEditor from '@/components/TextEditor/TextEditor';
import Toolbar from '@/components/TextEditor/Toolbar';
import { useCommonEditor } from '@/components/TextEditor/editorConfig';
import styles from './WikiTextEditor.module.css';

interface WikiTextEditorProps {
  content: string;
  onContentChange?: (content: string) => void;
}

const WikiTextEditor = ({ content }: WikiTextEditorProps) => {
  const editor = useCommonEditor(content);
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
          <div className="flex h-full items-center">
            <span className="shrink-0 text-sm font-medium">이지동</span>
          </div>
          <div
            className={`min-w-0 flex-1 ${styles.toolbarContainer}`}
            style={{
              marginLeft: 'clamp(15px, 3vw, 120px)',
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
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* 에디터 제목 스타일 */
              .ProseMirror h1,
              .ProseMirror h2,
              .ProseMirror h3 {
                border-bottom: 1px solid #e5e7eb;
                padding-bottom: 8px;
                margin-bottom: 16px;
                font-weight: 600;
              }
              .ProseMirror p {
                color: #6b7280;
                line-height: 1.6;
              }
              .ProseMirror h1 + p,
              .ProseMirror h2 + p,
              .ProseMirror h3 + p {
                color: #9ca3af;
              }
            `,
          }}
        />
        <TextEditor editor={editor} />
      </div>
    </div>
  );
};

export default WikiTextEditor;
