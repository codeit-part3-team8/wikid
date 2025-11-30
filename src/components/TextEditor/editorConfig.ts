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
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { EditorView } from '@tiptap/pm/view';
import StarterKit from '@tiptap/starter-kit';
import Strike from '@tiptap/extension-strike';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';

export const useCommonEditor = (
  content?: string,
  onChange?: (html: string) => void // ✅ 여기 추가
) => {
  const prevRef = useRef('');

  // 이미지 업로드 함수
  const uploadImage = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/images/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('이미지 업로드에 실패했습니다.');
      }

      const result = await response.json();
      return result.data?.url || result.url;
    } catch (error) {
      console.error('이미지 업로드 오류:', error);
      throw error;
    }
  };

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

  // 이미지 업로드가 가능한 커스텀 Image 익스텐션
  const CustomImage = Image.extend({
    addAttributes() {
      return {
        ...this.parent?.(),
        src: {
          default: null,
          parseHTML: (element) => {
            const src = element.getAttribute('src');
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

    // 이미지 붙여넣기와 드롭 처리
    addProseMirrorPlugins() {
      return [
        new Plugin({
          key: new PluginKey('imageUpload'),
          props: {
            handlePaste: (view: EditorView, event: ClipboardEvent) => {
              const items = Array.from(event.clipboardData?.items || []);
              const imageItem = items.find((item: DataTransferItem) =>
                item.type.startsWith('image/')
              );

              if (imageItem) {
                event.preventDefault();
                const file = imageItem.getAsFile();
                if (file) {
                  uploadImage(file)
                    .then((url) => {
                      const { schema } = view.state;
                      const node = schema.nodes.image.create({ src: url });
                      const transaction = view.state.tr.replaceSelectionWith(node);
                      view.dispatch(transaction);
                    })
                    .catch((error) => {
                      console.error('이미지 업로드 실패:', error);
                    });
                }
                return true;
              }
              return false;
            },
            handleDrop: (view: EditorView, event: DragEvent) => {
              const files = Array.from(event.dataTransfer?.files || []);
              const imageFile = files.find((file: File) => file.type.startsWith('image/'));

              if (imageFile) {
                event.preventDefault();
                uploadImage(imageFile)
                  .then((url) => {
                    const { schema } = view.state;
                    const node = schema.nodes.image.create({ src: url });
                    const pos = view.posAtCoords({ left: event.clientX, top: event.clientY });
                    if (pos) {
                      const transaction = view.state.tr.insert(pos.pos, node);
                      view.dispatch(transaction);
                    }
                  })
                  .catch((error) => {
                    console.error('이미지 업로드 실패:', error);
                  });
                return true;
              }
              return false;
            },
          },
        }),
      ];
    },

    parseHTML() {
      return [
        {
          tag: 'img[src]',
          getAttrs: (element) => {
            const src = element.getAttribute('src');
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
        horizontalRule: false,
        strike: false,
        link: false,
      }),
      TextStyle,
      CustomImage,
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
      // Underline을 커스텀 이름으로 등록하여 충돌 방지
      Underline.extend({
        name: 'customUnderline',
      }).configure({
        HTMLAttributes: {
          class: 'custom-underline',
        },
      }),
    ],
    content: content || '',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const newHTML = editor.getHTML();
      if (newHTML !== prevRef.current) {
        prevRef.current = newHTML;
        onChange?.(newHTML);
      }
    },
  });

  return editor;
};
