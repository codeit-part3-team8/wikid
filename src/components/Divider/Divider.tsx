import clsx from 'clsx';
import { tv } from 'tailwind-variants';

const style = tv({
  base: 'bg-grayscale-200 rounded-full',
  variants: {
    orientation: {
      horizontal: 'w-full h-px',
      vertical: 'h-full w-px',
    },
  },
});

interface DividerProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

const Divider = ({ className, orientation = 'horizontal' }: DividerProps) => {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={clsx(style({ orientation }), className)}
    />
  );
};

Divider.displayName = 'Divider';
export default Divider;
