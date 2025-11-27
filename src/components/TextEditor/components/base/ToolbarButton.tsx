import IconButton from '@/components/IconButton/IconButton';
import { IconMapTypes } from '@/components/SVGIcon/icon';

interface ToolbarButtonProps {
  icon: IconMapTypes;
  ariaLabel: string;
  onClick: () => void;
}

const ToolbarButton = ({ icon, ariaLabel, onClick }: ToolbarButtonProps) => {
  return <IconButton icon={icon} onClick={onClick} aria-label={ariaLabel} />;
};

ToolbarButton.displayName = 'ToolbarButton';
export default ToolbarButton;
