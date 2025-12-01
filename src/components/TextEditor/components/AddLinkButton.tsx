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
  const [text, setText] = useState(''); // 대체 텍스트 추가
  const isYoutube = (url: string) => /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(url);

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
    const contentText = text.trim() === '' ? url : text;
    const { from } = editor.state.selection; // 현재 커서 위치 가져오기 (대체 텍스트에 링크 걸기 위함)

    // 텍스트 삽입 및 링크 적용
    editor
      .chain()
      .focus()
      .insertContent(contentText) // 텍스트 삽입
      .setTextSelection({ from, to: from + contentText.length }) // 텍스트 범위 선택
      .setLink({ href: url }) // 선택된 범위에 링크 생성
      .run();
    if (isYoutube(url)) {
      // 유튜브일 경우 iframe 삽입
      const videoId = url.replace(/.*v=/, '').replace('https://youtu.be/', '').split('&')[0];

      editor
        .chain()
        .focus()
        .insertContent(
          `${contentText}<iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/${videoId}"
            frameborder="0" 
            allowfullscreen
         ></iframe>`
        )
        .run();

      closeModal();
      return;
    }

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
