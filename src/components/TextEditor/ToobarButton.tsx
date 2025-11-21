import SVGIcon from '../SVGIcon/SVGIcon';
import { IconMapTypes } from '../SVGIcon/icon';

interface ToolbarButtonProps {
  icon: IconMapTypes;
  onClick: () => void;
}

const ToolbarButton = ({ icon, onClick }: ToolbarButtonProps) => {
  const btnClasses = 'hover:bg-grayscale-200 rounded-full px-2 py-1 transition-colors';
  return (
    <button onClick={onClick} className={btnClasses}>
      <SVGIcon icon={icon} size="lg" />
    </button>
  );
};

ToolbarButton.displayName = 'ToolbarButton';
export default ToolbarButton;
