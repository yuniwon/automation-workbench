import type { RecipeStep } from "../table/types";

export interface CleanupOptions {
  trimText: boolean;
  normalizeHeaders: boolean;
  normalizeNumbers: boolean;
  removeDuplicateRows: boolean;
}

export const defaultCleanupOptions: CleanupOptions = {
  trimText: true,
  normalizeHeaders: true,
  normalizeNumbers: true,
  removeDuplicateRows: true,
};

export function cleanupOptionsToSteps(options: CleanupOptions): RecipeStep[] {
  return Object.entries(options)
    .filter(([, enabled]) => enabled)
    .map(([type]) => ({ type }));
}
