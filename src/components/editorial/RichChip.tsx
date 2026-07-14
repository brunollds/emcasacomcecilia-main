export interface RichChipProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: 'neutral' | 'destaque' | 'alerta';
  className?: string;
}

export function RichChip({
  children,
  icon,
  variant = 'neutral',
  className = '',
}: RichChipProps): React.ReactElement {
  const baseClasses = 'inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[13px] font-semibold align-baseline';

  const variantClasses = {
    neutral: 'bg-[#eef7f1] text-[#1a4d2e]',
    destaque: 'bg-[#fff4bf] text-[#7a5b00]',
    alerta: 'bg-[#fff3ee] text-[#b23a17]',
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {icon && <span className="flex-shrink-0 flex items-center">{icon}</span>}
      {children}
    </span>
  );
}
