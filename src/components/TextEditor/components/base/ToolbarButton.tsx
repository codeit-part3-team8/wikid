import IconButton from '@/components/IconButton/IconButton';
import { IconMapTypes } from '@/components/SVGIcon/icon';

interface ToolbarButtonProps {
  className?: string;
  icon: IconMapTypes;
  ariaLabel: string;
  onClick: () => void;
}

const ToolbarButton = ({ className, icon, ariaLabel, onClick }: ToolbarButtonProps) => {
  return <IconButton icon={icon} onClick={onClick} aria-label={ariaLabel} className={className} />;
};

ToolbarButton.displayName = 'ToolbarButton';
export default ToolbarButton;
