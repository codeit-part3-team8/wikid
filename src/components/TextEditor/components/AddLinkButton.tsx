import { Editor } from '@tiptap/react';
import { useState } from 'react';
import { useModal } from '@/hooks/useModal';

import BaseModal from '@/components/Modal/BaseModal';
import ToolbarButton from './base/ToolbarButton';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';

interface AddLinkButtonProps {
  editor: Editor;
}

const AddLinkButton = ({ editor }: AddLinkButtonProps) => {
  const { openModal, closeModal, isOpen } = useModal();
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const isYoutube = (url: string) => /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(url);
  // 유튜브 링크일 경우, 임베드 영상 불러오도록 함

  const handleOpenModal = () => {
    setUrl('');
    setText('');
    openModal();
  };

  const handleSubmit = () => {
    if (!url) return;

    try {
      new URL(url);
    } catch {
      alert('유효한 URL을 입력해주세요');
      return;
    }

    if (isYoutube(url)) {
      // 유튜브일 경우
      const contentText = text.trim() === '' ? url : text;
      const { from } = editor.state.selection;

      // 1. 대체 텍스트 삽입 및 링크 적용
      editor
        .chain()
        .focus()
        .insertContent(contentText)
        .setTextSelection({ from, to: from + contentText.length })
        .setLink({ href: url })
        .run();

      // 2. 링크 다음 위치로 이동 후 새 줄 추가
      const newPos = from + contentText.length;

      editor
        .chain()
        .focus()
        .setTextSelection(newPos) // 링크 끝으로 이동
        .insertContent('<p></p>') // 새 줄 추가
        .setYoutube(url) // CustomYoutube 노드 사용
        .run();

      closeModal();
      return;
    }

    // 일반 링크인 경우
    const contentText = text.trim() === '' ? url : text;
    const { from } = editor.state.selection; // 대체 텍스트에 링크를 걸기 위해 위치 탐색

    editor
      .chain()
      .focus()
      .insertContent(contentText)
      .setTextSelection({ from, to: from + contentText.length })
      .setLink({ href: url })
      .run();

    closeModal();
  };

  return (
    <>
      <ToolbarButton icon="IC_Link" ariaLabel="add link" onClick={handleOpenModal} />

      <BaseModal size="image" isOpen={isOpen} onClose={closeModal}>
        <div className="mt-3 flex flex-col items-center gap-4 p-4">
          <div className="flex w-full items-center gap-5">
            <p>링크 URL </p>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>

          <div className="flex w-full items-center gap-2">
            <p>대체 텍스트 </p>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="표시할 텍스트"
            />
          </div>

          <div className="flex w-full justify-end">
            <Button size="sm" onClick={handleSubmit}>
              확인
            </Button>
          </div>
        </div>
      </BaseModal>
    </>
  );
};

AddLinkButton.displayName = 'AddLinkButton';
export default AddLinkButton;
