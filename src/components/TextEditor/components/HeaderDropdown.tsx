'use client';

import { EditorDropdown, EditorDropdownMenu } from './base/EditorDropdown';
import { Editor } from '@tiptap/react';

interface HeaderDropdownProps {
  editor: Editor;
}

const HeaderDropdown = ({ editor }: HeaderDropdownProps) => {
  const setHeading = (level: 1 | 2 | 3 | undefined) => {
    if (level) {
      editor.chain().focus().toggleHeading({ level }).run();
    } else {
      editor.chain().focus().setParagraph().run(); // 본문으로
    }
  };

  return (
    <EditorDropdown icon="TTIC_H1" ariaLabel="Header">
      <EditorDropdownMenu icon="TTIC_H1" ariaLabel="header 1" onClick={() => setHeading(1)} />
      <EditorDropdownMenu icon="TTIC_H2" ariaLabel="header 2" onClick={() => setHeading(2)} />
      <EditorDropdownMenu icon="TTIC_H3" ariaLabel="header 3" onClick={() => setHeading(3)} />
      <EditorDropdownMenu icon="TTIC_Text" ariaLabel="본문" onClick={() => setHeading(undefined)} />
    </EditorDropdown>
  );
};

HeaderDropdown.displayName = 'HeaderDropdown';
export default HeaderDropdown;
