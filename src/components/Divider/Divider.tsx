import clsx from 'clsx';

interface DividerProps {
  className?: string;
}

const Divider = ({ className }: DividerProps) => {
  return (
    <div
      role="separator"
      className={clsx('bg-grayscale-200 h-px w-full rounded-full', className)}
    />
  );
};

Divider.displayName = 'Divider';
export default Divider;
