#!/usr/bin/env node

import { createHash } from 'node:crypto';
import https from 'node:https';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const CDN_HOSTNAME = 'cdn.emcasacomcecilia.com';
export const CDN_PATH = '/v1/image/0254bbb96343f9806745d47d11df8af03364d722e342b380abbfe1b02353d74f/ftps-g0-49ec5bb3b8d74280a4f17d495065c115.png';
export const CDN_URL = `https://${CDN_HOSTNAME}${CDN_PATH}`;
export const EXPECTED_BYTES = 68;
export const EXPECTED_SHA256 = '0254bbb96343f9806745d47d11df8af03364d722e342b380abbfe1b02353d74f';
export const EXPECTED_MIME = 'image/png';
export const TLS_DAYS_THRESHOLD = 30;
export const DEFAULT_TIMEOUT_MS = 15000;
export const DEFAULT_MAX_BODY_BYTES = 1024 * 1024;

function headerValue(headers, name) {
  const key = Object.keys(headers ?? {}).find((candidate) => candidate.toLowerCase() === name.toLowerCase());
  const value = key ? headers[key] : undefined;
  return Array.isArray(value) ? value[0] : value ?? null;
}

function normalizeMime(value) {
  return value?.split(';', 1)[0].trim().toLowerCase() ?? null;
}

function errorCode(error) {
  return error?.code ? String(error.code) : error?.message || error?.name || 'unknown';
}

function rejectOnce(state, error) {
  if (state.settled) return;
  state.settled = true;
  state.cleanup();
  state.reject(error);
}

function resolveOnce(state, resolve, value) {
  if (state.settled) return;
  state.settled = true;
  state.cleanup();
  resolve(value);
}

export function requestHttps({ hostname = CDN_HOSTNAME, requestPath = CDN_PATH, timeoutMs = DEFAULT_TIMEOUT_MS, maxBodyBytes = DEFAULT_MAX_BODY_BYTES, requestFactory = https.request } = {}) {
  if (hostname !== CDN_HOSTNAME || requestPath !== CDN_PATH) throw new Error('fixed CDN endpoint violation');
  return new Promise((resolve, reject) => {
    let request;
    let deadlineTimer;
    const state = {
      settled: false,
      reject,
      cleanup: () => {
        if (deadlineTimer) clearTimeout(deadlineTimer);
        deadlineTimer = null;
      },
    };
    let tls = { authorized: false, authorization_error: null, protocol: null, cipher: null, cert_valid_to: null };
    const abort = (response, error) => {
      response.destroy(error);
      request.destroy(error);
      rejectOnce(state, error);
    };
    request = requestFactory({
      hostname: CDN_HOSTNAME,
      port: 443,
      method: 'GET',
      path: CDN_PATH,
      headers: { Accept: EXPECTED_MIME },
      rejectUnauthorized: true,
      servername: CDN_HOSTNAME,
      agent: false,
    }, (response) => {
      response.on('error', (error) => rejectOnce(state, error));
      const headers = Object.fromEntries(Object.entries(response.headers).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value]));
      const declaredLength = Number(headerValue(headers, 'content-length'));
      if (Number.isFinite(declaredLength) && declaredLength > maxBodyBytes) {
        abort(response, new Error(`response exceeds max body bytes (${declaredLength} > ${maxBodyBytes})`));
        return;
      }
      const chunks = [];
      let bytes = 0;
      response.on('data', (chunk) => {
        if (state.settled) return;
        bytes += chunk.length;
        if (bytes > maxBodyBytes) {
          abort(response, new Error(`response exceeds max body bytes (${bytes} > ${maxBodyBytes})`));
          return;
        }
        chunks.push(chunk);
      });
      response.on('end', () => {
        resolveOnce(state, resolve, { statusCode: response.statusCode ?? 0, headers, body: Buffer.concat(chunks), tls });
      });
    });
  if (!state.settled) {
    deadlineTimer = setTimeout(() => {
      const error = new Error('request deadline exceeded');
      error.code = 'ETIMEDOUT';
      request.destroy(error);
      rejectOnce(state, error);
    }, timeoutMs);
  }
    request.setTimeout(timeoutMs, () => {
      const error = new Error('request timeout');
      error.code = 'ETIMEDOUT';
      request.destroy(error);
    });
    request.on('socket', (socket) => {
      socket.once('secureConnect', () => {
        const certificate = socket.getPeerCertificate();
        tls = {
          authorized: socket.authorized === true,
          authorization_error: socket.authorizationError ?? null,
          protocol: socket.getProtocol?.() ?? null,
          cipher: socket.getCipher?.().name ?? null,
          cert_valid_to: certificate.valid_to ?? null,
        };
      });
    });
    request.on('error', (error) => rejectOnce(state, error));
    request.end();
  });
}

