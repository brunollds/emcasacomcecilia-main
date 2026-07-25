import { YESSTYLE_COUPONS_FACTUAL } from '../src/lib/yesstyleCoupons';
import { resolveYesStylePage, getYesStyleMetadata, yesStyleLocales, formatIsoDateUTC } from '../src/components/YesStyleCouponPage';
import { COUPONS } from '../src/lib/couponsData';
import { getRewardArticleLanguageLinks } from '../src/lib/i18n/yesstyleCluster';

export function runYesStyleMutationTest(): { success: boolean; errors: string[] } {
  const errors: string[] = [];
  const primaryReward = YESSTYLE_COUPONS_FACTUAL[0];

  // 1. Mapeamento de links de artigo no seletor de idiomas
  const rewardLinks = getRewardArticleLanguageLinks();
  if (rewardLinks.pt !== '/reviews/codigo-cecilia010-yesstyle-como-usar') {
    errors.push(`Seletor de idioma PT no artigo aponta para "${rewardLinks.pt}" em vez de "/reviews/codigo-cecilia010-yesstyle-como-usar"`);
  }

  // 2. Teste de formatação de data visível em UTC (sem recuar um dia por fuso local)
  const utcDateEn = formatIsoDateUTC('2026-07-24', 'en-US');
  if (!utcDateEn.includes('July 24, 2026')) {
    errors.push(`Data visível en-US esperada "July 24, 2026", obteve "${utcDateEn}"`);
  }
  const utcDatePt = formatIsoDateUTC('2026-07-24', 'pt-BR');
  if (!utcDatePt.includes('24 de julho de 2026')) {
    errors.push(`Data visível pt-BR esperada "24 de julho de 2026", obteve "${utcDatePt}"`);
  }

  // Guardar estado factual original
  const origCode = primaryReward.code;
  const origNew = primaryReward.newCustomerDiscount;
  const origRet = primaryReward.returningCustomerDiscount;
  const origVerified = primaryReward.verifiedAt;

  try {
    // 3. Executar mutação em memória (ex: CECILIA010 -> MUTATIONTEST99, 5%/2% -> 99%/44%, 2026-07-24 -> 2026-11-25)
    primaryReward.code = 'MUTATIONTEST99';
    primaryReward.newCustomerDiscount = 99;
    primaryReward.returningCustomerDiscount = 44;
    primaryReward.verifiedAt = '2026-11-25';

    // 4. Testar Hub PT em couponsData
    const ptHub = COUPONS.find((c) => c.slug === 'yesstyle');
    if (!ptHub) {
      errors.push('Hub PT "yesstyle" não encontrado em COUPONS');
    } else {
      if (ptHub.code !== 'MUTATIONTEST99') errors.push(`Hub PT code: esperado "MUTATIONTEST99", obteve "${ptHub.code}"`);
      if (ptHub.discountNumber !== 99) errors.push(`Hub PT discountNumber: esperado 99, obteve ${ptHub.discountNumber}`);
      if (!ptHub.shortDescription.includes('99%') || !ptHub.shortDescription.includes('44%')) {
        errors.push(`Hub PT shortDescription não contém "99%" ou "44%": "${ptHub.shortDescription}"`);
      }
      if (!ptHub.longDescription.includes('MUTATIONTEST99') || !ptHub.longDescription.includes('99%') || !ptHub.longDescription.includes('44%')) {
        errors.push(`Hub PT longDescription não propagou mutação: "${ptHub.longDescription}"`);
      }
      if (!ptHub.aboutBrand.includes('MUTATIONTEST99') || !ptHub.aboutBrand.includes('99%') || !ptHub.aboutBrand.includes('44%')) {
        errors.push(`Hub PT aboutBrand não propagou mutação: "${ptHub.aboutBrand}"`);
      }
      if (!ptHub.faqs[0].question.includes('MUTATIONTEST99') || !ptHub.faqs[0].answer.includes('MUTATIONTEST99')) {
        errors.push(`Hub PT FAQ não propagou mutação de código: "${ptHub.faqs[0].question}"`);
      }
      if (!ptHub.metaTitle.includes('Novembro 2026') || !ptHub.metaTitle.includes('MUTATIONTEST99') || !ptHub.metaTitle.includes('99%')) {
        errors.push(`Hub PT metaTitle não derivou verifiedAt ou mutação: "${ptHub.metaTitle}"`);
      }
      if (!ptHub.metaDescription.includes('novembro de 2026') || !ptHub.metaDescription.includes('MUTATIONTEST99')) {
        errors.push(`Hub PT metaDescription não derivou verifiedAt ou mutação: "${ptHub.metaDescription}"`);
      }
      if (!ptHub.monthlyHighlight?.note.includes('99%')) {
        errors.push(`Hub PT monthlyHighlight não propagou mutação: "${ptHub.monthlyHighlight?.note}"`);
      }
    }

    // 5. Testar resolvedor de produção resolveYesStylePage para todos os 8 dicionários internacionais
    for (const locale of yesStyleLocales) {
      const resolved = resolveYesStylePage(locale);
      const meta = getYesStyleMetadata(locale);

      if (!resolved) {
        errors.push(`resolveYesStylePage("${locale}") retornou null`);
        continue;
      }

      // Check Japanese particle fix
      if (locale === 'ja' && resolved.copy !== 'コードをコピー') {
        errors.push(`Botão japonês de cópia com partícula incorreta: esperado "コードをコピー", obteve "${resolved.copy}"`);
      }

      // Check visible UTC date format (November 25, 2026 / 25 de noviembre de 2026)
      if (locale === 'en' && !resolved.formattedDate.includes('November 25, 2026')) {
        errors.push(`Data visível en-US esperada "November 25, 2026", obteve "${resolved.formattedDate}"`);
      }

      // Check Metadata title and description
      const titleStr = typeof meta.title === 'string' ? meta.title : '';
      if (!titleStr.includes('MUTATIONTEST99') || !titleStr.includes('99')) {
        errors.push(`Metadata title para locale "${locale}" não propagou mutação: "${titleStr}"`);
      }

      // Varrer recursivamente todos os campos resolvidos para verificar vazamento de placeholders
      const stringsToAudit: string[] = [
        resolved.title,
        resolved.description,
        resolved.intro,
        resolved.copyAria,
        resolved.discountValue,
        resolved.instructionsTitle,
        ...resolved.instructions,
        resolved.note,
        resolved.transparency,
        ...resolved.faqs.map((f) => f.question),
        ...resolved.faqs.map((f) => f.answer),
      ];

      for (const str of stringsToAudit) {
        if (str.includes('{code}') || str.includes('{newDiscount}') || str.includes('{returningDiscount}')) {
          errors.push(`Placeholder vazado não resolvido em locale "${locale}": "${str}"`);
        }
        if (str.includes('CECILIA010')) {
          errors.push(`Literal hardcoded "CECILIA010" não parametrizado mantido em locale "${locale}": "${str}"`);
        }
      }

      // Verificar presença da mutação nos campos chave resolvidos
      if (!resolved.title.includes('MUTATIONTEST99')) {
        errors.push(`Título resolvido em locale "${locale}" não contém o código mutado: "${resolved.title}"`);
      }
      if (!resolved.intro.includes('99') || !resolved.intro.includes('44')) {
        errors.push(`Intro resolvida em locale "${locale}" não contém descontos mutados: "${resolved.intro}"`);
      }
      if (!resolved.discountValue.includes('99') || !resolved.discountValue.includes('44')) {
        errors.push(`discountValue resolvido em locale "${locale}" não contém descontos mutados: "${resolved.discountValue}"`);
      }
      if (!resolved.instructionsTitle.includes('MUTATIONTEST99')) {
        errors.push(`instructionsTitle resolvido em locale "${locale}" não contém o código mutado`);
      }
      if (!resolved.instructions[0].includes('MUTATIONTEST99')) {
        errors.push(`Primeira instrução resolvida em locale "${locale}" não contém o código mutado`);
      }
      if (!resolved.note.includes('MUTATIONTEST99')) {
        errors.push(`Nota resolvida em locale "${locale}" não contém o código mutado`);
      }
      if (!resolved.transparency.includes('MUTATIONTEST99')) {
        errors.push(`Transparência resolvida em locale "${locale}" não contém o código mutado`);
      }
    }
  } finally {
    // Restaurar estado factual original
    primaryReward.code = origCode;
    primaryReward.newCustomerDiscount = origNew;
    primaryReward.returningCustomerDiscount = origRet;
    primaryReward.verifiedAt = origVerified;
  }

  return {
    success: errors.length === 0,
    errors,
  };
}

if (require.main === module) {
  console.log('=== TESTE DE MUTAÇÃO FACTUAL YESSTYLE (PROJETO A) ===\n');
  const result = runYesStyleMutationTest();
  if (result.success) {
    console.log('✅ TESTE DE MUTAÇÃO PASSOU COM SUCESSO!');
    console.log('   - resolvedor resolveYesStylePage validado sem vazamento de placeholders!');
    console.log('   - datas visíveis formatadas estritamente em UTC!');
    console.log('   - rótulo japonês verificado!');
    process.exit(0);
  } else {
    console.error('❌ FALHA NO TESTE DE MUTAÇÃO:');
    for (const err of result.errors) {
      console.error(`  - ${err}`);
    }
    process.exit(1);
  }
}
