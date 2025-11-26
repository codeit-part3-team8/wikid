'use client';

import { EditorDropdown, EditorDropdownMenu } from './base/EditorDropdown';
import { Editor } from '@tiptap/react';

interface ListDropdownProps {
  editor: Editor;
}

const ListDropdown = ({ editor }: ListDropdownProps) => {
  const setList = (list: 'bullet' | 'number') => {
    if (list === 'bullet') {
      editor.chain().focus().toggleBulletList().run();
    } else if (list === 'number') {
      editor.chain().focus().toggleOrderedList().run();
    } else {
      editor.chain().focus().setParagraph().run(); // 본문으로
    }
  };

  return (
    <EditorDropdown icon="TTIC_Bullet" ariaLabel="List">
      <EditorDropdownMenu
        icon="TTIC_Bullet"
        ariaLabel="dot list"
        onClick={() => setList('bullet')}
      />
      <EditorDropdownMenu
        icon="TTIC_Numbering"
        ariaLabel="number list"
        onClick={() => setList('number')}
      />
    </EditorDropdown>
  );
};

ListDropdown.displayName = 'ListDropdown';
export default ListDropdown;
