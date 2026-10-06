import {
  getPrimaryRewardCode,
  getActivePromoCoupons,
  getLatestYesStyleVerifiedAtISO,
  type YesStylePromoOffer,
} from '../src/lib/yesstyleCoupons';
import {
  resolveYesStylePage,
  getYesStyleMetadata,
  getYesStyleBreadcrumbItems,
} from '../src/components/coupons/yesstylePage';
import { getYesStylePage, yesStyleLocales } from '../src/components/coupons/yesstyleCopy';
import { COUPONS } from '../src/lib/couponsData';
import {
  getRewardArticleLanguageLinks,
  getHubLanguageLinks,
  YESSTYLE_LOCALES,
} from '../src/lib/i18n/clusters/yesstyle';
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

  // 3. Validação estrita do Sitemap B2 a partir de YESSTYLE_LOCALES
  const expectedArticleUrls = Object.values(YESSTYLE_LOCALES).flatMap((config) =>
    config.articles.map((article) => `https://emcasacomcecilia.com${article.path}`)
  );

  const expectedHubUrls = Object.values(YESSTYLE_LOCALES).map(
    (config) => `https://emcasacomcecilia.com${config.hubPath}`
  );

  // Contagem esperada é derivada do próprio registro (não hardcoded), pois o
  // número de tipos de artigo por locale pode crescer (ex.: onboarding da
  // Shein ou de um 4º tipo de artigo como o kbeauty).
  const articleKeysPerLocale = Object.values(YESSTYLE_LOCALES).map((c) => c.articles.length);
  const expectedArticleCount = articleKeysPerLocale.reduce((a, b) => a + b, 0);
  const expectedHubCount = Object.keys(YESSTYLE_LOCALES).length;
  const expectedGrandTotal = expectedArticleCount + expectedHubCount;

  const expectedTotalUrls = new Set([...expectedArticleUrls, ...expectedHubUrls]);
  if (expectedTotalUrls.size !== expectedGrandTotal) {
    errors.push(`Regra interna de teste: conjunto estrito de URLs calculou ${expectedTotalUrls.size} em vez de ${expectedGrandTotal}`);
  }

  const allSitemapEntries = sitemap();
  const yesstyleSitemapUrls = allSitemapEntries
    .filter((item) => expectedTotalUrls.has(item.url))
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

  if (yesstyleSitemapUrls.length !== expectedGrandTotal) {
    errors.push(`Sitemap B2 esperado exatamente ${expectedGrandTotal} URLs YesStyle, obteve ${yesstyleSitemapUrls.length}`);
  }

  for (const expectedUrl of expectedTotalUrls) {
    if (!uniqueUrls.has(expectedUrl)) {
      errors.push(`URL esperada ausente no sitemap B2: "${expectedUrl}"`);
    }
  }

  // Verificar lastModified do sitemap para os hubs de todos os idiomas (deve coincidir com initialLatestVerifiedAt)
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
  const origRewardAffiliateUrl = primaryReward.affiliateUrl;

  const promoToMutate = activePromos[0];
  const expectedMutatedLatest = promoToMutate ? '2026-11-26' : '2026-11-25';
  const origPromoCode = promoToMutate ? promoToMutate.code : '';
  const origPromoDiscount = promoToMutate ? { ...promoToMutate.discount } : null;
  const origPromoVerified = promoToMutate ? promoToMutate.verifiedAt : '';

  try {
    // 4. Executar mutação em memória dos dois códigos factuais
    primaryReward.code = 'MUTATIONTEST99';
    primaryReward.newCustomerDiscount = 99;
    primaryReward.returningCustomerDiscount = 44;
    primaryReward.verifiedAt = '2026-11-25';
    primaryReward.affiliateUrl = 'https://ystyle.co/mutation-test';

    if (promoToMutate) {
      promoToMutate.code = 'PROMOTEST88';
      promoToMutate.discount = { kind: 'percentage', value: 88 };
      promoToMutate.verifiedAt = '2026-11-26';
    }

    // 5. Testar Hub PT em couponsData (lastVerified dinâmico de mutação)
    const ptHub = COUPONS.find((c) => c.slug === 'yesstyle');
    if (!ptHub) {
      errors.push('Hub PT "yesstyle" não encontrado em COUPONS');
    } else if (ptHub.offerMode !== 'discount-code') {
      errors.push(`Hub PT "yesstyle" esperado como discount-code, obteve "${ptHub.offerMode}"`);
    } else {
      if (ptHub.code !== 'MUTATIONTEST99') errors.push(`Hub PT code: esperado "MUTATIONTEST99", obteve "${ptHub.code}"`);
      if (ptHub.discountNumber !== 99) errors.push(`Hub PT discountNumber: esperado 99, obteve ${ptHub.discountNumber}`);
      if (ptHub.lastVerified !== expectedMutatedLatest) errors.push(`Hub PT lastVerified esperado "${expectedMutatedLatest}" (maior data mutada), obteve "${ptHub.lastVerified}"`);
      if (ptHub.officialUrl !== 'https://www.yesstyle.com/') errors.push(`Hub PT officialUrl esperado "https://www.yesstyle.com/", obteve "${ptHub.officialUrl}"`);
      if (ptHub.offerUrl !== 'https://ystyle.co/mutation-test') errors.push(`Hub PT offerUrl dinâmico esperado "https://ystyle.co/mutation-test", obteve "${ptHub.offerUrl}"`);
    }

    // 6. Testar resolvedor, metadata, hreflangs com igualdade total e breadcrumbs estritos para TODOS OS LOCALES
    const expectedHreflangCount = yesStyleLocales.length + 1;
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

      // [P2 Fix]: Teste de igualdade completa do dicionário de hreflangs (um por idioma + x-default)
      const langs = meta.alternates?.languages || {};
      const actualKeys = Object.keys(langs);
      if (actualKeys.length !== expectedHreflangCount) {
        errors.push(`Quantidade de chaves hreflang esperada ${expectedHreflangCount} em "${locale}", obteve ${actualKeys.length}`);
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
      if (resolved.verifiedAtISO !== expectedMutatedLatest) {
        errors.push(`resolved.verifiedAtISO esperado "${expectedMutatedLatest}" (data mutada mais recente), obteve "${resolved.verifiedAtISO}"`);
      }

      // O H1 é montado em partes em volta do número grande e precisa dizer o mesmo que o título.
      const { lead, prefix, suffix } = resolved.heroTitle;
      const heroText = `${lead}${prefix}${resolved.newCustomerDiscount}%${suffix}`.replace(/\s/g, '');
      if (heroText !== resolved.title.replace(/\s/g, '')) {
        errors.push(`H1 diferente do título em locale "${locale}": "${lead} | ${prefix} | ${resolved.newCustomerDiscount}% | ${suffix}" x "${resolved.title}"`);
      }

      if (!resolved.firstOrder.discount.includes('99') || !resolved.nextOrders.discount.includes('44')) {
        errors.push(`Descontos da 1ª compra e das seguintes não propagaram a mutação em locale "${locale}": "${resolved.firstOrder.discount}" / "${resolved.nextOrders.discount}"`);
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
          if (foundPromo.conditions[0] !== getYesStylePage(locale)?.noMinimumLabel) {
            errors.push(`Cupom de porcentagem sem a condição "sem valor mínimo" em locale "${locale}": "${foundPromo.conditions.join(' | ')}"`);
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
        lead,
        prefix,
        suffix,
        resolved.description,
        resolved.category,
        resolved.intro,
        resolved.rewardCodeLabel,
        resolved.rewardFieldNote,
        resolved.promosSectionTitle,
        resolved.promosIntro,
        resolved.emptyPromosNotice,
        resolved.emptyPromosSubtext,
        ...resolved.activePromoOffers.flatMap((promo) => [...promo.conditions, promo.regionLabel]),
        resolved.policyTitle,
        ...Object.values(resolved.policyRules),
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
          if ((origPromoCode && inst.includes(origPromoCode)) || inst.includes('PROMOTEST88')) {
            errors.push(`Instrução do estado sem cupom promocional contém código promocional resíduo em "${locale}": "${inst}"`);
          }
        }
      }
    }

    // 8. Condições e país de cupons que o JSON de hoje não tem: um em faixas, só para membros e só
    // nos EUA, e um sem valor mínimo para todos os países.
    const tieredPromo: YesStylePromoOffer = {
      id: 'tiers-test',
      code: 'TIERSTEST',
      type: 'coupon',
      status: 'active',
      discount: { kind: 'tiers', currency: 'USD', tiers: [{ minSpend: 79, percent: 8 }, { minSpend: 199, percent: 15 }] },
      verifiedAt: '2026-11-20',
      regions: ['US'],
      officialSourceUrl: 'https://www.yesstyle.com/en/',
      membersOnly: true,
    };
    const openPromo: YesStylePromoOffer = {
      ...tieredPromo,
      id: 'open-test',
      code: 'OPENTEST',
      discount: { kind: 'percentage', value: 5 },
      regions: ['GLOBAL'],
      membersOnly: false,
    };
    for (const locale of yesStyleLocales) {
      const page = getYesStylePage(locale);
      const [tiered, open] = resolveYesStylePage(locale, primaryReward, [tieredPromo, openPromo])?.activePromoOffers ?? [];
      if (!page || !tiered || !open) {
        errors.push(`Cupons de teste de faixas não resolvidos em locale "${locale}"`);
        continue;
      }
      if (tiered.discountLabel !== '8–15% OFF') {
        errors.push(`Desconto em faixas esperado "8–15% OFF" em locale "${locale}", obteve "${tiered.discountLabel}"`);
      }
      const [firstTier = '', secondTier = '', members] = tiered.conditions;
      const tierLineOk = (line: string, amount: string, percent: string) =>
        line.includes('USD') && line.includes(amount) && line.replace(/\s/g, '').includes(percent) && !/\{\w+\}/.test(line);
      if (tiered.conditions.length !== 3 || !tierLineOk(firstTier, '79', '8%') || !tierLineOk(secondTier, '199', '15%') || members !== page.membersOnlyLabel) {
        errors.push(`Condições do cupom em faixas erradas em locale "${locale}": "${tiered.conditions.join(' | ')}"`);
      }
      if (!tiered.regionLabel || tiered.regionLabel === 'US' || tiered.regionLabel === page.regionUnconfirmed) {
        errors.push(`País do cupom em faixas não traduzido em locale "${locale}": "${tiered.regionLabel}"`);
      }
      if (open.conditions.length !== 1 || open.conditions[0] !== page.noMinimumLabel) {
        errors.push(`Cupom sem mínimo e sem login com condições erradas em locale "${locale}": "${open.conditions.join(' | ')}"`);
      }
      if (open.regionLabel !== page.allRegionsLabel) {
        errors.push(`GLOBAL esperado como "${page.allRegionsLabel}" em locale "${locale}", obteve "${open.regionLabel}"`);
      }
    }
  } finally {
    // [P1 Fix]: Restaurar estado factual original de forma ESTRITA sem sobrescrever datas factuais
    primaryReward.code = origRewardCode;
    primaryReward.newCustomerDiscount = origRewardNew;
    primaryReward.returningCustomerDiscount = origRewardRet;
    primaryReward.verifiedAt = origRewardVerified;
    primaryReward.affiliateUrl = origRewardAffiliateUrl;

    if (promoToMutate && origPromoDiscount) {
      promoToMutate.code = origPromoCode;
      promoToMutate.discount = origPromoDiscount;
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
    console.log(`   - Canonicals auto-referenciados nos ${yesStyleLocales.length} hubs confirmados!`);
    console.log(`   - Hreflangs: ${yesStyleLocales.length + 1} chaves validadas por igualdade total em TODOS os ${yesStyleLocales.length} locales!`);
    console.log('   - Sitemap: exatamente as URLs de YESSTYLE_LOCALES, contadas dinamicamente (sem heurísticas de slugs)!');
    console.log('   - Breadcrumbs: 3 níveis em PT e 2 níveis nos hubs internacionais sem vazamento para /cupons!');
    console.log(`   - Cupons em faixas: valor mínimo em USD, login e país traduzidos nos ${yesStyleLocales.length} idiomas!`);
    process.exit(0);
  } else {
    console.error('❌ FALHA NO TESTE DE MUTAÇÃO B2 RIGOROSO:');
    for (const err of result.errors) {
      console.error(`  - ${err}`);
    }
    process.exit(1);
  }
}
