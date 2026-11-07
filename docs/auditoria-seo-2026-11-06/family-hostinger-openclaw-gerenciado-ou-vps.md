# Revisão independente — OpenClaw gerenciado ou VPS

Base: release `45ab7e43ea3ccd235f2c744a537aef4eb2ab383d`. Dez fontes e parecer de yesstyle_pt_en lidos individualmente; produção é a resposta HTTP capturada em 06/11/2026 no horário de São Paulo. Sugestões, sem alterações de conteúdo.

Fontes verificadas: [modelo de segurança OpenClaw](https://docs.openclaw.ai/gateway/security/trust-model), [reembolsos Hostinger](https://www.hostinger.com/support/9088216-what-is-hostinger-refund-policy/) e [comparação oficial](https://www.hostinger.com/support/how-to-get-started-with-openclaw-at-hostinger/). OpenClaw admite equipe com confiança mútua em um limite de confiança; usuários adversários precisam de gateways separados e idealmente isolamento de usuário/sistema. Hostinger conta os 180 dias a partir da conclusão do reembolso anterior de VPS, quando houve um; no gerenciado declara não haver root. Condições podem variar por produto, data e mercado.

## openclaw-hostinger-gere-ou-vps
Arquivo: `content/reviews/openclaw-hostinger-gere-ou-vps.json` · idioma `fr` · SHA-256 `08b57a7b4d81208e161780d2bc34bb48076bfc8305cc4abcc37a638f9e4b733d`.
Intenção: Comparar OpenClaw gerenciado e VPS por controle, manutenção, custo e adequação.

- **P1 — confiança, `contentSections[5].paragraphs[1]`, `contentSections[5].bullets[0]` e `decision.skipIf[2]`:** “**Plusieurs personnes vont utiliser l'assistant** (famille ou équipe) : le projet recommande un serveur par personne. Sur le VPS, c'est simple ; en géré, demandez à Hostinger combien d'instances un compte peut avoir.” / “Passez votre tour sur les deux si le même assistant doit servir plusieurs personnes : le projet recommande un serveur par personne.”. Diferenciar equipe de confiança de usuários adversários e seus limites; retirar a atribuição universal de um servidor por pessoa. Não sugerir que agentes compartilhados tenham isolamento entre membros.
- **P1 — reembolso VPS, `contentSections[3].postParagraphs[1]`:** “L'offre gérée donne 30 jours pour demander un remboursement. Sur le VPS, les 30 jours ne valent que si votre dernier remboursement de VPS a été demandé il y a plus de 180 jours. Un VPS de 12 mois ou plus inclut un domaine .cloud ou .tech gratuit la première année.” Retificar o marco para conclusão de reembolso anterior, quando houver, e remeter às exceções oficiais. Trecho presente no HTTP.
- **P2 — acesso root, `contentSections[2].comparisonTable.rows[2]`:** ["Accès root", "La page parle d'un accès à la ligne de commande, sans citer root", "Oui"]. Atualizar a comparação: a página oficial agora diz que o gerenciado não tem root, enquanto o VPS tem. Valor da célula observado no HTTP.

Preservar SONAR20 digitável, divulgação, observação explícita de que a equipe não usa OpenClaw e valores históricos como históricos; não substituir pelo nome de indicação antigo. Atribuição e condições comerciais atuais dependem do programa aplicável, sem novo checkout.

## openclaw-hostinger-gerenciado-ou-vps
Arquivo: `content/reviews/openclaw-hostinger-gerenciado-ou-vps.json` · idioma `pt` · SHA-256 `134d06e162208c0ac85c550d3c39f78204dd3a698753941871cc05a50fd134ed`.
Intenção: Comparar OpenClaw gerenciado e VPS por controle, manutenção, custo e adequação.

- **P1 — confiança, `contentSections[5].paragraphs[1]`, `contentSections[5].bullets[0]` e `decision.skipIf[2]`:** “**Mais de uma pessoa vai usar o assistente** (família ou equipe): o projeto recomenda um servidor por pessoa. No VPS, isso é direto; no gerenciado, pergunte à Hostinger quantas instâncias uma conta pode ter.” / “Passe se o mesmo assistente vai atender várias pessoas: o projeto recomenda um servidor por pessoa.”. Diferenciar equipe de confiança de usuários adversários e seus limites; retirar a atribuição universal de um servidor por pessoa. Não sugerir que agentes compartilhados tenham isolamento entre membros.
- **P1 — reembolso VPS, `contentSections[3].postParagraphs[2]`:** “O gerenciado tem 30 dias para pedir reembolso. No VPS, os 30 dias valem só se o último reembolso de VPS tiver sido pedido há mais de 180 dias. VPS de 12 meses ou mais leva um domínio .cloud ou .tech grátis no primeiro ano.” Retificar o marco para conclusão de reembolso anterior, quando houver, e remeter às exceções oficiais. Trecho presente no HTTP.
- **P2 — acesso root, `contentSections[2].comparisonTable.rows[4]`:** ["Acesso root", "A página fala em acesso à linha de comando, sem citar root", "Sim"]. Atualizar a comparação: a página oficial agora diz que o gerenciado não tem root, enquanto o VPS tem. Valor da célula observado no HTTP.

Revisão do parecer: o índice `[1]` originalmente indicado para o reembolso apontava para créditos de IA; o trecho real está em `[2]`. Aceita a substância após correção do campo; rejeitada a referência original.

Preservar SONAR20 digitável, divulgação, observação explícita de que a equipe não usa OpenClaw e valores históricos como históricos; não substituir pelo nome de indicação antigo. Atribuição e condições comerciais atuais dependem do programa aplicável, sem novo checkout.

## openclaw-hostinger-gestionado-o-vps
Arquivo: `content/reviews/openclaw-hostinger-gestionado-o-vps.json` · idioma `es` · SHA-256 `d83cf2f9dda53b0eb85f49082f29c2ae73d948aa938d2e99bccbc9e59f6c1c1f`.
Intenção: Comparar OpenClaw gerenciado e VPS por controle, manutenção, custo e adequação.

- **P1 — confiança, `contentSections[5].paragraphs[1]`, `contentSections[5].bullets[0]` e `decision.skipIf[2]`:** “**Más de una persona va a usar el asistente** (familia o equipo): el proyecto recomienda un servidor por persona. En el VPS, eso es directo; en el gestionado, pregúntale a Hostinger cuántas instancias puede tener una cuenta.” / “Descarta ambos si el mismo asistente va a atender a varias personas: el proyecto recomienda un servidor por persona.”. Diferenciar equipe de confiança de usuários adversários e seus limites; retirar a atribuição universal de um servidor por pessoa. Não sugerir que agentes compartilhados tenham isolamento entre membros.
- **P1 — reembolso VPS, `contentSections[3].postParagraphs[1]`:** “El plan gestionado tiene 30 días para pedir el reembolso. En el VPS, los 30 días valen solo si el último reembolso de VPS se pidió hace más de 180 días. Un VPS de 12 meses o más incluye un dominio .cloud o .tech gratis el primer año.” Retificar o marco para conclusão de reembolso anterior, quando houver, e remeter às exceções oficiais. Trecho presente no HTTP.
- **P2 — acesso root, `contentSections[2].comparisonTable.rows[2]`:** ["Acceso root", "La página habla de acceso a la línea de comandos, sin mencionar root", "Sí"]. Atualizar a comparação: a página oficial agora diz que o gerenciado não tem root, enquanto o VPS tem. Valor da célula observado no HTTP.

Preservar SONAR20 digitável, divulgação, observação explícita de que a equipe não usa OpenClaw e valores históricos como históricos; não substituir pelo nome de indicação antigo. Atribuição e condições comerciais atuais dependem do programa aplicável, sem novo checkout.

## openclaw-hostinger-gestito-o-vps
Arquivo: `content/reviews/openclaw-hostinger-gestito-o-vps.json` · idioma `it` · SHA-256 `7f9ff88592f736aa2c8e82a13a7c6c91a1c79e024903a1107c3e5e573e6e656f`.
Intenção: Comparar OpenClaw gerenciado e VPS por controle, manutenção, custo e adequação.

- **P1 — confiança, `contentSections[5].paragraphs[1]`, `contentSections[5].bullets[0]` e `decision.skipIf[2]`:** “**Più di una persona userà l'assistente** (famiglia o team): il progetto consiglia un server per persona. Nel VPS è semplice; nel gestito, chiedi a Hostinger quante istanze può avere un account.” / “Lascia perdere entrambi se lo stesso assistente deve servire più persone: il progetto consiglia un server per persona.”. Diferenciar equipe de confiança de usuários adversários e seus limites; retirar a atribuição universal de um servidor por pessoa. Não sugerir que agentes compartilhados tenham isolamento entre membros.
- **P1 — reembolso VPS, `contentSections[3].postParagraphs[1]`:** “Il gestito ha 30 giorni per chiedere il rimborso. Nel VPS, i 30 giorni valgono solo se l'ultimo rimborso VPS è stato richiesto più di 180 giorni fa. Un VPS di 12 mesi o più include un dominio .cloud o .tech gratis per il primo anno.” Retificar o marco para conclusão de reembolso anterior, quando houver, e remeter às exceções oficiais. Trecho presente no HTTP.
- **P2 — acesso root, `contentSections[2].comparisonTable.rows[2]`:** ["Accesso root", "La pagina parla di accesso alla riga di comando, senza citare root", "Sì"]. Atualizar a comparação: a página oficial agora diz que o gerenciado não tem root, enquanto o VPS tem. Valor da célula observado no HTTP.

Preservar SONAR20 digitável, divulgação, observação explícita de que a equipe não usa OpenClaw e valores históricos como históricos; não substituir pelo nome de indicação antigo. Atribuição e condições comerciais atuais dependem do programa aplicável, sem novo checkout.

## openclaw-hostinger-managed-or-vps-ja
Arquivo: `content/reviews/openclaw-hostinger-managed-or-vps-ja.json` · idioma `ja` · SHA-256 `5c35f950bfa6b5d43bf280bc7cead5c700865c143a5c105b297c447ff64de5a6`.
Intenção: Comparar OpenClaw gerenciado e VPS por controle, manutenção, custo e adequação.

- **P1 — confiança, `contentSections[5].paragraphs[1]`, `contentSections[5].bullets[0]` e `decision.skipIf[2]`:** “**複数の人が使う場合**（家族やチーム）：プロジェクトは一人につきサーバー一台を勧めています。VPS ならそれは簡単です。マネージドでは、一つのアカウントでインスタンスをいくつ持てるか、Hostinger に確認してください。” / “同じアシスタントを複数の人に使わせるなら見送ってください。プロジェクトは一人につきサーバー一台を勧めています。”. Diferenciar equipe de confiança de usuários adversários e seus limites; retirar a atribuição universal de um servidor por pessoa. Não sugerir que agentes compartilhados tenham isolamento entre membros.
- **P1 — reembolso VPS, `contentSections[3].postParagraphs[1]`:** “マネージドには 30 日間の返金期間があります。VPS では、最後の VPS 返金申請から 180 日以上たっている場合に限り、30 日間が適用されます。12 か月以上の VPS には、初年度に .cloud または .tech ドメインが無料でつきます。” Retificar o marco para conclusão de reembolso anterior, quando houver, e remeter às exceções oficiais. Trecho presente no HTTP.
- **P2 — acesso root, `contentSections[2].comparisonTable.rows[2]`:** ["root アクセス", "ページに書かれているのはコマンドラインへのアクセスで、root とは書かれていない", "あり"]. Atualizar a comparação: a página oficial agora diz que o gerenciado não tem root, enquanto o VPS tem. Valor da célula observado no HTTP.

Preservar SONAR20 digitável, divulgação, observação explícita de que a equipe não usa OpenClaw e valores históricos como históricos; não substituir pelo nome de indicação antigo. Atribuição e condições comerciais atuais dependem do programa aplicável, sem novo checkout.

## openclaw-hostinger-managed-or-vps-ko
Arquivo: `content/reviews/openclaw-hostinger-managed-or-vps-ko.json` · idioma `ko` · SHA-256 `45fbe4d89ea989ef7a233a8d234ce39583a7995c9601e99cd1d1464014cc8f71`.
Intenção: Comparar OpenClaw gerenciado e VPS por controle, manutenção, custo e adequação.

- **P1 — confiança, `contentSections[5].paragraphs[1]`, `contentSections[5].bullets[0]` e `decision.skipIf[2]`:** “**여러 사람이 쓰는 경우** (가족이나 팀): 프로젝트는 한 사람에 서버 하나를 권합니다. VPS에서는 쉽지만, 관리형에서는 한 계정에 인스턴스를 몇 개 둘 수 있는지 호스팅어에 문의하세요.” / “같은 어시스턴트를 여러 사람이 쓴다면 건너뛰세요. 프로젝트는 한 사람에 서버 하나를 권합니다.”. Diferenciar equipe de confiança de usuários adversários e seus limites; retirar a atribuição universal de um servidor por pessoa. Não sugerir que agentes compartilhados tenham isolamento entre membros.
- **P1 — reembolso VPS, `contentSections[3].postParagraphs[1]`:** “관리형은 30일 안에 환불을 요청할 수 있습니다. VPS는 마지막 VPS 환불 요청 후 180일이 지났을 때만 30일이 적용됩니다. 12개월 이상 VPS에는 첫해에 .cloud 또는 .tech 도메인이 무료로 따라옵니다.” Retificar o marco para conclusão de reembolso anterior, quando houver, e remeter às exceções oficiais. Trecho presente no HTTP.
- **P2 — acesso root, `contentSections[2].comparisonTable.rows[2]`:** ["root 접근", "페이지에는 명령줄 접근만 있고 root는 언급되지 않음", "예"]. Atualizar a comparação: a página oficial agora diz que o gerenciado não tem root, enquanto o VPS tem. Valor da célula observado no HTTP.

Preservar SONAR20 digitável, divulgação, observação explícita de que a equipe não usa OpenClaw e valores históricos como históricos; não substituir pelo nome de indicação antigo. Atribuição e condições comerciais atuais dependem do programa aplicável, sem novo checkout.

## openclaw-hostinger-managed-or-vps-zh-hans
Arquivo: `content/reviews/openclaw-hostinger-managed-or-vps-zh-hans.json` · idioma `zh-hans` · SHA-256 `dd35c6c769d19cdf629225bae9f0109f88cf0e2bf10f57156a5a2803826eeea4`.
Intenção: Comparar OpenClaw gerenciado e VPS por controle, manutenção, custo e adequação.

- **P1 — confiança, `contentSections[5].paragraphs[1]`, `contentSections[5].bullets[0]` e `decision.skipIf[2]`:** “**多人使用**（家人或团队）：项目建议每人一台服务器。VPS 上这很容易做到；托管版则要问 Hostinger，一个账户能有几个实例。” / “如果同一个助理要服务多个人，两者都别选：项目建议每人一台服务器。”. Diferenciar equipe de confiança de usuários adversários e seus limites; retirar a atribuição universal de um servidor por pessoa. Não sugerir que agentes compartilhados tenham isolamento entre membros.
- **P1 — reembolso VPS, `contentSections[3].postParagraphs[1]`:** “托管版有 30 天可申请退款。VPS 则只有在上一次 VPS 退款申请已超过 180 天时，才适用 30 天。12 个月及以上的 VPS 首年可免费获得一个 .cloud 或 .tech 域名。” Retificar o marco para conclusão de reembolso anterior, quando houver, e remeter às exceções oficiais. Trecho presente no HTTP.
- **P2 — acesso root, `contentSections[2].comparisonTable.rows[2]`:** ["root 访问", "页面只提到命令行访问，没有提到 root", "有"]. Atualizar a comparação: a página oficial agora diz que o gerenciado não tem root, enquanto o VPS tem. Valor da célula observado no HTTP.

Preservar SONAR20 digitável, divulgação, observação explícita de que a equipe não usa OpenClaw e valores históricos como históricos; não substituir pelo nome de indicação antigo. Atribuição e condições comerciais atuais dependem do programa aplicável, sem novo checkout.

## openclaw-hostinger-managed-or-vps-zh-hant
Arquivo: `content/reviews/openclaw-hostinger-managed-or-vps-zh-hant.json` · idioma `zh-hant` · SHA-256 `0a1b792b473029f2dac2b61505e3b88784e7b6835d71be1bf692f3bcadb77067`.
Intenção: Comparar OpenClaw gerenciado e VPS por controle, manutenção, custo e adequação.

- **P1 — confiança, `contentSections[5].paragraphs[1]`, `contentSections[5].bullets[0]` e `decision.skipIf[2]`:** “**多人使用**（家人或團隊）：專案建議一人一台伺服器。VPS 上很容易做到；託管方面，請向 Hostinger 確認一個帳戶能有幾個執行個體。” / “如果同一個助理要服務多個人，兩者都別選：專案建議一人一台伺服器。”. Diferenciar equipe de confiança de usuários adversários e seus limites; retirar a atribuição universal de um servidor por pessoa. Não sugerir que agentes compartilhados tenham isolamento entre membros.
- **P1 — reembolso VPS, `contentSections[3].postParagraphs[1]`:** “託管版有 30 天可申請退款。VPS 則只有在上一次 VPS 退款申請已超過 180 天時，才適用 30 天。12 個月以上的 VPS 首年可免費獲得一個 .cloud 或 .tech 網域。” Retificar o marco para conclusão de reembolso anterior, quando houver, e remeter às exceções oficiais. Trecho presente no HTTP.
- **P2 — acesso root, `contentSections[2].comparisonTable.rows[2]`:** ["root 存取", "頁面只提到命令列存取，沒有提到 root", "有"]. Atualizar a comparação: a página oficial agora diz que o gerenciado não tem root, enquanto o VPS tem. Valor da célula observado no HTTP.

Preservar SONAR20 digitável, divulgação, observação explícita de que a equipe não usa OpenClaw e valores históricos como históricos; não substituir pelo nome de indicação antigo. Atribuição e condições comerciais atuais dependem do programa aplicável, sem novo checkout.

## openclaw-hostinger-managed-or-vps
Arquivo: `content/reviews/openclaw-hostinger-managed-or-vps.json` · idioma `en` · SHA-256 `abbd41c8ab1856923ef5419553cda2540e789940a5e028198cad93a3ad43ec0f`.
Intenção: Comparar OpenClaw gerenciado e VPS por controle, manutenção, custo e adequação.

- **P1 — confiança, `contentSections[5].paragraphs[1]`, `contentSections[5].bullets[0]` e `decision.skipIf[2]`:** “**More than one person will use the assistant** (family or team): the project recommends one server per person. On the VPS, that is straightforward; on managed, ask Hostinger how many instances one account can have.” / “Skip both if the same assistant will serve several people: the project recommends one server per person.”. Diferenciar equipe de confiança de usuários adversários e seus limites; retirar a atribuição universal de um servidor por pessoa. Não sugerir que agentes compartilhados tenham isolamento entre membros.
- **P1 — reembolso VPS, `contentSections[3].postParagraphs[1]`:** “The managed plan has a 30-day refund window. On the VPS, the 30 days apply only if your last VPS refund was requested more than 180 days ago. A VPS of 12 months or more comes with a free .cloud or .tech domain for the first year.” Retificar o marco para conclusão de reembolso anterior, quando houver, e remeter às exceções oficiais. Trecho presente no HTTP.
- **P2 — acesso root, `contentSections[2].comparisonTable.rows[2]`:** ["Root access", "The page mentions command-line access, without saying root", "Yes"]. Atualizar a comparação: a página oficial agora diz que o gerenciado não tem root, enquanto o VPS tem. Valor da célula observado no HTTP.

Preservar SONAR20 digitável, divulgação, observação explícita de que a equipe não usa OpenClaw e valores históricos como históricos; não substituir pelo nome de indicação antigo. Atribuição e condições comerciais atuais dependem do programa aplicável, sem novo checkout.

## openclaw-hostinger-verwaltet-oder-vps
Arquivo: `content/reviews/openclaw-hostinger-verwaltet-oder-vps.json` · idioma `de` · SHA-256 `4f654d35943875a189fe81ecebb69c7b8bb0343b5036cef8e1989b999c3e3322`.
Intenção: Comparar OpenClaw gerenciado e VPS por controle, manutenção, custo e adequação.

- **P1 — confiança, `contentSections[5].paragraphs[1]`, `contentSections[5].bullets[0]` e `decision.skipIf[2]`:** “**Mehrere Personen nutzen den Assistenten** (Familie oder Team): Das Projekt empfiehlt einen Server pro Person. Beim VPS ist das unkompliziert; beim verwalteten Tarif fragen Sie Hostinger, wie viele Instanzen ein Konto haben kann.” / “Lassen Sie beide aus, wenn derselbe Assistent mehrere Personen bedienen soll: Das Projekt empfiehlt einen Server pro Person.”. Diferenciar equipe de confiança de usuários adversários e seus limites; retirar a atribuição universal de um servidor por pessoa. Não sugerir que agentes compartilhados tenham isolamento entre membros.
- **P1 — reembolso VPS, `contentSections[3].postParagraphs[1]`:** “Für die verwaltete Option gilt eine Frist von 30 Tagen, um eine Erstattung zu verlangen. Beim VPS gelten die 30 Tage nur, wenn der letzte VPS-Erstattungsantrag mehr als 180 Tage zurückliegt. Ein VPS mit 12 Monaten Laufzeit oder mehr enthält im ersten Jahr eine kostenlose .cloud- oder .tech-Domain.” Retificar o marco para conclusão de reembolso anterior, quando houver, e remeter às exceções oficiais. Trecho presente no HTTP.
- **P2 — acesso root, `contentSections[2].comparisonTable.rows[2]`:** ["Root-Zugriff", "Die Seite spricht vom Zugang zur Kommandozeile, ohne Root zu nennen", "Ja"]. Atualizar a comparação: a página oficial agora diz que o gerenciado não tem root, enquanto o VPS tem. Valor da célula observado no HTTP.

Preservar SONAR20 digitável, divulgação, observação explícita de que a equipe não usa OpenClaw e valores históricos como históricos; não substituir pelo nome de indicação antigo. Atribuição e condições comerciais atuais dependem do programa aplicável, sem novo checkout.

## Limites

HTTP 200 não prova indexação. O extrator H1 é inconclusivo; nenhuma afirmação estrutural decorre dele. A auditoria não executou compras, acessos a conta ou mudanças em artigos, runtime ou diretor.
