import { clsx } from 'clsx';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-[#1a4d2e] text-white',
        secondary: 'bg-[#ff6b35] text-white',
        accent: 'bg-[#ffd700] text-[#0f1419]',
        outline: 'border border-gray-200 text-gray-600',
        popular: 'bg-red-500 text-white',
        new: 'bg-green-500 text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = ({ className, variant, ...props }: BadgeProps) => (
  <div className={clsx(badgeVariants({ variant }), className)} {...props} />
);

export { Badge, badgeVariants };
