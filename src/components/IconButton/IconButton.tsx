import { IconMapTypes } from '@/components/SVGIcon/icon';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import { ButtonHTMLAttributes, MouseEventHandler, forwardRef } from 'react';
import { style } from './IconButton.style';
import clsx from 'clsx';

interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'onClick'> {
  icon: IconMapTypes;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'filled' | 'ghost';
  radius?: 'md' | 'full';
  disabled?: boolean;
  className?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}
const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      size = 'md',
      variant = 'ghost',
      radius = 'full',
      disabled = false,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const classes = style({
      variant,
      radius,
      disabled,
    });

    return (
      <button
        className={clsx(classes, className)}
        onClick={onClick}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        <SVGIcon icon={icon} size={size} />
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
export default IconButton;
