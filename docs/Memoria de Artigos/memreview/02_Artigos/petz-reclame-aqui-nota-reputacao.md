---
titulo_provisorio: "Petz no Reclame Aqui: nota, reputação e o que mais gera reclamação"
seo_title: "Petz no Reclame Aqui: nota e principais reclamações"
slug_sugerido: "petz-reclame-aqui-nota-reputacao"
parceiro: "[[Petz]]"
parceiro_slug: "petz"
category: "confianca-reputacao"
reviewKind: "editorial"
type: "Análise de Reputação"
status: "publicado"
responsavel: "Job-2 (Claude Opus 5.5)"
proxima_acao: "reler o Reclame Aqui (6 e 12 meses) na revisão mensal de dezembro de 2026; depois de 30/11, conferir a fonte do CNPJ da sede"
bloqueado_por: "-"
data_criacao: "2026-11-11"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
affiliate: "petz"
coupon: "EMCASA"
---

# Briefing: Petz no Reclame Aqui (PZ3)

Terceiro artigo de onboarding. Modelo: [[simple-organic-reclame-aqui-nota-reputacao]]. Regras comuns em
[[cupom-petz-como-usar]] e números em [[petz-fatos-1111]], seção 2 (leitura de 11/11).

O que o leitor quer saber: a nota é boa, e o que dá errado quando dá. Os dados respondem os dois: reputação Ótima há
seis meses e quase todas as reclamações respondidas, mas o problema mais citado é atraso na entrega, e ração é o
produto mais citado. O artigo transforma isso em cuidado prático na hora de comprar.

## Busca (autocompletar de 11/11/2026)
"petz reclame aqui", "petz reclamações", "petz atraso entrega", "petz não entregou" (lista em
[[Pesquisas-de-Pauta]]).

## O que só este artigo dá (busca de 11/11/2026)

- **A busca confunde as empresas:** para "petz reclame aqui reclamações atraso entrega", o topo trouxe reclamações de
  outras empresas de nome parecido e de outras lojas pet, e nenhuma página da Petz. Quem procura a reputação da Petz
  pode estar lendo a de outra empresa. O capítulo 5 responde isso.
- **Números lidos e com período:** as páginas de terceiros citam a nota sem período. O artigo dá a tabela da releitura,
  com o período na legenda.

## Esqueleto
1. Resposta rápida: reputação Ótima no Reclame Aqui, nota 8,3 em seis meses, 89% de reclamações resolvidas; o
   problema mais citado é atraso na entrega. Sem preço; os números com o período no texto, não na resposta.
2. A nota em números: tabela com os indicadores do perfil "Petz - Loja Online" (período de 01/05 a 31/10/2026 na
   legenda, que conta como uma data).
3. Como a nota mudou: as abas de 12 meses, 2025 e 2024, se a releitura mostrar diferença. Sem as abas, a seção sai.
4. O que mais gera reclamação: atraso na entrega, ração, pedido incompleto, troca de item errado. Sem citar cliente
   pelo nome; resumir o padrão das reclamações lidas.
5. Qual perfil é a Petz: o Reclame Aqui separa "Petz - Loja Online" e "Petz - Loja Física" (7,9), e há empresas de
   nome parecido com perfil próprio. O artigo ensina a achar o perfil certo pelo nome exato e pelo CNPJ. Citar outra
   empresa por nome só depois de conferir no navegador que o CNPJ é outro, sem julgar a reputação dela.
6. Como evitar dor de cabeça: conferir o prazo na sacola pelo CEP, Entrega Expressa e o crédito em dobro no atraso,
   Retire na Loja, conferir o pedido na entrega, prazos de troca (7, 30 e 90 dias) e o Alô Petz.
7. Se der problema: os canais da Petz primeiro (Meus Pedidos, Alô Petz, loja física), depois o Reclame Aqui.
8. Perguntas frequentes: "a Petz é confiável no Reclame Aqui?", "a Petz responde as reclamações?", "o que fazer se o
   pedido não chegou?".

## Metadados sugeridos
- **title:** Petz no Reclame Aqui: nota, reputação e o que mais gera reclamação
- **metaDescription (rascunho):** EMCASA dá 10% OFF no site e no app da Petz. Veja a nota no Reclame Aqui, o que
  mais gera reclamação e como evitar atraso. (131 caracteres)
- **relatedArticles:** petz-e-confiavel, cupom-petz-como-usar, black-friday-petz

