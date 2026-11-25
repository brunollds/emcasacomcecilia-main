# Caixa do DICA: desenho do Gemini (aprovado pelo Bruno em 24/11/2026)

Task 8 de `docs/superpowers/plans/2026-11-24-dica-no-site.md`.

## `DicaLauncher.tsx`: a barra fechada

- Só monta no cliente, depois que o `ConsentBanner` foi resolvido (`readConsent() !== null`).
- **Celular (`< sm`):**
  - Barra flutuante `fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 min-h-[52px] rounded-2xl border-2 border-marinho bg-white p-1.5 ps-2.5 shadow-[4px_4px_0_var(--color-marinho)]`.
  - Selo `bg-amarelo-cupom border border-marinho px-2 py-1 rounded-lg text-[11px] font-black text-marinho` com "✦ DICA".
  - Chamada "Tem nos parceiros? Pergunte aqui" e, embaixo, o subtexto "Ex: tem whey?, tem sofá?".
  - Pílula `bg-laranja text-marinho font-extrabold px-3 py-2 rounded-xl text-xs` com "Perguntar".
  - Botão "–" de 44 × 44 px que recolhe a barra numa pílula lateral compacta ("✦ DICA · Tem cupom?") até o fim da sessão.
- **Computador (`sm:`):** centralizada embaixo, `sm:inset-x-0 sm:mx-auto sm:bottom-5 sm:w-[360px]` (a pílula recolhida também, com `sm:w-fit`).
- **Variante `variant="festival"`, em `/blackfriday`:** superfície `#150d2c`, borda `#d9ff43`, texto `#f7f5ff`, sombra `4px 4px 0 #ff2e93` e pílula `#ff2e93` com texto branco.

## `DicaPanel.tsx`: a gaveta aberta

- **Funcionamento:** `<dialog>` nativo aberto com `showModal()`. Fecha com Esc e com o clique fora da caixa, e devolve o foco ao botão. Animações só dentro de `motion-safe:`.
- **Celular:** bottom-sheet `inset-x-0 bottom-0 mt-auto w-full max-h-[85dvh] rounded-t-3xl border-t-2 border-x-2 border-marinho bg-creme`.
- **Computador:** centralizada embaixo, `sm:inset-x-0 sm:mx-auto sm:bottom-5 sm:w-[400px] sm:max-h-[min(640px,82dvh)] sm:rounded-2xl sm:border-2 sm:shadow-[6px_6px_0_var(--color-marinho)]`.
- **Cabeçalho:** `bg-marinho text-white`, com:
  - o selo amarelo "✦ DICA";
  - o título "Dica · Parceiros & Códigos";
  - o subtítulo "Só marcas afiliadas · Sem preços nem estoque";
  - o botão fechar, de 44 × 44 px.
- **Atalhos no topo:** chips horizontais (`min-h-9`) com perguntas prontas: "Tem whey?", "Tem sofá?" e "Skincare coreano?".
- **Cartões (`DicaCard`):**
  - Moldura: `.recorte` (`border-2 border-dashed border-marinho bg-white rounded-xl p-3`) com a `.recorte-tesoura` e o ícone `<Scissors />`.
  - Botão: `CopyAndOpenStoreLink` (`placement="dica"`, com `returnNotice`) quando há `card.code`; nas lojas só de link, o `CouponStoreLink` com "Ir à loja".
  - `card.warnings` aparecem num aviso amarelo (`bg-amarelo-cupom/35 border border-marinho/30 rounded-lg p-2 text-xs font-semibold`).
  - Um link discreto leva a `card.couponPageUrl`.
- **Sem parceiro ou no limite (`dicasUrl`):** cartão branco com `border-2 border-marinho` e botão largo `min-h-11 w-full rounded-xl border-2 border-marinho bg-amarelo-cupom font-extrabold text-marinho` com "Procurar no Dicas ↗" (`target="_blank" rel="noopener noreferrer"`).
- **Campo da pergunta:**
  - `<input maxLength={200}>` com `text-base sm:text-sm`: 16 px no celular, para o Safari do iOS não dar zoom ao focar.
  - Botão "Enviar": `min-h-11 bg-laranja border-2 border-marinho font-extrabold text-marinho`.
  - Logo abaixo, o aviso fixo de privacidade, com link para `/privacidade`.

## Cuidados acrescentados pelo Gemini depois da Fase 2 (24/11)

- **Cartão sem `card.code`** (Proton, Starlink e o item excluído, como a fórmula de 0 a 12 meses da Nestlé Nutre):
  - borda sólida `border-2 border-marinho`, sem `.recorte` e sem `<Scissors />`, como em `/cupons`, onde a tesoura só aparece com código copiável;
  - mostra o `card.codeLabel`, o `card.note` e os `card.warnings`, com o `CouponStoreLink`.
- **`DicaLauncher.tsx`:** o snapshot do servidor do `useSyncExternalStore` devolve `null`, como o `ConsentBanner`. Assim nenhum HTML entra no prerender de `/`, `/cupons`, `/reviews` e `/blackfriday`.
- **Clarity:** `data-clarity-mask="true"` no contêiner da conversa do `DicaPanel` (pergunta mostrada, cartões e respostas). O
  Clarity já mascara o `<input>`, mas a pergunta que vira texto na tela seria gravada. A `/privacidade` (seção 9) promete
  que o texto da caixa aparece mascarado nas gravações.
