import type { RollRecord } from "../domain/roll";
import { totalOf, type DieValue } from "../domain/faces";

const KEY = "diceroll.history.v1";
const LIMIT = 20;

export function sanitizeHistory(value: unknown): RollRecord[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is RollRecord => {
    if (!item || typeof item !== "object") return false;
    const row = item as Partial<RollRecord>;
    return typeof row.id === "string" && typeof row.timestamp === "string" &&
      !Number.isNaN(Date.parse(row.timestamp)) && Array.isArray(row.values) &&
      row.values.length >= 1 && row.values.length <= 4 &&
      row.values.every((v) => Number.isInteger(v) && v >= 1 && v <= 6) &&
      row.count === row.values.length && row.total === totalOf(row.values as DieValue[]);
  }).slice(0, LIMIT);
}

export function loadHistory(): RollRecord[] {
  try { return sanitizeHistory(JSON.parse(localStorage.getItem(KEY) ?? "[]")); }
  catch { return []; }
}

export function saveHistory(records: RollRecord[]): void {
  try { localStorage.setItem(KEY, JSON.stringify(records.slice(0, LIMIT))); }
  catch { /* Storage may be unavailable; the in-memory session still works. */ }
}

export function prependHistory(records: RollRecord[], record: RollRecord): RollRecord[] {
  return [record, ...records].slice(0, LIMIT);
}
