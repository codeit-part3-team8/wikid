import { tv } from 'tailwind-variants';

export const style = tv({
  base: 'flex justify-center items-center text-grayscale-400 hover:text-grayscale-500 hover:cursor-pointer transition-colors',
  variants: {
    variant: {
      filled: 'p-1 bg-grayscale-200 hover:bg-grayscale-300',
      ghost: '',
    },
    size: {
      xs: 'w-[18px] h-[18px]',
      sm: 'w-5 h-5',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-10 h-10',
    },
    radius: {
      md: 'rounded-md',
      full: 'rounded-full',
    },
    disabled: {
      true: 'cursor-not-allowed',
      false: '',
    },
  },
});
