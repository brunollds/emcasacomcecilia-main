import { EditorialReveal } from '@/components/editorial';

export interface RecipeJumpNavProps {
  hasFichaTecnica?: boolean;
  hasIngredientes?: boolean;
  hasModoDePreparo?: boolean;
  hasDicas?: boolean;
}

export function RecipeJumpNav({
  hasFichaTecnica = true,
  hasIngredientes = true,
  hasModoDePreparo = true,
  hasDicas = false,
}: RecipeJumpNavProps): React.ReactElement | null {
  const links = [
    { id: 'ficha-tecnica', label: 'Ficha Técnica', visible: hasFichaTecnica },
    { id: 'ingredientes', label: 'Ingredientes', visible: hasIngredientes },
    { id: 'modo-de-preparo', label: 'Modo de Preparo', visible: hasModoDePreparo },
    { id: 'dicas', label: 'Dicas', visible: hasDicas },
  ].filter((link) => link.visible);

  if (links.length === 0) {
    return null;
  }

  return (
    <EditorialReveal as="div" delay={0.28} className="mb-8 print:hidden">
      <nav aria-label="Atalhos da receita" className="rotate-[-0.35deg] rounded-xl bg-[#fff4bf] px-4 py-2.5 shadow-soft">
        <p className="flex flex-wrap items-center gap-2 text-[15px] text-[#1a4d2e]">
          <span className="font-semibold text-[#1a4d2e]">Ir para:</span>
          {links.map((link, index) => (
            <span key={link.id} className="flex items-center gap-2">
              {index > 0 && <span className="text-[#ff6b35]/40">·</span>}
              <a
                href={`#${link.id}`}
                className="rounded font-medium transition-colors hover:text-[#ff6b35] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#ff6b35] focus-visible:outline-none"
              >
                {link.label}
              </a>
            </span>
          ))}
        </p>
      </nav>
    </EditorialReveal>
  );
}
