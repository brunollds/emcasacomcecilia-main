# Guia de Identidade Visual — damie.emcasacomcecilia.com

Este documento orienta o agente responsável por construir `damie.emcasacomcecilia.com`,
garantindo alinhamento visual com o site principal `emcasacomcecilia.com`.

O agente tem permissão para ler e copiar qualquer arquivo referenciado aqui do
repositório `brunollds/emcasacomcecilia-main` (branch `main`).

---

## 1. Tecnologia

O site principal usa:
- **Next.js 16.1.4** — App Router, SSR (não usar `output: 'export'`)
- **React 19**
- **Tailwind CSS v4** — via `@import "tailwindcss"` (sem `tailwind.config.js`)
- **TypeScript** nos componentes `src/components/**` e `src/lib/`
- **JavaScript** nas páginas `src/app/**`
- **Lucide React** para ícones
- **Montserrat** como fonte (Google Fonts via `next/font/google`)

Recomendação: replicar a mesma stack para manter consistência máxima.

---

## 2. Paleta de Cores e Tokens

**Arquivo:** `src/app/globals.css`

Todos os tokens estão definidos no bloco `@theme inline {}`:

```
--color-verde-escuro: #1a4d2e   → cor primária / headings / botões CTA verde
--color-laranja:      #ff6b35   → cor secundária / CTAs / destaques / hover
--color-amarelo:      #ffd700   → accent / badges / texto em fundos escuros
--color-preto:        #0f1419   → texto principal
--color-branco:       #ffffff
--color-creme:        #fef9f3   → fundo claro das seções
--color-background:   #ffffff
--color-foreground:   #0f1419

Sombras:
--shadow-soft, --shadow-medium, --shadow-large

Cor de fundo do header/navbar/hero/footer:
#0f1d3a  (azul-marinho escuro — NÃO está como token, usado inline)
```

O arquivo `globals.css` também contém todas as animações usadas no site:
`animate-float`, `animate-float-slow`, `animate-ken-burns`, `animate-pulse-subtle`,
`animate-slide-up`, `animate-slide-down`, `animate-scale-in`, `animate-fade-in`.

---

## 3. Fonte

**Arquivo:** `src/app/layout.js` (linhas 1–12)

```js
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});
```

Aplicar no `<body>` como `className={montserrat.variable}`.
Usar `font-sans` ou `font-heading` nas classes Tailwind (ambos apontam para Montserrat via globals.css).

---

## 4. Header / Navbar

**Arquivo:** `src/components/Navbar.js`

O header é um componente `'use client'` com:
- Fundo: `#0f1d3a` (azul-marinho, fixo via `style`)
- Logo tipográfico: `em CASA com CECÍLIA` com font-size responsivo via `clamp()`
- Sticky no topo com `z-50`
- Efeito de sombra ao scroll (`scrolled` state)
- Busca de receitas (desktop e mobile)
- Links de navegação com destaque para "Receitas" e botões DAMIE/Dicas
- Menu mobile com bottom border

Para o site DAMIE, o header pode ser simplificado (sem busca de receitas) mas mantendo:
- O mesmo fundo `#0f1d3a`
- A logo tipográfica (ou adaptar para logo DAMIE)
- O mesmo esquema de cores nos links (branco / laranja `#ff6b35` / amarelo `#ffd700`)
- Mesmo comportamento sticky

**Links relevantes no Navbar:** vêm de `src/lib/data.ts` → `export const brandLinks`
(ver Seção 7 abaixo).

---

## 5. Footer

**Arquivo:** `src/components/Footer.js`

O footer é `'use client'` com:
- Fundo: `#0f1d3a` (mesmo do header)
- Logo tipográfica idêntica ao header
- Nav de links institucionais
- Ícones de redes sociais (SVG inline) em `#ff6b35` com hover

Os dados das redes sociais vêm de `src/lib/data.ts` → `export const socialMedias`.
Os SVGs dos ícones estão inline no próprio `Footer.js` (Youtube, Instagram, Facebook, TikTok, Kwai).

---

## 6. Componentes UI Reutilizáveis

**Diretório:** `src/components/ui/`

