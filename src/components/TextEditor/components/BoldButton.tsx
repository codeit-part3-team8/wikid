import ToolbarButton from './base/ToolbarButton';
import { Editor } from '@tiptap/react';

interface BoldButtonProps {
  editor: Editor;
}

const BoldButton = ({ editor }: BoldButtonProps) => {
  return (
    <ToolbarButton
      icon="TTIC_Bold"
      ariaLabel="bold"
      onClick={() => editor.chain().focus().toggleBold().run()}
    />
  );
};

BoldButton.displayName = 'BoldButton';
export default BoldButton;
