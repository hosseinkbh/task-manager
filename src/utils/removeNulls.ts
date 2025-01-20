export function removeNulls<T extends object>(payload: T): T {
  for (const [key, value] of Object.entries(payload)) {
    if (!value) delete payload[key as keyof T];
  }
  return payload;
}