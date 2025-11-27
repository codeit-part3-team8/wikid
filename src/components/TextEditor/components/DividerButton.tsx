import { Editor } from '@tiptap/react';
import ToolbarButton from './base/ToolbarButton';

interface DividerButtonProps {
  editor: Editor;
}

const DividerButton = ({ editor }: DividerButtonProps) => {
  return (
    <ToolbarButton
      icon="TTIC_Divider"
      ariaLabel="Divider"
      onClick={() => editor.chain().focus().setHorizontalRule().run()}
    />
  );
};

DividerButton.displayName = 'DividerButton';
export default DividerButton;
