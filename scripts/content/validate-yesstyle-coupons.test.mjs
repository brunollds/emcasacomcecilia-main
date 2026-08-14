import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { validateYesStyleCoupons } from './validate-yesstyle-coupons.mjs';

const source = JSON.parse(readFileSync('data/coupons/yesstyle.json', 'utf8'));
const fixture = () => structuredClone(source);

test('aceita a fonte factual atual na data da verificação', () => {
  assert.doesNotThrow(() => validateYesStyleCoupons(fixture(), { today: '2026-08-14' }));
});

test('rejeita data impossível e intervalo invertido', () => {
  const invalidDate = fixture();
  invalidDate[1].expiresAt = '2026-02-30';
  assert.throws(() => validateYesStyleCoupons(invalidDate, { today: '2026-08-14' }), /data ISO real/);

  const inverted = fixture();
  inverted[1].startsAt = '2026-08-18';
  assert.throws(() => validateYesStyleCoupons(inverted, { today: '2026-08-14' }), /anterior ou igual/);
});

test('rejeita duplicata e fonte não oficial', () => {
  const duplicate = fixture();
  duplicate[1].code = duplicate[0].code;
  assert.throws(() => validateYesStyleCoupons(duplicate, { today: '2026-08-14' }), /duplicado/);

  const unofficial = fixture();
  unofficial[1].officialSourceUrl = 'https://example.com/promo';
  assert.throws(() => validateYesStyleCoupons(unofficial, { today: '2026-08-14' }), /domínio oficial/);
});

test('rejeita promoção vencida ainda marcada como ativa', () => {
  assert.throws(
    () => validateYesStyleCoupons(fixture(), { today: '2026-08-18' }),
    /oferta ativa já venceu/,
  );
});

test('rejeita campo desconhecido para capturar erros de digitação', () => {
  const typo = fixture();
  typo[1].expireAt = typo[1].expiresAt;
  assert.throws(() => validateYesStyleCoupons(typo, { today: '2026-08-14' }), /campo desconhecido/);
});
