'use client';

import { EditorDropdown, EditorDropdownMenu } from './base/EditorDropdown';
import { Editor } from '@tiptap/react';

interface AlignmentDropdownProps {
  editor: Editor;
}

const AlignmentDropdown = ({ editor }: AlignmentDropdownProps) => {
  const setAlignment = (align: 'left' | 'center' | 'right') => {
    editor.chain().focus().setTextAlign(align).run();
  };

  return (
    <EditorDropdown icon="TTIC_AlignmentCenter" ariaLabel="alignment">
      <EditorDropdownMenu
        icon="TTIC_AlignmentLeft"
        ariaLabel="left alignment"
        onClick={() => setAlignment('left')}
      />
      <EditorDropdownMenu
        icon="TTIC_AlignmentCenter"
        ariaLabel="center alignment"
        onClick={() => setAlignment('center')}
      />
      <EditorDropdownMenu
        icon="TTIC_AlignmentRight"
        ariaLabel="right alignment"
        onClick={() => setAlignment('right')}
      />
    </EditorDropdown>
  );
};

AlignmentDropdown.displayName = 'AlignmentDropdown';
export default AlignmentDropdown;
