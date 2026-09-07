import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { EventEmitter } from 'node:events';
import {
  CDN_PATH,
  EXPECTED_BYTES,
  EXPECTED_MIME,
  EXPECTED_SHA256,
  checkCdn,
  requestHttps,
} from './monitor-cdn.mjs';

const NOW = Date.parse('2026-09-06T18:00:00.000Z');
const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aM3sAAAAASUVORK5CYII=', 'base64');
assert.equal(PNG.length, EXPECTED_BYTES);
assert.equal(createHash('sha256').update(PNG).digest('hex'), EXPECTED_SHA256);

function tls(days = 90) {
  return {
    authorized: true,
    protocol: 'TLSv1.3',
    cipher: 'TLS_AES_256_GCM_SHA384',
    cert_valid_to: new Date(NOW + days * 86400000).toUTCString(),
  };
}

function response(overrides = {}) {
  return {
    statusCode: 200,
    headers: { 'content-type': `${EXPECTED_MIME}; charset=UTF-8`, 'content-length': String(PNG.length) },
    body: PNG,
    tls: tls(),
    ...overrides,
  };
}

const fake = (value) => async ({ hostname, requestPath }) => {
  assert.equal(hostname, 'cdn.emcasacomcecilia.com');
  assert.equal(requestPath, CDN_PATH);
  return typeof value === 'function' ? value() : value;
};

test('reports a valid fixture and trusted certificate', async () => {
  const result = await checkCdn({ transport: fake(response()), nowMs: NOW });
  assert.equal(result.ok, true);
  assert.equal(result.http.sha256, EXPECTED_SHA256);
  assert.equal(result.tls.protocol, 'TLSv1.3');
  assert.equal(result.tls.days_remaining, 90);
});

test('fails when the certificate is inside the 30-day threshold', async () => {
  const result = await checkCdn({ transport: fake(response({ tls: tls(10) })), nowMs: NOW });
  assert.equal(result.ok, false);
  assert.ok(result.errors.includes('tls-days-below-threshold'));
});

test('fails on a divergent body hash', async () => {
  const body = Buffer.from(PNG);
  body[body.length - 1] ^= 1;
  const result = await checkCdn({ transport: fake(response({ body })), nowMs: NOW });
  assert.equal(result.ok, false);
  assert.ok(result.errors.includes('hash-mismatch'));
});

test('fails closed on timeout', async () => {
  const error = Object.assign(new Error('request timeout'), { code: 'ETIMEDOUT' });
  const result = await checkCdn({ transport: async () => { throw error; }, nowMs: NOW });
  assert.equal(result.ok, false);
  assert.deepEqual(result.errors, ['transport:ETIMEDOUT']);
});

test('rejects redirects and unexpected status', async () => {
  const redirect = await checkCdn({ transport: fake(response({ statusCode: 302, headers: { location: 'https://other.example/' }, body: Buffer.alloc(0) })), nowMs: NOW });
  assert.equal(redirect.ok, false);
  assert.ok(redirect.errors.includes('redirect-rejected'));

  const serverError = await checkCdn({ transport: fake(response({ statusCode: 503, body: Buffer.alloc(0), headers: {} })), nowMs: NOW });
  assert.equal(serverError.ok, false);
  assert.ok(serverError.errors.includes('status:503'));
});

test('rejects an oversized response', async () => {
  const result = await checkCdn({ transport: fake(response({ body: Buffer.alloc(EXPECTED_BYTES + 1), headers: { 'content-type': EXPECTED_MIME, 'content-length': String(EXPECTED_BYTES + 1) } })), maxBodyBytes: EXPECTED_BYTES, nowMs: NOW });
  assert.equal(result.ok, false);
  assert.ok(result.errors.includes('body-too-large'));
});

test('aborts both request and response before draining an oversized body', async () => {
  const state = { requestDestroyed: false, responseDestroyed: false, options: null };
  const requestFactory = (options, callback) => {
    state.options = options;
    const request = new EventEmitter();
    request.setTimeout = () => {};
    request.destroy = () => { state.requestDestroyed = true; };
    request.end = () => {
      const response = new EventEmitter();
      response.statusCode = 200;
      response.headers = { 'content-length': '99' };
      response.destroy = () => { state.responseDestroyed = true; };
      callback(response);
    };
    return request;
  };

  await assert.rejects(
    requestHttps({ maxBodyBytes: 10, timeoutMs: 50, requestFactory }),
    /response exceeds max body bytes/,
  );
  assert.equal(state.requestDestroyed, true);
  assert.equal(state.responseDestroyed, true);
  assert.equal(state.options.agent, false);
  assert.equal(state.options.rejectUnauthorized, true);
  assert.equal(state.options.servername, 'cdn.emcasacomcecilia.com');
});

test('enforces a total deadline even when the request is inactive', async () => {
  const state = { requestDestroyed: false, error: null, options: null };
  const requestFactory = (options) => {
    state.options = options;
    const request = new EventEmitter();
    request.setTimeout = () => {};
    request.destroy = (error) => { state.requestDestroyed = true; state.error = error; };
    request.end = () => {};
    return request;
  };

  await assert.rejects(
    requestHttps({ timeoutMs: 15, requestFactory }),
    (error) => error.code === 'ETIMEDOUT',
  );
  assert.equal(state.requestDestroyed, true);
  assert.equal(state.error.code, 'ETIMEDOUT');
  assert.equal(state.options.agent, false);
});
