# Rodada de voz, lote 02 (35 artigos, ids 246 a 327)

Segundo dos 8 lotes. As regras de todos os lotes estão em `../README.md`.

## Arquivos
- `resposta-muse.md`: a passada do Muse, 146 consertos (V 85, P 37, R 16, D 8).
- `passada-paralela.md`: a segunda passada cega, 145 consertos (P 71, V 56, D 9, R 9) e 2 achados de foto.
- `confronto.md`: 84 consertos no mesmo trecho, 62 só do Muse e 61 só da paralela.
- `lista.md`: os 35 artigos.

## Conferência do Claude (01/11/2026)
Script sobre os 290 consertos, contra a `origin/main` em `56349b9e`. Os 35 JSONs estão iguais ao SHA da revisão (`97c79ba6`).
- **Trecho literal:** 285 de 290. Não batem: o P de `nutren-just-protein-para-que-serve` (Muse), o P de `dolce-gusto-vs-nespresso-vs-3-coracoes` (paralela) e 3 de `sleepspray-kidz-iws-como-funciona-ritual-do-sono` (P do Muse, V2 e R da paralela). Procure pelo capítulo; se o trecho não existir, descarte.
- **Fato novo:** nenhum número fora do artigo, nenhuma data nova, nenhuma muleta.
- **Veredito D:** os "Se fosse para a minha casa, eu levaria" estão em Casa e Dolce Gusto, na forma permitida. Nenhum em suplemento.
- **Mais longo:** 5 do Muse, por 1 ou 2 caracteres. Aceitos.

## NÃO aplicar: consertos que apagam uso real
As duas passadas leram a regra principal do anexo ao contrário: ela proíbe **inventar** primeira pessoa, não apagar a que é real. Estes consertos tiram relato de uso que o artigo declara e ficam de fora:
- `adaptador-neo-start-o-que-e`, "Máquinas compatíveis": "Genio S Touch (a mesma que temos em casa)" fica (V-principal do Muse e V0 da paralela).
- `sleeptest-i-wanna-sleep-como-funciona`: o "já recebemos alguns produtos aqui em casa (como o Cobertor IWS Igloo)" e o "(que a gente tem aqui em casa)" ficam (os 2 V-principal do Muse; o 1º e o 3º V0 da paralela). O 2º V0 da paralela ("resolvemos traduzir tudo para PT limpo") pode entrar.
- `skincare-coreano-30-anos-rotina-iniciante-yesstyle`: o primeiro contato é dela, com vídeo. Ficam "o meu primeiro contato com os três" e "o que eu senti" (V16 do Muse), o "Minha filha, você fez 30 agora" (V10 da paralela) e o "a parte que eu mais gostei" (V-muletas do Muse e V16 da paralela). Sem o "eu", "a pele fica com toque aveludado" vira promessa de efeito, que a regra de beleza proíbe. Só o "Aí" do começo pode sair: "A parte que eu mais gostei vem depois de espalhar: …".

Podem entrar, porque tiram ressalva ou bastidor e não uso: os R de `poltrona-charles-eames-design-iconico-e-alternativas` (a Aurora, que não foi testada), de `dolce-gusto-vs-nespresso-qual-escolher`, de `dolce-gusto-vs-nespresso-vs-3-coracoes`, de `nutren-creatina-e-boa-comparativo-growth-ftw-cimed` e de `sleepspray-kidz-iws-como-funciona-ritual-do-sono`, mais o V16 de `melatonina-liquida-iws-ficha-tecnica`.

## Como aplicar
1. **Um trecho, uma versão:** onde as duas caem no mesmo trecho (84), a versão que mantém todos os fatos; empate, a mais curta.
2. **Só-Muse (62) e só-paralela (61) entram**, menos os da lista "NÃO aplicar".
3. **Quadro "Leve se / Passe se":** as passadas não o propuseram (rodaram antes da regra). Nos 8 guias de escolha e comparativos sem família e sem o campo, escreva o `decision` pelo Job 2, seção 5, a partir do "para quem / quando não" do texto: `dolce-gusto-genio-s-basic-vs-plus-vs-touch`, `sofa-modular-ou-retratil-qual-escolher`, `nutren-creatina-e-boa-comparativo-growth-ftw-cimed`, `dolce-gusto-vs-nespresso-vs-3-coracoes`, `qual-travesseiro-escolher-guia-linhas-i-wanna-sleep`, `dolce-gusto-vs-nespresso-qual-escolher`, `qual-cobertor-escolher-guia-linhas-i-wanna-sleep` e `guia-linha-ninho-nestle-leite-vs-composto-lacteo`. Na creatina e no Ninho, sem efeito no corpo.
4. **Cartão de destaque:** a regra de `../README.md` vale aqui também.
5. **Fotos:** os 2 achados (caixas do guia Starbucks; modular Damie sem foto com `href`) ficam para outro PR.
6. **Gates:** `node scripts/content/build-index.mjs`, `npm run validate:content` e `npm run test:article-d2`. Um PR para o lote, com o Gate 1 verde.

Backup: `muse-rev/backup-voz-lote-02` (fora do repositório). Desfazer = reverter o PR.