## Plano de imagens
Capa pelo Job 6 (modelo de reputação). Corpo: print do painel do Reclame Aqui, tirado na semana do texto pelo
navegador (o print de 11/11 não foi guardado).

## Cuidados
- Os números mudam todo mês: o JSON leva os da releitura, com o período na legenda.
- Nada de "a Petz é a melhor do setor"; o 10º lugar no ranking da categoria só entra com a posição exata.
- Comparar com a Cobasi só pela nota que aparece na página (8,3), sem link nem cupom dela.

## Decisões do Bruno (11/11/2026)

- **GO:** "pode seguir". Decisões completas no fim de [[cupom-petz-como-usar]].
- **Pet em casa:** a equipe não tem. O texto lê as reclamações, sem experiência própria de compra ou de pet.

## Publicação (11/11/2026)

- No ar em 11/11/2026, id 902: PR #862 (squash `4d50b265`), release `4d50b265` (deploy 6cb1d996, build 01a1cc1f), só PT. Smoke: a página, o sitemap e o llms.txt com 200, o `covers:check` ok e as imagens da Petz com 200 pelo `/_next/image`; IndexNow no mesmo lote do release; captura 43090561036 aprovada pelo Bruno.
- Título: "Petz no Reclame Aqui: nota, reputação e o que mais gera reclamação". seoTitle: "Petz no Reclame Aqui: nota e principais reclamações".
- Revisão externa (Farol, ChatGPT) em 11/11, com o parecer consolidado em `docs/auditoria-copy-artigos/petz-revisao-farol-20261111/` (local, fora do git). Cada ponto foi conferido no navegador antes de entrar; o CNPJ do rodapé (filial 0013-42) e o AUAU3 da companhia combinada vieram dessa conferência.
- Pendente: Revisão mensal de dezembro de 2026: reler as abas de 6 e 12 meses do perfil Petz - Loja Online (nota, resolvidas, voltariam a fazer negócio) e atualizar a tabela e a resposta rápida se mudarem.
- Pendente: Depois de 30/11: o texto cita o regulamento da Black Friday como lugar do CNPJ da sede. Se a página sair do ar, trocar a fonte.

## Imagens (aprovadas pelo Bruno em 11/11/2026)

- **Capa:** `/images/reviews/petz/petz-reclame-aqui-nota-reputacao-capa.webp` (`imageFit: contain`), 1600 × 900, gerador de capas do repositório com a foto oficial do produto na Petz.
- **Alt da capa:** Pacote da ração Golden Fórmula Senior e o topo do perfil Petz - Loja Online no Reclame Aqui, com a reputação Ótima.
- **Qual perfil é a Petz:** `/images/reviews/petz/petz-reclame-aqui-nota-reputacao-painel.webp` (contain, 1.2368). Alt: Painel do perfil Petz - Loja Online no Reclame Aqui, com a reputação Ótima e a nota 8,3 da aba de 6 meses. Legenda: Painel do perfil no Reclame Aqui, com a aba de 6 meses aberta.
- **Origem:** fotos oficiais das páginas de produto da Petz e prints do próprio site e do Reclame Aqui, capturados no navegador do app em 11/11 na resolução original (o site e a CDN da Petz dão 403 no curl). Sem geração por IA. Folha de aprovação em `docs/auditoria-copy-artigos/petz-onboarding-20261111/FOLHA-APROVACAO-IMAGENS.html` (local, fora do git).

## Capa v2 (11/11/2026)

- **Capa:** `/images/reviews/petz/petz-reclame-aqui-nota-reputacao-capa-v2.webp` (`imageFit: contain`).
- **Alt:** Filhote de cachorro no colo de uma mulher, em foto institucional do Adote Petz, ao lado da chamada Petz no Reclame Aqui.
- **Origem:** foto institucional do Adote Petz, filhote no colo de uma mulher; não é cliente identificada nem prova de adoção ou atendimento. Sem geração por IA.
- **Lote 28 do piloto de capas (sequência 9 do Codex, revisão independente do GPT-6.1 Terra):** aprovado pelo Bruno em 11/11/2026 e entregue em `docs/auditoria-capas/ENTREGA-24-HEROES-SEQUENCIA-9-CLAUDE.zip` no checkout principal: painel verde à esquerda, Sharp e Segoe UI, sem a faixa de baixo, no padrão vigente das capas (não é exceção nova ao Job 6). A capa anterior (`/images/reviews/petz/petz-reclame-aqui-nota-reputacao-capa.webp`) fica no CDN, sem uso como capa.
