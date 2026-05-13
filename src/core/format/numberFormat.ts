export function normalizeNumberLike(value: string): string | null {
  const trimmed = value.trim();
  if (!/[₩$,\s]/.test(value) && !/[₩$,]/.test(trimmed)) {
    return null;
  }

  const normalized = trimmed.replace(/[₩$,\s]/g, "");
  if (normalized === "" || Number.isNaN(Number(normalized))) {
    return null;
  }

  return normalized;
}
