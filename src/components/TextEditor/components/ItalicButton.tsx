import ToolbarButton from './base/ToolbarButton';
import { Editor } from '@tiptap/react';

interface ItalicButtonProps {
  editor: Editor;
}

const ItalicButton = ({ editor }: ItalicButtonProps) => {
  return (
    <ToolbarButton
      icon="TTIC_Italic"
      ariaLabel="italic"
      onClick={() => editor.chain().focus().toggleItalic().run()}
    />
  );
};

ItalicButton.displayName = 'ItalicButton';
export default ItalicButton;
