import { clsx } from 'clsx';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-[#1a4d2e] text-white hover:bg-[#145a3f] shadow-md hover:shadow-lg',
        secondary: 'bg-[#ff6b35] text-white hover:bg-[#ff5722] shadow-md',
        accent: 'bg-[#ffd700] text-[#0f1419] hover:bg-[#ffc400] shadow-md',
        outline: 'border-2 border-[#1a4d2e] text-[#1a4d2e] hover:bg-[#1a4d2e] hover:text-white',
        ghost: 'hover:bg-gray-100',
        link: 'text-[#1a4d2e] underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2 text-sm',
        sm: 'h-9 rounded-md px-3 text-xs',
        lg: 'h-12 rounded-lg px-8 text-base',
        xl: 'h-14 rounded-full px-10 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return (
    <button
      className={clsx(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};

export { Button, buttonVariants };
