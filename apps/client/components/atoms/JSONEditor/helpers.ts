export function sanitizeJSON(obj: Record<string, unknown>) {
  return JSON.parse(
    JSON.stringify(obj, (key, value) => {
      return value === null ? undefined : value;
    })
  );
}
