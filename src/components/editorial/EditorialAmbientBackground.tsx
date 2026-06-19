export interface EditorialAmbientBackgroundProps {
  children: React.ReactNode;
  variant?: 'recipe' | 'review';
  className?: string;
  as?: React.ElementType;
}

export function EditorialAmbientBackground({
  children,
  variant = 'review',
  className = '',
  as: Component = 'article',
}: EditorialAmbientBackgroundProps): React.ReactElement {
  const Tag = Component as React.ElementType;

  return (
    <Tag className={`editorial-ambient-bg editorial-ambient-bg-${variant} ${className}`}>
      {children}
    </Tag>
  );
}
