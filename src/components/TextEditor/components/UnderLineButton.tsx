import ToolbarButton from './base/ToolbarButton';
import { Editor } from '@tiptap/react';

interface UnderlineButtonProps {
  editor: Editor;
}

const UnderlineButton = ({ editor }: UnderlineButtonProps) => {
  return (
    <ToolbarButton
      icon="TTIC_Underline"
      ariaLabel="Underline"
      onClick={() => editor.chain().focus().toggleUnderline().run()}
    />
  );
};

UnderlineButton.displayName = 'UnderlineButton';
export default UnderlineButton;
