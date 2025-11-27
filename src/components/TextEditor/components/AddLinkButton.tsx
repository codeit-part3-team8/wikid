import ToolbarButton from './base/ToolbarButton';
import { Editor } from '@tiptap/react';

interface AddLinkButtonProps {
  editor: Editor;
}

const AddLinkButton = ({ editor }: AddLinkButtonProps) => {
  const handleAddLink = () => {
    const url = prompt('링크 URL 입력');
    if (!url) return;

    try {
      new URL(url);
    } catch {
      alert('유효한 URL을 입력해주세요');
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    editor.chain().focus().insertContent(`<a href="${url}" target="_blank">${url}</a>`).run();
  };

  return <ToolbarButton icon="IC_Link" ariaLabel="add link" onClick={handleAddLink} />;
};

AddLinkButton.displayName = 'AddLinkButton';
export default AddLinkButton;
