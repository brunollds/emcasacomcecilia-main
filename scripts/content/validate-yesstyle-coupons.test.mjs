import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { validateYesStyleCoupons } from './validate-yesstyle-coupons.mjs';

const source = JSON.parse(readFileSync('data/coupons/yesstyle.json', 'utf8'));
const fixture = () => structuredClone(source);
const activePromos = source.filter((item) => item.type === 'coupon' && item.status === 'active');
assert.notEqual(activePromos.length, 0, 'a fonte deve conter um cupom promocional ativo');
const promoIndex = source.indexOf(activePromos[0]);
const validToday = activePromos.reduce(
  (latest, promo) => (promo.startsAt > latest ? promo.startsAt : latest),
  activePromos[0].startsAt,
);
const lastExpiration = activePromos.reduce(
  (latest, promo) => (promo.expiresAt > latest ? promo.expiresAt : latest),
  activePromos[0].expiresAt,
);
const expiredToday = new Date(`${lastExpiration}T00:00:00Z`);
expiredToday.setUTCDate(expiredToday.getUTCDate() + 1);
const dayAfterExpiration = expiredToday.toISOString().slice(0, 10);

test('aceita a fonte factual atual na data da verificação', () => {
  assert.doesNotThrow(() => validateYesStyleCoupons(fixture(), { today: validToday }));
});

test('rejeita data impossível e intervalo invertido', () => {
  const invalidDate = fixture();
  invalidDate[promoIndex].expiresAt = '2026-02-30';
  assert.throws(() => validateYesStyleCoupons(invalidDate, { today: validToday }), /data ISO real/);

  const inverted = fixture();
  inverted[promoIndex].startsAt = '2026-08-25';
  inverted[promoIndex].expiresAt = '2026-08-24';
  assert.throws(() => validateYesStyleCoupons(inverted, { today: validToday }), /anterior ou igual/);
});

test('rejeita duplicata e fonte não oficial', () => {
  const duplicate = fixture();
  duplicate[promoIndex].code = duplicate[0].code;
  assert.throws(() => validateYesStyleCoupons(duplicate, { today: validToday }), /duplicado/);

  const unofficial = fixture();
  unofficial[promoIndex].officialSourceUrl = 'https://example.com/promo';
  assert.throws(() => validateYesStyleCoupons(unofficial, { today: validToday }), /domínio oficial/);
});

test('rejeita promoção vencida ainda marcada como ativa', () => {
  assert.throws(
    () => validateYesStyleCoupons(fixture(), { today: dayAfterExpiration }),
    /oferta ativa já venceu/,
  );
});

test('rejeita campo desconhecido para capturar erros de digitação', () => {
  const typo = fixture();
  typo[promoIndex].expireAt = typo[promoIndex].expiresAt;
  assert.throws(() => validateYesStyleCoupons(typo, { today: validToday }), /campo desconhecido/);
});
