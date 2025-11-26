// 문서 스타일링에 필요한 익스텐션들을 불러오고, 적용하는 파일입니다.
'use client';

import { Table } from '@tiptap/extension-table';
import { TableCell } from '@tiptap/extension-table';
import { TableHeader } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table';
import { TextStyle } from '@tiptap/extension-text-style';
import { useEditor } from '@tiptap/react';
import { useRef } from 'react';
import Color from '@tiptap/extension-color';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import Strike from '@tiptap/extension-strike';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';

export const useCommonEditor = (
  content?: string,
  onChange?: (html: string) => void // ✅ 여기 추가
) => {
  const prevRef = useRef('');

  // 표 관련 커스텀
  const CustomTable = Table.extend({
    // 중첩 표 생성 금지
    addOptions() {
      return {
        ...this.parent?.(),
        allowTableInTable: false,
      };
    },
    // 백스페이스로 삭제
    addKeyboardShortcuts() {
      return {
        Backspace: ({ editor }) => {
          const { $from } = editor.state.selection;
          let isInTable = false;
          for (let d = $from.depth; d > 0; d--) {
            if ($from.node(d).type.name === 'table') {
              isInTable = true;
              break;
            }
          }

          if (isInTable) {
            editor.chain().focus().deleteTable().run();
            return true;
          }
          return false;
        },
      };
    },
  });

  const editor = useEditor({
    extensions: [
      Color,
      HorizontalRule, // Divider
      Image, // 이미지 추가
      Link.configure({ openOnClick: true }),
      Placeholder.configure({ placeholder: '본문을 입력해주세요' }),
      StarterKit,
      Strike,
      CustomTable,
      TableCell,
      TableHeader,
      TableRow,
      TextAlign.configure({ types: ['paragraph', 'heading', 'listItem'] }),
      TextStyle,
      Underline,
    ],
    content: content || '',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const newHTML = editor.getHTML();
      if (newHTML !== prevRef.current) {
        prevRef.current = newHTML; // ✅ 새 값으로 업데이트
        onChange?.(newHTML); // 안전하게 호출
      }
    },
  });

  return editor;
};
