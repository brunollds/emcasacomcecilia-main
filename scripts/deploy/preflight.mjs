const SHA_RE = /^[0-9a-f]{40}$/;

export function assertDeployPreflight({ status, branch, headSha, originSha }) {
  const failures = [];

  if (status.trim()) {
    failures.push(
      'existem mudanças locais que ficariam fora do deploy:\n' +
      status.trim().split('\n').map((line) => `  ${line}`).join('\n'),
    );
  }
  if (branch !== 'main') failures.push(`branch atual deve ser main (recebida: ${branch || 'detached'})`);
  if (!SHA_RE.test(headSha)) failures.push(`HEAD inválido: ${headSha}`);
  if (!SHA_RE.test(originSha)) failures.push(`origin/main inválido: ${originSha}`);
  if (headSha !== originSha) failures.push(`HEAD diverge de origin/main: ${headSha} != ${originSha}`);

  if (failures.length > 0) {
    throw new Error(`DEPLOY BLOQUEADO\n\n${failures.join('\n\n')}`);
  }
}

export function assertProductionSha(value) {
  if (!SHA_RE.test(value ?? '')) {
    throw new Error(`atestação pública sem target_sha válido: ${value ?? 'ausente'}`);
  }
  return value;
}
