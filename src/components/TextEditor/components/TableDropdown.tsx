'use client';

import { EditorDropdown, EditorDropdownMenu } from './base/EditorDropdown';
import { Editor } from '@tiptap/react';

interface TableDropdownProps {
  editor: Editor;
}

const TableDropdown = ({ editor }: TableDropdownProps) => {
  return (
    <EditorDropdown icon="TTIC_Table" ariaLabel="table">
      <EditorDropdownMenu
        icon="TTIC_Table"
        ariaLabel="Table"
        onClick={() =>
          editor.chain().focus().insertTable({ rows: 2, cols: 2, withHeaderRow: true }).run()
        }
      />
      <EditorDropdownMenu
        icon="TTIC_AddColumn"
        ariaLabel="add column"
        onClick={() => editor.chain().focus().addColumnAfter().run()}
      />
      <EditorDropdownMenu
        icon="TTIC_AddRow"
        ariaLabel="add row"
        onClick={() => editor.chain().focus().addRowAfter().run()}
      />
      <EditorDropdownMenu
        icon="IC_Delete"
        ariaLabel="delete table"
        onClick={() => editor.chain().focus().deleteTable().run()}
      />
    </EditorDropdown>
  );
};

TableDropdown.displayName = 'TableDropdown';
export default TableDropdown;
