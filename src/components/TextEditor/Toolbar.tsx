'use client';

import { Editor } from '@tiptap/react';
import { tv } from 'tailwind-variants';
import HeaderDropdown from './components/HeaderDropdown';
import AlignmentDropdown from './components/AlignmentDropdown';
import ListDropdown from './components/ListDropdown';
import ImageUploadButton from './components/ImageUploadButton';
import BoldButton from './components/BoldButton';
import DividerButton from './components/DividerButton';
import ItalicButton from './components/ItalicButton';
import UnderlineButton from './components/UnderLineButton';
import TextColorButton from './components/TextColorButton';
import TableDropdown from './components/TableDropdown';
import AddLinkButton from './components/AddLinkButton';
import Divider from '../Divider/Divider';

const barStyle = tv({
  base: 'flex flex-wrap gap-3 w-fit items-center',
});

interface ToolbarProps {
  editor: Editor;
  onSetThumbnail?: (v: string) => void; // 썸네일 지정
}

const Toolbar = ({ editor, onSetThumbnail }: ToolbarProps) => {
  if (!editor) return null;

  return (
    <div className={barStyle()}>
      <div className="flex gap-1">
        <HeaderDropdown editor={editor} />
        <BoldButton editor={editor} />
        <ItalicButton editor={editor} />
        <UnderlineButton editor={editor} />
        <TextColorButton editor={editor} />
      </div>
      <Divider orientation="vertical" className="hidden md:block" />
      <div className="flex gap-1">
        <AlignmentDropdown editor={editor} />
        <ListDropdown editor={editor} />
        <DividerButton editor={editor} />
      </div>
      <Divider orientation="vertical" className="hidden md:block" />
      <div className="flex gap-1">
        <TableDropdown editor={editor} />
        <ImageUploadButton editor={editor} onSetThumbnail={onSetThumbnail} />
        <AddLinkButton editor={editor} />
      </div>
    </div>
  );
};

Toolbar.displayName = 'Toolbar';
export default Toolbar;
