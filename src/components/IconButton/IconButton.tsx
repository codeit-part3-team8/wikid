import { IconMapTypes, IconSizeTypes } from '@/components/SVGIcon/icon';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import { ButtonHTMLAttributes, MouseEventHandler, forwardRef } from 'react';
import { style } from './IconButton.style';
import clsx from 'clsx';
import Link from 'next/link';

interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'onClick'> {
  icon: IconMapTypes;
  size?: IconSizeTypes;
  variant?: 'filled' | 'ghost';
  radius?: 'md' | 'full';
  disabled?: boolean;
  className?: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
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
      href,
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

    if (href) {
      const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
        onClick?.(e as React.MouseEvent<HTMLAnchorElement>);
      };
      return (
        <Link
          className={clsx(classes, className)}
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          onClick={handleClick}
        >
          <SVGIcon icon={icon} size={size} />
        </Link>
      );
    }

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
