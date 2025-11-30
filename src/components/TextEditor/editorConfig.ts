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

  // 이미지 크기 제한을 위한 커스텀 Image 익스텐션
  const CustomImage = Image.extend({
    addAttributes() {
      return {
        ...this.parent?.(),
        src: {
          default: null,
          parseHTML: (element) => {
            const src = element.getAttribute('src');
            // Base64 이미지 크기 체크하되, 너무 큰 경우에도 일단 표시하고 경고만 출력
            if (src && src.startsWith('data:') && src.length > 5242880) {
              // 5MB 제한 (5 * 1024 * 1024 bytes in base64)
              console.warn('이미지가 너무 큽니다. 크기를 5MB 이하로 줄여주세요.');
              // null을 반환하지 않고 src를 그대로 반환하여 이미지가 표시되도록 함
            }
            return src;
          },
          renderHTML: (attributes) => {
            if (!attributes.src) {
              return {};
            }
            return {
              src: attributes.src,
            };
          },
        },
        alt: {
          default: null,
          parseHTML: (element) => element.getAttribute('alt'),
          renderHTML: (attributes) => {
            if (!attributes.alt) {
              return {};
            }
            return {
              alt: attributes.alt,
            };
          },
        },
        title: {
          default: null,
          parseHTML: (element) => element.getAttribute('title'),
          renderHTML: (attributes) => {
            if (!attributes.title) {
              return {};
            }
            return {
              title: attributes.title,
            };
          },
        },
      };
    },

    parseHTML() {
      return [
        {
          tag: 'img[src]',
          getAttrs: (element) => {
            const src = element.getAttribute('src');
            // 빈 src는 무시
            if (!src) return false;
            return {
              src,
              alt: element.getAttribute('alt'),
              title: element.getAttribute('title'),
            };
          },
        },
      ];
    },

    renderHTML({ HTMLAttributes }) {
      return ['img', HTMLAttributes];
    },
  });

  const editor = useEditor({
    extensions: [
      // StarterKit에서 중복되는 익스텐션들 비활성화
      StarterKit.configure({
        // 중복되는 익스텐션 비활성화
        horizontalRule: false,
        strike: false,
        link: false, // Link 중복 방지
      }),
      // 커스텀 이미지 (기본 Image 대체)
      CustomImage,
      // 추가 익스텐션들
      Color,
      HorizontalRule,
      Link.configure({ openOnClick: true }),
      Placeholder.configure({ placeholder: '본문을 입력해주세요' }),
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
