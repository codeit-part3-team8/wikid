import SVGIcon from '../SVGIcon/SVGIcon';
import { IconMapTypes } from '../SVGIcon/icon';

interface ToolbarButtonProps {
  icon: IconMapTypes;
  onClick: () => void;
}

const ToolbarButton = ({ icon, onClick }: ToolbarButtonProps) => {
  const btnClasses = 'hover:bg-grayscale-200 rounded-md px-1 py-1 transition-colors';
  return (
    <button
      onClick={onClick}
      className={btnClasses}
      type="button"
      aria-label={`에디터 ${icon} 기능`}
    >
      <SVGIcon icon={icon} size="lg" />
    </button>
  );
};

ToolbarButton.displayName = 'ToolbarButton';
export default ToolbarButton;