| Arquivo | Descrição |
|---------|-----------|
| `Button.tsx` | Botão com `class-variance-authority`, variantes primary/secondary |
| `Card.tsx` | Card base com `rounded-[2rem]`, `shadow-soft`, `border-gray-100` |
| `Badge.tsx` | Badge compacto para tags e categorias |
| `CategoryIcon.tsx` | Ícone de categoria (usa Phosphor icons) |

Todos usam `clsx` + `tailwind-merge` para className merging.

---

## 7. Links e URLs da Marca

**Arquivo:** `src/lib/data.ts` → `export const brandLinks`

Contém todas as URLs canônicas da marca:
- `brandLinks.damie` → URL do próprio site DAMIE
- `brandLinks.dicas` → canal de ofertas
- `brandLinks.instagram`, `.youtube`, `.tiktok`, etc.
- `brandLinks.contactEmail` → `contato@emcasacomcecilia.com`
- `brandLinks.mediaKit` → `https://mk.emcasacomcecilia.com`
- `brandLinks.whatsappGroup` → grupo de promoções

---

## 8. Padrões de Design a Replicar

### Seções escuras (header, hero, footer)
```
background: #0f1d3a
texto: white / white/78 / white/60
destaques: #ff6b35 (laranja) e #ffd700 (amarelo)
```

### Seções claras
```
background: #fef9f3 (creme) ou #ffffff
texto: #0f1419
```

### Cards
```
rounded-[2rem]   → borda muito arredondada
shadow-soft      → sombra suave
border border-black/5 ou border-black/8
hover: -translate-y-1 ou -translate-y-2 com shadow-medium/large
transition: duration-500
```

### Botões primários
```
bg-[#ff6b35] text-white rounded-full
hover: bg-[#ff5722]
```

### Botões secundários / outline
```
border border-[#1a4d2e] text-[#1a4d2e] rounded-full
hover: bg-[#1a4d2e] text-white
```

### Headings de seção
```
eyebrow: text-xs font-bold uppercase tracking-[0.18em] text-[#ff6b35]
h2: font-heading text-3xl font-bold text-[#0f1419]
```

---

## 9. Imagens e Logos Disponíveis

**Diretório:** `public/images/logos/`

- `logo-em-casa-com-cecilia.png` — logo principal
- `JVHp4mNUSUu0_YhHD_lgPQ-Photoroom.png` — logo sem fundo (PNG)
- `JVHp4mNUSUu0_YhHD_lgPQ.webp` — logo em webp

**Diretório:** `public/images/universe/`
- `damie-hero.jpg` — screenshot do site DAMIE (usado na seção MyLinks da home)

**Diretório:** `public/images/reviews/`
- `poltrona-levita.webp`, `poltrona-moon.webp`, `poltronas-reclinaveis-damie.webp`, `sofa-damie-na-caixa.jpg`
- Imagens de produto DAMIE já disponíveis para uso

---

## 10. Analytics e Tracking

Ao configurar o `damie.emcasacomcecilia.com`, manter os mesmos IDs:
- GA4: `G-LDLH63KJMP` (já cobre subdomínios se configurado no GA)
- Clarity: `r8u956l333`

Ver implementação em `src/components/Analytics.js` e `src/app/layout.js`.

---

## 11. Estrutura de Layout Recomendada

Seguir o padrão do `src/app/layout.js`:
```
<html lang="pt-BR">
  <body className={montserrat.variable}>
    [JSON-LD schemas estáticos]
    <Navbar />       ← ou versão simplificada
    {children}
    <Footer />       ← ou versão simplificada
    <Analytics />
    <Script clarity />
  </body>
</html>
```

---

## 12. Hospedagem

O subdomínio `damie.emcasacomcecilia.com` já existe na conta Hostinger
(order `1006219937`, username `u150185510`).

DNS já configurado: `damie` → `connect.hostinger.com.` (ALIAS).

Deploy via mesmo mecanismo:
`mcp__hostinger-mcp__hosting_deployJsApplication` com `domain: "damie.emcasacomcecilia.com"`

SSH para gestão: `ssh -p 65002 u150185510@46.202.145.2`
