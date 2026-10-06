import { describe, expect, it } from "vitest";
import { canStartRoll, formatRoll, makeRollRecord } from "./roll";
import { prependHistory, sanitizeHistory } from "../storage/history";

describe("roll records and lifecycle", () => {
  it("commits one completed roll with its breakdown, total, and timestamp", () => {
    const date = new Date("2026-10-06T12:00:00.000Z");
    const record = makeRollRecord([5, 2, 6], date);
    expect(record).toMatchObject({ timestamp: date.toISOString(), count: 3, values: [5, 2, 6], total: 13 });
    expect(formatRoll(record)).toBe("5 + 2 + 6 = 13");
  });

  it("prevents a new roll while physical bodies are moving", () => {
    expect(canStartRoll("READY")).toBe(true);
    expect(canStartRoll("ROLLING")).toBe(false);
    expect(canStartRoll("SETTLING")).toBe(false);
    expect(canStartRoll("COMPLETE")).toBe(true);
    expect(canStartRoll("UNRESOLVED")).toBe(true);
  });

  it("rejects corrupt local history and caps saved rolls", () => {
    const record = makeRollRecord([1, 6]);
    expect(sanitizeHistory([record, { ...record, total: 8 }, { values: [9] }])).toEqual([record]);
    const records = Array.from({ length: 22 }, (_, i) => ({ ...record, id: String(i) }));
    expect(prependHistory(records, record)).toHaveLength(20);
    expect(prependHistory(records, record)[0]).toBe(record);
  });
});
