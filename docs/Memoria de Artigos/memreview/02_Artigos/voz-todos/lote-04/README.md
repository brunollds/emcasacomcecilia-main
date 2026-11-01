# Rodada de voz, lote 04 (35 artigos, ids 426 a 460)

Quarto dos 8 lotes. As regras de todos os lotes estão em `../README.md`.

## Arquivos
- `resposta-muse.md`: a passada do Muse, 112 consertos (P 52, V 47, D 13) e quadros.
- `passada-paralela.md`: a segunda passada cega, 109 consertos (V 48, P 33, R 16, D 12) e 18 quadros.
- `confronto.md`: 66 consertos no mesmo trecho, 46 só do Muse e 43 só da paralela.
- `lista.md`: os 35 artigos. Nenhum é de família.

## Conferência do Claude (01/11/2026)
Script sobre os 221 consertos, contra a `origin/main` em `07c269c3` (com o lote 03 aplicado). Só `promocao-insider-selecao-com-cupom` mudou desde a base da revisão (`dadfb2a0`): a chave duplicada já foi corrigida no #464, então o achado dela neste lote está resolvido.
- **Trecho literal:** 218 de 221. Não batem: o P de `clea-store-e-confiavel` (nas duas passadas) e o P de `lejour-ou-icasei` (paralela). Procure pelo capítulo; se não existir, descarte.
- **Uso real:** nenhum conserto apaga uso. Os 6 que tiram primeira pessoa tiram "não testamos/não avaliamos", o "(contas nossas)" que vira o rótulo "Conta nossa:" ou o "nossa" de "na nossa leitura". Podem entrar.
- **Fato novo:** nenhum número, data ou muleta nova. Os 4 "R$" novos repetem preço que já está no artigo; fora da resposta rápida, aceitos.
- **Veredito D:** "Se fosse para a minha casa" em Casa e Lejour ("Se fosse para o meu casamento", mesma forma); nenhum "eu levaria" em suplemento.
- **Mais longo:** 20, quase todos por 1 a 3 caracteres ou pelo veredito. Aceitos.

## Fórmulas e compostos lácteos infantis: sem quadro e sem veredito de escolha
`nanlac-supreme-ou-ninho-fases`, `nanlac-supreme-pro-ou-aptanutri-profutura` e `nanlac-supreme-pro-ou-comfor` comparam produtos para crianças de 1 a 3 anos. Neles:
- **Não entra o quadro "Leve se / Passe se"**, das duas passadas. Um quadro de compra para alimento de criança pequena empurra a escolha, e a venda desses produtos tem regra própria (NBCAL). Decisão do Claude, a confirmar com o Bruno.
- **O D não entra.** O capítulo continua abrindo com "A decisão é do pediatra" e segue com os perfis pelo rótulo; a frase "para quem procura X, a escolha é Y" sai.
- Os consertos V e P desses três entram normalmente.

## Quadro "Leve se / Passe se"
- **Entram** nos guias e comparativos do lote, fora os três acima. Onde as duas passadas propõem, junte numa lista de até 3 frases por lado.
- **Opcionais:** os quadros que a paralela pôs em páginas de Black Friday e de cupom (`black-friday-black-skull`, `black-friday-dr-peanut`, `black-friday-max-titanium`, `black-friday-probiotica`, `cupom-clea-store-como-usar`). Aplique só se a frase decide uma compra; em Black Friday, nada que dependa de preço que ainda vai mudar.
- Em suplemento (Nutren, Max, Black Skull, Probiótica, Dr. Peanut), sem efeito no corpo.

## Como aplicar
1. **Um trecho, uma versão:** nos 66 do mesmo trecho, a versão que mantém todos os fatos; empate, a mais curta.
2. **Só-Muse (46) e só-paralela (43) entram**, com as ressalvas acima.
3. **Gates:** `node scripts/content/build-index.mjs`, `npm run validate:content` e `npm run test:article-d2`. Um PR para o lote, com o Gate 1 verde.

Backup: `muse-rev/backup-voz-lote-04` (base `dadfb2a0`, fora do repositório). Desfazer = reverter o PR.