export function evaluateResponse(response, { nowMs = Date.now(), timeoutMs = DEFAULT_TIMEOUT_MS, maxBodyBytes = DEFAULT_MAX_BODY_BYTES } = {}) {
  const errors = [];
  const status = Number(response?.statusCode ?? 0);
  const headers = response?.headers ?? {};
  const body = Buffer.isBuffer(response?.body) ? response.body : Buffer.from(response?.body ?? '');
  const cacheControl = headerValue(headers, 'cache-control');
  const contentType = normalizeMime(headerValue(headers, 'content-type'));
  const declaredLengthValue = headerValue(headers, 'content-length');
  const declaredLength = declaredLengthValue === null ? null : Number(declaredLengthValue);
  const tls = response?.tls ?? {};

  if (status >= 300 && status < 400) errors.push('redirect-rejected');
  if (status !== 200) errors.push(`status:${status}`);
  if (body.length > maxBodyBytes) errors.push('body-too-large');
  if (declaredLength !== null && (!Number.isSafeInteger(declaredLength) || declaredLength !== body.length)) errors.push('content-length-mismatch');
  if (contentType !== EXPECTED_MIME) errors.push('mime-mismatch');
  if (body.length !== EXPECTED_BYTES) errors.push('bytes-mismatch');
  const sha256 = createHash('sha256').update(body).digest('hex');
  if (sha256 !== EXPECTED_SHA256) errors.push('hash-mismatch');

  const certTime = Date.parse(tls.cert_valid_to ?? '');
  const daysRemaining = Number.isFinite(certTime) ? (certTime - nowMs) / 86400000 : null;
  if (tls.authorized !== true) errors.push('tls-not-authorized');
  if (daysRemaining === null) errors.push('tls-certificate-date-unavailable');
  else if (daysRemaining < TLS_DAYS_THRESHOLD) errors.push('tls-days-below-threshold');

  return {
    ok: errors.length === 0,
    checked_at: new Date(nowMs).toISOString(),
    url: CDN_URL,
    timeout_ms: timeoutMs,
    max_body_bytes: maxBodyBytes,
    http: {
      status,
      mime: contentType,
      bytes: body.length,
      sha256,
      content_length: declaredLength,
      cache_control: cacheControl,
    },
    tls: {
      authorized: tls.authorized === true,
      protocol: tls.protocol ?? null,
      cipher: tls.cipher ?? null,
      cert_valid_to: tls.cert_valid_to ?? null,
      days_remaining: daysRemaining === null ? null : Number(daysRemaining.toFixed(3)),
    },
    errors,
  };
}

export async function checkCdn({ transport = requestHttps, nowMs = Date.now(), timeoutMs = DEFAULT_TIMEOUT_MS, maxBodyBytes = DEFAULT_MAX_BODY_BYTES } = {}) {
  try {
    const response = await transport({ hostname: CDN_HOSTNAME, requestPath: CDN_PATH, timeoutMs, maxBodyBytes });
    return evaluateResponse(response, { nowMs, timeoutMs, maxBodyBytes });
  } catch (error) {
    return {
      ok: false,
      checked_at: new Date(nowMs).toISOString(),
      url: CDN_URL,
      timeout_ms: timeoutMs,
      max_body_bytes: maxBodyBytes,
      http: null,
      tls: null,
      errors: [`transport:${errorCode(error)}`],
    };
  }
}

async function main() {
  const result = await checkCdn();
  process.stdout.write(`${JSON.stringify(result)}\n`);
  if (!result.ok) process.exitCode = 1;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    process.stdout.write(`${JSON.stringify({ ok: false, url: CDN_URL, errors: [`checker:${errorCode(error)}`] })}\n`);
    process.exitCode = 1;
  });
}
