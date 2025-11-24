import Button from '@/components/Button/Button';

interface UploadButtonProps {
  disabled: boolean;
}

const UploadButton = ({ disabled }: UploadButtonProps) => {
  return (
    <div className="absolute right-2 bottom-4 w-30">
      <Button size="lg" className="h-11 pt-0 pr-0 pb-0 pl-0" disabled={disabled}>
        댓글 등록
      </Button>
    </div>
  );
};

UploadButton.displayName = 'UploadButton';
export default UploadButton;
