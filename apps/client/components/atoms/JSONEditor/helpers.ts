export function sanitizeJSON(obj: Record<string, unknown>) {
  return JSON.parse(
    JSON.stringify(obj, (key, value) => {
      return value === null ? undefined : value;
    })
  );
}

export const defaultChampionChange = {
  type: "change",
  attribute: "ATRIBUTO",
  before: "10/20/30/40/50",
  after: "10/20/30/40/50",
};
