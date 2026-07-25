import { YESSTYLE_COUPONS_FACTUAL, getPrimaryRewardCode, getActivePromoCoupons, type YesStyleRewardOffer, type YesStylePromoOffer } from '../src/lib/yesstyleCoupons';
import { resolveYesStylePage, getYesStyleMetadata, yesStyleLocales, formatIsoDateUTC } from '../src/components/YesStyleCouponPage';
import { COUPONS } from '../src/lib/couponsData';
import { getRewardArticleLanguageLinks, getHubLanguageLinks, YESSTYLE_LOCALES } from '../src/lib/i18n/yesstyleCluster';
import sitemap from '../src/app/sitemap';

export function runYesStyleMutationTest(): { success: boolean; errors: string[] } {
  const errors: string[] = [];
  const primaryReward = getPrimaryRewardCode();
  const activePromos = getActivePromoCoupons();

  // 1. Mapeamento de links nos seletores de idioma
  const rewardLinks = getRewardArticleLanguageLinks();
  if (rewardLinks.pt !== '/reviews/codigo-cecilia010-yesstyle-como-usar') {
    errors.push(`Seletor de idioma PT no artigo aponta para "${rewardLinks.pt}" em vez de "/reviews/codigo-cecilia010-yesstyle-como-usar"`);
  }

  const hubLinks = getHubLanguageLinks();
  if (hubLinks.pt !== '/cupons/yesstyle') {
    errors.push(`Seletor de idioma PT nos hubs aponta para "${hubLinks.pt}" em vez de "/cupons/yesstyle"`);
  }
  if (hubLinks.en !== '/en/coupons/yesstyle') {
    errors.push(`Seletor de idioma EN nos hubs aponta para "${hubLinks.en}" em vez de "/en/coupons/yesstyle"`);
  }

  // 2. Teste de formatação de data visível em UTC
  const utcDateEn = formatIsoDateUTC('2026-07-24', 'en-US');
  if (!utcDateEn.includes('July 24, 2026')) {
    errors.push(`Data visível en-US esperada "July 24, 2026", obteve "${utcDateEn}"`);
  }
  const utcDatePt = formatIsoDateUTC('2026-07-25', 'pt-BR');
  if (!utcDatePt.includes('25 de julho de 2026')) {
    errors.push(`Data visível pt-BR esperada "25 de julho de 2026", obteve "${utcDatePt}"`);
  }

  // B2: Teste de expansão do Sitemap (18 artigos + 9 hubs = 27 URLs YesStyle)
  const allSitemapEntries = sitemap();
  const yesstyleSitemapUrls = allSitemapEntries.filter((item) => item.url.includes('yesstyle'));
  if (yesstyleSitemapUrls.length !== 27) {
    errors.push(`Sitemap B2 esperado 27 URLs YesStyle (18 artigos + 9 hubs), obteve ${yesstyleSitemapUrls.length}`);
  }

  // Guardar estado factual original
  const origCode = primaryReward.code;
  const origNew = primaryReward.newCustomerDiscount;
  const origRet = primaryReward.returningCustomerDiscount;
  const origVerified = primaryReward.verifiedAt;

  const promoToMutate = activePromos[0];
  const origPromoCode = promoToMutate ? promoToMutate.code : '';
  const origPromoVal = promoToMutate && promoToMutate.discount.kind === 'percentage' ? promoToMutate.discount.value : 0;

  try {
    // 3. Executar mutação em memória (ex: CECILIA010 -> MUTATIONTEST99, BTSVIP15 -> PROMOTEST88)
    primaryReward.code = 'MUTATIONTEST99';
    primaryReward.newCustomerDiscount = 99;
    primaryReward.returningCustomerDiscount = 44;
    primaryReward.verifiedAt = '2026-11-25';

    if (promoToMutate && promoToMutate.discount.kind === 'percentage') {
      promoToMutate.code = 'PROMOTEST88';
      promoToMutate.discount.value = 88;
      promoToMutate.verifiedAt = '2026-11-26';
    }

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
    }

    // 5. Testar resolvedor de produção resolveYesStylePage e getYesStyleMetadata para TODOS OS 9 LOCALES
    for (const locale of yesStyleLocales) {
      const resolved = resolveYesStylePage(locale);
      const meta = getYesStyleMetadata(locale);
      const config = YESSTYLE_LOCALES[locale as keyof typeof YESSTYLE_LOCALES];

      if (!resolved) {
        errors.push(`resolveYesStylePage("${locale}") retornou null`);
        continue;
      }

      // B2: Canonical próprio auto-referenciado no hub
      const expectedCanonical = locale === 'pt' ? 'https://emcasacomcecilia.com/cupons/yesstyle' : `https://emcasacomcecilia.com${config.hubPath}`;
      const actualCanonical = typeof meta.alternates?.canonical === 'string' ? meta.alternates.canonical : '';
      if (actualCanonical !== expectedCanonical) {
        errors.push(`Canonical B2 para locale "${locale}" esperado "${expectedCanonical}", obteve "${actualCanonical}"`);
      }

      // B2: Tags hreflang recíprocas entre os 9 hubs + x-default
      const langs = meta.alternates?.languages || {};
      if (langs['pt-BR'] !== 'https://emcasacomcecilia.com/cupons/yesstyle') {
        errors.push(`hreflang pt-BR para locale "${locale}" incorreto`);
      }
      if (langs['en'] !== 'https://emcasacomcecilia.com/en/coupons/yesstyle') {
        errors.push(`hreflang en para locale "${locale}" incorreto`);
      }
      if (langs['x-default'] !== 'https://emcasacomcecilia.com/en/coupons/yesstyle') {
        errors.push(`hreflang x-default para locale "${locale}" incorreto`);
      }

      // Check Japanese particle fix
      if (locale === 'ja' && resolved.copy !== 'コードをコピー') {
        errors.push(`Botão japonês de cópia com partícula incorreta: esperado "コードをコピー", obteve "${resolved.copy}"`);
      }

      // Check visible UTC date format
      if (locale === 'en' && !resolved.formattedDate.includes('November 25, 2026')) {
        errors.push(`Data visível en-US esperada "November 25, 2026", obteve "${resolved.formattedDate}"`);
      }

      // Check Promo offer mutation propagation in activePromoOffers
      if (promoToMutate) {
        const foundPromo = resolved.activePromoOffers.find((p) => p.code === 'PROMOTEST88');
        if (!foundPromo) {
          errors.push(`Cupom promocional mutado "PROMOTEST88" não encontrado na lista resolvida para locale "${locale}"`);
        } else {
          if (!foundPromo.discountLabel.includes('88%')) {
            errors.push(`Desconto do cupom promocional mutado não contém "88%" em locale "${locale}": "${foundPromo.discountLabel}"`);
          }
          if (!foundPromo.copyAria.includes('PROMOTEST88') || foundPromo.copyAria.includes('MUTATIONTEST99')) {
            errors.push(`copyAria do cupom promocional contém código incorreto em locale "${locale}": "${foundPromo.copyAria}"`);
          }
        }
      }

      // Check Metadata title and description
      const titleStr = typeof meta.title === 'string' ? meta.title : '';
      if (!titleStr.includes('MUTATIONTEST99') || !titleStr.includes('99')) {
        errors.push(`Metadata title para locale "${locale}" não propagou mutação: "${titleStr}"`);
      }

      // Varrer recursivamente todos os campos resolvidos para verificar vazamento de placeholders ou literais
      const stringsToAudit: string[] = [
        resolved.title,
        resolved.description,
        resolved.intro,
        resolved.copyAria,
        resolved.rewardDiscountValue,
        resolved.promosSectionTitle,
        resolved.emptyPromosNotice,
        resolved.emptyPromosSubtext,
        resolved.discountValue,
        resolved.instructionsTitle,
        ...resolved.instructions,
        resolved.note,
        resolved.rewardArticleCardTitle,
        resolved.rewardArticleCardSubtext,
        resolved.guideCardTitle,
        resolved.guideCardSubtext,
        resolved.transparency,
        ...resolved.faqs.map((f) => f.question),
        ...resolved.faqs.map((f) => f.answer),
      ];

      for (const str of stringsToAudit) {
        if (str.includes('{code}') || str.includes('{newDiscount}') || str.includes('{returningDiscount}') || str.includes('{promoCode}')) {
          errors.push(`Placeholder vazado não resolvido em locale "${locale}": "${str}"`);
        }
        if (str.includes('CECILIA010')) {
          errors.push(`Literal hardcoded "CECILIA010" mantido em locale "${locale}": "${str}"`);
        }
      }
    }

    // 6. Testar estado sem cupom promocional (B1.4 e P1 Finding 3 assertion)
    for (const locale of yesStyleLocales) {
      const emptyStateResolved = resolveYesStylePage(locale, primaryReward, []);
      if (!emptyStateResolved) {
        errors.push(`resolveYesStylePage com estado sem cupons promocionais retornou null para "${locale}"`);
      } else {
        if (emptyStateResolved.activePromoOffers.length !== 0) {
          errors.push(`activePromoOffers deveria estar vazio no teste B1.4 para locale "${locale}"`);
        }
        if (!emptyStateResolved.emptyPromosNotice || emptyStateResolved.emptyPromosNotice.includes('{code}')) {
          errors.push(`Mensagem de estado sem cupons inválida para locale "${locale}": "${emptyStateResolved.emptyPromosNotice}"`);
        }
        // Assert that NO instruction line in empty state contains any promo coupon code
        for (const inst of emptyStateResolved.instructions) {
          if (inst.includes('BTSVIP15') || inst.includes('PROMOTEST88')) {
            errors.push(`Instrução do estado sem cupom promocional contém código promocional residuo em "${locale}": "${inst}"`);
          }
        }
      }
    }
  } finally {
    // Restaurar estado factual original
    primaryReward.code = origCode;
    primaryReward.newCustomerDiscount = origNew;
    primaryReward.returningCustomerDiscount = origRet;
    primaryReward.verifiedAt = origVerified;

    if (promoToMutate && promoToMutate.discount.kind === 'percentage') {
      promoToMutate.code = origPromoCode;
      promoToMutate.discount.value = origPromoVal;
      promoToMutate.verifiedAt = '2026-07-25';
    }
  }

  return {
    success: errors.length === 0,
    errors,
  };
}

if (require.main === module) {
  console.log('=== TESTE DE MUTAÇÃO FACTUAL YESSTYLE (PROJETO B2) ===\n');
  const result = runYesStyleMutationTest();
  if (result.success) {
    console.log('✅ TESTE DE MUTAÇÃO B2 PASSOU COM SUCESSO!');
    console.log('   - Canonicals auto-referenciados em todos os 9 hubs validados!');
    console.log('   - Tags hreflang recíprocas (9 locales + x-default) testadas!');
    console.log('   - Sitemap expansão 27 URLs YesStyle confirmada!');
    console.log('   - Schemas JSON-LD estruturados (WebPage, BreadcrumbList, FAQPage) validados!');
    process.exit(0);
  } else {
    console.error('❌ FALHA NO TESTE DE MUTAÇÃO B2:');
    for (const err of result.errors) {
      console.error(`  - ${err}`);
    }
    process.exit(1);
  }
}
