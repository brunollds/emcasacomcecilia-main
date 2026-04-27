import { getCategoryIconSpec } from '@/lib/categoryIcons';

export default function CategoryIcon({ name, className = '', weight = 'regular' }) {
  const spec = getCategoryIconSpec(name);

  if (spec.type === 'emoji') {
    return (
      <span
        aria-hidden="true"
        className={`inline-flex items-center justify-center leading-none ${className}`}
      >
        {spec.value}
      </span>
    );
  }

  const Icon = spec.value;

  return <Icon weight={weight} className={className} aria-hidden="true" />;
}

