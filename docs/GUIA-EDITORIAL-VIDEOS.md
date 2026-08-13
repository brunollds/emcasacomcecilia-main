# Guia editorial — como usar vídeos em receitas e artigos

**Aplicação:** domínio principal `emcasacomcecilia.com`
**Atualizado em:** 13/08/2026
**Responsáveis:** autoria editorial + revisão técnica antes do deploy

## 1. Decisão antes de escrever

Classifique cada vídeo antes de inseri-lo no conteúdo:

| Classificação | Quando usar | VideoObject | Página `/videos/` | Sitemap de vídeo |
|---|---|---:|---:|---:|
| `primary` | É o vídeo editorial que melhor representa o artigo | Sim | Sim | Sim |
| `secondary` | Demonstra um detalhe ou complementa o vídeo principal | Não | Não | Não |
| `decorative` | Loop de hero, ambientação ou movimento sem narrativa própria | Não | Não | Não |

Cada artigo ou receita pode ter **um único vídeo principal**. Se houver YouTube
e MP4 na mesma página, o YouTube é o principal; o MP4 deve ser `secondary` ou
`decorative`.

### 1.1 Não confundir vídeo com classe do artigo

`primary`, `secondary` e `decorative` classificam o papel do vídeo. Já `Review.category`
classifica o artigo de Guias & Análises em um dos quatro grupos definidos em
`GUIA-EDITORIAL-GUIAS-ANALISES.md`. Não copiar `category` para os metadados do vídeo nem
inferir a classe do artigo só porque existe player.

Vídeo pode documentar experiência própria, mas não a prova sozinho. No caso do Cobertor IWS
Igloo, o artigo pertence a Produtos & experiências porque o texto declara produto recebido,
primeiras impressões e uso noturno registrados em vídeo. O Aliv Head Gel IWS permanece em
Guias práticos & utilidade porque usa informações públicas sem experiência própria declarada.

## 2. O que a pessoa autora deve fornecer

Para qualquer vídeo principal, registrar:

- título específico do vídeo;
- descrição exclusiva que diga o que é mostrado;
- data em que o vídeo foi publicado;
- miniatura ou poster exclusivo do vídeo;
- URL do YouTube ou arquivo MP4 público;
- artigo ou receita ao qual o vídeo pertence;
- duração, quando conhecida;
- transcrição ou resumo fiel, quando houver fala relevante.

Não usar banner da marca, imagem genérica do artigo ou logo como miniatura.

## 3. Vídeo do YouTube

No conteúdo, usar uma URL de vídeo (`watch`, `youtu.be` ou `shorts`). Nunca usar
a URL do canal. O fluxo técnico é:

1. publicar `youtubeUrl` pela Central/editor;
2. registrar o ID e os metadados em `src/lib/video-metadata.js`;
3. criar uma definição única em `src/lib/video-pages.js`;
4. confirmar que a página `/videos/[slug]` aponta de volta ao artigo correto;
5. executar `npm run validate:video`.

O build não consulta a API do YouTube. Dados ausentes fazem a validação falhar.

## 4. MP4 hospedado no site

O pacote editorial deve conter:

- MP4 em caminho público estável;
- poster exclusivo (`webp`, `jpg` ou `png`);
- WebM opcional para compatibilidade/desempenho;
- texto alternativo quando o vídeo também aparece dentro do artigo.

Todo MP4 incorporado precisa ser classificado em `localVideoMetadata`. Somente
um MP4 `primary` recebe metadados completos e página de exibição. Loops devem
permanecer sem autoplay com som; quando usados como ambientação, são
`decorative` e não entram no schema nem no sitemap.

## 5. Como escrever o artigo

- Explique em texto as conclusões importantes; o vídeo não substitui o artigo.
- Introduza o vídeo no ponto em que ele ajuda a decisão ou o passo a passo.
- Não chame um loop decorativo de “vídeo principal”.
- O título e a descrição não devem prometer algo que o vídeo não mostra.
- Inclua contexto comercial e transparência de parceria no artigo, não na
  descrição técnica do vídeo.
- Se o mesmo vídeo servir a dois artigos, existe uma única página de exibição;
  escolha como origem o conteúdo mais completo e crie links editoriais nos
  demais.

## 6. O que torna uma página de exibição válida

A rota `/videos/[slug]` deve ter:

- um único player grande e visível logo após o H1;
- controles de reprodução;
- título e descrição iguais aos metadados editoriais;
- miniatura acessível ao Googlebot;
- `VideoObject` completo;
- canonical autorreferente;
- link para o artigo ou receita de origem;
- entrada `<video:video>` no sitemap.

Não colocar carrossel, loop decorativo ou outro player antes do vídeo principal.

## 7. Validação antes de publicar

```bash
npm run validate:video
npm run validate:content
npm run typecheck
npm run build
```

O resultado esperado do primeiro comando deve informar páginas editoriais e
páginas de exibição válidas. O build deve produzir `sitemap.xml` com namespace
`xmlns:video` e uma entrada por página `/videos/[slug]`.

## 8. Depois do deploy

1. conferir a página `/videos/[slug]` em desktop e celular;
2. testar o JSON-LD no Rich Results Test;
3. reenviar `https://emcasacomcecilia.com/sitemap.xml` no Search Console;
4. solicitar validação do problema “O vídeo não está em uma página de exibição”;
5. acompanhar em 2, 7 e 28 dias.

“Vídeo válido” em **Melhorias > Vídeos** confirma o schema. “Vídeo indexado” no
relatório de **Indexação de vídeo** confirma que o Google reconheceu uma página
de exibição. São verificações diferentes.

## 9. Central e arquivos JSON

Os metadados persistentes de vídeo ficam nos registros de código, não nos JSONs
geridos pela máquina de content-operations. O campo `youtubeUrl` pode seguir o
fluxo editorial normal. Qualquer correção manual em `content/` deve respeitar a
janela da Central e o `sourceHash`.
