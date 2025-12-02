import Button from '@/components/Button/Button';

interface WikiHeaderProps {
  profileName: string;
  hasContent: boolean;
  hasEditPermission: boolean;
  isBeingEdited: boolean;
  isLoggedIn: boolean;
  onParticipate: () => void;
  onDisabledClick: () => void;
}

export default function WikiHeader({
  profileName,
  hasContent,
  hasEditPermission,
  isBeingEdited,
  isLoggedIn,
  onParticipate,
  onDisabledClick,
}: WikiHeaderProps) {
  if (hasEditPermission) return null;

  return (
    <div className="mb-8 flex w-full items-center justify-between max-[640px]:mb-6">
      <h1 className="responsive-text text-5xl-to-3xl text-weight-semibold text-grayscale-500 text-left">
        {profileName || ''}
      </h1>
      {hasContent && (
        <Button
          onClick={isBeingEdited ? onDisabledClick : onParticipate}
          disabled={isBeingEdited || !isLoggedIn}
          loading={isBeingEdited}
          variant={!isLoggedIn ? 'secondary' : 'primary'}
          size="md"
          className={`flex items-center justify-center whitespace-nowrap ${!isLoggedIn ? 'bg-grayscale-300! border-grayscale-300! text-white!' : ''}`}
          style={{
            width: '160px',
            height: '45px',
          }}
        >
          {isBeingEdited ? '편집 중' : '위키 참여하기'}
        </Button>
      )}
    </div>
  );
}
