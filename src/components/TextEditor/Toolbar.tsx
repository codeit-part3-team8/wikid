'use client';

import { Editor } from '@tiptap/react';
import { tv } from 'tailwind-variants';
import HeaderDropdown from './components/HeaderDropdown';
import AlignmentDropdown from './components/AlignmentDropdown';
import ListDropdown from './components/ListDropdown';
import FileUploadDropdown from './components/FileUploadDropdown';
import BoldButton from './components/BoldButton';
import DividerButton from './components/DividerButton';
import ItalicButton from './components/ItalicButton';
import UnderlineButton from './components/UnderLineButton';
import TextColorButton from './components/TextColorButton';
import TableDropdown from './components/TableDropdown';
import AddLinkButton from './components/AddLinkButton';

const barStyle = tv({
  base: 'flex gap-3 w-fit items-center',
});

interface ToolbarProps {
  editor: Editor;
  variant?: 'outlined';
}

const Toolbar = ({ editor }: ToolbarProps) => {
  if (!editor) return null;

  return (
    <div className={barStyle()}>
      <div className="flex gap-1">
        <HeaderDropdown editor={editor} />
        <BoldButton editor={editor} />
        <ItalicButton editor={editor} />
        <UnderlineButton editor={editor} />
      </div>
      <div className="flex gap-1">
        <TextColorButton editor={editor} />
      </div>
      <div className="flex gap-1">
        <AlignmentDropdown editor={editor} />
        <ListDropdown editor={editor} />
        <DividerButton editor={editor} />
        <TableDropdown editor={editor} />
      </div>
      <div className="flex gap-1">
        <FileUploadDropdown editor={editor} />
        <AddLinkButton editor={editor} />
      </div>
    </div>
  );
};

Toolbar.displayName = 'Toolbar';
export default Toolbar;
