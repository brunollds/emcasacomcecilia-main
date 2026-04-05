import { clsx } from 'clsx';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Card = ({ className, ...props }: CardProps) => (
  <div
    className={clsx(
      'rounded-2xl bg-white shadow-soft border border-gray-100',
      className
    )}
    {...props}
  />
);

const CardHeader = ({ className, ...props }: CardProps) => (
  <div className={clsx('p-5 pb-3', className)} {...props} />
);

const CardTitle = ({ className, ...props }: CardProps) => (
  <h3
    className={clsx(
      'font-heading font-semibold text-[#1a4d2e] leading-none',
      className
    )}
    {...props}
  />
);

const CardDescription = ({ className, ...props }: CardProps) => (
  <p className={clsx('text-sm text-gray-500 mt-1', className)} {...props} />
);

const CardContent = ({ className, ...props }: CardProps) => (
  <div className={clsx('p-5 pt-0', className)} {...props} />
);

const CardFooter = ({ className, ...props }: CardProps) => (
  <div className={clsx('p-5 pt-0 flex items-center', className)} {...props} />
);

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
