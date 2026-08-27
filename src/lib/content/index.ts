// API pública da camada de conteúdo canônico — Fase 1

export * from './types';
export * from './serializers';
export * from './authors';
export * from './review-i18n';
export { normalizeRecipe, normalizeReview, inferReviewKind, fallbackInstructionGroups } from './adapters';
