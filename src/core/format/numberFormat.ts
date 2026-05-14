export function normalizeNumberLike(value: string): string | null {
  const trimmed = value.trim();
  const hasNumericDecoration = /[₩$,]/.test(trimmed) || /\s/.test(value);
  if (!hasNumericDecoration) {
    return null;
  }

  const normalized = trimmed.replace(/[₩$,\s]/g, "");
  if (normalized === "" || Number.isNaN(Number(normalized))) {
    return null;
  }

  return normalized;
}
