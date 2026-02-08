export function hasKeys<T>(
  obj: Record<string, unknown>,
  keys: readonly string[],
): obj is Record<(typeof keys)[number], unknown> {
  // Check for null and undefined only
  if (obj === null || obj === undefined) {
    return false;
  }
  // Check if object
  if (typeof obj !== "object") {
    return false;
  }

  for (const key in keys) {
    if (!(key in obj)) {
      return false;
    }
  }

  return true;
}
