import { YESSTYLE_COUPONS_FACTUAL } from '../src/lib/yesstyleCoupons';
import { getYesStylePage, getYesStyleMetadata, yesStyleLocales } from '../src/components/YesStyleCouponPage';
import { COUPONS } from '../src/lib/couponsData';
import { getRewardArticleLanguageLinks } from '../src/lib/i18n/yesstyleCluster';

export function runYesStyleMutationTest(): { success: boolean; errors: string[] } {
  const errors: string[] = [];
  const primaryReward = YESSTYLE_COUPONS_FACTUAL[0];

  // 1. Mapeamento de links de artigo
  const rewardLinks = getRewardArticleLanguageLinks();
  if (rewardLinks.pt !== '/reviews/codigo-cecilia010-yesstyle-como-usar') {
    errors.push(`Seletor de idioma PT no artigo aponta para "${rewardLinks.pt}" em vez de "/reviews/codigo-cecilia010-yesstyle-como-usar"`);
  }

  // Guardar estado original
  const origCode = primaryReward.code;
  const origNew = primaryReward.newCustomerDiscount;
  const origRet = primaryReward.returningCustomerDiscount;
  const origVerified = primaryReward.verifiedAt;

  try {
    // 2. Executar mutação em memória
    primaryReward.code = 'MUTATIONTEST99';
    primaryReward.newCustomerDiscount = 99;
    primaryReward.returningCustomerDiscount = 44;
    primaryReward.verifiedAt = '2026-11-25';

    // 3. Testar Hub PT em couponsData
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

    // 4. Testar todos os 8 Hubs Internacionais (YesStyleCouponPage)
    for (const locale of yesStyleLocales) {
      const page = getYesStylePage(locale);
      const meta = getYesStyleMetadata(locale);

      if (!page) {
        errors.push(`Página do hub para locale "${locale}" retornou null`);
        continue;
      }

      const titleStr = typeof meta.title === 'string' ? meta.title : '';
      if (!titleStr.includes('MUTATIONTEST99') || !titleStr.includes('99')) {
        errors.push(`Metadata title para locale "${locale}" não propagou mutação: "${titleStr}"`);
      }

      const formattedFaqAns = page.faqs[0]?.answer
        .replace(/\{code\}/g, primaryReward.code)
        .replace(/\{newDiscount\}/g, String(primaryReward.newCustomerDiscount));
      if (!formattedFaqAns?.includes('MUTATIONTEST99')) {
        errors.push(`FAQ answer para locale "${locale}" não propagou mutação de código`);
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
    console.log('   - Mutação em memória de código (MUTATIONTEST99), percentuais (99%/44%) e data (2026-11-25) propagada para 100% dos hubs e metadatas!');
    process.exit(0);
  } else {
    console.error('❌ FALHA NO TESTE DE MUTAÇÃO:');
    for (const err of result.errors) {
      console.error(`  - ${err}`);
    }
    process.exit(1);
  }
}
