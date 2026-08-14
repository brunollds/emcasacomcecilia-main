import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const STATUS = new Set(['active', 'scheduled', 'expired']);
const TYPES = new Set(['reward', 'coupon']);
const BASE_KEYS = [
  'id', 'code', 'type', 'status', 'startsAt', 'expiresAt', 'recheckBy', 'verifiedAt',
  'regions', 'officialSourceUrl', 'affiliateUrl', 'evidenceImage', 'eligibility', 'restrictions',
];

function fail(location, message) {
  throw new Error(`${location}: ${message}`);
}

function object(value, location) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) fail(location, 'deve ser objeto');
  return value;
}

function string(value, location) {
  if (typeof value !== 'string' || !value.trim()) fail(location, 'deve ser texto não vazio');
  return value;
}

function number(value, location) {
  if (typeof value !== 'number' || !Number.isFinite(value)) fail(location, 'deve ser número finito');
  return value;
}

function date(value, location) {
  string(value, location);
  const normalized = ISO_DATE_RE.test(value)
    && new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value;
  if (!normalized) fail(location, 'deve usar data ISO real YYYY-MM-DD');
  return value;
}

function stringArray(value, location, { required = false } = {}) {
  if (value === undefined && !required) return;
  if (!Array.isArray(value) || (required && value.length === 0)) {
    fail(location, required ? 'deve ser lista não vazia' : 'deve ser lista');
  }
  value.forEach((item, index) => string(item, `${location}[${index}]`));
}

function httpsUrl(value, location, { official = false } = {}) {
  string(value, location);
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    fail(location, 'URL inválida');
  }
  if (parsed.protocol !== 'https:') fail(location, 'deve usar HTTPS');
  if (official && parsed.hostname !== 'yesstyle.com' && !parsed.hostname.endsWith('.yesstyle.com')) {
    fail(location, 'deve apontar para domínio oficial yesstyle.com');
  }
}

function discount(value, location) {
  const item = object(value, location);
  const allowed = {
    percentage: new Set(['kind', 'value']),
    fixed: new Set(['kind', 'value', 'currency']),
    shipping: new Set(['kind']),
    text: new Set(['kind', 'label']),
  }[item.kind];
  if (!allowed) fail(`${location}.kind`, 'tipo de desconto inválido');
  for (const key of Object.keys(item)) {
    if (!allowed.has(key)) fail(`${location}.${key}`, 'campo desconhecido');
  }
  if (item.kind === 'percentage') {
    number(item.value, `${location}.value`);
    if (item.value <= 0 || item.value > 100) fail(`${location}.value`, 'deve estar entre 0 e 100');
  } else if (item.kind === 'fixed') {
    number(item.value, `${location}.value`);
    if (item.value <= 0) fail(`${location}.value`, 'deve ser positivo');
    if (!/^[A-Z]{3}$/.test(item.currency ?? '')) fail(`${location}.currency`, 'deve usar código ISO de 3 letras');
  } else if (item.kind === 'text') {
    string(item.label, `${location}.label`);
  }
}

export function validateYesStyleCoupons(value, { today = new Date().toISOString().slice(0, 10) } = {}) {
  date(today, 'today');
  if (!Array.isArray(value) || value.length === 0) fail('yesstyle.json', 'raiz deve ser lista não vazia');

  const ids = new Set();
  const codes = new Set();
  let activeRewards = 0;

  value.forEach((raw, index) => {
    const location = `yesstyle.json[${index}]`;
    const item = object(raw, location);
    const type = string(item.type, `${location}.type`);
    if (!TYPES.has(type)) fail(`${location}.type`, 'deve ser reward ou coupon');
    const allowed = new Set([
      ...BASE_KEYS,
      ...(type === 'reward'
        ? ['newCustomerDiscount', 'returningCustomerDiscount']
        : ['discount']),
    ]);
    for (const key of Object.keys(item)) {
      if (!allowed.has(key)) fail(`${location}.${key}`, 'campo desconhecido');
    }

    const id = string(item.id, `${location}.id`);
    const code = string(item.code, `${location}.code`);
    if (!/^[a-z0-9-]+$/.test(id)) fail(`${location}.id`, 'use apenas minúsculas, números e hífens');
    if (!/^[A-Z0-9_-]+$/.test(code)) fail(`${location}.code`, 'use apenas maiúsculas, números, _ ou -');
    if (ids.has(id)) fail(`${location}.id`, `duplicado: ${id}`);
    if (codes.has(code)) fail(`${location}.code`, `duplicado: ${code}`);
    ids.add(id);
    codes.add(code);

    if (!STATUS.has(item.status)) fail(`${location}.status`, 'status inválido');
    date(item.verifiedAt, `${location}.verifiedAt`);
    const startsAt = item.startsAt === undefined ? undefined : date(item.startsAt, `${location}.startsAt`);
    const expiresAt = item.expiresAt === undefined ? undefined : date(item.expiresAt, `${location}.expiresAt`);
    if (startsAt && expiresAt && startsAt > expiresAt) fail(location, 'startsAt deve ser anterior ou igual a expiresAt');
    if (item.status === 'active' && expiresAt && expiresAt < today) fail(location, 'oferta ativa já venceu');
    if (item.status === 'active' && startsAt && startsAt > today) fail(location, 'oferta ativa ainda não começou');
    if (item.status === 'scheduled' && (!startsAt || startsAt <= today)) fail(location, 'oferta agendada precisa começar no futuro');
    if (item.recheckBy !== undefined) date(item.recheckBy, `${location}.recheckBy`);

    httpsUrl(item.officialSourceUrl, `${location}.officialSourceUrl`, { official: true });
    if (item.affiliateUrl !== undefined) httpsUrl(item.affiliateUrl, `${location}.affiliateUrl`);
    if (item.evidenceImage !== undefined) string(item.evidenceImage, `${location}.evidenceImage`);
    stringArray(item.regions, `${location}.regions`, { required: true });
    stringArray(item.eligibility, `${location}.eligibility`);
    stringArray(item.restrictions, `${location}.restrictions`);

    if (type === 'reward') {
      if (item.status === 'active') activeRewards += 1;
      number(item.newCustomerDiscount, `${location}.newCustomerDiscount`);
      number(item.returningCustomerDiscount, `${location}.returningCustomerDiscount`);
      if (item.newCustomerDiscount <= 0 || item.newCustomerDiscount > 100) {
        fail(`${location}.newCustomerDiscount`, 'deve estar entre 0 e 100');
      }
      if (item.returningCustomerDiscount <= 0 || item.returningCustomerDiscount > 100) {
        fail(`${location}.returningCustomerDiscount`, 'deve estar entre 0 e 100');
      }
      if (item.affiliateUrl === undefined) fail(`${location}.affiliateUrl`, 'obrigatório para reward');
    } else {
      discount(item.discount, `${location}.discount`);
      if (item.status === 'active' && (!startsAt || !expiresAt)) {
        fail(location, 'cupom ativo exige startsAt e expiresAt');
      }
    }
  });

  if (activeRewards !== 1) fail('yesstyle.json', `esperado exatamente 1 reward ativo; encontrados ${activeRewards}`);
  return value;
}

function isCli() {
  return process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
}

if (isCli()) {
  try {
    const source = path.resolve('data', 'coupons', 'yesstyle.json');
    const parsed = JSON.parse(readFileSync(source, 'utf8'));
    validateYesStyleCoupons(parsed);
    console.log(`ok yesstyle.json (${parsed.length} ofertas)`);
  } catch (error) {
    console.error(`yesstyle.json inválido: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  }
}
