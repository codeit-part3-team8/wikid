import Button from '@/components/Button/Button';

interface EditActionButtonsProps {
  isSaving: boolean;
  onSave: () => void;
  onCancel: () => void;
  profileName: string;
  className?: string;
}

export function EditActionButtons({
  isSaving,
  onSave,
  onCancel,
  className,
}: Omit<EditActionButtonsProps, 'profileName'>) {
  return (
    <div className={`flex gap-2.5 ${className}`}>
      <Button
        variant="secondary"
        onClick={onCancel}
        className="border-primary-200! text-primary-200! text-lg-semibold! flex! h-10! min-w-0! items-center! justify-center! border! px-5! py-[11px]!"
      >
        취소
      </Button>
      <Button
        variant="primary"
        onClick={onSave}
        disabled={isSaving}
        className="text-lg-semibold! flex h-10! min-w-0! items-center justify-center px-5! py-[11px]!"
      >
        {isSaving ? '저장 중...' : '저장'}
      </Button>
    </div>
  );
}

export function MobileEditHeader({
  profileName,
  isSaving,
  onSave,
  onCancel,
}: EditActionButtonsProps) {
  return (
    <div
      className="bg-grayscale-100 absolute top-22 z-40 hidden rounded-md px-6 py-2.5 max-[1024px]:flex max-[1024px]:items-center max-[1024px]:justify-between max-[640px]:px-5"
      style={{
        left: 'clamp(20px, 6vw, 24px)',
        right: 'clamp(20px, 6vw, 24px)',
      }}
    >
      <h1 className="text-xl-semibold text-grayscale-500">{profileName || ''}</h1>
      <EditActionButtons isSaving={isSaving} onSave={onSave} onCancel={onCancel} />
    </div>
  );
}
