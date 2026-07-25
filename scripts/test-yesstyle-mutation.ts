import {
  getPrimaryRewardCode,
  getActivePromoCoupons,
  getLatestYesStyleVerifiedAtISO,
} from '../src/lib/yesstyleCoupons';
import {
  resolveYesStylePage,
  getYesStyleMetadata,
  yesStyleLocales,
  YesStyleCouponPage,
  getYesStyleBreadcrumbItems,
} from '../src/components/YesStyleCouponPage';
import { COUPONS } from '../src/lib/couponsData';
import {
  getRewardArticleLanguageLinks,
  getHubLanguageLinks,
  YESSTYLE_LOCALES,
} from '../src/lib/i18n/yesstyleCluster';
import sitemap from '../src/app/sitemap';

export function runYesStyleMutationTest(): { success: boolean; errors: string[] } {
  const errors: string[] = [];
  const primaryReward = getPrimaryRewardCode();
  const activePromos = getActivePromoCoupons();

  // [P1 Fix]: Calcular data esperada inicialmente de forma dinâmica (nunca hardcodar datas estáticas no teste)
  const initialLatestVerifiedAt = getLatestYesStyleVerifiedAtISO();

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

  // 2. Teste de data de atualização mais recente dinâmica (verifiedAtISO)
  const ptResolvedDateTest = resolveYesStylePage('pt');
  if (!ptResolvedDateTest || ptResolvedDateTest.verifiedAtISO !== initialLatestVerifiedAt) {
    errors.push(`verifiedAtISO inicial esperado "${initialLatestVerifiedAt}", obteve "${ptResolvedDateTest?.verifiedAtISO}"`);
  }

  // 3. Validação estrita do Sitemap B2 a partir de YESSTYLE_LOCALES (Sem heurística de slugs!)
  const allSitemapEntries = sitemap();
  const yesstyleSitemapUrls = allSitemapEntries
    .filter((item) => item.url.includes('yesstyle') || item.url.includes('cecilia010') || item.url.includes('code-recompense') || item.url.includes('codigo-de-recompensa'))
    .map((item) => item.url);

  // Verificar ausência de duplicatas no sitemap
  const uniqueUrls = new Set(yesstyleSitemapUrls);
  if (uniqueUrls.size !== yesstyleSitemapUrls.length) {
    errors.push(`Sitemap contém URLs duplicadas da YesStyle! Total: ${yesstyleSitemapUrls.length}, Únicas: ${uniqueUrls.size}`);
  }

  // Verificar que /pt/coupons/yesstyle NÃO existe no sitemap
  if (yesstyleSitemapUrls.some((url) => url.includes('/pt/coupons/yesstyle'))) {
    errors.push('Sitemap viola baseline: rota duplicada indevida "/pt/coupons/yesstyle" presente!');
  }

  // [P2 Fix]: Construção direta do conjunto das 18 URLs de artigos a partir dos 9 registros em YESSTYLE_LOCALES
  const expectedArticleUrls = Object.values(YESSTYLE_LOCALES).flatMap((config) => [
    `https://emcasacomcecilia.com${config.rewardArticlePath}`,
    `https://emcasacomcecilia.com${config.guidePath}`,
  ]);

  const expectedHubUrls = Object.values(YESSTYLE_LOCALES).map(
    (config) => `https://emcasacomcecilia.com${config.hubPath}`
  );

  const expectedTotalUrls = new Set([...expectedArticleUrls, ...expectedHubUrls]);
  if (expectedTotalUrls.size !== 27) {
    errors.push(`Regra interna de teste: conjunto estrito de URLs calculou ${expectedTotalUrls.size} em vez de 27`);
  }

  if (yesstyleSitemapUrls.length !== 27) {
    errors.push(`Sitemap B2 esperado exatamente 27 URLs YesStyle, obteve ${yesstyleSitemapUrls.length}`);
  }

  for (const expectedUrl of expectedTotalUrls) {
    if (!uniqueUrls.has(expectedUrl)) {
      errors.push(`URL esperada ausente no sitemap B2: "${expectedUrl}"`);
    }
  }

  // Verificar lastModified do sitemap para os 9 hubs (deve coincidir com initialLatestVerifiedAt)
  const hubSitemapEntries = allSitemapEntries.filter((item) =>
    Object.values(YESSTYLE_LOCALES).some((c) => `https://emcasacomcecilia.com${c.hubPath}` === item.url)
  );
  for (const hubEntry of hubSitemapEntries) {
    if (hubEntry.lastModified !== initialLatestVerifiedAt) {
      errors.push(`lastModified no sitemap para "${hubEntry.url}" esperado "${initialLatestVerifiedAt}", obteve "${hubEntry.lastModified}"`);
    }
  }

  // [P1 Fix]: Capturar estado factual original completo para restauração estrita no finally
  const origRewardCode = primaryReward.code;
  const origRewardNew = primaryReward.newCustomerDiscount;
  const origRewardRet = primaryReward.returningCustomerDiscount;
  const origRewardVerified = primaryReward.verifiedAt;

  const promoToMutate = activePromos[0];
  const origPromoCode = promoToMutate ? promoToMutate.code : '';
  const origPromoVal = promoToMutate && promoToMutate.discount.kind === 'percentage' ? promoToMutate.discount.value : 0;
  const origPromoVerified = promoToMutate ? promoToMutate.verifiedAt : '';

  try {
    // 4. Executar mutação em memória (ex: CECILIA010 -> MUTATIONTEST99, BTSVIP15 -> PROMOTEST88)
    primaryReward.code = 'MUTATIONTEST99';
    primaryReward.newCustomerDiscount = 99;
    primaryReward.returningCustomerDiscount = 44;
    primaryReward.verifiedAt = '2026-11-25';

    if (promoToMutate && promoToMutate.discount.kind === 'percentage') {
      promoToMutate.code = 'PROMOTEST88';
      promoToMutate.discount.value = 88;
      promoToMutate.verifiedAt = '2026-11-26';
    }

    // 5. Testar Hub PT em couponsData (lastVerified dinâmico de mutação)
    const ptHub = COUPONS.find((c) => c.slug === 'yesstyle');
    if (!ptHub) {
      errors.push('Hub PT "yesstyle" não encontrado em COUPONS');
    } else {
      if (ptHub.code !== 'MUTATIONTEST99') errors.push(`Hub PT code: esperado "MUTATIONTEST99", obteve "${ptHub.code}"`);
      if (ptHub.discountNumber !== 99) errors.push(`Hub PT discountNumber: esperado 99, obteve ${ptHub.discountNumber}`);
      if (ptHub.lastVerified !== '2026-11-26') errors.push(`Hub PT lastVerified esperado "2026-11-26" (maior data mutada), obteve "${ptHub.lastVerified}"`);
    }

    // 6. Testar resolvedor, metadata, hreflangs com igualdade total e breadcrumbs estritos para TODOS OS 9 LOCALES
    for (const locale of yesStyleLocales) {
      const resolved = resolveYesStylePage(locale);
      const meta = getYesStyleMetadata(locale);
      const config = YESSTYLE_LOCALES[locale as keyof typeof YESSTYLE_LOCALES];

      if (!resolved) {
        errors.push(`resolveYesStylePage("${locale}") retornou null`);
        continue;
      }

      // Canonical próprio auto-referenciado no hub
      const expectedCanonical = locale === 'pt' ? 'https://emcasacomcecilia.com/cupons/yesstyle' : `https://emcasacomcecilia.com${config.hubPath}`;
      const actualCanonical = typeof meta.alternates?.canonical === 'string' ? meta.alternates.canonical : '';
      if (actualCanonical !== expectedCanonical) {
        errors.push(`Canonical B2 para locale "${locale}" esperado "${expectedCanonical}", obteve "${actualCanonical}"`);
      }

      // [P2 Fix]: Teste de igualdade completa do dicionário de hreflangs (comparação exata de todas as 10 chaves)
      const langs = meta.alternates?.languages || {};
      const actualKeys = Object.keys(langs);
      if (actualKeys.length !== 10) {
        errors.push(`Quantidade de chaves hreflang esperada 10 em "${locale}", obteve ${actualKeys.length}`);
      }

      for (const locConfig of Object.values(YESSTYLE_LOCALES)) {
        const expectedUrl = `https://emcasacomcecilia.com${locConfig.hubPath}`;
        if (langs[locConfig.hreflang] !== expectedUrl) {
          errors.push(`hreflang "${locConfig.hreflang}" em locale "${locale}" esperado "${expectedUrl}", obteve "${langs[locConfig.hreflang]}"`);
        }
      }

      if (langs['x-default'] !== 'https://emcasacomcecilia.com/en/coupons/yesstyle') {
        errors.push(`hreflang x-default em locale "${locale}" esperado "https://emcasacomcecilia.com/en/coupons/yesstyle", obteve "${langs['x-default']}"`);
      }

      // [P2 Fix]: Teste estrito das posições, rótulos e URLs dos breadcrumbs (3 níveis em PT vs 2 nos internacionais)
      const breadcrumbItems = getYesStyleBreadcrumbItems(resolved.locale, resolved.canonicalUrl, resolved.homeLabel, resolved.couponsLabel);
      if (locale === 'pt') {
        if (breadcrumbItems.length !== 3) {
          errors.push(`Breadcrumb PT esperado 3 níveis, obteve ${breadcrumbItems.length}`);
        }
        if (breadcrumbItems[0]?.item !== 'https://emcasacomcecilia.com') errors.push('Breadcrumb PT nível 1 incorreto');
        if (breadcrumbItems[1]?.item !== 'https://emcasacomcecilia.com/cupons') errors.push('Breadcrumb PT nível 2 incorreto');
        if (breadcrumbItems[2]?.item !== 'https://emcasacomcecilia.com/cupons/yesstyle') errors.push('Breadcrumb PT nível 3 incorreto');
      } else {
        if (breadcrumbItems.length !== 2) {
          errors.push(`Breadcrumb internacional "${locale}" esperado 2 níveis, obteve ${breadcrumbItems.length}`);
        }
        if (breadcrumbItems[0]?.item !== 'https://emcasacomcecilia.com') errors.push(`Breadcrumb "${locale}" nível 1 incorreto`);
        if (breadcrumbItems[1]?.item !== expectedCanonical) errors.push(`Breadcrumb "${locale}" nível 2 incorreto`);
        if (breadcrumbItems.some((b) => b.item.includes('/cupons'))) {
          errors.push(`Breadcrumb internacional "${locale}" contém vazamento indevido para "/cupons" em PT!`);
        }
      }

      // Check dateModified na resposta resolvida
      if (resolved.verifiedAtISO !== '2026-11-26') {
        errors.push(`resolved.verifiedAtISO esperado "2026-11-26" (data mutada mais recente), obteve "${resolved.verifiedAtISO}"`);
      }

      // Check Japanese copy button text
      if (locale === 'ja' && resolved.copy !== 'コードをコピー') {
        errors.push(`Botão japonês de cópia com partícula incorreta: esperado "コードをコピー", obteve "${resolved.copy}"`);
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

      // Varrer todos os campos do resolved para verificar vazamentos
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

    // 7. Testar estado sem cupom promocional (B1.4 e P1 Finding 3 assertion)
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
        for (const inst of emptyStateResolved.instructions) {
          if (inst.includes('BTSVIP15') || inst.includes('PROMOTEST88')) {
            errors.push(`Instrução do estado sem cupom promocional contém código promocional resíduo em "${locale}": "${inst}"`);
          }
        }
      }
    }
  } finally {
    // [P1 Fix]: Restaurar estado factual original de forma ESTRITA sem sobrescrever datas factuais
    primaryReward.code = origRewardCode;
    primaryReward.newCustomerDiscount = origRewardNew;
    primaryReward.returningCustomerDiscount = origRewardRet;
    primaryReward.verifiedAt = origRewardVerified;

    if (promoToMutate && promoToMutate.discount.kind === 'percentage') {
      promoToMutate.code = origPromoCode;
      promoToMutate.discount.value = origPromoVal;
      promoToMutate.verifiedAt = origPromoVerified; // Restauração exata do valor original!
    }
  }

  return {
    success: errors.length === 0,
    errors,
  };
}

if (require.main === module) {
  console.log('=== TESTE DE MUTAÇÃO FACTUAL YESSTYLE (PROJETO B2 RIGOROSO) ===\n');
  const result = runYesStyleMutationTest();
  if (result.success) {
    console.log('✅ TESTE DE MUTAÇÃO B2 RIGOROSO PASSOU COM SUCESSO!');
    console.log('   - Restauração factual exata no finally (origPromoVerified preservado)!');
    console.log('   - Datas iniciais validadas dinamicamente via getLatestYesStyleVerifiedAtISO()!');
    console.log('   - Canonicals auto-referenciados nos 9 hubs confirmados!');
    console.log('   - Hreflangs: 10 chaves validadas por igualdade total em TODOS os 9 locales!');
    console.log('   - Sitemap: exatamente 27 URLs de YESSTYLE_LOCALES (sem heurísticas de slugs)!');
    console.log('   - Breadcrumbs: 3 níveis em PT e 2 níveis nos hubs internacionais sem vazamento para /cupons!');
    process.exit(0);
  } else {
    console.error('❌ FALHA NO TESTE DE MUTAÇÃO B2 RIGOROSO:');
    for (const err of result.errors) {
      console.error(`  - ${err}`);
    }
    process.exit(1);
  }
}
