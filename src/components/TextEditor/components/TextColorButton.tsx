import ToolbarButton from './base/ToolbarButton';
import { Editor } from '@tiptap/react';
import React, { useState } from 'react';
import Popover from './base/EditorPopover';

interface TextColorButtonProps {
  editor: Editor;
}

const TextColorButton = ({ editor }: TextColorButtonProps) => {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState('#000000');

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    editor.chain().focus().setColor(newColor).run();
  };

  return (
    <div className="relative">
      <ToolbarButton
        icon="TTIC_ColorText"
        ariaLabel="text coloring"
        onClick={() => setOpen((v) => !v)}
      />
      <Popover open={open} onClose={() => setOpen(false)}>
        <div className="flex items-center gap-3 p-3">
          <input
            type="color"
            value={color}
            onChange={(e) => handleColorChange(e.target.value)}
            className="h-8 w-8 cursor-pointer"
          />

          <input
            type="text"
            value={color}
            onChange={(e) => handleColorChange(e.target.value)}
            className="border-grayscale-400 w-20 rounded border px-1 text-sm focus:outline-none"
          />
        </div>
      </Popover>
    </div>
  );
};

TextColorButton.displayName = 'TextColorButton';
export default TextColorButton;
