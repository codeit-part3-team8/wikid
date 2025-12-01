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
import { API } from '@/constants/api';
import { Node, CommandProps, mergeAttributes } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    youtube: {
      setYoutube: (url: string) => ReturnType;
    };
  }
}

// YouTube URL을 Embed URL로 변환하는 유틸함수
function convertToEmbedURL(url: string) {
  try {
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = url.match(youtubeRegex);
    if (match && match[1]) {
      // embed URL로 변환하여 반환
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url;
  } catch {
    return url;
  }
}

export const useCommonEditor = (content?: string, onChange?: (html: string) => void) => {
  const prevRef = useRef('');

  // 이미지 업로드 함수 (외부 API 호출)
  const uploadImage = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${API.IMAGE}`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_WIKID_ACCESS_TOKEN || ''}`,
        },
      });

      if (!response.ok) {
        throw new Error(`이미지 업로드에 실패했습니다: ${response.status} ${response.statusText}`);
      }

      const text = await response.text();
      if (!text.trim()) {
        throw new Error('이미지 업로드 응답이 비어있습니다.');
      }

      let result;
      try {
        result = JSON.parse(text);
      } catch {
        throw new Error(`이미지 업로드 응답이 JSON 형식이 아님: ${text.substring(0, 100)}...`);
      }

      return result.data?.url || result.url;
    } catch (error) {
      console.error('이미지 업로드 오류:', error);
      throw error;
    }
  };

  const NoNestedTableCell = TableCell.extend({
    content: '(paragraph | heading | bulletList | orderedList)+',
  });

  const NoNestedTableHeader = TableHeader.extend({
    content: '(paragraph | heading | bulletList | orderedList)+',
  });

  const CustomTable = Table.extend({
    addKeyboardShortcuts() {
      return {
        Backspace: ({ editor }) => {
          const { selection } = editor.state;
          const { $from } = selection;

          // 커서가 테이블 셀 내부에 있는지 확인 (내부에서는 텍스트만 삭제)
          let isInCell = false;
          for (let d = $from.depth; d > 0; d--) {
            const nodeName = $from.node(d).type.name;
            if (nodeName === 'tableCell' || nodeName === 'tableHeader') {
              isInCell = true;
              break;
            }
          }

          if (isInCell) {
            return false;
          }

          if ($from.parentOffset === 0 && $from.before() > 0) {
            const posBefore = $from.before();
            const nodeBefore = editor.state.doc.nodeAt(posBefore - 1);

            if (nodeBefore && nodeBefore.type.name === 'table') {
              const deleteFrom = posBefore - nodeBefore.nodeSize;

              editor
                .chain()
                .focus()
                .deleteRange({
                  from: deleteFrom,
                  to: $from.pos,
                })
                .run();

              return true;
            }
          }

          return false;
        },
      };
    },
  });

  const CustomImage = Image.extend({
    addAttributes() {
      return {
        ...this.parent?.(),
        src: { default: null },
        alt: { default: null },
        title: { default: null },
      };
    },

    // 이미지 붙여넣기 및 드롭 처리 로직 (업로드)
    addProseMirrorPlugins() {
      return [
        new Plugin({
          key: new PluginKey('imageUpload'),
          props: {
            // 붙여넣기 처리
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
            // 드롭 처리
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
      return [{ tag: 'img[src]' }];
    },
    renderHTML({ HTMLAttributes }) {
      return ['img', HTMLAttributes];
    },
  });

  // ========== Youtube Embed ==========
  const CustomYoutube = Node.create({
    name: 'youtube',
    group: 'block',
    content: '',
    atom: true,

    addAttributes() {
      return {
        src: {
          default: null,
        },
      };
    },

    parseHTML() {
      return [
        {
          tag: 'iframe[src*="youtube.com/embed"], iframe[src*="youtu.be/embed"]',
        },
      ];
    },

    renderHTML({ HTMLAttributes }) {
      // 기본 속성과 입력된 속성을 병합하여 iframe을 렌더링
      return [
        'iframe',
        mergeAttributes(
          {
            width: '560',
            height: '315',
            frameborder: '0',
            allow:
              'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
            allowfullscreen: 'true',
          },
          HTMLAttributes
        ),
      ];
    },

    addKeyboardShortcuts() {
      return {
        Backspace: ({ editor }) => {
          const { selection } = editor.state;

          if (selection.empty) {
            const { $from } = selection;

            if ($from.pos === 1) {
              // 커서가 문서의 첫 위치인지 확인
              return false;
            }

            if ($from.parentOffset === 0) {
              const posBefore = $from.before();
              const nodeBefore = editor.state.doc.nodeAt(posBefore - 1);

              if (nodeBefore && nodeBefore.type.name === 'youtube') {
                // 유튜브 노드면 삭제
                const deleteFrom = posBefore - nodeBefore.nodeSize;

                editor
                  .chain()
                  .focus()
                  .deleteRange({
                    from: deleteFrom,
                    to: $from.pos,
                  })
                  .run();

                return true;
              }
            }
          }
          return false;
        },
      };
    },

    addCommands() {
      return {
        setYoutube:
          (url: string) =>
          ({ tr, dispatch, editor }: CommandProps) => {
            const embedUrl = convertToEmbedURL(url);
            const node = editor.schema.nodes.youtube.create({ src: embedUrl });
            if (dispatch) {
              // 현재 선택 영역을 YouTube 노드로 대체하여 추가
              dispatch(tr.replaceSelectionWith(node).scrollIntoView());
            }

            return true;
          },
      };
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        strike: false,
        link: false,
      }),
      TextStyle,
      CustomImage,
      CustomYoutube,
      Color,
      HorizontalRule,
      Link.configure({ openOnClick: true }),
      Placeholder.configure({ placeholder: '본문을 입력해주세요' }),
      Strike,
      CustomTable,
      NoNestedTableCell,
      NoNestedTableHeader,
      TableRow,
      TextAlign.configure({ types: ['paragraph', 'heading', 'listItem'] }),
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
      const { selection } = editor.state;
      const youtubeRegex =
        /^(https?:\/\/(?:www\.)?(youtube\.com\/watch\?v=[\w-]+|youtu\.be\/[\w-]+))\s*$/;

      if (selection.empty) {
        const { $from } = selection;

        // $from이 존재하고, 깊이가 1보다 크거나 같을 때 (문서 루트가 아닐 때)
        if ($from.depth >= 1) {
          const parent = $from.parent;

          // 현재 문단/블록이 'paragraph'인지 확인
          if (parent.type.name === 'paragraph') {
            const parentText = parent.textContent;
            const urlMatch = parentText.match(youtubeRegex);

            // URL을 추출하여 URL 하나로만 구성되어 있는지 확인
            if (urlMatch) {
              const url = urlMatch[1];

              const tr = editor.state.tr;
              const node = editor.schema.nodes.youtube.create({ src: convertToEmbedURL(url) });

              const start = $from.start($from.depth);
              const end = $from.end($from.depth);

              tr.replaceRangeWith(start, end, node);
              editor.view.dispatch(tr);

              prevRef.current = editor.getHTML();

              return;
            }
          }
        }
      }

      // 일반적인 HTML 업데이트 로직
      const newHTML = editor.getHTML();
      if (newHTML !== prevRef.current) {
        prevRef.current = newHTML;
        onChange?.(newHTML);
      }
    },
  });

  return editor;
};
